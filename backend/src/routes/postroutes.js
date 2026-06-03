import { Router } from 'express';
import {jwtmiddleware} from '../middleware.js/authmiddleware.js';
import {
  createpostHandler,
  getfeed,
  togglelike,
  addComment
} from '../controllers/postcontroller.js';

const router = Router();

router.get('/', getfeed);
router.post('/', jwtmiddleware, createpostHandler);
router.put('/:id/like', jwtmiddleware, togglelike);
router.post('/:id/comment', jwtmiddleware, addComment);

export default router;