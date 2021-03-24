System.register([], function (exports_1, context_1) {
    "use strict";
    var thr, forr;
    var __moduleName = context_1 && context_1.id;
    return {
        setters: [],
        execute: function () {
            thr = true;
            exports_1("thr", thr);
            exports_1("thr", thr = false);
            forr = "forr";
        }
    };
});
