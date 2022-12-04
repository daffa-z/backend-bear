import Amdal from "../models/AmdalModel.js";
import path from "path";
import fs from "fs";
import {Op} from "sequelize";


/* export const getAmdal = async(req, res)=>{
    try {
        const response = await Amdal.findAll();
        res.json(response);
    } catch (error) {
        console.log(error.message);
    }
} */

export const getAmdal = async(req, res)=>{
    const page = parseInt(req.query.page) || 0;
    const limit = parseInt(req.query.limit) || 10;
    const search = req.query.search_query || "";
    const offset = limit * page;
    const totalRows = await Amdal.count({
        where:{
            [Op.or]: [{judul:{
                [Op.like]: '%'+search+'%'
            }}, {tanggalPenerimaan:{
                [Op.like]: '%'+search+'%'
            }}, {pemrakarsa:{
                [Op.like]: '%'+search+'%'
            }}, {konsultan:{
                [Op.like]: '%'+search+'%'
            }}]
        }
    }); 
    const totalPage = Math.ceil(totalRows / limit);
    const result = await Amdal.findAll({
        where:{
            [Op.or]: [{judul:{
                [Op.like]: '%'+search+'%'
            }}, {tanggalPenerimaan:{
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

export const getAmdalById = async(req, res)=>{
    try {
        const response = await Amdal.findOne({
            where:{
                id : req.params.id
            }
        });
        res.json(response);
    } catch (error) {
        console.log(error.message);
    }
}

export const saveAmdal = (req, res)=>{
    if(req.files === null) return res.status(400).json({msg: "No File Uploaded"});
    const judul = req.body.title;
    const file = req.files.file;
    const tanggalPenerimaan = req.body.tgl;
    const konsultan = req.body.konsul;
    const pemrakarsa = req.body.pemrakarsa;
    const fileSize = file.data.length;
    const ext = path.extname(file.name);
    const fileName = file.md5 + ext;
    const url = `${req.protocol}://${req.get("host")}/images/${fileName}`;
    const allowedType = ['.png','.jpg','.jpeg','.pdf'];

    if(!allowedType.includes(ext.toLowerCase())) return res.status(422).json({msg: "Invalid Images"});
    if(fileSize > 5000000) return res.status(422).json({msg: "Image must be less than 5 MB"});

    file.mv(`./public/images/${fileName}`, async(err)=>{
        if(err) return res.status(500).json({msg: err.message});
        try {
            await Amdal.create({judul: judul, tanggalPenerimaan: tanggalPenerimaan, pemrakarsa: pemrakarsa, konsultan: konsultan, namaFile: fileName, url: url});
            res.status(201).json({msg: "Product Created Successfuly"});
        } catch (error) {
            console.log(error.message);
        }
    })

}

export const updateAmdal = async(req, res)=>{
    const amdal = await Amdal.findOne({
        where:{
            id : req.params.id
        }
    });
    if(!amdal) return res.status(404).json({msg: "No Data Found"});
    
    let fileName = "";
    if(req.files === null){
        fileName = amdal.namaFile;
    }else{
        const file = req.files.file;
        const fileSize = file.data.length;
        const ext = path.extname(file.name);
        fileName = file.md5 + ext;
        const allowedType = ['.png','.jpg','.jpeg','.pdf'];

        if(!allowedType.includes(ext.toLowerCase())) return res.status(422).json({msg: "Invalid Images"});
        if(fileSize > 5000000) return res.status(422).json({msg: "Image must be less than 5 MB"});

        const filepath = `./public/images/${amdal.namaFile}`;
        fs.unlinkSync(filepath);

        file.mv(`./public/images/${fileName}`, (err)=>{
            if(err) return res.status(500).json({msg: err.message});
        });
    }
    const judul = req.body.title;
    const tanggalPenerimaan = req.body.tgl;
    const pemrakarsa = req.body.pemrakarsa;
    const konsultan = req.body.konsul;
    const url = `${req.protocol}://${req.get("host")}/images/${fileName}`;
    
    try {
        await Amdal.update({judul: judul, tanggalPenerimaan: tanggalPenerimaan, pemrakarsa: pemrakarsa, konsultan: konsultan, namaFile: fileName, url: url},{
            where:{
                id: req.params.id
            }
        });
        res.status(200).json({msg: "Amdal Updated Successfuly"});
    } catch (error) {
        console.log(error.message);
    }
}

export const deleteAmdal = async(req, res)=>{
    const amdal = await Amdal.findOne({
        where:{
            id : req.params.id
        }
    });
    if(!amdal) return res.status(404).json({msg: "No Data Found"});

    try {
        const filepath = `./public/images/${amdal.namaFile}`;
        fs.unlinkSync(filepath);
        await Amdal.destroy({
            where:{
                id : req.params.id
            }
        });
        res.status(200).json({msg: "Amdal Deleted Successfuly"});
    } catch (error) {
        console.log(error.message);
    }
}