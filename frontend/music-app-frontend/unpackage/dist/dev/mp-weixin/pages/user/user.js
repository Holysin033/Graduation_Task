(global["webpackJsonp"] = global["webpackJsonp"] || []).push([["pages/user/user"],{

/***/ 255:
/*!**************************************************************************************************************************!*\
  !*** D:/BaiduNetdiskDownload/uni-app-music/music-app/frontend/music-app-frontend/main.js?{"page":"pages%2Fuser%2Fuser"} ***!
  \**************************************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(wx, createPage) {

var _interopRequireDefault = __webpack_require__(/*! @babel/runtime/helpers/interopRequireDefault */ 4);
__webpack_require__(/*! uni-pages */ 26);
var _vue = _interopRequireDefault(__webpack_require__(/*! vue */ 25));
var _user = _interopRequireDefault(__webpack_require__(/*! ./pages/user/user.vue */ 256));
// @ts-ignore
wx.__webpack_require_UNI_MP_PLUGIN__ = __webpack_require__;
createPage(_user.default);
/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(/*! ./node_modules/@dcloudio/uni-mp-weixin/dist/wx.js */ 1)["default"], __webpack_require__(/*! ./node_modules/@dcloudio/uni-mp-weixin/dist/index.js */ 2)["createPage"]))

/***/ }),

/***/ 256:
/*!*******************************************************************************************************!*\
  !*** D:/BaiduNetdiskDownload/uni-app-music/music-app/frontend/music-app-frontend/pages/user/user.vue ***!
  \*******************************************************************************************************/
/*! no static exports found */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _user_vue_vue_type_template_id_80842834___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./user.vue?vue&type=template&id=80842834& */ 257);
/* harmony import */ var _user_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./user.vue?vue&type=script&lang=js& */ 259);
/* harmony reexport (unknown) */ for(var __WEBPACK_IMPORT_KEY__ in _user_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_1__) if(["default"].indexOf(__WEBPACK_IMPORT_KEY__) < 0) (function(key) { __webpack_require__.d(__webpack_exports__, key, function() { return _user_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_1__[key]; }) }(__WEBPACK_IMPORT_KEY__));
/* harmony import */ var _user_vue_vue_type_style_index_0_lang_scss___WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./user.vue?vue&type=style&index=0&lang=scss& */ 263);
/* harmony import */ var _hongmeng_HBuilderX_4_56_2025031210_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_runtime_componentNormalizer_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../../../../../../../hongmeng/HBuilderX.4.56.2025031210/HBuilderX/plugins/uniapp-cli/node_modules/@dcloudio/vue-cli-plugin-uni/packages/vue-loader/lib/runtime/componentNormalizer.js */ 38);

var renderjs





/* normalize component */

var component = Object(_hongmeng_HBuilderX_4_56_2025031210_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_runtime_componentNormalizer_js__WEBPACK_IMPORTED_MODULE_3__["default"])(
  _user_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_1__["default"],
  _user_vue_vue_type_template_id_80842834___WEBPACK_IMPORTED_MODULE_0__["render"],
  _user_vue_vue_type_template_id_80842834___WEBPACK_IMPORTED_MODULE_0__["staticRenderFns"],
  false,
  null,
  null,
  null,
  false,
  _user_vue_vue_type_template_id_80842834___WEBPACK_IMPORTED_MODULE_0__["components"],
  renderjs
)

component.options.__file = "pages/user/user.vue"
/* harmony default export */ __webpack_exports__["default"] = (component.exports);

/***/ }),

/***/ 257:
/*!**************************************************************************************************************************************!*\
  !*** D:/BaiduNetdiskDownload/uni-app-music/music-app/frontend/music-app-frontend/pages/user/user.vue?vue&type=template&id=80842834& ***!
  \**************************************************************************************************************************************/
