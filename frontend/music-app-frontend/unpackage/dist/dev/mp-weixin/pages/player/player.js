(global["webpackJsonp"] = global["webpackJsonp"] || []).push([["pages/player/player"],{

/***/ 239:
/*!******************************************************************************************************************************!*\
  !*** D:/BaiduNetdiskDownload/uni-app-music/music-app/frontend/music-app-frontend/main.js?{"page":"pages%2Fplayer%2Fplayer"} ***!
  \******************************************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(wx, createPage) {

var _interopRequireDefault = __webpack_require__(/*! @babel/runtime/helpers/interopRequireDefault */ 4);
__webpack_require__(/*! uni-pages */ 26);
var _vue = _interopRequireDefault(__webpack_require__(/*! vue */ 25));
var _player = _interopRequireDefault(__webpack_require__(/*! ./pages/player/player.vue */ 240));
// @ts-ignore
wx.__webpack_require_UNI_MP_PLUGIN__ = __webpack_require__;
createPage(_player.default);
/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(/*! ./node_modules/@dcloudio/uni-mp-weixin/dist/wx.js */ 1)["default"], __webpack_require__(/*! ./node_modules/@dcloudio/uni-mp-weixin/dist/index.js */ 2)["createPage"]))

/***/ }),

/***/ 240:
/*!***********************************************************************************************************!*\
  !*** D:/BaiduNetdiskDownload/uni-app-music/music-app/frontend/music-app-frontend/pages/player/player.vue ***!
  \***********************************************************************************************************/
/*! no static exports found */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _player_vue_vue_type_template_id_f78da2b4___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./player.vue?vue&type=template&id=f78da2b4& */ 241);
/* harmony import */ var _player_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./player.vue?vue&type=script&lang=js& */ 243);
/* harmony reexport (unknown) */ for(var __WEBPACK_IMPORT_KEY__ in _player_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_1__) if(["default"].indexOf(__WEBPACK_IMPORT_KEY__) < 0) (function(key) { __webpack_require__.d(__webpack_exports__, key, function() { return _player_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_1__[key]; }) }(__WEBPACK_IMPORT_KEY__));
/* harmony import */ var _player_vue_vue_type_style_index_0_lang_scss___WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./player.vue?vue&type=style&index=0&lang=scss& */ 245);
/* harmony import */ var _hongmeng_HBuilderX_4_56_2025031210_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_runtime_componentNormalizer_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../../../../../../../hongmeng/HBuilderX.4.56.2025031210/HBuilderX/plugins/uniapp-cli/node_modules/@dcloudio/vue-cli-plugin-uni/packages/vue-loader/lib/runtime/componentNormalizer.js */ 38);

var renderjs





/* normalize component */

var component = Object(_hongmeng_HBuilderX_4_56_2025031210_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_runtime_componentNormalizer_js__WEBPACK_IMPORTED_MODULE_3__["default"])(
  _player_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_1__["default"],
  _player_vue_vue_type_template_id_f78da2b4___WEBPACK_IMPORTED_MODULE_0__["render"],
  _player_vue_vue_type_template_id_f78da2b4___WEBPACK_IMPORTED_MODULE_0__["staticRenderFns"],
  false,
  null,
  null,
  null,
  false,
  _player_vue_vue_type_template_id_f78da2b4___WEBPACK_IMPORTED_MODULE_0__["components"],
  renderjs
)

component.options.__file = "pages/player/player.vue"
/* harmony default export */ __webpack_exports__["default"] = (component.exports);

/***/ }),

/***/ 241:
/*!******************************************************************************************************************************************!*\
  !*** D:/BaiduNetdiskDownload/uni-app-music/music-app/frontend/music-app-frontend/pages/player/player.vue?vue&type=template&id=f78da2b4& ***!
  \******************************************************************************************************************************************/
