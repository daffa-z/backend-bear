import Dikplhd from "../models/DikplhdModel.js";
import path from "path";
import fs from "fs";
import {Op} from "sequelize";

export const getDikplhd = async(req, res)=>{
    const page = parseInt(req.query.page) || 0;
    const limit = parseInt(req.query.limit) || 10;
    const search = req.query.search_query || "";
    const offset = limit * page;
    const totalRows = await Dikplhd.count({
        where:{
            [Op.or]: [{judul:{
                [Op.like]: '%'+search+'%'
            }}, {tanggalPelaksanaan:{
                [Op.like]: '%'+search+'%'
            }}, {pemrakarsa:{
                [Op.like]: '%'+search+'%'
            }}, {konsultan:{
                [Op.like]: '%'+search+'%'
            }}]
        }
    }); 
    const totalPage = Math.ceil(totalRows / limit);
    const result = await Dikplhd.findAll({
        where:{
            [Op.or]: [{judul:{
                [Op.like]: '%'+search+'%'
            }}, {tanggalPelaksanaan:{
                [Op.like]: '%'+search+'%'
            }}, {pemrakarsa:{
                [Op.like]: '%'+search+'%'
            }}, {konsultan:{
                [Op.like]: '%'+search+'%'
            }}]
        },
        offset: offset,
        limit: limit,
        order:[
            ['id', 'DESC']
        ]
    });
    res.json({
        result: result,
        page: page,
        limit: limit,
        totalRows: totalRows,
        totalPage: totalPage
    });
}

export const getDikplhdById = async(req, res)=>{
    try {
        const response = await Dikplhd.findOne({
            where:{
                id : req.params.id
            }
        });
        res.json(response);
    } catch (error) {
        console.log(error.message);
    }
}

export const saveDikplhd = async(req, res)=>{
    if(req.files === null) return res.status(400).json({msg: "No File Uploaded"});
    const judul = req.body.judul;
    const file = req.files.file;
    const file2 = req.files.file2;
    const tanggalPelaksanaan = req.body.tanggalPelaksanaan;
    const status = req.body.status;
    const nomor = req.body.nomor;
    const konsultan = req.body.konsultan;
    const pemrakarsa = req.body.pemrakarsa;
    const keterangan = req.body.keterangan;
    const fileSize = file.data.length;
    const fileSize2 = file2.data.length;
    const ext = path.extname(file.name);
    const ext2 = path.extname(file2.name);
    const fileName = file.md5 + ext;
    const fileName2 = file2.md5 + ext2;
    const url = `${req.protocol}://${req.get("host")}/images/${fileName}`;
    const url2 = `${req.protocol}://${req.get("host")}/images/${fileName2}`;
    const allowedType = ['.png','.jpg','.jpeg','.pdf'];

    if(!allowedType.includes(ext.toLowerCase())) return res.status(422).json({msg: "Invalid Images"});
    if(fileSize > 5000000 || fileSize2 > 5000000) return res.status(422).json({msg: "Image must be less than 5 MB"});

    file.mv(`./public/images/${fileName}`, async(err)=>{
        file2.mv(`./public/images/${fileName2}`, async(err)=>{
            if(err) return res.status(500).json({msg: err.message});
            try {
                await Dikplhd.create({judul: judul,
                    nomor: nomor,
                    status: status,
                    tanggalPelaksanaan: tanggalPelaksanaan,
                    pemrakarsa: pemrakarsa,
                    konsultan: konsultan,
                    dokumentasi: fileName,
                    urlDokumentasi: url,
                    beritaAcara: fileName2,
                    urlBerita: url2,
                    keterangan: keterangan
                });
                res.status(201).json({msg: "Data Created Successfuly"});
            } catch (error) {
                console.log(error.message);
            }
        })
    })
}

export const updateDikplhd = async(req, res)=>{
    
    const andal = await Dikplhd.findOne({
        where:{
            id : req.params.id
        }
    });
    if(!andal) return res.status(404).json({msg: "No Data Found"});
    
    let fileName = "";
    let fileName2 = "";
    if(req.files === null){
        fileName = andal.dokumentasi;
        fileName2 = andal.beritaAcara;
    }else{
        const file = req.files.file;
        const file2 = req.files.file2;
        const fileSize = file.data.length;
        const fileSize2 = file2.data.length;
        const ext = path.extname(file.name);
        const ext2 = path.extname(file2.name);
        fileName = file.md5 + ext;
        fileName2 = file2.md5 + ext2;
        const allowedType = ['.png','.jpg','.jpeg','.pdf'];

        if(!allowedType.includes(ext.toLowerCase())) return res.status(422).json({msg: "Invalid Images"});
        if(fileSize > 5000000 || fileSize2 > 5000000) return res.status(422).json({msg: "Image must be less than 5 MB"});

        const filepath = `./public/images/${andal.dokumentasi}`;
        fs.unlinkSync(filepath);
        const filepath2 = `./public/images/${andal.beritaAcara}`;
        fs.unlinkSync(filepath2);

        file.mv(`./public/images/${fileName}`, (err)=>{
            if(err) return res.status(500).json({msg: err.message});
        });
        file2.mv(`./public/images/${fileName2}`, (err)=>{
            if(err) return res.status(500).json({msg: err.message});
        });
    }
    const judul = req.body.judul;
    const tanggalPelaksanaan = req.body.tanggalPelaksanaan;
    const status = req.body.status;
    const nomor = req.body.nomor;
    const pemrakarsa = req.body.pemrakarsa;
    const konsultan = req.body.konsultan;
    const keterangan = req.body.keterangan;
    const url = `${req.protocol}://${req.get("host")}/images/${fileName}`;
    const url2 = `${req.protocol}://${req.get("host")}/images/${fileName2}`;
    
    try {
        await Dikplhd.update({judul: judul,
            status: status,
            nomor: nomor,
            tanggalPelaksanaan: tanggalPelaksanaan,
            pemrakarsa: pemrakarsa,
            konsultan: konsultan,
            dokumentasi: fileName,
            urlDokumentasi: url,
            beritaAcara: fileName2,
            urlBerita: url2,
            keterangan: keterangan}
            ,{
            where:{
                id: req.params.id
            }
        });
        res.status(200).json({msg: "Data Updated Successfuly"});
    } catch (error) {
        console.log(error.message);
    }
}

export const deleteDikplhd = async(req, res)=>{
    const andal = await Dikplhd.findOne({
        where:{
            id : req.params.id
        }
    });
    if(!andal) return res.status(404).json({msg: "No Data Found"});

    try {
        const filepath = `./public/images/${andal.dokumentasi}`;
        fs.unlinkSync(filepath);
        const filepath2 = `./public/images/${andal.beritaAcara}`;
        fs.unlinkSync(filepath2);
        await Dikplhd.destroy({
            where:{
                id : req.params.id
            }
        });
        res.status(200).json({msg: "Data Deleted Successfuly"});
    } catch (error) {
        console.log(error.message);
    }
}