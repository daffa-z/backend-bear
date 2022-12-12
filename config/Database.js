import { Sequelize} from "sequelize";

const db = new Sequelize ('railway', 'root', 'zeOWEiZ1uEX1CmOFJDTO', {
    host: "containers-us-west-156.railway.app",
    dialect: "mysql",
    port: "6897"
});

export default db;