/*! exports provided: render, staticRenderFns, recyclableRender, components */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _hongmeng_HBuilderX_4_56_2025031210_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_hongmeng_HBuilderX_4_56_2025031210_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_17_0_hongmeng_HBuilderX_4_56_2025031210_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_template_js_hongmeng_HBuilderX_4_56_2025031210_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_uni_app_loader_page_meta_js_hongmeng_HBuilderX_4_56_2025031210_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_index_js_vue_loader_options_hongmeng_HBuilderX_4_56_2025031210_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_style_js_player_vue_vue_type_template_id_f78da2b4___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../../../../../hongmeng/HBuilderX.4.56.2025031210/HBuilderX/plugins/uniapp-cli/node_modules/@dcloudio/vue-cli-plugin-uni/packages/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!../../../../../../../hongmeng/HBuilderX.4.56.2025031210/HBuilderX/plugins/uniapp-cli/node_modules/@dcloudio/vue-cli-plugin-uni/packages/webpack-preprocess-loader??ref--17-0!../../../../../../../hongmeng/HBuilderX.4.56.2025031210/HBuilderX/plugins/uniapp-cli/node_modules/@dcloudio/webpack-uni-mp-loader/lib/template.js!../../../../../../../hongmeng/HBuilderX.4.56.2025031210/HBuilderX/plugins/uniapp-cli/node_modules/@dcloudio/vue-cli-plugin-uni/packages/webpack-uni-app-loader/page-meta.js!../../../../../../../hongmeng/HBuilderX.4.56.2025031210/HBuilderX/plugins/uniapp-cli/node_modules/@dcloudio/vue-cli-plugin-uni/packages/vue-loader/lib??vue-loader-options!../../../../../../../hongmeng/HBuilderX.4.56.2025031210/HBuilderX/plugins/uniapp-cli/node_modules/@dcloudio/webpack-uni-mp-loader/lib/style.js!./player.vue?vue&type=template&id=f78da2b4& */ 242);
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "render", function() { return _hongmeng_HBuilderX_4_56_2025031210_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_hongmeng_HBuilderX_4_56_2025031210_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_17_0_hongmeng_HBuilderX_4_56_2025031210_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_template_js_hongmeng_HBuilderX_4_56_2025031210_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_uni_app_loader_page_meta_js_hongmeng_HBuilderX_4_56_2025031210_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_index_js_vue_loader_options_hongmeng_HBuilderX_4_56_2025031210_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_style_js_player_vue_vue_type_template_id_f78da2b4___WEBPACK_IMPORTED_MODULE_0__["render"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "staticRenderFns", function() { return _hongmeng_HBuilderX_4_56_2025031210_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_hongmeng_HBuilderX_4_56_2025031210_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_17_0_hongmeng_HBuilderX_4_56_2025031210_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_template_js_hongmeng_HBuilderX_4_56_2025031210_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_uni_app_loader_page_meta_js_hongmeng_HBuilderX_4_56_2025031210_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_index_js_vue_loader_options_hongmeng_HBuilderX_4_56_2025031210_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_style_js_player_vue_vue_type_template_id_f78da2b4___WEBPACK_IMPORTED_MODULE_0__["staticRenderFns"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "recyclableRender", function() { return _hongmeng_HBuilderX_4_56_2025031210_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_hongmeng_HBuilderX_4_56_2025031210_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_17_0_hongmeng_HBuilderX_4_56_2025031210_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_template_js_hongmeng_HBuilderX_4_56_2025031210_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_uni_app_loader_page_meta_js_hongmeng_HBuilderX_4_56_2025031210_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_index_js_vue_loader_options_hongmeng_HBuilderX_4_56_2025031210_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_style_js_player_vue_vue_type_template_id_f78da2b4___WEBPACK_IMPORTED_MODULE_0__["recyclableRender"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "components", function() { return _hongmeng_HBuilderX_4_56_2025031210_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_hongmeng_HBuilderX_4_56_2025031210_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_17_0_hongmeng_HBuilderX_4_56_2025031210_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_template_js_hongmeng_HBuilderX_4_56_2025031210_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_uni_app_loader_page_meta_js_hongmeng_HBuilderX_4_56_2025031210_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_index_js_vue_loader_options_hongmeng_HBuilderX_4_56_2025031210_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_style_js_player_vue_vue_type_template_id_f78da2b4___WEBPACK_IMPORTED_MODULE_0__["components"]; });



/***/ }),

/***/ 242:
/*!******************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/@dcloudio/vue-cli-plugin-uni/packages/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!./node_modules/@dcloudio/vue-cli-plugin-uni/packages/webpack-preprocess-loader??ref--17-0!./node_modules/@dcloudio/webpack-uni-mp-loader/lib/template.js!./node_modules/@dcloudio/vue-cli-plugin-uni/packages/webpack-uni-app-loader/page-meta.js!./node_modules/@dcloudio/vue-cli-plugin-uni/packages/vue-loader/lib??vue-loader-options!./node_modules/@dcloudio/webpack-uni-mp-loader/lib/style.js!D:/BaiduNetdiskDownload/uni-app-music/music-app/frontend/music-app-frontend/pages/player/player.vue?vue&type=template&id=f78da2b4& ***!
  \******************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************/
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
    uIcon: function () {
      return Promise.all(/*! import() | node-modules/uview-ui/components/u-icon/u-icon */[__webpack_require__.e("common/vendor"), __webpack_require__.e("node-modules/uview-ui/components/u-icon/u-icon")]).then(__webpack_require__.bind(null, /*! uview-ui/components/u-icon/u-icon.vue */ 336))
    },
    uPopup: function () {
      return Promise.all(/*! import() | node-modules/uview-ui/components/u-popup/u-popup */[__webpack_require__.e("common/vendor"), __webpack_require__.e("node-modules/uview-ui/components/u-popup/u-popup")]).then(__webpack_require__.bind(null, /*! uview-ui/components/u-popup/u-popup.vue */ 345))
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
  var m0 = _vm.formatTime(_vm.currentTime)
  var m1 = _vm.formatTime(_vm.duration)
  _vm.$mp.data = Object.assign(
    {},
    {
      $root: {
        m0: m0,
        m1: m1,
      },
    }
  )
}
var recyclableRender = false
var staticRenderFns = []
render._withStripped = true



/***/ }),

/***/ 243:
/*!************************************************************************************************************************************!*\
  !*** D:/BaiduNetdiskDownload/uni-app-music/music-app/frontend/music-app-frontend/pages/player/player.vue?vue&type=script&lang=js& ***!
  \************************************************************************************************************************************/
/*! no static exports found */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _hongmeng_HBuilderX_4_56_2025031210_HBuilderX_plugins_uniapp_cli_node_modules_babel_loader_lib_index_js_hongmeng_HBuilderX_4_56_2025031210_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_13_1_hongmeng_HBuilderX_4_56_2025031210_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_script_js_hongmeng_HBuilderX_4_56_2025031210_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_index_js_vue_loader_options_hongmeng_HBuilderX_4_56_2025031210_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_style_js_player_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../../../../../hongmeng/HBuilderX.4.56.2025031210/HBuilderX/plugins/uniapp-cli/node_modules/babel-loader/lib!../../../../../../../hongmeng/HBuilderX.4.56.2025031210/HBuilderX/plugins/uniapp-cli/node_modules/@dcloudio/vue-cli-plugin-uni/packages/webpack-preprocess-loader??ref--13-1!../../../../../../../hongmeng/HBuilderX.4.56.2025031210/HBuilderX/plugins/uniapp-cli/node_modules/@dcloudio/webpack-uni-mp-loader/lib/script.js!../../../../../../../hongmeng/HBuilderX.4.56.2025031210/HBuilderX/plugins/uniapp-cli/node_modules/@dcloudio/vue-cli-plugin-uni/packages/vue-loader/lib??vue-loader-options!../../../../../../../hongmeng/HBuilderX.4.56.2025031210/HBuilderX/plugins/uniapp-cli/node_modules/@dcloudio/webpack-uni-mp-loader/lib/style.js!./player.vue?vue&type=script&lang=js& */ 244);
/* harmony import */ var _hongmeng_HBuilderX_4_56_2025031210_HBuilderX_plugins_uniapp_cli_node_modules_babel_loader_lib_index_js_hongmeng_HBuilderX_4_56_2025031210_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_13_1_hongmeng_HBuilderX_4_56_2025031210_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_script_js_hongmeng_HBuilderX_4_56_2025031210_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_index_js_vue_loader_options_hongmeng_HBuilderX_4_56_2025031210_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_style_js_player_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_hongmeng_HBuilderX_4_56_2025031210_HBuilderX_plugins_uniapp_cli_node_modules_babel_loader_lib_index_js_hongmeng_HBuilderX_4_56_2025031210_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_13_1_hongmeng_HBuilderX_4_56_2025031210_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_script_js_hongmeng_HBuilderX_4_56_2025031210_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_index_js_vue_loader_options_hongmeng_HBuilderX_4_56_2025031210_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_style_js_player_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__);
/* harmony reexport (unknown) */ for(var __WEBPACK_IMPORT_KEY__ in _hongmeng_HBuilderX_4_56_2025031210_HBuilderX_plugins_uniapp_cli_node_modules_babel_loader_lib_index_js_hongmeng_HBuilderX_4_56_2025031210_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_13_1_hongmeng_HBuilderX_4_56_2025031210_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_script_js_hongmeng_HBuilderX_4_56_2025031210_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_index_js_vue_loader_options_hongmeng_HBuilderX_4_56_2025031210_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_style_js_player_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__) if(["default"].indexOf(__WEBPACK_IMPORT_KEY__) < 0) (function(key) { __webpack_require__.d(__webpack_exports__, key, function() { return _hongmeng_HBuilderX_4_56_2025031210_HBuilderX_plugins_uniapp_cli_node_modules_babel_loader_lib_index_js_hongmeng_HBuilderX_4_56_2025031210_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_13_1_hongmeng_HBuilderX_4_56_2025031210_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_script_js_hongmeng_HBuilderX_4_56_2025031210_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_index_js_vue_loader_options_hongmeng_HBuilderX_4_56_2025031210_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_style_js_player_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__[key]; }) }(__WEBPACK_IMPORT_KEY__));
 /* harmony default export */ __webpack_exports__["default"] = (_hongmeng_HBuilderX_4_56_2025031210_HBuilderX_plugins_uniapp_cli_node_modules_babel_loader_lib_index_js_hongmeng_HBuilderX_4_56_2025031210_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_13_1_hongmeng_HBuilderX_4_56_2025031210_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_script_js_hongmeng_HBuilderX_4_56_2025031210_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_index_js_vue_loader_options_hongmeng_HBuilderX_4_56_2025031210_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_style_js_player_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0___default.a); 

/***/ }),

