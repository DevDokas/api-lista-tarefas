import { Router } from 'express';
import UserController from '../controllers/UserController.js';
import loginRequired from '../middlewares/loginRequired.js';

const router = new Router();

// Não deveria existir
router.get('/', loginRequired, UserController.index); // Lista usuários
router.get('/:id', loginRequired, UserController.show); // Lista usuário

router.post('/register', UserController.create);
router.put('/:id', loginRequired, UserController.update);
router.delete('/:id', loginRequired, UserController.delete);

export default router;
