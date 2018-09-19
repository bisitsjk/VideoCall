//version:  v1.0.0_9e92e1a4679ae67ad09a3dab0da4932d22385cc9
//update: Mon May 23 16:07:48 2016 +0900
//SKCertService: v2.1.8_r2694

/**
 * Created by wjjung on 2014-10-22.
 */

/*
 _vestSignUrl ??? ????
 */

typeof(console) === "object" ? console.log('vestsign start') : '';

var vestSign = (function () {

    var _config = {};

    var VestSign = function () {
        var _popUp,
            _iframe,
            _iframeOpen = false,
            _layer,
            _layerCount = 0,
            _plain,
            _option,
            _callback,
            _errorcallback,
            _library,
            _libraryOpen = false;

        var _iframe_zindex = 1;

        var _url = '',
            _iframeName = '',
            _width = '',
            _height = '';

        var _this = this;

        _this._url = {
            sign: {
                url: 'sign.html',
                iframeName: 'yettie_sign_iframe',
                width: 430,
                height: 520
            },
            storageSelected: {
                url: 'storageSelected.html',
                iframeName: 'yettie_storageSelected_iframe',
                width: 430,
                height: 330
            },
            clause: {
                url: 'clause.html',
                iframeName: 'yettie_clause_iframe',
                width: 430,
                height: 490
            },
            info: {
                url: 'info.html',
                iframeName: 'yettie_info_iframe',
                width: 430,
                height: 303
            },
            confirm: {
                url: 'confirm.html',
                iframeName: 'yettie_confirm_iframe',
                width: 430,
                height: 225
            },
            issueInput: {
                url: 'issueInput.html',
                iframeName: 'yettie_issueInput_iframe',
                width: 430,
                height: 225
            },
            renewal: {
                url: 'renewal.html',
                iframeName: 'yettie_renewal_iframe',
                width: 430,
                height: 290
            },
            relayExport: {
                url: 'relayExport.html',
                iframeName: 'yettie_relay_iframe',
                width: 430,
                height: 430
            },
            relayImport: {
                url: 'relayImport.html',
                iframeName: 'yettie_relay_iframe',
                width: 430,
                height: 410
            },
            billTest: {
                //url: "https://211.175.81.102:443/cert/k_new/cert_guide.jsp",
                url: "https://jaguar2.signkorea.com/cert/k_new/cert_guide.jsp",
                iframeName: 'koscom_bill_iframe',
                width: 520,
                height: 536
            },
            bill: {
                url: "https://bill.signkorea.com:443/cert/k_new/cert_guide.jsp",
                iframeName: 'koscom_bill_iframe',
                width: 520,
                height: 536
            },
            identify: {
                url: 'identify.html',
                iframeName: 'yettie_identify_iframe',
                width: 430,
                height: 225
            }
        };

        _this.setParameters = function (plain, option, callback, errorcallback) {
            _plain = plain;
            _option = JSON.stringify(option);
            _callback = callback;
            _errorcallback = errorcallback;
        };

        _this.addConfig = function (config) {
            for (var i in config) {
                if (config.hasOwnProperty(i)) {
                    _config[i] = config[i];
                }
            }
        };

        _this.setting = function () {
            // popup or iframe
            if (_config.type === 'popup') {
                _this.open = popUpOpen;
                _this.getParameters = popUpgetParameters;
                _this.close = popUpClose;
            }
            else {
                _this.open = iframeOpen;
                _this.getParameters = iframegetParameters;
                _this.close = iframeClose;
            }
        };

        _this.setURL = function (object) {
            _url = object.url;
            _iframeName = object.iframeName;
            _width = object.width;
            _height = object.height;
        };

        _this.getConfig = function () {
            return _config;
        };

        _this.callVestCert = function (secKey) {
            window.location.href = "MangoWire://" + secKey;
        };

        function popUpOpen() {
            var nWidth = _width + 'px';   // 430;
            var nHeight = _height + 'px';   // 520
            //var nWidth = "430px";
            //var nHeight = "520px";

            var centerHeight = (window.screen.height - nHeight) / 2;
            var centerWidth = (window.screen.width - nWidth) / 2;

            _popUp = window.open(_config.baseUrl + './views/' + _url, 'Koscom',
                'height=' + nHeight + ',width=' + nWidth + ',top=' + centerHeight + ',left=' + centerWidth + ',toolbar=no');
        }

        function popUpgetParameters() {
            _popUp.params.setParameters(
                _plain,
                _option,
                _callback,
                _errorcallback
            );
        }

        function popUpClose() {
            if (_popUp) {
                _popUp.close();
                _popUp = null;
            }
        }

        function iframeOpen(target) {
            if (_iframeOpen) return;

            _iframe = document.createElement('iframe');
            
            if(!(typeof(target) === "undefined")){
                _iframe.src = _url + target;
                _iframe.scrolling = "yes";
            }
            else{
                _iframe.src = _config.baseUrl + './views/' + _url;
                _iframe.scrolling = "no";
            }

            _iframe.id = 'yettie_iframe';
            _iframe.name = _iframeName;
            _iframe.width = _width + 'px';      //'430';
            _iframe.height = _height + 'px';    //'520';
            _iframe.title = "전자서명";
            _iframe.frameborder = "no";
            _iframe.style.top = "50%";
            _iframe.style.left = "50%";
            //_iframe.style.marginTop = "-" + _height/2 + "px";
            //_iframe.style.marginLeft = "-" + _width/2 + "px";
            _iframe.style.marginTop = "-" + _height/2 + "px";
            _iframe.style.marginLeft = "-" + _width/2 + "px";
            _iframe.style.position = 'fixed';
            _iframe.style.zIndex = _iframe_zindex + 1;
            _iframe.style.border = "none";


            scrollDisavle();
            layerDisable();

            var element = document.getElementById(_config.btnId);
            if (_config.btnId === '' || _config.btnId === undefined || element === null) {
                document.body.appendChild(_iframe);
            }
            else {
                element.parentElement.insertBefore(_iframe, element);
            }
            _iframeOpen = true;
        }

        function iframegetParameters() {
            //window.frames['yettie_sign_iframe'].params.setParameters(
            window.frames[_iframeName].params.setParameters(
                _plain, _option, _callback, _errorcallback
            );
        }

        function iframeClose() {
            var btnIdElement = document.getElementById(_config.btnId);

            //if(document.getElementById(_iframeName) === null) return;
            if(document.getElementById('yettie_iframe') === null) return;
            if (btnIdElement === '' || btnIdElement === 'undefined' || btnIdElement === null) {
                document.getElementById('yettie_iframe').parentNode.removeChild(_iframe);
                //document.getElementById(_iframeName).parentNode.removeChild(_iframe);
            }
            else {
                btnIdElement.parentElement.removeChild(_iframe);
            }

            scrollEnable();
            layerEnable();
            _iframeOpen = false;
        }

        function getIEVersion() {
            var ua = window.navigator.userAgent;
            var ie = ua.indexOf("MSIE");
            return ((ie > 0) ? parseInt(ua.substring(ie + 5, ua.indexOf(".", ie))) : 0);
        }

        function layerDisable() {
            _layerCount += 1;
            if (_layer != undefined)
                return;

            _layer = document.createElement('div');
            _layer.style.position = 'fixed';
            _layer.style.top = 0;
            _layer.style.left = 0;
            _layer.style.width = '100%';
            _layer.style.height = '100%';
            _layer.style.zIndex = "100";
//            _layer.style.backgroundColor = '#000000';
            _layer.style.backgroundColor = '#B3B3B3';
            _layer.style.zIndex = _iframe_zindex;
//            _layer.style.opacity = 0.72; 
            _layer.style.opacity = 0.3;
            document.body.appendChild(_layer);

            var iVer = getIEVersion();

            if (iVer == 8) {
                _layer.style.cssText += "; -ms-filter: 'progid:DXImageTransform.Microsoft.Alpha(Opacity=72)';" /* IE 8 */
                + "; filter = progid:DXImageTransform.Microsoft.Alpha(Opacity=72)";
                /* IE 7 and olders */
            } else if (iVer > 0 && iVer <= 7) {
                _layer.style.filter = "progid:DXImageTransform.Microsoft.Alpha(Opacity=72)";
                /* IE 7 and olders */
            } else {
//                _layer.style.opacity = 0.72;
                _layer.style.opacity = 0.3;
            }
        }

        function layerEnable() {
            if (_layerCount == 1) {
                document.body.removeChild(_layer);
                _layer = undefined;
            }
            _layerCount -= 1;
        }

        function scrollEnable() {
            var html = document.getElementsByTagName('html')[0];
            html.style.overflow = '';
        }

        function scrollDisavle() {
            var html = document.getElementsByTagName('html')[0];
            html.style.overflow = 'hidden';
        }

        _this.libraryOpen = function (_baseUrl) {
            //if(isFile(_config.baseUrl + '/views/library.html')) return;
            if (_libraryOpen) return;
            _library = document.createElement('iframe');
            _library.id = 'yettie_library_iframe';
            _library.name = 'yettie_library_iframe';
            //_library.src = "../app/views/library.html";
            //_library.src = _config.baseUrl + '/views/library.html';
            _library.src = _baseUrl + '/views/library.html';
            _library.title = "library";
            _library.width = "0px";      //'390';
            _library.height = "0px";    //'400';
            _library.scrolling = "no";
            _library.frameborder = "no";
            _library.style.top = "0%";
            _library.style.left = "0%";
            _library.style.marginTop = "-200px";
            _library.style.marginLeft = "-195px";
            _library.style.position = 'fixed';
            _library.style.zIndex = "0";
            _library.style.border = "none";

            document.body.appendChild(_library);

            _libraryOpen = true;
        };

        //function isFile(url) {
        //    var xml = new XMLHttpRequest();
        //    xml.open("HEAD", url, false);
        //    xml.send();
        //    return (xml.status != 200);
        //}
    };

    return new VestSign();
})();


