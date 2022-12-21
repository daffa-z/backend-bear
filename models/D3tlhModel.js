import { Sequelize } from "sequelize";
import db from "../config/Database.js";

const {DataTypes} = Sequelize;

const D3tlh = db.define('d3tlh',{
    nomor: DataTypes.STRING,
    judul: DataTypes.STRING,
    status: DataTypes.STRING,
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

export default D3tlh;


(async ()=>{
    await db.sync();
})();