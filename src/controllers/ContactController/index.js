import express from 'express';
import ContactController from './ContactController';
import ContactValidator from '../../middlewares/ContactValidator';
import auth from '../../middlewares/TokenValidator';

const contactRouter = express.Router();

contactRouter.get(
  '/',
  ContactController.home,
);

contactRouter.post(
  '/contact/signup',
  ContactValidator.checkContactFields,
  ContactController.createUser,
);

contactRouter.post(
  '/contact/login',
  ContactValidator.checkLoginFields,
  ContactController.loginUser,
);

contactRouter.delete(
  '/contact/delete/:contactId',
  ContactValidator.checkParam,
  ContactController.deleteUser,
);

contactRouter.get(
  '/contact/:contactId',
  auth.verifyUserToken,
  ContactValidator.checkParam,
  ContactController.getUser,
);

export default contactRouter;
