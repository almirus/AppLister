/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, { enumerable: true, get: getter });
/******/ 		}
/******/ 	};
/******/
/******/ 	// define __esModule on exports
/******/ 	__webpack_require__.r = function(exports) {
/******/ 		if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 			Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 		}
/******/ 		Object.defineProperty(exports, '__esModule', { value: true });
/******/ 	};
/******/
/******/ 	// create a fake namespace object
/******/ 	// mode & 1: value is a module id, require it
/******/ 	// mode & 2: merge all properties of value into the ns
/******/ 	// mode & 4: return value when already ns object
/******/ 	// mode & 8|1: behave like require
/******/ 	__webpack_require__.t = function(value, mode) {
/******/ 		if(mode & 1) value = __webpack_require__(value);
/******/ 		if(mode & 8) return value;
/******/ 		if((mode & 4) && typeof value === 'object' && value && value.__esModule) return value;
/******/ 		var ns = Object.create(null);
/******/ 		__webpack_require__.r(ns);
/******/ 		Object.defineProperty(ns, 'default', { enumerable: true, value: value });
/******/ 		if(mode & 2 && typeof value != 'string') for(var key in value) __webpack_require__.d(ns, key, function(key) { return value[key]; }.bind(null, key));
/******/ 		return ns;
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "/";
/******/
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = "./src/index.js");
/******/ })
/************************************************************************/
/******/ ({

/***/ "./src/index.js":
/*!**********************!*\
  !*** ./src/index.js ***!
  \**********************/
/*! no exports provided */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _utils_render__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./utils/render */ "./src/utils/render.js");



document.addEventListener('DOMContentLoaded', function () {
  // информация о сервере
  Object(_utils_render__WEBPACK_IMPORTED_MODULE_0__["renderServerInfo"])('serverInfo'); // список приложений

  Object(_utils_render__WEBPACK_IMPORTED_MODULE_0__["renderAppList"])('applicationList');
});

/***/ }),

/***/ "./src/utils/constans.js":
/*!*******************************!*\
  !*** ./src/utils/constans.js ***!
  \*******************************/
/*! exports provided: APPLICATION_LIST_URL, VERSION_INFO_URL, OPERATOR_URL, SERVER_INFO_URL */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "APPLICATION_LIST_URL", function() { return APPLICATION_LIST_URL; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "VERSION_INFO_URL", function() { return VERSION_INFO_URL; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "OPERATOR_URL", function() { return OPERATOR_URL; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "SERVER_INFO_URL", function() { return SERVER_INFO_URL; });


var APPLICATION_LIST_URL = './api/application/list';
var VERSION_INFO_URL = './api/version/';
var OPERATOR_URL = './api/operator/';
var SERVER_INFO_URL = './api/serverInfo/';

/***/ }),

/***/ "./src/utils/render.js":
/*!*****************************!*\
  !*** ./src/utils/render.js ***!
  \*****************************/
/*! exports provided: renderServerInfo, renderAppList */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "renderServerInfo", function() { return renderServerInfo; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "renderAppList", function() { return renderAppList; });
/* harmony import */ var _constans__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./constans */ "./src/utils/constans.js");



function renderServerInfo(domContainer) {
  fetch(_constans__WEBPACK_IMPORTED_MODULE_0__["SERVER_INFO_URL"]).then(function (response) {
    return response.json();
  }).then(function (server) {
    var div = createElement('div', 'version content');
    var button = renderMoreButton("(".concat(server.jdbcUrl, ")"));
    var connectors = '';

    if (server.connectors.length > 0) {
      connectors = '<table><tr>';
      Object.keys(server.connectors[0]).forEach(function (header) {
        connectors += "<th>".concat(header, "</th>");
      });
      server.connectors.forEach(function (item) {
        connectors += "<tr>".concat(Object.values(item).map(function (value) {
          return "<td>".concat(value, "</td>");
        }).join(''), "</tr>");
      });
      connectors += '</tr></table>';
    }

    div.innerHTML = "Java version = ".concat(server.javaVersion, "<br>\n                Tomcat version = ").concat(server.tomcatVersion, "<br>\n                Oracle version = ").concat(server.oracleVersion, "<br>\n                jdbc version = ").concat(server.jdbcVersion, "<br>\n                java OPTS = ").concat(server.javaOPTS, "<br>\n                ").concat(connectors, "\n                ");
    document.getElementById(domContainer).appendChild(button);
    document.getElementById(domContainer).appendChild(div);
  })["catch"](function (err) {
    console.warn('Can\'t get server info.', err);
  });
}
function renderAppList(domContainer) {
  fetch(_constans__WEBPACK_IMPORTED_MODULE_0__["APPLICATION_LIST_URL"]).then(function (response) {
    return response.json();
  }).then(function (appList) {
    var container = document.getElementById(domContainer); // цикл по списку

    appList.map(function (appInfo) {
      var app_row = createElement('h3');
      var appName = appInfo.name;
      app_row.id = appName;
      app_row.innerHTML = "<a title=\"Open module\" href=\"/".concat(appName, "/\" target=\"_blank\">").concat(appName, "</a>");
      container.appendChild(app_row); // название приложения
      // дергаем данные для каждого приложения из /actuator/

      fetch("/..".concat(appInfo.actuatorVersionLink)).then(function (response) {
        return response.json();
      }).then(function (fileVersionInfo) {
        // в IE нужно отпарсить строку в дату (2020.02.06 17:31:02)
        var a = fileVersionInfo.compile.time_stamp.split(' ');
        var d = a[0].split('.');
        var t = a[1].split(':');
        var version_span = renderInfoBlock('span', 'version from Actuator', 'version actuator', {
          installVersion: fileVersionInfo.svn.tag_version,
          svnVersionInfo: fileVersionInfo.svn.revision,
          installDate: new Date(+d[0], +d[1] - 1, +d[2], +t[0], +t[1])
        });
        document.getElementById(appName).appendChild(version_span); // дополняем рядом с названием приложения
      })["catch"](function (err) {
        console.warn('Not contain app version.', err);
      }); // выводятся данные из базы ModuleInfo

      fetch("".concat(_constans__WEBPACK_IMPORTED_MODULE_0__["VERSION_INFO_URL"]).concat(appInfo.name)).then(function (response) {
        return response.json();
      }).then(function (DbVersionInfo) {
        var ul = createElement('ul', 'version content');

        if (DbVersionInfo.length > 0) {
          // здесь выводим только первую строчку
          var version = DbVersionInfo.shift();

          var _version_span = renderInfoBlock('span', 'version from ModuleInfo', 'version db', {
            installVersion: version.installVersion,
            svnVersionInfo: version.svnVersionInfo,
            installDate: new Date(version.installDate),
            operatorId: version.operatorId
          });

          document.getElementById(appName).appendChild(_version_span); // дополняем рядом с названием приложения
          // кнопка More (остальные установки приложения)

          if (DbVersionInfo.length > 1) {
            var button = renderMoreButton('More...');
            document.getElementById(appName).appendChild(button);
          }
        } // данные для More


        DbVersionInfo.forEach(function (version) {
          var li = renderInfoBlock('li', '', '', {
            installVersion: version.installVersion,
            svnVersionInfo: version.svnVersionInfo,
            installDate: new Date(version.installDate),
            path: version.svnPath,
            operatorId: version.operatorId
          });
          ul.appendChild(li); // получаем и выводим operator Name

          fetch("".concat(_constans__WEBPACK_IMPORTED_MODULE_0__["OPERATOR_URL"]).concat(version.operatorId)).then(function (response) {
            return response.json();
          }).then(function (operatorInfo) {
            // ищем все элементы в DOM c data-id = OperatorId, подменяем на Name
            Array.from(document.getElementsByClassName('operatorName')).forEach(function (element) {
              if (element.dataset.id == operatorInfo.operatorId) {
                element.innerText = operatorInfo.operatorName;
              }
            });
          })["catch"](function (err) {
            console.warn('Can\'t get operator info.', err);
          });
        });
        document.getElementById(appName).appendChild(ul);
      })["catch"](function (err) {
        console.warn('Can\'t get app version.', err);
      });
      var version_span = renderInfoBlock('span', 'war file timestamp', 'version war', {
        installDate: appInfo.lastModifiedTime == null ? null : new Date(appInfo.lastModifiedTime)
      });
      document.getElementById(appName).appendChild(version_span); // дополняем данными timestamp рядом с названием приложения
    });
  })["catch"](function (err) {
    console.warn('Something went wrong.', err);
  });
}