/*! exports provided: render, staticRenderFns, recyclableRender, components */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _hongmeng_HBuilderX_4_56_2025031210_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_hongmeng_HBuilderX_4_56_2025031210_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_17_0_hongmeng_HBuilderX_4_56_2025031210_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_template_js_hongmeng_HBuilderX_4_56_2025031210_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_uni_app_loader_page_meta_js_hongmeng_HBuilderX_4_56_2025031210_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_index_js_vue_loader_options_hongmeng_HBuilderX_4_56_2025031210_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_style_js_user_vue_vue_type_template_id_80842834___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../../../../../hongmeng/HBuilderX.4.56.2025031210/HBuilderX/plugins/uniapp-cli/node_modules/@dcloudio/vue-cli-plugin-uni/packages/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!../../../../../../../hongmeng/HBuilderX.4.56.2025031210/HBuilderX/plugins/uniapp-cli/node_modules/@dcloudio/vue-cli-plugin-uni/packages/webpack-preprocess-loader??ref--17-0!../../../../../../../hongmeng/HBuilderX.4.56.2025031210/HBuilderX/plugins/uniapp-cli/node_modules/@dcloudio/webpack-uni-mp-loader/lib/template.js!../../../../../../../hongmeng/HBuilderX.4.56.2025031210/HBuilderX/plugins/uniapp-cli/node_modules/@dcloudio/vue-cli-plugin-uni/packages/webpack-uni-app-loader/page-meta.js!../../../../../../../hongmeng/HBuilderX.4.56.2025031210/HBuilderX/plugins/uniapp-cli/node_modules/@dcloudio/vue-cli-plugin-uni/packages/vue-loader/lib??vue-loader-options!../../../../../../../hongmeng/HBuilderX.4.56.2025031210/HBuilderX/plugins/uniapp-cli/node_modules/@dcloudio/webpack-uni-mp-loader/lib/style.js!./user.vue?vue&type=template&id=80842834& */ 258);
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "render", function() { return _hongmeng_HBuilderX_4_56_2025031210_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_hongmeng_HBuilderX_4_56_2025031210_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_17_0_hongmeng_HBuilderX_4_56_2025031210_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_template_js_hongmeng_HBuilderX_4_56_2025031210_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_uni_app_loader_page_meta_js_hongmeng_HBuilderX_4_56_2025031210_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_index_js_vue_loader_options_hongmeng_HBuilderX_4_56_2025031210_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_style_js_user_vue_vue_type_template_id_80842834___WEBPACK_IMPORTED_MODULE_0__["render"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "staticRenderFns", function() { return _hongmeng_HBuilderX_4_56_2025031210_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_hongmeng_HBuilderX_4_56_2025031210_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_17_0_hongmeng_HBuilderX_4_56_2025031210_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_template_js_hongmeng_HBuilderX_4_56_2025031210_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_uni_app_loader_page_meta_js_hongmeng_HBuilderX_4_56_2025031210_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_index_js_vue_loader_options_hongmeng_HBuilderX_4_56_2025031210_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_style_js_user_vue_vue_type_template_id_80842834___WEBPACK_IMPORTED_MODULE_0__["staticRenderFns"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "recyclableRender", function() { return _hongmeng_HBuilderX_4_56_2025031210_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_hongmeng_HBuilderX_4_56_2025031210_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_17_0_hongmeng_HBuilderX_4_56_2025031210_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_template_js_hongmeng_HBuilderX_4_56_2025031210_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_uni_app_loader_page_meta_js_hongmeng_HBuilderX_4_56_2025031210_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_index_js_vue_loader_options_hongmeng_HBuilderX_4_56_2025031210_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_style_js_user_vue_vue_type_template_id_80842834___WEBPACK_IMPORTED_MODULE_0__["recyclableRender"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "components", function() { return _hongmeng_HBuilderX_4_56_2025031210_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_hongmeng_HBuilderX_4_56_2025031210_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_17_0_hongmeng_HBuilderX_4_56_2025031210_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_template_js_hongmeng_HBuilderX_4_56_2025031210_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_uni_app_loader_page_meta_js_hongmeng_HBuilderX_4_56_2025031210_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_index_js_vue_loader_options_hongmeng_HBuilderX_4_56_2025031210_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_style_js_user_vue_vue_type_template_id_80842834___WEBPACK_IMPORTED_MODULE_0__["components"]; });



/***/ }),

/***/ 258:
/*!**************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/@dcloudio/vue-cli-plugin-uni/packages/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!./node_modules/@dcloudio/vue-cli-plugin-uni/packages/webpack-preprocess-loader??ref--17-0!./node_modules/@dcloudio/webpack-uni-mp-loader/lib/template.js!./node_modules/@dcloudio/vue-cli-plugin-uni/packages/webpack-uni-app-loader/page-meta.js!./node_modules/@dcloudio/vue-cli-plugin-uni/packages/vue-loader/lib??vue-loader-options!./node_modules/@dcloudio/webpack-uni-mp-loader/lib/style.js!D:/BaiduNetdiskDownload/uni-app-music/music-app/frontend/music-app-frontend/pages/user/user.vue?vue&type=template&id=80842834& ***!
  \**************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************/
/*! exports provided: render, staticRenderFns, recyclableRender, components */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "render", function() { return render; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "staticRenderFns", function() { return staticRenderFns; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "recyclableRender", function() { return recyclableRender; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "components", function() { return components; });
var components
try {
  components = {
    uButton: function () {
      return Promise.all(/*! import() | node-modules/uview-ui/components/u-button/u-button */[__webpack_require__.e("common/vendor"), __webpack_require__.e("node-modules/uview-ui/components/u-button/u-button")]).then(__webpack_require__.bind(null, /*! uview-ui/components/u-button/u-button.vue */ 353))
    },
    uniPopup: function () {
      return __webpack_require__.e(/*! import() | uni_modules/uni-popup/components/uni-popup/uni-popup */ "uni_modules/uni-popup/components/uni-popup/uni-popup").then(__webpack_require__.bind(null, /*! @/uni_modules/uni-popup/components/uni-popup/uni-popup.vue */ 303))
    },
  }
} catch (e) {
  if (
    e.message.indexOf("Cannot find module") !== -1 &&
    e.message.indexOf(".vue") !== -1
  ) {
    console.error(e.message)
    console.error("1. 排查组件名称拼写是否正确")
    console.error(
      "2. 排查组件是否符合 easycom 规范，文档：https://uniapp.dcloud.net.cn/collocation/pages?id=easycom"
    )
    console.error(
      "3. 若组件不符合 easycom 规范，需手动引入，并在 components 中注册该组件"
    )
  } else {
    throw e
  }
}
var render = function () {
  var _vm = this
  var _h = _vm.$createElement
  var _c = _vm._self._c || _h
}
var recyclableRender = false
var staticRenderFns = []
render._withStripped = true



/***/ }),

/***/ 259:
/*!********************************************************************************************************************************!*\
  !*** D:/BaiduNetdiskDownload/uni-app-music/music-app/frontend/music-app-frontend/pages/user/user.vue?vue&type=script&lang=js& ***!
  \********************************************************************************************************************************/
/*! no static exports found */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _hongmeng_HBuilderX_4_56_2025031210_HBuilderX_plugins_uniapp_cli_node_modules_babel_loader_lib_index_js_hongmeng_HBuilderX_4_56_2025031210_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_13_1_hongmeng_HBuilderX_4_56_2025031210_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_script_js_hongmeng_HBuilderX_4_56_2025031210_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_index_js_vue_loader_options_hongmeng_HBuilderX_4_56_2025031210_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_style_js_user_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../../../../../hongmeng/HBuilderX.4.56.2025031210/HBuilderX/plugins/uniapp-cli/node_modules/babel-loader/lib!../../../../../../../hongmeng/HBuilderX.4.56.2025031210/HBuilderX/plugins/uniapp-cli/node_modules/@dcloudio/vue-cli-plugin-uni/packages/webpack-preprocess-loader??ref--13-1!../../../../../../../hongmeng/HBuilderX.4.56.2025031210/HBuilderX/plugins/uniapp-cli/node_modules/@dcloudio/webpack-uni-mp-loader/lib/script.js!../../../../../../../hongmeng/HBuilderX.4.56.2025031210/HBuilderX/plugins/uniapp-cli/node_modules/@dcloudio/vue-cli-plugin-uni/packages/vue-loader/lib??vue-loader-options!../../../../../../../hongmeng/HBuilderX.4.56.2025031210/HBuilderX/plugins/uniapp-cli/node_modules/@dcloudio/webpack-uni-mp-loader/lib/style.js!./user.vue?vue&type=script&lang=js& */ 260);
/* harmony import */ var _hongmeng_HBuilderX_4_56_2025031210_HBuilderX_plugins_uniapp_cli_node_modules_babel_loader_lib_index_js_hongmeng_HBuilderX_4_56_2025031210_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_13_1_hongmeng_HBuilderX_4_56_2025031210_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_script_js_hongmeng_HBuilderX_4_56_2025031210_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_index_js_vue_loader_options_hongmeng_HBuilderX_4_56_2025031210_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_style_js_user_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_hongmeng_HBuilderX_4_56_2025031210_HBuilderX_plugins_uniapp_cli_node_modules_babel_loader_lib_index_js_hongmeng_HBuilderX_4_56_2025031210_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_13_1_hongmeng_HBuilderX_4_56_2025031210_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_script_js_hongmeng_HBuilderX_4_56_2025031210_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_index_js_vue_loader_options_hongmeng_HBuilderX_4_56_2025031210_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_style_js_user_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__);
/* harmony reexport (unknown) */ for(var __WEBPACK_IMPORT_KEY__ in _hongmeng_HBuilderX_4_56_2025031210_HBuilderX_plugins_uniapp_cli_node_modules_babel_loader_lib_index_js_hongmeng_HBuilderX_4_56_2025031210_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_13_1_hongmeng_HBuilderX_4_56_2025031210_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_script_js_hongmeng_HBuilderX_4_56_2025031210_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_index_js_vue_loader_options_hongmeng_HBuilderX_4_56_2025031210_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_style_js_user_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__) if(["default"].indexOf(__WEBPACK_IMPORT_KEY__) < 0) (function(key) { __webpack_require__.d(__webpack_exports__, key, function() { return _hongmeng_HBuilderX_4_56_2025031210_HBuilderX_plugins_uniapp_cli_node_modules_babel_loader_lib_index_js_hongmeng_HBuilderX_4_56_2025031210_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_13_1_hongmeng_HBuilderX_4_56_2025031210_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_script_js_hongmeng_HBuilderX_4_56_2025031210_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_index_js_vue_loader_options_hongmeng_HBuilderX_4_56_2025031210_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_style_js_user_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__[key]; }) }(__WEBPACK_IMPORT_KEY__));
 /* harmony default export */ __webpack_exports__["default"] = (_hongmeng_HBuilderX_4_56_2025031210_HBuilderX_plugins_uniapp_cli_node_modules_babel_loader_lib_index_js_hongmeng_HBuilderX_4_56_2025031210_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_13_1_hongmeng_HBuilderX_4_56_2025031210_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_script_js_hongmeng_HBuilderX_4_56_2025031210_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_index_js_vue_loader_options_hongmeng_HBuilderX_4_56_2025031210_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_style_js_user_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0___default.a); 

/***/ }),

