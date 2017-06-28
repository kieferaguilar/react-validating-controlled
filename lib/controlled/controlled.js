'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
var _jsxFileName = 'src/controlled/controlled.js';

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
 * Higher order component that adds value control to the WrappedComponent
 * 
 * @param {any} WrappedComponent Component to wrap with value control
 * @returns {any}
 */
function controlled(WrappedComponent) {
  var ControlledComponent = function (_React$Component) {
    _inherits(ControlledComponent, _React$Component);

    _createClass(ControlledComponent, [{
      key: 'render',
      value: function render() {
        var _props = this.props,
            initialValue = _props.initialValue,
            onChange = _props.onChange,
            passThroughProps = _objectWithoutProperties(_props, ['initialValue', 'onChange']);

        return _react2.default.createElement(WrappedComponent, Object.assign({
          value: this.state.value || ControlledComponent.emptyValue(),
          onChange: this.handleChange
        }, passThroughProps, {
          __source: {
            fileName: _jsxFileName,
            lineNumber: 21
          },
          __self: this
        }));
      }
    }]);

    function ControlledComponent(props) {
      _classCallCheck(this, ControlledComponent);

      var _this = _possibleConstructorReturn(this, (ControlledComponent.__proto__ || Object.getPrototypeOf(ControlledComponent)).call(this, props));

      _this.state = {
        value: _this.props.initialValue
      };

      _this.handleChange = _this.handleChange.bind(_this);
      return _this;
    }

    _createClass(ControlledComponent, [{
      key: 'handleChange',
      value: function handleChange(event, value) {
        var newValue = value === undefined ? event.target.value : value;
        this.setState({ value: newValue });
        if (this.props.onChange) {
          this.props.onChange(event, newValue, this.props.name);
        }
      }
    }]);

    return ControlledComponent;
  }(_react2.default.Component);

  ControlledComponent.propTypes = Object.assign({}, WrappedComponent.propTypes, {
    initialValue: WrappedComponent.propTypes.value,
    name: _propTypes2.default.string,
    onChange: _propTypes2.default.func
  });

  ControlledComponent.defaultProps = WrappedComponent.defaultProps;

  ControlledComponent.emptyValue = WrappedComponent.emptyValue ? WrappedComponent.emptyValue : function () {
    return "";
  };

  return ControlledComponent;
}

exports.default = controlled;