var yettie = {};
yettie.init = function (config) {
    if (typeof(config) !== 'object') {
        alert('Invalid config');
        return;
    }
    vestSign.addConfig(config);
};

yettie.sign = function (plain, option, callback, errorcallback) {
    if (typeof(plain) !== 'string') {
        alert('Plain have to be a string');
        return;
    }

    if (typeof(option) !== 'object') {
        alert('Invalid option');
        return;
    }

    if (typeof(callback) !== 'function') {
        alert('Invalid callback function');
        return;
    }

    vestSign.setParameters(plain, option, function (tokenNumber, identifier, password, option) {
        vestSign.close();
        callback(tokenNumber, identifier, password, option);
    }, function(error){
        vestSign.close();
        errorcallback(error);
    });
    vestSign.setURL(vestSign._url.sign);
    vestSign.setting();
    vestSign.open();
};

yettie.storageSelected = function (option, callback, errorcallback) {
    if (typeof(option) !== 'object') {
        alert('Invalid option');
        return;
    }

    if (typeof(callback) !== 'function') {
        alert('Invalid callback function');
        return;
    }

    vestSign.setParameters("", option, function (tokenNumber, option) {
        vestSign.close();
        callback(tokenNumber, option);
    }, function(error){
        vestSign.close();
        errorcallback(error);
    });
    vestSign.setting();
    vestSign.setURL(vestSign._url.storageSelected);
    vestSign.open();

};