/***/ 260:
/*!***************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/babel-loader/lib!./node_modules/@dcloudio/vue-cli-plugin-uni/packages/webpack-preprocess-loader??ref--13-1!./node_modules/@dcloudio/webpack-uni-mp-loader/lib/script.js!./node_modules/@dcloudio/vue-cli-plugin-uni/packages/vue-loader/lib??vue-loader-options!./node_modules/@dcloudio/webpack-uni-mp-loader/lib/style.js!D:/BaiduNetdiskDownload/uni-app-music/music-app/frontend/music-app-frontend/pages/user/user.vue?vue&type=script&lang=js& ***!
  \***************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(uni) {

var _interopRequireDefault = __webpack_require__(/*! @babel/runtime/helpers/interopRequireDefault */ 4);
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _regenerator = _interopRequireDefault(__webpack_require__(/*! @babel/runtime/regenerator */ 30));
var _defineProperty2 = _interopRequireDefault(__webpack_require__(/*! @babel/runtime/helpers/defineProperty */ 11));
var _asyncToGenerator2 = _interopRequireDefault(__webpack_require__(/*! @babel/runtime/helpers/asyncToGenerator */ 32));
var _authService = _interopRequireDefault(__webpack_require__(/*! @/utils/authService.js */ 174));
var _musicData = __webpack_require__(/*! @/utils/musicData.js */ 170);
var _syncService = __webpack_require__(/*! @/utils/syncService.js */ 34);
var _storage = __webpack_require__(/*! @/utils/storage */ 261);
var _constants = __webpack_require__(/*! @/utils/constants */ 262);
function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); enumerableOnly && (symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; })), keys.push.apply(keys, symbols); } return keys; }
function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = null != arguments[i] ? arguments[i] : {}; i % 2 ? ownKeys(Object(source), !0).forEach(function (key) { (0, _defineProperty2.default)(target, key, source[key]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)) : ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } return target; }
var _default = {
  data: function data() {
    return {
      userInfo: {
        avatar: '',
        nickname: '',
        username: '',
        id: ''
      },
      stats: {
        favorites: 0,
        history: 0,
        playlists: 0
      },
      isLoggingOut: false,
      lastSyncTime: '',
      favoriteCount: 0,
      historyCount: 0,
      playlistCount: 0,
      syncStatus: 'none',
      // none, success, partial, error, syncing
      syncError: '',
      isSyncing: false,
      syncStats: {
        favorites: 0,
        history: 0,
        playlists: 0
      },
      _isLoggedIn: false
    };
  },
  computed: {
    // 同步状态文本
    syncStatusText: function syncStatusText() {
      var statusMap = {
        'none': '从未同步',
        'success': '同步成功',
        'partial': '部分同步',
        'error': '同步失败',
        'syncing': '同步中...'
      };
      return statusMap[this.syncStatus] || '未知状态';
    },
    // 同步状态样式类
    syncStatusClass: function syncStatusClass() {
      var classMap = {
        'none': 'status-none',
        'success': 'status-success',
        'partial': 'status-warning',
        'error': 'status-error',
        'syncing': 'status-syncing'
      };
      return classMap[this.syncStatus] || '';
    },
    // 登录状态
    isLoggedIn: {
      get: function get() {
        // 同时检查内部状态和用户ID
        return this._isLoggedIn && !!this.userInfo.id;
      },
      set: function set(value) {
        this._isLoggedIn = value;
      }
    }
  },
  onShow: function onShow() {
    var _this = this;
    // 每次页面显示时强制刷新登录状态，增加日志以便调试
    console.log('用户页面显示，开始强制刷新登录状态...');

    // 优先级执行 - 先强制刷新登录状态
    this.forceRefreshLoginStatus();

    // 短暂延迟后再次检查登录状态，确保状态一致性
    setTimeout(function () {
      console.log('延迟检查登录状态...');
      _this.checkLogin();

      // 加载用户相关数据
      _this.loadUserData();
      _this.loadSyncStatus();
      _this.loadSyncStats();
    }, 100);
  },
  onLoad: function onLoad() {
    // 监听登录成功事件
    uni.$on('login_success', this.handleLoginSuccess);
    // 监听退出登录事件
    uni.$on('logout', this.handleLogout);
    // 监听同步完成事件
    uni.$on('sync_completed', this.checkLogin);

    // 初始检查登录状态
    this.forceRefreshLoginStatus();
  },
  onUnload: function onUnload() {
    // 组件销毁时移除事件监听
    uni.$off('login_success', this.handleLoginSuccess);
    uni.$off('logout', this.handleLogout);
    uni.$off('sync_completed', this.checkLogin);
  },
  methods: {
    // 强制刷新登录状态 - 完全刷新登录状态的可靠方法
    forceRefreshLoginStatus: function forceRefreshLoginStatus() {
      console.log('强制刷新登录状态...');

      // 先清空现有状态
      this.resetUIState();

      // 检查登录状态
      var loginStatus = _authService.default.checkLoginStatus();
      console.log('当前登录状态:', loginStatus);

      // 更新内部状态 
      this._isLoggedIn = loginStatus;
      if (loginStatus) {
        try {
          // 从本地存储获取最新用户信息
          var storedUserInfo = uni.getStorageSync('userInfo');
          if (!storedUserInfo) {
            console.error('登录状态异常：检测为已登录但无法获取用户信息');
            this._isLoggedIn = false;
            return;
          }

          // 确保userInfo是一个对象
          if (typeof storedUserInfo === 'string') {
            try {
              this.userInfo = JSON.parse(storedUserInfo);
            } catch (e) {
              console.error('解析用户信息失败:', e);
              this._isLoggedIn = false;
              return;
            }
          } else {
            this.userInfo = storedUserInfo;
          }

          // 检查用户ID
          if (!this.userInfo.id) {
            console.error('用户信息中缺少ID字段');
            if (this.userInfo.userId) {
              this.userInfo.id = this.userInfo.userId;
            } else {
              this._isLoggedIn = false;
              return;
            }
          }

          // 确保显示username字段
          if (!this.userInfo.username && this.userInfo.nickname) {
            this.userInfo.username = this.userInfo.nickname;
          }
          console.log('用户信息已刷新:', this.userInfo);

          // 获取用户最新信息
          this.fetchUserInfo();

          // 获取用户统计数据
          this.getUserStats();
        } catch (error) {
          console.error('强制刷新登录状态时出错:', error);
          this._isLoggedIn = false;
          this.resetUserInfo();
        }
      } else {
        console.log('用户未登录或会话已过期');
        this.resetUserInfo();
      }
    },
    // 重置UI状态，但保留内部状态
    resetUIState: function resetUIState() {
      this.userInfo = {
        avatar: '',
        nickname: '',
        username: '',
        id: ''
      };
      this.stats = {
        favorites: 0,
        history: 0,
        playlists: 0
      };
    },
    // 检查登录状态
    checkLogin: function checkLogin() {
      // 直接调用强制刷新方法
      this.forceRefreshLoginStatus();
    },
    // 重置用户信息
    resetUserInfo: function resetUserInfo() {
      this.userInfo = {
        avatar: '',
        nickname: '',
        username: '',
        id: ''
      };
      this.stats = {
        favorites: 0,
        history: 0,
        playlists: 0
      };
      this._isLoggedIn = false;
    },
    // 获取用户统计数据
    getUserStats: function getUserStats() {
      var _this2 = this;
      return (0, _asyncToGenerator2.default)( /*#__PURE__*/_regenerator.default.mark(function _callee() {
        var favoritePlaylists, playHistory, playlists;
        return _regenerator.default.wrap(function _callee$(_context) {
          while (1) {
            switch (_context.prev = _context.next) {
              case 0:
                _context.prev = 0;
                if (_this2.isLoggedIn) {
                  _context.next = 3;
                  break;
                }
                return _context.abrupt("return");
              case 3:
                // 使用封装好的函数获取数据
                favoritePlaylists = (0, _musicData.getFavoritePlaylists)();
                playHistory = (0, _musicData.getPlayHistory)();
                playlists = uni.getStorageSync('playlists') || []; // 更新统计数据
                _this2.stats.favorites = favoritePlaylists.length;
                _this2.stats.history = playHistory.length;
                _this2.stats.playlists = Array.isArray(playlists) ? playlists.length : 0;
                _context.next = 14;
                break;
              case 11:
                _context.prev = 11;
                _context.t0 = _context["catch"](0);
                console.error('获取用户统计数据失败：', _context.t0);
              case 14:
              case "end":
                return _context.stop();
            }
          }
        }, _callee, null, [[0, 11]]);
      }))();
    },
    // 修改头像
    changeAvatar: function changeAvatar() {
      var _this3 = this;
      if (!this.isLoggedIn) return;
      uni.chooseImage({
        count: 1,
        sizeType: ['compressed'],
        sourceType: ['album', 'camera'],
        success: function () {
          var _success = (0, _asyncToGenerator2.default)( /*#__PURE__*/_regenerator.default.mark(function _callee2(res) {
            var tempFilePath, base64, result;
            return _regenerator.default.wrap(function _callee2$(_context2) {
              while (1) {
                switch (_context2.prev = _context2.next) {
                  case 0:
                    tempFilePath = res.tempFilePaths[0];
                    _context2.prev = 1;
                    _context2.next = 4;
                    return _this3.imageToBase64(tempFilePath);
                  case 4:
                    base64 = _context2.sent;
                    _context2.next = 7;
                    return _authService.default.updateUserInfo({
                      avatar: base64
                    });
                  case 7:
                    result = _context2.sent;
                    if (result.code === 200) {
                      _this3.userInfo.avatar = base64;
                      uni.showToast({
                        title: '头像修改成功',
                        icon: 'success'
                      });
                    }
                    _context2.next = 15;
                    break;
                  case 11:
                    _context2.prev = 11;
                    _context2.t0 = _context2["catch"](1);
                    console.error('修改头像失败：', _context2.t0);
                    uni.showToast({
                      title: '修改头像失败',
                      icon: 'none'
                    });
                  case 15:
                  case "end":
                    return _context2.stop();
                }
              }
            }, _callee2, null, [[1, 11]]);
          }));
          function success(_x) {
            return _success.apply(this, arguments);
          }
          return success;
        }()
      });
    },
    // 图片转base64方法
    imageToBase64: function imageToBase64(filePath) {
      return new Promise(function (resolve, reject) {
        // 非H5环境使用uni.getFileSystemManager
        uni.getFileSystemManager().readFile({
          filePath: filePath,
          encoding: 'base64',
          success: function success(res) {
            resolve('data:image/jpeg;base64,' + res.data);
          },
          fail: function fail(err) {
            reject(err);
          }
        });
      });
    },
    // 获取最新的用户信息
    fetchUserInfo: function fetchUserInfo() {
      var _this4 = this;
      return (0, _asyncToGenerator2.default)( /*#__PURE__*/_regenerator.default.mark(function _callee3() {
        var result;
        return _regenerator.default.wrap(function _callee3$(_context3) {
          while (1) {
            switch (_context3.prev = _context3.next) {
              case 0:
                if (!(!_this4.isLoggedIn || !_this4.userInfo.id)) {
                  _context3.next = 2;
                  break;
                }
                return _context3.abrupt("return");
              case 2:
                _context3.prev = 2;
                _context3.next = 5;
                return _authService.default.getUserInfo(_this4.userInfo.id);
              case 5:
                result = _context3.sent;
                if (result && result.code === 200 && result.data) {
                  // 更新用户信息
                  _this4.userInfo = _objectSpread(_objectSpread({}, _this4.userInfo), result.data);
                  // 更新本地存储
                  uni.setStorageSync('userInfo', _this4.userInfo);
                  console.log('用户信息已更新:', _this4.userInfo);
                }
                _context3.next = 12;
                break;
              case 9:
                _context3.prev = 9;
                _context3.t0 = _context3["catch"](2);
                console.error('获取用户信息失败:', _context3.t0);
              case 12:
              case "end":
                return _context3.stop();
            }
          }
        }, _callee3, null, [[2, 9]]);
      }))();
    },
    // 跳转到登录页面
    goToLogin: function goToLogin() {
      uni.navigateTo({
        url: '/pages/login/login'
      });
    },
    // 跳转到收藏页面
    goToFavorites: function goToFavorites() {
      if (!this.isLoggedIn) {
        this.goToLogin();
        return;
      }
      uni.navigateTo({
        url: '/pages/user/favorites'
      });
    },
    // 跳转到历史记录页面
    goToHistory: function goToHistory() {
      if (!this.isLoggedIn) {
        this.goToLogin();
        return;
      }
      uni.navigateTo({
        url: '/pages/user/history'
      });
    },
    // 跳转到歌单页面
    goToPlaylists: function goToPlaylists() {
      if (this.isLoggedIn) {
        uni.navigateTo({
          url: '/pages/user/playlists'
        });
      } else {
        uni.showToast({
          title: '请先登录',
          icon: 'none'
        });
      }
    },
    // 跳转到设置页面
    goToSettings: function goToSettings() {
      if (!this.isLoggedIn) {
        this.goToLogin();
        return;
      }
      uni.navigateTo({
        url: '/pages/user/settings'
      });
    },
    // 处理登录成功事件
    handleLoginSuccess: function handleLoginSuccess(data) {
      var _this5 = this;
      console.log('收到登录成功事件:', data);

      // 立即尝试从缓存获取最新用户信息
      try {
        // 清除旧状态
        this.resetUIState();
        var storedUserInfo = uni.getStorageSync('userInfo');
        var token = uni.getStorageSync('token');
        if (storedUserInfo && token) {
          // 有缓存的用户信息，立即更新
          if (typeof storedUserInfo === 'string') {
            try {
              this.userInfo = JSON.parse(storedUserInfo);
            } catch (e) {
              console.error('解析用户信息失败:', e);
            }
          } else {
            this.userInfo = storedUserInfo;
          }

          // 确保ID字段存在
          if (!this.userInfo.id && data && data.userId) {
            this.userInfo.id = data.userId;
          }

          // 设置登录状态
          this._isLoggedIn = true;
          console.log('登录成功，用户信息已更新:', this.userInfo);

          // 立即更新统计数据
          this.getUserStats();
          this.loadUserData();
          this.loadSyncStatus();
          this.loadSyncStats();

          // 强制重新渲染视图
          this.$forceUpdate();

          // 确保用户看到登录后的状态，如果状态不一致则重载页面
          setTimeout(function () {
            if (!_this5.isLoggedIn || !_this5.userInfo.id) {
              console.log('登录状态不一致，重新加载页面...');
              uni.reLaunch({
                url: '/pages/user/user'
              });
            }
          }, 200);
        } else {
          // 没有缓存的用户信息，重新加载页面
          console.log('登录成功但未找到缓存的用户信息，将重新加载页面');
          uni.reLaunch({
            url: '/pages/user/user'
          });
        }
      } catch (error) {
        console.error('处理登录成功事件出错:', error);
        // 出错时重新加载页面
        uni.reLaunch({
          url: '/pages/user/user'
        });
      }
    },
    // 退出登录
    handleLogout: function handleLogout() {
      var _arguments = arguments,
        _this6 = this;
      return (0, _asyncToGenerator2.default)( /*#__PURE__*/_regenerator.default.mark(function _callee4() {
        var event, result;
        return _regenerator.default.wrap(function _callee4$(_context4) {
          while (1) {
            switch (_context4.prev = _context4.next) {
              case 0:
                event = _arguments.length > 0 && _arguments[0] !== undefined ? _arguments[0] : {};
                if (!_this6.isLoggingOut) {
                  _context4.next = 4;
                  break;
                }
                console.log('退出操作正在进行中，忽略重复点击');
                return _context4.abrupt("return");
              case 4:
                _context4.prev = 4;
                _this6.isLoggingOut = true;
                console.log('用户页面开始退出登录流程');

                // 先将播放器的内容保存到本地，以便在退出前同步
                uni.$emit('save_player_state');

                // 给播放器状态保存预留时间
                _context4.next = 10;
                return new Promise(function (resolve) {
                  return setTimeout(resolve, 300);
                });
              case 10:
                _context4.next = 12;
                return _authService.default.logout();
              case 12:
                result = _context4.sent;
                console.log('认证服务退出结果:', result);

                // 重置UI状态
                _this6._isLoggedIn = false;
                _this6.resetUserInfo();

                // 显示提示（如果不是静默模式）
                if (!event.silent) {
                  uni.showToast({
                    title: result.code === 200 ? '已退出登录' : '退出可能不完整',
                    icon: result.code === 200 ? 'success' : 'none'
                  });
                }

                // 不需要在这里跳转页面，authService.logout已经处理
                _context4.next = 25;
                break;
              case 19:
                _context4.prev = 19;
                _context4.t0 = _context4["catch"](4);
                console.error('退出登录过程发生异常:', _context4.t0);

                // 显示错误提示
                uni.showToast({
                  title: '退出处理中出现错误',
                  icon: 'none'
                });

                // 即使出错，也尝试重置状态
                _this6._isLoggedIn = false;
                _this6.resetUserInfo();

                // 不需要在这里跳转，authService.logout会处理错误情况下的跳转
              case 25:
                _context4.prev = 25;
                // 延迟恢复状态，避免短时间内重复操作
                setTimeout(function () {
                  _this6.isLoggingOut = false;
                  console.log('退出登录流程结束，重置状态');
                }, 1000);
                return _context4.finish(25);
              case 28:
              case "end":
                return _context4.stop();
            }
          }
        }, _callee4, null, [[4, 19, 25, 28]]);
      }))();
    },
    // 添加定期同步方法
    startAutoSync: function startAutoSync() {
      var _this7 = this;
      if (this.syncInterval) {
        clearInterval(this.syncInterval);
      }

      // 每5分钟同步一次数据
      this.syncInterval = setInterval( /*#__PURE__*/(0, _asyncToGenerator2.default)( /*#__PURE__*/_regenerator.default.mark(function _callee5() {
        return _regenerator.default.wrap(function _callee5$(_context5) {
          while (1) {
            switch (_context5.prev = _context5.next) {
              case 0:
                if (!(_this7.isLoggedIn && _this7.userInfo.id)) {
                  _context5.next = 3;
                  break;
                }
                _context5.next = 3;
                return syncUserDataToServer(_this7.userInfo.id);
              case 3:
              case "end":
                return _context5.stop();
            }
          }
        }, _callee5);
      })), 5 * 60 * 1000);
    },
    // 在组件销毁时清理
    beforeDestroy: function beforeDestroy() {
      if (this.syncInterval) {
        clearInterval(this.syncInterval);
      }
    },
    loadUserData: function loadUserData() {
      var _this8 = this;
      return (0, _asyncToGenerator2.default)( /*#__PURE__*/_regenerator.default.mark(function _callee6() {
        var favorites, history, playlists;
        return _regenerator.default.wrap(function _callee6$(_context6) {
          while (1) {
            switch (_context6.prev = _context6.next) {
              case 0:
                if (_this8.isLoggedIn) {
                  _context6.next = 2;
                  break;
                }
                return _context6.abrupt("return");
              case 2:
                // 加载收藏数量
                favorites = uni.getStorageSync("user_".concat(_this8.userInfo.id, "_favoriteSongs")) || [];
                _this8.favoriteCount = favorites.length;

                // 加载历史记录数量
                history = uni.getStorageSync("user_".concat(_this8.userInfo.id, "_playHistory")) || [];
                _this8.historyCount = history.length;

                // 加载歌单数量
                playlists = uni.getStorageSync("user_".concat(_this8.userInfo.id, "_playlists")) || [];
                _this8.playlistCount = playlists.length;

                // 加载上次同步时间
                _this8.lastSyncTime = uni.getStorageSync('lastSyncTime') || '';
              case 9:
              case "end":
                return _context6.stop();
            }
          }
        }, _callee6);
      }))();
    },
    // 修改用户名
    changeUsername: function changeUsername() {
      var _this9 = this;
      if (!this.isLoggedIn) return;
      uni.showModal({
        title: '修改用户名',
        editable: true,
        placeholderText: '请输入新用户名',
        content: this.userInfo.username || '',
        success: function () {
          var _success2 = (0, _asyncToGenerator2.default)( /*#__PURE__*/_regenerator.default.mark(function _callee7(res) {
            var result;
            return _regenerator.default.wrap(function _callee7$(_context7) {
              while (1) {
                switch (_context7.prev = _context7.next) {
                  case 0:
                    if (!(res.confirm && res.content)) {
                      _context7.next = 12;
                      break;
                    }
                    _context7.prev = 1;
                    _context7.next = 4;
                    return _authService.default.updateUserInfo({
                      username: res.content
                    });
                  case 4:
                    result = _context7.sent;
                    if (result.code === 200) {
                      _this9.userInfo.username = res.content;
                      // 同时更新nickname字段保持一致性
                      _this9.userInfo.nickname = res.content;
                      // 更新本地存储
                      uni.setStorageSync('userInfo', _this9.userInfo);
                      uni.showToast({
                        title: '用户名修改成功',
                        icon: 'success'
                      });
                    }
                    _context7.next = 12;
                    break;
                  case 8:
                    _context7.prev = 8;
                    _context7.t0 = _context7["catch"](1);
                    console.error('修改用户名失败：', _context7.t0);
                    uni.showToast({
                      title: '修改用户名失败',
                      icon: 'none'
                    });
                  case 12:
                  case "end":
                    return _context7.stop();
                }
              }
            }, _callee7, null, [[1, 8]]);
          }));
          function success(_x2) {
            return _success2.apply(this, arguments);
          }
          return success;
        }()
      });
    },
    // 显示同步详情弹窗
    showSyncDetails: function showSyncDetails() {
      if (this.isLoggedIn) {
        this.loadSyncStatus();
        this.loadSyncStats();
        this.$refs.syncPopup.open();
      } else {
        uni.showToast({
          title: '请先登录',
          icon: 'none'
        });
      }
    },
    // 关闭同步详情弹窗
    closeSyncPopup: function closeSyncPopup() {
      this.$refs.syncPopup.close();
    },
    // 加载同步状态
    loadSyncStatus: function loadSyncStatus() {
      if (!this.isLoggedIn || !this.userInfo.id) return;
      var syncStatusKey = _constants.STORAGE_KEYS.SYNC_STATUS(this.userInfo.id);
      var syncStatusData = (0, _storage.safeGetStorage)(syncStatusKey);
      if (syncStatusData) {
        this.syncStatus = syncStatusData.status || 'none';
        this.syncError = syncStatusData.error || '';
        if (syncStatusData.lastSync) {
          var date = new Date(syncStatusData.lastSync);
          this.lastSyncTime = date.toLocaleString();
        } else {
          this.lastSyncTime = '从未同步';
        }
      } else {
        this.syncStatus = 'none';
        this.lastSyncTime = '从未同步';
        this.syncError = '';
      }
    },
    // 加载同步统计数据
    loadSyncStats: function loadSyncStats() {
      if (!this.isLoggedIn || !this.userInfo.id) return;
      var userId = this.userInfo.id;
      var favorites = (0, _storage.safeGetStorage)(_constants.STORAGE_KEYS.FAVORITE_SONGS(userId)) || [];
      var history = (0, _storage.safeGetStorage)(_constants.STORAGE_KEYS.PLAY_HISTORY(userId)) || [];
      var playlists = (0, _storage.safeGetStorage)(_constants.STORAGE_KEYS.PLAYLISTS(userId)) || [];
      this.syncStats = {
        favorites: favorites.length,
        history: history.length,
        playlists: playlists.length
      };
    },
    // 开始手动同步
    startManualSync: function startManualSync() {
      var _this10 = this;
      return (0, _asyncToGenerator2.default)( /*#__PURE__*/_regenerator.default.mark(function _callee8() {
        var result;
        return _regenerator.default.wrap(function _callee8$(_context8) {
          while (1) {
            switch (_context8.prev = _context8.next) {
              case 0:
                if (!(!_this10.isLoggedIn || !_this10.userInfo.id)) {
                  _context8.next = 3;
                  break;
                }
                uni.showToast({
                  title: '请先登录',
                  icon: 'none'
                });
                return _context8.abrupt("return");
              case 3:
                if (!_this10.isSyncing) {
                  _context8.next = 5;
                  break;
                }
                return _context8.abrupt("return");
              case 5:
                _context8.prev = 5;
                _this10.isSyncing = true;
                _this10.syncStatus = 'syncing';
                _this10.syncError = '';
                uni.showLoading({
                  title: '正在同步数据...',
                  mask: true
                });
                _context8.next = 12;
                return (0, _syncService.syncAllUserData)(_this10.userInfo.id);
              case 12:
                result = _context8.sent;
                uni.hideLoading();
                if (result.code === 200) {
                  uni.showToast({
                    title: '同步成功',
                    icon: 'success'
                  });
                } else {
                  uni.showToast({
                    title: result.message || '部分同步成功',
                    icon: 'none'
                  });
                }
                _context8.next = 23;
                break;
              case 17:
                _context8.prev = 17;
                _context8.t0 = _context8["catch"](5);
                uni.hideLoading();
                uni.showToast({
                  title: '同步失败，请稍后重试',
                  icon: 'none'
                });
                console.error('手动同步失败:', _context8.t0);
                _this10.syncError = _context8.t0.message || '未知错误';
              case 23:
                _context8.prev = 23;
                _this10.isSyncing = false;
                _this10.loadSyncStatus();
                _this10.loadSyncStats();
                return _context8.finish(23);
              case 28:
              case "end":
                return _context8.stop();
            }
          }
        }, _callee8, null, [[5, 17, 23, 28]]);
      }))();
    }
  }
};
exports.default = _default;
/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(/*! ./node_modules/@dcloudio/uni-mp-weixin/dist/index.js */ 2)["default"]))

