import models from '../../database/models';
import CustomError from '../../helpers/Error';
import bcrypt from 'bcrypt';
import auth from '../../middlewares/TokenValidator';

/**
 * Handles operations on contact routes
 *
 * @exports
 * @class ContactController
 */
export default class ContactController {
   /**
     * The home route
     *
     * @static
     * @param  {object} req - request object
     * @param  {object} res - response object
     * @returns {String} response string
     * @memberof ContactController     *
     */
  static home(req, res) {
    res.status(200).send('Welcome to SMS Management Application API');
  }

   /**
     * Creates a user
     *
     * @static
     * @param  {object} req - request object
     * @param  {object} res - response object
     * @returns {object} response object
     * @memberof ContactController     *
     */
  static async createUser(req, res) {
    try {
      const { name, password, phoneNumber } = req.body;

        const foundUser = await models.Contact.findOne({
          where: { name }
        });

        if(foundUser){
          CustomError.handleError('User already exists', 409, res);
          return;
        }

        const foundNumber = await models.Contact.findOne({
          where: { phone_number: phoneNumber }
        });

        if(foundNumber){
          CustomError.handleError('Phone Number already exists', 409, res);
          return;
        }

        const hash = bcrypt.hashSync(password, 10);

        const createdUser = await models.Contact.create({
            name,
            phone_number: phoneNumber,
            password: hash,
        });

       if (createdUser) {
          return res.status(201).json({
              success: true,
              message: 'User created successfully',
              user: createdUser
          });
      }
    } catch (error) {
      CustomError.handleError(error.message, 500, res);
    }
  }

   /**
     * Logs in a user
     *
     * @static
     * @param  {object} req - request object
     * @param  {object} res - response object
     * @returns {object} response object
     * @memberof ContactController     *
     */
  static async loginUser(req, res) {
    try {
      const { password, phoneNumber } = req.body;

        const foundUser = await models.Contact.findOne({
          where: {
            phone_number: phoneNumber,
          }
        });

        if(!foundUser){
          CustomError.handleError('Invalid phone number', 400, res);
          return;
        }

        const check = bcrypt.compareSync(password, foundUser.password);

        if(!check){
          CustomError.handleError('Invalid password', 400, res);
          return;
        }

        const token = auth.authenticate(foundUser);
        return res.status(200).json({
          success: true,
          message: 'User Logged in successfully',
          token
        });

    } catch (error) {
      CustomError.handleError(error.message, 500, res);
    }
  }

   /**
     * Deletes a user
     *
     * @static
     * @param  {object} req - request object
     * @param  {object} res - response object
     * @returns {object} response object
     * @memberof ContactController     *
     */
  static async deleteUser(req, res) {
    try {
        const { contactId } = req.params;
        const foundContact = await models.Contact.findOne({
          where: { id: contactId }
        });

        if (!foundContact) {
          return res.status(400).json({
            success: false,
            message: 'The User does not exist'
          });
        }

         await foundContact.destroy();

         return res.status(200).json({
            success: true,
            message: 'User deleted successfully',
        });
    } catch (error) {
      CustomError.handleError(error.message, 500, res);
    }
}

 /**
     * Gets a user
     *
     * @static
     * @param  {object} req - request object
     * @param  {object} res - response object
     * @returns {object} response object
     * @memberof ContactController     *
     */

static async getUser(req, res) {
  try {
      const { contactId } = req.params;

      const User = await models.Contact.find({
        where: {
          id: contactId,
        }
      });

      if (User.length < 1) {
        CustomError.handleError('User not found', 404, res);
      }

      return res.status(200).json({
          success: true,
          message: 'user found',
          user: User,
      });
  } catch (error) {
    CustomError.handleError(error.message, 500, res);
  }
}

}