import express  from 'express';
import { getDelh,
        getDelhById,
        saveDelh,
        updateDelh,
        deleteDelh
} from '../controllers/Delh.js'

const router = express.Router();

router.get('/delh', getDelh);
router.get('/delh/:id', getDelhById);
router.post('/delh', saveDelh);
router.patch('/delh/:id', updateDelh);
router.delete('/delh/:id', deleteDelh);

export default router;