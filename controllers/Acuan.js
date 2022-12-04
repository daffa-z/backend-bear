import Acuan from "../models/AcuanModel.js";
import path from "path";
import fs from "fs";
import {Op} from "sequelize";


/* export const getAcuan = async(req, res)=>{
    try {
        const response = await Acuan.findAll();
        res.json(response);
    } catch (error) {
        console.log(error.message);
    }
} */

export const getAcuan = async(req, res)=>{
    const page = parseInt(req.query.page) || 0;
    const limit = parseInt(req.query.limit) || 10;
    const search = req.query.search_query || "";
    const offset = limit * page;
    const totalRows = await Acuan.count({
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
    const result = await Acuan.findAll({
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

export const getAcuanById = async(req, res)=>{
    try {
        const response = await Acuan.findOne({
            where:{
                id : req.params.id
            }
        });
        res.json(response);
    } catch (error) {
        console.log(error.message);
    }
}
export const saveAcuan = async(req, res)=>{
    if(req.files === null) return res.status(400).json({msg: "No File Uploaded"});
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
                await Acuan.create({judul: judul,
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
export const updateAcuan = async(req, res)=>{
    const acuan = await Acuan.findOne({
        where:{
            id : req.params.id
        }
    });
    if(!acuan) return res.status(404).json({msg: "No Data Found"});
    
    let fileName = "";
    let fileName2 = "";
    if(req.files === null){
        fileName = acuan.dokumentasi;
        fileName2 = acuan.beritaAcara;
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

        const filepath = `./public/images/${acuan.dokumentasi}`;
        fs.unlinkSync(filepath);
        const filepath2 = `./public/images/${acuan.beritaAcara}`;
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
    const pemrakarsa = req.body.pemrakarsa;
    const konsultan = req.body.konsultan;
    const keterangan = req.body.keterangan;
    const url = `${req.protocol}://${req.get("host")}/images/${fileName}`;
    const url2 = `${req.protocol}://${req.get("host")}/images/${fileName2}`;
    
    try {
        await Acuan.update({judul: judul,
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
export const deleteAcuan = async(req, res)=>{
    const acuan = await Acuan.findOne({
        where:{
            id : req.params.id
        }
    });
    if(!acuan) return res.status(404).json({msg: "No Data Found"});

    try {
        const filepath = `./public/images/${acuan.dokumentasi}`;
        fs.unlinkSync(filepath);
        const filepath2 = `./public/images/${acuan.beritaAcara}`;
        fs.unlinkSync(filepath2);
        await Acuan.destroy({
            where:{
                id : req.params.id
            }
        });
        res.status(200).json({msg: "Data Deleted Successfuly"});
    } catch (error) {
        console.log(error.message);
    }
}