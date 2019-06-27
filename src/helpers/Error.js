
/**
 * Handles erroes
 *
 * @exports
 * @class Error
 */
class Error {

  /**
     * Error handling
     *
     * @static
     * @param  {string} error - error string
     * @param  {integer} statusCode - status code
     * @returns {object} response object
     * @memberof SmsController     *
     */
  static handleError(error, statusCode, response) {
    return response.status(statusCode).json({
      success: false,
      error
    });
  }
}

export default Error;
