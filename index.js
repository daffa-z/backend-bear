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
import DikplhdRoute from "./routes/DikplhdRoute.js";
import AuthRoute from "./routes/AuthRoute.js";
import AcuanRoute from "./routes/AcuanRoute.js";
import D3tlhRoute from "./routes/D3tlhRoute.js";
import SuratRoute from "./routes/SuratRoute.js";
import SuratKeluarRoute from "./routes/SuratKeluarRoute.js";
import TamuRoute from "./routes/TamuRoute.js";
import UklRoute from "./routes/UklRoute.js";
import DelhRoute from "./routes/DelhRoute.js";
import DplhRoute from "./routes/DplhRoute.js";
import SpplRoute from "./routes/SpplRoute.js";
import RpplhRoute from "./routes/RpplhRoute.js";
import IklhRoute from "./routes/IklhRoute.js";

dotenv.config();

const app = express();

const sessionStore = SequelizeStore(session.Store);

const store = new sessionStore({
    db: db
});

(async()=>{
    await db.sync();
})();


app.use(cors());
app.use(express.json());
app.use(fileUpload());
app.use(express.static("public"));
app.use(UserRoute);
app.use(ProductRoute);
app.use(DelhRoute);
app.use(SpplRoute);
app.use(DplhRoute);
app.use(UklRoute);
app.use(AuthRoute);
app.use(AmdalRoute);
app.use(DikplhdRoute);
app.use(AcuanRoute);
app.use(D3tlhRoute);
app.use(SuratRoute);
app.use(SuratKeluarRoute);
app.use(TamuRoute);
app.use(IklhRoute);
app.use(RpplhRoute);

/* store.sync(); */

app.get("/", (req, res) => {
    res.send("Express on Vercel");
  });
  
app.listen(process.env.PORT,()=>{
    console.log('Server Up and running ....');
});

