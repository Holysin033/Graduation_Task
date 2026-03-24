(global["webpackJsonp"] = global["webpackJsonp"] || []).push([["pages/playlist/playlist"],{

/***/ 247:
/*!**********************************************************************************************************************************!*\
  !*** D:/BaiduNetdiskDownload/uni-app-music/music-app/frontend/music-app-frontend/main.js?{"page":"pages%2Fplaylist%2Fplaylist"} ***!
  \**********************************************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(wx, createPage) {

var _interopRequireDefault = __webpack_require__(/*! @babel/runtime/helpers/interopRequireDefault */ 4);
__webpack_require__(/*! uni-pages */ 26);
var _vue = _interopRequireDefault(__webpack_require__(/*! vue */ 25));
var _playlist = _interopRequireDefault(__webpack_require__(/*! ./pages/playlist/playlist.vue */ 248));
// @ts-ignore
wx.__webpack_require_UNI_MP_PLUGIN__ = __webpack_require__;
createPage(_playlist.default);
/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(/*! ./node_modules/@dcloudio/uni-mp-weixin/dist/wx.js */ 1)["default"], __webpack_require__(/*! ./node_modules/@dcloudio/uni-mp-weixin/dist/index.js */ 2)["createPage"]))

/***/ }),

/***/ 248:
/*!***************************************************************************************************************!*\
  !*** D:/BaiduNetdiskDownload/uni-app-music/music-app/frontend/music-app-frontend/pages/playlist/playlist.vue ***!
  \***************************************************************************************************************/
/*! no static exports found */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _playlist_vue_vue_type_template_id_8204ba74___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./playlist.vue?vue&type=template&id=8204ba74& */ 249);
/* harmony import */ var _playlist_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./playlist.vue?vue&type=script&lang=js& */ 251);
/* harmony reexport (unknown) */ for(var __WEBPACK_IMPORT_KEY__ in _playlist_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_1__) if(["default"].indexOf(__WEBPACK_IMPORT_KEY__) < 0) (function(key) { __webpack_require__.d(__webpack_exports__, key, function() { return _playlist_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_1__[key]; }) }(__WEBPACK_IMPORT_KEY__));
/* harmony import */ var _playlist_vue_vue_type_style_index_0_lang_scss___WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./playlist.vue?vue&type=style&index=0&lang=scss& */ 253);
/* harmony import */ var _hongmeng_HBuilderX_4_56_2025031210_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_runtime_componentNormalizer_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../../../../../../../hongmeng/HBuilderX.4.56.2025031210/HBuilderX/plugins/uniapp-cli/node_modules/@dcloudio/vue-cli-plugin-uni/packages/vue-loader/lib/runtime/componentNormalizer.js */ 38);

var renderjs





/* normalize component */

var component = Object(_hongmeng_HBuilderX_4_56_2025031210_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_runtime_componentNormalizer_js__WEBPACK_IMPORTED_MODULE_3__["default"])(
  _playlist_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_1__["default"],
  _playlist_vue_vue_type_template_id_8204ba74___WEBPACK_IMPORTED_MODULE_0__["render"],
  _playlist_vue_vue_type_template_id_8204ba74___WEBPACK_IMPORTED_MODULE_0__["staticRenderFns"],
  false,
  null,
  null,
  null,
  false,
  _playlist_vue_vue_type_template_id_8204ba74___WEBPACK_IMPORTED_MODULE_0__["components"],
  renderjs
)

component.options.__file = "pages/playlist/playlist.vue"
/* harmony default export */ __webpack_exports__["default"] = (component.exports);

/***/ }),

/***/ 249:
/*!**********************************************************************************************************************************************!*\
  !*** D:/BaiduNetdiskDownload/uni-app-music/music-app/frontend/music-app-frontend/pages/playlist/playlist.vue?vue&type=template&id=8204ba74& ***!
  \**********************************************************************************************************************************************/
/*! exports provided: render, staticRenderFns, recyclableRender, components */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _hongmeng_HBuilderX_4_56_2025031210_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_hongmeng_HBuilderX_4_56_2025031210_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_17_0_hongmeng_HBuilderX_4_56_2025031210_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_template_js_hongmeng_HBuilderX_4_56_2025031210_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_uni_app_loader_page_meta_js_hongmeng_HBuilderX_4_56_2025031210_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_index_js_vue_loader_options_hongmeng_HBuilderX_4_56_2025031210_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_style_js_playlist_vue_vue_type_template_id_8204ba74___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../../../../../hongmeng/HBuilderX.4.56.2025031210/HBuilderX/plugins/uniapp-cli/node_modules/@dcloudio/vue-cli-plugin-uni/packages/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!../../../../../../../hongmeng/HBuilderX.4.56.2025031210/HBuilderX/plugins/uniapp-cli/node_modules/@dcloudio/vue-cli-plugin-uni/packages/webpack-preprocess-loader??ref--17-0!../../../../../../../hongmeng/HBuilderX.4.56.2025031210/HBuilderX/plugins/uniapp-cli/node_modules/@dcloudio/webpack-uni-mp-loader/lib/template.js!../../../../../../../hongmeng/HBuilderX.4.56.2025031210/HBuilderX/plugins/uniapp-cli/node_modules/@dcloudio/vue-cli-plugin-uni/packages/webpack-uni-app-loader/page-meta.js!../../../../../../../hongmeng/HBuilderX.4.56.2025031210/HBuilderX/plugins/uniapp-cli/node_modules/@dcloudio/vue-cli-plugin-uni/packages/vue-loader/lib??vue-loader-options!../../../../../../../hongmeng/HBuilderX.4.56.2025031210/HBuilderX/plugins/uniapp-cli/node_modules/@dcloudio/webpack-uni-mp-loader/lib/style.js!./playlist.vue?vue&type=template&id=8204ba74& */ 250);
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "render", function() { return _hongmeng_HBuilderX_4_56_2025031210_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_hongmeng_HBuilderX_4_56_2025031210_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_17_0_hongmeng_HBuilderX_4_56_2025031210_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_template_js_hongmeng_HBuilderX_4_56_2025031210_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_uni_app_loader_page_meta_js_hongmeng_HBuilderX_4_56_2025031210_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_index_js_vue_loader_options_hongmeng_HBuilderX_4_56_2025031210_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_style_js_playlist_vue_vue_type_template_id_8204ba74___WEBPACK_IMPORTED_MODULE_0__["render"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "staticRenderFns", function() { return _hongmeng_HBuilderX_4_56_2025031210_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_hongmeng_HBuilderX_4_56_2025031210_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_17_0_hongmeng_HBuilderX_4_56_2025031210_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_template_js_hongmeng_HBuilderX_4_56_2025031210_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_uni_app_loader_page_meta_js_hongmeng_HBuilderX_4_56_2025031210_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_index_js_vue_loader_options_hongmeng_HBuilderX_4_56_2025031210_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_style_js_playlist_vue_vue_type_template_id_8204ba74___WEBPACK_IMPORTED_MODULE_0__["staticRenderFns"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "recyclableRender", function() { return _hongmeng_HBuilderX_4_56_2025031210_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_hongmeng_HBuilderX_4_56_2025031210_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_17_0_hongmeng_HBuilderX_4_56_2025031210_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_template_js_hongmeng_HBuilderX_4_56_2025031210_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_uni_app_loader_page_meta_js_hongmeng_HBuilderX_4_56_2025031210_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_index_js_vue_loader_options_hongmeng_HBuilderX_4_56_2025031210_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_style_js_playlist_vue_vue_type_template_id_8204ba74___WEBPACK_IMPORTED_MODULE_0__["recyclableRender"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "components", function() { return _hongmeng_HBuilderX_4_56_2025031210_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_hongmeng_HBuilderX_4_56_2025031210_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_17_0_hongmeng_HBuilderX_4_56_2025031210_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_template_js_hongmeng_HBuilderX_4_56_2025031210_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_uni_app_loader_page_meta_js_hongmeng_HBuilderX_4_56_2025031210_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_index_js_vue_loader_options_hongmeng_HBuilderX_4_56_2025031210_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_style_js_playlist_vue_vue_type_template_id_8204ba74___WEBPACK_IMPORTED_MODULE_0__["components"]; });



/***/ }),

/***/ 250:
/*!**********************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/@dcloudio/vue-cli-plugin-uni/packages/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!./node_modules/@dcloudio/vue-cli-plugin-uni/packages/webpack-preprocess-loader??ref--17-0!./node_modules/@dcloudio/webpack-uni-mp-loader/lib/template.js!./node_modules/@dcloudio/vue-cli-plugin-uni/packages/webpack-uni-app-loader/page-meta.js!./node_modules/@dcloudio/vue-cli-plugin-uni/packages/vue-loader/lib??vue-loader-options!./node_modules/@dcloudio/webpack-uni-mp-loader/lib/style.js!D:/BaiduNetdiskDownload/uni-app-music/music-app/frontend/music-app-frontend/pages/playlist/playlist.vue?vue&type=template&id=8204ba74& ***!
  \**********************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************/
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
  var g0 = _vm.songs.length
  var l0 = _vm.__map(_vm.songs, function (song, index) {
    var $orig = _vm.__get_orig(song)
    var m0 = !_vm.isInitialLoading ? _vm.formatDuration(song.duration) : null
    return {
      $orig: $orig,
      m0: m0,
    }
  })
  var g1 = _vm.songs.length
  var g2 = g1 > 0 && !_vm.isLoading && !_vm.hasMore ? _vm.songs.length : null
  _vm.$mp.data = Object.assign(
    {},
    {
      $root: {
        g0: g0,
        l0: l0,
        g1: g1,
        g2: g2,
      },
    }
  )
}
var recyclableRender = false
var staticRenderFns = []
render._withStripped = true



/***/ }),

