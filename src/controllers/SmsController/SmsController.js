import models from '../../database/models';
import CustomError from '../../helpers/Error';

/**
 * Handles operations on sms routes
 *
 * @exports
 * @class SmsController
 */
export default class SmsController {

  /**
     * Creats a message
     *
     * @static
     * @param  {object} req - request object
     * @param  {object} res - response object
     * @returns {object} response object
     * @memberof SmsController     *
     */
  static async sendMessage(req, res) {
    try {
      const { phoneNumber } = req.params;
      const { message } = req.body;
      const { id } = req.user;

        const foundReceiver = await models.Contact.findOne({
          where: { phone_number: phoneNumber }
        });

        if(!foundReceiver){
          CustomError.handleError('Receiver does not exist', 404, res);
          return;
        }

        const createdMessage = await models.SMS.create({
            sender_id: id,
            message,
            receiver_id: foundReceiver.id,
            status: 1
        });

       if (createdMessage) {
          return res.status(201).json({
              success: true,
              message: 'Message sent successfully',
              sentMessage: createdMessage
          });
      }
    } catch (error) {
      CustomError.handleError(error.message, 500, res);
    }
  }

  /**
     * Gets a user's sent messages
     *
     * @static
     * @param  {object} req - request object
     * @param  {object} res - response object
     * @returns {object} response object
     * @memberof SmsController     *
     */

  static async getSentMessages(req, res) {
    try {
      const { id } = req.user;
         const messages = await models.SMS.findAll({
          where: { sender_id: id }
        });

         if (messages.length < 1) {
          CustomError.handleError('No messages found', 404, res);
        }

         return res.status(200).json({
            success: true,
            message: 'messages found',
            messages,
        });
    } catch (error) {
      CustomError.handleError(error.message, 500, res);
    }
}

/**
     * Gets a user's received messages
     *
     * @static
     * @param  {object} req - request object
     * @param  {object} res - response object
     * @returns {object} response object
     * @memberof SmsController     *
     */
  static async getReceivedMessages(req, res) {
    try {
      const { id } = req.user;
        const messages = await models.SMS.findAll({
          where: { receiver_id: id }
        });

        if (messages.length < 1) {
          CustomError.handleError('No messages found', 404, res);
        }

        return res.status(200).json({
            success: true,
            message: 'messages found',
            messages,
        });
    } catch (error) {
      CustomError.handleError(error.message, 500, res);
    }
  }

  /**
     * Gets a particular user's message
     *
     * @static
     * @param  {object} req - request object
     * @param  {object} res - response object
     * @returns {object} response object
     * @memberof SmsController     *
     */

  static async getMessage(req, res) {
    try {
        const { id } = req.user;
        const { messageId } = req.body;
        const message = await models.SMS.find({
          where: {
            id: messageId,
            receiver_id: id
          }
        });

        if (message.length < 1) {
          CustomError.handleError('Message not found', 404, res);
        }

        const status = await message.update({
            status: 0,
        });

        return res.status(200).json({
            success: true,
            message: 'message found',
            message,
        });
    } catch (error) {
      CustomError.handleError(error.message, 500, res);
    }
  }

}