import express  from 'express';
import { ReviewControllers } from './review.controller';

const router = express.Router();

router.post('/reviews',ReviewControllers.createReview);

export const ReviewRoutes = router;