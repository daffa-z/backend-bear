import { Sequelize} from "sequelize";

const db = new Sequelize ('railway', 'root', 'd8yFhl61Z7q2Sljd3kb5', {
    host: "containers-us-west-140.railway.app",
    dialect: "mysql",
    port: "6881",
});

export default db;
