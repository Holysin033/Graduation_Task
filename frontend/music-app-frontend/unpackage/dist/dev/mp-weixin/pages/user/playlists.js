(global["webpackJsonp"] = global["webpackJsonp"] || []).push([["pages/user/playlists"],{

/***/ 281:
/*!*******************************************************************************************************************************!*\
  !*** D:/BaiduNetdiskDownload/uni-app-music/music-app/frontend/music-app-frontend/main.js?{"page":"pages%2Fuser%2Fplaylists"} ***!
  \*******************************************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(wx, createPage) {

var _interopRequireDefault = __webpack_require__(/*! @babel/runtime/helpers/interopRequireDefault */ 4);
__webpack_require__(/*! uni-pages */ 26);
var _vue = _interopRequireDefault(__webpack_require__(/*! vue */ 25));
var _playlists = _interopRequireDefault(__webpack_require__(/*! ./pages/user/playlists.vue */ 282));
// @ts-ignore
wx.__webpack_require_UNI_MP_PLUGIN__ = __webpack_require__;
createPage(_playlists.default);
/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(/*! ./node_modules/@dcloudio/uni-mp-weixin/dist/wx.js */ 1)["default"], __webpack_require__(/*! ./node_modules/@dcloudio/uni-mp-weixin/dist/index.js */ 2)["createPage"]))

/***/ }),

/***/ 282:
/*!************************************************************************************************************!*\
  !*** D:/BaiduNetdiskDownload/uni-app-music/music-app/frontend/music-app-frontend/pages/user/playlists.vue ***!
  \************************************************************************************************************/
/*! no static exports found */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _playlists_vue_vue_type_template_id_23d15c54___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./playlists.vue?vue&type=template&id=23d15c54& */ 283);
/* harmony import */ var _playlists_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./playlists.vue?vue&type=script&lang=js& */ 285);
/* harmony reexport (unknown) */ for(var __WEBPACK_IMPORT_KEY__ in _playlists_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_1__) if(["default"].indexOf(__WEBPACK_IMPORT_KEY__) < 0) (function(key) { __webpack_require__.d(__webpack_exports__, key, function() { return _playlists_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_1__[key]; }) }(__WEBPACK_IMPORT_KEY__));
/* harmony import */ var _playlists_vue_vue_type_style_index_0_lang_scss___WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./playlists.vue?vue&type=style&index=0&lang=scss& */ 287);
/* harmony import */ var _hongmeng_HBuilderX_4_56_2025031210_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_runtime_componentNormalizer_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../../../../../../../hongmeng/HBuilderX.4.56.2025031210/HBuilderX/plugins/uniapp-cli/node_modules/@dcloudio/vue-cli-plugin-uni/packages/vue-loader/lib/runtime/componentNormalizer.js */ 38);

var renderjs





/* normalize component */

var component = Object(_hongmeng_HBuilderX_4_56_2025031210_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_runtime_componentNormalizer_js__WEBPACK_IMPORTED_MODULE_3__["default"])(
  _playlists_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_1__["default"],
  _playlists_vue_vue_type_template_id_23d15c54___WEBPACK_IMPORTED_MODULE_0__["render"],
  _playlists_vue_vue_type_template_id_23d15c54___WEBPACK_IMPORTED_MODULE_0__["staticRenderFns"],
  false,
  null,
  null,
  null,
  false,
  _playlists_vue_vue_type_template_id_23d15c54___WEBPACK_IMPORTED_MODULE_0__["components"],
  renderjs
)

component.options.__file = "pages/user/playlists.vue"
/* harmony default export */ __webpack_exports__["default"] = (component.exports);

/***/ }),

/***/ 283:
/*!*******************************************************************************************************************************************!*\
  !*** D:/BaiduNetdiskDownload/uni-app-music/music-app/frontend/music-app-frontend/pages/user/playlists.vue?vue&type=template&id=23d15c54& ***!
  \*******************************************************************************************************************************************/