yettie.clause = function (callback, errorcallback) {
    vestSign.setParameters("", "", function(){
        vestSign.close();
        callback();
    }, function(error){
        vestSign.close();
        errorcallback(error);
    });
    vestSign.setting();
    vestSign.setURL(vestSign._url.clause);
    vestSign.open();
};

yettie.issueInput = function (callback, errorcallback) {
    vestSign.setParameters("", "", function(refNo, authCode){
        vestSign.close();
        callback(refNo, authCode);
    }, function(error){
        vestSign.close();
        errorcallback(error);
    });
    vestSign.setting();
    vestSign.setURL(vestSign._url.issueInput);
    vestSign.open();
};

yettie.info = function () {
    vestSign.setParameters("", "", "", "");
    vestSign.setting();
    vestSign.setURL(vestSign._url.info);
    vestSign.open();
};

yettie.confirm = function (msg, option, callback, errorcallback) {
    var config = {
        msg: msg
    };

    vestSign.addConfig(config);
    vestSign.setParameters("", option, function (result) {
        vestSign.close();
        callback(result);
    }, function (error) {
        vestSign.close();
        errorcallback(error);
    });
    vestSign.setting();
    vestSign.setURL(vestSign._url.confirm);
    vestSign.open();
};

yettie.renewal = function (certificate, renewalUrl, callback) {
    if (vest.util.cookie.getCookie("expireCheck") == 0) {
        if (certificate.showRenewal) {
            var config = {
                certificate: certificate,
                renewalUrl: renewalUrl
            };
            vestSign.addConfig(config);

            vestSign.setParameters("", "", function () {
                vestSign.close();
                callback();
            }, function () {
                vestSign.close();
            });
            vestSign.setting();
            vestSign.setURL(vestSign._url.renewal);
            vestSign.open();
            return;
        }
    }
    callback();
    return;
};