/***/ }),

/***/ 263:
/*!*****************************************************************************************************************************************!*\
  !*** D:/BaiduNetdiskDownload/uni-app-music/music-app/frontend/music-app-frontend/pages/user/user.vue?vue&type=style&index=0&lang=scss& ***!
  \*****************************************************************************************************************************************/
/*! no static exports found */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _hongmeng_HBuilderX_4_56_2025031210_HBuilderX_plugins_uniapp_cli_node_modules_mini_css_extract_plugin_dist_loader_js_ref_8_oneOf_1_0_hongmeng_HBuilderX_4_56_2025031210_HBuilderX_plugins_uniapp_cli_node_modules_css_loader_dist_cjs_js_ref_8_oneOf_1_1_hongmeng_HBuilderX_4_56_2025031210_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_loaders_stylePostLoader_js_hongmeng_HBuilderX_4_56_2025031210_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_8_oneOf_1_2_hongmeng_HBuilderX_4_56_2025031210_HBuilderX_plugins_uniapp_cli_node_modules_postcss_loader_src_index_js_ref_8_oneOf_1_3_hongmeng_HBuilderX_4_56_2025031210_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_sass_loader_dist_cjs_js_ref_8_oneOf_1_4_hongmeng_HBuilderX_4_56_2025031210_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_8_oneOf_1_5_hongmeng_HBuilderX_4_56_2025031210_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_index_js_vue_loader_options_hongmeng_HBuilderX_4_56_2025031210_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_style_js_user_vue_vue_type_style_index_0_lang_scss___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../../../../../hongmeng/HBuilderX.4.56.2025031210/HBuilderX/plugins/uniapp-cli/node_modules/mini-css-extract-plugin/dist/loader.js??ref--8-oneOf-1-0!../../../../../../../hongmeng/HBuilderX.4.56.2025031210/HBuilderX/plugins/uniapp-cli/node_modules/css-loader/dist/cjs.js??ref--8-oneOf-1-1!../../../../../../../hongmeng/HBuilderX.4.56.2025031210/HBuilderX/plugins/uniapp-cli/node_modules/@dcloudio/vue-cli-plugin-uni/packages/vue-loader/lib/loaders/stylePostLoader.js!../../../../../../../hongmeng/HBuilderX.4.56.2025031210/HBuilderX/plugins/uniapp-cli/node_modules/@dcloudio/vue-cli-plugin-uni/packages/webpack-preprocess-loader??ref--8-oneOf-1-2!../../../../../../../hongmeng/HBuilderX.4.56.2025031210/HBuilderX/plugins/uniapp-cli/node_modules/postcss-loader/src??ref--8-oneOf-1-3!../../../../../../../hongmeng/HBuilderX.4.56.2025031210/HBuilderX/plugins/uniapp-cli/node_modules/@dcloudio/vue-cli-plugin-uni/packages/sass-loader/dist/cjs.js??ref--8-oneOf-1-4!../../../../../../../hongmeng/HBuilderX.4.56.2025031210/HBuilderX/plugins/uniapp-cli/node_modules/@dcloudio/vue-cli-plugin-uni/packages/webpack-preprocess-loader??ref--8-oneOf-1-5!../../../../../../../hongmeng/HBuilderX.4.56.2025031210/HBuilderX/plugins/uniapp-cli/node_modules/@dcloudio/vue-cli-plugin-uni/packages/vue-loader/lib??vue-loader-options!../../../../../../../hongmeng/HBuilderX.4.56.2025031210/HBuilderX/plugins/uniapp-cli/node_modules/@dcloudio/webpack-uni-mp-loader/lib/style.js!./user.vue?vue&type=style&index=0&lang=scss& */ 264);
/* harmony import */ var _hongmeng_HBuilderX_4_56_2025031210_HBuilderX_plugins_uniapp_cli_node_modules_mini_css_extract_plugin_dist_loader_js_ref_8_oneOf_1_0_hongmeng_HBuilderX_4_56_2025031210_HBuilderX_plugins_uniapp_cli_node_modules_css_loader_dist_cjs_js_ref_8_oneOf_1_1_hongmeng_HBuilderX_4_56_2025031210_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_loaders_stylePostLoader_js_hongmeng_HBuilderX_4_56_2025031210_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_8_oneOf_1_2_hongmeng_HBuilderX_4_56_2025031210_HBuilderX_plugins_uniapp_cli_node_modules_postcss_loader_src_index_js_ref_8_oneOf_1_3_hongmeng_HBuilderX_4_56_2025031210_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_sass_loader_dist_cjs_js_ref_8_oneOf_1_4_hongmeng_HBuilderX_4_56_2025031210_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_8_oneOf_1_5_hongmeng_HBuilderX_4_56_2025031210_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_index_js_vue_loader_options_hongmeng_HBuilderX_4_56_2025031210_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_style_js_user_vue_vue_type_style_index_0_lang_scss___WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_hongmeng_HBuilderX_4_56_2025031210_HBuilderX_plugins_uniapp_cli_node_modules_mini_css_extract_plugin_dist_loader_js_ref_8_oneOf_1_0_hongmeng_HBuilderX_4_56_2025031210_HBuilderX_plugins_uniapp_cli_node_modules_css_loader_dist_cjs_js_ref_8_oneOf_1_1_hongmeng_HBuilderX_4_56_2025031210_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_loaders_stylePostLoader_js_hongmeng_HBuilderX_4_56_2025031210_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_8_oneOf_1_2_hongmeng_HBuilderX_4_56_2025031210_HBuilderX_plugins_uniapp_cli_node_modules_postcss_loader_src_index_js_ref_8_oneOf_1_3_hongmeng_HBuilderX_4_56_2025031210_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_sass_loader_dist_cjs_js_ref_8_oneOf_1_4_hongmeng_HBuilderX_4_56_2025031210_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_8_oneOf_1_5_hongmeng_HBuilderX_4_56_2025031210_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_index_js_vue_loader_options_hongmeng_HBuilderX_4_56_2025031210_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_style_js_user_vue_vue_type_style_index_0_lang_scss___WEBPACK_IMPORTED_MODULE_0__);
/* harmony reexport (unknown) */ for(var __WEBPACK_IMPORT_KEY__ in _hongmeng_HBuilderX_4_56_2025031210_HBuilderX_plugins_uniapp_cli_node_modules_mini_css_extract_plugin_dist_loader_js_ref_8_oneOf_1_0_hongmeng_HBuilderX_4_56_2025031210_HBuilderX_plugins_uniapp_cli_node_modules_css_loader_dist_cjs_js_ref_8_oneOf_1_1_hongmeng_HBuilderX_4_56_2025031210_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_loaders_stylePostLoader_js_hongmeng_HBuilderX_4_56_2025031210_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_8_oneOf_1_2_hongmeng_HBuilderX_4_56_2025031210_HBuilderX_plugins_uniapp_cli_node_modules_postcss_loader_src_index_js_ref_8_oneOf_1_3_hongmeng_HBuilderX_4_56_2025031210_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_sass_loader_dist_cjs_js_ref_8_oneOf_1_4_hongmeng_HBuilderX_4_56_2025031210_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_8_oneOf_1_5_hongmeng_HBuilderX_4_56_2025031210_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_index_js_vue_loader_options_hongmeng_HBuilderX_4_56_2025031210_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_style_js_user_vue_vue_type_style_index_0_lang_scss___WEBPACK_IMPORTED_MODULE_0__) if(["default"].indexOf(__WEBPACK_IMPORT_KEY__) < 0) (function(key) { __webpack_require__.d(__webpack_exports__, key, function() { return _hongmeng_HBuilderX_4_56_2025031210_HBuilderX_plugins_uniapp_cli_node_modules_mini_css_extract_plugin_dist_loader_js_ref_8_oneOf_1_0_hongmeng_HBuilderX_4_56_2025031210_HBuilderX_plugins_uniapp_cli_node_modules_css_loader_dist_cjs_js_ref_8_oneOf_1_1_hongmeng_HBuilderX_4_56_2025031210_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_loaders_stylePostLoader_js_hongmeng_HBuilderX_4_56_2025031210_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_8_oneOf_1_2_hongmeng_HBuilderX_4_56_2025031210_HBuilderX_plugins_uniapp_cli_node_modules_postcss_loader_src_index_js_ref_8_oneOf_1_3_hongmeng_HBuilderX_4_56_2025031210_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_sass_loader_dist_cjs_js_ref_8_oneOf_1_4_hongmeng_HBuilderX_4_56_2025031210_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_8_oneOf_1_5_hongmeng_HBuilderX_4_56_2025031210_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_index_js_vue_loader_options_hongmeng_HBuilderX_4_56_2025031210_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_style_js_user_vue_vue_type_style_index_0_lang_scss___WEBPACK_IMPORTED_MODULE_0__[key]; }) }(__WEBPACK_IMPORT_KEY__));
 /* harmony default export */ __webpack_exports__["default"] = (_hongmeng_HBuilderX_4_56_2025031210_HBuilderX_plugins_uniapp_cli_node_modules_mini_css_extract_plugin_dist_loader_js_ref_8_oneOf_1_0_hongmeng_HBuilderX_4_56_2025031210_HBuilderX_plugins_uniapp_cli_node_modules_css_loader_dist_cjs_js_ref_8_oneOf_1_1_hongmeng_HBuilderX_4_56_2025031210_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_loaders_stylePostLoader_js_hongmeng_HBuilderX_4_56_2025031210_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_8_oneOf_1_2_hongmeng_HBuilderX_4_56_2025031210_HBuilderX_plugins_uniapp_cli_node_modules_postcss_loader_src_index_js_ref_8_oneOf_1_3_hongmeng_HBuilderX_4_56_2025031210_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_sass_loader_dist_cjs_js_ref_8_oneOf_1_4_hongmeng_HBuilderX_4_56_2025031210_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_8_oneOf_1_5_hongmeng_HBuilderX_4_56_2025031210_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_index_js_vue_loader_options_hongmeng_HBuilderX_4_56_2025031210_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_style_js_user_vue_vue_type_style_index_0_lang_scss___WEBPACK_IMPORTED_MODULE_0___default.a); 

