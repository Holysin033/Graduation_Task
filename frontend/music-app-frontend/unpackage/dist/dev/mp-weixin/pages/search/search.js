(global["webpackJsonp"] = global["webpackJsonp"] || []).push([["pages/search/search"],{

/***/ 230:
/*!******************************************************************************************************************************!*\
  !*** D:/BaiduNetdiskDownload/uni-app-music/music-app/frontend/music-app-frontend/main.js?{"page":"pages%2Fsearch%2Fsearch"} ***!
  \******************************************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(wx, createPage) {

var _interopRequireDefault = __webpack_require__(/*! @babel/runtime/helpers/interopRequireDefault */ 4);
__webpack_require__(/*! uni-pages */ 26);
var _vue = _interopRequireDefault(__webpack_require__(/*! vue */ 25));
var _search = _interopRequireDefault(__webpack_require__(/*! ./pages/search/search.vue */ 231));
// @ts-ignore
wx.__webpack_require_UNI_MP_PLUGIN__ = __webpack_require__;
createPage(_search.default);
/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(/*! ./node_modules/@dcloudio/uni-mp-weixin/dist/wx.js */ 1)["default"], __webpack_require__(/*! ./node_modules/@dcloudio/uni-mp-weixin/dist/index.js */ 2)["createPage"]))

/***/ }),

/***/ 231:
/*!***********************************************************************************************************!*\
  !*** D:/BaiduNetdiskDownload/uni-app-music/music-app/frontend/music-app-frontend/pages/search/search.vue ***!
  \***********************************************************************************************************/
/*! no static exports found */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _search_vue_vue_type_template_id_4cedc0c6___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./search.vue?vue&type=template&id=4cedc0c6& */ 232);
/* harmony import */ var _search_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./search.vue?vue&type=script&lang=js& */ 234);
/* harmony reexport (unknown) */ for(var __WEBPACK_IMPORT_KEY__ in _search_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_1__) if(["default"].indexOf(__WEBPACK_IMPORT_KEY__) < 0) (function(key) { __webpack_require__.d(__webpack_exports__, key, function() { return _search_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_1__[key]; }) }(__WEBPACK_IMPORT_KEY__));
/* harmony import */ var _search_vue_vue_type_style_index_0_lang_scss___WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./search.vue?vue&type=style&index=0&lang=scss& */ 237);
/* harmony import */ var _hongmeng_HBuilderX_4_56_2025031210_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_runtime_componentNormalizer_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../../../../../../../hongmeng/HBuilderX.4.56.2025031210/HBuilderX/plugins/uniapp-cli/node_modules/@dcloudio/vue-cli-plugin-uni/packages/vue-loader/lib/runtime/componentNormalizer.js */ 38);

var renderjs





/* normalize component */

var component = Object(_hongmeng_HBuilderX_4_56_2025031210_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_runtime_componentNormalizer_js__WEBPACK_IMPORTED_MODULE_3__["default"])(
  _search_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_1__["default"],
  _search_vue_vue_type_template_id_4cedc0c6___WEBPACK_IMPORTED_MODULE_0__["render"],
  _search_vue_vue_type_template_id_4cedc0c6___WEBPACK_IMPORTED_MODULE_0__["staticRenderFns"],
  false,
  null,
  null,
  null,
  false,
  _search_vue_vue_type_template_id_4cedc0c6___WEBPACK_IMPORTED_MODULE_0__["components"],
  renderjs
)

component.options.__file = "pages/search/search.vue"
/* harmony default export */ __webpack_exports__["default"] = (component.exports);

/***/ }),

/***/ 232:
/*!******************************************************************************************************************************************!*\
  !*** D:/BaiduNetdiskDownload/uni-app-music/music-app/frontend/music-app-frontend/pages/search/search.vue?vue&type=template&id=4cedc0c6& ***!
  \******************************************************************************************************************************************/
