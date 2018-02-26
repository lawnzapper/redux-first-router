webpackHotUpdate(3, {
  /***/ 320: /***/ function(module, exports, __webpack_require__) {
    'use strict'
    eval(
      "\n\nObject.defineProperty(exports, \"__esModule\", {\n  value: true\n});\n\nexports.default = function (middlewares, curryArg) {\n  var killOnRedirect = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : false;\n\n  if (typeof middlewares === 'function') {\n    return middlewares(curryArg, killOnRedirect); // accept custom function to do compose work below\n  }\n\n  var pipeline = curryArg ? middlewares.map(function (middleware) {\n    return middleware(curryArg);\n  }) : middlewares;\n\n  return function (req) {\n    var index = -1; // last called middleware #\n    var result = void 0;\n\n    return dispatch(0);\n\n    function dispatch(i) {\n      for (var _len = arguments.length, args = Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++) {\n        args[_key - 1] = arguments[_key];\n      }\n\n      if (req.redirect !== undefined && killOnRedirect) {\n        // short-circuit, dont call next middleware\n        var ret = i === 0 && result !== undefined ? result : false;\n        return Promise.resolve(ret);\n      }\n\n      if (req.cancelled) {\n        // if a new request comes in before this one commits/enters, cancel it by not calling next middleware\n        // if (req.revertPop) { // special handling if the canceled request is from the browser back/next buttons (\"pops\")\n        //   const nextRequest = req.cancelled\n\n        //   if (!nextRequest.revertPop) {\n        //     req.revertPop() // if previous request is triggered by browser back/next buttons, but not the next request, revert it\n        //   }\n        //   else if (!nextRequest.tmp.committed) {\n        //     req.tmp.committed = true\n        //     req.commitDispatch(req.action) // we need to commit the action s\n        //     req.commitHistory()\n        //   }\n        // }\n        var _ret = i === 0 && result !== undefined ? result : false;\n        console.log('CANCELED', _ret);\n        return Promise.resolve(_ret); // short-circuit, dont call next middleware\n      }\n\n      // start standard work:\n\n      if (i <= index) {\n        return Promise.reject(new Error('next() called multiple times'));\n      }\n\n      index = i;\n      var fn = pipeline[i];\n\n      if (!fn) return Promise.resolve(result);\n\n      try {\n        var next = function next() {\n          for (var _len2 = arguments.length, args = Array(_len2), _key2 = 0; _key2 < _len2; _key2++) {\n            args[_key2] = arguments[_key2];\n          }\n\n          return Promise.resolve(dispatch.apply(undefined, [i + 1].concat(args)));\n        };\n        var prom = Promise.resolve(fn.apply(undefined, [req, next].concat(args))); // insure middleware is a promise\n\n        var retrn = prom.then(function (res) {\n          if (res) {\n            delete res._dispatched; // delete these temporary flags so user doesn't see them (used for `autoDispatch` feature)\n          }\n\n          // return value of redirect (resolution of next pipeline), but if value returned from callback, return that instead\n          if (req.redirect !== undefined && killOnRedirect) {\n            return result = result !== undefined ? result // as below in the standard use-case, this insures last middleware dictates return\n            : res === req.action ? req.redirect // `transformAction` + `enter` middleware return original action dispatched, but we never want to return that value of the action redirected from\n            : res !== undefined ? res : req.redirect; // usually the result returned will be the result of the pipeline redirected to, but we honor explicit different returns (`res`)\n          }\n\n          // if a middleware return `false`, the pipeline is terminated and now there is no longer a \"pending\" route change\n          if (res === false && !req.tmp.committed) {\n            var newRequestCameIn = req.ctx.pending !== req;\n            console.log('NEW REQUEST CAME IN?', newRequestCameIn);\n            req.ctx.pending = newRequestCameIn ? req.ctx.pending : false; // preserve potential incoming request that came in during async callback that returned false, otherwise indicate the initial request is no longer pending\n\n            // call window.history.go(-1 | 1) to go back to URL/route whose `beforeLeave` returned `false`\n            // NOTE: this is also used by redirects back to the current route (see `middleware/call/index.js`)\n            if (req.tmp.revertPop) {\n              req.tmp.revertPop();\n            }\n          }\n\n          result = result !== undefined ? result : res; // insure last middleware return stays the final return of `dispatch` after chain rewinds\n          return i === 0 ? result : res; // but allow middleware calls to `next` to be returned regular return of next middleware\n        });\n\n        return retrn;\n      } catch (err) {\n        return Promise.reject(err);\n      }\n    }\n  };\n};\n\n//////////////////\n// WEBPACK FOOTER\n// /Users/jamesgillmore/React/redux-first-router/src/core/compose.js\n// module id = 320\n// module chunks = 3\n\n//# sourceURL=webpack:////Users/jamesgillmore/React/redux-first-router/src/core/compose.js?"
    )

    /***/
  }
})