/***/ 251:
/*!****************************************************************************************************************************************!*\
  !*** D:/BaiduNetdiskDownload/uni-app-music/music-app/frontend/music-app-frontend/pages/playlist/playlist.vue?vue&type=script&lang=js& ***!
  \****************************************************************************************************************************************/
/*! no static exports found */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _hongmeng_HBuilderX_4_56_2025031210_HBuilderX_plugins_uniapp_cli_node_modules_babel_loader_lib_index_js_hongmeng_HBuilderX_4_56_2025031210_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_13_1_hongmeng_HBuilderX_4_56_2025031210_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_script_js_hongmeng_HBuilderX_4_56_2025031210_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_index_js_vue_loader_options_hongmeng_HBuilderX_4_56_2025031210_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_style_js_playlist_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../../../../../hongmeng/HBuilderX.4.56.2025031210/HBuilderX/plugins/uniapp-cli/node_modules/babel-loader/lib!../../../../../../../hongmeng/HBuilderX.4.56.2025031210/HBuilderX/plugins/uniapp-cli/node_modules/@dcloudio/vue-cli-plugin-uni/packages/webpack-preprocess-loader??ref--13-1!../../../../../../../hongmeng/HBuilderX.4.56.2025031210/HBuilderX/plugins/uniapp-cli/node_modules/@dcloudio/webpack-uni-mp-loader/lib/script.js!../../../../../../../hongmeng/HBuilderX.4.56.2025031210/HBuilderX/plugins/uniapp-cli/node_modules/@dcloudio/vue-cli-plugin-uni/packages/vue-loader/lib??vue-loader-options!../../../../../../../hongmeng/HBuilderX.4.56.2025031210/HBuilderX/plugins/uniapp-cli/node_modules/@dcloudio/webpack-uni-mp-loader/lib/style.js!./playlist.vue?vue&type=script&lang=js& */ 252);
/* harmony import */ var _hongmeng_HBuilderX_4_56_2025031210_HBuilderX_plugins_uniapp_cli_node_modules_babel_loader_lib_index_js_hongmeng_HBuilderX_4_56_2025031210_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_13_1_hongmeng_HBuilderX_4_56_2025031210_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_script_js_hongmeng_HBuilderX_4_56_2025031210_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_index_js_vue_loader_options_hongmeng_HBuilderX_4_56_2025031210_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_style_js_playlist_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_hongmeng_HBuilderX_4_56_2025031210_HBuilderX_plugins_uniapp_cli_node_modules_babel_loader_lib_index_js_hongmeng_HBuilderX_4_56_2025031210_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_13_1_hongmeng_HBuilderX_4_56_2025031210_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_script_js_hongmeng_HBuilderX_4_56_2025031210_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_index_js_vue_loader_options_hongmeng_HBuilderX_4_56_2025031210_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_style_js_playlist_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__);
/* harmony reexport (unknown) */ for(var __WEBPACK_IMPORT_KEY__ in _hongmeng_HBuilderX_4_56_2025031210_HBuilderX_plugins_uniapp_cli_node_modules_babel_loader_lib_index_js_hongmeng_HBuilderX_4_56_2025031210_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_13_1_hongmeng_HBuilderX_4_56_2025031210_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_script_js_hongmeng_HBuilderX_4_56_2025031210_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_index_js_vue_loader_options_hongmeng_HBuilderX_4_56_2025031210_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_style_js_playlist_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__) if(["default"].indexOf(__WEBPACK_IMPORT_KEY__) < 0) (function(key) { __webpack_require__.d(__webpack_exports__, key, function() { return _hongmeng_HBuilderX_4_56_2025031210_HBuilderX_plugins_uniapp_cli_node_modules_babel_loader_lib_index_js_hongmeng_HBuilderX_4_56_2025031210_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_13_1_hongmeng_HBuilderX_4_56_2025031210_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_script_js_hongmeng_HBuilderX_4_56_2025031210_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_index_js_vue_loader_options_hongmeng_HBuilderX_4_56_2025031210_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_style_js_playlist_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__[key]; }) }(__WEBPACK_IMPORT_KEY__));
 /* harmony default export */ __webpack_exports__["default"] = (_hongmeng_HBuilderX_4_56_2025031210_HBuilderX_plugins_uniapp_cli_node_modules_babel_loader_lib_index_js_hongmeng_HBuilderX_4_56_2025031210_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_13_1_hongmeng_HBuilderX_4_56_2025031210_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_script_js_hongmeng_HBuilderX_4_56_2025031210_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_index_js_vue_loader_options_hongmeng_HBuilderX_4_56_2025031210_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_style_js_playlist_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0___default.a); 

/***/ }),