/***/ 244:
/*!*******************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/babel-loader/lib!./node_modules/@dcloudio/vue-cli-plugin-uni/packages/webpack-preprocess-loader??ref--13-1!./node_modules/@dcloudio/webpack-uni-mp-loader/lib/script.js!./node_modules/@dcloudio/vue-cli-plugin-uni/packages/vue-loader/lib??vue-loader-options!./node_modules/@dcloudio/webpack-uni-mp-loader/lib/style.js!D:/BaiduNetdiskDownload/uni-app-music/music-app/frontend/music-app-frontend/pages/player/player.vue?vue&type=script&lang=js& ***!
  \*******************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************/
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
var _musicData = __webpack_require__(/*! @/utils/musicData.js */ 170);
function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); enumerableOnly && (symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; })), keys.push.apply(keys, symbols); } return keys; }
function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = null != arguments[i] ? arguments[i] : {}; i % 2 ? ownKeys(Object(source), !0).forEach(function (key) { (0, _defineProperty2.default)(target, key, source[key]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)) : ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } return target; }
var _default = {
  data: function data() {
    return {
      currentSong: {},
      isPlaying: false,
      currentTime: 0,
      duration: 0,
      progress: 0,
      defaultCover: '/static/music-cover.png',
      isSeeking: false,
      playList: [],
      currentIndex: -1,
      playMode: 'loop',
      // loop, single, random
      lyrics: [],
      currentLyricIndex: -1,
      scrollTop: 0,
      scrollTimer: null,
      audioContext: null,
      displayLyrics: Array(6).fill().map(function () {
        return {
          text: ''
        };
      }),
      // 初始化6行空歌词
      showPlayList: false // 控制播放列表弹窗显示
    };
  },

  computed: {
    playModeIcon: function playModeIcon() {
      switch (this.playMode) {
        case 'loop':
          return 'list-dot';
        case 'single':
          return 'reload';
        case 'random':
          return 'chrome-circle-fill';
        default:
          return 'list-dot';
      }
    },
    playModeText: function playModeText() {
      switch (this.playMode) {
        case 'loop':
          return '列表循环';
        case 'single':
          return '单曲循环';
        case 'random':
          return '随机播放';
        default:
          return '列表循环';
      }
    }
  },
  onLoad: function onLoad() {
    // 初始化音频上下文
    this.audioContext = uni.createInnerAudioContext();
    this.initAudioContext();

    // 设置自动播放
    this.audioContext.autoplay = true;

    // 标记用户交互
    uni.setStorageSync('hasUserInteraction', 'true');

    // 从播放历史加载播放列表
    try {
      var playHistory = (0, _musicData.getPlayHistory)();
      if (playHistory && playHistory.length > 0) {
        console.log('从播放历史加载播放列表，共', playHistory.length, '首歌曲');
        this.playList = playHistory;

        // 从本地存储获取当前索引
        var storedIndex = uni.getStorageSync('currentIndex');
        if (storedIndex !== '' && !isNaN(Number(storedIndex))) {
          this.currentIndex = Number(storedIndex);
        } else {
          // 如果没有保存的索引，使用0
          this.currentIndex = 0;
        }

        // 保存播放列表到存储
        uni.setStorageSync('playList', JSON.stringify(this.playList));
      } else {
        // 如果没有播放历史，尝试从本地获取播放列表
        var storedPlayList = uni.getStorageSync('playList');
        if (storedPlayList) {
          try {
            this.playList = JSON.parse(storedPlayList);
            console.log('从本地存储加载播放列表，共', this.playList.length, '首歌曲');

            // 获取当前索引
            var _storedIndex = uni.getStorageSync('currentIndex');
            if (_storedIndex !== '' && !isNaN(Number(_storedIndex))) {
              this.currentIndex = Number(_storedIndex);
            }
          } catch (e) {
            console.error('解析播放列表失败:', e);
            this.playList = [];
            this.currentIndex = -1;
          }
        } else {
          console.log('未找到播放列表和播放历史');
          this.playList = [];
          this.currentIndex = -1;
        }
      }
    } catch (e) {
      console.error('加载播放列表失败:', e);
      // 从本地存储获取播放列表作为备选
      var playList = uni.getStorageSync('playList');
      if (playList) {
        try {
          this.playList = JSON.parse(playList);
        } catch (parseError) {
          console.error('解析播放列表失败:', parseError);
          this.playList = [];
        }
      }
    }

    // 监听退出登录事件
    uni.$on('logout', this.handleLogout);

    // 监听保存播放状态事件
    uni.$on('save_player_state', this.savePlayerState);

    // 监听播放歌曲事件
    uni.$on('play_song', this.handlePlaySongEvent);
  },
  onShow: function onShow() {
    console.log('播放器页面显示');

    // 检查是否需要自动播放
    var autoPlay = uni.getStorageSync('autoPlay');
    if (autoPlay === 'true') {
      console.log('检测到自动播放标记');
      // 清除自动播放标志
      uni.removeStorageSync('autoPlay');

      // 加载并播放当前歌曲
      this.loadCurrentSong(true);
    } else {
      // 如果当前有歌曲在播放，继续播放
      if (this.currentSong && this.currentSong.id && this.isPlaying) {
        console.log('继续播放当前歌曲:', this.currentSong.name);
      } else if (this.currentSong && this.currentSong.id) {
        // 只更新UI，不自动播放
        console.log('显示当前歌曲信息但不播放:', this.currentSong.name);
        this.loadCurrentSong(false);
      } else {
        // 尝试从存储加载最近的歌曲
        console.log('尝试加载最近的歌曲');
        this.loadCurrentSong(false);
      }
    }
  },
  methods: {
    // 处理播放歌曲事件
    handlePlaySongEvent: function handlePlaySongEvent(data) {
      var _this = this;
      return (0, _asyncToGenerator2.default)( /*#__PURE__*/_regenerator.default.mark(function _callee3() {
        var songToPlay, playHistory, songIndex, pages, currentPage;
        return _regenerator.default.wrap(function _callee3$(_context3) {
          while (1) {
            switch (_context3.prev = _context3.next) {
              case 0:
                console.log('接收到播放事件:', data);
                if (!(!data || !data.song)) {
                  _context3.next = 4;
                  break;
                }
                console.error('播放数据无效');
                return _context3.abrupt("return");
              case 4:
                _context3.prev = 4;
                // 标准化歌曲数据，处理各种可能的字段命名
                songToPlay = {
                  id: data.song.id || data.song.songId || data.song.neteaseId || data.song.netease_id || '',
                  name: data.song.name || data.song.title || data.song.songName || '未知歌曲',
                  artist: data.song.artist || data.song.singer || data.song.artistName || '未知歌手',
                  album: data.song.album || data.song.albumName || '未知专辑',
                  cover: data.song.cover || data.song.coverUrl || data.song.cover_url || _this.defaultCover,
                  duration: data.song.duration || 0,
                  // 确保有URL
                  url: data.song.url || "https://music.163.com/song/media/outer/url?id=".concat(data.song.id, ".mp3")
                };
                console.log('标准化后的歌曲数据:', songToPlay);

                // 确保song对象有id
                if (songToPlay.id) {
                  _context3.next = 11;
                  break;
                }
                console.error('播放的歌曲缺少ID');
                uni.showToast({
                  title: '播放失败：歌曲ID缺失',
                  icon: 'none'
                });
                return _context3.abrupt("return");
              case 11:
                // 检查是否应该使用播放历史作为播放列表
                if (data.useHistoryAsPlaylist) {
                  try {
                    // 从播放历史获取播放列表
                    playHistory = (0, _musicData.getPlayHistory)();
                    console.log('已获取播放历史作为播放列表，长度:', playHistory.length);

                    // 使用播放历史作为播放列表
                    if (playHistory && playHistory.length > 0) {
                      _this.playList = playHistory;

                      // 查找当前歌曲在播放历史中的位置
                      songIndex = _this.playList.findIndex(function (item) {
                        return item.id === songToPlay.id;
                      });
                      _this.currentIndex = songIndex >= 0 ? songIndex : 0;

                      // 如果歌曲不在播放历史中，将其添加到播放列表的开头
                      if (songIndex === -1) {
                        _this.playList.unshift(songToPlay);
                        _this.currentIndex = 0;
                      }

                      // 保存到本地存储
                      uni.setStorageSync('playList', JSON.stringify(_this.playList));
                      uni.setStorageSync('currentIndex', _this.currentIndex);
                    } else {
                      // 历史为空，使用当前歌曲创建播放列表
                      _this.playList = [songToPlay];
                      _this.currentIndex = 0;
                      uni.setStorageSync('playList', JSON.stringify(_this.playList));
                      uni.setStorageSync('currentIndex', _this.currentIndex);
                    }
                  } catch (historyError) {
                    console.error('获取播放历史失败，使用单曲模式:', historyError);
                    // 如果获取播放历史失败，就只播放当前歌曲
                    _this.playList = [songToPlay];
                    _this.currentIndex = 0;
                    uni.setStorageSync('playList', JSON.stringify(_this.playList));
                    uni.setStorageSync('currentIndex', _this.currentIndex);
                  }
                } else if (data.playList && Array.isArray(data.playList) && data.index !== undefined) {
                  // 如果提供了完整的播放列表和索引

                  // 标准化播放列表中的每首歌曲
                  _this.playList = data.playList.map(function (song) {
                    // 确保ID字段的一致性
                    var songId = song.id || song.song_id || song.songId || song.netease_id || '';

                    // 标准化歌曲数据
                    var standardSong = {
                      id: songId,
                      song_id: song.song_id || songId,
                      // 保留song_id字段
                      name: song.name && song.name !== '未知歌曲' ? song.name : song.song_name || song.songName || song.title || '未知歌曲',
                      artist: song.artist || song.singer || song.artistName || '未知歌手',
                      album: song.album || song.albumName || '未知专辑',
                      cover: song.cover || song.coverUrl || song.cover_url || _this.defaultCover,
                      duration: song.duration || 0,
                      // 确保有URL
                      url: song.url || song.mp3Url || song.mp3_url || "https://music.163.com/song/media/outer/url?id=".concat(songId, ".mp3")
                    };
                    return standardSong;
                  });
                  _this.currentIndex = data.index;

                  // 保存到本地存储
                  uni.setStorageSync('playList', JSON.stringify(_this.playList));
                  uni.setStorageSync('currentIndex', _this.currentIndex);
                } else {
                  // 默认情况，只播放传入的歌曲
                  _this.playList = [songToPlay];
                  _this.currentIndex = 0;
                  uni.setStorageSync('playList', JSON.stringify(_this.playList));
                  uni.setStorageSync('currentIndex', _this.currentIndex);
                }

                // 检查是否需要页面跳转
                pages = getCurrentPages();
                currentPage = pages[pages.length - 1];
                if (!(currentPage.route !== 'pages/player/player')) {
                  _context3.next = 18;
                  break;
                }
                // 先跳转到播放器页面，再播放歌曲
                uni.switchTab({
                  url: '/pages/player/player',
                  success: function () {
                    var _success = (0, _asyncToGenerator2.default)( /*#__PURE__*/_regenerator.default.mark(function _callee2() {
                      return _regenerator.default.wrap(function _callee2$(_context2) {
                        while (1) {
                          switch (_context2.prev = _context2.next) {
                            case 0:
                              // 页面跳转成功后播放歌曲
                              setTimeout( /*#__PURE__*/(0, _asyncToGenerator2.default)( /*#__PURE__*/_regenerator.default.mark(function _callee() {
                                return _regenerator.default.wrap(function _callee$(_context) {
                                  while (1) {
                                    switch (_context.prev = _context.next) {
                                      case 0:
                                        _context.next = 2;
                                        return _this.playSong(songToPlay);
                                      case 2:
                                      case "end":
                                        return _context.stop();
                                    }
                                  }
                                }, _callee);
                              })), 300); // 给页面跳转一点时间
                            case 1:
                            case "end":
                              return _context2.stop();
                          }
                        }
                      }, _callee2);
                    }));
                    function success() {
                      return _success.apply(this, arguments);
                    }
                    return success;
                  }(),
                  fail: function fail(err) {
                    console.error('跳转到播放器页面失败:', err);
                    // 即使跳转失败，也尝试播放歌曲
                    _this.playSong(songToPlay);
                    uni.showToast({
                      title: '已开始播放，请点击底部播放按钮查看',
                      icon: 'none',
                      duration: 2000
                    });
                  }
                });
                _context3.next = 20;
                break;
              case 18:
                _context3.next = 20;
                return _this.playSong(songToPlay);
              case 20:
                _context3.next = 26;
                break;
              case 22:
                _context3.prev = 22;
                _context3.t0 = _context3["catch"](4);
                console.error('处理播放事件失败:', _context3.t0);
                uni.showToast({
                  title: '播放失败，请重试',
                  icon: 'none',
                  duration: 2000
                });
              case 26:
              case "end":
                return _context3.stop();
            }
          }
        }, _callee3, null, [[4, 22]]);
      }))();
    },
    // 处理用户交互
    handleUserInteraction: function handleUserInteraction() {
      // 记录用户交互
      uni.setStorageSync('hasUserInteraction', 'true');
      // 移除事件监听
      document.removeEventListener('click', this.handleUserInteraction);
      document.removeEventListener('touchstart', this.handleUserInteraction);
    },
    // 初始化音频上下文
    initAudioContext: function initAudioContext() {
      var _this2 = this;
      this.audioContext.onPlay(function () {
        _this2.isPlaying = true;
      });
      this.audioContext.onPause(function () {
        _this2.isPlaying = false;
      });
      this.audioContext.onStop(function () {
        _this2.isPlaying = false;
        _this2.currentTime = 0;
        _this2.progress = 0;
      });
      this.audioContext.onTimeUpdate(function () {
        if (!_this2.isSeeking) {
          _this2.currentTime = _this2.audioContext.currentTime;
          _this2.duration = _this2.audioContext.duration;
          _this2.progress = _this2.currentTime / _this2.duration * 100;
          _this2.updateLyric();
        }
      });
      this.audioContext.onEnded(function () {
        _this2.handleMusicEnd();
      });
      this.audioContext.onError(function (res) {
        console.error('播放错误：', res);
        uni.showToast({
          title: '播放失败，请尝试其他歌曲',
          icon: 'none',
          duration: 2000
        });
      });
    },
    // 加载当前歌曲
    loadCurrentSong: function loadCurrentSong() {
      var _arguments = arguments,
        _this3 = this;
      return (0, _asyncToGenerator2.default)( /*#__PURE__*/_regenerator.default.mark(function _callee4() {
        var shouldPlay, songInfo, song, songId, songDetail, lyricId, lyric, playList, storedIndex;
        return _regenerator.default.wrap(function _callee4$(_context4) {
          while (1) {
            switch (_context4.prev = _context4.next) {
              case 0:
                shouldPlay = _arguments.length > 0 && _arguments[0] !== undefined ? _arguments[0] : false;
                _context4.prev = 1;
                console.log('加载当前歌曲, 是否自动播放:', shouldPlay);

                // 从本地存储获取当前歌曲信息
                songInfo = uni.getStorageSync('currentSong');
                if (songInfo) {
                  _context4.next = 7;
                  break;
                }
                console.log('没有找到保存的歌曲信息');
                return _context4.abrupt("return");
              case 7:
                song = JSON.parse(songInfo); // 只有当没有正在播放的歌曲时，才设置新歌曲
                if (!(!_this3.currentSong.id || _this3.currentSong.id !== song.id)) {
                  _context4.next = 57;
                  break;
                }
                _this3.currentSong = song;
                _this3.audioContext.src = song.url;

                // 获取歌曲详情（包括封面等信息）
                _context4.prev = 11;
                console.log(song);

                // 优先使用song_id获取歌曲详情
                songId = song.song_id || song.id;
                console.log('使用ID获取歌曲详情:', songId);
                _context4.next = 17;
                return (0, _musicData.getMusicById)(songId);
              case 17:
                songDetail = _context4.sent;
                if (!songDetail) {
                  _context4.next = 23;
                  break;
                }
                console.log('获取到歌曲详情');
                _this3.currentSong = _objectSpread(_objectSpread({}, _this3.currentSong), songDetail);
                // 添加到播放历史
                _context4.next = 23;
                return (0, _musicData.addToPlayHistory)(_this3.currentSong);
              case 23:
                _context4.next = 28;
                break;
              case 25:
                _context4.prev = 25;
                _context4.t0 = _context4["catch"](11);
                console.error('获取歌曲详情失败：', _context4.t0);
              case 28:
                _context4.prev = 28;
                // 优先使用song_id获取歌词
                lyricId = song.song_id || song.id;
                console.log('使用ID获取歌词:', lyricId);
                _context4.next = 33;
                return (0, _musicData.getLyric)(lyricId);
              case 33:
                lyric = _context4.sent;
                _this3.lyrics = (0, _musicData.parseLyrics)(lyric);
                _this3.currentLyricIndex = -1;
                _this3.scrollTop = 0;
                console.log('加载歌词成功');
                _context4.next = 43;
                break;
              case 40:
                _context4.prev = 40;
                _context4.t1 = _context4["catch"](28);
                console.error('加载歌词失败：', _context4.t1);
              case 43:
                if (!shouldPlay) {
                  _context4.next = 55;
                  break;
                }
                console.log('尝试立即播放歌曲');
                _context4.prev = 45;
                _context4.next = 48;
                return _this3.audioContext.play();
              case 48:
                console.log('播放成功');
                _context4.next = 55;
                break;
              case 51:
                _context4.prev = 51;
                _context4.t2 = _context4["catch"](45);
                console.error('播放失败：', _context4.t2);
                uni.showToast({
                  title: '请点击播放按钮开始播放',
                  icon: 'none',
                  duration: 2000
                });
              case 55:
                _context4.next = 68;
                break;
              case 57:
                console.log('当前歌曲已加载，无需重新设置');
                // 如果需要播放但当前没有播放，就开始播放
                if (!(shouldPlay && !_this3.isPlaying)) {
                  _context4.next = 68;
                  break;
                }
                console.log('开始播放当前已加载的歌曲');
                _context4.prev = 60;
                _context4.next = 63;
                return _this3.audioContext.play();
              case 63:
                _context4.next = 68;
                break;
              case 65:
                _context4.prev = 65;
                _context4.t3 = _context4["catch"](60);
                console.error('播放失败：', _context4.t3);
              case 68:
                // 从本地存储获取播放列表
                playList = uni.getStorageSync('playList');
                if (playList) {
                  try {
                    _this3.playList = JSON.parse(playList);
                    // 优先使用song_id匹配歌曲
                    if (_this3.currentSong.song_id) {
                      _this3.currentIndex = _this3.playList.findIndex(function (item) {
                        return item.song_id && item.song_id === _this3.currentSong.song_id || item.id === _this3.currentSong.id;
                      });
                    } else {
                      _this3.currentIndex = _this3.playList.findIndex(function (item) {
                        return item.id === _this3.currentSong.id;
                      });
                    }
                    console.log('加载播放列表成功, 长度:', _this3.playList.length, '当前索引:', _this3.currentIndex);
                  } catch (e) {
                    console.error('解析播放列表失败:', e);
                  }
                }

                // 获取本地存储的当前索引
                storedIndex = uni.getStorageSync('currentIndex');
                if (storedIndex !== '' && !isNaN(Number(storedIndex))) {
                  _this3.currentIndex = Number(storedIndex);
                  console.log('从存储中恢复当前索引:', _this3.currentIndex);
                }
                _context4.next = 77;
                break;
              case 74:
                _context4.prev = 74;
                _context4.t4 = _context4["catch"](1);
                console.error('加载当前歌曲失败：', _context4.t4);
              case 77:
              case "end":
                return _context4.stop();
            }
          }
        }, _callee4, null, [[1, 74], [11, 25], [28, 40], [45, 51], [60, 65]]);
      }))();
    },
    // 播放歌曲
    playSong: function playSong(song) {
      var _this4 = this;
      return (0, _asyncToGenerator2.default)( /*#__PURE__*/_regenerator.default.mark(function _callee5() {
        var songId, idForUrl, lyricId, autoPlay;
        return _regenerator.default.wrap(function _callee5$(_context5) {
          while (1) {
            switch (_context5.prev = _context5.next) {
              case 0:
                _context5.prev = 0;
                console.log('开始播放歌曲:', song);

                // 重新检查确保歌曲对象包含必要属性
                if (song) {
                  _context5.next = 4;
                  break;
                }
                throw new Error('歌曲对象无效');
              case 4:
                // 确保ID字段的一致性，优先使用song_id
                songId = song.song_id || song.id || song.songId || song.netease_id || ''; // 标准化歌曲对象
                _this4.currentSong = {
                  id: song.id || songId,
                  // 保留原始id用于本地匹配
                  song_id: song.song_id || songId,
                  // 保留song_id字段用于API请求
                  name: song.name && song.name !== '未知歌曲' ? song.name : song.song_name || song.songName || song.title || '未知歌曲',
                  artist: song.artist || song.singer || song.artistName || '未知歌手',
                  album: song.album || song.albumName || '未知专辑',
                  cover: song.cover || song.coverUrl || song.cover_url || _this4.defaultCover,
                  duration: song.duration || 0,
                  url: song.url || song.mp3Url || song.mp3_url || "https://music.163.com/song/media/outer/url?id=".concat(song.song_id || songId, ".mp3")
                };

                // 确保歌曲信息有效
                if (!_this4.currentSong.id && !_this4.currentSong.song_id) {
                  console.warn('歌曲ID缺失，尝试创建默认唯一ID');
                  _this4.currentSong.id = "local_".concat(Date.now(), "_").concat(Math.random().toString(36).substring(2));
                }

                // 确保歌曲有URL，优先使用song_id
                if (!_this4.currentSong.url) {
                  idForUrl = _this4.currentSong.song_id || _this4.currentSong.id;
                  _this4.currentSong.url = "https://music.163.com/song/media/outer/url?id=".concat(idForUrl, ".mp3");
                  console.log('已自动生成歌曲URL:', _this4.currentSong.url);
                }

                // 歌曲URL解码，处理特殊字符
                try {
                  _this4.currentSong.url = decodeURIComponent(encodeURIComponent(_this4.currentSong.url));
                } catch (e) {
                  console.warn('URL解码失败，使用原URL:', e);
                }
                console.log('处理后的歌曲对象:', _this4.currentSong);

                // 保存当前播放歌曲
                uni.setStorageSync('currentSong', JSON.stringify(_this4.currentSong));

                // 添加到播放历史并同步到服务器
                _context5.prev = 11;
                _context5.next = 14;
                return (0, _musicData.addToPlayHistory)(_this4.currentSong);
              case 14:
                _context5.next = 19;
                break;
              case 16:
                _context5.prev = 16;
                _context5.t0 = _context5["catch"](11);
                console.error('添加播放历史失败:', _context5.t0);
              case 19:
                // 设置音频源
                _this4.audioContext.src = _this4.currentSong.url;

                // 重置进度条
                _this4.currentTime = 0;
                _this4.progress = 0;

                // 获取歌词，优先使用song_id
                lyricId = _this4.currentSong.song_id || _this4.currentSong.id;
                _this4.getLyrics(lyricId);

                // 自动播放
                autoPlay = uni.getStorageSync('autoPlay') === 'true';
                if (autoPlay) {
                  // 播放音频
                  _this4.audioContext.play();
                }
                _context5.next = 32;
                break;
              case 28:
                _context5.prev = 28;
                _context5.t1 = _context5["catch"](0);
                console.error('播放歌曲失败:', _context5.t1);
                uni.showToast({
                  title: _context5.t1.message || '播放失败，请重试',
                  icon: 'none'
                });
              case 32:
              case "end":
                return _context5.stop();
            }
          }
        }, _callee5, null, [[0, 28], [11, 16]]);
      }))();
    },
    // 切换播放状态
    togglePlay: function togglePlay() {
      var _this5 = this;
      return (0, _asyncToGenerator2.default)( /*#__PURE__*/_regenerator.default.mark(function _callee6() {
        return _regenerator.default.wrap(function _callee6$(_context6) {
          while (1) {
            switch (_context6.prev = _context6.next) {
              case 0:
                if (_this5.currentSong.url) {
                  _context6.next = 2;
                  break;
                }
                return _context6.abrupt("return");
              case 2:
                _context6.prev = 2;
                if (!_this5.isPlaying) {
                  _context6.next = 7;
                  break;
                }
                _this5.audioContext.pause();
                _context6.next = 10;
                break;
              case 7:
                // 记录用户交互
                uni.setStorageSync('hasUserInteraction', 'true');
                _context6.next = 10;
                return _this5.audioContext.play();
              case 10:
                _context6.next = 15;
                break;
              case 12:
                _context6.prev = 12;
                _context6.t0 = _context6["catch"](2);
                console.error('播放控制失败：', _context6.t0);
              case 15:
              case "end":
                return _context6.stop();
            }
          }
        }, _callee6, null, [[2, 12]]);
      }))();
    },
    // 切换播放模式
    togglePlayMode: function togglePlayMode() {
      var modes = ['loop', 'single', 'random'];
      var currentIndex = modes.indexOf(this.playMode);
      this.playMode = modes[(currentIndex + 1) % modes.length];

      // 显示切换提示
      uni.showToast({
        title: this.playModeText,
        icon: 'none',
        duration: 1500
      });
    },
    // 播放上一首
    playPrev: function playPrev() {
      if (this.playList.length === 0) {
        uni.showToast({
          title: '播放列表为空',
          icon: 'none',
          duration: 1000
        });
        return;
      }

      // 检查当前索引是否有效
      if (this.currentIndex === -1 && this.playList.length > 0) {
        this.currentIndex = 0;
      }

      // 如果正在播放，先停止当前歌曲
      this.audioContext.stop();
      switch (this.playMode) {
        case 'random':
          // 生成一个不包含当前索引的随机索引
          var newRandomIndex;
          do {
            newRandomIndex = Math.floor(Math.random() * this.playList.length);
          } while (newRandomIndex === this.currentIndex && this.playList.length > 1);
          this.currentIndex = newRandomIndex;
          break;
        default:
          if (this.currentIndex <= 0) {
            this.currentIndex = this.playList.length - 1;
          } else {
            this.currentIndex--;
          }
      }
      console.log('播放上一首，当前索引:', this.currentIndex);
      // 保存当前索引到本地存储
      uni.setStorageSync('currentIndex', this.currentIndex);
      this.playSong(this.playList[this.currentIndex]);
      uni.showToast({
        title: '上一首',
        icon: 'none',
        duration: 1000
      });
    },
    // 播放下一首
    playNext: function playNext() {
      if (this.playList.length === 0) {
        uni.showToast({
          title: '播放列表为空',
          icon: 'none',
          duration: 1000
        });
        return;
      }

      // 检查当前索引是否有效
      if (this.currentIndex === -1 && this.playList.length > 0) {
        this.currentIndex = 0;
      }

      // 如果正在播放，先停止当前歌曲
      this.audioContext.stop();
      switch (this.playMode) {
        case 'random':
          // 生成一个不包含当前索引的随机索引
          var newRandomIndex;
          do {
            newRandomIndex = Math.floor(Math.random() * this.playList.length);
          } while (newRandomIndex === this.currentIndex && this.playList.length > 1);
          this.currentIndex = newRandomIndex;
          break;
        case 'single':
          // 单曲循环模式下重新播放当前歌曲
          this.audioContext.seek(0);
          this.audioContext.play();
          uni.showToast({
            title: '重新播放',
            icon: 'none',
            duration: 1000
          });
          return;
        default:
          if (this.currentIndex >= this.playList.length - 1) {
            this.currentIndex = 0;
          } else {
            this.currentIndex++;
          }
      }
      console.log('播放下一首，当前索引:', this.currentIndex);
      // 保存当前索引到本地存储
      uni.setStorageSync('currentIndex', this.currentIndex);
      this.playSong(this.playList[this.currentIndex]);
      uni.showToast({
        title: '下一首',
        icon: 'none',
        duration: 1000
      });
    },
    // 处理音乐播放结束
    handleMusicEnd: function handleMusicEnd() {
      switch (this.playMode) {
        case 'single':
          // 单曲循环模式下重新播放当前歌曲
          this.audioContext.seek(0);
          this.audioContext.play();
          break;
        default:
          this.playNext();
      }
    },
    // 进度条改变中
    onSliderChanging: function onSliderChanging(e) {
      this.isSeeking = true;
      this.progress = e.detail.value;
      this.currentTime = this.progress / 100 * this.duration;
    },
    // 进度条改变完成
    onSliderChange: function onSliderChange(e) {
      this.isSeeking = false;
      var position = e.detail.value / 100 * this.duration;
      this.audioContext.seek(position);
    },
    // 格式化时间
    formatTime: function formatTime(time) {
      if (!time) return '00:00';
      var minutes = Math.floor(time / 60);
      var seconds = Math.floor(time % 60);
      return "".concat(minutes.toString().padStart(2, '0'), ":").concat(seconds.toString().padStart(2, '0'));
    },
    // 更新歌词
    updateLyric: function updateLyric() {
      var _this6 = this;
      var currentTime = this.currentTime;
      var index = this.lyrics.findIndex(function (line, i) {
        var nextLine = _this6.lyrics[i + 1];
        return line.time <= currentTime && (!nextLine || nextLine.time > currentTime);
      });
      if (index !== this.currentLyricIndex) {
        this.currentLyricIndex = index;
        this.updateDisplayLyrics(index);
      }
    },
    // 更新显示的6行歌词
    updateDisplayLyrics: function updateDisplayLyrics(currentIndex) {
      var _this7 = this;
      if (currentIndex < 0 || !this.lyrics.length) {
        // 创建6个独立的空歌词对象，而不是共享同一个引用
        this.displayLyrics = Array(6).fill().map(function () {
          return {
            text: ''
          };
        });
        return;
      }

      // 计算需要显示的歌词范围
      var start = Math.max(0, currentIndex - 2);
      var end = Math.min(this.lyrics.length, start + 6);

      // 构建显示的歌词数组 - 确保每个对象都是独立的
      this.displayLyrics = Array(6).fill().map(function (_, index) {
        var lyricIndex = start + index;
        return lyricIndex < end ? _objectSpread({}, _this7.lyrics[lyricIndex]) : {
          text: ''
        };
      });
    },
    // 滚动到当前歌词
    scrollToCurrentLyric: function scrollToCurrentLyric() {
      if (this.currentLyricIndex < 0) return;
      var lineHeight = 80; // 每行歌词的高度
      var scrollTop = this.currentLyricIndex * lineHeight - 200; // 200是偏移量，使当前歌词显示在中间位置

      this.scrollTop = scrollTop;
    },
    // 处理滚动事件
    handleScroll: function handleScroll(e) {
      var _this8 = this;
      if (this.scrollTimer) {
        clearTimeout(this.scrollTimer);
      }
      this.scrollTimer = setTimeout(function () {
        var scrollTop = e.detail.scrollTop;
        var lineHeight = 80;
        var index = Math.round(scrollTop / lineHeight);
        if (index >= 0 && index < _this8.lyrics.length) {
          _this8.currentLyricIndex = index;
          _this8.seekToTime(_this8.lyrics[index].time);
        }
      }, 100);
    },
    // 跳转到指定时间
    seekToTime: function seekToTime(time) {
      this.audioContext.seek(time);
    },
    // 返回上一页
    goBack: function goBack() {
      uni.navigateBack();
    },
    // 处理播放列表弹窗变化
    onPopupChange: function onPopupChange(e) {
      // 这里可以根据需要处理播放列表弹窗的变化
    },
    // 打开播放列表
    popupList: function popupList() {
      console.log('打开播放列表');
      this.showPlayList = true;
    },
    // 关闭播放列表
    closePlayList: function closePlayList() {
      console.log('关闭播放列表');
      this.showPlayList = false;
    },
    // 通过索引播放歌曲
    playSongByIndex: function playSongByIndex(index) {
      if (index === this.currentIndex) {
        this.closePlayList();
        return;
      }

      // 立即播放选中的歌曲
      this.currentIndex = index;
      // 保存当前索引到本地存储
      uni.setStorageSync('currentIndex', this.currentIndex);
      this.playSong(this.playList[index]);
      this.closePlayList();

      // 显示提示
      uni.showToast({
        title: '正在播放',
        icon: 'none',
        duration: 1000
      });
    },
    // 清空播放列表
    clearPlayList: function clearPlayList() {
      var _this9 = this;
      // 先关闭弹窗，再显示确认对话框
      this.showPlayList = false;

      // 延迟显示确认对话框，确保弹窗已关闭
      setTimeout(function () {
        uni.showModal({
          title: '提示',
          content: '确定要清空播放列表吗？',
          success: function success(res) {
            if (res.confirm) {
              _this9.audioContext.stop();
              _this9.currentSong = {};
              _this9.currentIndex = -1;
              _this9.playList = [];
              uni.removeStorageSync('playList');
              uni.removeStorageSync('currentSong');
              uni.showToast({
                title: '播放列表已清空',
                icon: 'success',
                duration: 2000
              });
            }
          }
        });
      }, 300);
    },
    // 删除单首歌曲
    deleteSong: function deleteSong(index) {
      var _this10 = this;
      // 先关闭弹窗，再显示确认对话框
      this.showPlayList = false;

      // 延迟显示确认对话框，确保弹窗已关闭
      setTimeout(function () {
        uni.showModal({
          title: '提示',
          content: '确定要删除这首歌吗？',
          success: function success(res) {
            if (res.confirm) {
              // 如果删除的是当前播放的歌曲
              if (index === _this10.currentIndex) {
                // 如果播放列表只剩一首歌，停止播放并重置状态
                if (_this10.playList.length === 1) {
                  _this10.audioContext.stop();
                  _this10.currentSong = {};
                  _this10.currentIndex = -1;
                  _this10.playList = [];
                  uni.removeStorageSync('playList');
                  uni.removeStorageSync('currentSong');
                  uni.showToast({
                    title: '播放列表已清空',
                    icon: 'success',
                    duration: 2000
                  });
                  return;
                }
                // 否则播放下一首
                _this10.playNext();
              }

              // 从播放列表中删除
              _this10.playList.splice(index, 1);
              // 更新当前索引
              if (index < _this10.currentIndex) {
                _this10.currentIndex--;
              }
              // 保存更新后的播放列表
              uni.setStorageSync('playList', JSON.stringify(_this10.playList));
              uni.showToast({
                title: '已从播放列表移除',
                icon: 'success',
                duration: 2000
              });
            } else {
              // 用户取消了删除操作，重新打开播放列表
              _this10.showPlayList = true;
            }
          }
        });
      }, 300);
    },
    // 处理删除按钮点击
    handleDeleteClick: function handleDeleteClick(index) {
      // 阻止事件冒泡
      event.stopPropagation && event.stopPropagation();
      // 调用删除方法
      this.deleteSong(index);
    },
    // 处理退出登录
    handleLogout: function handleLogout() {
      var event = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
      console.log('播放器收到登出事件:', event);

      // 同步播放列表到服务器，确保不会丢失
      if (this.playList && this.playList.length > 0) {
        try {
          // 只在非清除模式下保存本地列表
          if (!event.clearLocal) {
            uni.setStorageSync('playList', JSON.stringify(this.playList));
            console.log('播放列表已保存到本地存储');
          }
        } catch (e) {
          console.error('保存播放列表失败:', e);
        }
      }

      // 停止播放
      if (this.audioContext) {
        try {
          this.audioContext.stop();
        } catch (e) {
          console.error('停止播放失败:', e);
        }
      }

      // 清空播放状态
      this.isPlaying = false;
      this.currentSong = {};
      this.currentIndex = -1;
      this.playList = [];
      this.currentTime = 0;
      this.duration = 0;
      this.progress = 0;
      this.lyrics = [];
      this.currentLyricIndex = -1;

      // 清除本地存储的播放列表（因为已经同步到了服务器）
      if (event.clearLocal) {
        try {
          uni.removeStorageSync('playList');
          uni.removeStorageSync('currentSong');
          console.log('本地播放列表已清除');
        } catch (e) {
          console.error('清除本地播放列表失败:', e);
        }
      }
    },
    // 保存播放器状态
    savePlayerState: function savePlayerState() {
      console.log('保存播放器状态');
      if (this.playList && this.playList.length > 0) {
        try {
          uni.setStorageSync('playList', JSON.stringify(this.playList));
          console.log('已保存播放列表，长度:', this.playList.length);
          if (this.currentSong && this.currentSong.id) {
            uni.setStorageSync('currentSong', this.currentSong);
            console.log('已保存当前歌曲:', this.currentSong.name);
          }

          // 保存当前索引
          if (this.currentIndex >= 0) {
            uni.setStorageSync('currentIndex', this.currentIndex);
            console.log('已保存当前索引:', this.currentIndex);
          }
        } catch (error) {
          console.error('保存播放器状态失败:', error);
        }
      } else {
        console.log('播放列表为空，无需保存');
      }
    },
    // 加载歌词
    getLyrics: function getLyrics(songId) {
      var _this11 = this;
      return (0, _asyncToGenerator2.default)( /*#__PURE__*/_regenerator.default.mark(function _callee7() {
        var lyric;
        return _regenerator.default.wrap(function _callee7$(_context7) {
          while (1) {
            switch (_context7.prev = _context7.next) {
              case 0:
                _context7.prev = 0;
                if (songId) {
                  _context7.next = 8;
                  break;
                }
                console.warn('歌词ID无效，尝试使用currentSong中的ID');
                // 尝试从当前歌曲中获取ID
                songId = _this11.currentSong.id || _this11.currentSong.song_id;
                if (songId) {
                  _context7.next = 8;
                  break;
                }
                console.error('无法获取有效的歌曲ID，无法加载歌词');
                _this11.lyrics = (0, _musicData.parseLyrics)('[00:00.00]暂无歌词');
                return _context7.abrupt("return");
              case 8:
                console.log('获取歌词，ID:', songId);
                _context7.next = 11;
                return (0, _musicData.getLyric)(songId);
              case 11:
                lyric = _context7.sent;
                _this11.lyrics = (0, _musicData.parseLyrics)(lyric);
                _this11.currentLyricIndex = -1;
                _this11.scrollTop = 0;
                _context7.next = 21;
                break;
              case 17:
                _context7.prev = 17;
                _context7.t0 = _context7["catch"](0);
                console.error('获取歌词失败:', _context7.t0);
                // 设置默认歌词
                _this11.lyrics = (0, _musicData.parseLyrics)('[00:00.00]暂无歌词');
              case 21:
              case "end":
                return _context7.stop();
            }
          }
        }, _callee7, null, [[0, 17]]);
      }))();
    }
  },
  onUnload: function onUnload() {
    if (this.scrollTimer) {
      clearTimeout(this.scrollTimer);
    }
    if (this.audioContext) {
      this.audioContext.stop();
      this.audioContext.destroy();
    }
    // 移除事件监听
    uni.$off('logout', this.handleLogout);
    uni.$off('save_player_state', this.savePlayerState);
    uni.$off('play_song', this.handlePlaySongEvent);
  }
};
exports.default = _default;
/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(/*! ./node_modules/@dcloudio/uni-mp-weixin/dist/index.js */ 2)["default"]))

