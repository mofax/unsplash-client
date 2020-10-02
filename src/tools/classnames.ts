/*!
  Copyright (c) 2018 Jed Watson.
  Licensed under the MIT License (MIT), see
  http://jedwatson.github.io/classnames
*/
/* global define */

var hasOwn = {}.hasOwnProperty;

function classNames(...args: any[]): string {
    var classes = [];

    for (var i = 0; i < args.length; i++) {
        var arg = args[i];
        if (!arg) continue;

        var argType = typeof arg;

        if (argType === "string" || argType === "number") {
            classes.push(arg);
        } else if (Array.isArray(arg)) {
            if (arg.length) {
                var inner = classNames.apply(null, arg);
                if (inner) {
                    classes.push(inner);
                }
            }
        } else if (argType === "object") {
            if (arg.toString !== Object.prototype.toString) {
                classes.push(arg.toString());
            } else {
                for (var key in arg) {
                    if (hasOwn.call(arg, key) && arg[key]) {
                        classes.push(key);
                    }
                }
            }
        }
    }

    return classes.join(" ");
}

export { classNames };
