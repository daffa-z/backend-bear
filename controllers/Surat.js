import Surat from "../models/SuratModel.js";
import path from "path";
import fs from "fs";
import {Op} from "sequelize";

/* export const getSurat = async(req, res)=>{
    try {
        const response = await Surat.findAll();
        res.json(response);
    } catch (error) {
        console.log(error.message);
    }
} */
export const getSurat = async(req, res)=>{
    const page = parseInt(req.query.page) || 0;
    const limit = parseInt(req.query.limit) || 10;
    const search = req.query.search_query || "";
    const offset = limit * page;
    const totalRows = await Surat.count({
        where:{
            [Op.or]: [{perihal:{
                [Op.like]: '%'+search+'%'
            }}, {tanggalSurat:{
                [Op.like]: '%'+search+'%'
            }}, {tanggalTerima:{
                [Op.like]: '%'+search+'%'
            }}, {asalSurat:{
                [Op.like]: '%'+search+'%'
            }}, {nomorSurat:{
                [Op.like]: '%'+search+'%'
            }}, {dispoKabid:{
                [Op.like]: '%'+search+'%'
            }}]
        }
    }); 
    const totalPage = Math.ceil(totalRows / limit);
    const result = await Surat.findAll({
        where:{
            [Op.or]: [{perihal:{
                [Op.like]: '%'+search+'%'
            }}, {tanggalSurat:{
                [Op.like]: '%'+search+'%'
            }}, {tanggalTerima:{
                [Op.like]: '%'+search+'%'
            }}, {asalSurat:{
                [Op.like]: '%'+search+'%'
            }}, {nomorSurat:{
                [Op.like]: '%'+search+'%'
            }},  {dispoKabid:{
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
export const getSuratById = async(req, res)=>{
    try {
        const response = await Surat.findOne({
            where:{
                id : req.params.id
            }
        });
        res.json(response);
    } catch (error) {
        console.log(error.message);
    }
}
export const saveSurat = async(req, res)=>{
    if(req.files === null) return res.status(400).json({msg: "No File Uploaded"});
    const perihal = req.body.perihal;
    const file = req.files.file;
    const file2 = req.files.file2;
    const tanggalSurat = req.body.tanggalSurat;
    const tanggalTerima = req.body.tanggalTerima;
    const asalSurat = req.body.asalSurat;
    const nomorSurat = req.body.nomorSurat;
    const dispoKabid = req.body.dispoKabid;
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
                await Surat.create({perihal: perihal,
                    tanggalSurat: tanggalSurat,
                    tanggalTerima: tanggalTerima,
                    asalSurat: asalSurat,
                    nomorSurat: nomorSurat,
                    dispoKabid: dispoKabid,
                    surat: fileName,
                    urlSurat: url,
                    dispo: fileName2,
                    urlDispo: url2
                });
                res.status(201).json({msg: "Data Created Successfuly"});
            } catch (error) {
                console.log(error.message);
            }
        })
    })
}
export const updateSurat = async(req, res)=>{
    const surat = await Surat.findOne({
        where:{
            id : req.params.id
        }
    });
    if(!surat) return res.status(404).json({msg: "No Data Found"});
    
    let fileName = "";
    let fileName2 = "";
    if(req.files === null){
        fileName = surat.surat;
        fileName2 = surat.dispo;
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

        const filepath = `./public/images/${surat.surat}`;
        fs.unlinkSync(filepath);
        const filepath2 = `./public/images/${surat.dispo}`;
        fs.unlinkSync(filepath2);

        file.mv(`./public/images/${fileName}`, (err)=>{
            if(err) return res.status(500).json({msg: err.message});
        });
        file2.mv(`./public/images/${fileName2}`, (err)=>{
            if(err) return res.status(500).json({msg: err.message});
        });
    }
    const perihal = req.body.perihal;
    const tanggalSurat = req.body.tanggalSurat;
    const tanggalTerima = req.body.tanggalTerima;
    const asalSurat = req.body.asalSurat;
    const nomorSurat = req.body.nomorSurat;
    const dispoKabid = req.body.dispoKabid;
    const url = `${req.protocol}://${req.get("host")}/images/${fileName}`;
    const url2 = `${req.protocol}://${req.get("host")}/images/${fileName2}`;
    
    try {
        await Surat.update({perihal: perihal,
            tanggalSurat: tanggalSurat,
            tanggalTerima: tanggalTerima,
            asalSurat: asalSurat,
            nomorSurat: nomorSurat,
            asalSurat: asalSurat,
            dispoKabid: dispoKabid,
            surat: fileName,
            urlSurat: url,
            dispo: fileName2,
            urlDispo: url2}
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
export const deleteSurat = async(req, res)=>{
    const surat = await Surat.findOne({
        where:{
            id : req.params.id
        }
    });
    if(!surat) return res.status(404).json({msg: "No Data Found"});

    try {
        const filepath = `./public/images/${surat.surat}`;
        fs.unlinkSync(filepath);
        const filepath2 = `./public/images/${surat.dispo}`;
        fs.unlinkSync(filepath2);
        await surat.destroy({
            where:{
                id : req.params.id
            }
        });
        res.status(200).json({msg: "Data Deleted Successfuly"});
    } catch (error) {
        console.log(error.message);
    }
}