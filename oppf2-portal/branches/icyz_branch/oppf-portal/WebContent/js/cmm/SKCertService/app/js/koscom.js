//version:  v1.0.0_9e92e1a4679ae67ad09a3dab0da4932d22385cc9
//update: Mon May 23 16:07:48 2016 +0900
//SKCertService: v2.1.8_r2694
typeof(console) === "object" ? console.log('koscom start') : '';

var ytMain = (function () {
    'use strict';

// ================================================================================================================================================
    // 해당 부분은 고객사 사이트에 맞춰서 설정해주시면 됩니다.
    var option = {
        encoding: 'base64',                                 // 서명값 인코딩(base64, hex)       (설정해드립니다..)
        charset: 'euc-kr'                                   //                                  (설정해드립니다..)
    };

    var config = {
        type: 'iframe',                                     // 창을 iframe, popup으로 뛰울지 설정 여부, iframe으로 고정. (popup미지원)
        btnId: '',                                          // 창착법 적용시, 원활한 텝오더를 위해 창을 뛰우는 버튼 ID 설정, (장착법 미구현)
        baseUrl: '/js/cmm/SKCertService/app/',              // 절대경로로 설정. (app/views/*.html 파일들을 옮기지 않을시 상대경로로 설정해도 무방함)
        title: '',                                          // 상단 타이틀 명 설정, 호출 성격에 따라 자동 설정됨
        servicePort: 14098,                                 // vestcert와 통신하기 위한 포트 설정, koscom:14098로 설정됨(건들지마시오)
        version: {
            SKCertService: '2.1.8',                         // SKCertService version
            SantiagoSecurityService: '2.1.8'                // SantiagoSecurityService version
        },
        ablePwd: true,                                      // 비밀번호창 활성화 여부. 호출 성격에 따라 자동 설정됨
        keystrokeEncryption: 0,                             // 문서참고, SetKeySaferMode() 함수로 설정
        keySaferConfig: {                                   // 키보드보안 옵션 (사용 할 키보드보안 업체만 설정해주면 됨)
            kings: {                                        // 킹스 옵션
                path: '',
                fileName: ['kdfense_object.js']
            },
            nProtect: {                                     // 잉카 옵션 npPfsStartup(document.form, nProtect.param2, nProtect.param3, nProtect.param4, nProtect.param5, "npkencrypt", "re");
                path: '',
                fileName: ['nppfs-1.7.0.js'],
                param2: false,
                param3: true,
                param4: false,
                param5: true
            },
            ahnlab: {                                       // 안랩 옵션
                path: '/AOS2/',
                fileName: ['astx2.min.js', 'astx2_custom.js']
            },
            xkeypad: {                                      // 한컴 옵션
                path: '',
                fileName: ['js/xkeypad_config.js', 'js/xkeypad_new_plugin_koscom.js']
            },
            touchen: {                                      // 라온 (E2E) 옵션
                path: '',
                fileName: ['nxKey/js/TouchEnNxYT.js']
            },
            transkey: {                                     // 라온 (키패드) 옵션
                path: '',
                fileName: ["transkey.js", "rsa_oaep_files/rsa_oaep-min.js", "jsbn/jsbn-min.js", "TranskeyLibPack_op.js"],
                position: {
                    x: -145,
                    y: -210
                }
            }
        },
        //SKCertServiceDownload: "https://www.html5cert.kr/koscom_nonax/sample/SKCertServiceSetup.msi", // skcertService 다운로드 링크. (파일까지 지정)
        SKCertServiceDownload: "/js/cmm/SKCertService/SKCertServiceSetup_v2.4.2_49.exe", // skcertService 다운로드 링크. (파일까지 지정)
        relay: {
            //serviceIP: "211.175.81.101",                    // 인증서 복사 아이피 설정
            serviceIP: "210.207.195.142",
            servicePort: "10500",                           // 인증서 복사 포트 설정
            siteCode: "NONE"                                // 기능없음.
        },
        useGPKI: 0,                                             // 0: 지원안함, 1: 지원함
        language: 0
    };
// ================================================================================================================================================
// 아래쪽을 수정할 경우 정상동작 하지 않습니다.
    var cookieKey = "koscom";

    var keyVendor = {
        0: 'null',
        1: 'kings',
        2: 'npk',
        3: 'ahnlab',
        //4: 'ahnlabOld',           미사용
        7: 'xkeypad',
        8: 'touchen',
        9: 'transkey'
    };

    var kos_var = {
        errorCode: 0,
        errorMessage: 0,


        pOrderStr: '',         // 검색 우선순위(S?저장토큰, H-HARD_DISK, U?보안 토큰, R?REMOVABLE)
        pViewOrderStr: '',       // 이미지 순서
        keySafer_mode: 0,   //키보드 보안 업체 연동 설정
        flag: 0,                 // 인증서 만료일 체크 알림 창 여부
        pPlainText: "signText",       // 원문
        pCertNewUrl: "http://www.signkorea.com/cer_manage/cer_manage.htm",    // URL
        scanByDialogChoiceMode: 0,
        isBullet: false,    // 인증서 갱신창 호출인지 여부.
        isInfoPage: true,   // cert통신시 통신이 안될경우 안내페이지를 뛰우지 경정하는 옵

        policyMode: 0,
        policyOID: 0,
        valid: 0,

        matchedList: '',
        matchedContextFlag: false,
        matchedTokenNumber: '',
        matchedIdentifier: '',
        fullDn: '',

        pB64Signature: '',

        keyNew: '',
        userID: '',
        webAccess: false,
        matchedExipreCheck: false,

        keySaferEtc : {
            //키보드 보안 업체 연동 설정 (인증서 리스트 창 이외)
            flag : false,
            mode : 0
        }
    };

    var signTitle = {
        SELECT: 0,
        RENEWAL: 1,
        SUSPENSION: 2,
        ABOLITION: 3,
        ENCRYPTIONISSUE: 4,
        REISSUE: 5,
        SEARCH: 6,
        CHANGE: 7
    };

    var confirmMsg = {
        ISSUE: 0,
        UPDATE: 1,
        DELETECERT: 2
    };

    function optionInit() {
        kos_var = {
            errorCode: 0,
            errorMessage: 0,

            pOrderStr: '',
            pViewOrderStr: '',
            keySafer_mode: 0,
            flag: 0,
            pPlainText: "signText",
            pCertNewUrl: "http://www.signkorea.com/cer_manage/cer_manage.htm",
            scanByDialogChoiceMode: 0,
            isBullet: false,
            isInfoPage: kos_var.isInfoPage,

            policyMode: 0,
            policyOID: 0,
            valid: 0,

            matchedList: '',
            matchedContextFlag: false,
            matchedTokenNumber: '',
            matchedIdentifier: '',
            fullDn: '',

            pB64Signature: '',

            keyNew: '',
            userID: '',
            webAccess: false,
            matchedExipreCheck: false,

            keySaferEtc : {
                //키보드 보안 업체 연동 설정 (인증서 리스트 창 이외)
                flag : false,
                mode : 0
            }
        };
    }

    yettie.scriptLibrary(config.baseUrl);
    var _load;
    var loadingLibrary = function (func) {
        if (typeof(vest) === 'object') {
            config.keystrokeEncryption = (typeof(config.keystrokeEncryption) === "string") ? config.keystrokeEncryption : keyVendor[config.keystrokeEncryption];
            vest.init(config);
            func();
        } else {
            if (_load) clearTimeout(_load);
            _load = setTimeout(function () {
                yettie.init(config);
                yettie.addScriptLibrary(config.baseUrl);
                loadingLibrary(func);
            }, 1000);
        }
    };

    var certError = function (error, callback) {
        optionInit();
        var result = '';

        // vest.isError(error instanceof jsrose.error) 확인하여 에러객체인지 확인하는 함수 추가해야될듯
        // 여기 정리필요할듯.
        if (typeof(error.getReason) == 'function') {
            //setMatched option:4096 처리
            if (error.reason[0].indexOf('sessionDn') !== -1) result = '$result=nok$dn=' + GetToken(error.reason[0], "sessionDn");

            kos_var.errorMessage = vest.error.getErrorMessage(error.code, config.language);

            if (kos_var.errorMessage == 'undefined') {
                kos_var.errorMessage = error.getReason()[0];
            }
        }
        else {
            //kos_var.errorMessage = error.message;
            kos_var.errorMessage = vest.error.getErrorMessage(error.code, config.language);
            if (kos_var.errorMessage == 'undefined') {
                kos_var.errorMessage = error.message;
            }
        }

        switch (error.code) {
            case vest.token.ERROR.NOT_LOAD :
                // 안내페이지 뛰우기.
                kos_var.errorCode = "90000";
                kos_var.errorMessage = error.reason[0];
                if (kos_var.isInfoPage) {
                    result = "infoOpen";
                    yettie.init(config);
                    yettie.info();
                    return;
                }
                break;
            case vest.token.ERROR.LOST_CONNECTION :
                // 안내페이지 뛰우기.
                kos_var.errorCode = "90001";
                kos_var.errorMessage = error.reason[0];
                if (kos_var.isInfoPage) {
                    result = "infoOpen";
                    yettie.init(config);
                    yettie.info();
                    return;
                }
                break;
            case 12020:
                kos_var.errorCode = "2417";
                break;
            case 12028:
                kos_var.errorCode = "2417";
                //kos_var.errorMessage = typeof(error.getReason) === "undefined" ? error.message : error.getReason().toString();
                break;
            case 12025:
                kos_var.errorCode = "2501";
                //kos_var.errorMessage = typeof(error.getReason) === "undefined" ? error.message : error.getReason().toString();
                break;
            case 12051:  // 1010 아님 수정해야됨.
                kos_var.errorCode = "1010";
                //kos_var.errorMessage = typeof(error.getReason) === "undefined" ? error.message : error.getReason().toString();
                break;
            default :
                kos_var.errorCode = error.code;
            //kos_var.errorMessage = typeof(error.getReason) === "undefined" ? error.message : error.getReason().toString();
        }

        kos_var.use = false;

        callback(result);
    };

    var callSign = function (verifyPin, callback, errorcallback) {
        config.kos_var = kos_var;
        config.verifyPin = verifyPin;
        yettie.init(config);
        yettie.sign(kos_var.pPlainText, option, callback, errorcallback);
    };

    var cookie = {
        setCookie: function (key, val) {
            var str = key + "=" + escape(val);
            document.cookie = str;
        },

        removeCookie: function (key) {
            document.cookie = key + "=" + ";";
        },

        getCookie: function (key) {
            key = key + "=";
            var result = "";
            var cookieData = document.cookie;
            var start = cookieData.indexOf(key);
            if (start != -1) {
                start += key.length;
                var end = cookieData.indexOf(";", start);
                if (end == -1) end = cookieData.length;
                result = cookieData.substring(start, end);
            }
            if (result == "") return window.location.host;
            return unescape(result);
        }

    };

    var bill = function (object, flag, callback) {
        var flow, str;

        if (typeof(object.bill) === "undefined") {
            callback(true);
            return;
        }

        if (flag) {
            str = confirmMsg.ISSUE;
            object.bill = "reference=" + object.bill;
            object.option.isBill = 1;
            flow = function () {
                vest.util.setObject.center(option);
                vest.token.setIssueOptions(object.tokenNumber, 'signKorea', object.refNo, object.authCode, undefined, object.option, function (result) {
                    result.tokenNumber = object.tokenNumber;
                    result.refNo = object.refNo;
                    result.authCode = object.authCode;
                    result.option = object.option;
                    bill(result, 1, callback);
                }, function (error) {
                    certError(error, callback);
                });
            }
        }
        else {
            str = confirmMsg.UPDATE;
            object.bill = "serial=" + object.bill;
            object.option.isBill = 1;
            flow = function () {
                vest.util.setObject.center(option);
                vest.token.updateCertificate(object.tokenNumber, object.identifier, 'signKorea', undefined, undefined, undefined, object.option, function (result) {
                    result.tokenNumber = object.tokenNumber;
                    result.identifier = object.identifier;
                    result.option = object.option;
                    bill(result, 0, callback);
                }, function (error) {
                    certError(error, callback);
                });
            }
        }

        if(typeof(option.certificateSubject) !== 'undefined') option.certificateSubject = '';
        yettie.confirm(str, option, function (result) {
            yettie.bill(object.bill, object.real, flow, function(error){
                certError(error, callback);
            });
        }, function (error) {
            certError(error, callback);
        });

        //if(confirm(str) == true) {
        //    yettie.bill(object.bill, object.real, function(result){
        //        if(result.data === 0){
        //            flow();
        //        }
        //    });
        //}
        //else{
        //    return;
        //}
    };

    function RemoveFromMedia(pszUserID, callback) {
        //config.title = "인증서 검색";
        config.title = signTitle.SEARCH;
        config.ablePwd = true;
        config.disableToken = false;
        kos_var.userID = pszUserID;

        loadingLibrary(function () {
            callSign(false, function (tokenNumber, identifier, password) {
                vest.token.removeFromMedia(tokenNumber, password, identifier, callback, function (error) {
                    certError(error, callback);
                })
            }, function (error) {
                certError(error, callback);
            });
        });
    }

    function SetMatchedContext(pszUserID, pszSuffix) {

    }

    function UnSetMatchedContext(callback) {
        loadingLibrary(function () {
            var customStr = cookie.getCookie(cookieKey);
            vest.token.unSetMatchedContext(customStr, function (result) {
                kos_var.matchedContextFlag = false;
                //kos_var.matchedDn = '';
                kos_var.matchedTokenNumber = '';
                kos_var.matchedIdentifier = '';
                kos_var.matchedList = '';

                callback(result);
            }, function (error) {
                certError(error, callback);
            });
        });
    }

    function SetMatchedContextExt(pszUserID, pszSuffix, pszPassword, type, callback) {
        var setMatchedContextExtCallback = function (dn) {
            var result = '';

            // 4096 옵션에따른 임시처리.
            if ((type & 0x0000F000) === 4096) result = '$result=ok$dn=';

            result += dn;
            callback(result);
        };

        var dn = pszUserID;
        var pwd = pszPassword;
        option.pkitype = config.useGPKI;
        loadingLibrary(function () {
            var customStr = cookie.getCookie(cookieKey);
            vest.token.setMatchedContext(customStr, vest.browser.getBrowser(), dn, pszSuffix, undefined, type, option, function (result) {
                //config.title = "인증서 선택";
                config.title = signTitle.SELECT;
                var dnAndSuffix = (typeof(pszUserID) === 'undefined' || pszUserID == "") ? pszSuffix : pszUserID;
                var list;
                var hasSession = result.hasSession;         // 1: true(세션있음)  / 0: false(세션없음)

                /*
                 2.1.2 버전에 추가 내용
                 만료된 인증서 필터 kos_var.matchedExipreCheck 여부 따라.. false(기본값): 필터링 안함, true: 필터링 함
                 result.list[i].exipreDay < 0 만료된 인증서.
                 */
                if(kos_var.matchedExipreCheck) {
                    var tempList = [];
                    for (var i = 0; i < result.list.length; i++) {
                        if (result.list[i].exipreDay > 0) {
                            tempList.push(result.list[i]);
                        }
                    }
                    result.list = tempList;
                }

                list = result.list;


                if (list == "" || list.length == 0) {
                    kos_var.errorCode = 2500;
                    kos_var.errorMessage = "요청하신 인증서가 없습니다.";

                    callback("");
                    return;
                }
                else {
                    kos_var.matchedIdentifier = {
                        cert: list[0].certIdentifier,
                        key: list[0].keyIdentifier,
                        kmCert: list[0].kmCertIdentifier,
                        kmKey: list[0].kmKeyIdentifier
                    };
                    kos_var.matchedTokenNumber = list[0].tokenIdentifier;
                    kos_var.matchedContextFlag = true;
                    //var customStr = window.location.host + vest.browser.getBrowser();
                    //var customStr = cookie.getCookie("domain");

                    if (hasSession) {
                        // 세션이 있을경우 바로 서명준비.
                        if (16 == (type & 0x000000F0)) pwd = undefined;
                        yettie.init(config);
                        yettie.renewal(list[0], kos_var.pCertNewUrl, function () {
                            vest.token.makeCustomSession(customStr, kos_var.matchedTokenNumber, kos_var.matchedIdentifier, pwd, function (result) {
                                //callback(list[0].dn);
                                setMatchedContextExtCallback(list[0].dn);
                            }, function (error) {
                                certError(error, callback);
                            });
                        });
                    }
                    else {
                        // 세션이 없고 인증서가 하나일경우, 2개이상일경우.
                        kos_var.matchedList = list;
                        //if (!(dnAndSuffix == undefined || dnAndSuffix == "")) kos_var.matchedDn = list[0].dn;
                        if ((type & 0x000000F0) == 0 && list.length == 1 && !(typeof(dnAndSuffix) === 'undefined' || dnAndSuffix == "") && !(typeof(pwd) === 'undefined' || pwd == "")) {
                            //kos_var.matchedList = undefined;
                            kos_var.matchedList = [];
                            yettie.init(config);
                            yettie.renewal(list[0], kos_var.pCertNewUrl, function () {
                                vest.token.makeCustomSession(customStr, kos_var.matchedTokenNumber, kos_var.matchedIdentifier, pwd, function (result) {
                                    //callback(result.dn);
                                    setMatchedContextExtCallback(result.dn);
                                }, function (error) {
                                    certError(error, callback);
                                });
                            });
                        }
                        else if ((type & 0x00000F0) == 16 && list.length == 1 && !(typeof(dnAndSuffix) === 'undefined' || dnAndSuffix == "")) {
                            kos_var.matchedList = [];
                            yettie.init(config);
                            yettie.renewal(list[0], kos_var.pCertNewUrl, function () {
                                vest.token.makeCustomSession(customStr, kos_var.matchedTokenNumber, kos_var.matchedIdentifier, undefined, function (result) {
                                    //callback(result.dn);
                                    setMatchedContextExtCallback(result.dn);
                                }, function (error) {
                                    certError(error, callback);
                                });
                            });
                        }
                        else {
                            config.ablePwd = false;
                            config.disableToken = false;

                            if ((type & 0x000000F0) == 0 && (typeof(pwd) === 'undefined' || pwd == "")) config.ablePwd = true;
                            callSign(false, function (tokenIdentifier, certIdentifier, password, option) {
                                if (!config.ablePwd) password = pwd;
                                if ((type & 0x000000F0) == 16) password = undefined;
                                vest.token.makeCustomSession(customStr, tokenIdentifier, certIdentifier, password, function (result) {
                                    //callback(result.dn);
                                    setMatchedContextExtCallback(result.dn);
                                }, function (error) {
                                    certError(error, callback);
                                });
                            }, function (error) {
                                certError(error, callback);
                            });
                        }
                    }
                }
            }, function (error) {
                certError(error, callback);
            });
        });
    }

    function SetServiceMode(host, mode) {
        var str = "";
        if (host != "") str += host;
        if (mode != "") str += mode;
        if (str == "") str += window.location.host;

        cookie.setCookie(cookieKey, str);
        return true;
    }

    function ClearSessionService(host, service) {
    }

    function SetSessionServicePort(port) {
    }

    function SetWrongPasswordLimit(count) {
        return count;
    }

    function GetLastErrorCode() {
        return kos_var.errorCode;
    }

    function GetLastErrorMsg() {
        return kos_var.errorMessage;
    }

    function GetPCIdentity(input, mode, callback) {
        loadingLibrary(function () {
            vest.token.getPCIdentityInfo(mode, input, function (result) {
                callback(result);
            }, function (error) {
                certError(error, callback);
            });
        });
    }

    function GetMacAddress(mode, callback) {
        loadingLibrary(function () {
            vest.token.getMacAddress(mode, function (result) {
                callback(result);
            }, function (error) {
                certError(error, callback);
            });
        });
    }

    var GetToken = function (pString, pToken) {

        //if (!pString.match(pToken + '='))
        //    return '';
        var tmpStr = pString.split('$');
        if (tmpStr[0] == pString) return "";

        var resultStr;
        //var resultStr = tmpStr[kos_var.tokenCnt].split(pToken + '=');
        for (var i = 0; i < tmpStr.length; i++) {
            if (tmpStr[i].match(pToken + '=')) {
                resultStr = tmpStr[i].split(pToken + "=");
            }
        }
        return (typeof(resultStr) == 'undefined' ? '' : resultStr[1]);
    };

    function SetDeviceOrder(pOrderStr) {
        kos_var.pOrderStr = pOrderStr.toUpperCase();
        return true;
    }

    function SetPasswordEncMode(mode) {
        return true;
    }

    function SetExipreCheckSkip(flag) {
        kos_var.flag = flag;
        cookie.setCookie('expireCheck', flag);
        return flag;
    }

    // HARD_DISK('H'), REMOVABLE('R'),   PKCS11_KEY('U'), SMART_CARD('S')
    function SetDeviceViewOrder(pViewOrderStr) {
        kos_var.pViewOrderStr = pViewOrderStr;
        return true;
    }

    function SetPolicyFilter(mode, pszOID) {
        kos_var.policyMode = mode;
        kos_var.policyOID = pszOID;
        return true;
    }

    function SetWebAccMode(mode) {
        if (mode == 1 || mode == "1") kos_var.webAccess = true;
    }

    function SetScanByDialogChoiceMode(mode) {
        kos_var.scanByDialogChoiceMode = mode;
    }

    function SetLanguageMode(mode) {
        config.language = mode;
    }

    function SetKeySaferMode(mode) {
        //config.keystrokeEncryption = mode;
        config.keystrokeEncryption = keyVendor[mode];
        kos_var.keySafer_mode = mode;
        return true;
    }

    function VerifyDataB64(pB64Signature, mode, callback) {
        var params = {};
        option.signtype = 1;
        option.signInputType = 0;

        loadingLibrary(function () {
            vest.util.setObject.center(option);
            vest.token.verifyData(pB64Signature, mode, params, option, callback, function (error) {
                certError(error, callback);
            })
        });
    }

    function VerifyCmsDataB64(pB64Signature, mode, callback) {
        var params = {};
        option.signtype = 2;
        option.signInputType = 0;

        loadingLibrary(function () {
            vest.util.setObject.center(option);
            vest.token.verifyData(pB64Signature, mode, params, option, callback, function (error) {
                certError(error, callback);
            })
        });
    }

    function VerifyData_ne_B64(pB64Signature, plain, certOrKey, mode, callback) {
        var params = {};

        params.type = mode;
        params.certOrKey = certOrKey;
        params.InputType = 0;
        params.plain = plain;
        option.signtype = 3;
        option.signInputType = 0;

        loadingLibrary(function () {
            vest.util.setObject.center(option);
            vest.token.verifyData(pB64Signature, 0, params, option, callback, function (error) {
                certError(error, callback);
            })
        });
    }

    function getSignatureType(option, signature) {
        var str = "";

        if (typeof(option) !== 'object') {
            str = signature.signature;
        }
        else if (option.signtype == 3 && option.signprotocol == 1) {
            str += "$dn=";
            str += signature.extentions.dn;
            str += "$data=";
            str += signature.signature;
            str += "$certificate=";
            str += signature.extentions.certificate;
        }
        else if (option.signprotocol == 1) {
            str += "$dn=";
            str += signature.extentions.dn;
            str += "$data=";
            str += signature.signature;
            str += "$r=";
            str += signature.extentions.r;
        }
        else {
            str = signature.signature;
        }

        return str;
    }

    function SignDataB64(pPassword, pPlainText, mode, callback) {
        //option.encoding = 'base64';
        //config.title = "인증서 선택";
        config.title = signTitle.SELECT;
        config.ablePwd = true;
        config.disableToken = false;

        kos_var.pPlainText = pPlainText;

        switch (mode) {
            case 0:
                option.signtype = 1;
                option.signprotocol = 0;
                break;

            case 1:
                option.signtype = 1;
                option.signprotocol = 1;
                break;

            case 3:
                option.signtype = 2;
                option.signprotocol = 0;
                break;

            case 4:
                option.signtype = 2;
                option.signprotocol = 1;
                break;
        }

        if (pPlainText == "" || typeof(pPlainText) === 'undefined' || pPlainText == null) {
            // 에러코드 설정;
            kos_var.errorCode = 1099;
            kos_var.errorMessage = "입력 매개변수가 null입니다.";

            callback("");
            return;
        }

        if (pPassword == "") pPassword = undefined;
        if (kos_var.matchedContextFlag && kos_var.matchedList.length == 0) {
            loadingLibrary(function () {
                option.customStr = cookie.getCookie(cookieKey);
                vest.util.setObject.center(option);
                vest.token.makeSignature(kos_var.matchedTokenNumber, pPassword, kos_var.matchedIdentifier, pPlainText, option, function (result) {
                    //callback(result.signature)
                    callback(getSignatureType(option, result));
                }, function (error) {
                    certError(error, callback);
                });
            });
        }
        else {
            loadingLibrary(function () {
                callSign(false, function (tokenNumber, identifier, password, option) {
                    if (tokenNumber instanceof vest.pki.CertificateSet) {
                        try{
                            tokenNumber.makeSignature(pPlainText, password, option, function (result) {
                                callback(getSignatureType(option, result));
                            });
                        } catch (e) {
                            var error = {
                                code: vest.error.errorCode.ScriptError_PFX_MAKESIGNATURE_ERORR
                            };
                            certError(error, callback);
                        }
                    }else{
                        vest.util.setObject.center(option);
                        vest.token.makeSignature(tokenNumber, password, identifier, pPlainText, option, function (result) {
                            kos_var.use = false;
                            callback(getSignatureType(option, result));
                        }, function (error) {
                            certError(error, callback);
                        });
                    }
                }, function (error) {
                    certError(error, callback);
                });
            });
        }
    }

    function SignDataNextB64(pPassword, pPlainText, mode) {
        //kos_var.pPlainText = pPlainText;
    }

    function SignData_ne_B64(pPassword, pPlainText, mode, callback) {
        //option.encoding = 'base64';
        //config.title = "인증서 선택";
        config.title = signTitle.SELECT;
        config.ablePwd = true;
        config.disableToken = false;

        kos_var.pPlainText = pPlainText;

        switch (mode) {
            case 0:
                option.signtype = 3;
                option.signprotocol = 0;
                break;

            case 1:
                option.signtype = 3;
                option.signprotocol = 1;
                break;
        }

        if (pPlainText == "" || typeof(pPlainText) === 'undefined' || pPlainText == null) {
            // 에러코드 설정;
            kos_var.errorCode = 1099;
            kos_var.errorMessage = "입력 매개변수가 null입니다.";

            callback("");
            return;
        }

        if (pPassword == "") pPassword = undefined;
        if (kos_var.matchedContextFlag && kos_var.matchedList.length == 0) {
            loadingLibrary(function () {
                option.customStr = cookie.getCookie(cookieKey);
                vest.util.setObject.center(option);
                vest.token.makeSignature(kos_var.matchedTokenNumber, pPassword, kos_var.matchedIdentifier, pPlainText, option, function (result) {
                    //callback(result.signature)
                    callback(getSignatureType(option, result));
                }, function (error) {
                    certError(error, callback);
                });
            });
        }
        else {
            loadingLibrary(function () {
                callSign(false, function (tokenNumber, identifier, password, option) {
                    if (tokenNumber instanceof vest.pki.CertificateSet) {
                        try{
                            tokenNumber.makeSignaturePKCS1(pPlainText, password, option, function (result) {
                                callback(getSignatureType(option, result));
                            });
                        } catch (e) {
                            var error = {
                                code: vest.error.errorCode.ScriptError_PFX_MAKESIGNATURE_ERORR
                            };
                            certError(error, callback);
                        }
                    }
                    else {
                        vest.util.setObject.center(option);
                        vest.token.makeSignature(tokenNumber, password, identifier, pPlainText, option, function (result) {
                            callback(getSignatureType(option, result));
                        }, function (error) {
                            certError(error, callback);
                        });
                    }
                }, function (error) {
                    certError(error, callback);
                });
            });
        }
    }

    function CertManager_Issue(pszRefNo, pszAuthCode, pszUserID, pszPassword, callback) {
        config.storageSelectedFlag = true;
        config.storageSelectedTokenNumber = '';
        config.kos_var = kos_var;
        yettie.init(config);

        var clauseFlag = true;
        if (pszUserID == "NO_CPS") clauseFlag = false;

        var issue = function (refNo, authCode) {
            yettie.storageSelected(option, function (tokenNumber, option) {
                vest.util.setObject.center(option);
                vest.token.setIssueOptions(tokenNumber, 'signKorea', refNo, authCode, undefined, option, function (result) {
                    result.tokenNumber = tokenNumber;
                    result.refNo = refNo;
                    result.authCode = authCode;
                    result.option = option;
                    bill(result, 1, callback);
                }, function (error) {
                    certError(error, callback);
                });
            }, function (error) {
                certError(error, callback);
            });
        };


        var clause = function (refNo, authCode) {
            if (clauseFlag) {
                yettie.clause(function () {
                    issue(refNo, authCode);
                }, function (error) {
                    certError(error, callback);
                });
            } else {
                issue(refNo, authCode);
            }
        };

        loadingLibrary(function () {
            if (typeof(pszRefNo) === "undefined" || typeof(pszAuthCode) === "undefined" || pszRefNo == "" || pszAuthCode == "") {
                yettie.issueInput(clause, function (error) {
                    certError(error, callback);
                });
            } else {
                clause(pszRefNo, pszAuthCode);
            }
        });
    }

    function CertManager_CertNew(pszUserID, pszPassword, callback) {
        //config.title = "인증서 갱신";
        config.title = signTitle.RENEWAL;
        config.ablePwd = false;
        config.disableToken = false;

        kos_var.isBullet = true;
        kos_var.userID = pszUserID;

        loadingLibrary(function () {
            callSign(false, function (tokenNumber, identifier, password, option) {
                vest.util.setObject.center(option);
                vest.token.updateCertificate(tokenNumber, identifier, 'signKorea', undefined, undefined, undefined, option, function (result) {
                    result.tokenNumber = tokenNumber;
                    result.identifier = identifier;
                    result.option = option;
                    bill(result, 0, callback);
                }, function (error) {
                    certError(error, callback);
                });
            }, function (error) {
                certError(error, callback);
            });
        })
    }

    function CertManager_Suspend(pszUserID, pszPassword, callback) {
        //config.title = "인증서 효력정지";
        config.title = signTitle.SUSPENSION;
        config.ablePwd = true;
        config.disableToken = false;
        kos_var.userID = pszUserID;

        loadingLibrary(function () {
            callSign(false, function (tokeNumber, identifier, password, option) {
                vest.util.setObject.center(option);
                vest.token.suspend(tokeNumber, identifier, 'signkorea', password, option, callback, function (error) {
                    certError(error, callback);
                });
            }, function (error) {
                certError(error, callback);
            });
        });
    }

    function CertManager_Revoke(pszUserID, pszPassword, callback) {
        //config.title = "인증서 폐지";
        config.title = signTitle.ABOLITION;
        config.ablePwd = true;
        config.disableToken = false;
        kos_var.userID = pszUserID;

        loadingLibrary(function () {
            callSign(false, function (tokenNumber, identifier, password, option) {
                vest.util.setObject.center(option);
                vest.token.revoke(tokenNumber, identifier, 'signkorea', password, option, callback, function (error) {
                    certError(error, callback);
                });
            }, function (error) {
                certError(error, callback);
            });
        });
    }

    function CertManager_KeyNew(dn, pszPassword, callback) {
        if (dn == "KM_ONLY") {
            //config.title = "암호화용 인증서 추가 발급";
            config.title = signTitle.ENCRYPTIONISSUE;
            config.ablePwd = false;
            config.disableToken = false;
            kos_var.userID = '';
            kos_var.keyNew = 'KM_ONLY';
        } else {
            //config.title = "인증서 재발급";
            config.title = signTitle.REISSUE;
            config.ablePwd = false;
            config.disableToken = false;
            kos_var.userID = dn;
            kos_var.keyNew = '!KM_ONLY';
        }

        loadingLibrary(function () {
            callSign(false, function (tokenNumber, identifier, password, option) {
                if (dn == "KM_ONLY") {
                    option.reIssue = 1;
                } else option.reIssue = 0;
                vest.util.setObject.center(option);
                vest.token.updateCertificate(tokenNumber, identifier, 'signKorea', undefined, undefined, undefined, option, function (result) {
                    result.tokenNumber = tokenNumber;
                    result.identifier = identifier;
                    result.option = option;
                    bill(result, 0, callback);
                }, function (error) {
                    certError(error, callback);
                });
            }, function (error) {
                certError(error, callback);
            });
        });
    }

    function CertManager_Status(pszUserID, callback) {
        //config.title = "인증서 검색";
        config.title = signTitle.SEARCH;
        config.ablePwd = false;
        config.disableToken = false;
        kos_var.userID = pszUserID;

        loadingLibrary(function () {
            callSign(false, function (tokenNumber, identifier, password, option) {
                //vest.token.verifyPin(tokenNumber, identifier, password, callback, function (error) {
                //    certError(error, callback);
                //});
            }, function (error) {
                certError(error, callback);
            });
        });
    }

    function RemoveLF(pSrc) {


    }

    function SetCertNewUrlInfo(pCertNewUrl) {
        if (!(pCertNewUrl.indexOf("http://") != 0 || pCertNewUrl.indexOf("https://") != 0)) {
            pCertNewUrl = "http://" + pCertNewUrl;
        }
        kos_var.pCertNewUrl = pCertNewUrl;
        return true;
    }

    function ExportP12(pszUserID, pszPassword, callback) {
        //config.title = "인증서 검색";
        config.title = signTitle.SEARCH;
        config.ablePwd = true;
        config.disableToken = true;
        kos_var.userID = pszUserID;

        loadingLibrary(function () {
            callSign(false, function (tokenNumber, identifier, password, option) {
                kos_var.fullDn = '';
                vest.util.setObject.center(option);
                vest.token.exportP12(tokenNumber, identifier, password, 1, option, callback, function (error) {
                    certError(error, callback);
                });
            }, function (error) {
                certError(error, callback)
            });
        });
    }

    function ImportP12(pszPassword, callback) {
        loadingLibrary(function () {
            var option = {};
            vest.util.setObject.center(option);
            vest.token.getTokenList(vest.token.TYPE.ALL, function (list) {
                vest.token.importP12(list[0].tokenIdentifier, undefined, 1, option, callback, function (error) {
                    certError(error, callback);
                });
            });
        });
    }

    function VerifyPassword(pszUserID, callback) {
        //config.title = "인증서 검색";
        config.title = signTitle.SEARCH;
        config.ablePwd = true;
        config.disableToken = false;
        kos_var.userID = pszUserID;

        loadingLibrary(function () {
            callSign(false, function (tokenNumber, identifier, password, option) {
                vest.util.setObject.center(option);
                vest.token.verifyPin(tokenNumber, identifier, password, callback, function (error) {
                    certError(error, callback);
                })
            }, function (error) {
                certError(error, callback);
            });
        });
    }

    function CertManager_ChangePassword(pszUserID, pszOldPassword, pszNewPassword, callback) {
        //config.title = "인증서 비밀번호 변경";
        config.title = signTitle.CHANGE;
        config.ablePwd = false;
        config.disableToken = false;
        kos_var.userID = pszUserID;

        loadingLibrary(function () {
            callSign(false, function (tokenNumber, identifier, password, option) {
                vest.util.setObject.center(option);
                vest.token.changePin(tokenNumber, identifier, undefined, undefined, option, callback, function (error) {
                    certError(error, callback);
                });
            }, function (error) {
                certError(error, callback);
            })
        });
    }

    function ChangeStorageMedia(pszUserID, callback) {
        //config.title = "인증서 검색";
        config.title = signTitle.SEARCH;
        config.ablePwd = true;
        config.disableToken = false;

        config.kos_var = kos_var;
        kos_var.userID = pszUserID;

        loadingLibrary(function () {
            callSign(false, function (tokenNumber, identifier, password) {
                config.storageSelectedFlag = false;
                config.storageSelectedTokenNumber = tokenNumber;
                config.kos_var = kos_var;
                yettie.init(config); // kos_var 변수들 전달하기 위해.. 한거네..... +config
                yettie.storageSelected(option, function (newTokenNumber, options) {
                    vest.util.setObject.center(option);
                    vest.token.getCertificates(tokenNumber, undefined, undefined, options, function () {
                        // 인증서 정보.
                        vest.token.getCertificate(tokenNumber, identifier.cert, function (certificate) {
                            option.certificateSubject = certificate.getSubject();
                            yettie.confirm(confirmMsg.DELETECERT, option, function () {
                                vest.token.changeStorageMedia(tokenNumber, newTokenNumber, identifier, 1, password, callback, function (error) {
                                    certError(error, callback);
                                });
                            }, function () {
                                vest.token.changeStorageMedia(tokenNumber, newTokenNumber, identifier, 0, password, callback, function (error) {
                                    certError(error, callback);
                                });
                            });
                        }, function (error) {
                            certError(error, callback);
                        });
                    }, function (error) {
                        certError(error, callback);
                    });
                }, function (error) {
                    certError(error, callback);
                });
            }, function (error) {
                certError(error, callback);
            });
        });
    }

    function trayOn(callback) {
        var option = {};
        loadingLibrary(function () {
            vest.util.setObject.center(option);
            vest.token.tray("koscom", "on", option, callback, function (error) {
                certError(error, callback);
            });
        });
    }

    function trayOff(callback) {
        var option = {}
        loadingLibrary(function () {
            vest.util.setObject.center(option);
            vest.token.tray("koscom", "off", option, callback, function (error) {
                certError(error, callback);
            });
        });
    }

    function certServiceSetup(callback) {
        loadingLibrary(function () {
            vest.token.getVersion(function (versions) {
                var returnVersion = "";
                if (vest.util.certVersion.availableVersion(vest.util.certVersion.getVersion('VestCert', versions), config.version.SKCertService)
                    && vest.util.certVersion.availableVersion(vest.util.certVersion.getVersion('VestCertSecurityService', versions), config.version.SantiagoSecurityService)) {
                    returnVersion = vest.util.certVersion.getVersion('VestCert', versions);
                }
                else if (!vest.util.certVersion.availableVersion(vest.util.certVersion.getVersion('VestCert', versions), config.version.SKCertService)) {
                    kos_var.errorCode = 90001;
                    //kos_var.errorMessage = "설치한 모듈 버전이 낮습니다, 최신버전을 설치해주세요,";
                    kos_var.errorMessage = vest.error.getErrorMessage(90001, config.language)
                }
                else {
                    kos_var.errorCode = 90002;
                    //kos_var.errorMessage = "설치한 DLL 버전이 낮습니다, 최신버전을 설치해주세요,";
                    kos_var.errorMessage = vest.error.getErrorMessage(90002, config.language)
                }
                callback(returnVersion);
            }, function (error) {
                certError(error, callback);
            });
        });
    }

    function ShowConfigMenuX(mode, callback) {
        var option = {};
        option.mode = mode;
        loadingLibrary(function () {
            vest.util.setObject.center(option);
            vest.token.tray("koscom", "config", option, callback, function (error) {
                certError(error, callback);
            });
        })
    }

    function doubleClickBlock(key) {
        if (typeof(window.signMap) === 'undefined') window.signMap = [];
        if (typeof(window.signMap[key]) === 'undefined' || window.signMap[key] == false) {
            window.signMap[key] = true;
            setTimeout(function () {
                window.signMap[key] = false;
            }, 2000)
        }
        else {
            return true;
        }
    }

    function SetInfoPage(mode) {
        if (mode === 0) {
            kos_var.isInfoPage = true;
            return true;
        }
        else if (mode === 1) {
            kos_var.isInfoPage = false;
            return true;
        } else {
            return false;
        }
    }

    function relayExport(callback) {
        config.disableToken = false;
        config.title = signTitle.SEARCH;
        loadingLibrary(function () {
            callSign(true, function (tokenNumber, identifier, password, option) {
                yettie.init(config);
                yettie.relayExport(option, function (option) {
                    option.relayIP = config.relay.serviceIP;
                    option.relayPort = config.relay.servicePort;
                    option.siteCode = config.relay.siteCode;
                    vest.token.relayRaonExportCert(tokenNumber, identifier, password, option.code, option, function (result) {
                        callback(result);
                    }, function (error) {
                        certError(error, callback)
                    });
                }, function (error) {
                    certError(error, callback)
                });
            }, function (error) {
                certError(error, callback);
            });
        });
    }

    function relayImport(callback) {
        config.kos_var = kos_var;
        var callStorageSelected = function (option, callback, errorcallback) {
            yettie.storageSelected(option, function (tokenNumber, option) {
                vest.token.relayRaonGetCert(tokenNumber, "NONE", option, function (result) {
                    callback(result);
                }, function (error) {
                    if (error.code === 22003) {
                        //alert("보내는 단말에 인증번호를 입력해주세요.");
                        vest.error.getErrorMessage(error.code, config.language)
                        callStorageSelected(option, callback, errorcallback);
                    }
                    else {
                        errorcallback(error);
                    }
                });
            }, function (error) {
                certError(error, callback);
            });
        };

        loadingLibrary(function () {
            option.relayIP = config.relay.serviceIP;
            option.relayPort = config.relay.servicePort;
            option.siteCode = config.relay.siteCode;
            vest.util.setObject.center(option);
            vest.token.relayRaonGetRefNum(0, "NONE", option, function (refNum) {
                option.refNum = refNum;
                yettie.init(config);
                yettie.relayImport(option, function (option) {
                    yettie.storageSelected(option, function (tokenNumber, option) {
                        vest.token.relayRaonGetCert(tokenNumber, "NONE", option, function (result) {
                            callback(result);
                        },  function (error) {
                            certError(error, callback);
                        });
                    }, function (error) {
                        certError(error, callback);
                    });
                    //callStorageSelected(option, callback, function(error){certError(error, callback)});
                }, function (error) {
                    certError(error, callback);
                });
            }, function (error) {
                certError(error, callback);
            });
        });
    }

    function Identify(dn, idn, callback) {
        //config.title = "인증서 선택";
        config.title = signTitle.SELECT;
        config.ablePwd = true;
        config.disableToken = false;
        kos_var.userID = dn;
        config.kos_var = kos_var;
        yettie.init(config);

        var callVerifyVID = function (tokenNumber, identifier, password, idn) {
            vest.util.setObject.center(option);
            vest.token.verifyVID(tokenNumber, identifier, password, idn, callback, function (error) {
                certError(error, callback);
            })
        };

        loadingLibrary(function () {
            callSign(false, function (tokenNumber, identifier, password) {
                kos_var.matchedIdentifier = '';
                kos_var.userID = '';
                if (typeof(idn) === "undefined" || idn == "" || idn == null) {
                    yettie.identify(function (idn) {
                        callVerifyVID(tokenNumber, identifier, password, idn);
                    }, function (error) {
                        certError(error, callback);
                    });
                }
                else {
                    callVerifyVID(tokenNumber, identifier, password, idn);
                }
            });
        })
    }

    function UcpidReqUser(dn, pszPassword, userArgmnt, mode, callback) {
        var ucpid;
        var error = {};

        //config.title = "인증서 선택";
        config.title = signTitle.SELECT;
        if (!(pszPassword == '' || pszPassword == 'undefined'))
            config.ablePwd = false;

        config.disableToken = false;
        kos_var.userID = dn;

        if (userArgmnt == '' || userArgmnt == 'undefined') {
            error.code = 90101;
            //error.message = 'The argument value is invalid.(userAgreement)';
            error.message = vest.error.getErrorMessage(error.code, config.language);
            certError(error, callback);
            return;
        }
        if (typeof(mode) != 'number' || mode == 0) {
            error.code = 90102;
            //error.message = 'The argument value is invalid.(mode)';
            error.message = vest.error.getErrorMessage(error.code, config.language);
            certError(error, callback);
            return;
        }


        loadingLibrary(function () {
            //이름: 1, 생일: 8,성별: 2, 국적: 4
            var realName, birthDate, gender, nationalInfo;

            realName = (mode & 0x00000001) == 1 ? 1 : 0;
            birthDate = (mode & 0x00000008) == 8 ? 1 : 0;
            gender = (mode & 0x00000002) == 2 ? 1 : 0;
            nationalInfo = (mode & 0x00000004) == 4 ? 1 : 0;

            var options = {
                realName: realName,
                birthDate: birthDate,
                gender: gender,
                nationalInfo: nationalInfo,
                charset: option.encoding
            };
            try {
                ucpid = vest.pki.generateUCPID(userArgmnt, options);
            } catch (e) {
                //ucpid문 생성 실패
                error.code = 90100;
                error.message = e.message();
                certError(error, callback);
            }

            callSign(false, function (tokenNumber, identifier, password, option) {
                vest.util.setObject.center(option);
                option.bytes = true;
                if (!(pszPassword == '' || pszPassword == 'undefined')) password = pszPassword;
                vest.token.makeSignature(tokenNumber, password, identifier, ucpid, option, function (result) {
                    kos_var.use = false;
                    callback(result.signature)
                }, function (error) {
                    certError(error, callback);
                });
            }, function (error) {
                certError(error, callback);
            });
        });
    }

    function envelop(nSessionID, envelopData, b64Certificate, dn, opFlag) {
        callSign(false, function (tokenNumber, identifier, password, option) {
            vest.util.setObject.center(option);
            vest.token.envelope(tokenNumber, b64Certificate, identifier, envelopData, undefined, option, function (result) {

                if ((opFlag & 0x00000001) == 1) {
                }
                if ((opFlag & 0x000000F0) == 16) {
                }
                if ((opFlag & 0x00000F00) == 256) {
                }
                callback(result)
            }, function (error) {
                certError(error, callback);
            });
        }, function (error) {
            certError(error, callback);
        });
    }

    function develop(b64EnvelopedData, dn, password, opFlag) {

    }

    function base64ToHex(base64) {
        return vest.util.base64ToHex(base64);
    }

    function hexToBase64(hex) {
        return vest.util.hexToBase64(hex);
    }

    function SetConfigMedia(num, enable, callback){
        loadingLibrary(function () {
            var _obj = {}, _configFile = {};
            var _enable = enable == 1 ? 'off' : 'on';

            if((num & 0x0000000F) == 1){
                _obj.Removable = _enable;
            }
            if((num & 0x00000F00) == 256){
                _obj.HSM = _enable;
            }
            if((num & 0x0000F000) == 4096){
                _obj.ICCard = _enable;
            }

            _configFile.MediaConf = _obj;
            vest.token.setConfigFile(_configFile, callback, function(error){
                certError(error, callback);
            });
        });
    }

    function SetMatchedContextExipreCheck (flag) {
        kos_var.matchedExipreCheck = flag;
    }

    function SetKeySaferModeEtc (boo, mode) {
        kos_var.keySaferEtc.flag = boo;
        kos_var.keySaferEtc.mode = keyVendor[mode];
    }

    return {
        //signBtnEvent: signBtnEvent,
        CertManager_Issue: CertManager_Issue,
        CertManager_Suspend: CertManager_Suspend,
        CertManager_Revoke: CertManager_Revoke,
        CertManager_CertNew: CertManager_CertNew,
        CertManager_Status: CertManager_Status,
        CertManager_ChangePassword: CertManager_ChangePassword,
        ChangeStorageMedia: ChangeStorageMedia,
        RemoveFromMedia: RemoveFromMedia,
        VerifyPassword: VerifyPassword,
        ExportP12: ExportP12,
        ImportP12: ImportP12,

        GetPCIdentity: GetPCIdentity,
        UnSetMatchedContext: UnSetMatchedContext,
        SetMatchedContext: SetMatchedContext,
        SetMatchedContextExt: SetMatchedContextExt,

        GetLastErrorCode: GetLastErrorCode,
        GetLastErrorMsg: GetLastErrorMsg,
        GetToken: GetToken,
        SetDeviceOrder: SetDeviceOrder,
        SetExipreCheckSkip: SetExipreCheckSkip,
        SetDeviceViewOrder: SetDeviceViewOrder,
        SetPolicyFilter: SetPolicyFilter,

        VerifyDataB64: VerifyDataB64,
        VerifyCmsDataB64: VerifyCmsDataB64,
        VerifyData_ne_B64: VerifyData_ne_B64,
        SignDataB64: SignDataB64,
        SignData_ne_B64: SignData_ne_B64,

        SetServiceMode: SetServiceMode,

        SetLanguageMode: SetLanguageMode,
        SetKeySaferMode: SetKeySaferMode,
        SetWebAccMode: SetWebAccMode,
        // 추가
        SetCertNewUrlInfo: SetCertNewUrlInfo,
        ShowConfigMenuX: ShowConfigMenuX,
        TrayOn: trayOn,
        TrayOff: trayOff,
        CertServiceSetup: certServiceSetup,
        doubleClickBlock: doubleClickBlock,
        SetInfoPage: SetInfoPage,
        GetMacAddress: GetMacAddress,

        // 미구현
        SignDataNextB64: SignDataNextB64,
        SetScanByDialogChoiceMode: SetScanByDialogChoiceMode,
        SetWrongPasswordLimit: SetWrongPasswordLimit,
        SetPasswordEncMode: SetPasswordEncMode,
        SetSessionServicePort: SetSessionServicePort,
        ClearSessionService: ClearSessionService,
        RemoveLF: RemoveLF,

        //  relay 관련
        relayExport: relayExport,
        relayImport: relayImport,

        //2015.12
        Identify: Identify,
        CertManager_KeyNew: CertManager_KeyNew,

        //2015.01
        UcpidReqUser: UcpidReqUser,

        //2016.02 일정밀림. 우전 외부오픈 안함
        //Envelop: envelop,
        //Develop: develop

        //2016.03.29 2.1.1 반영예정
        P2X: base64ToHex,
        X2P: hexToBase64,
        SetConfigMedia: SetConfigMedia,

        // 2.1.2 추가
        SetMatchedContextExipreCheck: SetMatchedContextExipreCheck,
        SetKeySaferModeEtc : SetKeySaferModeEtc
    }

})();

typeof(console) === "object" ? console.log('koscom end') : '';