/***/ }),

/***/ 245:
/*!*********************************************************************************************************************************************!*\
  !*** D:/BaiduNetdiskDownload/uni-app-music/music-app/frontend/music-app-frontend/pages/player/player.vue?vue&type=style&index=0&lang=scss& ***!
  \*********************************************************************************************************************************************/
/*! no static exports found */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _hongmeng_HBuilderX_4_56_2025031210_HBuilderX_plugins_uniapp_cli_node_modules_mini_css_extract_plugin_dist_loader_js_ref_8_oneOf_1_0_hongmeng_HBuilderX_4_56_2025031210_HBuilderX_plugins_uniapp_cli_node_modules_css_loader_dist_cjs_js_ref_8_oneOf_1_1_hongmeng_HBuilderX_4_56_2025031210_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_loaders_stylePostLoader_js_hongmeng_HBuilderX_4_56_2025031210_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_8_oneOf_1_2_hongmeng_HBuilderX_4_56_2025031210_HBuilderX_plugins_uniapp_cli_node_modules_postcss_loader_src_index_js_ref_8_oneOf_1_3_hongmeng_HBuilderX_4_56_2025031210_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_sass_loader_dist_cjs_js_ref_8_oneOf_1_4_hongmeng_HBuilderX_4_56_2025031210_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_8_oneOf_1_5_hongmeng_HBuilderX_4_56_2025031210_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_index_js_vue_loader_options_hongmeng_HBuilderX_4_56_2025031210_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_style_js_player_vue_vue_type_style_index_0_lang_scss___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../../../../../hongmeng/HBuilderX.4.56.2025031210/HBuilderX/plugins/uniapp-cli/node_modules/mini-css-extract-plugin/dist/loader.js??ref--8-oneOf-1-0!../../../../../../../hongmeng/HBuilderX.4.56.2025031210/HBuilderX/plugins/uniapp-cli/node_modules/css-loader/dist/cjs.js??ref--8-oneOf-1-1!../../../../../../../hongmeng/HBuilderX.4.56.2025031210/HBuilderX/plugins/uniapp-cli/node_modules/@dcloudio/vue-cli-plugin-uni/packages/vue-loader/lib/loaders/stylePostLoader.js!../../../../../../../hongmeng/HBuilderX.4.56.2025031210/HBuilderX/plugins/uniapp-cli/node_modules/@dcloudio/vue-cli-plugin-uni/packages/webpack-preprocess-loader??ref--8-oneOf-1-2!../../../../../../../hongmeng/HBuilderX.4.56.2025031210/HBuilderX/plugins/uniapp-cli/node_modules/postcss-loader/src??ref--8-oneOf-1-3!../../../../../../../hongmeng/HBuilderX.4.56.2025031210/HBuilderX/plugins/uniapp-cli/node_modules/@dcloudio/vue-cli-plugin-uni/packages/sass-loader/dist/cjs.js??ref--8-oneOf-1-4!../../../../../../../hongmeng/HBuilderX.4.56.2025031210/HBuilderX/plugins/uniapp-cli/node_modules/@dcloudio/vue-cli-plugin-uni/packages/webpack-preprocess-loader??ref--8-oneOf-1-5!../../../../../../../hongmeng/HBuilderX.4.56.2025031210/HBuilderX/plugins/uniapp-cli/node_modules/@dcloudio/vue-cli-plugin-uni/packages/vue-loader/lib??vue-loader-options!../../../../../../../hongmeng/HBuilderX.4.56.2025031210/HBuilderX/plugins/uniapp-cli/node_modules/@dcloudio/webpack-uni-mp-loader/lib/style.js!./player.vue?vue&type=style&index=0&lang=scss& */ 246);
/* harmony import */ var _hongmeng_HBuilderX_4_56_2025031210_HBuilderX_plugins_uniapp_cli_node_modules_mini_css_extract_plugin_dist_loader_js_ref_8_oneOf_1_0_hongmeng_HBuilderX_4_56_2025031210_HBuilderX_plugins_uniapp_cli_node_modules_css_loader_dist_cjs_js_ref_8_oneOf_1_1_hongmeng_HBuilderX_4_56_2025031210_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_loaders_stylePostLoader_js_hongmeng_HBuilderX_4_56_2025031210_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_8_oneOf_1_2_hongmeng_HBuilderX_4_56_2025031210_HBuilderX_plugins_uniapp_cli_node_modules_postcss_loader_src_index_js_ref_8_oneOf_1_3_hongmeng_HBuilderX_4_56_2025031210_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_sass_loader_dist_cjs_js_ref_8_oneOf_1_4_hongmeng_HBuilderX_4_56_2025031210_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_8_oneOf_1_5_hongmeng_HBuilderX_4_56_2025031210_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_index_js_vue_loader_options_hongmeng_HBuilderX_4_56_2025031210_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_style_js_player_vue_vue_type_style_index_0_lang_scss___WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_hongmeng_HBuilderX_4_56_2025031210_HBuilderX_plugins_uniapp_cli_node_modules_mini_css_extract_plugin_dist_loader_js_ref_8_oneOf_1_0_hongmeng_HBuilderX_4_56_2025031210_HBuilderX_plugins_uniapp_cli_node_modules_css_loader_dist_cjs_js_ref_8_oneOf_1_1_hongmeng_HBuilderX_4_56_2025031210_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_loaders_stylePostLoader_js_hongmeng_HBuilderX_4_56_2025031210_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_8_oneOf_1_2_hongmeng_HBuilderX_4_56_2025031210_HBuilderX_plugins_uniapp_cli_node_modules_postcss_loader_src_index_js_ref_8_oneOf_1_3_hongmeng_HBuilderX_4_56_2025031210_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_sass_loader_dist_cjs_js_ref_8_oneOf_1_4_hongmeng_HBuilderX_4_56_2025031210_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_8_oneOf_1_5_hongmeng_HBuilderX_4_56_2025031210_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_index_js_vue_loader_options_hongmeng_HBuilderX_4_56_2025031210_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_style_js_player_vue_vue_type_style_index_0_lang_scss___WEBPACK_IMPORTED_MODULE_0__);
/* harmony reexport (unknown) */ for(var __WEBPACK_IMPORT_KEY__ in _hongmeng_HBuilderX_4_56_2025031210_HBuilderX_plugins_uniapp_cli_node_modules_mini_css_extract_plugin_dist_loader_js_ref_8_oneOf_1_0_hongmeng_HBuilderX_4_56_2025031210_HBuilderX_plugins_uniapp_cli_node_modules_css_loader_dist_cjs_js_ref_8_oneOf_1_1_hongmeng_HBuilderX_4_56_2025031210_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_loaders_stylePostLoader_js_hongmeng_HBuilderX_4_56_2025031210_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_8_oneOf_1_2_hongmeng_HBuilderX_4_56_2025031210_HBuilderX_plugins_uniapp_cli_node_modules_postcss_loader_src_index_js_ref_8_oneOf_1_3_hongmeng_HBuilderX_4_56_2025031210_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_sass_loader_dist_cjs_js_ref_8_oneOf_1_4_hongmeng_HBuilderX_4_56_2025031210_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_8_oneOf_1_5_hongmeng_HBuilderX_4_56_2025031210_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_index_js_vue_loader_options_hongmeng_HBuilderX_4_56_2025031210_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_style_js_player_vue_vue_type_style_index_0_lang_scss___WEBPACK_IMPORTED_MODULE_0__) if(["default"].indexOf(__WEBPACK_IMPORT_KEY__) < 0) (function(key) { __webpack_require__.d(__webpack_exports__, key, function() { return _hongmeng_HBuilderX_4_56_2025031210_HBuilderX_plugins_uniapp_cli_node_modules_mini_css_extract_plugin_dist_loader_js_ref_8_oneOf_1_0_hongmeng_HBuilderX_4_56_2025031210_HBuilderX_plugins_uniapp_cli_node_modules_css_loader_dist_cjs_js_ref_8_oneOf_1_1_hongmeng_HBuilderX_4_56_2025031210_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_loaders_stylePostLoader_js_hongmeng_HBuilderX_4_56_2025031210_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_8_oneOf_1_2_hongmeng_HBuilderX_4_56_2025031210_HBuilderX_plugins_uniapp_cli_node_modules_postcss_loader_src_index_js_ref_8_oneOf_1_3_hongmeng_HBuilderX_4_56_2025031210_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_sass_loader_dist_cjs_js_ref_8_oneOf_1_4_hongmeng_HBuilderX_4_56_2025031210_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_8_oneOf_1_5_hongmeng_HBuilderX_4_56_2025031210_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_index_js_vue_loader_options_hongmeng_HBuilderX_4_56_2025031210_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_style_js_player_vue_vue_type_style_index_0_lang_scss___WEBPACK_IMPORTED_MODULE_0__[key]; }) }(__WEBPACK_IMPORT_KEY__));
 /* harmony default export */ __webpack_exports__["default"] = (_hongmeng_HBuilderX_4_56_2025031210_HBuilderX_plugins_uniapp_cli_node_modules_mini_css_extract_plugin_dist_loader_js_ref_8_oneOf_1_0_hongmeng_HBuilderX_4_56_2025031210_HBuilderX_plugins_uniapp_cli_node_modules_css_loader_dist_cjs_js_ref_8_oneOf_1_1_hongmeng_HBuilderX_4_56_2025031210_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_loaders_stylePostLoader_js_hongmeng_HBuilderX_4_56_2025031210_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_8_oneOf_1_2_hongmeng_HBuilderX_4_56_2025031210_HBuilderX_plugins_uniapp_cli_node_modules_postcss_loader_src_index_js_ref_8_oneOf_1_3_hongmeng_HBuilderX_4_56_2025031210_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_sass_loader_dist_cjs_js_ref_8_oneOf_1_4_hongmeng_HBuilderX_4_56_2025031210_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_8_oneOf_1_5_hongmeng_HBuilderX_4_56_2025031210_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_index_js_vue_loader_options_hongmeng_HBuilderX_4_56_2025031210_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_style_js_player_vue_vue_type_style_index_0_lang_scss___WEBPACK_IMPORTED_MODULE_0___default.a); 