/*! exports provided: render, staticRenderFns, recyclableRender, components */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _hongmeng_HBuilderX_4_56_2025031210_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_hongmeng_HBuilderX_4_56_2025031210_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_17_0_hongmeng_HBuilderX_4_56_2025031210_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_template_js_hongmeng_HBuilderX_4_56_2025031210_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_uni_app_loader_page_meta_js_hongmeng_HBuilderX_4_56_2025031210_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_index_js_vue_loader_options_hongmeng_HBuilderX_4_56_2025031210_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_style_js_playlists_vue_vue_type_template_id_23d15c54___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../../../../../hongmeng/HBuilderX.4.56.2025031210/HBuilderX/plugins/uniapp-cli/node_modules/@dcloudio/vue-cli-plugin-uni/packages/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!../../../../../../../hongmeng/HBuilderX.4.56.2025031210/HBuilderX/plugins/uniapp-cli/node_modules/@dcloudio/vue-cli-plugin-uni/packages/webpack-preprocess-loader??ref--17-0!../../../../../../../hongmeng/HBuilderX.4.56.2025031210/HBuilderX/plugins/uniapp-cli/node_modules/@dcloudio/webpack-uni-mp-loader/lib/template.js!../../../../../../../hongmeng/HBuilderX.4.56.2025031210/HBuilderX/plugins/uniapp-cli/node_modules/@dcloudio/vue-cli-plugin-uni/packages/webpack-uni-app-loader/page-meta.js!../../../../../../../hongmeng/HBuilderX.4.56.2025031210/HBuilderX/plugins/uniapp-cli/node_modules/@dcloudio/vue-cli-plugin-uni/packages/vue-loader/lib??vue-loader-options!../../../../../../../hongmeng/HBuilderX.4.56.2025031210/HBuilderX/plugins/uniapp-cli/node_modules/@dcloudio/webpack-uni-mp-loader/lib/style.js!./playlists.vue?vue&type=template&id=23d15c54& */ 284);
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "render", function() { return _hongmeng_HBuilderX_4_56_2025031210_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_hongmeng_HBuilderX_4_56_2025031210_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_17_0_hongmeng_HBuilderX_4_56_2025031210_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_template_js_hongmeng_HBuilderX_4_56_2025031210_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_uni_app_loader_page_meta_js_hongmeng_HBuilderX_4_56_2025031210_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_index_js_vue_loader_options_hongmeng_HBuilderX_4_56_2025031210_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_style_js_playlists_vue_vue_type_template_id_23d15c54___WEBPACK_IMPORTED_MODULE_0__["render"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "staticRenderFns", function() { return _hongmeng_HBuilderX_4_56_2025031210_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_hongmeng_HBuilderX_4_56_2025031210_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_17_0_hongmeng_HBuilderX_4_56_2025031210_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_template_js_hongmeng_HBuilderX_4_56_2025031210_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_uni_app_loader_page_meta_js_hongmeng_HBuilderX_4_56_2025031210_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_index_js_vue_loader_options_hongmeng_HBuilderX_4_56_2025031210_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_style_js_playlists_vue_vue_type_template_id_23d15c54___WEBPACK_IMPORTED_MODULE_0__["staticRenderFns"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "recyclableRender", function() { return _hongmeng_HBuilderX_4_56_2025031210_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_hongmeng_HBuilderX_4_56_2025031210_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_17_0_hongmeng_HBuilderX_4_56_2025031210_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_template_js_hongmeng_HBuilderX_4_56_2025031210_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_uni_app_loader_page_meta_js_hongmeng_HBuilderX_4_56_2025031210_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_index_js_vue_loader_options_hongmeng_HBuilderX_4_56_2025031210_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_style_js_playlists_vue_vue_type_template_id_23d15c54___WEBPACK_IMPORTED_MODULE_0__["recyclableRender"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "components", function() { return _hongmeng_HBuilderX_4_56_2025031210_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_hongmeng_HBuilderX_4_56_2025031210_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_17_0_hongmeng_HBuilderX_4_56_2025031210_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_template_js_hongmeng_HBuilderX_4_56_2025031210_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_uni_app_loader_page_meta_js_hongmeng_HBuilderX_4_56_2025031210_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_index_js_vue_loader_options_hongmeng_HBuilderX_4_56_2025031210_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_style_js_playlists_vue_vue_type_template_id_23d15c54___WEBPACK_IMPORTED_MODULE_0__["components"]; });



/***/ }),

/***/ 284:
/*!*******************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/@dcloudio/vue-cli-plugin-uni/packages/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!./node_modules/@dcloudio/vue-cli-plugin-uni/packages/webpack-preprocess-loader??ref--17-0!./node_modules/@dcloudio/webpack-uni-mp-loader/lib/template.js!./node_modules/@dcloudio/vue-cli-plugin-uni/packages/webpack-uni-app-loader/page-meta.js!./node_modules/@dcloudio/vue-cli-plugin-uni/packages/vue-loader/lib??vue-loader-options!./node_modules/@dcloudio/webpack-uni-mp-loader/lib/style.js!D:/BaiduNetdiskDownload/uni-app-music/music-app/frontend/music-app-frontend/pages/user/playlists.vue?vue&type=template&id=23d15c54& ***!
  \*******************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************/
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
  var g0 = _vm.playlists.length
  var l0 =
    g0 > 0
      ? _vm.__map(_vm.playlists, function (item, index) {
          var $orig = _vm.__get_orig(item)
          var g1 = item.songCount || (item.songs ? item.songs.length : 0)
          return {
            $orig: $orig,
            g1: g1,
          }
        })
      : null
  var g2 = _vm.searchResults.length
  _vm.$mp.data = Object.assign(
    {},
    {
      $root: {
        g0: g0,
        l0: l0,
        g2: g2,
      },
    }
  )
}
var recyclableRender = false
var staticRenderFns = []
render._withStripped = true



/***/ }),

/***/ 285:
/*!*************************************************************************************************************************************!*\
  !*** D:/BaiduNetdiskDownload/uni-app-music/music-app/frontend/music-app-frontend/pages/user/playlists.vue?vue&type=script&lang=js& ***!
  \*************************************************************************************************************************************/
/*! no static exports found */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _hongmeng_HBuilderX_4_56_2025031210_HBuilderX_plugins_uniapp_cli_node_modules_babel_loader_lib_index_js_hongmeng_HBuilderX_4_56_2025031210_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_13_1_hongmeng_HBuilderX_4_56_2025031210_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_script_js_hongmeng_HBuilderX_4_56_2025031210_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_index_js_vue_loader_options_hongmeng_HBuilderX_4_56_2025031210_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_style_js_playlists_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../../../../../hongmeng/HBuilderX.4.56.2025031210/HBuilderX/plugins/uniapp-cli/node_modules/babel-loader/lib!../../../../../../../hongmeng/HBuilderX.4.56.2025031210/HBuilderX/plugins/uniapp-cli/node_modules/@dcloudio/vue-cli-plugin-uni/packages/webpack-preprocess-loader??ref--13-1!../../../../../../../hongmeng/HBuilderX.4.56.2025031210/HBuilderX/plugins/uniapp-cli/node_modules/@dcloudio/webpack-uni-mp-loader/lib/script.js!../../../../../../../hongmeng/HBuilderX.4.56.2025031210/HBuilderX/plugins/uniapp-cli/node_modules/@dcloudio/vue-cli-plugin-uni/packages/vue-loader/lib??vue-loader-options!../../../../../../../hongmeng/HBuilderX.4.56.2025031210/HBuilderX/plugins/uniapp-cli/node_modules/@dcloudio/webpack-uni-mp-loader/lib/style.js!./playlists.vue?vue&type=script&lang=js& */ 286);
/* harmony import */ var _hongmeng_HBuilderX_4_56_2025031210_HBuilderX_plugins_uniapp_cli_node_modules_babel_loader_lib_index_js_hongmeng_HBuilderX_4_56_2025031210_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_13_1_hongmeng_HBuilderX_4_56_2025031210_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_script_js_hongmeng_HBuilderX_4_56_2025031210_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_index_js_vue_loader_options_hongmeng_HBuilderX_4_56_2025031210_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_style_js_playlists_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_hongmeng_HBuilderX_4_56_2025031210_HBuilderX_plugins_uniapp_cli_node_modules_babel_loader_lib_index_js_hongmeng_HBuilderX_4_56_2025031210_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_13_1_hongmeng_HBuilderX_4_56_2025031210_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_script_js_hongmeng_HBuilderX_4_56_2025031210_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_index_js_vue_loader_options_hongmeng_HBuilderX_4_56_2025031210_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_style_js_playlists_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__);
/* harmony reexport (unknown) */ for(var __WEBPACK_IMPORT_KEY__ in _hongmeng_HBuilderX_4_56_2025031210_HBuilderX_plugins_uniapp_cli_node_modules_babel_loader_lib_index_js_hongmeng_HBuilderX_4_56_2025031210_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_13_1_hongmeng_HBuilderX_4_56_2025031210_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_script_js_hongmeng_HBuilderX_4_56_2025031210_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_index_js_vue_loader_options_hongmeng_HBuilderX_4_56_2025031210_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_style_js_playlists_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__) if(["default"].indexOf(__WEBPACK_IMPORT_KEY__) < 0) (function(key) { __webpack_require__.d(__webpack_exports__, key, function() { return _hongmeng_HBuilderX_4_56_2025031210_HBuilderX_plugins_uniapp_cli_node_modules_babel_loader_lib_index_js_hongmeng_HBuilderX_4_56_2025031210_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_13_1_hongmeng_HBuilderX_4_56_2025031210_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_script_js_hongmeng_HBuilderX_4_56_2025031210_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_index_js_vue_loader_options_hongmeng_HBuilderX_4_56_2025031210_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_style_js_playlists_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__[key]; }) }(__WEBPACK_IMPORT_KEY__));
 /* harmony default export */ __webpack_exports__["default"] = (_hongmeng_HBuilderX_4_56_2025031210_HBuilderX_plugins_uniapp_cli_node_modules_babel_loader_lib_index_js_hongmeng_HBuilderX_4_56_2025031210_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_13_1_hongmeng_HBuilderX_4_56_2025031210_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_script_js_hongmeng_HBuilderX_4_56_2025031210_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_index_js_vue_loader_options_hongmeng_HBuilderX_4_56_2025031210_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_style_js_playlists_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0___default.a); 

