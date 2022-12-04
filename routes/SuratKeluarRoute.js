import  express  from "express";
import { getSurat,
        getSuratById,
        saveSurat,
        updateSurat,
        deleteSurat
} from "../controllers/SuratKeluar.js";

const router = express.Router();

router.get('/suratkeluar', getSurat);
router.get('/suratkeluar/:id', getSuratById);
router.post('/suratkeluar', saveSurat);
router.patch('/suratkeluar/:id', updateSurat);
router.delete('/suratkeluar/:id', deleteSurat);

export default router;