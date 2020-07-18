import { BaseError } from './BaseError'

const BAD_REQUEST_STATUS_CODE = 400
/**
 * Exception for 400 HTTP error.
 */
export class BadRequestError extends BaseError {
  /**
   * 생성자
   * @param {string} message - 에러 메시지
   */
  constructor(message?: string) {
    super(BAD_REQUEST_STATUS_CODE, message)
  }
}