/*! exports provided: render, staticRenderFns, recyclableRender, components */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _hongmeng_HBuilderX_4_56_2025031210_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_hongmeng_HBuilderX_4_56_2025031210_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_17_0_hongmeng_HBuilderX_4_56_2025031210_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_template_js_hongmeng_HBuilderX_4_56_2025031210_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_uni_app_loader_page_meta_js_hongmeng_HBuilderX_4_56_2025031210_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_index_js_vue_loader_options_hongmeng_HBuilderX_4_56_2025031210_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_style_js_search_vue_vue_type_template_id_4cedc0c6___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../../../../../hongmeng/HBuilderX.4.56.2025031210/HBuilderX/plugins/uniapp-cli/node_modules/@dcloudio/vue-cli-plugin-uni/packages/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!../../../../../../../hongmeng/HBuilderX.4.56.2025031210/HBuilderX/plugins/uniapp-cli/node_modules/@dcloudio/vue-cli-plugin-uni/packages/webpack-preprocess-loader??ref--17-0!../../../../../../../hongmeng/HBuilderX.4.56.2025031210/HBuilderX/plugins/uniapp-cli/node_modules/@dcloudio/webpack-uni-mp-loader/lib/template.js!../../../../../../../hongmeng/HBuilderX.4.56.2025031210/HBuilderX/plugins/uniapp-cli/node_modules/@dcloudio/vue-cli-plugin-uni/packages/webpack-uni-app-loader/page-meta.js!../../../../../../../hongmeng/HBuilderX.4.56.2025031210/HBuilderX/plugins/uniapp-cli/node_modules/@dcloudio/vue-cli-plugin-uni/packages/vue-loader/lib??vue-loader-options!../../../../../../../hongmeng/HBuilderX.4.56.2025031210/HBuilderX/plugins/uniapp-cli/node_modules/@dcloudio/webpack-uni-mp-loader/lib/style.js!./search.vue?vue&type=template&id=4cedc0c6& */ 233);
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "render", function() { return _hongmeng_HBuilderX_4_56_2025031210_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_hongmeng_HBuilderX_4_56_2025031210_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_17_0_hongmeng_HBuilderX_4_56_2025031210_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_template_js_hongmeng_HBuilderX_4_56_2025031210_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_uni_app_loader_page_meta_js_hongmeng_HBuilderX_4_56_2025031210_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_index_js_vue_loader_options_hongmeng_HBuilderX_4_56_2025031210_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_style_js_search_vue_vue_type_template_id_4cedc0c6___WEBPACK_IMPORTED_MODULE_0__["render"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "staticRenderFns", function() { return _hongmeng_HBuilderX_4_56_2025031210_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_hongmeng_HBuilderX_4_56_2025031210_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_17_0_hongmeng_HBuilderX_4_56_2025031210_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_template_js_hongmeng_HBuilderX_4_56_2025031210_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_uni_app_loader_page_meta_js_hongmeng_HBuilderX_4_56_2025031210_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_index_js_vue_loader_options_hongmeng_HBuilderX_4_56_2025031210_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_style_js_search_vue_vue_type_template_id_4cedc0c6___WEBPACK_IMPORTED_MODULE_0__["staticRenderFns"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "recyclableRender", function() { return _hongmeng_HBuilderX_4_56_2025031210_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_hongmeng_HBuilderX_4_56_2025031210_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_17_0_hongmeng_HBuilderX_4_56_2025031210_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_template_js_hongmeng_HBuilderX_4_56_2025031210_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_uni_app_loader_page_meta_js_hongmeng_HBuilderX_4_56_2025031210_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_index_js_vue_loader_options_hongmeng_HBuilderX_4_56_2025031210_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_style_js_search_vue_vue_type_template_id_4cedc0c6___WEBPACK_IMPORTED_MODULE_0__["recyclableRender"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "components", function() { return _hongmeng_HBuilderX_4_56_2025031210_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_hongmeng_HBuilderX_4_56_2025031210_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_17_0_hongmeng_HBuilderX_4_56_2025031210_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_template_js_hongmeng_HBuilderX_4_56_2025031210_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_uni_app_loader_page_meta_js_hongmeng_HBuilderX_4_56_2025031210_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_index_js_vue_loader_options_hongmeng_HBuilderX_4_56_2025031210_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_style_js_search_vue_vue_type_template_id_4cedc0c6___WEBPACK_IMPORTED_MODULE_0__["components"]; });



/***/ }),

/***/ 233:
/*!******************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/@dcloudio/vue-cli-plugin-uni/packages/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!./node_modules/@dcloudio/vue-cli-plugin-uni/packages/webpack-preprocess-loader??ref--17-0!./node_modules/@dcloudio/webpack-uni-mp-loader/lib/template.js!./node_modules/@dcloudio/vue-cli-plugin-uni/packages/webpack-uni-app-loader/page-meta.js!./node_modules/@dcloudio/vue-cli-plugin-uni/packages/vue-loader/lib??vue-loader-options!./node_modules/@dcloudio/webpack-uni-mp-loader/lib/style.js!D:/BaiduNetdiskDownload/uni-app-music/music-app/frontend/music-app-frontend/pages/search/search.vue?vue&type=template&id=4cedc0c6& ***!
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
  var g0 = !_vm.searchText && _vm.searchHistory.length > 0
  var g1 = !_vm.searchText && _vm.hotSearch.length > 0
  var g2 =
    _vm.searchText && _vm.hasSearched && !_vm.noResults && _vm.currentTab === 0
      ? _vm.searchResults.songs.length
      : null
  var g3 =
    _vm.searchText && _vm.hasSearched && !_vm.noResults && _vm.currentTab === 1
      ? _vm.searchResults.artists.length
      : null
  var g4 =
    _vm.searchText && _vm.hasSearched && !_vm.noResults && _vm.currentTab === 2
      ? _vm.searchResults.albums.length
      : null
  var g5 =
    _vm.searchText && _vm.hasSearched && !_vm.noResults && _vm.currentTab === 3
      ? _vm.searchResults.lyrics.length
      : null
  _vm.$mp.data = Object.assign(
    {},
    {
      $root: {
        g0: g0,
        g1: g1,
        g2: g2,
        g3: g3,
        g4: g4,
        g5: g5,
      },
    }
  )
}
var recyclableRender = false
var staticRenderFns = []
render._withStripped = true



/***/ }),

/***/ 234:
/*!************************************************************************************************************************************!*\
  !*** D:/BaiduNetdiskDownload/uni-app-music/music-app/frontend/music-app-frontend/pages/search/search.vue?vue&type=script&lang=js& ***!
  \************************************************************************************************************************************/
/*! no static exports found */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _hongmeng_HBuilderX_4_56_2025031210_HBuilderX_plugins_uniapp_cli_node_modules_babel_loader_lib_index_js_hongmeng_HBuilderX_4_56_2025031210_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_13_1_hongmeng_HBuilderX_4_56_2025031210_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_script_js_hongmeng_HBuilderX_4_56_2025031210_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_index_js_vue_loader_options_hongmeng_HBuilderX_4_56_2025031210_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_style_js_search_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../../../../../hongmeng/HBuilderX.4.56.2025031210/HBuilderX/plugins/uniapp-cli/node_modules/babel-loader/lib!../../../../../../../hongmeng/HBuilderX.4.56.2025031210/HBuilderX/plugins/uniapp-cli/node_modules/@dcloudio/vue-cli-plugin-uni/packages/webpack-preprocess-loader??ref--13-1!../../../../../../../hongmeng/HBuilderX.4.56.2025031210/HBuilderX/plugins/uniapp-cli/node_modules/@dcloudio/webpack-uni-mp-loader/lib/script.js!../../../../../../../hongmeng/HBuilderX.4.56.2025031210/HBuilderX/plugins/uniapp-cli/node_modules/@dcloudio/vue-cli-plugin-uni/packages/vue-loader/lib??vue-loader-options!../../../../../../../hongmeng/HBuilderX.4.56.2025031210/HBuilderX/plugins/uniapp-cli/node_modules/@dcloudio/webpack-uni-mp-loader/lib/style.js!./search.vue?vue&type=script&lang=js& */ 235);
/* harmony import */ var _hongmeng_HBuilderX_4_56_2025031210_HBuilderX_plugins_uniapp_cli_node_modules_babel_loader_lib_index_js_hongmeng_HBuilderX_4_56_2025031210_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_13_1_hongmeng_HBuilderX_4_56_2025031210_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_script_js_hongmeng_HBuilderX_4_56_2025031210_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_index_js_vue_loader_options_hongmeng_HBuilderX_4_56_2025031210_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_style_js_search_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_hongmeng_HBuilderX_4_56_2025031210_HBuilderX_plugins_uniapp_cli_node_modules_babel_loader_lib_index_js_hongmeng_HBuilderX_4_56_2025031210_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_13_1_hongmeng_HBuilderX_4_56_2025031210_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_script_js_hongmeng_HBuilderX_4_56_2025031210_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_index_js_vue_loader_options_hongmeng_HBuilderX_4_56_2025031210_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_style_js_search_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__);
/* harmony reexport (unknown) */ for(var __WEBPACK_IMPORT_KEY__ in _hongmeng_HBuilderX_4_56_2025031210_HBuilderX_plugins_uniapp_cli_node_modules_babel_loader_lib_index_js_hongmeng_HBuilderX_4_56_2025031210_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_13_1_hongmeng_HBuilderX_4_56_2025031210_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_script_js_hongmeng_HBuilderX_4_56_2025031210_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_index_js_vue_loader_options_hongmeng_HBuilderX_4_56_2025031210_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_style_js_search_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__) if(["default"].indexOf(__WEBPACK_IMPORT_KEY__) < 0) (function(key) { __webpack_require__.d(__webpack_exports__, key, function() { return _hongmeng_HBuilderX_4_56_2025031210_HBuilderX_plugins_uniapp_cli_node_modules_babel_loader_lib_index_js_hongmeng_HBuilderX_4_56_2025031210_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_13_1_hongmeng_HBuilderX_4_56_2025031210_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_script_js_hongmeng_HBuilderX_4_56_2025031210_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_index_js_vue_loader_options_hongmeng_HBuilderX_4_56_2025031210_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_style_js_search_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__[key]; }) }(__WEBPACK_IMPORT_KEY__));
 /* harmony default export */ __webpack_exports__["default"] = (_hongmeng_HBuilderX_4_56_2025031210_HBuilderX_plugins_uniapp_cli_node_modules_babel_loader_lib_index_js_hongmeng_HBuilderX_4_56_2025031210_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_13_1_hongmeng_HBuilderX_4_56_2025031210_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_script_js_hongmeng_HBuilderX_4_56_2025031210_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_index_js_vue_loader_options_hongmeng_HBuilderX_4_56_2025031210_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_style_js_search_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0___default.a); 

