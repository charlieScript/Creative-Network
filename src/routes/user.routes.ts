import { Router} from 'express'
import { createArticle, followUser, getAllArticle, getUser, login, signup} from '../requestHandler/user.handler'
import { protect } from "../middleware/protect.middleware";

const router = Router()

router.post('/api/users/signup', signup)
router.post('/api/users/login', login)
router.get('/api/users/:username', getUser)


router.post('/api/articles/create',protect, createArticle)
router.get('/api/articles', getAllArticle)

router.post('/api/profiles/:id', protect, followUser)


export default router