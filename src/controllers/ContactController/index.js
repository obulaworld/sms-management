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
  '/contacts/signup',
  ContactValidator.checkContactFields,
  ContactController.createUser,
);

contactRouter.post(
  '/contacts/login',
  ContactValidator.checkLoginFields,
  ContactController.loginUser,
);

contactRouter.delete(
  '/contacts/delete/:contactId',
  ContactValidator.checkParam,
  ContactController.deleteUser,
);

contactRouter.get(
  '/contacts/:contactId',
  auth.verifyUserToken,
  ContactValidator.checkParam,
  ContactController.getUser,
);

export default contactRouter;
