import models from '../../database/models';
import CustomError from '../../helpers/Error';

export default class SmsController {
  static home(req, res) {
    res.status(200).send('Welcome to SMS Management Application API');
  }

  static async sendMessage(req, res) {
    try {
      const { receiverId } = req.params;
      const { message } = req.body;
      const { id } = req.user;

        const foundReceiver = await models.Contact.findOne({
          where: { id: receiverId }
        });

        if(!foundReceiver){
          CustomError.handleError('Receiver does not exist', 404, res);
          return;
        }

        const createdMessage = await models.SMS.create({
            sender_id: id,
            message,
            receiver_id: receiverId,
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