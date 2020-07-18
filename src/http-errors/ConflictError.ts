import { BaseError } from './BaseError'

const CONFLICT_STATUS_CODE = 409
/**
 * Exception for 409 HTTP error.
 */
export class ConflictError extends BaseError {
  /**
   * 생성자
   * @param {string} message
   */
  constructor(message: string) {
    super(CONFLICT_STATUS_CODE, message)
  }
}
