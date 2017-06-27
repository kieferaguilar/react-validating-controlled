'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _controlled = require('../controlled/controlled');

var _controlled2 = _interopRequireDefault(_controlled);

var _validating = require('../validating/validating');

var _validating2 = _interopRequireDefault(_validating);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 * Conveniently creates a controlled component that also performs value validation
 * 
 * @param {any} WrappedComponent Component to wrap with value control and validation
 * @returns {any}
 */
function validatingControlled(WrappedComponent) {
  return (0, _controlled2.default)((0, _validating2.default)(WrappedComponent));
}

exports.default = validatingControlled;