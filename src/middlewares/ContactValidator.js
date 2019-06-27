import CustomError from '../helpers/Error';

/**
 * Handles sms validations
 *
 * @exports
 * @class SmsValidator
 */
export default class ContactValidator {
  /**
     * Check contact fields
     *
     * @static
     * @param  {object} req - request object
     * @param  {object} res - response object
     * @param  {object} next - next object
     * @returns {object} response object
     * @memberof ContactValidator     *
     */
  static checkContactFields(req, res, next) {
    const { name, password, phoneNumber } = req.body;
    if ((!name || !name.replace(/\s/g, '').length) || (!password || !password.replace(/\s/g, '').length) || (!phoneNumber || !phoneNumber.replace(/\s/g, '').length)) {
      CustomError.handleError('Invalid Payloads', 400, res);
    }
    else{
      next();
    }

  }

   /**
     * Check Login fields
     *
     * @static
     * @param  {object} req - request object
     * @param  {object} res - response object
     * @param  {object} next - next object
     * @returns {object} response object
     * @memberof ContactValidator     *
     */
  static checkLoginFields(req, res, next) {
    const { password, phoneNumber } = req.body;
    if (!password.replace(/\s/g, '').length || !phoneNumber.replace(/\s/g, '').length) {
      CustomError.handleError('Invalid Payloads', 400, res);
    }
    else{
      next();
    }

  }

   /**
     * Check contact route params
     *
     * @static
     * @param  {object} req - request object
     * @param  {object} res - response object
     * @param  {object} next - next object
     * @returns {object} response object
     * @memberof ContactValidator     *
     */
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
