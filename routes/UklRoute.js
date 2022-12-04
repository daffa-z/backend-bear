import express  from 'express';
import { getUkl,
        getUklById,
        saveUkl,
        updateUkl,
        deleteUkl
} from '../controllers/Ukl.js'

const router = express.Router();

router.get('/uklupl', getUkl);
router.get('/uklupl/:id', getUklById);
router.post('/uklupl', saveUkl);
router.patch('/uklupl/:id', updateUkl);
router.delete('/uklupl/:id', deleteUkl);

export default router;