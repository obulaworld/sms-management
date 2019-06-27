import CustomError from '../helpers/Error';

export default class SmsValidator {
  static checkContactFields(req, res, next) {
    const { name, password, phoneNumber } = req.body;
    if ((!name || !name.replace(/\s/g, '').length) || (!password || !password.replace(/\s/g, '').length) || (!phoneNumber || !phoneNumber.replace(/\s/g, '').length)) {
      CustomError.handleError('Invalid Payloads', 400, res);
    }
    else{
      next();
    }

  }

  static checkLoginFields(req, res, next) {
    const { password, phoneNumber } = req.body;
    if (!password.replace(/\s/g, '').length || !phoneNumber.replace(/\s/g, '').length) {
      CustomError.handleError('Invalid Payloads', 400, res);
    }
    else{
      next();
    }

  }

  static checkParam(req, res, next) {
    const { contactId } = req.params;
    if (!Number(contactId)) {
      CustomError.handleError('Invalid contact id parameter', 400, res);
    }
    else{
      next();
    }
  }
}