/***/ }),

/***/ 264:
/*!*********************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/mini-css-extract-plugin/dist/loader.js??ref--8-oneOf-1-0!./node_modules/css-loader/dist/cjs.js??ref--8-oneOf-1-1!./node_modules/@dcloudio/vue-cli-plugin-uni/packages/vue-loader/lib/loaders/stylePostLoader.js!./node_modules/@dcloudio/vue-cli-plugin-uni/packages/webpack-preprocess-loader??ref--8-oneOf-1-2!./node_modules/postcss-loader/src??ref--8-oneOf-1-3!./node_modules/@dcloudio/vue-cli-plugin-uni/packages/sass-loader/dist/cjs.js??ref--8-oneOf-1-4!./node_modules/@dcloudio/vue-cli-plugin-uni/packages/webpack-preprocess-loader??ref--8-oneOf-1-5!./node_modules/@dcloudio/vue-cli-plugin-uni/packages/vue-loader/lib??vue-loader-options!./node_modules/@dcloudio/webpack-uni-mp-loader/lib/style.js!D:/BaiduNetdiskDownload/uni-app-music/music-app/frontend/music-app-frontend/pages/user/user.vue?vue&type=style&index=0&lang=scss& ***!
  \*********************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

// extracted by mini-css-extract-plugin
    if(false) { var cssReload; }
  

/***/ })

},[[255,"common/runtime","common/vendor"]]]);
//# sourceMappingURL=../../../.sourcemap/mp-weixin/pages/user/user.js.map