import { BaseError } from './BaseError'

const INTERNAL_STATUS_CODE = 500
/**
 * Exception for 500 HTTP error.
 */
export class InternalError extends BaseError {
  /**
   * 생성자
   * @param {string} message - 에러 메시지
   */
  constructor(message?: string) {
    super(INTERNAL_STATUS_CODE, message)
  }
}
