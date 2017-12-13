/**
 * Created by pablo on 9/12/17.
 */
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
class CECTimeoutError extends Error {

  constructor(target, timeout) {
    super(`CEC monitor hasn't gotten response in some time (${timeout} ms) from ${target}`);
  }

}
exports.default = CECTimeoutError;