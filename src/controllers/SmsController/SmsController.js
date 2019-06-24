import models from '../../database/models';
import CustomError from '../../helpers/Error';

export default class SmsController {
  static home(req, res) {
    res.status(200).send('Welcome to SMS Management Application API');
  }

}