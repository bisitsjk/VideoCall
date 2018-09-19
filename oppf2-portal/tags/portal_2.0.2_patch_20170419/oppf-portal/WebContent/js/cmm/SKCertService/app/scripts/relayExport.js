/**
 * Created by nori on 2015. 9. 1..
 */

var params = (function () {
    'use strict';

    var Parameters = function () {
        var _plain,
            _option,
            _callback,
            _errorcallback;
        var params = this;

        params.setParameters = function (plain, option, callback, errorcallback) {
            _plain = plain;
            _option = JSON.parse(option);
            _callback = callback;
            _errorcallback = errorcallback;
        };

        params.getPlain = function () {
            return _plain;
        };

        params.getOption = function () {
            return _option;
        };

        params.getCallback = function () {
            return _callback;
        };

        params.getErrorcallback = function () {
            return _errorcallback;
        };

        params.getParameters = function () {
            return {
                plain: _plain,
                option: _option,
                callback: _callback,
                errorcallback: _errorcallback
            };
        };
    };

    return new Parameters();
})();

var relayExport = (function (doc, $, vest, params, vestSign) {

    if (vestSign === undefined) {
        //alert('구동에 실패하였습니다.\n\n IE인터넷 옵션 -> 보안 \n 인터넷 보호모드 check, 신뢰사이트 보호모드 check \n');
        alert(relayExportLang(2));
        //window.close();
        return false;
    }

    var _parent = vestSign;
    var _config = vestSign.getConfig();
    var _param;
    var _keySafer;


    $("#certAgree_confirmBtn").click(function(){
        var option = _param.option;
        option.code = "" + $("#code1").val() + $("#code2").val() + $("#code3").val();
        _param.callback(option);
        //_parent.close();
    });

    $("#certAgree_cancelBtn").click(function(){
        //_param.callback(_param.option, 0);
        //_parent.close();
        closeEvent();
    });

    $("#CERT_util_btnClose").click(function(){
        //_param.callback(_param.option, 0);
        //_parent.close();
        closeEvent();
    });

    $("#x_btn").click(function(){
        //_param.callback(_param.option, 0);
        //_parent.close();
        closeEvent();
    });

    function closeEvent() {
        var error = {
            code: 12025
        };
        _param.errorcallback(error);
        _parent.close();
    }

    function disableKeySafer () {
        _keySafer.disableElement($("#code1"), $("#codeForm"));
        _keySafer.disableElement($("#code2"), $("#codeForm"));
        _keySafer.disableElement($("#code3"), $("#codeForm"));
    }

    $(document).ready(function () {
        // 체크 후... 아래부분안보여줘야함.
        try {
            _parent.getParameters();
        } catch (e){
            alert(e);
            _parent.close();
        }

        _param = params.getParameters();
        
        $("#code1").focus();

        if(_config.kos_var.webAccess){
            webAccess.webAccessInit(1, 9999);
        }

        _keySafer = new keySafer(_config.kos_var.keySaferEtc.mode, '', _config.keySaferPath, _config.keySaferConfig);
        if(_config.kos_var.keySaferEtc.flag) {
            // 키보드 보안 적용
        } else {
            // 키보드 보안 적용안함
            disableKeySafer();
        }
    });

})(document, jQuery, (function () {
    'use strict';
    var vest = undefined;
    if (window.opener) {
        if (!(typeof(window.opener.vest) === 'undefined' || window.opener.vest == "")) return window.opener.vest;
        //} else if (window.parent.vestSign !== 'undefined') {
    } else if (window.parent.vest) {
        if (!(typeof(window.parent.vest) === 'undefined' || window.parent.vest == "")) return window.parent.vest;
    }
    else {
        return vest;
    }
})(), params, (function () {
    'use strict';
    var vestSign = undefined;
    if (window.opener) {
        if (!(typeof(window.opener.vest) === 'undefined' || window.opener.vestSign == "")) return window.opener.vestSign;
        //} else if (window.parent.vestSign !== 'undefined') {
    } else if (window.parent.vestSign) {
        if (!(typeof(window.parent.vest) === 'undefined' || window.parent.vestSign == "")) return window.parent.vestSign;
    }
    else {
        return vestSign;
    }
})());//version: _9e92e1a4679ae67ad09a3dab0da4932d22385cc9
//update: Mon May 23 16:07:48 2016 +0900
//version:  v1.0.0
