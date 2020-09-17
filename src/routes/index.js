import { Router } from 'express';

const router = Router();

/* GET users listing. */
router.get('/', (req, res) => {
  res.send({ data: 'respond with a resource at endpoint root' });
});

export default router;