/***/ }),

/***/ 235:
/*!*******************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/babel-loader/lib!./node_modules/@dcloudio/vue-cli-plugin-uni/packages/webpack-preprocess-loader??ref--13-1!./node_modules/@dcloudio/webpack-uni-mp-loader/lib/script.js!./node_modules/@dcloudio/vue-cli-plugin-uni/packages/vue-loader/lib??vue-loader-options!./node_modules/@dcloudio/webpack-uni-mp-loader/lib/style.js!D:/BaiduNetdiskDownload/uni-app-music/music-app/frontend/music-app-frontend/pages/search/search.vue?vue&type=script&lang=js& ***!
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
var _toConsumableArray2 = _interopRequireDefault(__webpack_require__(/*! @babel/runtime/helpers/toConsumableArray */ 18));
var _asyncToGenerator2 = _interopRequireDefault(__webpack_require__(/*! @babel/runtime/helpers/asyncToGenerator */ 32));
var _musicData = __webpack_require__(/*! @/utils/musicData.js */ 170);
var _apiConfig = _interopRequireDefault(__webpack_require__(/*! @/utils/apiConfig.js */ 35));
var _request = _interopRequireDefault(__webpack_require__(/*! @/utils/request.js */ 173));
function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); enumerableOnly && (symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; })), keys.push.apply(keys, symbols); } return keys; }
function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = null != arguments[i] ? arguments[i] : {}; i % 2 ? ownKeys(Object(source), !0).forEach(function (key) { (0, _defineProperty2.default)(target, key, source[key]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)) : ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } return target; }
var _default = {
  data: function data() {
    return {
      searchText: '',
      searchHistory: [],
      hotSearch: ['周杰伦', '林俊杰', '薛之谦', '陈奕迅', '起风了', '热爱105°C的你'],
      hasSearched: false,
      isSearching: false,
      searchResults: {
        songs: [],
        artists: [],
        albums: [],
        lyrics: []
      },
      currentTab: 0,
      tabs: [{
        name: '单曲',
        count: 0
      }, {
        name: '歌手',
        count: 0
      }, {
        name: '专辑',
        count: 0
      }, {
        name: '歌词',
        count: 0
      }],
      // 分页加载相关
      pageSize: 20,
      // 每页数量
      pageOffset: {
        songs: 0,
        artists: 0,
        albums: 0,
        lyrics: 0
      },
      hasMore: {
        songs: false,
        artists: false,
        albums: false,
        lyrics: false
      },
      isLoadingMore: {
        songs: false,
        artists: false,
        albums: false,
        lyrics: false
      },
      totalCount: {
        songs: 0,
        artists: 0,
        albums: 0,
        lyrics: 0
      },
      fromPlaylist: false,
      playlistId: '',
      addingToPlaylist: false
    };
  },
  computed: {
    noResults: function noResults() {
      return this.hasSearched && this.searchResults.songs.length === 0 && this.searchResults.artists.length === 0 && this.searchResults.albums.length === 0 && this.searchResults.lyrics.length === 0;
    }
  },
  onLoad: function onLoad(options) {
    var _this = this;
    // 检查是否为游客模式
    if ((0, _musicData.isInGuestMode)()) {
      // 显示提示
      (0, _musicData.showGuestModeLimit)('搜索音乐');
      // 返回上一页
      setTimeout(function () {
        uni.navigateBack();
      }, 1500);
      return;
    }

    // 加载搜索历史
    this.loadSearchHistory();

    // 检查是否从播放列表页面跳转过来
    if (options.from === 'playlist' && options.playlistId) {
      this.fromPlaylist = true;
      this.playlistId = options.playlistId;
      console.log('从播放列表页面跳转过来，播放列表ID：', this.playlistId);
    } else {
      this.fromPlaylist = false;
      this.playlistId = '';
    }

    // 设置焦点
    this.$nextTick(function () {
      // 自动聚焦搜索框，延迟执行确保组件已加载
      setTimeout(function () {
        var inputEl = uni.createSelectorQuery().in(_this).select('#searchInput');
        if (inputEl) {
          inputEl.boundingClientRect(function (data) {
            if (data) {
              uni.showKeyboard();
            }
          }).exec();
        }
      }, 300);
    });
  },
  methods: {
    // 加载搜索历史
    loadSearchHistory: function loadSearchHistory() {
      try {
        var history = uni.getStorageSync('searchHistory');
        if (history) {
          this.searchHistory = JSON.parse(history);
        }
      } catch (error) {
        console.error('加载搜索历史失败：', error);
      }
    },
    // 保存搜索历史
    saveSearchHistory: function saveSearchHistory(keyword) {
      try {
        // 如果已存在，先移除
        var index = this.searchHistory.indexOf(keyword);
        if (index > -1) {
          this.searchHistory.splice(index, 1);
        }

        // 添加到开头
        this.searchHistory.unshift(keyword);

        // 只保留10条历史记录
        if (this.searchHistory.length > 10) {
          this.searchHistory = this.searchHistory.slice(0, 10);
        }

        // 保存到本地存储
        uni.setStorageSync('searchHistory', JSON.stringify(this.searchHistory));
      } catch (error) {
        console.error('保存搜索历史失败：', error);
      }
    },
    // 清空搜索历史
    clearHistory: function clearHistory() {
      var _this2 = this;
      uni.showModal({
        title: '提示',
        content: '确定要清空搜索历史吗？',
        success: function success(res) {
          if (res.confirm) {
            _this2.searchHistory = [];
            uni.setStorageSync('searchHistory', JSON.stringify([]));
          }
        }
      });
    },
    // 使用历史记录项
    useHistoryItem: function useHistoryItem(keyword) {
      this.searchText = keyword;
      this.handleSearch();
    },
    // 清空搜索框
    clearSearch: function clearSearch() {
      this.searchText = '';
      this.hasSearched = false;
    },
    // 处理输入事件
    handleInput: function handleInput(e) {
      // 可以在这里实现输入建议
      console.log('输入：', this.searchText);
    },
    // 处理搜索事件
    handleSearch: function handleSearch() {
      var _this3 = this;
      return (0, _asyncToGenerator2.default)( /*#__PURE__*/_regenerator.default.mark(function _callee() {
        return _regenerator.default.wrap(function _callee$(_context) {
          while (1) {
            switch (_context.prev = _context.next) {
              case 0:
                if (_this3.searchText.trim()) {
                  _context.next = 2;
                  break;
                }
                return _context.abrupt("return");
              case 2:
                if (!(0, _musicData.isInGuestMode)()) {
                  _context.next = 5;
                  break;
                }
                (0, _musicData.showGuestModeLimit)('搜索音乐');
                return _context.abrupt("return");
              case 5:
                // 显示加载提示
                uni.showLoading({
                  title: '搜索中...'
                });
                _this3.isSearching = true;
                _this3.hasSearched = true;

                // 重置分页和结果
                _this3.resetSearchState();
                _context.prev = 9;
                // 将搜索关键词保存到历史记录
                _this3.saveSearchHistory(_this3.searchText.trim());
                console.log('开始搜索：', _this3.searchText.trim());

                // 并行加载各类型结果的第一页
                _context.next = 14;
                return Promise.all([_this3.searchByType(1),
                // 单曲
                _this3.searchByType(100),
                // 歌手
                _this3.searchByType(10),
                // 专辑
                _this3.searchByType(1006) // 歌词
                ]);
              case 14:
                // 自动切换到有结果的标签页
                _this3.autoSwitchToTabWithResults();
                _context.next = 21;
                break;
              case 17:
                _context.prev = 17;
                _context.t0 = _context["catch"](9);
                console.error('搜索失败：', _context.t0);
                uni.showToast({
                  title: '搜索失败，请重试',
                  icon: 'none'
                });
              case 21:
                _context.prev = 21;
                // 隐藏加载提示
                uni.hideLoading();
                _this3.isSearching = false;
                return _context.finish(21);
              case 25:
              case "end":
                return _context.stop();
            }
          }
        }, _callee, null, [[9, 17, 21, 25]]);
      }))();
    },
    // 重置搜索状态
    resetSearchState: function resetSearchState() {
      this.searchResults = {
        songs: [],
        artists: [],
        albums: [],
        lyrics: []
      };
      this.pageOffset = {
        songs: 0,
        artists: 0,
        albums: 0,
        lyrics: 0
      };
      this.hasMore = {
        songs: false,
        artists: false,
        albums: false,
        lyrics: false
      };
      this.isLoadingMore = {
        songs: false,
        artists: false,
        albums: false,
        lyrics: false
      };
      this.totalCount = {
        songs: 0,
        artists: 0,
        albums: 0,
        lyrics: 0
      };

      // 重置标签数量
      this.tabs.forEach(function (tab) {
        return tab.count = 0;
      });
    },
    // 根据类型搜索
    searchByType: function searchByType(type) {
      var _this4 = this;
      return (0, _asyncToGenerator2.default)( /*#__PURE__*/_regenerator.default.mark(function _callee2() {
        var resultKey, offset, results, items, total, tabIndex;
        return _regenerator.default.wrap(function _callee2$(_context2) {
          while (1) {
            switch (_context2.prev = _context2.next) {
              case 0:
                _context2.prev = 0;
                // 确定搜索类型对应的结果类别
                resultKey = _this4.getResultKeyByType(type);
                if (resultKey) {
                  _context2.next = 4;
                  break;
                }
                return _context2.abrupt("return");
              case 4:
                // 获取当前类型的偏移量
                offset = _this4.pageOffset[resultKey]; // 执行搜索
                _context2.next = 7;
                return (0, _musicData.searchMusic)(_this4.searchText.trim(), {
                  type: type,
                  limit: _this4.pageSize,
                  offset: offset
                });
              case 7:
                results = _context2.sent;
                if (results) {
                  _context2.next = 11;
                  break;
                }
                console.error("\u641C\u7D22\u7C7B\u578B".concat(type, "\u8FD4\u56DE\u7ED3\u679C\u4E3A\u7A7A"));
                return _context2.abrupt("return");
              case 11:
                console.log("\u641C\u7D22\u7C7B\u578B".concat(type, "\u8FD4\u56DE\u7ED3\u679C:"), results);

                // 针对不同类型的结果进行处理
                items = [];
                total = 0; // 检查是否返回的是新API格式的结果
                if (!(results[resultKey] && Array.isArray(results[resultKey]))) {
                  _context2.next = 19;
                  break;
                }
                // 新API格式，直接使用返回的结果
                items = results[resultKey];
                total = results.totalCount ? results.totalCount[resultKey] || 0 : 0;
                _context2.next = 30;
                break;
              case 19:
                _context2.t0 = type;
                _context2.next = _context2.t0 === 1 ? 22 : _context2.t0 === 100 ? 24 : _context2.t0 === 10 ? 26 : _context2.t0 === 1006 ? 28 : 30;
                break;
              case 22:
                // 歌曲
                if (results.result && results.result.songs) {
                  items = results.result.songs.map(function (song) {
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
                  total = results.result.songCount || 0;
                }
                return _context2.abrupt("break", 30);
              case 24:
                // 歌手
                if (results.result && results.result.artists) {
                  items = results.result.artists.map(function (artist) {
                    return {
                      id: artist.id,
                      name: artist.name,
                      avatar: artist.picUrl || '/static/music-cover.png'
                    };
                  });
                  total = results.result.artistCount || 0;
                }
                return _context2.abrupt("break", 30);
              case 26:
                // 专辑
                if (results.result && results.result.albums) {
                  items = results.result.albums.map(function (album) {
                    return {
                      id: album.id,
                      name: album.name,
                      artist: album.artist ? album.artist.name : '未知歌手',
                      cover: album.picUrl || '/static/music-cover.png'
                    };
                  });
                  total = results.result.albumCount || 0;
                }
                return _context2.abrupt("break", 30);
              case 28:
                // 歌词
                if (results.result && results.result.songs) {
                  items = results.result.songs.map(function (song) {
                    return {
                      id: song.id,
                      name: song.name,
                      artist: song.artists ? song.artists.map(function (a) {
                        return a.name;
                      }).join('/') : '未知歌手',
                      lyrics: song.lyrics || song.snippet || '暂无歌词',
                      album: song.album ? song.album.name : '未知专辑',
                      cover: song.album && song.album.picUrl ? song.album.picUrl : '/static/music-cover.png'
                    };
                  });
                  total = results.result.songCount || 0;
                }
                return _context2.abrupt("break", 30);
              case 30:
                // 更新对应类型的结果
                if (offset === 0) {
                  // 第一页，直接替换
                  _this4.searchResults[resultKey] = items;
                } else {
                  // 后续页，追加结果
                  _this4.searchResults[resultKey] = [].concat((0, _toConsumableArray2.default)(_this4.searchResults[resultKey]), (0, _toConsumableArray2.default)(items));
                }

                // 更新计数和分页状态
                _this4.totalCount[resultKey] = total;

                // 更新标签页显示的计数
                tabIndex = _this4.getTabIndexByResultKey(resultKey);
                if (tabIndex >= 0) {
                  _this4.tabs[tabIndex].count = _this4.totalCount[resultKey];
                }

                // 判断是否还有更多结果
                _this4.hasMore[resultKey] = _this4.searchResults[resultKey].length < _this4.totalCount[resultKey];

                // 更新偏移量
                _this4.pageOffset[resultKey] = _this4.searchResults[resultKey].length;
                console.log("[".concat(resultKey, "] \u5DF2\u52A0\u8F7D: ").concat(_this4.searchResults[resultKey].length, ", \u603B\u6570: ").concat(_this4.totalCount[resultKey], ", \u8FD8\u6709\u66F4\u591A: ").concat(_this4.hasMore[resultKey]));
                _context2.next = 42;
                break;
              case 39:
                _context2.prev = 39;
                _context2.t1 = _context2["catch"](0);
                console.error("\u641C\u7D22".concat(type, "\u7C7B\u578B\u5931\u8D25:"), _context2.t1);
              case 42:
              case "end":
                return _context2.stop();
            }
          }
        }, _callee2, null, [[0, 39]]);
      }))();
    },
    // 根据搜索类型获取结果键名
    getResultKeyByType: function getResultKeyByType(type) {
      switch (type) {
        case 1:
          return 'songs';
        case 100:
          return 'artists';
        case 10:
          return 'albums';
        case 1006:
          return 'lyrics';
        default:
          return null;
      }
    },
    // 根据结果键名获取标签页索引
    getTabIndexByResultKey: function getTabIndexByResultKey(resultKey) {
      switch (resultKey) {
        case 'songs':
          return 0;
        case 'artists':
          return 1;
        case 'albums':
          return 2;
        case 'lyrics':
          return 3;
        default:
          return -1;
      }
    },
    // 自动切换到有结果的标签页
    autoSwitchToTabWithResults: function autoSwitchToTabWithResults() {
      // 优先保持当前标签页，如果当前标签页有结果
      var currentKey = ['songs', 'artists', 'albums', 'lyrics'][this.currentTab];
      if (this.searchResults[currentKey] && this.searchResults[currentKey].length > 0) {
        return;
      }

      // 否则切换到第一个有结果的标签页
      if (this.searchResults.songs.length > 0) {
        this.currentTab = 0;
      } else if (this.searchResults.artists.length > 0) {
        this.currentTab = 1;
      } else if (this.searchResults.albums.length > 0) {
        this.currentTab = 2;
      } else if (this.searchResults.lyrics.length > 0) {
        this.currentTab = 3;
      }
    },
    // 加载更多歌曲
    loadMoreSongs: function loadMoreSongs() {
      var _this5 = this;
      return (0, _asyncToGenerator2.default)( /*#__PURE__*/_regenerator.default.mark(function _callee3() {
        return _regenerator.default.wrap(function _callee3$(_context3) {
          while (1) {
            switch (_context3.prev = _context3.next) {
              case 0:
                if (!(0, _musicData.isInGuestMode)()) {
                  _context3.next = 3;
                  break;
                }
                (0, _musicData.showGuestModeLimit)('搜索更多内容');
                return _context3.abrupt("return");
              case 3:
                if (!(!_this5.hasMore.songs || _this5.isLoadingMore.songs)) {
                  _context3.next = 5;
                  break;
                }
                return _context3.abrupt("return");
              case 5:
                console.log('加载更多歌曲');
                _this5.isLoadingMore.songs = true;
                _context3.prev = 7;
                _context3.next = 10;
                return _this5.searchByType(1);
              case 10:
                _context3.prev = 10;
                _this5.isLoadingMore.songs = false;
                return _context3.finish(10);
              case 13:
              case "end":
                return _context3.stop();
            }
          }
        }, _callee3, null, [[7,, 10, 13]]);
      }))();
    },
    // 加载更多歌手
    loadMoreArtists: function loadMoreArtists() {
      var _this6 = this;
      return (0, _asyncToGenerator2.default)( /*#__PURE__*/_regenerator.default.mark(function _callee4() {
        return _regenerator.default.wrap(function _callee4$(_context4) {
          while (1) {
            switch (_context4.prev = _context4.next) {
              case 0:
                if (!(0, _musicData.isInGuestMode)()) {
                  _context4.next = 3;
                  break;
                }
                (0, _musicData.showGuestModeLimit)('搜索更多内容');
                return _context4.abrupt("return");
              case 3:
                if (!(!_this6.hasMore.artists || _this6.isLoadingMore.artists)) {
                  _context4.next = 5;
                  break;
                }
                return _context4.abrupt("return");
              case 5:
                console.log('加载更多歌手');
                _this6.isLoadingMore.artists = true;
                _context4.prev = 7;
                _context4.next = 10;
                return _this6.searchByType(100);
              case 10:
                _context4.prev = 10;
                _this6.isLoadingMore.artists = false;
                return _context4.finish(10);
              case 13:
              case "end":
                return _context4.stop();
            }
          }
        }, _callee4, null, [[7,, 10, 13]]);
      }))();
    },
    // 加载更多专辑
    loadMoreAlbums: function loadMoreAlbums() {
      var _this7 = this;
      return (0, _asyncToGenerator2.default)( /*#__PURE__*/_regenerator.default.mark(function _callee5() {
        return _regenerator.default.wrap(function _callee5$(_context5) {
          while (1) {
            switch (_context5.prev = _context5.next) {
              case 0:
                if (!(0, _musicData.isInGuestMode)()) {
                  _context5.next = 3;
                  break;
                }
                (0, _musicData.showGuestModeLimit)('搜索更多内容');
                return _context5.abrupt("return");
              case 3:
                if (!(!_this7.hasMore.albums || _this7.isLoadingMore.albums)) {
                  _context5.next = 5;
                  break;
                }
                return _context5.abrupt("return");
              case 5:
                console.log('加载更多专辑');
                _this7.isLoadingMore.albums = true;
                _context5.prev = 7;
                _context5.next = 10;
                return _this7.searchByType(10);
              case 10:
                _context5.prev = 10;
                _this7.isLoadingMore.albums = false;
                return _context5.finish(10);
              case 13:
              case "end":
                return _context5.stop();
            }
          }
        }, _callee5, null, [[7,, 10, 13]]);
      }))();
    },
    // 加载更多歌词
    loadMoreLyrics: function loadMoreLyrics() {
      var _this8 = this;
      return (0, _asyncToGenerator2.default)( /*#__PURE__*/_regenerator.default.mark(function _callee6() {
        return _regenerator.default.wrap(function _callee6$(_context6) {
          while (1) {
            switch (_context6.prev = _context6.next) {
              case 0:
                if (!(0, _musicData.isInGuestMode)()) {
                  _context6.next = 3;
                  break;
                }
                (0, _musicData.showGuestModeLimit)('搜索更多内容');
                return _context6.abrupt("return");
              case 3:
                if (!(!_this8.hasMore.lyrics || _this8.isLoadingMore.lyrics)) {
                  _context6.next = 5;
                  break;
                }
                return _context6.abrupt("return");
              case 5:
                console.log('加载更多歌词');
                _this8.isLoadingMore.lyrics = true;
                _context6.prev = 7;
                _context6.next = 10;
                return _this8.searchByType(1006);
              case 10:
                _context6.prev = 10;
                _this8.isLoadingMore.lyrics = false;
                return _context6.finish(10);
              case 13:
              case "end":
                return _context6.stop();
            }
          }
        }, _callee6, null, [[7,, 10, 13]]);
      }))();
    },
    // 切换标签页
    switchTab: function switchTab(index) {
      this.currentTab = index;
    },
    // 返回
    goBack: function goBack() {
      uni.navigateBack();
    },
    // 播放歌曲
    playSong: function playSong(song) {
      var _this9 = this;
      return (0, _asyncToGenerator2.default)( /*#__PURE__*/_regenerator.default.mark(function _callee7() {
        var fullSongInfo, songDetail, url, playSong, playList, playListStr, index, currentIndex;
        return _regenerator.default.wrap(function _callee7$(_context7) {
          while (1) {
            switch (_context7.prev = _context7.next) {
              case 0:
                if (!(0, _musicData.isInGuestMode)()) {
                  _context7.next = 3;
                  break;
                }
                (0, _musicData.showGuestModeLimit)('播放歌曲');
                return _context7.abrupt("return");
              case 3:
                _context7.prev = 3;
                // 显示加载提示
                uni.showLoading({
                  title: '加载中...'
                });

                // 构建完整的歌曲信息
                fullSongInfo = song; // 如果是从歌词搜索结果播放的，可能需要补充一些字段
                if (!(_this9.currentTab === 3 && !song.duration)) {
                  _context7.next = 17;
                  break;
                }
                _context7.prev = 7;
                _context7.next = 10;
                return (0, _musicData.getMusicById)(song.id);
              case 10:
                songDetail = _context7.sent;
                if (songDetail) {
                  fullSongInfo = _objectSpread(_objectSpread({}, song), {}, {
                    duration: songDetail.duration || 0,
                    // 补充其他可能缺失的字段
                    artist: songDetail.artist || song.artist,
                    album: songDetail.album || song.album,
                    cover: songDetail.cover || song.cover || '/static/music-cover.png'
                  });
                }
                _context7.next = 17;
                break;
              case 14:
                _context7.prev = 14;
                _context7.t0 = _context7["catch"](7);
                console.warn('获取完整歌曲信息失败，使用现有信息', _context7.t0);
              case 17:
                _context7.next = 19;
                return (0, _musicData.getMusicUrl)(fullSongInfo.id);
              case 19:
                url = _context7.sent;
                if (url) {
                  _context7.next = 22;
                  break;
                }
                throw new Error('获取歌曲URL失败');
              case 22:
                // 更新歌曲对象
                playSong = _objectSpread(_objectSpread({}, fullSongInfo), {}, {
                  url: url
                }); // 获取当前播放列表
                playList = [];
                try {
                  playListStr = uni.getStorageSync('playList');
                  if (playListStr) {
                    playList = JSON.parse(playListStr);
                    if (!Array.isArray(playList)) {
                      console.warn('播放列表不是数组，重置为空数组');
                      playList = [];
                    }
                  }
                } catch (e) {
                  console.error('解析播放列表失败：', e);
                  playList = [];
                }

                // 检查歌曲是否已在播放列表中
                index = playList.findIndex(function (item) {
                  return item.id === fullSongInfo.id;
                });
                currentIndex = index;
                if (index === -1) {
                  // 如果不在列表中，添加到列表
                  playList.push(playSong);
                  currentIndex = playList.length - 1;
                } else {
                  // 如果在列表中，更新信息
                  playList[index] = _objectSpread(_objectSpread({}, playList[index]), playSong);
                }

                // 存储当前播放歌曲信息
                uni.setStorageSync('currentSong', JSON.stringify(playSong));
                // 存储播放列表
                uni.setStorageSync('playList', JSON.stringify(playList));
                // 存储当前播放索引
                uni.setStorageSync('currentIndex', currentIndex);
                // 存储自动播放标志
                uni.setStorageSync('autoPlay', 'true');

                // 跳转到播放器页面
                uni.switchTab({
                  url: '/pages/player/player'
                });
                _context7.next = 39;
                break;
              case 35:
                _context7.prev = 35;
                _context7.t1 = _context7["catch"](3);
                console.error('播放失败：', _context7.t1);
                uni.showToast({
                  title: _context7.t1.message || '播放失败，请重试',
                  icon: 'none'
                });
              case 39:
                _context7.prev = 39;
                uni.hideLoading();
                return _context7.finish(39);
              case 42:
              case "end":
                return _context7.stop();
            }
          }
        }, _callee7, null, [[3, 35, 39, 42], [7, 14]]);
      }))();
    },
    // 查看歌手详情
    viewArtist: function viewArtist(artist) {
      uni.navigateTo({
        url: "/pages/artist/artist?id=".concat(artist.id, "&name=").concat(encodeURIComponent(artist.name))
      });
    },
    // 查看专辑详情
    viewAlbum: function viewAlbum(album) {
      uni.navigateTo({
        url: "/pages/album/album?id=".concat(album.id, "&name=").concat(encodeURIComponent(album.name))
      });
    },
    // 处理歌曲点击
    handleSongTap: function handleSongTap(song) {
      if (this.fromPlaylist) {
        this.addSongToPlaylist(song);
      } else {
        this.playSong(song);
      }
    },
    // 测试添加歌曲到播放列表
    testAddSong: function testAddSong(song, event) {
      console.log("测试添加歌曲到播放列表，歌曲信息:", song);
      console.log("测试添加歌曲到播放列表，事件对象:", event);
      console.log("fromPlaylist状态:", this.fromPlaylist);
      console.log("playlistId:", this.playlistId);
      uni.showToast({
        title: '测试点击添加歌曲',
        icon: 'none'
      });
    },
    // 添加歌曲到播放列表
    addSongToPlaylist: function addSongToPlaylist(song) {
      var _this10 = this;
      return (0, _asyncToGenerator2.default)( /*#__PURE__*/_regenerator.default.mark(function _callee8() {
        var _require, addSongsToPlaylist, userId, songData, baseUrl, endpoint, url, requestData, localSuccess, response, songInList;
        return _regenerator.default.wrap(function _callee8$(_context8) {
          while (1) {
            switch (_context8.prev = _context8.next) {
              case 0:
                if (!_this10.addingToPlaylist) {
                  _context8.next = 2;
                  break;
                }
                return _context8.abrupt("return");
              case 2:
                console.log("准备添加歌曲到歌单，歌曲信息:", song);
                console.log("当前歌单ID:", _this10.playlistId);
                if (_this10.playlistId) {
                  _context8.next = 7;
                  break;
                }
                uni.showToast({
                  title: '歌单ID无效',
                  icon: 'none'
                });
                return _context8.abrupt("return");
              case 7:
                // 设置当前歌曲的添加中状态
                _this10.$set(song, 'isAdding', true);

                // 显示加载提示
                uni.showLoading({
                  title: '添加中...'
                });
                _this10.addingToPlaylist = true;
                _context8.prev = 10;
                // 导入播放列表缓存工具
                _require = __webpack_require__(/*! @/utils/playlistCache.js */ 236), addSongsToPlaylist = _require.addSongsToPlaylist;
                userId = uni.getStorageSync('userId') || ''; // 确保所有必要的字段都存在
                songData = {
                  id: song.id,
                  name: song.name || '未知歌曲',
                  artist: song.artist || '未知歌手',
                  album: song.album || '未知专辑',
                  duration: song.duration || 0,
                  cover: song.cover || '/static/music-cover.png',
                  // 确保设置URL
                  url: song.url || "https://music.163.com/song/media/outer/url?id=".concat(song.id, ".mp3")
                };
                console.log('处理后的歌曲数据:', songData);

                // 构建请求URL和数据
                baseUrl = _apiConfig.default.playlist.baseUrl;
                endpoint = _apiConfig.default.playlist.addSong(_this10.playlistId);
                url = "".concat(baseUrl).concat(endpoint); // 包装成后端期望的格式
                requestData = {
                  songs: [songData]
                }; // 先更新本地缓存
                localSuccess = addSongsToPlaylist(_this10.playlistId, songData, userId);
                if (localSuccess) {
                  console.log('成功更新本地播放列表缓存');
                }

                // 然后同步到服务器
                console.log("添加歌曲数据:", JSON.stringify(requestData));
                _context8.next = 24;
                return (0, _request.default)(url, 'POST', requestData);
              case 24:
                response = _context8.sent;
                console.log("添加歌曲响应:", response);
                if (!(response.code === 200)) {
                  _context8.next = 33;
                  break;
                }
                uni.hideLoading();
                uni.showToast({
                  title: '已添加到歌单',
                  icon: 'success'
                });

                // 从搜索结果中移除已添加的歌曲
                _this10.searchResults.songs = _this10.searchResults.songs.filter(function (s) {
                  return s.id !== song.id;
                });

                // 延迟后返回播放列表页
                setTimeout(function () {
                  uni.navigateBack();
                }, 1500);
                _context8.next = 41;
                break;
              case 33:
                if (!localSuccess) {
                  _context8.next = 40;
                  break;
                }
                uni.hideLoading();
                uni.showToast({
                  title: '已添加到本地歌单',
                  icon: 'success'
                });

                // 从搜索结果中移除已添加的歌曲
                _this10.searchResults.songs = _this10.searchResults.songs.filter(function (s) {
                  return s.id !== song.id;
                });

                // 延迟后返回播放列表页
                setTimeout(function () {
                  uni.navigateBack();
                }, 1500);
                _context8.next = 41;
                break;
              case 40:
                throw new Error(response.message || '添加歌曲失败');
              case 41:
                _context8.next = 48;
                break;
              case 43:
                _context8.prev = 43;
                _context8.t0 = _context8["catch"](10);
                console.error('添加歌曲失败:', _context8.t0);
                uni.hideLoading();
                uni.showToast({
                  title: _context8.t0.message || '添加歌曲失败',
                  icon: 'none'
                });
              case 48:
                _context8.prev = 48;
                _this10.addingToPlaylist = false;
                // 如果还在结果列表中，取消添加中状态
                songInList = _this10.searchResults.songs.find(function (s) {
                  return s.id === song.id;
                });
                if (songInList) {
                  _this10.$set(songInList, 'isAdding', false);
                }
                return _context8.finish(48);
              case 53:
              case "end":
                return _context8.stop();
            }
          }
        }, _callee8, null, [[10, 43, 48, 53]]);
      }))();
    }
  }
};
exports.default = _default;
/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(/*! ./node_modules/@dcloudio/uni-mp-weixin/dist/index.js */ 2)["default"]))

