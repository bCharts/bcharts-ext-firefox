/**
 * Created by bruce on 2016-11-09.
 */

var mousedown = false;
var mouseleave = false;
var region_selected = false;
var first_mousedown_x = 0;
var first_mousedown_y = 0;
var s_area_top = 0;
var s_area_left = 0;
var s_area_width = 0;
var s_area_height = 0;

cropinterface.remove_all();
cropinterface.init();

cropinterface.mouse_control_layer.jqo().mousedown(function (e) {
    if (region_selected)
        return;

    mousedown = true;
    cropinterface.show_crop_helper();
    first_mousedown_x = e.offsetX + $(window).scrollLeft();
    first_mousedown_y = e.offsetY + $(window).scrollTop();
    s_area_top = first_mousedown_y;
    s_area_left = first_mousedown_x;
    cropinterface.update_location(s_area_top, s_area_left, 0, 0);
});

cropinterface.mouse_control_layer.jqo().mousemove(function (e) {
    if (mousedown) {
        var current_mousedown_x = e.offsetX + $(window).scrollLeft();
        var current_mousedown_y = e.offsetY + $(window).scrollTop();

        if (first_mousedown_x > current_mousedown_x) {
            s_area_left = current_mousedown_x;
            s_area_width = first_mousedown_x - current_mousedown_x;
        } else {
            s_area_width = current_mousedown_x - first_mousedown_x;
        }

        if (first_mousedown_y > current_mousedown_y) {
            s_area_top = current_mousedown_y;
            s_area_height = first_mousedown_y - current_mousedown_y;
        } else {
            s_area_height = current_mousedown_y - first_mousedown_y;
        }

        cropinterface.update_location(s_area_top, s_area_left, s_area_width, s_area_height);
    }
});

cropinterface.mouse_control_layer.jqo().mouseup(function (e) {
    if (region_selected)
        return;

    mousedown = false;
    region_selected = true;
    cropinterface.update_location(s_area_top, s_area_left, s_area_width, s_area_height);

    cropinterface.ok_button.jqo().fadeIn(200);
    cropinterface.cancel_button.jqo().fadeIn(200);
});

cropinterface.ok_button.jqo().click(function (e) {
    cropinterface.remove_crop_helper();

    html2canvas(document.body, {
        letterRendering: true,
        onrendered: function (canvas) {
            canvas.setAttribute('crossOrigin', 'anonymous');
            cropinterface.show_progress_view();
            var data = {
                'top': s_area_top,
                'left': s_area_left,
                'width': s_area_width,
                'height': s_area_height,
                'imagesrc': canvas.toDataURL("image/png")
            };

            browser.runtime.sendMessage({
                'type': 'pulltable',
                'data': data
            }).then(
                function (message) {
                    cropinterface.remove_progress_view();
                    console.log(message);
                    if (message.result != 'ok') {
                        alert(message.data);
                    }
                },

                function (error) {
                    console.log('Error: ${error}');
                }
            );
        }
    });
});

cropinterface.cancel_button.jqo().click(function () {
    cropinterface.remove_all();
});

$(window).resize(function (e) {
    cropinterface.result_view.resize_result_table();
});

cropinterface.close_button.jqo().mousedown(function () {
    cropinterface.remove_all();
});

$(window).keyup(function (e) {
    // esc key
    if (e.keyCode == 27) {
        cropinterface.remove_all();
    }
});