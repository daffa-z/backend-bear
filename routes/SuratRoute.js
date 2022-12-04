import  express  from "express";
import { getSurat,
        getSuratById,
        saveSurat,
        updateSurat,
        deleteSurat
} from "../controllers/Surat.js";

const router = express.Router();

router.get('/surat', getSurat);
router.get('/surat/:id', getSuratById);
router.post('/surat', saveSurat);
router.patch('/surat/:id', updateSurat);
router.delete('/surat/:id', deleteSurat);

export default router;