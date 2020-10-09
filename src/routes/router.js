import { Router } from 'express';

import userRoute from './users';

const router = Router();

/* GET users listing. */
router.use('/auth', userRoute);

export default router;