/***/ 252:
/*!***********************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/babel-loader/lib!./node_modules/@dcloudio/vue-cli-plugin-uni/packages/webpack-preprocess-loader??ref--13-1!./node_modules/@dcloudio/webpack-uni-mp-loader/lib/script.js!./node_modules/@dcloudio/vue-cli-plugin-uni/packages/vue-loader/lib??vue-loader-options!./node_modules/@dcloudio/webpack-uni-mp-loader/lib/style.js!D:/BaiduNetdiskDownload/uni-app-music/music-app/frontend/music-app-frontend/pages/playlist/playlist.vue?vue&type=script&lang=js& ***!
  \***********************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************/
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
var _toConsumableArray2 = _interopRequireDefault(__webpack_require__(/*! @babel/runtime/helpers/toConsumableArray */ 18));
var _typeof2 = _interopRequireDefault(__webpack_require__(/*! @babel/runtime/helpers/typeof */ 13));
var _asyncToGenerator2 = _interopRequireDefault(__webpack_require__(/*! @babel/runtime/helpers/asyncToGenerator */ 32));
var _apiConfig = _interopRequireDefault(__webpack_require__(/*! @/utils/apiConfig.js */ 35));
var _request = _interopRequireDefault(__webpack_require__(/*! @/utils/request.js */ 173));
var _musicData = __webpack_require__(/*! @/utils/musicData.js */ 170);
var _playlistCache = __webpack_require__(/*! @/utils/playlistCache.js */ 236);
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
      isUserPlaylist: false,
      playlistId: '',
      playlistName: '',
      playlistType: '',
      playlistInfo: {
        id: '',
        name: '',
        description: '',
        cover: '',
        creator: ''
      },
      songs: [],
      totalSongs: 0,
      isLoading: false,
      isRefreshing: false,
      currentPage: 1,
      pageSize: 20,
      hasMore: true,
      scrollLeft: 0,
      showDescription: false,
      scrollTimer: null,
      // 添加滚动计时器
      isInitialLoading: true,
      loading: false,
      isFavorited: false,
      isUserCreated: false
    };
  },
  onLoad: function onLoad(options) {
    // 获取路由参数
    this.playlistId = options.id || '';
    this.playlistName = options.name ? decodeURIComponent(options.name) : '';
    this.playlistType = options.type || 'netease';

    // 判断是否为用户创建的播放列表
    this.isUserPlaylist = this.playlistType === 'user';

    // 设置标题
    uni.setNavigationBarTitle({
      title: this.playlistName || '歌单详情'
    });

    // 初始化播放列表信息
    this.playlistInfo.id = this.playlistId;
    this.playlistInfo.name = this.playlistName;

    // 监听播放列表数据更新事件
    uni.$on('playlists_updated', this.handlePlaylistsUpdated);
    uni.$on('playlists_fixed', this.handlePlaylistsUpdated);

    // 获取播放列表详情
    this.getPlaylistDetail();
  },
  onUnload: function onUnload() {
    // 清除滚动计时器
    if (this.scrollTimer) {
      clearInterval(this.scrollTimer);
    }

    // 移除事件监听
    uni.$off('playlists_updated', this.handlePlaylistsUpdated);
    uni.$off('playlists_fixed', this.handlePlaylistsUpdated);
  },
  methods: {
    // 获取播放列表详情
    getPlaylistDetail: function getPlaylistDetail() {
      var _this = this;
      return (0, _asyncToGenerator2.default)( /*#__PURE__*/_regenerator.default.mark(function _callee() {
        var _require, _getPlaylistById, userId, playlist;
        return _regenerator.default.wrap(function _callee$(_context) {
          while (1) {
            switch (_context.prev = _context.next) {
              case 0:
                _context.prev = 0;
                _this.isLoading = true;
                _this.isInitialLoading = true;

                // 导入播放列表缓存工具
                _require = __webpack_require__(/*! @/utils/playlistCache.js */ 236), _getPlaylistById = _require.getPlaylistById;
                userId = uni.getStorageSync('userId') || '';
                console.log('正在获取播放列表详情，ID:', _this.playlistId);

                // 先从本地缓存获取
                playlist = _getPlaylistById(_this.playlistId, userId);
                if (!playlist) {
                  _context.next = 18;
                  break;
                }
                console.log('从本地缓存中成功获取播放列表:', playlist.name);

                // 更新播放列表信息
                _this.playlistInfo = {
                  id: playlist.id,
                  name: playlist.name || '未命名歌单',
                  description: playlist.description || '暂无描述',
                  cover: playlist.cover || '/static/music-cover.png',
                  creator: playlist.creator || '我'
                };

                // 更新歌曲列表
                if (playlist.songs && Array.isArray(playlist.songs)) {
                  // 记录歌曲数据结构，方便调试
                  if (playlist.songs.length > 0) {
                    console.log('歌曲数据样例:', JSON.stringify(playlist.songs[0]));
                  }

                  // 确保所有歌曲都有必要的字段
                  _this.songs = playlist.songs.map(function (song) {
                    // 直接支持多个字段名，而不是使用临时变量
                    var songObj = {
                      id: song.id || song.song_id || song.songId || song.netease_id || "local_".concat(Date.now(), "_").concat(Math.random().toString(36).substring(2)),
                      song_id: song.song_id || song.id,
                      // 保留song_id字段
                      name: song.name && song.name !== '未知歌曲' ? song.name : song.song_name || song.songName || song.title || '未知歌曲',
                      artist: song.artist || song.singer || song.artistName || song.artists || '未知歌手',
                      album: song.album || song.albumName || '未知专辑',
                      duration: song.duration || 0,
                      cover: song.cover || song.coverUrl || song.cover_url || '/static/music-cover.png'
                    };

                    // 如果仍然无法获取名称，记录原始对象
                    if (songObj.name === '未知歌曲') {
                      console.warn('歌曲名称缺失:', JSON.stringify(song));
                    }

                    // 确保歌曲有URL
                    songObj.url = song.url || song.mp3Url || song.mp3_url || "https://music.163.com/song/media/outer/url?id=".concat(songObj.id, ".mp3");
                    return songObj;
                  });
                } else {
                  _this.songs = [];
                }
                _this.totalSongs = _this.songs.length;
                _this.hasMore = false; // 本地播放列表一次性加载所有歌曲

                // 启动自动滚动效果（如果标题过长）
                _this.$nextTick(function () {
                  _this.startTitleScrollAnimation();
                });
                _this.isLoading = false;
                _this.isInitialLoading = false;
                _this.isRefreshing = false;
                return _context.abrupt("return");
              case 18:
                // 如果本地缓存没有，则从服务器获取
                console.log('本地缓存中未找到播放列表，尝试从服务器获取');

                // 判断是用户自建的播放列表还是其他类型
                if (!_this.isUserPlaylist) {
                  _context.next = 24;
                  break;
                }
                _context.next = 22;
                return _this.getUserPlaylistDetail();
              case 22:
                _context.next = 26;
                break;
              case 24:
                _context.next = 26;
                return _this.getNetEasePlaylistDetail();
              case 26:
                _context.next = 36;
                break;
              case 28:
                _context.prev = 28;
                _context.t0 = _context["catch"](0);
                console.error('获取播放列表详情失败:', _context.t0);
                uni.showToast({
                  title: '获取播放列表失败',
                  icon: 'none'
                });

                // 设置默认数据
                _this.playlistInfo = {
                  id: _this.playlistId,
                  name: _this.playlistName || '未找到歌单',
                  description: '暂无描述',
                  cover: '/static/default-playlist.png',
                  creator: '未知'
                };
                _this.songs = [];
                _this.totalSongs = 0;
                _this.hasMore = false;
              case 36:
                _context.prev = 36;
                _this.isLoading = false;
                _this.isRefreshing = false;
                _this.isInitialLoading = false;
                return _context.finish(36);
              case 41:
              case "end":
                return _context.stop();
            }
          }
        }, _callee, null, [[0, 28, 36, 41]]);
      }))();
    },
    // 获取用户创建的播放列表详情
    getUserPlaylistDetail: function getUserPlaylistDetail() {
      var _this2 = this;
      return (0, _asyncToGenerator2.default)( /*#__PURE__*/_regenerator.default.mark(function _callee2() {
        var _require2, _getPlaylistById2, userId, cachedPlaylist, storageKey, userPlaylistsData, userPlaylists, currentPlaylist, url, response, playlist;
        return _regenerator.default.wrap(function _callee2$(_context2) {
          while (1) {
            switch (_context2.prev = _context2.next) {
              case 0:
                _context2.prev = 0;
                console.log('开始获取用户播放列表详情，播放列表ID:', _this2.playlistId);

                // 导入播放列表缓存工具
                _require2 = __webpack_require__(/*! @/utils/playlistCache.js */ 236), _getPlaylistById2 = _require2.getPlaylistById; // 获取用户ID
                userId = uni.getStorageSync('userId') || ''; // 优先从缓存工具获取播放列表
                cachedPlaylist = _getPlaylistById2(_this2.playlistId, userId);
                if (!cachedPlaylist) {
                  _context2.next = 13;
                  break;
                }
                console.log('使用playlistCache工具成功获取播放列表:', cachedPlaylist.name);

                // 直接使用缓存的数据
                _this2.playlistInfo = {
                  id: cachedPlaylist.id,
                  name: cachedPlaylist.name || '未命名歌单',
                  description: cachedPlaylist.description || '暂无描述',
                  cover: cachedPlaylist.cover || '/static/default-playlist.png',
                  creator: cachedPlaylist.creator || '我'
                };

                // 确保所有歌曲都有必要的字段
                if (cachedPlaylist.songs && Array.isArray(cachedPlaylist.songs)) {
                  // 记录歌曲数据结构，方便调试
                  if (cachedPlaylist.songs.length > 0) {
                    console.log('用户歌单歌曲数据样例:', JSON.stringify(cachedPlaylist.songs[0]));
                  }
                  _this2.songs = cachedPlaylist.songs.map(function (song) {
                    // 直接支持多个字段名，而不是使用临时变量
                    var songObj = {
                      id: song.id || song.song_id || song.songId || song.netease_id || "local_".concat(Date.now(), "_").concat(Math.random().toString(36).substring(2)),
                      song_id: song.song_id || song.id,
                      // 保留song_id字段
                      name: song.name && song.name !== '未知歌曲' ? song.name : song.song_name || song.songName || song.title || '未知歌曲',
                      artist: song.artist || song.singer || song.artistName || song.artists || '未知歌手',
                      album: song.album || song.albumName || '未知专辑',
                      duration: song.duration || 0,
                      cover: song.cover || song.coverUrl || song.cover_url || '/static/music-cover.png'
                    };

                    // 如果仍然无法获取名称，记录原始对象
                    if (songObj.name === '未知歌曲') {
                      console.warn('用户歌单歌曲名称缺失:', JSON.stringify(song));
                    }

                    // 确保歌曲有URL
                    songObj.url = song.url || song.mp3Url || song.mp3_url || "https://music.163.com/song/media/outer/url?id=".concat(songObj.id, ".mp3");
                    return songObj;
                  });
                } else {
                  _this2.songs = [];
                }
                _this2.totalSongs = _this2.songs.length;
                _this2.hasMore = false;

                // 启动自动滚动效果（如果标题过长）
                _this2.$nextTick(function () {
                  _this2.startTitleScrollAnimation();
                });
                return _context2.abrupt("return");
              case 13:
                // 如果缓存工具没有找到，则尝试老的方法
                console.log('缓存工具中未找到播放列表，尝试从本地存储同步数据获取');

                // 尝试从本地存储的同步数据中获取播放列表
                storageKey = "user_".concat(userId, "_playlists");
                console.log('尝试从本地存储获取:', storageKey);
                userPlaylistsData = uni.getStorageSync(storageKey);
                console.log('获取到的原始播放列表数据类型:', (0, _typeof2.default)(userPlaylistsData));

                // 如果在user_1_playlists中没找到，尝试从playlists中获取
                if (!userPlaylistsData || userPlaylistsData === '') {
                  console.log('从user_ID_playlists中未找到数据，尝试从playlists获取');
                  userPlaylistsData = uni.getStorageSync('playlists');
                  console.log('从playlists获取的数据类型:', (0, _typeof2.default)(userPlaylistsData));
                }

                // 安全解析播放列表数据
                userPlaylists = [];
                try {
                  // 检查数据是否有效
                  if (!userPlaylistsData) {
                    console.log('本地存储中没有找到播放列表数据');
                    userPlaylists = [];
                  }
                  // 如果是字符串，尝试解析
                  else if (typeof userPlaylistsData === 'string') {
                    // 检查字符串是否为空或者不是有效的JSON格式
                    if (userPlaylistsData.trim() === '') {
                      console.log('播放列表数据为空字符串');
                      userPlaylists = [];
                    } else {
                      try {
                        // 确保字符串是合法的JSON
                        if (!userPlaylistsData.startsWith('[') && !userPlaylistsData.startsWith('{')) {
                          console.error('播放列表数据不是有效的JSON格式:', userPlaylistsData.substring(0, 20) + '...');
                          userPlaylists = [];
                        } else {
                          userPlaylists = JSON.parse(userPlaylistsData);
                          console.log('成功解析播放列表JSON数据');
                        }
                      } catch (parseError) {
                        console.error('解析播放列表数据失败:', parseError);
                        // 初始化为空数组
                        userPlaylists = [];
                      }
                    }
                  }
                  // 如果已经是数组，直接使用
                  else if (Array.isArray(userPlaylistsData)) {
                    console.log('播放列表数据已经是数组');
                    userPlaylists = userPlaylistsData;
                  }
                  // 如果是对象但不是数组，可能是单个播放列表
                  else if ((0, _typeof2.default)(userPlaylistsData) === 'object') {
                    console.log('播放列表数据是对象但不是数组');
                    userPlaylists = [userPlaylistsData];
                  }
                  // 其他情况使用空数组
                  else {
                    console.error('播放列表数据类型无法处理:', (0, _typeof2.default)(userPlaylistsData));
                    userPlaylists = [];
                  }
                } catch (e) {
                  console.error('处理播放列表数据时出错:', e);
                  userPlaylists = [];
                }

                // 确保userPlaylists是数组
                if (!Array.isArray(userPlaylists)) {
                  console.log('处理后的播放列表数据不是数组，重置为空数组');
                  userPlaylists = [];
                }
                console.log('处理后的播放列表数据:', userPlaylists);

                // 查找当前播放列表
                currentPlaylist = userPlaylists.find(function (list) {
                  return list && list.id == _this2.playlistId;
                });
                console.log('找到的播放列表:', currentPlaylist);
                if (!currentPlaylist) {
                  _context2.next = 33;
                  break;
                }
                // 从本地存储中找到了播放列表，使用该数据
                console.log('从本地存储中成功找到播放列表');

                // 更新播放列表信息
                _this2.playlistInfo = {
                  id: currentPlaylist.id,
                  name: currentPlaylist.name || '未命名歌单',
                  description: currentPlaylist.description || '暂无描述',
                  cover: currentPlaylist.cover || '/static/music-cover.png',
                  creator: currentPlaylist.creator || '我'
                };

                // 更新歌曲列表
                if (currentPlaylist.songs && Array.isArray(currentPlaylist.songs)) {
                  _this2.songs = currentPlaylist.songs.map(function (song) {
                    // 确保歌曲有正确的属性
                    var songObj = {
                      id: song.song_id || song.id || song.songId || song.netease_id || song.neteaseId || "local_".concat(Date.now(), "_").concat(Math.random().toString(36).substring(2)),
                      // 确保有歌曲名称（支持多种字段名）
                      name: song.name && song.name !== '未知歌曲' ? song.name : song.song_name || song.songName || song.title || '未知歌曲',
                      artist: song.artist || song.singer || song.artistName || song.artists || '未知歌手',
                      album: song.album || song.albumName || '未知专辑',
                      duration: song.duration || 0,
                      cover: song.cover || song.coverUrl || song.cover_url || song.pic || song.picUrl || '/static/default-song.png'
                    };

                    // 确保歌曲有URL
                    if (!song.url) {
                      songObj.url = song.mp3Url || song.mp3_url || "https://music.163.com/song/media/outer/url?id=".concat(songObj.id, ".mp3");
                    } else {
                      songObj.url = song.url;
                    }
                    return songObj;
                  });
                } else {
                  _this2.songs = [];
                }
                _this2.totalSongs = _this2.songs.length;
                _this2.hasMore = false; // 用户播放列表一次性加载所有歌曲

                // 启动自动滚动效果（如果标题过长）
                _this2.$nextTick(function () {
                  _this2.startTitleScrollAnimation();
                });
                return _context2.abrupt("return");
              case 33:
                // 如果本地存储中没有找到，从服务器获取
                console.log('本地存储中未找到播放列表，尝试从服务器获取');
                url = "".concat(_apiConfig.default.playlist.baseUrl).concat(_apiConfig.default.playlist.detail(_this2.playlistId));
                _context2.next = 37;
                return (0, _request.default)(url, 'GET');
              case 37:
                response = _context2.sent;
                if (!(response.code === 200 && response.data)) {
                  _context2.next = 47;
                  break;
                }
                playlist = response.data; // 更新播放列表信息
                _this2.playlistInfo = {
                  id: playlist.id,
                  name: playlist.name,
                  description: playlist.description || '暂无描述',
                  cover: playlist.cover || '/static/default-playlist.png',
                  creator: playlist.creator || '我'
                };

                // 更新歌曲列表，确保每首歌都有URL
                if (playlist.songs && Array.isArray(playlist.songs)) {
                  _this2.songs = playlist.songs.map(function (song) {
                    // 确保歌曲有正确的属性
                    var songObj = {
                      id: song.id || song.netease_id || song.neteaseId || song.songId || "local_".concat(Date.now(), "_").concat(Math.random().toString(36).substring(2)),
                      // 确保有歌曲名称（优先级：name > song_name > title > songName）
                      name: song.name && song.name !== '未知歌曲' ? song.name : song.song_name || song.songName || song.title || '未知歌曲',
                      artist: song.artist || song.artistName || song.singer || '未知歌手',
                      album: song.album || song.albumName || '未知专辑',
                      duration: song.duration || 0,
                      cover: song.cover || song.coverUrl || song.cover_url || '/static/default-song.png'
                    };

                    // 确保歌曲有URL
                    if (!song.url) {
                      songObj.url = "https://music.163.com/song/media/outer/url?id=".concat(songObj.id, ".mp3");
                    } else {
                      songObj.url = song.url;
                    }
                    return songObj;
                  });
                } else {
                  _this2.songs = [];
                }
                _this2.totalSongs = _this2.songs.length;
                _this2.hasMore = false; // 用户播放列表一次性加载所有歌曲

                // 启动自动滚动效果（如果标题过长）
                _this2.$nextTick(function () {
                  _this2.startTitleScrollAnimation();
                });
                _context2.next = 48;
                break;
              case 47:
                throw new Error(response.message || '获取播放列表详情失败');
              case 48:
                _context2.next = 59;
                break;
              case 50:
                _context2.prev = 50;
                _context2.t0 = _context2["catch"](0);
                console.error('获取用户播放列表详情失败：', _context2.t0);
                // 显示友好的错误提示
                uni.showToast({
                  title: '获取播放列表失败，请重试',
                  icon: 'none',
                  duration: 2000
                });

                // 初始化为空数据
                _this2.playlistInfo = {
                  id: _this2.playlistId,
                  name: _this2.playlistName || '未找到歌单',
                  description: '暂无描述',
                  cover: '/static/default-playlist.png',
                  creator: '未知'
                };
                _this2.songs = [];
                _this2.totalSongs = 0;
                _this2.hasMore = false;
                throw _context2.t0;
              case 59:
              case "end":
                return _context2.stop();
            }
          }
        }, _callee2, null, [[0, 50]]);
      }))();
    },
    // 获取网易云音乐歌单详情
    getNetEasePlaylistDetail: function getNetEasePlaylistDetail() {
      var _this3 = this;
      return (0, _asyncToGenerator2.default)( /*#__PURE__*/_regenerator.default.mark(function _callee3() {
        var result, newSongs;
        return _regenerator.default.wrap(function _callee3$(_context3) {
          while (1) {
            switch (_context3.prev = _context3.next) {
              case 0:
                _context3.prev = 0;
                _context3.next = 3;
                return (0, _musicData.getPlaylistDetail)(_this3.playlistId);
              case 3:
                result = _context3.sent;
                // 更新播放列表信息
                _this3.playlistInfo = {
                  id: result.playlist_id,
                  name: result.name,
                  description: result.description || '暂无描述',
                  cover: result.cover,
                  creator: result.creator || '网易云音乐'
                };

                // 根据是否是首次加载或刷新，处理歌曲列表
                if (_this3.isRefreshing || _this3.currentPage === 1) {
                  // 初次加载或刷新，替换现有列表
                  _this3.songs = result.tracks.slice(0, _this3.pageSize).map(function (song) {
                    // 确保歌曲有URL
                    if (!song.url) {
                      song.url = "https://music.163.com/song/media/outer/url?id=".concat(song.id, ".mp3");
                    }
                    return song;
                  });
                } else {
                  // 加载更多，追加到列表
                  newSongs = result.tracks.slice((_this3.currentPage - 1) * _this3.pageSize, _this3.currentPage * _this3.pageSize).map(function (song) {
                    // 确保歌曲有URL
                    if (!song.url) {
                      song.url = "https://music.163.com/song/media/outer/url?id=".concat(song.id, ".mp3");
                    }
                    return song;
                  });
                  _this3.songs = [].concat((0, _toConsumableArray2.default)(_this3.songs), (0, _toConsumableArray2.default)(newSongs));
                }

                // 更新总数和是否有更多
                _this3.totalSongs = result.totalCount || result.tracks.length;
                _this3.hasMore = _this3.songs.length < _this3.totalSongs;

                // 启动自动滚动效果（如果标题过长）
                _this3.$nextTick(function () {
                  _this3.startTitleScrollAnimation();
                });
                _context3.next = 15;
                break;
              case 11:
                _context3.prev = 11;
                _context3.t0 = _context3["catch"](0);
                console.error('获取网易云音乐歌单详情失败：', _context3.t0);
                throw _context3.t0;
              case 15:
              case "end":
                return _context3.stop();
            }
          }
        }, _callee3, null, [[0, 11]]);
      }))();
    },
    // 加载更多歌曲
    loadMoreSongs: function loadMoreSongs() {
      if (this.isLoading || !this.hasMore || this.isUserPlaylist) return;
      this.currentPage++;
      this.getNetEasePlaylistDetail();
    },
    // 刷新
    onRefresh: function onRefresh() {
      var _this4 = this;
      return (0, _asyncToGenerator2.default)( /*#__PURE__*/_regenerator.default.mark(function _callee4() {
        return _regenerator.default.wrap(function _callee4$(_context4) {
          while (1) {
            switch (_context4.prev = _context4.next) {
              case 0:
                _this4.isRefreshing = true;
                _this4.currentPage = 1;
                _context4.next = 4;
                return _this4.getPlaylistDetail();
              case 4:
              case "end":
                return _context4.stop();
            }
          }
        }, _callee4);
      }))();
    },
    // 播放歌曲
    playSong: function playSong(song) {
      try {
        // 防止未定义的song对象
        if (!song || (0, _typeof2.default)(song) !== 'object') {
          console.error('错误：尝试播放无效的歌曲对象');
          uni.showToast({
            title: '无法播放：无效的歌曲',
            icon: 'none'
          });
          return;
        }

        // 先深拷贝song对象，避免直接修改原始数据
        var songToPlay = JSON.parse(JSON.stringify(song));

        // 标准化ID，确保song_id字段存在
        if (!songToPlay.song_id) {
          songToPlay.song_id = songToPlay.id || songToPlay.songId || songToPlay.netease_id || songToPlay.neteaseId || "local_".concat(Date.now());
          console.log('设置song_id:', songToPlay.song_id);
        }

        // 确保本地id存在
        if (!songToPlay.id) {
          songToPlay.id = songToPlay.song_id || "local_".concat(Date.now());
          console.log('设置本地id:', songToPlay.id);
        }

        // 标准化歌曲名称
        if (!songToPlay.name) {
          songToPlay.name = songToPlay.song_name || songToPlay.songName || songToPlay.title || '未知歌曲';
          console.log('使用替代名称:', songToPlay.name);
        }

        // 标准化歌手名称
        if (!songToPlay.artist) {
          songToPlay.artist = songToPlay.singer || songToPlay.artistName || songToPlay.artists || '未知歌手';
          console.log('使用替代歌手名称:', songToPlay.artist);
        }

        // 确保有专辑名
        if (!songToPlay.album) {
          songToPlay.album = songToPlay.albumName || '未知专辑';
        }

        // 添加到播放历史
        (0, _musicData.addToPlayHistory)(songToPlay);

        // 确保歌曲有song_id和id属性
        if (!songToPlay.song_id && !songToPlay.id) {
          console.error('错误：歌曲缺少ID，无法播放');
          uni.showToast({
            title: '无法播放：歌曲ID缺失',
            icon: 'none'
          });
          return;
        }

        // 确保歌曲有url属性，优先使用song_id生成URL
        if (!songToPlay.url) {
          console.log('歌曲URL为空，使用ID生成URL');
          songToPlay.url = songToPlay.mp3Url || songToPlay.mp3_url || "https://music.163.com/song/media/outer/url?id=".concat(songToPlay.song_id || songToPlay.id, ".mp3");
        }

        // 设置自动播放标记，确保加载后立即播放
        uni.setStorageSync('autoPlay', 'true');

        // 保存当前要播放的歌曲
        uni.setStorageSync('currentSong', JSON.stringify(songToPlay));

        // 保存完整播放列表到本地存储
        var playList = this.songs.map(function (s) {
          // 确保每首歌曲都有必要的字段
          var song = JSON.parse(JSON.stringify(s));

          // 确保song_id字段存在
          if (!song.song_id) {
            song.song_id = song.id || song.songId || song.netease_id || song.neteaseId || '';
          }

          // 确保URL字段存在，优先使用song_id
          if (!song.url) {
            song.url = song.mp3Url || song.mp3_url || "https://music.163.com/song/media/outer/url?id=".concat(song.song_id || song.id, ".mp3");
          }
          return song;
        });

        // 找到当前歌曲在列表中的索引，优先使用song_id匹配
        var songIndex = playList.findIndex(function (s) {
          return songToPlay.song_id && s.song_id === songToPlay.song_id || songToPlay.id && s.id === songToPlay.id;
        });

        // 保存播放列表和索引
        uni.setStorageSync('playList', JSON.stringify(playList));
        uni.setStorageSync('currentIndex', songIndex >= 0 ? songIndex : 0);

        // 在控制台打印调试信息
        console.log('准备播放歌曲:', songToPlay);
        console.log('保存播放列表，长度:', playList.length, '当前索引:', songIndex);

        // 先切换到播放器页面，然后通过事件触发播放
        var pages = getCurrentPages();
        var currentPage = pages[pages.length - 1].route;

        // 判断当前是否在播放器页面
        if (currentPage === 'pages/player/player') {
          // 如果已经在播放器页面，直接发送播放事件
          // 传递歌曲、播放列表和索引
          uni.$emit('playSong', {
            song: songToPlay,
            playList: playList,
            index: songIndex >= 0 ? songIndex : 0
          });
        } else {
          // 如果不在播放器页面，先跳转再播放
          uni.switchTab({
            url: '/pages/player/player',
            success: function success() {
              // 等待页面跳转完成后发送播放事件
              setTimeout(function () {
                // 传递歌曲、播放列表和索引
                uni.$emit('playSong', {
                  song: songToPlay,
                  playList: playList,
                  index: songIndex >= 0 ? songIndex : 0
                });
              }, 200);
            }
          });
        }
      } catch (error) {
        console.error('播放歌曲失败:', error);
        uni.showToast({
          title: '播放失败，请重试',
          icon: 'none'
        });
      }
    },
    // 显示完整歌单介绍
    showFullDescription: function showFullDescription() {
      if (!this.playlistInfo.description || this.playlistInfo.description === '暂无描述') {
        return;
      }

      // 显示弹窗而不是modal
      this.showDescription = true;
    },
    // 隐藏完整歌单介绍
    hideFullDescription: function hideFullDescription() {
      this.showDescription = false;
    },
    // 格式化时长
    formatDuration: function formatDuration(duration) {
      if (!duration) return '00:00';
      var totalSeconds = Math.floor(duration / 1000);
      var minutes = Math.floor(totalSeconds / 60);
      var seconds = totalSeconds % 60;
      return "".concat(minutes.toString().padStart(2, '0'), ":").concat(seconds.toString().padStart(2, '0'));
    },
    // 处理滚动
    onScroll: function onScroll(e) {
      this.scrollLeft = e.detail.scrollLeft;
    },
    // 启动标题自动滚动动画
    startTitleScrollAnimation: function startTitleScrollAnimation() {
      var _this5 = this;
      // 清除之前的定时器
      if (this.scrollTimer) {
        clearInterval(this.scrollTimer);
      }

      // 获取名称滚动区域宽度
      var query = uni.createSelectorQuery().in(this);
      query.select('.name-scroll').boundingClientRect();
      query.select('.name').boundingClientRect();
      query.exec(function (res) {
        if (res[0] && res[1] && res[1].width > res[0].width) {
          // 如果名称宽度超过容器宽度，启动滚动
          var containerWidth = res[0].width;
          var textWidth = res[1].width;
          var scrollDistance = textWidth - containerWidth + 50; // 额外的50是padding-right

          // 先重置位置
          _this5.scrollLeft = 0;

          // 立即开始第一次滚动
          _this5.startScrollAnimation(scrollDistance);

          // 设置滚动循环定时器
          _this5.scrollTimer = setInterval(function () {
            _this5.startScrollAnimation(scrollDistance);
          }, 10000); // 完整的滚动周期（8秒滚动+1秒停留+1秒重置）
        }
      });
    },
    // 执行单次滚动动画
    startScrollAnimation: function startScrollAnimation(scrollDistance) {
      var _this6 = this;
      // 渐进滚动到末尾
      var duration = 8000; // 滚动持续时间8秒
      var startTime = Date.now();
      var startScrollLeft = 0; // 总是从0开始

      // 先重置位置
      this.scrollLeft = 0;
      var scroll = function scroll() {
        var elapsedTime = Date.now() - startTime;
        if (elapsedTime < duration) {
          // 计算当前滚动位置
          var progress = elapsedTime / duration;
          _this6.scrollLeft = startScrollLeft + scrollDistance * progress;
          requestAnimationFrame(scroll);
        } else {
          // 滚动结束，重置并准备下一轮
          setTimeout(function () {
            _this6.scrollLeft = 0;
          }, 800); // 在末尾停留0.8秒
        }
      };

      // 立即开始滚动，不延迟
      requestAnimationFrame(scroll);
    },
    // 添加歌曲到播放列表
    addSong: function addSong() {
      if (!this.isUserPlaylist) {
        uni.showToast({
          title: '仅可编辑自己创建的播放列表',
          icon: 'none'
        });
        return;
      }
      console.log("准备跳转到搜索页面添加歌曲，歌单ID:", this.playlistId);

      // 检查歌单ID是否有效
      if (!this.playlistId) {
        console.error("歌单ID无效，无法添加歌曲");
        uni.showToast({
          title: '歌单ID无效',
          icon: 'none',
          duration: 2000
        });
        return;
      }

      // 显示加载提示
      uni.showLoading({
        title: '准备中...'
      });
      try {
        // 构造URL，确保参数正确编码
        var url = "/pages/search/search?from=playlist&playlistId=".concat(encodeURIComponent(this.playlistId));
        console.log("完整跳转URL:", url);

        // 添加一个本地标记，用于验证回调是否正常
        try {
          uni.setStorageSync('lastPlaylistAction', JSON.stringify({
            action: 'addSong',
            playlistId: this.playlistId,
            timestamp: Date.now()
          }));
        } catch (e) {
          console.error("设置本地标记失败:", e);
        }

        // 跳转到搜索页面
        uni.navigateTo({
          url: url,
          success: function success() {
            console.log("成功跳转到搜索页面");
            uni.hideLoading();
          },
          fail: function fail(err) {
            console.error("跳转到搜索页面失败:", err);
            uni.hideLoading();
            uni.showToast({
              title: '跳转失败，请重试',
              icon: 'none'
            });
          }
        });
      } catch (error) {
        console.error("跳转过程出错:", error);
        uni.hideLoading();
        uni.showToast({
          title: '操作失败，请重试',
          icon: 'none'
        });
      }
    },
    // 从播放列表中移除歌曲
    removeSong: function removeSong(song, index) {
      var _this7 = this;
      return (0, _asyncToGenerator2.default)( /*#__PURE__*/_regenerator.default.mark(function _callee6() {
        return _regenerator.default.wrap(function _callee6$(_context6) {
          while (1) {
            switch (_context6.prev = _context6.next) {
              case 0:
                if (_this7.isUserPlaylist) {
                  _context6.next = 3;
                  break;
                }
                uni.showToast({
                  title: '仅可编辑自己创建的播放列表',
                  icon: 'none'
                });
                return _context6.abrupt("return");
              case 3:
                // 确认删除
                uni.showModal({
                  title: '删除歌曲',
                  content: "\u786E\u5B9A\u8981\u4ECE\u64AD\u653E\u5217\u8868\u4E2D\u79FB\u9664\u300A".concat(song.name, "\u300B\u5417\uFF1F"),
                  success: function () {
                    var _success = (0, _asyncToGenerator2.default)( /*#__PURE__*/_regenerator.default.mark(function _callee5(res) {
                      var url, response;
                      return _regenerator.default.wrap(function _callee5$(_context5) {
                        while (1) {
                          switch (_context5.prev = _context5.next) {
                            case 0:
                              if (!res.confirm) {
                                _context5.next = 19;
                                break;
                              }
                              _context5.prev = 1;
                              url = "".concat(_apiConfig.default.playlist.baseUrl).concat(_apiConfig.default.playlist.removeSong(_this7.playlistId, song.id));
                              _context5.next = 5;
                              return (0, _request.default)(url, 'DELETE');
                            case 5:
                              response = _context5.sent;
                              if (!(response.code === 200)) {
                                _context5.next = 12;
                                break;
                              }
                              // 从本地数组移除
                              _this7.songs.splice(index, 1);
                              _this7.totalSongs--;
                              uni.showToast({
                                title: '已移除',
                                icon: 'success'
                              });
                              _context5.next = 13;
                              break;
                            case 12:
                              throw new Error(response.message || '移除失败');
                            case 13:
                              _context5.next = 19;
                              break;
                            case 15:
                              _context5.prev = 15;
                              _context5.t0 = _context5["catch"](1);
                              console.error('移除歌曲失败：', _context5.t0);
                              uni.showToast({
                                title: _context5.t0.message || '移除歌曲失败',
                                icon: 'none'
                              });
                            case 19:
                            case "end":
                              return _context5.stop();
                          }
                        }
                      }, _callee5, null, [[1, 15]]);
                    }));
                    function success(_x) {
                      return _success.apply(this, arguments);
                    }
                    return success;
                  }()
                });
              case 4:
              case "end":
                return _context6.stop();
            }
          }
        }, _callee6);
      }))();
    },
    // 处理播放列表数据更新事件
    handlePlaylistsUpdated: function handlePlaylistsUpdated(event) {
      console.log('收到播放列表更新事件:', event);
      // 重新加载播放列表详情
      this.getPlaylistDetail();
    },
    // 显示更多操作菜单
    showMore: function showMore() {
      // 检查是否是用户创建的歌单
      this.checkIfUserCreated();
      this.$refs.moreOptionsPopup.open();
    },
    // 关闭更多操作菜单
    closeMoreOptions: function closeMoreOptions() {
      this.$refs.moreOptionsPopup.close();
    },
    // 检查是否为用户创建的歌单
    checkIfUserCreated: function checkIfUserCreated() {
      // 用户创建的歌单通常有特定的ID前缀或标记
      // 或者可以通过检查歌单与用户的关联关系来判断
      var userInfo = uni.getStorageSync('userInfo');
      // 本地创建的歌单ID通常以local_开头
      this.isUserCreated = this.playlistInfo && this.playlistInfo.id && (String(this.playlistInfo.id).startsWith('local_') || userInfo && userInfo.id && this.playlistInfo.creator === userInfo.nickname);
      console.log('是否为用户创建的歌单:', this.isUserCreated);
    },
    // 显示删除确认弹窗
    showDeleteConfirm: function showDeleteConfirm() {
      var _this8 = this;
      this.closeMoreOptions();
      setTimeout(function () {
        _this8.$refs.deleteConfirmPopup.open();
      }, 300);
    },
    // 取消删除
    cancelDelete: function cancelDelete() {
      this.$refs.deleteConfirmPopup.close();
    },
    // 确认删除歌单
    confirmDelete: function confirmDelete() {
      var _this9 = this;
      return (0, _asyncToGenerator2.default)( /*#__PURE__*/_regenerator.default.mark(function _callee7() {
        var _require3, permanentlyDeletePlaylist, userInfo, userId, result;
        return _regenerator.default.wrap(function _callee7$(_context7) {
          while (1) {
            switch (_context7.prev = _context7.next) {
              case 0:
                _context7.prev = 0;
                // 显示加载中
                uni.showLoading({
                  title: '删除中...',
                  mask: true
                });
                console.log("\u6B63\u5728\u5220\u9664\u6B4C\u5355\uFF1AID=".concat(_this9.playlistInfo.id, ", \u540D\u79F0=").concat(_this9.playlistInfo.name));

                // 从playlistCache.js导入永久删除函数
                _require3 = __webpack_require__(/*! @/utils/playlistCache.js */ 236), permanentlyDeletePlaylist = _require3.permanentlyDeletePlaylist; // 获取用户信息
                userInfo = uni.getStorageSync('userInfo');
                userId = userInfo && userInfo.id ? userInfo.id : '';
                if (userId) {
                  _context7.next = 11;
                  break;
                }
                uni.hideLoading();
                uni.showToast({
                  title: '请先登录',
                  icon: 'none'
                });
                _this9.$refs.deleteConfirmPopup.close();
                return _context7.abrupt("return");
              case 11:
                _context7.next = 13;
                return permanentlyDeletePlaylist(_this9.playlistInfo.id, userId);
              case 13:
                result = _context7.sent;
                uni.hideLoading();
                if (result.success) {
                  // 显示适当的成功消息
                  uni.showToast({
                    title: result.message || '删除成功',
                    icon: 'success'
                  });

                  // 关闭确认弹窗
                  _this9.$refs.deleteConfirmPopup.close();

                  // 返回上一页
                  setTimeout(function () {
                    uni.navigateBack();
                  }, 1500);
                } else {
                  // 删除失败
                  uni.showToast({
                    title: result.message || '删除失败，请重试',
                    icon: 'none'
                  });
                  _this9.$refs.deleteConfirmPopup.close();
                }
                _context7.next = 24;
                break;
              case 18:
                _context7.prev = 18;
                _context7.t0 = _context7["catch"](0);
                uni.hideLoading();
                console.error('删除歌单失败：', _context7.t0);
                uni.showToast({
                  title: '删除失败，请重试',
                  icon: 'none'
                });
                _this9.$refs.deleteConfirmPopup.close();
              case 24:
              case "end":
                return _context7.stop();
            }
          }
        }, _callee7, null, [[0, 18]]);
      }))();
    },
    // 切换收藏状态
    toggleFavorite: function toggleFavorite() {
      var _this10 = this;
      return (0, _asyncToGenerator2.default)( /*#__PURE__*/_regenerator.default.mark(function _callee8() {
        return _regenerator.default.wrap(function _callee8$(_context8) {
          while (1) {
            switch (_context8.prev = _context8.next) {
              case 0:
                // 已有的收藏/取消收藏歌单逻辑
                // ... existing code ...
                _this10.closeMoreOptions();
              case 1:
              case "end":
                return _context8.stop();
            }
          }
        }, _callee8);
      }))();
    },
    // 分享歌单
    sharePlaylist: function sharePlaylist() {
      uni.showToast({
        title: '分享功能开发中',
        icon: 'none'
      });
      this.closeMoreOptions();
    }
  }
};
exports.default = _default;
/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(/*! ./node_modules/@dcloudio/uni-mp-weixin/dist/index.js */ 2)["default"]))

