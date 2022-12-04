import express from "express";
import cors from "cors";
import session from "express-session";
import dotenv from "dotenv";
import db from "./config/Database.js";
import fileUpload from "express-fileupload";
import SequelizeStore from "connect-session-sequelize";
import UserRoute from "./routes/UserRoute.js";
import ProductRoute from "./routes/ProductRoute.js";
import AmdalRoute from "./routes/AmdalRoute.js";
import AndalRoute from "./routes/AndalRoute.js";
import AuthRoute from "./routes/AuthRoute.js";
import AcuanRoute from "./routes/AcuanRoute.js";
import KonsultasiRoute from "./routes/KonsultasiRoute.js";
import SuratRoute from "./routes/SuratRoute.js";
import SuratKeluarRoute from "./routes/SuratKeluarRoute.js";
import TamuRoute from "./routes/TamuRoute.js";
import UklRoute from "./routes/UklRoute.js";
import DelhRoute from "./routes/DelhRoute.js";
import DplhRoute from "./routes/DplhRoute.js";

dotenv.config();

const app = express();

const sessionStore = SequelizeStore(session.Store);

const store = new sessionStore({
    db: db
});

/* (async()=>{
    await db.sync();
})(); */

app.use(session({
    secret: process.env.SESS_SECRET,
    resave: false,
    saveUninitialized: true,
    store: store,
    cookie:{
        secure: 'auto'
    }
}))
app.use(cors({
    credentials: true,
    origin: 'http://localhost:3000'
}));
app.use(express.json());
app.use(fileUpload());
app.use(express.static("public"));
app.use(UserRoute);
app.use(ProductRoute);
app.use(DelhRoute);
app.use(DplhRoute);
app.use(UklRoute);
app.use(AuthRoute);
app.use(AmdalRoute);
app.use(AndalRoute);
app.use(AcuanRoute);
app.use(KonsultasiRoute);
app.use(SuratRoute);
app.use(SuratKeluarRoute);
app.use(TamuRoute);

/* store.sync(); */

app.listen(process.env.APP_PORT,()=>{
    console.log('Server Up and running ....');
});

