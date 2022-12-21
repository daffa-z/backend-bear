import express  from 'express';
import { getIklh,
        getIklhById,
        saveIklh,
        updateIklh,
        deleteIklh
} from '../controllers/Iklh.js'

const router = express.Router();

router.get('/iklh', getIklh);
router.get('/iklh/:id', getIklhById);
router.post('/iklh', saveIklh);
router.patch('/iklh/:id', updateIklh);
router.delete('/iklh/:id', deleteIklh);

export default router;