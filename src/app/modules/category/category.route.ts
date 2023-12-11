import  express  from 'express';
import { CategoryControllers } from './category.controller';

const router = express.Router();

router.post('/categories',CategoryControllers.createCategory);

router.get('/categories',CategoryControllers.getAllCategory);

export const CategoryRoutes = router;