function renderInfoBlock() {
  var domType = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 'span';
  var title = arguments.length > 1 ? arguments[1] : undefined;
  var className = arguments.length > 2 ? arguments[2] : undefined;
  var versionInfo = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : {};
  var element = createElement(domType, className);
  if (Object.values(versionInfo).every(function (x) {
    return x === null || x === '';
  })) return document.createTextNode(""); // возвращаем пустой DOM element если нечего рендерить

  if (title) element.title = title;
  var date = versionInfo.installDate ? versionInfo.installDate : undefined;
  element.innerHTML = [versionInfo.installVersion, versionInfo.svnVersionInfo ? '#' + versionInfo.svnVersionInfo : undefined, versionInfo.installDate ? '(' + date.toLocaleDateString() + ' ' + date.toLocaleTimeString() + ')' : undefined, versionInfo.path, versionInfo.operatorId ? '<span class="operatorName" data-id="' + versionInfo.operatorId + '"></span>' : undefined].filter(Boolean).join(' ');
  return element;
}

function renderMoreButton() {
  var title = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 'More...';
  var button = document.createElement('button');
  button.className = 'collapsible';
  button.innerText = title;
  button.addEventListener("click", function () {
    this.classList.toggle("active");
    var content = this.nextElementSibling;
    if (content) if (content.style.maxHeight) {
      content.style.maxHeight = null;
    } else {
      content.style.maxHeight = content.scrollHeight + "px";
    }
  });
  return button;
}

function createElement(domType, className) {
  var elem = document.createElement(domType);
  if (className) elem.className = className;
  return elem;
}

/***/ })

