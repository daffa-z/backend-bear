import  express  from "express";
import { getKonsultasi,
        getKonsultasiById,
        saveKonsultasi,
        updateKonsultasi,
        deleteKonsultasi
} from "../controllers/Konsultasi.js";

const router = express.Router();

router.get('/konsultasi', getKonsultasi);
router.get('/konsultasi/:id', getKonsultasiById);
router.post('/konsultasi', saveKonsultasi);
router.patch('/konsultasi/:id', updateKonsultasi);
router.delete('/konsultasi/:id', deleteKonsultasi);

export default router;