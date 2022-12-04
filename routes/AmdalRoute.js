import  express  from "express";
import { getAmdal,
        getAmdalById,
        saveAmdal,
        updateAmdal,
        deleteAmdal
} from "../controllers/Amdal.js";

const router = express.Router();

router.get('/amdal', getAmdal);
router.get('/amdal/:id', getAmdalById);
router.post('/amdal', saveAmdal);
router.patch('/amdal/:id', updateAmdal);
router.delete('/amdal/:id', deleteAmdal);

export default router;