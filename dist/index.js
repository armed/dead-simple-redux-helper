"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol ? "symbol" : typeof obj; };

function _toArray(arr) { return Array.isArray(arr) ? arr : Array.from(arr); }

// Inspired by "Reducing Boilerplate" chapter in redux documentation
// http://redux.js.org/docs/recipes/ReducingBoilerplate.html

var identity = function identity(a) {
  return a;
};
var argsTransformer = function argsTransformer(propNames) {
  return function resultFn() {
    var _arguments = arguments;

    var _arguments2 = _toArray(_arguments);

    var args = _arguments2;

    return propNames.reduce(function (acc, p, idx) {
      var result = acc;
      result[p] = args[idx];
      return result;
    }, {});
  };
};

var createAction = exports.createAction = function createAction(type, paramList) {
  if (Array.isArray(paramList) && paramList.length) {
    var _ret = function () {
      var transformer = argsTransformer(paramList);
      return {
        v: function action() {
          return { type: type, payload: transformer.apply(undefined, arguments) };
        }
      };
    }();

    if ((typeof _ret === "undefined" ? "undefined" : _typeof(_ret)) === "object") return _ret.v;
  }
  return function (payload) {
    return { type: type, payload: payload };
  };
};

var createReducer = exports.createReducer = function createReducer(initialState, handlers) {
  return function () {
    var state = arguments.length <= 0 || arguments[0] === undefined ? initialState : arguments[0];
    var _ref = arguments[1];
    var type = _ref.type;
    var payload = _ref.payload;
    return (handlers[type] || identity)(state, payload);
  };
};