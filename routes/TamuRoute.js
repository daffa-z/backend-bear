import  express  from "express";
import { getTamu,
        getTamuById,
        saveTamu,
        updateTamu,
        deleteTamu
} from "../controllers/Tamu.js";

const router = express.Router();

router.get('/tamu', getTamu);
router.get('/tamu/:id', getTamuById);
router.post('/tamu', saveTamu);
router.patch('/tamu/:id', updateTamu);
router.delete('/tamu/:id', deleteTamu);

export default router;