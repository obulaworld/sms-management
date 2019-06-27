import express from 'express';
import SmsController from './SmsController';
import SmsValidator from '../../middlewares/SmsValidator';
import auth from '../../middlewares/TokenValidator';

const SmsRouter = express.Router();

SmsRouter.get(
  '/messages/sent',
  auth.verifyUserToken,
  SmsController.getSentMessages
);

SmsRouter.get(
  '/messages/received',
  auth.verifyUserToken,
  SmsController.getReceivedMessages
);

SmsRouter.get(
  '/messages/:messageId',
  auth.verifyUserToken,
  SmsValidator.checkParam,
  SmsController.getMessage
);

SmsRouter.post(
  '/messages/:receiverId',
  auth.verifyUserToken,
  SmsValidator.checkReceiver,
  SmsValidator.checkMessageFields,
  SmsController.sendMessage
);

export default SmsRouter;
