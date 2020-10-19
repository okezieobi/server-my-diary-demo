import { Router } from 'express';

import userRoutes from './users';
import entryRoutes from './entry';
import middleware from '../middleware';
import validations from '../validations';

const router = Router();

router.use('/auth', userRoutes(Router));
router.use([...[validations.user.jwt], middleware.user.findById]);
router.use('/entries', entryRoutes(Router));

export default router;
