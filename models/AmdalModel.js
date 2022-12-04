import { Sequelize } from "sequelize";
import db from "../config/Database.js";

const {DataTypes} = Sequelize;

const Amdal = db.define('amdal',{
    judul: DataTypes.STRING,
    tanggalPenerimaan: DataTypes.STRING,
    pemrakarsa: DataTypes.STRING,
    konsultan: DataTypes.STRING,
    namaFile: DataTypes.STRING,
    url: DataTypes.STRING
},{
    freezeTableName: true
});

export default Amdal;

/* (async ()=>{
    await db.sync();
})(); */