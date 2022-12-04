import express  from 'express';
import { getAndal,
        getAndalById,
        saveAndal,
        updateAndal,
        deleteAndal
} from '../controllers/Andal.js'

const router = express.Router();

router.get('/andal', getAndal);
router.get('/andal/:id', getAndalById);
router.post('/andal', saveAndal);
router.patch('/andal/:id', updateAndal);
router.delete('/andal/:id', deleteAndal);

export default router;