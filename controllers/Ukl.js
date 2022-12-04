import Ukl from "../models/UklModel.js";
import path from "path";
import fs from "fs";
import {Op} from "sequelize";

export const getUkl = async(req, res)=>{
    const page = parseInt(req.query.page) || 0;
    const limit = parseInt(req.query.limit) || 10;
    const search = req.query.search_query || "";
    const offset = limit * page;
    const totalRows = await Ukl.count({
        where:{
            [Op.or]: [{nomor:{
                [Op.like]: '%'+search+'%'
            }}, {status:{
                [Op.like]: '%'+search+'%'
            }}, {judul:{
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
    const result = await Ukl.findAll({
        where:{
            [Op.or]: [{nomor:{
                [Op.like]: '%'+search+'%'
            }}, {status:{
                [Op.like]: '%'+search+'%'
            }}, {judul:{
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

export const getUklById = async(req, res)=>{
    try {
        const response = await Ukl.findOne({
            where:{
                id : req.params.id
            }
        });
        res.json(response);
    } catch (error) {
        console.log(error.message);
    }
}

export const saveUkl = async(req, res)=>{
    if(req.files === null) return res.status(400).json({msg: "No File Uploaded"});
    const nomor = req.body.nomor;
    const status = req.body.status;
    const judul = req.body.judul;
    const file = req.files.file;
    const file2 = req.files.file2;
    const tanggalPelaksanaan = req.body.tanggalPelaksanaan;
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
                await Ukl.create({nomor: nomor,
                    status: status,
                    judul: judul,
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

export const updateUkl = async(req, res)=>{
    
    const ukl = await Ukl.findOne({
        where:{
            id : req.params.id
        }
    });
    if(!ukl) return res.status(404).json({msg: "No Data Found"});
    
    let fileName = "";
    let fileName2 = "";
    if(req.files === null){
        fileName = ukl.dokumentasi;
        fileName2 = ukl.beritaAcara;
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

        const filepath = `./public/images/${ukl.dokumentasi}`;
        fs.unlinkSync(filepath);
        const filepath2 = `./public/images/${ukl.beritaAcara}`;
        fs.unlinkSync(filepath2);

        file.mv(`./public/images/${fileName}`, (err)=>{
            if(err) return res.status(500).json({msg: err.message});
        });
        file2.mv(`./public/images/${fileName2}`, (err)=>{
            if(err) return res.status(500).json({msg: err.message});
        });
    }
    const nomor = req.body.nomor;
    const status = req.body.status;
    const judul = req.body.judul;
    const tanggalPelaksanaan = req.body.tanggalPelaksanaan;
    const pemrakarsa = req.body.pemrakarsa;
    const konsultan = req.body.konsultan;
    const keterangan = req.body.keterangan;
    const url = `${req.protocol}://${req.get("host")}/images/${fileName}`;
    const url2 = `${req.protocol}://${req.get("host")}/images/${fileName2}`;
    
    try {
        await Ukl.update({nomor: nomor,
            status: status,
            judul: judul,
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

export const deleteUkl = async(req, res)=>{
    const ukl = await Ukl.findOne({
        where:{
            id : req.params.id
        }
    });
    if(!ukl) return res.status(404).json({msg: "No Data Found"});

    try {
        const filepath = `./public/images/${ukl.dokumentasi}`;
        fs.unlinkSync(filepath);
        const filepath2 = `./public/images/${ukl.beritaAcara}`;
        fs.unlinkSync(filepath2);
        await Ukl.destroy({
            where:{ 
                id : req.params.id
            }
        });
        res.status(200).json({msg: "Data Deleted Successfuly"});
    } catch (error) {
        console.log(error.message);
    }
}