/***/ }),

/***/ 286:
/*!********************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/babel-loader/lib!./node_modules/@dcloudio/vue-cli-plugin-uni/packages/webpack-preprocess-loader??ref--13-1!./node_modules/@dcloudio/webpack-uni-mp-loader/lib/script.js!./node_modules/@dcloudio/vue-cli-plugin-uni/packages/vue-loader/lib??vue-loader-options!./node_modules/@dcloudio/webpack-uni-mp-loader/lib/style.js!D:/BaiduNetdiskDownload/uni-app-music/music-app/frontend/music-app-frontend/pages/user/playlists.vue?vue&type=script&lang=js& ***!
  \********************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************/
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
var _asyncToGenerator2 = _interopRequireDefault(__webpack_require__(/*! @babel/runtime/helpers/asyncToGenerator */ 32));
var _auth = __webpack_require__(/*! @/utils/auth.js */ 33);
var _apiConfig = _interopRequireDefault(__webpack_require__(/*! @/utils/apiConfig.js */ 35));
var _request = _interopRequireDefault(__webpack_require__(/*! @/utils/request.js */ 173));
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
var _default = {
  data: function data() {
    return {
      playlists: [],
      loading: false,
      newPlaylistName: '',
      newPlaylistDesc: '',
      playlistToDelete: {},
      newPlaylistId: null,
      showAddSongPopup: false,
      searchText: '',
      searchResults: [],
      isSearching: false,
      hasSearched: false,
      selectedPlaylist: {},
      addingToPlaylist: false
    };
  },
  onShow: function onShow() {
    // 检查登录状态
    if (!(0, _auth.checkLoginStatus)()) {
      uni.navigateTo({
        url: '/pages/login/login'
      });
      return;
    }

    // 获取用户播放列表
    this.getUserPlaylists();
  },
  methods: {
    // 获取用户播放列表
    getUserPlaylists: function getUserPlaylists() {
      var _this = this;
      return (0, _asyncToGenerator2.default)( /*#__PURE__*/_regenerator.default.mark(function _callee() {
        var userInfo, localPlaylists, storedPlaylists, userId, url, response;
        return _regenerator.default.wrap(function _callee$(_context) {
          while (1) {
            switch (_context.prev = _context.next) {
              case 0:
                _context.prev = 0;
                _this.loading = true;
                userInfo = uni.getStorageSync('userInfo'); // 先尝试从本地存储获取歌单列表
                localPlaylists = [];
                try {
                  storedPlaylists = uni.getStorageSync('playlists');
                  if (storedPlaylists && Array.isArray(storedPlaylists)) {
                    localPlaylists = storedPlaylists;
                    console.log('从本地存储加载了歌单:', localPlaylists.length);
                  }
                } catch (e) {
                  console.warn('读取本地歌单失败:', e);
                }

                // 如果没有用户信息，则只使用本地数据
                if (!(!userInfo || !userInfo.id)) {
                  _context.next = 9;
                  break;
                }
                console.warn('用户未登录，仅使用本地数据');
                _this.playlists = localPlaylists;
                return _context.abrupt("return");
              case 9:
                _context.prev = 9;
                userId = userInfo.id;
                url = "".concat(_apiConfig.default.playlist.baseUrl).concat(_apiConfig.default.playlist.list(userId)); // 请求用户播放列表
                _context.next = 14;
                return (0, _request.default)(url, 'GET');
              case 14:
                response = _context.sent;
                if (response.code === 200) {
                  _this.playlists = response.data || [];
                  console.log('从后端获取歌单成功:', _this.playlists.length);

                  // 更新本地存储
                  _this.syncLocalPlaylists();
                } else {
                  console.warn('后端返回的歌单数据异常:', response);
                  _this.playlists = localPlaylists;
                }
                _context.next = 23;
                break;
              case 18:
                _context.prev = 18;
                _context.t0 = _context["catch"](9);
                console.warn('从后端获取歌单失败，使用本地数据:', _context.t0.message);
                _this.playlists = localPlaylists;

                // 显示友好提示
                uni.showToast({
                  title: '无法连接到服务器，使用本地数据',
                  icon: 'none',
                  duration: 2000
                });
              case 23:
                _context.next = 30;
                break;
              case 25:
                _context.prev = 25;
                _context.t1 = _context["catch"](0);
                console.error('获取用户播放列表完全失败：', _context.t1);
                uni.showToast({
                  title: '加载歌单失败',
                  icon: 'none'
                });

                // 确保playlists不是undefined
                _this.playlists = _this.playlists || [];
              case 30:
                _context.prev = 30;
                _this.loading = false;
                return _context.finish(30);
              case 33:
              case "end":
                return _context.stop();
            }
          }
        }, _callee, null, [[0, 25, 30, 33], [9, 18]]);
      }))();
    },
    // 查看播放列表详情
    viewPlaylist: function viewPlaylist(playlist) {
      // 优先使用playlist_id字段，如果不存在则使用id
      var playlistId = playlist.playlist_id || playlist.id;
      uni.navigateTo({
        url: "/pages/playlist/playlist?id=".concat(playlistId, "&name=").concat(encodeURIComponent(playlist.name), "&type=user")
      });
    },
    // 打开创建播放列表弹窗
    createPlaylist: function createPlaylist() {
      this.newPlaylistName = '';
      this.newPlaylistDesc = '';
      this.$refs.createPlaylistPopup.open();
    },
    // 取消创建
    cancelCreate: function cancelCreate() {
      this.$refs.createPlaylistPopup.close();
    },
    // 确认创建播放列表
    confirmCreate: function confirmCreate() {
      var _this2 = this;
      return (0, _asyncToGenerator2.default)( /*#__PURE__*/_regenerator.default.mark(function _callee2() {
        var userInfo, playlistData, newPlaylistId, userId, url, response, newPlaylist;
        return _regenerator.default.wrap(function _callee2$(_context2) {
          while (1) {
            switch (_context2.prev = _context2.next) {
              case 0:
                if (_this2.newPlaylistName.trim()) {
                  _context2.next = 3;
                  break;
                }
                uni.showToast({
                  title: '请输入播放列表名称',
                  icon: 'none'
                });
                return _context2.abrupt("return");
              case 3:
                // 显示加载状态
                uni.showLoading({
                  title: '创建中...'
                });
                _context2.prev = 4;
                userInfo = uni.getStorageSync('userInfo'); // 创建播放列表数据
                playlistData = {
                  name: _this2.newPlaylistName.trim(),
                  description: _this2.newPlaylistDesc.trim(),
                  cover: '/static/music-cover.png',
                  songs: []
                }; // 生成本地临时ID (当前时间戳)
                newPlaylistId = "local_".concat(Date.now()); // 尝试通过API创建
                if (!(userInfo && userInfo.id)) {
                  _context2.next = 23;
                  break;
                }
                _context2.prev = 9;
                userId = userInfo.id;
                url = "".concat(_apiConfig.default.playlist.baseUrl).concat(_apiConfig.default.playlist.create(userId)); // 请求创建播放列表
                _context2.next = 14;
                return (0, _request.default)(url, 'POST', playlistData);
              case 14:
                response = _context2.sent;
                if (response.code === 200) {
                  // 使用返回的ID替换临时ID
                  newPlaylistId = response.data.id || response.data;
                  console.log('后端成功创建歌单:', newPlaylistId);
                } else {
                  console.warn('后端创建歌单返回异常状态:', response);
                }
                _context2.next = 21;
                break;
              case 18:
                _context2.prev = 18;
                _context2.t0 = _context2["catch"](9);
                console.warn('通过API创建歌单失败，将使用本地ID:', _context2.t0.message);
              case 21:
                _context2.next = 24;
                break;
              case 23:
                console.warn('用户未登录，使用本地ID创建歌单');
              case 24:
                // 记录新创建的歌单ID
                _this2.newPlaylistId = newPlaylistId;

                // 添加到本地数组
                newPlaylist = {
                  id: newPlaylistId,
                  name: playlistData.name,
                  description: playlistData.description,
                  cover: playlistData.cover,
                  songs: [],
                  songCount: 0,
                  createdAt: new Date().toISOString()
                };
                _this2.playlists.unshift(newPlaylist);

                // 更新本地存储
                _this2.syncLocalPlaylists();
                uni.hideLoading();
                uni.showToast({
                  title: '创建成功',
                  icon: 'success'
                });

                // 关闭创建弹窗
                _this2.$refs.createPlaylistPopup.close();

                // 提示用户可以添加歌曲
                setTimeout(function () {
                  uni.showToast({
                    title: '点击"+"添加歌曲',
                    icon: 'none',
                    duration: 2000
                  });
                }, 1500);
                _context2.next = 39;
                break;
              case 34:
                _context2.prev = 34;
                _context2.t1 = _context2["catch"](4);
                uni.hideLoading();
                console.error('创建播放列表完全失败：', _context2.t1);
                uni.showToast({
                  title: '创建失败，请重试',
                  icon: 'none'
                });
              case 39:
              case "end":
                return _context2.stop();
            }
          }
        }, _callee2, null, [[4, 34], [9, 18]]);
      }))();
    },
    // 打开删除确认弹窗
    deletePlaylist: function deletePlaylist(playlist) {
      this.playlistToDelete = playlist;
      this.$refs.deleteConfirmPopup.open();
    },
    // 取消删除
    cancelDelete: function cancelDelete() {
      this.$refs.deleteConfirmPopup.close();
      this.playlistToDelete = {};
    },
    // 确认删除播放列表
    confirmDelete: function confirmDelete() {
      var _this3 = this;
      return (0, _asyncToGenerator2.default)( /*#__PURE__*/_regenerator.default.mark(function _callee3() {
        var _require, permanentlyDeletePlaylist, userInfo, userId, result;
        return _regenerator.default.wrap(function _callee3$(_context3) {
          while (1) {
            switch (_context3.prev = _context3.next) {
              case 0:
                _context3.prev = 0;
                // 显示加载中
                uni.showLoading({
                  title: '删除中...',
                  mask: true
                });
                console.log("\u6B63\u5728\u5220\u9664\u6B4C\u5355\uFF1AID=".concat(_this3.playlistToDelete.id, ", \u540D\u79F0=").concat(_this3.playlistToDelete.name));

                // 从playlistCache.js导入永久删除函数
                _require = __webpack_require__(/*! @/utils/playlistCache.js */ 236), permanentlyDeletePlaylist = _require.permanentlyDeletePlaylist; // 获取用户信息
                userInfo = uni.getStorageSync('userInfo');
                userId = userInfo && userInfo.id ? userInfo.id : '';
                if (userId) {
                  _context3.next = 10;
                  break;
                }
                uni.hideLoading();
                uni.showToast({
                  title: '请先登录',
                  icon: 'none'
                });
                return _context3.abrupt("return");
              case 10:
                _context3.next = 12;
                return permanentlyDeletePlaylist(_this3.playlistToDelete.id, userId);
              case 12:
                result = _context3.sent;
                uni.hideLoading();
                if (result.success) {
                  // 如果删除成功，无论是完全成功还是部分成功，从本地数组中移除
                  _this3.playlists = _this3.playlists.filter(function (item) {
                    return item.id !== _this3.playlistToDelete.id;
                  });

                  // 显示适当的成功消息
                  uni.showToast({
                    title: result.message || '删除成功',
                    icon: 'success'
                  });
                } else {
                  // 删除失败
                  uni.showToast({
                    title: result.message || '删除失败，请重试',
                    icon: 'none'
                  });
                }
                _context3.next = 22;
                break;
              case 17:
                _context3.prev = 17;
                _context3.t0 = _context3["catch"](0);
                uni.hideLoading();
                console.error('删除播放列表完全失败：', _context3.t0);
                uni.showToast({
                  title: '删除失败，请重试',
                  icon: 'none'
                });
              case 22:
                _context3.prev = 22;
                // 关闭弹窗
                _this3.$refs.deleteConfirmPopup.close();
                _this3.playlistToDelete = {};
                return _context3.finish(22);
              case 26:
              case "end":
                return _context3.stop();
            }
          }
        }, _callee3, null, [[0, 17, 22, 26]]);
      }))();
    },
    // 前往个性歌单页面
    goToPersonalPlaylist: function goToPersonalPlaylist() {
      uni.navigateTo({
        url: '/pages/user/personal_playlist'
      });
    },
    // 返回上一页
    goBack: function goBack() {
      uni.navigateBack();
    },
    // 打开添加歌曲弹窗
    openAddSongPopup: function openAddSongPopup(playlist) {
      this.selectedPlaylist = playlist;
      this.searchText = '';
      this.searchResults = [];
      this.hasSearched = false;
      this.$refs.addSongPopup.open();
    },
    // 新增：搜索歌曲
    searchSongs: function searchSongs() {
      var _this4 = this;
      return (0, _asyncToGenerator2.default)( /*#__PURE__*/_regenerator.default.mark(function _callee4() {
        var _require2, searchMusic, results;
        return _regenerator.default.wrap(function _callee4$(_context4) {
          while (1) {
            switch (_context4.prev = _context4.next) {
              case 0:
                if (_this4.searchText.trim()) {
                  _context4.next = 3;
                  break;
                }
                uni.showToast({
                  title: '请输入搜索关键词',
                  icon: 'none'
                });
                return _context4.abrupt("return");
              case 3:
                _this4.isSearching = true;
                _this4.hasSearched = true;
                _context4.prev = 5;
                // 使用已有的搜索API
                _require2 = __webpack_require__(/*! @/utils/musicData.js */ 170), searchMusic = _require2.searchMusic;
                _context4.next = 9;
                return searchMusic(_this4.searchText.trim(), {
                  type: 1,
                  // 搜索单曲
                  limit: 20,
                  offset: 0
                });
              case 9:
                results = _context4.sent;
                // 处理结果
                if (results && results.songs && Array.isArray(results.songs)) {
                  _this4.searchResults = results.songs;
                } else if (results && results.result && results.result.songs) {
                  // 兼容旧版API返回格式
                  _this4.searchResults = results.result.songs.map(function (song) {
                    return {
                      id: song.id,
                      name: song.name,
                      artist: song.artists ? song.artists.map(function (a) {
                        return a.name;
                      }).join('/') : '未知歌手',
                      album: song.album ? song.album.name : '未知专辑',
                      cover: song.album && song.album.picUrl ? song.album.picUrl : '/static/music-cover.png',
                      duration: song.duration || 0
                    };
                  });
                } else {
                  _this4.searchResults = [];
                }
                console.log('搜索结果:', _this4.searchResults);
                if (_this4.searchResults.length === 0) {
                  uni.showToast({
                    title: '未找到相关歌曲',
                    icon: 'none'
                  });
                }
                _context4.next = 19;
                break;
              case 15:
                _context4.prev = 15;
                _context4.t0 = _context4["catch"](5);
                console.error('搜索歌曲失败：', _context4.t0);
                uni.showToast({
                  title: '搜索失败，请重试',
                  icon: 'none'
                });
              case 19:
                _context4.prev = 19;
                _this4.isSearching = false;
                return _context4.finish(19);
              case 22:
              case "end":
                return _context4.stop();
            }
          }
        }, _callee4, null, [[5, 15, 19, 22]]);
      }))();
    },
    // 新增：添加歌曲到歌单
    addSongToPlaylist: function addSongToPlaylist(song) {
      var _this5 = this;
      return (0, _asyncToGenerator2.default)( /*#__PURE__*/_regenerator.default.mark(function _callee5() {
        var _require3, addSongsToPlaylist, userInfo, userId, songData, localSuccess, playlist, baseUrl, endpoint, url, requestData, response, _playlist, songInList;
        return _regenerator.default.wrap(function _callee5$(_context5) {
          while (1) {
            switch (_context5.prev = _context5.next) {
              case 0:
                if (_this5.selectedPlaylist.id) {
                  _context5.next = 3;
                  break;
                }
                uni.showToast({
                  title: '歌单ID无效',
                  icon: 'none'
                });
                return _context5.abrupt("return");
              case 3:
                if (!_this5.addingToPlaylist) {
                  _context5.next = 5;
                  break;
                }
                return _context5.abrupt("return");
              case 5:
                // 设置歌曲的添加中状态
                _this5.$set(song, 'isAdding', true);
                _this5.addingToPlaylist = true;
                _context5.prev = 7;
                // 导入播放列表缓存工具
                _require3 = __webpack_require__(/*! @/utils/playlistCache.js */ 236), addSongsToPlaylist = _require3.addSongsToPlaylist;
                userInfo = uni.getStorageSync('userInfo');
                userId = userInfo && userInfo.id ? userInfo.id : ''; // 确保所有必要的字段都存在 - 增强版本，支持多种字段命名方式
                songData = {
                  // 支持多种ID字段名
                  id: song.id || song.song_id || song.songId || song.netease_id || song.neteaseId || "local_".concat(Date.now()),
                  // 支持多种名称字段名
                  name: song.name || song.song_name || song.songName || song.title || '未知歌曲',
                  // 支持多种艺术家字段名
                  artist: song.artist || song.singer || song.artistName || song.artists || '未知歌手',
                  // 支持多种专辑字段名
                  album: song.album || song.albumName || '未知专辑',
                  duration: song.duration || 0,
                  // 支持多种封面图字段名
                  cover: song.cover || song.coverUrl || song.cover_url || song.pic || song.picUrl || '/static/music-cover.png',
                  // 确保设置URL
                  url: song.url || song.mp3Url || song.mp3_url || "https://music.163.com/song/media/outer/url?id=".concat(song.id || song.song_id || song.songId || song.netease_id || song.neteaseId, ".mp3")
                };
                console.log('处理后的歌曲数据:', songData);

                // 先更新本地缓存
                localSuccess = addSongsToPlaylist(_this5.selectedPlaylist.id, songData, userId);
                if (localSuccess) {
                  console.log('本地缓存更新成功，现在同步到服务器');

                  // 更新当前视图中的数据
                  playlist = _this5.playlists.find(function (p) {
                    return p.id === _this5.selectedPlaylist.id;
                  });
                  if (playlist) {
                    if (!playlist.songs) playlist.songs = [];
                    // 避免重复添加
                    if (!playlist.songs.some(function (s) {
                      return s.id === songData.id;
                    })) {
                      playlist.songs.push(songData);
                    }
                    playlist.songCount = playlist.songs.length;
                  }
                }

                // 构建请求URL和数据
                baseUrl = _apiConfig.default.playlist.baseUrl;
                endpoint = _apiConfig.default.playlist.addSong(_this5.selectedPlaylist.id);
                url = "".concat(baseUrl).concat(endpoint); // 包装成后端期望的格式
                requestData = {
                  songs: [songData]
                };
                console.log('添加歌曲数据:', JSON.stringify(requestData));

                // 请求添加歌曲
                _context5.next = 22;
                return (0, _request.default)(url, 'POST', requestData);
              case 22:
                response = _context5.sent;
                if (!(response.code === 200)) {
                  _context5.next = 29;
                  break;
                }
                // 如果本地缓存更新失败但服务器成功，再次更新本地缓存
                if (!localSuccess) {
                  // 再次尝试更新本地缓存
                  addSongsToPlaylist(_this5.selectedPlaylist.id, songData, userId);

                  // 更新当前视图中的数据
                  _playlist = _this5.playlists.find(function (p) {
                    return p.id === _this5.selectedPlaylist.id;
                  });
                  if (_playlist) {
                    if (!_playlist.songs) _playlist.songs = [];
                    // 避免重复添加
                    if (!_playlist.songs.some(function (s) {
                      return s.id === songData.id;
                    })) {
                      _playlist.songs.push(songData);
                    }
                    _playlist.songCount = _playlist.songs.length;
                  }
                }
                uni.showToast({
                  title: '添加成功',
                  icon: 'success'
                });

                // 清除搜索结果中的已添加歌曲
                _this5.searchResults = _this5.searchResults.filter(function (s) {
                  return s.id !== song.id;
                });
                _context5.next = 35;
                break;
              case 29:
                if (!localSuccess) {
                  _context5.next = 34;
                  break;
                }
                // 即使服务器端失败，只要本地缓存更新成功，也显示成功
                uni.showToast({
                  title: '已添加到本地歌单',
                  icon: 'success'
                });

                // 清除搜索结果中的已添加歌曲
                _this5.searchResults = _this5.searchResults.filter(function (s) {
                  return s.id !== song.id;
                });
                _context5.next = 35;
                break;
              case 34:
                throw new Error(response.message || '添加歌曲失败');
              case 35:
                _context5.next = 41;
                break;
              case 37:
                _context5.prev = 37;
                _context5.t0 = _context5["catch"](7);
                console.error('添加歌曲失败：', _context5.t0);
                uni.showToast({
                  title: _context5.t0.message || '添加歌曲失败',
                  icon: 'none'
                });
              case 41:
                _context5.prev = 41;
                _this5.addingToPlaylist = false;
                // 如果还在结果列表中，取消添加中状态
                songInList = _this5.searchResults.find(function (s) {
                  return s.id === song.id;
                });
                if (songInList) {
                  _this5.$set(songInList, 'isAdding', false);
                }
                return _context5.finish(41);
              case 46:
              case "end":
                return _context5.stop();
            }
          }
        }, _callee5, null, [[7, 37, 41, 46]]);
      }))();
    },
    // 关闭添加歌曲弹窗
    closeAddSongPopup: function closeAddSongPopup() {
      var _this6 = this;
      this.$refs.addSongPopup.close();
      setTimeout(function () {
        _this6.searchText = '';
        _this6.searchResults = [];
        _this6.hasSearched = false;
        _this6.selectedPlaylist = {};
      }, 300);
    },
    // 查看选中的歌单
    viewSelectedPlaylist: function viewSelectedPlaylist() {
      if (this.selectedPlaylist.id) {
        this.viewPlaylist(this.selectedPlaylist);
      }
      this.closeAddSongPopup();
    },
    // 同步本地播放列表数据
    syncLocalPlaylists: function syncLocalPlaylists() {
      try {
        // 导入播放列表缓存工具
        var _require4 = __webpack_require__(/*! @/utils/playlistCache.js */ 236),
          savePlaylists = _require4.savePlaylists;

        // 获取用户ID
        var userInfo = uni.getStorageSync('userInfo');
        var userId = userInfo && userInfo.id ? userInfo.id : '';

        // 使用缓存工具保存播放列表，确保所有歌曲都有URL
        var success = savePlaylists(this.playlists, userId);
        if (success) {
          console.log('使用playlistCache工具成功同步本地歌单数据:', this.playlists.length);
        } else {
          console.warn('使用playlistCache工具同步失败，尝试直接保存');

          // 直接保存到本地存储（旧方法）
          uni.setStorageSync('playlists', this.playlists);
          console.log('已同步本地歌单数据:', this.playlists.length);
        }
      } catch (error) {
        console.error('同步本地歌单数据失败:', error);

        // 错误后的恢复措施，直接保存
        try {
          uni.setStorageSync('playlists', this.playlists);
        } catch (e) {
          console.error('恢复措施也失败:', e);
        }
      }
    }
  }
};
exports.default = _default;
/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(/*! ./node_modules/@dcloudio/uni-mp-weixin/dist/index.js */ 2)["default"]))