/***/ }),

/***/ 237:
/*!*********************************************************************************************************************************************!*\
  !*** D:/BaiduNetdiskDownload/uni-app-music/music-app/frontend/music-app-frontend/pages/search/search.vue?vue&type=style&index=0&lang=scss& ***!
  \*********************************************************************************************************************************************/
/*! no static exports found */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _hongmeng_HBuilderX_4_56_2025031210_HBuilderX_plugins_uniapp_cli_node_modules_mini_css_extract_plugin_dist_loader_js_ref_8_oneOf_1_0_hongmeng_HBuilderX_4_56_2025031210_HBuilderX_plugins_uniapp_cli_node_modules_css_loader_dist_cjs_js_ref_8_oneOf_1_1_hongmeng_HBuilderX_4_56_2025031210_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_loaders_stylePostLoader_js_hongmeng_HBuilderX_4_56_2025031210_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_8_oneOf_1_2_hongmeng_HBuilderX_4_56_2025031210_HBuilderX_plugins_uniapp_cli_node_modules_postcss_loader_src_index_js_ref_8_oneOf_1_3_hongmeng_HBuilderX_4_56_2025031210_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_sass_loader_dist_cjs_js_ref_8_oneOf_1_4_hongmeng_HBuilderX_4_56_2025031210_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_8_oneOf_1_5_hongmeng_HBuilderX_4_56_2025031210_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_index_js_vue_loader_options_hongmeng_HBuilderX_4_56_2025031210_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_style_js_search_vue_vue_type_style_index_0_lang_scss___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../../../../../hongmeng/HBuilderX.4.56.2025031210/HBuilderX/plugins/uniapp-cli/node_modules/mini-css-extract-plugin/dist/loader.js??ref--8-oneOf-1-0!../../../../../../../hongmeng/HBuilderX.4.56.2025031210/HBuilderX/plugins/uniapp-cli/node_modules/css-loader/dist/cjs.js??ref--8-oneOf-1-1!../../../../../../../hongmeng/HBuilderX.4.56.2025031210/HBuilderX/plugins/uniapp-cli/node_modules/@dcloudio/vue-cli-plugin-uni/packages/vue-loader/lib/loaders/stylePostLoader.js!../../../../../../../hongmeng/HBuilderX.4.56.2025031210/HBuilderX/plugins/uniapp-cli/node_modules/@dcloudio/vue-cli-plugin-uni/packages/webpack-preprocess-loader??ref--8-oneOf-1-2!../../../../../../../hongmeng/HBuilderX.4.56.2025031210/HBuilderX/plugins/uniapp-cli/node_modules/postcss-loader/src??ref--8-oneOf-1-3!../../../../../../../hongmeng/HBuilderX.4.56.2025031210/HBuilderX/plugins/uniapp-cli/node_modules/@dcloudio/vue-cli-plugin-uni/packages/sass-loader/dist/cjs.js??ref--8-oneOf-1-4!../../../../../../../hongmeng/HBuilderX.4.56.2025031210/HBuilderX/plugins/uniapp-cli/node_modules/@dcloudio/vue-cli-plugin-uni/packages/webpack-preprocess-loader??ref--8-oneOf-1-5!../../../../../../../hongmeng/HBuilderX.4.56.2025031210/HBuilderX/plugins/uniapp-cli/node_modules/@dcloudio/vue-cli-plugin-uni/packages/vue-loader/lib??vue-loader-options!../../../../../../../hongmeng/HBuilderX.4.56.2025031210/HBuilderX/plugins/uniapp-cli/node_modules/@dcloudio/webpack-uni-mp-loader/lib/style.js!./search.vue?vue&type=style&index=0&lang=scss& */ 238);
/* harmony import */ var _hongmeng_HBuilderX_4_56_2025031210_HBuilderX_plugins_uniapp_cli_node_modules_mini_css_extract_plugin_dist_loader_js_ref_8_oneOf_1_0_hongmeng_HBuilderX_4_56_2025031210_HBuilderX_plugins_uniapp_cli_node_modules_css_loader_dist_cjs_js_ref_8_oneOf_1_1_hongmeng_HBuilderX_4_56_2025031210_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_loaders_stylePostLoader_js_hongmeng_HBuilderX_4_56_2025031210_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_8_oneOf_1_2_hongmeng_HBuilderX_4_56_2025031210_HBuilderX_plugins_uniapp_cli_node_modules_postcss_loader_src_index_js_ref_8_oneOf_1_3_hongmeng_HBuilderX_4_56_2025031210_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_sass_loader_dist_cjs_js_ref_8_oneOf_1_4_hongmeng_HBuilderX_4_56_2025031210_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_8_oneOf_1_5_hongmeng_HBuilderX_4_56_2025031210_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_index_js_vue_loader_options_hongmeng_HBuilderX_4_56_2025031210_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_style_js_search_vue_vue_type_style_index_0_lang_scss___WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_hongmeng_HBuilderX_4_56_2025031210_HBuilderX_plugins_uniapp_cli_node_modules_mini_css_extract_plugin_dist_loader_js_ref_8_oneOf_1_0_hongmeng_HBuilderX_4_56_2025031210_HBuilderX_plugins_uniapp_cli_node_modules_css_loader_dist_cjs_js_ref_8_oneOf_1_1_hongmeng_HBuilderX_4_56_2025031210_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_loaders_stylePostLoader_js_hongmeng_HBuilderX_4_56_2025031210_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_8_oneOf_1_2_hongmeng_HBuilderX_4_56_2025031210_HBuilderX_plugins_uniapp_cli_node_modules_postcss_loader_src_index_js_ref_8_oneOf_1_3_hongmeng_HBuilderX_4_56_2025031210_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_sass_loader_dist_cjs_js_ref_8_oneOf_1_4_hongmeng_HBuilderX_4_56_2025031210_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_8_oneOf_1_5_hongmeng_HBuilderX_4_56_2025031210_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_index_js_vue_loader_options_hongmeng_HBuilderX_4_56_2025031210_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_style_js_search_vue_vue_type_style_index_0_lang_scss___WEBPACK_IMPORTED_MODULE_0__);
/* harmony reexport (unknown) */ for(var __WEBPACK_IMPORT_KEY__ in _hongmeng_HBuilderX_4_56_2025031210_HBuilderX_plugins_uniapp_cli_node_modules_mini_css_extract_plugin_dist_loader_js_ref_8_oneOf_1_0_hongmeng_HBuilderX_4_56_2025031210_HBuilderX_plugins_uniapp_cli_node_modules_css_loader_dist_cjs_js_ref_8_oneOf_1_1_hongmeng_HBuilderX_4_56_2025031210_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_loaders_stylePostLoader_js_hongmeng_HBuilderX_4_56_2025031210_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_8_oneOf_1_2_hongmeng_HBuilderX_4_56_2025031210_HBuilderX_plugins_uniapp_cli_node_modules_postcss_loader_src_index_js_ref_8_oneOf_1_3_hongmeng_HBuilderX_4_56_2025031210_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_sass_loader_dist_cjs_js_ref_8_oneOf_1_4_hongmeng_HBuilderX_4_56_2025031210_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_8_oneOf_1_5_hongmeng_HBuilderX_4_56_2025031210_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_index_js_vue_loader_options_hongmeng_HBuilderX_4_56_2025031210_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_style_js_search_vue_vue_type_style_index_0_lang_scss___WEBPACK_IMPORTED_MODULE_0__) if(["default"].indexOf(__WEBPACK_IMPORT_KEY__) < 0) (function(key) { __webpack_require__.d(__webpack_exports__, key, function() { return _hongmeng_HBuilderX_4_56_2025031210_HBuilderX_plugins_uniapp_cli_node_modules_mini_css_extract_plugin_dist_loader_js_ref_8_oneOf_1_0_hongmeng_HBuilderX_4_56_2025031210_HBuilderX_plugins_uniapp_cli_node_modules_css_loader_dist_cjs_js_ref_8_oneOf_1_1_hongmeng_HBuilderX_4_56_2025031210_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_loaders_stylePostLoader_js_hongmeng_HBuilderX_4_56_2025031210_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_8_oneOf_1_2_hongmeng_HBuilderX_4_56_2025031210_HBuilderX_plugins_uniapp_cli_node_modules_postcss_loader_src_index_js_ref_8_oneOf_1_3_hongmeng_HBuilderX_4_56_2025031210_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_sass_loader_dist_cjs_js_ref_8_oneOf_1_4_hongmeng_HBuilderX_4_56_2025031210_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_8_oneOf_1_5_hongmeng_HBuilderX_4_56_2025031210_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_index_js_vue_loader_options_hongmeng_HBuilderX_4_56_2025031210_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_style_js_search_vue_vue_type_style_index_0_lang_scss___WEBPACK_IMPORTED_MODULE_0__[key]; }) }(__WEBPACK_IMPORT_KEY__));
 /* harmony default export */ __webpack_exports__["default"] = (_hongmeng_HBuilderX_4_56_2025031210_HBuilderX_plugins_uniapp_cli_node_modules_mini_css_extract_plugin_dist_loader_js_ref_8_oneOf_1_0_hongmeng_HBuilderX_4_56_2025031210_HBuilderX_plugins_uniapp_cli_node_modules_css_loader_dist_cjs_js_ref_8_oneOf_1_1_hongmeng_HBuilderX_4_56_2025031210_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_loaders_stylePostLoader_js_hongmeng_HBuilderX_4_56_2025031210_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_8_oneOf_1_2_hongmeng_HBuilderX_4_56_2025031210_HBuilderX_plugins_uniapp_cli_node_modules_postcss_loader_src_index_js_ref_8_oneOf_1_3_hongmeng_HBuilderX_4_56_2025031210_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_sass_loader_dist_cjs_js_ref_8_oneOf_1_4_hongmeng_HBuilderX_4_56_2025031210_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_8_oneOf_1_5_hongmeng_HBuilderX_4_56_2025031210_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_index_js_vue_loader_options_hongmeng_HBuilderX_4_56_2025031210_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_style_js_search_vue_vue_type_style_index_0_lang_scss___WEBPACK_IMPORTED_MODULE_0___default.a); 