/***/ }),

/***/ 253:
/*!*************************************************************************************************************************************************!*\
  !*** D:/BaiduNetdiskDownload/uni-app-music/music-app/frontend/music-app-frontend/pages/playlist/playlist.vue?vue&type=style&index=0&lang=scss& ***!
  \*************************************************************************************************************************************************/
/*! no static exports found */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _hongmeng_HBuilderX_4_56_2025031210_HBuilderX_plugins_uniapp_cli_node_modules_mini_css_extract_plugin_dist_loader_js_ref_8_oneOf_1_0_hongmeng_HBuilderX_4_56_2025031210_HBuilderX_plugins_uniapp_cli_node_modules_css_loader_dist_cjs_js_ref_8_oneOf_1_1_hongmeng_HBuilderX_4_56_2025031210_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_loaders_stylePostLoader_js_hongmeng_HBuilderX_4_56_2025031210_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_8_oneOf_1_2_hongmeng_HBuilderX_4_56_2025031210_HBuilderX_plugins_uniapp_cli_node_modules_postcss_loader_src_index_js_ref_8_oneOf_1_3_hongmeng_HBuilderX_4_56_2025031210_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_sass_loader_dist_cjs_js_ref_8_oneOf_1_4_hongmeng_HBuilderX_4_56_2025031210_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_8_oneOf_1_5_hongmeng_HBuilderX_4_56_2025031210_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_index_js_vue_loader_options_hongmeng_HBuilderX_4_56_2025031210_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_style_js_playlist_vue_vue_type_style_index_0_lang_scss___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../../../../../hongmeng/HBuilderX.4.56.2025031210/HBuilderX/plugins/uniapp-cli/node_modules/mini-css-extract-plugin/dist/loader.js??ref--8-oneOf-1-0!../../../../../../../hongmeng/HBuilderX.4.56.2025031210/HBuilderX/plugins/uniapp-cli/node_modules/css-loader/dist/cjs.js??ref--8-oneOf-1-1!../../../../../../../hongmeng/HBuilderX.4.56.2025031210/HBuilderX/plugins/uniapp-cli/node_modules/@dcloudio/vue-cli-plugin-uni/packages/vue-loader/lib/loaders/stylePostLoader.js!../../../../../../../hongmeng/HBuilderX.4.56.2025031210/HBuilderX/plugins/uniapp-cli/node_modules/@dcloudio/vue-cli-plugin-uni/packages/webpack-preprocess-loader??ref--8-oneOf-1-2!../../../../../../../hongmeng/HBuilderX.4.56.2025031210/HBuilderX/plugins/uniapp-cli/node_modules/postcss-loader/src??ref--8-oneOf-1-3!../../../../../../../hongmeng/HBuilderX.4.56.2025031210/HBuilderX/plugins/uniapp-cli/node_modules/@dcloudio/vue-cli-plugin-uni/packages/sass-loader/dist/cjs.js??ref--8-oneOf-1-4!../../../../../../../hongmeng/HBuilderX.4.56.2025031210/HBuilderX/plugins/uniapp-cli/node_modules/@dcloudio/vue-cli-plugin-uni/packages/webpack-preprocess-loader??ref--8-oneOf-1-5!../../../../../../../hongmeng/HBuilderX.4.56.2025031210/HBuilderX/plugins/uniapp-cli/node_modules/@dcloudio/vue-cli-plugin-uni/packages/vue-loader/lib??vue-loader-options!../../../../../../../hongmeng/HBuilderX.4.56.2025031210/HBuilderX/plugins/uniapp-cli/node_modules/@dcloudio/webpack-uni-mp-loader/lib/style.js!./playlist.vue?vue&type=style&index=0&lang=scss& */ 254);
/* harmony import */ var _hongmeng_HBuilderX_4_56_2025031210_HBuilderX_plugins_uniapp_cli_node_modules_mini_css_extract_plugin_dist_loader_js_ref_8_oneOf_1_0_hongmeng_HBuilderX_4_56_2025031210_HBuilderX_plugins_uniapp_cli_node_modules_css_loader_dist_cjs_js_ref_8_oneOf_1_1_hongmeng_HBuilderX_4_56_2025031210_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_loaders_stylePostLoader_js_hongmeng_HBuilderX_4_56_2025031210_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_8_oneOf_1_2_hongmeng_HBuilderX_4_56_2025031210_HBuilderX_plugins_uniapp_cli_node_modules_postcss_loader_src_index_js_ref_8_oneOf_1_3_hongmeng_HBuilderX_4_56_2025031210_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_sass_loader_dist_cjs_js_ref_8_oneOf_1_4_hongmeng_HBuilderX_4_56_2025031210_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_8_oneOf_1_5_hongmeng_HBuilderX_4_56_2025031210_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_index_js_vue_loader_options_hongmeng_HBuilderX_4_56_2025031210_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_style_js_playlist_vue_vue_type_style_index_0_lang_scss___WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_hongmeng_HBuilderX_4_56_2025031210_HBuilderX_plugins_uniapp_cli_node_modules_mini_css_extract_plugin_dist_loader_js_ref_8_oneOf_1_0_hongmeng_HBuilderX_4_56_2025031210_HBuilderX_plugins_uniapp_cli_node_modules_css_loader_dist_cjs_js_ref_8_oneOf_1_1_hongmeng_HBuilderX_4_56_2025031210_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_loaders_stylePostLoader_js_hongmeng_HBuilderX_4_56_2025031210_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_8_oneOf_1_2_hongmeng_HBuilderX_4_56_2025031210_HBuilderX_plugins_uniapp_cli_node_modules_postcss_loader_src_index_js_ref_8_oneOf_1_3_hongmeng_HBuilderX_4_56_2025031210_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_sass_loader_dist_cjs_js_ref_8_oneOf_1_4_hongmeng_HBuilderX_4_56_2025031210_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_8_oneOf_1_5_hongmeng_HBuilderX_4_56_2025031210_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_index_js_vue_loader_options_hongmeng_HBuilderX_4_56_2025031210_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_style_js_playlist_vue_vue_type_style_index_0_lang_scss___WEBPACK_IMPORTED_MODULE_0__);
/* harmony reexport (unknown) */ for(var __WEBPACK_IMPORT_KEY__ in _hongmeng_HBuilderX_4_56_2025031210_HBuilderX_plugins_uniapp_cli_node_modules_mini_css_extract_plugin_dist_loader_js_ref_8_oneOf_1_0_hongmeng_HBuilderX_4_56_2025031210_HBuilderX_plugins_uniapp_cli_node_modules_css_loader_dist_cjs_js_ref_8_oneOf_1_1_hongmeng_HBuilderX_4_56_2025031210_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_loaders_stylePostLoader_js_hongmeng_HBuilderX_4_56_2025031210_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_8_oneOf_1_2_hongmeng_HBuilderX_4_56_2025031210_HBuilderX_plugins_uniapp_cli_node_modules_postcss_loader_src_index_js_ref_8_oneOf_1_3_hongmeng_HBuilderX_4_56_2025031210_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_sass_loader_dist_cjs_js_ref_8_oneOf_1_4_hongmeng_HBuilderX_4_56_2025031210_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_8_oneOf_1_5_hongmeng_HBuilderX_4_56_2025031210_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_index_js_vue_loader_options_hongmeng_HBuilderX_4_56_2025031210_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_style_js_playlist_vue_vue_type_style_index_0_lang_scss___WEBPACK_IMPORTED_MODULE_0__) if(["default"].indexOf(__WEBPACK_IMPORT_KEY__) < 0) (function(key) { __webpack_require__.d(__webpack_exports__, key, function() { return _hongmeng_HBuilderX_4_56_2025031210_HBuilderX_plugins_uniapp_cli_node_modules_mini_css_extract_plugin_dist_loader_js_ref_8_oneOf_1_0_hongmeng_HBuilderX_4_56_2025031210_HBuilderX_plugins_uniapp_cli_node_modules_css_loader_dist_cjs_js_ref_8_oneOf_1_1_hongmeng_HBuilderX_4_56_2025031210_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_loaders_stylePostLoader_js_hongmeng_HBuilderX_4_56_2025031210_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_8_oneOf_1_2_hongmeng_HBuilderX_4_56_2025031210_HBuilderX_plugins_uniapp_cli_node_modules_postcss_loader_src_index_js_ref_8_oneOf_1_3_hongmeng_HBuilderX_4_56_2025031210_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_sass_loader_dist_cjs_js_ref_8_oneOf_1_4_hongmeng_HBuilderX_4_56_2025031210_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_8_oneOf_1_5_hongmeng_HBuilderX_4_56_2025031210_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_index_js_vue_loader_options_hongmeng_HBuilderX_4_56_2025031210_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_style_js_playlist_vue_vue_type_style_index_0_lang_scss___WEBPACK_IMPORTED_MODULE_0__[key]; }) }(__WEBPACK_IMPORT_KEY__));
 /* harmony default export */ __webpack_exports__["default"] = (_hongmeng_HBuilderX_4_56_2025031210_HBuilderX_plugins_uniapp_cli_node_modules_mini_css_extract_plugin_dist_loader_js_ref_8_oneOf_1_0_hongmeng_HBuilderX_4_56_2025031210_HBuilderX_plugins_uniapp_cli_node_modules_css_loader_dist_cjs_js_ref_8_oneOf_1_1_hongmeng_HBuilderX_4_56_2025031210_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_loaders_stylePostLoader_js_hongmeng_HBuilderX_4_56_2025031210_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_8_oneOf_1_2_hongmeng_HBuilderX_4_56_2025031210_HBuilderX_plugins_uniapp_cli_node_modules_postcss_loader_src_index_js_ref_8_oneOf_1_3_hongmeng_HBuilderX_4_56_2025031210_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_sass_loader_dist_cjs_js_ref_8_oneOf_1_4_hongmeng_HBuilderX_4_56_2025031210_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_8_oneOf_1_5_hongmeng_HBuilderX_4_56_2025031210_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_index_js_vue_loader_options_hongmeng_HBuilderX_4_56_2025031210_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_style_js_playlist_vue_vue_type_style_index_0_lang_scss___WEBPACK_IMPORTED_MODULE_0___default.a); 

