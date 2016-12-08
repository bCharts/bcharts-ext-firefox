/**
 * Created by bruce on 2016-11-07.
 */

var max_zindex = {
    value: function () {
        return 2147483646;
    },

    add: function (i) {
        return max_zindex.value() + i;
    }
};