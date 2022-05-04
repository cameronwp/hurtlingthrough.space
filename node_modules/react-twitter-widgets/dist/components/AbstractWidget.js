'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _propTypes = require('prop-types');

var _propTypes2 = _interopRequireDefault(_propTypes);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var AbstractWidget = function (_React$Component) {
  _inherits(AbstractWidget, _React$Component);

  function AbstractWidget() {
    var _ref;

    var _temp, _this, _ret;

    _classCallCheck(this, AbstractWidget);

    for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    return _ret = (_temp = (_this = _possibleConstructorReturn(this, (_ref = AbstractWidget.__proto__ || Object.getPrototypeOf(AbstractWidget)).call.apply(_ref, [this].concat(args))), _this), _this.loadWidget = function () {
      var $script = require('scriptjs'); // eslint-disable-line global-require

      $script.ready('twitter-widgets', function () {
        if (!window.twttr) {
          // If the script tag fails to load, scriptjs.ready() will still trigger.
          // Let's avoid the JS exceptions when that happens.
          console.error('Failure to load window.twttr, aborting load.'); // eslint-disable-line no-console
          return;
        }

        // Delete existing
        AbstractWidget.removeChildren(_this.widgetWrapper);

        // Create widget
        _this.props.ready(window.twttr, _this.widgetWrapper, _this.done);
      });
    }, _this.done = function () {
      if (_this.willUnmount) {
        AbstractWidget.removeChildrenExceptLast(_this.widgetWrapper);
      }
    }, _temp), _possibleConstructorReturn(_this, _ret);
  }

  _createClass(AbstractWidget, [{
    key: 'componentWillMount',
    value: function componentWillMount() {
      this.willUnmount = false;
    }
  }, {
    key: 'componentDidMount',
    value: function componentDidMount() {
      this.loadWidget();
    }
  }, {
    key: 'componentDidUpdate',
    value: function componentDidUpdate() {
      this.loadWidget();
    }
  }, {
    key: 'componentWillUnmount',
    value: function componentWillUnmount() {
      this.willUnmount = true;
    }
  }, {
    key: 'render',
    value: function render() {
      var _this2 = this;

      return _react2.default.createElement('div', {
        ref: function ref(c) {
          _this2.widgetWrapper = c;
        }
      });
    }
  }], [{
    key: 'removeChildren',
    value: function removeChildren(node) {
      if (node) {
        while (node.firstChild) {
          node.removeChild(node.firstChild);
        }
      }
    }
  }, {
    key: 'removeChildrenExceptLast',
    value: function removeChildrenExceptLast(node) {
      if (node) {
        while (node.childNodes.length > 1) {
          node.removeChild(node.firstChild);
        }
      }
    }
  }]);

  return AbstractWidget;
}(_react2.default.Component);

AbstractWidget.propTypes = {
  ready: _propTypes2.default.func.isRequired
};
exports.default = AbstractWidget;