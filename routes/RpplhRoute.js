import express  from 'express';
import { getRpplh,
        getRpplhById,
        saveRpplh,
        updateRpplh,
        deleteRpplh
} from '../controllers/Rpplh.js'

const router = express.Router();

router.get('/rpplh', getRpplh);
router.get('/rpplh/:id', getRpplhById);
router.post('/rpplh', saveRpplh);
router.patch('/rpplh/:id', updateRpplh);
router.delete('/rpplh/:id', deleteRpplh);

export default router;