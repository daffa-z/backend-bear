import  express  from "express";
import { getD3tlh,
        getD3tlhById,
        saveD3tlh,
        updateD3tlh,
        deleteD3tlh
} from "../controllers/D3tlh.js";

const router = express.Router();

router.get('/d3tlh', getD3tlh);
router.get('/d3tlh/:id', getD3tlhById);
router.post('/d3tlh', saveD3tlh);
router.patch('/d3tlh/:id', updateD3tlh);
router.delete('/d3tlh/:id', deleteD3tlh);

export default router;