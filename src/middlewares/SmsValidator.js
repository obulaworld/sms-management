import CustomError from '../helpers/Error';

export default class SmsValidator {

  /**
     * Check message fields
     *
     * @static
     * @param  {object} req - request object
     * @param  {object} res - response object
     * @param  {object} next - next object
     * @returns {object} response object
     * @memberof SmsValidator     *
     */
  static checkMessageFields(req, res, next) {
    const { message } = req.body;
    if (!message || !message.replace(/\s/g, '').length) {
      CustomError.handleError('Invalid Message Payload', 400, res);
    }
    else{
      next();
    }

  }

 /**
     * Check message route params
     *
     * @static
     * @param  {object} req - request object
     * @param  {object} res - response object
     * @param  {object} next - next object
     * @returns {object} response object
     * @memberof SmsValidator     *
     */
  static checkParam(req, res, next) {
    const { messageId } = req.params;
    if (!Number(messageId)) {
      CustomError.handleError('Invalid message id parameter', 400, res);
    }
    else{
      next();
    }
  }

   /**
     * Check message creation params
     *
     * @static
     * @param  {object} req - request object
     * @param  {object} res - response object
     * @param  {object} next - next object
     * @returns {object} response object
     * @memberof SmsValidator     *
     */
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
