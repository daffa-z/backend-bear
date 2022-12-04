import  express  from "express";
import { verifyUser, adminOnly } from "../middleware/AuthUser.js";
import { getUserById,
        getUsers,
        createUser,
        updateUser,
        deleteUser,    
} from "../controllers/Users.js";

const router = express.Router();

router.get('/users', verifyUser, adminOnly, getUsers);
router.get('/users/:id', verifyUser, adminOnly, getUserById);
router.post('/users', verifyUser, adminOnly, createUser);
router.patch('/users/:id', verifyUser, adminOnly, updateUser);
router.delete('/users/:id', verifyUser, adminOnly, deleteUser);

export default router;