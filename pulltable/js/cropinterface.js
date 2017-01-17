/**
 * Created by bruce on 2016-11-09.
 */

var gid_cropinterface = '8a980bf5f2ac4744293362683a7400895d2ab818d0c4ddf9dd456ad429528133';

var body_height = Math.max($(document.body).height(), document.body.scrollHeight);

if ($(location).attr('protocol') == 'https:') {
    var secu_policy_cnt = $('[http-equiv=Content-Security-Policy]').length;
    if (secu_policy_cnt == 0) {
        $('head').append('<meta name="' + gid_cropinterface + '" http-equiv="Content-Security-Policy" content="upgrade-insecure-requests">');
        console.log('security policy appended');
    } else {
        console.log('security policy found : ' + $('[http-equiv=Content-Security-Policy]').html());
        $('[http-equiv=Content-Security-Policy]').remove();
        $('head').append('<meta name="' + gid_cropinterface + '" http-equiv="Content-Security-Policy" content="upgrade-insecure-requests">');
        console.log('security policy updated!!');
    }
}

var cropinterface = {
    // 최초로 꼭!!! 실행되어야 한다~!!!
    init: function () {
        // css 로드
        var cropinterface_css = browser.extension.getURL('pulltable/css/cropinterface.css');
        $(document.body).append('<link name="' + gid_cropinterface + '" href="' + cropinterface_css + '" rel="stylesheet">');

        var excel_css = browser.extension.getURL('pulltable/css/excel-2000.css');
        $(document.body).append('<link name="' + gid_cropinterface + '" href="' + excel_css + '" rel="stylesheet">');

        $(cropinterface.s_area.html()).appendTo(document.body).hide();
        $(cropinterface.left_area.html()).appendTo(document.body).hide();
        $(cropinterface.top_area.html()).appendTo(document.body).hide();
        $(cropinterface.right_area.html()).appendTo(document.body).hide();
        $(cropinterface.bottom_area.html()).appendTo(document.body).hide();
        $(cropinterface.guide_layer.html('Select the region using mouse drag and drop~!!')).appendTo(document.body).hide().fadeIn(500);
        $(cropinterface.mouse_control_layer.html()).appendTo(document.body);
        $(cropinterface.ok_button.html()).appendTo(document.body).hide();
        $(cropinterface.cancel_button.html()).appendTo(document.body).hide();
    },

    update_location: function (top, left, width, height) {
        cropinterface.s_area.update_location(top, left, width, height);
        cropinterface.left_area.update_location();
        cropinterface.top_area.update_location();
        cropinterface.right_area.update_location();
        cropinterface.bottom_area.update_location();
        cropinterface.ok_button.update_location();
        cropinterface.cancel_button.update_location();
    },

    show_crop_helper: function () {
        cropinterface.s_area.jqo().show();
        cropinterface.left_area.jqo().show();
        cropinterface.top_area.jqo().show();
        cropinterface.right_area.jqo().show();
        cropinterface.bottom_area.jqo().show();
        cropinterface.guide_layer.jqo().remove();
    },

    show_progress_view: function () {
        $(cropinterface.progress_view.html()).appendTo(document.body).hide().fadeIn(300);
    },

    remove_crop_helper: function () {
        cropinterface.s_area.jqo().remove();
        cropinterface.left_area.jqo().remove();
        cropinterface.top_area.jqo().remove();
        cropinterface.right_area.jqo().remove();
        cropinterface.bottom_area.jqo().remove();
        cropinterface.guide_layer.jqo().remove();
        cropinterface.mouse_control_layer.jqo().remove();
        cropinterface.ok_button.jqo().remove();
        cropinterface.cancel_button.jqo().remove();
    },

    remove_progress_view: function () {
        cropinterface.progress_view.jqo().remove();
    },

    remove_all: function () {
        $('[name=' + gid_cropinterface + ']').remove();
    },

    mouse_control_layer: {
        id: 'F5A4CE83D1B3DE9B7F9E270546E1C5D0B2B8D1C77643D06A6BCEF9234FEA6BE4',

        html: function () {
            return '<div id="' + cropinterface.mouse_control_layer.id + '" name="' + gid_cropinterface + '" ' +
                'class="e8c75e344f54d19192193b558b94fc00">' + cropinterface.close_button.html() + '</div>';
        },

        jqid: function () {
            return '#' + cropinterface.mouse_control_layer.id;
        },

        jqo: function () {
            return $(cropinterface.mouse_control_layer.jqid());
        }
    },

    close_button: {
        id: 'f86fd7c474d44f1994a75e59c5c9476e2a112c2ec3dbcdabbb355801d50a86b3',

        html: function () {
            var close_icon_img = browser.extension.getURL('pulltable/images/close.png');
            return '<img id="' + cropinterface.close_button.id + '" class="ce099188c157a7b77d88e3449cc1911d" src="' + close_icon_img + '">';
        },

        jqid: function () {
            return '#' + cropinterface.close_button.id;
        },

        jqo: function () {
            return $(cropinterface.close_button.jqid());
        }
    },

    guide_layer: {
        id: '83CA68BE6227AF2FEB15F227485ED18AFF8ECAE99416A4BD6DF3BE1B5E8059B4',

        html: function (text) {
            return '<div id="' + cropinterface.guide_layer.id + '" name="' + gid_cropinterface + '" ' +
                'class="e8c75e344f54d19192193b558b94fc00" style="' +
                'background-color: rgba(0,0,0,0.6); ' +
                'font-family: Arial; ' +
                'font-size: 40px; ' +
                'color: white; ' +
                'text-align: center; ' +
                'padding-top: 100px; ' +
                'z-index: ' + max_zindex.add(2) + ';">' + text + '</div>';
        },

        jqid: function () {
            return '#' + cropinterface.guide_layer.id;
        },

        jqo: function () {
            return $(cropinterface.guide_layer.jqid());
        }
    },

    s_area: {
        id: '7f41371df97276450425e49cfde068b0d0c1b0b854d85a2efb1e02aca5fb4f59',
        border_width: 5,

        html: function () {
            return '<div id="' + cropinterface.s_area.id + '" ' +
                'name="' + gid_cropinterface + '" ' +
                'class="cfc12176ec072a70ad6fbea7e96f6fd8"></div>';
        },

        jqid: function () {
            return '#' + cropinterface.s_area.id;
        },

        jqo: function () {
            return $(cropinterface.s_area.jqid());
        },

        update_location: function (top, left, width, height) {
            cropinterface.s_area.jqo().css({
                'top': top + 'px',
                'left': left + 'px',
                'width': width + 'px',
                'height': height + 'px',
                'border-width': cropinterface.s_area.border_width + 'px',
                'margin': '-' + cropinterface.s_area.border_width + 'px'
            });
        },

        top: function () {
            return cropinterface.s_area.jqo().position().top;
        },

        left: function () {
            return cropinterface.s_area.jqo().position().left;
        },

        width: function () {
            return cropinterface.s_area.jqo().width();
        },

        height: function () {
            return cropinterface.s_area.jqo().height();
        }
    },

    left_area: {
        id: 'ddc506bd379cad5e0f9c37b8df4f4b796c62d9fce3ca65a50e342bc5e3a612c8',

        html: function () {
            return '<div id="' + cropinterface.left_area.id + '" ' +
                'name="' + gid_cropinterface + '" ' +
                'class="c37ebbd384c0ea799f9dbaf464568eda"></div>';
        },

        jqid: function () {
            return '#' + cropinterface.left_area.id;
        },

        jqo: function () {
            return $(cropinterface.left_area.jqid());
        },

        update_location: function () {
            cropinterface.left_area.jqo().css({
                'width': (cropinterface.s_area.left() - cropinterface.s_area.border_width) + 'px',
                'height': body_height + 'px'
            })
        },

        left: function () {
            return cropinterface.left_area.jqo().offset().left;
        },

        width: function () {
            return cropinterface.left_area.jqo().width();
        }
    },

    top_area: {
        id: '23e2c43fa6eff91ef6b567d7ebd1c1e346b1548de6c03ca87c96089450b1f3ef',

        html: function () {
            return '<div id="' + cropinterface.top_area.id + '" ' +
                'name="' + gid_cropinterface + '" ' +
                'class="c37ebbd384c0ea799f9dbaf464568eda"></div>';
        },

        jqid: function () {
            return '#' + cropinterface.top_area.id;
        },

        jqo: function () {
            return $(cropinterface.top_area.jqid());
        },

        update_location: function () {
            cropinterface.top_area.jqo().css({
                'left': (cropinterface.s_area.left() - cropinterface.s_area.border_width) + 'px',
                'width': (cropinterface.s_area.width() + cropinterface.s_area.border_width * 2) + 'px',
                'height': (cropinterface.s_area.top() - cropinterface.s_area.border_width) + 'px'
            });
        }
    },

    right_area: {
        id: 'f9a87175bbd7dd1e589b796aeddbad2379e4076ab5fd1a3c21dde89da475661e',

        html: function () {
            return '<div id="' + cropinterface.right_area.id + '" ' +
                'name="' + gid_cropinterface + '" ' +
                'class="c37ebbd384c0ea799f9dbaf464568eda"></div>';
        },

        jqid: function () {
            return '#' + cropinterface.right_area.id;
        },

        jqo: function () {
            return $(cropinterface.right_area.jqid());
        },

        update_location: function () {
            cropinterface.right_area.jqo().css({
                'left': (cropinterface.s_area.left() + cropinterface.s_area.width() + cropinterface.s_area.border_width) + 'px',
                'width': ($(document.body).width() - cropinterface.s_area.left() - cropinterface.s_area.width() - cropinterface.s_area.border_width) + 'px',
                'height': body_height + 'px'
            });
        }
    },

    bottom_area: {
        id: 'E9BA24D127EA1B4E55EE57FCAD3D0BA296FAD9914340CE47E603B7F2355441BD',

        html: function () {
            return '<div id="' + cropinterface.bottom_area.id + '" ' +
                'name="' + gid_cropinterface + '" ' +
                'class="c37ebbd384c0ea799f9dbaf464568eda"></div>';
        },

        jqid: function () {
            return '#' + cropinterface.bottom_area.id;
        },

        jqo: function () {
            return $(cropinterface.bottom_area.jqid());
        },

        update_location: function () {
            cropinterface.bottom_area.jqo().css({
                'top': (cropinterface.s_area.top() + cropinterface.s_area.height() + cropinterface.s_area.border_width) + 'px',
                'left': (cropinterface.s_area.left() - cropinterface.s_area.border_width) + 'px',
                'width': (cropinterface.s_area.width() + cropinterface.s_area.border_width * 2) + 'px',
                'height': (body_height - (cropinterface.s_area.top() + cropinterface.s_area.height()) - cropinterface.s_area.border_width) + 'px'
            });
        }
    },

    ok_button: {
        id: 'ede77c17b2d76c5033bece3c0e140203b1906f7a889b1ed2221f55492a3b8e0c',
        button_width: 20,

        html: function () {
            var ok_icon_img = browser.extension.getURL('pulltable/images/ok.png');
            var tag = '<div id="' + cropinterface.ok_button.id + '" ' +
                'name="' + gid_cropinterface + '" ' +
                'class="a35115947bae66d81b333c68bafee5d1">';
            tag += '<img width="' + cropinterface.ok_button.button_width + 'px" src="' + ok_icon_img + '" />';
            tag += '</div>';
            return tag;
        },

        jqid: function () {
            return '#' + cropinterface.ok_button.id;
        },

        jqo: function () {
            return $(cropinterface.ok_button.jqid());
        },

        update_location: function () {
            cropinterface.ok_button.jqo().css({
                'top': (cropinterface.s_area.top() + cropinterface.s_area.height() - cropinterface.ok_button.button_width - 5) + 'px',
                'left': (cropinterface.s_area.left() + cropinterface.s_area.width() - cropinterface.ok_button.button_width - 3) + 'px',
                'width': cropinterface.ok_button.button_width + 'px'
            });
        }
    },

    cancel_button: {
        id: 'fbbeec3cd5bcac17d409001b1357f2f7d364edd67d74679638c41a6565aa25c5',
        button_width: 20,

        html: function () {
            var cancel_icon_img = browser.extension.getURL('pulltable/images/cancel.png');
            var tag = '<div id="' + cropinterface.cancel_button.id + '" name="' + gid_cropinterface + '" ' +
                'class="a35115947bae66d81b333c68bafee5d1">';
            tag += '<img width="' + cropinterface.cancel_button.button_width + 'px" src="' + cancel_icon_img + '" />';
            tag += '</div>';
            return tag;
        },

        jqid: function () {
            return '#' + cropinterface.cancel_button.id;
        },

        jqo: function () {
            return $(cropinterface.cancel_button.jqid());
        },

        update_location: function () {
            cropinterface.cancel_button.jqo().css({
                'top': (cropinterface.s_area.top() + cropinterface.s_area.height() - cropinterface.cancel_button.button_width - 5) + 'px',
                'left': (cropinterface.s_area.left() + cropinterface.s_area.width() - 3 - cropinterface.ok_button.button_width - 3 - cropinterface.cancel_button.button_width) + 'px',
                'width': cropinterface.cancel_button.button_width + 'px'
            });
        }
    },

    result_view: {
        id: '523d8477b7db1cbbf2018ddef09ee01d3624ad7ec3e5acb501fd9cfdcad9856d',
        id_1: '523d8477b7db1cbbf2018ddef09ee01d3624ad7ec3e5acb501fd9cfdcad9856d_1',

        ta_width_rt: 0.5,
        ta_height_rt: 0.5,

        html: function (data) {
            var tag = '<div id="' + cropinterface.result_view.id + '" name="' + gid_cropinterface + '" class="f00ba127a295931ad49c1f9a8a3e90b6">';
            tag += '<div id="' + cropinterface.result_view.id_1 + '" class="f4ef29dd39f45346c131bdcfffba644d">';
            tag += '<p align="center">Original Cropped Image<br><img style="width: 90%;" src="' + data.images.step1 + '"><br>';
            tag += 'Monochromized<br><img style="width: 90%;" src="' + data.images.step2 + '"><br>';
            tag += 'Guide Added<br><img style="width: 90%;" src="' + data.images.step3 + '"><br>';
            tag += 'Table Recognized<br><img style="width: 90%;" src="' + data.images.step4 + '"><br>';
            tag += 'Words Recognized<br><img style="width: 90%;" src="' + data.images.step5 + '"><br>';
            tag += 'Two Results Merged<br><img style="width: 90%;" src="' + data.images.step6 + '"></p>';
            tag += '</div>';

            return tag;
        },

        jqid: function () {
            return '#' + cropinterface.result_view.id;
        },

        jqo: function () {
            return $(cropinterface.result_view.jqid());
        },

        resize_result_table: function () {
            var window_width = $(window).width();
            var window_height = $(window).height();

            var ta_width = window_width * cropinterface.result_view.ta_width_rt;
            var ta_height = window_height * cropinterface.result_view.ta_height_rt;
            var ta_left = (window_width - ta_width) / 2;
            var ta_top = (window_height - ta_height) / 2;

            $('#' + cropinterface.result_view.id_1).css({
                'top': ta_top + 'px',
                'left': ta_left + 'px',
                'width': ta_width + 'px',
                'height': ta_height + 'px'
            });
        }
    },

    progress_view: {
        id: '0b3ddcdd88f82fe895732eea9f54400bce3379a66fb6fe10b71d762cc3cd550d',

        html: function () {
            var flybee_url = browser.extension.getURL('pulltable/images/flybeefly.gif');
            var tag = '<div id="' + cropinterface.progress_view.id + '" ' +
                'name="' + gid_cropinterface + '" ' +
                'class="d3f47895565cef29ba1fb49dd488fd18">';
            tag += '<img width="300px" src="' + flybee_url + '" />';
            tag += '</div>';
            return tag;
        },

        jqid: function () {
            return '#' + cropinterface.progress_view.id;
        },

        jqo: function () {
            return $(cropinterface.progress_view.jqid());
        }
    }
};

