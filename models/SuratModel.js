import { Sequelize } from "sequelize";
import db from "../config/Database.js";

const {DataTypes} = Sequelize;

const Surat = db.define('surat',{
    perihal: DataTypes.STRING,
    tanggalSurat: DataTypes.STRING,
    tanggalTerima: DataTypes.STRING,
    asalSurat: DataTypes.STRING,
    nomorSurat: DataTypes.STRING,
    dispoKabid: DataTypes.STRING,
    surat: DataTypes.STRING,
    urlSurat: DataTypes.STRING,
    dispo: DataTypes.STRING,
    urlDispo: DataTypes.STRING,
},{
    freezeTableName: true
});

export default Surat;

/* (async ()=>{
    await db.sync();
})(); */