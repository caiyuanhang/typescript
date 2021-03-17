let zero = "初始";
zero = "一";
let forr = [];
forr = [1];
let one = "one";
one = "one on one";
System.register("one/c", [], function (exports_1, context_1) {
    "use strict";
    var thr;
    var __moduleName = context_1 && context_1.id;
    return {
        setters: [],
        execute: function () {
            thr = true;
            exports_1("thr", thr);
            exports_1("thr", thr = false);
        }
    };
});
System.register("one/b", ["one/c"], function (exports_2, context_2) {
    "use strict";
    var c_js_1, two;
    var __moduleName = context_2 && context_2.id;
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
