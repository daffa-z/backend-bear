import { Sequelize } from "sequelize";
import db from "../config/Database.js";

const {DataTypes} = Sequelize;

const Acuan = db.define('acuan',{
    judul: DataTypes.STRING,
    tanggalPelaksanaan: DataTypes.STRING,
    pemrakarsa: DataTypes.STRING,
    konsultan: DataTypes.STRING,
    dokumentasi: DataTypes.STRING,
    urlDokumentasi: DataTypes.STRING,
    beritaAcara: DataTypes.STRING,
    urlBerita: DataTypes.STRING,
    keterangan: DataTypes.STRING
},{
    freezeTableName: true
});

export default Acuan;

/* (async ()=>{
    await db.sync();
})(); */