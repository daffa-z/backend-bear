import Tamu from "../models/TamuModel.js";
import path from "path";
import fs from "fs";
import {Op} from "sequelize";


/* export const getTamu = async (req, res)=>{
    try {
        const response = await Tamu.findAll();
        res.json(response);
    } catch (error) {
        console.log(error.message);
    }
} */
export const getTamu = async(req, res)=>{
    const page = parseInt(req.query.page) || 0;
    const limit = parseInt(req.query.limit) || 10;
    const search = req.query.search_query || "";
    const offset = limit * page;
    const totalRows = await Tamu.count({
        where:{
            [Op.or]: [{nama:{
                [Op.like]: '%'+search+'%'
            }}, {tgl:{
                [Op.like]: '%'+search+'%'
            }}, {jkel:{
                [Op.like]: '%'+search+'%'
            }}, {instansiAsal:{
                [Op.like]: '%'+search+'%'
            }}, {tujuan:{
                [Op.like]: '%'+search+'%'
            }}, {pejabat:{
                [Op.like]: '%'+search+'%'
            }}]
        }
    }); 
    const totalPage = Math.ceil(totalRows / limit);
    const result = await Tamu.findAll({
        where:{
            [Op.or]: [{nama:{
                [Op.like]: '%'+search+'%'
            }}, {tgl:{
                [Op.like]: '%'+search+'%'
            }}, {jkel:{
                [Op.like]: '%'+search+'%'
            }}, {instansiAsal:{
                [Op.like]: '%'+search+'%'
            }}, {tujuan:{
                [Op.like]: '%'+search+'%'
            }}, {pejabat:{
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

export const getTamuById = async (req, res)=>{
    try {
        const response = await Tamu.findOne({
            where:{
                id : req.params.id
            }
        });
        res.json(response);
    } catch (error) {
        console.log(error.message);
    }
}
export const saveTamu = async (req, res)=>{
 if(req.files === null) return res.status(400).json({msg: "No File Uploaded"});
    const file = req.files.file;
    const file2 = req.files.file2;
    const nama = req.body.nama;
    const tgl = req.body.tgl;
    const instansiAsal = req.body.instansiAsal;
    const tujuan = req.body.tujuan;
    const jkel = req.body.jkel;
    const pejabat = req.body.pejabat;
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
                await Tamu.create({nama: nama,
                    tgl: tgl,
                    instansiAsal: instansiAsal,
                    tujuan: tujuan,
                    jkel: jkel,
                    pejabat: pejabat,
                    tamu: fileName,
                    urlTamu: url,
                    kesan: fileName2,
                    urlKesan: url2
                });
                res.status(201).json({msg: "Data Created Successfuly"});
            } catch (error) {
                console.log(error.message);
            }
        })
    })
}
export const updateTamu = async (req, res)=>{
    const tamu = await Tamu.findOne({
        where:{
            id : req.params.id
        }
    });
    if(!tamu) return res.status(404).json({msg: "No Data Found"});
    
    let fileName = "";
    let fileName2 = "";
    if(req.files === null){
        fileName = tamu.tamu;
        fileName2 = tamu.dispo;
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

        const filepath = `./public/images/${tamu.tamu}`;
        fs.unlinkSync(filepath);
        const filepath2 = `./public/images/${tamu.dispo}`;
        fs.unlinkSync(filepath2);

        file.mv(`./public/images/${fileName}`, (err)=>{
            if(err) return res.status(500).json({msg: err.message});
        });
        file2.mv(`./public/images/${fileName2}`, (err)=>{
            if(err) return res.status(500).json({msg: err.message});
        });
    }
    const nama = req.body.nama;
    const tgl = req.body.tgl;
    const instansiAsal = req.body.instansiAsal;
    const tujuan = req.body.tujuan;
    const jkel = req.body.jkel;
    const pejabat = req.body.pejabat;
    const url = `${req.protocol}://${req.get("host")}/images/${fileName}`;
    const url2 = `${req.protocol}://${req.get("host")}/images/${fileName2}`;
    
    try {
        await Tamu.update({nama: nama,
            tgl: tgl,
            instansiAsal: instansiAsal,
            tujuan: tujuan,
            jkel: jkel,
            pejabat: pejabat,
            tamu: fileName,
            urlTamu: url,
            kesan: fileName2,
            urlKesan: url2}
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
export const deleteTamu = async (req, res)=>{
    const tamu = await Tamu.findOne({
        where:{
            id : req.params.id
        }
    });
    if(!tamu) return res.status(404).json({msg: "No Data Found"});

    try {
        const filepath = `./public/images/${tamu.tamu}`;
        fs.unlinkSync(filepath);
        const filepath2 = `./public/images/${tamu.kesan}`;
        fs.unlinkSync(filepath2);
        await tamu.destroy({
            where:{
                id : req.params.id
            }
        });
        res.status(200).json({msg: "Data Deleted Successfuly"});
    } catch (error) {
        console.log(error.message);
    }
}