/***/ }),

/***/ 287:
/*!**********************************************************************************************************************************************!*\
  !*** D:/BaiduNetdiskDownload/uni-app-music/music-app/frontend/music-app-frontend/pages/user/playlists.vue?vue&type=style&index=0&lang=scss& ***!
  \**********************************************************************************************************************************************/
/*! no static exports found */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _hongmeng_HBuilderX_4_56_2025031210_HBuilderX_plugins_uniapp_cli_node_modules_mini_css_extract_plugin_dist_loader_js_ref_8_oneOf_1_0_hongmeng_HBuilderX_4_56_2025031210_HBuilderX_plugins_uniapp_cli_node_modules_css_loader_dist_cjs_js_ref_8_oneOf_1_1_hongmeng_HBuilderX_4_56_2025031210_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_loaders_stylePostLoader_js_hongmeng_HBuilderX_4_56_2025031210_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_8_oneOf_1_2_hongmeng_HBuilderX_4_56_2025031210_HBuilderX_plugins_uniapp_cli_node_modules_postcss_loader_src_index_js_ref_8_oneOf_1_3_hongmeng_HBuilderX_4_56_2025031210_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_sass_loader_dist_cjs_js_ref_8_oneOf_1_4_hongmeng_HBuilderX_4_56_2025031210_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_8_oneOf_1_5_hongmeng_HBuilderX_4_56_2025031210_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_index_js_vue_loader_options_hongmeng_HBuilderX_4_56_2025031210_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_style_js_playlists_vue_vue_type_style_index_0_lang_scss___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../../../../../hongmeng/HBuilderX.4.56.2025031210/HBuilderX/plugins/uniapp-cli/node_modules/mini-css-extract-plugin/dist/loader.js??ref--8-oneOf-1-0!../../../../../../../hongmeng/HBuilderX.4.56.2025031210/HBuilderX/plugins/uniapp-cli/node_modules/css-loader/dist/cjs.js??ref--8-oneOf-1-1!../../../../../../../hongmeng/HBuilderX.4.56.2025031210/HBuilderX/plugins/uniapp-cli/node_modules/@dcloudio/vue-cli-plugin-uni/packages/vue-loader/lib/loaders/stylePostLoader.js!../../../../../../../hongmeng/HBuilderX.4.56.2025031210/HBuilderX/plugins/uniapp-cli/node_modules/@dcloudio/vue-cli-plugin-uni/packages/webpack-preprocess-loader??ref--8-oneOf-1-2!../../../../../../../hongmeng/HBuilderX.4.56.2025031210/HBuilderX/plugins/uniapp-cli/node_modules/postcss-loader/src??ref--8-oneOf-1-3!../../../../../../../hongmeng/HBuilderX.4.56.2025031210/HBuilderX/plugins/uniapp-cli/node_modules/@dcloudio/vue-cli-plugin-uni/packages/sass-loader/dist/cjs.js??ref--8-oneOf-1-4!../../../../../../../hongmeng/HBuilderX.4.56.2025031210/HBuilderX/plugins/uniapp-cli/node_modules/@dcloudio/vue-cli-plugin-uni/packages/webpack-preprocess-loader??ref--8-oneOf-1-5!../../../../../../../hongmeng/HBuilderX.4.56.2025031210/HBuilderX/plugins/uniapp-cli/node_modules/@dcloudio/vue-cli-plugin-uni/packages/vue-loader/lib??vue-loader-options!../../../../../../../hongmeng/HBuilderX.4.56.2025031210/HBuilderX/plugins/uniapp-cli/node_modules/@dcloudio/webpack-uni-mp-loader/lib/style.js!./playlists.vue?vue&type=style&index=0&lang=scss& */ 288);
/* harmony import */ var _hongmeng_HBuilderX_4_56_2025031210_HBuilderX_plugins_uniapp_cli_node_modules_mini_css_extract_plugin_dist_loader_js_ref_8_oneOf_1_0_hongmeng_HBuilderX_4_56_2025031210_HBuilderX_plugins_uniapp_cli_node_modules_css_loader_dist_cjs_js_ref_8_oneOf_1_1_hongmeng_HBuilderX_4_56_2025031210_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_loaders_stylePostLoader_js_hongmeng_HBuilderX_4_56_2025031210_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_8_oneOf_1_2_hongmeng_HBuilderX_4_56_2025031210_HBuilderX_plugins_uniapp_cli_node_modules_postcss_loader_src_index_js_ref_8_oneOf_1_3_hongmeng_HBuilderX_4_56_2025031210_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_sass_loader_dist_cjs_js_ref_8_oneOf_1_4_hongmeng_HBuilderX_4_56_2025031210_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_8_oneOf_1_5_hongmeng_HBuilderX_4_56_2025031210_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_index_js_vue_loader_options_hongmeng_HBuilderX_4_56_2025031210_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_style_js_playlists_vue_vue_type_style_index_0_lang_scss___WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_hongmeng_HBuilderX_4_56_2025031210_HBuilderX_plugins_uniapp_cli_node_modules_mini_css_extract_plugin_dist_loader_js_ref_8_oneOf_1_0_hongmeng_HBuilderX_4_56_2025031210_HBuilderX_plugins_uniapp_cli_node_modules_css_loader_dist_cjs_js_ref_8_oneOf_1_1_hongmeng_HBuilderX_4_56_2025031210_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_loaders_stylePostLoader_js_hongmeng_HBuilderX_4_56_2025031210_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_8_oneOf_1_2_hongmeng_HBuilderX_4_56_2025031210_HBuilderX_plugins_uniapp_cli_node_modules_postcss_loader_src_index_js_ref_8_oneOf_1_3_hongmeng_HBuilderX_4_56_2025031210_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_sass_loader_dist_cjs_js_ref_8_oneOf_1_4_hongmeng_HBuilderX_4_56_2025031210_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_8_oneOf_1_5_hongmeng_HBuilderX_4_56_2025031210_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_index_js_vue_loader_options_hongmeng_HBuilderX_4_56_2025031210_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_style_js_playlists_vue_vue_type_style_index_0_lang_scss___WEBPACK_IMPORTED_MODULE_0__);
/* harmony reexport (unknown) */ for(var __WEBPACK_IMPORT_KEY__ in _hongmeng_HBuilderX_4_56_2025031210_HBuilderX_plugins_uniapp_cli_node_modules_mini_css_extract_plugin_dist_loader_js_ref_8_oneOf_1_0_hongmeng_HBuilderX_4_56_2025031210_HBuilderX_plugins_uniapp_cli_node_modules_css_loader_dist_cjs_js_ref_8_oneOf_1_1_hongmeng_HBuilderX_4_56_2025031210_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_loaders_stylePostLoader_js_hongmeng_HBuilderX_4_56_2025031210_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_8_oneOf_1_2_hongmeng_HBuilderX_4_56_2025031210_HBuilderX_plugins_uniapp_cli_node_modules_postcss_loader_src_index_js_ref_8_oneOf_1_3_hongmeng_HBuilderX_4_56_2025031210_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_sass_loader_dist_cjs_js_ref_8_oneOf_1_4_hongmeng_HBuilderX_4_56_2025031210_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_8_oneOf_1_5_hongmeng_HBuilderX_4_56_2025031210_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_index_js_vue_loader_options_hongmeng_HBuilderX_4_56_2025031210_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_style_js_playlists_vue_vue_type_style_index_0_lang_scss___WEBPACK_IMPORTED_MODULE_0__) if(["default"].indexOf(__WEBPACK_IMPORT_KEY__) < 0) (function(key) { __webpack_require__.d(__webpack_exports__, key, function() { return _hongmeng_HBuilderX_4_56_2025031210_HBuilderX_plugins_uniapp_cli_node_modules_mini_css_extract_plugin_dist_loader_js_ref_8_oneOf_1_0_hongmeng_HBuilderX_4_56_2025031210_HBuilderX_plugins_uniapp_cli_node_modules_css_loader_dist_cjs_js_ref_8_oneOf_1_1_hongmeng_HBuilderX_4_56_2025031210_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_loaders_stylePostLoader_js_hongmeng_HBuilderX_4_56_2025031210_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_8_oneOf_1_2_hongmeng_HBuilderX_4_56_2025031210_HBuilderX_plugins_uniapp_cli_node_modules_postcss_loader_src_index_js_ref_8_oneOf_1_3_hongmeng_HBuilderX_4_56_2025031210_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_sass_loader_dist_cjs_js_ref_8_oneOf_1_4_hongmeng_HBuilderX_4_56_2025031210_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_8_oneOf_1_5_hongmeng_HBuilderX_4_56_2025031210_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_index_js_vue_loader_options_hongmeng_HBuilderX_4_56_2025031210_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_style_js_playlists_vue_vue_type_style_index_0_lang_scss___WEBPACK_IMPORTED_MODULE_0__[key]; }) }(__WEBPACK_IMPORT_KEY__));
 /* harmony default export */ __webpack_exports__["default"] = (_hongmeng_HBuilderX_4_56_2025031210_HBuilderX_plugins_uniapp_cli_node_modules_mini_css_extract_plugin_dist_loader_js_ref_8_oneOf_1_0_hongmeng_HBuilderX_4_56_2025031210_HBuilderX_plugins_uniapp_cli_node_modules_css_loader_dist_cjs_js_ref_8_oneOf_1_1_hongmeng_HBuilderX_4_56_2025031210_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_loaders_stylePostLoader_js_hongmeng_HBuilderX_4_56_2025031210_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_8_oneOf_1_2_hongmeng_HBuilderX_4_56_2025031210_HBuilderX_plugins_uniapp_cli_node_modules_postcss_loader_src_index_js_ref_8_oneOf_1_3_hongmeng_HBuilderX_4_56_2025031210_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_sass_loader_dist_cjs_js_ref_8_oneOf_1_4_hongmeng_HBuilderX_4_56_2025031210_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_8_oneOf_1_5_hongmeng_HBuilderX_4_56_2025031210_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_index_js_vue_loader_options_hongmeng_HBuilderX_4_56_2025031210_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_style_js_playlists_vue_vue_type_style_index_0_lang_scss___WEBPACK_IMPORTED_MODULE_0___default.a); 

