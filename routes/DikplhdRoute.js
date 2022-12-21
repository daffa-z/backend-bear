import express  from 'express';
import { getDikplhd,
        getDikplhdById,
        saveDikplhd,
        updateDikplhd,
        deleteDikplhd
} from '../controllers/Dikplhd.js'

const router = express.Router();

router.get('/dikplhd', getDikplhd);
router.get('/dikplhd/:id', getDikplhdById);
router.post('/dikplhd', saveDikplhd);
router.patch('/dikplhd/:id', updateDikplhd);
router.delete('/dikplhd/:id', deleteDikplhd);

export default router;