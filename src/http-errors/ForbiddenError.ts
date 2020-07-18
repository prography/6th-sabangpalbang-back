import { BaseError } from './BaseError'

const FORBIDDEN_STATUS_CODE = 403
/**
 * Exception for 403 HTTP error.
 */
export class ForbiddenError extends BaseError {
  /**
   * 생성자
   * @param {string} message - 에러 메시지
   */
  constructor(message?: string) {
    super(FORBIDDEN_STATUS_CODE, message)
  }
}