yettie.relayExport = function (option, callback, errorcallback) {
    //vestSign.addConfig(config);
    vestSign.setParameters("", option, function (option) {
        vestSign.close();
        callback(option);
    }, function (error) {
        vestSign.close();
        errorcallback(error);
    });
    vestSign.setting();
    vestSign.setURL(vestSign._url.relayExport);
    vestSign.open();
};

yettie.relayImport = function (option, callback, errorcallback) {
    //vestSign.addConfig(config);
    vestSign.setParameters("", option, function (option) {
        vestSign.close();
        callback(option);
    }, function (error) {
        vestSign.close();
        errorcallback(error);
    });
    vestSign.setting();
    vestSign.setURL(vestSign._url.relayImport);
    vestSign.open();
};

yettie.signFormUCPID = function (userAgreement, realName, birthDate, gender, nationalInfo, option, callback, errorcallback) {
    if (typeof(userAgreement) !== "string") {
        alert("userAgreement have to be a string");
        return;
    }
    if (typeof(realName) !== "boolean") {
        alert("realName have to be a boolean");
        return;
    }
    if (typeof(birthDate) !== "boolean") {
        alert("birthDate have to be a boolean");
        return;
    }
    if (typeof(gender) !== "boolean") {
        alert("gender have to be a boolean");
        return;
    }
    if (typeof(nationalInfo) !== "boolean") {
        alert("nationalInfo have to be a boolean");
        return;
    }
    if (typeof(option) !== 'object') {
        alert('Invalid option');
        return;
    }
    if (typeof(callback) !== 'function') {
        alert('Invalid callback function');
        return;
    }

    var options = {
        realName: realName,
        birthDate: birthDate,
        gender: gender,
        nationalInfo: nationalInfo,
        charset: option.encoding
    };
    try {
        var result = vest.pki.generateUCPID(userAgreement, options);
    } catch (e) {
        errorcallback(e.message());
    }
    //yettie.sign(result, option, callback, errorcallback);
};

yettie.scriptLibrary = function (baseUrl) {
    if (window.addEventListener) {
        window.addEventListener('load', function(){
            vestSign.libraryOpen(baseUrl);
        }, false);
    }
    else if (window.attachEvent) {
        window.attachEvent('on' + 'load', function(){
            vestSign.libraryOpen(baseUrl);
        });
    }
};

yettie.addScriptLibrary = function (baseUrl) {
    vestSign.libraryOpen(baseUrl);
};

yettie.bill = function(param, real, callback, errorcallback) {
    
    var closeCallback = function(result){
        vestSign.close();
        if(window.removeEventListener){
            window.removeEventListener('message', closeCallback, false);
        } else if(window.detachEvent){
            window.detachEvent('onmessage', closeCallback);        
        }
        else {
            window.onmessage = function() {};
        }
        //callback(result);
        if(result.data == 0) callback();
        else {
            var error = {
                code: 12025
            };
            errorcallback(error);
        }
    };
    
    if (window.addEventListener) {
        window.addEventListener('message', closeCallback, false);
    } else if (window.attachEvent) {
        window.attachEvent('onmessage', closeCallback);
    } else {
        window.onmessage = closeCallback;
    }
    
    vestSign.setting();
    if(real){
        vestSign.setURL(vestSign._url.bill);
    }
    else{
        vestSign.setURL(vestSign._url.billTest);
    }

    vestSign.open("?" + param);
};

yettie.identify = function (callback, errorcallback) {
    vestSign.setParameters("", "", function(idn){
        vestSign.close();
        callback(idn);
    }, function(error){
        vestSign.close();
        errorcallback(error);
    });
    vestSign.setting();
    vestSign.setURL(vestSign._url.identify);
    vestSign.open();
};

typeof(console) === "object" ? console.log('vestsign end') : '';
