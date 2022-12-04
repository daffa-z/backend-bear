import { Sequelize } from "sequelize";
import db from "../config/Database.js";

const {DataTypes} = Sequelize;

const SuratKeluar = db.define('suratkeluar',{
    perihal: DataTypes.STRING,
    tanggalSurat: DataTypes.STRING,
    tanggalKirim: DataTypes.STRING,
    tujuanSurat: DataTypes.STRING,
    nomorSurat: DataTypes.STRING,
    surat: DataTypes.STRING,
    urlSurat: DataTypes.STRING,
    bukti: DataTypes.STRING,
    urlBukti: DataTypes.STRING,
},{
    freezeTableName: true
});

export default SuratKeluar;

(async ()=>{
    await db.sync();
})();