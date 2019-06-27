import CustomError from '../helpers/Error';

export default class SmsValidator {

  static checkMessageFields(req, res, next) {
    const { message } = req.body;
    if (!message || !message.replace(/\s/g, '').length) {
      CustomError.handleError('Invalid Message Payload', 400, res);
    }
    else{
      next();
    }

  }

  static checkParam(req, res, next) {
    const { messageId } = req.params;
    if (!Number(messageId)) {
      CustomError.handleError('Invalid message id parameter', 400, res);
    }
    else{
      next();
    }
  }

  static checkReceiver(req, res, next) {
    const { receiverId } = req.params;
    if (!Number(receiverId)) {
      CustomError.handleError('Invalid receiver id parameter', 400, res);
    }
    else{
      next();
    }
  }
}
