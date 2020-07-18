import { HttpError } from 'routing-controllers'

/**
 * Base of Error
 */
export class BaseError extends HttpError {
  /**
   * 생성자
   * @param {number} httpCode
   * @param {string} message
   */
  constructor(httpCode: number, message: string) {
    super(httpCode, message)
    delete this.name
    delete this.stack
  }
}