/***/ }),

/***/ 288:
/*!**************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/mini-css-extract-plugin/dist/loader.js??ref--8-oneOf-1-0!./node_modules/css-loader/dist/cjs.js??ref--8-oneOf-1-1!./node_modules/@dcloudio/vue-cli-plugin-uni/packages/vue-loader/lib/loaders/stylePostLoader.js!./node_modules/@dcloudio/vue-cli-plugin-uni/packages/webpack-preprocess-loader??ref--8-oneOf-1-2!./node_modules/postcss-loader/src??ref--8-oneOf-1-3!./node_modules/@dcloudio/vue-cli-plugin-uni/packages/sass-loader/dist/cjs.js??ref--8-oneOf-1-4!./node_modules/@dcloudio/vue-cli-plugin-uni/packages/webpack-preprocess-loader??ref--8-oneOf-1-5!./node_modules/@dcloudio/vue-cli-plugin-uni/packages/vue-loader/lib??vue-loader-options!./node_modules/@dcloudio/webpack-uni-mp-loader/lib/style.js!D:/BaiduNetdiskDownload/uni-app-music/music-app/frontend/music-app-frontend/pages/user/playlists.vue?vue&type=style&index=0&lang=scss& ***!
  \**************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

// extracted by mini-css-extract-plugin
    if(false) { var cssReload; }
  

/***/ })

},[[281,"common/runtime","common/vendor"]]]);
//# sourceMappingURL=../../../.sourcemap/mp-weixin/pages/user/playlists.js.map