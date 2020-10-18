import { Router } from 'express';

import userRoutes from './users';
import entryRoutes from './entry';
import middleware from '../middleware';
import validations from '../validations';

const router = Router();
const [validate, handleError] = validations.user.jwt;

router.use('/auth', userRoutes(Router));
router.use(validate, handleError);
router.use(middleware.user.findById);
router.use('/entries', entryRoutes(Router));

export default router;
