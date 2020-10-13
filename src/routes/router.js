import { Router } from 'express';

import userRoutes from './users';

const router = Router();

/* GET users listing. */
router.use('/auth', userRoutes(Router));

export default router;