/******/ });
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vd2VicGFjay9ib290c3RyYXAiLCJ3ZWJwYWNrOi8vLy4vc3JjL2luZGV4LmpzIiwid2VicGFjazovLy8uL3NyYy91dGlscy9jb25zdGFucy5qcyIsIndlYnBhY2s6Ly8vLi9zcmMvdXRpbHMvcmVuZGVyLmpzIl0sIm5hbWVzIjpbImRvY3VtZW50IiwicmVuZGVyU2VydmVySW5mbyIsInJlbmRlckFwcExpc3QiLCJBUFBMSUNBVElPTl9MSVNUX1VSTCIsIlZFUlNJT05fSU5GT19VUkwiLCJPUEVSQVRPUl9VUkwiLCJTRVJWRVJfSU5GT19VUkwiLCJmZXRjaCIsInJlc3BvbnNlIiwiZGl2IiwiY3JlYXRlRWxlbWVudCIsImJ1dHRvbiIsInJlbmRlck1vcmVCdXR0b24iLCJzZXJ2ZXIiLCJjb25uZWN0b3JzIiwiT2JqZWN0IiwiY29uc29sZSIsImNvbnRhaW5lciIsImFwcExpc3QiLCJhcHBfcm93IiwiYXBwTmFtZSIsImFwcEluZm8iLCJhIiwiZmlsZVZlcnNpb25JbmZvIiwiZCIsInQiLCJ2ZXJzaW9uX3NwYW4iLCJyZW5kZXJJbmZvQmxvY2siLCJpbnN0YWxsVmVyc2lvbiIsInN2blZlcnNpb25JbmZvIiwiaW5zdGFsbERhdGUiLCJ1bCIsIkRiVmVyc2lvbkluZm8iLCJ2ZXJzaW9uIiwib3BlcmF0b3JJZCIsImxpIiwicGF0aCIsIkFycmF5IiwiZWxlbWVudCIsIm9wZXJhdG9ySW5mbyIsImRvbVR5cGUiLCJ0aXRsZSIsImNsYXNzTmFtZSIsInZlcnNpb25JbmZvIiwieCIsImRhdGUiLCJjb250ZW50IiwiZWxlbSJdLCJtYXBwaW5ncyI6IjtRQUFBO1FBQ0E7O1FBRUE7UUFDQTs7UUFFQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTs7UUFFQTtRQUNBOztRQUVBO1FBQ0E7O1FBRUE7UUFDQTtRQUNBOzs7UUFHQTtRQUNBOztRQUVBO1FBQ0E7O1FBRUE7UUFDQTtRQUNBO1FBQ0EsMENBQTBDLGdDQUFn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QUdoQkEsV0FBVyxDQUhLLE1BSWhCQSxXQUFXLENBQVhBLGFBQXlCLHlDQUF5Q0EsV0FBVyxDQUFwRCxhQUF6QkEsY0FKZ0IsZ0NBQXBCTCxHQUFvQixDQUFwQkE7QUFLQTtBQUNIOztBQUVELDRCQUE2QztBQUFBLE1BQW5CRyxLQUFtQix1RUFBWCxTQUFXO0FBQ3pDLE1BQUk5QixNQUFNLEdBQUdYLFFBQVEsQ0FBUkEsY0FBYixRQUFhQSxDQUFiO0FBQ0FXLFFBQU0sQ0FBTkE7QUFDQUEsUUFBTSxDQUFOQTtBQUNBQSxRQUFNLENBQU5BLDBCQUFpQyxZQUFZO0FBQ3pDO0FBQ0EsUUFBSW1DLE9BQU8sR0FBRyxLQUFkO0FBQ0EsaUJBQ0ksSUFBSUEsT0FBTyxDQUFQQSxNQUFKLFdBQTZCO0FBQ3pCQSxhQUFPLENBQVBBO0FBREosV0FFTztBQUNIQSxhQUFPLENBQVBBLGtCQUEwQkEsT0FBTyxDQUFQQSxlQUExQkE7QUFDSDtBQVJUbkM7QUFVQTtBQUNIOztBQUVELDJDQUEyQztBQUN2QyxNQUFJb0MsSUFBSSxHQUFHL0MsUUFBUSxDQUFSQSxjQUFYLE9BQVdBLENBQVg7QUFDQSxpQkFBZStDLElBQUksQ0FBSkE7QUFDZjtBQUNILEMiLCJmaWxlIjoibWFpbi5idW5kbGUuanMiLCJzb3VyY2VzQ29udGVudCI6WyIgXHQvLyBUaGUgbW9kdWxlIGNhY2hlXG4gXHR2YXIgaW5zdGFsbGVkTW9kdWxlcyA9IHt9O1xuXG4gXHQvLyBUaGUgcmVxdWlyZSBmdW5jdGlvblxuIFx0ZnVuY3Rpb24gX193ZWJwYWNrX3JlcXVpcmVfXyhtb2R1bGVJZCkge1xuXG4gXHRcdC8vIENoZWNrIGlmIG1vZHVsZSBpcyBpbiBjYWNoZVxuIFx0XHRpZihpbnN0YWxsZWRNb2R1bGVzW21vZHVsZUlkXSkge1xuIFx0XHRcdHJldHVybiBpbnN0YWxsZWRNb2R1bGVzW21vZHVsZUlkXS5leHBvcnRzO1xuIFx0XHR9XG4gXHRcdC8vIENyZWF0ZSBhIG5ldyBtb2R1bGUgKGFuZCBwdXQgaXQgaW50byB0aGUgY2FjaGUpXG4gXHRcdHZhciBtb2R1bGUgPSBpbnN0YWxsZWRNb2R1bGVzW21vZHVsZUlkXSA9IHtcbiBcdFx0XHRpOiBtb2R1bGVJZCxcbiBcdFx0XHRsOiBmYWxzZSxcbiBcdFx0XHRleHBvcnRzOiB7fVxuIFx0XHR9O1xuXG4gXHRcdC8vIEV4ZWN1dGUgdGhlIG1vZHVsZSBmdW5jdGlvblxuIFx0XHRtb2R1bGVzW21vZHVsZUlkXS5jYWxsKG1vZHVsZS5leHBvcnRzLCBtb2R1bGUsIG1vZHVsZS5leHBvcnRzLCBfX3dlYnBhY2tfcmVxdWlyZV9fKTtcblxuIFx0XHQvLyBGbGFnIHRoZSBtb2R1bGUgYXMgbG9hZGVkXG4gXHRcdG1vZHVsZS5sID0gdHJ1ZTtcblxuIFx0XHQvLyBSZXR1cm4gdGhlIGV4cG9ydHMgb2YgdGhlIG1vZHVsZVxuIFx0XHRyZXR1cm4gbW9kdWxlLmV4cG9ydHM7XG4gXHR9XG5cblxuIFx0Ly8gZXhwb3NlIHRoZSBtb2R1bGVzIG9iamVjdCAoX193ZWJwYWNrX21vZHVsZXNfXylcbiBcdF9fd2VicGFja19yZXF1aXJlX18ubSA9IG1vZHVsZXM7XG5cbiBcdC8vIGV4cG9zZSB0aGUgbW9kdWxlIGNhY2hlXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLmMgPSBpbnN0YWxsZWRNb2R1bGVzO1xuXG4gXHQvLyBkZWZpbmUgZ2V0dGVyIGZ1bmN0aW9uIGZvciBoYXJtb255IGV4cG9ydHNcbiBcdF9fd2VicGFja19yZXF1aXJlX18uZCA9IGZ1bmN0aW9uKGV4cG9ydHMsIG5hbWUsIGdldHRlcikge1xuIFx0XHRpZighX193ZWJwYWNrX3JlcXVpcmVfXy5vKGV4cG9ydHMsIG5hbWUpKSB7XG4gXHRcdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIG5hbWUsIHsgZW51bWVyYWJsZTogdHJ1ZSwgZ2V0OiBnZXR0ZXIgfSk7XG4gXHRcdH1cbiBcdH07XG5cbiBcdC8vIGRlZmluZSBfX2VzTW9kdWxlIG9uIGV4cG9ydHNcbiBcdF9fd2VicGFja19yZXF1aXJlX18uciA9IGZ1bmN0aW9uKGV4cG9ydHMpIHtcbiBcdFx0aWYodHlwZW9mIFN5bWJvbCAhPT0gJ3VuZGVmaW5lZCcgJiYgU3ltYm9sLnRvU3RyaW5nVGFnKSB7XG4gXHRcdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFN5bWJvbC50b1N0cmluZ1RhZywgeyB2YWx1ZTogJ01vZHVsZScgfSk7XG4gXHRcdH1cbiBcdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsICdfX2VzTW9kdWxlJywgeyB2YWx1ZTogdHJ1ZSB9KTtcbiBcdH07XG5cbiBcdC8vIGNyZWF0ZSBhIGZha2UgbmFtZXNwYWNlIG9iamVjdFxuIFx0Ly8gbW9kZSAmIDE6IHZhbHVlIGlzIGEgbW9kdWxlIGlkLCByZXF1aXJlIGl0XG4gXHQvLyBtb2RlICYgMjogbWVyZ2UgYWxsIHByb3BlcnRpZXMgb2YgdmFsdWUgaW50byB0aGUgbnNcbiBcdC8vIG1vZGUgJiA0OiByZXR1cm4gdmFsdWUgd2hlbiBhbHJlYWR5IG5zIG9iamVjdFxuIFx0Ly8gbW9kZSAmIDh8MTogYmVoYXZlIGxpa2UgcmVxdWlyZVxuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy50ID0gZnVuY3Rpb24odmFsdWUsIG1vZGUpIHtcbiBcdFx0aWYobW9kZSAmIDEpIHZhbHVlID0gX193ZWJwYWNrX3JlcXVpcmVfXyh2YWx1ZSk7XG4gXHRcdGlmKG1vZGUgJiA4KSByZXR1cm4gdmFsdWU7XG4gXHRcdGlmKChtb2RlICYgNCkgJiYgdHlwZW9mIHZhbHVlID09PSAnb2JqZWN0JyAmJiB2YWx1ZSAmJiB2YWx1ZS5fX2VzTW9kdWxlKSByZXR1cm4gdmFsdWU7XG4gXHRcdHZhciBucyA9IE9iamVjdC5jcmVhdGUobnVsbCk7XG4gXHRcdF9fd2VicGFja19yZXF1aXJlX18ucihucyk7XG4gXHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShucywgJ2RlZmF1bHQnLCB7IGVudW1lcmFibGU6IHRydWUsIHZhbHVlOiB2YWx1ZSB9KTtcbiBcdFx0aWYobW9kZSAmIDIgJiYgdHlwZW9mIHZhbHVlICE9ICdzdHJpbmcnKSBmb3IodmFyIGtleSBpbiB2YWx1ZSkgX193ZWJwYWNrX3JlcXVpcmVfXy5kKG5zLCBrZXksIGZ1bmN0aW9uKGtleSkgeyByZXR1cm4gdmFsdWVba2V5XTsgfS5iaW5kKG51bGwsIGtleSkpO1xuIFx0XHRyZXR1cm4gbnM7XG4gXHR9O1xuXG4gXHQvLyBnZXREZWZhdWx0RXhwb3J0IGZ1bmN0aW9uIGZvciBjb21wYXRpYmlsaXR5IHdpdGggbm9uLWhhcm1vbnkgbW9kdWxlc1xuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5uID0gZnVuY3Rpb24obW9kdWxlKSB7XG4gXHRcdHZhciBnZXR0ZXIgPSBtb2R1bGUgJiYgbW9kdWxlLl9fZXNNb2R1bGUgP1xuIFx0XHRcdGZ1bmN0aW9uIGdldERlZmF1bHQoKSB7IHJldHVybiBtb2R1bGVbJ2RlZmF1bHQnXTsgfSA6XG4gXHRcdFx0ZnVuY3Rpb24gZ2V0TW9kdWxlRXhwb3J0cygpIHsgcmV0dXJuIG1vZHVsZTsgfTtcbiBcdFx0X193ZWJwYWNrX3JlcXVpcmVfXy5kKGdldHRlciwgJ2EnLCBnZXR0ZXIpO1xuIFx0XHRyZXR1cm4gZ2V0dGVyO1xuIFx0fTtcblxuIFx0Ly8gT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLm8gPSBmdW5jdGlvbihvYmplY3QsIHByb3BlcnR5KSB7IHJldHVybiBPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGwob2JqZWN0LCBwcm9wZXJ0eSk7IH07XG5cbiBcdC8vIF9fd2VicGFja19wdWJsaWNfcGF0aF9fXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLnAgPSBcIi9cIjtcblxuXG4gXHQvLyBMb2FkIGVudHJ5IG1vZHVsZSBhbmQgcmV0dXJuIGV4cG9ydHNcbiBcdHJldHVybiBfX3dlYnBhY2tfcmVxdWlyZV9fKF9fd2VicGFja19yZXF1aXJlX18ucyA9IFwiLi9zcmMvaW5kZXguanNcIik7XG4iLCIndXNlIHN0cmljdCc7XHJcbmltcG9ydCB7cmVuZGVyQXBwTGlzdCwgcmVuZGVyU2VydmVySW5mb30gZnJvbSBcIi4vdXRpbHMvcmVuZGVyXCI7XHJcblxyXG5cclxuZG9jdW1lbnQuYWRkRXZlbnRMaXN0ZW5lcignRE9NQ29udGVudExvYWRlZCcsICgpID0+IHtcclxuICAgIC8vINC40L3RhNC+0YDQvNCw0YbQuNGPINC+INGB0LXRgNCy0LXRgNC1XHJcbiAgICByZW5kZXJTZXJ2ZXJJbmZvKCdzZXJ2ZXJJbmZvJyk7XHJcbiAgICAvLyDRgdC/0LjRgdC+0Log0L/RgNC40LvQvtC20LXQvdC40LlcclxuICAgIHJlbmRlckFwcExpc3QoJ2FwcGxpY2F0aW9uTGlzdCcpO1xyXG59KTsiLCIndXNlIHN0cmljdCc7XHJcbmV4cG9ydCBjb25zdCBBUFBMSUNBVElPTl9MSVNUX1VSTCA9ICcuL2FwaS9hcHBsaWNhdGlvbi9saXN0JztcclxuZXhwb3J0IGNvbnN0IFZFUlNJT05fSU5GT19VUkwgPSAnLi9hcGkvdmVyc2lvbi8nO1xyXG5leHBvcnQgY29uc3QgT1BFUkFUT1JfVVJMID0gJy4vYXBpL29wZXJhdG9yLyc7XHJcbmV4cG9ydCBjb25zdCBTRVJWRVJfSU5GT19VUkwgPSAnLi9hcGkvc2VydmVySW5mby8nOyIsIid1c2Ugc3RyaWN0JztcclxuXHJcbmltcG9ydCB7QVBQTElDQVRJT05fTElTVF9VUkwsIE9QRVJBVE9SX1VSTCwgU0VSVkVSX0lORk9fVVJMLCBWRVJTSU9OX0lORk9fVVJMfSBmcm9tIFwiLi9jb25zdGFuc1wiO1xyXG5cclxuZXhwb3J0IGZ1bmN0aW9uIHJlbmRlclNlcnZlckluZm8oZG9tQ29udGFpbmVyKSB7XHJcbiAgICBmZXRjaChTRVJWRVJfSU5GT19VUkwpXHJcbiAgICAgICAgLnRoZW4ocmVzcG9uc2UgPT4gcmVzcG9uc2UuanNvbigpKVxyXG4gICAgICAgIC50aGVuKHNlcnZlciA9PiB7XHJcbiAgICAgICAgICAgIGxldCBkaXYgPSBjcmVhdGVFbGVtZW50KCdkaXYnLCAndmVyc2lvbiBjb250ZW50Jyk7XHJcbiAgICAgICAgICAgIGxldCBidXR0b24gPSByZW5kZXJNb3JlQnV0dG9uKGAoJHtzZXJ2ZXIuamRiY1VybH0pYCk7XHJcbiAgICAgICAgICAgIGxldCBjb25uZWN0b3JzID0gJyc7XHJcbiAgICAgICAgICAgIGlmIChzZXJ2ZXIuY29ubmVjdG9ycy5sZW5ndGggPiAwKSB7XHJcbiAgICAgICAgICAgICAgICBjb25uZWN0b3JzID0gJzx0YWJsZT48dHI+JztcclxuICAgICAgICAgICAgICAgIE9iamVjdC5rZXlzKHNlcnZlci5jb25uZWN0b3JzWzBdKS5mb3JFYWNoKGhlYWRlciA9PiB7XHJcbiAgICAgICAgICAgICAgICAgICAgY29ubmVjdG9ycyArPSBgPHRoPiR7aGVhZGVyfTwvdGg+YFxyXG4gICAgICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgICAgICAgICBzZXJ2ZXIuY29ubmVjdG9ycy5mb3JFYWNoKGl0ZW0gPT4ge1xyXG4gICAgICAgICAgICAgICAgICAgIGNvbm5lY3RvcnMgKz0gYDx0cj4ke09iamVjdC52YWx1ZXMoaXRlbSkubWFwKHZhbHVlID0+IGA8dGQ+JHt2YWx1ZX08L3RkPmApLmpvaW4oJycpfTwvdHI+YDtcclxuICAgICAgICAgICAgICAgIH0pO1xyXG4gICAgICAgICAgICAgICAgY29ubmVjdG9ycyArPSAnPC90cj48L3RhYmxlPic7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgZGl2LmlubmVySFRNTCA9XHJcbiAgICAgICAgICAgICAgICBgSmF2YSB2ZXJzaW9uID0gJHtzZXJ2ZXIuamF2YVZlcnNpb259PGJyPlxyXG4gICAgICAgICAgICAgICAgVG9tY2F0IHZlcnNpb24gPSAke3NlcnZlci50b21jYXRWZXJzaW9ufTxicj5cclxuICAgICAgICAgICAgICAgIE9yYWNsZSB2ZXJzaW9uID0gJHtzZXJ2ZXIub3JhY2xlVmVyc2lvbn08YnI+XHJcbiAgICAgICAgICAgICAgICBqZGJjIHZlcnNpb24gPSAke3NlcnZlci5qZGJjVmVyc2lvbn08YnI+XHJcbiAgICAgICAgICAgICAgICBqYXZhIE9QVFMgPSAke3NlcnZlci5qYXZhT1BUU308YnI+XHJcbiAgICAgICAgICAgICAgICAke2Nvbm5lY3RvcnN9XHJcbiAgICAgICAgICAgICAgICBgO1xyXG4gICAgICAgICAgICBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChkb21Db250YWluZXIpLmFwcGVuZENoaWxkKGJ1dHRvbik7XHJcbiAgICAgICAgICAgIGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKGRvbUNvbnRhaW5lcikuYXBwZW5kQ2hpbGQoZGl2KTtcclxuICAgICAgICB9KS5jYXRjaChlcnIgPT4ge1xyXG4gICAgICAgIGNvbnNvbGUud2FybignQ2FuXFwndCBnZXQgc2VydmVyIGluZm8uJywgZXJyKTtcclxuICAgIH0pO1xyXG5cclxufVxyXG5cclxuZXhwb3J0IGZ1bmN0aW9uIHJlbmRlckFwcExpc3QoZG9tQ29udGFpbmVyKSB7XHJcbiAgICBmZXRjaChBUFBMSUNBVElPTl9MSVNUX1VSTClcclxuICAgICAgICAudGhlbihyZXNwb25zZSA9PiByZXNwb25zZS5qc29uKCkpXHJcbiAgICAgICAgLnRoZW4oYXBwTGlzdCA9PiB7XHJcbiAgICAgICAgICAgIGxldCBjb250YWluZXIgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChkb21Db250YWluZXIpO1xyXG4gICAgICAgICAgICAvLyDRhtC40LrQuyDQv9C+INGB0L/QuNGB0LrRg1xyXG4gICAgICAgICAgICBhcHBMaXN0Lm1hcChhcHBJbmZvID0+IHtcclxuICAgICAgICAgICAgICAgIGxldCBhcHBfcm93ID0gY3JlYXRlRWxlbWVudCgnaDMnKTtcclxuICAgICAgICAgICAgICAgIGxldCBhcHBOYW1lID0gYXBwSW5mby5uYW1lO1xyXG4gICAgICAgICAgICAgICAgYXBwX3Jvdy5pZCA9IGFwcE5hbWU7XHJcbiAgICAgICAgICAgICAgICBhcHBfcm93LmlubmVySFRNTCA9IGA8YSB0aXRsZT1cIk9wZW4gbW9kdWxlXCIgaHJlZj1cIi8ke2FwcE5hbWV9L1wiIHRhcmdldD1cIl9ibGFua1wiPiR7YXBwTmFtZX08L2E+YDtcclxuICAgICAgICAgICAgICAgIGNvbnRhaW5lci5hcHBlbmRDaGlsZChhcHBfcm93KTsgLy8g0L3QsNC30LLQsNC90LjQtSDQv9GA0LjQu9C+0LbQtdC90LjRj1xyXG4gICAgICAgICAgICAgICAgLy8g0LTQtdGA0LPQsNC10Lwg0LTQsNC90L3Ri9C1INC00LvRjyDQutCw0LbQtNC+0LPQviDQv9GA0LjQu9C+0LbQtdC90LjRjyDQuNC3IC9hY3R1YXRvci9cclxuICAgICAgICAgICAgICAgIGZldGNoKGAvLi4ke2FwcEluZm8uYWN0dWF0b3JWZXJzaW9uTGlua31gKVxyXG4gICAgICAgICAgICAgICAgICAgIC50aGVuKHJlc3BvbnNlID0+IHJlc3BvbnNlLmpzb24oKSlcclxuICAgICAgICAgICAgICAgICAgICAudGhlbihmaWxlVmVyc2lvbkluZm8gPT4ge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAvLyDQsiBJRSDQvdGD0LbQvdC+INC+0YLQv9Cw0YDRgdC40YLRjCDRgdGC0YDQvtC60YMg0LIg0LTQsNGC0YMgKDIwMjAuMDIuMDYgMTc6MzE6MDIpXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGNvbnN0IGEgPSBmaWxlVmVyc2lvbkluZm8uY29tcGlsZS50aW1lX3N0YW1wLnNwbGl0KCcgJyk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGNvbnN0IGQgPSBhWzBdLnNwbGl0KCcuJyk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGNvbnN0IHQgPSBhWzFdLnNwbGl0KCc6Jyk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGxldCB2ZXJzaW9uX3NwYW4gPSByZW5kZXJJbmZvQmxvY2soJ3NwYW4nLCAndmVyc2lvbiBmcm9tIEFjdHVhdG9yJywgJ3ZlcnNpb24gYWN0dWF0b3InLCB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBpbnN0YWxsVmVyc2lvbjogZmlsZVZlcnNpb25JbmZvLnN2bi50YWdfdmVyc2lvbixcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHN2blZlcnNpb25JbmZvOiBmaWxlVmVyc2lvbkluZm8uc3ZuLnJldmlzaW9uLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgaW5zdGFsbERhdGU6IG5ldyBEYXRlKCtkWzBdLCAoK2RbMV0gLSAxKSwgK2RbMl0sICt0WzBdLCArdFsxXSksXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH0pO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChhcHBOYW1lKS5hcHBlbmRDaGlsZCh2ZXJzaW9uX3NwYW4pOyAvLyDQtNC+0L/QvtC70L3Rj9C10Lwg0YDRj9C00L7QvCDRgSDQvdCw0LfQstCw0L3QuNC10Lwg0L/RgNC40LvQvtC20LXQvdC40Y9cclxuICAgICAgICAgICAgICAgICAgICB9KS5jYXRjaChlcnIgPT4ge1xyXG4gICAgICAgICAgICAgICAgICAgIGNvbnNvbGUud2FybignTm90IGNvbnRhaW4gYXBwIHZlcnNpb24uJywgZXJyKTtcclxuICAgICAgICAgICAgICAgIH0pO1xyXG4gICAgICAgICAgICAgICAgLy8g0LLRi9Cy0L7QtNGP0YLRgdGPINC00LDQvdC90YvQtSDQuNC3INCx0LDQt9GLIE1vZHVsZUluZm9cclxuICAgICAgICAgICAgICAgIGZldGNoKGAke1ZFUlNJT05fSU5GT19VUkx9JHthcHBJbmZvLm5hbWV9YClcclxuICAgICAgICAgICAgICAgICAgICAudGhlbihyZXNwb25zZSA9PiByZXNwb25zZS5qc29uKCkpXHJcbiAgICAgICAgICAgICAgICAgICAgLnRoZW4oRGJWZXJzaW9uSW5mbyA9PiB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGxldCB1bCA9IGNyZWF0ZUVsZW1lbnQoJ3VsJywgJ3ZlcnNpb24gY29udGVudCcpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBpZiAoRGJWZXJzaW9uSW5mby5sZW5ndGggPiAwKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAvLyDQt9C00LXRgdGMINCy0YvQstC+0LTQuNC8INGC0L7Qu9GM0LrQviDQv9C10YDQstGD0Y4g0YHRgtGA0L7Rh9C60YNcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGxldCB2ZXJzaW9uID0gRGJWZXJzaW9uSW5mby5zaGlmdCgpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgbGV0IHZlcnNpb25fc3BhbiA9IHJlbmRlckluZm9CbG9jaygnc3BhbicsICd2ZXJzaW9uIGZyb20gTW9kdWxlSW5mbycsICd2ZXJzaW9uIGRiJywge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGluc3RhbGxWZXJzaW9uOiB2ZXJzaW9uLmluc3RhbGxWZXJzaW9uLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHN2blZlcnNpb25JbmZvOiB2ZXJzaW9uLnN2blZlcnNpb25JbmZvLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGluc3RhbGxEYXRlOiBuZXcgRGF0ZSh2ZXJzaW9uLmluc3RhbGxEYXRlKSxcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBvcGVyYXRvcklkOiB2ZXJzaW9uLm9wZXJhdG9ySWRcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH0pO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoYXBwTmFtZSkuYXBwZW5kQ2hpbGQodmVyc2lvbl9zcGFuKTsgLy8g0LTQvtC/0L7Qu9C90Y/QtdC8INGA0Y/QtNC+0Lwg0YEg0L3QsNC30LLQsNC90LjQtdC8INC/0YDQuNC70L7QttC10L3QuNGPXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAvLyDQutC90L7Qv9C60LAgTW9yZSAo0L7RgdGC0LDQu9GM0L3Ri9C1INGD0YHRgtCw0L3QvtCy0LrQuCDQv9GA0LjQu9C+0LbQtdC90LjRjylcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlmIChEYlZlcnNpb25JbmZvLmxlbmd0aCA+IDEpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBsZXQgYnV0dG9uID0gcmVuZGVyTW9yZUJ1dHRvbignTW9yZS4uLicpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKGFwcE5hbWUpLmFwcGVuZENoaWxkKGJ1dHRvbik7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICAgICAgLy8g0LTQsNC90L3Ri9C1INC00LvRjyBNb3JlXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIERiVmVyc2lvbkluZm8uZm9yRWFjaCh2ZXJzaW9uID0+IHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGxldCBsaSA9IHJlbmRlckluZm9CbG9jaygnbGknLCAnJywgJycsIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBpbnN0YWxsVmVyc2lvbjogdmVyc2lvbi5pbnN0YWxsVmVyc2lvbixcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBzdm5WZXJzaW9uSW5mbzogdmVyc2lvbi5zdm5WZXJzaW9uSW5mbyxcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBpbnN0YWxsRGF0ZTogbmV3IERhdGUodmVyc2lvbi5pbnN0YWxsRGF0ZSksXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgcGF0aDogdmVyc2lvbi5zdm5QYXRoLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIG9wZXJhdG9ySWQ6IHZlcnNpb24ub3BlcmF0b3JJZFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB1bC5hcHBlbmRDaGlsZChsaSk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAvLyDQv9C+0LvRg9GH0LDQtdC8INC4INCy0YvQstC+0LTQuNC8IG9wZXJhdG9yIE5hbWVcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGZldGNoKGAke09QRVJBVE9SX1VSTH0ke3ZlcnNpb24ub3BlcmF0b3JJZH1gKVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIC50aGVuKHJlc3BvbnNlID0+IHJlc3BvbnNlLmpzb24oKSlcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAudGhlbihvcGVyYXRvckluZm8gPT4ge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAvLyDQuNGJ0LXQvCDQstGB0LUg0Y3Qu9C10LzQtdC90YLRiyDQsiBET00gYyBkYXRhLWlkID0gT3BlcmF0b3JJZCwg0L/QvtC00LzQtdC90Y/QtdC8INC90LAgTmFtZVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBBcnJheS5mcm9tKGRvY3VtZW50LmdldEVsZW1lbnRzQnlDbGFzc05hbWUoJ29wZXJhdG9yTmFtZScpKS5mb3JFYWNoKGVsZW1lbnQgPT4ge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgaWYgKGVsZW1lbnQuZGF0YXNldC5pZCA9PSBvcGVyYXRvckluZm8ub3BlcmF0b3JJZCkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGVsZW1lbnQuaW5uZXJUZXh0ID0gb3BlcmF0b3JJbmZvLm9wZXJhdG9yTmFtZTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfSkuY2F0Y2goZXJyID0+IHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBjb25zb2xlLndhcm4oJ0NhblxcJ3QgZ2V0IG9wZXJhdG9yIGluZm8uJywgZXJyKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH0pO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB9KTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoYXBwTmFtZSkuYXBwZW5kQ2hpbGQodWwpO1xyXG4gICAgICAgICAgICAgICAgICAgIH0pLmNhdGNoKGVyciA9PiB7XHJcbiAgICAgICAgICAgICAgICAgICAgY29uc29sZS53YXJuKCdDYW5cXCd0IGdldCBhcHAgdmVyc2lvbi4nLCBlcnIpO1xyXG4gICAgICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgICAgICAgICBsZXQgdmVyc2lvbl9zcGFuID0gcmVuZGVySW5mb0Jsb2NrKCdzcGFuJywgJ3dhciBmaWxlIHRpbWVzdGFtcCcsICd2ZXJzaW9uIHdhcicsIHtcclxuICAgICAgICAgICAgICAgICAgICBpbnN0YWxsRGF0ZTogYXBwSW5mby5sYXN0TW9kaWZpZWRUaW1lID09IG51bGwgPyBudWxsIDogbmV3IERhdGUoYXBwSW5mby5sYXN0TW9kaWZpZWRUaW1lKSxcclxuICAgICAgICAgICAgICAgIH0pO1xyXG4gICAgICAgICAgICAgICAgZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoYXBwTmFtZSkuYXBwZW5kQ2hpbGQodmVyc2lvbl9zcGFuKTsgLy8g0LTQvtC/0L7Qu9C90Y/QtdC8INC00LDQvdC90YvQvNC4IHRpbWVzdGFtcCDRgNGP0LTQvtC8INGBINC90LDQt9Cy0LDQvdC40LXQvCDQv9GA0LjQu9C+0LbQtdC90LjRj1xyXG4gICAgICAgICAgICB9KTtcclxuICAgICAgICB9KS5jYXRjaChlcnIgPT4ge1xyXG4gICAgICAgIGNvbnNvbGUud2FybignU29tZXRoaW5nIHdlbnQgd3JvbmcuJywgZXJyKTtcclxuICAgIH0pO1xyXG59XHJcblxyXG5mdW5jdGlvbiByZW5kZXJJbmZvQmxvY2soZG9tVHlwZSA9ICdzcGFuJywgdGl0bGUsIGNsYXNzTmFtZSwgdmVyc2lvbkluZm8gPSB7fSkge1xyXG4gICAgbGV0IGVsZW1lbnQgPSBjcmVhdGVFbGVtZW50KGRvbVR5cGUsIGNsYXNzTmFtZSk7XHJcbiAgICBpZiAoT2JqZWN0LnZhbHVlcyh2ZXJzaW9uSW5mbykuZXZlcnkoeCA9PiAoeCA9PT0gbnVsbCB8fCB4ID09PSAnJykpKSByZXR1cm4gZG9jdW1lbnQuY3JlYXRlVGV4dE5vZGUoXCJcIik7IC8vINCy0L7Qt9Cy0YDQsNGJ0LDQtdC8INC/0YPRgdGC0L7QuSBET00gZWxlbWVudCDQtdGB0LvQuCDQvdC10YfQtdCz0L4g0YDQtdC90LTQtdGA0LjRgtGMXHJcbiAgICBpZiAodGl0bGUpIGVsZW1lbnQudGl0bGUgPSB0aXRsZTtcclxuICAgIGxldCBkYXRlID0gdmVyc2lvbkluZm8uaW5zdGFsbERhdGUgPyB2ZXJzaW9uSW5mby5pbnN0YWxsRGF0ZSA6IHVuZGVmaW5lZDtcclxuICAgIGVsZW1lbnQuaW5uZXJIVE1MID0gW3ZlcnNpb25JbmZvLmluc3RhbGxWZXJzaW9uLFxyXG4gICAgICAgIHZlcnNpb25JbmZvLnN2blZlcnNpb25JbmZvID8gJyMnICsgdmVyc2lvbkluZm8uc3ZuVmVyc2lvbkluZm8gOiB1bmRlZmluZWQsXHJcbiAgICAgICAgdmVyc2lvbkluZm8uaW5zdGFsbERhdGUgPyAnKCcgKyBkYXRlLnRvTG9jYWxlRGF0ZVN0cmluZygpICsgJyAnICsgZGF0ZS50b0xvY2FsZVRpbWVTdHJpbmcoKSArICcpJyA6IHVuZGVmaW5lZCxcclxuICAgICAgICB2ZXJzaW9uSW5mby5wYXRoLFxyXG4gICAgICAgIHZlcnNpb25JbmZvLm9wZXJhdG9ySWQgPyAnPHNwYW4gY2xhc3M9XCJvcGVyYXRvck5hbWVcIiBkYXRhLWlkPVwiJyArIHZlcnNpb25JbmZvLm9wZXJhdG9ySWQgKyAnXCI+PC9zcGFuPicgOiB1bmRlZmluZWRdLmZpbHRlcihCb29sZWFuKS5qb2luKCcgJyk7XHJcbiAgICByZXR1cm4gZWxlbWVudDtcclxufVxyXG5cclxuZnVuY3Rpb24gcmVuZGVyTW9yZUJ1dHRvbih0aXRsZSA9ICdNb3JlLi4uJykge1xyXG4gICAgbGV0IGJ1dHRvbiA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2J1dHRvbicpO1xyXG4gICAgYnV0dG9uLmNsYXNzTmFtZSA9ICdjb2xsYXBzaWJsZSc7XHJcbiAgICBidXR0b24uaW5uZXJUZXh0ID0gdGl0bGU7XHJcbiAgICBidXR0b24uYWRkRXZlbnRMaXN0ZW5lcihcImNsaWNrXCIsIGZ1bmN0aW9uICgpIHtcclxuICAgICAgICB0aGlzLmNsYXNzTGlzdC50b2dnbGUoXCJhY3RpdmVcIik7XHJcbiAgICAgICAgbGV0IGNvbnRlbnQgPSB0aGlzLm5leHRFbGVtZW50U2libGluZztcclxuICAgICAgICBpZiAoY29udGVudClcclxuICAgICAgICAgICAgaWYgKGNvbnRlbnQuc3R5bGUubWF4SGVpZ2h0KSB7XHJcbiAgICAgICAgICAgICAgICBjb250ZW50LnN0eWxlLm1heEhlaWdodCA9IG51bGw7XHJcbiAgICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgICAgICBjb250ZW50LnN0eWxlLm1heEhlaWdodCA9IGNvbnRlbnQuc2Nyb2xsSGVpZ2h0ICsgXCJweFwiO1xyXG4gICAgICAgICAgICB9XHJcbiAgICB9KTtcclxuICAgIHJldHVybiBidXR0b247XHJcbn1cclxuXHJcbmZ1bmN0aW9uIGNyZWF0ZUVsZW1lbnQoZG9tVHlwZSwgY2xhc3NOYW1lKSB7XHJcbiAgICBsZXQgZWxlbSA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoZG9tVHlwZSk7XHJcbiAgICBpZiAoY2xhc3NOYW1lKSBlbGVtLmNsYXNzTmFtZSA9IGNsYXNzTmFtZTtcclxuICAgIHJldHVybiBlbGVtO1xyXG59Il0sInNvdXJjZVJvb3QiOiIifQ==