/***/ }),

/***/ 238:
/*!*************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/mini-css-extract-plugin/dist/loader.js??ref--8-oneOf-1-0!./node_modules/css-loader/dist/cjs.js??ref--8-oneOf-1-1!./node_modules/@dcloudio/vue-cli-plugin-uni/packages/vue-loader/lib/loaders/stylePostLoader.js!./node_modules/@dcloudio/vue-cli-plugin-uni/packages/webpack-preprocess-loader??ref--8-oneOf-1-2!./node_modules/postcss-loader/src??ref--8-oneOf-1-3!./node_modules/@dcloudio/vue-cli-plugin-uni/packages/sass-loader/dist/cjs.js??ref--8-oneOf-1-4!./node_modules/@dcloudio/vue-cli-plugin-uni/packages/webpack-preprocess-loader??ref--8-oneOf-1-5!./node_modules/@dcloudio/vue-cli-plugin-uni/packages/vue-loader/lib??vue-loader-options!./node_modules/@dcloudio/webpack-uni-mp-loader/lib/style.js!D:/BaiduNetdiskDownload/uni-app-music/music-app/frontend/music-app-frontend/pages/search/search.vue?vue&type=style&index=0&lang=scss& ***!
  \*************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

// extracted by mini-css-extract-plugin
    if(false) { var cssReload; }
  

/***/ })

},[[230,"common/runtime","common/vendor"]]]);
//# sourceMappingURL=../../../.sourcemap/mp-weixin/pages/search/search.js.map