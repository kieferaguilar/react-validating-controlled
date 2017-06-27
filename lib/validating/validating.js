'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
var _jsxFileName = 'src/validating/validating.js';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _propTypes = require('prop-types');

var _propTypes2 = _interopRequireDefault(_propTypes);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _objectWithoutProperties(obj, keys) { var target = {}; for (var i in obj) { if (keys.indexOf(i) >= 0) continue; if (!Object.prototype.hasOwnProperty.call(obj, i)) continue; target[i] = obj[i]; } return target; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

/**
 * Higher order component that adds value validation to the WrappedComponent
 * onBlur and onChange
 * 
 * @param {any} WrappedComponent Component to wrap with value validation
 * @returns {any}
 */
function validating(WrappedComponent) {
  var ValidatingComponent = function (_React$Component) {
    _inherits(ValidatingComponent, _React$Component);

    _createClass(ValidatingComponent, [{
      key: 'render',
      value: function render() {
        var _props = this.props,
            checkerOnChange = _props.checkerOnChange,
            modifierOnChange = _props.modifierOnChange,
            modifierOnBlur = _props.modifierOnBlur,
            onChange = _props.onChange,
            passThroughProps = _objectWithoutProperties(_props, ['checkerOnChange', 'modifierOnChange', 'modifierOnBlur', 'onChange']);

        return _react2.default.createElement(WrappedComponent, Object.assign({
          onChange: this.handleChange,
          onBlur: this.handleBlur
        }, passThroughProps, {
          __source: {
            fileName: _jsxFileName,
            lineNumber: 24
          },
          __self: this
        }));
      }
    }]);

    function ValidatingComponent(props) {
      _classCallCheck(this, ValidatingComponent);

      var _this = _possibleConstructorReturn(this, (ValidatingComponent.__proto__ || Object.getPrototypeOf(ValidatingComponent)).call(this, props));

      _this.handleChange = _this.handleChange.bind(_this);
      _this.handleBlur = _this.handleBlur.bind(_this);
      _this.updateValue = _this.updateValue.bind(_this);
      return _this;
    }

    _createClass(ValidatingComponent, [{
      key: 'handleChange',
      value: function handleChange(event, value) {
        var newValue = value === undefined ? event.target.value : value;
        if (!this.props.checkerOnChange(newValue)) {
          return;
        }

        newValue = this.props.modifierOnChange(newValue);
        this.updateValue(event, newValue);
      }
    }, {
      key: 'handleBlur',
      value: function handleBlur(event) {
        var oldValue = event.target.value;
        var newValue = this.props.modifierOnBlur(oldValue);
        if (oldValue !== newValue) {
          this.updateValue(event, newValue);
        }
      }
    }, {
      key: 'updateValue',
      value: function updateValue(event, newValue) {
        if (this.props.onChange) {
          this.props.onChange(event, newValue, this.props.name);
        }
      }
    }]);

    return ValidatingComponent;
  }(_react2.default.Component);

  ValidatingComponent.propTypes = Object.assign({}, WrappedComponent.propTypes, {
    name: _propTypes2.default.string,
    onChange: _propTypes2.default.func,
    checkerOnChange: _propTypes2.default.func.isRequired,
    modifierOnChange: _propTypes2.default.func.isRequired,
    modifierOnBlur: _propTypes2.default.func.isRequired
  });

  ValidatingComponent.defaultProps = Object.assign({}, WrappedComponent.defaultProps, {
    checkerOnChange: function checkerOnChange() {
      return true;
    },
    modifierOnChange: function modifierOnChange(s) {
      return s;
    },
    modifierOnBlur: function modifierOnBlur(s) {
      return s;
    }
  });

  return ValidatingComponent;
}

exports.default = validating;