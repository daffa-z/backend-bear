import  express  from "express";
import { getAcuan,
        getAcuanById,
        saveAcuan,
        updateAcuan,
        deleteAcuan
} from "../controllers/Acuan.js"
const router = express.Router();

router.get('/acuan', getAcuan);
router.get('/acuan/:id', getAcuanById);
router.post('/acuan', saveAcuan);
router.patch('/acuan/:id', updateAcuan);
router.delete('/acuan/:id', deleteAcuan);

export default router;