import { BaseError } from './BaseError'

const NOT_FOUND_STATUS_CODE = 404
/**
 * Exception for 404 HTTP error.
 */
export class NotFoundError extends BaseError {
  /**
   * 생성자
   * @param {string} message
   */
  constructor(message: string) {
    super(NOT_FOUND_STATUS_CODE, message)
  }
}
