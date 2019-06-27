
import jwt from 'jsonwebtoken';


const auth = {

  /**
     * Signs user's object to a token
     *
     * @static
     * @param  {object} user - user object
     * @returns {object} response object
     * @memberof auth     *
     */
  authenticate(user) {
    return jwt.sign({
      id: user.id,
      email: user.email,
    }, process.env.SECRET, {
      expiresIn: '48h',
    });
  },

  /**
     * Verifies user's token
     *
     * @static
     * @param  {string} token - token string
     * @returns {object} response object
     * @memberof auth     *
     */
  verifyToken(token) {
    let decoded = {};
    try {
      decoded = jwt.verify(token, process.env.SECRET);
    } catch (error) {
      decoded = {
        error: error.message,
      };
    }
    return decoded;
  },


/**
     * Verifies the user object token
     *
     * @static
     * @param  {object} req - request object
     * @param  {object} res - response object
     * @param  {object} next - next object
     * @returns {object} response object
     * @memberof auth     *
     */
  verifyUserToken(request, response, next) {
    const token = request.query.token || request.body.token || request.headers['x-access-token'];
    if (!token) {
      return response.status(401).json({
        status: 'failed',
        message: 'No token provided.'
      });
    }

    const decoded = auth.verifyToken(token);
    if (decoded.error) {
      return response.status(401).json({
        status: 'failed',
        message: 'Failed to authenticate token.'
      });
    }

    request.user = decoded;
    next();
  }
};

export default auth;
