import express  from 'express';
import { getDplh,
        getDplhById,
        saveDplh,
        updateDplh,
        deleteDplh
} from '../controllers/Dplh.js'

const router = express.Router();

router.get('/dplh', getDplh);
router.get('/dplh/:id', getDplhById);
router.post('/dplh', saveDplh);
router.patch('/dplh/:id', updateDplh);
router.delete('/dplh/:id', deleteDplh);

export default router;