/***/ }),

/***/ 246:
/*!*************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/mini-css-extract-plugin/dist/loader.js??ref--8-oneOf-1-0!./node_modules/css-loader/dist/cjs.js??ref--8-oneOf-1-1!./node_modules/@dcloudio/vue-cli-plugin-uni/packages/vue-loader/lib/loaders/stylePostLoader.js!./node_modules/@dcloudio/vue-cli-plugin-uni/packages/webpack-preprocess-loader??ref--8-oneOf-1-2!./node_modules/postcss-loader/src??ref--8-oneOf-1-3!./node_modules/@dcloudio/vue-cli-plugin-uni/packages/sass-loader/dist/cjs.js??ref--8-oneOf-1-4!./node_modules/@dcloudio/vue-cli-plugin-uni/packages/webpack-preprocess-loader??ref--8-oneOf-1-5!./node_modules/@dcloudio/vue-cli-plugin-uni/packages/vue-loader/lib??vue-loader-options!./node_modules/@dcloudio/webpack-uni-mp-loader/lib/style.js!D:/BaiduNetdiskDownload/uni-app-music/music-app/frontend/music-app-frontend/pages/player/player.vue?vue&type=style&index=0&lang=scss& ***!
  \*************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

// extracted by mini-css-extract-plugin
    if(false) { var cssReload; }
  

/***/ })

},[[239,"common/runtime","common/vendor"]]]);
//# sourceMappingURL=../../../.sourcemap/mp-weixin/pages/player/player.js.map