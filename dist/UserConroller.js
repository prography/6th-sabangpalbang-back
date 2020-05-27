"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.UserController = void 0;

var _dec, _dec2, _dec3, _class, _class2;

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _applyDecoratedDescriptor(target, property, decorators, descriptor, context) { var desc = {}; Object.keys(descriptor).forEach(function (key) { desc[key] = descriptor[key]; }); desc.enumerable = !!desc.enumerable; desc.configurable = !!desc.configurable; if ('value' in desc || desc.initializer) { desc.writable = true; } desc = decorators.slice().reverse().reduce(function (desc, decorator) { return decorator(target, property, desc) || desc; }, desc); if (context && desc.initializer !== void 0) { desc.value = desc.initializer ? desc.initializer.call(context) : void 0; desc.initializer = undefined; } if (desc.initializer === void 0) { Object.defineProperty(target, property, desc); desc = null; } return desc; }

var _require = require("routing-controllers"),
    JsonController = _require.JsonController,
    Param = _require.Param,
    Body = _require.Body,
    Get = _require.Get,
    Post = _require.Post,
    Put = _require.Put,
    Delete = _require.Delete;

var UserController = (_dec = JsonController(), _dec2 = Get("/users"), _dec3 = Post("/users"), _dec(_class = (_class2 = /*#__PURE__*/function () {
  function UserController() {
    _classCallCheck(this, UserController);
  }

  _createClass(UserController, [{
    key: "getAll",
    value: function getAll() {
      return "This action returns all users";
    }
  }, {
    key: "post",
    value: function post(user) {
      return "Saving user...";
    }
  }]);

  Body()(UserController.prototype, "post", 0);
  return UserController;
}(), (_applyDecoratedDescriptor(_class2.prototype, "getAll", [_dec2], Object.getOwnPropertyDescriptor(_class2.prototype, "getAll"), _class2.prototype), _applyDecoratedDescriptor(_class2.prototype, "post", [_dec3], Object.getOwnPropertyDescriptor(_class2.prototype, "post"), _class2.prototype)), _class2)) || _class);
exports.UserController = UserController;
//# sourceMappingURL=UserConroller.ts.map
