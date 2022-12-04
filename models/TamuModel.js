import { Sequelize } from "sequelize";
import db from "../config/Database.js";

const {DataTypes} = Sequelize;

const Tamu = db.define('tamu',{
    nama: DataTypes.STRING,
    tgl: DataTypes.STRING,
    jkel: DataTypes.STRING,
    instansiAsal: DataTypes.STRING,
    tujuan: DataTypes.STRING,
    pejabat: DataTypes.STRING,
    tamu: DataTypes.STRING,
    urlTamu: DataTypes.STRING,
    kesan: DataTypes.STRING,
    urlKesan: DataTypes.STRING,
},{
    freezeTableName: true
});

export default Tamu;

(async ()=>{
    await db.sync();
})();