/***/ }),

/***/ 254:
/*!*****************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/mini-css-extract-plugin/dist/loader.js??ref--8-oneOf-1-0!./node_modules/css-loader/dist/cjs.js??ref--8-oneOf-1-1!./node_modules/@dcloudio/vue-cli-plugin-uni/packages/vue-loader/lib/loaders/stylePostLoader.js!./node_modules/@dcloudio/vue-cli-plugin-uni/packages/webpack-preprocess-loader??ref--8-oneOf-1-2!./node_modules/postcss-loader/src??ref--8-oneOf-1-3!./node_modules/@dcloudio/vue-cli-plugin-uni/packages/sass-loader/dist/cjs.js??ref--8-oneOf-1-4!./node_modules/@dcloudio/vue-cli-plugin-uni/packages/webpack-preprocess-loader??ref--8-oneOf-1-5!./node_modules/@dcloudio/vue-cli-plugin-uni/packages/vue-loader/lib??vue-loader-options!./node_modules/@dcloudio/webpack-uni-mp-loader/lib/style.js!D:/BaiduNetdiskDownload/uni-app-music/music-app/frontend/music-app-frontend/pages/playlist/playlist.vue?vue&type=style&index=0&lang=scss& ***!
  \*****************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

// extracted by mini-css-extract-plugin
    if(false) { var cssReload; }
  

/***/ })

},[[247,"common/runtime","common/vendor"]]]);
//# sourceMappingURL=../../../.sourcemap/mp-weixin/pages/playlist/playlist.js.map