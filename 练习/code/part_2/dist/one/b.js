System.register(["./c.js"], function (exports_1, context_1) {
    "use strict";
    var c_js_1, two;
    var __moduleName = context_1 && context_1.id;
    return {
        setters: [
            function (c_js_1_1) {
                c_js_1 = c_js_1_1;
            }
        ],
        execute: function () {
            two = 2;
            console.log(c_js_1.thr);
        }
    };
});
