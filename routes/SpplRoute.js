import express  from 'express';
import { getSppl,
        getSpplById,
        saveSppl,
        updateSppl,
        deleteSppl
} from '../controllers/Sppl.js'

const router = express.Router();

router.get('/sppl', getSppl);
router.get('/sppl/:id', getSpplById);
router.post('/sppl', saveSppl);
router.patch('/sppl/:id', updateSppl);
router.delete('/sppl/:id', deleteSppl);

export default router;