define("./index", ["./widgets/utils/date", "./widgets/extension/extension", "./widgets/config/config", "./widgets/station/index", "./widgets/datePicker/datePicker", "./widgets/identity/identity", "./widgets/passenger/passenger", "./widgets/priorityTrain/priorityTrain", "./widgets/prioritySeats/prioritySeats", "./widgets/advance/advance", "./widgets/alternativeDate/alternativeDate", "./widgets/autoSubmit/manualSubmit", "./widgets/brush/brush", "./widgets/login/login", "./widgets/submit/submit", "./widgets/events/events", "./widgets/sortByStartTime/sortByStartTime", "./widgets/sortByTicketCount/sortByTicketCount", "./widgets/errorlog/errorlog", "./widgets/seatType/seatType", "./widgets/updateDynamicJs/updateDynamicJs", "./widgets/notice/notice", "./widgets/notice/dateNotice", "./widgets/mobile/mobile", "./widgets/transit/transit", "./widgets/utils/floating"], function(t) {
    "use strict";
    $(function() {
        t("./widgets/utils/date");
        var e = t("./widgets/extension/extension")
          , n = t("./widgets/config/config")
          , i = t("./widgets/station/index")
          , a = t("./widgets/datePicker/datePicker")
          , s = t("./widgets/identity/identity")
          , o = t("./widgets/passenger/passenger")
          , r = t("./widgets/priorityTrain/priorityTrain")
          , c = t("./widgets/prioritySeats/prioritySeats")
          , u = t("./widgets/advance/advance")
          , l = t("./widgets/alternativeDate/alternativeDate")
          , d = t("./widgets/autoSubmit/manualSubmit")
          , h = t("./widgets/brush/brush")
          , g = t("./widgets/login/login")
          , p = t("./widgets/submit/submit");
        t("./widgets/events/events");
        var f = t("./widgets/sortByStartTime/sortByStartTime")
          , y = t("./widgets/sortByTicketCount/sortByTicketCount")
          , m = t("./widgets/errorlog/errorlog")
          , x = t("./widgets/seatType/seatType");
        t("./widgets/updateDynamicJs/updateDynamicJs");
        var b = t("./widgets/notice/notice")
          , _ = t("./widgets/notice/dateNotice")
          , w = t("./widgets/mobile/mobile");
        t("./widgets/transit/transit");
        var v = t("./widgets/utils/floating")
          , z = location.href;
        !function() {
            var t = "http://dd.browser.360.cn/static/a/131.1652.gif?_" + Math.random()
              , e = "http://dd.browser.360.cn/static/a/131.8580.gif?_" + Math.random()
              , n = "src=ext"
              , i = new Image;
            if (i.src = t,
            (new Image).src = "http://dd.browser.360.cn/static/a/377.2932.gif?" + Math.random(),
            -1 !== z.indexOf(n)) {
                var a = new Image;
                a.src = e
            }
        }
        ();
        var D = !1
          , k = !1
          , T = function() {
            if (k = "" !== window.name,
            D || k)
                return !1;
            window.name = "isopened",
            D = !0;
            var t = !0
              , e = decodeURIComponent(location.href).replace(/[\s]*/g, "")
              , n = e.match(/from=([\w]+)/)
              , i = e.match(/to=([\w]+)/)
              , a = e.match(/date=([\d]{13}|[\d]{4}[-\/]?[\d]{2}[-\/]?[\d]{2})/)
              , s = e.match(/train_code=([\w]?[\d]+)/);
            return t && {
                from: n && n[1],
                to: i && i[1],
                date: a && a[1],
                tranCode: s && s[1]
            }
        }
        ;
        g.init(),
        m.init(),
        n.init(function() {
            var t = T();
            if (t.date && n.setByKey("forwardDate", t.date),
            t.from && i.getCityName(t.from) && n.setByKey("FROM_STATION", i.getCityName(t.from)),
            t.to && i.getCityName(t.to) && n.setByKey("TO_STATION", i.getCityName(t.to)),
            t.tranCode && t.from && i.getCityName(t.from) && t.to && i.getCityName(t.to)) {
                var e = t.from + "_" + t.to
                  , m = n.get("priorityTrains") || {};
                m[e] = m[e] || [],
                -1 == m[e].indexOf(t.tranCode) && m[e].push(t.tranCode),
                n.setByKey("priorityTrains", m)
            }
            new a("forwardDate",{
                selector: "#date_forward_text",
                btnSelector: "#date_forward_icon",
                paramDate: t.date
            }).init(),
            o.init({
                targetSelector: ".btn-passenger",
                panelSelector: "#passenger_panel",
                containerSelector: "#passenger_container"
            }),
            f.init(),
            y.init(),
            r.init(),
            c.init(),
            s.init(),
            h.init(),
            u.init("online" == g.getStatus().status),
            l.init({
                targetSelector: ".btn-dates",
                panelSelector: "#dates_panel",
                containerSelector: "#dates_container"
            }),
            d.init(),
            p.init(),
            x.init();
            var z = !1;
            setTimeout(function() {
                z || (z = !0,
                i.init())
            }
            , 1e3),
            b.init({}),
            _.init(),
            w.init(),
            v.init()
        }
        ),
        window.__incognitoTest__ = function() {
            e.sendMessage({
                type: "sendMessage",
                settings: {
                    type: "isIncognito"
                }
            }, function(t) {
                console.warn("incognito", t),
                e.sendMessage({
                    type: "sendMessage",
                    settings: {
                        type: "openIncognito",
                        url: location.href
                    }
                }, function() {
                    console.warn("Opened in incogcognito window!")
                }
                )
            }
            )
        }
    }
    ),
    console.log = function() {}
}
);
"use strict";
define("./widgets/utils/date", [], function() {
    Date.prototype.pattern = function(t) {
        var e = {
            "M+": this.getMonth() + 1,
            "d+": this.getDate(),
            "h+": this.getHours(),
            "H+": this.getHours(),
            "m+": this.getMinutes(),
            "s+": this.getSeconds(),
            "q+": Math.floor((this.getMonth() + 3) / 3),
            S: this.getMilliseconds()
        }
          , s = {
            0: "日",
            1: "一",
            2: "二",
            3: "三",
            4: "四",
            5: "五",
            6: "六"
        };
        /(y+)/.test(t) && (t = t.replace(RegExp.$1, this.getFullYear().toString().substr(4 - RegExp.$1.length))),
        /(E+)/.test(t) && (t = t.replace(RegExp.$1, (RegExp.$1.length > 1 ? RegExp.$1.length > 2 ? "星期" : "周" : "") + s[this.getDay().toString()]));
        for (var g in e)
            e.hasOwnProperty(g) && new RegExp("(" + g + ")").test(t) && (t = t.replace(RegExp.$1, 1 === RegExp.$1.length ? e[g] : ("00" + e[g]).substr(("" + e[g]).length)));
        return t
    }
}
);
define("./widgets/extension/extension", [], function(t, e, n) {
    "use strict";
    var i = {};
    !function(t) {
        function e() {
            for (var t = "", e = 1; 32 >= e; e++)
                t += Math.floor(16 * Math.random()).toString(16),
                (8 == e || 12 == e || 16 == e || 20 == e) && (t += "-");
            return t
        }
        function n(t, e) {
            var n = a;
            e = e || g;
            for (var i = 0, r = u.length; r > i; i++)
                if (u[i].guid === t) {
                    n = u.splice(i--, 1),
                    "[object Array]" == Object.prototype.toString.call(n) && (n = n[0]),
                    n = n[e];
                    break
                }
            return n
        }
        function i(t, e) {
            e = e || 1500,
            o(t, e),
            t.origin = "actual_page",
            t = JSON.parse(JSON.stringify(t)),
            window.postMessage(t, location.href)
        }
        function r(t) {
            var e = t.guid
              , i = t.callbackName || g
              , r = n(e, i) || a
              , o = t.result;
            o = o instanceof Array ? o : [o],
            r.apply(this, o)
        }
        function o(t, e) {
            setTimeout(function() {
                "ajax" === t.type && (t.callbackName = "error",
                t.result = [null , "error", "content script not back"]),
                r(t)
            }
            , e)
        }
        var s = function(t) {
            this.guid = t
        }
        ;
        s.prototype.abort = function() {
            n(this.guid)
        }
        ;
        var a = function() {}
          , g = "anonymous"
          , u = [];
        window.addEventListener("message", function(t) {
            var e = t.data;
            e.type;
            var n = e.guid;
            "actual_page" !== e.origin && n && r(e)
        }
        , !1),
        t.ajax = function(t) {
            var n = {}
              , r = !1
              , o = e();
            for (var a in t)
                t.hasOwnProperty(a) && "function" == typeof t[a] && (n[a] = t[a],
                r = !0);
            n.guid = o,
            r && u.push(n);
            var g = t.timeout ? t.timeout + 1500 : 11500
              , c = {
                type: "ajax",
                guid: o,
                settings: t
            };
            return window.DynamicJS && "function" == typeof window.DynamicJS.addSig && (c.settings = DynamicJS.addSig(c.settings.url, c.settings)),
            i(c, g),
            new s(o)
        }
        ,
        t.sendMessage = function(t, n) {
            var r = e();
            if ("function" == typeof n) {
                var o = {};
                o[g] = n,
                o.guid = r,
                u.push(o)
            }
            t.guid = r,
            t.settings.timeout = t.settings.timeout || 1500,
            i(t, t.settings.timeout)
        }
    }
    (i),
    Object.preventExtensions(i),
    n.exports = i
}
);
"use strict";
define("./widgets/config/config", ["./../extension/extension", "./../login/login"], function(t, e, n) {
    var o = {}
      , i = function() {}
    ;
    !function(e) {
        function n(t) {
            for (var e in t)
                if (t.hasOwnProperty(e) && t[e])
                    return !1;
            return !0
        }
        function o(t) {
            var e = localStorage.getItem(s)
              , o = localStorage.getItem(a) || "{}";
            if (e)
                c = JSON.parse(e),
                t(c);
            else {
                var i = setTimeout(function() {
                    i = null ,
                    c = JSON.parse(o),
                    localStorage.setItem(s, o),
                    t(c)
                }
                , 1e3);
                l.sendMessage({
                    type: "getConfig",
                    userName: s,
                    settings: {}
                }, function(e) {
                    c = n(e) ? JSON.parse(o) : e,
                    localStorage.setItem(s, JSON.stringify(c)),
                    i && (clearTimeout(i),
                    i = null ,
                    t(c))
                }
                )
            }
        }
        function r(t) {
            var e = +localStorage.getItem(g)
              , n = +new Date
              , o = JSON.stringify(c);
            h ? localStorage.setItem(s, o) : p && localStorage.setItem(a, o),
            h && n - e >= u ? l.sendMessage({
                type: "setConfig",
                userName: s,
                settings: c
            }, t) : t(c)
        }
        var a = "default_user_name"
          , s = a
          , g = "last_store_time_key"
          , u = 6e5
          , c = {}
          , l = t("./../extension/extension")
          , f = t("./../login/login")
          , p = !0
          , h = !1;
        e.init = function(t) {
            t = t || i;
            var e = setTimeout(function() {
                console.log("loginstatuschange timeout"),
                o(t)
            }
            , 300);
            f.checkUser(),
            $(document).on("loginstatuschange", function(n, i) {
                clearTimeout(e),
                e = null ,
                console.log("loginstatuschange", i),
                h = "online" === i.status,
                h ? (p = !1,
                s !== a && i.name !== s && $(document).trigger("userchange"),
                s = i.name || s,
                o(t)) : p ? (c = JSON.parse(localStorage.getItem(a) || "{}"),
                t(c)) : (delete c.passengers,
                t(c))
            }
            )
        }
        ,
        e.setByKey = function(t, n, o) {
            var i = {};
            i[t] = n,
            e.set(i, o)
        }
        ,
        e.set = function(t, e) {
            e = e || i;
            for (var n in t)
                t.hasOwnProperty(n) && (c[n] = t[n]);
            r(e)
        }
        ,
        e.get = function(t, e) {
            var n = c ? c[t] : null ;
            return "function" == typeof e && e(n),
            n
        }
        ,
        e.getAll = function(t) {
            return "function" == typeof t && t(c),
            c
        }
        ,
        e.getPreDays = function(t) {
            t = t || +new Date;
            var e = 14173632e5
              , n = 14174496e5
              , o = 14178816e5
              , i = 864e5
              , r = new Date(2016,11,1)
              , a = new Date(2016,10,1);
            return t >= r ? 29 : t >= a ? 29 + Math.floor((r - t) / i) : t >= o ? 59 : t >= n ? 29 + 6 * Math.floor((t - n) / i + 1) : t >= e ? 29 : 19
        }
        ,
        e.getStuPreDays = function(t) {
            t = t || +new Date;
            var n = new Date(2016,11,15).getTime()
              , o = new Date(2017,1,27).getTime()
              , i = e.getPreDays(t)
              , r = 864e5
              , a = t + i * r
              , s = 0;
            return s = a >= n && o >= a ? Math.floor((o - a) / r) : 0
        }
    }
    (o),
    Object.preventExtensions(o),
    n.exports = o
}
);
define("./widgets/login/login", ["./../captcha/captcha", "../settings/settings", "../utils/shareCaptcha", "../updateDynamicJs/updateDynamicJs", "../extension/extension"], function(e, t, n) {
    "use strict";
    function o() {
        var e = [];
        for (var t in Y) {
            var n = Y[t];
            e.push(Math.floor(n.x)),
            e.push(Math.floor(n.y - 30))
        }
        return e.join(",")
    }
    function i(e) {
        var t = $(e).offset();
        return {
            x: t.left,
            y: t.top
        }
    }
    function a(e) {
        return {
            x: e.pageX,
            y: e.pageY
        }
    }
    function s(e, t) {
        if ("data:image/" == z.attr("src").substr(0, 11)) {
            var n = 32
              , o = $("<div></div>").css({
                position: "absolute",
                width: n + "px",
                height: n + "px",
                borderRadius: n + "px",
                left: t.x - n / 2 - 10 + "px",
                top: t.y - n / 2 + "px"
            }).attr("class", "randcode-dot").on("click", function() {
                delete Y[t.id],
                $(this).remove()
            }
            );
            Y[t.id] = t,
            e.append(o)
        }
    }
    function r(e) {
        return e.y > 30
    }
    function u(e) {
        var t = N.find(".img-wrapper")
          , n = i(t)
          , o = a(e)
          , u = {
            x: o.x - n.x,
            y: o.y - n.y
        };
        u.id = u.x + "-" + u.y,
        r(u) && s(t, u)
    }
    function c(e) {
        if (V === !0)
            return "function" == typeof e && e({
                code: "logging",
                msg: "正在登录"
            }),
            void 0;
        H && clearTimeout(H),
        H = setTimeout(function() {
            V = !1
        }
        , 1e4),
        V = !0;
        var t = e || function() {}
        ;
        return e = function() {
            V = !1,
            t.apply(null , arguments)
        }
        ,
        R.autoLogin ? (setTimeout(function() {
            if (!l())
                return "function" == typeof e && e({
                    code: "notinput",
                    msg: "请输入用户名密码"
                }),
                void 0;
            var t = $(".error_tips_randcode").text("");
            if (!J.is(":focus") && R.autoLoginRec) {
                t.text("正在自动识别验证码...");
                var n = $(".randcode-select");
                n.show(),
                x(function(i) {
                    var a = n.find(".auto-rec").show()
                      , r = !1;
                    a.find(".stop-auto-rec").off("click").on("click", function() {
                        r = !0,
                        t.text(""),
                        a.hide()
                    }
                    ),
                    q.checkCode({
                        module: "login",
                        imgdata: i,
                        no_check: !0,
                        callback: function(n) {
                            if (!r) {
                                if (t.text(""),
                                a.hide(),
                                n.code)
                                    for (var i = N.find(".img-wrapper"), u = n.code.split(","), c = 0; c < u.length; c += 2) {
                                        var g = u[c]
                                          , f = parseInt(u[c + 1]) + 30
                                          , p = {
                                            x: g,
                                            y: f
                                        };
                                        p.id = p.x + "-" + p.y,
                                        s(i, p)
                                    }
                                !n.code || "0000" === n.code || L.is(":focus") || J.is(":focus") && !(J.val().length >= 3) || "" === L.val() || I.is(":focus") || "" === I.val() ? n.code && "0000" !== n.code ? ("" === L.val() || "" === I.val()) && e && e({
                                    code: "emptyvalue",
                                    msg: "用户名或密码为空"
                                }) : "" != n.imgdata ? (t.text("自动识别验证码失败，请手动输入"),
                                T.shareCaptchaAutoFaild(z[0], o(), "login-unidentified", "loginautofailed"),
                                e && e({
                                    code: "randcodeerr",
                                    msg: "自动识别验证码失败"
                                })) : e && e({
                                    code: "getpasscodeerr",
                                    msg: ""
                                }) : l() && d(e)
                            }
                        }
                    })
                }
                )
            } else
                q.stop()
        }
        , 0),
        void 0) : ("function" == typeof e && e({
            code: "notautorec",
            msg: "不自动识别验证码"
        }),
        void 0)
    }
    function l() {
        var e = y();
        return j.verifyLoginUser(e["loginUserDTO.user_name"]) && j.verifyLoginPassword(e["userDTO.password"]) && j.verifyRandCode(e.randCode)
    }
    function d(e, t) {
        if (!B) {
            if (Z.passwordError && L.val() === Z.userName && I.val() === Z.password)
                return I.val(""),
                p(I, "密码错误，请重新输入密码"),
                e && e({
                    msg: "密码错误",
                    code: "pwderr"
                }),
                void 0;
            B = !0;
            var n = $(".error_tips_randcode").text("正在登录，请稍等...")
              , i = "" != o();
            w(t).done(function(i) {
                n.text(""),
                "manual" == t && T.shareCaptcha(z[0], o(), "login"),
                A.init(!0),
                Z.passwordError = !1,
                B = !1,
                X.attr("src", "images/bg_icon.png?" + Math.random()),
                e && e(null , i)
            }
            ).fail(function(t) {
                n.text(""),
                t = -1 != t.indexOf("randCode") ? "验证码不正确！" : t,
                i || (t = "请点击选择验证码"),
                Z.passwordError = !1,
                B = !1,
                console.log("fail:" + t),
                "string" == typeof t && -1 == t.indexOf("验证码不正确") && -1 == t.indexOf("网络") && J.data("manual") === !0 && T.shareCaptcha(z[0], o(), "login"),
                "string" == typeof t && -1 != t.indexOf("密码输入错误") ? (Z.passwordError = !0,
                Z.errorMsg = t,
                Z.userName = L.val(),
                Z.password = I.val(),
                p(I, t),
                e && e({
                    msg: "密码错误",
                    code: "pwderr"
                })) : "string" == typeof t && -1 != t.indexOf("登录") ? (e && e({
                    msg: "登录出错",
                    code: "err"
                }),
                p(L, t)) : (e && e({
                    msg: "登录出错",
                    code: "err"
                }),
                W.sendMessage({
                    type: "sendMessage",
                    settings: {
                        type: "getBlockCookies"
                    }
                }, function(e) {
                    e = !1,
                    e === !0 ? (t = '你当前勾选了“阻止第三方Cookie”，请在<a class="btn-open-options" href="chrome://settings/content">设置</a>中取消勾选才能正常抢票',
                    p(L, t, !0)) : p(L, t)
                }
                ))
            }
            )
        }
    }
    function g(e) {
        f();
        var t = l();
        e ? t && d() : t && N.find(".submit").trigger("click")
    }
    function f() {
        N.find(".error_tips").text(""),
        N.find("ul li p input").removeClass("error")
    }
    function p(e, t, n) {
        f();
        var o = N.find(".error_tips_normal");
        n ? o.html(t) : o.text(t),
        e.addClass("error"),
        setTimeout(function() {
            e.removeClass("error")
        }
        , 1500)
    }
    function h(e) {
        var t = $.Deferred()
          , n = {
            randCode: e,
            rand: "sjrand"
        }
          , o = {};
        return o.type = "post",
        o.url = O.url.checkRandCodeAnsyn,
        o.headers = {
            Accept: "text/plain, */*",
            "Content-Type": "application/x-www-form-urlencoded",
            "X-Requested-With": "XMLHttpRequest"
        },
        o.data = n,
        o.success = function(e) {
            console.log(typeof e, e),
            "Y" === e.data || e.data && "1" === e.data.result ? t.resolveWith({}, [!0]) : t.rejectWith({}, [!1])
        }
        ,
        o.error = function() {
            t.rejectWith({}, [!1])
        }
        ,
        W.ajax(o),
        t.promise()
    }
    function m() {
        var e = $.Deferred()
          , t = {};
        return t.type = "get",
        t.dataType = "text",
        t.url = O.url.init,
        t.headers = {
            Accept: "text/plain, */*",
            "Content-Type": "application/x-www-form-urlencoded",
            "X-Requested-With": "XMLHttpRequest"
        },
        t.success = function(t) {
            var n = t.match(/var\s*sessionInit\s*=\s*'(\S+)'/gi);
            n ? (O.status.status = "online",
            O.status.name = $.trim(RegExp.$1),
            e.resolveWith({}, [$.trim(RegExp.$1)])) : (O.status.status = "offline",
            O.status.name = $.trim(RegExp.$1),
            e.rejectWith({}, ["取不到用户名"]))
        }
        ,
        t.error = function() {
            O.status.name && "online" === O.status.status ? e.resolveWith({}, [O.status.name]) : e.rejectWith({}, ["请求出错"])
        }
        ,
        W.ajax(t),
        e.promise()
    }
    function v(e) {
        clearTimeout(O.check_timeout),
        O.check_timeout = setTimeout(function() {
            E()
        }
        , O.autoCheckDuration);
        var t = $.Deferred();
        return k(),
        m().done(function(n) {
            t.resolveWith({}, [n]),
            e || _()
        }
        ).fail(function() {
            O.status.status = "offline",
            t.rejectWith({}, [!1]),
            e || _()
        }
        ),
        t.promise()
    }
    function x(e) {
        Y = {},
        $(".randcode-dot").remove(),
        q.showCaptcha({
            callback: function(t) {
                U = Date.now(),
                e && e(t)
            }
        })
    }
    function F() {
        et = !1;
        var e = $(".error_tips_randcode").text("")
          , t = $(".randcode-select");
        x(function(n) {
            var i = t.find(".auto-rec").show();
            i.find(".stop-auto-rec").off("click").on("click", function() {
                et = !0,
                e.text(""),
                i.hide()
            }
            ),
            q.checkCode({
                module: "login",
                imgdata: n,
                no_check: !0,
                callback: function(t) {
                    if (!et)
                        if (t.code) {
                            for (var n = N.find(".img-wrapper"), a = t.code.split(","), r = 0; r < a.length; r += 2) {
                                var u = a[r]
                                  , c = parseInt(a[r + 1]) + 30
                                  , l = {
                                    x: u,
                                    y: c
                                };
                                l.id = l.x + "-" + l.y,
                                s(n, l)
                            }
                            e.text(""),
                            i.hide(),
                            e.text("已帮您自动识别验证码！")
                        } else
                            e.text(""),
                            i.hide(),
                            t.imgdata && (e.text("自动识别验证码失败，请手动输入"),
                            T.shareCaptchaAutoFaild(z[0], o(), "login-unidentified", "loginautofailed"))
                }
            })
        }
        )
    }
    function y() {
        var e = {};
        return e["loginUserDTO.user_name"] = $.trim(L.val()),
        e["userDTO.password"] = $.trim(I.val()),
        e.randCode = o(),
        e
    }
    function w(e) {
        var t = $.Deferred()
          , n = y()
          , i = {};
        i.type = "post",
        i.url = O.url.loginAysnSuggest,
        i.headers = {
            Accept: "text/plain, */*",
            "Content-Type": "application/x-www-form-urlencoded",
            "X-Requested-With": "XMLHttpRequest"
        },
        i.data = n,
        i.success = function(e) {
            if (e.messages && e.messages.length > 0) {
                var n = /非法请求|第三方/;
                -1 !== e.messages[0].indexOf("验证码不正确") || -1 !== e.messages[0].indexOf("randCode") || e.messages[0].match(/false/i) ? e.messages[0] = "验证码错误" : e.messages[0].match(n) ? e.messages[0] = "登录出错，请刷新页面重试" : e.messages[0].match(/系统繁忙/),
                z.attr("src", ""),
                R.autoLoginRec ? F() : x(),
                t.rejectWith({}, [e.messages[0]])
            } else {
                var o = e.data;
                k(),
                !o || "Y" != o.loginCheck && "Y" != o.isRelogin ? (t.rejectWith({}, ["登录失败，12306服务器不稳定"]),
                _()) : m().done(function(e) {
                    t.resolveWith({}, [e]);
                    for (var n = null ; O.loginCallbacks.length > 0; )
                        n = O.loginCallbacks.shift(),
                        n && $.isFunction(n) && n(e);
                    _()
                }
                ).fail(function() {
                    t.rejectWith({}, ["登录失败，12306服务器不稳定"]);
                    for (var e = null ; O.loginCallbacks.length > 0; )
                        e = O.loginCallbacks.shift(),
                        e && $.isFunction(e) && e(!1);
                    _()
                }
                )
            }
        }
        ,
        i.error = function() {
            t.rejectWith({}, ["登录失败，12306服务器不稳定"])
        }
        ;
        var a = 4500 + 500 * Math.random()
          , s = a - (Date.now() - U);
        return setTimeout(function() {
            h(n.randCode).then(function() {
                W.ajax(i),
                "manual" != e && T.statImgVcode("loginsuccess")
            }
            , function() {
                t.rejectWith({}, ["验证码错误，请重新输入"]),
                "manual" != e && (T.statImgVcode("loginfailed"),
                T.shareCaptchaAutoFaild(z[0], o(), "login", "loginautofailed")),
                R.autoLoginRec ? F() : x()
            }
            )
        }
        , s),
        t.promise()
    }
    function D() {
        var e = $.Deferred();
        return v().done(function(t) {
            e.resolveWith({}, [t])
        }
        ).fail(function() {
            O.loginCallbacks.push(function(t) {
                t ? e.resolveWith({}, [t]) : e.resolveWith({}, [!1])
            }
            )
        }
        ),
        e.promise()
    }
    function _() {
        var e = k();
        "online" == e.status && ($(".randcode-select").hide(),
        N.slideUp(),
        K.removeClass("logout").show(),
        Q.text(e.name).attr("title", e.name),
        G.appendTo("#header_wrapper ul")),
        (e.status != O.last_status.status || e.name != O.last_status.name && "online" === e.status && "online" === O.last_status.status) && (O.last_status = e,
        $(document).trigger("loginstatuschange", e))
    }
    function C() {
        var e = $.Deferred();
        return v(!0).done(function(t) {
            e.resolveWith({}, [t])
        }
        ).fail(function() {
            c(function(t, n) {
                t ? e.rejectWith({}, [t]) : e.resolveWith({}, [n])
            }
            )
        }
        ),
        e.promise()
    }
    function b() {
        var e = $.Deferred()
          , t = {}
          , n = {};
        return n.type = "get",
        n.url = O.url.logout,
        n.headers = {
            Accept: "text/plain, */*",
            "Content-Type": "application/x-www-form-urlencoded",
            "X-Requested-With": "XMLHttpRequest"
        },
        n.data = t,
        n.success = function(t) {
            O.status.status = "offline",
            O.status.name = "",
            e.resolveWith({}, [!0]),
            /var\s*sessionInit\s*=\s*''/gi.test(t) || e.rejectWith({}, [!1]),
            _()
        }
        ,
        n.error = function() {
            e.rejectWith({}, [!1])
        }
        ,
        W.ajax(n),
        e.promise()
    }
    function k() {
        return $.extend({}, O.status)
    }
    function E(e) {
        e = e || !1,
        v().done(function() {}
        ).fail(function() {
            ot(!1, e),
            c()
        }
        )
    }
    function S() {
        R.autoLoginRec || z.attr("src", O.url.randcode),
        E(!0)
    }
    var M = e("./../captcha/captcha")
      , R = e("../settings/settings")
      , T = e("../utils/shareCaptcha")
      , A = e("../updateDynamicJs/updateDynamicJs")
      , O = {
        version: "1.0",
        apiVersion: "otn",
        autoCheckDuration: 12e4,
        status: {
            status: "offline",
            name: ""
        },
        last_status: {
            status: "offline",
            name: ""
        },
        url: {
            randcode: R.protocol + R.hostname + "/otn/passcodeNew/getPassCodeNew?module=login&rand=sjrand",
            checkRandCodeAnsyn: R.protocol + R.hostname + "/otn/passcodeNew/checkRandCodeAnsyn",
            loginAysnSuggest: R.protocol + R.hostname + "/otn/login/loginAysnSuggest",
            logout: R.protocol + R.hostname + "/otn/login/loginOut",
            init: R.protocol + R.hostname + "/otn/queryAgencySellTicket/init",
            checkUser: R.protocol + R.hostname + "/otn/login/checkUser",
            loginJs: R.protocol + R.hostname + "/otn/leftTicket/init"
        },
        loginCallbacks: []
    }
      , j = {
        loginMessages: {
            randCodeError: "验证码错误!",
            randCodeLentgh: "验证码长度为4位!",
            randCodeFormat: "验证码只能由数字或字母组成!",
            randCodeEmpty: "验证码不能为空!",
            userNameEmpty: "登录名必须填写!",
            userNameFormat: "登录名格式不正确，请重新输入!",
            passwordEmpty: "密码必须填写,且不少于6位!",
            passwordLength: "密码长度不能少于6位!",
            loginError: "当前访问用户过多,请稍候重试!"
        },
        verifyLoginUser: function(e) {
            if ("" == e || null  == e)
                return p(L, j.loginMessages.userNameEmpty),
                !1;
            var t = /^(13[0-9])|(14[0-9])|(15[0-9])|(18[0-9])|(17[0-9])\d{8}$/
              , n = /^[A-Za-z]{1}([A-Za-z0-9]|[_]){0,29}$/
              , o = /^((([a-z]|\d|[!#\$%&'\*\+\-\/=\?\^_`{\|}~]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])+(\.([a-z]|\d|[!#\$%&'\*\+\-\/=\?\^_`{\|}~]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])+)*)|((\x22)((((\x20|\x09)*(\x0d\x0a))?(\x20|\x09)+)?(([\x01-\x08\x0b\x0c\x0e-\x1f\x7f]|\x21|[\x23-\x5b]|[\x5d-\x7e]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(\\([\x01-\x09\x0b\x0c\x0d-\x7f]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]))))*(((\x20|\x09)*(\x0d\x0a))?(\x20|\x09)+)?(\x22)))@((([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])*([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])))\.)+(([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])*([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])))$/i;
            return n.test(e) || o.test(e) || t.test(e) ? !0 : (p(L, j.loginMessages.userNameFormat),
            !1)
        },
        verifyLoginPassword: function(e) {
            var t = !0;
            return "" == e || null  == e ? (p(I, j.loginMessages.passwordEmpty),
            !1) : 6 > e.length ? (p(I, j.loginMessages.passwordLength),
            !1) : t
        },
        verifyRandCode: function(e) {
            return e.split(",").length > 0
        }
    }
      , W = e("../extension/extension")
      , N = $("#login_wrapper_outer");
    N.find("a").attr("hidefocus", "");
    var L = N.find('input[name="user_name"]').attr("maxlength", 50)
      , I = N.find('input[name="user_password"]').attr("maxlength", 50)
      , J = N.find('input[name="user_randcode"]')
      , z = N.find(".randcode_wrapper img")
      , P = N.find(".randcode_wrapper .change_randcode");
    N.find("a.submit");
    var U = Date.now()
      , q = new M({
        imgSelector: z,
        iptSelector: J,
        check: "sjrand",
        no_check: !0,
        maxRetry: 1
    })
      , X = $("<iframe></iframe>").css({
        position: "absolute",
        "z-index": "-1",
        opacity: "0",
        top: "-100px",
        height: "0px"
    }).appendTo("body");
    N.on("keypress", 'input[name="user_randcode"]', function() {
        $(this).data("manual", !0),
        setTimeout(g, 10)
    }
    ).on("keydown", "input", function(e) {
        $(this).text(""),
        13 == e.which ? setTimeout(g, 10) : f()
    }
    ),
    L.on("blur", function() {
        j.verifyLoginUser(y()["loginUserDTO.user_name"])
    }
    ),
    N.find("#login_form").on("submit", function(e) {
        console.log("submit..."),
        e.preventDefault(),
        f(),
        l() && d(null , "manual")
    }
    ),
    I.on("blur", function() {
        j.verifyLoginPassword(y()["userDTO.password"])
    }
    ),
    L.add(I).on("click", function() {
        if (R.autoLoginRec) {
            var e = $(".randcode-select");
            e.is(":visible") || (e.show(),
            F())
        }
    }
    ),
    z.add(P.on("click", function() {
        $(".error_tips_randcode").text(""),
        x()
    }
    )),
    $(".randcode-start").on("click", function() {
        var e = $(".randcode-select");
        e.is(":visible") ? (et = !0,
        e.hide()) : (e.show(),
        R.autoLoginRec ? F() : x())
    }
    ),
    N.find(".img-wrapper img").on("click", function(e) {
        u(e)
    }
    ),
    N.delegate(".btn-open-options", "click", function() {
        return W.sendMessage({
            type: "sendMessage",
            settings: {
                type: "openPage",
                url: $(this).attr("href")
            }
        }),
        !1
    }
    );
    var H, Y = {}, V = !1, B = !1, Z = {
        passwordError: !1,
        errorMsg: "",
        userName: "",
        password: ""
    }, K = $("#header_wrapper_outer"), G = $('<li style="position:relative;" class="user_box">    <a class="username"></a>    <div id="user_box" style="display:none;">    <a class="logout" style="">退出</a>    </div>    </li>');
    G.remove(),
    K.on("mouseenter", ".user_box", function() {
        $("#user_box").show()
    }
    ).on("mouseleave", ".user_box", function() {
        $("#user_box").hide()
    }
    ).on("click", ".logout", function() {
        b()
    }
    );
    var Q = G.find(".username")
      , et = !1;
    n.exports = {
        afterLogin: D,
        logout: b,
        getStatus: k,
        checkUser: v,
        init: S,
        login: C
    };
    var tt = -1
      , nt = 0
      , ot = function(e) {
        O.status.status = "offline",
        f(),
        $("#login_highlight_bg").hide(),
        $("#user_box").hide(),
        G.remove(),
        K.addClass("logout"),
        N.slideDown(),
        clearInterval(tt),
        nt = 0,
        e && (p(L, "请先登录12306账号"),
        $("#login_highlight_bg").css({
            opacity: .2
        }).show().animate({
            opacity: 1
        }, 200, function() {
            $("#login_highlight_bg").animate({
                opacity: .2
            }, 200, function() {
                $(this).hide()
            }
            )
        }
        ),
        tt = setInterval(function() {
            ++nt > 0 && clearInterval(tt),
            $("#login_highlight_bg").css({
                opacity: .2
            }).show().animate({
                opacity: 1
            }, 200, function() {
                $("#login_highlight_bg").animate({
                    opacity: .2
                }, 200, function() {
                    $(this).hide()
                }
                )
            }
            )
        }
        , 600))
    }
    ;
    $(document).on("loginstatuschange", function(e, t) {
        console.log("=====on.loginstatuschange=======", t),
        "online" == t.status ? (O.status.status = "online",
        O.status.name = t.name,
        N.slideUp(),
        K.removeClass("logout").show(),
        Q.text(t.name).attr({
            title: t.name
        }),
        G.appendTo("#header_wrapper ul")) : ot()
    }
    ),
    $(document).on("logintimeout", function() {
        O.status.status = "offline",
        _()
    }
    )
}
);
"use strict";
define("./widgets/captcha/captcha", ["./../extension/extension", "../settings/settings", "../updateDynamicJs/updateDynamicJs"], function(e, t, n) {
    var o = e("./../extension/extension")
      , a = e("../settings/settings")
      , i = e("../updateDynamicJs/updateDynamicJs")
      , s = function(e) {
        if (!e)
            return e;
        e = e.replace(/[\(\)]/g, "");
        for (var t = e.split(","), n = [], o = 0; o < t.length / 2; o++)
            n.push(parseInt(t[2 * o]) - 0),
            n.push(parseInt(t[2 * o + 1]) - 0);
        return n.join(",")
    }
      , r = function(e) {
        e = e || {},
        this.url = e.url || a.protocol + a.hostname + "/otn/passcodeNew/getPassCodeNew?module=login",
        this.check = e.check || "sjrand",
        this.no_check = e.no_check === !0,
        this.check_url = a.protocol + a.hostname + "/otn/passcodeNew/checkRandCodeAnsyn",
        this.$img = e.imgSelector ? $(e.imgSelector) : [],
        this.$input = e.iptSelector ? $(e.iptSelector) : [],
        this.timeout = e.timeout || 1e4,
        this.maxRetry = e.maxRetry || 5,
        this._stop = !1
    }
    ;
    r.prototype.stop = function(e) {
        var t = this;
        this.__onStop = function() {
            this.__onStop = null ,
            e && e()
        }
        ,
        this._stop === !0 ? this.__onStop() : (t._stop = !0,
        this.__onStop())
    }
    ,
    r.prototype.auto_ = function(e, t) {
        e = e || {};
        var n = this
          , i = "getCaptcha"
          , r = {
            success: !1,
            code: "0000"
        }
          , c = {
            check: e.check || n.check,
            url: (e.url || n.url) + "&rand=" + this.check + "&" + Math.random(),
            method: e.method || "GET",
            no_check: e.no_check || n.no_check,
            timeout: e.timeout || n.timeout,
            check_url: a.protocol + a.hostname + "/otn/passcodeNew/checkRandCodeAnsyn",
            module: e.module
        };
        console.log("第 " + (n.retry + 1) + " 次尝试自动识别验证码..."),
        o.sendMessage({
            type: i,
            settings: c
        }, function(o) {
            o && "0000" != o.code && (o.code = s(o.code)),
            o = o || r,
            ++n.retry,
            "0000" === o.code || o.code.length > 0 || n.retry >= n.maxRetry || n._stop ? n._stop || t(o) : setTimeout(function() {
                n.auto_(e, t)
            }
            , 1e3 * (2 + Math.random()))
        }
        )
    }
    ,
    r.prototype.auto = function(e, t) {
        e = e || {};
        var n = this;
        n.retry = 0,
        n._stop = !1,
        n.auto_(e, function(o) {
            console.log(o),
            n.$img.length > 0 && o.imgdata && n.$img.attr("src", "data:image/png;base64," + o.imgdata),
            n.$input.length > 0 && o.code && o.code.length >= 3 && "0000" !== o.code && (o.success || n.no_check || e.no_check) && n.$input.val(o.code),
            t(o)
        }
        )
    }
    ,
    r.prototype.showCaptcha = function(e) {
        function t() {
            o.sendMessage({
                type: "getCaptcha",
                settings: a
            }, function(t) {
                var o = t && t.imgdata;
                if (n.$img.length > 0) {
                    e.callback && e.callback(o);
                    var i;
                    i = o && "data:" != o.substr(0, 5) ? "data:image/png;base64," + o : "sjrand" == a.check ? "images/captcha_error.png" : "images/captcha_error.png",
                    n.$img.attr("src", i)
                }
            }
            )
        }
        e = e || {};
        var n = this
          , a = {
            check: e.check || n.check,
            url: (e.url || n.url) + "&rand=" + this.check + "&" + Math.random(),
            method: e.method || "GET",
            module: e.module,
            only_getcaptcha: !0,
            timeout: 1e4
        };
        n.$img.attr("src", "../images/captcha_loading.gif"),
        "sjrand" == a.check ? o.sendMessage({
            type: "sendMessage",
            settings: {
                type: "deleteCookies"
            }
        }, function() {
            i.init(!1, t)
        }
        ) : t()
    }
    ,
    r.prototype.checkCode = function(e) {
        e = e || {};
        var t = e.imgdata;
        if (!t || "data:" == t.substr(0, 5)) {
            var n = {
                code: "",
                imgdata: ""
            };
            return e.callback && e.callback(n),
            void 0
        }
        var a = this
          , i = {
            check: e.check || a.check,
            method: e.method || "GET",
            no_check: !0,
            timeout: 1e4
        };
        o.sendMessage({
            type: "checkcode",
            settings: i,
            result: {
                imgdata: e.imgdata
            }
        }, function(t) {
            t.code = s(t.code);
            var n = void 0 !== e.no_check ? e.no_check : a.no_check;
            n ? e.callback && e.callback(t) : setTimeout(function() {
                a.checkOtnCaptcha(t.code, i.check, function(t) {
                    e.callback && e.callback(t)
                }
                )
            }
            , 500 + 1500 * Math.random())
        }
        )
    }
    ,
    r.prototype.checkOtnCaptcha = function(e, t, n, a) {
        if (!e || e.length < 4 || "0000" == e)
            return n({
                code: e,
                success: !1
            }),
            void 0;
        var i = this.check_url;
        "string" != typeof i || i.length < 20 || (a = a || 1e4,
        o.ajax({
            url: i,
            cache: !1,
            data: {
                randCode: e,
                rand: t
            },
            type: "POST",
            timeout: a,
            success: function(t) {
                n({
                    code: e,
                    success: "Y" === t.data || t.data && "1" === t.data.result
                })
            },
            error: function() {
                n({
                    code: "",
                    success: !1
                })
            }
        }))
    }
    ,
    n.exports = r
}
);
define("./widgets/settings/settings", [], function(e, t) {
    t.protocol = "https://",
    t.queryProtocol = "https://",
    t.ipAble = !0,
    t.hostname = "kyfw.12306.cn",
    t.needDynamicJs = !0,
    t.autoLogin = !1,
    t.autoLoginRec = !1,
    t.autoSubmitRec = !1,
    window.extVer,
    window.__super__ = function(e) {
        t[e.key] = e.value
    }
    ,
    t.serverConfig = {},
    $.getJSON("config/config.txt?" + Math.random(), function(e) {
        t.serverConfig = e,
        t.autoLogin = 1 == e.autoLogin,
        t.autoLoginRec = 1 == e.autoLoginRec,
        t.autoSubmitRec = 1 == e.autoSubmitRec
    }
    )
}
);
define("./widgets/updateDynamicJs/updateDynamicJs", ["../extension/extension", "../settings/settings"], function(require, exports, module) {
    function getText(url, callback, opt_retry) {
        opt_retry = opt_retry || 0;
        var options = {
            url: url,
            type: "GET",
            dataType: "text",
            success: function(code) {
                if (callback) {
                    var oldAjax = $.ajax;
                    $.ajax = function(e) {
                        evalVars.url = e.url;
                        var t = {
                            jsv: window.helperVersion
                        };
                        Request.ajax({
                            url: baseUrl + evalVars.url,
                            data: t,
                            type: "POST"
                        })
                    }
                    ;
                    try {
                        eval(code);
                        var sig = submitForm();
                        evalVars.keyValue = sig.split(":::")[0].split(",-,"),
                        2 == evalVars.keyValue.length && seajs.use(dynamicUrl, function() {
                            DynamicJS.setKeyValue2(evalVars.keyValue)
                        }
                        )
                    } catch (e) {}
                    $.ajax = oldAjax,
                    callback(code)
                }
            },
            error: function() {
                opt_retry++,
                maxRetry >= opt_retry ? getText(url, callback, opt_retry) : callback("")
            }
        };
        Request.ajax(options)
    }
    function updateData(e, t) {
        seajs.use(dynamicUrl, function() {
            DynamicJS.addSig(e.url, e.data),
            t && t()
        }
        )
    }
    function analyseCode(e, t) {
        seajs.use(dynamicUrl, function() {
            var n = DynamicJS.getSig(e);
            n.url = n.url || evalVars.url,
            t && t(n)
        }
        )
    }
    function getJsUrl(e, t) {
        var n = /<script.+src=['"](\/otn\/dynamicJs\/[\w]+)['"].+<\/script>/;
        getText(e, function(e) {
            var o = (e.match(n) || {})[1];
            o = o ? baseUrl + o : o,
            t && t(o)
        }
        )
    }
    function updateSig(e, t) {
        Settings.needDynamicJs ? getJsUrl(e, function(e) {
            e ? getText(e, function(e) {
                analyseCode(e, t)
            }
            ) : t && t({})
        }
        ) : "function" == typeof t && t && t({})
    }
    function Analyser(e) {
        this.__url = e
    }
    var Request = require("../extension/extension")
      , Settings = require("../settings/settings")
      , dynamicUrl = "dynamic.js?"
      , maxRetry = 5
      , baseUrl = "https://kyfw.12306.cn"
      , evalVars = {};
    Analyser.prototype.update = function(e) {
        getText(this.__url, function(t) {
            analyseCode(t, e)
        }
        )
    }
    ,
    Analyser.prototype.updateData = function(e, t) {
        updateData(e, t)
    }
    ,
    module.exports = {
        init: function(e, t) {
            var n = e ? "/otn/leftTicket/init" : "/otn/login/init"
              , o = Settings.protocol + Settings.hostname + n;
            updateSig(o, t)
        },
        Analyser: Analyser,
        updateSig: updateSig,
        appendParams: updateData
    }
}
);
"use strict";
define("./widgets/utils/shareCaptcha", ["../extension/extension"], function(e, t, n) {
    var o = {}
      , a = e("../extension/extension");
    !function(e) {
        function t(e, t) {
            a.sendMessage({
                type: "sendMessage",
                settings: {
                    type: "getSig",
                    data: e
                }
            }, t)
        }
        function n(e) {
            var t = document.createElement("canvas")
              , n = t.getContext("2d");
            try {
                t.width = e.naturalWidth,
                t.height = e.naturalHeight,
                n.drawImage(e, 0, 0)
            } catch (o) {}
            return t.toDataURL("image/png").replace("data:image/png;base64,", "")
        }
        e.shareCaptcha = function(e, o, i) {
            var s;
            try {
                s = n(e)
            } catch (r) {}
            s && a.sendMessage({
                type: "sendMessage",
                settings: {
                    type: "getCookie",
                    object: {
                        domain: "kyfw.12306.cn",
                        name: "current_captcha_type"
                    }
                }
            }, function(e) {
                var n = e && e.cookies
                  , r = n && n.length > 0 && n[0].value || "0"
                  , c = {
                    checkcode: "data:image/png;base64," + s,
                    yzm: o,
                    type: r,
                    code_type: i
                };
                try {
                    c = btoa(JSON.stringify(c))
                } catch (u) {}
                c && t(c, function(e) {
                    var t = {
                        data: c,
                        sign: e
                    };
                    a.ajax({
                        type: "POST",
                        url: "http://api.lxqp.360.cn/qiang/piao.php",
                        data: t,
                        success: function() {}
                    })
                }
                )
            }
            )
        }
        ,
        e.shareCaptchaAutoFaild = function(e, o, i, s) {
            var r;
            try {
                r = n(e)
            } catch (c) {}
            r && a.sendMessage({
                type: "sendMessage",
                settings: {
                    type: "getCookie",
                    object: {
                        domain: "kyfw.12306.cn",
                        name: "current_captcha_type"
                    }
                }
            }, function(e) {
                var n = e && e.cookies
                  , c = n && n.length > 0 && n[0].value || "0"
                  , u = {
                    checkcode: "data:image/png;base64," + r,
                    yzm: o,
                    type: c,
                    code_type: s
                };
                try {
                    u = btoa(JSON.stringify(u))
                } catch (l) {}
                u && t(u, function(e) {
                    var t = {
                        data: u,
                        sign: e
                    };
                    a.ajax({
                        type: "POST",
                        url: "http://api.lxqp.360.cn/qiang/piao.php?m=autoFaild&rec=" + i,
                        data: t,
                        success: function() {}
                    })
                }
                )
            }
            )
        }
        ,
        e.statImgVcode = function(e) {
            (new Image).src = "http://api.lxqp.360.cn/verify.html?type=" + e + "&r=" + Math.random()
        }
    }
    (o),
    n.exports = o
}
);
"use strict";
define("./widgets/station/index", ["../trainList/index", "../config/config", "../window/window", "./station", "./sellTime"], function(e, n, o) {
    var a, i, s, r = e("../trainList/index"), c = e("../config/config"), u = e("../window/window"), l = e("./station"), d = e("./sellTime"), g = function() {
        var e = $(".sell-time")
          , n = l.getCityID(c.get("FROM_STATION"))
          , o = d.getSellTimes(n);
        if (o.length > 0 && void 0 != o[0]) {
            var a = $("#sell_time_tpl")
              , i = e.find(".list")
              , s = new t(a.html()).render({
                list: o
            });
            i.html(s),
            e.fadeIn()
        } else
            e.fadeOut()
    }
    ;
    l.init = function() {
        i = new l({
            $selector: $("#station_from_text"),
            $enterFocusSelector: $("#station_to_text"),
            $iconSelector: $("#station_from_icon"),
            $setConfigKey: "FROM_STATION",
            $placeholderText: "简码/全拼/汉字",
            $selectedCallback: function() {
                a(),
                g()
            }
        }),
        i.init(),
        g(),
        s = new l({
            $selector: $("#station_to_text"),
            $setConfigKey: "TO_STATION",
            $iconSelector: $("#station_to_icon"),
            $placeholderText: "简码/全拼/汉字",
            $selectedCallback: function() {
                a()
            }
        }),
        s.init(),
        a = function() {
            var t = l.getCityID(c.get("FROM_STATION"))
              , e = l.getCityID(c.get("TO_STATION"));
            t && r.addFilter("from", t),
            e && r.addFilter("to", e),
            r.show()
        }
        ,
        a()
    }
    ;
    var f;
    $("#station_change").click(function(t) {
        if (t.stopPropagation(),
        !f) {
            var e = $(this);
            e.css({
                opacity: ".3",
                cursor: "default"
            }),
            f = setTimeout(function() {
                f = null ,
                clearTimeout(f),
                e.css({
                    opacity: "1",
                    cursor: "pointer"
                })
            }
            , 1e3),
            $("#piao_station_el_box1,#piao_station_el_box2").hide();
            var n = $("#station_from_text")
              , o = $("#station_to_text")
              , i = $(".station-placeholder")
              , s = n.val();
            n.val(o.val()),
            o.val(s),
            c.setByKey("FROM_STATION", n.val()),
            c.setByKey("TO_STATION", o.val()),
            a && a(),
            g(),
            "" == n.val() ? $(i[0]).show() : $(i[0]).hide(),
            "" == o.val() ? $(i[1]).show() : $(i[1]).hide()
        }
    }
    ),
    $(".station-text, .station-icon, #station_change").click(function() {
        $(".panel-container").hide()
    }
    ),
    $(document).on("afterrender", function(t, e) {
        var n = ""
          , o = /选择的查询日期不在预售日期范围内/;
        if (e.msg && (n = "[object Array]" === Object.prototype.toString.call(e.msg) ? e.msg : [e.msg],
        n = n.length > 0 ? n[0] : ""),
        n && n.match(o))
            r.showError(n);
        else if (!e.list || 0 === e.list.length) {
            var a = $("#station_from_text").val()
              , i = $("#station_to_text").val()
              , s = $("#btn_refresh").hasClass("stop")
              , c = s ? "正在帮您查询从" + a + "到" + i + "的车票信息..." : "没有查到当天从" + a + "到" + i + "的车票信息，请检查查询条件或重试。";
            r.showError(c)
        }
    }
    ),
    $(document).on("stoprender", function() {
        var t = $("#train_list_error_msg");
        if (t.is(":visible") && (t.find("span").html() || "").indexOf("...") > -1) {
            var e = $("#station_from_text").val()
              , n = $("#station_to_text").val()
              , o = "没有查到当天从" + e + "到" + n + "的车票信息，请检查查询条件或重试。";
            r.showError(o)
        }
    }
    ),
    l.isInvalid = function() {
        var t = $("#station_from_text").val()
          , e = $("#station_to_text").val();
        return "" === t || -1 !== t.indexOf("汉字") || "" === e || -1 !== e.indexOf("汉字") || t === e
    }
    ,
    l.isInvalidStation = function() {
        var t = null ;
        return c.get("FROM_STATION") || c.setByKey("FROM_STATION", ""),
        c.get("TO_STATION") || c.setByKey("TO_STATION", ""),
        "" == c.get("FROM_STATION") && "" == c.get("TO_STATION") ? t = "出发城市和到达城市不能为空" : "" == c.get("FROM_STATION") ? t = "出发城市不能为空" : "" == c.get("TO_STATION") ? t = "到达城市不能为空" : c.get("FROM_STATION") == c.get("TO_STATION") && (t = "出发城市和到达城市不能相同"),
        t && u.alert({
            content: t
        }),
        t
    }
    ,
    o.exports = l
}
);
define("./widgets/trainList/index", ["./trainList"], function(t, e, n) {
    "use strict";
    var o, a = t("./trainList"), i = new a({
        selector: "#trainlist"
    });
    $(document).on("loginstatuschange", function(t, e) {
        "online" === e.status && e.name != o && (o = e.name,
        i.delFilter("date"),
        i.delFilter("from"),
        i.delFilter("to"),
        i.delFilter("student"),
        i.clear())
    }
    ),
    n.exports = i
}
);
define("./widgets/trainList/trainList", ["./model", "./view"], function(t, e, n) {
    "use strict";
    var o = t("./model")
      , a = t("./view")
      , i = {}
      , s = function(t) {
        t = t || {},
        this._options = t,
        i[t.selector] = this,
        o.init(this),
        a.init(this, t);
        var e = t.plugins;
        if (e) {
            var n = this;
            e.forEach(function(e) {
                e.init(n, t)
            }
            )
        }
    }
    ;
    s.get = function(t) {
        return i[t]
    }
    ,
    s.prototype.addPlugin = function(t) {
        t.init(this, this._options)
    }
    ,
    n.exports = s
}
);
define("./widgets/trainList/model", ["../filter/filter", "../extension/extension", "../settings/settings", "./../config/ip", "../../lib/retry", "../config/monitor", "../seatTypeMap/seatTypeMap", "../utils/shareMisc"], function(t, e, n) {
    "use strict";
    var i = t("../filter/filter")
      , a = t("../extension/extension")
      , o = t("../settings/settings")
      , s = t("./../config/ip")
      , r = t("../../lib/retry")
      , c = t("../config/monitor")
      , u = t("../seatTypeMap/seatTypeMap")
      , l = t("../utils/shareMisc")
      , d = 0
      , f = 5
      , g = function(t, e) {
        t += "";
        var n = t.length;
        return e > n ? (t = "000000000000000" + t,
        t.substring(t.length - e)) : t
    }
      , p = {
        date: "leftTicketDTO.train_date",
        from: "leftTicketDTO.from_station",
        to: "leftTicketDTO.to_station",
        student: "purpose_codes"
    }
      , m = function(t) {
        t = t || {},
        this.__initData(),
        this._filterSeparator = ",",
        this._requestParams = {},
        this._filter = i.init(this, {
            config: {
                number: {
                    type: "local"
                },
                traintype: {
                    type: "local"
                },
                noseat: {
                    type: "local"
                },
                softsleeper: {
                    type: "local"
                }
            }
        })
    }
    ;
    m.init = function(t, e) {
        var n = new m(e)
          , i = ["addFilter", "delFilter", "_applyFilter", "getAllFilter", "getData", "_getCachedData", "buildTrainData"];
        return i.forEach(function(e) {
            t[e] = function() {
                return n[e].apply(n, arguments)
            }
        }
        ),
        n
    }
    ,
    m.prototype.addRequestParam = function(t) {
        $.extend(this._requestParams, t)
    }
    ,
    m.prototype.__fetch = function(t, e) {
        e = e || {},
        e.url = t;
        var n = new r({
            max: 5
        })
          , i = e.success
          , u = e.error
          , l = function() {
            ++d >= f && (d = 0,
            c.checkLeftTicketUrl())
        }
        ;
        o.ipAble && $("#btn_refresh").hasClass("stop") && (e.url = t.replace(o.hostname, s.get()).replace(o.protocol, o.queryProtocol),
        e.timeout = -1 !== e.url.indexOf(o.hostname) ? 1e4 : 1500),
        n.on("fail", function() {
            u && u({
                code: "timeout",
                msg: "12306服务器端响应超时，请重试"
            })
        }
        ),
        n.start(function(n) {
            e.success = function() {
                if (i) {
                    var t = arguments[0] || {}
                      , a = t.messages && t.messages[0] && t.messages[0].indexOf("不在预售日期") > -1;
                    a || (!t.hasOwnProperty("status") || "false" != t.status.toString()) && t.hasOwnProperty("data") && $.isArray(t.data) && 0 != t.data.length ? (d = 0,
                    n(!0)) : (c.setCUrl(t.c_url),
                    l(),
                    e.url = e.url.replace(/\/otn\/.+?\?/, "/otn/" + c.leftTicketUrl + "?"),
                    n()),
                    i.apply(e, arguments)
                } else
                    n(!0)
            }
            ,
            e.error = function() {
                l(),
                o.ipAble ? (e.url = t.replace(o.hostname, s.get()).replace(o.protocol, o.queryProtocol),
                e.timeout = -1 !== e.url.indexOf(o.hostname) ? 5e3 : 1500) : (e.url = t,
                e.timeout = 5e3),
                n()
            }
            ;
            var r = this
              , u = $.extend(!0, {}, e);
            u.url = u.url.replace(/query[\w]*\?/, "log?"),
            u.error = u.success = function() {
                var n = $("#date_tab ul li.selected").attr("date")
                  , i = /leftTicketDTO\.train_date=(.+?)&/
                  , o = t.match(i)
                  , s = o[1];
                n == s && (r._ajax && r._ajax.abort(),
                r.__initData(),
                r._ajax = a.ajax(e))
            }
            ,
            a.ajax(u)
        }
        .bind(this))
    }
    ,
    m.prototype.__initData = function() {
        this._data = {
            list: [],
            fromCode: "",
            toCode: ""
        }
    }
    ,
    m.prototype._getCachedData = function() {
        return $.extend(!0, {}, this._data)
    }
    ,
    m.prototype.__getTicketInfo = function(t) {
        for (var e = {}, n = {}, i = 99999, a = 0, o = {}, s = 0, r = ""; r = t.substr(0, 10); ) {
            r = r.replace(/^7/, "M").replace(/^8/, "O").replace(/^E/, "H");
            var c = r.substr(0, 1)
              , u = parseInt(r.slice(1, -4), 10) / 10;
            i > u && (i = u,
            a = c),
            t = t.substr(10);
            var l = parseInt(r.substr(-4), 10);
            l > 0 && (s = 1),
            3e3 > l ? (o[c] = l,
            "7" == c ? o.M = l : "8" == c && (o.O = l)) : o["0"] = l - 3e3,
            n[c] = u
        }
        return e.min_price = i,
        e.priceInfo = n,
        e.seatInfo = o,
        e.has_ticket = s,
        e.min_price_seat = a,
        e
    }
    ,
    m.prototype.buildTrainData = function(t) {
        var e, n = this, i = {
            fromCode: "",
            toCode: "",
            list: []
        }, a = this._filter.getFilter("date").value;
        return i.fromCode = n._filter.getFilter("from").value,
        i.toCode = n._filter.getFilter("to").value,
        t.forEach(function(t) {
            var o = t.queryLeftNewDTO
              , s = n.__getTicketInfo(o.yp_info);
            s.seatInfo;
            var r = s.priceInfo;
            o.yp_ex.indexOf(u.srrb) > -1,
            o.yp_ex.indexOf(u.yyrw) > -1,
            i.list.push({
                percent: t.percent,
                isMidway: t.isMidway,
                type: t.type,
                sFrom: t.from,
                sTo: t.to,
                number: o.station_train_code,
                id: o.train_no,
                start: o.start_station_name,
                end: o.end_station_name,
                from: o.from_station_name,
                to: o.to_station_name,
                fromNo: o.from_station_no,
                toNo: o.to_station_no,
                startTime: o.start_time,
                endTime: o.arrive_time,
                wholetime: o.lishi,
                secret: t.secretStr,
                saleString: t.buttonTextInfo.replace(/<.+?>/g, " "),
                date: o.start_train_date.match(/(\d{4})(\d{2})(\d{2})/).slice(1).join("-"),
                userSelectedDate: a,
                arriveDate: (e = new Date(a + " " + o.start_time),
                e.setHours(e.getHours() + parseInt(o.lishi.split(":")[0], 10)),
                e.setMinutes(e.getMinutes() + parseInt(o.lishi.split(":")[1], 10)),
                e.getFullYear().toString() + "-" + g(e.getMonth() + 1, 2).toString() + "-" + g(e.getDate(), 2)),
                startCity: n._filter.getFilter("from").value,
                endCity: n._filter.getFilter("to").value,
                purpose: n._filter.getFilter("student").value,
                seatTypes: o.seat_types,
                traintype: o.station_train_code.substring(0, 1),
                seats: [{
                    name: "硬卧",
                    price: r[u.yw],
                    tickets: o.yw_num,
                    suffix: isNaN(o.yw_num) ? "票" : "张",
                    code: "yw"
                }, {
                    name: "二等座",
                    price: r[u.ze],
                    tickets: o.ze_num,
                    suffix: isNaN(o.ze_num) ? "票" : "张",
                    code: "ze"
                }, {
                    name: "硬座",
                    price: r[u.yz],
                    tickets: o.yz_num,
                    suffix: isNaN(o.yz_num) ? "票" : "张",
                    code: "yz"
                }, {
                    name: "一等座",
                    price: r[u.zy],
                    tickets: o.zy_num,
                    suffix: isNaN(o.zy_num) ? "票" : "张",
                    code: "zy"
                }, {
                    name: "软座",
                    price: r[u.rz],
                    tickets: o.rz_num,
                    suffix: isNaN(o.rz_num) ? "票" : "张",
                    code: "rz"
                }, {
                    name: "软卧",
                    price: r[u.rw],
                    tickets: "undefined" == typeof r[u.srrb] ? o.rw_num : "--",
                    suffix: isNaN("undefined" == typeof r[u.srrb] ? o.rw_num : "--") ? "票" : "张",
                    code: "rw"
                }, {
                    name: "动卧",
                    price: r[u.srrb],
                    tickets: "undefined" != typeof r[u.srrb] ? o.rw_num : "--",
                    suffix: isNaN("undefined" != typeof r[u.srrb] ? o.rw_num : "--") ? "票" : "张",
                    code: "srrb"
                }, {
                    name: "高级软卧",
                    price: r[u.gr],
                    tickets: "undefined" == typeof r[u.yyrw] ? o.gr_num : "--",
                    suffix: isNaN("undefined" == typeof r[u.yyrw] ? o.gr_num : "--") ? "票" : "张",
                    code: "gr"
                }, {
                    name: "高级动卧",
                    price: r[u.yyrw],
                    tickets: "undefined" != typeof r[u.yyrw] ? o.gr_num : "--",
                    suffix: isNaN("undefined" != typeof r[u.yyrw] ? o.gr_num : "--") ? "票" : "张",
                    code: "yyrw"
                }, {
                    name: "特等座",
                    price: r[u.tz],
                    tickets: o.tz_num,
                    suffix: isNaN(o.tz_num) ? "票" : "张",
                    code: "tz"
                }, {
                    name: "商务座",
                    price: r[u.swz],
                    tickets: o.swz_num,
                    suffix: isNaN(o.swz_num) ? "票" : "张",
                    code: "swz"
                }, {
                    name: "无座",
                    price: r[u["--" != o.yz_num ? "yz" : "ze"]],
                    tickets: o.wz_num,
                    suffix: isNaN(o.wz_num) ? "票" : "张",
                    code: "wz"
                }]
            })
        }
        ),
        i
    }
    ,
    m.prototype.__buildTrainData = function(t) {
        var e = this;
        if (e.__initData(),
        t && t.data && t.status === !0 && 0 === t.messages.length) {
            var n, i = t.data, a = this._filter.getFilter("date").value;
            this._data.fromCode = e._filter.getFilter("from").value,
            this._data.toCode = e._filter.getFilter("to").value,
            i.forEach(function(t) {
                var i = t.queryLeftNewDTO
                  , o = e.__getTicketInfo(i.yp_info);
                o.seatInfo;
                var s = o.priceInfo
                  , r = i.yp_ex.indexOf(u.srrb) > -1
                  , c = i.yp_ex.indexOf(u.yyrw) > -1;
                e._data.list.push({
                    number: i.station_train_code,
                    id: i.train_no,
                    start: i.start_station_name,
                    end: i.end_station_name,
                    from: i.from_station_name,
                    to: i.to_station_name,
                    fromNo: i.from_station_no,
                    toNo: i.to_station_no,
                    startTime: i.start_time,
                    endTime: i.arrive_time,
                    wholetime: i.lishi,
                    secret: t.secretStr,
                    saleString: t.buttonTextInfo.replace(/<.+?>/g, " "),
                    stopTicket: /(暂停发售|停运)/.test(t.buttonTextInfo),
                    date: i.start_train_date.match(/(\d{4})(\d{2})(\d{2})/).slice(1).join("-"),
                    userSelectedDate: a,
                    arriveDate: (n = new Date(Date.parse(a + " " + i.start_time)),
                    n.setHours(n.getHours() + parseInt(i.lishi.split(":")[0], 10)),
                    n.setMinutes(n.getMinutes() + parseInt(i.lishi.split(":")[1], 10)),
                    n.getFullYear().toString() + "-" + g(n.getMonth() + 1, 2).toString() + "-" + g(n.getDate(), 2)),
                    startCity: e._filter.getFilter("from").value,
                    endCity: e._filter.getFilter("to").value,
                    purpose: e._filter.getFilter("student").value,
                    seatTypes: i.seat_types,
                    traintype: i.station_train_code.substring(0, 1),
                    seats: [{
                        name: "硬卧",
                        price: s[u.yw],
                        tickets: i.yw_num,
                        suffix: isNaN(i.yw_num) ? "票" : "张",
                        code: "yw"
                    }, {
                        name: "二等座",
                        price: s[u.ze],
                        tickets: i.ze_num,
                        suffix: isNaN(i.ze_num) ? "票" : "张",
                        code: "ze"
                    }, {
                        name: "硬座",
                        price: s[u.yz],
                        tickets: i.yz_num,
                        suffix: isNaN(i.yz_num) ? "票" : "张",
                        code: "yz"
                    }, {
                        name: "一等座",
                        price: s[u.zy],
                        tickets: i.zy_num,
                        suffix: isNaN(i.zy_num) ? "票" : "张",
                        code: "zy"
                    }, {
                        name: "软座",
                        price: s[u.rz],
                        tickets: i.rz_num,
                        suffix: isNaN(i.rz_num) ? "票" : "张",
                        code: "rz"
                    }, {
                        name: "软卧",
                        price: s[u.rw],
                        tickets: r ? "--" : i.rw_num,
                        suffix: isNaN(r ? "--" : i.rw_num) ? "票" : "张",
                        code: "rw"
                    }, {
                        name: "动卧",
                        price: s[u.srrb],
                        tickets: r ? i.rw_num : "--",
                        suffix: isNaN(r ? i.rw_num : "--") ? "票" : "张",
                        code: "srrb"
                    }, {
                        name: "高级软卧",
                        price: s[u.gr],
                        tickets: c ? "--" : i.gr_num,
                        suffix: isNaN(c ? "--" : i.gr_num) ? "票" : "张",
                        code: "gr"
                    }, {
                        name: "高级动卧",
                        price: s[u.yyrw],
                        tickets: c ? i.gr_num : "--",
                        suffix: isNaN(c ? i.gr_num : "--") ? "票" : "张",
                        code: "yyrw"
                    }, {
                        name: "特等座",
                        price: s[u.tz],
                        tickets: i.tz_num,
                        suffix: isNaN(i.tz_num) ? "票" : "张",
                        code: "tz"
                    }, {
                        name: "商务座",
                        price: s[u.swz],
                        tickets: i.swz_num,
                        suffix: isNaN(i.swz_num) ? "票" : "张",
                        code: "swz"
                    }, {
                        name: "无座",
                        price: s[u["--" != i.yz_num ? "yz" : "ze"]],
                        tickets: i.wz_num,
                        suffix: isNaN(i.wz_num) ? "票" : "张",
                        code: "wz"
                    }]
                })
            }
            )
        } else
            this._data.msg = t.messages
    }
    ,
    m.prototype.getData = function(t) {
        t = t || {};
        var e = t.success
          , n = t.error
          , i = this;
        this._requestParams = {},
        t.dataType = "JSON",
        t.headers = {
            "If-Modified-Since": "0",
            "Cache-Control": "no-cache"
        },
        t.success = function(t) {
            t = t || {},
            $(document).trigger({
                type: "rawdata"
            }, t),
            i.__working = "",
            l.shareSec(t),
            i.__buildTrainData(t),
            e && e($.extend(!0, {}, i._data))
        }
        ,
        t.error = function(t) {
            i.__working = "",
            n && n(t)
        }
        ,
        $(document).trigger({
            type: "beforerequest"
        });
        var s = {};
        for (var r in p) {
            if (!this._requestParams.hasOwnProperty(r))
                return n && n({
                    code: "notenoughparam",
                    msg: "请先设置出发城市、到达城市及出发日期"
                }),
                $(document).trigger("stopbrush"),
                void 0;
            s[p[r]] = this._requestParams[r]
        }
        var u = o.protocol + o.hostname + "/otn/" + c.leftTicketUrl + "?" + $.jsonToQuery(s);
        if (this.__working !== u) {
            this.__working = u;
            var d = this
              , f = /leftTicketDTO\.train_date=(.+)&leftTicketDTO\.from_station=([\w]+)&leftTicketDTO\.to_station=([\w]+)/
              , g = u.match(f)
              , m = g[1]
              , h = g[2]
              , _ = g[3]
              , y = Station.getCityName(h)
              , v = Station.getCityName(_)
              , x = escape(y + "," + h)
              , w = escape(v + "," + _);
            $("#date_tab ul li.selected").attr("date"),
            a.sendMessage({
                type: "sendMessage",
                settings: {
                    type: "setCookie",
                    timeout: 500,
                    object: {
                        url: "https://kyfw.12306.cn/",
                        keyValues: [{
                            name: "_jc_save_fromDate",
                            value: m
                        }, {
                            name: "_jc_save_toDate",
                            value: m
                        }, {
                            name: "_jc_save_fromStation",
                            value: x
                        }, {
                            name: "_jc_save_toStation",
                            value: w
                        }, {
                            name: "_jc_save_wfdc_flag",
                            value: "dc"
                        }]
                    }
                }
            }, function() {
                d.__fetch(u, t)
            }
            ),
            i.__reset_working_timer && clearTimeout(i.__reset_working_timer)
        } else
            i.__reset_working_timer || (i.__reset_working_timer = setTimeout(function() {
                i.__working = "",
                i.__reset_working_timer = null 
            }
            , 6e4))
    }
    ,
    n.exports = m
}
);
define("./widgets/filter/filter", [], function(t, e, n) {
    "use strict";
    var i = function(t) {
        t = t || {},
        this._config = t.config || {},
        this._filters = {
            query: {},
            local: {}
        }
    }
    ;
    i.init = function(t, e) {
        e = e || {};
        var n = new i(e)
          , a = ["addFilter", "delFilter", "_applyFilter", "getAllFilter"];
        return a.forEach(function(e) {
            t[e] = function() {
                return n[e].apply(n, arguments)
            }
        }
        ),
        $(document).on("beforerequest", function() {
            var e = n.getAllFilter().query
              , i = {};
            for (var a in e)
                if (Array.isArray(e[a])) {
                    var o = [];
                    e[a].forEach(function(t) {
                        "query" === t.type && o.push(t.value)
                    }
                    ),
                    i[a] = o
                } else
                    i[a] = e[a].value;
            t.addRequestParam(i)
        }
        ),
        n
    }
    ,
    i.prototype.addFilter = function(t, e, n) {
        var i = this._config
          , a = this._filters
          , o = "query"
          , s = {
            value: e
        };
        i[t] && (o = i[t].type),
        a[o][t] ? n === !0 ? Array.isArray(a[o][t]) ? a[o][t].push(s) : (a[o][t] = [a[o][t]],
        a[o][t].push(s)) : a[o][t] = s : a[o][t] = s
    }
    ,
    i.prototype._applyFilter = function(t) {
        return this.__filterData(t, this._filters.local)
    }
    ,
    i.prototype.delFilter = function(t, e) {
        for (var n in this._filters) {
            var i = this._filters[n];
            i[t] && (void 0 === e ? delete i[t] : Array.isArray(i[t]) ? i[t].forEach(function(n, a) {
                n.value === e && i[t].splice(a, 1)
            }
            ) : i[t].value === e && delete i[t])
        }
    }
    ,
    i.prototype.__filterData = function(t, e) {
        var n = t.concat([])
          , i = this;
        if (n && n.length > 0)
            for (var a = n.length - 1; a >= 0; ) {
                var o = n[a];
                for (var s in e) {
                    var r = e[s];
                    if (Array.isArray(r)) {
                        var c = !1;
                        r.forEach(function(t) {
                            i.__checkFilter(o[s], t.value) && (c = !0)
                        }
                        ),
                        c || n.splice(a, 1)
                    } else
                        this.__checkFilter(o[s], r.value) || n.splice(a, 1)
                }
                a--
            }
        return n
    }
    ,
    i.prototype.__checkFilter = function(t, e) {
        var n = e.indexOf(":");
        if (-1 === n)
            return t === e;
        var i = e.substring(0, n);
        switch (e = e.substring(n + 1),
        i) {
        case ">":
            return parseFloat(t) > parseFloat(e);
        case "<":
            return parseFloat(t) < parseFloat(e);
        case "inc":
            return -1 !== t.indexOf(e);
        case "eq":
            return t === e;
        default:
            return !0
        }
    }
    ,
    i.prototype.getAllFilter = function() {
        return this._filters
    }
    ,
    i.prototype.getFilter = function(t) {
        for (var e in this._filters) {
            var n = this._filters[e];
            if (n[t])
                return n[t]
        }
        return null 
    }
    ,
    n.exports = i
}
);
"use strict";
define("./widgets/config/ip", [], function(t, e, n) {
    var i = i || {};
    !function(t) {
        var e = ""
          , n = 0;
        t.list = ["kyfw.12306.cn", "117.169.17.6", "117.169.17.7", "117.169.17.8", "117.21.168.19", "117.169.17.27", "117.169.17.28", "112.65.220.17", "117.169.17.29", "218.29.50.15", "112.65.220.18", "221.229.202.45", "117.169.17.30", "218.29.50.16", "112.65.220.19", "221.229.202.46", "112.65.220.20", "221.229.202.47", "221.229.202.48", "221.229.202.49", "117.169.17.32", "218.29.50.18", "221.229.202.50", "117.169.17.33", "218.29.50.19", "221.229.202.51", "218.29.50.20", "221.229.202.52", "221.229.202.53", "221.229.202.54", "117.169.17.35", "221.229.202.55", "117.169.17.36", "116.211.79.24", "221.229.202.56", "117.169.17.37", "116.211.79.25", "221.229.202.57", "116.211.79.26", "117.169.17.38", "221.229.202.58", "116.211.79.27", "117.169.17.39", "221.229.202.59", "117.21.168.57", "116.211.79.28", "117.169.17.40", "221.229.202.60", "116.211.79.29", "117.169.17.41", "221.229.202.62", "116.211.79.31", "117.169.17.42", "221.229.202.63", "117.169.17.43", "221.229.202.64", "117.21.168.59", "117.169.17.45", "117.21.168.60", "117.169.17.46", "117.21.168.61", "117.21.168.62", "112.65.220.32", "112.65.220.33", "117.21.168.87", "112.65.220.39", "221.229.202.89", "221.229.202.90", "221.229.202.91", "221.229.202.92", "221.229.202.93", "221.229.202.94", "221.229.202.95", "221.229.202.96", "221.229.202.97", "221.229.202.98", "221.229.202.99", "221.229.202.100", "221.229.202.101", "221.229.202.102", "221.229.202.103", "221.229.202.104", "221.229.202.105", "221.229.202.106", "117.169.17.98", "221.229.202.107", "117.169.17.99", "218.12.228.38", "221.229.202.108", "218.12.228.40", "221.229.202.109", "218.12.228.41", "117.169.17.109", "221.229.202.110", "218.12.228.44", "221.229.202.111", "218.12.228.48", "218.12.228.49", "218.12.228.50", "221.229.202.136", "218.12.228.51", "218.12.228.52", "218.12.228.53", "218.12.228.54", "218.29.50.48", "221.229.202.148", "221.229.202.149", "218.12.228.57", "218.12.228.58", "218.12.228.59", "218.12.228.60", "218.12.228.61", "218.12.228.65", "218.29.50.93", "221.229.202.154", "218.12.228.89", "218.12.228.90", "218.12.228.91", "218.12.228.92", "218.12.228.93", "218.12.228.94", "218.12.228.95", "218.12.228.96", "218.12.228.97", "218.12.228.99", "218.12.228.101", "112.65.220.226", "112.65.220.227", "218.76.105.50", "218.76.105.51", "218.12.228.185", "218.76.105.52", "218.76.105.53", "218.76.105.54", "218.76.105.55", "58.51.241.24", "58.51.241.25", "58.51.241.26", "58.51.241.27", "58.51.241.28", "58.51.241.29", "58.51.241.30", "58.51.241.34", "218.12.228.212", "218.12.228.213", "112.84.104.7", "112.84.104.24", "112.84.104.25", "218.76.105.75", "112.84.104.28", "218.76.105.83", "112.84.104.29", "218.76.105.84", "119.84.111.38", "218.76.105.85", "119.84.111.40", "218.76.105.86", "112.84.104.48", "119.84.111.41", "119.84.111.42", "119.84.111.43", "112.84.104.66", "119.84.111.44", "112.84.104.67", "112.84.104.68", "119.84.111.45", "112.84.104.69", "119.84.111.46", "112.84.104.70", "119.84.111.47", "119.84.111.75", "119.84.111.76", "218.12.228.248", "218.12.228.250", "218.12.228.251", "119.84.111.83", "112.84.104.82", "119.84.111.113", "119.84.111.126", "112.84.104.148", "150.138.169.29", "218.76.105.168", "150.138.169.197", "150.138.169.198", "150.138.169.199", "150.138.169.200", "150.138.169.201", "150.138.169.202", "150.138.169.204", "150.138.169.213", "150.138.169.214", "150.138.169.215", "150.138.169.216", "150.138.169.217", "150.138.169.218", "150.138.169.219", "150.138.169.220", "150.138.169.221", "150.138.169.222", "150.138.169.223", "150.138.169.224", "150.138.169.225", "150.138.169.226", "150.138.169.227", "150.138.169.228", "150.138.169.233", "60.174.241.22", "60.174.241.23", "60.174.241.24", "60.174.241.25", "60.223.208.19", "60.223.208.20", "60.223.208.21", "60.223.208.22", "60.174.241.27", "60.223.208.23", "60.174.241.28", "60.223.208.24", "60.174.241.29", "60.223.208.25", "60.223.208.26", "60.223.208.27", "60.223.208.28", "60.223.208.29", "60.223.208.30", "60.223.208.31", "60.174.241.31", "60.223.208.32", "60.174.241.88", "113.16.210.131", "60.223.208.78", "60.223.208.79", "60.211.208.16", "60.211.208.17", "60.211.208.18", "60.211.208.19", "60.211.208.20", "60.211.208.21", "60.211.208.22", "60.211.208.23", "60.211.208.24", "60.211.208.25", "60.211.208.26", "60.211.208.27", "60.211.208.28", "60.211.208.40", "60.211.208.41", "60.211.208.42", "60.211.208.43", "60.211.208.44", "60.211.208.45", "60.211.208.49", "60.211.208.50", "60.211.208.51", "122.143.27.169", "122.143.27.171", "122.143.27.203", "122.143.27.204", "122.143.27.205", "122.143.27.206", "122.143.27.208", "183.131.192.72", "183.131.192.73", "183.131.192.74", "183.131.192.75", "183.131.192.76", "183.131.192.77", "183.131.192.78", "183.131.192.83", "122.143.27.239", "122.143.27.240", "119.90.19.19", "119.90.19.20", "119.90.19.21", "119.90.19.22", "119.90.19.23", "119.90.19.24", "119.90.19.25", "119.90.19.26", "119.90.19.27", "119.90.19.31", "119.90.19.32", "119.90.19.33", "119.90.19.34", "119.90.19.35", "119.90.19.37", "119.90.19.38", "119.90.19.39", "119.90.19.40", "222.184.34.18", "222.184.34.19", "222.184.34.20", "222.184.34.21", "222.184.34.22", "222.184.34.23", "222.184.34.54", "36.250.248.23", "36.250.248.25", "36.250.248.26", "36.250.248.27", "36.250.248.29", "36.250.248.55", "36.250.248.56", "36.250.248.57", "36.250.248.58", "36.250.248.59", "36.250.248.60", "36.250.248.61", "36.250.248.66", "36.250.248.68", "36.250.248.71", "36.250.248.72", "36.250.248.73", "36.250.248.144", "36.250.248.145", "58.215.134.125", "58.215.134.126", "58.215.134.127", "58.215.134.128", "58.215.134.129", "58.215.134.130", "58.215.134.132", "58.215.134.133", "58.215.134.134", "113.107.57.7", "58.215.134.135", "113.107.57.8", "58.215.134.136", "58.215.134.137", "58.215.134.138", "58.215.134.139", "58.215.134.140", "58.215.134.141", "58.215.134.142", "58.215.134.143", "58.215.134.144", "113.107.57.37", "113.107.57.38", "113.107.57.39", "113.107.57.43", "113.107.57.66", "58.215.134.237", "113.107.57.160", "113.107.57.161", "113.107.57.162", "113.107.57.163", "113.107.57.164", "113.107.57.165", "113.107.57.166", "113.107.57.170", "113.107.57.171", "113.107.57.172", "113.107.57.173", "115.231.84.53", "115.231.84.55", "115.231.84.61", "115.231.84.62", "115.231.84.63", "115.231.84.64", "115.231.84.65", "115.231.84.66", "101.227.102.172", "101.227.102.173", "101.227.102.174", "101.227.102.175", "101.227.102.176", "101.227.102.177", "101.227.102.178", "101.227.102.180", "101.227.102.183", "101.227.102.184", "113.107.57.249", "42.81.5.15", "101.227.102.187", "42.81.5.17", "42.81.5.18", "42.81.5.20", "101.227.102.197", "101.227.102.198", "42.81.5.24", "42.81.5.25", "125.64.134.26", "125.64.134.27", "125.64.134.28", "125.64.134.29", "125.64.134.30", "115.231.84.169", "42.81.5.79", "125.64.134.78", "42.81.5.211", "182.243.62.35", "182.243.62.36", "182.243.62.37", "182.243.62.38", "182.243.62.39", "182.243.62.40", "182.243.62.41", "182.243.62.48", "113.5.80.90", "113.5.80.93", "113.5.80.94", "113.5.80.95", "113.5.80.102", "113.5.80.107", "113.5.80.108", "113.5.80.109", "113.5.80.110", "113.5.80.112", "113.5.80.125", "218.60.91.37", "218.60.91.38", "218.60.91.39", "218.60.91.40", "218.60.91.41", "218.60.91.42", "218.60.91.43", "218.60.91.44", "218.60.91.45", "218.60.91.47", "218.60.91.48", "113.5.80.214", "218.60.91.91", "113.5.80.238", "220.202.77.105", "220.202.77.106", "220.202.77.107", "220.202.77.109", "220.202.77.110", "220.202.77.111", "220.202.77.112", "220.202.77.119", "183.61.26.34", "183.61.26.35", "183.61.26.38", "183.61.26.39", "183.61.26.40", "183.61.26.41", "183.61.26.199", "123.183.164.76", "123.183.164.77", "123.183.164.78", "123.183.164.79", "123.183.164.80", "123.183.164.81", "123.183.164.82", "123.183.164.83", "123.183.164.84", "123.183.164.85", "123.183.164.86", "123.183.164.87", "123.183.164.88", "123.183.164.89", "123.183.164.90", "123.183.164.91", "123.183.164.92", "123.183.164.93", "123.183.164.94", "123.183.164.95", "123.183.164.96", "123.183.164.97", "123.183.164.98", "123.183.164.99", "123.183.164.100", "123.183.164.101", "123.183.164.102", "123.183.164.103", "123.183.164.119", "123.183.164.120", "123.183.164.121", "123.183.164.122", "123.183.164.123", "123.183.164.124", "123.183.164.125", "123.183.164.126", "123.183.164.136", "123.183.164.137", "123.183.164.141", "123.183.164.142", "123.183.164.143", "123.183.164.144", "123.138.60.143", "123.138.60.145", "123.138.60.146", "123.138.60.147", "123.138.60.154", "123.138.60.155", "123.138.60.158", "123.138.60.159", "123.138.60.161", "112.84.104.7", "59.56.30.56", "112.84.104.23", "112.84.104.24", "59.56.30.58", "112.84.104.25", "59.56.30.59", "112.84.104.26", "59.56.30.60", "123.138.60.191", "112.84.104.27", "59.56.30.61", "123.138.60.192", "112.84.104.28", "59.56.30.62", "112.84.104.29", "59.56.30.63", "59.56.30.64", "59.56.30.65", "112.84.104.48", "59.56.30.66", "59.56.30.67", "112.84.104.66", "59.56.30.68", "112.84.104.67", "112.84.104.68", "112.84.104.69", "112.84.104.70", "59.56.30.192", "59.56.30.193", "59.56.30.194", "112.84.104.82", "59.56.30.196", "59.56.30.197", "59.56.30.198", "59.56.30.200", "59.56.30.206", "59.56.30.207", "59.56.30.221", "59.47.0.160", "59.47.0.161", "59.56.30.247", "59.47.0.163", "59.56.30.249", "59.47.0.164", "59.47.0.165", "59.47.0.166", "113.16.209.171", "59.47.0.167", "59.47.0.168", "59.47.0.169", "59.47.0.170", "59.47.0.171", "59.47.0.189", "58.51.150.30", "58.51.150.31", "58.51.150.32", "58.51.150.33", "58.51.150.34", "58.51.150.35", "58.51.150.38", "58.51.150.39", "58.51.150.55", "58.51.150.56", "110.157.233.25", "110.157.233.26", "110.157.233.27", "110.157.233.28", "110.157.233.30", "110.157.233.33", "110.157.233.34", "110.157.233.35", "218.77.2.16", "218.77.2.17", "218.77.2.20", "218.77.2.21", "218.77.2.32", "218.77.2.54", "218.77.2.55", "218.77.2.57", "218.77.2.58", "218.77.2.59", "218.77.2.60", "218.77.2.61", "14.215.9.47", "14.215.9.48", "14.215.9.49", "14.215.9.50", "14.215.9.51", "14.215.9.52", "14.215.9.53", "14.215.9.55", "14.215.9.56", "14.215.9.57", "14.215.9.58", "14.215.9.59", "14.215.9.60", "14.215.9.61", "14.215.9.62", "14.215.9.63", "14.215.9.64", "14.215.9.65", "14.215.9.83", "14.215.9.84", "14.215.9.85", "121.30.196.23", "121.30.196.24", "121.30.196.25", "121.30.196.26", "121.30.196.28", "121.30.196.29", "121.30.196.31", "121.30.196.32", "121.30.196.34", "121.30.196.35", "121.30.196.36", "121.30.196.100", "121.30.196.101", "121.30.196.102", "121.30.196.103", "121.30.196.104", "121.30.196.105", "121.30.196.106", "121.30.196.107", "121.30.196.108", "121.30.196.109", "121.30.196.116", "121.30.196.117"],
        t.get = function() {
            var i = t.list.length
              , a = Math.floor(i * Math.random());
            return e = t.list[0 === n % 3 ? 0 : a],
            ++n,
            n = i > n ? n : 0,
            e
        }
        ,
        t.getLast = function() {
            return e = e || t.get(),
            e || e
        }
    }
    (i),
    Object.preventExtensions(i),
    n.exports = i
}
);
define("./lib/retry", [], function(t, e, n) {
    !function(t) {
        var e = function(t) {
            t = t || {},
            this._timeout = t.timeout,
            this._max = t.max || 1 / 0,
            this._interval = t.interval || 0,
            this._cbs = {
                done: [],
                fail: [],
                timeout: []
            }
        }
        ;
        e.prototype = {
            start: function(t) {
                var e, n = 0, i = this;
                this._stop = !1,
                this._timeout && (e = setTimeout(function() {
                    i._fire("timeout"),
                    i._stop = !0
                }
                , this._timeout)),
                function a() {
                    i._stop || (n++,
                    n > i._max ? (i._fire("fail"),
                    clearTimeout(e)) : t(function(t) {
                        if (t === !0) {
                            var n = Array.prototype.slice.call(arguments, 1);
                            n.unshift("done"),
                            i._fire.apply(i, n),
                            clearTimeout(e)
                        } else
                            i._interval ? setTimeout(a, i._interval) : a()
                    }
                    ))
                }
                ()
            },
            stop: function() {
                this._stop = !0
            },
            on: function(t, e) {
                var n = this._cbs[t];
                n.push(e)
            },
            un: function(t, e) {
                var n = this._cbs[t];
                if (e) {
                    for (var i = 0; i < n.length; i++)
                        if (n[i] === e) {
                            n.splice(i, 1);
                            break
                        }
                } else
                    n.splice(0, n.length)
            },
            _fire: function(t) {
                var e = Array.prototype.slice.call(arguments, 1)
                  , n = this._cbs[t];
                if (n && !this._stop)
                    for (var i = 0; i < n.length; i++)
                        n[i].apply(null , e)
            }
        },
        "undefined" != typeof n && (n.exports = e),
        t.Retry = e
    }
    (this)
}
);
"use strict";
define("./widgets/config/monitor", ["../settings/settings", "../extension/extension"], function(n, a, i) {
    var e = (n("../settings/settings"),
    n("../extension/extension"))
      , t = {};
    !function(n) {
        function a() {
            var a = +new Date
              , i = a - s;
            (0 > i || i >= h) && (s = a,
            localStorage.last_station_check_stamp = a,
            n.checkStationNames())
        }
        n.leftTicketUrl = localStorage.left_ticket_url || "leftTicket/query",
        n.rLeftTicketUrl = "CLeftTicketUrl",
        n.setCUrl = function(a) {
            a = a || "leftTicket/query",
            a && (localStorage.left_ticket_url = n.leftTicketUrl = a)
        }
        ,
        n.setCName = function(a) {
            a && (localStorage.rleft_ticket_url = n.rLeftTicketUrl = a)
        }
        ,
        n.checkLeftTicketUrl = function() {
            return n.leftTicketUrl = "leftTicket/queryT" == localStorage.left_ticket_url ? "leftTicket/query" : "leftTicket/queryT",
            void 0
        }
        ;
        var i = 10
          , t = 1e3
          , h = 18e5
          , s = localStorage.last_station_check_stamp || 0
          , g = "@bji|北京|BJP|0@sha|上海|SHH|1@tji|天津|TJP|2@cqi|重庆|CQW|3@csh|长沙|CSQ|4@cch|长春|CCT|5@cdu|成都|CDW|6@fzh|福州|FZS|7@gzh|广州|GZQ|8@gya|贵阳|GIW|9@hht|呼和浩特|HHC|10@heb|哈尔滨|HBB|11@hfe|合肥|HFH|12@hzh|杭州|HZH|13@hko|海口|VUQ|14@jna|济南|JNK|15@kmi|昆明|KMM|16@lsa|拉萨|LSO|17@lzh|兰州|LZJ|18@nni|南宁|NNZ|19@nji|南京|NJH|20@nch|南昌|NCG|21@sya|沈阳|SYT|22@sjz|石家庄|SJP|23@tyu|太原|TYV|24@wlq|乌鲁木齐南|WMR|25@wha|武汉|WHN|26@xnx|西宁西|XXO|27@xan|西安|XAY|28@ych|银川|YIJ|29@zzh|郑州|ZZF|30@szh|深圳|SZQ|shenzhen|sz|31@xme|厦门|XMS|xiamen|xm|32"
          , u = "@bjb|北京北|VAP|beijingbei|bjb|0@bjd|北京东|BOP|beijingdong|bjd|1@bji|北京|BJP|beijing|bj|2@bjn|北京南|VNP|beijingnan|bjn|3@bjx|北京西|BXP|beijingxi|bjx|4@gzn|广州南|IZQ|guangzhounan|gzn|5@cqb|重庆北|CUW|chongqingbei|cqb|6@cqi|重庆|CQW|chongqing|cq|7@cqn|重庆南|CRW|chongqingnan|cqn|8@gzd|广州东|GGQ|guangzhoudong|gzd|9@sha|上海|SHH|shanghai|sh|10@shn|上海南|SNH|shanghainan|shn|11@shq|上海虹桥|AOH|shanghaihongqiao|shhq|12@shx|上海西|SXH|shanghaixi|shx|13@tjb|天津北|TBP|tianjinbei|tjb|14@tji|天津|TJP|tianjin|tj|15@tjn|天津南|TIP|tianjinnan|tjn|16@tjx|天津西|TXP|tianjinxi|tjx|17@cch|长春|CCT|changchun|cc|18@ccn|长春南|CET|changchunnan|ccn|19@ccx|长春西|CRT|changchunxi|ccx|20@cdd|成都东|ICW|chengdudong|cdd|21@cdn|成都南|CNW|chengdunan|cdn|22@cdu|成都|CDW|chengdu|cd|23@csh|长沙|CSQ|changsha|cs|24@csn|长沙南|CWQ|changshanan|csn|25@fzh|福州|FZS|fuzhou|fz|26@fzn|福州南|FYS|fuzhounan|fzn|27@gya|贵阳|GIW|guiyang|gy|28@gzh|广州|GZQ|guangzhou|gz|29@gzx|广州西|GXQ|guangzhouxi|gzx|30@heb|哈尔滨|HBB|haerbin|heb|31@hed|哈尔滨东|VBB|haerbindong|hebd|32@hex|哈尔滨西|VAB|haerbinxi|hebx|33@hfe|合肥|HFH|hefei|hf|34@hfx|合肥西|HTH|hefeixi|hfx|35@hhd|呼和浩特东|NDC|huhehaotedong|hhhtd|36@hht|呼和浩特|HHC|huhehaote|hhht|37@hkd|海  口东|KEQ|haikoudong|hkd|38@hkd|海口东|HMQ|haikoudong|hkd|39@hko|海口|VUQ|haikou|hk|40@hzd|杭州东|HGH|hangzhoudong|hzd|41@hzh|杭州|HZH|hangzhou|hz|42@hzn|杭州南|XHH|hangzhounan|hzn|43@jna|济南|JNK|jinan|jn|44@jnd|济南东|JAK|jinandong|jnd|45@jnx|济南西|JGK|jinanxi|jnx|46@kmi|昆明|KMM|kunming|km|47@kmx|昆明西|KXM|kunmingxi|kmx|48@lsa|拉萨|LSO|lasa|ls|49@lzd|兰州东|LVJ|lanzhoudong|lzd|50@lzh|兰州|LZJ|lanzhou|lz|51@lzx|兰州西|LAJ|lanzhouxi|lzx|52@nch|南昌|NCG|nanchang|nc|53@nji|南京|NJH|nanjing|nj|54@njn|南京南|NKH|nanjingnan|njn|55@nni|南宁|NNZ|nanning|nn|56@sjb|石家庄北|VVP|shijiazhuangbei|sjzb|57@sjz|石家庄|SJP|shijiazhuang|sjz|58@sya|沈阳|SYT|shenyang|sy|59@syb|沈阳北|SBT|shenyangbei|syb|60@syd|沈阳东|SDT|shenyangdong|syd|61@tyb|太原北|TBV|taiyuanbei|tyb|62@tyd|太原东|TDV|taiyuandong|tyd|63@tyu|太原|TYV|taiyuan|ty|64@wha|武汉|WHN|wuhan|wh|65@wjx|王家营西|KNM|wangjiayingxi|wjyx|66@wln|乌鲁木齐南|WMR|wulumuqinan|wlmqn|67@xab|西安北|EAY|xianbei|xab|68@xan|西安|XAY|xian|xa|69@xan|西安南|CAY|xiannan|xan|70@xni|西宁|XNO|xining|xn|71@ych|银川|YIJ|yinchuan|yc|72@zzh|郑州|ZZF|zhengzhou|zz|73@aes|阿尔山|ART|aershan|aes|74@aka|安康|AKY|ankang|ak|75@aks|阿克苏|ASR|akesu|aks|76@alh|阿里河|AHX|alihe|alh|77@alk|阿拉山口|AKR|alashankou|alsk|78@api|安平|APT|anping|ap|79@aqi|安庆|AQH|anqing|aq|80@ash|安顺|ASW|anshun|as|81@ash|鞍山|AST|anshan|as|82@aya|安阳|AYF|anyang|ay|83@ban|北安|BAB|beian|ba|84@bbu|蚌埠|BBH|bengbu|bb|85@bch|白城|BCT|baicheng|bc|86@bha|北海|BHZ|beihai|bh|87@bhe|白河|BEL|baihe|bh|88@bji|白涧|BAP|baijian|bj|89@bji|宝鸡|BJY|baoji|bj|90@bji|滨江|BJB|binjiang|bj|91@bkt|博克图|BKX|boketu|bkt|92@bse|百色|BIZ|baise|bs|93@bss|白山市|HJL|baishanshi|bss|94@bta|北台|BTT|beitai|bt|95@btd|包头东|BDC|baotoudong|btd|96@bto|包头|BTC|baotou|bt|97@bts|北屯市|BXR|beitunshi|bts|98@bxi|本溪|BXT|benxi|bx|99@byb|白云鄂博|BEC|baiyunebo|byeb|100@byx|白银西|BXJ|baiyinxi|byx|101@bzh|亳州|BZH|bozhou|bz|102@cbi|赤壁|CBN|chibi|cb|103@cde|常德|VGQ|changde|cd|104@cde|承德|CDP|chengde|cd|105@cdi|长甸|CDT|changdian|cd|106@cfe|赤峰|CFD|chifeng|cf|107@cli|茶陵|CDG|chaling|cl|108@cna|苍南|CEH|cangnan|cn|109@cpi|昌平|CPP|changping|cp|110@cre|崇仁|CRG|chongren|cr|111@ctu|昌图|CTT|changtu|ct|112@ctz|长汀镇|CDB|changtingzhen|ctz|113@cxi|曹县|CXK|caoxian|cx|114@cxi|楚雄|COM|chuxiong|cx|115@cxt|陈相屯|CXT|chenxiangtun|cxt|116@czb|长治北|CBF|changzhibei|czb|117@czh|池州|IYH|chizhou|cz|118@czh|长征|CZJ|changzheng|cz|119@czh|常州|CZH|changzhou|cz|120@czh|郴州|CZQ|chenzhou|cz|121@czh|长治|CZF|changzhi|cz|122@czh|沧州|COP|cangzhou|cz|123@czu|崇左|CZZ|chongzuo|cz|124@dab|大安北|RNT|daanbei|dab|125@dch|大成|DCT|dacheng|dc|126@ddo|丹东|DUT|dandong|dd|127@dfh|东方红|DFB|dongfanghong|dfh|128@dgd|东莞东|DMQ|dongguandong|dgd|129@dhs|大虎山|DHD|dahushan|dhs|130@dhu|敦煌|DHJ|dunhuang|dh|131@dhu|敦化|DHL|dunhua|dh|132@dhu|德惠|DHT|dehui|dh|133@djc|东京城|DJB|dongjingcheng|djc|134@dji|大涧|DFP|dajian|dj|135@djy|都江堰|DDW|dujiangyan|djy|136@dlb|大连北|DFT|dalianbei|dlb|137@dli|大理|DKM|dali|dl|138@dli|大连|DLT|dalian|dl|139@dna|定南|DNG|dingnan|dn|140@dqi|大庆|DZX|daqing|dq|141@dsh|东胜|DOC|dongsheng|ds|142@dsq|大石桥|DQT|dashiqiao|dsq|143@dto|大同|DTV|datong|dt|144@dyi|东营|DPK|dongying|dy|145@dys|大杨树|DUX|dayangshu|dys|146@dyu|都匀|RYW|duyun|dy|147@dzh|邓州|DOF|dengzhou|dz|148@dzh|达州|RXW|dazhou|dz|149@dzh|德州|DZP|dezhou|dz|150@ejn|额济纳|EJC|ejina|ejn|151@eli|二连|RLC|erlian|el|152@esh|恩施|ESN|enshi|es|153@fdi|福鼎|FES|fuding|fd|154@fhc|凤凰机场|FJQ|fenghuangjichang|fhjc|155@fld|风陵渡|FLV|fenglingdu|fld|156@fli|涪陵|FLW|fuling|fl|157@flj|富拉尔基|FRX|fulaerji|flej|158@fsb|抚顺北|FET|fushunbei|fsb|159@fsh|佛山|FSQ|foshan|fs|160@fxn|阜新南|FXD|fuxinnan|fxn|161@fya|阜阳|FYH|fuyang|fy|162@gem|格尔木|GRO|geermu|gem|163@gha|广汉|GHW|guanghan|gh|164@gji|古交|GJV|gujiao|gj|165@glb|桂林北|GBZ|guilinbei|glb|166@gli|古莲|GRX|gulian|gl|167@gli|桂林|GLZ|guilin|gl|168@gsh|固始|GXN|gushi|gs|169@gsh|广水|GSN|guangshui|gs|170@gta|干塘|GNJ|gantang|gt|171@gyu|广元|GYW|guangyuan|gy|172@gzb|广州北|GBQ|guangzhoubei|gzb|173@gzh|赣州|GZG|ganzhou|gz|174@gzl|公主岭|GLT|gongzhuling|gzl|175@gzn|公主岭南|GBT|gongzhulingnan|gzln|176@han|淮安|AUH|huaian|ha|177@hbe|鹤北|HMB|hebei|hb|178@hbe|淮北|HRH|huaibei|hb|179@hbi|淮滨|HVN|huaibin|hb|180@hbi|河边|HBV|hebian|hb|181@hch|潢川|KCN|huangchuan|hc|182@hch|韩城|HCY|hancheng|hc|183@hda|邯郸|HDP|handan|hd|184@hdz|横道河子|HDB|hengdaohezi|hdhz|185@hga|鹤岗|HGB|hegang|hg|186@hgt|皇姑屯|HTT|huanggutun|hgt|187@hgu|红果|HEM|hongguo|hg|188@hhe|黑河|HJB|heihe|hh|189@hhu|怀化|HHQ|huaihua|hh|190@hko|汉口|HKN|hankou|hk|191@hld|葫芦岛|HLD|huludao|hld|192@hle|海拉尔|HRX|hailaer|hle|193@hll|霍林郭勒|HWD|huolinguole|hlgl|194@hlu|海伦|HLB|hailun|hl|195@hma|侯马|HMV|houma|hm|196@hmi|哈密|HMR|hami|hm|197@hna|淮南|HAH|huainan|hn|198@hna|桦南|HNB|huanan|hn|199@hnx|海宁西|EUH|hainingxi|hnx|200@hqi|鹤庆|HQM|heqing|hq|201@hrb|怀柔北|HBP|huairoubei|hrb|202@hro|怀柔|HRP|huairou|hr|203@hsd|黄石东|OSN|huangshidong|hsd|204@hsh|华山|HSY|huashan|hs|205@hsh|黄石|HSN|huangshi|hs|206@hsh|黄山|HKH|huangshan|hs|207@hsh|衡水|HSP|hengshui|hs|208@hya|衡阳|HYQ|hengyang|hy|209@hze|菏泽|HIK|heze|hz|210@hzh|贺州|HXZ|hezhou|hz|211@hzh|汉中|HOY|hanzhong|hz|212@hzh|惠州|HCQ|huizhou|hz|213@jan|吉安|VAG|jian|ja|214@jan|集安|JAL|jian|ja|215@jbc|江边村|JBG|jiangbiancun|jbc|216@jch|晋城|JCF|jincheng|jc|217@jcj|金城江|JJZ|jinchengjiang|jcj|218@jdz|景德镇|JCG|jingdezhen|jdz|219@jfe|嘉峰|JFF|jiafeng|jf|220@jgq|加格达奇|JGX|jiagedaqi|jgdq|221@jgs|井冈山|JGG|jinggangshan|jgs|222@jhe|蛟河|JHL|jiaohe|jh|223@jhn|金华南|RNH|jinhuanan|jhn|224@jhu|金华|JBH|jinhua|jh|225@jji|九江|JJG|jiujiang|jj|226@jli|吉林|JLL|jilin|jl|227@jme|荆门|JMN|jingmen|jm|228@jms|佳木斯|JMB|jiamusi|jms|229@jni|济宁|JIK|jining|jn|230@jnn|集宁南|JAC|jiningnan|jnn|231@jqu|酒泉|JQJ|jiuquan|jq|232@jsh|江山|JUH|jiangshan|js|233@jsh|吉首|JIQ|jishou|js|234@jta|九台|JTL|jiutai|jt|235@jts|镜铁山|JVJ|jingtieshan|jts|236@jxi|鸡西|JXB|jixi|jx|237@jxi|蓟县|JKP|jixian|jx|238@jxx|绩溪县|JRH|jixixian|jxx|239@jyg|嘉峪关|JGJ|jiayuguan|jyg|240@jyo|江油|JFW|jiangyou|jy|241@jzh|锦州|JZD|jinzhou|jz|242@jzh|金州|JZT|jinzhou|jz|243@kel|库尔勒|KLR|kuerle|kel|244@kfe|开封|KFF|kaifeng|kf|245@kla|岢岚|KLV|kelan|kl|246@kli|凯里|KLW|kaili|kl|247@ksh|喀什|KSR|kashi|ks|248@ksn|昆山南|KNH|kunshannan|ksn|249@ktu|奎屯|KTR|kuitun|kt|250@kyu|开原|KYT|kaiyuan|ky|251@lan|六安|UAH|luan|la|252@lba|灵宝|LBF|lingbao|lb|253@lcg|芦潮港|UCH|luchaogang|lcg|254@lch|隆昌|LCW|longchang|lc|255@lch|陆川|LKZ|luchuan|lc|256@lch|利川|LCN|lichuan|lc|257@lch|临川|LCG|linchuan|lc|258@lch|潞城|UTP|lucheng|lc|259@lda|鹿道|LDL|ludao|ld|260@ldi|娄底|LDQ|loudi|ld|261@lfe|临汾|LFV|linfen|lf|262@lgz|良各庄|LGP|lianggezhuang|lgz|263@lhe|临河|LHC|linhe|lh|264@lhe|漯河|LON|luohe|lh|265@lhu|绿化|LWJ|lvhua|lh|266@lhu|隆化|UHP|longhua|lh|267@lji|丽江|LHM|lijiang|lj|268@lji|临江|LQL|linjiang|lj|269@lji|龙井|LJL|longjing|lj|270@lli|吕梁|LHV|lvliang|ll|271@lli|醴陵|LLG|liling|ll|272@lln|柳林南|LKV|liulinnan|lln|273@lpi|滦平|UPP|luanping|lp|274@lps|六盘水|UMW|liupanshui|lps|275@lqi|灵丘|LVV|lingqiu|lq|276@lsh|旅顺|LST|lvshun|ls|277@lxi|陇西|LXJ|longxi|lx|278@lxi|澧县|LEQ|lixian|lx|279@lxi|兰溪|LWH|lanxi|lx|280@lxi|临西|UEP|linxi|lx|281@lya|龙岩|LYS|longyan|ly|282@lya|耒阳|LYQ|leiyang|ly|283@lya|洛阳|LYF|luoyang|ly|284@lyd|洛阳东|LDF|luoyangdong|lyd|285@lyd|连云港东|UKH|lianyungangdong|lygd|286@lyi|临沂|LVK|linyi|ly|287@lym|洛阳龙门|LLF|luoyanglongmen|lylm|288@lyu|柳园|DHR|liuyuan|ly|289@lyu|凌源|LYD|lingyuan|ly|290@lyu|辽源|LYL|liaoyuan|ly|291@lzh|立志|LZX|lizhi|lz|292@lzh|柳州|LZZ|liuzhou|lz|293@lzh|辽中|LZD|liaozhong|lz|294@mch|麻城|MCN|macheng|mc|295@mdh|免渡河|MDX|mianduhe|mdh|296@mdj|牡丹江|MDB|mudanjiang|mdj|297@meg|莫尔道嘎|MRX|moerdaoga|medg|298@mgu|满归|MHX|mangui|mg|299@mgu|明光|MGH|mingguang|mg|300@mhe|漠河|MVX|mohe|mh|301@mmi|茂名|MDQ|maoming|mm|302@mmx|茂名西|MMZ|maomingxi|mmx|303@msh|密山|MSB|mishan|ms|304@msj|马三家|MJT|masanjia|msj|305@mwe|麻尾|VAW|mawei|mw|306@mya|绵阳|MYW|mianyang|my|307@mzh|梅州|MOQ|meizhou|mz|308@mzl|满洲里|MLX|manzhouli|mzl|309@nbd|宁波东|NVH|ningbodong|nbd|310@nbo|宁波|NGH|ningbo|nb|311@nch|南岔|NCB|nancha|nc|312@nch|南充|NCW|nanchong|nc|313@nda|南丹|NDZ|nandan|nd|314@ndm|南大庙|NMP|nandamiao|ndm|315@nfe|南芬|NFT|nanfen|nf|316@nhe|讷河|NHX|nehe|nh|317@nji|嫩江|NGX|nenjiang|nj|318@nji|内江|NJW|neijiang|nj|319@npi|南平|NPS|nanping|np|320@nto|南通|NUH|nantong|nt|321@nya|南阳|NFF|nanyang|ny|322@nzs|碾子山|NZX|nianzishan|nzs|323@pds|平顶山|PEN|pingdingshan|pds|324@pji|盘锦|PVD|panjin|pj|325@pli|平凉|PIJ|pingliang|pl|326@pln|平凉南|POJ|pingliangnan|pln|327@pqu|平泉|PQP|pingquan|pq|328@psh|坪石|PSQ|pingshi|ps|329@pxi|萍乡|PXG|pingxiang|px|330@pxi|凭祥|PXZ|pingxiang|px|331@pxx|郫县西|PCW|pixianxi|pxx|332@pzh|攀枝花|PRW|panzhihua|pzh|333@qch|蕲春|QRN|qichun|qc|334@qcs|青城山|QSW|qingchengshan|qcs|335@qda|青岛|QDK|qingdao|qd|336@qhc|清河城|QYP|qinghecheng|qhc|337@qji|曲靖|QJM|qujing|qj|338@qji|黔江|QNW|qianjiang|qj|339@qjz|前进镇|QEB|qianjinzhen|qjz|340@qqe|齐齐哈尔|QHX|qiqihaer|qqhe|341@qth|七台河|QTB|qitaihe|qth|342@qxi|沁县|QVV|qinxian|qx|343@qzd|泉州东|QRS|quanzhoudong|qzd|344@qzh|泉州|QYS|quanzhou|qz|345@qzh|衢州|QEH|quzhou|qz|346@ran|融安|RAZ|rongan|ra|347@rjg|汝箕沟|RQJ|rujigou|rqg|348@rji|瑞金|RJG|ruijin|rj|349@rzh|日照|RZK|rizhao|rz|350@scp|双城堡|SCB|shuangchengpu|scb|351@sfh|绥芬河|SFB|suifenhe|sfh|352@sgd|韶关东|SGQ|shaoguandong|sgd|353@shg|山海关|SHD|shanhaiguan|shg|354@shu|绥化|SHB|suihua|sh|355@sjf|三间房|SFX|sanjianfang|sjf|356@sjt|苏家屯|SXT|sujiatun|sjt|357@sla|舒兰|SLL|shulan|sl|358@smi|三明|SMS|sanming|sm|359@smu|神木|OMY|shenmu|sm|360@smx|三门峡|SMF|sanmenxia|smx|361@sna|商南|ONY|shangnan|sn|362@sni|遂宁|NIW|suining|sn|363@spi|四平|SPT|siping|sp|364@sqi|商丘|SQF|shangqiu|sq|365@sra|上饶|SRG|shangrao|sr|366@ssh|韶山|SSQ|shaoshan|ss|367@sso|宿松|OAH|susong|ss|368@sto|汕头|OTQ|shantou|st|369@swu|邵武|SWS|shaowu|sw|370@sxi|涉县|OEP|shexian|sx|371@sya|三亚|SEQ|sanya|sy|372@sya|三  亚|JUQ|sanya|sy|373@sya|邵阳|SYQ|shaoyang|sy|374@sya|十堰|SNN|shiyan|sy|375@sys|双鸭山|SSB|shuangyashan|sys|376@syu|松原|VYT|songyuan|sy|377@szh|深圳|SZQ|shenzhen|sz|378@szh|苏州|SZH|suzhou|sz|379@szh|随州|SZN|suizhou|sz|380@szh|宿州|OXH|suzhou|sz|381@szh|朔州|SUV|shuozhou|sz|382@szx|深圳西|OSQ|shenzhenxi|szx|383@tba|塘豹|TBQ|tangbao|tb|384@teq|塔尔气|TVX|taerqi|teq|385@tgu|潼关|TGY|tongguan|tg|386@tgu|塘沽|TGP|tanggu|tg|387@the|塔河|TXX|tahe|th|388@thu|通化|THL|tonghua|th|389@tla|泰来|TLX|tailai|tl|390@tlf|吐鲁番|TFR|tulufan|tlf|391@tli|通辽|TLD|tongliao|tl|392@tli|铁岭|TLT|tieling|tl|393@tlz|陶赖昭|TPT|taolaizhao|tlz|394@tme|图们|TML|tumen|tm|395@tre|铜仁|RDQ|tongren|tr|396@tsb|唐山北|FUP|tangshanbei|tsb|397@tsf|田师府|TFT|tianshifu|tsf|398@tsh|泰山|TAK|taishan|ts|399@tsh|唐山|TSP|tangshan|ts|400@tsh|天水|TSJ|tianshui|ts|401@typ|通远堡|TYT|tongyuanpu|tyb|402@tys|太阳升|TQT|taiyangsheng|tys|403@tzh|泰州|UTH|taizhou|tz|404@tzi|桐梓|TZW|tongzi|tz|405@tzx|通州西|TAP|tongzhouxi|tzx|406@wch|五常|WCB|wuchang|wc|407@wch|武昌|WCN|wuchang|wc|408@wfd|瓦房店|WDT|wafangdian|wfd|409@wha|威海|WKK|weihai|wh|410@whu|芜湖|WHH|wuhu|wh|411@whx|乌海西|WXC|wuhaixi|whx|412@wjt|吴家屯|WJT|wujiatun|wjt|413@wlo|武隆|WLW|wulong|wl|414@wlt|乌兰浩特|WWT|wulanhaote|wlht|415@wna|渭南|WNY|weinan|wn|416@wsh|威舍|WSM|weishe|ws|417@wts|歪头山|WIT|waitoushan|wts|418@wwe|武威|WUJ|wuwei|ww|419@wwn|武威南|WWJ|wuweinan|wwn|420@wxi|无锡|WXH|wuxi|wx|421@wxi|乌西|WXR|wuxi|wx|422@wyl|乌伊岭|WPB|wuyiling|wyl|423@wys|武夷山|WAS|wuyishan|wys|424@wyu|万源|WYY|wanyuan|wy|425@wzh|万州|WYW|wanzhou|wz|426@wzh|梧州|WZZ|wuzhou|wz|427@wzh|温州|RZH|wenzhou|wz|428@wzn|温州南|VRH|wenzhounan|wzn|429@xch|西昌|ECW|xichang|xc|430@xch|许昌|XCF|xuchang|xc|431@xcn|西昌南|ENW|xichangnan|xcn|432@xfa|香坊|XFB|xiangfang|xf|433@xga|轩岗|XGV|xuangang|xg|434@xgu|兴国|EUG|xingguo|xg|435@xha|宣汉|XHY|xuanhan|xh|436@xhu|新会|EFQ|xinhui|xh|437@xhu|新晃|XLQ|xinhuang|xh|438@xlt|锡林浩特|XTC|xilinhaote|xlht|439@xlx|兴隆县|EXP|xinglongxian|xlx|440@xmb|厦门北|XKS|xiamenbei|xmb|441@xme|厦门|XMS|xiamen|xm|442@xmq|厦门高崎|XBS|xiamengaoqi|xmgq|443@xsh|小市|XST|xiaoshi|xs|444@xsh|秀山|ETW|xiushan|xs|445@xta|向塘|XTG|xiangtang|xt|446@xwe|宣威|XWM|xuanwei|xw|447@xxi|新乡|XXF|xinxiang|xx|448@xya|信阳|XUN|xinyang|xy|449@xya|咸阳|XYY|xianyang|xy|450@xya|襄阳|XFN|xiangyang|xy|451@xyc|熊岳城|XYT|xiongyuecheng|xyc|452@xyi|兴义|XRZ|xingyi|xy|453@xyi|新沂|VIH|xinyi|xy|454@xyu|新余|XUG|xinyu|xy|455@xzh|徐州|XCH|xuzhou|xz|456@yan|延安|YWY|yanan|ya|457@ybi|宜宾|YBW|yibin|yb|458@ybn|亚布力南|YWB|yabulinan|ybln|459@ybs|叶柏寿|YBD|yebaishou|ybs|460@ycd|宜昌东|HAN|yichangdong|ycd|461@ych|永川|YCW|yongchuan|yc|462@ych|宜昌|YCN|yichang|yc|463@ych|盐城|AFH|yancheng|yc|464@ych|运城|YNV|yuncheng|yc|465@ych|伊春|YCB|yichun|yc|466@yci|榆次|YCV|yuci|yc|467@ycu|杨村|YBP|yangcun|yc|468@ycx|宜春西|YCG|yichunxi|ycx|469@yes|伊尔施|YET|yiershi|yes|470@yga|燕岗|YGW|yangang|yg|471@yji|永济|YIV|yongji|yj|472@yji|延吉|YJL|yanji|yj|473@yko|营口|YKT|yingkou|yk|474@yks|牙克石|YKX|yakeshi|yks|475@yli|阎良|YNY|yanliang|yl|476@yli|玉林|YLZ|yulin|yl|477@yli|榆林|ALY|yulin|yl|478@ylw|亚龙湾|TWQ|yalongwan|ylw|479@ymp|一面坡|YPB|yimianpo|ymp|480@yni|伊宁|YMR|yining|yn|481@ypg|阳平关|YAY|yangpingguan|ypg|482@ypi|玉屏|YZW|yuping|yp|483@ypi|原平|YPV|yuanping|yp|484@yqi|延庆|YNP|yanqing|yq|485@yqq|阳泉曲|YYV|yangquanqu|yqq|486@yqu|玉泉|YQB|yuquan|yq|487@yqu|阳泉|AQP|yangquan|yq|488@ysh|营山|NUW|yingshan|ys|489@ysh|玉山|YNG|yushan|ys|490@ysh|燕山|AOP|yanshan|ys|491@ysh|榆树|YRT|yushu|ys|492@yta|鹰潭|YTG|yingtan|yt|493@yta|烟台|YAK|yantai|yt|494@yth|伊图里河|YEX|yitulihe|ytlh|495@ytx|玉田县|ATP|yutianxian|ytx|496@ywu|义乌|YWH|yiwu|yw|497@yxi|阳新|YON|yangxin|yx|498@yxi|义县|YXD|yixian|yx|499@yya|益阳|AEQ|yiyang|yy|500@yya|岳阳|YYQ|yueyang|yy|501@yzh|崖州|YUQ|yazhou|yz|502@yzh|永州|AOQ|yongzhou|yz|503@yzh|扬州|YLH|yangzhou|yz|504@zbo|淄博|ZBK|zibo|zb|505@zcd|镇城底|ZDV|zhenchengdi|zcd|506@zgo|自贡|ZGW|zigong|zg|507@zha|珠海|ZHQ|zhuhai|zh|508@zhb|珠海北|ZIQ|zhuhaibei|zhb|509@zji|湛江|ZJZ|zhanjiang|zj|510@zji|镇江|ZJH|zhenjiang|zj|511@zjj|张家界|DIQ|zhangjiajie|zjj|512@zjk|张家口|ZKP|zhangjiakou|zjk|513@zjn|张家口南|ZMP|zhangjiakounan|zjkn|514@zko|周口|ZKN|zhoukou|zk|515@zlm|哲里木|ZLC|zhelimu|zlm|516@zlt|扎兰屯|ZTX|zhalantun|zlt|517@zmd|驻马店|ZDN|zhumadian|zmd|518@zqi|肇庆|ZVQ|zhaoqing|zq|519@zsz|周水子|ZIT|zhoushuizi|zsz|520@zto|昭通|ZDW|zhaotong|zt|521@zwe|中卫|ZWJ|zhongwei|zw|522@zya|资阳|ZYW|ziyang|zy|523@zyi|遵义|ZIW|zunyi|zy|524@zzh|枣庄|ZEK|zaozhuang|zz|525@zzh|资中|ZZW|zizhong|zz|526@zzh|株洲|ZZQ|zhuzhou|zz|527@zzx|枣庄西|ZFK|zaozhuangxi|zzx|528@aax|昂昂溪|AAX|angangxi|aax|529@ach|阿城|ACB|acheng|ac|530@ada|安达|ADX|anda|ad|531@ade|安德|ARW|ande|ad|532@adi|安定|ADP|anding|ad|533@agu|安广|AGT|anguang|ag|534@ahe|艾河|AHP|aihe|ah|535@ahu|安化|PKQ|anhua|ah|536@ajc|艾家村|AJJ|aijiacun|ajc|537@aji|鳌江|ARH|aojiang|aj|538@aji|安家|AJB|anjia|aj|539@aji|阿金|AJD|ajin|aj|540@akt|阿克陶|AER|aketao|akt|541@aky|安口窑|AYY|ankouyao|aky|542@alg|敖力布告|ALD|aolibugao|albg|543@alo|安龙|AUZ|anlong|al|544@als|阿龙山|ASX|alongshan|als|545@alu|安陆|ALN|anlu|al|546@ame|阿木尔|JTX|amuer|ame|547@anz|阿南庄|AZM|ananzhuang|anz|548@aqx|安庆西|APH|anqingxi|aqx|549@asx|鞍山西|AXT|anshanxi|asx|550@ata|安塘|ATV|antang|at|551@atb|安亭北|ASH|antingbei|atb|552@ats|阿图什|ATR|atushi|ats|553@atu|安图|ATL|antu|at|554@axi|安溪|AXS|anxi|ax|555@bao|博鳌|BWQ|boao|ba|556@bbe|北碚|BPW|beibei|bb|557@bbg|白壁关|BGV|baibiguan|bbg|558@bbn|蚌埠南|BMH|bengbunan|bbn|559@bch|巴楚|BCR|bachu|bc|560@bch|板城|BUP|bancheng|bc|561@bdh|北戴河|BEP|beidaihe|bdh|562@bdi|保定|BDP|baoding|bd|563@bdi|宝坻|BPP|baodi|bd|564@bdl|八达岭|ILP|badaling|bdl|565@bdo|巴东|BNN|badong|bd|566@bgu|柏果|BGM|baiguo|bg|567@bha|布海|BUT|buhai|bh|568@bhd|白河东|BIY|baihedong|bhd|569@bho|贲红|BVC|benhong|bh|570@bhs|宝华山|BWH|baohuashan|bhs|571@bhx|白河县|BEY|baihexian|bhx|572@bjg|白芨沟|BJJ|baijigou|bjg|573@bjg|碧鸡关|BJM|bijiguan|bjg|574@bji|北滘|IBQ|beijiao|b|575@bji|碧江|BLQ|bijiang|bj|576@bjp|白鸡坡|BBM|baijipo|bjp|577@bjs|笔架山|BSB|bijiashan|bjs|578@bjt|八角台|BTD|bajiaotai|bjt|579@bka|保康|BKD|baokang|bk|580@bkp|白奎堡|BKB|baikuipu|bkb|581@bla|白狼|BAT|bailang|bl|582@bla|百浪|BRZ|bailang|bl|583@ble|博乐|BOR|bole|bl|584@blg|宝拉格|BQC|baolage|blg|585@bli|巴林|BLX|balin|bl|586@bli|宝林|BNB|baolin|bl|587@bli|北流|BOZ|beiliu|bl|588@bli|勃利|BLB|boli|bl|589@blk|布列开|BLR|buliekai|blk|590@bls|宝龙山|BND|baolongshan|bls|591@blx|百里峡|AAP|bailixia|blx|592@bmc|八面城|BMD|bamiancheng|bmc|593@bmq|班猫箐|BNM|banmaoqing|bmj|594@bmt|八面通|BMB|bamiantong|bmt|595@bmz|北马圈子|BRP|beimaquanzi|bmqz|596@bpn|北票南|RPD|beipiaonan|bpn|597@bqi|白旗|BQP|baiqi|bq|598@bql|宝泉岭|BQB|baoquanling|bql|599@bqu|白泉|BQL|baiquan|bq|600@bsh|巴山|BAY|bashan|bs|601@bsh|白沙|BSW|baisha|bs|602@bsj|白水江|BSY|baishuijiang|bsj|603@bsp|白沙坡|BPM|baishapo|bsp|604@bss|白石山|BAL|baishishan|bss|605@bsz|白水镇|BUM|baishuizhen|bsz|606@btd|包头 东|FDC|baotoudong|btd|607@bti|坂田|BTQ|bantian|bt|608@bto|泊头|BZP|botou|bt|609@btu|北屯|BYP|beitun|bt|610@bxh|本溪湖|BHT|benxihu|bxh|611@bxi|博兴|BXK|boxing|bx|612@bxt|八仙筒|VXD|baxiantong|bxt|613@byg|白音察干|BYC|baiyinchagan|bycg|614@byh|背荫河|BYB|beiyinhe|byh|615@byi|北营|BIV|beiying|by|616@byl|巴彦高勒|BAC|bayangaole|bygl|617@byl|白音他拉|BID|baiyintala|bytl|618@byq|鲅鱼圈|BYT|bayuquan|byq|619@bys|白银市|BNJ|baiyinshi|bys|620@bys|白音胡硕|BCD|baiyinhushuo|byhs|621@bzh|巴中|IEW|bazhong|bz|622@bzh|霸州|RMP|bazhou|bz|623@bzh|北宅|BVP|beizhai|bz|624@cbb|赤壁北|CIN|chibibei|cbb|625@cbg|查布嘎|CBC|chabuga|cbg|626@cch|长城|CEJ|changcheng|cc|627@cch|长冲|CCM|changchong|cc|628@cdd|承德东|CCP|chengdedong|cdd|629@cfx|赤峰西|CID|chifengxi|cfx|630@cga|嵯岗|CAX|cuogang|cg|631@cga|柴岗|CGT|chaigang|cg|632@cge|长葛|CEF|changge|cg|633@cgp|柴沟堡|CGV|chaigoupu|cgb|634@cgu|城固|CGY|chenggu|cg|635@cgy|陈官营|CAJ|chenguanying|cgy|636@cgz|成高子|CZB|chenggaozi|cgz|637@cha|草海|WBW|caohai|ch|638@che|柴河|CHB|chaihe|ch|639@che|册亨|CHZ|ceheng|ch|640@chk|草河口|CKT|caohekou|chk|641@chk|崔黄口|CHP|cuihuangkou|chk|642@chu|巢湖|CIH|chaohu|ch|643@cjg|蔡家沟|CJT|caijiagou|cjg|644@cjh|成吉思汗|CJX|chengjisihan|cjsh|645@cji|岔江|CAM|chajiang|cj|646@cjp|蔡家坡|CJY|caijiapo|cjp|647@cle|昌乐|CLK|changle|cl|648@clg|超梁沟|CYP|chaolianggou|clg|649@cli|慈利|CUQ|cili|cl|650@cli|昌黎|CLP|changli|cl|651@clz|长岭子|CLT|changlingzi|clz|652@cmi|晨明|CMB|chenming|cm|653@cno|长农|CNJ|changnong|cn|654@cpb|昌平北|VBP|changpingbei|cpb|655@cpi|常平|DAQ|changping|cp|656@cpl|长坡岭|CPM|changpoling|cpl|657@cqi|辰清|CQB|chenqing|cq|658@csh|蔡山|CON|caishan|cs|659@csh|楚山|CSB|chushan|cs|660@csh|长寿|EFW|changshou|cs|661@csh|磁山|CSP|cishan|cs|662@csh|苍石|CST|cangshi|cs|663@csh|草市|CSL|caoshi|cs|664@csq|察素齐|CSC|chasuqi|csq|665@cst|长山屯|CVT|changshantun|cst|666@cti|长汀|CES|changting|ct|667@ctx|昌图西|CPT|changtuxi|ctx|668@cwa|春湾|CQQ|chunwan|cw|669@cxi|磁县|CIP|cixian|cx|670@cxi|岑溪|CNZ|cenxi|cx|671@cxi|辰溪|CXQ|chenxi|cx|672@cxi|磁西|CRP|cixi|cx|673@cxn|长兴南|CFH|changxingnan|cxn|674@cya|磁窑|CYK|ciyao|cy|675@cya|朝阳|CYD|chaoyang|cy|676@cya|春阳|CAL|chunyang|cy|677@cya|城阳|CEK|chengyang|cy|678@cyc|创业村|CEX|chuangyecun|cyc|679@cyc|朝阳川|CYL|chaoyangchuan|cyc|680@cyd|朝阳地|CDD|chaoyangdi|cyd|681@cyu|长垣|CYF|changyuan|cy|682@cyz|朝阳镇|CZL|chaoyangzhen|cyz|683@czb|滁州北|CUH|chuzhoubei|czb|684@czb|常州北|ESH|changzhoubei|czb|685@czh|滁州|CXH|chuzhou|cz|686@czh|潮州|CKQ|chaozhou|cz|687@czh|常庄|CVK|changzhuang|cz|688@czl|曹子里|CFP|caozili|czl|689@czw|车转湾|CWM|chezhuanwan|czw|690@czx|郴州西|ICQ|chenzhouxi|czx|691@czx|沧州西|CBP|cangzhouxi|czx|692@dan|德安|DAG|dean|da|693@dan|大安|RAT|daan|da|694@dba|大坝|DBJ|daba|db|695@dba|大板|DBC|daban|db|696@dba|大巴|DBD|daba|db|697@dba|到保|RBT|daobao|db|698@dbi|定边|DYJ|dingbian|db|699@dbj|东边井|DBB|dongbianjing|dbj|700@dbs|德伯斯|RDT|debosi|dbs|701@dcg|打柴沟|DGJ|dachaigou|dcg|702@dch|德昌|DVW|dechang|dc|703@dda|滴道|DDB|didao|dd|704@ddg|大磴沟|DKJ|dadenggou|ddg|705@ded|刀尔登|DRD|daoerdeng|ded|706@dee|得耳布尔|DRX|deerbuer|debe|707@dfa|东方|UFQ|dongfang|df|708@dfe|丹凤|DGY|danfeng|df|709@dfe|东丰|DIL|dongfeng|df|710@dge|都格|DMM|duge|dg|711@dgt|大官屯|DTT|daguantun|dgt|712@dgu|大关|RGW|daguan|dg|713@dgu|东光|DGP|dongguang|dg|714@dha|东海|DHB|donghai|dh|715@dhc|大灰厂|DHP|dahuichang|dhc|716@dhq|大红旗|DQD|dahongqi|dhq|717@dht|大禾塘|SOQ|shaodong|sd|718@dhx|东海县|DQH|donghaixian|dhx|719@dhx|德惠西|DXT|dehuixi|dhx|720@djg|达家沟|DJT|dajiagou|djg|721@dji|东津|DKB|dongjin|dj|722@dji|杜家|DJL|dujia|dj|723@dkt|大口屯|DKP|dakoutun|dkt|724@dla|东来|RVD|donglai|dl|725@dlh|德令哈|DHO|delingha|dlh|726@dlh|大陆号|DLC|daluhao|dlh|727@dli|带岭|DLB|dailing|dl|728@dli|大林|DLD|dalin|dl|729@dlq|达拉特旗|DIC|dalateqi|dltq|730@dlt|独立屯|DTX|dulitun|dlt|731@dlu|豆罗|DLV|douluo|dl|732@dlx|达拉特西|DNC|dalatexi|dltx|733@dmc|东明村|DMD|dongmingcun|dmc|734@dmh|洞庙河|DEP|dongmiaohe|dmh|735@dmx|东明县|DNF|dongmingxian|dmx|736@dni|大拟|DNZ|dani|dn|737@dpf|大平房|DPD|dapingfang|dpf|738@dps|大盘石|RPP|dapanshi|dps|739@dpu|大埔|DPI|dapu|dp|740@dpu|大堡|DVT|dapu|db|741@dqd|大庆东|LFX|daqingdong|dqd|742@dqh|大其拉哈|DQX|daqilaha|dqlh|743@dqi|道清|DML|daoqing|dq|744@dqs|对青山|DQB|duiqingshan|dqs|745@dqx|德清西|MOH|deqingxi|dqx|746@dqx|大庆西|RHX|daqingxi|dqx|747@dsh|东升|DRQ|dongsheng|ds|748@dsh|独山|RWW|dushan|ds|749@dsh|砀山|DKH|dangshan|ds|750@dsh|登沙河|DWT|dengshahe|dsh|751@dsp|读书铺|DPM|dushupu|dsp|752@dst|大石头|DSL|dashitou|dst|753@dsx|东胜西|DYC|dongshengxi|dsx|754@dsz|大石寨|RZT|dashizhai|dsz|755@dta|东台|DBH|dongtai|dt|756@dta|定陶|DQK|dingtao|dt|757@dta|灯塔|DGT|dengta|dt|758@dtb|大田边|DBM|datianbian|dtb|759@dth|东通化|DTL|dongtonghua|dth|760@dtu|丹徒|RUH|dantu|dt|761@dtu|大屯|DNT|datun|dt|762@dwa|东湾|DRJ|dongwan|dw|763@dwk|大武口|DFJ|dawukou|dwk|764@dwp|低窝铺|DWJ|diwopu|dwp|765@dwt|大王滩|DZZ|dawangtan|dwt|766@dwz|大湾子|DFM|dawanzi|dwz|767@dxg|大兴沟|DXL|daxinggou|dxg|768@dxi|大兴|DXX|daxing|dx|769@dxi|定西|DSJ|dingxi|dx|770@dxi|甸心|DXM|dianxin|dx|771@dxi|东乡|DXG|dongxiang|dx|772@dxi|代县|DKV|daixian|dx|773@dxi|定襄|DXV|dingxiang|dx|774@dxu|东戌|RXP|dongxu|dx|775@dxz|东辛庄|DXD|dongxinzhuang|dxz|776@dya|德阳|DYW|deyang|dy|777@dya|丹阳|DYH|danyang|dy|778@dya|大雁|DYX|dayan|dy|779@dya|当阳|DYN|dangyang|dy|780@dyb|丹阳北|EXH|danyangbei|dyb|781@dyd|大英东|IAW|dayingdong|dyd|782@dyd|东淤地|DBV|dongyudi|dyd|783@dyi|大营|DYV|daying|dy|784@dyu|定远|EWH|dingyuan|dy|785@dyu|岱岳|RYV|daiyue|dy|786@dyu|大元|DYZ|dayuan|dy|787@dyz|大营镇|DJP|dayingzhen|dyz|788@dyz|大营子|DZD|dayingzi|dyz|789@dzc|大战场|DTJ|dazhanchang|dzc|790@dzd|德州东|DIP|dezhoudong|dzd|791@dzh|低庄|DVQ|dizhuang|dz|792@dzh|东镇|DNV|dongzhen|dz|793@dzh|道州|DFZ|daozhou|dz|794@dzh|东至|DCH|dongzhi|dz|795@dzh|东庄|DZV|dongzhuang|dz|796@dzh|兑镇|DWV|duizhen|dz|797@dzh|豆庄|ROP|douzhuang|dz|798@dzh|定州|DXP|dingzhou|dz|799@dzy|大竹园|DZY|dazhuyuan|dzy|800@dzz|大杖子|DAP|dazhangzi|dzz|801@dzz|豆张庄|RZP|douzhangzhuang|dzz|802@ebi|峨边|EBW|ebian|eb|803@edm|二道沟门|RDP|erdaogoumen|edgm|804@edw|二道湾|RDX|erdaowan|edw|805@ees|鄂尔多斯|EEC|eerduosi|eeds|806@elo|二龙|RLD|erlong|el|807@elt|二龙山屯|ELA|erlongshantun|elst|808@eme|峨眉|EMW|emei|em|809@emh|二密河|RML|ermihe|emh|810@eyi|二营|RYJ|erying|ey|811@ezh|鄂州|ECN|ezhou|ez|812@fan|福安|FAS|fuan|fa|813@fch|丰城|FCG|fengcheng|fc|814@fcn|丰城南|FNG|fengchengnan|fcn|815@fdo|肥东|FIH|feidong|fd|816@fer|发耳|FEM|faer|fe|817@fha|富海|FHX|fuhai|fh|818@fha|福海|FHR|fuhai|fh|819@fhc|凤凰城|FHT|fenghuangcheng|fhc|820@fhe|汾河|FEV|fenhe|fh|821@fhu|奉化|FHH|fenghua|fh|822@fji|富锦|FIB|fujin|fj|823@fjt|范家屯|FTT|fanjiatun|fjt|824@flq|福利区|FLJ|fuliqu|flq|825@flt|福利屯|FTB|fulitun|flt|826@flz|丰乐镇|FZB|fenglezhen|flz|827@fna|阜南|FNH|funan|fn|828@fni|阜宁|AKH|funing|fn|829@fni|抚宁|FNP|funing|fn|830@fqi|福清|FQS|fuqing|fq|831@fqu|福泉|VMW|fuquan|fq|832@fsc|丰水村|FSJ|fengshuicun|fsc|833@fsh|丰顺|FUQ|fengshun|fs|834@fsh|繁峙|FSV|fanshi|fs|835@fsh|抚顺|FST|fushun|fs|836@fsk|福山口|FKP|fushankou|fsk|837@fsu|扶绥|FSZ|fusui|fs|838@ftu|冯屯|FTX|fengtun|ft|839@fty|浮图峪|FYP|futuyu|fty|840@fxd|富县东|FDY|fuxiandong|fxd|841@fxi|凤县|FXY|fengxian|fx|842@fxi|富县|FEY|fuxian|fx|843@fxi|费县|FXK|feixian|fx|844@fya|凤阳|FUH|fengyang|fy|845@fya|汾阳|FAV|fenyang|fy|846@fyb|扶余北|FBT|fuyubei|fyb|847@fyi|分宜|FYG|fenyi|fy|848@fyu|富源|FYM|fuyuan|fy|849@fyu|扶余|FYT|fuyu|fy|850@fyu|富裕|FYX|fuyu|fy|851@fzb|抚州北|FBG|fuzhoubei|fzb|852@fzh|凤州|FZY|fengzhou|fz|853@fzh|丰镇|FZC|fengzhen|fz|854@fzh|范镇|VZK|fanzhen|fz|855@gan|固安|GFP|guan|ga|856@gan|广安|VJW|guangan|ga|857@gbd|高碑店|GBP|gaobeidian|gbd|858@gbz|沟帮子|GBD|goubangzi|gbz|859@gcd|甘草店|GDJ|gancaodian|gcd|860@gch|谷城|GCN|gucheng|gc|861@gch|藁城|GEP|gaocheng|gc|862@gcu|高村|GCV|gaocun|gc|863@gcz|古城镇|GZB|guchengzhen|gcz|864@gde|广德|GRH|guangde|gd|865@gdi|贵定|GTW|guiding|gd|866@gdn|贵定南|IDW|guidingnan|gdn|867@gdo|古东|GDV|gudong|gd|868@gga|贵港|GGZ|guigang|gg|869@gga|官高|GVP|guangao|gg|870@ggm|葛根庙|GGT|gegenmiao|ggm|871@ggo|干沟|GGL|gangou|gg|872@ggu|甘谷|GGJ|gangu|gg|873@ggz|高各庄|GGP|gaogezhuang|ggz|874@ghe|甘河|GAX|ganhe|gh|875@ghe|根河|GEX|genhe|gh|876@gjd|郭家店|GDT|guojiadian|gjd|877@gjz|孤家子|GKT|gujiazi|gjz|878@gla|古浪|GLJ|gulang|gl|879@gla|皋兰|GEJ|gaolan|gl|880@glf|高楼房|GFM|gaoloufang|glf|881@glh|归流河|GHT|guiliuhe|glh|882@gli|关林|GLF|guanlin|gl|883@glu|甘洛|VOW|ganluo|gl|884@glz|郭磊庄|GLP|guoleizhuang|glz|885@gmi|高密|GMK|gaomi|gm|886@gmz|公庙子|GMC|gongmiaozi|gmz|887@gnh|工农湖|GRT|gongnonghu|gnh|888@gnn|广宁寺南|GNT|guangningsinan|gns|889@gnw|广南卫|GNM|guangnanwei|gnw|890@gpi|高平|GPF|gaoping|gp|891@gqb|甘泉北|GEY|ganquanbei|gqb|892@gqc|共青城|GAG|gongqingcheng|gqc|893@gqk|甘旗卡|GQD|ganqika|gqk|894@gqu|甘泉|GQY|ganquan|gq|895@gqz|高桥镇|GZD|gaoqiaozhen|gqz|896@gsh|灌水|GST|guanshui|gs|897@gsh|赶水|GSW|ganshui|gs|898@gsk|孤山口|GSP|gushankou|gsk|899@gso|果松|GSL|guosong|gs|900@gsz|高山子|GSD|gaoshanzi|gsz|901@gsz|嘎什甸子|GXD|gashidianzi|gsdz|902@gta|高台|GTJ|gaotai|gt|903@gta|高滩|GAY|gaotan|gt|904@gti|古田|GTS|gutian|gt|905@gti|官厅|GTP|guanting|gt|906@gtx|官厅西|KEP|guantingxi|gtx|907@gxi|贵溪|GXG|guixi|gx|908@gya|涡阳|GYH|guoyang|gy|909@gyi|巩义|GXF|gongyi|gy|910@gyi|高邑|GIP|gaoyi|gy|911@gyn|巩义南|GYF|gongyinan|gyn|912@gyn|广元南|GAW|guangyuannan|gyn|913@gyu|固原|GUJ|guyuan|gy|914@gyu|菇园|GYL|guyuan|gy|915@gyz|公营子|GYD|gongyingzi|gyz|916@gze|光泽|GZS|guangze|gz|917@gzh|古镇|GNQ|guzhen|gz|918@gzh|虢镇|GZY|guozhen|gz|919@gzh|瓜州|GZJ|guazhou|gz|920@gzh|高州|GSQ|gaozhou|gz|921@gzh|固镇|GEH|guzhen|gz|922@gzh|盖州|GXT|gaizhou|gz|923@gzj|官字井|GOT|guanzijing|gzj|924@gzp|革镇堡|GZT|gezhenpu|gzb|925@gzs|冠豸山|GSS|guanzhaishan|gzs|926@gzx|盖州西|GAT|gaizhouxi|gzx|927@han|红安|HWN|hongan|ha|928@han|淮安南|AMH|huaiannan|han|929@hax|红安西|VXN|honganxi|hax|930@hax|海安县|HIH|haianxian|hax|931@hba|黄柏|HBL|huangbai|hb|932@hbe|海北|HEB|haibei|hb|933@hbi|鹤壁|HAF|hebi|hb|934@hcb|会昌北|XEG|huichangbei|hcb|935@hch|华城|VCQ|huacheng|hc|936@hch|河唇|HCZ|hechun|hc|937@hch|汉川|HCN|hanchuan|hc|938@hch|海城|HCT|haicheng|hc|939@hch|合川|WKW|hechuan|hc|940@hct|黑冲滩|HCJ|heichongtan|hct|941@hcu|黄村|HCP|huangcun|hc|942@hcx|海城西|HXT|haichengxi|hcx|943@hde|化德|HGC|huade|hd|944@hdo|洪洞|HDV|hongtong|hd|945@hes|霍尔果斯|HFR|huoerguosi|hegs|946@hfe|横峰|HFG|hengfeng|hf|947@hfw|韩府湾|HXJ|hanfuwan|hfw|948@hgu|汉沽|HGP|hangu|hg|949@hgy|黄瓜园|HYM|huangguayuan|hgy|950@hgz|红光镇|IGW|hongguangzhen|hgz|951@hhe|浑河|HHT|hunhe|hh|952@hhg|红花沟|VHD|honghuagou|hhg|953@hht|黄花筒|HUD|huanghuatong|hht|954@hjd|贺家店|HJJ|hejiadian|hjd|955@hji|和静|HJR|hejing|hj|956@hji|红江|HFM|hongjiang|hj|957@hji|黑井|HIM|heijing|hj|958@hji|获嘉|HJF|huojia|hj|959@hji|河津|HJV|hejin|hj|960@hji|涵江|HJS|hanjiang|hj|961@hji|华家|HJT|huajia|hj|962@hjq|杭锦后旗|HDC|hangjinhouqi|hjhq|963@hjx|河间西|HXP|hejianxi|hjx|964@hjz|花家庄|HJM|huajiazhuang|hjz|965@hkn|河口南|HKJ|hekounan|hkn|966@hko|黄口|KOH|huangkou|hk|967@hko|湖口|HKG|hukou|hk|968@hla|呼兰|HUB|hulan|hl|969@hlb|葫芦岛北|HPD|huludaobei|hldb|970@hlh|浩良河|HHB|haolianghe|hlh|971@hlh|哈拉海|HIT|halahai|hlh|972@hli|鹤立|HOB|heli|hl|973@hli|桦林|HIB|hualin|hl|974@hli|黄陵|ULY|huangling|hl|975@hli|海林|HRB|hailin|hl|976@hli|虎林|VLB|hulin|hl|977@hli|寒岭|HAT|hanling|hl|978@hlo|和龙|HLL|helong|hl|979@hlo|海龙|HIL|hailong|hl|980@hls|哈拉苏|HAX|halasu|hls|981@hlt|呼鲁斯太|VTJ|hulusitai|hlst|982@hlz|火连寨|HLT|huolianzhai|hlz|983@hme|黄梅|VEH|huangmei|hm|984@hmy|韩麻营|HYP|hanmaying|hmy|985@hnh|黄泥河|HHL|huangnihe|hnh|986@hni|海宁|HNH|haining|hn|987@hno|惠农|HMJ|huinong|hn|988@hpi|和平|VAQ|heping|hp|989@hpz|花棚子|HZM|huapengzi|hpz|990@hqi|花桥|VQH|huaqiao|hq|991@hqi|宏庆|HEY|hongqing|hq|992@hre|怀仁|HRV|huairen|hr|993@hro|华容|HRN|huarong|hr|994@hsb|华山北|HDY|huashanbei|hsb|995@hsd|黄松甸|HDL|huangsongdian|hsd|996@hsg|和什托洛盖|VSR|heshituoluogai|hstlg|997@hsh|红山|VSB|hongshan|hs|998@hsh|汉寿|VSQ|hanshou|hs|999@hsh|衡山|HSQ|hengshan|hs|1000@hsh|黑水|HOT|heishui|hs|1001@hsh|惠山|VCH|huishan|hs|1002@hsh|虎什哈|HHP|hushiha|hsh|1003@hsp|红寺堡|HSJ|hongsipu|hsb|1004@hst|虎石台|HUT|hushitai|hst|1005@hsw|海石湾|HSO|haishiwan|hsw|1006@hsx|衡山西|HEQ|hengshanxi|hsx|1007@hsx|红砂岘|VSJ|hongshaxian|hsj|1008@hta|黑台|HQB|heitai|ht|1009@hta|桓台|VTK|huantai|ht|1010@hti|和田|VTR|hetian|ht|1011@hto|会同|VTQ|huitong|ht|1012@htz|海坨子|HZT|haituozi|htz|1013@hwa|黑旺|HWK|heiwang|hw|1014@hwa|海湾|RWH|haiwan|hw|1015@hxi|红星|VXB|hongxing|hx|1016@hxi|徽县|HYY|huixian|hx|1017@hxl|红兴隆|VHB|hongxinglong|hxl|1018@hxt|换新天|VTB|huanxintian|hxt|1019@hxt|红岘台|HTJ|hongxiantai|hxt|1020@hya|红彦|VIX|hongyan|hy|1021@hya|合阳|HAY|heyang|hy|1022@hya|海阳|HYK|haiyang|hy|1023@hyd|衡阳东|HVQ|hengyangdong|hyd|1024@hyi|华蓥|HUW|huaying|hy|1025@hyi|汉阴|HQY|hanyin|hy|1026@hyt|黄羊滩|HGJ|huangyangtan|hyt|1027@hyu|汉源|WHW|hanyuan|hy|1028@hyu|河源|VIQ|heyuan|hy|1029@hyu|花园|HUN|huayuan|hy|1030@hyu|湟源|HNO|huangyuan|hy|1031@hyz|黄羊镇|HYJ|huangyangzhen|hyz|1032@hzh|湖州|VZH|huzhou|hz|1033@hzh|化州|HZZ|huazhou|hz|1034@hzh|黄州|VON|huangzhou|hz|1035@hzh|霍州|HZV|huozhou|hz|1036@hzx|惠州西|VXQ|huizhouxi|hzx|1037@jba|巨宝|JRT|jubao|jb|1038@jbi|靖边|JIY|jingbian|jb|1039@jbt|金宝屯|JBD|jinbaotun|jbt|1040@jcb|晋城北|JEF|jinchengbei|jcb|1041@jch|金昌|JCJ|jinchang|jc|1042@jch|鄄城|JCK|juancheng|jc|1043@jch|交城|JNV|jiaocheng|jc|1044@jch|建昌|JFD|jianchang|jc|1045@jde|峻德|JDB|junde|jd|1046@jdi|井店|JFP|jingdian|jd|1047@jdo|鸡东|JOB|jidong|jd|1048@jdu|江都|UDH|jiangdu|jd|1049@jgs|鸡冠山|JST|jiguanshan|jgs|1050@jgt|金沟屯|VGP|jingoutun|jgt|1051@jha|静海|JHP|jinghai|jh|1052@jhe|金河|JHX|jinhe|jh|1053@jhe|锦河|JHB|jinhe|jh|1054@jhe|精河|JHR|jinghe|jh|1055@jhn|精河南|JIR|jinghenan|jhn|1056@jhu|江华|JHZ|jianghua|jh|1057@jhu|建湖|AJH|jianhu|jh|1058@jjg|纪家沟|VJD|jijiagou|jjg|1059@jji|晋江|JJS|jinjiang|jj|1060@jji|姜家|JJB|jiangjia|jj|1061@jji|江津|JJW|jiangjin|jj|1062@jke|金坑|JKT|jinkeng|jk|1063@jli|芨岭|JLJ|jiling|jl|1064@jmc|金马村|JMM|jinmacun|jmc|1065@jme|江门|JWQ|jiangmen|jm|1066@jme|角美|JES|jiaomei|jm|1067@jna|莒南|JOK|junan|jn|1068@jna|井南|JNP|jingnan|jn|1069@jou|建瓯|JVS|jianou|jo|1070@jpe|经棚|JPC|jingpeng|jp|1071@jqi|江桥|JQX|jiangqiao|jq|1072@jsa|九三|SSX|jiusan|js|1073@jsb|金山北|EGH|jinshanbei|jsb|1074@jsh|京山|JCN|jingshan|js|1075@jsh|建始|JRN|jianshi|js|1076@jsh|嘉善|JSH|jiashan|js|1077@jsh|稷山|JVV|jishan|js|1078@jsh|吉舒|JSL|jishu|js|1079@jsh|建设|JET|jianshe|js|1080@jsh|甲山|JOP|jiashan|js|1081@jsj|建三江|JIB|jiansanjiang|jsj|1082@jsn|嘉善南|EAH|jiashannan|jsn|1083@jst|金山屯|JTB|jinshantun|jst|1084@jst|江所田|JOM|jiangsuotian|jst|1085@jta|景泰|JTJ|jingtai|jt|1086@jtn|九台南|JNL|jiutainan|jtn|1087@jwe|吉文|JWX|jiwen|jw|1088@jxi|进贤|JUG|jinxian|jx|1089@jxi|莒县|JKK|juxian|jx|1090@jxi|嘉祥|JUK|jiaxiang|jx|1091@jxi|介休|JXV|jiexiu|jx|1092@jxi|嘉兴|JXH|jiaxing|jx|1093@jxi|井陉|JJP|jingxing|jx|1094@jxn|嘉兴南|EPH|jiaxingnan|jxn|1095@jxz|夹心子|JXT|jiaxinzi|jxz|1096@jya|揭阳|JRQ|jieyang|jy|1097@jya|建阳|JYS|jianyang|jy|1098@jya|姜堰|UEH|jiangyan|jy|1099@jya|简阳|JYW|jianyang|jy|1100@jye|巨野|JYK|juye|jy|1101@jyo|江永|JYZ|jiangyong|jy|1102@jyu|靖远|JYJ|jingyuan|jy|1103@jyu|缙云|JYH|jinyun|jy|1104@jyu|江源|SZL|jiangyuan|jy|1105@jyu|济源|JYF|jiyuan|jy|1106@jyx|靖远西|JXJ|jingyuanxi|jyx|1107@jzb|胶州北|JZK|jiaozhoubei|jzb|1108@jzd|焦作东|WEF|jiaozuodong|jzd|1109@jzh|靖州|JEQ|jingzhou|jz|1110@jzh|荆州|JBN|jingzhou|jz|1111@jzh|金寨|JZH|jinzhai|jz|1112@jzh|胶州|JXK|jiaozhou|jz|1113@jzh|晋州|JXP|jinzhou|jz|1114@jzn|锦州南|JOD|jinzhounan|jzn|1115@jzu|焦作|JOF|jiaozuo|jz|1116@jzw|旧庄窝|JVP|jiuzhuangwo|jzw|1117@jzz|金杖子|JYD|jinzhangzi|jzz|1118@kan|开安|KAT|kaian|ka|1119@kch|库车|KCR|kuche|kc|1120@kch|康城|KCP|kangcheng|kc|1121@kde|库都尔|KDX|kuduer|kde|1122@kdi|宽甸|KDT|kuandian|kd|1123@kdo|克东|KOB|kedong|kd|1124@kdz|昆独仑召|KDC|kundulunzhao|kdlz|1125@kji|开江|KAW|kaijiang|kj|1126@kjj|康金井|KJB|kangjinjing|kjj|1127@klq|喀喇其|KQX|kalaqi|klq|1128@klu|开鲁|KLC|kailu|kl|1129@kly|克拉玛依|KHR|kelamayi|klmy|1130@kqi|口前|KQL|kouqian|kq|1131@ksh|奎山|KAB|kuishan|ks|1132@ksh|昆山|KSH|kunshan|ks|1133@ksh|克山|KSB|keshan|ks|1134@kto|开通|KTT|kaitong|kt|1135@kxl|康熙岭|KXZ|kangxiling|kxl|1136@kya|昆阳|KAM|kunyang|ky|1137@kyh|克一河|KHX|keyihe|kyh|1138@kyx|开原西|KXT|kaiyuanxi|kyx|1139@kzh|康庄|KZP|kangzhuang|kz|1140@lbi|来宾|UBZ|laibin|lb|1141@lbi|老边|LLT|laobian|lb|1142@lbx|灵宝西|LPF|lingbaoxi|lbx|1143@lch|龙川|LUQ|longchuan|lc|1144@lch|乐昌|LCQ|lechang|lc|1145@lch|黎城|UCP|licheng|lc|1146@lch|聊城|UCK|liaocheng|lc|1147@lcu|蓝村|LCK|lancun|lc|1148@lda|两当|LDY|liangdang|ld|1149@ldo|林东|LRC|lindong|ld|1150@ldu|乐都|LDO|ledu|ld|1151@ldx|梁底下|LDP|liangdixia|ldx|1152@ldz|六道河子|LVP|liudaohezi|ldhz|1153@lfa|鲁番|LVM|lufan|lf|1154@lfa|廊坊|LJP|langfang|lf|1155@lfa|落垡|LOP|luofa|lf|1156@lfb|廊坊北|LFP|langfangbei|lfb|1157@lfu|老府|UFD|laofu|lf|1158@lga|兰岗|LNB|langang|lg|1159@lgd|龙骨甸|LGM|longgudian|lgd|1160@lgo|芦沟|LOM|lugou|lg|1161@lgo|龙沟|LGJ|longgou|lg|1162@lgu|拉古|LGB|lagu|lg|1163@lha|临海|UFH|linhai|lh|1164@lha|林海|LXX|linhai|lh|1165@lha|拉哈|LHX|laha|lh|1166@lha|凌海|JID|linghai|lh|1167@lhe|柳河|LNL|liuhe|lh|1168@lhe|六合|KLH|liuhe|lh|1169@lhu|龙华|LHP|longhua|lh|1170@lhy|滦河沿|UNP|luanheyan|lhy|1171@lhz|六合镇|LEX|liuhezhen|lhz|1172@ljd|亮甲店|LRT|liangjiadian|ljd|1173@ljd|刘家店|UDT|liujiadian|ljd|1174@ljh|刘家河|LVT|liujiahe|ljh|1175@lji|连江|LKS|lianjiang|lj|1176@lji|李家|LJB|lijia|lj|1177@lji|罗江|LJW|luojiang|lj|1178@lji|廉江|LJZ|lianjiang|lj|1179@lji|庐江|UJH|lujiang|lj|1180@lji|两家|UJT|liangjia|lj|1181@lji|龙江|LJX|longjiang|lj|1182@lji|龙嘉|UJL|longjia|lj|1183@ljk|莲江口|LHB|lianjiangkou|ljk|1184@ljl|蔺家楼|ULK|linjialou|ljl|1185@ljp|李家坪|LIJ|lijiaping|ljp|1186@lka|兰考|LKF|lankao|lk|1187@lko|林口|LKB|linkou|lk|1188@lkp|路口铺|LKQ|lukoupu|lkp|1189@lla|老莱|LAX|laolai|ll|1190@lli|拉林|LAB|lalin|ll|1191@lli|陆良|LRM|luliang|ll|1192@lli|龙里|LLW|longli|ll|1193@lli|临澧|LWQ|linli|ll|1194@lli|兰棱|LLB|lanling|ll|1195@lli|零陵|UWZ|lingling|ll|1196@llo|卢龙|UAP|lulong|ll|1197@lmd|喇嘛甸|LMX|lamadian|lmd|1198@lmd|里木店|LMB|limudian|lmd|1199@lme|洛门|LMJ|luomen|lm|1200@lna|龙南|UNG|longnan|ln|1201@lpi|梁平|UQW|liangping|lp|1202@lpi|罗平|LPM|luoping|lp|1203@lpl|落坡岭|LPP|luopoling|lpl|1204@lps|六盘山|UPJ|liupanshan|lps|1205@lps|乐平市|LPG|lepingshi|lps|1206@lqi|临清|UQK|linqing|lq|1207@lqs|龙泉寺|UQJ|longquansi|lqs|1208@lsb|乐山北|UTW|leshanbei|ls|1209@lsc|乐善村|LUM|leshancun|lsc|1210@lsd|冷水江东|UDQ|lengshuijiangdong|lsjd|1211@lsg|连山关|LGT|lianshanguan|lsg|1212@lsg|流水沟|USP|liushuigou|lsg|1213@lsh|陵水|LIQ|lingshui|ls|1214@lsh|罗山|LRN|luoshan|ls|1215@lsh|鲁山|LAF|lushan|ls|1216@lsh|丽水|USH|lishui|ls|1217@lsh|梁山|LMK|liangshan|ls|1218@lsh|灵石|LSV|lingshi|ls|1219@lsh|露水河|LUL|lushuihe|lsh|1220@lsh|庐山|LSG|lushan|ls|1221@lsp|林盛堡|LBT|linshengpu|lsp|1222@lst|柳树屯|LSD|liushutun|lst|1223@lsz|龙山镇|LAS|longshanzhen|lsz|1224@lsz|梨树镇|LSB|lishuzhen|lsz|1225@lsz|李石寨|LET|lishizhai|lsz|1226@lta|黎塘|LTZ|litang|lt|1227@lta|轮台|LAR|luntai|lt|1228@lta|芦台|LTP|lutai|lt|1229@ltb|龙塘坝|LBM|longtangba|ltb|1230@ltu|濑湍|LVZ|laituan|lt|1231@ltx|骆驼巷|LTJ|luotuoxiang|ltx|1232@lwa|李旺|VLJ|liwang|lw|1233@lwd|莱芜东|LWK|laiwudong|lwd|1234@lws|狼尾山|LRJ|langweishan|lws|1235@lwu|灵武|LNJ|lingwu|lw|1236@lwx|莱芜西|UXK|laiwuxi|lwx|1237@lxi|朗乡|LXB|langxiang|lx|1238@lxi|陇县|LXY|longxian|lx|1239@lxi|临湘|LXQ|linxiang|lx|1240@lxi|芦溪|LUG|luxi|lx|1241@lxi|莱西|LXK|laixi|lx|1242@lxi|林西|LXC|linxi|lx|1243@lxi|滦县|UXP|luanxian|lx|1244@lya|略阳|LYY|lueyang|ly|1245@lya|莱阳|LYK|laiyang|ly|1246@lya|辽阳|LYT|liaoyang|ly|1247@lyb|临沂北|UYK|linyibei|lyb|1248@lyd|凌源东|LDD|lingyuandong|lyd|1249@lyg|连云港|UIH|lianyungang|lyg|1250@lyi|临颍|LNF|linying|ly|1251@lyi|老营|LXL|laoying|ly|1252@lyo|龙游|LMH|longyou|ly|1253@lyu|罗源|LVS|luoyuan|ly|1254@lyu|林源|LYX|linyuan|ly|1255@lyu|涟源|LAQ|lianyuan|ly|1256@lyu|涞源|LYP|laiyuan|ly|1257@lyx|耒阳西|LPQ|leiyangxi|lyx|1258@lze|临泽|LEJ|linze|lz|1259@lzg|龙爪沟|LZT|longzhuagou|lzg|1260@lzh|雷州|UAQ|leizhou|lz|1261@lzh|六枝|LIW|liuzhi|lz|1262@lzh|鹿寨|LIZ|luzhai|lz|1263@lzh|来舟|LZS|laizhou|lz|1264@lzh|龙镇|LZA|longzhen|lz|1265@lzh|拉鲊|LEM|lazha|lz|1266@lzq|兰州新区|LQJ|lanzhouxinqu|lzxq|1267@mas|马鞍山|MAH|maanshan|mas|1268@mba|毛坝|MBY|maoba|mb|1269@mbg|毛坝关|MGY|maobaguan|mbg|1270@mcb|麻城北|MBN|machengbei|mcb|1271@mch|渑池|MCF|mianchi|mc|1272@mch|明城|MCL|mingcheng|mc|1273@mch|庙城|MAP|miaocheng|mc|1274@mcn|渑池南|MNF|mianchinan|mcn|1275@mcp|茅草坪|KPM|maocaoping|mcp|1276@mdh|猛洞河|MUQ|mengdonghe|mdh|1277@mds|磨刀石|MOB|modaoshi|mds|1278@mdu|弥渡|MDF|midu|md|1279@mes|帽儿山|MRB|maoershan|mes|1280@mga|明港|MGN|minggang|mg|1281@mhk|梅河口|MHL|meihekou|mhk|1282@mhu|马皇|MHZ|mahuang|mh|1283@mjg|孟家岗|MGB|mengjiagang|mjg|1284@mla|美兰|MHQ|meilan|ml|1285@mld|汨罗东|MQQ|miluodong|mld|1286@mlh|马莲河|MHB|malianhe|mlh|1287@mli|茅岭|MLZ|maoling|ml|1288@mli|庙岭|MLL|miaoling|ml|1289@mli|茂林|MLD|maolin|ml|1290@mli|穆棱|MLB|muling|ml|1291@mli|马林|MID|malin|ml|1292@mlo|马龙|MGM|malong|ml|1293@mlt|木里图|MUD|mulitu|mlt|1294@mlu|汨罗|MLQ|miluo|ml|1295@mnh|玛纳斯湖|MNR|manasihu|mnsh|1296@mni|冕宁|UGW|mianning|mn|1297@mpa|沐滂|MPQ|mupang|mp|1298@mqh|马桥河|MQB|maqiaohe|mqh|1299@mqi|闽清|MQS|minqing|mq|1300@mqu|民权|MQF|minquan|mq|1301@msh|明水河|MUT|mingshuihe|msh|1302@msh|麻山|MAB|mashan|ms|1303@msh|眉山|MSW|meishan|ms|1304@msw|漫水湾|MKW|manshuiwan|msw|1305@msz|茂舍祖|MOM|maoshezu|msz|1306@msz|米沙子|MST|mishazi|msz|1307@mxi|美溪|MEB|meixi|mx|1308@mxi|勉县|MVY|mianxian|mx|1309@mya|麻阳|MVQ|mayang|my|1310@myb|密云北|MUP|miyunbei|myb|1311@myi|米易|MMW|miyi|my|1312@myu|麦园|MYS|maiyuan|my|1313@myu|墨玉|MUR|moyu|my|1314@mzh|庙庄|MZJ|miaozhuang|mz|1315@mzh|米脂|MEY|mizhi|mz|1316@mzh|明珠|MFQ|mingzhu|mz|1317@nan|宁安|NAB|ningan|na|1318@nan|农安|NAT|nongan|na|1319@nbs|南博山|NBK|nanboshan|nbs|1320@nch|南仇|NCK|nanqiu|nc|1321@ncs|南城司|NSP|nanchengsi|ncs|1322@ncu|宁村|NCZ|ningcun|nc|1323@nde|宁德|NES|ningde|nd|1324@ngc|南观村|NGP|nanguancun|ngc|1325@ngd|南宫东|NFP|nangongdong|ngd|1326@ngl|南关岭|NLT|nanguanling|ngl|1327@ngu|宁国|NNH|ningguo|ng|1328@nha|宁海|NHH|ninghai|nh|1329@nhc|南河川|NHJ|nanhechuan|nhc|1330@nhu|南华|NHS|nanhua|nh|1331@nhz|泥河子|NHD|nihezi|nhz|1332@nji|宁家|NVT|ningjia|nj|1333@nji|南靖|NJS|nanjing|nj|1334@nji|牛家|NJB|niujia|nj|1335@nji|能家|NJD|nengjia|nj|1336@nko|南口|NKP|nankou|nk|1337@nkq|南口前|NKT|nankouqian|nkq|1338@nla|南朗|NNQ|nanlang|nl|1339@nli|乃林|NLD|nailin|nl|1340@nlk|尼勒克|NIR|nileke|nlk|1341@nlu|那罗|ULZ|naluo|nl|1342@nlx|宁陵县|NLF|ninglingxian|nlx|1343@nma|奈曼|NMD|naiman|nm|1344@nmi|宁明|NMZ|ningming|nm|1345@nmu|南木|NMX|nanmu|nm|1346@npn|南平南|NNS|nanpingnan|npn|1347@npu|那铺|NPZ|napu|np|1348@nqi|南桥|NQD|nanqiao|nq|1349@nqu|那曲|NQO|naqu|nq|1350@nqu|暖泉|NQJ|nuanquan|nq|1351@nta|南台|NTT|nantai|nt|1352@nto|南头|NOQ|nantou|nt|1353@nwu|宁武|NWV|ningwu|nw|1354@nwz|南湾子|NWP|nanwanzi|nwz|1355@nxb|南翔北|NEH|nanxiangbei|nxb|1356@nxi|宁乡|NXQ|ningxiang|nx|1357@nxi|内乡|NXF|neixiang|nx|1358@nxt|牛心台|NXT|niuxintai|nxt|1359@nyu|南峪|NUP|nanyu|ny|1360@nzg|娘子关|NIP|niangziguan|nzg|1361@nzh|南召|NAF|nanzhao|nz|1362@nzm|南杂木|NZT|nanzamu|nzm|1363@pan|蓬安|PAW|pengan|pa|1364@pan|平安|PAL|pingan|pa|1365@pay|平安驿|PNO|pinganyi|pay|1366@paz|磐安镇|PAJ|pananzhen|paz|1367@paz|平安镇|PZT|pinganzhen|paz|1368@pcd|蒲城东|PEY|puchengdong|pcd|1369@pch|蒲城|PCY|pucheng|pc|1370@pde|裴德|PDB|peide|pd|1371@pdi|偏店|PRP|piandian|pd|1372@pdx|平顶山西|BFF|pingdingshanxi|pdsx|1373@pdx|坡底下|PXJ|podixia|pdx|1374@pet|瓢儿屯|PRT|piaoertun|pet|1375@pfa|平房|PFB|pingfang|pf|1376@pga|平岗|PGL|pinggang|pg|1377@pgu|平关|PGM|pingguan|pg|1378@pgu|盘关|PAM|panguan|pg|1379@pgu|平果|PGZ|pingguo|pg|1380@phb|徘徊北|PHP|paihuaibei|phb|1381@phk|平河口|PHM|pinghekou|phk|1382@phu|平湖|PHQ|pinghu|ph|1383@pjb|盘锦北|PBD|panjinbei|pjb|1384@pjd|潘家店|PDP|panjiadian|pjd|1385@pkn|皮口南|PKT|pikounan|pk|1386@pld|普兰店|PLT|pulandian|pld|1387@pli|偏岭|PNT|pianling|pl|1388@psh|平山|PSB|pingshan|ps|1389@psh|彭山|PSW|pengshan|ps|1390@psh|皮山|PSR|pishan|ps|1391@psh|磐石|PSL|panshi|ps|1392@psh|平社|PSV|pingshe|ps|1393@psh|彭水|PHW|pengshui|ps|1394@pta|平台|PVT|pingtai|pt|1395@pti|平田|PTM|pingtian|pt|1396@pti|莆田|PTS|putian|pt|1397@ptq|葡萄菁|PTW|putaojing|ptj|1398@pwa|普湾|PWT|puwan|pw|1399@pwa|平旺|PWV|pingwang|pw|1400@pxg|平型关|PGV|pingxingguan|pxg|1401@pxi|普雄|POW|puxiong|px|1402@pxi|郫县|PWW|pixian|px|1403@pya|平洋|PYX|pingyang|py|1404@pya|彭阳|PYJ|pengyang|py|1405@pya|平遥|PYV|pingyao|py|1406@pyi|平邑|PIK|pingyi|py|1407@pyp|平原堡|PPJ|pingyuanpu|pyp|1408@pyu|平原|PYK|pingyuan|py|1409@pyu|平峪|PYP|pingyu|py|1410@pze|彭泽|PZG|pengze|pz|1411@pzh|邳州|PJH|pizhou|pz|1412@pzh|平庄|PZD|pingzhuang|pz|1413@pzi|泡子|POD|paozi|pz|1414@pzn|平庄南|PND|pingzhuangnan|pzn|1415@qan|乾安|QOT|qianan|qa|1416@qan|庆安|QAB|qingan|qa|1417@qan|迁安|QQP|qianan|qa|1418@qdb|祁东北|QRQ|qidongbei|qd|1419@qdi|七甸|QDM|qidian|qd|1420@qfd|曲阜东|QAK|qufudong|qfd|1421@qfe|庆丰|QFT|qingfeng|qf|1422@qft|奇峰塔|QVP|qifengta|qft|1423@qfu|曲阜|QFK|qufu|qf|1424@qha|琼海|QYQ|qionghai|qh|1425@qhd|秦皇岛|QTP|qinhuangdao|qhd|1426@qhe|千河|QUY|qianhe|qh|1427@qhe|清河|QIP|qinghe|qh|1428@qhm|清河门|QHD|qinghemen|qhm|1429@qhy|清华园|QHP|qinghuayuan|qhy|1430@qji|渠旧|QJZ|qujiu|qj|1431@qji|潜江|QJN|qianjiang|qj|1432@qji|全椒|INH|quanjiao|qj|1433@qji|秦家|QJB|qinjia|qj|1434@qji|綦江|QJW|qijiang|qj|1435@qjp|祁家堡|QBT|qijiapu|qjb|1436@qjx|清涧县|QNY|qingjianxian|qjx|1437@qjz|秦家庄|QZV|qinjiazhuang|qjz|1438@qlh|七里河|QLD|qilihe|qlh|1439@qli|秦岭|QLY|qinling|ql|1440@qli|渠黎|QLZ|quli|ql|1441@qlo|青龙|QIB|qinglong|ql|1442@qls|青龙山|QGH|qinglongshan|qls|1443@qme|祁门|QIH|qimen|qm|1444@qmt|前磨头|QMP|qianmotou|qmt|1445@qsh|青山|QSB|qingshan|qs|1446@qsh|确山|QSN|queshan|qs|1447@qsh|前山|QXQ|qianshan|qs|1448@qsh|清水|QUJ|qingshui|qs|1449@qsy|戚墅堰|QYH|qishuyan|qsy|1450@qti|青田|QVH|qingtian|qt|1451@qto|桥头|QAT|qiaotou|qt|1452@qtx|青铜峡|QTJ|qingtongxia|qtx|1453@qwe|前卫|QWD|qianwei|qw|1454@qwt|前苇塘|QWP|qianweitang|qwt|1455@qxi|渠县|QRW|quxian|qx|1456@qxi|祁县|QXV|qixian|qx|1457@qxi|青县|QXP|qingxian|qx|1458@qxi|桥西|QXJ|qiaoxi|qx|1459@qxu|清徐|QUV|qingxu|qx|1460@qxy|旗下营|QXC|qixiaying|qxy|1461@qya|千阳|QOY|qianyang|qy|1462@qya|沁阳|QYF|qinyang|qy|1463@qya|泉阳|QYL|quanyang|qy|1464@qyb|祁阳北|QVQ|qiyangbei|qy|1465@qyi|七营|QYJ|qiying|qy|1466@qys|庆阳山|QSJ|qingyangshan|qys|1467@qyu|清远|QBQ|qingyuan|qy|1468@qyu|清原|QYT|qingyuan|qy|1469@qzd|钦州东|QDZ|qinzhoudong|qzd|1470@qzh|钦州|QRZ|qinzhou|qz|1471@qzs|青州市|QZK|qingzhoushi|qzs|1472@ran|瑞安|RAH|ruian|ra|1473@rch|荣昌|RCW|rongchang|rc|1474@rch|瑞昌|RCG|ruichang|rc|1475@rga|如皋|RBH|rugao|rg|1476@rgu|容桂|RUQ|ronggui|rg|1477@rqi|任丘|RQP|renqiu|rq|1478@rsh|乳山|ROK|rushan|rs|1479@rsh|融水|RSZ|rongshui|rs|1480@rsh|热水|RSD|reshui|rs|1481@rxi|容县|RXZ|rongxian|rx|1482@rya|饶阳|RVP|raoyang|ry|1483@rya|汝阳|RYF|ruyang|ry|1484@ryh|绕阳河|RHD|raoyanghe|ryh|1485@rzh|汝州|ROF|ruzhou|rz|1486@sba|石坝|OBJ|shiba|sb|1487@sbc|上板城|SBP|shangbancheng|sbc|1488@sbi|施秉|AQW|shibing|sb|1489@sbn|上板城南|OBP|shangbanchengnan|sbcn|1490@sby|世博园|ZWT|shiboyuan|sby|1491@scb|双城北|SBB|shuangchengbei|scb|1492@sch|商城|SWN|shangcheng|sc|1493@sch|莎车|SCR|shache|sc|1494@sch|顺昌|SCS|shunchang|sc|1495@sch|舒城|OCH|shucheng|sc|1496@sch|神池|SMV|shenchi|sc|1497@sch|沙城|SCP|shacheng|sc|1498@sch|石城|SCT|shicheng|sc|1499@scz|山城镇|SCL|shanchengzhen|scz|1500@sda|山丹|SDJ|shandan|sd|1501@sde|顺德|ORQ|shunde|sd|1502@sde|绥德|ODY|suide|sd|1503@sdo|水洞|SIL|shuidong|sd|1504@sdu|商都|SXC|shangdu|sd|1505@sdu|十渡|SEP|shidu|sd|1506@sdw|四道湾|OUD|sidaowan|sdw|1507@sdy|顺德学院|OJQ|shundexueyuan|sdxy|1508@sfa|绅坊|OLH|shenfang|sf|1509@sfe|双丰|OFB|shuangfeng|sf|1510@sft|四方台|STB|sifangtai|sft|1511@sfu|水富|OTW|shuifu|sf|1512@sgk|三关口|OKJ|sanguankou|sgk|1513@sgl|桑根达来|OGC|sanggendalai|sgdl|1514@sgu|韶关|SNQ|shaoguan|sg|1515@sgz|上高镇|SVK|shanggaozhen|sgz|1516@sha|上杭|JBS|shanghang|sh|1517@sha|沙海|SED|shahai|sh|1518@she|松河|SBM|songhe|sh|1519@she|沙河|SHP|shahe|sh|1520@shk|沙河口|SKT|shahekou|shk|1521@shl|赛汗塔拉|SHC|saihantala|shtl|1522@shs|沙河市|VOP|shaheshi|shs|1523@shs|沙后所|SSD|shahousuo|shs|1524@sht|山河屯|SHL|shanhetun|sht|1525@shx|三河县|OXP|sanhexian|shx|1526@shy|四合永|OHD|siheyong|shy|1527@shz|三汇镇|OZW|sanhuizhen|shz|1528@shz|双河镇|SEL|shuanghezhen|shz|1529@shz|石河子|SZR|shihezi|shz|1530@shz|三合庄|SVP|sanhezhuang|shz|1531@sjd|三家店|ODP|sanjiadian|sjd|1532@sjh|水家湖|SQH|shuijiahu|sjh|1533@sjh|沈家河|OJJ|shenjiahe|sjh|1534@sjh|松江河|SJL|songjianghe|sjh|1535@sji|尚家|SJB|shangjia|sj|1536@sji|孙家|SUB|sunjia|sj|1537@sji|沈家|OJB|shenjia|sj|1538@sji|双吉|SML|shuangji|sj|1539@sji|松江|SAH|songjiang|sj|1540@sjk|三江口|SKD|sanjiangkou|sjk|1541@sjl|司家岭|OLK|sijialing|sjl|1542@sjn|松江南|IMH|songjiangnan|sjn|1543@sjn|石景山南|SRP|shijingshannan|sjsn|1544@sjt|邵家堂|SJJ|shaojiatang|sjt|1545@sjx|三江县|SOZ|sanjiangxian|sjx|1546@sjz|三家寨|SMM|sanjiazhai|sjz|1547@sjz|十家子|SJD|shijiazi|sjz|1548@sjz|松江镇|OZL|songjiangzhen|sjz|1549@sjz|施家嘴|SHM|shijiazui|sjz|1550@sjz|深井子|SWT|shenjingzi|sjz|1551@sld|什里店|OMP|shilidian|sld|1552@sle|疏勒|SUR|shule|sl|1553@slh|疏勒河|SHJ|shulehe|slh|1554@slh|舍力虎|VLD|shelihu|slh|1555@sli|石磷|SPB|shilin|sl|1556@sli|双辽|ZJD|shuangliao|sl|1557@sli|绥棱|SIB|suiling|sl|1558@sli|石岭|SOL|shiling|sl|1559@sli|石林|SLM|shilin|sl|1560@sln|石林南|LNM|shilinnan|sln|1561@slo|石龙|SLQ|shilong|sl|1562@slq|萨拉齐|SLC|salaqi|slq|1563@slu|索伦|SNT|suolun|sl|1564@slu|商洛|OLY|shangluo|sl|1565@slz|沙岭子|SLP|shalingzi|slz|1566@smb|石门县北|VFQ|shimenxianbei|smxb|1567@smn|三门峡南|SCF|sanmenxianan|smxn|1568@smx|三门县|OQH|sanmenxian|smx|1569@smx|石门县|OMQ|shimenxian|smx|1570@smx|三门峡西|SXF|sanmenxiaxi|smxx|1571@sni|肃宁|SYP|suning|sn|1572@son|宋|SOB|song|s|1573@spa|双牌|SBZ|shuangpai|sp|1574@spd|四平东|PPT|sipingdong|spd|1575@spi|遂平|SON|suiping|sp|1576@spt|沙坡头|SFJ|shapotou|spt|1577@sqi|沙桥|SQM|shaqiao|sq|1578@sqn|商丘南|SPF|shangqiunan|sqn|1579@squ|水泉|SID|shuiquan|sq|1580@sqx|石泉县|SXY|shiquanxian|sqx|1581@sqz|石桥子|SQT|shiqiaozi|sqz|1582@src|石人城|SRB|shirencheng|src|1583@sre|石人|SRL|shiren|sr|1584@ssh|山市|SQB|shanshi|ss|1585@ssh|神树|SWB|shenshu|ss|1586@ssh|鄯善|SSR|shanshan|ss|1587@ssh|三水|SJQ|sanshui|ss|1588@ssh|泗水|OSK|sishui|ss|1589@ssh|石山|SAD|shishan|ss|1590@ssh|松树|SFT|songshu|ss|1591@ssh|首山|SAT|shoushan|ss|1592@ssj|三十家|SRD|sanshijia|ssj|1593@ssp|三十里堡|SST|sanshilipu|sslb|1594@ssz|松树镇|SSL|songshuzhen|ssz|1595@sta|松桃|MZQ|songtao|st|1596@sth|索图罕|SHX|suotuhan|sth|1597@stj|三堂集|SDH|santangji|stj|1598@sto|石头|OTB|shitou|st|1599@sto|神头|SEV|shentou|st|1600@stu|沙沱|SFM|shatuo|st|1601@swa|上万|SWP|shangwan|sw|1602@swu|孙吴|SKB|sunwu|sw|1603@swx|沙湾县|SXR|shawanxian|swx|1604@sxi|遂溪|SXZ|suixi|sx|1605@sxi|沙县|SAS|shaxian|sx|1606@sxi|歙县|OVH|shexian|sx|1607@sxi|绍兴|SOH|shaoxing|sx|1608@sxi|石岘|SXL|shixian|sj|1609@sxp|上西铺|SXM|shangxipu|sxp|1610@sxz|石峡子|SXJ|shixiazi|sxz|1611@sya|绥阳|SYB|suiyang|sy|1612@sya|沭阳|FMH|shuyang|sy|1613@sya|寿阳|SYV|shouyang|sy|1614@sya|水洋|OYP|shuiyang|sy|1615@syc|三阳川|SYJ|sanyangchuan|syc|1616@syd|上腰墩|SPJ|shangyaodun|syd|1617@syi|三营|OEJ|sanying|sy|1618@syi|顺义|SOP|shunyi|sy|1619@syj|三义井|OYD|sanyijing|syj|1620@syp|三源浦|SYL|sanyuanpu|syp|1621@syu|三原|SAY|sanyuan|sy|1622@syu|上虞|BDH|shangyu|sy|1623@syu|上园|SUD|shangyuan|sy|1624@syu|水源|OYJ|shuiyuan|sy|1625@syz|桑园子|SAJ|sangyuanzi|syz|1626@szb|绥中北|SND|suizhongbei|szb|1627@szb|苏州北|OHH|suzhoubei|szb|1628@szd|宿州东|SRH|suzhoudong|szd|1629@szd|深圳东|BJQ|shenzhendong|szd|1630@szh|深州|OZP|shenzhou|sz|1631@szh|孙镇|OZY|sunzhen|sz|1632@szh|绥中|SZD|suizhong|sz|1633@szh|尚志|SZB|shangzhi|sz|1634@szh|师庄|SNM|shizhuang|sz|1635@szi|松滋|SIN|songzi|sz|1636@szo|师宗|SEM|shizong|sz|1637@szq|苏州园区|KAH|suzhouyuanqu|szyq|1638@szq|苏州新区|ITH|suzhouxinqu|szxq|1639@tan|泰安|TMK|taian|ta|1640@tan|台安|TID|taian|ta|1641@tay|通安驿|TAJ|tonganyi|tay|1642@tba|桐柏|TBF|tongbai|tb|1643@tbe|通北|TBB|tongbei|tb|1644@tch|汤池|TCX|tangchi|tc|1645@tch|桐城|TTH|tongcheng|tc|1646@tch|郯城|TZK|tancheng|tc|1647@tch|铁厂|TCL|tiechang|tc|1648@tcu|桃村|TCK|taocun|tc|1649@tda|通道|TRQ|tongdao|td|1650@tdo|田东|TDZ|tiandong|td|1651@tga|天岗|TGL|tiangang|tg|1652@tgl|土贵乌拉|TGC|tuguiwula|tgwl|1653@tgo|通沟|TOL|tonggou|tg|1654@tgu|太谷|TGV|taigu|tg|1655@tha|塔哈|THX|taha|th|1656@tha|棠海|THM|tanghai|th|1657@the|唐河|THF|tanghe|th|1658@the|泰和|THG|taihe|th|1659@thu|太湖|TKH|taihu|th|1660@tji|团结|TIX|tuanjie|tj|1661@tjj|谭家井|TNJ|tanjiajing|tjj|1662@tjt|陶家屯|TOT|taojiatun|tjt|1663@tjw|唐家湾|PDQ|tangjiawan|tjw|1664@tjz|统军庄|TZP|tongjunzhuang|tjz|1665@tka|泰康|TKX|taikang|tk|1666@tld|吐列毛杜|TMD|tuliemaodu|tlmd|1667@tlh|图里河|TEX|tulihe|tlh|1668@tli|铜陵|TJH|tongling|tl|1669@tli|田林|TFZ|tianlin|tl|1670@tli|亭亮|TIZ|tingliang|tl|1671@tli|铁力|TLB|tieli|tl|1672@tlx|铁岭西|PXT|tielingxi|tlx|1673@tmb|图们北|QSL|tumenbei|tmb|1674@tme|天门|TMN|tianmen|tm|1675@tmn|天门南|TNN|tianmennan|tmn|1676@tms|太姥山|TLS|taimushan|tms|1677@tmt|土牧尔台|TRC|tumuertai|tmet|1678@tmz|土门子|TCJ|tumenzi|tmz|1679@tna|洮南|TVT|taonan|tn|1680@tna|潼南|TVW|tongnan|tn|1681@tpc|太平川|TIT|taipingchuan|tpc|1682@tpz|太平镇|TEB|taipingzhen|tpz|1683@tqi|图强|TQX|tuqiang|tq|1684@tqi|台前|TTK|taiqian|tq|1685@tql|天桥岭|TQL|tianqiaoling|tql|1686@tqz|土桥子|TQJ|tuqiaozi|tqz|1687@tsc|汤山城|TCT|tangshancheng|tsc|1688@tsh|桃山|TAB|taoshan|ts|1689@tsz|塔石嘴|TIM|tashizui|tsz|1690@ttu|通途|TUT|tongtu|tt|1691@twh|汤旺河|THB|tangwanghe|twh|1692@txi|同心|TXJ|tongxin|tx|1693@txi|土溪|TSW|tuxi|tx|1694@txi|桐乡|TCH|tongxiang|tx|1695@tya|田阳|TRZ|tianyang|ty|1696@tyi|天义|TND|tianyi|ty|1697@tyi|汤阴|TYF|tangyin|ty|1698@tyl|驼腰岭|TIL|tuoyaoling|tyl|1699@tys|太阳山|TYJ|taiyangshan|tys|1700@tyu|汤原|TYB|tangyuan|ty|1701@tyy|塔崖驿|TYP|tayayi|tyy|1702@tzd|滕州东|TEK|tengzhoudong|tzd|1703@tzh|台州|TZH|taizhou|tz|1704@tzh|天祝|TZJ|tianzhu|tz|1705@tzh|滕州|TXK|tengzhou|tz|1706@tzh|天镇|TZV|tianzhen|tz|1707@tzl|桐子林|TEW|tongzilin|tzl|1708@tzs|天柱山|QWH|tianzhushan|tzs|1709@wan|文安|WBP|wenan|wa|1710@wan|武安|WAP|wuan|wa|1711@waz|王安镇|WVP|wanganzhen|waz|1712@wca|旺苍|WEW|wangcang|wc|1713@wcg|五叉沟|WCT|wuchagou|wcg|1714@wch|文昌|WEQ|wenchang|wc|1715@wch|温春|WDB|wenchun|wc|1716@wdc|五大连池|WRB|wudalianchi|wdlc|1717@wde|文登|WBK|wendeng|wd|1718@wdg|五道沟|WDL|wudaogou|wdg|1719@wdh|五道河|WHP|wudaohe|wdh|1720@wdi|文地|WNZ|wendi|wd|1721@wdo|卫东|WVT|weidong|wd|1722@wds|武当山|WRN|wudangshan|wds|1723@wdu|望都|WDP|wangdu|wd|1724@weh|乌尔旗汗|WHX|wuerqihan|weqh|1725@wfa|潍坊|WFK|weifang|wf|1726@wft|万发屯|WFB|wanfatun|wft|1727@wfu|王府|WUT|wangfu|wf|1728@wfx|瓦房店西|WXT|wafangdianxi|wfdx|1729@wga|王岗|WGB|wanggang|wg|1730@wgo|武功|WGY|wugong|wg|1731@wgo|湾沟|WGL|wangou|wg|1732@wgt|吴官田|WGM|wuguantian|wgt|1733@wha|乌海|WVC|wuhai|wh|1734@whe|苇河|WHB|weihe|wh|1735@whu|卫辉|WHF|weihui|wh|1736@wjc|吴家川|WCJ|wujiachuan|wjc|1737@wji|五家|WUB|wujia|wj|1738@wji|威箐|WAM|weiqing|wq|1739@wji|午汲|WJP|wuji|wj|1740@wji|渭津|WJL|weijin|wj|1741@wjw|王家湾|WJJ|wangjiawan|wjw|1742@wke|倭肯|WQB|woken|wk|1743@wks|五棵树|WKT|wukeshu|wks|1744@wlb|五龙背|WBT|wulongbei|wlb|1745@wld|乌兰哈达|WLC|wulanhada|wlhd|1746@wle|万乐|WEB|wanle|wl|1747@wlg|瓦拉干|WVX|walagan|wlg|1748@wli|温岭|VHH|wenling|wl|1749@wli|五莲|WLK|wulian|wl|1750@wlq|乌拉特前旗|WQC|wulateqianqi|wltqq|1751@wls|乌拉山|WSC|wulashan|wls|1752@wlt|卧里屯|WLX|wolitun|wlt|1753@wnb|渭南北|WBY|weinanbei|wnb|1754@wne|乌奴耳|WRX|wunuer|wne|1755@wni|万宁|WNQ|wanning|wn|1756@wni|万年|WWG|wannian|wn|1757@wnn|渭南南|WVY|weinannan|wnn|1758@wnz|渭南镇|WNJ|weinanzhen|wnz|1759@wpi|沃皮|WPT|wopi|wp|1760@wpu|吴堡|WUY|wupu|wb|1761@wqi|吴桥|WUP|wuqiao|wq|1762@wqi|汪清|WQL|wangqing|wq|1763@wqi|武清|WWP|wuqing|wq|1764@wsh|武山|WSJ|wushan|ws|1765@wsh|文水|WEV|wenshui|ws|1766@wsz|魏善庄|WSP|weishanzhuang|wsz|1767@wto|王瞳|WTP|wangtong|wt|1768@wts|五台山|WSV|wutaishan|wts|1769@wtz|王团庄|WZJ|wangtuanzhuang|wtz|1770@wwu|五五|WVR|wuwu|ww|1771@wxd|无锡东|WGH|wuxidong|wxd|1772@wxi|卫星|WVB|weixing|wx|1773@wxi|闻喜|WXV|wenxi|wx|1774@wxi|武乡|WVV|wuxiang|wx|1775@wxq|无锡新区|IFH|wuxixinqu|wxxq|1776@wxu|武穴|WXN|wuxue|wx|1777@wxu|吴圩|WYZ|wuxu|wy|1778@wya|王杨|WYB|wangyang|wy|1779@wyi|五营|WWB|wuying|wy|1780@wyi|武义|RYH|wuyi|wy|1781@wyt|瓦窑田|WIM|wayaotian|wjt|1782@wyu|五原|WYC|wuyuan|wy|1783@wzg|苇子沟|WZL|weizigou|wzg|1784@wzh|韦庄|WZY|weizhuang|wz|1785@wzh|五寨|WZV|wuzhai|wz|1786@wzt|王兆屯|WZB|wangzhaotun|wzt|1787@wzz|微子镇|WQP|weizizhen|wzz|1788@wzz|魏杖子|WKD|weizhangzi|wzz|1789@xan|新安|EAM|xinan|xa|1790@xan|兴安|XAZ|xingan|xa|1791@xax|新安县|XAF|xinanxian|xax|1792@xba|新保安|XAP|xinbaoan|xba|1793@xbc|下板城|EBP|xiabancheng|xbc|1794@xbl|西八里|XLP|xibali|xbl|1795@xch|宣城|ECH|xuancheng|xc|1796@xch|兴城|XCD|xingcheng|xc|1797@xcu|小村|XEM|xiaocun|xc|1798@xcy|新绰源|XRX|xinchuoyuan|xcy|1799@xcz|下城子|XCB|xiachengzi|xcz|1800@xcz|新城子|XCT|xinchengzi|xcz|1801@xde|喜德|EDW|xide|xd|1802@xdj|小得江|EJM|xiaodejiang|xdj|1803@xdm|西大庙|XMP|xidamiao|xdm|1804@xdo|小董|XEZ|xiaodong|xd|1805@xdo|小东|XOD|xiaodong|xdo|1806@xfe|信丰|EFG|xinfeng|xf|1807@xfe|襄汾|XFV|xiangfen|xf|1808@xfe|息烽|XFW|xifeng|xf|1809@xga|新干|EGG|xingan|xg|1810@xga|孝感|XGN|xiaogan|xg|1811@xgc|西固城|XUJ|xigucheng|xgc|1812@xgu|西固|XIJ|xigu|xg|1813@xgy|夏官营|XGJ|xiaguanying|xgy|1814@xgz|西岗子|NBB|xigangzi|xgz|1815@xhe|襄河|XXB|xianghe|xh|1816@xhe|新和|XIR|xinhe|xh|1817@xhe|宣和|XWJ|xuanhe|xh|1818@xhj|斜河涧|EEP|xiehejian|xhj|1819@xht|新华屯|XAX|xinhuatun|xht|1820@xhu|新华|XHB|xinhua|xh|1821@xhu|新化|EHQ|xinhua|xh|1822@xhu|宣化|XHP|xuanhua|xh|1823@xhx|兴和西|XEC|xinghexi|xhx|1824@xhy|小河沿|XYD|xiaoheyan|xhy|1825@xhy|下花园|XYP|xiahuayuan|xhy|1826@xhz|小河镇|EKY|xiaohezhen|xhz|1827@xji|徐家|XJB|xujia|xj|1828@xji|峡江|EJG|xiajiang|xj|1829@xji|新绛|XJV|xinjiang|xj|1830@xji|辛集|ENP|xinji|xj|1831@xji|新江|XJM|xinjiang|xj|1832@xjk|西街口|EKM|xijiekou|xjk|1833@xjt|许家屯|XJT|xujiatun|xjt|1834@xjt|许家台|XTJ|xujiatai|xjt|1835@xjz|谢家镇|XMT|xiejiazhen|xjz|1836@xka|兴凯|EKB|xingkai|xk|1837@xla|小榄|EAQ|xiaolan|xl|1838@xla|香兰|XNB|xianglan|xl|1839@xld|兴隆店|XDD|xinglongdian|xld|1840@xle|新乐|ELP|xinle|xl|1841@xli|新林|XPX|xinlin|xl|1842@xli|小岭|XLB|xiaoling|xl|1843@xli|新李|XLJ|xinli|xl|1844@xli|西林|XYB|xilin|xl|1845@xli|西柳|GCT|xiliu|xl|1846@xli|仙林|XPH|xianlin|xl|1847@xlt|新立屯|XLD|xinlitun|xlt|1848@xlz|兴隆镇|XZB|xinglongzhen|xlz|1849@xlz|新立镇|XGT|xinlizhen|xlz|1850@xmi|新民|XMD|xinmin|xm|1851@xms|西麻山|XMB|ximashan|xms|1852@xmt|下马塘|XAT|xiamatang|xmt|1853@xna|孝南|XNV|xiaonan|xn|1854@xnb|咸宁北|XRN|xianningbei|xnb|1855@xni|兴宁|ENQ|xingning|xn|1856@xni|咸宁|XNN|xianning|xn|1857@xpd|犀浦东|XAW|xipudong|xpd|1858@xpi|西平|XPN|xiping|xp|1859@xpi|兴平|XPY|xingping|xp|1860@xpt|新坪田|XPM|xinpingtian|xpt|1861@xpu|霞浦|XOS|xiapu|xp|1862@xpu|溆浦|EPQ|xupu|xp|1863@xpu|犀浦|XIW|xipu|xp|1864@xqi|新青|XQB|xinqing|xq|1865@xqi|新邱|XQD|xinqiu|xq|1866@xqp|兴泉堡|XQJ|xingquanbu|xqp|1867@xrq|仙人桥|XRL|xianrenqiao|xrq|1868@xsg|小寺沟|ESP|xiaosigou|xsg|1869@xsh|杏树|XSB|xingshu|xs|1870@xsh|浠水|XZN|xishui|xs|1871@xsh|下社|XSV|xiashe|xs|1872@xsh|徐水|XSP|xushui|xs|1873@xsh|夏石|XIZ|xiashi|xs|1874@xsh|小哨|XAM|xiaoshao|xs|1875@xsp|新松浦|XOB|xinsongpu|xsp|1876@xst|杏树屯|XDT|xingshutun|xst|1877@xsw|许三湾|XSJ|xusanwan|xsw|1878@xta|湘潭|XTQ|xiangtan|xt|1879@xta|邢台|XTP|xingtai|xt|1880@xtx|仙桃西|XAN|xiantaoxi|xtx|1881@xtz|下台子|EIP|xiataizi|xtz|1882@xwe|徐闻|XJQ|xuwen|xw|1883@xwp|新窝铺|EPD|xinwopu|xwp|1884@xwu|修武|XWF|xiuwu|xw|1885@xxi|新县|XSN|xinxian|xx|1886@xxi|息县|ENN|xixian|xx|1887@xxi|西乡|XQY|xixiang|xx|1888@xxi|湘乡|XXQ|xiangxiang|xx|1889@xxi|西峡|XIF|xixia|xx|1890@xxi|孝西|XOV|xiaoxi|xx|1891@xxj|小新街|XXM|xiaoxinjie|xxj|1892@xxx|新兴县|XGQ|xinxingxian|xxx|1893@xxz|西小召|XZC|xixiaozhao|xxz|1894@xxz|小西庄|XXP|xiaoxizhuang|xxz|1895@xya|向阳|XDB|xiangyang|xy|1896@xya|旬阳|XUY|xunyang|xy|1897@xyb|旬阳北|XBY|xunyangbei|xyb|1898@xyd|襄阳东|XWN|xiangyangdong|xyd|1899@xye|兴业|SNZ|xingye|xy|1900@xyg|小雨谷|XHM|xiaoyugu|xyg|1901@xyi|信宜|EEQ|xinyi|xy|1902@xyj|小月旧|XFM|xiaoyuejiu|xyj|1903@xyq|小扬气|XYX|xiaoyangqi|xyq|1904@xyu|祥云|EXM|xiangyun|xy|1905@xyu|襄垣|EIF|xiangyuan|xy|1906@xyx|夏邑县|EJH|xiayixian|xyx|1907@xyy|新友谊|EYB|xinyouyi|xyy|1908@xyz|新阳镇|XZJ|xinyangzhen|xyz|1909@xzd|徐州东|UUH|xuzhoudong|xzd|1910@xzf|新帐房|XZX|xinzhangfang|xzf|1911@xzh|悬钟|XRP|xuanzhong|xz|1912@xzh|新肇|XZT|xinzhao|xz|1913@xzh|忻州|XXV|xinzhou|xz|1914@xzi|汐子|XZD|xizi|xz|1915@xzm|西哲里木|XRD|xizhelimu|xzlm|1916@xzz|新杖子|ERP|xinzhangzi|xzz|1917@yan|姚安|YAC|yaoan|ya|1918@yan|依安|YAX|yian|ya|1919@yan|永安|YAS|yongan|ya|1920@yax|永安乡|YNB|yonganxiang|yax|1921@ybl|亚布力|YBB|yabuli|ybl|1922@ybs|元宝山|YUD|yuanbaoshan|ybs|1923@yca|羊草|YAB|yangcao|yc|1924@ycd|秧草地|YKM|yangcaodi|ycd|1925@ych|阳澄湖|AIH|yangchenghu|ych|1926@ych|迎春|YYB|yingchun|yc|1927@ych|叶城|YER|yecheng|yc|1928@ych|盐池|YKJ|yanchi|yc|1929@ych|砚川|YYY|yanchuan|yc|1930@ych|阳春|YQQ|yangchun|yc|1931@ych|宜城|YIN|yicheng|yc|1932@ych|应城|YHN|yingcheng|yc|1933@ych|禹城|YCK|yucheng|yc|1934@ych|晏城|YEK|yancheng|yc|1935@ych|羊场|YED|yangchang|yc|1936@ych|阳城|YNF|yangcheng|yc|1937@ych|阳岔|YAL|yangcha|yc|1938@ych|郓城|YPK|yuncheng|yc|1939@ych|雁翅|YAP|yanchi|yc|1940@ycl|云彩岭|ACP|yuncailing|ycl|1941@ycx|虞城县|IXH|yuchengxian|ycx|1942@ycz|营城子|YCT|yingchengzi|ycz|1943@yde|英德|YDQ|yingde|yd|1944@yde|永登|YDJ|yongdeng|yd|1945@ydi|尹地|YDM|yindi|yd|1946@ydi|永定|YGS|yongding|yd|1947@yds|雁荡山|YGH|yandangshan|yds|1948@ydu|于都|YDG|yudu|yd|1949@ydu|园墩|YAJ|yuandun|yd|1950@ydx|英德西|IIQ|yingdexi|ydx|1951@yfy|永丰营|YYM|yongfengying|yfy|1952@yga|杨岗|YRB|yanggang|yg|1953@yga|阳高|YOV|yanggao|yg|1954@ygu|阳谷|YIK|yanggu|yg|1955@yha|友好|YOB|youhao|yh|1956@yha|余杭|EVH|yuhang|yh|1957@yhc|沿河城|YHP|yanhecheng|yhc|1958@yhu|岩会|AEP|yanhui|yh|1959@yjh|羊臼河|YHM|yangjiuhe|yjh|1960@yji|永嘉|URH|yongjia|yj|1961@yji|营街|YAM|yingjie|yj|1962@yji|盐津|AEW|yanjin|yj|1963@yji|余江|YHG|yujiang|yj|1964@yji|燕郊|AJP|yanjiao|yj|1965@yji|姚家|YAT|yaojia|yj|1966@yjj|岳家井|YGJ|yuejiajing|yjj|1967@yjp|一间堡|YJT|yijianpu|yjb|1968@yjs|英吉沙|YIR|yingjisha|yjs|1969@yjs|云居寺|AFP|yunjusi|yjs|1970@yjz|燕家庄|AZK|yanjiazhuang|yjz|1971@yka|永康|RFH|yongkang|yk|1972@ykd|营口东|YGT|yingkoudong|ykd|1973@yla|银浪|YJX|yinlang|yl|1974@yla|永郎|YLW|yonglang|yl|1975@ylb|宜良北|YSM|yiliangbei|ylb|1976@yld|永乐店|YDY|yongledian|yld|1977@ylh|伊拉哈|YLX|yilaha|ylh|1978@yli|伊林|YLB|yilin|yl|1979@yli|杨陵|YSY|yangling|yl|1980@yli|彝良|ALW|yiliang|yl|1981@yli|杨林|YLM|yanglin|yl|1982@ylp|余粮堡|YLD|yuliangpu|ylb|1983@ylq|杨柳青|YQP|yangliuqing|ylq|1984@ylt|月亮田|YUM|yueliangtian|ylt|1985@yma|义马|YMF|yima|ym|1986@yme|玉门|YXJ|yumen|ym|1987@yme|云梦|YMN|yunmeng|ym|1988@ymo|元谋|YMM|yuanmou|ym|1989@ymp|阳明堡|YVV|yangmingbu|ymp|1990@yms|一面山|YST|yimianshan|yms|1991@yna|沂南|YNK|yinan|yn|1992@yna|宜耐|YVM|yinai|yn|1993@ynd|伊宁东|YNR|yiningdong|ynd|1994@yps|营盘水|YZJ|yingpanshui|yps|1995@ypu|羊堡|ABM|yangpu|yp|1996@yqb|阳泉北|YPP|yangquanbei|yqb|1997@yqi|乐清|UPH|yueqing|yq|1998@yqi|焉耆|YSR|yanqi|yq|1999@yqi|源迁|AQK|yuanqian|yq|2000@yqt|姚千户屯|YQT|yaoqianhutun|yqht|2001@yqu|阳曲|YQV|yangqu|yq|2002@ysg|榆树沟|YGP|yushugou|ysg|2003@ysh|月山|YBF|yueshan|ys|2004@ysh|玉石|YSJ|yushi|ys|2005@ysh|玉舍|AUM|yushe|ys|2006@ysh|偃师|YSF|yanshi|ys|2007@ysh|沂水|YUK|yishui|ys|2008@ysh|榆社|YSV|yushe|ys|2009@ysh|窑上|ASP|yaoshang|ys|2010@ysh|元氏|YSP|yuanshi|ys|2011@ysl|杨树岭|YAD|yangshuling|ysl|2012@ysp|野三坡|AIP|yesanpo|ysp|2013@yst|榆树屯|YSX|yushutun|yst|2014@yst|榆树台|YUT|yushutai|yst|2015@ysz|鹰手营子|YIP|yingshouyingzi|ysyz|2016@yta|源潭|YTQ|yuantan|yt|2017@ytp|牙屯堡|YTZ|yatunpu|ytb|2018@yts|烟筒山|YSL|yantongshan|yts|2019@ytt|烟筒屯|YUX|yantongtun|ytt|2020@yws|羊尾哨|YWM|yangweishao|yws|2021@yxi|越西|YHW|yuexi|yx|2022@yxi|攸县|YOG|youxian|yx|2023@yxi|永修|ACG|yongxiu|yx|2024@yxx|玉溪西|YXM|yuxixi|yxx|2025@yya|弋阳|YIG|yiyang|yy|2026@yya|余姚|YYH|yuyao|yy|2027@yya|酉阳|AFW|youyang|yy|2028@yyd|岳阳东|YIQ|yueyangdong|yyd|2029@yyi|阳邑|ARP|yangyi|yy|2030@yyu|鸭园|YYL|yayuan|yy|2031@yyz|鸳鸯镇|YYJ|yuanyangzhen|yyz|2032@yzb|燕子砭|YZY|yanzibian|yzb|2033@yzh|宜州|YSZ|yizhou|yz|2034@yzh|仪征|UZH|yizheng|yz|2035@yzh|兖州|YZK|yanzhou|yz|2036@yzi|迤资|YQM|yizi|yz|2037@yzw|羊者窝|AEM|yangzhewo|wzw|2038@yzz|杨杖子|YZD|yangzhangzi|yzz|2039@zan|镇安|ZEY|zhenan|za|2040@zan|治安|ZAD|zhian|za|2041@zba|招柏|ZBP|zhaobai|zb|2042@zbw|张百湾|ZUP|zhangbaiwan|zbw|2043@zcc|中川机场|ZJJ|zhongchuanjichang|zcjc|2044@zch|枝城|ZCN|zhicheng|zc|2045@zch|子长|ZHY|zichang|zc|2046@zch|诸城|ZQK|zhucheng|zc|2047@zch|邹城|ZIK|zoucheng|zc|2048@zch|赵城|ZCV|zhaocheng|zc|2049@zda|章党|ZHT|zhangdang|zd|2050@zdi|正定|ZDP|zhengding|zd|2051@zdo|肇东|ZDB|zhaodong|zd|2052@zfp|照福铺|ZFM|zhaofupu|zfp|2053@zgt|章古台|ZGD|zhanggutai|zgt|2054@zgu|赵光|ZGB|zhaoguang|zg|2055@zhe|中和|ZHX|zhonghe|zh|2056@zhm|中华门|VNH|zhonghuamen|zhm|2057@zjb|枝江北|ZIN|zhijiangbei|zjb|2058@zjc|钟家村|ZJY|zhongjiacun|zjc|2059@zjg|朱家沟|ZUB|zhujiagou|zjg|2060@zjg|紫荆关|ZYP|zijingguan|zjg|2061@zji|周家|ZOB|zhoujia|zj|2062@zji|诸暨|ZDH|zhuji|zj|2063@zjn|镇江南|ZEH|zhenjiangnan|zjn|2064@zjt|周家屯|ZOD|zhoujiatun|zjt|2065@zjw|褚家湾|CWJ|zhujiawan|cjw|2066@zjx|湛江西|ZWQ|zhanjiangxi|zjx|2067@zjy|朱家窑|ZUJ|zhujiayao|zjy|2068@zjz|曾家坪子|ZBW|zengjiapingzi|zjpz|2069@zla|张兰|ZLV|zhanglan|zla|2070@zla|镇赉|ZLT|zhenlai|zl|2071@zli|枣林|ZIV|zaolin|zl|2072@zlt|扎鲁特|ZLD|zhalute|zlt|2073@zlx|扎赉诺尔西|ZXX|zhalainuoerxi|zlnex|2074@zmt|樟木头|ZOQ|zhangmutou|zmt|2075@zmu|中牟|ZGF|zhongmu|zm|2076@znd|中宁东|ZDJ|zhongningdong|znd|2077@zni|中宁|VNJ|zhongning|zn|2078@znn|中宁南|ZNJ|zhongningnan|znn|2079@zpi|镇平|ZPF|zhenping|zp|2080@zpi|漳平|ZPS|zhangping|zp|2081@zpu|泽普|ZPR|zepu|zp|2082@zqi|枣强|ZVP|zaoqiang|zq|2083@zqi|张桥|ZQY|zhangqiao|zq|2084@zqi|章丘|ZTK|zhangqiu|zq|2085@zrh|朱日和|ZRC|zhurihe|zrh|2086@zrl|泽润里|ZLM|zerunli|zrl|2087@zsb|中山北|ZGQ|zhongshanbei|zsb|2088@zsd|樟树东|ZOG|zhangshudong|zsd|2089@zsh|中山|ZSQ|zhongshan|zs|2090@zsh|柞水|ZSY|zhashui|zs|2091@zsh|钟山|ZSZ|zhongshan|zs|2092@zsh|樟树|ZSG|zhangshu|zs|2093@zwo|珠窝|ZOP|zhuwo|zw|2094@zwt|张维屯|ZWB|zhangweitun|zwt|2095@zwu|彰武|ZWD|zhangwu|zw|2096@zxi|棕溪|ZOY|zongxi|zx|2097@zxi|钟祥|ZTN|zhongxiang|zx|2098@zxi|资溪|ZXS|zixi|zx|2099@zxi|镇西|ZVT|zhenxi|zx|2100@zxi|张辛|ZIP|zhangxin|zx|2101@zxq|正镶白旗|ZXC|zhengxiangbaiqi|zxbq|2102@zya|紫阳|ZVY|ziyang|zy|2103@zya|枣阳|ZYN|zaoyang|zy|2104@zyb|竹园坝|ZAW|zhuyuanba|zyb|2105@zye|张掖|ZYJ|zhangye|zy|2106@zyu|镇远|ZUW|zhenyuan|zy|2107@zyx|朱杨溪|ZXW|zhuyangxi|zyx|2108@zzd|漳州东|GOS|zhangzhoudong|zzd|2109@zzh|漳州|ZUS|zhangzhou|zz|2110@zzh|壮志|ZUX|zhuangzhi|zz|2111@zzh|子洲|ZZY|zizhou|zz|2112@zzh|中寨|ZZM|zhongzhai|zz|2113@zzh|涿州|ZXP|zhuozhou|zz|2114@zzi|咋子|ZAL|zhazi|zz|2115@zzs|卓资山|ZZC|zhuozishan|zzs|2116@zzx|株洲西|ZAQ|zhuzhouxi|zzx|2117@zzx|郑州西|XPF|zhengzhouxi|zzx|2118@abq|阿巴嘎旗|AQC|abagaqi|abgq|2119@aeb|阿尔山北|ARX|aershanbei|aesb|2120@are|安仁|ARG|anren|ar|2121@asx|安顺西|ASE|anshunxi|asx|2122@atx|安图西|AXL|antuxi|atx|2123@ayd|安阳东|ADF|anyangdong|ayd|2124@bba|博白|BBZ|bobai|bb|2125@bbu|八步|BBE|babu|bb|2126@bch|栟茶|FWH|bencha|bc|2127@bdd|保定东|BMP|baodingdong|bdd|2128@bgo|白沟|FEP|baigou|bg|2129@bha|滨海|FHP|binhai|bh|2130@bhb|滨海北|FCP|binhaibei|bhb|2131@bjn|宝鸡南|BBY|baojinan|bjn|2132@bjz|北井子|BRT|beijingzi|bjz|2133@bmj|白马井|BFQ|baimajing|bmj|2134@bqi|宝清|BUB|baoqing|bq|2135@bsh|璧山|FZW|bishan|bs|2136@bsx|白水县|BGY|baishuixian|bsx|2137@bxc|本溪新城|BVT|benxixincheng|bxxc|2138@bxi|彬县|BXY|binxian|bx|2139@bya|宾阳|UKZ|binyang|by|2140@byd|白洋淀|FWP|baiyangdian|byd|2141@byi|百宜|FHW|baiyi|by|2142@byn|白音华南|FNC|baiyinhuanan|byhn|2143@bzd|巴中东|BDE|bazhongdong|bzd|2144@bzh|滨州|BIK|binzhou|bz|2145@bzx|霸州西|FOP|bazhouxi|bzx|2146@cch|澄城|CUY|chengcheng|cc|2147@chd|巢湖东|GUH|chaohudong|chd|2148@cji|从江|KNW|congjiang|cj|2149@cka|茶卡|CVO|chaka|ck|2150@clh|长临河|FVH|changlinhe|clh|2151@cln|茶陵南|CNG|chalingnan|cln|2152@cpd|常平东|FQQ|changpingdong|cpd|2153@cqq|长庆桥|CQJ|changqingqiao|cqq|2154@csb|长寿北|COW|changshoubei|csb|2155@csh|长寿湖|CSE|changshouhu|csh|2156@csh|潮汕|CBQ|chaoshan|cs|2157@ctn|长汀南|CNS|changtingnan|ctn|2158@cwu|长武|CWY|changwu|cw|2159@cxi|长兴|CBH|changxing|cx|2160@cxi|苍溪|CXE|cangxi|cx|2161@cya|长阳|CYN|changyang|cy|2162@cya|潮阳|CNQ|chaoyang|cy|2163@czt|城子坦|CWT|chengzitan|czt|2164@dad|东安东|DCZ|dongandong|dad|2165@dba|德保|RBZ|debao|db|2166@ddh|东戴河|RDD|dongdaihe|ddh|2167@ddx|丹东西|RWT|dandongxi|ddx|2168@deh|东二道河|DRB|dongerdaohe|dedh|2169@dfn|大方南|DNE|dafangnan|dfn|2170@dgb|东港北|RGT|donggangbei|dgb|2171@dgs|大孤山|RMT|dagushan|dgs|2172@dgu|东莞|RTQ|dongguan|dg|2173@dhd|鼎湖东|UWQ|dinghudong|dhd|2174@dhs|鼎湖山|NVQ|dinghushan|dhs|2175@dji|垫江|DJE|dianjiang|dj|2176@dju|大苴|DIM|daju|dj|2177@dli|大荔|DNY|dali|dl|2178@dqg|大青沟|DSD|daqinggou|dqg|2179@dqi|德清|DRH|deqing|dq|2180@dsn|砀山南|PRH|dangshannan|dsn|2181@dsn|大石头南|DAL|dashitounan|dstn|2182@dtd|当涂东|OWH|dangtudong|dtd|2183@dtx|大通西|DTO|datongxi|dtx|2184@dwa|大旺|WWQ|dawang|dw|2185@dxi|德兴|DWG|dexing|dx|2186@dxs|丹霞山|IRQ|danxiashan|dxs|2187@dyb|大冶北|DBN|dayebei|dyb|2188@dyd|都匀东|KJW|duyundong|dyd|2189@dyn|东营南|DOK|dongyingnan|dyn|2190@dyu|大余|DYG|dayu|dy|2191@dzd|定州东|DOP|dingzhoudong|dzd|2192@dzh|端州|WZQ|duanzhou|dz|2193@dzn|大足南|FQW|dazunan|dzn|2194@ems|峨眉山|IXW|emeishan|ems|2195@ezd|鄂州东|EFN|ezhoudong|ezd|2196@fcb|防城港北|FBZ|fangchenggangbei|fcgb|2197@fcd|凤城东|FDT|fengchengdong|fcd|2198@fch|富川|FDZ|fuchuan|fc|2199@fcx|繁昌西|PUH|fanchangxi|fcx|2200@fdu|丰都|FUW|fengdu|fd|2201@flb|涪陵北|FEW|fulingbei|flb|2202@fqi|法启|FQE|faqi|fq|2203@fso|抚松|FSL|fusong|fs|2204@fsz|福山镇|FZQ|fushanzhen|fsz|2205@fti|福田|NZQ|futian|ft|2206@fyu|抚远|FYB|fuyuan|fy|2207@fzd|抚州东|FDG|fuzhoudong|fzd|2208@fzh|抚州|FZG|fuzhou|fz|2209@gan|高安|GCG|gaoan|ga|2210@gan|广安南|VUW|guangannan|gan|2211@gan|贵安|GAE|guian|ga|2212@gbd|高碑店东|GMP|gaobeidiandong|gbdd|2213@gch|恭城|GCZ|gongcheng|gc|2214@gdb|贵定北|FMW|guidingbei|gdb|2215@gdn|葛店南|GNN|gediannan|gdn|2216@gdx|贵定县|KIW|guidingxian|gdx|2217@ghb|广汉北|GVW|guanghanbei|ghb|2218@gju|革居|GEM|geju|gj|2219@gli|关岭|GLE|guanling|gl|2220@glx|桂林西|GEZ|guilinxi|glx|2221@gmc|光明城|IMQ|guangmingcheng|gmc|2222@gni|广宁|FBQ|guangning|gn|2223@gns|广宁寺|GQT|guangningsi|gns|2224@gpi|桂平|GAZ|guiping|gp|2225@gpz|弓棚子|GPT|gongpengzi|gpz|2226@gsh|光山|GUN|guangshan|gs|2227@gtb|古田北|GBS|gutianbei|gtb|2228@gtb|广通北|GPM|guangtongbei|gtb|2229@gtn|高台南|GAJ|gaotainan|gtn|2230@gtz|古田会址|STS|gutianhuizhi|gthz|2231@gyb|贵阳北|KQW|guiyangbei|gyb|2232@gyx|高邑西|GNP|gaoyixi|gyx|2233@han|惠安|HNS|huian|ha|2234@hbd|鹤壁东|HFF|hebidong|hbd|2235@hcg|寒葱沟|HKB|hanconggou|hcg|2236@hch|珲春|HUL|hunchun|hch|2237@hdd|邯郸东|HPP|handandong|hdd|2238@hdo|惠东|KDQ|huidong|hd|2239@hdx|海东西|HDO|haidongxi|hdx|2240@hdx|洪洞西|HTV|hongtongxi|hdx|2241@heb|哈尔滨北|HTB|haerbinbei|hebb|2242@hfc|合肥北城|COH|hefeibeicheng|hfbc|2243@hfn|合肥南|ENH|hefeinan|hfn|2244@hga|黄冈|KGN|huanggang|hg|2245@hgd|黄冈东|KAN|huanggangdong|hgd|2246@hgd|横沟桥东|HNN|henggouqiaodong|hgqd|2247@hgx|黄冈西|KXN|huanggangxi|hgx|2248@hhe|洪河|HPB|honghe|hh|2249@hhn|怀化南|KAQ|huaihuanan|hhn|2250@hhq|黄河景区|HCF|huanghejingqu|hhjq|2251@hhu|花湖|KHN|huahu|hh|2252@hhu|惠环|KHQ|huihuan|hh|2253@hhu|后湖|IHN|houhu|hh|2254@hji|怀集|FAQ|huaiji|hj|2255@hkb|河口北|HBM|hekoubei|hkb|2256@hli|黄流|KLQ|huangliu|hl|2257@hln|黄陵南|VLY|huanglingnan|hln|2258@hme|鲘门|KMQ|houmen|hm|2259@hme|虎门|IUQ|humen|hm|2260@hmx|侯马西|HPV|houmaxi|hmx|2261@hna|衡南|HNG|hengnan|hn|2262@hnd|淮南东|HOH|huainandong|hnd|2263@hpu|合浦|HVZ|hepu|hp|2264@hqi|霍邱|FBH|huoqiu|hq|2265@hrd|怀仁东|HFV|huairendong|hrd|2266@hrd|华容东|HPN|huarongdong|hrd|2267@hrn|华容南|KRN|huarongnan|hrn|2268@hsb|黄石北|KSN|huangshibei|hsb|2269@hsb|黄山北|NYH|huangshanbei|hsb|2270@hsd|贺胜桥东|HLN|heshengqiaodong|hsqd|2271@hsh|和硕|VUR|heshuo|hs|2272@hsn|花山南|KNN|huashannan|hsn|2273@hyb|合阳北|HTY|heyangbei|hyb|2274@hyb|海阳北|HEK|haiyangbei|hyb|2275@hyi|槐荫|IYN|huaiyin|hy|2276@hyk|花园口|HYT|huayuankou|hyk|2277@hzd|霍州东|HWV|huozhoudong|hzd|2278@hzn|惠州南|KNQ|huizhounan|hzn|2279@jch|泾川|JAJ|jingchuan|jc|2280@jde|旌德|NSH|jingde|jd|2281@jfe|尖峰|PFQ|jianfeng|jf|2282@jhx|蛟河西|JOL|jiaohexi|jhx|2283@jlb|军粮城北|JMP|junliangchengbei|jlcb|2284@jle|将乐|JLS|jiangle|jl|2285@jlh|贾鲁河|JLF|jialuhe|jlh|2286@jmb|即墨北|JVK|jimobei|jmb|2287@jnb|建宁县北|JCS|jianningxianbei|jnxb|2288@jni|江宁|JJH|jiangning|jn|2289@jnx|江宁西|OKH|jiangningxi|jnx|2290@jox|建瓯西|JUS|jianouxi|jox|2291@jqn|酒泉南|JNJ|jiuquannan|jqn|2292@jrx|句容西|JWH|jurongxi|jrx|2293@jsh|建水|JSM|jianshui|js|2294@jss|界首市|JUN|jieshoushi|jss|2295@jxb|绩溪北|NRH|jixibei|jxb|2296@jxd|介休东|JDV|jiexiudong|jxd|2297@jxi|靖西|JMZ|jingxi|jx|2298@jxi|泾县|LOH|jingxian|jx|2299@jxn|进贤南|JXG|jinxiannan|jxn|2300@jyn|嘉峪关南|JBJ|jiayuguannan|jygn|2301@jyn|简阳南|JOW|jianyangnan|jyn|2302@jyt|金银潭|JTN|jinyintan|jyt|2303@jyu|靖宇|JYL|jingyu|jy|2304@jyw|金月湾|PYQ|jinyuewan|jyw|2305@jyx|缙云西|PYH|jinyunxi|jyx|2306@jzh|晋中|JZV|jinzhong|jz|2307@kfb|开封北|KBF|kaifengbei|kfb|2308@kln|凯里南|QKW|kailinan|kln|2309@klu|库伦|KLD|kulun|kl|2310@kta|葵潭|KTQ|kuitan|kt|2311@kya|开阳|KVW|kaiyang|ky|2312@lad|隆安东|IDZ|longandong|lad|2313@lbb|来宾北|UCZ|laibinbei|lbb|2314@lbi|灵璧|GMH|lingbi|lb|2315@lby|绿博园|LCF|lvboyuan|lby|2316@lcb|隆昌北|NWW|longchangbei|lcb|2317@lch|临城|UUP|lincheng|lc|2318@lch|罗城|VCZ|luocheng|lc|2319@lch|陵城|LGK|lingcheng|lc|2320@lcz|老城镇|ACQ|laochengzhen|lcz|2321@ldb|龙洞堡|FVW|longdongbao|ldb|2322@ldn|乐都南|LVO|ledunan|ldn|2323@ldn|娄底南|UOQ|loudinan|ldn|2324@ldo|乐东|UQQ|ledong|ld|2325@ldy|离堆公园|INW|liduigongyuan|ldgy|2326@lfe|陆丰|LLQ|lufeng|lf|2327@lfe|龙丰|KFQ|longfeng|lf|2328@lfn|禄丰南|LQM|lufengnan|lfn|2329@lfx|临汾西|LXV|linfenxi|lfx|2330@lgn|临高南|KGQ|lingaonan|lgn|2331@lhe|滦河|UDP|luanhe|lh|2332@lhx|漯河西|LBN|luohexi|lhx|2333@ljd|罗江东|IKW|luojiangdong|ljd|2334@ljn|利津南|LNK|lijinnan|ljn|2335@lkn|兰考南|LUF|lankaonan|lkn|2336@llb|兰陵北|COK|lanlingbei|llb|2337@llb|龙里北|KFW|longlibei|llb|2338@llb|沥林北|KBQ|lilinbei|llb|2339@lld|醴陵东|UKQ|lilingdong|lld|2340@lpn|梁平南|LPE|liangpingnan|lpn|2341@lqu|礼泉|LGY|liquan|lq|2342@lsd|灵石东|UDV|lingshidong|lsd|2343@lsh|乐山|IVW|leshan|ls|2344@lsh|龙市|LAG|longshi|sh|2345@lsh|溧水|LDH|lishui|ls|2346@lwj|洛湾三江|KRW|luowansanjiang|lwsj|2347@lxb|莱西北|LBK|laixibei|lxb|2348@lya|溧阳|LEH|liyang|ly|2349@lyi|临邑|LUK|linyi|ly|2350@lyn|柳园南|LNR|liuyuannan|lyn|2351@lzb|鹿寨北|LSZ|luzhaibei|lzb|2352@lzh|阆中|LZE|langzhong|lz|2353@lzn|临泽南|LDJ|linzenan|lzn|2354@mad|马鞍山东|OMH|maanshandong|masd|2355@mch|毛陈|MHN|maochen|mc|2356@mgd|明港东|MDN|minggangdong|mgd|2357@mhn|民和南|MNO|minhenan|mhn|2358@mji|闵集|MJN|minji|mj|2359@mla|马兰|MLR|malan|ml|2360@mle|民乐|MBJ|minle|ml|2361@mns|玛纳斯|MSR|manasi|mns|2362@mpi|牟平|MBK|muping|mp|2363@mqb|闽清北|MBS|minqingbei|mqb|2364@mqb|民权北|MIF|minquanbei|mqb|2365@msd|眉山东|IUW|meishandong|msd|2366@msh|庙山|MSN|miaoshan|ms|2367@myu|门源|MYO|menyuan|my|2368@mzb|蒙自北|MBM|mengzibei|mzb|2369@mzh|孟庄|MZF|mengzhuang|mz|2370@mzi|蒙自|MZM|mengzi|mz|2371@nbu|南部|NBE|nanbu|nb|2372@nca|南曹|NEF|nancao|nc|2373@ncb|南充北|NCE|nanchongbei|ncb|2374@nch|南城|NDG|nancheng|nc|2375@ncx|南昌西|NXG|nanchangxi|ncx|2376@ndn|宁东南|NDJ|ningdongnan|ndn|2377@ndo|宁东|NOJ|ningdong|nd|2378@nfb|南芬北|NUT|nanfenbei|nfb|2379@nfe|南丰|NFG|nanfeng|nf|2380@nhd|南湖东|NDN|nanhudong|nhd|2381@njb|内江北|NKW|neijiangbei|njb|2382@nji|南江|FIW|nanjiang|nj|2383@njk|南江口|NDQ|nanjiangkou|nj|2384@nli|南陵|LLH|nanling|nl|2385@nmu|尼木|NMO|nimu|nm|2386@nnd|南宁东|NFZ|nanningdong|nnd|2387@nnx|南宁西|NXZ|nanningxi|nnx|2388@npb|南平北|NBS|nanpingbei|npb|2389@nxi|南雄|NCQ|nanxiong|nx|2390@nyo|纳雍|NYE|nayong|ny|2391@nyz|南阳寨|NYF|nanyangzhai|nyz|2392@pan|普安|PAN|puan|pa|2393@pax|普安县|PUE|puanxian|pax|2394@pbi|屏边|PBM|pingbian|pb|2395@pbn|平坝南|PBE|pingbanan|pbn|2396@pch|平昌|PCE|pingchang|pc|2397@pdi|普定|PGW|puding|pd|2398@pdu|平度|PAK|pingdu|pd|2399@pko|皮口|PUT|pikou|pk|2400@plc|盘龙城|PNN|panlongcheng|plc|2401@pni|普宁|PEQ|puning|pn|2402@pnn|平南南|PAZ|pingnannan|pn|2403@psb|彭山北|PPW|pengshanbei|psb|2404@psh|坪上|PSK|pingshang|ps|2405@pxb|萍乡北|PBG|pingxiangbei|pxb|2406@pya|濮阳|PYF|puyang|py|2407@pyc|平遥古城|PDV|pingyaogucheng|pygc|2408@pzh|盘州|PAE|panzhou|pz|2409@pzh|彭州|PMW|pengzhou|pz|2410@qbd|青白江东|QFW|qingbaijiangdong|qbjd|2411@qdb|青岛北|QHK|qingdaobei|qdb|2412@qdo|祁东|QMQ|qidong|qd|2413@qdu|青堆|QET|qingdui|qd|2414@qfe|前锋|QFB|qianfeng|qf|2415@qji|曲江|QIM|qujiang|qj|2416@qli|青莲|QEW|qinglian|ql|2417@qqn|齐齐哈尔南|QNB|qiqihaernan|qqhen|2418@qsb|清水北|QEJ|qingshuibei|qsb|2419@qsh|青神|QVW|qingshen|qs|2420@qsh|岐山|QAY|qishan|qs|2421@qsh|庆盛|QSQ|qingsheng|qs|2422@qsx|曲水县|QSO|qushuixian|qsx|2423@qxd|祁县东|QGV|qixiandong|qxd|2424@qxi|乾县|QBY|qianxian|qx|2425@qya|祁阳|QWQ|qiyang|qy|2426@qzn|全州南|QNZ|quanzhounan|qzn|2427@qzw|棋子湾|QZQ|qiziwan|qzw|2428@rbu|仁布|RUO|renbu|rb|2429@rcb|荣昌北|RQW|rongchangbei|rcb|2430@rch|荣成|RCK|rongcheng|rc|2431@rdo|如东|RIH|rudong|rd|2432@rji|榕江|RVW|rongjiang|rj|2433@rkz|日喀则|RKO|rikaze|rkz|2434@rpi|饶平|RVQ|raoping|rp|2435@scl|宋城路|SFF|songchenglu|scl|2436@sdh|三道湖|SDL|sandaohu|sdh|2437@sdo|邵东|FIQ|shaodong|sd|2438@sdx|三都县|KKW|sanduxian|sdx|2439@sfa|胜芳|SUP|shengfang|sf|2440@sfb|双峰北|NFQ|shuangfengbei|sfb|2441@she|商河|SOK|shanghe|sh|2442@sho|泗洪|GQH|sihong|sh|2443@shu|四会|AHQ|sihui|sh|2444@sjn|三江南|SWZ|sanjiangnan|sjn|2445@sjz|三井子|OJT|sanjingzi|sjz|2446@slc|双流机场|IPW|shuangliujichang|sljc|2447@slx|双流西|IQW|shuangliuxi|slx|2448@smb|三明北|SHS|sanmingbei|smb|2449@snq|苏尼特左旗|ONC|sunitezuoqi|sntzq|2450@spd|山坡东|SBN|shanpodong|spd|2451@sqi|石桥|SQE|shiqiao|sq|2452@sqi|沈丘|SQN|shenqiu|sq|2453@ssb|鄯善北|SMR|shanshanbei|ssb|2454@ssb|狮山北|NSQ|shishanbei|ssb|2455@ssb|三水北|ARQ|sanshuibei|ssb|2456@ssh|狮山|KSQ|shishan|ss|2457@ssn|三水南|RNQ|sanshuinan|ssn|2458@ssn|韶山南|INQ|shaoshannan|ssn|2459@ssu|三穗|QHW|sansui|ss|2460@sti|石梯|STE|shiti|st|2461@swe|汕尾|OGQ|shanwei|sw|2462@sxb|歙县北|NPH|shexianbei|sxb|2463@sxb|绍兴北|SLH|shaoxingbei|sxb|2464@sxd|绍兴东|SSH|shaoxingdong|sxd|2465@sxi|始兴|IPQ|shixing|sx|2466@sxi|泗县|GPH|sixian|sx|2467@sya|泗阳|MPH|siyang|sy|2468@syb|邵阳北|OVQ|shaoyangbei|syb|2469@syb|松原北|OCT|songyuanbei|syb|2470@syi|山阴|SNV|shanyin|sy|2471@syn|沈阳南|SOT|shenyangnan|syn|2472@szb|深圳北|IOQ|shenzhenbei|szb|2473@szh|神州|SRQ|shenzhou|sz|2474@szs|深圳坪山|IFQ|shenzhenpingshan|szps|2475@szs|石嘴山|QQJ|shizuishan|szs|2476@szx|石柱县|OSW|shizhuxian|szx|2477@tcb|桃村北|TOK|taocunbei|tcb|2478@tdb|田东北|TBZ|tiandongbei|tdb|2479@tdd|土地堂东|TTN|tuditangdong|tdtd|2480@tgx|太谷西|TIV|taiguxi|tgx|2481@tha|吐哈|THR|tuha|th|2482@tha|通海|TAM|tonghai|th|2483@thc|天河机场|TJN|tianhejichang|thjc|2484@thj|天河街|TEN|tianhejie|thj|2485@thx|通化县|TXL|tonghuaxian|thx|2486@tji|同江|TJB|tongjiang|tj|2487@tlb|吐鲁番北|TAR|tulufanbei|tlfb|2488@tlb|铜陵北|KXH|tonglingbei|tlb|2489@tni|泰宁|TNS|taining|tn|2490@trn|铜仁南|TNW|tongrennan|trn|2491@txh|汤逊湖|THN|tangxunhu|txh|2492@txi|藤县|TAZ|tengxian|tx|2493@tyn|太原南|TNV|taiyuannan|tyn|2494@tyx|通远堡西|TST|tongyuanpuxi|typx|2495@wdd|文登东|WGK|wendengdong|wdd|2496@wfs|五府山|WFG|wufushan|wfs|2497@whb|威虎岭北|WBL|weihulingbei|whlb|2498@whb|威海北|WHK|weihaibei|whb|2499@wld|五龙背东|WMT|wulongbeidong|wlbd|2500@wln|乌龙泉南|WFN|wulongquannan|wlqn|2501@wlq|乌鲁木齐|WAR|wulumuqi|wlmq|2502@wns|五女山|WET|wunvshan|wns|2503@wsh|武胜|WSE|wusheng|ws|2504@wwe|无为|IIH|wuwei|ww|2505@wws|瓦屋山|WAH|wawushan|wws|2506@wxx|闻喜西|WOV|wenxixi|wxx|2507@wyb|武义北|WDH|wuyibei|wyb|2508@wyb|武夷山北|WBS|wuyishanbei|wysb|2509@wyd|武夷山东|WCS|wuyishandong|wysd|2510@wyu|婺源|WYG|wuyuan|wy|2511@wzb|万州北|WZE|wanzhoubei|wzb|2512@wzh|武陟|WIF|wuzhi|wz|2513@wzn|梧州南|WBZ|wuzhounan|wzn|2514@xab|兴安北|XDZ|xinganbei|xab|2515@xcd|许昌东|XVF|xuchangdong|xcd|2516@xch|项城|ERN|xiangcheng|xc|2517@xdd|新都东|EWW|xindudong|xdd|2518@xfe|西丰|XFT|xifeng|xf|2519@xfx|襄汾西|XTV|xiangfenxi|xfx|2520@xgb|孝感北|XJN|xiaoganbei|xgb|2521@xgd|孝感东|GDN|xiaogandong|xgd|2522@xhd|西湖东|WDQ|xihudong|xhd|2523@xhn|新化南|EJQ|xinhuanan|xhn|2524@xhx|新晃西|EWQ|xinhuangxi|xhx|2525@xji|新津|IRW|xinjin|xj|2526@xjk|小金口|NKQ|xiaojinkou|xjk|2527@xjn|新津南|ITW|xinjinnan|xjn|2528@xnd|咸宁东|XKN|xianningdong|xnd|2529@xnn|咸宁南|UNN|xianningnan|xnn|2530@xpn|溆浦南|EMQ|xupunan|xpn|2531@xtb|湘潭北|EDQ|xiangtanbei|xtb|2532@xtd|邢台东|EDP|xingtaidong|xtd|2533@xwq|西乌旗|XWC|xiwuqi|xwq|2534@xwx|修武西|EXF|xiuwuxi|xwx|2535@xxb|萧县北|QSH|xiaoxianbei|xxb|2536@xxd|新乡东|EGF|xinxiangdong|xxd|2537@xyb|新余北|XBG|xinyubei|xyb|2538@xyc|西阳村|XQF|xiyangcun|xyc|2539@xyd|信阳东|OYN|xinyangdong|xyd|2540@xyd|咸阳秦都|XOY|xianyangqindu|xyqd|2541@xyo|仙游|XWS|xianyou|xy|2542@xzc|新郑机场|EZF|xinzhengjichang|xzjc|2543@ybl|迎宾路|YFW|yingbinlu|ybl|2544@ycb|永城北|RGH|yongchengbei|ycb|2545@ycb|运城北|ABV|yunchengbei|ycb|2546@ycd|永川东|WMW|yongchuandong|ycd|2547@ych|宜春|YEG|yichun|yc|2548@ych|岳池|AWW|yuechi|yc|2549@ydh|云东海|NAQ|yundonghai|ydh|2550@yfd|云浮东|IXQ|yunfudong|yfd|2551@yfn|永福南|YBZ|yongfunan|yfn|2552@yge|雨格|VTM|yuge|yg|2553@yhe|洋河|GTH|yanghe|yh|2554@yjb|永济北|AJV|yongjibei|yjb|2555@yji|弋江|RVH|yijiang|yj|2556@yjp|于家堡|YKP|yujiapu|yjp|2557@yjx|延吉西|YXL|yanjixi|yjx|2558@ykn|永康南|QUH|yongkangnan|ykn|2559@ylh|运粮河|YEF|yunlianghe|ylh|2560@yli|炎陵|YAG|yanling|yl|2561@yln|杨陵南|YEY|yanglingnan|yln|2562@ymi|伊敏|YMX|yimin|ym|2563@yna|郁南|YKQ|yunan|yn|2564@ypi|银瓶|KPQ|yinping|yp|2565@ysh|永寿|ASY|yongshou|ys|2566@ysh|阳朔|YCZ|yangshuo|ys|2567@ysh|云山|KZQ|yunshan|ys|2568@ysn|玉山南|YGG|yushannan|ysn|2569@yta|银滩|CTQ|yintan|yt|2570@yta|永泰|YTS|yongtai|yt|2571@ytb|鹰潭北|YKG|yingtanbei|ytb|2572@ytn|烟台南|YLK|yantainan|ytn|2573@yxi|尤溪|YXS|youxi|yx|2574@yxi|云霄|YBS|yunxiao|yx|2575@yxi|宜兴|YUH|yixing|yx|2576@yxi|玉溪|AXM|yuxi|yx|2577@yxi|阳信|YVK|yangxin|yx|2578@yxi|应县|YZV|yingxian|yx|2579@yxn|攸县南|YXG|youxiannan|yxn|2580@yyb|余姚北|CTH|yuyaobei|yyb|2581@zan|诏安|ZDS|zhaoan|za|2582@zdc|正定机场|ZHP|zhengdingjichang|zdjc|2583@zfd|纸坊东|ZMN|zhifangdong|zfd|2584@zhb|庄河北|ZUT|zhuanghebei|zhb|2585@zhu|昭化|ZHW|zhaohua|zhu|2586@zjb|织金北|ZJE|zhijinbei|zjb|2587@zji|芷江|ZPQ|zhijiang|zj|2588@zji|织金|IZW|zhijin|zj|2589@zka|仲恺|KKQ|zhongkai|zk|2590@zko|曾口|ZKE|zengkou|zk|2591@zli|左岭|ZSN|zuoling|zl|2592@zmd|樟木头东|ZRQ|zhangmutoudong|zmtd|2593@zmx|驻马店西|ZLN|zhumadianxi|zmdx|2594@zpu|漳浦|ZCS|zhangpu|zp|2595@zqd|肇庆东|FCQ|zhaoqingdong|zqd|2596@zqi|庄桥|ZQH|zhuangqiao|zq|2597@zsx|钟山西|ZAZ|zhongshanxi|zsx|2598@zyb|资阳北|FYW|ziyangbei|zyb|2599@zyx|张掖西|ZEJ|zhangyexi|zyx|2600@zzb|资中北|WZW|zizhongbei|zzb|2601@zzd|涿州东|ZAP|zhuozhoudong|zzd|2602@zzd|枣庄东|ZNK|zaozhuangdong|zzd|2603@zzd|卓资东|ZDC|zhuozidong|zzd|2604@zzd|郑州东|ZAF|zhengzhoudong|zzd|2605";
        n.favorite_names = localStorage.favorite_names && localStorage.favorite_names.split("@").length > i ? localStorage.favorite_names : g,
        n.station_names = localStorage.station_names && localStorage.station_names.split("@").length > t ? localStorage.station_names : u,
        n.checkStationNames = function() {
            function a(a, i, t) {
                e.ajax({
                    url: a,
                    method: "GET",
                    dataType: "text",
                    success: function(a) {
                        a = (a || "") + "",
                        a = a.match(/[\s]*=[\s]*\'([^']+)\'/),
                        a = a ? a[1] : "",
                        a && a.split("@").length > t && (n[i] = a,
                        localStorage[i] = a)
                    }
                })
            }
            var h = "https://kyfw.12306.cn/otn/resources/js/framework/favorite_name.js?_" + Math.random()
              , s = "https://kyfw.12306.cn/otn/resources/js/framework/station_name.js?station_version=" + (2 + 8 * Math.random());
            a(h, "favorite_names", i),
            a(s, "station_names", t)
        }
        ,
        setInterval(a, 1e3 * 5 * (1 + Math.random())),
        setTimeout(a, 1e3 * 2 * (.5 + Math.random()))
    }
    (t),
    i.exports = t
}
);
define("./widgets/seatTypeMap/seatTypeMap", [], function(n, a, i) {
    "use strict";
    i.exports = {
        zy: "M",
        ze: "O",
        swz: "9",
        tz: "P",
        yz: "1",
        rz: "2",
        yw: "3",
        rw: "4",
        gr: "6",
        wz: "WZ",
        qt: "H",
        srrb: "F",
        yyrw: "A"
    }
}
);
"use strict";
define("./widgets/utils/shareMisc", ["../config/config", "../station/station", "../extension/extension"], function(n, a, i) {
    var e = {}
      , t = (n("../config/config"),
    n("../station/station"))
      , s = n("../extension/extension");
    !function(n) {
        function a(n, a) {
            s.sendMessage({
                type: "sendMessage",
                settings: {
                    type: "getSig",
                    data: n
                }
            }, a)
        }
        function i(n) {
            var a = document.createElement("canvas")
              , i = a.getContext("2d");
            try {
                a.width = n.naturalWidth,
                a.height = n.naturalHeight,
                i.drawImage(n, 0, 0)
            } catch (e) {}
            return a.toDataURL("image/png").replace("data:image/png;base64,", "")
        }
        function e(n) {
            return escape(n).toLocaleLowerCase().replace(/%u/gi, "\\u")
        }
        function h(n, a) {
            a.split("");
            for (var i = [], e = 0, t = 0; t < n.length; t++) {
                var s = a.charCodeAt(e);
                isNaN(s) && (e = 0,
                s = a.charCodeAt(e)),
                i.push(String.fromCharCode(n.charCodeAt(t) ^ s)),
                e++
            }
            return i.join("")
        }
        n.nextShareTime = 0,
        n.needShare = !1,
        n.getRule = function() {
            return
        }
        ,
        n.resetRule = function() {}
        ,
        n.shareSec = function(n) {
            return
        }
        ,
        n.shareCaptcha = function(n, e, t) {
            var h;
            try {
                h = i(n)
            } catch (g) {}
            h && s.sendMessage({
                type: "sendMessage",
                settings: {
                    type: "getCookie",
                    object: {
                        domain: "kyfw.12306.cn",
                        name: "current_captcha_type"
                    }
                }
            }, function(n) {
                var i = n && n.cookies
                  , g = i && i.length > 0 && i[0].value || "0"
                  , o = {
                    checkcode: "data:image/png;base64," + h,
                    yzm: e,
                    type: g,
                    code_type: t
                };
                try {
                    o = btoa(JSON.stringify(o))
                } catch (u) {}
                o && a(o, function(n) {
                    var a = {
                        data: o,
                        sign: n
                    };
                    s.ajax({
                        type: "POST",
                        url: "http://api.lxqp.360.cn/qiang/piao.php",
                        data: a,
                        success: function() {}
                    })
                }
                )
            }
            )
        }
        ,
        n.shareCaptchaAutoFaild = function(n, i, e, t) {
            n && s.sendMessage({
                type: "sendMessage",
                settings: {
                    type: "getCookie",
                    object: {
                        domain: "kyfw.12306.cn",
                        name: "current_captcha_type"
                    }
                }
            }, function(h) {
                var g = h && h.cookies
                  , o = g && g.length > 0 && g[0].value || "0"
                  , u = {
                    checkcode: "data:image/png;base64," + n,
                    yzm: i,
                    type: o,
                    code_type: t
                };
                try {
                    u = btoa(JSON.stringify(u))
                } catch (l) {}
                u && a(u, function(n) {
                    var a = {
                        data: u,
                        sign: n
                    };
                    s.ajax({
                        type: "POST",
                        url: "http://api.lxqp.360.cn/qiang/piao.php?m=autoFaild&rec=" + e,
                        data: a,
                        success: function() {}
                    })
                }
                )
            }
            )
        }
        ,
        n.statTrainInfo = function(n) {
            s.sendMessage({
                type: "sendMessage",
                settings: {
                    type: "getPIAOcodec"
                }
            }, function(a) {
                var i, t = {
                    mid: a,
                    code: n.bookableTrain.number,
                    from: e(n.bookableTrain.start),
                    to: e(n.bookableTrain.to),
                    type: n.bookableSeat.code,
                    traindate: n.bookableTrain.userSelectedDate,
                    num: n.selectedPassengers.length,
                    src: "web"
                };
                try {
                    i = encodeURIComponent(h(Base64.encode(JSON.stringify(t).replace(/\\\\u/g, "\\u")), "zplsurw"))
                } catch (s) {}
                (new Image).src = "http://api.lxqp.360.cn/train.html?train=" + i
            }
            )
        }
        ,
        n.statBrushInfo = function(n, a, i, g) {
            s.sendMessage({
                type: "sendMessage",
                settings: {
                    type: "getPIAOcodec"
                }
            }, function(s) {
                if (n.query.from && n.query.to && n.query.date) {
                    var o = {
                        mid: s,
                        from: e(t.getCityName(n.query.from.value)),
                        to: e(t.getCityName(n.query.to.value)),
                        traindate: n.query.date.value,
                        src: "web"
                    };
                    if (a && a.length > 0) {
                        var u = [];
                        a.forEach(function(n) {
                            u.push(e(n))
                        }
                        ),
                        o.prioritySeats = u
                    }
                    i && i.length > 0 && (o.priorityTrains = i),
                    g && g.length > 0 && (o.alternativeDates = g.map(function(n) {
                        return n.text
                    }
                    ));
                    var l;
                    try {
                        l = encodeURIComponent(h(Base64.encode(JSON.stringify(o).replace(/\\\\u/g, "\\u")), "zplsurw"))
                    } catch (c) {}
                    (new Image).src = "http://api.lxqp.360.cn/brush_train.html?train=" + l
                }
            }
            )
        }
        ,
        n.statImgVcode = function(n) {
            (new Image).src = "http://api.lxqp.360.cn/verify.html?type=" + n + "&r=" + Math.random()
        }
    }
    (e),
    i.exports = e
}
);
define("./widgets/station/station", ["./../config/config", "./../config/monitor"], function(n, a, i) {
    "use strict";
    var e, t, s = n("./../config/config"), h = n("./../config/monitor"), o = h.favorite_names, g = h.station_names, u = [], l = [], c = [], d = [], r = [], y = [], x = [], z = [], p = s.get("hj_favcity") || "", f = 30, b = 6, j = null , m = 0, w = !1;
    !function() {
        for (var n = o.split("@"), a = 0; a < n.length; a++) {
            var i = n[a]
              , e = i.split("|") || {}
              , t = e[0] || ""
              , s = e[1] || ""
              , h = e[2] || ""
              , u = e[3] || "";
            if (-1 === g.indexOf(s)) {
                var l = "@" + [t, s, h, t, t, u].join("|");
                g += l
            }
        }
    }
    ();
    var q = function() {
        for (var n = g.split("@"), a = 0; a < n.length; a++) {
            var i = n[a]
              , e = i.toString().charAt(0);
            "a" == e || "b" == e || "c" == e || "d" == e || "e" == e ? d.push(i.split("|")) : "f" == e || "g" == e || "h" == e || "i" == e || "j" == e ? r.push(i.split("|")) : "k" == e || "l" == e || "m" == e || "n" == e || "o" == e ? y.push(i.split("|")) : "p" == e || "q" == e || "r" == e || "s" == e || "t" == e ? x.push(i.split("|")) : ("u" == e || "v" == e || "w" == e || "x" == e || "y" == e || "z" == e) && z.push(i.split("|")),
            i.length > 0 && (i = i.split("|"),
            "" != p && i[2] == p ? (u.unshift(i),
            a > 6 && u.push(i)) : u.push(i))
        }
        for (var a = 0; a < u.length; a++)
            u[a].push(a);
        for (var t = o.split("@"), a = 0; a < t.length; a++) {
            var i = t[a];
            i.length > 0 && (i = i.split("|"),
            l.push(i))
        }
        for (var a = 0; a < l.length; a++)
            l[a].push(a);
        for (var a = 0; a < u.length; a++)
            for (var s = 0; s < l.length; s++)
                if (l[s] && l[s][1] == u[a][1]) {
                    var h = u[a];
                    u.splice(a, 1),
                    u.unshift(h);
                    break
                }
    }
    ;
    q();
    var T = !1
      , k = function(n) {
        this.opt = n || {}
    }
    ;
    k.getCityID = function(n) {
        for (var a = 0; a < u.length; a++)
            if (u[a][1] == n)
                return u[a][2];
        return 0
    }
    ,
    k.getCityName = function(n) {
        for (var a = 0; a < u.length; a++)
            if (u[a][2] == n)
                return u[a][1];
        return ""
    }
    ,
    k.prototype = {
        init: function() {
            if (this.opt.$selector) {
                if (this.el_key = "piao_station_el",
                this.make_box1(),
                this.make_box2(),
                this.opt.$selector.enterFocusSelector = this.opt.$enterFocusSelector,
                this.opt.$selector.selectedCallback = this.opt.$selectedCallback,
                this.opt.$selector.setConfigKey = this.opt.$setConfigKey || this.opt.$selector.attr("id"),
                this.opt.$selector.val_ = this.opt.$val || s.get(this.opt.$selector.setConfigKey) || "",
                k.getCityID(this.opt.$selector.val_) ? this.opt.$selector.val(this.opt.$selector.val_) : s.setByKey("FROM_STATION", ""),
                this.opt.$selector.attr("data-station")) {
                    var n = $('.station-placeholder[data-station="' + this.opt.$selector.attr("data-station") + '"]');
                    return n && (n.hide(),
                    "" == this.opt.$selector.val_ && n.show()),
                    void 0
                }
                this.placeholder(),
                this.addEvent(),
                this.opt.$selector.attr("data-station", m++),
                T = !0
            }
        },
        placeholder: function() {
            if (this.opt.$placeholderText) {
                j = this.opt.$selector,
                j.offset();
                var n = {
                    left: 3,
                    top: 0,
                    height: this.opt.$selector[0].offsetHeight,
                    lineHeight: this.opt.$selector[0].offsetHeight + "px",
                    position: "absolute",
                    display: "none"
                }
                  , a = $('<span class="station-placeholder" data-station="' + m + '">' + this.opt.$placeholderText + "</span>");
                a.css(n),
                "" == j.val() && a.show(),
                this.placeholderObj = a,
                j.after(a)
            }
        },
        make_box1: function() {
            $("#" + this.el_key + "_box1")[0] || $("body").append($('<div id="' + this.el_key + '_box1" class="piao_station_box1">' + '<div class="b1-hd"></div>' + '<ul class="b1-list"></ul>' + '<ul class="b1-page"></ul>' + "</div>").hide()),
            this.$box1 = $("#" + this.el_key + "_box1"),
            this.$box1_hd = $(this.$box1.find(".b1-hd")),
            this.$box1_list = $(this.$box1.find(".b1-list")),
            this.$box1_page = $(this.$box1.find(".b1-page"))
        },
        make_box2: function() {
            $("#" + this.el_key + "_box2")[0] || $("body").append($('<div id="' + this.el_key + '_box2" class="piao_station_box2">' + '<div class="b2-title">可直接输入拼音或首字母<del class="ch-btn-close">X</del></div>' + '<ul class="b2-hd">' + '<li data-index="0" class="selected">热门</li>' + '<li data-index="1">ABCDE</li>' + '<li data-index="2">FGHIJ</li>' + '<li data-index="3">KLMNO</li>' + '<li data-index="4">PQRST</li>' + '<li data-index="5">UVWXYZ</li>' + "</ul>" + '<ul class="b2-list"></ul>' + '<ul class="b2-page"></ul>' + "</div>").hide()),
            this.$box2 = $("#" + this.el_key + "_box2"),
            this.$box2_hd = $(this.$box2.find(".b2-hd")),
            this.$box2_tab = this.$box2_hd.find("li"),
            this.$box2_list = $(this.$box2.find(".b2-list")),
            this.$box2_page = $(this.$box2.find(".b2-page"))
        },
        make_focus: function() {
            this.set_position(),
            w || ("none" == this.$box1.css("display") ? (this.$box2_hd.find("li:first").click(),
            this.make_box2_list(0),
            this.$box2.show(),
            this.$box1.hide(),
            c = []) : (this.make_box1_list(0),
            this.$box1.show(),
            this.$box2.hide()),
            this.placeholder_display())
        },
        placeholder_display: function() {
            this.placeholderObj && this.placeholderObj.hide(),
            "" == j.val() && "none" == this.$box1.css("display") && "none" == this.$box2.css("display") && this.placeholderObj && this.placeholderObj.show()
        },
        set_position: function(n) {
            j = n || this.opt.$selector;
            var a = j.offset()
              , i = {
                left: a.left,
                top: a.top + this.opt.$selector[0].offsetHeight,
                position: "absolute"
            };
            this.$box1.css(i),
            this.$box2.css(i)
        },
        do_selected_callback: function(n) {
            var a = j.val();
            if (!this.check_city(a))
                return j.val(s.get(this.opt.$selector.setConfigKey) || ""),
                void 0;
            if (!n) {
                var i = j.setConfigKey
                  , e = {};
                e[i.toString()] = a,
                s.set(e, function(n) {
                    console.log(n)
                }
                ),
                j.selectedCallback && j.selectedCallback()
            }
        },
        check_city: function(n) {
            for (var a = 0; a < u.length; a++)
                if (u[a][1] == n)
                    return !0;
            return !1
        },
        addEvent: function() {
            var n = this
              , a = function(a) {
                j.val(a),
                n.do_selected_callback(),
                j.enterFocusSelector && "" == j.enterFocusSelector.val() && j.enterFocusSelector.focus().select()
            }
            ;
            T || (n.$box2_tab.click(function() {
                n.$box2_tab.removeClass("selected"),
                $(this).addClass("selected"),
                n.make_box2_list()
            }
            ),
            n.$box1_page.delegate("a", "click", function(a, i) {
                w = !0,
                n.make_box1_list($(this).attr("data-index"), "updown" == i),
                w = !1
            }
            ),
            n.$box1_list.delegate("li", "click", function() {
                n.$box1.hide(),
                a($(this).text())
            }
            ),
            n.$box2_page.delegate("a", "click", function() {
                w = !0,
                n.make_box2_list($(this).attr("data-index")),
                w = !1
            }
            ),
            n.$box2_list.delegate("li", "click", function() {
                n.$box2.hide(),
                a($(this).text())
            }
            ),
            n.$box2.find("del").click(function() {
                n.$box2.hide()
            }
            ),
            n.$box1.click(function(n) {
                n.stopPropagation(),
                j.select(function() {
                    w = !0
                }
                )
            }
            ).mousemove(function() {
                e = !0
            }
            ).mouseleave(function() {
                e = !1
            }
            ),
            n.$box2.click(function(n) {
                n.stopPropagation(),
                j.select(function() {
                    w = !0
                }
                )
            }
            ).mousemove(function() {
                t = !0
            }
            ).mouseleave(function() {
                t = !1
            }
            ),
            n.$box2.click(function(n) {
                n.stopPropagation()
            }
            ),
            n.$box1[0].onselectstart = function() {
                return !1
            }
            ,
            n.$box2[0].onselectstart = function() {
                return !1
            }
            ,
            $(document).click(function() {
                n.$box1.hide(),
                n.$box2.hide(),
                n.do_selected_callback(!0),
                $(".station-placeholder").each(function() {
                    var n = $('input[data-station="' + $(this).attr("data-station") + '"]');
                    n && ("" == n.val() ? $(this).show() : $(this).hide())
                }
                )
            }
            ),
            $(window).resize(function() {
                n.set_position(j)
            }
            )),
            n.opt.$selector.keydown(function(a) {
                if (40 == a.keyCode || 38 == a.keyCode) {
                    n.$box1.show(),
                    n.$box2.hide(),
                    c.length <= 0 && (c = n.filterCity(""),
                    n.make_box1_list(0));
                    var i = n.$box1_list.find("li");
                    n.$box1.show();
                    for (var e = 0; e < i.length; e++)
                        if ($(i[e]).hasClass("selected")) {
                            if (0 == e && 38 == a.keyCode || e == i.length - 1 && 40 == a.keyCode)
                                n.$box1_page.find(38 == a.keyCode ? ".prev" : ".next").trigger("click", ["updown"]);
                            else {
                                var t = $(i[e + (38 == a.keyCode ? -1 : 1)]);
                                t.addClass("selected"),
                                $(i[e]).removeClass("selected")
                            }
                            return j.val(n.$box1_list.find("li.selected").text()),
                            void 0
                        }
                } else
                    13 == a.keyCode && "none" != n.$box1.css("display") && (n.$box1_list.find(".selected")[0] && j.val(n.$box1_list.find(".selected").text()),
                    n.do_selected_callback(),
                    n.$box1.hide());
                n.$box1.show(),
                n.$box2.hide()
            }
            ).focus(function() {
                n.make_focus(),
                n.$box1.find("font").text() != j.val() && n.$box1.find(".b1-list, font").empty()
            }
            ).blur(function() {
                e || n.$box1.hide(),
                t || n.$box2.hide(),
                e || t || $(this).val() != s.get(n.opt.$selector.setConfigKey) && n.do_selected_callback(),
                w = !1,
                setTimeout(n.placeholder_display.bind(n), 120)
            }
            ).keyup(function(a) {
                40 != a.keyCode && 38 != a.keyCode && 37 != a.keyCode && 39 != a.keyCode && 13 != a.keyCode && 9 != a.keyCode && (c = n.filterCity(j.val()),
                n.make_box1_list(0)),
                13 == a.keyCode && ($(this).blur(),
                n.opt.$enterFocusSelector && "" == j.enterFocusSelector.val() && n.opt.$enterFocusSelector.focus())
            }
            ).click(function(n) {
                n.stopPropagation()
            }
            ),
            n.opt.$iconSelector && n.opt.$iconSelector.click(function(a) {
                a.stopPropagation(),
                n.opt.$selector.focus()
            }
            ),
            n.placeholderObj && n.placeholderObj.click(function(a) {
                a.stopPropagation(),
                $(this).hide(),
                n.opt.$selector.focus()
            }
            )
        },
        make_box1_list: function(n, a) {
            var i = Math.ceil(c.length / b)
              , e = "";
            n = parseInt(n) || 0,
            0 > n && (n = 0),
            n > i && (n = i - 1);
            for (var t = b * n; b * n + b > t; t++)
                c[t] && (e += '<li title="' + c[t][1] + '">' + c[t][1] + "</li>");
            if (this.$box1_list.html(e).find("li:first").addClass("selected"),
            i > 1) {
                var s, h, o = '<span class="prev">« 上一页</span>', g = '<span class="next">下一页 »</span>';
                s = '<a class="prev" data-index="' + (n - 1) + '">« 上一页</a>',
                h = '<a class="next" data-index="' + (n + 1) + '">下一页 »</a>',
                0 == n && (s = o),
                n == i - 1 && (h = g),
                this.$box1_page.html(s + h).show()
            } else
                this.$box1_page.hide();
            "none" != this.$box1.css("display") && a !== !0 && (w = !0)
        },
        make_box2_list: function(n) {
            var a = parseInt(this.$box2_hd.find(".selected").attr("data-index")) || 0;
            n = parseInt(n) || 0;
            var i, e = "";
            switch (a) {
            case 1:
                i = d;
                break;
            case 2:
                i = r;
                break;
            case 3:
                i = y;
                break;
            case 4:
                i = x;
                break;
            case 5:
                i = z;
                break;
            default:
                i = l
            }
            var t = 0 == a ? f + 5 : f
              , s = Math.ceil(i.length / t);
            0 > n && (n = 0),
            n > s && (n = s - 1);
            for (var h = t * n; t * n + t > h; h++)
                i[h] && (e += '<li title="' + i[h][1] + '">' + i[h][1] + "</li>");
            if (this.$box2_list.html(e),
            s > 1) {
                var o, g, u = "« 上一页", c = "下一页 »";
                o = '<a data-index="' + (n - 1) + '">' + u + "</a>",
                g = '<a data-index="' + (n + 1) + '">' + c + "</a>",
                0 == n && (o = u),
                n == s - 1 && (g = c),
                this.$box2_page.html(o + "<span>|</span>" + g).show()
            } else
                this.$box2_page.hide()
        },
        filterCity: function(n) {
            if (0 == n.length)
                return this.$box1_hd.html("简码/汉字或↑↓"),
                u;
            for (var a = [], i = /[^A-z]/.test(n), e = 0; e < u.length; e++)
                this.isMatchCity(u[e], n, i) && a.push(u[e]);
            return a.length > 0 ? (this.$box1_hd.html('按"<font color=red></font>"检索：').find("font").text(n),
            a) : (this.$box1_hd.html("无法匹配:<font color=red></font>").find("font").text(n),
            [])
        },
        replaceChar: function(n, a, i) {
            return n.substr(0, a) + i + n.substr(a + 1, n.length - 1)
        },
        isMatchCity: function(n, a, i) {
            var a = a.toLowerCase()
              , e = [n[4].toLowerCase(), n[1], n[3].toLowerCase()]
              , t = -1
              , s = -1;
            if (i) {
                a = a.split("");
                for (var h = 0; h < a.length; h++) {
                    var o = e[1].indexOf(a[h]);
                    if (!(o > t && h >= o))
                        return !1;
                    e[1] = this.replaceChar(e[1], o, "-"),
                    t = o
                }
            } else {
                a = a.split("");
                for (var g = !0, u = !0, h = 0; h < a.length; h++) {
                    var o = e[0].indexOf(a[h]);
                    if (!(o > t && h >= o)) {
                        g = !1;
                        break
                    }
                    e[0] = this.replaceChar(e[0], o, "-"),
                    t = o
                }
                for (var h = 0; h < a.length; h++) {
                    var l = e[2].indexOf(a[h]);
                    if (!(l > s && h >= l)) {
                        u = !1;
                        break
                    }
                    e[2] = this.replaceChar(e[2], l, "-"),
                    s = l
                }
                if (0 == g && 0 == u)
                    return !1
            }
            return !0
        }
    },
    window.Station = k,
    i.exports = k
}
);
define("./widgets/trainList/view", ["../../lib/artTemplate"], function(n, a, i) {
    "use strict";
    var e = n("../../lib/artTemplate")
      , t = function(n) {
        n = n || {},
        this._host = n.host,
        this._wrapper = $(n.selector)
    }
    ;
    t.init = function(n, a) {
        a = a || {},
        $.extend(a, {
            host: n
        });
        var i = new t(a)
          , e = ["show", "redraw", "clear", "showError", "renderLast"];
        return e.forEach(function(a) {
            n[a] = function() {
                return i[a].apply(i, arguments)
            }
        }
        ),
        i
    }
    ,
    t.prototype.__wait = function(n) {
        var a = this;
        this.__timer && (clearTimeout(this.__timer),
        this.__timer = 0),
        this.__timer = setTimeout(function() {
            n(),
            a.__timer = 0
        }
        , 0)
    }
    ,
    t.prototype.show = function(n, a) {
        this.__wait(this.__show.bind(this, n, a))
    }
    ,
    t.prototype.__show = function(n, a) {
        this._wrapper.css("opacity", "0.3");
        var i = this;
        this._wrapper.html($('<div class="train_list_loading"><div>').append($("<img>").attr("src", "images/loading.gif")).append($("<span>正在加载车次列表...</span>"))),
        this._host.getData({
            success: function(e) {
                e.list = i._host._applyFilter(e.list),
                i.__filterNoTicket(e),
                $(document).trigger({
                    type: "beforerender"
                }, e),
                i.__render(e, a),
                $(document).trigger({
                    type: "afterrender"
                }, e),
                n && n(e)
            },
            error: function(n) {
                i._wrapper.css("opacity", "1"),
                n && "notenoughparam" === n.code ? (i.__render({}),
                i.showError(n.msg)) : n && "timeout" === n.code && (i.__render({}),
                i.showError(n.msg))
            }
        })
    }
    ,
    t.prototype.renderLast = function() {
        this._lastData && (this._lastData.list = this._lastData.list || [],
        this.__render(this._lastData),
        $(document).trigger({
            type: "afterrender"
        }, this._lastData))
    }
    ,
    t.prototype.showError = function(n) {
        var a = $("#train_list_error_msg");
        a.show(),
        a.find("span").html(n)
    }
    ,
    t.prototype.redraw = function() {
        this.__wait(this.__redraw.bind(this))
    }
    ,
    t.prototype.clear = function() {
        this._wrapper.html("")
    }
    ,
    t.prototype.__redraw = function() {
        var n = this._host._getCachedData();
        n.list = this._host._applyFilter(n.list),
        this.__filterNoTicket(n),
        $(document).trigger({
            type: "beforerender"
        }, n),
        this.__render(n),
        $(document).trigger({
            type: "afterrender"
        }, n)
    }
    ,
    t.prototype.__render = function(n, a) {
        if (this._lastData = n,
        a !== !0) {
            var i = e.render("train_list_template", n);
            this._wrapper.html(i),
            n && n.list && $(document).trigger({
                type: "trainlistrendered"
            }, n)
        } else if (n && n.list) {
            var t = {
                list: n.list.slice(0, 5)
            };
            this._wrapper.html(e.render("train_list_template", t))
        }
        this._wrapper.css("opacity", "1")
    }
    ,
    t.prototype.__filterNoTicket = function(n) {
        n.list.forEach(function(n) {
            for (var a = n.seats, i = a.length - 1; i >= 0; ) {
                var e = a[i];
                ("无" === e.tickets || "--" === e.tickets) && (e.display = "none"),
                i--
            }
        }
        )
    }
    ,
    i.exports = t
}
);
!function(n) {
    "use strict";
    var a = function(n, i) {
        return a["string" == typeof i ? "compile" : "render"].apply(a, arguments)
    }
    ;
    a.version = "2.0.2",
    a.openTag = "<%",
    a.closeTag = "%>",
    a.isEscape = !0,
    a.isCompress = !1,
    a.parser = null ,
    a.render = function(n, i) {
        var e = a.get(n) || t({
            id: n,
            name: "Render Error",
            message: "No Template"
        });
        return e(i)
    }
    ,
    a.compile = function(n, e) {
        function h(i) {
            try {
                return new l(i,n) + ""
            } catch (s) {
                return g ? t(s)() : a.compile(n, e, !0)(i)
            }
        }
        var o = arguments
          , g = o[2]
          , u = "anonymous";
        "string" != typeof e && (g = o[1],
        e = o[0],
        n = u);
        try {
            var l = s(n, e, g)
        } catch (c) {
            return c.id = n || e,
            c.name = "Syntax Error",
            t(c)
        }
        return h.prototype = l.prototype,
        h.toString = function() {
            return l.toString()
        }
        ,
        n !== u && (i[n] = h),
        h
    }
    ;
    var i = a.cache = {}
      , e = a.helpers = {
        $include: a.render,
        $string: function(n, a) {
            return "string" != typeof n && (a = typeof n,
            "number" === a ? n += "" : n = "function" === a ? e.$string(n()) : ""),
            n
        },
        $escape: function(n) {
            var a = {
                "<": "&#60;",
                ">": "&#62;",
                '"': "&#34;",
                "'": "&#39;",
                "&": "&#38;"
            };
            return e.$string(n).replace(/&(?![\w#]+;)|[<>"']/g, function(n) {
                return a[n]
            }
            )
        },
        $each: function(n, a) {
            var i = Array.isArray || function(n) {
                return "[object Array]" === {}.toString.call(n)
            }
            ;
            if (i(n))
                for (var e = 0, t = n.length; t > e; e++)
                    a.call(n, n[e], e, n);
            else
                for (e in n)
                    a.call(n, n[e], e)
        }
    };
    a.helper = function(n, a) {
        e[n] = a
    }
    ,
    a.onerror = function(a) {
        var i = "Template Error\n\n";
        for (var e in a)
            i += "<" + e + ">\n" + a[e] + "\n\n";
        n.console && console.error(i)
    }
    ,
    a.get = function(e) {
        var t;
        if (i.hasOwnProperty(e))
            t = i[e];
        else if ("document" in n) {
            var s = document.getElementById(e);
            if (s) {
                var h = s.value || s.innerHTML;
                t = a.compile(e, h.replace(/^\s*|\s*$/g, ""))
            }
        }
        return t
    }
    ;
    var t = function(n) {
        return a.onerror(n),
        function() {
            return "{Template Error}"
        }
    }
      , s = function() {
        var n = e.$each
          , i = "break,case,catch,continue,debugger,default,delete,do,else,false,finally,for,function,if,in,instanceof,new,null,return,switch,this,throw,true,try,typeof,var,void,while,with,abstract,boolean,byte,char,class,const,double,enum,export,extends,final,float,goto,implements,import,int,interface,long,native,package,private,protected,public,short,static,super,synchronized,throws,transient,volatile,arguments,let,yield,undefined"
          , t = /\/\*[\w\W]*?\*\/|\/\/[^\n]*\n|\/\/[^\n]*$|"(?:[^"\\]|\\[\w\W])*"|'(?:[^'\\]|\\[\w\W])*'|[\s\t\n]*\.[\s\t\n]*[$\w\.]+/g
          , s = /[^\w$]+/g
          , h = new RegExp(["\\b" + i.replace(/,/g, "\\b|\\b") + "\\b"].join("|"),"g")
          , o = /^\d[^,]*|,\d[^,]*/g
          , g = /^,+|,+$/g
          , u = function(n) {
            return n.replace(t, "").replace(s, ",").replace(h, "").replace(o, "").replace(g, "").split(/^$|,+/)
        }
        ;
        return function(i, t, s) {
            function h(n) {
                return p += n.split(/\n/).length - 1,
                a.isCompress && (n = n.replace(/[\n\r\t\s]+/g, " ").replace(/<!--.*?-->/g, "")),
                n && (n = w[1] + c(n) + w[2] + "\n"),
                n
            }
            function o(n) {
                var i = p;
                if (y ? n = y(n) : s && (n = n.replace(/\n/g, function() {
                    return p++,
                    "$line=" + p + ";"
                }
                )),
                0 === n.indexOf("=")) {
                    var t = 0 !== n.indexOf("==");
                    if (n = n.replace(/^=*|[\s;]*$/g, ""),
                    t && a.isEscape) {
                        var h = n.replace(/\s*\([^\)]+\)/, "");
                        e.hasOwnProperty(h) || /^(include|print)$/.test(h) || (n = "$escape(" + n + ")")
                    } else
                        n = "$string(" + n + ")";
                    n = w[1] + n + w[2]
                }
                return s && (n = "$line=" + i + ";" + n),
                g(n),
                n + "\n"
            }
            function g(a) {
                a = u(a),
                n(a, function(n) {
                    f.hasOwnProperty(n) || (l(n),
                    f[n] = !0)
                }
                )
            }
            function l(n) {
                var a;
                "print" === n ? a = _ : "include" === n ? (b.$include = e.$include,
                a = T) : (a = "$data." + n,
                e.hasOwnProperty(n) && (b[n] = e[n],
                a = 0 === n.indexOf("$") ? "$helpers." + n : a + "===undefined?$helpers." + n + ":" + a)),
                j += n + "=" + a + ","
            }
            function c(n) {
                return "'" + n.replace(/('|\\)/g, "\\$1").replace(/\r/g, "\\r").replace(/\n/g, "\\n") + "'"
            }
            var r = a.openTag
              , d = a.closeTag
              , y = a.parser
              , x = t
              , z = ""
              , p = 1
              , f = {
                $data: 1,
                $id: 1,
                $helpers: 1,
                $out: 1,
                $line: 1
            }
              , b = {}
              , j = "var $helpers=this," + (s ? "$line=0," : "")
              , m = "".trim
              , w = m ? ["$out='';", "$out+=", ";", "$out"] : ["$out=[];", "$out.push(", ");", "$out.join('')"]
              , q = m ? "if(content!==undefined){$out+=content;return content;}" : "$out.push(content);"
              , _ = "function(content){" + q + "}"
              , T = "function(id,data){data=data||$data;var content=$helpers.$include(id,data,$id);" + q + "}";
            n(x.split(r), function(n) {
                n = n.split(d);
                var a = n[0]
                  , i = n[1];
                1 === n.length ? z += h(a) : (z += o(a),
                i && (z += h(i)))
            }
            ),
            x = z,
            s && (x = "try{" + x + "}catch(e){" + "throw {" + "id:$id," + "name:'Render Error'," + "message:e.message," + "line:$line," + "source:" + c(t) + ".split(/\\n/)[$line-1].replace(/^[\\s\\t]+/,'')" + "};" + "}"),
            x = j + w[0] + x + "return new String(" + w[3] + ");";
            try {
                var k = new Function("$data","$id",x);
                return k.prototype = b,
                k
            } catch (S) {
                throw S.temp = "function anonymous($data,$id) {" + x + "}",
                S
            }
        }
    }
    ();
    "function" == typeof define ? define("./lib/artTemplate", [], function() {
        return a
    }
    ) : "undefined" != typeof exports && (module.exports = a),
    n.template = a
}
(this);
"use strict";
define("./widgets/window/window", ["../../lib/jquery-overlay"], function(n, i, a) {
    n("../../lib/jquery-overlay");
    var e, t = function() {
        this.__tmpl = $("#window_template").html(),
        this.__wrapper = $(this.__tmpl),
        this.__closeType = "cancel",
        this.__opened = !1,
        $("#main").append(this.__wrapper),
        this.__content = this.__wrapper.find("[data-window-elem=content]"),
        this.__title = this.__wrapper.find("[data-window-elem=title]"),
        this.__btn = this.__wrapper.find("[data-window-elem=btn_wrapper]"),
        this.__initEvents()
    }
    ;
    t.prototype.open = function(n) {
        this.__opened === !0 && this.close(),
        this.__opened = !0,
        this.__reset(),
        n.content && this.__content.append(n.content),
        n.title && this.__title.html(n.title),
        n.block && $(document).trigger("blocking");
        var i = ["apply", "cancel"];
        n.btns && (i = n.btns),
        this.__showBtns(i),
        this.__wrapper.popup({
            blur: !1,
            keepfocus: !1,
            onclose: function() {
                n.callback && n.callback({
                    type: this.__closeType
                }),
                n.block && $(document).trigger("unblock"),
                this.__reset()
            }
            .bind(this)
        }),
        this.__wrapper.popup("show")
    }
    ,
    t.prototype.alert = function(n) {
        n.btns = ["apply", "close"],
        this.open(n)
    }
    ,
    t.prototype.disableBtn = function(n, i) {
        n.forEach(function(n) {
            var a = $("[data-window-btn=" + n + "]");
            "apply" == n && a.html("确定").off("click"),
            a.attr("disabled", i),
            i ? a.addClass("disabled") : a.removeClass("disabled")
        }
        )
    }
    ,
    t.prototype.__showBtns = function(n) {
        if (0 === n.length)
            this.__btn.hide();
        else {
            this.__btn.show();
            var i = $("[data-window-btn]");
            i.hide(),
            n.forEach(function(n) {
                $("[data-window-btn=" + n + "]").show()
            }
            )
        }
    }
    ,
    t.prototype.__reset = function() {
        this.__content.html(""),
        this.__title.html("提示"),
        this.disableBtn(["apply", "cancel", "close"], !1)
    }
    ,
    t.prototype.__initEvents = function() {
        this.__wrapper.delegate("[data-window-btn=apply]", "click", function(n) {
            "disabled" !== $(n.target).attr("disabled") && (this.__closeType = "apply",
            this.__wrapper.popup("hide"),
            this.__closeType = "cancel")
        }
        .bind(this)),
        this.__wrapper.delegate("[data-window-btn=cancel]", "click", function(n) {
            "disabled" !== $(n.target).attr("disabled") && (this.__closeType = "cancel",
            this.__wrapper.popup("hide"))
        }
        .bind(this)),
        this.__wrapper.delegate("[data-window-btn=close]", "click", function(n) {
            "disabled" !== $(n.target).attr("disabled") && (this.__closeType = "cancel",
            this.__wrapper.popup("hide"))
        }
        .bind(this))
    }
    ,
    t.prototype.close = function() {
        this.__wrapper.popup("hide"),
        this.__opened = !1
    }
    ,
    e = new t,
    t.__instance = e,
    t.alert = function(n) {
        e.alert(n)
    }
    ,
    t.open = function(n) {
        e.open(n)
    }
    ,
    t.disableBtn = function(n, i) {
        e.disableBtn(n, i)
    }
    ,
    t.close = function() {
        e.close()
    }
    ,
    Object.preventExtensions(t),
    a.exports = t
}
);
define("./lib/jquery-overlay", [], function() {
    !function(n) {
        var i, a = n(window), e = {}, t = [], s = [], o = !1, h = !1, g = null , u = null , l = null , c = null , d = "_open", r = "_close", y = null , p = {
            _init: function(i) {
                var a = n(i)
                  , e = a.data("popupoptions");
                s[i.id] = !1,
                t[i.id] = 0,
                a.data("popup-initialized") || (a.attr("data-popup-initialized", "true"),
                p._initonce(i)),
                e.autoopen && setTimeout(function() {
                    p.show(i, 0)
                }
                , 0)
            },
            _initonce: function(a) {
                var e, t = n("body"), s = $el.data("popupoptions");
                if (c = parseInt(t.css("margin-right"), 10),
                "tooltip" == s.type && (s.background = !1,
                s.scrolllock = !1),
                s.scrolllock) {
                    var o, h;
                    "undefined" == typeof i && (o = n('<div style="width:50px;height:50px;overflow:auto"><div/></div>').appendTo("body"),
                    h = o.children(),
                    i = h.innerWidth() - h.height(99).innerWidth(),
                    o.remove())
                }
                if ($el.attr("id") || $el.attr("id", "j-popup-" + parseInt(1e8 * Math.random())),
                $el.addClass("popup_content"),
                t.prepend(a),
                $el.wrap('<div id="' + a.id + '_wrapper" class="popup_wrapper" />'),
                e = n("#" + a.id + "_wrapper"),
                e.css({
                    opacity: 0,
                    visibility: "hidden",
                    position: "absolute",
                    overflow: "auto"
                }),
                e.on("mousedown", function(n) {
                    e.is(n.target) && n.stopPropagation()
                }
                ),
                e.on("click", function(n) {
                    e.is(n.target) && n.stopPropagation()
                }
                ),
                e.on("mouseup", function(n) {
                    e.is(n.target) && n.stopPropagation()
                }
                ),
                $el.css({
                    opacity: 0,
                    visibility: "hidden",
                    display: "inline-block"
                }),
                s.setzindex && !s.autozindex && e.css("z-index", "2001"),
                s.outline || $el.css("outline", "none"),
                s.transition && ($el.css("transition", s.transition),
                e.css("transition", s.transition)),
                n(a).attr("aria-hidden", !0),
                s.background && !n("#" + a.id + "_background").length) {
                    var g = '<div id="' + a.id + '_background" class="popup_background"></div>';
                    t.prepend(g);
                    var u = n("#" + a.id + "_background");
                    u.css({
                        opacity: 0,
                        visibility: "hidden",
                        backgroundColor: s.color,
                        position: "fixed",
                        top: 0,
                        right: 0,
                        bottom: 0,
                        left: 0
                    }),
                    s.setzindex && !s.autozindex && u.css("z-index", "2000"),
                    s.transition && u.css("transition", s.transition)
                }
                "overlay" == s.type && ($el.css({
                    textAlign: "left",
                    position: "relative",
                    verticalAlign: "middle"
                }),
                e.css({
                    position: "fixed",
                    top: 0,
                    right: 0,
                    left: 0,
                    bottom: 0,
                    textAlign: "center"
                }),
                e.append('<div class="popup_align" />'),
                n(".popup_align").css({
                    display: "inline-block",
                    verticalAlign: "middle",
                    height: "100%"
                })),
                $el.attr("role", "dialog");
                var l = s.openelement ? s.openelement : "." + a.id + d;
                n(l).each(function(i, a) {
                    n(a).attr("data-popup-ordinal", i),
                    n(a).attr("id") || n(a).attr("id", "open_" + parseInt(1e8 * Math.random(), 10))
                }
                ),
                $el.attr("aria-labelledby") || $el.attr("aria-label") || $el.attr("aria-labelledby", n(l).attr("id")),
                n(document).on("click", l, function(i) {
                    if (!$el.data("popup-visible")) {
                        var e = n(this).data("popup-ordinal");
                        setTimeout(function() {
                            p.show(a, e)
                        }
                        , 0),
                        i.preventDefault()
                    }
                }
                );
                var y = s.closeelement ? s.closeelement : "." + a.id + r;
                n(document).on("click", y, function(n) {
                    p.hide(a),
                    n.preventDefault()
                }
                ),
                s.detach ? $el.hide().detach() : e.hide()
            },
            show: function(e, d) {
                var r = n(e);
                if (!r.data("popup-visible")) {
                    r.data("popup-initialized") || p._init(e),
                    r.attr("data-popup-initialized", "true");
                    var f = n("body")
                      , z = r.data("popupoptions")
                      , b = n("#" + e.id + "_wrapper")
                      , m = n("#" + e.id + "_background");
                    if (x(e, d, z.beforeopen),
                    s[e.id] = d,
                    z.detach ? (b.prepend(e),
                    r.show()) : b.show(),
                    this.overlay_open_timer = setTimeout(function() {
                        b.css({
                            visibility: "visible",
                            opacity: 1
                        }),
                        n("html").addClass("popup_visible").addClass("popup_visible_" + e.id),
                        r.addClass("popup_content_visible")
                    }
                    , 20),
                    r.css({
                        visibility: "visible",
                        opacity: 1
                    }),
                    z.scrolllock && (f.css("overflow", "hidden"),
                    f.height() > a.height() && f.css("margin-right", c + i)),
                    setTimeout(function() {
                        o || (z.keepfocus && n(document).on("focusin", g),
                        z.blur && n(document).on("click", u),
                        z.escape && n(document).on("keydown", l)),
                        o ? h = !0 : o = !0
                    }
                    , 0),
                    r.data("popup-visible", !0),
                    p.reposition(e, d),
                    z.background && (m.css({
                        visibility: "visible",
                        opacity: z.opacity
                    }),
                    setTimeout(function() {
                        m.css({
                            opacity: z.opacity
                        })
                    }
                    , 0)),
                    y = document.activeElement,
                    z.keepfocus && (r.attr("tabindex", -1),
                    setTimeout(function() {
                        z.focuselement ? n(z.focuselement).focus() : r.focus()
                    }
                    , z.focusdelay),
                    g = function(n) {
                        var i = document.getElementById(e.id);
                        i.contains(n.target) || (n.stopPropagation(),
                        i.focus())
                    }
                    ),
                    z.autozindex) {
                        for (var j = document.getElementsByTagName("*"), w = j.length, _ = 0, q = 0; w > q; q++) {
                            var k = n(j[q]).css("z-index");
                            "auto" !== k && (k = parseInt(k),
                            k > _ && (_ = k))
                        }
                        t[e.id] = _,
                        t[e.id] > 0 && b.css({
                            zIndex: t[e.id] + 2
                        }),
                        z.background && t[e.id] > 0 && n("#" + e.id + "_background").css({
                            zIndex: t[e.id] + 1
                        })
                    }
                    z.blur && (u = function(i) {
                        n(i.target).parents().andSelf().is("#" + e.id) || p.hide(e)
                    }
                    ),
                    z.escape && (l = function(n) {
                        27 == n.keyCode && r.data("popup-visible") && p.hide(e)
                    }
                    ),
                    n(z.pagecontainer).attr("aria-hidden", !0),
                    r.attr("aria-hidden", !1),
                    b.one("transitionend", function() {
                        x(e, d, z.opentransitionend)
                    }
                    ),
                    x(e, d, z.onopen)
                }
            },
            hide: function(i) {
                this.overlay_open_timer && clearTimeout(this.overlay_open_timer);
                var a = n("body")
                  , e = n(i)
                  , t = e.data("popupoptions")
                  , d = n("#" + i.id + "_wrapper")
                  , r = n("#" + i.id + "_background");
                e.data("popup-visible", !1),
                h ? (n("html").removeClass("popup_visible_" + i.id),
                h = !1) : (n("html").removeClass("popup_visible").removeClass("popup_visible_" + i.id),
                o = !1),
                e.removeClass("popup_content_visible"),
                t.scrolllock && setTimeout(function() {
                    a.css({
                        overflow: "visible",
                        "margin-right": c
                    })
                }
                , 10),
                t.blur && n(document).off("click", u),
                t.keepfocus && (n(document).off("focusin", g),
                setTimeout(function() {
                    n(y).is(":visible") && y.focus()
                }
                , 0)),
                t.escape && n(document).off("keydown", l),
                d.css({
                    visibility: "hidden",
                    opacity: 0
                }),
                e.css({
                    visibility: "hidden",
                    opacity: 0
                }),
                t.background && r.css({
                    visibility: "hidden",
                    opacity: 0
                }),
                e.one("transitionend", function() {
                    e.data("popup-visible") || (t.detach ? e.hide().detach() : d.hide()),
                    t.notransitiondetach || x(i, s[i.id], t.closetransitionend)
                }
                ),
                t.notransitiondetach && (t.detach ? e.hide().detach() : d.hide()),
                n(t.pagecontainer).attr("aria-hidden", !1),
                e.attr("aria-hidden", !0),
                x(i, s[i.id], t.onclose)
            },
            toggle: function(n, i) {
                $el.data("popup-visible") ? p.hide(n) : setTimeout(function() {
                    p.show(n, i)
                }
                , 0)
            },
            reposition: function(i, a) {
                var e = n(i)
                  , t = e.data("popupoptions")
                  , s = n("#" + i.id + "_wrapper");
                if (n("#" + i.id + "_background"),
                a = a || 0,
                "tooltip" == t.type) {
                    s.css({
                        position: "absolute"
                    });
                    var o = t.openelement ? t.openelement : "." + i.id + d
                      , h = n(o + '[data-popup-ordinal="' + a + '"]')
                      , g = h.offset();
                    "right" == t.horizontal ? s.css("left", g.left + h.outerWidth() + t.offsetleft) : "leftedge" == t.horizontal ? s.css("left", g.left + h.outerWidth() - h.outerWidth() + t.offsetleft) : "left" == t.horizontal ? s.css("right", n(window).width() - g.left - t.offsetleft) : "rightedge" == t.horizontal ? s.css("right", n(window).width() - g.left - h.outerWidth() - t.offsetleft) : s.css("left", g.left + h.outerWidth() / 2 - e.outerWidth() / 2 - parseFloat(e.css("marginLeft")) + t.offsetleft),
                    "bottom" == t.vertical ? s.css("top", g.top + h.outerHeight() + t.offsettop) : "bottomedge" == t.vertical ? s.css("top", g.top + h.outerHeight() - e.outerHeight() + t.offsettop) : "top" == t.vertical ? s.css("bottom", n(window).height() - g.top - t.offsettop) : "topedge" == t.vertical ? s.css("bottom", n(window).height() - g.top - e.outerHeight() - t.offsettop) : s.css("top", g.top + h.outerHeight() / 2 - e.outerHeight() / 2 - parseFloat(e.css("marginTop")) + t.offsettop)
                } else
                    "overlay" == t.type && (t.horizontal ? s.css("text-align", t.horizontal) : s.css("text-align", "center"),
                    t.vertical ? e.css("vertical-align", t.vertical) : e.css("vertical-align", "middle"))
            }
        }, x = function(i, a, t) {
            var s = e.openelement ? e.openelement : "." + i.id + d
              , o = n(s + '[data-popup-ordinal="' + a + '"]');
            "function" == typeof t && t(o)
        }
        ;
        n.fn.popup = function(i) {
            return this.each(function() {
                if ($el = n(this),
                "object" == typeof i) {
                    var a = n.extend({}, n.fn.popup.defaults, i);
                    $el.data("popupoptions", a),
                    e = $el.data("popupoptions"),
                    p._init(this)
                } else
                    "string" == typeof i ? ($el.data("popupoptions") || ($el.data("popupoptions", n.fn.popup.defaults),
                    e = $el.data("popupoptions")),
                    p[i].call(this, this)) : ($el.data("popupoptions") || ($el.data("popupoptions", n.fn.popup.defaults),
                    e = $el.data("popupoptions")),
                    p._init(this))
            }
            )
        }
        ,
        n.fn.popup.defaults = {
            type: "overlay",
            autoopen: !1,
            background: !0,
            color: "black",
            opacity: "0.5",
            horizontal: "center",
            vertical: "middle",
            offsettop: 0,
            offsetleft: 0,
            escape: !0,
            blur: !0,
            setzindex: !0,
            autozindex: !1,
            scrolllock: !1,
            keepfocus: !0,
            focuselement: null ,
            focusdelay: 50,
            outline: !1,
            pagecontainer: null ,
            detach: !1,
            openelement: null ,
            closeelement: null ,
            transition: null ,
            notransitiondetach: !1,
            beforeopen: function() {},
            onclose: function() {},
            onopen: function() {},
            opentransitionend: function() {},
            closetransitionend: function() {}
        }
    }
    (jQuery)
}
);
define("./widgets/station/sellTime", ["./station"], function(n, i, a) {
    "use strict";
    function e(n) {
        for (var i = t.getCityName(n), a = [i], e = [], h = [], g = 0; g < o.length; g++) {
            var u = o[g]
              , l = u.indexOf(i);
            if (-1 != l) {
                a = u.concat([]),
                a.splice(l, 1),
                a.unshift(i);
                break
            }
        }
        a.forEach(function(n) {
            var i = t.getCityID(n);
            i && e.push({
                name: n,
                code: i
            })
        }
        ),
        e.forEach(function(n) {
            var i = s[n.code];
            i && h.push({
                code: n.code,
                name: n.name,
                time: i
            })
        }
        );
        var c = h.slice(1);
        return c.sort(function(n, i) {
            var a = n.time
              , e = i.time;
            return a > e
        }
        ),
        c.unshift(h[0]),
        c
    }
    var t = n("./station")
      , s = {
        BXP: "8:00",
        NJH: "8:00",
        NKH: "8:00",
        TJB: "8:00",
        BCT: "8:30",
        ICW: "8:30",
        RTQ: "8:30",
        DMQ: "8:30",
        HCQ: "8:30",
        JIK: "8:30",
        NCW: "8:30",
        NGH: "8:30",
        RZK: "8:30",
        SHD: "8:30",
        OTQ: "8:30",
        VYT: "8:30",
        WWT: "8:30",
        WMR: "8:30",
        NCE: "8:30",
        WAR: "8:30",
        ASR: "9:00",
        AER: "9:00",
        AKR: "9:00",
        ATR: "9:00",
        BCR: "9:00",
        BXR: "9:00",
        BOR: "9:00",
        BLR: "9:00",
        CDG: "9:00",
        CNG: "9:00",
        CDW: "9:00",
        DZX: "9:00",
        RHX: "9:00",
        FHR: "9:00",
        HMR: "9:00",
        HJR: "9:00",
        VSR: "9:00",
        VTR: "9:00",
        HFR: "9:00",
        JYH: "9:00",
        JHR: "9:00",
        JIR: "9:00",
        KSR: "9:00",
        KHR: "9:00",
        KCR: "9:00",
        KLR: "9:00",
        KTR: "9:00",
        LZJ: "9:00",
        LAJ: "9:00",
        USH: "9:00",
        DHR: "9:00",
        LNR: "9:00",
        LAR: "9:00",
        MSR: "9:00",
        MNR: "9:00",
        MUR: "9:00",
        NIR: "9:00",
        PSR: "9:00",
        PXG: "9:00",
        PBG: "9:00",
        QHX: "9:00",
        QVH: "9:00",
        SXR: "9:00",
        SCR: "9:00",
        SSR: "9:00",
        SMR: "9:00",
        IOQ: "9:00",
        SBT: "9:00",
        SZR: "9:00",
        SUR: "9:00",
        THR: "9:00",
        TFR: "9:00",
        TAR: "9:00",
        RZH: "9:00",
        WXR: "9:00",
        WVR: "9:00",
        RYH: "9:00",
        XIR: "9:00",
        YSR: "9:00",
        YER: "9:00",
        YMR: "9:00",
        YNR: "9:00",
        YEG: "9:00",
        YIR: "9:00",
        RFH: "9:00",
        ZPR: "9:00",
        CNW: "9:00",
        VUR: "9:00",
        MLR: "9:00",
        LFX: "9:00",
        QNB: "9:00",
        FLJ: "9:00",
        XIJ: "9:00",
        LQJ: "9:00",
        ZJJ: "9:00",
        ARH: "9:30",
        CEH: "9:30",
        DRH: "9:30",
        MOH: "9:30",
        FHH: "9:30",
        HNH: "9:30",
        EUH: "9:30",
        VZH: "9:30",
        JGX: "9:30",
        EAH: "9:30",
        JXH: "9:30",
        EPH: "9:30",
        EGH: "9:30",
        UPH: "9:30",
        UFH: "9:30",
        MVX: "9:30",
        NCG: "9:30",
        NXG: "9:30",
        NHX: "9:30",
        NHH: "9:30",
        QDK: "9:30",
        QHK: "9:30",
        RAH: "9:30",
        OQH: "9:30",
        BDH: "9:30",
        SOH: "9:30",
        SLH: "9:30",
        OLH: "9:30",
        SZQ: "9:30",
        SYT: "9:30",
        IMH: "9:30",
        TZH: "9:30",
        TCH: "9:30",
        VHH: "9:30",
        VRH: "9:30",
        YGH: "9:30",
        URH: "9:30",
        EVH: "9:30",
        YYH: "9:30",
        CTH: "9:30",
        CBH: "9:30",
        CFH: "9:30",
        ZQH: "9:30",
        BJP: "10:00",
        GIW: "10:00",
        VAB: "10:00",
        BJQ: "10:00",
        KQW: "10:00",
        HTB: "10:00",
        GAE: "10:00",
        DHJ: "10:30",
        HBB: "10:30",
        HZH: "10:30",
        JGJ: "10:30",
        OSQ: "10:30",
        WKK: "10:30",
        EAY: "10:30",
        YAK: "10:30",
        YIJ: "10:30",
        JBJ: "10:30",
        RCK: "10:30",
        WGK: "10:30",
        WHK: "10:30",
        MBK: "10:30",
        YLK: "10:30",
        TOK: "10:30",
        HEK: "10:30",
        LYK: "10:30",
        LBK: "10:30",
        JVK: "10:30",
        BJB: "11:00",
        GZQ: "11:00",
        VBB: "11:00",
        JJG: "11:00",
        XFB: "11:00",
        CQW: "11:00",
        CUW: "11:00",
        BNJ: "11:30",
        BXJ: "11:30",
        DFJ: "11:30",
        DWJ: "11:30",
        DYJ: "11:30",
        DSJ: "11:30",
        GGJ: "11:30",
        GEJ: "11:30",
        GTJ: "11:30",
        GLJ: "11:30",
        GUJ: "11:30",
        GZJ: "11:30",
        GGQ: "11:30",
        HGH: "11:30",
        HKJ: "11:30",
        HSJ: "11:30",
        HMJ: "11:30",
        JCJ: "11:30",
        JTJ: "11:30",
        JYJ: "11:30",
        JVJ: "11:30",
        JQJ: "11:30",
        LEJ: "11:30",
        LNJ: "11:30",
        LXJ: "11:30",
        LWJ: "11:30",
        PIJ: "11:30",
        QTJ: "11:30",
        QUJ: "11:30",
        SDJ: "11:30",
        QQJ: "11:30",
        SHJ: "11:30",
        TYJ: "11:30",
        TNJ: "11:30",
        TSJ: "11:30",
        TZJ: "11:30",
        TXJ: "11:30",
        WNJ: "11:30",
        WSJ: "11:30",
        WUJ: "11:30",
        WWJ: "11:30",
        XAY: "11:30",
        XGJ: "11:30",
        XZJ: "11:30",
        YKJ: "11:30",
        YDJ: "11:30",
        YXJ: "11:30",
        ZYJ: "11:30",
        CZJ: "11:30",
        VNJ: "11:30",
        ZDJ: "11:30",
        ZWJ: "11:30",
        MBJ: "11:30",
        ZEJ: "11:30",
        LDJ: "11:30",
        GAJ: "11:30",
        QEJ: "11:30",
        JNJ: "11:30",
        CQJ: "11:30",
        JAJ: "11:30",
        NOJ: "11:30",
        NDJ: "11:30",
        AYF: "12:00",
        ADF: "12:00",
        BJY: "12:00",
        BBY: "12:00",
        VAP: "12:00",
        HKN: "12:00",
        JUH: "12:00",
        JBH: "12:00",
        LWH: "12:00",
        LFV: "12:00",
        LXV: "12:00",
        LMH: "12:00",
        QEH: "12:00",
        XXF: "12:00",
        EGF: "12:00",
        YWH: "12:00",
        YNV: "12:00",
        ABV: "12:00",
        CCT: "12:00",
        CRT: "12:00",
        ZDH: "12:00",
        WDH: "12:00",
        QUH: "12:00",
        PYH: "12:00",
        PYF: "12:00",
        AQH: "12:30",
        APH: "12:30",
        VNP: "12:30",
        CIH: "12:30",
        FIH: "12:30",
        GYW: "12:30",
        HOY: "12:30",
        HFH: "12:30",
        COH: "12:30",
        ENH: "12:30",
        VEH: "12:30",
        JZH: "12:30",
        UAH: "12:30",
        UJH: "12:30",
        MYW: "12:30",
        INH: "12:30",
        OCH: "12:30",
        TKH: "12:30",
        QWH: "12:30",
        TTH: "12:30",
        WCN: "12:30",
        OAH: "12:30",
        GAW: "12:30",
        ZHW: "12:30",
        HTH: "12:30",
        FVH: "12:30",
        GUH: "12:30",
        IIH: "12:30",
        BZH: "13:00",
        CFD: "13:00",
        RXW: "13:00",
        DLT: "13:00",
        DFT: "13:00",
        FNH: "13:00",
        FYH: "13:00",
        IZQ: "13:00",
        HAH: "13:00",
        HOH: "13:00",
        FBH: "13:00",
        NJW: "13:00",
        SDH: "13:00",
        SQH: "13:00",
        TIP: "13:00",
        TXP: "13:00",
        TLD: "13:00",
        ZDW: "13:00",
        ZAF: "13:00",
        JLF: "13:00",
        LCF: "13:00",
        YEF: "13:00",
        SFF: "13:00",
        NKW: "13:00",
        NEF: "13:00",
        MZF: "13:00",
        EZF: "13:00",
        KBF: "13:00",
        LUF: "13:00",
        MIF: "13:00",
        BWQ: "13:30",
        DTV: "13:30",
        UFQ: "13:30",
        VUQ: "13:30",
        HMQ: "13:30",
        JLL: "13:30",
        LIQ: "13:30",
        UMW: "13:30",
        MHQ: "13:30",
        QYQ: "13:30",
        SEQ: "13:30",
        AOH: "13:30",
        SRQ: "13:30",
        TJP: "13:30",
        WNQ: "13:30",
        WEQ: "13:30",
        WHN: "13:30",
        TWQ: "13:30",
        ZIW: "13:30",
        PYQ: "13:30",
        IBQ: "14:00",
        BLQ: "14:00",
        DAQ: "14:00",
        CBQ: "14:00",
        CNQ: "14:00",
        CKQ: "14:00",
        CQQ: "14:00",
        DPI: "14:00",
        IRQ: "14:00",
        DRQ: "14:00",
        FUQ: "14:00",
        FSQ: "14:00",
        GSQ: "14:00",
        GNQ: "14:00",
        IMQ: "14:00",
        GBQ: "14:00",
        VAQ: "14:00",
        VIQ: "14:00",
        KMQ: "14:00",
        HHC: "14:00",
        NDC: "14:00",
        IUQ: "14:00",
        VCQ: "14:00",
        KDQ: "14:00",
        KNQ: "14:00",
        VXQ: "14:00",
        JNK: "14:00",
        JAK: "14:00",
        JGK: "14:00",
        JWQ: "14:00",
        JRQ: "14:00",
        KTQ: "14:00",
        LCQ: "14:00",
        UAQ: "14:00",
        LUQ: "14:00",
        LLQ: "14:00",
        MOQ: "14:00",
        MFQ: "14:00",
        NNQ: "14:00",
        NOQ: "14:00",
        NCQ: "14:00",
        PHQ: "14:00",
        PSQ: "14:00",
        PEQ: "14:00",
        QXQ: "14:00",
        QBQ: "14:00",
        QSQ: "14:00",
        RVQ: "14:00",
        RUQ: "14:00",
        SJQ: "14:00",
        OGQ: "14:00",
        SNQ: "14:00",
        SGQ: "14:00",
        IFQ: "14:00",
        SJP: "14:00",
        VVP: "14:00",
        IPQ: "14:00",
        ORQ: "14:00",
        OJQ: "14:00",
        TNV: "14:00",
        PDQ: "14:00",
        EAQ: "14:00",
        EFQ: "14:00",
        XGQ: "14:00",
        EEQ: "14:00",
        ENQ: "14:00",
        XJQ: "14:00",
        YQQ: "14:00",
        YDQ: "14:00",
        IIQ: "14:00",
        YTQ: "14:00",
        ZJZ: "14:00",
        ZWQ: "14:00",
        ZOQ: "14:00",
        ZVQ: "14:00",
        ZZF: "14:00",
        XPF: "14:00",
        ZSQ: "14:00",
        ZGQ: "14:00",
        ZHQ: "14:00",
        ZIQ: "14:00",
        YKQ: "14:00",
        NDQ: "14:00",
        IXQ: "14:00",
        FAQ: "14:00",
        FBQ: "14:00",
        RNQ: "14:00",
        FCQ: "14:00",
        BTC: "14:30",
        BDC: "14:30",
        CWQ: "14:30",
        DZP: "14:30",
        DIP: "14:30",
        HDP: "14:30",
        HPP: "14:30",
        KMM: "14:30",
        PRW: "14:30",
        SHH: "14:30",
        TYV: "14:30",
        ECW: "14:30",
        YCN: "14:30",
        HAN: "14:30",
        ATV: "15:00",
        BAC: "15:00",
        BGV: "15:00",
        BYC: "15:00",
        BEC: "15:00",
        BGM: "15:00",
        BQC: "15:00",
        BVC: "15:00",
        CBC: "15:00",
        CSC: "15:00",
        CAM: "15:00",
        CGV: "15:00",
        COM: "15:00",
        DIC: "15:00",
        DNC: "15:00",
        DBC: "15:00",
        DKM: "15:00",
        DLC: "15:00",
        DYV: "15:00",
        DKV: "15:00",
        RYV: "15:00",
        DHO: "15:00",
        DXM: "15:00",
        DXV: "15:00",
        DOC: "15:00",
        DYC: "15:00",
        DBV: "15:00",
        DNV: "15:00",
        DZV: "15:00",
        DLV: "15:00",
        DWV: "15:00",
        EJC: "15:00",
        RLC: "15:00",
        FEM: "15:00",
        FSV: "15:00",
        FAV: "15:00",
        FZC: "15:00",
        FLV: "15:00",
        FYM: "15:00",
        GCV: "15:00",
        GRO: "15:00",
        GMC: "15:00",
        GDV: "15:00",
        GJV: "15:00",
        VJW: "15:00",
        GSN: "15:00",
        GPM: "15:00",
        HSO: "15:00",
        HBV: "15:00",
        HJV: "15:00",
        HQM: "15:00",
        HIM: "15:00",
        HEM: "15:00",
        HDV: "15:00",
        HTV: "15:00",
        HMV: "15:00",
        HPV: "15:00",
        HGC: "15:00",
        HRV: "15:00",
        HFV: "15:00",
        HNO: "15:00",
        HZV: "15:00",
        HWV: "15:00",
        JAC: "15:00",
        JVV: "15:00",
        JSM: "15:00",
        JOM: "15:00",
        JNV: "15:00",
        JXV: "15:00",
        JDV: "15:00",
        JZV: "15:00",
        JPC: "15:00",
        KLC: "15:00",
        KLV: "15:00",
        KAM: "15:00",
        LSO: "15:00",
        LDO: "15:00",
        LHM: "15:00",
        LRC: "15:00",
        LXC: "15:00",
        LHC: "15:00",
        LVV: "15:00",
        LSV: "15:00",
        UDV: "15:00",
        LKV: "15:00",
        LVM: "15:00",
        LRM: "15:00",
        LQM: "15:00",
        LPM: "15:00",
        LHV: "15:00",
        MCN: "15:00",
        MBN: "15:00",
        KPM: "15:00",
        MBM: "15:00",
        NQO: "15:00",
        NNZ: "15:00",
        NMO: "15:00",
        NWV: "15:00",
        PAM: "15:00",
        PNO: "15:00",
        PGM: "15:00",
        PSV: "15:00",
        PTM: "15:00",
        PWV: "15:00",
        PGV: "15:00",
        PYV: "15:00",
        PDV: "15:00",
        QXV: "15:00",
        QGV: "15:00",
        QXC: "15:00",
        QZV: "15:00",
        QVV: "15:00",
        QUV: "15:00",
        QJM: "15:00",
        QSO: "15:00",
        RUO: "15:00",
        RKO: "15:00",
        SLC: "15:00",
        SHC: "15:00",
        SMM: "15:00",
        OGC: "15:00",
        XMS: "15:00",
        XKS: "15:00",
        XBS: "15:00",
        SNV: "15:00",
        SXC: "15:00",
        SQF: "15:00",
        SPF: "15:00",
        SMV: "15:00",
        SEV: "15:00",
        SEM: "15:00",
        SNN: "15:00",
        SLM: "15:00",
        SYV: "15:00",
        SUV: "15:00",
        SBM: "15:00",
        NIW: "15:00",
        TGV: "15:00",
        TIV: "15:00",
        TBV: "15:00",
        TDV: "15:00",
        TZV: "15:00",
        TAM: "15:00",
        TGC: "15:00",
        TRC: "15:00",
        WYW: "15:00",
        WAM: "15:00",
        WSM: "15:00",
        WEV: "15:00",
        WXV: "15:00",
        WOV: "15:00",
        WVC: "15:00",
        WXC: "15:00",
        WSC: "15:00",
        WQC: "15:00",
        WLC: "15:00",
        WSV: "15:00",
        WYC: "15:00",
        WZV: "15:00",
        WVV: "15:00",
        XZC: "15:00",
        XTC: "15:00",
        XSV: "15:00",
        XFV: "15:00",
        XTV: "15:00",
        EXM: "15:00",
        XHM: "15:00",
        XNV: "15:00",
        XOV: "15:00",
        XXV: "15:00",
        XJV: "15:00",
        XUN: "15:00",
        OYN: "15:00",
        XEC: "15:00",
        XGV: "15:00",
        XWM: "15:00",
        YWY: "15:00",
        YOV: "15:00",
        YVV: "15:00",
        YQV: "15:00",
        YYV: "15:00",
        YSM: "15:00",
        YZV: "15:00",
        YIV: "15:00",
        AJV: "15:00",
        YCV: "15:00",
        YSV: "15:00",
        VTM: "15:00",
        AXM: "15:00",
        YMM: "15:00",
        YPV: "15:00",
        YUM: "15:00",
        ZIV: "15:00",
        ZLV: "15:00",
        CSQ: "15:00",
        ZCV: "15:00",
        ZLC: "15:00",
        ZDV: "15:00",
        ZXC: "15:00",
        ZRC: "15:00",
        ZDC: "15:00",
        ZZC: "15:00",
        MZM: "15:00",
        PBM: "15:00",
        HBM: "15:00",
        YLM: "15:00",
        XXM: "15:00",
        NFZ: "15:00",
        XNO: "15:00",
        MNO: "15:00",
        LVO: "15:00",
        HDO: "15:00",
        DTO: "15:00",
        MYO: "15:00",
        EEC: "15:00",
        HDC: "15:00",
        FVW: "15:00",
        FEV: "15:00",
        XWC: "15:00",
        FNC: "15:00",
        CVO: "15:00",
        ONC: "15:00",
        AQC: "15:00",
        KDC: "15:00",
        WZE: "15:00",
        VUW: "15:00",
        ARW: "15:30",
        ASW: "15:30",
        AST: "15:30",
        AXT: "15:30",
        IEW: "15:30",
        BSW: "15:30",
        HJL: "15:30",
        BPW: "15:30",
        WBW: "15:30",
        CDP: "15:30",
        RGW: "15:30",
        IAW: "15:30",
        DUT: "15:30",
        DVW: "15:30",
        DYW: "15:30",
        DDW: "15:30",
        RYW: "15:30",
        RWW: "15:30",
        EBW: "15:30",
        EMW: "15:30",
        FUW: "15:30",
        FLW: "15:30",
        FEW: "15:30",
        VMW: "15:30",
        FET: "15:30",
        VOW: "15:30",
        GSW: "15:30",
        GZG: "15:30",
        GHW: "15:30",
        GTW: "15:30",
        IDW: "15:30",
        WHW: "15:30",
        WKW: "15:30",
        IGW: "15:30",
        HUW: "15:30",
        KCN: "15:30",
        VAG: "15:30",
        JMB: "15:30",
        JYW: "15:30",
        JJW: "15:30",
        JFW: "15:30",
        JGG: "15:30",
        KAW: "15:30",
        KLW: "15:30",
        UTW: "15:30",
        INW: "15:30",
        UQW: "15:30",
        LIW: "15:30",
        LLW: "15:30",
        LCW: "15:30",
        LJW: "15:30",
        VAW: "15:30",
        MSW: "15:30",
        MMW: "15:30",
        UGW: "15:30",
        MDB: "15:30",
        PVD: "15:30",
        PBD: "15:30",
        PSW: "15:30",
        PHW: "15:30",
        PMW: "15:30",
        PAW: "15:30",
        PWW: "15:30",
        PCW: "15:30",
        PEN: "15:30",
        BFF: "15:30",
        POW: "15:30",
        QJW: "15:30",
        QNW: "15:30",
        QTP: "15:30",
        QSW: "15:30",
        QRW: "15:30",
        RCW: "15:30",
        OZW: "15:30",
        SNH: "15:30",
        AQW: "15:30",
        OSW: "15:30",
        OTW: "15:30",
        TSP: "15:30",
        THL: "15:30",
        TEW: "15:30",
        TZW: "15:30",
        TVW: "15:30",
        TML: "15:30",
        TSW: "15:30",
        WEW: "15:30",
        WLW: "15:30",
        ENW: "15:30",
        XFW: "15:30",
        XIW: "15:30",
        XAW: "15:30",
        EDW: "15:30",
        ETW: "15:30",
        YJL: "15:30",
        AEW: "15:30",
        YGW: "15:30",
        YBW: "15:30",
        ALW: "15:30",
        YFW: "15:30",
        NUW: "15:30",
        YCW: "15:30",
        YLW: "15:30",
        AFW: "15:30",
        YZW: "15:30",
        AWW: "15:30",
        YYQ: "15:30",
        YIQ: "15:30",
        YHW: "15:30",
        ZKP: "15:30",
        ZMP: "15:30",
        EFW: "15:30",
        COW: "15:30",
        ZUW: "15:30",
        IZW: "15:30",
        CRW: "15:30",
        ZKN: "15:30",
        ZXW: "15:30",
        ZZQ: "15:30",
        ZAQ: "15:30",
        ZAW: "15:30",
        ZDN: "15:30",
        ZLN: "15:30",
        ZYW: "15:30",
        ZZW: "15:30",
        ZGW: "15:30",
        QEW: "15:30",
        IKW: "15:30",
        GVW: "15:30",
        QFW: "15:30",
        EWW: "15:30",
        IPW: "15:30",
        IRW: "15:30",
        PPW: "15:30",
        IUW: "15:30",
        QVW: "15:30",
        IVW: "15:30",
        IXW: "15:30",
        KFW: "15:30",
        KIW: "15:30",
        KKW: "15:30",
        RVW: "15:30",
        KNW: "15:30",
        KJW: "15:30",
        TNW: "15:30",
        QHW: "15:30",
        QKW: "15:30",
        FMW: "15:30",
        PGW: "15:30",
        JOW: "15:30",
        FYW: "15:30",
        WZW: "15:30",
        NWW: "15:30",
        RQW: "15:30",
        WMW: "15:30",
        FQW: "15:30",
        CXE: "15:30",
        LZE: "15:30",
        NBE: "15:30",
        WSE: "15:30",
        BDE: "15:30",
        ZKE: "15:30",
        PCE: "15:30",
        SQE: "15:30",
        STE: "15:30",
        ZJE: "15:30",
        NYE: "15:30",
        CSE: "15:30",
        DJE: "15:30",
        LPE: "15:30",
        PBE: "15:30",
        ASE: "15:30",
        GLE: "15:30",
        PUE: "15:30",
        PAE: "15:30",
        DNE: "15:30",
        FQE: "15:30",
        BBE: "15:30",
        ITW: "15:30",
        IQW: "15:30",
        FZW: "15:30",
        AKY: "16:00",
        ASH: "16:00",
        ILP: "16:00",
        RMP: "16:00",
        BAP: "16:00",
        BPP: "16:00",
        BDP: "16:00",
        BMP: "16:00",
        BEP: "16:00",
        BOP: "16:00",
        BRP: "16:00",
        FHP: "16:00",
        FCP: "16:00",
        BZP: "16:00",
        COP: "16:00",
        CBP: "16:00",
        CLP: "16:00",
        CPP: "16:00",
        VBP: "16:00",
        CCP: "16:00",
        CSP: "16:00",
        CIP: "16:00",
        DJP: "16:00",
        DXP: "16:00",
        DOP: "16:00",
        DGP: "16:00",
        FZS: "16:00",
        FYS: "16:00",
        FNP: "16:00",
        GBP: "16:00",
        GMP: "16:00",
        GIP: "16:00",
        GNP: "16:00",
        GEP: "16:00",
        GFP: "16:00",
        GLF: "16:00",
        GTP: "16:00",
        KEP: "16:00",
        GLP: "16:00",
        HRX: "16:00",
        HGP: "16:00",
        HIK: "16:00",
        HSP: "16:00",
        HYQ: "16:00",
        HVQ: "16:00",
        HHP: "16:00",
        VQH: "16:00",
        HRP: "16:00",
        HBP: "16:00",
        HCP: "16:00",
        VCH: "16:00",
        JKP: "16:00",
        JXP: "16:00",
        JFP: "16:00",
        JJP: "16:00",
        JNP: "16:00",
        JHP: "16:00",
        JMP: "16:00",
        KCP: "16:00",
        KZP: "16:00",
        KSH: "16:00",
        KNH: "16:00",
        LYP: "16:00",
        LJP: "16:00",
        LFP: "16:00",
        UCP: "16:00",
        LVK: "16:00",
        UYK: "16:00",
        LZZ: "16:00",
        LHP: "16:00",
        UHP: "16:00",
        UAP: "16:00",
        LTP: "16:00",
        UTP: "16:00",
        UDP: "16:00",
        UPP: "16:00",
        UXP: "16:00",
        LYF: "16:00",
        LDF: "16:00",
        LLF: "16:00",
        MLX: "16:00",
        MUP: "16:00",
        NFP: "16:00",
        NKP: "16:00",
        NEH: "16:00",
        NUP: "16:00",
        NIP: "16:00",
        PDP: "16:00",
        PQP: "16:00",
        QQP: "16:00",
        QMP: "16:00",
        QXP: "16:00",
        QIP: "16:00",
        QYP: "16:00",
        QHP: "16:00",
        RVP: "16:00",
        RQP: "16:00",
        OXP: "16:00",
        ODP: "16:00",
        SCP: "16:00",
        SHP: "16:00",
        VOP: "16:00",
        SLP: "16:00",
        SBP: "16:00",
        OBP: "16:00",
        SXH: "16:00",
        OEP: "16:00",
        OZP: "16:00",
        SEP: "16:00",
        SRP: "16:00",
        SOP: "16:00",
        SZH: "16:00",
        OHH: "16:00",
        ITH: "16:00",
        KAH: "16:00",
        SYP: "16:00",
        SFB: "16:00",
        FUP: "16:00",
        TGP: "16:00",
        TBP: "16:00",
        TAP: "16:00",
        WTP: "16:00",
        WDP: "16:00",
        WBP: "16:00",
        WXH: "16:00",
        WGH: "16:00",
        IFH: "16:00",
        WUP: "16:00",
        WAP: "16:00",
        WWP: "16:00",
        EBP: "16:00",
        XYP: "16:00",
        EIP: "16:00",
        XFN: "16:00",
        XWN: "16:00",
        ESP: "16:00",
        ENP: "16:00",
        ELP: "16:00",
        ERP: "16:00",
        XTP: "16:00",
        EDP: "16:00",
        EXP: "16:00",
        XSP: "16:00",
        XHP: "16:00",
        YNP: "16:00",
        AEP: "16:00",
        AJP: "16:00",
        AOP: "16:00",
        AIH: "16:00",
        AQP: "16:00",
        YPP: "16:00",
        ARP: "16:00",
        YBP: "16:00",
        YQP: "16:00",
        AIP: "16:00",
        YIP: "16:00",
        ALY: "16:00",
        ATP: "16:00",
        YSP: "16:00",
        ZVP: "16:00",
        ZHP: "16:00",
        ZXP: "16:00",
        ZAP: "16:00",
        AAP: "16:00",
        ZDP: "16:00",
        YKP: "16:00",
        SUP: "16:00",
        FOP: "16:00",
        FEP: "16:00",
        FWP: "16:00",
        COK: "16:00",
        YMX: "16:00",
        ARX: "16:00",
        UUP: "16:00",
        ACB: "16:30",
        ART: "16:30",
        AJD: "16:30",
        AHX: "16:30",
        ASX: "16:30",
        JTX: "16:30",
        ADX: "16:30",
        AGT: "16:30",
        AJB: "16:30",
        APT: "16:30",
        ATL: "16:30",
        AAX: "16:30",
        ALD: "16:30",
        BTD: "16:30",
        BMD: "16:30",
        BMB: "16:30",
        VXD: "16:30",
        BLX: "16:30",
        BYT: "16:30",
        BEL: "16:30",
        BKB: "16:30",
        BAT: "16:30",
        BQL: "16:30",
        BAL: "16:30",
        BCD: "16:30",
        BID: "16:30",
        BNB: "16:30",
        BND: "16:30",
        BUB: "16:30",
        BQB: "16:30",
        BKD: "16:30",
        BAB: "16:30",
        RPD: "16:30",
        BTT: "16:30",
        BYB: "16:30",
        BXT: "16:30",
        BHT: "16:30",
        BSB: "16:30",
        BLB: "16:30",
        BKX: "16:30",
        BUT: "16:30",
        CJT: "16:30",
        CST: "16:30",
        CKT: "16:30",
        CSL: "16:30",
        CGT: "16:30",
        CHB: "16:30",
        CTT: "16:30",
        CPT: "16:30",
        VGQ: "16:30",
        CYD: "16:30",
        CYL: "16:30",
        CDD: "16:30",
        CZL: "16:30",
        CQB: "16:30",
        CXT: "16:30",
        CMB: "16:30",
        CZB: "16:30",
        CJX: "16:30",
        CID: "16:30",
        CSB: "16:30",
        CAL: "16:30",
        CAX: "16:30",
        DJT: "16:30",
        RAT: "16:30",
        RNT: "16:30",
        DBD: "16:30",
        DVT: "16:30",
        DCT: "16:30",
        DTT: "16:30",
        DQD: "16:30",
        DHD: "16:30",
        DLD: "16:30",
        DPD: "16:30",
        DSD: "16:30",
        DQT: "16:30",
        DSL: "16:30",
        RZT: "16:30",
        DNT: "16:30",
        DXX: "16:30",
        DXL: "16:30",
        DYX: "16:30",
        DUX: "16:30",
        DZD: "16:30",
        DLB: "16:30",
        DRD: "16:30",
        RBT: "16:30",
        DML: "16:30",
        DRX: "16:30",
        RDT: "16:30",
        DHT: "16:30",
        DXT: "16:30",
        DGT: "16:30",
        DWT: "16:30",
        DDB: "16:30",
        DBB: "16:30",
        RDD: "16:30",
        DRB: "16:30",
        DFB: "16:30",
        DIL: "16:30",
        DHB: "16:30",
        DKB: "16:30",
        DJB: "16:30",
        RVD: "16:30",
        DMD: "16:30",
        DTL: "16:30",
        DXD: "16:30",
        DJL: "16:30",
        DQB: "16:30",
        DHL: "16:30",
        ESN: "16:30",
        RDX: "16:30",
        RLD: "16:30",
        ELA: "16:30",
        RML: "16:30",
        FTT: "16:30",
        FZB: "16:30",
        FTX: "16:30",
        FHT: "16:30",
        FYT: "16:30",
        FBT: "16:30",
        FTB: "16:30",
        FST: "16:30",
        FYB: "16:30",
        FHX: "16:30",
        FIB: "16:30",
        FRX: "16:30",
        FYX: "16:30",
        GXD: "16:30",
        GXT: "16:30",
        GAT: "16:30",
        GAX: "16:30",
        GQD: "16:30",
        GGL: "16:30",
        GZD: "16:30",
        GSD: "16:30",
        GZT: "16:30",
        GGT: "16:30",
        GEX: "16:30",
        GRT: "16:30",
        GYD: "16:30",
        GLT: "16:30",
        GBT: "16:30",
        GBD: "16:30",
        GKT: "16:30",
        GYL: "16:30",
        GZB: "16:30",
        GRX: "16:30",
        GOT: "16:30",
        GST: "16:30",
        GQT: "16:30",
        GHT: "16:30",
        GDT: "16:30",
        GSL: "16:30",
        HIT: "16:30",
        HAX: "16:30",
        HEB: "16:30",
        HCT: "16:30",
        HXT: "16:30",
        HRB: "16:30",
        HIL: "16:30",
        HLB: "16:30",
        HZT: "16:30",
        HKB: "16:30",
        HAT: "16:30",
        HHB: "16:30",
        HLL: "16:30",
        HMB: "16:30",
        HGB: "16:30",
        HOB: "16:30",
        HJB: "16:30",
        HOT: "16:30",
        HQB: "16:30",
        HDB: "16:30",
        VHD: "16:30",
        VSB: "16:30",
        VXB: "16:30",
        VHB: "16:30",
        VIX: "16:30",
        HPB: "16:30",
        HUB: "16:30",
        HLD: "16:30",
        HPD: "16:30",
        VLB: "16:30",
        HUT: "16:30",
        HJT: "16:30",
        HIB: "16:30",
        HNB: "16:30",
        VTB: "16:30",
        HTT: "16:30",
        HBL: "16:30",
        HUD: "16:30",
        HHL: "16:30",
        HDL: "16:30",
        HHT: "16:30",
        HLT: "16:30",
        HWD: "16:30",
        JOB: "16:30",
        JST: "16:30",
        JXB: "16:30",
        JSL: "16:30",
        JWX: "16:30",
        JAL: "16:30",
        VJD: "16:30",
        JXT: "16:30",
        JFD: "16:30",
        JIB: "16:30",
        JET: "16:30",
        JQX: "16:30",
        SZL: "16:30",
        JJB: "16:30",
        JHL: "16:30",
        JBD: "16:30",
        JHX: "16:30",
        JKT: "16:30",
        JTB: "16:30",
        JYD: "16:30",
        JZT: "16:30",
        JHB: "16:30",
        JZD: "16:30",
        JOD: "16:30",
        SSX: "16:30",
        JTL: "16:30",
        JNL: "16:30",
        JRT: "16:30",
        JDB: "16:30",
        KAT: "16:30",
        KTT: "16:30",
        KYT: "16:30",
        KXT: "16:30",
        KJB: "16:30",
        KOB: "16:30",
        KSB: "16:30",
        KHX: "16:30",
        KQL: "16:30",
        KDX: "16:30",
        KLD: "16:30",
        KDT: "16:30",
        KAB: "16:30",
        LGB: "16:30",
        LHX: "16:30",
        LAB: "16:30",
        LNB: "16:30",
        LLB: "16:30",
        LXB: "16:30",
        LLT: "16:30",
        UFD: "16:30",
        LAX: "16:30",
        LXL: "16:30",
        LSB: "16:30",
        LJB: "16:30",
        LET: "16:30",
        LMB: "16:30",
        LCN: "16:30",
        LGT: "16:30",
        LHB: "16:30",
        UJT: "16:30",
        LRT: "16:30",
        LYT: "16:30",
        LYL: "16:30",
        LZD: "16:30",
        LXX: "16:30",
        LKB: "16:30",
        LYX: "16:30",
        LQL: "16:30",
        JID: "16:30",
        LYD: "16:30",
        LDD: "16:30",
        UDT: "16:30",
        LVT: "16:30",
        LNL: "16:30",
        LSD: "16:30",
        LEX: "16:30",
        UJL: "16:30",
        LJX: "16:30",
        LJL: "16:30",
        LZT: "16:30",
        LZA: "16:30",
        LDL: "16:30",
        LUL: "16:30",
        LON: "16:30",
        LBN: "16:30",
        LST: "16:30",
        MAB: "16:30",
        MHB: "16:30",
        MID: "16:30",
        MQB: "16:30",
        MJT: "16:30",
        MHX: "16:30",
        MLD: "16:30",
        MRB: "16:30",
        MHL: "16:30",
        MEB: "16:30",
        MGB: "16:30",
        MST: "16:30",
        MSB: "16:30",
        MDX: "16:30",
        MLL: "16:30",
        MCL: "16:30",
        MUT: "16:30",
        MOB: "16:30",
        MRX: "16:30",
        MUD: "16:30",
        MLB: "16:30",
        NLD: "16:30",
        NMD: "16:30",
        NCB: "16:30",
        NFT: "16:30",
        NLT: "16:30",
        NKT: "16:30",
        NMX: "16:30",
        NQD: "16:30",
        NTT: "16:30",
        NZT: "16:30",
        NGX: "16:30",
        NJD: "16:30",
        NHD: "16:30",
        NZX: "16:30",
        NAB: "16:30",
        NVT: "16:30",
        NJB: "16:30",
        NXT: "16:30",
        NAT: "16:30",
        PSL: "16:30",
        POD: "16:30",
        PDB: "16:30",
        PUT: "16:30",
        PNT: "16:30",
        PRT: "16:30",
        PAL: "16:30",
        PZT: "16:30",
        PFB: "16:30",
        PGL: "16:30",
        PSB: "16:30",
        PVT: "16:30",
        PYX: "16:30",
        PZD: "16:30",
        PND: "16:30",
        PLT: "16:30",
        PWT: "16:30",
        QLD: "16:30",
        QTB: "16:30",
        QBT: "16:30",
        QRN: "16:30",
        QFB: "16:30",
        QEB: "16:30",
        QWD: "16:30",
        QOT: "16:30",
        QAT: "16:30",
        QJB: "16:30",
        QSB: "16:30",
        QHD: "16:30",
        QYT: "16:30",
        QAB: "16:30",
        QFT: "16:30",
        QFK: "16:30",
        QAK: "16:30",
        QYL: "16:30",
        RHD: "16:30",
        RSD: "16:30",
        SFX: "16:30",
        SKD: "16:30",
        SRD: "16:30",
        SST: "16:30",
        OYD: "16:30",
        SYL: "16:30",
        SED: "16:30",
        SKT: "16:30",
        SSD: "16:30",
        SCL: "16:30",
        SHL: "16:30",
        SQB: "16:30",
        SUD: "16:30",
        SJB: "16:30",
        SZB: "16:30",
        VLD: "16:30",
        SWT: "16:30",
        SWB: "16:30",
        OJB: "16:30",
        SDT: "16:30",
        SCT: "16:30",
        SPB: "16:30",
        SOL: "16:30",
        SQT: "16:30",
        SRL: "16:30",
        SRB: "16:30",
        SAD: "16:30",
        OTB: "16:30",
        SXL: "16:30",
        ZWT: "16:30",
        SAT: "16:30",
        SLL: "16:30",
        SCB: "16:30",
        SBB: "16:30",
        OFB: "16:30",
        SEL: "16:30",
        ZJD: "16:30",
        SSB: "16:30",
        SIL: "16:30",
        SID: "16:30",
        OUD: "16:30",
        STB: "16:30",
        OHD: "16:30",
        SPT: "16:30",
        PPT: "16:30",
        SJL: "16:30",
        OZL: "16:30",
        SFT: "16:30",
        SSL: "16:30",
        SOB: "16:30",
        SXT: "16:30",
        SHB: "16:30",
        SIB: "16:30",
        SYB: "16:30",
        SZD: "16:30",
        SND: "16:30",
        SUB: "16:30",
        SKB: "16:30",
        SNT: "16:30",
        TVX: "16:30",
        THX: "16:30",
        TXX: "16:30",
        TID: "16:30",
        TIT: "16:30",
        TEB: "16:30",
        TQT: "16:30",
        TMK: "16:30",
        TKX: "16:30",
        TLX: "16:30",
        TAK: "16:30",
        TCX: "16:30",
        TCT: "16:30",
        THB: "16:30",
        TYB: "16:30",
        TVT: "16:30",
        TAB: "16:30",
        TOT: "16:30",
        TPT: "16:30",
        TGL: "16:30",
        TQL: "16:30",
        TND: "16:30",
        TFT: "16:30",
        TCL: "16:30",
        TLB: "16:30",
        TLT: "16:30",
        PXT: "16:30",
        TBB: "16:30",
        TOL: "16:30",
        TXL: "16:30",
        TUT: "16:30",
        TYT: "16:30",
        TEX: "16:30",
        TQX: "16:30",
        TMD: "16:30",
        TIX: "16:30",
        TIL: "16:30",
        WDT: "16:30",
        WXT: "16:30",
        WIT: "16:30",
        WGL: "16:30",
        WFB: "16:30",
        WEB: "16:30",
        WQL: "16:30",
        WUT: "16:30",
        WGB: "16:30",
        WZB: "16:30",
        WFK: "16:30",
        WHB: "16:30",
        WZL: "16:30",
        WVT: "16:30",
        WVB: "16:30",
        WJL: "16:30",
        WKD: "16:30",
        WDB: "16:30",
        WQB: "16:30",
        WPT: "16:30",
        WLX: "16:30",
        WHX: "16:30",
        WRX: "16:30",
        WPB: "16:30",
        WJT: "16:30",
        WCT: "16:30",
        WCB: "16:30",
        WRB: "16:30",
        WDL: "16:30",
        WUB: "16:30",
        WKT: "16:30",
        WBT: "16:30",
        WET: "16:30",
        WWB: "16:30",
        XFT: "16:30",
        NBB: "16:30",
        XYB: "16:30",
        GCT: "16:30",
        XMB: "16:30",
        XRD: "16:30",
        XZD: "16:30",
        XCB: "16:30",
        XAT: "16:30",
        XRL: "16:30",
        XNB: "16:30",
        XXB: "16:30",
        XDB: "16:30",
        XYD: "16:30",
        XLB: "16:30",
        XST: "16:30",
        XYX: "16:30",
        XMT: "16:30",
        XRX: "16:30",
        XCT: "16:30",
        XHB: "16:30",
        XAX: "16:30",
        XLD: "16:30",
        XGT: "16:30",
        XPX: "16:30",
        XMD: "16:30",
        XQB: "16:30",
        XQD: "16:30",
        XOB: "16:30",
        EPD: "16:30",
        EYB: "16:30",
        XZT: "16:30",
        XCD: "16:30",
        EKB: "16:30",
        XDD: "16:30",
        XZB: "16:30",
        XSB: "16:30",
        XDT: "16:30",
        XYT: "16:30",
        XJB: "16:30",
        XJT: "16:30",
        YYL: "16:30",
        YKX: "16:30",
        YBB: "16:30",
        YWB: "16:30",
        YSL: "16:30",
        YUX: "16:30",
        YAB: "16:30",
        YED: "16:30",
        YAL: "16:30",
        YRB: "16:30",
        YAD: "16:30",
        YZD: "16:30",
        YAT: "16:30",
        YQT: "16:30",
        YBD: "16:30",
        YJT: "16:30",
        YPB: "16:30",
        YST: "16:30",
        YCB: "16:30",
        YET: "16:30",
        YLX: "16:30",
        YLB: "16:30",
        YEX: "16:30",
        YAX: "16:30",
        YXD: "16:30",
        AEQ: "16:30",
        YJX: "16:30",
        YYB: "16:30",
        YCT: "16:30",
        YKT: "16:30",
        YGT: "16:30",
        YNB: "16:30",
        YOB: "16:30",
        YLD: "16:30",
        YRT: "16:30",
        YUT: "16:30",
        YSX: "16:30",
        YQB: "16:30",
        YUD: "16:30",
        ZAL: "16:30",
        ZXX: "16:30",
        ZTX: "16:30",
        ZLD: "16:30",
        DIQ: "16:30",
        ZWB: "16:30",
        ZHT: "16:30",
        ZGD: "16:30",
        ZWD: "16:30",
        CET: "16:30",
        CDT: "16:30",
        CLT: "16:30",
        CVT: "16:30",
        CDB: "16:30",
        ZGB: "16:30",
        ZDB: "16:30",
        ZLT: "16:30",
        ZVT: "16:30",
        ZAD: "16:30",
        ZOB: "16:30",
        ZOD: "16:30",
        ZIT: "16:30",
        ZUB: "16:30",
        ZBK: "16:30",
        OCT: "16:30",
        GPT: "16:30",
        OJT: "16:30",
        SOT: "16:30",
        BVT: "16:30",
        NUT: "16:30",
        TST: "16:30",
        FDT: "16:30",
        WMT: "16:30",
        JOL: "16:30",
        WBL: "16:30",
        DAL: "16:30",
        AXL: "16:30",
        YXL: "16:30",
        QSL: "16:30",
        HUL: "16:30",
        QIB: "16:30",
        JYL: "16:30",
        SDL: "16:30",
        FSL: "16:30",
        RWT: "16:30",
        RGT: "16:30",
        BRT: "16:30",
        RMT: "16:30",
        QET: "16:30",
        ZUT: "16:30",
        HYT: "16:30",
        CWT: "16:30",
        SML: "16:30",
        BWH: "17:00",
        FWH: "17:00",
        CZH: "17:00",
        ESH: "17:00",
        RUH: "17:00",
        DYH: "17:00",
        EXH: "17:00",
        DBH: "17:00",
        AKH: "17:00",
        GLZ: "17:00",
        GBZ: "17:00",
        HIH: "17:00",
        HHQ: "17:00",
        AUH: "17:00",
        AJH: "17:00",
        UDH: "17:00",
        JJH: "17:00",
        UEH: "17:00",
        JCF: "17:00",
        JEF: "17:00",
        JMN: "17:00",
        JBN: "17:00",
        JCG: "17:00",
        JWH: "17:00",
        LDH: "17:00",
        LEH: "17:00",
        LYS: "17:00",
        LDQ: "17:00",
        NUH: "17:00",
        NFF: "17:00",
        QYH: "17:00",
        QJN: "17:00",
        RIH: "17:00",
        RBH: "17:00",
        SRG: "17:00",
        SYQ: "17:00",
        FMH: "17:00",
        GQH: "17:00",
        MPH: "17:00",
        SZN: "17:00",
        UTH: "17:00",
        TNN: "17:00",
        WAH: "17:00",
        XPH: "17:00",
        AFH: "17:00",
        YLH: "17:00",
        GTH: "17:00",
        YUH: "17:00",
        YTG: "17:00",
        AOQ: "17:00",
        ZYN: "17:00",
        CZF: "17:00",
        CBF: "17:00",
        ZJH: "17:00",
        ZEH: "17:00",
        OKH: "17:00",
        GEZ: "17:00",
        PKQ: "17:30",
        AUZ: "17:30",
        ARG: "17:30",
        BIZ: "17:30",
        BHZ: "17:30",
        BOZ: "17:30",
        CHZ: "17:30",
        CNZ: "17:30",
        CZQ: "17:30",
        ICQ: "17:30",
        CXQ: "17:30",
        CZZ: "17:30",
        CUQ: "17:30",
        DKH: "17:30",
        DFZ: "17:30",
        DAG: "17:30",
        DOF: "17:30",
        DVQ: "17:30",
        DNG: "17:30",
        DCZ: "17:30",
        DQH: "17:30",
        DNF: "17:30",
        DXG: "17:30",
        FBZ: "17:30",
        FYG: "17:30",
        FCG: "17:30",
        FNG: "17:30",
        FSZ: "17:30",
        FZG: "17:30",
        FDZ: "17:30",
        GCG: "17:30",
        GPF: "17:30",
        GXF: "17:30",
        GYF: "17:30",
        GAG: "17:30",
        GGZ: "17:30",
        GXG: "17:30",
        GAZ: "17:30",
        HCY: "17:30",
        VSQ: "17:30",
        HVZ: "17:30",
        HCZ: "17:30",
        HXZ: "17:30",
        HAF: "17:30",
        HFF: "17:30",
        HFG: "17:30",
        HNG: "17:30",
        HSQ: "17:30",
        HEQ: "17:30",
        HKG: "17:30",
        HZZ: "17:30",
        KOH: "17:30",
        VTQ: "17:30",
        HJF: "17:30",
        JIQ: "17:30",
        JYF: "17:30",
        JFF: "17:30",
        JHZ: "17:30",
        JYZ: "17:30",
        JOF: "17:30",
        WEF: "17:30",
        JJZ: "17:30",
        JUG: "17:30",
        JEQ: "17:30",
        KFF: "17:30",
        UBZ: "17:30",
        UCZ: "17:30",
        LVZ: "17:30",
        LKF: "17:30",
        LPG: "17:30",
        LYQ: "17:30",
        LPQ: "17:30",
        UDQ: "17:30",
        LTZ: "17:30",
        LEQ: "17:30",
        LLG: "17:30",
        UKQ: "17:30",
        UIH: "17:30",
        UKH: "17:30",
        LAQ: "17:30",
        LJZ: "17:30",
        LWQ: "17:30",
        LXQ: "17:30",
        LNF: "17:30",
        LBF: "17:30",
        LPF: "17:30",
        UWZ: "17:30",
        UNG: "17:30",
        LAG: "17:30",
        LUG: "17:30",
        LSG: "17:30",
        LAF: "17:30",
        LKZ: "17:30",
        LIZ: "17:30",
        LKQ: "17:30",
        VCZ: "17:30",
        MVQ: "17:30",
        MDQ: "17:30",
        MUQ: "17:30",
        MLQ: "17:30",
        MQQ: "17:30",
        MCF: "17:30",
        MNF: "17:30",
        MQF: "17:30",
        NDG: "17:30",
        NDZ: "17:30",
        NFG: "17:30",
        NAF: "17:30",
        NXF: "17:30",
        NLF: "17:30",
        NMZ: "17:30",
        NXQ: "17:30",
        PZG: "17:30",
        PJH: "17:30",
        PGZ: "17:30",
        PAZ: "17:30",
        PXZ: "17:30",
        QMQ: "17:30",
        QWQ: "17:30",
        QRZ: "17:30",
        QDZ: "17:30",
        QYF: "17:30",
        QJZ: "17:30",
        QLZ: "17:30",
        QNZ: "17:30",
        RXZ: "17:30",
        RAZ: "17:30",
        RSZ: "17:30",
        RYF: "17:30",
        ROF: "17:30",
        RCG: "17:30",
        RJG: "17:30",
        SOZ: "17:30",
        SMF: "17:30",
        SCF: "17:30",
        SXF: "17:30",
        SSQ: "17:30",
        OMY: "17:30",
        VFQ: "17:30",
        SBZ: "17:30",
        MZQ: "17:30",
        SXZ: "17:30",
        THG: "17:30",
        TYF: "17:30",
        THF: "17:30",
        TAZ: "17:30",
        TDZ: "17:30",
        TFZ: "17:30",
        TRZ: "17:30",
        TIZ: "17:30",
        TRQ: "17:30",
        TBF: "17:30",
        RDQ: "17:30",
        WWG: "17:30",
        WHF: "17:30",
        WNZ: "17:30",
        WZZ: "17:30",
        WBZ: "17:30",
        XIF: "17:30",
        EJG: "17:30",
        XIZ: "17:30",
        EJH: "17:30",
        XTQ: "17:30",
        XXQ: "17:30",
        EIF: "17:30",
        XTG: "17:30",
        XAF: "17:30",
        EGG: "17:30",
        EHQ: "17:30",
        XLQ: "17:30",
        VIH: "17:30",
        XUG: "17:30",
        XBG: "17:30",
        EFG: "17:30",
        XDZ: "17:30",
        EUG: "17:30",
        SNZ: "17:30",
        XRZ: "17:30",
        XWF: "17:30",
        XCH: "17:30",
        UUH: "17:30",
        XCF: "17:30",
        XVF: "17:30",
        EPQ: "17:30",
        YTZ: "17:30",
        YAG: "17:30",
        YSF: "17:30",
        YNF: "17:30",
        YCG: "17:30",
        YSZ: "17:30",
        YIG: "17:30",
        YMF: "17:30",
        YBZ: "17:30",
        ACG: "17:30",
        YOG: "17:30",
        YXG: "17:30",
        YDG: "17:30",
        YHG: "17:30",
        IXH: "17:30",
        YLZ: "17:30",
        YNG: "17:30",
        YBF: "17:30",
        ZSG: "17:30",
        ZOG: "17:30",
        CEF: "17:30",
        CYF: "17:30",
        ZPF: "17:30",
        ZXS: "17:30",
        YKG: "17:30",
        FDG: "17:30",
        JXG: "17:30",
        YGG: "17:30",
        EDQ: "17:30",
        INQ: "17:30",
        UOQ: "17:30",
        OVQ: "17:30",
        EJQ: "17:30",
        EMQ: "17:30",
        KAQ: "17:30",
        EWQ: "17:30",
        ZPQ: "17:30",
        DYG: "17:30",
        SWZ: "17:30",
        GCZ: "17:30",
        LSZ: "17:30",
        NYF: "17:30",
        HCF: "17:30",
        WIF: "17:30",
        EXF: "17:30",
        NXZ: "17:30",
        IDZ: "17:30",
        TBZ: "17:30",
        XEG: "17:30",
        RBZ: "17:30",
        JMZ: "17:30",
        YCZ: "17:30",
        FIQ: "17:30",
        NFQ: "17:30",
        BBZ: "17:30",
        PRH: "17:30",
        RGH: "17:30",
        QSH: "17:30",
        UKZ: "17:30",
        AYY: "18:00",
        ALN: "18:00",
        AXS: "18:00",
        BNN: "18:00",
        BAY: "18:00",
        BIY: "18:00",
        BEY: "18:00",
        BSY: "18:00",
        BBH: "18:00",
        BMH: "18:00",
        BXK: "18:00",
        CJY: "18:00",
        CXK: "18:00",
        CLK: "18:00",
        CGY: "18:00",
        CEK: "18:00",
        IYH: "18:00",
        CBN: "18:00",
        CIN: "18:00",
        CXH: "18:00",
        CUH: "18:00",
        CYK: "18:00",
        DNY: "18:00",
        DBN: "18:00",
        DZY: "18:00",
        DGY: "18:00",
        DYN: "18:00",
        DQK: "18:00",
        EWH: "18:00",
        DPK: "18:00",
        DCH: "18:00",
        ECN: "18:00",
        EFN: "18:00",
        FXK: "18:00",
        FXY: "18:00",
        FUH: "18:00",
        FZY: "18:00",
        FAS: "18:00",
        FES: "18:00",
        FQS: "18:00",
        FEY: "18:00",
        FDY: "18:00",
        GQY: "18:00",
        GEY: "18:00",
        GMK: "18:00",
        GAY: "18:00",
        GNN: "18:00",
        GTS: "18:00",
        GCN: "18:00",
        GXN: "18:00",
        GEH: "18:00",
        GSS: "18:00",
        GZS: "18:00",
        GRH: "18:00",
        RWH: "18:00",
        HYK: "18:00",
        HJS: "18:00",
        HCN: "18:00",
        HQY: "18:00",
        HAY: "18:00",
        HLN: "18:00",
        HNN: "18:00",
        HWN: "18:00",
        VXN: "18:00",
        HEY: "18:00",
        KHN: "18:00",
        KNN: "18:00",
        HUN: "18:00",
        HRN: "18:00",
        HPN: "18:00",
        KRN: "18:00",
        HSY: "18:00",
        HDY: "18:00",
        HRH: "18:00",
        HVN: "18:00",
        KGN: "18:00",
        KAN: "18:00",
        KXN: "18:00",
        ULY: "18:00",
        HKH: "18:00",
        HSN: "18:00",
        KSN: "18:00",
        OSN: "18:00",
        VON: "18:00",
        HYY: "18:00",
        JRH: "18:00",
        JSH: "18:00",
        JUK: "18:00",
        JCS: "18:00",
        JVS: "18:00",
        JRN: "18:00",
        JYS: "18:00",
        JLS: "18:00",
        JXK: "18:00",
        JZK: "18:00",
        JES: "18:00",
        JUN: "18:00",
        JJS: "18:00",
        JCN: "18:00",
        JIY: "18:00",
        JOK: "18:00",
        JKK: "18:00",
        JYK: "18:00",
        JCK: "18:00",
        LZS: "18:00",
        LWK: "18:00",
        LXK: "18:00",
        LCK: "18:00",
        LKS: "18:00",
        LMK: "18:00",
        UCK: "18:00",
        UQK: "18:00",
        GMH: "18:00",
        LAS: "18:00",
        LXY: "18:00",
        UCH: "18:00",
        LRN: "18:00",
        LVS: "18:00",
        LYY: "18:00",
        MAH: "18:00",
        MBY: "18:00",
        MGY: "18:00",
        MEY: "18:00",
        MVY: "18:00",
        MSN: "18:00",
        MQS: "18:00",
        MGN: "18:00",
        MDN: "18:00",
        MGH: "18:00",
        NCK: "18:00",
        NDN: "18:00",
        NJS: "18:00",
        NPS: "18:00",
        NNS: "18:00",
        NES: "18:00",
        NNH: "18:00",
        PIK: "18:00",
        PYK: "18:00",
        PTS: "18:00",
        PCY: "18:00",
        PEY: "18:00",
        PAN: "18:00",
        QIH: "18:00",
        QAY: "18:00",
        QUY: "18:00",
        QOY: "18:00",
        QLY: "18:00",
        QGH: "18:00",
        QZK: "18:00",
        QNY: "18:00",
        QYS: "18:00",
        QRS: "18:00",
        QSN: "18:00",
        ROK: "18:00",
        SMS: "18:00",
        SHS: "18:00",
        SAY: "18:00",
        SBN: "18:00",
        SWN: "18:00",
        OLY: "18:00",
        ONY: "18:00",
        JBS: "18:00",
        SWS: "18:00",
        SQN: "18:00",
        SXY: "18:00",
        SCS: "18:00",
        OSK: "18:00",
        GPH: "18:00",
        SAH: "18:00",
        SIN: "18:00",
        ODY: "18:00",
        SON: "18:00",
        OZY: "18:00",
        TTK: "18:00",
        TLS: "18:00",
        TNS: "18:00",
        TZK: "18:00",
        THN: "18:00",
        TCK: "18:00",
        TXK: "18:00",
        TEK: "18:00",
        TMN: "18:00",
        TJH: "18:00",
        TGY: "18:00",
        TTN: "18:00",
        WYY: "18:00",
        WZY: "18:00",
        WNY: "18:00",
        WBY: "18:00",
        WVY: "18:00",
        WBK: "18:00",
        GYH: "18:00",
        WFN: "18:00",
        WHH: "18:00",
        WUY: "18:00",
        WLK: "18:00",
        WRN: "18:00",
        WGY: "18:00",
        WXN: "18:00",
        WAS: "18:00",
        CAY: "18:00",
        XPN: "18:00",
        XQY: "18:00",
        XZN: "18:00",
        OVH: "18:00",
        XOS: "18:00",
        XAN: "18:00",
        XNN: "18:00",
        XRN: "18:00",
        XKN: "18:00",
        UNN: "18:00",
        XYY: "18:00",
        XOY: "18:00",
        ERN: "18:00",
        EKY: "18:00",
        XGN: "18:00",
        XJN: "18:00",
        XSN: "18:00",
        XPY: "18:00",
        OXH: "18:00",
        SRH: "18:00",
        ECH: "18:00",
        XHY: "18:00",
        XUY: "18:00",
        XBY: "18:00",
        YNY: "18:00",
        YZK: "18:00",
        YYY: "18:00",
        YZY: "18:00",
        YIK: "18:00",
        YAY: "18:00",
        YON: "18:00",
        YSY: "18:00",
        YEY: "18:00",
        YNK: "18:00",
        YUK: "18:00",
        YIN: "18:00",
        YHN: "18:00",
        YAS: "18:00",
        YGS: "18:00",
        YDY: "18:00",
        YTS: "18:00",
        YXS: "18:00",
        YCK: "18:00",
        YMN: "18:00",
        YBS: "18:00",
        YPK: "18:00",
        ZEK: "18:00",
        ZFK: "18:00",
        ZSY: "18:00",
        ZQY: "18:00",
        ZTK: "18:00",
        ZPS: "18:00",
        ZCS: "18:00",
        ZUS: "18:00",
        GOS: "18:00",
        CES: "18:00",
        CYN: "18:00",
        ZDS: "18:00",
        ZEY: "18:00",
        ZCN: "18:00",
        ZIN: "18:00",
        ZMN: "18:00",
        ZJY: "18:00",
        ZTN: "18:00",
        ZQK: "18:00",
        ZHY: "18:00",
        ZZY: "18:00",
        ZVY: "18:00",
        ZOY: "18:00",
        ZIK: "18:00",
        ZSN: "18:00",
        YEK: "18:00",
        XWS: "18:00",
        HNS: "18:00",
        LGY: "18:00",
        QBY: "18:00",
        ASY: "18:00",
        CWY: "18:00",
        BXY: "18:00",
        ENN: "18:00",
        LDY: "18:00",
        KVW: "18:00",
        FIW: "18:00",
        KXH: "18:00",
        LLH: "18:00",
        LOH: "18:00",
        NSH: "18:00",
        NRH: "18:00",
        NYH: "18:00",
        NPH: "18:00",
        PAK: "18:00",
        PSK: "18:00",
        LGK: "18:00",
        LUK: "18:00",
        SOK: "18:00",
        YVK: "18:00",
        BIK: "18:00",
        LNK: "18:00",
        DOK: "18:00",
        OMH: "18:00",
        OWH: "18:00",
        RVH: "18:00",
        PUH: "18:00",
        CNS: "18:00",
        STS: "18:00",
        VLY: "18:00",
        GZY: "18:00",
        GUN: "18:00",
        ZNK: "18:00"
    }
      , o = [["文登", "文登东"], ["涿州", "涿州东"], ["驻马店", "驻马店西"], ["株洲", "株洲西"], ["珠海", "珠海北"], ["重庆", "重庆北", "重庆南"], ["中山", "中山北"], ["中宁", "中宁东", "中宁南"], ["郑州", "郑州东", "郑州西"], ["镇江", "镇江南"], ["长治", "长治北"], ["长兴", "长兴南"], ["长寿", "长寿北"], ["长沙", "长沙南"], ["长春", "长春南", "长春西"], ["樟树", "樟树东"], ["漳州", "漳州东"], ["张家口", "张家口南"], ["运城", "运城北"], ["岳阳", "岳阳东"], ["余姚", "余姚北"], ["攸县", "攸县南"], ["永济", "永济北"], ["营口", "营口东"], ["宜春", "宜春西"], ["宜昌", "宜昌东"], ["伊宁", "伊宁东"], ["阳泉", "阳泉北"], ["亚布力", "亚布力南"], ["旬阳", "旬阳北"], ["许昌", "许昌东"], ["徐州", "徐州东"], ["宿州", "宿州东"], ["兴安", "兴安北"], ["邢台", "邢台东"], ["信阳", "信阳东"], ["新余", "新余北"], ["新乡", "新乡东"], ["孝感", "孝感北"], ["襄阳", "襄阳东"], ["襄汾", "襄汾西"], ["咸阳", "咸阳秦都"], ["咸宁", "咸宁北", "咸宁东", "咸宁南"], ["犀浦", "犀浦东"], ["西昌", "西昌南"], ["西安", "西安北", "西安南"], ["武威", "武威南"], ["武汉", "武昌", "汉口"], ["梧州", "梧州南"], ["无锡", "无锡东", "无锡新区"], ["闻喜", "闻喜西"], ["温州", "温州南"], ["渭南", "渭南北", "渭南南"], ["瓦房店", "瓦房店西"], ["吐鲁番", "吐鲁番北"], ["铁岭", "铁岭西"], ["天门", "天门南"], ["天津", "天津北", "天津南", "天津西"], ["滕州", "滕州东"], ["唐山", "唐山北"], ["太原", "太原北", "太原东", "太原南"], ["太谷", "太谷西"], ["绥中", "绥中北"], ["苏州", "苏州北", "苏州新区", "苏州园区"], ["四平", "四平东"], ["顺德", "顺德学院"], ["石门县", "石门县北"], ["石林", "石林南"], ["石家庄", "石家庄北"], ["沈阳", "沈阳北", "沈阳东", "沈阳南"], ["深圳", "深圳北", "深圳东", "深圳坪山", "深圳西"], ["绍兴", "绍兴北"], ["韶关", "韶关东"], ["上虞", "上虞北"], ["上海", "上海虹桥", "上海南", "上海西"], ["上板城", "上板城南"], ["鄯善", "鄯善北"], ["厦门", "厦门北", "厦门高崎"], ["三明", "三明北"], ["三门峡", "三门峡南", "三门峡西"], ["泉州", "泉州东"], ["曲阜", "曲阜东"], ["青岛", "青岛北"], ["钦州", "钦州东"], ["祁阳", "祁阳北"], ["祁县", "祁县东"], ["祁东", "祁东北"], ["蒲城", "蒲城东"], ["萍乡", "萍乡北"], ["平庄", "平庄南"], ["平遥", "平遥古城"], ["平凉", "平凉南"], ["平顶山", "平顶山西"], ["郫县", "郫县西"], ["盘锦", "盘锦北"], ["宁波", "宁波东"], ["南平", "南平南"], ["南京", "南京南"], ["南昌", "南昌西"], ["明港", "明港东"], ["渑池", "渑池南"], ["汨罗", "汨罗东"], ["茂名", "茂名东"], ["麻城", "麻城北"], ["漯河", "漯河西"], ["洛阳", "洛阳东", "洛阳龙门"], ["凌源", "凌源东"], ["灵石", "灵石东"], ["灵宝", "灵宝西"], ["临沂", "临沂北"], ["临汾", "临汾西"], ["连云港", "连云港东"], ["醴陵", "醴陵东"], ["黎塘", "黎塘西"], ["廊坊", "廊坊北"], ["兰州", "兰州东", "兰州西", "兰州新区"], ["莱芜东", "莱芜西"], ["来宾", "来宾北"], ["昆山", "昆山南"], ["昆明", "昆明西"], ["开原", "开原西"], ["九台", "九台南"], ["靖远", "靖远西"], ["精河", "精河南"], ["晋城", "晋城北"], ["锦州", "锦州南"], ["金华", "金华南"], ["介休", "介休东"], ["焦作", "焦作东"], ["胶州", "胶州北"], ["嘉兴", "嘉兴南"], ["嘉善", "嘉善南"], ["济南", "济南东", "济南西"], ["霍州", "霍州东"], ["惠州", "惠州南", "惠州西"], ["黄石", "黄石北", "黄石东"], ["黄冈", "黄冈东", "黄冈西"], ["淮南", "淮南东"], ["淮安", "淮安南"], ["怀柔", "怀柔北"], ["怀仁", "怀仁东"], ["华山", "华山北"], ["华容", "华容东", "华容南"], ["葫芦岛", "葫芦岛北"], ["呼和浩特", "呼和浩特东"], ["侯马", "侯马西"], ["洪洞", "洪洞西"], ["红安", "红安西"], ["衡阳", "衡阳东"], ["衡山", "衡山西"], ["鹤壁", "鹤壁东"], ["合肥", "合肥北城", "合肥南", "合肥西"], ["杭州", "杭州东", "杭州南"], ["邯郸", "邯郸东"], ["海宁", "海宁西"], ["海口", "海口东"], ["海城", "海城西"], ["哈尔滨", "哈尔滨北", "哈尔滨东", "哈尔滨西"], ["桂林", "桂林北", "桂林西"], ["贵定", "贵定北", "贵定南"], ["广州", "广州北", "广州东", "广州南", "广州西"], ["广安", "广安南"], ["官厅", "官厅西"], ["巩义", "巩义南"], ["公主岭", "公主岭南"], ["高邑", "高邑西"], ["高碑店", "高碑店东"], ["甘泉", "甘泉北"], ["盖州", "盖州西"], ["富县", "富县东"], ["抚州", "抚州东", "抚州北"], ["抚顺", "抚顺北"], ["福州", "福州南"], ["涪陵", "涪陵北"], ["扶余", "扶余北"], ["丰城", "丰城南"], ["鄂州", "鄂州东"], ["东胜", "东胜西"], ["东莞", "东莞东"], ["定州", "定州东"], ["德州", "德州东"], ["德清", "德清西"], ["德惠", "德惠西"], ["丹阳", "丹阳北"], ["大庆", "大庆东", "大庆西"], ["大连", "大连北"], ["大安", "大安北"], ["滁州", "滁州北"], ["赤峰", "赤峰西"], ["赤壁", "赤壁北"], ["承德", "承德东"], ["成都", "成都东", "成都南"], ["郴州", "郴州西"], ["常州", "常州北"], ["昌图", "昌图西"], ["昌平", "昌平北"], ["茶陵", "茶陵南"], ["沧州", "沧州西"], ["滨海", "滨海北"], ["北屯", "北屯市"], ["北京", "北京北", "北京东", "北京南", "北京西"], ["保定", "保定东"], ["宝鸡", "宝鸡南"], ["包头", "包头东"], ["蚌埠", "蚌埠南"], ["白银市", "白银西"], ["白河", "白河东"], ["鞍山", "鞍山西"], ["安阳", "安阳东"], ["安庆", "安庆西"], ["阿尔山", "阿尔山北"], ["安顺", "安顺西"], ["安图", "安图西"], ["巴中", "巴中东"], ["霸州", "霸州西"], ["白银西", "白银市"], ["巢湖", "巢湖东"], ["达拉特旗", "达拉特西"], ["大石头", "大石头南"], ["丹东", "丹东西"], ["砀山", "砀山南"], ["东营", "东营南"], ["都匀", "都匀东"], ["高台", "高台南"], ["广汉", "广汉北"], ["广元", "广元南"], ["贵阳", "贵阳北"], ["海阳", "海阳北"], ["河口北", "河口南"], ["怀化", "怀化南"], ["黄陵", "黄陵南"], ["黄山", "黄山北"], ["绩溪县", "绩溪北"], ["嘉峪关", "嘉峪关南"], ["简阳", "简阳南"], ["江宁", "江宁西"], ["蛟河", "蛟河西"], ["金山北", "金山屯"], ["进贤", "进贤南"], ["缙云", "缙云西"], ["酒泉", "酒泉南"], ["开封", "开封北"], ["凯里", "凯里南"], ["莱芜东", "莱芜西"], ["莱西", "莱西北"], ["兰考", "兰考南"], ["乐都", "乐都南"], ["乐山", "乐山北"], ["耒阳", "耒阳西"], ["梁平", "梁平南"], ["临泽", "临泽南"], ["柳园", "柳园南"], ["龙里", "龙里北"], ["隆昌", "隆昌北"], ["娄底", "娄底南"], ["鹿寨", "鹿寨北"], ["罗江", "罗江东"], ["马鞍山", "马鞍山东"], ["眉山", "眉山东"], ["蒙自", "蒙自北"], ["民权", "民权北"], ["南充", "南充北"], ["南芬", "南芬北"], ["南宁", "南宁东", "南宁西"], ["内江", "内江北"], ["宁东", "宁东南"], ["彭山", "彭山北"], ["齐齐哈尔", "齐齐哈尔南"], ["清水", "清水北"], ["荣昌", "荣昌北"], ["三江口", "三江县", "三江南"], ["三水", "三水南"], ["商丘", "商丘南"], ["韶山", "韶山南"], ["邵阳", "邵阳北"], ["双城堡", "双城北"], ["双流机场", "双流西"], ["松江", "松江南"], ["松原", "松原北"], ["桃村", "桃村北"], ["田东", "田东北"], ["通远堡", "通远堡西"], ["铜陵", "铜陵北"], ["铜仁", "铜仁南"], ["图们", "图们北"], ["万州", "万州北"], ["威海", "威海北"], ["乌海", "乌海西"], ["乌鲁木齐", "乌鲁木齐南"], ["五龙背", "五龙背东"], ["武义", "武义北"], ["歙县", "歙县北"], ["湘潭", "湘潭北"], ["新化", "新化南"], ["新晃", "新晃西"], ["新津", "新津南"], ["修武", "修武西"], ["溆浦", "溆浦南"], ["烟台", "烟台南"], ["延吉", "延吉西"], ["杨陵", "杨陵南"], ["英德", "英德西"], ["鹰潭", "鹰潭北"], ["永川", "永川东"], ["永康", "永康南"], ["玉山", "玉山南"], ["枣庄", "枣庄东", "枣庄西"], ["湛江", "湛江西"], ["张掖", "张掖西"], ["长汀", "长汀南"], ["肇庆", "肇庆东"], ["织金", "织金北"], ["卓资山", "卓资东"], ["资阳", "资阳北"], ["资中", "资中北"]];
    a.exports = {
        getSellTimes: e
    }
}
);
"use strict";
define("./widgets/datePicker/datePicker", ["./../config/config", "./../utils/server", "./../trainList/index", "./../dateTab/index", "./../utils/date", "../../lib/jquery-ui-1.9.2.custom.min.js"], function(n, i, a) {
    function e(n) {
        var i, a, e = {}, t = +new Date(n), s = o.getPreDays(t), h = o.getStuPreDays(t);
        for (i = s + 1; s + h >= i; i++)
            a = new Date(+new Date(n) + i * c).pattern("yyyy-MM-dd"),
            e[a] = {
                className: "date-temporary",
                tooltip: "当天仅出售学生票"
            };
        return e
    }
    function t(n) {
        var i = d[n.pattern("yyyy-MM-dd")]
          , a = [!0, "", ""];
        return i && i.className && i.tooltip && (a = [!0, i.className, i.tooltip]),
        a
    }
    function s(n, i, a) {
        var e = new Date($(i).val())
          , t = o.getPreDays(a) + (n ? o.getStuPreDays(a) : 0)
          , s = new Date(a);
        s.setDate(s.getDate() + t);
        var h = e > s ? s : e;
        $(i).datepicker("option", "maxDate", s),
        $(i).datepicker("setDate", h.pattern("yyyy-MM-dd"))
    }
    var o = n("./../config/config")
      , h = n("./../utils/server")
      , g = n("./../trainList/index")
      , u = n("./../dateTab/index");
    n("./../utils/date"),
    n("../../lib/jquery-ui-1.9.2.custom.min.js");
    var l = 1
      , c = 864e5;
    $(function(n) {
        n.datepicker.regional["zh-CN"] = {
            closeText: "关闭",
            prevText: "<上月",
            nextText: "下月>",
            currentText: "今天",
            monthNames: ["一月", "二月", "三月", "四月", "五月", "六月", "七月", "八月", "九月", "十月", "十一月", "十二月"],
            monthNamesShort: ["一", "二", "三", "四", "五", "六", "七", "八", "九", "十", "十一", "十二"],
            dayNames: ["星期日", "星期一", "星期二", "星期三", "星期四", "星期五", "星期六"],
            dayNamesShort: ["周日", "周一", "周二", "周三", "周四", "周五", "周六"],
            dayNamesMin: ["日", "一", "二", "三", "四", "五", "六"],
            weekHeader: "周",
            dateFormat: "yy-mm-dd",
            firstDay: 0,
            isRTL: !1,
            showMonthAfterYear: !0,
            yearSuffix: "年"
        },
        n.datepicker.setDefaults(n.datepicker.regional["zh-CN"])
    }
    );
    var r = {
        "2015-01-01": {
            className: "date-festival",
            tooltip: "元旦"
        },
        "2014-12-25": {
            className: "date-festival",
            tooltip: "圣诞"
        },
        "2015-02-18": {
            className: "date-festival",
            tooltip: "除夕"
        },
        "2015-02-19": {
            className: "date-festival",
            tooltip: "春节"
        }
    }
      , d = []
      , y = function(n, i) {
        this.key_ = n,
        this.option_ = i || {},
        this.minDay_ = i.minDay || 0,
        this.maxDay_ = i.maxDay || o.getPreDays() + o.getStuPreDays(),
        this.date_ = o.get(this.key_),
        this.paramDate_ = i.paramDate
    }
    ;
    y.prototype.setSpecialDay = function() {
        var n = this;
        d = JSON.parse(JSON.stringify(r));
        var i = new Date(n.stamp).pattern("yyyy-MM-dd");
        e(i),
        d[i] = {
            className: "date-today",
            tooltip: "今天"
        },
        d[n.date_] = {
            className: "date-selected" + (d[n.date_] ? " date-festival" : ""),
            tooltip: (d[n.date_] ? d[n.date_].tooltip + "|" : "") + "当前选中日期"
        },
        console.log(d)
    }
    ,
    y.prototype._set = function(n) {
        var i = this;
        i.date_ = n,
        o.setByKey(i.key_, n),
        i.setSpecialDay(),
        g.addFilter("date", n),
        g.show(),
        u.setCurrentDate(n),
        $(document).trigger("setcurrentdate", n)
    }
    ,
    y.prototype.init = function() {
        function n() {
            var n = $("#student_identity").is(":checked");
            $(document).trigger("settoday", [i.stamp, n]),
            i.setSpecialDay(),
            o.setByKey(i.key_, i.date_),
            new Date(i.stamp).getMonth() != new Date(i.stamp + (i.maxDay_ - i.minDay_) * c).getMonth() && (l = 2),
            g.addFilter("date", i.date_),
            g.show();
            var a = function() {
                $("#ui-datepicker-div .date-today, #ui-datepicker-div .date-selected, #ui-datepicker-div .date-festival").each(function() {
                    if (!$(this).hasClass("text-replaced")) {
                        var n = $(this).addClass("text-replaced").attr("title").split("|");
                        ($(this).hasClass("date-festival") || $(this).hasClass("date-today")) && $(this).prepend("<span>" + n[0] + "</span>"),
                        $(this).hasClass("date-selected") ? $(this).attr("title", n[0]) : n[1] && $(this).attr("title", n[1])
                    }
                }
                )
            }
            ;
            $(e).prop("readOnly", !0).datepicker({
                showAnim: "",
                minDate: i.minDay_,
                maxDate: i.maxDay_,
                dateFormat: "yy-mm-dd",
                beforeShowDay: t,
                numberOfMonths: l
            }).val(i.date_).change(function() {
                i._set($(this).val())
            }
            ).on("click", a).on("focus", a),
            i._set(i.date_),
            $(window).resize(function() {
                var n = $(e).offset()
                  , i = {
                    left: n.left,
                    top: n.top + $(e)[0].offsetHeight
                };
                $("#ui-datepicker-div").css(i)
            }
            );
            var h = function(n) {
                var a = i.stamp
                  , t = new Date(Date.parse(o.get(i.key_)))
                  , h = o.getPreDays(a) + (n ? o.getStuPreDays(a) : 0)
                  , g = new Date(a);
                g.setDate(g.getDate() + h);
                var l = (t > g ? g : t).pattern("yyyy-MM-dd");
                i._set(l),
                s(n, e, i.stamp),
                u.init(i.stamp, l, n)
            }
            ;
            h(n),
            i.inited || (i.inited = !0,
            $(document).on("identitychange", function(n, i) {
                h("0X00" == i)
            }
            ))
        }
        var i = this
          , a = i.option_
          , e = a.selector
          , r = a.btnSelector;
        h.time(function(a) {
            var e = o.getPreDays(a)
              , t = o.getStuPreDays(a)
              , s = new Date(a).pattern("yyyy-MM-dd")
              , h = new Date(a + e * c).pattern("yyyy-MM-dd")
              , g = new Date(a + (e + t) * c).pattern("yyyy-MM-dd")
              , u = o.get(i.key_) || i.paramDate_ || h
              , l = Math.ceil((+(new Date).setHours(0) - a) / c);
            i.stamp = a,
            i.minDay_ = i.minDay_ - l,
            i.maxDay_ = i.maxDay_ + l,
            i.date_ = h,
            i.date_ = s > u ? i.date_ : u > g ? h : u,
            n()
        }
        ),
        $(r).on("click", function() {
            $(e).focus().trigger("click")
        }
        )
    }
    ,
    a.exports = y
}
);
"use strict";
define("./widgets/utils/server", ["../settings/settings", "./../extension/extension"], function(n, i, a) {
    var e = {};
    n("../settings/settings");
    var t = "./images/bg_icon.png?_"
      , s = function() {}
      , o = n("./../extension/extension")
      , h = 0
      , g = 3e3
      , u = 0
      , l = h;
    !function(n) {
        n.time = function(n) {
            n = n || s;
            var i = +new Date;
            return l = i + u,
            Math.abs(i - h) <= g ? (console.log(new Date(l)),
            n(l)) : (h = i,
            o.sendMessage({
                type: "getServerTime",
                settings: {
                    url: t + Math.random()
                }
            }, function(i) {
                var a = +new Date;
                i = i || {},
                l = i.serverTime || a,
                u = i.serverTime - a,
                console.log(new Date(l)),
                n(l)
            }
            )),
            l
        }
    }
    (e),
    Object.preventExtensions(e),
    a.exports = e
}
);
"use strict";
define("./widgets/dateTab/index", ["../trainList/index", "../config/config", "./dateTab"], function(n, i, a) {
    var e = n("../trainList/index")
      , t = n("../config/config")
      , s = n("./dateTab");
    s.init = function(n, i, a) {
        var o = t.getPreDays(n) + (a ? t.getStuPreDays(n) : 0) + 1
          , h = new s({
            $selector: $("#date_tab"),
            $selectedDate: i || null ,
            $tabChangedCallback: function() {
                g()
            },
            $animateTime: 600,
            $minDate: 0,
            $maxDate: o,
            $showNum: 7
        });
        h.init(n);
        var g = function() {
            var n = h.getSelectedDate();
            $("#date_forward_text").val(n).trigger("change"),
            t.setByKey("forwardDate", n),
            e.delFilter("date"),
            e.addFilter("date", n),
            e.show()
        }
    }
    ,
    a.exports = s
}
);
define("./widgets/dateTab/dateTab", ["./../config/config"], function(n, i, a) {
    "use strict";
    n("./../config/config");
    var t, e = function(n) {
        this.opt = n || {}
    }
    , s = function(n) {
        if (t) {
            var i = t.date_ul_.find('li[date="' + n + '"]');
            if (i[0] && !i.hasClass("selected")) {
                t.date_ul_.find("li.selected").removeClass("selected"),
                i.addClass("selected");
                var a = Math.floor(i.index() / t.opt.$showNum);
                t.doPageChange(a)
            }
        }
    }
    ;
    e.setCurrentDate = function(n) {
        s(n)
    }
    ,
    e.prototype = {
        init: function(n) {
            this.opt.$selector && (this.opt.$selector = "string" == typeof this.opt.$selector ? $(this.opt.$selector) : this.opt.$selector,
            this.opt.$selectedDate = this.opt.$selectedDate || this.getCurDate(n),
            this.opt.$animateTime = this.opt.$animateTime || 600,
            this.opt.$minDate = this.opt.$minDate || 0,
            this.opt.$maxDate = this.opt.$maxDate || 20,
            this.opt.$showNum = this.opt.$showNum || 7,
            this.date_arr_ = this.getAfterDate(n),
            this.page_count = Math.ceil(this.date_arr_.length / this.opt.$showNum),
            this.curPage = 0,
            this.makeHtml(),
            this.addEvent(),
            t = this)
        },
        getCurDate: function(n) {
            var i = n ? new Date(n) : new Date
              , a = i.getFullYear()
              , t = i.getMonth() + 1
              , e = i.getDate();
            return t = t > 9 ? t : "0" + t,
            e = e > 9 ? e : "0" + e,
            a + "-" + t + "-" + e
        },
        getAfterDate: function(n) {
            for (var i = [], a = this.opt.$minDate; a < this.opt.$maxDate; a++) {
                var t = n ? new Date(n) : new Date;
                t.setDate(t.getDate() + a);
                var e = t.getFullYear()
                  , s = t.getMonth() + 1 < 10 ? "0" + (t.getMonth() + 1) : t.getMonth() + 1
                  , o = t.getDate() < 10 ? "0" + t.getDate() : t.getDate()
                  , h = t.getDay();
                switch (h) {
                case 0:
                    h = "周日";
                    break;
                case 1:
                    h = "周一";
                    break;
                case 2:
                    h = "周二";
                    break;
                case 3:
                    h = "周三";
                    break;
                case 4:
                    h = "周四";
                    break;
                case 5:
                    h = "周五";
                    break;
                case 6:
                    h = "周六"
                }
                if (2015 == e) {
                    var g = function(n) {
                        return '<span class="jieri">' + n + "</span>"
                    }
                    ;
                    if (2 == s && 18 == o)
                        h = g("除夕");
                    else if (2 == s && 19 == o)
                        h = g("春节");
                    else if (3 == s && 5 == o)
                        h = g("元宵");
                    else if (2 == s) {
                        var u = ["二十", "廿一", "廿二", "廿三", "廿四", "廿五", "廿六", "廿七", "廿八", "廿九", "除夕", "春节", "初二", "初三", "初四", "初五", "初六", "初七", "初八", "初九", "初十"];
                        o >= 8 && 28 >= o && (h = g(u[o - 8]))
                    }
                }
                i.push({
                    dateYMD: e + "-" + s + "-" + o,
                    dateMD: s + "-" + o,
                    day: h
                })
            }
            return i
        },
        makeHtml: function() {
            this.container_ = $('<div class="date-tab-container"></dev>'),
            this.date_ul_outer = $('<div class="ul-outer"></div>'),
            this.date_ul_ = $("<ul></ul>"),
            this.container_.append(this.date_ul_outer.append(this.date_ul_)),
            this.opt.$maxDate - this.opt.$minDate > this.opt.$showNum && (this.prev_ = $('<span class="prev"><</span>'),
            this.next_ = $('<span class="next">></span>'),
            this.container_.append(this.prev_).append(this.next_),
            this.date_ul_outer.addClass("has-pn-btn")),
            this.opt.$selector.html(this.container_);
            var n = this.date_arr_.length
              , i = ""
              , a = this.date_ul_outer[0].offsetWidth
              , t = Math.floor(a / this.opt.$showNum)
              , e = 0
              , s = 0;
            a = t * this.opt.$showNum;
            for (var o = 0; n > o; o++) {
                var h = "";
                if (this.opt.$selectedDate == this.date_arr_[o].dateYMD && (h = ' class="selected"',
                this.curPage = Math.floor(o / this.opt.$showNum),
                this.selectedDate = this.date_arr_[o].dateYMD,
                e = -t * this.opt.$showNum * this.curPage,
                this.curPage == this.page_count - 1)) {
                    var g = this.opt.$showNum - this.date_arr_.length % this.opt.$showNum;
                    g == this.opt.$showNum && (g = 0),
                    e += g * t
                }
                i += '<li style="width:' + t + 'px" date="' + this.date_arr_[o].dateYMD + '"' + h + "><strong>" + this.date_arr_[o].dateMD + "<span>" + this.date_arr_[o].day + "</span></strong></li>",
                s += t
            }
            this.date_ul_.css({
                width: s,
                left: e
            }).html(i),
            this.date_ul_outer.css({
                width: a
            }),
            this.date_tab_arr = this.date_ul_.find("li"),
            this.setNPStatus()
        },
        addEvent: function() {
            var n = this;
            n.prev_ && n.next_ && (n.prev_.click(function() {
                n.page_changeing || $(this).hasClass("np-disabled") || (n.page_changeing = !0,
                n.doPageChange(n.curPage - 1))
            }
            ),
            n.next_.click(function() {
                n.page_changeing || $(this).hasClass("np-disabled") || (n.page_changeing = !0,
                n.doPageChange(n.curPage + 1))
            }
            )),
            this.date_ul_.delegate("li", "click", function() {
                $(this).hasClass("selected") || (n.date_ul_.find("li.selected").removeClass("selected"),
                $(this).addClass("selected"),
                n.selectedDate = $(this).attr("date"),
                n.opt.$tabChangedCallback && n.opt.$tabChangedCallback())
            }
            ),
            n.container_[0].onselectstart = function() {
                return !1
            }
        },
        doPageChange: function(n) {
            var i = this
              , a = i.page_count;
            if (n = parseInt(n) || 0,
            n != i.curPage) {
                var t = i.date_tab_arr[0].offsetWidth
                  , e = parseInt(i.date_ul_.css("left")) || 0;
                e >= 0 && (i.curPage = 0);
                var s = -1 * t * i.opt.$showNum * n;
                if (n == a - 1) {
                    var o = i.date_tab_arr.length % i.opt.$showNum;
                    0 == o && (o = i.opt.$showNum);
                    var h = o * t;
                    s = -((n - 1) * i.opt.$showNum * t + h)
                }
                i.date_ul_.animate({
                    left: s
                }, i.opt.$animateTime, function() {
                    i.page_changeing = !1,
                    0 > n && (n = 0),
                    n > a && (n = a - 1),
                    i.curPage = n,
                    i.setNPStatus()
                }
                )
            }
        },
        setNPStatus: function() {
            if (this.prev_ && this.next_) {
                var n = "np-disabled";
                this.curPage <= 0 ? this.prev_.addClass(n) : this.prev_.removeClass(n),
                this.curPage >= this.page_count - 1 ? this.next_.addClass(n) : this.next_.removeClass(n)
            }
        },
        getSelectedDate: function() {
            return this.selectedDate || ""
        }
    },
    a.exports = e
}
);
define("./lib/jquery-ui-1.9.2.custom.min", [], function(require, exports, module) {
    var LunarDate = {
        madd: new Array(0,31,59,90,120,151,181,212,243,273,304,334),
        HsString: "甲乙丙丁戊己庚辛壬癸",
        EbString: "子丑寅卯辰巳午未申酉戌亥",
        NumString: "一二三四五六七八九十",
        MonString: "正二三四五六七八九十冬腊",
        CalendarData: new Array(2635,333387,1701,1748,267701,694,2391,133423,1175,396438,3402,3749,331177,1453,694,201326,2350,465197,3221,3402,400202,2901,1386,267611,605,2349,137515,2709,464533,1738,2901,330421,1242,2651,199255,1323,529706,3733,1706,398762,2741,1206,267438,2647,1318,204070,3477,461653,1386,2413,330077,1197,2637,268877,3365,531109,2900,2922,398042,2395,1179,267415,2635,661067,1701,1748,398772,2742,2391,330031,1175,1611,200010,3749,527717,1452,2742,332397,2350,3222,268949,3402,3493,133973,1386,464219,605,2349,334123,2709,2890,267946,2773,592565,1210,2651,395863,1323,2707,265877),
        Year: null ,
        Month: null ,
        Day: null ,
        TheDate: null ,
        GetBit: function(t, e) {
            return 1 & t >> e
        },
        e2c: function() {
            this.TheDate = 3 != arguments.length ? new Date : new Date(arguments[0],arguments[1],arguments[2]);
            var t, e, n, i, a = !1, s = this.TheDate.getFullYear();
            for (t = 365 * (s - 1921) + Math.floor((s - 1921) / 4) + this.madd[this.TheDate.getMonth()] + this.TheDate.getDate() - 38,
            0 == this.TheDate.getYear() % 4 && this.TheDate.getMonth() > 1 && t++,
            e = 0; ; e++) {
                for (i = this.CalendarData[e] < 4095 ? 11 : 12,
                n = i; n >= 0; n--) {
                    if (t <= 29 + this.GetBit(this.CalendarData[e], n)) {
                        a = !0;
                        break
                    }
                    t = t - 29 - this.GetBit(this.CalendarData[e], n)
                }
                if (a)
                    break
            }
            this.Year = 1921 + e,
            this.Month = i - n + 1,
            this.Day = t,
            12 == i && (this.Month == Math.floor(this.CalendarData[e] / 65536) + 1 && (this.Month = 1 - this.Month),
            this.Month > Math.floor(this.CalendarData[e] / 65536) + 1 && this.Month--)
        },
        GetcDateString: function() {
            this.HsString.charAt((this.Year - 4) % 10) + this.EbString.charAt((this.Year - 4) % 12) + "年";
            var t = "";
            switch (t += this.Month < 1 ? this.MonString.charAt(-this.Month - 1) : this.MonString.charAt(this.Month - 1),
            t += "月") {
            case "正月":
                t = "春节"
            }
            var e = "";
            e += this.Day < 11 ? "初" : this.Day < 20 ? "十" : this.Day < 30 ? "廿" : "三十",
            (0 != this.Day % 10 || 10 == this.Day || 20 == this.Day) && (e += this.NumString.charAt((this.Day - 1) % 10));
            var n = "初一" == e ? t : e;
            return {
                day: n,
                month: t
            }
        },
        GetLunarDay: function(t, e, n) {
            if ("[object Date]" == Object.prototype.toString.call(t)) {
                var i = t;
                t = i.getFullYear(),
                e = i.getMonth() + 1,
                n = i.getDate()
            }
            return 1921 > t || t > 2020 ? "" : (e = parseInt(e) > 0 ? e - 1 : 11,
            this.e2c(t, e, n),
            this.GetcDateString())
        }
    };
    !function(t, e) {
        function n(e, n) {
            var a, s, o, h = e.nodeName.toLowerCase();
            return "area" === h ? (a = e.parentNode,
            s = a.name,
            e.href && s && "map" === a.nodeName.toLowerCase() ? (o = t("img[usemap=#" + s + "]")[0],
            !!o && i(o)) : !1) : (/input|select|textarea|button|object/.test(h) ? !e.disabled : "a" === h ? e.href || n : n) && i(e)
        }
        function i(e) {
            return t.expr.filters.visible(e) && !t(e).parents().andSelf().filter(function() {
                return "hidden" === t.css(this, "visibility")
            }
            ).length
        }
        var a = 0
          , s = /^ui-id-\d+$/;
        t.ui = t.ui || {},
        t.ui.version || (t.extend(t.ui, {
            version: "1.9.2",
            keyCode: {
                BACKSPACE: 8,
                COMMA: 188,
                DELETE: 46,
                DOWN: 40,
                END: 35,
                ENTER: 13,
                ESCAPE: 27,
                HOME: 36,
                LEFT: 37,
                NUMPAD_ADD: 107,
                NUMPAD_DECIMAL: 110,
                NUMPAD_DIVIDE: 111,
                NUMPAD_ENTER: 108,
                NUMPAD_MULTIPLY: 106,
                NUMPAD_SUBTRACT: 109,
                PAGE_DOWN: 34,
                PAGE_UP: 33,
                PERIOD: 190,
                RIGHT: 39,
                SPACE: 32,
                TAB: 9,
                UP: 38
            }
        }),
        t.fn.extend({
            _focus: t.fn.focus,
            focus: function(e, n) {
                return "number" == typeof e ? this.each(function() {
                    var i = this;
                    setTimeout(function() {
                        t(i).focus(),
                        n && n.call(i)
                    }
                    , e)
                }
                ) : this._focus.apply(this, arguments)
            },
            scrollParent: function() {
                var e;
                return e = t.ui.ie && /(static|relative)/.test(this.css("position")) || /absolute/.test(this.css("position")) ? this.parents().filter(function() {
                    return /(relative|absolute|fixed)/.test(t.css(this, "position")) && /(auto|scroll)/.test(t.css(this, "overflow") + t.css(this, "overflow-y") + t.css(this, "overflow-x"))
                }
                ).eq(0) : this.parents().filter(function() {
                    return /(auto|scroll)/.test(t.css(this, "overflow") + t.css(this, "overflow-y") + t.css(this, "overflow-x"))
                }
                ).eq(0),
                /fixed/.test(this.css("position")) || !e.length ? t(document) : e
            },
            zIndex: function(n) {
                if (n !== e)
                    return this.css("zIndex", n);
                if (this.length)
                    for (var i, a, s = t(this[0]); s.length && s[0] !== document; ) {
                        if (i = s.css("position"),
                        ("absolute" === i || "relative" === i || "fixed" === i) && (a = parseInt(s.css("zIndex"), 10),
                        !isNaN(a) && 0 !== a))
                            return a;
                        s = s.parent()
                    }
                return 0
            },
            uniqueId: function() {
                return this.each(function() {
                    this.id || (this.id = "ui-id-" + ++a)
                }
                )
            },
            removeUniqueId: function() {
                return this.each(function() {
                    s.test(this.id) && t(this).removeAttr("id")
                }
                )
            }
        }),
        t.extend(t.expr[":"], {
            data: t.expr.createPseudo ? t.expr.createPseudo(function(e) {
                return function(n) {
                    return !!t.data(n, e)
                }
            }
            ) : function(e, n, i) {
                return !!t.data(e, i[3])
            }
            ,
            focusable: function(e) {
                return n(e, !isNaN(t.attr(e, "tabindex")))
            },
            tabbable: function(e) {
                var i = t.attr(e, "tabindex")
                  , a = isNaN(i);
                return (a || i >= 0) && n(e, !a)
            }
        }),
        t(function() {
            var e = document.body
              , n = e.appendChild(n = document.createElement("div"));
            n.offsetHeight,
            t.extend(n.style, {
                minHeight: "100px",
                height: "auto",
                padding: 0,
                borderWidth: 0
            }),
            t.support.minHeight = 100 === n.offsetHeight,
            t.support.selectstart = "onselectstart" in n,
            e.removeChild(n).style.display = "none"
        }
        ),
        t("<a>").outerWidth(1).jquery || t.each(["Width", "Height"], function(n, i) {
            function a(e, n, i, a) {
                return t.each(s, function() {
                    n -= parseFloat(t.css(e, "padding" + this)) || 0,
                    i && (n -= parseFloat(t.css(e, "border" + this + "Width")) || 0),
                    a && (n -= parseFloat(t.css(e, "margin" + this)) || 0)
                }
                ),
                n
            }
            var s = "Width" === i ? ["Left", "Right"] : ["Top", "Bottom"]
              , o = i.toLowerCase()
              , h = {
                innerWidth: t.fn.innerWidth,
                innerHeight: t.fn.innerHeight,
                outerWidth: t.fn.outerWidth,
                outerHeight: t.fn.outerHeight
            };
            t.fn["inner" + i] = function(n) {
                return n === e ? h["inner" + i].call(this) : this.each(function() {
                    t(this).css(o, a(this, n) + "px")
                }
                )
            }
            ,
            t.fn["outer" + i] = function(e, n) {
                return "number" != typeof e ? h["outer" + i].call(this, e) : this.each(function() {
                    t(this).css(o, a(this, e, !0, n) + "px")
                }
                )
            }
        }
        ),
        t("<a>").data("a-b", "a").removeData("a-b").data("a-b") && (t.fn.removeData = function(e) {
            return function(n) {
                return arguments.length ? e.call(this, t.camelCase(n)) : e.call(this)
            }
        }
        (t.fn.removeData)),
        function() {
            var e = /msie ([\w.]+)/.exec(navigator.userAgent.toLowerCase()) || [];
            t.ui.ie = e.length ? !0 : !1,
            t.ui.ie6 = 6 === parseFloat(e[1], 10)
        }
        (),
        t.fn.extend({
            disableSelection: function() {
                return this.bind((t.support.selectstart ? "selectstart" : "mousedown") + ".ui-disableSelection", function(t) {
                    t.preventDefault()
                }
                )
            },
            enableSelection: function() {
                return this.unbind(".ui-disableSelection")
            }
        }),
        t.extend(t.ui, {
            plugin: {
                add: function(e, n, i) {
                    var a, s = t.ui[e].prototype;
                    for (a in i)
                        s.plugins[a] = s.plugins[a] || [],
                        s.plugins[a].push([n, i[a]])
                },
                call: function(t, e, n) {
                    var i, a = t.plugins[e];
                    if (a && t.element[0].parentNode && 11 !== t.element[0].parentNode.nodeType)
                        for (i = 0; a.length > i; i++)
                            t.options[a[i][0]] && a[i][1].apply(t.element, n)
                }
            },
            contains: t.contains,
            hasScroll: function(e, n) {
                if ("hidden" === t(e).css("overflow"))
                    return !1;
                var i = n && "left" === n ? "scrollLeft" : "scrollTop"
                  , a = !1;
                return e[i] > 0 ? !0 : (e[i] = 1,
                a = e[i] > 0,
                e[i] = 0,
                a)
            },
            isOverAxis: function(t, e, n) {
                return t > e && e + n > t
            },
            isOver: function(e, n, i, a, s, o) {
                return t.ui.isOverAxis(e, i, s) && t.ui.isOverAxis(n, a, o)
            }
        }))
    }
    (jQuery),
    function(t, e) {
        var n = 0
          , i = Array.prototype.slice
          , a = t.cleanData;
        t.cleanData = function(e) {
            for (var n, i = 0; null  != (n = e[i]); i++)
                try {
                    t(n).triggerHandler("remove")
                } catch (s) {}
            a(e)
        }
        ,
        t.widget = function(n, i, a) {
            var s, o, h, r, u = n.split(".")[0];
            n = n.split(".")[1],
            s = u + "-" + n,
            a || (a = i,
            i = t.Widget),
            t.expr[":"][s.toLowerCase()] = function(e) {
                return !!t.data(e, s)
            }
            ,
            t[u] = t[u] || {},
            o = t[u][n],
            h = t[u][n] = function(t, n) {
                return this._createWidget ? (arguments.length && this._createWidget(t, n),
                e) : new h(t,n)
            }
            ,
            t.extend(h, o, {
                version: a.version,
                _proto: t.extend({}, a),
                _childConstructors: []
            }),
            r = new i,
            r.options = t.widget.extend({}, r.options),
            t.each(a, function(e, n) {
                t.isFunction(n) && (a[e] = function() {
                    var t = function() {
                        return i.prototype[e].apply(this, arguments)
                    }
                      , a = function(t) {
                        return i.prototype[e].apply(this, t)
                    }
                    ;
                    return function() {
                        var e, i = this._super, s = this._superApply;
                        return this._super = t,
                        this._superApply = a,
                        e = n.apply(this, arguments),
                        this._super = i,
                        this._superApply = s,
                        e
                    }
                }
                ())
            }
            ),
            h.prototype = t.widget.extend(r, {
                widgetEventPrefix: o ? r.widgetEventPrefix : n
            }, a, {
                constructor: h,
                namespace: u,
                widgetName: n,
                widgetBaseClass: s,
                widgetFullName: s
            }),
            o ? (t.each(o._childConstructors, function(e, n) {
                var i = n.prototype;
                t.widget(i.namespace + "." + i.widgetName, h, n._proto)
            }
            ),
            delete o._childConstructors) : i._childConstructors.push(h),
            t.widget.bridge(n, h)
        }
        ,
        t.widget.extend = function(n) {
            for (var a, s, o = i.call(arguments, 1), h = 0, r = o.length; r > h; h++)
                for (a in o[h])
                    s = o[h][a],
                    o[h].hasOwnProperty(a) && s !== e && (n[a] = t.isPlainObject(s) ? t.isPlainObject(n[a]) ? t.widget.extend({}, n[a], s) : t.widget.extend({}, s) : s);
            return n
        }
        ,
        t.widget.bridge = function(n, a) {
            var s = a.prototype.widgetFullName || n;
            t.fn[n] = function(o) {
                var h = "string" == typeof o
                  , r = i.call(arguments, 1)
                  , u = this;
                return o = !h && r.length ? t.widget.extend.apply(null , [o].concat(r)) : o,
                h ? this.each(function() {
                    var i, a = t.data(this, s);
                    return a ? t.isFunction(a[o]) && "_" !== o.charAt(0) ? (i = a[o].apply(a, r),
                    i !== a && i !== e ? (u = i && i.jquery ? u.pushStack(i.get()) : i,
                    !1) : e) : t.error("no such method '" + o + "' for " + n + " widget instance") : t.error("cannot call methods on " + n + " prior to initialization; " + "attempted to call method '" + o + "'")
                }
                ) : this.each(function() {
                    var e = t.data(this, s);
                    e ? e.option(o || {})._init() : t.data(this, s, new a(o,this))
                }
                ),
                u
            }
        }
        ,
        t.Widget = function() {}
        ,
        t.Widget._childConstructors = [],
        t.Widget.prototype = {
            widgetName: "widget",
            widgetEventPrefix: "",
            defaultElement: "<div>",
            options: {
                disabled: !1,
                create: null 
            },
            _createWidget: function(e, i) {
                i = t(i || this.defaultElement || this)[0],
                this.element = t(i),
                this.uuid = n++,
                this.eventNamespace = "." + this.widgetName + this.uuid,
                this.options = t.widget.extend({}, this.options, this._getCreateOptions(), e),
                this.bindings = t(),
                this.hoverable = t(),
                this.focusable = t(),
                i !== this && (t.data(i, this.widgetName, this),
                t.data(i, this.widgetFullName, this),
                this._on(!0, this.element, {
                    remove: function(t) {
                        t.target === i && this.destroy()
                    }
                }),
                this.document = t(i.style ? i.ownerDocument : i.document || i),
                this.window = t(this.document[0].defaultView || this.document[0].parentWindow)),
                this._create(),
                this._trigger("create", null , this._getCreateEventData()),
                this._init()
            },
            _getCreateOptions: t.noop,
            _getCreateEventData: t.noop,
            _create: t.noop,
            _init: t.noop,
            destroy: function() {
                this._destroy(),
                this.element.unbind(this.eventNamespace).removeData(this.widgetName).removeData(this.widgetFullName).removeData(t.camelCase(this.widgetFullName)),
                this.widget().unbind(this.eventNamespace).removeAttr("aria-disabled").removeClass(this.widgetFullName + "-disabled " + "ui-state-disabled"),
                this.bindings.unbind(this.eventNamespace),
                this.hoverable.removeClass("ui-state-hover"),
                this.focusable.removeClass("ui-state-focus")
            },
            _destroy: t.noop,
            widget: function() {
                return this.element
            },
            option: function(n, i) {
                var a, s, o, h = n;
                if (0 === arguments.length)
                    return t.widget.extend({}, this.options);
                if ("string" == typeof n)
                    if (h = {},
                    a = n.split("."),
                    n = a.shift(),
                    a.length) {
                        for (s = h[n] = t.widget.extend({}, this.options[n]),
                        o = 0; a.length - 1 > o; o++)
                            s[a[o]] = s[a[o]] || {},
                            s = s[a[o]];
                        if (n = a.pop(),
                        i === e)
                            return s[n] === e ? null  : s[n];
                        s[n] = i
                    } else {
                        if (i === e)
                            return this.options[n] === e ? null  : this.options[n];
                        h[n] = i
                    }
                return this._setOptions(h),
                this
            },
            _setOptions: function(t) {
                var e;
                for (e in t)
                    this._setOption(e, t[e]);
                return this
            },
            _setOption: function(t, e) {
                return this.options[t] = e,
                "disabled" === t && (this.widget().toggleClass(this.widgetFullName + "-disabled ui-state-disabled", !!e).attr("aria-disabled", e),
                this.hoverable.removeClass("ui-state-hover"),
                this.focusable.removeClass("ui-state-focus")),
                this
            },
            enable: function() {
                return this._setOption("disabled", !1)
            },
            disable: function() {
                return this._setOption("disabled", !0)
            },
            _on: function(n, i, a) {
                var s, o = this;
                "boolean" != typeof n && (a = i,
                i = n,
                n = !1),
                a ? (i = s = t(i),
                this.bindings = this.bindings.add(i)) : (a = i,
                i = this.element,
                s = this.widget()),
                t.each(a, function(a, h) {
                    function r() {
                        return n || o.options.disabled !== !0 && !t(this).hasClass("ui-state-disabled") ? ("string" == typeof h ? o[h] : h).apply(o, arguments) : e
                    }
                    "string" != typeof h && (r.guid = h.guid = h.guid || r.guid || t.guid++);
                    var u = a.match(/^(\w+)\s*(.*)$/)
                      , l = u[1] + o.eventNamespace
                      , c = u[2];
                    c ? s.delegate(c, l, r) : i.bind(l, r)
                }
                )
            },
            _off: function(t, e) {
                e = (e || "").split(" ").join(this.eventNamespace + " ") + this.eventNamespace,
                t.unbind(e).undelegate(e)
            },
            _delay: function(t, e) {
                function n() {
                    return ("string" == typeof t ? i[t] : t).apply(i, arguments)
                }
                var i = this;
                return setTimeout(n, e || 0)
            },
            _hoverable: function(e) {
                this.hoverable = this.hoverable.add(e),
                this._on(e, {
                    mouseenter: function(e) {
                        t(e.currentTarget).addClass("ui-state-hover")
                    },
                    mouseleave: function(e) {
                        t(e.currentTarget).removeClass("ui-state-hover")
                    }
                })
            },
            _focusable: function(e) {
                this.focusable = this.focusable.add(e),
                this._on(e, {
                    focusin: function(e) {
                        t(e.currentTarget).addClass("ui-state-focus")
                    },
                    focusout: function(e) {
                        t(e.currentTarget).removeClass("ui-state-focus")
                    }
                })
            },
            _trigger: function(e, n, i) {
                var a, s, o = this.options[e];
                if (i = i || {},
                n = t.Event(n),
                n.type = (e === this.widgetEventPrefix ? e : this.widgetEventPrefix + e).toLowerCase(),
                n.target = this.element[0],
                s = n.originalEvent)
                    for (a in s)
                        a in n || (n[a] = s[a]);
                return this.element.trigger(n, i),
                !(t.isFunction(o) && o.apply(this.element[0], [n].concat(i)) === !1 || n.isDefaultPrevented())
            }
        },
        t.each({
            show: "fadeIn",
            hide: "fadeOut"
        }, function(e, n) {
            t.Widget.prototype["_" + e] = function(i, a, s) {
                "string" == typeof a && (a = {
                    effect: a
                });
                var o, h = a ? a === !0 || "number" == typeof a ? n : a.effect || n : e;
                a = a || {},
                "number" == typeof a && (a = {
                    duration: a
                }),
                o = !t.isEmptyObject(a),
                a.complete = s,
                a.delay && i.delay(a.delay),
                o && t.effects && (t.effects.effect[h] || t.uiBackCompat !== !1 && t.effects[h]) ? i[e](a) : h !== e && i[h] ? i[h](a.duration, a.easing, s) : i.queue(function(n) {
                    t(this)[e](),
                    s && s.call(i[0]),
                    n()
                }
                )
            }
        }
        ),
        t.uiBackCompat !== !1 && (t.Widget.prototype._getCreateOptions = function() {
            return t.metadata && t.metadata.get(this.element[0])[this.widgetName]
        }
        )
    }
    (jQuery),
    function($, undefined) {
        function Datepicker() {
            this.debug = !1,
            this._curInst = null ,
            this._keyEvent = !1,
            this._disabledInputs = [],
            this._datepickerShowing = !1,
            this._inDialog = !1,
            this._mainDivId = "ui-datepicker-div",
            this._inlineClass = "ui-datepicker-inline",
            this._appendClass = "ui-datepicker-append",
            this._triggerClass = "ui-datepicker-trigger",
            this._dialogClass = "ui-datepicker-dialog",
            this._disableClass = "ui-datepicker-disabled",
            this._unselectableClass = "ui-datepicker-unselectable",
            this._currentClass = "ui-datepicker-current-day",
            this._dayOverClass = "ui-datepicker-days-cell-over",
            this.regional = [],
            this.regional[""] = {
                closeText: "Done",
                prevText: "Prev",
                nextText: "Next",
                currentText: "Today",
                monthNames: ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"],
                monthNamesShort: ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"],
                dayNames: ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"],
                dayNamesShort: ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"],
                dayNamesMin: ["Su", "Mo", "Tu", "We", "Th", "Fr", "Sa"],
                weekHeader: "Wk",
                dateFormat: "mm/dd/yy",
                firstDay: 0,
                isRTL: !1,
                showMonthAfterYear: !1,
                yearSuffix: ""
            },
            this._defaults = {
                showOn: "focus",
                showAnim: "fadeIn",
                showOptions: {},
                defaultDate: null ,
                appendText: "",
                buttonText: "...",
                buttonImage: "",
                buttonImageOnly: !1,
                hideIfNoPrevNext: !1,
                navigationAsDateFormat: !1,
                gotoCurrent: !1,
                changeMonth: !1,
                changeYear: !1,
                yearRange: "c-10:c+10",
                showOtherMonths: !1,
                selectOtherMonths: !1,
                showWeek: !1,
                calculateWeek: this.iso8601Week,
                shortYearCutoff: "+10",
                minDate: null ,
                maxDate: null ,
                duration: "fast",
                beforeShowDay: null ,
                beforeShow: null ,
                onSelect: null ,
                onChangeMonthYear: null ,
                onClose: null ,
                numberOfMonths: 1,
                showCurrentAtPos: 0,
                stepMonths: 1,
                stepBigMonths: 12,
                altField: "",
                altFormat: "",
                constrainInput: !0,
                showButtonPanel: !1,
                autoSize: !1,
                disabled: !1
            },
            $.extend(this._defaults, this.regional[""]),
            this.dpDiv = bindHover($('<div id="' + this._mainDivId + '" class="ui-datepicker ui-widget ui-widget-content ui-helper-clearfix ui-corner-all"></div>'))
        }
        function bindHover(t) {
            var e = "button, .ui-datepicker-prev, .ui-datepicker-next, .ui-datepicker-calendar td a";
            return t.delegate(e, "mouseout", function() {
                $(this).removeClass("ui-state-hover"),
                -1 != this.className.indexOf("ui-datepicker-prev") && $(this).removeClass("ui-datepicker-prev-hover"),
                -1 != this.className.indexOf("ui-datepicker-next") && $(this).removeClass("ui-datepicker-next-hover")
            }
            ).delegate(e, "mouseover", function() {
                $.datepicker._isDisabledDatepicker(instActive.inline ? t.parent()[0] : instActive.input[0]) || ($(this).parents(".ui-datepicker-calendar").find("a").removeClass("ui-state-hover"),
                $(this).addClass("ui-state-hover"),
                -1 != this.className.indexOf("ui-datepicker-prev") && $(this).addClass("ui-datepicker-prev-hover"),
                -1 != this.className.indexOf("ui-datepicker-next") && $(this).addClass("ui-datepicker-next-hover"))
            }
            )
        }
        function extendRemove(t, e) {
            $.extend(t, e);
            for (var n in e)
                (null  == e[n] || e[n] == undefined) && (t[n] = e[n]);
            return t
        }
        $.extend($.ui, {
            datepicker: {
                version: "1.9.2"
            }
        });
        var PROP_NAME = "datepicker", dpuuid = (new Date).getTime(), instActive;
        $.extend(Datepicker.prototype, {
            markerClassName: "hasDatepicker",
            maxRows: 4,
            log: function() {
                this.debug && console.log.apply("", arguments)
            },
            _widgetDatepicker: function() {
                return this.dpDiv
            },
            setDefaults: function(t) {
                return extendRemove(this._defaults, t || {}),
                this
            },
            _attachDatepicker: function(target, settings) {
                var inlineSettings = null ;
                for (var attrName in this._defaults) {
                    var attrValue = target.getAttribute("date:" + attrName);
                    if (attrValue) {
                        inlineSettings = inlineSettings || {};
                        try {
                            inlineSettings[attrName] = eval(attrValue)
                        } catch (err) {
                            inlineSettings[attrName] = attrValue
                        }
                    }
                }
                var nodeName = target.nodeName.toLowerCase()
                  , inline = "div" == nodeName || "span" == nodeName;
                target.id || (this.uuid += 1,
                target.id = "dp" + this.uuid);
                var inst = this._newInst($(target), inline);
                inst.settings = $.extend({}, settings || {}, inlineSettings || {}),
                "input" == nodeName ? this._connectDatepicker(target, inst) : inline && this._inlineDatepicker(target, inst)
            },
            _newInst: function(t, e) {
                var n = t[0].id.replace(/([^A-Za-z0-9_-])/g, "\\\\$1");
                return {
                    id: n,
                    input: t,
                    selectedDay: 0,
                    selectedMonth: 0,
                    selectedYear: 0,
                    drawMonth: 0,
                    drawYear: 0,
                    inline: e,
                    dpDiv: e ? bindHover($('<div class="' + this._inlineClass + ' ui-datepicker ui-widget ui-widget-content ui-helper-clearfix ui-corner-all"></div>')) : this.dpDiv
                }
            },
            _connectDatepicker: function(t, e) {
                var n = $(t);
                e.append = $([]),
                e.trigger = $([]),
                n.hasClass(this.markerClassName) || (this._attachments(n, e),
                n.addClass(this.markerClassName).keydown(this._doKeyDown).keypress(this._doKeyPress).keyup(this._doKeyUp).bind("setData.datepicker", function(t, n, i) {
                    e.settings[n] = i
                }
                ).bind("getData.datepicker", function(t, n) {
                    return this._get(e, n)
                }
                ),
                this._autoSize(e),
                $.data(t, PROP_NAME, e),
                e.settings.disabled && this._disableDatepicker(t))
            },
            _attachments: function(t, e) {
                var n = this._get(e, "appendText")
                  , i = this._get(e, "isRTL");
                e.append && e.append.remove(),
                n && (e.append = $('<span class="' + this._appendClass + '">' + n + "</span>"),
                t[i ? "before" : "after"](e.append)),
                t.unbind("focus", this._showDatepicker),
                e.trigger && e.trigger.remove();
                var a = this._get(e, "showOn");
                if (("focus" == a || "both" == a) && t.focus(this._showDatepicker),
                "button" == a || "both" == a) {
                    var s = this._get(e, "buttonText")
                      , o = this._get(e, "buttonImage");
                    e.trigger = $(this._get(e, "buttonImageOnly") ? $("<img/>").addClass(this._triggerClass).attr({
                        src: o,
                        alt: s,
                        title: s
                    }) : $('<button type="button"></button>').addClass(this._triggerClass).html("" == o ? s : $("<img/>").attr({
                        src: o,
                        alt: s,
                        title: s
                    }))),
                    t[i ? "before" : "after"](e.trigger),
                    e.trigger.click(function() {
                        return $.datepicker._datepickerShowing && $.datepicker._lastInput == t[0] ? $.datepicker._hideDatepicker() : $.datepicker._datepickerShowing && $.datepicker._lastInput != t[0] ? ($.datepicker._hideDatepicker(),
                        $.datepicker._showDatepicker(t[0])) : $.datepicker._showDatepicker(t[0]),
                        !1
                    }
                    )
                }
            },
            _autoSize: function(t) {
                if (this._get(t, "autoSize") && !t.inline) {
                    var e = new Date(2009,11,20)
                      , n = this._get(t, "dateFormat");
                    if (n.match(/[DM]/)) {
                        var i = function(t) {
                            for (var e = 0, n = 0, i = 0; t.length > i; i++)
                                t[i].length > e && (e = t[i].length,
                                n = i);
                            return n
                        }
                        ;
                        e.setMonth(i(this._get(t, n.match(/MM/) ? "monthNames" : "monthNamesShort"))),
                        e.setDate(i(this._get(t, n.match(/DD/) ? "dayNames" : "dayNamesShort")) + 20 - e.getDay())
                    }
                    t.input.attr("size", this._formatDate(t, e).length)
                }
            },
            _inlineDatepicker: function(t, e) {
                var n = $(t);
                n.hasClass(this.markerClassName) || (n.addClass(this.markerClassName).append(e.dpDiv).bind("setData.datepicker", function(t, n, i) {
                    e.settings[n] = i
                }
                ).bind("getData.datepicker", function(t, n) {
                    return this._get(e, n)
                }
                ),
                $.data(t, PROP_NAME, e),
                this._setDate(e, this._getDefaultDate(e), !0),
                this._updateDatepicker(e),
                this._updateAlternate(e),
                e.settings.disabled && this._disableDatepicker(t),
                e.dpDiv.css("display", "block"))
            },
            _dialogDatepicker: function(t, e, n, i, a) {
                var s = this._dialogInst;
                if (!s) {
                    this.uuid += 1;
                    var o = "dp" + this.uuid;
                    this._dialogInput = $('<input type="text" id="' + o + '" style="position: absolute; top: -100px; width: 0px;"/>'),
                    this._dialogInput.keydown(this._doKeyDown),
                    $("body").append(this._dialogInput),
                    s = this._dialogInst = this._newInst(this._dialogInput, !1),
                    s.settings = {},
                    $.data(this._dialogInput[0], PROP_NAME, s)
                }
                if (extendRemove(s.settings, i || {}),
                e = e && e.constructor == Date ? this._formatDate(s, e) : e,
                this._dialogInput.val(e),
                this._pos = a ? a.length ? a : [a.pageX, a.pageY] : null ,
                !this._pos) {
                    var h = document.documentElement.clientWidth
                      , r = document.documentElement.clientHeight
                      , u = document.documentElement.scrollLeft || document.body.scrollLeft
                      , l = document.documentElement.scrollTop || document.body.scrollTop;
                    this._pos = [h / 2 - 100 + u, r / 2 - 150 + l]
                }
                return this._dialogInput.css("left", this._pos[0] + 20 + "px").css("top", this._pos[1] + "px"),
                s.settings.onSelect = n,
                this._inDialog = !0,
                this.dpDiv.addClass(this._dialogClass),
                this._showDatepicker(this._dialogInput[0]),
                $.blockUI && $.blockUI(this.dpDiv),
                $.data(this._dialogInput[0], PROP_NAME, s),
                this
            },
            _destroyDatepicker: function(t) {
                var e = $(t)
                  , n = $.data(t, PROP_NAME);
                if (e.hasClass(this.markerClassName)) {
                    var i = t.nodeName.toLowerCase();
                    $.removeData(t, PROP_NAME),
                    "input" == i ? (n.append.remove(),
                    n.trigger.remove(),
                    e.removeClass(this.markerClassName).unbind("focus", this._showDatepicker).unbind("keydown", this._doKeyDown).unbind("keypress", this._doKeyPress).unbind("keyup", this._doKeyUp)) : ("div" == i || "span" == i) && e.removeClass(this.markerClassName).empty()
                }
            },
            _enableDatepicker: function(t) {
                var e = $(t)
                  , n = $.data(t, PROP_NAME);
                if (e.hasClass(this.markerClassName)) {
                    var i = t.nodeName.toLowerCase();
                    if ("input" == i)
                        t.disabled = !1,
                        n.trigger.filter("button").each(function() {
                            this.disabled = !1
                        }
                        ).end().filter("img").css({
                            opacity: "1.0",
                            cursor: ""
                        });
                    else if ("div" == i || "span" == i) {
                        var a = e.children("." + this._inlineClass);
                        a.children().removeClass("ui-state-disabled"),
                        a.find("select.ui-datepicker-month, select.ui-datepicker-year").prop("disabled", !1)
                    }
                    this._disabledInputs = $.map(this._disabledInputs, function(e) {
                        return e == t ? null  : e
                    }
                    )
                }
            },
            _disableDatepicker: function(t) {
                var e = $(t)
                  , n = $.data(t, PROP_NAME);
                if (e.hasClass(this.markerClassName)) {
                    var i = t.nodeName.toLowerCase();
                    if ("input" == i)
                        t.disabled = !0,
                        n.trigger.filter("button").each(function() {
                            this.disabled = !0
                        }
                        ).end().filter("img").css({
                            opacity: "0.5",
                            cursor: "default"
                        });
                    else if ("div" == i || "span" == i) {
                        var a = e.children("." + this._inlineClass);
                        a.children().addClass("ui-state-disabled"),
                        a.find("select.ui-datepicker-month, select.ui-datepicker-year").prop("disabled", !0)
                    }
                    this._disabledInputs = $.map(this._disabledInputs, function(e) {
                        return e == t ? null  : e
                    }
                    ),
                    this._disabledInputs[this._disabledInputs.length] = t
                }
            },
            _isDisabledDatepicker: function(t) {
                if (!t)
                    return !1;
                for (var e = 0; this._disabledInputs.length > e; e++)
                    if (this._disabledInputs[e] == t)
                        return !0;
                return !1
            },
            _getInst: function(t) {
                try {
                    return $.data(t, PROP_NAME)
                } catch (e) {
                    throw "Missing instance data for this datepicker"
                }
            },
            _optionDatepicker: function(t, e, n) {
                var i = this._getInst(t);
                if (2 == arguments.length && "string" == typeof e)
                    return "defaults" == e ? $.extend({}, $.datepicker._defaults) : i ? "all" == e ? $.extend({}, i.settings) : this._get(i, e) : null ;
                var a = e || {};
                if ("string" == typeof e && (a = {},
                a[e] = n),
                i) {
                    this._curInst == i && this._hideDatepicker();
                    var s = this._getDateDatepicker(t, !0)
                      , o = this._getMinMaxDate(i, "min")
                      , h = this._getMinMaxDate(i, "max");
                    extendRemove(i.settings, a),
                    null  !== o && a.dateFormat !== undefined && a.minDate === undefined && (i.settings.minDate = this._formatDate(i, o)),
                    null  !== h && a.dateFormat !== undefined && a.maxDate === undefined && (i.settings.maxDate = this._formatDate(i, h)),
                    this._attachments($(t), i),
                    this._autoSize(i),
                    this._setDate(i, s),
                    this._updateAlternate(i),
                    this._updateDatepicker(i)
                }
            },
            _changeDatepicker: function(t, e, n) {
                this._optionDatepicker(t, e, n)
            },
            _refreshDatepicker: function(t) {
                var e = this._getInst(t);
                e && this._updateDatepicker(e)
            },
            _setDateDatepicker: function(t, e) {
                var n = this._getInst(t);
                n && (this._setDate(n, e),
                this._updateDatepicker(n),
                this._updateAlternate(n))
            },
            _getDateDatepicker: function(t, e) {
                var n = this._getInst(t);
                return n && !n.inline && this._setDateFromField(n, e),
                n ? this._getDate(n) : null 
            },
            _doKeyDown: function(t) {
                var e = $.datepicker._getInst(t.target)
                  , n = !0
                  , i = e.dpDiv.is(".ui-datepicker-rtl");
                if (e._keyEvent = !0,
                $.datepicker._datepickerShowing)
                    switch (t.keyCode) {
                    case 9:
                        $.datepicker._hideDatepicker(),
                        n = !1;
                        break;
                    case 13:
                        var a = $("td." + $.datepicker._dayOverClass + ":not(." + $.datepicker._currentClass + ")", e.dpDiv);
                        a[0] && $.datepicker._selectDay(t.target, e.selectedMonth, e.selectedYear, a[0]);
                        var s = $.datepicker._get(e, "onSelect");
                        if (s) {
                            var o = $.datepicker._formatDate(e);
                            s.apply(e.input ? e.input[0] : null , [o, e])
                        } else
                            $.datepicker._hideDatepicker();
                        return !1;
                    case 27:
                        $.datepicker._hideDatepicker();
                        break;
                    case 33:
                        $.datepicker._adjustDate(t.target, t.ctrlKey ? -$.datepicker._get(e, "stepBigMonths") : -$.datepicker._get(e, "stepMonths"), "M");
                        break;
                    case 34:
                        $.datepicker._adjustDate(t.target, t.ctrlKey ? +$.datepicker._get(e, "stepBigMonths") : +$.datepicker._get(e, "stepMonths"), "M");
                        break;
                    case 35:
                        (t.ctrlKey || t.metaKey) && $.datepicker._clearDate(t.target),
                        n = t.ctrlKey || t.metaKey;
                        break;
                    case 36:
                        (t.ctrlKey || t.metaKey) && $.datepicker._gotoToday(t.target),
                        n = t.ctrlKey || t.metaKey;
                        break;
                    case 37:
                        (t.ctrlKey || t.metaKey) && $.datepicker._adjustDate(t.target, i ? 1 : -1, "D"),
                        n = t.ctrlKey || t.metaKey,
                        t.originalEvent.altKey && $.datepicker._adjustDate(t.target, t.ctrlKey ? -$.datepicker._get(e, "stepBigMonths") : -$.datepicker._get(e, "stepMonths"), "M");
                        break;
                    case 38:
                        (t.ctrlKey || t.metaKey) && $.datepicker._adjustDate(t.target, -7, "D"),
                        n = t.ctrlKey || t.metaKey;
                        break;
                    case 39:
                        (t.ctrlKey || t.metaKey) && $.datepicker._adjustDate(t.target, i ? -1 : 1, "D"),
                        n = t.ctrlKey || t.metaKey,
                        t.originalEvent.altKey && $.datepicker._adjustDate(t.target, t.ctrlKey ? +$.datepicker._get(e, "stepBigMonths") : +$.datepicker._get(e, "stepMonths"), "M");
                        break;
                    case 40:
                        (t.ctrlKey || t.metaKey) && $.datepicker._adjustDate(t.target, 7, "D"),
                        n = t.ctrlKey || t.metaKey;
                        break;
                    default:
                        n = !1
                    }
                else
                    36 == t.keyCode && t.ctrlKey ? $.datepicker._showDatepicker(this) : n = !1;
                n && (t.preventDefault(),
                t.stopPropagation())
            },
            _doKeyPress: function(t) {
                var e = $.datepicker._getInst(t.target);
                if ($.datepicker._get(e, "constrainInput")) {
                    var n = $.datepicker._possibleChars($.datepicker._get(e, "dateFormat"))
                      , i = String.fromCharCode(t.charCode == undefined ? t.keyCode : t.charCode);
                    return t.ctrlKey || t.metaKey || " " > i || !n || n.indexOf(i) > -1
                }
            },
            _doKeyUp: function(t) {
                var e = $.datepicker._getInst(t.target);
                if (e.input.val() != e.lastVal)
                    try {
                        var n = $.datepicker.parseDate($.datepicker._get(e, "dateFormat"), e.input ? e.input.val() : null , $.datepicker._getFormatConfig(e));
                        n && ($.datepicker._setDateFromField(e),
                        $.datepicker._updateAlternate(e),
                        $.datepicker._updateDatepicker(e))
                    } catch (i) {
                        $.datepicker.log(i)
                    }
                return !0
            },
            _showDatepicker: function(t) {
                if (t = t.target || t,
                "input" != t.nodeName.toLowerCase() && (t = $("input", t.parentNode)[0]),
                !$.datepicker._isDisabledDatepicker(t) && $.datepicker._lastInput != t) {
                    var e = $.datepicker._getInst(t);
                    $.datepicker._curInst && $.datepicker._curInst != e && ($.datepicker._curInst.dpDiv.stop(!0, !0),
                    e && $.datepicker._datepickerShowing && $.datepicker._hideDatepicker($.datepicker._curInst.input[0]));
                    var n = $.datepicker._get(e, "beforeShow")
                      , i = n ? n.apply(t, [t, e]) : {};
                    if (i !== !1) {
                        extendRemove(e.settings, i),
                        e.lastVal = null ,
                        $.datepicker._lastInput = t,
                        $.datepicker._setDateFromField(e),
                        $.datepicker._inDialog && (t.value = ""),
                        $.datepicker._pos || ($.datepicker._pos = $.datepicker._findPos(t),
                        $.datepicker._pos[1] += t.offsetHeight);
                        var a = !1;
                        $(t).parents().each(function() {
                            return a |= "fixed" == $(this).css("position"),
                            !a
                        }
                        );
                        var s = {
                            left: $.datepicker._pos[0],
                            top: $.datepicker._pos[1]
                        };
                        if ($.datepicker._pos = null ,
                        e.dpDiv.empty(),
                        e.dpDiv.css({
                            position: "absolute",
                            display: "block",
                            top: "-1000px"
                        }),
                        $.datepicker._updateDatepicker(e),
                        s = $.datepicker._checkOffset(e, s, a),
                        e.dpDiv.css({
                            position: $.datepicker._inDialog && $.blockUI ? "static" : a ? "fixed" : "absolute",
                            display: "none",
                            left: s.left + "px",
                            top: s.top + "px"
                        }),
                        !e.inline) {
                            var o = $.datepicker._get(e, "showAnim")
                              , h = $.datepicker._get(e, "duration")
                              , r = function() {
                                var t = e.dpDiv.find("iframe.ui-datepicker-cover");
                                if (t.length) {
                                    var n = $.datepicker._getBorders(e.dpDiv);
                                    t.css({
                                        left: -n[0],
                                        top: -n[1],
                                        width: e.dpDiv.outerWidth(),
                                        height: e.dpDiv.outerHeight()
                                    })
                                }
                            }
                            ;
                            e.dpDiv.zIndex($(t).zIndex() + 1),
                            $.datepicker._datepickerShowing = !0,
                            $.effects && ($.effects.effect[o] || $.effects[o]) ? e.dpDiv.show(o, $.datepicker._get(e, "showOptions"), h, r) : e.dpDiv[o || "show"](o ? h : null , r),
                            o && h || r(),
                            e.input.is(":visible") && !e.input.is(":disabled") && e.input.focus(),
                            $.datepicker._curInst = e
                        }
                    }
                }
            },
            _updateDatepicker: function(t) {
                if (t.dpDiv.is(":visible")) {
                    this.maxRows = 4;
                    var e = $.datepicker._getBorders(t.dpDiv);
                    instActive = t,
                    t.dpDiv.empty().append(this._generateHTML(t)),
                    this._attachHandlers(t);
                    var n = t.dpDiv.find("iframe.ui-datepicker-cover");
                    n.length && n.css({
                        left: -e[0],
                        top: -e[1],
                        width: t.dpDiv.outerWidth(),
                        height: t.dpDiv.outerHeight()
                    }),
                    t.dpDiv.find("." + this._dayOverClass + " a").mouseover();
                    var i = this._getNumberOfMonths(t)
                      , a = i[1]
                      , s = 24.3;
                    if (t.dpDiv.removeClass("ui-datepicker-multi-2 ui-datepicker-multi-3 ui-datepicker-multi-4").width(""),
                    a > 1 && t.dpDiv.addClass("ui-datepicker-multi-" + a).css("width", s * a + "em"),
                    t.dpDiv[(1 != i[0] || 1 != i[1] ? "add" : "remove") + "Class"]("ui-datepicker-multi"),
                    t.dpDiv[(this._get(t, "isRTL") ? "add" : "remove") + "Class"]("ui-datepicker-rtl"),
                    t == $.datepicker._curInst && $.datepicker._datepickerShowing && t.input && t.input.is(":visible") && !t.input.is(":disabled") && t.input[0] != document.activeElement && t.input.focus(),
                    t.yearshtml) {
                        var o = t.yearshtml;
                        setTimeout(function() {
                            o === t.yearshtml && t.yearshtml && t.dpDiv.find("select.ui-datepicker-year:first").replaceWith(t.yearshtml),
                            o = t.yearshtml = null 
                        }
                        , 0)
                    }
                }
            },
            _getBorders: function(t) {
                var e = function(t) {
                    return {
                        thin: 1,
                        medium: 2,
                        thick: 3
                    }[t] || t
                }
                ;
                return [parseFloat(e(t.css("border-left-width"))), parseFloat(e(t.css("border-top-width")))]
            },
            _checkOffset: function(t, e, n) {
                var i = t.dpDiv.outerWidth()
                  , a = t.dpDiv.outerHeight()
                  , s = t.input ? t.input.outerWidth() : 0
                  , o = t.input ? t.input.outerHeight() : 0
                  , h = document.documentElement.clientWidth + (n ? 0 : $(document).scrollLeft())
                  , r = document.documentElement.clientHeight + (n ? 0 : $(document).scrollTop());
                return e.left -= this._get(t, "isRTL") ? i - s : 0,
                e.left -= n && e.left == t.input.offset().left ? $(document).scrollLeft() : 0,
                e.top -= n && e.top == t.input.offset().top + o ? $(document).scrollTop() : 0,
                e.left -= Math.min(e.left, e.left + i > h && h > i ? Math.abs(e.left + i - h) : 0),
                e.top -= Math.min(e.top, e.top + a > r && r > a ? Math.abs(a + o) : 0),
                e
            },
            _findPos: function(t) {
                for (var e = this._getInst(t), n = this._get(e, "isRTL"); t && ("hidden" == t.type || 1 != t.nodeType || $.expr.filters.hidden(t)); )
                    t = t[n ? "previousSibling" : "nextSibling"];
                var i = $(t).offset();
                return [i.left, i.top]
            },
            _hideDatepicker: function(t) {
                var e = this._curInst;
                if (e && (!t || e == $.data(t, PROP_NAME)) && this._datepickerShowing) {
                    var n = this._get(e, "showAnim")
                      , i = this._get(e, "duration")
                      , a = function() {
                        $.datepicker._tidyDialog(e)
                    }
                    ;
                    $.effects && ($.effects.effect[n] || $.effects[n]) ? e.dpDiv.hide(n, $.datepicker._get(e, "showOptions"), i, a) : e.dpDiv["slideDown" == n ? "slideUp" : "fadeIn" == n ? "fadeOut" : "hide"](n ? i : null , a),
                    n || a(),
                    this._datepickerShowing = !1;
                    var s = this._get(e, "onClose");
                    s && s.apply(e.input ? e.input[0] : null , [e.input ? e.input.val() : "", e]),
                    this._lastInput = null ,
                    this._inDialog && (this._dialogInput.css({
                        position: "absolute",
                        left: "0",
                        top: "-100px"
                    }),
                    $.blockUI && ($.unblockUI(),
                    $("body").append(this.dpDiv))),
                    this._inDialog = !1
                }
            },
            _tidyDialog: function(t) {
                t.dpDiv.removeClass(this._dialogClass).unbind(".ui-datepicker-calendar")
            },
            _checkExternalClick: function(t) {
                if ($.datepicker._curInst) {
                    var e = $(t.target)
                      , n = $.datepicker._getInst(e[0]);
                    (e[0].id != $.datepicker._mainDivId && 0 == e.parents("#" + $.datepicker._mainDivId).length && !e.hasClass($.datepicker.markerClassName) && !e.closest("." + $.datepicker._triggerClass).length && $.datepicker._datepickerShowing && (!$.datepicker._inDialog || !$.blockUI) || e.hasClass($.datepicker.markerClassName) && $.datepicker._curInst != n) && $.datepicker._hideDatepicker()
                }
            },
            _adjustDate: function(t, e, n) {
                var i = $(t)
                  , a = this._getInst(i[0]);
                this._isDisabledDatepicker(i[0]) || (this._adjustInstDate(a, e + ("M" == n ? this._get(a, "showCurrentAtPos") : 0), n),
                this._updateDatepicker(a))
            },
            _gotoToday: function(t) {
                var e = $(t)
                  , n = this._getInst(e[0]);
                if (this._get(n, "gotoCurrent") && n.currentDay)
                    n.selectedDay = n.currentDay,
                    n.drawMonth = n.selectedMonth = n.currentMonth,
                    n.drawYear = n.selectedYear = n.currentYear;
                else {
                    var i = new Date;
                    n.selectedDay = i.getDate(),
                    n.drawMonth = n.selectedMonth = i.getMonth(),
                    n.drawYear = n.selectedYear = i.getFullYear()
                }
                this._notifyChange(n),
                this._adjustDate(e)
            },
            _selectMonthYear: function(t, e, n) {
                var i = $(t)
                  , a = this._getInst(i[0]);
                a["selected" + ("M" == n ? "Month" : "Year")] = a["draw" + ("M" == n ? "Month" : "Year")] = parseInt(e.options[e.selectedIndex].value, 10),
                this._notifyChange(a),
                this._adjustDate(i)
            },
            _selectDay: function(t, e, n, i) {
                var a = $(t);
                if (!$(i).hasClass(this._unselectableClass) && !this._isDisabledDatepicker(a[0])) {
                    var s = this._getInst(a[0]);
                    s.selectedDay = s.currentDay = $("a", i).html().replace(/<.*>/g, ""),
                    s.selectedMonth = s.currentMonth = e,
                    s.selectedYear = s.currentYear = n,
                    this._selectDate(t, this._formatDate(s, s.currentDay, s.currentMonth, s.currentYear))
                }
            },
            _clearDate: function(t) {
                var e = $(t);
                this._getInst(e[0]),
                this._selectDate(e, "")
            },
            _selectDate: function(t, e) {
                var n = $(t)
                  , i = this._getInst(n[0]);
                e = null  != e ? e : this._formatDate(i),
                i.input && i.input.val(e),
                this._updateAlternate(i);
                var a = this._get(i, "onSelect");
                a ? a.apply(i.input ? i.input[0] : null , [e, i]) : i.input && i.input.trigger("change"),
                i.inline ? this._updateDatepicker(i) : (this._hideDatepicker(),
                this._lastInput = i.input[0],
                "object" != typeof i.input[0] && i.input.focus(),
                this._lastInput = null )
            },
            _updateAlternate: function(t) {
                var e = this._get(t, "altField");
                if (e) {
                    var n = this._get(t, "altFormat") || this._get(t, "dateFormat")
                      , i = this._getDate(t)
                      , a = this.formatDate(n, i, this._getFormatConfig(t));
                    $(e).each(function() {
                        $(this).val(a)
                    }
                    )
                }
            },
            noWeekends: function(t) {
                var e = t.getDay();
                return [e > 0 && 6 > e, ""]
            },
            iso8601Week: function(t) {
                var e = new Date(t.getTime());
                e.setDate(e.getDate() + 4 - (e.getDay() || 7));
                var n = e.getTime();
                return e.setMonth(0),
                e.setDate(1),
                Math.floor(Math.round((n - e) / 864e5) / 7) + 1
            },
            parseDate: function(t, e, n) {
                if (null  == t || null  == e)
                    throw "Invalid arguments";
                if (e = "object" == typeof e ? "" + e : e + "",
                "" == e)
                    return null ;
                var i = (n ? n.shortYearCutoff : null ) || this._defaults.shortYearCutoff;
                i = "string" != typeof i ? i : (new Date).getFullYear() % 100 + parseInt(i, 10);
                for (var a = (n ? n.dayNamesShort : null ) || this._defaults.dayNamesShort, s = (n ? n.dayNames : null ) || this._defaults.dayNames, o = (n ? n.monthNamesShort : null ) || this._defaults.monthNamesShort, h = (n ? n.monthNames : null ) || this._defaults.monthNames, r = -1, u = -1, l = -1, c = -1, g = !1, d = function(e) {
                    var n = t.length > m + 1 && t.charAt(m + 1) == e;
                    return n && m++,
                    n
                }
                , p = function(t) {
                    var n = d(t)
                      , i = "@" == t ? 14 : "!" == t ? 20 : "y" == t && n ? 4 : "o" == t ? 3 : 2
                      , a = RegExp("^\\d{1," + i + "}")
                      , s = e.substring(x).match(a);
                    if (!s)
                        throw "Missing number at position " + x;
                    return x += s[0].length,
                    parseInt(s[0], 10)
                }
                , y = function(t, n, i) {
                    var a = $.map(d(t) ? i : n, function(t, e) {
                        return [[e, t]]
                    }
                    ).sort(function(t, e) {
                        return -(t[1].length - e[1].length)
                    }
                    )
                      , s = -1;
                    if ($.each(a, function(t, n) {
                        var i = n[1];
                        return e.substr(x, i.length).toLowerCase() == i.toLowerCase() ? (s = n[0],
                        x += i.length,
                        !1) : undefined
                    }
                    ),
                    -1 != s)
                        return s + 1;
                    throw "Unknown name at position " + x
                }
                , f = function() {
                    if (e.charAt(x) != t.charAt(m))
                        throw "Unexpected literal at position " + x;
                    x++
                }
                , x = 0, m = 0; t.length > m; m++)
                    if (g)
                        "'" != t.charAt(m) || d("'") ? f() : g = !1;
                    else
                        switch (t.charAt(m)) {
                        case "d":
                            l = p("d");
                            break;
                        case "D":
                            y("D", a, s);
                            break;
                        case "o":
                            c = p("o");
                            break;
                        case "m":
                            u = p("m");
                            break;
                        case "M":
                            u = y("M", o, h);
                            break;
                        case "y":
                            r = p("y");
                            break;
                        case "@":
                            var b = new Date(p("@"));
                            r = b.getFullYear(),
                            u = b.getMonth() + 1,
                            l = b.getDate();
                            break;
                        case "!":
                            var b = new Date((p("!") - this._ticksTo1970) / 1e4);
                            r = b.getFullYear(),
                            u = b.getMonth() + 1,
                            l = b.getDate();
                            break;
                        case "'":
                            d("'") ? f() : g = !0;
                            break;
                        default:
                            f()
                        }
                if (e.length > x) {
                    var z = e.substr(x);
                    if (!/^\s+/.test(z))
                        throw "Extra/unparsed characters found in date: " + z
                }
                if (-1 == r ? r = (new Date).getFullYear() : 100 > r && (r += (new Date).getFullYear() - (new Date).getFullYear() % 100 + (i >= r ? 0 : -100)),
                c > -1)
                    for (u = 1,
                    l = c; ; ) {
                        var _ = this._getDaysInMonth(r, u - 1);
                        if (_ >= l)
                            break;
                        u++,
                        l -= _
                    }
                var b = this._daylightSavingAdjust(new Date(r,u - 1,l));
                if (b.getFullYear() != r || b.getMonth() + 1 != u || b.getDate() != l)
                    throw "Invalid date";
                return b
            },
            ATOM: "yy-mm-dd",
            COOKIE: "D, dd M yy",
            ISO_8601: "yy-mm-dd",
            RFC_822: "D, d M y",
            RFC_850: "DD, dd-M-y",
            RFC_1036: "D, d M y",
            RFC_1123: "D, d M yy",
            RFC_2822: "D, d M yy",
            RSS: "D, d M y",
            TICKS: "!",
            TIMESTAMP: "@",
            W3C: "yy-mm-dd",
            _ticksTo1970: 864e9 * (718685 + Math.floor(492.5) - Math.floor(19.7) + Math.floor(4.925)),
            formatDate: function(t, e, n) {
                if (!e)
                    return "";
                var i = (n ? n.dayNamesShort : null ) || this._defaults.dayNamesShort
                  , a = (n ? n.dayNames : null ) || this._defaults.dayNames
                  , s = (n ? n.monthNamesShort : null ) || this._defaults.monthNamesShort
                  , o = (n ? n.monthNames : null ) || this._defaults.monthNames
                  , h = function(e) {
                    var n = t.length > g + 1 && t.charAt(g + 1) == e;
                    return n && g++,
                    n
                }
                  , r = function(t, e, n) {
                    var i = "" + e;
                    if (h(t))
                        for (; n > i.length; )
                            i = "0" + i;
                    return i
                }
                  , u = function(t, e, n, i) {
                    return h(t) ? i[e] : n[e]
                }
                  , l = ""
                  , c = !1;
                if (e)
                    for (var g = 0; t.length > g; g++)
                        if (c)
                            "'" != t.charAt(g) || h("'") ? l += t.charAt(g) : c = !1;
                        else
                            switch (t.charAt(g)) {
                            case "d":
                                l += r("d", e.getDate(), 2);
                                break;
                            case "D":
                                l += u("D", e.getDay(), i, a);
                                break;
                            case "o":
                                l += r("o", Math.round((new Date(e.getFullYear(),e.getMonth(),e.getDate()).getTime() - new Date(e.getFullYear(),0,0).getTime()) / 864e5), 3);
                                break;
                            case "m":
                                l += r("m", e.getMonth() + 1, 2);
                                break;
                            case "M":
                                l += u("M", e.getMonth(), s, o);
                                break;
                            case "y":
                                l += h("y") ? e.getFullYear() : (10 > e.getYear() % 100 ? "0" : "") + e.getYear() % 100;
                                break;
                            case "@":
                                l += e.getTime();
                                break;
                            case "!":
                                l += 1e4 * e.getTime() + this._ticksTo1970;
                                break;
                            case "'":
                                h("'") ? l += "'" : c = !0;
                                break;
                            default:
                                l += t.charAt(g)
                            }
                return l
            },
            _possibleChars: function(t) {
                for (var e = "", n = !1, i = function(e) {
                    var n = t.length > a + 1 && t.charAt(a + 1) == e;
                    return n && a++,
                    n
                }
                , a = 0; t.length > a; a++)
                    if (n)
                        "'" != t.charAt(a) || i("'") ? e += t.charAt(a) : n = !1;
                    else
                        switch (t.charAt(a)) {
                        case "d":
                        case "m":
                        case "y":
                        case "@":
                            e += "0123456789";
                            break;
                        case "D":
                        case "M":
                            return null ;
                        case "'":
                            i("'") ? e += "'" : n = !0;
                            break;
                        default:
                            e += t.charAt(a)
                        }
                return e
            },
            _get: function(t, e) {
                return t.settings[e] !== undefined ? t.settings[e] : this._defaults[e]
            },
            _setDateFromField: function(t, e) {
                if (t.input.val() != t.lastVal) {
                    var n, i, a = this._get(t, "dateFormat"), s = t.lastVal = t.input ? t.input.val() : null ;
                    n = i = this._getDefaultDate(t);
                    var o = this._getFormatConfig(t);
                    try {
                        n = this.parseDate(a, s, o) || i
                    } catch (h) {
                        this.log(h),
                        s = e ? "" : s
                    }
                    t.selectedDay = n.getDate(),
                    t.drawMonth = t.selectedMonth = n.getMonth(),
                    t.drawYear = t.selectedYear = n.getFullYear(),
                    t.currentDay = s ? n.getDate() : 0,
                    t.currentMonth = s ? n.getMonth() : 0,
                    t.currentYear = s ? n.getFullYear() : 0,
                    this._adjustInstDate(t)
                }
            },
            _getDefaultDate: function(t) {
                return this._restrictMinMax(t, this._determineDate(t, this._get(t, "defaultDate"), new Date))
            },
            _determineDate: function(t, e, n) {
                var i = function(t) {
                    var e = new Date;
                    return e.setDate(e.getDate() + t),
                    e
                }
                  , a = function(e) {
                    try {
                        return $.datepicker.parseDate($.datepicker._get(t, "dateFormat"), e, $.datepicker._getFormatConfig(t))
                    } catch (n) {}
                    for (var i = (e.toLowerCase().match(/^c/) ? $.datepicker._getDate(t) : null ) || new Date, a = i.getFullYear(), s = i.getMonth(), o = i.getDate(), h = /([+-]?[0-9]+)\s*(d|D|w|W|m|M|y|Y)?/g, r = h.exec(e); r; ) {
                        switch (r[2] || "d") {
                        case "d":
                        case "D":
                            o += parseInt(r[1], 10);
                            break;
                        case "w":
                        case "W":
                            o += 7 * parseInt(r[1], 10);
                            break;
                        case "m":
                        case "M":
                            s += parseInt(r[1], 10),
                            o = Math.min(o, $.datepicker._getDaysInMonth(a, s));
                            break;
                        case "y":
                        case "Y":
                            a += parseInt(r[1], 10),
                            o = Math.min(o, $.datepicker._getDaysInMonth(a, s))
                        }
                        r = h.exec(e)
                    }
                    return new Date(a,s,o)
                }
                  , s = null  == e || "" === e ? n : "string" == typeof e ? a(e) : "number" == typeof e ? isNaN(e) ? n : i(e) : new Date(e.getTime());
                return s = s && "Invalid Date" == "" + s ? n : s,
                s && (s.setHours(0),
                s.setMinutes(0),
                s.setSeconds(0),
                s.setMilliseconds(0)),
                this._daylightSavingAdjust(s)
            },
            _daylightSavingAdjust: function(t) {
                return t ? (t.setHours(t.getHours() > 12 ? t.getHours() + 2 : 0),
                t) : null 
            },
            _setDate: function(t, e, n) {
                var i = !e
                  , a = t.selectedMonth
                  , s = t.selectedYear
                  , o = this._restrictMinMax(t, this._determineDate(t, e, new Date));
                t.selectedDay = t.currentDay = o.getDate(),
                t.drawMonth = t.selectedMonth = t.currentMonth = o.getMonth(),
                t.drawYear = t.selectedYear = t.currentYear = o.getFullYear(),
                a == t.selectedMonth && s == t.selectedYear || n || this._notifyChange(t),
                this._adjustInstDate(t),
                t.input && t.input.val(i ? "" : this._formatDate(t))
            },
            _getDate: function(t) {
                var e = !t.currentYear || t.input && "" == t.input.val() ? null  : this._daylightSavingAdjust(new Date(t.currentYear,t.currentMonth,t.currentDay));
                return e
            },
            _attachHandlers: function(t) {
                var e = this._get(t, "stepMonths")
                  , n = "#" + t.id.replace(/\\\\/g, "\\");
                t.dpDiv.find("[data-handler]").map(function() {
                    var t = {
                        prev: function() {
                            window["DP_jQuery_" + dpuuid].datepicker._adjustDate(n, -e, "M")
                        },
                        next: function() {
                            window["DP_jQuery_" + dpuuid].datepicker._adjustDate(n, +e, "M")
                        },
                        hide: function() {
                            window["DP_jQuery_" + dpuuid].datepicker._hideDatepicker()
                        },
                        today: function() {
                            window["DP_jQuery_" + dpuuid].datepicker._gotoToday(n)
                        },
                        selectDay: function() {
                            return window["DP_jQuery_" + dpuuid].datepicker._selectDay(n, +this.getAttribute("data-month"), +this.getAttribute("data-year"), this),
                            !1
                        },
                        selectMonth: function() {
                            return window["DP_jQuery_" + dpuuid].datepicker._selectMonthYear(n, this, "M"),
                            !1
                        },
                        selectYear: function() {
                            return window["DP_jQuery_" + dpuuid].datepicker._selectMonthYear(n, this, "Y"),
                            !1
                        }
                    };
                    $(this).bind(this.getAttribute("data-event"), t[this.getAttribute("data-handler")])
                }
                )
            },
            _generateHTML: function(t) {
                var e = new Date;
                e = this._daylightSavingAdjust(new Date(e.getFullYear(),e.getMonth(),e.getDate()));
                var n = this._get(t, "isRTL")
                  , i = this._get(t, "showButtonPanel")
                  , a = this._get(t, "hideIfNoPrevNext")
                  , s = this._get(t, "navigationAsDateFormat")
                  , o = this._getNumberOfMonths(t)
                  , h = this._get(t, "showCurrentAtPos")
                  , r = this._get(t, "stepMonths")
                  , u = 1 != o[0] || 1 != o[1]
                  , l = this._daylightSavingAdjust(t.currentDay ? new Date(t.currentYear,t.currentMonth,t.currentDay) : new Date(9999,9,9))
                  , c = this._getMinMaxDate(t, "min")
                  , g = this._getMinMaxDate(t, "max")
                  , d = t.drawMonth - h
                  , p = t.drawYear;
                if (0 > d && (d += 12,
                p--),
                g) {
                    var y = this._daylightSavingAdjust(new Date(g.getFullYear(),g.getMonth() - o[0] * o[1] + 1,g.getDate()));
                    for (y = c && c > y ? c : y; this._daylightSavingAdjust(new Date(p,d,1)) > y; )
                        d--,
                        0 > d && (d = 11,
                        p--)
                }
                t.drawMonth = d,
                t.drawYear = p;
                var f = this._get(t, "prevText");
                f = s ? this.formatDate(f, this._daylightSavingAdjust(new Date(p,d - r,1)), this._getFormatConfig(t)) : f;
                var x = this._canAdjustMonth(t, -1, p, d) ? '<a class="ui-datepicker-prev ui-corner-all" data-handler="prev" data-event="click" title="' + f + '"><span class="ui-icon ui-icon-circle-triangle-' + (n ? "e" : "w") + '">' + f + "</span></a>" : a ? "" : '<a class="ui-datepicker-prev ui-corner-all ui-state-disabled" title="' + f + '"><span class="ui-icon ui-icon-circle-triangle-' + (n ? "e" : "w") + '">' + f + "</span></a>"
                  , m = this._get(t, "nextText");
                m = s ? this.formatDate(m, this._daylightSavingAdjust(new Date(p,d + r,1)), this._getFormatConfig(t)) : m;
                var b = this._canAdjustMonth(t, 1, p, d) ? '<a class="ui-datepicker-next ui-corner-all" data-handler="next" data-event="click" title="' + m + '"><span class="ui-icon ui-icon-circle-triangle-' + (n ? "w" : "e") + '">' + m + "</span></a>" : a ? "" : '<a class="ui-datepicker-next ui-corner-all ui-state-disabled" title="' + m + '"><span class="ui-icon ui-icon-circle-triangle-' + (n ? "w" : "e") + '">' + m + "</span></a>"
                  , z = this._get(t, "currentText")
                  , _ = this._get(t, "gotoCurrent") && t.currentDay ? l : e;
                z = s ? this.formatDate(z, _, this._getFormatConfig(t)) : z;
                var D = t.inline ? "" : '<button type="button" class="ui-datepicker-close ui-state-default ui-priority-primary ui-corner-all" data-handler="hide" data-event="click">' + this._get(t, "closeText") + "</button>"
                  , j = i ? '<div class="ui-datepicker-buttonpane ui-widget-content">' + (n ? D : "") + (this._isInRange(t, _) ? '<button type="button" class="ui-datepicker-current ui-state-default ui-priority-secondary ui-corner-all" data-handler="today" data-event="click">' + z + "</button>" : "") + (n ? "" : D) + "</div>" : ""
                  , w = parseInt(this._get(t, "firstDay"), 10);
                w = isNaN(w) ? 0 : w;
                var v = this._get(t, "showWeek")
                  , T = this._get(t, "dayNames");
                this._get(t, "dayNamesShort");
                var k = this._get(t, "dayNamesMin")
                  , S = this._get(t, "monthNames")
                  , H = this._get(t, "monthNamesShort")
                  , C = this._get(t, "beforeShowDay")
                  , N = this._get(t, "showOtherMonths")
                  , Y = this._get(t, "selectOtherMonths");
                this._get(t, "calculateWeek") || this.iso8601Week;
                for (var M = this._getDefaultDate(t), P = "", L = 0; o[0] > L; L++) {
                    var B = "";
                    this.maxRows = 4;
                    for (var W = 0; o[1] > W; W++) {
                        var F = this._daylightSavingAdjust(new Date(p,d,t.selectedDay))
                          , Q = " ui-corner-all"
                          , q = "";
                        if (u) {
                            if (q += '<div class="ui-datepicker-group',
                            o[1] > 1)
                                switch (W) {
                                case 0:
                                    q += " ui-datepicker-group-first",
                                    Q = " ui-corner-" + (n ? "right" : "left");
                                    break;
                                case o[1] - 1:
                                    q += " ui-datepicker-group-last",
                                    Q = " ui-corner-" + (n ? "left" : "right");
                                    break;
                                default:
                                    q += " ui-datepicker-group-middle",
                                    Q = ""
                                }
                            q += '">'
                        }
                        q += '<div class="ui-datepicker-header ui-widget-header ui-helper-clearfix' + Q + '">' + (/all|left/.test(Q) && 0 == L ? n ? b : x : "") + (/all|right/.test(Q) && 0 == L ? n ? x : b : "") + this._generateMonthYearHeader(t, d, p, c, g, L > 0 || W > 0, S, H) + '</div><table class="ui-datepicker-calendar"><thead>' + "<tr>";
                        for (var J = v ? '<th class="ui-datepicker-week-col">' + this._get(t, "weekHeader") + "</th>" : "", X = 0; 7 > X; X++) {
                            var Z = (X + w) % 7;
                            J += "<th" + ((X + w + 6) % 7 >= 5 ? ' class="ui-datepicker-week-end"' : "") + ">" + '<span title="' + T[Z] + '">' + k[Z] + "</span></th>"
                        }
                        q += J + "</tr></thead><tbody>";
                        var A = this._getDaysInMonth(p, d);
                        p == t.selectedYear && d == t.selectedMonth && (t.selectedDay = Math.min(t.selectedDay, A));
                        var G = (this._getFirstDayOfMonth(p, d) - w + 7) % 7
                          , E = Math.ceil((G + A) / 7)
                          , K = u ? this.maxRows > E ? this.maxRows : E : E;
                        this.maxRows = K;
                        for (var O = this._daylightSavingAdjust(new Date(p,d,1 - G)), R = 0; K > R; R++) {
                            q += "<tr>";
                            for (var I = v ? '<td class="ui-datepicker-week-col">' + this._get(t, "calculateWeek")(O) + "</td>" : "", X = 0; 7 > X; X++) {
                                var V = C ? C.apply(t.input ? t.input[0] : null , [O]) : [!0, ""]
                                  , U = O.getMonth() != d
                                  , te = U && !Y || !V[0] || c && c > O || g && O > g
                                  , ee = LunarDate.GetLunarDay(O)
                                  , ne = new Date(O.getTime());
                                ne.setDate(O.getDate() + 1);
                                var ie = "春节" == LunarDate.GetLunarDay(ne).day ? "除夕" : ee.day
                                  , ae = "";
                                ("春节" == ie || "除夕" == ie) && (ae = "chunjie"),
                                "春节" == ee.month && "初二初三初四初五初六".indexOf(ie) > -1 && (ae = "jiejiari"),
                                I += '<td class="' + ((X + w + 6) % 7 >= 5 ? " ui-datepicker-week-end" : "") + (U ? " ui-datepicker-other-month" : "") + (O.getTime() == F.getTime() && d == t.selectedMonth && t._keyEvent || M.getTime() == O.getTime() && M.getTime() == F.getTime() ? " " + this._dayOverClass : "") + (te ? " " + this._unselectableClass + " ui-state-disabled" : "") + (U && !N ? "" : " " + V[1] + (O.getTime() == l.getTime() ? " " + this._currentClass : "") + (O.getTime() == e.getTime() ? " ui-datepicker-today" : "")) + '"' + (U && !N || !V[2] ? "" : ' title="' + V[2] + '"') + (te ? "" : ' data-handler="selectDay" data-event="click" data-month="' + O.getMonth() + '" data-year="' + O.getFullYear() + '"') + ">" + (U && !N ? "&#xa0;" : te ? '<span class="ui-state-default">' + O.getDate() + '<div class="lunar ' + ae + '">' + ie + "</div></span>" : '<a class="ui-state-default' + (O.getTime() == e.getTime() ? " ui-state-highlight" : "") + (O.getTime() == l.getTime() ? " ui-state-active" : "") + (U ? " ui-priority-secondary" : "") + '" href="#">' + O.getDate() + '<div class="lunar ' + ae + '">' + ie + "</div></a>") + "</td>",
                                O.setDate(O.getDate() + 1),
                                O = this._daylightSavingAdjust(O)
                            }
                            q += I + "</tr>"
                        }
                        d++,
                        d > 11 && (d = 0,
                        p++),
                        q += "</tbody></table>" + (u ? "</div>" + (o[0] > 0 && W == o[1] - 1 ? '<div class="ui-datepicker-row-break"></div>' : "") : ""),
                        B += q
                    }
                    P += B
                }
                return P += j + ($.ui.ie6 && !t.inline ? '<iframe src="javascript:false;" class="ui-datepicker-cover" frameborder="0"></iframe>' : ""),
                t._keyEvent = !1,
                P
            },
            _generateMonthYearHeader: function(t, e, n, i, a, s, o, h) {
                var r = this._get(t, "changeMonth")
                  , u = this._get(t, "changeYear")
                  , l = this._get(t, "showMonthAfterYear")
                  , c = '<div class="ui-datepicker-title">'
                  , g = "";
                if (s || !r)
                    g += '<span class="ui-datepicker-month">' + o[e] + "</span>";
                else {
                    var d = i && i.getFullYear() == n
                      , p = a && a.getFullYear() == n;
                    g += '<select class="ui-datepicker-month" data-handler="selectMonth" data-event="change">';
                    for (var y = 0; 12 > y; y++)
                        (!d || y >= i.getMonth()) && (!p || a.getMonth() >= y) && (g += '<option value="' + y + '"' + (y == e ? ' selected="selected"' : "") + ">" + h[y] + "</option>");
                    g += "</select>"
                }
                if (l || (c += g + (!s && r && u ? "" : "&#xa0;")),
                !t.yearshtml)
                    if (t.yearshtml = "",
                    s || !u)
                        c += '<span class="ui-datepicker-year">' + n + "</span>";
                    else {
                        var f = this._get(t, "yearRange").split(":")
                          , x = (new Date).getFullYear()
                          , m = function(t) {
                            var e = t.match(/c[+-].*/) ? n + parseInt(t.substring(1), 10) : t.match(/[+-].*/) ? x + parseInt(t, 10) : parseInt(t, 10);
                            return isNaN(e) ? x : e
                        }
                          , b = m(f[0])
                          , z = Math.max(b, m(f[1] || ""));
                        for (b = i ? Math.max(b, i.getFullYear()) : b,
                        z = a ? Math.min(z, a.getFullYear()) : z,
                        t.yearshtml += '<select class="ui-datepicker-year" data-handler="selectYear" data-event="change">'; z >= b; b++)
                            t.yearshtml += '<option value="' + b + '"' + (b == n ? ' selected="selected"' : "") + ">" + b + "</option>";
                        t.yearshtml += "</select>",
                        c += t.yearshtml,
                        t.yearshtml = null 
                    }
                return c += this._get(t, "yearSuffix"),
                l && (c += (!s && r && u ? "" : "&#xa0;") + g),
                c += "</div>"
            },
            _adjustInstDate: function(t, e, n) {
                var i = t.drawYear + ("Y" == n ? e : 0)
                  , a = t.drawMonth + ("M" == n ? e : 0)
                  , s = Math.min(t.selectedDay, this._getDaysInMonth(i, a)) + ("D" == n ? e : 0)
                  , o = this._restrictMinMax(t, this._daylightSavingAdjust(new Date(i,a,s)));
                t.selectedDay = o.getDate(),
                t.drawMonth = t.selectedMonth = o.getMonth(),
                t.drawYear = t.selectedYear = o.getFullYear(),
                ("M" == n || "Y" == n) && this._notifyChange(t)
            },
            _restrictMinMax: function(t, e) {
                var n = this._getMinMaxDate(t, "min")
                  , i = this._getMinMaxDate(t, "max")
                  , a = n && n > e ? n : e;
                return a = i && a > i ? i : a
            },
            _notifyChange: function(t) {
                var e = this._get(t, "onChangeMonthYear");
                e && e.apply(t.input ? t.input[0] : null , [t.selectedYear, t.selectedMonth + 1, t])
            },
            _getNumberOfMonths: function(t) {
                var e = this._get(t, "numberOfMonths");
                return null  == e ? [1, 1] : "number" == typeof e ? [1, e] : e
            },
            _getMinMaxDate: function(t, e) {
                return this._determineDate(t, this._get(t, e + "Date"), null )
            },
            _getDaysInMonth: function(t, e) {
                return 32 - this._daylightSavingAdjust(new Date(t,e,32)).getDate()
            },
            _getFirstDayOfMonth: function(t, e) {
                return new Date(t,e,1).getDay()
            },
            _canAdjustMonth: function(t, e, n, i) {
                var a = this._getNumberOfMonths(t)
                  , s = this._daylightSavingAdjust(new Date(n,i + (0 > e ? e : a[0] * a[1]),1));
                return 0 > e && s.setDate(this._getDaysInMonth(s.getFullYear(), s.getMonth())),
                this._isInRange(t, s)
            },
            _isInRange: function(t, e) {
                var n = this._getMinMaxDate(t, "min")
                  , i = this._getMinMaxDate(t, "max");
                return (!n || e.getTime() >= n.getTime()) && (!i || e.getTime() <= i.getTime())
            },
            _getFormatConfig: function(t) {
                var e = this._get(t, "shortYearCutoff");
                return e = "string" != typeof e ? e : (new Date).getFullYear() % 100 + parseInt(e, 10),
                {
                    shortYearCutoff: e,
                    dayNamesShort: this._get(t, "dayNamesShort"),
                    dayNames: this._get(t, "dayNames"),
                    monthNamesShort: this._get(t, "monthNamesShort"),
                    monthNames: this._get(t, "monthNames")
                }
            },
            _formatDate: function(t, e, n, i) {
                e || (t.currentDay = t.selectedDay,
                t.currentMonth = t.selectedMonth,
                t.currentYear = t.selectedYear);
                var a = e ? "object" == typeof e ? e : this._daylightSavingAdjust(new Date(i,n,e)) : this._daylightSavingAdjust(new Date(t.currentYear,t.currentMonth,t.currentDay));
                return this.formatDate(this._get(t, "dateFormat"), a, this._getFormatConfig(t))
            }
        }),
        $.fn.datepicker = function(t) {
            if (!this.length)
                return this;
            $.datepicker.initialized || ($(document).mousedown($.datepicker._checkExternalClick).find(document.body).append($.datepicker.dpDiv),
            $.datepicker.initialized = !0);
            var e = Array.prototype.slice.call(arguments, 1);
            return "string" != typeof t || "isDisabled" != t && "getDate" != t && "widget" != t ? "option" == t && 2 == arguments.length && "string" == typeof arguments[1] ? $.datepicker["_" + t + "Datepicker"].apply($.datepicker, [this[0]].concat(e)) : this.each(function() {
                "string" == typeof t ? $.datepicker["_" + t + "Datepicker"].apply($.datepicker, [this].concat(e)) : $.datepicker._attachDatepicker(this, t)
            }
            ) : $.datepicker["_" + t + "Datepicker"].apply($.datepicker, [this[0]].concat(e))
        }
        ,
        $.datepicker = new Datepicker,
        $.datepicker.initialized = !1,
        $.datepicker.uuid = (new Date).getTime(),
        $.datepicker.version = "1.9.2",
        window["DP_jQuery_" + dpuuid] = $
    }
    (jQuery)
}
);
"use strict";
define("./widgets/identity/identity", ["./../config/config", "./../passenger/passenger", "./../trainList/index"], function(t, e, n) {
    var i = i || {}
      , a = t("./../config/config");
    t("./../passenger/passenger");
    var s = t("./../trainList/index")
      , o = null 
      , h = "ADULT";
    !function(t) {
        t.storageKey = "purpose_codes",
        t.init = function(e, n) {
            e = e || ".passenger-identity",
            n = n || a.get(t.storageKey) || "ADULT",
            h = n,
            o = $(e),
            o.off("change").on("change", function() {
                var e = this.checked ? $(this).val() : "ADULT";
                $(document).trigger("identitychange", e),
                h = e,
                a.setByKey(t.storageKey, e),
                s.addFilter("student", e),
                s.show()
            }
            ),
            $(e + "[value=" + n + "]").attr("checked", "checked"),
            s.addFilter("student", n)
        }
    }
    (i),
    Object.preventExtensions(i),
    n.exports = i
}
);
"use strict";
define("./widgets/passenger/passenger", ["./../config/config", "./../panel/panel", "./../window/window", "./../login/login", "./../brush/brush", "../../interfaces/getPassengerDTOs"], function(e, t, n) {
    var i = function() {}
      , a = {}
      , s = e("./../config/config")
      , o = e("./../panel/panel")
      , h = e("./../window/window")
      , r = e("./../login/login")
      , u = e("./../brush/brush")
      , l = e("../../interfaces/getPassengerDTOs")
      , c = +new Date
      , g = 36e5
      , d = []
      , p = []
      , y = !1
      , f = null 
      , x = null 
      , m = "ADULT"
      , b = !1
      , z = {
        title: "添加乘客",
        empty: !0,
        error: !1,
        items: []
    };
    !function(e) {
        function t(e, t) {
            t.split("");
            for (var n = [], i = 0, a = 0; a < e.length; a++) {
                var s = t.charCodeAt(i);
                isNaN(s) && (i = 0,
                s = t.charCodeAt(i)),
                n.push(String.fromCharCode(e.charCodeAt(a) ^ s)),
                i++
            }
            return n.join("")
        }
        function n(n, i) {
            var a = JSON.parse(JSON.stringify(i || []))
              , o = [];
            a.forEach(function(e) {
                var t = {};
                t.passenger_id_no_md5 = e.passenger_id_no_md5,
                t.passenger_name = e.passenger_name,
                t.checked = e.checked,
                t.priority = e.priority,
                t.passenger_type_name = e.passenger_type_name,
                t.passenger_id_type_code = e.passenger_id_type_code,
                o.push(t)
            }
            ),
            s.setByKey(e.storageKey, Base64.encode(t(JSON.stringify(a), N)))
        }
        function a(t, i) {
            var a = t.normal_passengers;
            if (t.dj_passengers,
            a instanceof Array) {
                var s = [];
                a.forEach(function(e) {
                    var t = !1
                      , n = null 
                      , i = e.passenger_id_no;
                    i += e.passenger_type_name,
                    i += e.passenger_id_type_code,
                    i += e.passenger_name;
                    for (var a = hex_md5(i), o = 0; o < d.length; o++)
                        if (n = d[o],
                        n.passenger_id_no_md5 === a || n.passenger_id_no_md5 === hex_md5(e.passenger_id_no)) {
                            e.passenger_id_no_md5 = a,
                            e.checked = n.checked,
                            e.priority = n.priority,
                            s.push(e),
                            t = !0;
                            break
                        }
                    t || (e.passenger_id_no_md5 = a,
                    e.checked = !1,
                    s.push(e))
                }
                ),
                d = s
            }
            n(e.storageKey, d),
            j(i)
        }
        function _(e) {
            x = null ,
            l({
                success: function(t) {
                    t.data && "" === t.data.exMsg ? (x = null ,
                    a(t.data, e)) : (x = {
                        errno: -1,
                        errmsg: t.data && t.data.exMsg || "请求失败"
                    },
                    j(e))
                },
                error: function(t, n) {
                    x = {
                        errno: -1,
                        errmsg: n
                    },
                    j(e)
                }
            })
        }
        function D(t, i, a) {
            for (var o = 0; o < d.length; o++) {
                var h = d[o];
                if (h.passenger_id_no_md5 === t) {
                    h.checked = i,
                    h.priority = a,
                    d[o] = h;
                    break
                }
            }
            for (var o = 0; o < p.length; o++)
                p[o].id === t && p.splice(o--, 1);
            S(),
            n(e.storageKey, d),
            s.setByKey(e.childrenStorageKey, p)
        }
        function j(t) {
            t = t || i,
            z.items = [];
            var n = s.get(e.studentToAdultStorageKey) || !1;
            d.forEach(function(e) {
                var t = "成人" === e.passenger_type_name
                  , n = "学生" === e.passenger_type_name
                  , i = "2" === e.passenger_id_type_code
                  , a = !n && "0X00" === m
                  , s = e.passenger_name;
                s += i && !t ? "（一代，" + e.passenger_type_name + "）" : i ? "（一代）" : t ? "" : "（" + e.passenger_type_name + "）";
                var o = {
                    id: e.passenger_id_no_md5,
                    text: s,
                    checked: e.checked || !1,
                    disabled: a ? "disabled" : "",
                    priority: e.priority
                };
                z.items.push(o)
            }
            ),
            z.empty = 0 === d.length,
            z.children = p,
            z.studentToAdult = n ? "checked" : "",
            t(z)
        }
        function w(e, t) {
            j(i);
            var n = JSON.parse(JSON.stringify(z))
              , a = e.train
              , s = e.seat
              , o = a && s ? +s.tickets : 5;
            o = isNaN(o) || o >= 5 ? 5 : o,
            n.items.forEach(function(e) {
                e.checked = e.checked ? "checked" : ""
            }
            );
            var r = a && s ? a.number + " - " + s.name + "(" + s.tickets + (isNaN(+s.tickets) ? "票" : "张") + ")，请选择乘客" : "选择乘客"
              , l = new window.t($("#select_passenger_template").html())
              , c = $('<div id="select_passenger_panel"></div>').html(l.render({
                info: n
            }))
              , g = {
                title: r,
                content: c,
                btns: ["apply", "close"],
                callback: function(e) {
                    if (c.is(":visible")) {
                        var n = v();
                        "apply" === e.type && n.length > 0 ? t(null , n) : u.stop()
                    }
                },
                block: !0
            };
            h.open(g),
            c = $("#select_passenger_panel"),
            $("#student_identity").is(":checked") && c.find(".ch-content").css("position", "relative").prepend($('<span class="cd-tips">当前选择了刷学生票，乘车人只能是学生</span>').css({
                position: "absolute",
                left: "12px",
                top: "-30px"
            }));
            var d = c.find("input[type=checkbox]:checked").length;
            h.disableBtn(["apply"], d > o || 0 === d),
            c.find("input[type=checkbox]").on("change", function() {
                var e = $(this).attr("id")
                  , t = $(this).is(":checked");
                d = c.find("input[type=checkbox]:checked").length,
                t && d > o ? $(this).attr("checked", !1) : (h.disableBtn(["apply"], d > o || 0 === d),
                f.update(e, t))
            }
            )
        }
        function v(e) {
            var t = [];
            return d.forEach(function(n) {
                n.checked && (e || n.passenger_id_no) && t.push(n)
            }
            ),
            t
        }
        function T(e, t) {
            t = t || i;
            var n = v()
              , a = e.seat;
            e.train;
            for (var s = a ? a.tickets : 0 / 0, o = 0; o < p.length; o++) {
                var h = p[o];
                h.passenger_id_no = "",
                d.forEach(function(e) {
                    e.passenger_id_no_md5 === h.passenger_id_no_md5 && (h.passenger_id_no = e.passenger_id_no)
                }
                ),
                h.passenger_id_no ? p[o] = h : p.splice(o--, 1)
            }
            n = n.concat(p),
            x = 0 === n.length ? x : null ,
            !x && d.length > 0 && (0 === n.length || !isNaN(+s) && +s < n.length) ? w(e, t) : t(x, n)
        }
        function k(e) {
            for (var t = null , n = /成人|学生/g, i = e.length - 1; i >= 0; i--) {
                var a = e[i];
                if (a.passenger_type_name.match(n)) {
                    t = a;
                    break
                }
            }
            return t
        }
        function S() {
            var e = d.some(function(e) {
                return e.checked && e.passenger_type_name.match(/学生|成人/g)
            }
            )
              , t = $(".add-children-btn");
            e ? t.show() : t.hide()
        }
        function H(t) {
            t = t || 0,
            b = !0;
            var n = v();
            if (n.length + p.length >= 5)
                return b = !1,
                alert("最多只能选： 5个乘客！"),
                void 0;
            var i = k(n);
            if (!i)
                return t++ < 5 ? _(function() {
                    H(t)
                }
                ) : (b = !1,
                alert("添加乘客失败")),
                void 0;
            b = !1;
            var a = JSON.parse(JSON.stringify(i));
            p.passenger_id_no_md5 = hex_md5(Math.random().toString()),
            a.id = p.passenger_id_no_md5,
            a.checked = !0,
            a.isChild = !0,
            a.passenger_type = "2",
            p.push(a),
            f.refresh(),
            s.setByKey(e.childrenStorageKey, p)
        }
        e.storageKey = "passengers",
        e.childrenStorageKey = "childrenPassengers",
        e.studentToAdultStorageKey = "studentToAdult";
        var N = "0Ji&7Jf*0Af&5Tp@";
        e.getSelectedPassengers = function(e, t, n) {
            return y = d.length > 0 && void 0 !== d[0].passenger_id_no,
            y && n !== !0 || "online" != r.getStatus().status ? (T(e, t),
            !1) : (_(function() {
                T(e, t)
            }
            ),
            !0)
        }
        ,
        e.getSelectedPassengersCache = function(e) {
            return v(e)
        }
        ,
        e.refresh = function(e, t) {
            e = e || i;
            var n = +new Date
              , a = n - c > g;
            return a || t === !0 ? (c = n,
            _(e)) : j(function(t) {
                "online" == r.getStatus().status && t.empty ? (c = n,
                _(e)) : e(t)
            }
            ),
            d
        }
        ,
        e.init = function(n) {
            if (p = s.get(e.childrenStorageKey) || [],
            d = s.get(e.storageKey) || [],
            "string" == typeof d)
                try {
                    d = t(Base64.decode(d), N),
                    d = JSON.parse(d)
                } catch (a) {
                    d = []
                }
            j(i),
            n = n || {},
            n.update = D,
            n.refresh = e.refresh,
            n.info = z,
            n.info.studentToAdult = s.get(e.studentToAdultStorageKey) || !1,
            n.targetSelector = n.targetSelector || ".btn-passenger",
            n.panelSelector = n.panelSelector || "#passenger_panel",
            n.containerSelector = n.containerSelector || "#passenger_container",
            n.tplSelector = n.tplSelector || "#check_passenger_panel_tpl",
            n.highlight = n.highlight || "panel-selected-highlight",
            n.emptyMsg = n.emptyMsg || "提前选择乘车人，有效提高抢票成功率。一次购票最多选择5名乘客",
            f = f || new o,
            f.init(n),
            S()
        }
        ,
        $(document).on("identitychange", function(e, t) {
            m = "ADULT",
            "0X00" === t && (m = t,
            d.forEach(function(e) {
                e.checked && -1 === e.passenger_type_name.indexOf("学生") && f.update(e.passenger_id_no_md5, !1)
            }
            )),
            f.refresh()
        }
        ).on("click", ".add-children-btn", function() {
            !b && H()
        }
        ).on("change", "#cbx_student_to_adult", function() {
            var t = $(this).is(":checked");
            z.studentToAdult = t ? "checked" : "",
            f.updateData(z),
            s.setByKey(e.studentToAdultStorageKey, t)
        }
        )
    }
    (a),
    Object.preventExtensions(a),
    window.Passenger = a,
    n.exports = a
}
);
define("./widgets/panel/panel", ["../../lib/artTemplate", "../../lib/perfectScrollbar.js"], function(e, n, i) {
    var a = e("../../lib/artTemplate");
    e("../../lib/perfectScrollbar.js");
    var s = function() {}
      , o = function() {}
    ;
    o.prototype.calcPriority_ = function(e) {
        var t = 0;
        e.forEach(function(e) {
            e.checked ? "undefined" == typeof e.priority && (e.priority = t++) : e.priority = -1
        }
        )
    }
    ,
    o.prototype.getPriority = function(e) {
        for (var t = this.option.info.items, n = -1, i = 0, a = t.length; a > i; i++) {
            var s = t[i];
            s.id.toString() === e.toString() && (n = s.priority)
        }
        return n
    }
    ,
    o.prototype.setPriority = function(e, t) {
        var n = this.option.info.items;
        n.forEach(function(n) {
            n.id.toString() === e.toString() && (n.priority = t)
        }
        )
    }
    ,
    o.prototype.sort_ = function(e) {
        var t = this;
        e.sort(function(e, t) {
            return e.priority >= t.priority ? 1 : -1
        }
        );
        var n = 0;
        e.forEach(function(e) {
            e.checked && (e.priority = n++,
            t.setPriority(e.id, e.priority))
        }
        )
    }
    ,
    o.prototype.scrollBar = function(e) {
        var t = this;
        t.$panel.find(".check-panel")[0] && t.$panel.find(".check-panel").children().length > 1 ? t.$panel.find(".ch-content-outer").addClass("ch-content-with-hd").perfectScrollbar(e) : t.$panel.perfectScrollbar(e)
    }
    ,
    o.prototype.init = function(e) {
        e = e || {},
        e.highlight = e.highlight || "",
        e.maxSelectedItems = e.maxSelectedItems || 5,
        e.tplSelector = e.tplSelector || "#check_panel_tpl",
        e.tplContainerSelector = e.tplContainerSelector || "#panel_selected_tpl",
        e.btnRefreshSelector = e.btnRefreshSelector || "#btn_refresh_passenger";
        var n = t;
        this.option = e,
        this.$target = $(this.option.targetSelector),
        this.$container = $(this.option.containerSelector),
        this.$panel = $(this.option.panelSelector),
        this.template = new n($(this.option.tplSelector).html()),
        this.templateSelected = new n($(this.option.tplContainerSelector).html()),
        this.calcPriority_(this.option.info.items),
        this.renderSelected();
        var i = this;
        i.inited || (i.inited = !0,
        i.$target.on("click", function(e) {
            e.stopPropagation(),
            i.$panel.is(":visible") ? i.hide(function() {
                i.scrollBar("destroy")
            }
            ) : i.show(function() {
                i.scrollBar()
            }
            ),
            $(document).trigger("mousedown", {
                isPanel: !0
            })
        }
        ),
        i.$panel.on("mousedown", function(e) {
            e.stopPropagation(),
            $(document).trigger("mousedown", {
                isPanel: !0
            })
        }
        ),
        $(document).on("mousedown", function(e, t) {
            t && t.isPanel || i.hide(function() {
                i.scrollBar("destroy")
            }
            )
        }
        ))
    }
    ,
    o.prototype.update = function(e, t) {
        var n = this;
        if (n.option.info.items.forEach(function(n) {
            n.id.toString() === e.toString() && (n.checked = t,
            n.priority = t ? 1e6 : -1)
        }
        ),
        n.option.info.children)
            for (var i = 0; i < n.option.info.children.length; i++)
                n.option.info.children[i].id.toString() === e.toString() && n.option.info.children.splice(i--, 1);
        n.calcPriority_(n.option.info.items),
        n.renderSelected(),
        n.option.update(e, t, n.getPriority(e))
    }
    ,
    o.prototype.addEventsListener = function() {
        var e = this;
        $(".ch-btn-close").on("click", function() {
            e.hide()
        }
        ),
        e.$panel.find(".ch-content input[type=checkbox]").on("change", function() {
            var t = $(this).attr("id")
              , n = $(this).is(":checked")
              , i = e.$panel.find(".ch-content input[type=checkbox]:checked").length;
            return i += e.option.info.children ? e.option.info.children.length : 0,
            n && i > e.option.maxSelectedItems ? ($(this).attr("checked", !1),
            alert("最多只能选：" + e.option.maxSelectedItems + "个！"),
            void 0) : (e.update(t, n),
            void 0)
        }
        ),
        $(e.option.btnRefreshSelector).on("click", function() {
            if (e.option.refresh = e.option.refresh || s,
            !e.$container.find(".ch-empty").is(":visible")) {
                var t = JSON.parse(JSON.stringify(e.option.info));
                e.option.info.items.length = 0,
                e.option.info.empty = !0,
                e.option.info.error = !1,
                e.render();
                var n = setTimeout(function() {
                    e.option.info = 0 === e.option.info.items.length ? t : e.option.info,
                    e.option.info.error = 0 === e.option.info.items.length,
                    e.renderAll()
                }
                , 500 + 500 * Math.random());
                e.option.refresh(function(t) {
                    e.option.info = t,
                    n || e.renderAll()
                }
                , !0)
            }
        }
        )
    }
    ,
    o.prototype.render_ = function(e) {
        var t = this.option.tplSelector
          , n = $(t);
        return "javascript/arttemplate" === n.attr("type") ? a.render(t.substring(1), e) : this.template.render(e)
    }
    ,
    o.prototype.renderAll = function() {
        var e = this;
        e.render(),
        e.calcPriority_(e.option.info.items),
        e.renderSelected(),
        e.scrollBar()
    }
    ,
    o.prototype.updateData = function(e) {
        this.option.info = e,
        this.render(),
        this.scrollBar()
    }
    ,
    o.prototype.render = function() {
        var e = this;
        e.option.info.items.forEach(function(e) {
            e.checked = e.checked ? "checked" : ""
        }
        ),
        e.option.info.empty = 0 === e.option.info.items.length,
        e.option.info.student = $("#student_identity").attr("checked"),
        e.$panel.html(e.render_({
            info: e.option.info
        })),
        e.addEventsListener()
    }
    ,
    o.prototype.renderSelected = function() {
        var e = this
          , t = e.option.info.children
          , n = t ? t.length : 0;
        e.option.info.items.forEach(function(e) {
            e.display = e.checked ? "" : "none",
            n += e.checked ? 1 : 0
        }
        ),
        e.option.info.empty = 0 === n;
        var i = JSON.parse(JSON.stringify(e.option.info));
        e.sort_(i.items),
        e.$container.html(e.templateSelected.render({
            info: i,
            emptyMsg: e.option.emptyMsg,
            highlight: e.option.highlight
        })),
        $(e.option.containerSelector + " .panel-selected-item").on("click", function() {
            var t = $(this).attr("name");
            $("#" + t).attr("checked", !1),
            $(this).remove(),
            e.update(t, !1)
        }
        )
    }
    ,
    o.prototype.refresh = function() {
        var e = this;
        "function" == typeof e.option.refresh && e.option.refresh(function(t) {
            e.option.info = t,
            e.option.info.error = 0 === t.items.length,
            e.renderAll()
        }
        )
    }
    ,
    o.prototype.show = function(e) {
        e = e || s;
        var t = this;
        t.renderAll(),
        $("." + t.$panel.attr("class")).hide(),
        t.$panel.slideDown(e),
        setTimeout(function() {
            t.refresh()
        }
        , 500 + 500 * Math.random())
    }
    ,
    o.prototype.refreshSelected = function(e) {
        this.option.info = e,
        this.renderSelected()
    }
    ,
    o.prototype.hide = function(e) {
        e = e || s;
        var t = this;
        t.$panel.slideUp(e)
    }
    ,
    i.exports = o
}
);
define("./lib/perfectScrollbar", [], function() {
    !function(e) {
        e.fn.perfectScrollbar = function(t) {
            if ("update" === t)
                return e(this).data("perfect_scrollbar_update") && e(this).data("perfect_scrollbar_update")(),
                e(this);
            if ("destroy" === t)
                return e(this).data("perfect_scrollbar_destroy") && e(this).data("perfect_scrollbar_destroy")(),
                e(this);
            if (e(this).data("perfect_scrollbar"))
                return e(this).data("perfect_scrollbar");
            var n, i, a, s, o, r, h, l, u = e(this).addClass("ps-container"), c = e(this).children(), d = e("<div class='ps-scrollbar-x'></div>").appendTo(u), g = e("<div class='ps-scrollbar-y'></div>").appendTo(u), p = parseInt(d.css("bottom")), y = parseInt(g.css("right")), f = function() {
                var e = parseInt(l * s / i);
                u.scrollTop(e),
                d.css({
                    bottom: p - e
                })
            }
            , x = function() {
                var e = parseInt(r * a / n);
                u.scrollLeft(e),
                g.css({
                    right: y - e
                })
            }
            , m = function() {
                n = u.width(),
                i = u.height(),
                a = c.width(),
                s = c.height(),
                a > n ? (o = parseInt(n * n / a),
                r = parseInt(u.scrollLeft() * n / a)) : (o = 0,
                r = 0,
                u.scrollLeft(0)),
                s > i ? (h = parseInt(i * i / s),
                l = parseInt(u.scrollTop() * i / s)) : (h = 0,
                scrollbar_y_left = 0,
                u.scrollTop(0)),
                d.css({
                    left: r + u.scrollLeft(),
                    bottom: p - u.scrollTop(),
                    width: o
                }),
                g.css({
                    top: l + u.scrollTop(),
                    right: y - u.scrollLeft(),
                    height: h
                })
            }
            , b = function(e, t) {
                var i = e + t
                  , a = n - o;
                r = 0 > i ? 0 : i > a ? a : i,
                d.css({
                    left: r + u.scrollLeft()
                })
            }
            , _ = function(e, t) {
                var n = e + t
                  , a = i - h;
                l = 0 > n ? 0 : n > a ? a : n,
                g.css({
                    top: l + u.scrollTop()
                })
            }
            , z = function() {
                var t, n;
                d.bind("mousedown.perfect-scroll", function(e) {
                    n = e.pageX,
                    t = d.position().left,
                    d.addClass("in-scrolling"),
                    e.stopPropagation(),
                    e.preventDefault()
                }
                ),
                e(document).bind("mousemove.perfect-scroll", function(e) {
                    d.hasClass("in-scrolling") && (b(t, e.pageX - n),
                    x(),
                    e.stopPropagation(),
                    e.preventDefault())
                }
                ),
                e(document).bind("mouseup.perfect-scroll", function() {
                    d.hasClass("in-scrolling") && d.removeClass("in-scrolling")
                }
                )
            }
            , D = function() {
                var t, n;
                g.bind("mousedown.perfect-scroll", function(e) {
                    n = e.pageY,
                    t = g.position().top,
                    g.addClass("in-scrolling"),
                    e.stopPropagation(),
                    e.preventDefault()
                }
                ),
                e(document).bind("mousemove.perfect-scroll", function(e) {
                    g.hasClass("in-scrolling") && (_(t, e.pageY - n),
                    f(),
                    e.stopPropagation(),
                    e.preventDefault())
                }
                ),
                e(document).bind("mouseup.perfect-scroll", function() {
                    g.hasClass("in-scrolling") && g.removeClass("in-scrolling")
                }
                )
            }
            , w = function() {
                u.mousewheel(function(e, t, o, r) {
                    u.scrollTop(u.scrollTop() - 10 * r),
                    u.scrollLeft(u.scrollLeft() + 10 * o),
                    m(),
                    (s > i || a > n) && e.preventDefault()
                }
                )
            }
            , j = function() {
                d.remove(),
                g.remove(),
                u.unbind("mousewheel"),
                e(window).unbind("mousemove.perfect-scroll"),
                e(window).unbind("mouseup.perfect-scroll"),
                u.data("perfect_scrollbar", null ),
                u.data("perfect_scrollbar_update", null ),
                u.data("perfect_scrollbar_destroy", null )
            }
            , v = function() {
                m(),
                z(),
                D(),
                u.mousewheel && w(),
                u.data("perfect_scrollbar", u),
                u.data("perfect_scrollbar_update", m),
                u.data("perfect_scrollbar_destroy", j)
            }
            ;
            return v(),
            u
        }
    }
    (jQuery),
    function(e) {
        function t(t) {
            var n = t || window.event
              , i = [].slice.call(arguments, 1)
              , a = 0
              , s = 0
              , o = 0;
            return t = e.event.fix(n),
            t.type = "mousewheel",
            n.wheelDelta && (a = n.wheelDelta / 120),
            n.detail && (a = -n.detail / 3),
            o = a,
            void 0 !== n.axis && n.axis === n.HORIZONTAL_AXIS && (o = 0,
            s = -1 * a),
            void 0 !== n.wheelDeltaY && (o = n.wheelDeltaY / 120),
            void 0 !== n.wheelDeltaX && (s = -1 * n.wheelDeltaX / 120),
            i.unshift(t, a, s, o),
            (e.event.dispatch || e.event.handle).apply(this, i)
        }
        var n = ["DOMMouseScroll", "mousewheel"];
        if (e.event.fixHooks)
            for (var i = n.length; i; )
                e.event.fixHooks[n[--i]] = e.event.mouseHooks;
        e.event.special.mousewheel = {
            setup: function() {
                if (this.addEventListener)
                    for (var e = n.length; e; )
                        this.addEventListener(n[--e], t, !1);
                else
                    this.onmousewheel = t
            },
            teardown: function() {
                if (this.removeEventListener)
                    for (var e = n.length; e; )
                        this.removeEventListener(n[--e], t, !1);
                else
                    this.onmousewheel = null 
            }
        },
        e.fn.extend({
            mousewheel: function(e) {
                return e ? this.bind("mousewheel", e) : this.trigger("mousewheel")
            },
            unmousewheel: function(e) {
                return this.unbind("mousewheel", e)
            }
        })
    }
    (jQuery)
}
);
"use strict";
define("./widgets/brush/brush", ["./../utils/date", "./../trainList/index", "./../station/index", "./../dateTab/index", "./../refreshStatus/refreshStatus", "./../settings/settings", "../config/config", "../priorityTrain/priorityTrain", "../prioritySeats/prioritySeats", "../window/window", "../utils/shareMisc", "../utils/floating"], function(e, t, n) {
    e("./../utils/date");
    var i = {}
      , a = null 
      , s = null 
      , o = null 
      , r = !1
      , h = !1
      , l = e("./../trainList/index")
      , u = e("./../station/index")
      , c = e("./../dateTab/index")
      , d = e("./../refreshStatus/refreshStatus")
      , g = e("./../settings/settings");
    e("../config/config");
    var p = e("../priorityTrain/priorityTrain")
      , y = e("../prioritySeats/prioritySeats");
    e("../window/window");
    var f = e("../utils/shareMisc")
      , x = e("../utils/floating")
      , m = []
      , b = 0
      , _ = (new Date).pattern("yyyy-MM-dd")
      , z = 1
      , D = 1
      , w = []
      , j = !1
      , v = g.ipAble ? 5e3 : 5100;
    !function(e) {
        function t() {
            var e = {
                text: _,
                priority: 1e6,
                checked: !0
            }
              , t = !1;
            w = JSON.parse(JSON.stringify(m));
            for (var n = 0; n < w.length; n++) {
                var i = w[n];
                i.text === _ && (i.priority = e.priority,
                i.checked = !0,
                t = !0)
            }
            !t && w.push(e),
            w.sort(function(e, t) {
                return e.priority > t.priority
            }
            )
        }
        function n() {
            if (clearInterval(o),
            r = !0,
            h = !0,
            D = 1,
            t(),
            a.attr({
                "class": r ? "stop" : "start"
            }),
            s.hide(),
            !u.isInvalidStation())
                try {
                    f.statBrushInfo(l.getAllFilter(), y.getPrioritySeats(), p.getPriorityTrains(), m)
                } catch (e) {}
            l.addFilter("date", _),
            d.show(z),
            l.show(function() {
                d.update(z++)
            }
            ),
            i(v),
            b = w.length - 1,
            o = setInterval(function() {
                if (u.isInvalidStation())
                    return g(),
                    void 0;
                if (!j) {
                    b++,
                    b = b < w.length ? b : 0;
                    var e = w[b];
                    e && (c.setCurrentDate(e.text),
                    l.addFilter("date", e.text)),
                    10 == D && f.getRule(),
                    l.show(function() {
                        d.update(z++),
                        D++
                    }
                    , !0),
                    i(v)
                }
            }
            , v)
        }
        function i(e) {
            var t = 100
              , n = 0
              , i = $("#brush_countdown")
              , a = setInterval(function() {
                var t = ((e - 100 * n) / 1e3).toString();
                return "0" === t ? (clearInterval(a),
                void 0) : (-1 === t.indexOf(".") && (t += ".0"),
                i.html(t),
                n++,
                void 0)
            }
            , t)
        }
        function g() {
            setTimeout(function() {
                h && (h = !1,
                l.renderLast()),
                f.resetRule(),
                d.hide(),
                clearInterval(o),
                o = null ,
                r = !1,
                a.attr({
                    "class": r ? "stop" : "start"
                }),
                s.show(),
                $(document).trigger("stoprender")
            }
            , 0)
        }
        e.getStatus = function() {
            return r
        }
        ,
        e.isPause = function() {
            return j
        }
        ,
        e.init = function(e) {
            e = e || "#btn_refresh",
            a = $(e),
            s = $("#btn_refresh_vip");
            var t = 0;
            a.unbind("click").bind("click", function() {
                var e = +new Date;
                Math.abs(e - t) <= 1e3 || (t = e,
                r = !$(this).hasClass("stop"),
                a.attr({
                    "class": r ? "stop" : "start"
                }),
                j = !1,
                !u.isInvalidStation() && r ? n() : g())
            }
            ),
            s.off("click").on("click", function() {
                2 != x.getRouteType() ? x.showCheckVipLayer(function() {
                    s.trigger("click")
                }
                ) : (a.trigger("click"),
                x.setBrushRoute(2))
            }
            )
        }
        ,
        e.stop = function() {
            g()
        }
        ,
        $(document).on({
            setcurrentdate: function(e, n) {
                _ = n,
                t()
            },
            alternativedatechange: function(e, n) {
                m = JSON.parse(JSON.stringify(n.dates)) || [];
                for (var i = 0; i < m.length; i++) {
                    var a = m[i];
                    a.checked || m.splice(i--, 1)
                }
                t()
            },
            restartbrush: function() {
                j = !1,
                n()
            },
            ordersubmiting: function() {
                g()
            },
            canorder: function() {
                g()
            },
            cancelorder: function() {
                g()
            },
            cannotautosubmit: function() {
                g()
            },
            userchange: function() {
                g()
            },
            stopbrush: function() {
                g()
            },
            blocking: function() {
                j = !0
            },
            unblock: function() {
                j = !1
            }
        })
    }
    (i),
    n.exports = i
}
);
"use strict";
define("./widgets/refreshStatus/refreshStatus", ["./../trainList/index", "../priorityTrain/priorityTrain", "../transit/transit", "../transit/view", "../settings/settings"], function(e, t, n) {
    e("./../trainList/index"),
    e("../priorityTrain/priorityTrain");
    var i, a, s = e("../transit/transit"), o = e("../transit/view"), r = e("../settings/settings"), h = {}, l = 50, u = null , c = null , d = $(".refresh-transit"), g = $(".refresh-status-container");
    !function(e) {
        function t(e) {
            var t = e.list || 0
              , n = t.length || 0
              , i = e.to;
            n > 0 && i == $("#station_to_text").val() ? (!d.is(":visible") && g.is(":visible") && (document.createElement("img").src = "http://dd.browser.360.cn/static/a/131.6400.gif?_" + Math.random()),
            d.find(".transit-count").html(n),
            d.find(".station-from").html(i),
            g.addClass("transit")) : g.removeClass("transit")
        }
        e.show = function(t) {
            u = u || $("#refresh_count"),
            c = c || $(".refresh-status-container, .refresh-status-mask"),
            g.removeClass("transit"),
            t = t || 1,
            e.update(t),
            c.fadeIn()
        }
        ,
        e.hide = function() {
            c = c || $(".refresh-status-container, .refresh-status-mask"),
            c.fadeOut(),
            g.removeClass("transit")
        }
        ,
        e.showTip = function() {
            $("#refresh_tips").hide(),
            $("#buyend_tips").hide()
        }
        ,
        e.update = function(e) {
            u = u || $("#refresh_count"),
            u.text(e),
            this.showTip(e),
            20 == e && (document.createElement("img").src = "http://dd.browser.360.cn/static/a/131.1064.gif?_" + Math.random()),
            0 == e % l && s.getSuggest(a, function(e) {
                t(e)
            }
            )
        }
        ;
        var n = !1;
        g.delegate(".transit-content", "click", function() {
            document.createElement("img").src = "http://dd.browser.360.cn/static/a/131.9893.gif?_" + Math.random(),
            o.show(a, function(e) {
                t(e)
            }
            )
        }
        ).delegate(".tg-mobile-piao a:not([class])", "click", function(e, t) {
            n = !0;
            var i = $(".tg-mobile-layer")
              , a = i.find("img")
              , s = a.attr("src");
            "auto" == t ? (s = "images/tg_mobile_layer_auto.gif",
            (new Image).src = "http://dd.browser.360.cn/static/a/519.6436.gif?_referer=popup&" + Math.random()) : (s = "images/tg_mobile_layer_manual.gif",
            (new Image).src = "http://dd.browser.360.cn/static/a/519.6436.gif?_referer=click&" + Math.random()),
            a.attr("src", "").attr("src", s),
            $(".body-mask").fadeIn(),
            i.show(),
            localStorage.tg_mobile_piao_autopop_version = r.serverConfig.tg_mobile_piao_autopop_version || 0
        }
        );
        var h = function() {
            $(".body-mask").fadeOut(),
            $(".tg-mobile-layer").hide()
        }
        ;
        $(".tg-mobile-layer .close").on("click", h),
        $(document).on("afterrender", function(e, t) {
            i = t.list
        }
        ),
        $(document).on("rawdata", function(e, t) {
            a = (t || {}).data || []
        }
        )
    }
    (h),
    Object.preventExtensions(h),
    window.setTransitInterval = function(e) {
        l = isNaN(+e) ? l : e
    }
    ,
    n.exports = h
}
);
define("./widgets/priorityTrain/priorityTrain", ["./../config/config", "../trainList/index", "./../panel/panel", "./../station/index", "./../window/window"], function(e, t, n) {
    "use strict";
    var i = {}
      , a = e("./../config/config")
      , s = e("../trainList/index")
      , o = e("./../panel/panel")
      , r = e("./../station/index")
      , h = e("./../window/window");
    !function(e) {
        e.storageKey = "priorityTrains",
        e.allTrains = [];
        var t, n = {}, i = [], l = !1, u = [], c = {
            title: "优先车次",
            empty: !1,
            refresh: !1,
            error: !1
        }, d = function() {
            n = a.get(e.storageKey) || {},
            Array.isArray(n) && (n = {}),
            u = [],
            i = [],
            c.items = [],
            t && t.refreshSelected(c),
            $("#crh_filter").attr("checked", n.only_CRH),
            $("#choose_seat_1A").attr("checked", n.choose_seat_1A)
        }
        ;
        e.init = function() {
            if (d(),
            !l) {
                l = !0,
                $("#priority_trains_expand"),
                $("#prioritytrains"),
                window.t,
                $("#crh_filter").on("change", function() {
                    n.only_CRH = this.checked,
                    s.redraw(),
                    a.setByKey(e.storageKey, n)
                }
                ),
                $("#choose_seat_1A").on("change", function() {
                    n.choose_seat_1A = this.checked,
                    a.setByKey(e.storageKey, n)
                }
                ),
                $(document).on("beforerender", function(e, t) {
                    var a = t.fromCode + "_" + t.toCode;
                    n[a] || (n[a] = []),
                    i = n[a];
                    var s = []
                      , o = [];
                    t.list.forEach(function(e) {
                        -1 !== i.indexOf(e.number) ? s.push(e) : o.push(e)
                    }
                    ),
                    s.sort(function(e, t) {
                        var n = i.indexOf(e.number)
                          , a = i.indexOf(t.number);
                        return n === a && (n = u.indexOf(e.name),
                        a = u.indexOf(t.name)),
                        n > a ? 1 : a > n ? -1 : 0
                    }
                    ),
                    t.list = s.concat(o),
                    n.only_CRH && (t.list = t.list.filter(function(e) {
                        switch (e.traintype) {
                        case "G":
                        case "D":
                            return !0
                        }
                        return !1
                    }
                    ))
                }
                ),
                t = new o,
                c.items = [],
                c.valueAscending = c.wholetimeAscending = "",
                c.startTimeAscending = "ascending",
                t.init({
                    maxSelectedItems: 8,
                    targetSelector: ".btn-trains",
                    panelSelector: "#trains_panel",
                    containerSelector: "#prioritytrains",
                    tplSelector: "#check_trains_panel_tpl",
                    emptyMsg: "请选择您最想要的车次，越靠前的车次优先级越高",
                    info: c,
                    refresh: function(e) {
                        c.items = u;
                        var n = u.some(function(e) {
                            return void 0 !== e.data
                        }
                        );
                        n ? e(c) : t.hide(function() {
                            r.isInvalid() ? h.alert({
                                content: "请输入正确的出发城市和到达城市"
                            }) : h.alert({
                                content: "没有找到当天可预订列车信息，请更改查询条件。"
                            })
                        }
                        )
                    },
                    update: function(t, o) {
                        if (o)
                            -1 === i.indexOf(t) && i.push(t);
                        else {
                            var r = i.indexOf(t);
                            -1 !== r && i.splice(r, 1)
                        }
                        s.redraw(),
                        a.setByKey(e.storageKey, n)
                    }
                }),
                $(document).on("trainlistrendered", function(n, a) {
                    e.allTrains = [],
                    a.list.forEach(function(t) {
                        e.allTrains.push(t)
                    }
                    ),
                    u.splice(0);
                    var s = i.slice(0);
                    e.allTrains.forEach(function(e) {
                        u.push({
                            id: e.number,
                            text: e.number,
                            value: e.number,
                            checked: -1 !== i.indexOf(e.number),
                            data: e,
                            priority: i.indexOf(e.number)
                        });
                        var t = s.indexOf(e.number);
                        -1 !== t && s.splice(t, 1)
                    }
                    ),
                    s.forEach(function(e) {
                        u.push({
                            id: e,
                            text: e,
                            value: e,
                            checked: -1 !== i.indexOf(e),
                            priority: i.indexOf(e)
                        })
                    }
                    ),
                    i.forEach(function(e) {
                        $("[data-trainlist-row=" + e + "]").addClass("highlight")
                    }
                    ),
                    c.items = u,
                    t.refreshSelected(c)
                }
                );
                var g = function(e, t) {
                    return t = "undefined" != typeof t ? t ? 1 : -1 : 1,
                    function(n, i) {
                        var a = ""
                          , s = "";
                        switch (e) {
                        case "value":
                            var o = ["C", "G", "D", "Z", "T", "K", "L"]
                              , r = n.value.substring(0, 1)
                              , h = i.value.substring(0, 1);
                            a = o.indexOf(r),
                            s = o.indexOf(h),
                            a = a >= 0 ? a : parseInt(r) + 10,
                            s = s >= 0 ? s : parseInt(h) + 10;
                            break;
                        case "startTime":
                            a = n.data.startTime,
                            s = i.data.startTime;
                            break;
                        case "wholetime":
                            a = n.data.wholetime,
                            s = i.data.wholetime
                        }
                        return a === s ? 0 : a > s ? t : -t
                    }
                }
                ;
                $("#trains_panel").delegate(".btn-trains-sort", "click", function() {
                    var e = $(this).attr("type")
                      , n = -1 === this.className.indexOf("ascending")
                      , i = JSON.parse(JSON.stringify(c));
                    i.items.sort(g(e, n)),
                    i.valueAscending = i.startTimeAscending = i.wholetimeAscending = "",
                    i[e + "Ascending"] = n ? "ascending" : "descending",
                    t.updateData(i)
                }
                )
            }
        }
        ,
        e.getPriorityTrains = function(e) {
            if (0 == i.length && e) {
                var t = e.listData.fromCode + "_" + e.listData.toCode;
                return n[t] || []
            }
            return i
        }
    }
    (i),
    Object.preventExtensions(i),
    n.exports = i
}
);
define("./widgets/transit/transit", ["./../trainList/index", "../priorityTrain/priorityTrain", "../prioritySeats/prioritySeats", "./stations", "../station/index", "./filter", "./interfaces"], function(e, t, n) {
    "use strict";
    var i = e("./../trainList/index")
      , a = e("../priorityTrain/priorityTrain")
      , s = e("../prioritySeats/prioritySeats")
      , o = e("./stations")
      , r = e("../station/index")
      , h = e("./filter")
      , l = e("./interfaces")
      , u = {};
    !function(e) {
        e.getCrossTicketInfo = function(e, t, n, i) {
            var a = e.queryLeftNewDTO
              , s = a.train_no
              , o = a.from_station_name
              , h = a.to_station_name
              , u = 0
              , c = []
              , d = .3
              , g = $("[name=identity]:checked").val();
            0 == t.length && i && i(c),
            t.forEach(function(e) {
                var a = e.trains || [s]
                  , p = +e.minutes;
                l.queryLeftTicket({
                    from: r.getCityID(e.from),
                    to: r.getCityID(e.to),
                    date: e.date
                }, function(s) {
                    var r = s.filter(function(t) {
                        var n = t.queryLeftNewDTO || {}
                          , i = +n.lishiValue
                          , s = isNaN(p) ? 0 : (i - p) / p
                          , o = isNaN(p) || d > s
                          , r = -1 != a.indexOf(n.train_no)
                          , h = -1 != a.indexOf(n.station_train_code);
                        return s = e.percent || s,
                        s = s > 0 && d > s ? (100 * s).toFixed(0) + "%" : !1,
                        s = "0%" == s ? "1%" : s,
                        t.percent = s,
                        o && (r || h)
                    }
                    );
                    r.forEach(function(t) {
                        t.isMidway = e.isMidway,
                        t.type = n,
                        t.from = o,
                        t.to = h,
                        t.purpose = g
                    }
                    ),
                    c = c.concat(r),
                    ++u >= t.length && i && i(c)
                }
                )
            }
            )
        }
        ,
        e.getCrossSuggest = function(t, n, i) {
            var a = 0
              , s = t.length
              , r = [];
            t.forEach(function(t) {
                setTimeout(function() {
                    var h = o.getCrossStations(t, n);
                    e.getCrossTicketInfo(t, h, "cross", function(e) {
                        r = r.concat(e),
                        ++a >= s && i && i(r)
                    }
                    )
                }
                , 1e3 * (2 + 3 * Math.random()))
            }
            )
        }
        ,
        e.getMidwaySuggest = function(t, n, i, a, s) {
            var h = r.getCityID(n)
              , l = r.getCityID(i);
            t.queryLeftNewDTO.from_station_name = n,
            t.queryLeftNewDTO.to_station_name = i,
            o.getMidwayStations(n, h, i, l, a, function(n) {
                e.getCrossTicketInfo(t, n, "midway", function(e) {
                    s && s(e)
                }
                )
            }
            )
        }
        ,
        e.getSuggest = function(t, n) {
            var o = Object.prototype.toString.call(t)
              , r = s.getPrioritySeats()
              , l = a.getPriorityTrains()
              , u = Passenger.getSelectedPassengersCache(!0);
            if ("[object Array]" === o && t.length > 0) {
                if (t = t.concat([]),
                t = h.beforeFilter(t, l, r),
                t = t.slice(0, 5),
                0 == t.length)
                    return n && n([]),
                    void 0;
                var c = t[0]
                  , d = $("#station_from_text").val()
                  , g = $("#station_to_text").val()
                  , p = $("#date_forward_text").val();
                e.getCrossSuggest(t, p, function(t) {
                    var a = t.concat([]);
                    e.getMidwaySuggest(c, d, g, p, function(e) {
                        a = h.concat(a, e);
                        var t = i.buildTrainData(a)
                          , s = i._applyFilter(t.list)
                          , o = h.afterFilter(s, r, u)
                          , l = {
                            list: o,
                            from: d,
                            to: g,
                            date: p
                        };
                        n && n(l)
                    }
                    )
                }
                )
            } else
                n && n([])
        }
    }
    (u),
    n.exports = u
}
);
define("./widgets/prioritySeats/prioritySeats", ["./../config/config", "../trainList/index", "./../panel/panel"], function(e, t, n) {
    "use strict";
    var i = {}
      , a = e("./../config/config")
      , s = e("../trainList/index")
      , o = e("./../panel/panel")
      , r = null ;
    !function(e) {
        e.storageKey = "prioritySeats",
        e.allseats = ["硬卧", "二等座", "硬座", "一等座", "软座", "软卧", "动卧", "高级软卧", "高级动卧", "特等座", "商务座", "无座"];
        var t = []
          , n = !1
          , i = function() {
            t = a.get(e.storageKey) || [],
            t.every(function(e, n) {
                return "其他" === e ? (t.splice(n, 1),
                !1) : !0
            }
            ),
            l.forEach(function(e) {
                e.checked = -1 !== t.indexOf(e.id),
                e.priority = t.indexOf(e.id)
            }
            ),
            h.items = l,
            r && r.refreshSelected(h)
        }
          , h = {
            title: "选择席别",
            empty: !1,
            refresh: !1,
            error: !1
        }
          , l = [];
        e.init = function() {
            if (i(),
            !n) {
                n = !0,
                $("#priority_seats_expand");
                var u = $("#priority_allseats");
                $("#priorityseats"),
                window.t,
                e.allseats.forEach(function(e) {
                    l.push({
                        id: e,
                        text: e,
                        value: e,
                        checked: -1 !== t.indexOf(e),
                        priority: t.indexOf(e)
                    })
                }
                ),
                r = r || new o,
                h.items = l,
                r.init({
                    targetSelector: ".btn-seats",
                    panelSelector: "#seats_panel",
                    containerSelector: "#priorityseats",
                    tplSelector: "#check_seats_panel_tpl",
                    emptyMsg: "请选择您最想要的席别，越靠前的席别优先级越高",
                    info: h,
                    update: function(n, i) {
                        if (i)
                            -1 === t.indexOf(n) && t.push(n);
                        else {
                            var o = t.indexOf(n);
                            -1 !== o && t.splice(o, 1)
                        }
                        a.setByKey(e.storageKey, t),
                        s.redraw()
                    }
                }),
                $(document).on("beforerender", function(n, i) {
                    i.list.forEach(function(n) {
                        n.seats.sort(function(n, i) {
                            var a = t.indexOf(n.name)
                              , s = t.indexOf(i.name);
                            return -1 === a && (a = 99999),
                            -1 === s && (s = 99999),
                            a === s && (a = e.allseats.indexOf(n.name),
                            s = e.allseats.indexOf(i.name)),
                            a > s ? 1 : s > a ? -1 : 0
                        }
                        )
                    }
                    )
                }
                ),
                $(document).on("trainlistrendered", function() {
                    t.forEach(function(e) {
                        $("[data-trainlist-seattype=" + e + "]").addClass("highlight")
                    }
                    );
                    var e = u.find("input[type=checkbox]");
                    e.each(function(e, n) {
                        -1 !== t.indexOf(n.value) && (n.checked = !0)
                    }
                    )
                }
                )
            }
        }
        ,
        e.getPrioritySeats = function() {
            return t
        }
    }
    (i),
    Object.preventExtensions(i),
    n.exports = i
}
);
define("./widgets/transit/stations", ["./config"], function(e, t, n) {
    "use strict";
    var i = e("./config")
      , a = {};
    !function(e) {
        e.dateFormat = function(e, t) {
            var n = 864e5
              , i = +e.substr(0, 4)
              , a = +e.substr(4, 2)
              , s = +e.substr(6, 2)
              , o = +new Date(i,a - 1,s,0,0,0)
              , r = new Date(o + n * (t || 0));
            return i = r.getFullYear(),
            a = r.getMonth() + 1,
            s = r.getDate(),
            a = a > 9 ? a : "0" + a,
            s = s > 9 ? s : "0" + s,
            i + "-" + a + "-" + s
        }
        ,
        e.getMidwayStations = function(e, t, n, a, s, o) {
            i.getMidway(t, a, function(t) {
                var n = [];
                "undefined" != t.midway && t.trains.length > 0 && n.push({
                    percent: t.percent,
                    isMidway: t.isMidway,
                    from: e,
                    to: t.midway,
                    date: s,
                    trains: t.trains
                }),
                o && o(n)
            }
            )
        }
        ,
        e.getCrossStations = function(e, t) {
            var n = e.queryLeftNewDTO
              , i = n.from_station_name
              , a = n.to_station_name;
            n.start_station_name;
            var s = n.end_station_name
              , o = n.lishiValue
              , r = [];
            return s != a && r.push({
                isMidway: !1,
                from: i,
                to: s,
                date: t,
                minutes: o
            }),
            r
        }
    }
    (a),
    Object.preventExtensions(a),
    n.exports = a
}
);
define("./widgets/transit/config", ["../extension/extension"], function(e, t, n) {
    "use strict";
    function i(e, t) {
        s.sendMessage({
            type: "sendMessage",
            settings: {
                type: "getSig",
                data: e
            }
        }, t)
    }
    function a(e, t, n) {
        var a = e + "-" + t
          , r = Base64.encode(JSON.stringify({
            fromtocode: a
        }))
          , h = o[a]
          , l = {
            midway: void 0,
            trains: []
        };
        return "undefined" != typeof h ? (n && n(h),
        void 0) : (i(r, function(e) {
            s.ajax({
                url: "http://api.lxqp.360.cn/qiang/piao.php?m=getMidway",
                type: "POST",
                dataType: "json",
                data: {
                    data: r,
                    sign: e
                },
                success: function(e) {
                    if ("ok" == e.status && e.data) {
                        var t = e.data
                          , i = 0 == t.lr
                          , s = Math.abs(t.sc || 0);
                        s = i ? -s : s,
                        l = {
                            isMidway: i,
                            percent: s,
                            midway: decodeURIComponent(t.r),
                            trains: t.t || []
                        }
                    }
                    o[a] = $.extend(!0, {}, l),
                    n && n(l)
                },
                error: function() {
                    n && n(l)
                }
            })
        }
        ),
        void 0)
    }
    var s = e("../extension/extension")
      , o = {};
    window.getMidwayTest = function() {
        a("YCK", "NJH", function(e) {
            console.warn(e)
        }
        )
    }
    ,
    n.exports = {
        getMidway: a
    }
}
);
define("./widgets/transit/filter", [], function(e, t, n) {
    "use strict";
    var i = {};
    !function(e) {
        e.allSeats = [{
            code: "gr_num",
            name: "高级软卧"
        }, {
            code: "qt_num",
            name: "其他"
        }, {
            code: "rw_num",
            name: "软卧"
        }, {
            code: "rz_num",
            name: "软座"
        }, {
            code: "swz_num",
            name: "商务座"
        }, {
            code: "tz_num",
            name: "特等座"
        }, {
            code: "wz_num",
            name: "无座"
        }, {
            code: "yw_num",
            name: "硬卧"
        }, {
            code: "yz_num",
            name: "硬座"
        }, {
            code: "ze_num",
            name: "二等座"
        }, {
            code: "zy_num",
            name: "一等座"
        }],
        e.trainfilter = function(e, t) {
            var n = e.concat([]);
            return t.length > 0 && (n = n.filter(function(e) {
                var n = e.queryLeftNewDTO
                  , i = n.station_train_code;
                return -1 != t.indexOf(i)
            }
            )),
            n
        }
        ,
        e.seatFilter = function(t, n) {
            var i = t.concat([]);
            return n.length > 0 && (i = i.filter(function(t) {
                var i = t.queryLeftNewDTO;
                return e.allSeats.some(function(e) {
                    var a = e.code
                      , s = e.name
                      , o = t[a]
                      , r = "--" != i[o]
                      , h = -1 != n.indexOf(s);
                    return r && h
                }
                )
            }
            )),
            i
        }
        ,
        e.beforeFilter = function(t, n, i) {
            var a = t.concat([]);
            return a = e.trainfilter(a, n),
            a = e.seatFilter(a, i)
        }
        ,
        e.afterFilter = function(e, t, n) {
            var i = [];
            return e.forEach(function(e) {
                var a = n.length
                  , s = !1
                  , o = t.length;
                e.seats.forEach(function(e) {
                    var n = e.name
                      , i = e.tickets
                      , r = 0 == o || -1 != t.indexOf(n)
                      , h = "有" == i || !isNaN(+i) && +i >= a;
                    r && h ? s = !0 : e.display = "none"
                }
                ),
                s && i.push(e)
            }
            ),
            i
        }
        ,
        e.concat = function(e, t) {
            var n = e.concat([]);
            return t.forEach(function(t) {
                var i = t.queryLeftNewDTO
                  , a = i.train_no
                  , s = i.from_station_name
                  , o = i.to_station_name
                  , r = e.some(function(e) {
                    var t = e.queryLeftNewDTO
                      , n = t.train_no
                      , i = t.from_station_name
                      , r = t.to_station_name;
                    return a == n && s == i && o == r
                }
                );
                !r && n.push(t)
            }
            ),
            n
        }
    }
    (i),
    Object.preventExtensions(i),
    n.exports = i
}
);
define("./widgets/transit/interfaces", ["../extension/extension", "../config/monitor"], function(t, e, n) {
    "use strict";
    var i = t("../extension/extension")
      , a = t("../config/monitor")
      , s = {};
    !function(t) {
        var e = 2;
        t.queryLeftTicket = function(n, s, o) {
            return o = o || 0,
            i.ajax({
                url: "https://kyfw.12306.cn/otn/" + a.leftTicketUrl,
                data: {
                    "leftTicketDTO.train_date": n.date,
                    "leftTicketDTO.from_station": n.from,
                    "leftTicketDTO.to_station": n.to,
                    purpose_codes: n.purpose || "ADULT"
                },
                dataType: "json",
                success: function(i) {
                    i = i || {},
                    i.hasOwnProperty("status") && "false" == i.status.toString() || !i.hasOwnProperty("data") || !$.isArray(i.data) || 0 == i.data.length ? (a.setCUrl(i.c_url),
                    ++o < e ? setTimeout(function() {
                        t.queryLeftTicket(n, s, o)
                    }
                    , 1e3 * (1 + Math.random())) : s && s(i.data || [])) : s && s(i.data || [])
                },
                error: function() {
                    s && s([])
                }
            })
        }
        ,
        t.queryStations = function(t, e) {
            return i.ajax({
                url: "https://kyfw.12306.cn/otn/czxx/queryByTrainNo",
                type: "GET",
                data: {
                    train_no: t.no,
                    from_station_telecode: t.from,
                    to_station_telecode: t.to,
                    depart_date: t.date
                },
                success: function(t) {
                    e && e(t.data || [])
                },
                error: function() {
                    e && e([])
                }
            })
        }
        ,
        t.test = function() {
            t.queryLeftTicket({
                date: "2014-12-08",
                from: "VBB",
                to: "BJB",
                purpose: "ADULT"
            }, function(t) {
                console.warn("queryLeftTicket:", t)
            }
            ),
            t.queryStations({
                date: "2014-12-08",
                from: "VBB",
                to: "BJB",
                no: "01000062530B"
            }, function(t) {
                console.warn("queryStations:", t)
            }
            )
        }
    }
    (s),
    Object.preventExtensions(s),
    window.interfaces = s,
    n.exports = s
}
);
define("./widgets/transit/view", ["./transit", "../../lib/artTemplate"], function(t, e, n) {
    "use strict";
    var i = t("./transit")
      , a = t("../../lib/artTemplate")
      , s = function() {
        this.$mask = $(".body-mask"),
        this.$container = $(".transit-container"),
        this.$content = this.$container.find(".content"),
        this.$title = this.$container.find(".data-view .title"),
        this.$data = this.$content.find(".list"),
        this.headTplId = "transit_header_tpl",
        this.contentTplId = "transit_content_tpl",
        this.listTplId = "transit_list_tpl",
        this._data = [],
        this._bindEvent()
    }
    ;
    s.prototype = {
        show: function(t, e) {
            var n = this;
            n._display(),
            i.getSuggest(t, function(t) {
                e && e(t),
                n._data = t,
                n._render(t)
            }
            )
        },
        hide: function() {
            var t = this;
            t.$data.html("").perfectScrollbar("destroy"),
            t.$mask.fadeOut(),
            t.$container.hide()
        },
        _setStatus: function(t) {
            this.$content.attr("class", "content " + t)
        },
        _display: function() {
            var t = this;
            t._setStatus("loading"),
            t.$mask.fadeIn(),
            t.$container.show()
        },
        _render: function(t) {
            var e = this
              , n = t.list;
            if (n.length > 0) {
                t.from;
                var i = t.to
                  , t = e._normalize(n)
                  , s = t.cross
                  , o = t.midway
                  , r = a.render(e.headTplId, {
                    list: n,
                    to: i
                })
                  , h = s.length > 0 ? a.render(e.contentTplId, {
                    list: s,
                    type: "cross"
                }) : ""
                  , c = o.length > 0 ? a.render(e.contentTplId, {
                    list: o,
                    type: "midway"
                }) : ""
                  , u = h + c;
                e._setStatus("data"),
                e.$title.html(r),
                e.$data.html(u)
            } else
                e._setStatus("empty")
        },
        _normalize: function(t) {
            var e = []
              , n = [];
            return t.forEach(function(t) {
                t.isMidway ? n.push(t) : e.push(t)
            }
            ),
            e.length > 0 ? e[0].isFirst = !0 : n[0].isFirst = !0,
            {
                cross: e,
                midway: n
            }
        },
        _bindEvent: function() {
            var t = this;
            t.$container.delegate(".btn-close", "click", function() {
                t.hide()
            }
            ).delegate(".basic", "click", function() {
                var t = $(this).parents(".item")
                  , e = t.hasClass("fold");
                e ? t.removeClass("fold") : t.addClass("fold")
            }
            ).delegate("[data-trainlist-seatcode]", "click", function(e) {
                document.createElement("img").src = "http://dd.browser.360.cn/static/a/131.5474.gif?_" + Math.random();
                for (var n, i = $(e.target), a = i; a && !(n = a.attr("data-trainlist-seatcode")); )
                    a = a.parent();
                for (var s, o = i; o && !(s = o.attr("data-trainlist-row")); )
                    o = o.parent();
                var r = t._data.list || [];
                r.forEach(function(e) {
                    e.number === s && e.seats.forEach(function(i) {
                        i.code === n && (t.hide(),
                        AutoSubmit.submit({
                            train: e,
                            seat: i
                        }))
                    }
                    )
                }
                )
            }
            ).delegate(".icon-helper", "click", function() {}
            ).delegate(".tooltip .btn-close-tips", "click", function() {
                $(this).parents(".help").find(".tooltip").hide()
            }
            )
        }
    },
    n.exports = new s
}
);
"use strict";
define("./widgets/utils/floating", ["../extension/extension", "../config/config", "../settings/settings", "../trainList/index"], function(t, e, n) {
    var i = {}
      , a = t("../extension/extension")
      , s = t("../config/config")
      , o = t("../settings/settings")
      , r = t("../trainList/index");
    !function(t) {
        function e(t) {
            a.sendMessage({
                type: "sendMessage",
                settings: {
                    type: "getPIAOcodec"
                }
            }, function(e) {
                e || (e = localStorage.__guid,
                e || (e = hex_md5(Date.now() + "-" + Math.random()),
                localStorage.__guid = e)),
                e = hex_md5("106"),
                t && t(e)
            }
            )
        }
        function n() {}
        function i(t, e) {
            return "hntv" == ($_GET("src") || "").toLowerCase() ? (e && e(!0),
            void 0) : ($.ajax({
                url: "http://api.lxqp.360.cn/lottery/",
                data: {
                    m: "validVip",
                    q: t
                },
                dataType: "jsonp",
                jsonp: "cb",
                timeout: 2e3,
                success: function(t) {
                    e && e(!!t.is_vip)
                },
                error: function() {
                    e && e(!1)
                }
            }),
            void 0)
        }
        function h() {
            var t = s.get(f);
            if (void 0 === t && (t = Math.floor(2 * Math.random())),
            c(t),
            !x) {
                x = !0,
                e(function(e) {
                    g = e,
                    i(e, function(e) {
                        p = e,
                        e || 2 != t || c(Math.floor(2 * Math.random()))
                    }
                    )
                }
                ),
                $.ajax({
                    url: "http://api.lxqp.360.cn/lottery/",
                    data: {
                        m: "channelData"
                    },
                    dataType: "jsonp",
                    jsonp: "cb",
                    success: function(t) {
                        for (var e in t)
                            $(".brush-route ." + e).text(t[e])
                    },
                    error: function() {}
                });
                var n, a;
                $(".btn-switch-route").on("mousedown", function() {
                    a = y.is(":visible")
                }
                ).on("click", function() {
                    a ? y.hide() : y.show();
                    var t = $(".vip-gif");
                    t.is(":visible") && t.fadeOut(200),
                    n && clearTimeout(n),
                    n = setTimeout(function() {
                        $(".btn-switch-route span").hasClass("route-2") || (t.attr("src", "images/vip_gif_3.gif?" + Math.random()),
                        t.fadeIn(300))
                    }
                    , 18e5)
                }
                ),
                $(document).on("mousedown", function() {
                    y.hide()
                }
                ),
                y.on("mousedown", function(t) {
                    t.stopPropagation()
                }
                ),
                y.find("li").on("click", function(t) {
                    t.stopPropagation();
                    var e = $(this).index();
                    2 > e ? (c(e, "click"),
                    r.show()) : p ? (c(e),
                    r.show()) : u(g)
                }
                )
            }
        }
        function c(t, e) {
            if (setTimeout(function() {
                y.hide()
            }
            , 0),
            void 0 !== t) {
                o.ipAble = p && 2 == t;
                var n = ["线路1", "线路2", "VIP线路"];
                $(".btn-switch-route span").html(n[t]).attr("class", "route-" + t);
                var i = $(".vip-gif");
                2 > t ? (i.attr("src") || i.attr("src", "images/vip_gif_3.gif?" + Math.random()),
                "click" != e && i.show()) : i.hide(),
                s.setByKey(f, t)
            }
        }
        function u(t, e) {
            var n = e ? "gaosushuapiao" : "xialakuang";
            (new Image).src = "http://dd.browser.360.cn/static/a/519.2839.gif?_referer=" + n + "&" + Math.random();
            var a = "http://h5.mse.360.cn/product/huochepiao/m_vip_check.html?q=" + t + "&t=" + n;
            $(".check-vip-layer .app-verify-qrcode").empty().qrcode({
                render: window.chrome ? "canvas" : "table",
                text: a,
                foreground: "#6D2E07",
                background: "transparent",
                correctLevel: 1,
                width: 150,
                height: 150
            }),
            $(".body-mask").fadeIn(),
            $(".check-vip-layer").show(),
            $(".check-vip-layer .verify-failed").css("opacity", 0),
            $(".check-vip-layer .verify-submit").off("click").on("click", function() {
                i(t, function(t) {
                    p = t,
                    t ? (c(2),
                    r.show(),
                    $(".body-mask").fadeOut(),
                    $(".check-vip-layer").hide(),
                    e && e()) : $(".check-vip-layer .verify-failed").css("opacity", 1)
                }
                )
            }
            ),
            $(".check-vip-layer .verify-none").off("click").on("click", function() {
                i(t, function(t) {
                    p = t
                }
                ),
                (new Image).src = "http://dd.browser.360.cn/static/a/382.4730.gif?" + Math.random(),
                $(".body-mask").fadeOut(),
                $(".check-vip-layer").hide(),
                c()
            }
            )
        }
        function l() {
            function t() {
                localStorage.app_verify_none_lasttime || (localStorage.app_verify_none_lasttime = 0);
                var t = Date.now() - localStorage.app_verify_none_lasttime;
                (t > 9e5 || 0 > t) && (localStorage.app_verify_none_lasttime = Date.now(),
                !$(".body-mask").is(":visible") && "visible" != $(".popup_background").css("visibility"))
            }
            setInterval(t, 5e3),
            t()
        }
        function d(t) {
            var e = 1;
            localStorage.app_verify_phone_version >= 0 && (e = 2,
            $(".app-notice-1 .verify-none").show());
            var n = "http://se.360.cn/huochepiao/app_verify_phone.html?token=" + t + "&type=" + e;
            $(".app-verify-qrcode").empty().qrcode({
                render: window.chrome ? "canvas" : "table",
                text: n,
                foreground: "#6D2E07",
                background: "transparent",
                correctLevel: 1,
                width: 150,
                height: 150
            }),
            $(".body-mask").fadeIn(),
            $(".app-notice-1").show(),
            1 == e ? (new Image).src = "http://dd.browser.360.cn/static/a/381.4774.gif?" + Math.random() : 2 == e && ((new Image).src = "http://dd.browser.360.cn/static/a/382.9878.gif?" + Math.random()),
            $(".app-notice .verify-submit").off("click").on("click", function() {
                $.ajax({
                    url: "http://api.lxqp.360.cn/huochepiao/",
                    data: {
                        m: "checkMidApi",
                        mid: t
                    },
                    dataType: "jsonp",
                    jsonp: "cb",
                    success: function(t) {
                        0 != t.status ? $(".app-notice .verify-failed").css("opacity", 1) : ($(".body-mask").fadeOut(),
                        $(".app-notice-1").hide(),
                        1 == e ? (new Image).src = "http://dd.browser.360.cn/static/a/381.7407.gif?" + Math.random() : 2 == e && ((new Image).src = "http://dd.browser.360.cn/static/a/382.6365.gif?" + Math.random()))
                    }
                })
            }
            ),
            $(".app-notice .verify-none").off("click").on("click", function() {
                localStorage.app_verify_none_lasttime = Date.now(),
                (new Image).src = "http://dd.browser.360.cn/static/a/382.4730.gif?" + Math.random(),
                $(".body-mask").fadeOut(),
                $(".app-notice-1").hide(),
                location.hash = "#verify-none",
                l(t)
            }
            )
        }
        var g, p, f = "brushRoute", y = $(".brush-route"), m = {
            "ease-out": function(t, e, n, i, a) {
                return -i * (e /= a) * (e - 2) + n
            }
        };
        jQuery.extend(jQuery.easing, m),
        t.init = function() {
            h(),
            setTimeout(n, 500)
        }
        ;
        t.getRouteType = function() {
            return p ? 2 : 0
        }
        ;
        var x = !1;
        t.setBrushRoute = c,
        t.showCheckVipLayer = function(t) {
            e(function(e) {
                u(e, t)
            }
            )
        }
        ,
        t.judgeShowVerify = function() {
            var t = parseInt(localStorage["before-showverify-count"]);
            t = isNaN(t) ? 0 : t,
            localStorage["before-showverify-count"] = t + 1,
            1 > t || e(function(t) {
                i(t, function(e) {
                    e || $.ajax({
                        url: "http://api.lxqp.360.cn/huochepiao/",
                        data: {
                            m: "checkMidApi",
                            mid: t
                        },
                        dataType: "jsonp",
                        jsonp: "cb",
                        success: function(e) {
                            0 != e.status ? "#verify-none" != location.hash && ($(".body-mask").is(":visible") || d(t)) : window._phone_verified = !0
                        }
                    })
                }
                )
            }
            )
        }
        ,
        t.open = function() {
            $(".bottom-floating-control-button").css({
                left: "-100%"
            }).parent().hide(),
            $(".bottom-floating-layer").show().css({
                left: 0
            })
        }
        ,
        t.close = function() {
            $(".bottom-floating-layer").css({
                left: "-100%"
            }).hide(),
            $(".bottom-floating-control-button").css({
                left: 0
            }).parent().show()
        }
        ,
        t.expand = function() {
            t.animating || (t.animating = !0,
            $(".bottom-floating-control-button").animate({
                left: "-100%"
            }, 300, "ease-out", function() {
                $(this).parent().hide(),
                $(".bottom-floating-layer").show().animate({
                    left: 0
                }, 800, "ease-out", function() {
                    t.animating = !1
                }
                )
            }
            ))
        }
        ,
        t.collapse = function() {
            t.animating || (t.animating = !0,
            $(".bottom-floating-layer").animate({
                left: "-100%"
            }, 800, "ease-out", function() {
                $(this).hide(),
                $(".bottom-floating-control-button").animate({
                    left: 0
                }, 300, "ease-out", function() {
                    t.animating = !1
                }
                ).parent().show()
            }
            ))
        }
    }
    (i),
    n.exports = i
}
);
"use strict";
define("./interfaces/getPassengerDTOs", ["../widgets/extension/extension", "../widgets/settings/settings"], function(t, e, n) {
    var i = t("../widgets/extension/extension")
      , a = t("../widgets/settings/settings");
    n.exports = function(t) {
        t = t || {},
        $.extend(!0, t, {
            url: a.protocol + a.hostname + "/otn/confirmPassenger/getPassengerDTOs",
            timeout: t.timeout || 1e4,
            success: t.succsss,
            error: t.error,
            data: {}
        }),
        i.ajax(t)
    }
}
);
"use strict";
define("./widgets/advance/advance", ["./../config/config"], function(t, e, n) {
    var i = {}
      , a = t("./../config/config");
    !function(t) {
        t.storageKey = "moreAdvance",
        t._inited = !1,
        t.init = function(e) {
            var n = $("#btn_more_unfold")
              , i = $(".filter .more")
              , s = $(".filter");
            $("#btn_advance"),
            $(".btn-more-advance"),
            $(".more-advance");
            var o = a.getAll();
            (o.autoSubmit || {}).auto;
            var r = o.alternativeDate || []
              , h = 0;
            e = !0,
            e ? (s.show(),
            n.hide(),
            $("#date_tab").css({
                "margin-top": 10
            })) : (s.hide(),
            n.show(),
            $("#date_tab").css({
                "margin-top": 35
            })),
            r.forEach(function(t) {
                t.checked && h++
            }
            ),
            t._inited || (t._inited = !0,
            n.on("click", function() {
                n.fadeOut("fast", function() {
                    s.slideDown(),
                    $("#date_tab").css({
                        "margin-top": 10
                    })
                }
                )
            }
            ),
            i.on("click", function() {
                s.slideUp(function() {
                    n.fadeIn("fast")
                }
                ),
                $("#date_tab").css({
                    "margin-top": "35px"
                })
            }
            ))
        }
        ,
        t.show = function() {}
        ,
        t.hide = function() {}
    }
    (i),
    Object.preventExtensions(i),
    n.exports = i
}
);
"use strict";
define("./widgets/alternativeDate/alternativeDate", ["./../utils/date", "./../config/config", "./../panel/panel", "./../utils/server"], function(t, e, n) {
    t("./../utils/date");
    var i = t("./../config/config")
      , a = t("./../panel/panel")
      , s = t("./../utils/server")
      , o = {}
      , r = []
      , h = null ;
    !function(t) {
        function e(e) {
            $(document).trigger("alternativedatechange", {
                dates: r
            }),
            i.setByKey(t.storageKey, r, e)
        }
        function n(t) {
            for (var e = {}, n = 0, i = r.length; i > n; n++) {
                var a = r[n];
                a.id === t && (e.checked = a.checked || !1,
                e.priority = a.priority)
            }
            return e
        }
        function o(t, a, s) {
            t = t || new Date,
            t = +new Date(t),
            a = a || i.getPreDays(t) + (s ? i.getStuPreDays(t) : 0) + 1;
            for (var o = [], h = 864e5, c = 0; a > c; c++) {
                var u = t + c * h
                  , l = new Date(u)
                  , d = l.pattern("yyyy-MM-dd")
                  , g = +new Date(d)
                  , p = n(g);
                l = {
                    id: g,
                    text: d,
                    checked: p.checked,
                    priority: p.priority
                },
                o.push(l)
            }
            r = o,
            e()
        }
        $(document).on("identitychange", function(t, e) {
            s.time(function(t) {
                $(document).trigger("settoday", [t, "0X00" == e])
            }
            )
        }
        ),
        t.storageKey = "alternativeDate",
        t.update = function(t, n, i) {
            for (var a = 0, s = r.length; s > a; a++) {
                var o = r[a];
                if (o.id.toString() === t) {
                    o.checked = n,
                    o.priority = i;
                    break
                }
            }
            e()
        }
        ,
        t.init = function(e) {
            $(document).on("settoday", function(n, s, c) {
                r = i.get(t.storageKey) || [],
                o(+new Date(s), 0, c),
                e = e || {},
                e.update = t.update,
                e.emptyMsg = e.emptyMsg || "如果您设定的出发日期没有符合的席别和车次，自动查询备选日期的票",
                e.info = {
                    title: "选择备选日期",
                    empty: !1,
                    refresh: !1,
                    error: !1,
                    items: r
                },
                e.refresh = function(t) {
                    t(e.info)
                }
                ,
                h = h || new a,
                h.init(e)
            }
            )
        }
    }
    (o),
    Object.preventExtensions(o),
    n.exports = o
}
);
define("./widgets/autoSubmit/manualSubmit", ["../updateDynamicJs/updateDynamicJs", "../seatTypeMap/seatTypeMap", "../passengerTypeMap/passengerTypeMap", "../extension/extension", "../../interfaces/autoSubmitOrder", "../../interfaces/getQueueCount", "../../interfaces/checkRandCodeAnsyn", "../../interfaces/confirmSingleForQueue", "../../interfaces/queryTicketPrice", "../../lib/async", "../passenger/passenger", "../priorityTrain/priorityTrain", "../prioritySeats/prioritySeats", "../../interfaces/resultOrderForDcQueue", "../trainList/index", "../config/config", "../../lib/artTemplate", "../brush/brush", "../captcha/captcha", "../settings/settings", "../../lib/flow.js", "../login/login", "../window/window", "../../lib/retry", "../mobile/mobile", "../utils/shareMisc", "../../lib/jquery-overlay"], function(t, e, n) {
    "use strict";
    function i(t, e) {
        if (0 === t.length)
            return 0;
        for (var n = -1, i = 0; i < e.length; i++) {
            var a = e[i]
              , s = t.indexOf(a);
            -1 !== s && (-1 === n || n > s) && (n = s)
        }
        return n
    }
    function a(t, e, n) {
        function a(t, e) {
            var n, i = l.slice(0);
            i.sort(function(t, e) {
                return e.availidSeats.length == t.availidSeats.length ? t.index - e.index : e.availidSeats.length - t.availidSeats.length
            }
            );
            var a = i[0];
            for (n = 0; n < l.length; n++) {
                var s = l[n];
                -1 === s[t] && (s[t] = 999),
                -1 === s[e] && (s[e] = 999),
                (!a || s[t] < a[t] || s[t] === a[t] && s[e] < a[e]) && (a = s)
            }
            return a
        }
        e = e || [];
        for (var s = $("#select_priority").val(), o = _.getPrioritySeats() || [], r = b.getPriorityTrains(n) || [], c = function(t) {
            return r.length > 0 && -1 === r.indexOf(t.number) ? !1 : 0 === u(t).length ? !1 : o.length > 0 && 0 === h(t, o).length ? !1 : !0
        }
        , u = function(t) {
            var n = [];
            return t.seats.forEach(function(t) {
                ("有" === t.tickets || parseInt(t.tickets) >= e.length) && n.push(t)
            }
            ),
            n
        }
        , h = function(t, e) {
            var n = []
              , i = u(t);
            return i.forEach(function(t) {
                -1 !== e.indexOf(t.name) && n.push(t.name)
            }
            ),
            n
        }
        , l = [], d = 0; d < t.length; d++) {
            var g = t[d];
            if (c(g)) {
                g.index = d;
                var p = u(g);
                g.availidSeats = p;
                var f = h(g, o);
                g.trainPrior = W(r, g.number),
                g.seatsPrior = i(o, f),
                g.seatType = o[g.seatsPrior] || p[0].name,
                l.push(g)
            }
        }
        return "车次优先" === s ? a("trainPrior", "seatsPrior") : a("seatsPrior", "trainPrior")
    }
    function s(t) {
        var e = t.floatwin;
        e && e.popup("hide"),
        $(document).trigger("unblock"),
        setTimeout(function() {
            $(document).trigger("restartbrush")
        }
        , 0)
    }
    function o(t) {
        var e = t.floatwin;
        e && e.popup("hide"),
        N.alert({
            content: "提交订单失败，请重试"
        })
    }
    var r = {}
      , c = t("../updateDynamicJs/updateDynamicJs")
      , u = t("../seatTypeMap/seatTypeMap")
      , h = t("../passengerTypeMap/passengerTypeMap")
      , l = t("../extension/extension")
      , d = t("../../interfaces/autoSubmitOrder")
      , g = t("../../interfaces/getQueueCount")
      , p = t("../../interfaces/checkRandCodeAnsyn")
      , f = t("../../interfaces/confirmSingleForQueue")
      , y = t("../../interfaces/queryTicketPrice")
      , m = t("../../lib/async")
      , x = t("../passenger/passenger")
      , b = t("../priorityTrain/priorityTrain")
      , _ = t("../prioritySeats/prioritySeats")
      , w = t("../../interfaces/resultOrderForDcQueue")
      , v = t("../trainList/index")
      , z = t("../config/config")
      , D = t("../../lib/artTemplate")
      , j = t("../brush/brush")
      , k = t("../captcha/captcha")
      , T = t("../settings/settings")
      , S = t("../../lib/flow.js")
      , C = t("../login/login")
      , N = t("../window/window")
      , H = t("../../lib/retry")
      , M = t("../mobile/mobile")
      , P = t("../utils/shareMisc");
    t("../../lib/jquery-overlay");
    var Y = new k({
        imgSelector: "#randcode",
        iptSelector: "#inputcode",
        check: "randp",
        no_check: !0,
        maxRetry: 1,
        url: T.protocol + T.hostname + "/otn/passcodeNew/getPassCodeNew?module=passenger"
    })
      , L = !1
      , B = function(t, e) {
        var n = u[e];
        if ("WZ" === n) {
            var i = t.seatTypes.match(/(.).*\1/);
            i ? n = i[1] : (t.seats.some(function(t) {
                return t || (t = {}),
                "ze" !== t.code && "yz" !== t.code || "--" === t.tickets ? void 0 : (n = u[t.code],
                !0)
            }
            ),
            "WZ" === n && (n = u.yz))
        }
        return t.seatTypes.indexOf("8") > -1 && ("ze" === e || "wz" === e) && (n = "8"),
        t.seatTypes.indexOf("7") > -1 && "zy" === e && (n = "7"),
        n
    }
      , F = function(t, e) {
        var n = [];
        L = x.getSelectedPassengers(t, function(t, i) {
            t ? -1 === t.errno && e(t) : (i.forEach(function(t) {
                n.push({
                    name: t.passenger_name,
                    type: t.passenger_type,
                    id_type: t.passenger_id_type_code,
                    id_no: t.passenger_id_no,
                    tel: t.mobile_no
                })
            }
            ),
            e(null , n))
        }
        )
    }
      , W = function(t, e) {
        0 === t.length ? 0 : -1;
        for (var n = 0; n < t.length; n++)
            t[n] = t[n].toUpperCase();
        return t.indexOf(e.toUpperCase())
    }
      , q = function(t, e) {
        var n;
        return t.some(function(t) {
            return t.name === e ? (n = t,
            !0) : void 0
        }
        ),
        n
    }
      , Q = function(t, e, n) {
        n || (console.info("255: seat"),
        n = {});
        var i = B(e, n.code)
          , a = []
          , s = [];
        n.tickets;
        var o = !$("#student_identity")[0].checked && z.get("studentToAdult") || !1;
        (t || []).forEach(function(t) {
            var e = t.type;
            e = "3" == e && o ? "1" : e,
            a.push(i + ",0," + e + "," + t.name + "," + t.id_type + "," + t.id_no + "," + t.tel + ",N"),
            s.push(t.name + "," + t.id_type + "," + t.id_no + "," + e)
        }
        );
        var r = a.join("_")
          , c = s.join("_") + "_";
        return {
            passengerTicketStr: r,
            oldPassengerStr: c
        }
    }
      , J = "autoSubmit"
      , A = "#chk_auto_submit_switcher"
      , X = "#select_priority"
      , Z = !1
      , O = new S
      , E = {}
      , I = function() {
        var t = [];
        for (var e in E) {
            var n = E[e];
            t.push(Math.floor(n.x - 5)),
            t.push(Math.floor(n.y - 30))
        }
        return t.join(",")
    }
    ;
    O.addStep("读取用户配置", {
        output: {
            config: {
                empty: !1
            }
        },
        go: function(t, e) {
            t.config = z.get(J) || {},
            e(t)
        }
    }),
    O.addStep("根据配置更新控件状态", {
        input: {
            config: {
                empty: !1
            }
        },
        go: function(t, e) {
            var n = t.config;
            $(A).attr("checked", !!n.auto);
            var i = $(X);
            i.attr("disabled", !n.auto),
            n.priority && i.attr({
                value: n.priority
            }),
            T.autoSubmitRec ? $("#auto_submit_label").html("全自动抢票") : $("#auto_submit_label").html("自动提交"),
            e(t)
        }
    }),
    O.addStep("是否已经初始化过", {
        type: "condition",
        input: {
            inited: {
                empty: !0
            }
        },
        output: {
            inited: {
                empty: !1
            }
        },
        go: function(t, e) {
            t.inited ? e(t, "初始化过") : (t.inited = !0,
            e(t, "未初始化过"))
        }
    }),
    O.addStep("监听相关事件", {
        type: "event",
        output: {
            auto: {
                empty: !0
            },
            priority: {
                empty: !0
            },
            listData: {
                empty: !0
            }
        },
        go: function(t, e, n) {
            var i = $(X);
            $(A).on("change", function() {
                var e = $(this).is(":checked");
                t.auto = e,
                n(t, "自动预订状态变化")
            }
            ),
            i.on("change", function() {
                var e = $(this).val();
                t.priority = e,
                n(t, "优先项变化")
            }
            ),
            $(document).on("afterrender", function(e, i) {
                t.listData = i,
                n(t, "车次列表更新")
            }
            ),
            e(t)
        }
    }),
    O.addStep("保存用户配置", {
        input: {
            config: {
                empty: !1
            }
        },
        go: function(t, e) {
            var n = {};
            n[J] = t.config,
            z.set(n, function(t) {
                console.log(t)
            }
            ),
            e(t)
        }
    }),
    O.addStep("更新自动预定状态", {
        input: {
            auto: {
                empty: !1
            },
            config: {
                empty: !1
            }
        },
        output: {
            config: {
                empty: !1
            }
        },
        go: function(t, e) {
            var n = t.config;
            n.auto = t.auto,
            $(X).attr("disabled", !n.auto),
            e(t)
        }
    }),
    O.addStep("更新优先项", {
        input: {
            priority: {
                empty: !1
            },
            config: {
                empty: !1
            }
        },
        output: {
            config: {
                empty: !1
            }
        },
        go: function(t, e) {
            var n = t.config;
            n.priority = t.priority,
            e(t)
        }
    }),
    O.addStep("是否是自动预定", {
        input: {
            config: {
                empty: !1
            }
        },
        type: "condition",
        go: function(t, e) {
            var n = t.config;
            n.auto ? e(t, "是") : e(t, "否")
        }
    }),
    O.addStep("是否在自动刷票", {
        type: "condition",
        go: function(t, e) {
            j.getStatus() ? e(t, "是") : e(t, "否")
        }
    }),
    O.addStep("记录当前登录用户", {
        output: {
            username: {
                empty: !0
            }
        },
        go: function(t, e) {
            t.username = C.getStatus().name,
            console.log("记录的用户:" + t.username),
            e(t)
        }
    }),
    O.addStep("获取乘客信息", {
        type: "condition",
        input: {
            bookableTrain: {
                empty: !0
            },
            bookableSeat: {
                empty: !0
            }
        },
        output: {
            selectedPassengers: {
                empty: !0
            },
            bookableTrain: {
                empty: !0
            },
            bookableSeat: {
                empty: !0
            },
            errmsg: {
                empty: !0
            }
        },
        go: function(t, e) {
            var n = {};
            t.bookableSeat && t.bookableTrain && (n.train = t.bookableTrain,
            n.seat = t.bookableSeat),
            F(n, function(n, i) {
                n ? (t.errmsg = "获取乘客信息失败：" + n.errmsg,
                -1 !== t.errmsg.indexOf("用户未登录") ? ($(document).trigger("logintimeout"),
                e(t, "未登录")) : e(t, "失败")) : (t.selectedPassengers = i,
                e(t, "成功"))
            }
            )
        }
    }),
    O.addStep("查找可预定的车次和席别", {
        type: "condition",
        input: {
            listData: {
                empty: !1
            },
            selectedPassengers: {
                empty: !0
            }
        },
        output: {
            bookableTrain: {
                empty: !0
            },
            bookableSeat: {
                empty: !0
            }
        },
        go: function(t, e) {
            var n = t.listData.list
              , i = t.selectedPassengers
              , s = a(n, i, t);
            s ? (t.bookableTrain = s,
            t.bookableSeat = q(s.seats, s.seatType),
            t.bookableSeat ? e(t, "找到") : (console.info("486: getSeatByName"),
            e(t, "未找到"))) : e(t, "未找到")
        }
    }),
    O.addStep("触发可预定事件", {
        input: {
            type: {
                empty: !0
            }
        },
        go: function(t, e) {
            $(document).trigger("canorder", [$("#chk_auto_submit_switcher")[0].checked]),
            e(t)
        }
    }),
    O.addStep("触发自动预定事件", {
        go: function(t, e) {
            $(document).trigger("autosubmit"),
            e(t)
        }
    }),
    O.addStep("触发正在提交事件", {
        go: function(t, e) {
            $(document).trigger("ordersubmiting"),
            e(t)
        }
    }),
    O.addStep("尝试自动登录", {
        type: "condition",
        input: {
            username: {
                empty: !0
            }
        },
        output: {
            username: {
                empty: !0
            }
        },
        go: function(t, e) {
            !function() {
                C.login().done(function() {
                    e(t, "成功")
                }
                ).fail(function() {
                    e(t, "失败")
                }
                )
            }
            ()
        }
    }),
    O.addStep("通知用户已切换账号", {
        input: {
            username: {
                empty: !1
            }
        },
        go: function(t) {
            $(document).trigger("ordersubmiterror", {
                code: "changeuser",
                msg: "已切换账号"
            }),
            $(document).trigger("cannotautosubmit", {
                code: "changeuser",
                msg: "您已切换账号，请重新设置刷票条件"
            }),
            $(document).trigger("loginstatuschange", {
                status: "online",
                name: t.username
            })
        }
    }),
    O.addStep("通知用户无法自动登录", {
        go: function() {
            $(document).trigger("logintimeout"),
            T.autoLoginRec || $(document).trigger("cannotautosubmit", {
                code: "notlogin",
                msg: "12306官方服务器不稳定，请您重新登录"
            }),
            $(document).trigger("ordersubmiterror", {
                code: "notlogin",
                msg: "用户未登录"
            })
        }
    }),
    O.addStep("展示正在提交浮层", {
        input: {
            floatwin: {
                empty: !0
            },
            bookableTrain: {
                empty: !1
            },
            bookableSeat: {
                empty: !1
            }
        },
        output: {
            floatwin: {
                empty: !1
            }
        },
        go: function(t, e) {
            var n = t.floatwin
              , i = t.bookableTrain
              , a = t.bookableSeat;
            n || (n = $('<div style="background:white;"/>'),
            $(document.body).append(n),
            $(document).on("ordersubmiterror", function() {
                n.popup("hide")
            }
            )),
            n.html(D.render("confirm_ordering_template", {
                train: i,
                seatName: a.name
            })),
            n.popup({
                blur: !1,
                transition: "all 0.2s",
                escape: !1
            }),
            n.popup("show"),
            n.find("[data-confirm-btn=close]").on("click", function(t) {
                t.preventDefault(),
                n.popup("hide"),
                $(document).trigger("cancelorder")
            }
            ),
            t.floatwin = n,
            e(t)
        }
    }),
    O.addStep("获取起止城市信息", {
        output: {
            cities: {
                empty: !1
            }
        },
        go: function(t, e) {
            var n = K.bookableTrain || {};
            t.cities = {
                from: n.from || $("#station_from_text"),
                to: n.to || $("#station_to_text")
            },
            e(t)
        }
    }),
    O.addStep("尝试创建订单", {
        type: "condition",
        input: {
            selectedPassengers: {
                empty: !1
            },
            bookableTrain: {
                empty: !1
            },
            bookableSeat: {
                empty: !1
            },
            cities: {
                empty: !1
            },
            floatwin: {
                empty: !1
            },
            randCode: {
                empty: !0
            },
            type: {
                empty: !0
            }
        },
        output: {
            orderInfo: {
                empty: !1
            },
            showPassCode: {
                empty: !0
            },
            canChooseSeats: {
                empty: !0
            },
            confirmSingleForQueueDelayTime: {
                empty: !0
            },
            bookableTrain: {
                empty: !0
            }
        },
        go: function(t, e) {
            var n = t.selectedPassengers
              , i = t.bookableTrain
              , a = t.bookableSeat;
            if (!i || !a)
                return console.info("662: ", i, a),
                "auto" == t.type ? s(t) : o(t),
                !1;
            var r = Q(n, i, a)
              , u = r.passengerTicketStr
              , h = r.oldPassengerStr
              , l = i.date.split("-")
              , g = !1
              , p = 0
              , f = 2
              , y = null ;
            t.floatwin.find("[data-confirm-btn=close]").on("click", function(t) {
                t.preventDefault(),
                g = !0,
                y && clearTimeout(y),
                $(document).trigger("cancelorder")
            }
            ),
            L !== !0 && (x.refresh(null , !0),
            L = !1),
            setTimeout(function m() {
                d({
                    data: {
                        secretStr: decodeURIComponent(i.secret),
                        train_date: l.join("-"),
                        tour_flag: "dc",
                        purpose_codes: i.purpose,
                        query_from_station_name: t.cities.from,
                        query_to_station_name: t.cities.to,
                        cancel_flag: "2",
                        bed_level_order_num: "000000000000000000000000000000",
                        passengerTicketStr: u,
                        oldPassengerStr: h
                    },
                    success: function(n) {
                        g || (n.status && 0 === n.messages.length && n.data.submitStatus === !0 ? (t.canChooseSeats = "Y" == n.data.canChooseSeats,
                        t.showPassCode = "Y" == n.data.ifShowPassCode,
                        t.confirmSingleForQueueDelayTime = parseInt(n.data.ifShowPassCodeTime) || 0,
                        t.orderInfo = n.data.result,
                        e(t, "成功")) : n.messages.length > 0 && -1 !== n.messages[0].indexOf("用户未登录") || n.data && "用户未登录" === n.data.errMsg ? e(t, "未登录") : n.messages.length > 0 && n.messages[0].match(/非法请求|第三方/) ? c.updateSig(T.protocol + T.hostname + "/otn/leftTicket/init", function() {
                            y = setTimeout(function() {
                                "auto" == t.type && t.floatwin.is(":visible") ? (t.floatwin.popup("hide"),
                                $(document).trigger("notify", {
                                    audioPlay: !1,
                                    msg: "下单遇到问题，正在帮你重试"
                                }),
                                $(document).trigger("restartbrush")) : ++p > f ? ($(document).trigger("cannotautosubmit", {
                                    code: "ordersubmiterror",
                                    msg: "提交订单出错"
                                }),
                                $(document).trigger("ordersubmiterror", {
                                    code: "responsefailed",
                                    msg: "接口返回查询失败",
                                    detail: n,
                                    type: t.type
                                })) : (t.floatwin.find(".ordering_text").text("下单遇到问题，正在帮你重试"),
                                m())
                            }
                            , 2e3)
                        }
                        ) : ($(document).trigger("cannotautosubmit", {
                            code: "ordersubmiterror",
                            msg: "提交订单出错"
                        }),
                        $(document).trigger("ordersubmiterror", {
                            code: "responsefailed",
                            msg: "接口返回查询失败",
                            detail: n,
                            type: t.type
                        })))
                    },
                    error: function() {
                        g || e(t, "超时")
                    }
                })
            }
            , 100)
        }
    }),
    O.addStep("提示用户请求超时", {
        input: {
            floatwin: {
                empty: !0
            }
        },
        go: function(t) {
            t.floatwin && t.floatwin.popup("hide"),
            $(document).trigger("ordersubmiterror", {
                code: "neterror",
                msg: "网络错误",
                type: t.type
            })
        }
    }),
    O.addStep("展示订单确认浮层", {
        input: {
            bookableTrain: {
                empty: !1
            },
            bookableSeat: {
                empty: !1
            },
            selectedPassengers: {
                empty: !1
            },
            config: {
                empty: !1
            },
            floatwin: {
                empty: !1
            },
            type: {
                empty: !1
            },
            showPassCode: {
                empty: !0
            }
        },
        go: function(t, e) {
            function n(t) {
                var e = $(t).offset();
                return {
                    x: e.left,
                    y: e.top
                }
            }
            function i(t) {
                return {
                    x: t.pageX,
                    y: t.pageY
                }
            }
            function a(t, e) {
                var n = 26
                  , i = $("<div></div>").css({
                    position: "absolute",
                    width: n + "px",
                    height: n + "px",
                    borderRadius: n + "px",
                    left: e.x - n / 2 + "px",
                    top: e.y - n / 2 + "px"
                }).attr("class", "randcode-dot").on("click", function() {
                    delete E[e.id],
                    $(this).remove()
                }
                );
                E[e.id] = e,
                t.append(i)
            }
            function r(t) {
                return t.y > 30
            }
            function c(t) {
                var e = $("#rand_input .img-wrapper")
                  , s = n(e)
                  , o = i(t)
                  , c = {
                    x: o.x - s.x,
                    y: o.y - s.y
                };
                c.id = c.x + "-" + c.y,
                r(c) && a(e, c)
            }
            var l = t.bookableTrain
              , d = t.bookableSeat;
            if (!l || !d)
                return console.info("751: ", l, d),
                "auto" == t.type ? s(t) : o(t),
                !1;
            var g = t.floatwin
              , p = t.selectedPassengers
              , f = []
              , m = u[d.code]
              , x = [];
            t.selectedPassengers.forEach(function(t) {
                var e = {
                    passengerName: t.name,
                    passengerIdNo: t.id_no,
                    seatName: d.name,
                    passengerType: h[t.type]
                };
                x.push(t.name),
                f.push(e)
            }
            ),
            g.html(D.render("submit_confirm_template", {
                ticketOrders: f,
                train: l,
                seatName: d.name,
                passengers: x.join('<span class="seprator"></span>')
            })),
            t.showPassCode ? $("#rand_input").removeClass("hide-passcode") : $("#rand_input").addClass("hide-passcode"),
            g.find("#inputcode");
            try {} catch (b) {}
            $("#refreshrand").on("click", function(t) {
                t.preventDefault(),
                E = {},
                $("#rand_input").find(".randcode-dot").remove(),
                Y.$img = g.find("#randcode"),
                Y.showCaptcha()
            }
            ),
            $("#randcode").on("click", function(t) {
                c(t)
            }
            ),
            $("#btn_passengers_detail").on("click", function(t) {
                t.preventDefault(),
                $(t.target),
                $("#passengers_detail").toggle(),
                $(t.target).toggleClass("expand")
            }
            ),
            y({
                data: {
                    train_no: l.id,
                    from_station_no: l.fromNo,
                    to_station_no: l.toNo,
                    seat_types: l.seatTypes,
                    train_date: l.date
                },
                success: function(t) {
                    if (t.status === !0) {
                        var e = t.data
                          , n = e[isNaN(m) ? m : "A" + m];
                        if (n) {
                            var i = parseFloat(n.substring(1)) * p.length;
                            g.find("[data-passenger-detail=price]").html(n),
                            g.find("[data-passenger-detail=totalprice]").html("¥" + i)
                        }
                    }
                },
                error: function() {}
            }),
            e(t)
        }
    }),
    O.addStep("查询排队状态", {
        input: {
            orderInfo: {
                empty: !1
            },
            bookableTrain: {
                empty: !1
            },
            bookableSeat: {
                empty: !1
            },
            floatwin: {
                empty: !1
            },
            type: {
                empty: !1
            }
        },
        output: {
            ticketKey: {
                empty: !1
            },
            leftTicket: {
                empty: !1
            },
            ticketLoc: {
                empty: !1
            },
            isAsync: {
                empty: !1
            }
        },
        go: function(t, e) {
            var n = t.orderInfo
              , i = t.bookableTrain
              , a = t.bookableSeat;
            if (!i || !a)
                return console.info("846: ", i, a),
                "auto" == t.type ? s(t) : o(t),
                !1;
            var r = u[a.code]
              , c = n.split("#")[1]
              , h = n.split("#")[0]
              , l = n.split("#")[2]
              , d = n.split("#")[3];
            if (t.ticketKey = c,
            t.leftTicket = l,
            t.ticketLoc = h,
            t.isAsync = d,
            "1" !== d)
                return e(t),
                void 0;
            var p = new Date
              , f = i.date.split("-");
            p.setFullYear(f[0], f[1] - 1, f[2]),
            g({
                data: {
                    train_date: p.toString(),
                    train_no: i.id,
                    stationTrainCode: i.number,
                    seatType: r,
                    fromStationTelecode: i.startCity.toUpperCase(),
                    toStationTelecode: i.endCity.toUpperCase(),
                    leftTicket: l,
                    purpose_codes: i.purpose
                },
                success: function() {},
                error: function() {}
            }),
            e(t)
        }
    }),
    O.addStep("监听验证码事件", {
        type: "event",
        input: {
            floatwin: {
                empty: !1
            },
            config: {
                empty: !1
            },
            type: {
                empty: !1
            }
        },
        output: {
            randCode: {
                empty: !0
            }
        },
        go: function(t, e, n) {
            $("#manual_btn").on("click", function(e) {
                e.preventDefault(),
                n(t, "手动输入")
            }
            ),
            e(t)
        }
    }),
    O.addStep("设置输入焦点", {
        input: {
            floatwin: {
                empty: !1
            },
            config: {
                empty: !1
            },
            type: {
                empty: !1
            }
        },
        output: {
            randCode: {
                empty: !1
            }
        },
        go: function(t, e) {
            var n = $("#inputcode");
            n.focus(),
            e(t)
        }
    }),
    O.addStep("监听用户输入", {
        type: "event",
        input: {
            floatwin: {
                empty: !1
            },
            config: {
                empty: !1
            },
            type: {
                empty: !1
            }
        },
        output: {
            randCode: {
                empty: !0
            },
            imgdata: {
                empty: !0
            },
            manual: {
                empty: !0
            }
        },
        go: function(t, e, n) {
            var i = t.floatwin;
            t.config;
            var a = i.find("#inputcode")
              , s = !1;
            a.on("input", function(e) {
                var i = $(e.target)
                  , a = i.val();
                a.length < 4 && (s = !1),
                4 === a.length && s === !1 && (t.randCode = a,
                s = !0,
                n(t, "输入完毕"))
            }
            ),
            i.find("[data-confirm-btn=apply]").on("click", function() {
                var e = $(this);
                e.hasClass("disabled") || (e.addClass("disabled").text("提交中"),
                t.randCode = I(),
                t.imgdata = $("#randcode").attr("src"),
                t.manual = !0,
                n(t, "输入完毕"))
            }
            ),
            a.focus(),
            e(t)
        }
    }),
    O.addStep("校验验证码", {
        type: "condition",
        input: {
            floatwin: {
                empty: !1
            },
            randCode: {
                empty: !1
            },
            imgdata: {
                empty: !1
            },
            manual: {
                empty: !1
            },
            showPassCode: {
                empty: !0
            },
            captcha: {
                empty: !0
            }
        },
        go: function(t, e) {
            if (!Z) {
                Z = !0;
                var n = t.floatwin.find("[data-confirm-btn=apply]");
                if (!t.showPassCode)
                    return Z = !1,
                    n.removeClass("disabled").text("立即提交"),
                    e(t, "正确"),
                    void 0;
                var i = 3;
                (t.captcha || {})._delayCheckOtnTimer = setTimeout(function() {
                    !function a(s) {
                        p({
                            data: {
                                randCode: t.randCode
                            },
                            success: function(o) {
                                if (o.status === !0 && ("Y" === o.data || o.data && "1" === o.data.result))
                                    t.manual ? P.shareCaptcha($("#randcode")[0], t.randCode, "order") : P.statImgVcode("ordersuccess"),
                                    Z = !1,
                                    n.removeClass("disabled").text("立即提交"),
                                    e(t, "正确");
                                else {
                                    var r = /error|err_top|网络可能存在问题，请您重试一下/
                                      , c = "string" == typeof o && o.match(r);
                                    c && ++s <= i ? setTimeout(function() {
                                        a(s)
                                    }
                                    , 1e3 * (1 + Math.random())) : (!t.manual && t.imgdata && (P.shareCaptchaAutoFaild(t.imgdata, t.randCode, "order", "orderautofailed"),
                                    P.statImgVcode("orderfailed")),
                                    Z = !1,
                                    n.removeClass("disabled").text("立即提交"),
                                    e(t, "错误"))
                                }
                            },
                            error: function() {
                                Z = !1,
                                n.removeClass("disabled").text("立即提交"),
                                e(t, "错误")
                            }
                        })
                    }
                    (0)
                }
                , 4e3 + 500 * Math.random())
            }
        }
    }),
    O.addStep("展示正在出票浮层", {
        go: function(t, e) {
            var n = $("[data-confirm-area=randcode]")
              , i = $("[data-confirm-area=submiting]")
              , a = $("#confirm_title");
            n.hide(),
            $("[data-confirm-area]").hide(),
            i.show(),
            a.html("订单已提交，正在出票"),
            e(t)
        }
    }),
    O.addStep("确认下单", {
        type: "condition",
        input: {
            randCode: {
                empty: !0
            },
            selectedPassengers: {
                empty: !1
            },
            bookableSeat: {
                empty: !1
            },
            bookableTrain: {
                empty: !1
            },
            ticketKey: {
                empty: !1
            },
            leftTicket: {
                empty: !1
            },
            ticketLoc: {
                empty: !1
            },
            isAsync: {
                empty: !1
            },
            floatwin: {
                empty: !1
            },
            type: {
                empty: !1
            },
            canChooseSeats: {
                empty: !0
            },
            confirmSingleForQueueDelayTime: {
                empty: !0
            }
        },
        go: function(t, e) {
            var n = t.selectedPassengers
              , i = t.bookableTrain
              , a = t.bookableSeat;
            if (!i || !a)
                return console.info("1024: ", i, a),
                "auto" == t.type ? s(t) : o(t),
                !1;
            var r = Q(n, i, a)
              , u = 0
              , h = 3
              , l = null 
              , d = this;
            t.floatwin.find("[data-confirm-btn=close]").on("click", function(t) {
                t.preventDefault(),
                l && clearTimeout(l),
                $(document).trigger("cancelorder")
            }
            );
            var g = t.confirmSingleForQueueDelayTime || 0;
            setTimeout(function p() {
                var n = new H({
                    max: 5
                });
                n.on("done", function(n) {
                    if (n.status === !0 && n.data && n.data.submitStatus === !0)
                        e(t, "成功");
                    else {
                        var i = /第三方|非法请求|出票失败/
                          , a = /排队人数现已超过余票数|余票不足/
                          , s = n.data && n.data.errMsg || "下单遇到问题"
                          , o = s.match(a) || s.match(i);
                        if (o)
                            if ("auto" == t.type && t.floatwin.is(":visible")) {
                                var r = o[0].match(i)
                                  , d = r ? "下单遇到问题" : o[0];
                                t.floatwin.find("#printing_txt").html(d + "<br>正在帮你重试");
                                var g = function() {
                                    l = setTimeout(function() {
                                        t.floatwin.popup("hide"),
                                        $(document).trigger("notify", {
                                            audioPlay: !1,
                                            msg: d + "，正在帮你重试"
                                        }),
                                        $(document).trigger("restartbrush")
                                    }
                                    , 2e3)
                                }
                                ;
                                r ? c.updateSig(T.protocol + T.hostname + "/otn/leftTicket/init", function() {
                                    g()
                                }
                                ) : g()
                            } else
                                ++u <= h ? (t.floatwin.find("#printing_txt").html(s + "<br>正在帮你重试"),
                                l = setTimeout(function() {
                                    p()
                                }
                                , 2e3)) : (e(t, "失败"),
                                $(document).trigger("ordersubmiterror", {
                                    code: "responsefailed",
                                    msg: "接口返回操作失败",
                                    detail: n,
                                    type: t.type
                                }),
                                $(document).trigger("cannotautosubmit", {
                                    code: "ordererror"
                                }));
                        else
                            e(t, "失败"),
                            $(document).trigger("ordersubmiterror", {
                                code: "responsefailed",
                                msg: "接口返回操作失败",
                                detail: n,
                                type: t.type
                            }),
                            $(document).trigger("cannotautosubmit", {
                                code: "ordererror"
                            })
                    }
                }
                ),
                n.on("fail", function() {
                    e(t, "失败"),
                    $(document).trigger("ordersubmiterror", {
                        code: "neterror",
                        msg: "网络错误",
                        type: t.type
                    })
                }
                ),
                d._passed || ($(document).on("cancelorder", function() {
                    n.stop()
                }
                ),
                d._passed = !0),
                n.start(function(e) {
                    f({
                        isAsync: t.isAsync,
                        data: {
                            passengerTicketStr: r.passengerTicketStr,
                            oldPassengerStr: r.oldPassengerStr,
                            randCode: t.randCode || "",
                            purpose_codes: i.purpose,
                            key_check_isChange: t.ticketKey,
                            leftTicketStr: t.leftTicket,
                            train_location: t.ticketLoc,
                            choose_seats: t.canChooseSeats && $("#choose_seat_1A")[0].checked ? $("#choose_seat_1A").val() : "",
                            seatDetailType: ""
                        },
                        success: function(t) {
                            e(!0, t)
                        },
                        error: function() {
                            e()
                        }
                    })
                }
                )
            }
            , g + 400 * Math.random())
        }
    }),
    O.addStep("排队", {
        type: "condition",
        input: {
            isAsync: {
                empty: !1
            }
        },
        output: {
            orderId: {
                empty: !1
            },
            silence: {
                empty: !1
            }
        },
        go: function(t, e) {
            var n = 1
              , i = 1
              , a = null ;
            return t.orderId = 0,
            t.silence = !1,
            "1" !== t.isAsync ? (e(t, "成功"),
            void 0) : (m.whilst(function() {
                return 0 > i && -100 != i ? !1 : !0
            }
            , function(s) {
                n === i || -100 == i ? l.ajax({
                    url: T.protocol + T.hostname + "/otn/confirmPassenger/queryOrderWaitTime",
                    dataType: "json",
                    data: {
                        random: Date.now(),
                        tourFlag: "dc",
                        _json_att: ""
                    },
                    success: function(o) {
                        var r = o.data;
                        if (a = r,
                        !r || !r.waitTime || !r.queryOrderWaitTimeStatus)
                            return $(document).trigger("ordersubmiterror", {
                                code: "responsefailed",
                                msg: "排队失败",
                                detail: o,
                                type: K.type
                            }),
                            e(t, "失败"),
                            void 0;
                        if (i = r.waitTime,
                        0 > i && -1 !== i && -100 !== i) {
                            var c = $(A).is(":checked") && "auto" == K.type
                              , u = /没有足够的票|排队人数现已超过余票数|不能售票/;
                            return t.silence = c && r.msg && r.msg.match(u),
                            t.silence = t.silence ? !0 : !1,
                            o.silence = t.silence,
                            $(document).trigger("ordersubmiterror", {
                                code: "responsefailed",
                                msg: "排队失败",
                                detail: o,
                                type: t.type
                            }),
                            e(t, "失败"),
                            void 0
                        }
                        var h = parseInt(r.waitTime / 1.5);
                        h = h > 60 ? 60 : h;
                        var l = r.waitTime - h;
                        if (n = 0 >= l ? 1 : l,
                        i / 60 > 1) {
                            var d = parseInt(i / 60)
                              , g = 30;
                            d = d > g ? "超过" + g : d,
                            $("#printing_txt").hide(),
                            $("#waiting_txt").show(),
                            $("#waittime").html(d)
                        } else
                            $("#printing_txt").show(),
                            $("#waiting_txt").hide();
                        setTimeout(s, 1e3)
                    },
                    error: function() {
                        $(document).trigger("ordersubmiterror", {
                            code: "responsefailed",
                            msg: "排队失败",
                            detail: {
                                data: "12306官方服务器不稳定，排队失败"
                            },
                            type: t.type
                        }),
                        e(t, "失败")
                    }
                }) : (i--,
                setTimeout(s, 1e3))
            }
            , function() {
                t.orderId = a.orderId,
                e(t, "成功")
            }
            ),
            void 0)
        }
    }),
    O.addStep("查询订单结果", {
        type: "condition",
        input: {
            isAsync: {
                empty: !1
            },
            orderId: {
                empty: !1
            }
        },
        go: function(t, e) {
            return "1" !== t.isAsync ? (e(t, "成功"),
            void 0) : (w({
                data: {
                    orderSequence_no: t.orderId
                },
                success: function(n) {
                    n.status === !0 && n.data && n.data.submitStatus === !0 ? e(t, "成功") : e(t, "失败")
                },
                error: function() {
                    $(document).trigger("ordersubmiterror", {
                        code: "neterror",
                        msg: "网络错误",
                        type: t.type
                    })
                }
            }),
            void 0)
        }
    }),
    O.addStep("展示订票成功浮层", {
        input: {
            floatwin: {
                empty: !1
            },
            bookableSeat: {
                empty: !1
            },
            bookableTrain: {
                empty: !1
            },
            selectedPassengers: {
                empty: !1
            },
            type: {
                empty: !0
            }
        },
        go: function(t, e) {
            function n() {
                var n = $("[data-confirm-area=submiting]")
                  , i = $("[data-confirm-area=submiterror]")
                  , a = $("[data-confirm-area=submited]")
                  , s = $("#confirm_title");
                i.hide(),
                n.hide(),
                $("[data-confirm-area]").hide(),
                a.show(),
                s.html("订单提交成功"),
                $(document).trigger("ordersubmited"),
                a.find("[data-confirm-btn=submit]").on("click", function(e) {
                    e.preventDefault();
                    var n = $('<form style="display:none;" target="_blank" method="post" action="' + T.protocol + T.hostname + "/otn//payOrder/init?" + Date.now() + '"><input type="hidden" name="_json_att" value=""></form>');
                    $(document.body).append(n),
                    n[0].submit(),
                    t.floatwin.popup("hide"),
                    n.remove()
                }
                ),
                "auto" == t.type && $(document).trigger("autosubmitsuccess");
                var o = ["http://dd.browser.360.cn/static/a/131.5148.gif", "http://dd.browser.360.cn/static/a/131.8083.gif", "http://dd.browser.360.cn/static/a/131.8791.gif", "http://dd.browser.360.cn/static/a/131.5109.gif", "http://dd.browser.360.cn/static/a/131.7156.gif"];
                (new Image).src = o[t.selectedPassengers.length - 1] + "?_" + Math.random(),
                P.statTrainInfo(t),
                e(t)
            }
            l.ajax({
                url: T.protocol + T.hostname + "/otn//payOrder/init?random=" + Date.now(),
                type: "POST",
                data: {
                    _json_att: ""
                },
                success: function(t) {
                    var e = t.match(/请在\s*<span class="colorA">(\d+)<\/span>\s*分钟/);
                    e ? $(".retention-time").text(e[1]) : $(".retention-time").text(30),
                    n()
                },
                error: function() {
                    $(".retention-time").text(30),
                    n()
                }
            })
        }
    }),
    O.addStep("通知用户付款", {
        go: function() {
            if ($(A).is(":checked") && "auto" == K.type && K.bookableTrain && K.bookableTrain.userSelectedDate) {
                var t = K.bookableTrain || {}
                  , e = new Date(Date.parse(t.userSelectedDate)).pattern("yyyy年M月d日")
                  , n = t.from
                  , i = t.to
                  , a = "贺电！360抢票王已成功帮你抢到" + e + "从" + n + "到" + i + "的火车票，请在45分钟内赶赴12306网站完成付款，这样才能确保火车票是你的喔！";
                M.postMsg(a)
            }
        }
    }),
    O.addStep("通知用户输入验证码", {
        go: function(t, e) {
            if ($(A).is(":checked") && "auto" == K.type && K.bookableTrain && K.bookableTrain.userSelectedDate) {
                var n = K.bookableTrain || {}
                  , i = new Date(Date.parse(n.userSelectedDate)).pattern("yyyy年M月d日")
                  , a = n.from
                  , s = n.to
                  , o = "十万火急！360抢票王已经帮你刷到" + i + "从" + a + "到" + s + "的火车票，需要你用百米冲刺的速度赶赴刚才抢票的设备上输入验证码完成下单！没时间了，快点儿去！";
                M.postMsg(o),
                e(t)
            }
        }
    }),
    O.addStep("展示订票失败浮层", {
        go: function() {
            var t = $("[data-confirm-area=submiting]")
              , e = $("[data-confirm-area=submiterror]")
              , n = $("[data-confirm-area=submited]")
              , i = $("#confirm_title");
            n.is(":visible") || (t.hide(),
            $("[data-confirm-area]").hide(),
            e.show(),
            i.html("下单提示"))
        }
    }),
    O.addStep("提示验证码错误", {
        input: {
            randCode: {
                empty: !1
            }
        },
        go: function(t, e) {
            E = {},
            $("#rand_input").find(".randcode-dot").remove();
            var n = $("#inputcode");
            n.addClass("error");
            var i = $("#errortip");
            i.html("验证码错误"),
            i.show(),
            setTimeout(function() {
                n.removeClass("error"),
                i.hide()
            }
            , 2e3),
            e(t)
        }
    }),
    O.addStep("提示用户车票信息过期", {
        input: {
            floatwin: {
                empty: !1
            }
        },
        go: function(t, e) {
            t.floatwin.popup("hide"),
            N.alert({
                content: "车票信息已过期，请重新查询最新车票信息",
                callback: function() {
                    e(t)
                }
            })
        }
    }),
    O.addStep("自动刷新车票信息", {
        go: function(t, e) {
            v.show(),
            e(t)
        }
    }),
    O.addStep("选中验证码", {
        input: {
            randCode: {
                empty: !1
            }
        },
        go: function(t, e) {
            var n = $("#inputcode");
            n.select(),
            e(t)
        }
    }),
    O.addStep("自动识别验证码", {
        type: "condition",
        input: {
            config: {
                empty: !1
            },
            autorec: {
                empty: !0
            },
            rectried: {
                empty: !1
            },
            captcha: {
                empty: !0
            }
        },
        output: {
            randCode: {
                empty: !0
            },
            rectried: {
                empty: !1
            },
            captcha: {
                empty: !0
            },
            imgdata: {
                empty: !0
            }
        },
        go: function(t, e) {
            function n() {
                if (t.rectried++,
                1 === t.rectried)
                    i.show().html("正在尝试自动识别验证码...");
                else {
                    if (!(t.rectried <= 2))
                        return e(t, "失败超限"),
                        void 0;
                    i.show().html("尝试第" + t.rectried + "次自动识别验证码")
                }
                a._delayTimer = setTimeout(function() {
                    a.auto({
                        module: "submit",
                        minByteLen: 2500
                    }, function(n) {
                        $("#errortip").hide().html(""),
                        n || (console.info("1282: result"),
                        n = {}),
                        n.code && "0000" !== n.code ? (t.randCode = n.code,
                        t.imgdata = n.imgdata,
                        e(t, "成功")) : (t.imgdata = n.imgdata,
                        P.shareCaptchaAutoFaild(t.imgdata, n.code, "order-unidentified", "orderautofailed"),
                        e(t, "失败"))
                    }
                    )
                }
                , 1e3 * (2 + Math.random()))
            }
            if (t.autorec !== !1) {
                $("#inputcode");
                var i = $("#autotip");
                t.config,
                t.captcha || (t.captcha = Y);
                var a = t.captcha;
                n(),
                t.captcha = a,
                e(t)
            }
        }
    }),
    O.addStep("暂停自动刷票", {
        go: function(t, e) {
            $(document).trigger("blocking"),
            e(t)
        }
    }),
    O.addStep("恢复刷票", {
        go: function(t, e) {
            $(document).trigger("unblock"),
            e(t)
        }
    }),
    O.addStep("停止刷票", {
        go: function(t, e) {
            $(document).trigger("cannotautosubmit"),
            e(t)
        }
    }),
    O.addStep("给出错误提示", {
        input: {
            errmsg: {
                empty: !1
            }
        },
        go: function(t, e) {
            N.alert({
                content: t.errmsg
            }),
            e(t)
        }
    }),
    O.addStep("已退出登录", {
        input: {
            errmsg: {
                empty: !1
            }
        },
        go: function(t, e) {
            N.alert({
                content: t.errmsg,
                callback: function() {
                    $(document).trigger("loginstatuschange", {
                        status: "offline",
                        name: t.username
                    })
                }
            }),
            e(t)
        }
    }),
    O.addStep("提示已切换账号", {
        input: {
            username: {
                empty: !0
            }
        },
        go: function(t, e) {
            N.alert({
                content: "您已登录了其他账号，即将切换到新账号",
                callback: function() {
                    $(document).trigger("loginstatuschange", {
                        status: "online",
                        name: t.username
                    })
                }
            }),
            e(t)
        }
    }),
    O.addStep("检查用户登录状态", {
        type: "condition",
        input: {
            username: {
                empty: !0
            }
        },
        output: {
            username: {
                empty: !0
            }
        },
        go: function(t, e) {
            C.checkUser(!0).done(function(n) {
                "" === t.username || t.username === n ? e(t, "已登录") : (t.username = n,
                e(t, "切换账号"))
            }
            ).fail(function() {
                e(t, "未登录")
            }
            )
        }
    }),
    O.addStep("标记为手动下单", {
        output: {
            type: {
                empty: !1
            }
        },
        go: function(t, e) {
            t.type = "manual",
            e(t)
        }
    }),
    O.addStep("标记为自动下单", {
        output: {
            type: {
                empty: !1
            }
        },
        go: function(t, e) {
            t.type = "auto",
            e(t)
        }
    }),
    O.addStep("是否是手动下单", {
        type: "condition",
        input: {
            type: {
                empty: !1
            }
        },
        go: function(t, e) {
            "auto" !== t.type ? e(t, "是") : e(t, "否")
        }
    }),
    O.addStep("停止自动识别", {
        input: {
            captcha: {
                empty: !0
            }
        },
        output: {
            autorec: {
                empty: !1
            }
        },
        go: function(t, e) {
            t.autorec = !1,
            t.captcha ? (Z = !1,
            t.captcha._delayTimer && clearTimeout(t.captcha._delayTimer),
            t.captcha._delayCheckOtnTimer && clearTimeout(t.captcha._delayCheckOtnTimer),
            t.captcha.stop(function() {
                e(t)
            }
            )) : e(t)
        }
    }),
    O.addStep("设置为自动识别", {
        output: {
            autorec: {
                empty: !1
            },
            rectried: {
                empty: !1
            }
        },
        go: function(t, e) {
            T.autoSubmitRec && (t.autorec = !0,
            t.rectried = 0),
            e(t)
        }
    }),
    O.addStep("提示失败超限", {
        input: {
            floatwin: {
                empty: !1
            }
        },
        go: function(t, e) {
            var n = t.floatwin.find("[data-confirm-area=recerror]")
              , i = t.floatwin.find("[data-confirm-area=randcode]");
            i.hide(),
            $("[data-confirm-area]").hide(),
            n.show(),
            e(t)
        }
    }),
    O.addStep("隐藏自动识别浮层", {
        go: function(t, e) {
            $("#rand_auto").hide(),
            e(t)
        }
    }),
    O.addStep("显示自动识别浮层", {
        go: function(t, e) {
            $("#rand_auto").show(),
            e(t)
        }
    }),
    O.addStep("显示输入浮层", {
        go: function(t, e) {
            console.log(JSON.stringify(E)),
            E = {},
            $("#rand_input").show(),
            e(t)
        }
    }),
    O.addStep("刷新验证码", {
        input: {
            imgdata: {
                empty: !0
            },
            showPassCode: {
                empty: !0
            }
        },
        output: {
            imgdata: {
                empty: !0
            }
        },
        go: function(t, e) {
            if (!t.showPassCode)
                return e(t),
                void 0;
            var n = T.protocol + T.hostname + "/otn/passcodeNew/getPassCodeNew?module=passenger&rand=randp&" + Math.random();
            t.imgdata && (n = "data:image/gif;base64," + t.imgdata,
            t.imgdata = ""),
            E = {},
            Y.$img = $("#randcode"),
            Y.showCaptcha(),
            e(t)
        }
    }),
    O.addStep("是否自动识别", {
        type: "condition",
        input: {
            autorec: {
                empty: !1
            },
            showPassCode: {
                empty: !0
            }
        },
        go: function(t, e) {
            t.autorec && t.showPassCode ? e(t, "是") : e(t, "否")
        }
    }),
    O.addStep("监听订单事件", {
        type: "event",
        input: {
            floatwin: {
                empty: !1
            }
        },
        go: function(t, e, n) {
            var i = t.floatwin;
            i.find("[data-confirm-btn=close]").on("click", function(e) {
                e.preventDefault(),
                i.popup("hide"),
                n(t, "关闭浮层"),
                $(document).trigger("cancelorder")
            }
            ),
            e(t)
        }
    }),
    O.addStep("初始化选中的车次和席别", {
        output: {
            bookableTrain: {
                empty: !1
            },
            bookableSeat: {
                empty: !1
            }
        },
        go: function(t, e) {
            t.bookableSeat = null ,
            t.bookableTrain = null ,
            e(t)
        }
    });
    var K = {};
    r.submit = function(t) {
        var e = t.train
          , n = t.seat;
        K.bookableTrain = e,
        K.bookableSeat = n,
        j.stop(),
        O.begin(K),
        O.go("记录当前登录用户"),
        O.go("获取乘客信息", {
            cases: {
                "成功": function() {
                    O.go("标记为手动下单"),
                    O.go("设置为自动识别"),
                    O.go("开始预定")
                },
                "未登录": function() {
                    O.go("给出错误提示")
                },
                "失败": function() {
                    O.go("给出错误提示")
                }
            }
        })
    }
    ,
    r.init = function() {
        O.begin(K),
        O.go("读取用户配置"),
        O.go("根据配置更新控件状态"),
        O.go("是否已经初始化过", {
            cases: {
                "未初始化过": function() {
                    O.go("监听相关事件", {
                        events: {
                            "自动预订状态变化": function() {
                                O.go("更新自动预定状态"),
                                O.go("保存用户配置")
                            },
                            "优先项变化": function() {
                                O.go("更新优先项"),
                                O.go("保存用户配置")
                            },
                            "车次列表更新": function() {
                                O.go("是否是自动预定", {
                                    cases: {
                                        "是": function() {
                                            O.go("是否在自动刷票", {
                                                cases: {
                                                    "是": function() {
                                                        O.go("暂停自动刷票"),
                                                        O.go("标记为自动下单"),
                                                        O.go("设置为自动识别"),
                                                        O.go("初始化选中的车次和席别"),
                                                        O.go("记录当前登录用户"),
                                                        O.go("获取乘客信息", {
                                                            cases: {
                                                                "成功": function() {
                                                                    O.go("查找可预定的车次和席别", {
                                                                        cases: {
                                                                            "找到": function() {
                                                                                O.go("开始自动预定")
                                                                            },
                                                                            "未找到": function() {
                                                                                O.go("恢复刷票")
                                                                            }
                                                                        }
                                                                    })
                                                                },
                                                                "未登录": function() {
                                                                    O.go("尝试自动登录", {
                                                                        cases: {
                                                                            "成功": function() {
                                                                                O.go("查找可预定的车次和席别", {
                                                                                    cases: {
                                                                                        "找到": function() {
                                                                                            O.go("开始自动预定")
                                                                                        }
                                                                                    }
                                                                                })
                                                                            },
                                                                            "失败": function() {
                                                                                O.go("通知用户无法自动登录")
                                                                            },
                                                                            "切换账号": function() {
                                                                                O.go("通知用户已切换账号")
                                                                            }
                                                                        }
                                                                    })
                                                                },
                                                                "失败": function() {
                                                                    O.go("给出错误提示"),
                                                                    O.go("停止刷票")
                                                                }
                                                            }
                                                        })
                                                    }
                                                }
                                            })
                                        },
                                        "否": function() {
                                            O.go("查找可预定的车次和席别", {
                                                cases: {
                                                    "找到": function() {
                                                        O.go("触发可预定事件")
                                                    }
                                                }
                                            })
                                        }
                                    }
                                })
                            }
                        }
                    })
                }
            }
        }),
        O.sub("开始自动预定", function() {
            O.go("开始预定")
        }
        ),
        O.sub("开始预定", function() {
            O.go("展示正在提交浮层"),
            O.go("获取起止城市信息"),
            O.go("开始创建订单")
        }
        ),
        O.sub("开始创建订单", function() {
            O.go("尝试创建订单", {
                cases: {
                    "成功": function(t) {
                        O.go("触发可预定事件"),
                        O.go("触发正在提交事件"),
                        O.go("查询排队状态"),
                        O.go("展示订单确认浮层"),
                        O.go("监听订单事件", {
                            events: {
                                "关闭浮层": function() {
                                    O.go("停止自动识别")
                                }
                            }
                        }),
                        "manual" == t.type || t.showPassCode ? O.go("等待输入验证码") : O.go("提交订单")
                    },
                    "未登录": function() {
                        O.go("尝试自动登录", {
                            cases: {
                                "成功": function() {
                                    O.go("开始创建订单")
                                },
                                "失败": function() {
                                    O.go("通知用户无法自动登录")
                                },
                                "切换账号": function() {
                                    O.go("通知用户已切换账号")
                                }
                            }
                        })
                    },
                    "车票信息已过期": function() {
                        O.go("提示用户车票信息过期"),
                        O.go("自动刷新车票信息")
                    },
                    "超时": function() {
                        O.go("是否是手动下单", {
                            cases: {
                                "否": function() {
                                    O.go("开始创建订单")
                                },
                                "是": function() {
                                    O.go("提示用户请求超时")
                                }
                            }
                        })
                    }
                }
            })
        }
        ),
        O.sub("等待输入验证码", function() {
            O.go("是否自动识别", {
                cases: {
                    "是": function() {
                        O.go("显示自动识别浮层"),
                        O.go("监听验证码事件", {
                            events: {
                                "手动输入": function() {
                                    O.go("切换到手动输入")
                                }
                            }
                        }),
                        O.go("开始自动识别")
                    },
                    "否": function() {
                        O.go("开始手动输入")
                    }
                }
            })
        }
        ),
        O.sub("切换到手动输入", function() {
            O.go("停止自动识别"),
            O.go("隐藏自动识别浮层"),
            O.go("开始手动输入")
        }
        ),
        O.sub("开始手动输入", function() {
            O.go("显示输入浮层"),
            O.go("刷新验证码"),
            O.go("监听用户输入", {
                events: {
                    "输入完毕": function() {
                        O.go("检查验证码")
                    }
                }
            })
        }
        ),
        O.sub("开始自动识别", function() {
            O.go("自动识别验证码", {
                cases: {
                    "成功": function() {
                        O.go("检查验证码")
                    },
                    "失败": function() {
                        O.go("开始自动识别")
                    },
                    "失败超限": function() {
                        O.go("切换到手动输入"),
                        O.go("通知用户输入验证码")
                    }
                }
            })
        }
        ),
        O.sub("检查验证码", function() {
            O.go("校验验证码", {
                cases: {
                    "正确": function() {
                        O.go("提交订单")
                    },
                    "错误": function() {
                        O.go("是否自动识别", {
                            cases: {
                                "是": function() {
                                    O.go("开始自动识别")
                                },
                                "否": function() {
                                    O.go("验证码错误")
                                }
                            }
                        })
                    }
                }
            })
        }
        ),
        O.sub("验证码错误", function() {
            O.go("提示验证码错误"),
            O.go("选中验证码"),
            O.go("刷新验证码")
        }
        ),
        O.sub("提交订单", function() {
            O.go("展示正在出票浮层"),
            O.go("确认下单", {
                cases: {
                    "成功": function() {
                        O.go("排队", {
                            cases: {
                                "成功": function() {
                                    O.go("查询订单结果", {
                                        cases: {
                                            "成功": function() {
                                                O.go("展示订票成功浮层"),
                                                O.go("通知用户付款")
                                            },
                                            "失败": function() {
                                                O.go("展示订票失败浮层"),
                                                O.go("恢复刷票")
                                            }
                                        }
                                    })
                                },
                                "失败": function(t) {
                                    !0 === t.silence && $(document).trigger("restartbrush")
                                }
                            }
                        })
                    },
                    "失败": function() {
                        O.go("切换到手动输入")
                    }
                }
            })
        }
        )
    }
    ,
    window.AutoSubmit = r,
    n.exports = r
}
);
define("./widgets/passengerTypeMap/passengerTypeMap", [], function(t, e, n) {
    "use strict";
    n.exports = {
        1: "成人票",
        2: "儿童票",
        3: "学生票",
        4: "残军票"
    }
}
);
define("./interfaces/autoSubmitOrder", ["../widgets/extension/extension", "../widgets/settings/settings"], function(t, e, n) {
    var i = t("../widgets/extension/extension")
      , a = t("../widgets/settings/settings");
    n.exports = function(t) {
        t = t || {},
        $.extend(!0, t, {
            url: a.protocol + a.hostname + "/otn/confirmPassenger/autoSubmitOrderRequest",
            type: "post",
            dataType: "json",
            header: {
                "Content-Type": "application/x-www-form-urlencoded; charset=UTF-8"
            },
            data: {}
        }),
        i.ajax(t)
    }
}
);
define("./interfaces/getQueueCount", ["../widgets/extension/extension", "../widgets/settings/settings"], function(t, e, n) {
    var i = t("../widgets/extension/extension")
      , a = t("../widgets/settings/settings");
    n.exports = function(t) {
        t = t || {},
        $.extend(!0, t, {
            url: a.protocol + a.hostname + "/otn/confirmPassenger/getQueueCountAsync",
            type: "post",
            header: {
                "Content-Type": "application/x-www-form-urlencoded; charset=UTF-8"
            },
            data: {
                _json_att: ""
            }
        }),
        i.ajax(t)
    }
}
);
define("./interfaces/checkRandCodeAnsyn", ["../widgets/extension/extension", "../widgets/settings/settings"], function(t, e, n) {
    var i = t("../widgets/extension/extension")
      , a = t("../widgets/settings/settings");
    n.exports = function(t) {
        t = t || {},
        $.extend(!0, t, {
            url: a.protocol + a.hostname + "/otn/passcodeNew/checkRandCodeAnsyn",
            type: "post",
            header: {
                "Content-Type": "application/x-www-form-urlencoded; charset=UTF-8"
            },
            data: {
                rand: "randp",
                _json_att: ""
            }
        }),
        i.ajax(t)
    }
}
);
define("./interfaces/confirmSingleForQueue", ["../widgets/extension/extension", "../widgets/settings/settings"], function(t, e, n) {
    var i = t("../widgets/extension/extension")
      , a = t("../widgets/settings/settings")
      , s = ["passengerTicketStr", "oldPassengerStr", "randCode", "purpose_codes", "key_check_isChange", "leftTicketStr", "train_location", "choose_seats", "seatDetailType", "_json_att"];
    n.exports = function(t) {
        t = t || {};
        var e = {}
          , n = a.protocol + a.hostname + "/otn/confirmPassenger/confirmSingleForQueueAsys";
        s.forEach(function(n) {
            e[n] = t.data && t.data.hasOwnProperty(n) ? t.data[n] : ""
        }
        ),
        "1" != t.isAsync && (delete e.leftTicketStr,
        e.tour_flag = "dc",
        n = a.protocol + a.hostname + "/otn/confirmPassenger/confirmSingle"),
        delete t.isAsync,
        delete e.isAsync,
        $.extend(!0, t, {
            url: n,
            type: "post",
            header: {
                "Content-Type": "application/x-www-form-urlencoded; charset=UTF-8"
            }
        }),
        t.data = e,
        t.dataType = "json",
        i.ajax(t)
    }
}
);
define("./interfaces/queryTicketPrice", ["../widgets/extension/extension", "../widgets/settings/settings"], function(t, e, n) {
    var i = t("../widgets/extension/extension")
      , a = t("../widgets/settings/settings");
    n.exports = function(t) {
        t = t || {},
        $.extend(!0, t, {
            url: a.protocol + a.hostname + "/otn/leftTicket/queryTicketPrice",
            data: {}
        }),
        i.ajax(t)
    }
}
);
define("./lib/async", [], function(t, e, n) {
    !function() {
        function t(t) {
            var n = !1;
            return function() {
                if (n)
                    throw new Error("Callback was already called.");
                n = !0,
                t.apply(e, arguments)
            }
        }
        var e, i, a = {};
        e = this,
        null  != e && (i = e.async),
        a.noConflict = function() {
            return e.async = i,
            a
        }
        ;
        var s = function(t, e) {
            if (t.forEach)
                return t.forEach(e);
            for (var n = 0; n < t.length; n += 1)
                e(t[n], n, t)
        }
          , o = function(t, e) {
            if (t.map)
                return t.map(e);
            var n = [];
            return s(t, function(t, i, a) {
                n.push(e(t, i, a))
            }
            ),
            n
        }
          , r = function(t, e, n) {
            return t.reduce ? t.reduce(e, n) : (s(t, function(t, i, a) {
                n = e(n, t, i, a)
            }
            ),
            n)
        }
          , c = function(t) {
            if (Object.keys)
                return Object.keys(t);
            var e = [];
            for (var n in t)
                t.hasOwnProperty(n) && e.push(n);
            return e
        }
        ;
        "undefined" != typeof process && process.nextTick ? (a.nextTick = process.nextTick,
        a.setImmediate = "undefined" != typeof setImmediate ? setImmediate : a.nextTick) : "function" == typeof setImmediate ? (a.nextTick = function(t) {
            setImmediate(t)
        }
        ,
        a.setImmediate = a.nextTick) : (a.nextTick = function(t) {
            setTimeout(t, 0)
        }
        ,
        a.setImmediate = a.nextTick),
        a.each = function(e, n, i) {
            if (i = i || function() {}
            ,
            !e.length)
                return i();
            var a = 0;
            s(e, function(s) {
                n(s, t(function(t) {
                    t ? (i(t),
                    i = function() {}
                    ) : (a += 1,
                    a >= e.length && i(null ))
                }
                ))
            }
            )
        }
        ,
        a.forEach = a.each,
        a.eachSeries = function(t, e, n) {
            if (n = n || function() {}
            ,
            !t.length)
                return n();
            var i = 0
              , a = function() {
                e(t[i], function(e) {
                    e ? (n(e),
                    n = function() {}
                    ) : (i += 1,
                    i >= t.length ? n(null ) : a())
                }
                )
            }
            ;
            a()
        }
        ,
        a.forEachSeries = a.eachSeries,
        a.eachLimit = function(t, e, n, i) {
            var a = u(e);
            a.apply(null , [t, n, i])
        }
        ,
        a.forEachLimit = a.eachLimit;
        var u = function(t) {
            return function(e, n, i) {
                if (i = i || function() {}
                ,
                !e.length || 0 >= t)
                    return i();
                var a = 0
                  , s = 0
                  , o = 0;
                !function r() {
                    if (a >= e.length)
                        return i();
                    for (; t > o && s < e.length; )
                        s += 1,
                        o += 1,
                        n(e[s - 1], function(t) {
                            t ? (i(t),
                            i = function() {}
                            ) : (a += 1,
                            o -= 1,
                            a >= e.length ? i() : r())
                        }
                        )
                }
                ()
            }
        }
          , l = function(t) {
            return function() {
                var e = Array.prototype.slice.call(arguments);
                return t.apply(null , [a.each].concat(e))
            }
        }
          , h = function(t, e) {
            return function() {
                var n = Array.prototype.slice.call(arguments);
                return e.apply(null , [u(t)].concat(n))
            }
        }
          , d = function(t) {
            return function() {
                var e = Array.prototype.slice.call(arguments);
                return t.apply(null , [a.eachSeries].concat(e))
            }
        }
          , g = function(t, e, n, i) {
            var a = [];
            e = o(e, function(t, e) {
                return {
                    index: e,
                    value: t
                }
            }
            ),
            t(e, function(t, e) {
                n(t.value, function(n, i) {
                    a[t.index] = i,
                    e(n)
                }
                )
            }
            , function(t) {
                i(t, a)
            }
            )
        }
        ;
        a.map = l(g),
        a.mapSeries = d(g),
        a.mapLimit = function(t, e, n, i) {
            return p(e)(t, n, i)
        }
        ;
        var p = function(t) {
            return h(t, g)
        }
        ;
        a.reduce = function(t, e, n, i) {
            a.eachSeries(t, function(t, i) {
                n(e, t, function(t, n) {
                    e = n,
                    i(t)
                }
                )
            }
            , function(t) {
                i(t, e)
            }
            )
        }
        ,
        a.inject = a.reduce,
        a.foldl = a.reduce,
        a.reduceRight = function(t, e, n, i) {
            var s = o(t, function(t) {
                return t
            }
            ).reverse();
            a.reduce(s, e, n, i)
        }
        ,
        a.foldr = a.reduceRight;
        var f = function(t, e, n, i) {
            var a = [];
            e = o(e, function(t, e) {
                return {
                    index: e,
                    value: t
                }
            }
            ),
            t(e, function(t, e) {
                n(t.value, function(n) {
                    n && a.push(t),
                    e()
                }
                )
            }
            , function() {
                i(o(a.sort(function(t, e) {
                    return t.index - e.index
                }
                ), function(t) {
                    return t.value
                }
                ))
            }
            )
        }
        ;
        a.filter = l(f),
        a.filterSeries = d(f),
        a.select = a.filter,
        a.selectSeries = a.filterSeries;
        var y = function(t, e, n, i) {
            var a = [];
            e = o(e, function(t, e) {
                return {
                    index: e,
                    value: t
                }
            }
            ),
            t(e, function(t, e) {
                n(t.value, function(n) {
                    n || a.push(t),
                    e()
                }
                )
            }
            , function() {
                i(o(a.sort(function(t, e) {
                    return t.index - e.index
                }
                ), function(t) {
                    return t.value
                }
                ))
            }
            )
        }
        ;
        a.reject = l(y),
        a.rejectSeries = d(y);
        var m = function(t, e, n, i) {
            t(e, function(t, e) {
                n(t, function(n) {
                    n ? (i(t),
                    i = function() {}
                    ) : e()
                }
                )
            }
            , function() {
                i()
            }
            )
        }
        ;
        a.detect = l(m),
        a.detectSeries = d(m),
        a.some = function(t, e, n) {
            a.each(t, function(t, i) {
                e(t, function(t) {
                    t && (n(!0),
                    n = function() {}
                    ),
                    i()
                }
                )
            }
            , function() {
                n(!1)
            }
            )
        }
        ,
        a.any = a.some,
        a.every = function(t, e, n) {
            a.each(t, function(t, i) {
                e(t, function(t) {
                    t || (n(!1),
                    n = function() {}
                    ),
                    i()
                }
                )
            }
            , function() {
                n(!0)
            }
            )
        }
        ,
        a.all = a.every,
        a.sortBy = function(t, e, n) {
            a.map(t, function(t, n) {
                e(t, function(e, i) {
                    e ? n(e) : n(null , {
                        value: t,
                        criteria: i
                    })
                }
                )
            }
            , function(t, e) {
                if (t)
                    return n(t);
                var i = function(t, e) {
                    var n = t.criteria
                      , i = e.criteria;
                    return i > n ? -1 : n > i ? 1 : 0
                }
                ;
                n(null , o(e.sort(i), function(t) {
                    return t.value
                }
                ))
            }
            )
        }
        ,
        a.auto = function(t, e) {
            e = e || function() {}
            ;
            var n = c(t);
            if (!n.length)
                return e(null );
            var i = {}
              , o = []
              , u = function(t) {
                o.unshift(t)
            }
              , l = function(t) {
                for (var e = 0; e < o.length; e += 1)
                    if (o[e] === t)
                        return o.splice(e, 1),
                        void 0
            }
              , h = function() {
                s(o.slice(0), function(t) {
                    t()
                }
                )
            }
            ;
            u(function() {
                c(i).length === n.length && (e(null , i),
                e = function() {}
                )
            }
            ),
            s(n, function(n) {
                var o = t[n] instanceof Function ? [t[n]] : t[n]
                  , d = function(t) {
                    var o = Array.prototype.slice.call(arguments, 1);
                    if (o.length <= 1 && (o = o[0]),
                    t) {
                        var r = {};
                        s(c(i), function(t) {
                            r[t] = i[t]
                        }
                        ),
                        r[n] = o,
                        e(t, r),
                        e = function() {}
                    } else
                        i[n] = o,
                        a.setImmediate(h)
                }
                  , g = o.slice(0, Math.abs(o.length - 1)) || []
                  , p = function() {
                    return r(g, function(t, e) {
                        return t && i.hasOwnProperty(e)
                    }
                    , !0) && !i.hasOwnProperty(n)
                }
                ;
                if (p())
                    o[o.length - 1](d, i);
                else {
                    var f = function() {
                        p() && (l(f),
                        o[o.length - 1](d, i))
                    }
                    ;
                    u(f)
                }
            }
            )
        }
        ,
        a.waterfall = function(t, e) {
            if (e = e || function() {}
            ,
            t.constructor !== Array) {
                var n = new Error("First argument to waterfall must be an array of functions");
                return e(n)
            }
            if (!t.length)
                return e();
            var i = function(t) {
                return function(n) {
                    if (n)
                        e.apply(null , arguments),
                        e = function() {}
                        ;
                    else {
                        var s = Array.prototype.slice.call(arguments, 1)
                          , o = t.next();
                        o ? s.push(i(o)) : s.push(e),
                        a.setImmediate(function() {
                            t.apply(null , s)
                        }
                        )
                    }
                }
            }
            ;
            i(a.iterator(t))()
        }
        ;
        var x = function(t, e, n) {
            if (n = n || function() {}
            ,
            e.constructor === Array)
                t.map(e, function(t, e) {
                    t && t(function(t) {
                        var n = Array.prototype.slice.call(arguments, 1);
                        n.length <= 1 && (n = n[0]),
                        e.call(null , t, n)
                    }
                    )
                }
                , n);
            else {
                var i = {};
                t.each(c(e), function(t, n) {
                    e[t](function(e) {
                        var a = Array.prototype.slice.call(arguments, 1);
                        a.length <= 1 && (a = a[0]),
                        i[t] = a,
                        n(e)
                    }
                    )
                }
                , function(t) {
                    n(t, i)
                }
                )
            }
        }
        ;
        a.parallel = function(t, e) {
            x({
                map: a.map,
                each: a.each
            }, t, e)
        }
        ,
        a.parallelLimit = function(t, e, n) {
            x({
                map: p(e),
                each: u(e)
            }, t, n)
        }
        ,
        a.series = function(t, e) {
            if (e = e || function() {}
            ,
            t.constructor === Array)
                a.mapSeries(t, function(t, e) {
                    t && t(function(t) {
                        var n = Array.prototype.slice.call(arguments, 1);
                        n.length <= 1 && (n = n[0]),
                        e.call(null , t, n)
                    }
                    )
                }
                , e);
            else {
                var n = {};
                a.eachSeries(c(t), function(e, i) {
                    t[e](function(t) {
                        var a = Array.prototype.slice.call(arguments, 1);
                        a.length <= 1 && (a = a[0]),
                        n[e] = a,
                        i(t)
                    }
                    )
                }
                , function(t) {
                    e(t, n)
                }
                )
            }
        }
        ,
        a.iterator = function(t) {
            var e = function(n) {
                var i = function() {
                    return t.length && t[n].apply(null , arguments),
                    i.next()
                }
                ;
                return i.next = function() {
                    return n < t.length - 1 ? e(n + 1) : null 
                }
                ,
                i
            }
            ;
            return e(0)
        }
        ,
        a.apply = function(t) {
            var e = Array.prototype.slice.call(arguments, 1);
            return function() {
                return t.apply(null , e.concat(Array.prototype.slice.call(arguments)))
            }
        }
        ;
        var b = function(t, e, n, i) {
            var a = [];
            t(e, function(t, e) {
                n(t, function(t, n) {
                    a = a.concat(n || []),
                    e(t)
                }
                )
            }
            , function(t) {
                i(t, a)
            }
            )
        }
        ;
        a.concat = l(b),
        a.concatSeries = d(b),
        a.whilst = function(t, e, n) {
            t() ? e(function(i) {
                return i ? n(i) : (a.whilst(t, e, n),
                void 0)
            }
            ) : n()
        }
        ,
        a.doWhilst = function(t, e, n) {
            t(function(i) {
                return i ? n(i) : (e() ? a.doWhilst(t, e, n) : n(),
                void 0)
            }
            )
        }
        ,
        a.until = function(t, e, n) {
            t() ? n() : e(function(i) {
                return i ? n(i) : (a.until(t, e, n),
                void 0)
            }
            )
        }
        ,
        a.doUntil = function(t, e, n) {
            t(function(i) {
                return i ? n(i) : (e() ? n() : a.doUntil(t, e, n),
                void 0)
            }
            )
        }
        ,
        a.queue = function(e, n) {
            function i(t, e, i, o) {
                e.constructor !== Array && (e = [e]),
                s(e, function(e) {
                    var s = {
                        data: e,
                        callback: "function" == typeof o ? o : null 
                    };
                    i ? t.tasks.unshift(s) : t.tasks.push(s),
                    t.saturated && t.tasks.length === n && t.saturated(),
                    a.setImmediate(t.process)
                }
                )
            }
            void 0 === n && (n = 1);
            var o = 0
              , r = {
                tasks: [],
                concurrency: n,
                saturated: null ,
                empty: null ,
                drain: null ,
                push: function(t, e) {
                    i(r, t, !1, e)
                },
                unshift: function(t, e) {
                    i(r, t, !0, e)
                },
                process: function() {
                    if (o < r.concurrency && r.tasks.length) {
                        var n = r.tasks.shift();
                        r.empty && 0 === r.tasks.length && r.empty(),
                        o += 1;
                        var i = function() {
                            o -= 1,
                            n.callback && n.callback.apply(n, arguments),
                            r.drain && 0 === r.tasks.length + o && r.drain(),
                            r.process()
                        }
                          , a = t(i);
                        e(n.data, a)
                    }
                },
                length: function() {
                    return r.tasks.length
                },
                running: function() {
                    return o
                }
            };
            return r
        }
        ,
        a.cargo = function(t, e) {
            var n = !1
              , i = []
              , r = {
                tasks: i,
                payload: e,
                saturated: null ,
                empty: null ,
                drain: null ,
                push: function(t, n) {
                    t.constructor !== Array && (t = [t]),
                    s(t, function(t) {
                        i.push({
                            data: t,
                            callback: "function" == typeof n ? n : null 
                        }),
                        r.saturated && i.length === e && r.saturated()
                    }
                    ),
                    a.setImmediate(r.process)
                },
                process: function c() {
                    if (!n) {
                        if (0 === i.length)
                            return r.drain && r.drain(),
                            void 0;
                        var a = "number" == typeof e ? i.splice(0, e) : i.splice(0)
                          , u = o(a, function(t) {
                            return t.data
                        }
                        );
                        r.empty && r.empty(),
                        n = !0,
                        t(u, function() {
                            n = !1;
                            var t = arguments;
                            s(a, function(e) {
                                e.callback && e.callback.apply(null , t)
                            }
                            ),
                            c()
                        }
                        )
                    }
                },
                length: function() {
                    return i.length
                },
                running: function() {
                    return n
                }
            };
            return r
        }
        ;
        var _ = function(t) {
            return function(e) {
                var n = Array.prototype.slice.call(arguments, 1);
                e.apply(null , n.concat([function(e) {
                    var n = Array.prototype.slice.call(arguments, 1);
                    "undefined" != typeof console && (e ? console.error && console.error(e) : console[t] && s(n, function(e) {
                        console[t](e)
                    }
                    ))
                }
                ]))
            }
        }
        ;
        a.log = _("log"),
        a.dir = _("dir"),
        a.memoize = function(t, e) {
            var n = {}
              , i = {};
            e = e || function(t) {
                return t
            }
            ;
            var a = function() {
                var a = Array.prototype.slice.call(arguments)
                  , s = a.pop()
                  , o = e.apply(null , a);
                o in n ? s.apply(null , n[o]) : o in i ? i[o].push(s) : (i[o] = [s],
                t.apply(null , a.concat([function() {
                    n[o] = arguments;
                    var t = i[o];
                    delete i[o];
                    for (var e = 0, a = t.length; a > e; e++)
                        t[e].apply(null , arguments)
                }
                ])))
            }
            ;
            return a.memo = n,
            a.unmemoized = t,
            a
        }
        ,
        a.unmemoize = function(t) {
            return function() {
                return (t.unmemoized || t).apply(null , arguments)
            }
        }
        ,
        a.times = function(t, e, n) {
            for (var i = [], s = 0; t > s; s++)
                i.push(s);
            return a.map(i, e, n)
        }
        ,
        a.timesSeries = function(t, e, n) {
            for (var i = [], s = 0; t > s; s++)
                i.push(s);
            return a.mapSeries(i, e, n)
        }
        ,
        a.compose = function() {
            var t = Array.prototype.reverse.call(arguments);
            return function() {
                var e = this
                  , n = Array.prototype.slice.call(arguments)
                  , i = n.pop();
                a.reduce(t, n, function(t, n, i) {
                    n.apply(e, t.concat([function() {
                        var t = arguments[0]
                          , e = Array.prototype.slice.call(arguments, 1);
                        i(t, e)
                    }
                    ]))
                }
                , function(t, n) {
                    i.apply(e, [t].concat(n))
                }
                )
            }
        }
        ;
        var v = function(t, e) {
            var n = function() {
                var n = this
                  , i = Array.prototype.slice.call(arguments)
                  , a = i.pop();
                return t(e, function(t, e) {
                    t.apply(n, i.concat([e]))
                }
                , a)
            }
            ;
            if (arguments.length > 2) {
                var i = Array.prototype.slice.call(arguments, 2);
                return n.apply(this, i)
            }
            return n
        }
        ;
        a.applyEach = l(v),
        a.applyEachSeries = d(v),
        a.forever = function(t, e) {
            function n(i) {
                if (i) {
                    if (e)
                        return e(i);
                    throw i
                }
                t(n)
            }
            n()
        }
        ,
        "undefined" != typeof define && define.amd ? define([], function() {
            return a
        }
        ) : "undefined" != typeof n && n.exports ? n.exports = a : e.async = a
    }
    ()
}
);
define("./interfaces/resultOrderForDcQueue", ["../widgets/extension/extension", "../widgets/settings/settings"], function(t, e, n) {
    var i = t("../widgets/extension/extension")
      , a = t("../widgets/settings/settings");
    n.exports = function(t) {
        t = t || {},
        $.extend(!0, t, {
            url: a.protocol + a.hostname + "/otn/confirmPassenger/resultOrderForDcQueue",
            type: "post",
            timeout: 3e4,
            header: {
                "Content-Type": "application/x-www-form-urlencoded; charset=UTF-8"
            },
            data: {
                _json_att: ""
            }
        }),
        i.ajax(t)
    }
}
);
define("./lib/flow", [], function(t, e, n) {
    !function(t) {
        var e = {};
        t.Qiyi = t.Qiyi || {},
        function(t) {
            var e = function() {}
              , n = {};
            n.superclass = Object,
            n.callsuper = function(t) {
                var e, n = this;
                this._realsuper = this._realsuper ? this._realsuper.prototype.superclass : this.superclass,
                "string" == typeof t ? (e = Array.prototype.slice.call(arguments, 1),
                n._realsuper.prototype[t].apply(n, e)) : (e = Array.prototype.slice.call(arguments, 0),
                n._realsuper.apply(n, e)),
                this._realsuper = null 
            }
            ,
            e.prototype = n,
            t.__2 = e
        }
        (e),
        function(t) {
            var e = t.__2
              , n = function(t) {
                var i = t.extend || e
                  , a = function() {}
                  , s = t.plugins || [];
                a.prototype = i.prototype;
                var o, r = t.construct || function() {}
                , c = t.properties || {}, u = t.methods || {}, l = t.statics || {}, h = t.isAbstract === !0, d = new a;
                for (o in d)
                    d.hasOwnProperty(o) && delete d[o];
                for (o in c)
                    d[o] = c[o];
                for (o in u)
                    d[o] = u[o];
                for (var g = 0; g < s.length; g++) {
                    var p = s[g];
                    for (o in p)
                        d[o] = p[o]
                }
                if (!h)
                    for (var f in d)
                        if (d[f] == n.abstractMethod)
                            throw new Error("Abstract method [" + f + "] is not implement.");
                d.constructor = r,
                d.superclass = i,
                r.prototype = d;
                for (o in l)
                    r[o] = l[o];
                return r
            }
            ;
            n.abstractMethod = function() {
                throw new Error("Not implement.")
            }
            ,
            t.__1 = n
        }
        (e),
        function(t) {
            var e = function(t) {
                var e, n = Object.prototype.hasOwnProperty;
                if ("object" != typeof t || null  == t)
                    return !1;
                if (t.constructor && !n.call(t, "constructor") && !n.call(t.constructor.prototype, "isPrototypeOf"))
                    return !1;
                for (e in t)
                    ;
                return void 0 === e || n.call(t, e)
            }
            ;
            t.__4 = e
        }
        (e),
        function(t) {
            var e = Array.isArray || function(t) {
                return "[object Array]" == Object.prototype.toString.call(t)
            }
              , n = function(t) {
                return "[object Object]" == Object.prototype.toString.call(t)
            }
              , i = t.__4
              , a = function(t, s) {
                var o, r, c, u, l, h, d = (arguments.length,
                t);
                if (!i(s))
                    return s;
                if (o = s,
                n(o) || e(o))
                    for (r in o)
                        c = d[r],
                        u = o[r],
                        c !== u && (u && (n(u) || (l = e(u))) ? (l ? (l = !1,
                        h = c && e(c) ? c : []) : h = c && n(c) ? c : {},
                        d[r] = a(h, u)) : void 0 !== u && (d[r] = u));
                return d
            }
            ;
            t.__3 = a
        }
        (e),
        function(t) {
            var e = t.__1
              , n = e({
                methods: {
                    on: function(t, e) {
                        this._ep_createList();
                        var n = function(t) {
                            e(t)
                        }
                        ;
                        return t = t.toLowerCase(),
                        this._ep_lists[t] = this._ep_lists[t] || [],
                        this._ep_lists[t].push({
                            type: t,
                            listener: e,
                            realListener: n
                        }),
                        this
                    },
                    un: function(t, e) {
                        if (this._ep_createList(),
                        t) {
                            t = t.toLowerCase();
                            var n = this._ep_lists[t];
                            if (n) {
                                var i = (n.length,
                                !e);
                                n && n.length > 0 && (i === !0 ? this._ep_lists[t] = [] : n.forEach(function(t, i) {
                                    t.listener === e && n.splice(i, 1)
                                }
                                ))
                            }
                        } else
                            this._ep_clearList();
                        return this
                    },
                    fire: function(t) {
                        this._ep_createList();
                        var e = t.type.toLowerCase()
                          , n = t.data
                          , i = this._ep_lists[e];
                        return i && i.length > 0 && i.forEach(function(t) {
                            t.listener({
                                type: e,
                                data: n
                            })
                        }
                        ),
                        this
                    },
                    _ep_clearList: function() {
                        this._ep_lists = null 
                    },
                    _ep_createList: function() {
                        this._ep_lists || (this._ep_lists = {})
                    }
                }
            });
            t.__5 = n
        }
        (e),
        function(e) {
            "undefined" == typeof t && (t = window),
            e.__6 = {
                isArray: Array.isArray || function(t) {
                    return "[object Array]" == Object.prototype.toString.call(t)
                }
                ,
                log: function() {
                    if (t.console)
                        if (console.log.apply)
                            console.log.apply(console, arguments);
                        else {
                            var e = Array.prototype.slice.call(arguments, 0)
                              , n = e.join(" ");
                            console.log(n)
                        }
                },
                error: function() {
                    if (t.console)
                        if (console.error.apply)
                            console.error.apply(console, arguments);
                        else {
                            var e = Array.prototype.slice.call(arguments, 0)
                              , n = e.join(" ");
                            console.error(n)
                        }
                }
            }
        }
        (e),
        function(t) {
            var e = t.__1
              , n = t.__3
              , i = function(t) {
                return "[object Object]" == Object.prototype.toString.call(t)
            }
              , a = Array.isArray || function(t) {
                return "[object Array]" == Object.prototype.toString.call(t)
            }
              , s = t.__5
              , o = t.__6.log
              , r = e({
                construct: function(t) {
                    t = t || {},
                    this.__steps = {},
                    this.__definations = {},
                    this.__subs = {},
                    this.__context = null ,
                    this.__passBy = {}
                },
                plugins: [new s],
                methods: {
                    implement: function(t, e) {
                        this.__steps[t] = e
                    },
                    destroy: function() {
                        var t = this.__passBy;
                        for (var e in t)
                            if (t.hasOwnProperty(e)) {
                                var n = t[e]
                                  , i = this.__getStepData(n);
                                try {
                                    n.step.destroy(i)
                                } catch (a) {}
                            }
                    },
                    begin: function(t) {
                        this.hasOwnProperty("__contextCount") || (this.__contextCount = 0);
                        var e = {
                            __id: this.__contextCount++
                        };
                        e.data = t || {},
                        e.data.__flowDataId = e.data.__flowDataId || (new Date).getTime(),
                        this.__context = e,
                        setTimeout(function() {
                            this.__go(e)
                        }
                        .bind(this), 0)
                    },
                    go: function(t, e, n) {
                        var n = n || this.__context;
                        if (!n)
                            throw new Error("No context!");
                        if ("string" == typeof t)
                            if (this.__subs[t])
                                this.__subs[t].apply(this, [n.data]);
                            else {
                                var i = t;
                                t = this.__steps[t],
                                t || (t = {
                                    type: "step",
                                    go: function(t, e, n) {
                                        e(t, n)
                                    }
                                });
                                var a = {
                                    step: t,
                                    name: i
                                }
                                  , s = this.__definations[i];
                                s && ("condition" === s.type && (a.cases = e.cases),
                                "event" === s.type && (a.events = e.events)),
                                n.current ? (n.__temp.next = a,
                                n.__temp = a) : (n.current = a,
                                n.__temp = a)
                            }
                    },
                    sub: function(t, e) {
                        this.__subs[t] = e
                    },
                    addStep: function(t, e) {
                        this.__definations[t] = e,
                        e && e.go && this.implement(t, {
                            go: e.go
                        })
                    },
                    __stepCallback: function(t, e) {
                        n(e.data, this.__getStepData(e.current, t)),
                        e.current.next ? (e.current = e.current.next,
                        this.__go(e)) : this.fire({
                            type: "end"
                        })
                    },
                    __conditionCallback: function(t, e, i) {
                        n(i.data, this.__getStepData(i.current, t));
                        var a = i.current
                          , s = a.cases;
                        o(a.name + ":" + e),
                        s[e] ? (this.begin(i.data),
                        s[e].apply(this, [i.data])) : this.fire({
                            type: "end"
                        })
                    },
                    __eventCallback: function(t, e, i, a) {
                        n(a.data, this.__getStepData(t, e));
                        var s = t.events;
                        s[i] && (this.begin(a.data),
                        s[i].apply(this, [a.data]))
                    },
                    __getCurrentStepData: function(t) {
                        return this.__getStepData(t.current, t.data)
                    },
                    __getStepData: function(t, e) {
                        var n = this.__definations[t.name] || {};
                        return this.__getData(n.output, e)
                    },
                    __getData: function(t, e) {
                        t = t || {};
                        var s = {};
                        for (var o in t) {
                            t[o].empty === !0 || e.hasOwnProperty(o) || this.fire({
                                type: "error",
                                data: {
                                    message: "Key [" + o + "] is not allow empty"
                                }
                            });
                            var r, c = e[o];
                            s[o] = (r = a(c)) || i(c) ? n(r ? [] : {}, c) : c
                        }
                        return s
                    },
                    __go: function(t) {
                        var e = t.current;
                        if (e) {
                            this.__passBy[e.name] = e,
                            o("开始执行：" + e.name + "[" + t.data.__flowDataId + "_" + t.__id + "]");
                            var n = this.__definations[e.name] || {}
                              , i = this.__getData(n.input, t.data);
                            n && "condition" === n.type ? e.step.go(i, function(e, n) {
                                this.__conditionCallback(e, n, t)
                            }
                            .bind(this)) : n && "event" === n.type ? e.step.go(i, function(e) {
                                this.__stepCallback(e || i, t)
                            }
                            .bind(this), function(n, a) {
                                this.__eventCallback(e, n || i, a, t)
                            }
                            .bind(this)) : e.step.go(i, function(e) {
                                this.__stepCallback(e || i, t)
                            }
                            .bind(this))
                        }
                    }
                }
            });
            t.__0 = r,
            window.Flow = r
        }
        (e)
    }
    (this),
    n.exports = window.Flow
}
);
define("./widgets/mobile/mobile", ["../extension/extension", "../login/login"], function(t, e, n) {
    "use strict";
    var i = t("../extension/extension")
      , a = t("../login/login")
      , s = {};
    !function(t) {
        var e = "360qianghuochepiao"
          , n = !1
          , s = !1
          , o = null 
          , r = 200
          , c = $(".body-mask")
          , u = $("#chk_auto_submit_switcher")
          , l = $(".qrcode-wrapper")
          , h = $(".btn-weixin-notify");
        $(".btn-debook");
        var d = $(".weixin-notify-wrapper")
          , g = function() {
            var e = 0;
            c.fadeIn(),
            l.show(),
            o && clearInterval(o),
            o = setInterval(function() {
                ++e >= r ? clearInterval(o) : t.checkStatus()
            }
            , 3e3 * (1 + Math.random()))
        }
          , p = function() {
            o && clearInterval(o),
            c.fadeOut(),
            l.hide()
        }
        ;
        t.getCode = function(t, n) {
            t = "p_" + hex_md5(t),
            i.ajax({
                url: "http://sehd.360.cn/turntable/weixin/getcode?active=3d1433",
                method: "POST",
                dataType: "json",
                data: {
                    username: t,
                    sig: hex_md5(e + t)
                },
                success: function(t) {
                    "function" == typeof n && n(t)
                }
            })
        }
        ,
        t.postMsg = function(t, n) {
            var s = a.getStatus() || {}
              , o = "p_" + hex_md5(s.name)
              , r = JSON.stringify({
                username: o,
                content: t
            });
            "online" == s.status && o && i.ajax({
                url: "http://sehd.360.cn/turntable/weixin/pushmsg?active=3d1433",
                method: "POST",
                dataType: "json",
                data: {
                    msg: r,
                    sig: hex_md5(e + r)
                },
                success: function(t) {
                    "function" == typeof n && n(t)
                }
            })
        }
        ,
        t.deBook = function() {
            var t = a.getStatus() || {}
              , n = "p_" + hex_md5(t.name);
            "online" == t.status && n && i.ajax({
                url: "http://sehd.360.cn/turntable/weixin/debook?active=3d1433",
                type: "POST",
                dataType: "json",
                data: {
                    username: n,
                    sig: hex_md5(e + n)
                },
                success: function(t) {
                    "function" == typeof callback && callback(t)
                }
            })
        }
        ,
        t.checkStatus = function() {
            var e = a.getStatus() || {}
              , i = e.name;
            s = "online" == e.status,
            s && i ? t.getCode(i, function(t) {
                t && "ok" == t.status ? (n = u.is(":checked"),
                n && d.fadeIn(),
                "" != t.data ? l.removeClass("followed").find(".notify-code").text(t.data) : l.addClass("followed")) : d.fadeOut()
            }
            ) : d.fadeOut()
        }
        ,
        t.init = function() {
            t.checkStatus(),
            h.on("click", function() {
                t.checkStatus(),
                g()
            }
            ),
            l.delegate(".btn-close", "click", function() {
                p()
            }
            ).delegate(".btn-debook", "click", function() {
                t.deBook(function() {
                    t.checkStatus()
                }
                )
            }
            ),
            $(document).on("loginstatuschange", function(t, e) {
                s = "online" === e.status,
                s && n ? d.fadeIn() : d.fadeOut()
            }
            ),
            u.on("change", function() {
                n = $(this).is(":checked"),
                n && s ? d.fadeIn() : d.fadeOut()
            }
            )
        }
    }
    (s),
    n.exports = s
}
);
"use strict";
define("./widgets/submit/submit", ["../trainList/plugins/submit", "../trainList/index"], function(t, e, n) {
    var i = t("../trainList/plugins/submit")
      , a = t("../trainList/index");
    n.exports = {
        init: function() {
            a.addPlugin(i)
        }
    }
}
);
define("./widgets/trainList/plugins/submit", ["../../autoSubmit/manualSubmit"], function(t, e, n) {
    "use strict";
    var i = t("../../autoSubmit/manualSubmit")
      , a = function() {}
      , s = !1;
    a.init = function(t) {
        s || (s = !0,
        $("#trainlist").delegate("[data-trainlist-seatcode]", "click", function(e) {
            for (var n, a = $(e.target), s = a; s && !(n = s.attr("data-trainlist-seatcode")); )
                s = s.parent();
            for (var o, r = a; r && !(o = r.attr("data-trainlist-row")); )
                r = r.parent();
            var c = t._getCachedData();
            c.list.forEach(function(t) {
                t.number === o && t.seats.forEach(function(e) {
                    e.code === n && i.submit({
                        train: t,
                        seat: e
                    })
                }
                )
            }
            )
        }
        ))
    }
    ,
    n.exports = a
}
);
"use strict";
define("./widgets/events/events", ["./../extension/extension", "./../brush/brush", "../settings/settings", "../window/window"], function(t) {
    var e = {}
      , n = t("./../extension/extension")
      , i = t("./../brush/brush")
      , a = t("../settings/settings")
      , s = {
        audioPlay: !1,
        msg: ""
    }
      , o = t("../window/window")
      , r = null 
      , c = 3e4;
    !function() {
        function t(t) {
            var e = i.getStatus();
            (t || e) && n.sendMessage({
                type: "pageNotify",
                settings: s
            })
        }
        var e, u = function() {
            e || (e = new o),
            e.alert({
                content: "12306服务器端响应超时，请重试"
            }),
            $(document).one("querylistsuccess", function() {
                e.close()
            }
            )
        }
        ;
        $(document).on({
            ordersubmiterror: function(e, n) {
                if (r && clearTimeout(r),
                "responsefailed" === n.code && n.detail) {
                    n.detail.data = n.detail.data || {};
                    var l;
                    if (n.detail.messages && n.detail.messages.length > 0 ? (l = n.detail.messages[0],
                    -1 !== l.indexOf("未处理的订单") && (l = '您还有未处理的订单，请您到<a target="_blank" href="' + a.protocol + a.hostname + '/otn/queryOrder/initNoComplete">[未完成订单]</a>进行处理!')) : l = n.detail.data.errMsg ? n.detail.data.errMsg : n.detail.data.msg ? n.detail.data.msg : "订票失败!",
                    l) {
                        l.match(/非法请求|第三方/) && (l = "下单遇到问题，请刷新页面重试");
                        var h = !1
                          , d = !1;
                        l.match(/下单遇到问题|出票失败|网络繁忙|订票失败/) || l.match(/核验后再请办理购票业务/) && (d = !0),
                        i.getStatus() && (s.audioPlay = !1,
                        s.msg = l.replace(/<.*?>/g, ""),
                        t()),
                        !0 !== n.detail.silence ? ("auto" == n.type && (r = setTimeout(function() {
                            var t = o.__instance.__wrapper.is(":visible")
                              , e = -1 != o.__instance.__content.html().indexOf(l);
                            t && e && (o.close(),
                            $(document).trigger("restartbrush"))
                        }
                        , c)),
                        o.alert({
                            content: l
                        }),
                        h ? ($('.window [data-window-btn="apply"]').hide(),
                        $(".link-qiangpiao-app").off("click").on("click", function() {
                            (new Image).src = "http://dd.browser.360.cn/static/a/377.8416.gif?" + Math.random(),
                            o.close(),
                            $(document).trigger("floating-show-app-download-layer")
                        }
                        )) : d && $('.window [data-window-btn="apply"]').text("立即核验").off("click").on("click", function() {
                            window.open("https://kyfw.12306.cn/otn/userSecurity/bindTel")
                        }
                        )) : (o.close(),
                        i.getStatus() || (s.audioPlay = !1,
                        s.msg = "没有足够的票，已经帮您恢复刷票。",
                        t(!0)))
                    }
                }
                "neterror" !== n.code || i.getStatus() || u()
            },
            ordersubmiting: function() {},
            ordersubmited: function() {},
            cannotautosubmit: function(e, n) {
                n && n.msg && (i.getStatus() && (s.audioPlay = !1,
                s.msg = n.msg,
                t()),
                o.alert({
                    content: n.msg
                }))
            },
            canorder: function() {
                s.audioPlay = !0,
                s.msg = "可以下单了！",
                t()
            },
            autosubmitsuccess: function() {
                s.audioPlay = !0,
                s.msg = "下单成功，可以付款了！",
                t(!0)
            },
            notify: function(e, n) {
                $.extend(!0, s, n),
                t(!0)
            }
        })
    }
    (e),
    Object.preventExtensions(e)
}
);
"use strict";
define("./widgets/sortByStartTime/sortByStartTime", ["../trainList/plugins/sortByStartTime", "../trainList/index"], function(t, e, n) {
    var i = t("../trainList/plugins/sortByStartTime")
      , a = t("../trainList/index")
      , s = !1;
    n.exports = {
        init: function() {
            s || (s = !0,
            a.addPlugin(i))
        }
    }
}
);
define("./widgets/trainList/plugins/sortByStartTime", [], function(t, e, n) {
    "use strict";
    var i = function() {}
    ;
    i.init = function() {
        $(document).on("beforerender", function(t, e) {
            var n = e.list;
            n.sort(function(t, e) {
                var n = parseFloat(t.startTime.replace(/:/, "."))
                  , i = parseFloat(e.startTime.replace(/:/, "."));
                return n > i ? 1 : i > n ? -1 : 0
            }
            )
        }
        )
    }
    ,
    n.exports = i
}
);
"use strict";
define("./widgets/sortByTicketCount/sortByTicketCount", ["../trainList/plugins/sortByTicketCount", "../trainList/index"], function(t, e, n) {
    var i = t("../trainList/plugins/sortByTicketCount")
      , a = t("../trainList/index")
      , s = !1;
    n.exports = {
        init: function() {
            s || (s = !0,
            a.addPlugin(i))
        }
    }
}
);
define("./widgets/trainList/plugins/sortByTicketCount", [], function(t, e, n) {
    "use strict";
    var i = function() {}
    ;
    i.init = function() {
        $(document).on("beforerender", function(t, e) {
            var n = e.list
              , i = [];
            if (n.length > 0) {
                for (var a = n.length - 1; a >= 0; ) {
                    var s = n[a]
                      , o = s.seats
                      , r = o.some(function(t) {
                        return "有" === t.tickets || parseInt(t.tickets) > 0 ? !0 : !1
                    }
                    );
                    r || (n.splice(a, 1),
                    i.unshift(s)),
                    a--
                }
                e.list = e.list.concat(i)
            }
        }
        )
    }
    ,
    n.exports = i
}
);
define("./widgets/errorlog/errorlog", [], function(t, e, n) {
    "use strict";
    n.exports = {
        init: function() {
            var t = ["querylisterror", "ordersubmiterror", "logintimeout"];
            t.forEach(function(t) {
                $(document).on(t, function(t, e) {
                    console.log(t.type + ":" + JSON.stringify(e))
                }
                )
            }
            )
        }
    }
}
);
"use strict";
define("./widgets/seatType/seatType", ["./../config/config"], function(t, e, n) {
    var i = {}
      , a = t("./../config/config");
    !function(t) {
        t.storageKey = "seatType";
        var e = "尝试下铺";
        t.init = function() {
            var n = $("#select_seat_type")
              , i = a.get(t.storageKey);
            i && n.attr("checked", i == e),
            n.on("change", function() {
                a.setByKey(t.storageKey, $(this)[0].checked ? e : "-")
            }
            )
        }
    }
    (i),
    Object.preventExtensions(i),
    n.exports = i
}
);
"use strict";
define("./widgets/notice/notice", [], function(t, e, n) {
    var i = {};
    !function(t) {
        var e = null 
          , n = null 
          , i = null 
          , a = null 
          , s = 8e3;
        t.init = function(e) {
            e = e || {},
            e.msg && (s = e.timeout || s,
            a = $(e.wrapperSelector || ".notice-wrapper").show(),
            n = $(e.btnSelector || ".notice-icon"),
            i = $(e.panelSelector || ".notice-content"),
            i.find("#notice_msg").text(e.msg),
            n.unbind("click").bind("click", function(e) {
                e.stopPropagation(),
                $(document).trigger("click", "notifyIconClick"),
                i.is(":visible") ? t.hide() : t.show()
            }
            ),
            i.find("a").unbind("click").bind("click", function(e) {
                e.preventDefault(),
                t.hide()
            }
            ),
            i.unbind("click").bind("click", function(t) {
                t.stopPropagation(),
                $(document).trigger("click", "notifyIconClick")
            }
            ),
            $(document).on("click", function(e, n) {
                "notifyIconClick" !== n && t.hide()
            }
            ))
        }
        ,
        t.show = function() {
            clearTimeout(e),
            i.fadeIn(function() {
                e = setTimeout(function() {
                    t.hide()
                }
                , s)
            }
            )
        }
        ,
        t.hide = function() {
            i.fadeOut()
        }
    }
    (i),
    Object.preventExtensions(i),
    n.exports = i
}
);
define("./widgets/notice/dateNotice", ["../utils/server.js", "./../config/config", "../settings/settings", "../extension/extension"], function(t) {
    "use strict";
    t("../utils/server.js");
    var e = t("./../config/config")
      , n = t("../settings/settings")
      , i = t("../extension/extension")
      , a = {};
    return function(t) {
        function a() {
            $(".link-12306-bind-mobile").fadeIn()
        }
        var s = 864e5
          , o = ["腊月十五", "腊月十六", "腊月十七", "腊月十八", "腊月十九", "腊月二十", "腊月廿一", "腊月廿二", "腊月廿三", "腊月廿四", "腊月廿五", "腊月廿六", "腊月廿七", "腊月廿八", "腊月廿九", "除夕", "春节", "正月初二", "正月初三", "正月初四", "正月初五", "正月初六", "正月初七", "正月初八", "正月初九", "正月初十", "正月十一", "正月十二", "正月十三", "正月十四", "正月十五", "正月十六", "正月十七", "正月十八", "正月十九", "正月二十"]
          , r = !1
          , c = function(t) {
            var e = 14228928e5
              , n = 14259168e5
              , i = t >= e && n > t
              , a = Math.floor((t - e) / s)
              , r = "";
            i && a < o.length && (r = "（" + o[a] + "）");
            var c = new Date(t);
            c.getFullYear();
            var u = c.getMonth() + 1
              , l = c.getDate();
            return u + "月" + l + "日" + r
        }
          , u = function(n, i) {
            var a = e.getPreDays(n) + (i ? e.getStuPreDays(n) : 0)
              , s = t.get(n, a);
            $(".date-from").text(s.dateFrom),
            $(".date-to").text(s.dateTo)
        }
        ;
        t.get = function(t, e) {
            return "number" != typeof e && (e = 19),
            {
                dateFrom: c(t),
                dateTo: c(t + e * s)
            }
        }
        ,
        t.init = function() {
            var t = $("#student_identity").is(":checked")
              , e = function() {
                $.ajax({
                    url: "./images/bg_icon.png?_" + Math.random()
                }).complete(function(e) {
                    var n = Date.parse(e.getResponseHeader("Date") || new Date);
                    u(n, t)
                }
                )
            }
            ;
            u(+new Date, t),
            e(),
            r || (r = !0,
            $(document).on("identitychange", function(n, i) {
                t = "0X00" == i,
                e()
            }
            ))
        }
        ,
        $(document).on("loginstatuschange", function(t, e) {
            "online" === e.status ? i.ajax({
                url: n.protocol + n.hostname + "/otn/userSecurity/bindTel",
                type: "GET",
                data: {},
                success: function(t) {
                    var n = /var\s*mobile\s*=\s*null;/.test(t);
                    localStorage["checked-tel-" + e.username] = n,
                    n || a()
                },
                error: function() {
                    "true" != localStorage["checked-tel-" + e.username] && a()
                }
            }) : (l && clearTimeout(l),
            $(".link-12306-bind-mobile").fadeOut())
        }
        );
        var l
    }
    (a),
    a
}
);
