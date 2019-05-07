(window.webpackJsonp = window.webpackJsonp || []).push([[7], {
  11: function(e, t, n) {
      "use strict";
      n.d(t, "a", function() {
          return m
      }),
      n.d(t, "d", function() {
          return g
      }),
      n.d(t, "c", function() {
          return b
      }),
      n.d(t, "b", function() {
          return y
      });
      var r = n(258)
        , a = n(0)
        , o = n.n(a)
        , c = n(58)
        , i = n(3)
        , s = n.n(i)
        , u = n(1199)
        , l = n(990)
        , d = n(255)
        , h = n(197)
        , p = n(346)
        , f = function(e) {
          var t = e.i18n
            , n = e.defaultValue
            , r = e.value;
          return (t || {})[r] || n || r
      };
      f.propTypes = {
          i18n: s.a.object,
          value: s.a.string
      };
      var m = Object(c.b)(function(e) {
          return {
              i18n: e.i18n.data
          }
      })(f)
        , g = function(e) {
          return Object(c.b)(function(e) {
              return {
                  locale: e.i18n.locale,
                  i18n: e.i18n.data,
                  formatI18nText: function(t) {
                      var n = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : {}
                        , r = n.defaultValue
                        , a = void 0 === r ? "" : r
                        , o = n.values
                        , c = f({
                          i18n: e.i18n.data,
                          defaultValue: a,
                          value: t
                      });
                      return o ? (Object.keys(o).forEach(function(e) {
                          c = c.replace("{".concat(e, "}"), o[e])
                      }),
                      c) : c
                  }
              }
          })(e)
      }
        , b = function() {
          for (var e = arguments.length, t = new Array(e), n = 0; n < e; n++)
              t[n] = arguments[n];
          return t.reduce(function(e, t) {
              return e.concat(["/:locale".concat(t)])
          }, [])
      }
        , y = Object(c.b)(function(e) {
          return {
              locale: e.i18n.locale
          }
      })(function(e) {
          var t = e.component
            , n = e.locale
            , a = e.dispatch
            , c = Object(r.a)(e, ["component", "locale", "dispatch"]);
          return o.a.createElement(u.a, Object.assign({}, c, {
              render: function(e) {
                  var r, c = e.match, i = c.params, s = c.url, u = n || Object(h.a)("lang") || "en", f = i.locale, m = f || u;
                  return p.a[m] ? f || (r = "/".concat(m).concat(e.location.pathname)) : r = "/".concat(m = u).concat(s),
                  a(Object(d.b)(m)),
                  r ? o.a.createElement(l.a, {
                      to: r
                  }) : o.a.createElement(t, e)
              }
          }))
      })
  },
  138: function(e, t, n) {
      "use strict";
      n.d(t, "b", function() {
          return i
      }),
      n.d(t, "a", function() {
          return s
      }),
      n.d(t, "e", function() {
          return u
      }),
      n.d(t, "d", function() {
          return l
      }),
      n.d(t, "c", function() {
          return d
      });
      var r = n(7)
        , a = n.n(r)
        , o = n(16)
        , c = n(19)
        , i = "SET_TICKER_LOT_SIZE"
        , s = "SET_SYMBOL_TICKERS"
        , u = function(e) {
          return function(t) {
              return t({
                  type: i,
                  data: e
              })
          }
      }
        , l = function(e) {
          return function(t) {
              return t({
                  type: s,
                  data: e
              })
          }
      }
        , d = function() {
          return function() {
              var e = Object(o.a)(a.a.mark(function e(t) {
                  var n;
                  return a.a.wrap(function(e) {
                      for (; ; )
                          switch (e.prev = e.next) {
                          case 0:
                              return e.prev = 0,
                              e.next = 3,
                              c.d.get24HrTicker();
                          case 3:
                              n = e.sent,
                              t(l({
                                  symbolTickers: n,
                                  from: "rest"
                              })),
                              e.next = 10;
                              break;
                          case 7:
                              e.prev = 7,
                              e.t0 = e.catch(0),
                              console.log("status:".concat(e.t0.status, " message: ").concat(e.t0.statusText));
                          case 10:
                          case "end":
                              return e.stop()
                          }
                  }, e, this, [[0, 7]])
              }));
              return function(t) {
                  return e.apply(this, arguments)
              }
          }()
      }
  },
  139: function(e, t, n) {
      "use strict";
      n.d(t, "f", function() {
          return r
      }),
      n.d(t, "c", function() {
          return a
      }),
      n.d(t, "a", function() {
          return o
      }),
      n.d(t, "e", function() {
          return c
      }),
      n.d(t, "b", function() {
          return i
      }),
      n.d(t, "d", function() {
          return s
      }),
      n.d(t, "l", function() {
          return u
      }),
      n.d(t, "i", function() {
          return l
      }),
      n.d(t, "j", function() {
          return d
      }),
      n.d(t, "g", function() {
          return h
      }),
      n.d(t, "k", function() {
          return p
      }),
      n.d(t, "h", function() {
          return f
      });
      var r = "createAccount/SET_STEP"
        , a = "createAccount/SET_PASSWORD"
        , o = "createAccount/SET_ACCOUNT"
        , c = "createAccount/SET_SHOW_PRIVATEKEY"
        , i = "createAccount/SET_CONFIRM_MNEMONIC"
        , s = "createAccount/SET_SHOW_KEYSTORE_TEXT"
        , u = function(e) {
          return function(t) {
              return t({
                  type: r,
                  step: e
              })
          }
      }
        , l = function(e) {
          return function(t) {
              return t({
                  type: a,
                  password: e
              })
          }
      }
        , d = function(e) {
          return function(t) {
              return t({
                  type: s,
                  data: e
              })
          }
      }
        , h = function(e) {
          return function(t) {
              return t({
                  type: o,
                  data: e
              })
          }
      }
        , p = function(e) {
          return function(t) {
              return t({
                  type: c,
                  data: e
              })
          }
      }
        , f = function(e) {
          return function(t) {
              return t({
                  type: i,
                  data: e
              })
          }
      }
  },
  171: function(e, t, n) {
      "use strict";
      n.d(t, "a", function() {
          return d
      }),
      n.d(t, "b", function() {
          return f
      });
      var r = n(33)
        , a = n(34)
        , o = n(40)
        , c = n(38)
        , i = n(39)
        , s = n(0)
        , u = n.n(s)
        , l = n(18)
        , d = l.d.button(["width:", ";height:", ";line-height:", ';text-align:center;font-size:14px;font-weight:bold;background:linear-gradient(90deg,rgba(239,184,11,1) 0%,rgba(251,218,60,1) 100%);border-radius:3px;cursor:pointer;color:#fff;display:flex;justify-content:center;position:relative;overflow:hidden;border:none;outline:none;box-sizing:border-box;&:after{content:"";display:block;position:absolute;width:100%;height:100%;top:0;left:0;pointer-events:none;background-image:radial-gradient(circle,#999 10%,transparent 10.01%);background-repeat:no-repeat;background-position:50%;transform:scale(10,10);opacity:0;transition:transform .3s,opacity .5s;}&:active:after{transform:scale(0,0);opacity:.6;transition:0s;}span{transition:transform 0.2s ease;@media (max-width:768px){width:100%;}}a{transition:transform 0.2s ease;@media (max-width:768px){width:100%;}}i{@media (max-width:768px){display:none;}}&:hover span{transform:scale(0.9);}&:hover a{transform:scale(0.9);}&:hover i{transform:scale(0.9);}@media (max-width:768px){width:100%;}'], function(e) {
          return e.width ? e.width : "100px"
      }, function(e) {
          return e.height ? e.height : "40px"
      }, function(e) {
          return e.height ? e.height : "40px"
      })
        , h = Object(l.d)(d)(["background:#848E9C;box-shadow:none;width:", ";&:hover{transform:scale(1);}"], function(e) {
          return e.width ? e.width : "100px"
      })
        , p = l.d.div(["width:20px;height:20px;border-radius:50%;border:1px solid #fff;border-left:1px solid transparent;animation:load 0.8s infinite linear;align-self:center;@keyframes load{0%{transform:rotate(0deg);}50%{transform:rotate(180deg);}100%{transform:rotate(360deg);}}"])
        , f = function(e) {
          function t() {
              var e, n;
              Object(r.a)(this, t);
              for (var a = arguments.length, i = new Array(a), s = 0; s < a; s++)
                  i[s] = arguments[s];
              return (n = Object(o.a)(this, (e = Object(c.a)(t)).call.apply(e, [this].concat(i))))._handleClick = function(e) {
                  var t = n.props
                    , r = t.onClick;
                  t.loading || r && r(e)
              }
              ,
              n
          }
          return Object(i.a)(t, e),
          Object(a.a)(t, [{
              key: "render",
              value: function() {
                  var e = this.props
                    , t = e.disabled
                    , n = e.children
                    , r = e.loading
                    , a = e.width
                    , o = e.height;
                  return u.a.createElement(s.Fragment, null, t ? u.a.createElement(h, {
                      width: a
                  }, n) : u.a.createElement(d, {
                      onClick: this._handleClick,
                      width: a,
                      height: o
                  }, r ? u.a.createElement(p, null) : n))
              }
          }]),
          t
      }(s.PureComponent);
      f.defaultProps = {
          disabled: !1,
          loading: !1,
          onClick: function() {},
          children: null,
          width: "",
          height: "",
          type: "active"
      }
  },
  172: function(e, t, n) {
      "use strict";
      n.d(t, "c", function() {
          return r
      }),
      n.d(t, "b", function() {
          return a
      }),
      n.d(t, "d", function() {
          return o
      }),
      t.a = function(e) {
          var t = new RegExp("(^|&)".concat(e, "=([^&]*)(&|$)"))
            , n = window.location.search.substr(1).match(t);
          return null != n ? decodeURIComponent(n[2]) : null
      }
      ;
      var r = function() {
          return /mobile|phone|android|pad/i.test(window.navigator.userAgent)
      }
        , a = function() {
          return /iphone|ipad/i.test(window.navigator.userAgent)
      }
        , o = function() {
          var e = window.location
            , t = e.origin
            , n = e.pathname;
          window.location.href = t + n
      }
  },
  19: function(e, t, n) {
      "use strict";
      n.d(t, "c", function() {
          return i
      }),
      n.d(t, "b", function() {
          return u
      }),
      n.d(t, "e", function() {
          return l
      }),
      n.d(t, "a", function() {
          return d
      });
      var r = n(33)
        , a = n(34)
        , o = n(265)
        , c = n.n(o)
        , i = "testnet";
      window.__network__ = "testnet";
      var s = {
          qa: "https://i18n.fdgahl.cn",
          testnet: "https://resource.bnbstatic.com",
          mainnet: "https://resource.bnbstatic.com"
      }[i]
        , u = {
          qa: ["dex-api.fdgahl.cn"],
          testnet: ["testnet-dex.binance.org", "testnet-dex-asiapacific.binance.org", "testnet-dex-atlantic.binance.org"],
          mainnet: ["dex.binance.org", "dex-asiapacific.binance.org", "dex-european.binance.org", "dex-atlantic.binance.org"]
      }[i]
        , l = window.localStorage.getItem("network") || u[0]
        , d = "http://testnet-explorer.binance.org"
        , h = function() {
          function e() {
              return Object(r.a)(this, e),
              e.instance || (this.baseUri = "https://".concat(l),
              this.wssUri = "wss://".concat(l, "/api/"),
              e.instance = this),
              e.instance
          }
          return Object(a.a)(e, [{
              key: "getHttpBaseUri",
              value: function() {
                  return this.baseUri
              }
          }, {
              key: "getWSSBaseUri",
              value: function() {
                  return this.wssUri
              }
          }, {
              key: "setBaseUri",
              value: function(e) {
                  this.baseUri = "https://".concat(e),
                  this.wssUri = "wss://".concat(e, "/api/")
              }
          }, {
              key: "getBalances",
              value: function(e) {
                  return this.request("get", "/api/v1/balances/".concat(e))
              }
          }, {
              key: "getAccount",
              value: function(e) {
                  return this.request("get", "/api/v1/account/".concat(e))
              }
          }, {
              key: "getNodeInfo",
              value: function() {
                  return this.request("get", "/api/v1/node-info")
              }
          }, {
              key: "getPairs",
              value: function() {
                  return this.request("get", "/api/v1/markets", {
                      limit: 1e3
                  })
              }
          }, {
              key: "getFees",
              value: function() {
                  return this.request("get", "/api/v1/fees")
              }
          }, {
              key: "getTokens",
              value: function() {
                  return this.request("get", "/api/v1/tokens", {
                      limit: 1e3
                  })
              }
          }, {
              key: "getDepth",
              value: function(e) {
                  return this.request("get", "/api/v1/depth", e)
              }
          }, {
              key: "getOpenOrdersQS",
              value: function(e) {
                  return this.request("get", "/api/v1/orders/open", e)
              }
          }, {
              key: "getOrderHistoryQS",
              value: function(e) {
                  return this.request("get", "/api/v1/orders/closed", e)
              }
          }, {
              key: "getOrderTradeHistoryQS",
              value: function(e) {
                  return this.request("get", "/api/v1/trades", e)
              }
          }, {
              key: "getFiatCurrency",
              value: function() {
                  return this.request("get", "/api/v1/fiat-currency", null)
              }
          }, {
              key: "getCryptoCurrency",
              value: function() {
                  return this.request("get", "/api/v1/crypto-currency", null)
              }
          }, {
              key: "get24HrTicker",
              value: function(e) {
                  return this.request("get", "/api/v1/ticker/24hr", e)
              }
          }, {
              key: "getTradesByHeight",
              value: function(e) {
                  return this.request("get", "/api/query/trades-by-height", e)
              }
          }, {
              key: "getPeers",
              value: function() {
                  return this.request("get", "api/v1/peers")
              }
          }, {
              key: "getTradesByBlock",
              value: function(e) {
                  return this.request("get", "api/v1/block-trades", e)
              }
          }, {
              key: "ipValidate",
              value: function() {
                  return this.request("get", "api/ip-validate")
              }
          }, {
              key: "getTransactions",
              value: function(e) {
                  return this.request("get", "/api/v1/transactions", e)
              }
          }, {
              key: "getBlockExchangeFees",
              value: function(e) {
                  return this.request("get", "/api/v1/block-exchange-fee", e)
              }
          }, {
              key: "getI18nData",
              value: function(e) {
                  return this.request("get", "/i18n/api/v1/out/web-wallet-ui/".concat(e), {}, s)
              }
          }, {
              key: "request",
              value: function(e, t, n, r) {
                  var a = c.a.create({
                      baseURL: r || this.baseUri
                  })
                    , o = function(e, t) {
                      var n = [];
                      for (var r in t)
                          n.push(r + "=" + t[r]);
                      return e + "?" + n.join("&")
                  }(t, n);
                  return a[e.toLowerCase()](o).then(function(e) {
                      return e.data
                  }).catch(function(e) {
                      var t;
                      throw t = new Error("[API] HTTP request failed. Inspect this error for more info"),
                      Object.assign(t, e.response),
                      console.warn("[WARN] ".concat(t.message || ""), t),
                      t
                  })
              }
          }]),
          e
      }();
      t.d = new h
  },
  196: function(e, t, n) {
      "use strict";
      n.d(t, "a", function() {
          return s
      }),
      n.d(t, "b", function() {
          return u
      }),
      n.d(t, "c", function() {
          return h
      }),
      n.d(t, "d", function() {
          return p
      });
      var r = n(7)
        , a = n.n(r)
        , o = n(16)
        , c = n(19)
        , i = n(45)
        , s = "SET_BLOCK_FEE_HISTORY"
        , u = "SET_FEES"
        , l = function(e) {
          return function(t) {
              t({
                  type: s,
                  data: e
              })
          }
      }
        , d = function(e) {
          return function(t) {
              t({
                  type: u,
                  data: e
              })
          }
      }
        , h = function(e) {
          return function() {
              var t = Object(o.a)(a.a.mark(function t(n) {
                  var r;
                  return a.a.wrap(function(t) {
                      for (; ; )
                          switch (t.prev = t.next) {
                          case 0:
                              return t.prev = 0,
                              n(Object(i.d)(!0)),
                              t.next = 4,
                              c.d.getBlockExchangeFees(e);
                          case 4:
                              r = t.sent,
                              n(l(r)),
                              n(Object(i.d)(!1)),
                              t.next = 13;
                              break;
                          case 9:
                              t.prev = 9,
                              t.t0 = t.catch(0),
                              console.log("status:".concat(t.t0.status, " message: ").concat(t.t0.statusText)),
                              n(Object(i.d)(!1));
                          case 13:
                          case "end":
                              return t.stop()
                          }
                  }, t, this, [[0, 9]])
              }));
              return function(e) {
                  return t.apply(this, arguments)
              }
          }()
      }
        , p = function() {
          return function() {
              var e = Object(o.a)(a.a.mark(function e(t) {
                  var n;
                  return a.a.wrap(function(e) {
                      for (; ; )
                          switch (e.prev = e.next) {
                          case 0:
                              return e.prev = 0,
                              e.next = 3,
                              c.d.getFees();
                          case 3:
                              n = e.sent,
                              t(d(n)),
                              e.next = 10;
                              break;
                          case 7:
                              e.prev = 7,
                              e.t0 = e.catch(0),
                              console.log("status:".concat(e.t0.status, " message: ").concat(e.t0.statusText));
                          case 10:
                          case "end":
                              return e.stop()
                          }
                  }, e, this, [[0, 7]])
              }));
              return function(t) {
                  return e.apply(this, arguments)
              }
          }()
      }
  },
  197: function(e, t, n) {
      "use strict";
      n.d(t, "a", function() {
          return r
      }),
      n.d(t, "b", function() {
          return a
      });
      var r = function(e) {
          if ("undefined" === typeof document)
              return "";
          for (var t = "".concat(e, "="), n = document.cookie.split(";"), r = 0; r < n.length; r++) {
              for (var a = n[r]; " " === a.charAt(0); )
                  a = a.substring(1, a.length);
              if (0 === a.indexOf(t))
                  return a.substring(t.length, a.length) || ""
          }
          return ""
      }
        , a = function(e, t) {
          var n, r = arguments.length > 2 && void 0 !== arguments[2] ? arguments[2] : 365, a = new Date;
          r ? (a.setTime(a.getTime() + 24 * r * 60 * 60 * 1e3),
          n = "; expires=".concat(a.toGMTString())) : n = "",
          document.cookie = "".concat(e, "=").concat(t).concat(n, "; path=/")
      }
  },
  199: function(e, t, n) {
      "use strict";
      var r = n(258)
        , a = n(0)
        , o = n.n(a)
        , c = n(18).d.i(["color:", ";font-size:", ";&:hover{color:", "}"], function(e) {
          return e.color
      }, function(e) {
          var t = e.size;
          return "".concat(t, "px")
      }, function(e) {
          return e.hoverColor ? e.hoverColor : e.color
      })
        , i = function(e) {
          var t = e.type
            , n = e.size
            , a = e.color
            , i = Object(r.a)(e, ["type", "size", "color"]);
          return o.a.createElement(c, Object.assign({
              className: "iconfont icon-".concat(t),
              size: n || "16px",
              color: a
          }, i))
      };
      i.defaultProps = {
          size: 16,
          color: "",
          hoverColor: ""
      },
      t.a = i
  },
  200: function(e, t, n) {
      "use strict";
      n.d(t, "a", function() {
          return b
      });
      var r = n(33)
        , a = n(34)
        , o = n(40)
        , c = n(38)
        , i = n(39)
        , s = n(0)
        , u = n.n(s)
        , l = n(58)
        , d = n(201)
        , h = n.n(d)
        , p = n(19)
        , f = p.d.getHttpBaseUri()
        , m = Object(s.createContext)({})
        , g = function(e) {
          function t(e) {
              var n;
              Object(r.a)(this, t);
              var a = (n = Object(o.a)(this, Object(c.a)(t).call(this, e)))._client = new h.a(f);
              return a.initChain(),
              "mainnet" === p.c && a.chooseNetwork("mainnet"),
              n
          }
          return Object(i.a)(t, e),
          Object(a.a)(t, [{
              key: "componentWillUpdate",
              value: function(e) {
                  var t = e.address;
                  this.props.address !== t && (console.log("BNCClientProvider: Account address has changed, clearing account_number."),
                  this._client && this._client.account_number && (this._client.account_number = null))
              }
          }, {
              key: "render",
              value: function() {
                  var e = this.props.children;
                  return u.a.createElement(m.Provider, {
                      value: this._client
                  }, e)
              }
          }]),
          t
      }(s.Component)
        , b = (m.Provider,
      m.Consumer);
      t.b = Object(l.b)(function(e) {
          return {
              address: e.account.address
          }
      })(g)
  },
  202: function(e, t, n) {
      "use strict";
      n.d(t, "b", function() {
          return s
      }),
      n.d(t, "c", function() {
          return u
      }),
      n.d(t, "a", function() {
          return l
      }),
      n.d(t, "f", function() {
          return d
      }),
      n.d(t, "d", function() {
          return f
      }),
      n.d(t, "e", function() {
          return m
      });
      var r = n(7)
        , a = n.n(r)
        , o = n(16)
        , c = n(19)
        , i = n(45)
        , s = "SET_OPEN_ORDERS"
        , u = "SET_ORDER_HISTORY"
        , l = "SET_FETCH_OPENORDERS"
        , d = function(e) {
          return function(t) {
              return t({
                  type: s,
                  data: e
              })
          }
      }
        , h = function(e) {
          return function(t) {
              return t({
                  type: u,
                  data: e
              })
          }
      }
        , p = function(e) {
          return function(t) {
              return t({
                  type: l,
                  data: e
              })
          }
      }
        , f = function(e) {
          return function() {
              var t = Object(o.a)(a.a.mark(function t(n) {
                  var r;
                  return a.a.wrap(function(t) {
                      for (; ; )
                          switch (t.prev = t.next) {
                          case 0:
                              return t.prev = 0,
                              n(p(!0)),
                              t.next = 4,
                              c.d.getOpenOrdersQS(e);
                          case 4:
                              r = t.sent,
                              n(d(r)),
                              n(p(!1)),
                              t.next = 13;
                              break;
                          case 9:
                              t.prev = 9,
                              t.t0 = t.catch(0),
                              n(p(!1)),
                              console.log("status:".concat(t.t0.status, " message: ").concat(t.t0.statusText));
                          case 13:
                          case "end":
                              return t.stop()
                          }
                  }, t, this, [[0, 9]])
              }));
              return function(e) {
                  return t.apply(this, arguments)
              }
          }()
      }
        , m = function(e, t) {
          return function() {
              var n = Object(o.a)(a.a.mark(function n(r) {
                  var o;
                  return a.a.wrap(function(n) {
                      for (; ; )
                          switch (n.prev = n.next) {
                          case 0:
                              return n.prev = 0,
                              t && r(Object(i.d)(!0)),
                              n.next = 4,
                              c.d.getOrderHistoryQS(e);
                          case 4:
                              o = n.sent,
                              r(h(o)),
                              t && r(Object(i.d)(!1)),
                              n.next = 13;
                              break;
                          case 9:
                              n.prev = 9,
                              n.t0 = n.catch(0),
                              console.log("status:".concat(n.t0.status, " message: ").concat(n.t0.statusText)),
                              t && r(Object(i.d)(!1));
                          case 13:
                          case "end":
                              return n.stop()
                          }
                  }, n, this, [[0, 9]])
              }));
              return function(e) {
                  return n.apply(this, arguments)
              }
          }()
      }
  },
  203: function(e, t, n) {
      "use strict";
      n.d(t, "a", function() {
          return s
      }),
      n.d(t, "c", function() {
          return u
      }),
      n.d(t, "b", function() {
          return l
      }),
      n.d(t, "f", function() {
          return d
      }),
      n.d(t, "e", function() {
          return f
      }),
      n.d(t, "d", function() {
          return m
      });
      var r = n(7)
        , a = n.n(r)
        , o = n(16)
        , c = n(19)
        , i = n(45)
        , s = "SET_ACCOUNT_TRADE_HISTORY"
        , u = "SET_TRADE_HISTORY"
        , l = "SET_FETCH_TRADE_HISTORY"
        , d = function(e) {
          return function(t) {
              return t({
                  type: u,
                  data: e
              })
          }
      }
        , h = function(e) {
          return function(t) {
              t({
                  type: l,
                  data: e
              })
          }
      }
        , p = function(e) {
          return function(t) {
              t({
                  type: s,
                  data: e
              })
          }
      }
        , f = function(e) {
          return function() {
              var t = Object(o.a)(a.a.mark(function t(n) {
                  var r;
                  return a.a.wrap(function(t) {
                      for (; ; )
                          switch (t.prev = t.next) {
                          case 0:
                              return t.prev = 0,
                              n(h(!0)),
                              t.next = 4,
                              c.d.getOrderTradeHistoryQS(e);
                          case 4:
                              r = t.sent,
                              n(d(r)),
                              n(h(!1)),
                              t.next = 12;
                              break;
                          case 9:
                              t.prev = 9,
                              t.t0 = t.catch(0),
                              console.log("status:".concat(t.t0.status, " message: ").concat(t.t0.statusText));
                          case 12:
                          case "end":
                              return t.stop()
                          }
                  }, t, this, [[0, 9]])
              }));
              return function(e) {
                  return t.apply(this, arguments)
              }
          }()
      }
        , m = function(e, t) {
          return function() {
              var n = Object(o.a)(a.a.mark(function n(r) {
                  var o;
                  return a.a.wrap(function(n) {
                      for (; ; )
                          switch (n.prev = n.next) {
                          case 0:
                              return n.prev = 0,
                              t && r(Object(i.d)(!0)),
                              n.next = 4,
                              c.d.getOrderTradeHistoryQS(e);
                          case 4:
                              o = n.sent,
                              r(p(o)),
                              t && r(Object(i.d)(!1)),
                              n.next = 12;
                              break;
                          case 9:
                              n.prev = 9,
                              n.t0 = n.catch(0),
                              console.log("status:".concat(n.t0.status, " message: ").concat(n.t0.statusText));
                          case 12:
                          case "end":
                              return n.stop()
                          }
                  }, n, this, [[0, 9]])
              }));
              return function(e) {
                  return n.apply(this, arguments)
              }
          }()
      }
  },
  245: function(e, t, n) {
      "use strict";
      var r = n(0)
        , a = n.n(r)
        , o = n(18)
        , c = Object(o.e)(["0%,40%,100%{transform:scaleY(0.4);}20%{transform:scaleY(1.0);}"])
        , i = o.d.div(["width:50px;height:35px;text-align:center;font-size:10px;position:absolute;left:50%;top:50%;transform:translate(-50%,-50%);& > div{background-color:#f5bc00;height:100%;width:3px;display:inline-block;margin:0 3px;animation:", " 1.2s infinite ease-in-out;}& > .rect2{animation-delay:-1.1s;}& > .rect3{animation-delay:-1.0s;}& > .rect4{animation-delay:-0.9s;}& > .rect5{animation-delay:-0.8s;}"], c);
      t.a = function() {
          return a.a.createElement(i, null, a.a.createElement("div", {
              className: "rect2"
          }), a.a.createElement("div", {
              className: "rect3"
          }), a.a.createElement("div", {
              className: "rect4"
          }), a.a.createElement("div", {
              className: "rect5"
          }))
      }
  },
  255: function(e, t, n) {
      "use strict";
      n.d(t, "b", function() {
          return d
      });
      var r = n(6)
        , a = n(7)
        , o = n.n(a)
        , c = n(16)
        , i = n(197)
        , s = n(19)
        , u = n(494)
        , l = n.n(u)
        , d = function(e) {
          return function() {
              var t = Object(c.a)(o.a.mark(function t(n, r) {
                  var a, c;
                  return o.a.wrap(function(t) {
                      for (; ; )
                          switch (t.prev = t.next) {
                          case 0:
                              if ((a = e) || (a = Object(i.a)("lang").toLowerCase()),
                              a = e || "en",
                              r().i18n.locale !== a) {
                                  t.next = 6;
                                  break
                              }
                              return t.abrupt("return");
                          case 6:
                              return t.prev = 6,
                              t.next = 9,
                              s.d.getI18nData(a);
                          case 9:
                              c = t.sent,
                              n({
                                  type: "i18n/SET_I18N",
                                  data: {
                                      locale: a,
                                      data: c
                                  }
                              }),
                              Object(i.b)("lang", a),
                              "undefined" === typeof window || window.prerenderReady || setTimeout(function() {
                                  window.prerenderReady = !0
                              }, 50),
                              t.next = 20;
                              break;
                          case 15:
                              t.prev = 15,
                              t.t0 = t.catch(6),
                              n({
                                  type: "i18n/SET_I18N",
                                  data: {
                                      locale: a,
                                      data: l.a
                                  }
                              }),
                              console.error("fetch i18n error: ", t.t0),
                              "undefined" === typeof window || window.prerenderReady || setTimeout(function() {
                                  window.prerenderReady = !0
                              }, 50);
                          case 20:
                          case "end":
                              return t.stop()
                          }
                  }, t, this, [[6, 15]])
              }));
              return function(e, n) {
                  return t.apply(this, arguments)
              }
          }()
      }
        , h = {
          locale: "",
          data: {}
      };
      t.a = function() {
          var e = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : h
            , t = arguments.length > 1 ? arguments[1] : void 0;
          switch (t.type) {
          case "i18n/SET_I18N":
              return Object(r.a)({}, e, t.data);
          default:
              return e
          }
      }
  },
  264: function(e, t, n) {
      "use strict";
      var r = n(33)
        , a = n(34)
        , o = n(40)
        , c = n(38)
        , i = n(39)
        , s = n(0)
        , u = n.n(s)
        , l = n(18)
        , d = n(263)
        , h = n(171)
        , p = n(199)
        , f = n(85)
        , m = n(11)
        , g = l.d.div(["position:fixed;top:0;left:0;right:0;bottom:0;z-index:", ";background:rgba(0,0,0,0.5);"], f.a.modal)
        , b = l.d.div(["color:", ";min-width:320px;padding:30px;box-sizing:border-box;background:", ";box-shadow:", ";position:fixed;top:20%;left:50%;transform:translate(-50%,-50%);"], function(e) {
          return e.theme.fontColor || "black"
      }, function(e) {
          return e.theme.popupBg || "#fff"
      }, function(e) {
          return e.theme.boxShadow
      })
        , y = l.d.div(["font-size:14px;font-weight:bold;font-family:'DIN';"])
        , v = l.d.div(["padding:20px 0;font-size:16px;& a{&,&:hover,&:active,&:visited{color:inherit !important;text-decoration:underline;}}"])
        , w = l.d.div(["display:flex;flex-direction:row;justify-content:", ";"], function(e) {
          return e.align
      })
        , k = l.d.div(["position:absolute;top:5px;right:8px;cursor:pointer;color:#848E9C;&:hover{color:#F0B90B;}"])
        , O = Object(l.d)(h.a)(["height:34px;line-height:34px;padding:0 20px;"])
        , x = Object(l.d)(h.a)(["height:34px;line-height:34px;background:#fff;border:1px solid #F0B90B;color:#F0B90B;margin-right:10px;box-sizing:border-box;"])
        , E = function(e) {
          function t() {
              var e, n;
              Object(r.a)(this, t);
              for (var a = arguments.length, i = new Array(a), s = 0; s < a; s++)
                  i[s] = arguments[s];
              return (n = Object(o.a)(this, (e = Object(c.a)(t)).call.apply(e, [this].concat(i))))._keydown = function(e) {
                  var t = n.props.close;
                  27 === e.keyCode && t && t()
              }
              ,
              n
          }
          return Object(i.a)(t, e),
          Object(a.a)(t, [{
              key: "componentDidMount",
              value: function() {
                  window.document.body.addEventListener("keydown", this._keydown)
              }
          }, {
              key: "componentWillUnmount",
              value: function() {
                  window.document.body.removeEventListener("keydown", this._keydown)
              }
          }, {
              key: "render",
              value: function() {
                  var e = this.props
                    , t = e.closeText
                    , n = e.title
                    , r = e.close
                    , a = e.children
                    , o = e.closeAlign
                    , c = e.next
                    , i = e.cancelButton
                    , s = e.hideButton
                    , l = e.bgColor;

                  return u.a.createElement(d.a, {
                      animConfig: [{
                          opacity: [1, 0]
                      }]
                        }, u.a.createElement(g, {
                            key: "1"
                            }, u.a.createElement(d.a, {
                            leaveReverse: !0,
                            delay: 100,
                            type: ["top", "bottom"]
                                    }, u.a.createElement(b, {
                                        key: "1",
                                        bgColor: l
                                    }, 
                                        u.a.createElement(y, null, n), 
                                        u.a.createElement(v, null, a), 
                                        !s && u.a.createElement(w, {
                                            align: o
                                        }, 
                                            i && r && u.a.createElement(x, {
                                                onClick: r
                                            }, u.a.createElement("span", null, "Cancel")
                                            ), 
                                            
                                            (c || r) && u.a.createElement(O, {
                                                onClick: c || r,
                                                width: "100px"
                                            }, u.a.createElement("span", null, t))
                                        ), 

                                        r ? u.a.createElement(k, {
                                            onClick: r
                                        }, 
                                            u.a.createElement(p.a, {
                                                type: "close",
                                                size: "18"
                                            })
                                        ) : null
                                    )
                            )
                        )
                  )
              }
          }]),
          t
      }(s.PureComponent);
      E.defaultProps = {
          closeText: u.a.createElement(m.a, {
              value: "common.close"
          }),
          cancelButton: !1,
          title: "",
          children: null,
          closeAlign: "flex-end",
          bgColor: "",
          close: null,
          next: null,
          hideButton: !1
      },
      t.a = E
  },
  266: function(e, t, n) {
      "use strict";
      n.d(t, "b", function() {
          return s
      }),
      n.d(t, "a", function() {
          return u
      }),
      n.d(t, "c", function() {
          return h
      });
      var r = n(7)
        , a = n.n(r)
        , o = n(16)
        , c = n(19)
        , i = n(45)
        , s = "SET_TRANSACTION_HISTORY"
        , u = "SET_FETCH_TRANSACTION"
        , l = function(e) {
          return function(t) {
              t({
                  type: s,
                  data: e
              })
          }
      }
        , d = function(e) {
          return function(t) {
              t({
                  type: u,
                  data: e
              })
          }
      }
        , h = function(e) {
          return function() {
              var t = Object(o.a)(a.a.mark(function t(n) {
                  var r;
                  return a.a.wrap(function(t) {
                      for (; ; )
                          switch (t.prev = t.next) {
                          case 0:
                              return t.prev = 0,
                              n(Object(i.d)(!0)),
                              t.next = 4,
                              c.d.getTransactions(e);
                          case 4:
                              r = t.sent,
                              n(l(r)),
                              n(Object(i.d)(!1)),
                              t.next = 14;
                              break;
                          case 9:
                              t.prev = 9,
                              t.t0 = t.catch(0),
                              console.log("status:".concat(t.t0.status, " message: ").concat(t.t0.statusText)),
                              n(d(!1)),
                              n(Object(i.d)(!1));
                          case 14:
                          case "end":
                              return t.stop()
                          }
                  }, t, this, [[0, 9]])
              }));
              return function(e) {
                  return t.apply(this, arguments)
              }
          }()
      }
  },
  343: function(e, t, n) {
      "use strict";
      n.d(t, "a", function() {
          return j
      });
      var r = n(33)
        , a = n(34)
        , o = n(40)
        , c = n(38)
        , i = n(39)
        , s = n(0)
        , u = n.n(s)
        , l = n(3)
        , d = n.n(l)
        , h = n(18)
        , p = n(173)
        , f = n.n(p)
        , m = n(58)
        , g = n(75)
        , b = n(492)
        , y = n(200)
        , v = n(264)
        , w = n(344)
        , k = n(11)
        , O = null
        , x = h.d.div(["color:inherit;text-align:center;background:", ";box-shadow:", ";"], function(e) {
          return e.theme.popupBg
      }, function(e) {
          return e.theme.boxShadow
      })
        , E = function(e) {
          var t = e.bncClient
            , n = e.walletConnectClient
            , r = e.preSignCb
            , a = e.postSignCb
            , o = e.errCb
            , c = e.isClientInitailized;
          return Object(s.useEffect)(function() {
              if (t && n && Object(w.c)() && c) {
                  var e = n.getSigningDelegate(r, a, o);
                  console.log("Setting WalletConnect signing delegate on BncClient."),
                  t.setSigningDelegate(e)
              }
          }),
          null
      };
      E.propTypes = {
          bncClient: d.a.object.isRequired,
          walletConnectClient: d.a.object.isRequired,
          isClientInitailized: d.a.bool.isRequired,
          preSignCb: d.a.func,
          postSignCb: d.a.func
      },
      E.defaultProps = {
          preSignCb: function() {},
          postSignCb: function() {}
      };
      var C = Object(s.createContext)({})
        , T = function(e) {
          function t(e) {
              var n;
              return Object(r.a)(this, t),
              (n = Object(o.a)(this, Object(c.a)(t).call(this, e)))._pageLoad = function() {
                  window.localStorage.removeItem("walletconnect")
              }
              ,
              n._onDisconnect = function() {
                  var e = n.props.dispatch;
                  e(Object(g.f)({
                      address: "",
                      flags: {
                          isHardware: "",
                          isWalletConnect: ""
                      }
                  })),
                  e(Object(g.i)("")),
                  console.log("WalletConnect session disconnected; redirecting to /unlock"),
                  window.location.href = "/unlock"
              }
              ,
              n._onSessionUpdate = function(e) {
                  console.log("updated params..."),
                  console.log(e);
                  var t = n.props
                    , r = t.dispatch
                    , a = t.triggerElement;
                  r(Object(g.i)("")),
                  a && f.a.function(a.click) && a.click()
              }
              ,
              n._showSignModal = function() {
                  n.setState({
                      showModal: !0
                  })
              }
              ,
              n._hideSignModal = function() {
                  n.setState({
                      showModal: !1
                  })
              }
              ,
              n._showErrorInModal = function(e) {
                  var t = {
                      showModal: !1
                  };
                  e.message && "user canceled" !== e.message.toLowerCase() && (t.error = e),
                  n.setState(t)
              }
              ,
              n._clearError = function() {
                  n.setState({
                      error: null
                  })
              }
              ,
              n._client = new b.a(O),
              n._client.on("disconnect", n._onDisconnect),
              n._client.on("session_update", n._onSessionUpdate),
              n.state = {
                  error: null,
                  showModal: !1
              },
              n
          }
          return Object(i.a)(t, e),
          Object(a.a)(t, [{
              key: "componentDidMount",
              value: function() {
                  window.addEventListener("load", this._pageLoad)
              }
          }, {
              key: "componentWillUnmount",
              value: function() {
                  window.removeEventListener("load", this._pageLoad)
              }
          }, {
              key: "render",
              value: function() {
                  var e = this
                    , t = this.state
                    , n = t.error
                    , r = t.showModal
                    , a = this.props
                    , o = a.children
                    , c = a.formatI18nText;
                  return u.a.createElement(C.Provider, {
                      value: this._client
                  }, u.a.createElement(y.a, null, function(t) {
                      return u.a.createElement(u.a.Fragment, null, u.a.createElement(E, {
                          bncClient: t,
                          walletConnectClient: e._client,
                          isClientInitailized: e._client.initialized(),
                          preSignCb: e._showSignModal,
                          postSignCb: e._hideSignModal,
                          errCb: e._showErrorInModal
                      }), o)
                  }), r ? u.a.createElement(v.a, {
                      title: c("walletConnect.readyToConfirm")
                  }, u.a.createElement(x, null, c("walletConnect.readyToConfirmBody"))) : null, n ? u.a.createElement(v.a, {
                      close: this._clearError,
                      title: c("walletConnect.error")
                  }, u.a.createElement(x, null, u.a.createElement("p", null, c("walletConnect.errorOccur"), ":"), u.a.createElement("p", null, u.a.createElement("i", null, n.message)), u.a.createElement("p", null, c("walletConnect.pleaseEnsureOpenWorking")), u.a.createElement("p", {
                      style: {
                          marginTop: "1rem"
                      }
                  }, u.a.createElement("a", {
                      href: "/unlock",
                      rel: "noopener"
                  }, c("walletConnect.clickHereToUnlock"))))) : null)
              }
          }]),
          t
      }(s.Component);
      T.defaultProps = {
          triggerElement: null,
          formatI18nText: function() {}
      };
      C.Provider;
      var j = C.Consumer;
      t.b = Object(k.d)(Object(m.b)(function(e) {
          return {
              triggerElement: e.globalData.triggerElement
          }
      })(T))
  },
  344: function(e, t, n) {
      "use strict";
      n.d(t, "b", function() {
          return o
      }),
      n.d(t, "c", function() {
          return c
      });
      var r = n(324)
        , a = n.n(r)
        , o = function(e) {
          var t = document.createElement("a")
            , n = new Blob([JSON.stringify(e)]);
          t.download = "".concat(a.a.v4(), "_keystore"),
          t.href = URL.createObjectURL(n),
          document.body.appendChild(t),
          t.click(),
          window.URL.revokeObjectURL(t.href),
          t.remove()
      }
        , c = function() {
          var e = sessionStorage.getItem("user") || "{}";
          return (e = JSON.parse(e)).flags && e.flags.isWalletConnect
      };
      t.a = function() {
          var e = sessionStorage.getItem("user") || "{}";
          return !!(e = JSON.parse(e)).privateKey
      }
  },
  345: function(e, t, n) {
      "use strict";
      var r = n(0)
        , a = n.n(r)
        , o = n(18)
        , c = n(245)
        , i = n(85)
        , s = o.d.div(["position:fixed;top:0;left:0;right:0;bottom:0;background:rgba(0,0,0,0.5);z-index:", ";"], i.a.loading);
      t.a = function() {
          return a.a.createElement(s, null, a.a.createElement(c.a, null))
      }
  },
  346: function(e, t, n) {
      "use strict";
      n.d(t, "a", function() {
          return r
      }),
      n.d(t, "c", function() {
          return c
      }),
      n.d(t, "b", function() {
          return i
      });
      var r = Object.freeze({
          en: "English",
          cn: "\u4e2d\u6587",
          kr: "\ud55c\uad6d\uc5b4"
      })
        , a = (Object.freeze({
          en: "en",
          cn: "zh-Hans",
          tw: "zh-Hant",
          kr: "ko",
          vn: "vi"
      }),
      Object.freeze({
          en: "en",
          cn: "zh",
          tw: "zh_TW",
          kr: "ko",
          ru: "ru",
          vn: "vi",
          nl: "nl_NL"
      }))
        , o = (Object.freeze({
          en: "en",
          cn: "zh-CN",
          tw: "zh-TW",
          kr: "ko",
          ru: "ru",
          vn: "vi",
          nl: "nl-NL",
          pt: "pt"
      }),
      Object.freeze({
          en: "en-us",
          cn: "zh-cn",
          tw: "zh-tw",
          kr: "ko",
          ru: "ru",
          vn: "vi",
          it: "it",
          es: "es",
          de: "de",
          fr: "fr"
      }))
        , c = function() {
          var e = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : "en";
          return a[e] || e
      }
        , i = function() {
          var e = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : "en";
          return o[e] || e
      }
  },
  347: function(e, t, n) {
      "use strict";
      var r = n(0)
        , a = n(18)
        , o = n(245)
        , c = n(85)
        , i = a.d.div(["background:", ";bottom:0;right:0;height:100%;left:0;pointer-events:none;position:absolute;top:0;opacity:0;z-index:", ";display:none;", ""], function(e) {
          return e.theme.exchangeSecondBg
      }, c.a.shade, function(e) {
          return e.hidden ? "" : "\n    display: block;\n    pointer-events: auto;\n    opacity: 1;\n  "
      });
      t.a = function(e) {
          return r.createElement(i, e, r.createElement(o.a, null))
      }
  },
  352: function(e, t, n) {
      "use strict";
      n.d(t, "a", function() {
          return i
      }),
      n.d(t, "c", function() {
          return s
      }),
      n.d(t, "b", function() {
          return u
      });
      var r = n(7)
        , a = n.n(r)
        , o = n(16)
        , c = n(19)
        , i = "SET_ORDERBOOK"
        , s = function(e) {
          return function(t) {
              return t({
                  type: i,
                  data: e
              })
          }
      }
        , u = function(e) {
          return function() {
              var t = Object(o.a)(a.a.mark(function t(n) {
                  var r;
                  return a.a.wrap(function(t) {
                      for (; ; )
                          switch (t.prev = t.next) {
                          case 0:
                              return t.prev = 0,
                              t.next = 3,
                              c.d.getDepth(e);
                          case 3:
                              r = t.sent,
                              n(s(r)),
                              t.next = 10;
                              break;
                          case 7:
                              t.prev = 7,
                              t.t0 = t.catch(0),
                              console.log("status:".concat(t.t0.status, " message: ").concat(t.t0.statusText));
                          case 10:
                          case "end":
                              return t.stop()
                          }
                  }, t, this, [[0, 7]])
              }));
              return function(e) {
                  return t.apply(this, arguments)
              }
          }()
      }
  },
  45: function(e, t, n) {
      "use strict";
      n.d(t, "b", function() {
          return r
      }),
      n.d(t, "c", function() {
          return a
      }),
      n.d(t, "a", function() {
          return o
      }),
      n.d(t, "d", function() {
          return c
      }),
      n.d(t, "e", function() {
          return i
      }),
      n.d(t, "f", function() {
          return s
      });
      var r = "SET_GLOBAL_LOADING"
        , a = "SET_NOT_LOGIN_NOTIFY"
        , o = "SET_CONFIRM_AUTH_ELE"
        , c = function(e) {
          return function(t) {
              return t({
                  type: r,
                  data: e
              })
          }
      }
        , i = function(e) {
          return function(t) {
              return t({
                  type: a,
                  data: e
              })
          }
      }
        , s = function(e) {
          return function(t) {
              return t({
                  type: o,
                  data: e
              })
          }
      }
  },
  46: function(e, t, n) {
      "use strict";
      n.d(t, "h", function() {
          return s
      }),
      n.d(t, "b", function() {
          return u
      }),
      n.d(t, "e", function() {
          return l
      }),
      n.d(t, "m", function() {
          return d
      }),
      n.d(t, "f", function() {
          return h
      }),
      n.d(t, "c", function() {
          return p
      }),
      n.d(t, "d", function() {
          return f
      }),
      n.d(t, "a", function() {
          return m
      }),
      n.d(t, "k", function() {
          return g
      }),
      n.d(t, "i", function() {
          return b
      }),
      n.d(t, "j", function() {
          return y
      }),
      n.d(t, "l", function() {
          return v
      }),
      n.d(t, "g", function() {
          return w
      }),
      n.d(t, "s", function() {
          return O
      }),
      n.d(t, "q", function() {
          return x
      }),
      n.d(t, "r", function() {
          return E
      }),
      n.d(t, "v", function() {
          return S
      }),
      n.d(t, "w", function() {
          return P
      }),
      n.d(t, "t", function() {
          return A
      }),
      n.d(t, "u", function() {
          return I
      }),
      n.d(t, "p", function() {
          return W
      }),
      n.d(t, "n", function() {
          return B
      }),
      n.d(t, "o", function() {
          return N
      });
      var r = n(7)
        , a = n.n(r)
        , o = n(16)
        , c = n(19)
        , i = n(138)
        , s = "SET_PAIRS"
        , u = "SET_BANLANCES"
        , l = "SET_CURRENT_TRADE"
        , d = "SET_TOKENS"
        , h = "SET_FIAT_CURRENCY"
        , p = "SET_CRYPTO_CURRENCY"
        , f = "SET_CURRENT_PRICE"
        , m = "SET_AMOUNT"
        , g = "SET_SHOW_PRICE_NOTIFY"
        , b = "SET_PRICE_CHECK"
        , y = "SET_PRICE_CHECK_TEXT"
        , v = "SET_SHOW_TRADE_PAIRS_MOBILE"
        , w = "SET_IS_FETCHING_MARKETS"
        , k = function(e) {
          return function(t) {
              return t({
                  type: s,
                  data: e
              })
          }
      }
        , O = function(e) {
          return function(t) {
              return t({
                  type: l,
                  data: e
              })
          }
      }
        , x = function(e) {
          return function(t) {
              return t({
                  type: m,
                  data: e
              })
          }
      }
        , E = function(e) {
          return function(t) {
              return t({
                  type: f,
                  data: e
              })
          }
      }
        , C = function(e) {
          return function(t) {
              return t({
                  type: d,
                  data: e
              })
          }
      }
        , T = function(e) {
          return function(t) {
              return t({
                  type: h,
                  data: e
              })
          }
      }
        , j = function(e) {
          return function(t) {
              return t({
                  type: p,
                  data: e
              })
          }
      }
        , S = function(e) {
          return function(t) {
              t({
                  type: g,
                  data: e
              })
          }
      }
        , P = function(e) {
          return function(t) {
              t({
                  type: v,
                  data: e
              })
          }
      }
        , A = function(e) {
          return function(t) {
              return t({
                  type: b,
                  data: e
              })
          }
      }
        , I = function(e) {
          return function(t) {
              return t({
                  type: y,
                  data: e
              })
          }
      }
        , _ = function(e) {
          return function(t) {
              t({
                  type: w,
                  data: e
              })
          }
      }
        , W = function() {
          return function() {
              var e = Object(o.a)(a.a.mark(function e(t) {
                  var n;
                  return a.a.wrap(function(e) {
                      for (; ; )
                          switch (e.prev = e.next) {
                          case 0:
                              return e.prev = 0,
                              e.next = 3,
                              c.d.getTokens();
                          case 3:
                              n = e.sent,
                              t(C(n)),
                              e.next = 10;
                              break;
                          case 7:
                              e.prev = 7,
                              e.t0 = e.catch(0),
                              console.log("status:".concat(e.t0.status, " message: ").concat(e.t0.statusText));
                          case 10:
                          case "end":
                              return e.stop()
                          }
                  }, e, this, [[0, 7]])
              }));
              return function(t) {
                  return e.apply(this, arguments)
              }
          }()
      }
        , B = function() {
          return function() {
              var e = Object(o.a)(a.a.mark(function e(t) {
                  var n, r;
                  return a.a.wrap(function(e) {
                      for (; ; )
                          switch (e.prev = e.next) {
                          case 0:
                              return e.prev = 0,
                              e.next = 3,
                              c.d.getFiatCurrency();
                          case 3:
                              return n = e.sent,
                              e.next = 6,
                              c.d.getCryptoCurrency();
                          case 6:
                              r = e.sent,
                              t(T(n)),
                              t(j(r)),
                              e.next = 14;
                              break;
                          case 11:
                              e.prev = 11,
                              e.t0 = e.catch(0),
                              console.log("status:".concat(e.t0.status, " message: ").concat(e.t0.statusText));
                          case 14:
                          case "end":
                              return e.stop()
                          }
                  }, e, this, [[0, 11]])
              }));
              return function(t) {
                  return e.apply(this, arguments)
              }
          }()
      }
        , N = function() {
          return function() {
              var e = Object(o.a)(a.a.mark(function e(t) {
                  var n;
                  return a.a.wrap(function(e) {
                      for (; ; )
                          switch (e.prev = e.next) {
                          case 0:
                              return e.prev = 0,
                              t(_(!0)),
                              e.next = 4,
                              c.d.getPairs();
                          case 4:
                              n = e.sent,
                              t(k(n)),
                              t(Object(i.e)({
                                  pairs: n
                              })),
                              t(_(!1)),
                              e.next = 13;
                              break;
                          case 10:
                              e.prev = 10,
                              e.t0 = e.catch(0),
                              console.log("status:".concat(e.t0.status, " message: ").concat(e.t0.statusText));
                          case 13:
                          case "end":
                              return e.stop()
                          }
                  }, e, this, [[0, 10]])
              }));
              return function(t) {
                  return e.apply(this, arguments)
              }
          }()
      }
  },
  492: function(e, t, n) {
      "use strict";
      (function(e) {
          var r = n(33)
            , a = n(34)
            , o = n(40)
            , c = n(38)
            , i = n(39)
            , s = n(101)
            , u = n(7)
            , l = n.n(u)
            , d = n(16)
            , h = n(116)
            , p = n.n(h)
            , f = n(201)
            , m = n(493)
            , g = n.n(m)
            , b = function(t) {
              function n(e) {
                  var t;
                  return Object(r.a)(this, n),
                  (t = Object(o.a)(this, Object(c.a)(n).call(this, e)))._connector = null,
                  t._initialized = !1,
                  t._onConnect = t._onConnect.bind(Object(s.a)(Object(s.a)(t))),
                  t._onSessionUpdate = t._onSessionUpdate.bind(Object(s.a)(Object(s.a)(t))),
                  t._onDisconnect = t._onDisconnect.bind(Object(s.a)(Object(s.a)(t))),
                  t
              }
              return Object(i.a)(n, t),
              Object(a.a)(n, [{
                  key: "startSession",
                  value: function() {
                      var e = Object(d.a)(l.a.mark(function e() {
                          var t, n, r, a, o = arguments;
                          return l.a.wrap(function(e) {
                              for (; ; )
                                  switch (e.prev = e.next) {
                                  case 0:
                                      return t = o.length > 0 && void 0 !== o[0] && o[0],
                                      n = o.length > 1 && void 0 !== o[1] ? o[1] : "https://wallet-bridge.binance.org",
                                      this._initialized || (r = new g.a({
                                          bridge: n
                                      }),
                                      this._connector = r,
                                      this._initialized = !0),
                                      this._connector.connected && this._connector.killSession(),
                                      console.log("WalletConnect: creating session."),
                                      e.next = 7,
                                      this._connector.createSession();
                                  case 7:
                                      if (console.log("WalletConnect: session created."),
                                      a = this._connector.uri,
                                      this._connector.on("connect", this._onConnect),
                                      !t) {
                                          e.next = 12;
                                          break
                                      }
                                      throw new Error("The WalletConnect QR code modal is not supported.");
                                  case 12:
                                      return e.abrupt("return", a);
                                  case 13:
                                  case "end":
                                      return e.stop()
                                  }
                          }, e, this)
                      }));
                      return function() {
                          return e.apply(this, arguments)
                      }
                  }()
              }, {
                  key: "sendTransaction",
                  value: function() {
                      var e = Object(d.a)(l.a.mark(function e(t) {
                          var r;
                          return l.a.wrap(function(e) {
                              for (; ; )
                                  switch (e.prev = e.next) {
                                  case 0:
                                      if (t && "object" === typeof t) {
                                          e.next = 2;
                                          break
                                      }
                                      throw new Error("sendTransaction expected a `signDocObj` of type `object`");
                                  case 2:
                                      return r = {
                                          id: 1,
                                          jsonrpc: "2.0",
                                          method: n.METHOD_SIGN,
                                          params: [t]
                                      },
                                      e.abrupt("return", this._connector.sendCustomRequest(r));
                                  case 4:
                                  case "end":
                                      return e.stop()
                                  }
                          }, e, this)
                      }));
                      return function(t) {
                          return e.apply(this, arguments)
                      }
                  }()
              }, {
                  key: "sendConfirmation",
                  value: function() {
                      var e = Object(d.a)(l.a.mark(function e() {
                          var t, r, a, o = arguments;
                          return l.a.wrap(function(e) {
                              for (; ; )
                                  switch (e.prev = e.next) {
                                  case 0:
                                      if (t = !(o.length > 0 && void 0 !== o[0]) || o[0],
                                      r = o.length > 1 && void 0 !== o[1] ? o[1] : null,
                                      "boolean" === typeof t) {
                                          e.next = 4;
                                          break
                                      }
                                      throw new Error("sendConfirmation expected an `ok` of type `boolean`");
                                  case 4:
                                      if (!r || "string" === typeof r) {
                                          e.next = 6;
                                          break
                                      }
                                      throw new Error("sendConfirmation expected an optional `errorMsg` of type `string`");
                                  case 6:
                                      return a = {
                                          id: 1,
                                          jsonrpc: "2.0",
                                          method: n.METHOD_CONFIRM,
                                          params: [{
                                              ok: t,
                                              errorMsg: r
                                          }]
                                      },
                                      e.abrupt("return", this._connector.sendCustomRequest(a));
                                  case 8:
                                  case "end":
                                      return e.stop()
                                  }
                          }, e, this)
                      }));
                      return function() {
                          return e.apply(this, arguments)
                      }
                  }()
              }, {
                  key: "disconnect",
                  value: function() {
                      this._connector && (this._connector.killSession(),
                      this._connector._socket && this._connector._socket.close(),
                      Array.isArray(this._connector._eventEmitters) && (this._connector._eventEmitters.length = 0),
                      this._connector = null,
                      this._initialized = !1)
                  }
              }, {
                  key: "initialized",
                  value: function() {
                      return !!this._initialized
                  }
              }, {
                  key: "ready",
                  value: function() {
                      return !!this._initialized && this._connector.connected
                  }
              }, {
                  key: "connected",
                  value: function() {
                      return this.ready()
                  }
              }, {
                  key: "getSigningDelegate",
                  value: function(t, n, r) {
                      return function(t, n, r, a) {
                          return function() {
                              var o = Object(d.a)(l.a.mark(function o(c, i) {
                                  var s, u, d, h, p, m, g, b, y, v;
                                  return l.a.wrap(function(o) {
                                      for (; ; )
                                          switch (o.prev = o.next) {
                                          case 0:
                                              return s = c.getSignBytes(i),
                                              u = JSON.parse(s.toString()),
                                              n && n(s, u),
                                              o.prev = 3,
                                              o.next = 6,
                                              t.sendTransaction(u);
                                          case 6:
                                              h = o.sent,
                                              d = h.result || h,
                                              o.next = 15;
                                              break;
                                          case 10:
                                              return o.prev = 10,
                                              o.t0 = o.catch(3),
                                              console.error("WalletConnect error!", o.t0),
                                              a && a(o.t0),
                                              o.abrupt("return", c);
                                          case 15:
                                              if (d || a && a(new Error("The WalletConnect provider responded without a pubkey or signature")),
                                              o.prev = 16,
                                              p = JSON.parse(d),
                                              m = p.signature,
                                              g = p.publicKey,
                                              64 === (b = e.from(m, "hex")).byteLength) {
                                                  o.next = 21;
                                                  break
                                              }
                                              throw new Error("WalletConnectSigningDelegate: invalid signature length");
                                          case 21:
                                              if (65 === e.from(g, "hex").byteLength) {
                                                  o.next = 23;
                                                  break
                                              }
                                              throw new Error("WalletConnectSigningDelegate: invalid pubkey length");
                                          case 23:
                                              return y = f.crypto.getPublicKey(g),
                                              v = c.addSignature(y, b),
                                              setTimeout(function() {
                                                  t.sendConfirmation(!0)
                                              }, 0),
                                              r && r(g, m),
                                              o.abrupt("return", v);
                                          case 30:
                                              return o.prev = 30,
                                              o.t1 = o.catch(16),
                                              console.error("WalletConnectSigningDelegate: error during sig parse/add/confirm", o.t1),
                                              setTimeout(function() {
                                                  t.sendConfirmation(!1, o.t1.message)
                                              }, 0),
                                              a && a(o.t1),
                                              o.abrupt("return", c);
                                          case 36:
                                          case "end":
                                              return o.stop()
                                          }
                                  }, o, this, [[3, 10], [16, 30]])
                              }));
                              return function(e, t) {
                                  return o.apply(this, arguments)
                              }
                          }()
                      }(this, t, n, r)
                  }
              }, {
                  key: "_onConnect",
                  value: function(e, t) {
                      var n = t.params;
                      if (console.log("WalletConnect: _onConnect", this._initialized),
                      this._initialized) {
                          if (e)
                              throw e;
                          if (!n || !n[0])
                              throw new Error("_onConnect: no payload!");
                          console.log("WalletConnect: session connected.");
                          var r = this._connector
                            , a = r.accounts
                            , o = r.chainId
                            , c = a[0];
                          console.log("WalletConnect: session update. connector state:", {
                              chainId: o,
                              accounts: a
                          }),
                          this.emit("session_update", {
                              chainId: o,
                              accounts: a,
                              address: c
                          }),
                          this._connector.on("session_update", this._onSessionUpdate),
                          this._connector.on("disconnect", this._onDisconnect),
                          this.emit("connect", n[0])
                      }
                  }
              }, {
                  key: "_onSessionUpdate",
                  value: function(e, t) {
                      var n = t.params;
                      if (console.log("WalletConnect: _onSessionUpdate", this._initialized),
                      this._initialized) {
                          if (e)
                              throw e;
                          if (!n || !n[0])
                              throw new Error("_onSessionUpdate: no payload!");
                          var r = n[0]
                            , a = r.accounts
                            , o = r.chainId;
                          console.log("WalletConnect accounts:", a),
                          console.log("WalletConnect chainId:", o),
                          this.emit("session_update", n[0])
                      }
                  }
              }, {
                  key: "_onDisconnect",
                  value: function(e, t) {
                      var n = t.params;
                      if (console.log("WalletConnect: _onDisconnect", this._initialized),
                      this._initialized) {
                          if (e)
                              throw e;
                          if (!n || !n[0])
                              throw new Error("_onDisconnect: no payload!");
                          this._initialized = !1,
                          this._connector._socket && this._connector._socket.close(),
                          delete this._connector,
                          window.sessionStorage.removeItem("user"),
                          window.localStorage.removeItem("walletconnect"),
                          this.emit("disconnect", n[0])
                      } else
                          console.error("WalletConnect disconnect when not ready. This should never happen!", e, n)
                  }
              }]),
              n
          }(p.a);
          b.METHOD_SIGN = "bnb_sign",
          b.METHOD_CONFIRM = "bnb_tx_confirmation",
          t.a = b
      }
      ).call(this, n(15).Buffer)
  },
  494: function(e, t) {
      e.exports = {
          "common.goBack": "Go Back",
          "common.confirm": "Confirm",
          "common.cancel": "Cancel",
          "common.close": "Close",
          "common.yes": "Yes",
          "common.previous": "Previous",
          "common.continue": "Continue",
          "common.password": "Password",
          "common.or": "or",
          "common.mnemonicPhrase": "Mnemonic Phrase",
          "common.keystoreFile": "Keystore File",
          "common.ledgerDevice": "Ledger Device",
          "common.privateKey": "Private Key",
          "common.viewMyPrivateKey": "View my Private Key",
          "common.pleaseCheckVisitWebsite": "Please check that you are visiting ",
          "common.connect": "Connect",
          "common.viewOnly": "View Only",
          "common.walletConnect": "WalletConnect",
          "common.placeOrder": "Place Order",
          "common.errorOccured": "error occured",
          "common.networkError": "Network Error",
          "common.systemError": "System Error",
          "common.loading": "Loading",
          "inputPassword.setANewPassword": "Set a New Password",
          "inputPassword.passwordRule": "Your password must include the following properties",
          "inputPassword.passwordRule1": "8 or more characters",
          "inputPassword.passwordRule2": "An upper-case letter, symbol and a number",
          "privateKeyModal.title": "Your Private Key",
          "privateKeyModal.backupText": "Back up the text below on paper and keep it somewhere secret and safe.",
          "noContent.descPrefix": "You have no ",
          "header.testnet": "Testnet",
          "header.mainnet": "Mainnet",
          "header.exchange": "Exchange",
          "header.createWallet": "Create Wallet",
          "header.unlockWallet": "Unlock Wallet",
          "header.explorer": "Explorer",
          "header.faq": "Docs / FAQ",
          "header.forums": "Forums",
          "header.orders": "Orders",
          "header.openOrders": "Open Orders",
          "header.orderHistory": "Order History",
          "header.tradeHistory": "Trade History",
          "header.feeHistory": "Fee History",
          "header.balances": "Balances",
          "header.transactions": "Transactions",
          "header.user.wallet": "Wallet",
          "header.user.ledger": "Ledger ",
          "header.user.coinomi": "Coinomi ",
          "header.user.infinito": "Infinito ",
          "header.user.walletConnect": "WalletConnect ",
          "header.user.copyAddress": "copy address",
          "header.user.goToExplorer": "go to explorer",
          "header.user.changeWallet": "Change Wallet",
          "header.user.createNewWallet": "Create New Wallet",
          "header.user.exportKeystoreFile": "Export Keystore File",
          "header.user.closeWallet": "Close Wallet",
          "header.youWantCloseWallet": "Are you sure you want to close wallet?",
          "header.user.copySuccess": "Copy successful!",
          "home.binanceDex": "Binance DEX",
          "home.startPage.desc1": "Fast and secure decentralized digital asset exchange",
          "home.startPage.desc2": "The new cryptocurrency trading standard is here.",
          "home.startPage.startTrading": "Start Trading",
          "home.startPage.createWallet": "Create a Wallet",
          "home.startPage.getTestBNB": "Get Test BNB",
          "home.processPage.go": "Go",
          "home.processPage.getStart": "Get started with Binance DEX",
          "home.processPage.createWallet": "Create a New Wallet",
          "home.processPage.create": "Create",
          "home.processPage.createDesc": "First step is to create a Binance Chain address.",
          "home.processPage.unlockWallet": "Unlock a Wallet",
          "home.processPage.unlock": "Unlock",
          "home.processPage.unlockDesc": "Four ways to unlock your wallet",
          "home.processPage.unlockMode1": "WallectConnect",
          "home.processPage.unlockMode2": "Ledger",
          "home.processPage.unlockMode3": "Keystore File + Password",
          "home.processPage.unlockMode4": "Mnemonic",
          "home.processPage.transferAssets": "Transfer Assets",
          "home.processPage.transferAssetsDesc": "With a Binance Chain address, which can be generated with any wallet that supports Binance Chain, you can transfer BNB or other assets stored on that address.",
          "home.processPage.placeOrders": "Place Orders",
          "home.processPage.placeOrdersDesc": "Use the web wallet or API to send and cancel orders.",
          "home.processPage.aboutBalance": "About Binance DEX",
          "home.aboutPage.title": "About Binance DEX",
          "home.aboutPage.desc1.line1": "Binance Chain is a blockchain initially developed by Binance.",
          "home.aboutPage.desc1.line2": "It's modern, safe and has near-instant transaction finality (it's fast).",
          "home.aboutPage.desc2.line1": "Binance DEX is a decentralized order matching engine,",
          "home.aboutPage.desc2.line2": "powered by the core Binance Chain technology.",
          "home.aboutPage.desc3.line1": "Binance DEX is a modern and secure marketplace for issuing",
          "home.aboutPage.desc3.line2": "and exchanging digital assets, and no-one other than you holds your keys. Trading your favorite assets has never been safer.",
          "home.whyPage.title": "Why Binance DEX",
          "home.whyPage.lowTradingFees": "Low Trading Fees",
          "home.whyPage.lowTradingFeesDesc": "Trade with no withdrawal, deposit, or order placement fees \u2014 and BNB holders benefit even more.",
          "home.whyPage.decentralized": "Decentralized",
          "home.whyPage.decentralizedDesc": "Experience direct wallet to wallet trading without any third party or central authority.",
          "home.whyPage.safeAndSecure": "Safe and Secure",
          "home.whyPage.safeAndSecureDesc": "Your funds are stored on a blockchain address with a private key that only you control.",
          "home.whyPage.userFriendly": "User Friendly",
          "home.whyPage.userFriendlyDesc": "Create a wallet, unlock your wallet, and you're ready to trade. No need to deposit or withdraw.",
          "home.whyPage.community": "It's a Community Initiative",
          "home.whyPage.communityDesc": "Binance DEX is powered by on-chain governance and open source software components.",
          "home.whyPage.getStarted": "Get Started",
          "create.tutorial.title": "Wallet Creation Tutorial",
          "create.tutorial.next": "Next",
          "create.tutorial.skip": "Skip Tutorial (Not Recommended)",
          "create.tutorial.understand": "I Understand",
          "create.tutorial.step1.title": "Our Commitment",
          "create.tutorial.step1.desc1": "Binance is committed to providing you with the best and safest experience on the Binance Chain. To do that, we ask for a minute of your time to understand how decentralized wallets work and to take action in safeguarding yourself.",
          "create.tutorial.step2.title": "Keeping Your Funds",
          "create.tutorial.step2.desc1": "You are solely responsible for keeping your funds. No one else, not even Binance, can help you recover your wallet if you lose it.",
          "create.tutorial.step2.desc2": "When you create a wallet on Binance, you are provided with 3 different formats, each of them can be used to access your wallet.",
          "create.tutorial.step3.title": "Keystore File + Password",
          "create.tutorial.step3.desc1": "You can think of the keystore file like a \u201cUser ID\u201d, while the password unlocks your wallet. Both are needed to access your wallet,so keep them safe. This is a required format on Binance.",
          "create.tutorial.step4.title": "Mnemonic Phrase",
          "create.tutorial.step4.desc1": "24 words that are both the \u201cUser ID\u201d and password.This is a secondary way to access your wallet if you lose your keystore file or forget your password. Anyone who knows your mnemonic phrase can access your wallet, so keep it safe.",
          "create.tutorial.step5.title": "Private key",
          "create.tutorial.step5.desc1": "This is an alternative representation of the mnemonic phase words.",
          "create.tutorial.step5.desc2": "Binance requires all users to use the keystore file + password; and choose between the mnemonic phrase or private key as a secondary method.",
          "create.createNewWallet": "Create New Wallet",
          "create.pleaseCheck": "Please check that you are visiting ",
          "create.confirmNote": "Are you sure you have noted down your Mnemonic Phrase?",
          "create.yourKeyStore": "Your Keystore",
          "create.backupText": "Back up the text below on paper and keep it somewhere secret and safe.",
          "create.keystoreFileAndPassword": "Create Keystore File + Password",
          "create.unlockExistWallet": "Unlock an Existing Wallet",
          "create.enterPassword": "Enter a Password",
          "create.reEnterPassword": "Re-enter Password",
          "create.downloadKeyStoreFile": "Download Keystore File",
          "create.understandCheckbox": "I understand that Binance cannot recover or reset my password or the keystore file. I will make a backup of the keystore file/password, keep them secret, complete all wallet creation steps and agree to all the ",
          "create.understandCheckbox.terms": "terms",
          "create.stepTwo.desc": "We are about to show your mnemonic phrase, please ensure that no one else is looking at your screen.",
          "create.success.title": "You're all set!",
          "create.success.desc1": "You are ready to use the Binance Chain Wallet and",
          "create.success.desc2": "Decentralized Exchange!",
          "create.success.unlockWallet": "Unlock the wallet",
          "create.doubleConfirmMnemonic.title": "Choose Secondary Access",
          "create.doubleConfirmMnemonic.note": "Please select the Mnemonic Phrase in the correct order to ensure that your copy is correct.",
          "create.doubleConfirmMnemonic.tryAgain": "Incorrect Mnemonic Phrase order. Please try again.",
          "create.chooseKSOrMnemonic.title": "How do you want to create your new wallet?",
          "create.chooseKSOrMnemonic.keystoreAndPassword": "Keystore File + Password",
          "create.chooseKSOrMnemonic.keystoreFile": "Keystore File",
          "create.chooseKSOrMnemonic.recommendedUSBDrive": "Recommended to be backed up on a USB drive",
          "create.chooseKSOrMnemonic.useKeystoreFile": "Use your Keystore File (UTC / JSON) + Password to access your wallet",
          "create.chooseKSOrMnemonic.recommendedUSBDriveOrPaper": "Recommended to be backed up on paper or on a USB drive",
          "create.chooseKSOrMnemonic.useMnemonicPhrase": "Use your 24-word Mnemonic Phrase to access your wallet",
          "create.chooseKSOrMnemonic.unlockExistWallet": "Unlock an Existing Wallet",
          "create.backupMnemonic.title": "Choose Secondary Access",
          "create.backupMnemonic.note": "Back up the text below on paper and keep it somewhere secret and safe.",
          "create.backupKeystore.backupYour": "Backup your ",
          "create.backupKeystore.keystoreFile": "Keystore File",
          "create.backupKeystore.downloadKeystoreFile": "Download Keystore File (UTC/JSON)",
          "create.backupKeystore.getMyPrivateKey": "Get my Private Key",
          "create.backupKeystore.createBackupFile": "Create a backup of this file!",
          "create.backupKeystore.cannotRecoveredIt": "It cannot be recovered if you lose it.",
          "create.backupKeystore.notShareFile": "Do not share or use this file on any unverified websites. Your funds can potentially be stolen.",
          "create.backupKeystore.needFirstDownload": "You have to download keystore file first",
          "unlock.index.title": "Unlock Your Wallet",
          "unlock.index.selectUnlockType": "Select how you would like to unlock",
          "unlock.keystore.select": "Select your keystore file",
          "unlock.keystore.upload": "Upload keystore file",
          "unlock.keystore.paste": "Or paste the contents of your keystore file",
          "unlock.keystore.enterYourWalletPass": "Enter your wallet password",
          "unlock.createNewWallet": "Create a New Wallet",
          "unlock.unlockWalletNow": "Unlock Wallet Now",
          "unlock.thisIsNotAValidWalletFile": "This is not a valid wallet file",
          "unlock.ledger.enterPINCode": "Enter PIN Code",
          "unlock.ledger.openBinanceChain": "Open Binance Chain",
          "unlock.ledger.getTheApp": "Get the app",
          "unlock.ledger.appInstallation": "App Installation",
          "unlock.ledger.usageInstructions": "Usage Instructions",
          "unlock.ledger.havingConnectionIssues": "Having Connection Issues?",
          "unlock.ledger.connectToLedger": "Connect to Ledger",
          "unlock.ledger.binanceChainReady": "Binance Chain Ready",
          "unlock.ledger.mustBeOnScreen": "must be on-screen",
          "unlock.mnemonic.warning.desc1": "This option restores a lost keystore file or password,",
          "unlock.mnemonic.warning.desc2": "or imports a seed from another wallet app.",
          "unlock.mnemonic.warning.desc3": "Warning! Entering your seed phrase or private key on any website is very dangerous. If you have malicious extensions installed in your browser or accidentally visit a phishing website, your assets can be stolen.",
          "unlock.mnemonic.pleaseEnterYourPhrase": "Please enter your 24 word phrase",
          "unlock.mnemonic.pleaseSeparateEachWordSpace": "Please separate each word with a space.",
          "unlock.temporarySessionPassword": "Temporary session password",
          "unlock.privateKey.enterYourPrivateKey": "Enter your private key (hex format)",
          "unlock.privateKey.warning": "For restoring a lost keystore file or password",
          "unlock.privateKey.warningQuestion": "Entering your private key on any website is very dangerous. If you have malicious extensions installed in your browser or accidentally visit a phishing website, your assets can be stolen.",
          "unlock.privateKey.invalid": "The Private Key you entered is not in the right format and is invalid. Please try again.",
          "unlock.privateKey.passwordInvalid": "That password is invalid. Please try again.",
          "unlock.connectAddress.invalidAddress": "Invalid address",
          "unlock.connectAddress.viewOnlyMode": "Enter an address for view only mode",
          "unlock.connectAddress.enterYourAddress": "Enter your address",
          "unlock.walletConnet.title": "WalletConnect (Recommended)",
          "unlock.walletConnet.showWalletQrCode": "Scan a QR code to link your mobile wallet using WalletConnect.",
          "unlock.walletConnect.recommendedWallet": "Recommended Supported Wallets",
          "unlock.walletConnet.qrCodeDesc1": "Get WalletConnect QR Code",
          "unlock.walletConnet.qrCodeDesc2": "Don\u2019t have an app that supports WalletConnect yet?",
          "unlock.walletConnet.getTrustWallet": "Get Trust Wallet",
          "exchange.index.books": "Books",
          "exchange.index.chart": "Chart",
          "exchange.tradingPair.pair": "Pair",
          "exchange.tradingPair.price": "Price",
          "exchange.tradingPair.change": "Change",
          "exchange.tradingPair.volume": "Volume",
          "exchange.tradingPair.search": "Search",
          "exchange.tradingHistory.title": "Trading History",
          "exchange.price": "Price",
          "exchange.amount": "Amount",
          "exchange.total": "Total",
          "exchange.tradingHistory.time": "Time",
          "exchange.hideOtherPairs": "Hide Other Pairs",
          "exchange.txHash": "TxHash",
          "exchange.date": "Date",
          "exchange.pair": "Pair",
          "exchange.side": "Side",
          "exchange.filled": "Filled",
          "exchange.notional": "Notional",
          "exchange.status": "Status",
          "exchange.oneDay": "1 Day",
          "exchange.oneWeek": "1 Week",
          "exchange.oneMonth": "1 Month",
          "exchange.threeMonths": "3 Months",
          "exchange.blockHeight": "BlockHeight",
          "exchange.coin": "Coin",
          "exchange.buy": "Buy",
          "exchange.sell": "Sell",
          "exchange.type": "Type",
          "exchange.asset": "Asset",
          "exchange.name": "Name",
          "exchange.totalBalance": "Total Balance",
          "exchange.availableBalance": "Available Balance",
          "exchange.frozen": "Frozen",
          "exchange.inOrder": "In Order",
          "exchange.BTCValue": "BTC Value",
          "exchange.estimatedValue": "Estimated Value",
          "exchange.placeOrder.limitOrder": "Limit Order",
          "exchange.placeOrder.bestAsk": "Best Ask",
          "exchange.placeOrder.bestBid": "Best Bid",
          "exchange.placeOrder.noEnoughBalance": "not enough balance",
          "exchange.placeOrder.pleaseInputCorrectPrice": "please input correct price",
          "exchange.placeOrder.pleaseInputCorrectAmount": "please input correct amount",
          "exchange.placeOrder.orderPriceHigher": "Your order price will be 20% higher than the latest market price. Please proceed cautiously.",
          "exchange.placeOrder.orderPriceLow": "Your order price will be 20% less than the latest market price. Please proceed cautiously.",
          "exchange.placeOrder.successNotifyMsg": "You have successfully created a limit order to {side} {quantity} {quotaAsset}",
          "exchange.placeOrder.successNotifyTitle": "Limit {side} Order Created",
          "exchange.placeOrder.orderError": "Order Error",
          "exchange.symbolPriceInfo.lastPrice": "Last Price",
          "exchange.symbolPriceInfo.twentyFourHChange": "24h Change",
          "exchange.symbolPriceInfo.twentyFourHHigh": "24h High",
          "exchange.symbolPriceInfo.twentyFourHLow": "24h Low",
          "exchange.symbolPriceInfo.twentyFourHVolume": "24h Volume",
          "exchange.symbolPriceInfo.high": "High",
          "exchange.symbolPriceInfo.vol": "Vol",
          "exchange.symbolPriceInfo.low": "Low",
          "exchange.pleaseUnlockWallet.desc": "Oops! Please unlock your wallet first",
          "exchange.pleaseUnlockWallet.btn": "Unlock Wallet",
          "exchange.pleaseUnlockWallet.noWallet": "No Wallet?",
          "exchange.pleaseUnlockWallet.createNewWallet": "Create New Wallet",
          "exchange.max": "Max",
          "exchange.calendar.clear": "Clear",
          "exchange.calendar.today": "Today",
          "exchange.calendar.ok": "Ok",
          "exchange.time.from": "From",
          "exchange.from": "From",
          "exchange.to": "To",
          "exchange.search": "Search",
          "exchange.hideAllCanceled": "Hide all canceled",
          "exchange.pleaseSelectDate": "please select date",
          "exchange.value": "Value",
          "exchange.txFee": "TxFee",
          "openOrders.cancelAll": "Cancel All",
          "openOrders.cancelBuy": "Cancel Buy",
          "openOrders.cancelSell": "Cancel Sell",
          "openOrders.cancelOrder": "Cancel Order",
          "openOrders.cancelOrders": "Cancel Orders",
          "openOrders.keepOrder": "Keep Order",
          "openOrders.keepOrders": "Keep Orders",
          "openOrders.areYourTrue": "Are you sure you want to",
          "openOrders.cancel": "cancel",
          "openOrders.cancel all": "cancel all",
          "openOrders.cancel buy": "cancel buy",
          "openOrders.cancel sell": "cancel sell",
          "openOrders.cancelSuccess": "Cancel Success",
          "openOrders.cancelPartialSuccess": "Cancel partial success",
          "openOrders.noOpenOrders": "no open orders",
          "openOrders.noSellOpenOrders": "no sell open orders",
          "openOrders.noBuyOpenOrders": "no buy open orders",
          "openOrders.title": "Open Orders",
          "orderHistory.title": "Order History",
          "orderHistory.openHistory": "open history",
          "orderHistory.tradingTotal": "Trading Total",
          "orderHistory.tradeId": "Trade ID",
          "orderHistory.tradingPrice": "Trade Price",
          "tradeHistory.tradeHistory": "trade history",
          "fees.height": "Height",
          "fees.fee": "Fee",
          "fees.note": "Note",
          "txHistory.title": "Transaction History",
          "txHistory.notEveryTransactionIsIncludedBelow": "Not every transaction is included below. For full history, please refer to here.",
          "txHistory.here": "here",
          "balances.myBalances": "My Balances",
          "balances.filteredByAsset": "Filtered by asset",
          "balances.hideZeroBalance": "Hide Zero Balance",
          "account.footer.home": "Home",
          "account.footer.exchange": "Exchange",
          "account.footer.copyright": "\xa9 2018 - 2019 Binance.org. All rights reserved.",
          "orderForm.avb": "Avb",
          "orderForm.price": "Price",
          "orderForm.equivalent": "Equivalent",
          "orderForm.amount": "Amount",
          "orderForm.total": "Total",
          "orderForm.buy": "Buy",
          "orderForm.sell": "Sell",
          "testnet.title": "Binance Decentralized Exchange (TESTNET)",
          "testnet.fastAndSecureDesc": "Fast and secure decentralized digital asset exchange",
          "testnet.howToCreateAWallet": "How to Create a Wallet",
          "testnet.howToAccessYourWallet": "How to Access Your Wallet",
          "testnet.interfaceGuide": "Interface Guide",
          "testnet.fundingYourTestnetAccount": "Funding Your Testnet Account",
          "testnet.binanceChainExplorerGuide": "Binance Chain Explorer Guide",
          "testnet.thingsToAvoid": "Things to Avoid",
          "walletConnect.readyToConfirm": "Please Confirm",
          "walletConnect.readyToConfirmBody": "Please confirm the transaction on the wallet App.",
          "walletConnect.error": "WalletConnect Error",
          "walletConnect.errorOccur": "A WalletConnect error has occurred",
          "walletConnect.pleaseEnsureOpenWorking": "Please ensure that the app is open and working.",
          "walletConnect.clickHereToUnlock": "Click here to unlock another wallet",
          "walletConnect.qrCode": "WalletConnect QR code",
          "walletConnect.pleaseUseAWalletConnect": "Please use an app that supports unlocking a Binance Chain wallet via WalletConnect to scan the QR code above",
          "footer.terms": "Terms of Service"
      }
  },
  495: function(e, t) {
      e.exports = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAJcAAAA+CAYAAAAmjIlfAAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAAyZpVFh0WE1MOmNvbS5hZG9iZS54bXAAAAAAADw/eHBhY2tldCBiZWdpbj0i77u/IiBpZD0iVzVNME1wQ2VoaUh6cmVTek5UY3prYzlkIj8+IDx4OnhtcG1ldGEgeG1sbnM6eD0iYWRvYmU6bnM6bWV0YS8iIHg6eG1wdGs9IkFkb2JlIFhNUCBDb3JlIDUuNi1jMDY3IDc5LjE1Nzc0NywgMjAxNS8wMy8zMC0yMzo0MDo0MiAgICAgICAgIj4gPHJkZjpSREYgeG1sbnM6cmRmPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5LzAyLzIyLXJkZi1zeW50YXgtbnMjIj4gPHJkZjpEZXNjcmlwdGlvbiByZGY6YWJvdXQ9IiIgeG1sbnM6eG1wPSJodHRwOi8vbnMuYWRvYmUuY29tL3hhcC8xLjAvIiB4bWxuczp4bXBNTT0iaHR0cDovL25zLmFkb2JlLmNvbS94YXAvMS4wL21tLyIgeG1sbnM6c3RSZWY9Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC9zVHlwZS9SZXNvdXJjZVJlZiMiIHhtcDpDcmVhdG9yVG9vbD0iQWRvYmUgUGhvdG9zaG9wIENDIDIwMTUgKFdpbmRvd3MpIiB4bXBNTTpJbnN0YW5jZUlEPSJ4bXAuaWlkOkRDRjA3OUFFRUQ0QzExRTg4QUMxOEFCMjdFRkE3MEU5IiB4bXBNTTpEb2N1bWVudElEPSJ4bXAuZGlkOkRDRjA3OUFGRUQ0QzExRTg4QUMxOEFCMjdFRkE3MEU5Ij4gPHhtcE1NOkRlcml2ZWRGcm9tIHN0UmVmOmluc3RhbmNlSUQ9InhtcC5paWQ6RENGMDc5QUNFRDRDMTFFODhBQzE4QUIyN0VGQTcwRTkiIHN0UmVmOmRvY3VtZW50SUQ9InhtcC5kaWQ6RENGMDc5QURFRDRDMTFFODhBQzE4QUIyN0VGQTcwRTkiLz4gPC9yZGY6RGVzY3JpcHRpb24+IDwvcmRmOlJERj4gPC94OnhtcG1ldGE+IDw/eHBhY2tldCBlbmQ9InIiPz7lKZb7AAAPnElEQVR42uxdCZQU1RX91d3TwwzrIMMiMCCbghhUXGJkjgtLRJOjEpOQqChBRCUHl0SNEpcc0WhOokZNIqDRmMSQqMQoiRHQSMBdzMjiMCCQQYGgMMCwzN6Vd6du0Z+mZ7q6q3qbnn/OY5ru6qpf9W+9d9/9r34b5118ucrBVix2olgHh9vXipWJfaHam+MWyNHz/lIcwFLcdqTYv3LsOvnFThLrLWZE3GwfiX3e2pd9OQquvAS+k5+D16mfWJ8IYNk326hYX85VcLU3Z60whjdvB5dHzczBc25ycz1yFVw7EvjO9hy8Tv8TC7Xw2WdeEPqg2GCxrnF27KDYRrEDGXjRygiwQofbH+CFzrVWLbZMrHsE76p3cj1igQvZwhixjgl27mix5RkIMLj0be2R3lHbT/NciujrAlh2VnaM2JpcGo0xpWdBR5spNkWsJAv4msFIs1jsPrFVK5Yva3S701jgCiY542iLwDpK/vxebAJD7xYS42TwWzOKTJBoogJH8HWx8WLflPN43S3AUiGiHrprF0xfmNaBnzx/UioOM0Psq2L/FJsmA7QtBhjTek2kf3pfbpE/s8XuEdsgtjmZ4KqJtYP8QJNv4sgNQwYX7xnQMb++W8BnHrbPboW1VT07H7gghdcLZBPK8WqxD2Kk08loN5HPTZGBy6rpIunvzwRgw+XllWIj5HWlvBdKdH+xXDXS790tsvVu+wpmjX1vwsklO0Z3LajrEQksny/UWFRYuyfF1wihHMryRLHpYl0Oec5rFjZbkhsyq9pIYMlAbRRbEmV7ZNRLkhg1xmmvIy3acW1v1d9tKI/luYDat0lKO+sfdAw2+GeevXJSQbABHdhrKNMIBpqKAv5QV59h5vt9ptkhr7FGXhel6UaEx6plxjpHLmV9Co9rRvEKgwVcptjV8noeATeXH49PUd8QsufpwNb7w9bA/vvd8rmAw4t1ROx98oqXT+dnO5rJoKGGyN9O0q1h9BxoENrKVctCXDKbn5nuSdK3m+QefDSFkojRyuDO1Qb4ag1Y4yI8iRHxvqF951ZlaY/2Z5vEBiUABnxvdAuYcE0n3Li9Ew5dBAtYhQKs4ZQe8g7JEKY6Nu1kwlQj5N/zCLh0chqAahM8FkMk/r+UH9v/N/jexjh2/UCCXgbgXJms83WTLfbh32JNbmj2WFMeGaKCeaZ64trm61NC75UI9L8Wc5uQWuRgT5hdgEQA8Kdbc5theygBm8FscZz2mQ2WJdr7TjyQkzaXZrd5ESHR0+ZeezGaCeyRziKzZEM7LA/JgIxsKT2TPqiDIjZbGudul8YBbEOzGck8Vzeeazs9lS6SgmMd88ysT/TttriAxCKPznMf/x6VoSrApijhqqU2OlukDTeea3UUL1ZO8t9A2yzvVaT9LA21NcKDZVpbqoUtRcK+KcIjXe0AeG0GXCCCmBk/eJivMdRasVdpazNgQKulH5V8vTuDx2I8AWRrU4M14M0j8MwEQmbaWsJhcfL8SY0Lpi98ljrSSRl6fgDWuxrAP8mETgnvGt+C92pNwpgR53ciJRG3c5Coo+/hwCHhWleJbXM3t+iXwQupOc06kqmOV9C50v/QByZb9zeHQkP9VwNWVcJZa2Y6hU6MGqkQhweqsPTkpEGO6moDoZuypi3iCpOTH7cmgof32fn3qaVlu/oX7fMZhpmJ5SW7lDWR3JSlYOrEkGiLwHg44itwguS+jUk+/oBEABkgyka6OXL59h5q9gvn7rhg1IYu3zr144M+w+yWIR4MHAuz+x9nMJmP1U4WO0PsDTFwWEzDna+sOdM+lFdWKudaV6rokxHwSvtpaPKZL3547F6xNxdcs7BKtTcvGkLRDQzpf+F7J3LMfktA3SuGqbifq+SVYiPbHhrvdwCuoMcdybfDZXtz1TBt9gOxT5Wl2FczPELS3ylWQTD9VOxH3PYhlZzy7Qpyu54OtjV5M2wEuFAa0sujTjS1lu7nSLGgVw3eCUUATxNYNtfC+y9qXqqcYRElRv2SBC6TXjKu0Atw4UmYEerIJzycuam8Rt+Fo9YPG9qzqv/AHnsaOufXn5bmQUl3saBXDRLKAjEs5rFXbJ2yKlx3k8gr8q9viJ3CMLlK40ehdPPMAAejLJEviycCqfyusiavazNkUOxiQRj0t2ftO98uFNTDtkNvGiT3mcuBbs0bGh4N6k4e70axi8ReU9aSAkv5mSIPws38DsEILQpPQhcoq6qiOhH6nM4swB4UP4HVW7uoxZzIxgn60wwyL4sF8d07laWgx0qAEEJ8Y0rPylfuhUtkvI8pa+EUlDA9L1ZJ8KBB5/q1suZ5MW/akcfP5zYxzzmihr/RyyzfzY5O0YClFwsOV3qxoNFmigXx/CVqwrDSzTmtbFdDT/6YClcfuGm17LdB4HTUwLWPnqYDPwtpfwsSSNYaOa6eeF834GqtWNBuKBYMEWDpaygWNJqB8aLNwcTzFkhIq1FWVQfE4/187edrQx3+zKa9ys3Z5DylKvrziHXKmiaZqnl0Ny0SoKZ2XEMDXUteNJ7j1Kn4lpZKGriyvVgQnmUaSTOmrjBR/DuSZtwgqP3/UNuHXlp0pth7ylLJIzkKAInS7+s8AleqmkGv+x2xS73od8CDLmVbseAa7aawb5ISvu7FDMxPjtM5Bi14TzzgReIBKyPIf/WK5cscZQqZ9Nwi+zOQXDqQTnBle7Gg/R6yP3tGoVoDoxMJA2r549SYwv42e7xVtNbJQbh1GHgSb9leLGhziwJeUKURZcPhtYGoeHM06UI8QLYCzFbhq9yS+lwuFmzUdJ26CI3HdHDXrhcbLSEx8oGPl+jRr6cckTVN+gsueaEYHmRe59Zz5XKx4A38e5mWCU4jkd/NEDmC4RH2DAk82iq+jiZtYJ0F1Ln/QlmPxFfwJnZ6I9sP1Roqfq3QliFCPKcQb5ggj1+vyTTN20v/Gvk9ZLgQa8GhsdJNhfCx9ICLXczaYkG5ObZrPNFuW2n2IOtZ7i7+/ZDAqmuBIK+UAQNwZ4l9LwGA1PMauokqdQS+LWbXE0DBKFJDI7ffS0eBm+JBOQ/X02bugeBr7vij1JEy9ekaL4oFzyUNOF3FKM6TgXlBAAZKMIbZaCxqYK+PVUSPin5irrBSORdCQ5QSrlTWBPc7zH6PU9ay3kisLiCd+QfBBPnlKmVVXkAcvoTfRSb8bvrBZTXcJX9lGBnKi9SWigUxwA8xM3RU9SkAW0feEo8UgSLA25Q1j3hLBJ912t6ghtdfhbXI3iqs7IMT3k9vhm3G0mN9meeJh0OOln5Nl3N4KxPAZd85a1SWrSLosAwHA3FHkrvSi1xnNwf/YIL7KWMmD3L+vtjDYteQB4I3Pq9xr+3MdvEo26k8PsLn3WLzuUjJm2kBV3tRoGcNPGgyQ9KfVeK/1AHRF08JYWYD6ujtYm8RbL3VkT8x0yjgeQnLOzHDfZP8ax8BNo/88fVEOFhKQ1d7sWCr2tIPmUzMcbGfMxlOi+mN7LC2Wh2uSx5P6gI55XMBDvjhWu3zBwVUpcwe4fVWKAcLAXoOLpbegACewIsUTPNAZVuxILzWtfQsN7mkFajceIAe67oooJrMDBYl1JjeqhIQIXTeLwCr0HjgVRzTt/lZTSKdcQoufXLaTtN3CrAAJL2mKxNaXMWC6WgUV5FJDiSZnqnCNfJTVHy/M2Rof7dxPwfoxfpq4LqTmWgRw+52AgjZ5anSp5kCInui8RwtTB4jn/nks3eTAS4Uqh3x3Fp+oClUU583uCDY0F07ubZaLOglsEroXcYxgzN4vZqYKcY7N2kLriFyJXikHpQy3uc2lzFMQkq5Quw/vDYA2lQe9zbp22YBESSLXzF7PJ8SzF4V/9M/jsDVP9qbE0duOO5Afd4AAVeVyv5iwTx6X7fTNXUcwIYWgIWycJQtf5shbIUKzwAYCVIKW9/CEgFnUd96lInBLp7TNEYeHPtl7bs7mZn2JOjGSh//wHB4K7nZzSpcQeI5uKIqxVi9OWQa1l2WhcWCWsMDvKd7yBUBMNR67WlBbjiXnBC8ZktEaDMTPkNLwgC4FlGTs6WMUeRYy9ivSD2uWgAFUfVyhsnn5L0Gee9v8voVFf6hhqSAq1ZFqU7s3KG+e8AX+kJl98qCBvUfL5OQfO7z9ShgqaeXgZg5iJ7DixKdahWuPauK0Mi60jNvUS0/fLGDN0WxfS0AMGwvIEs4IXICLkwdnBgRMszC/Pp9RYW1mBiOuuZpFhQL2rpQMn7hA/vsoiKeFOIg4tc1fin2J2VNpDe65Kf2ZPVA/r8vX3/GfW9gP85gv3ZF2cdQJhNbCTKEcPAxmz8byQIXXPjiyDdLiqp7q+xfWTCZOp8/SgiqlUH7I73V5fQUpgectI7kXFHOmETdDOHuUxL4S0je5+jH448aTKNXRRZZI+8FmF1ObIlzJ1vnWq0RdzvIlDMQ6IQ+k1cWPKC8+f2caN4kavIgANsjgzdfXi7kwJkutTh8Hw+UlDID7cVMbw5vdpQH3UNZ5naOzSvkhPBw31fWYieYJlqGX8yQ/l1PwFXSsVSmGlwr2eGDKvyUTIgFgmszKCS2trJgHT3rAI+PuUULLwg5wxheoEOVUZTcKp9tc0nk9YYK4AXUz+ZxbPoRXKsJoruV9asilzFk2lwa0sPD0i87jJ9GylDO7c2UgqsNrSy4hkAoUe4fq6olsNYLcMB9bqE36UMyjdDzkXz2vAzk0yjG8/ABDewbsySzOCY/Efu3Bt4l7NsYerbu5GNvMRzq/PDHvB5nK0vgfSDVnqutrCyIzytoXgmlqJMCt0KlwSaS6EE8BtTvUtlmGD2Jl+KuSSnIz/PSl1hA6P2YgHqOCRq4aG2USemDzDCLaf5EQrdhukjr9i62n2toDovZUCzYzIO6TtiftAPd+9CTHShCQl9CXdUTDEM3U8RcRZEToXg2M0evWoDcay49DzznI8qaT4S3eop901se+RWyybvoxX+jrFp67GfO7BunfZZ6z3U4MW7LxYLxNAAJU2bPMrzsJ8BWkxx/wcF+iiFnsfJurVac8zJt/whnEyglIVRCwMU6XovoiYrYx6vIsYZx3CCmojDyDgHWznRki9HCS9YVCyahocIBAzJbBsZ+DnI9zfZuZcwWkb2NVd4uBBwij5pKUKO0+R2CbhI92KsEF2YnLmY2WM7o04XAussNsFyHxfYWNSzWkqOsV2Hh2faaPo0bwWtAPX+GHszrJaggr2C+8VKG3r4McwDUVhVerKQfow76MJl9ekKAtdWLGN3evG3LGVaGqthrxIMLfqCSs7YZAPwa+4P9B3m8XuR79hPVJt+vIUc0BFierNH1fwEGADp6AFfvWqwqAAAAAElFTkSuQmCC"
  },
  501: function(e, t, n) {
      e.exports = n(989)
  },
  75: function(e, t, n) {
      "use strict";
      n.d(t, "a", function() {
          return i
      }),
      n.d(t, "c", function() {
          return s
      }),
      n.d(t, "b", function() {
          return u
      }),
      n.d(t, "d", function() {
          return l
      }),
      n.d(t, "f", function() {
          return d
      }),
      n.d(t, "h", function() {
          return h
      }),
      n.d(t, "g", function() {
          return p
      }),
      n.d(t, "i", function() {
          return f
      }),
      n.d(t, "e", function() {
          return m
      });
      var r = n(7)
        , a = n.n(r)
        , o = n(16)
        , c = n(19)
        , i = "account/SET_ACCOUNT"
        , s = "account/SET_USER_INFO"
        , u = "account/SET_NEEDAUTH"
        , l = "account/SET_WALLETCONNECT_URI"
        , d = function(e) {
          return function(t) {
              return t({
                  type: i,
                  data: e
              })
          }
      }
        , h = function(e) {
          return function(t) {
              return t({
                  type: s,
                  data: e
              })
          }
      }
        , p = function(e) {
          return function(t) {
              return t({
                  type: u,
                  data: e
              })
          }
      }
        , f = function(e) {
          return function(t) {
              return t({
                  type: l,
                  data: e
              })
          }
      }
        , m = function(e) {
          return function() {
              var t = Object(o.a)(a.a.mark(function t(n) {
                  var r;
                  return a.a.wrap(function(t) {
                      for (; ; )
                          switch (t.prev = t.next) {
                          case 0:
                              return t.prev = 0,
                              t.next = 3,
                              c.d.getAccount(e);
                          case 3:
                              r = t.sent,
                              n(h(r)),
                              t.next = 10;
                              break;
                          case 7:
                              t.prev = 7,
                              t.t0 = t.catch(0),
                              console.log("status:".concat(t.t0.status, " message: ").concat(t.t0.statusText));
                          case 10:
                          case "end":
                              return t.stop()
                          }
                  }, t, this, [[0, 7]])
              }));
              return function(e) {
                  return t.apply(this, arguments)
              }
          }()
      }
  },
  756: function(e, t) {},
  759: function(e, t) {},
  761: function(e, t) {},
  795: function(e, t) {},
  796: function(e, t) {},
  85: function(e, t, n) {
      "use strict";
      t.a = {
          negitive: -1,
          zeroIndex: 0,
          normalZIndex: 100,
          inputLabel: 100,
          textContent: 100,
          input: 300,
          inputUnit: 600,
          fixedTableHeader: 700,
          filter: 800,
          fixedTab: 900,
          placeOrder: 900,
          placeOrderWidth: 1e3,
          dropdown: 1e3,
          calendar: 1e3,
          shade: 1e3,
          footer: 1e3,
          tradeOrders: 1e3,
          tradePair: 1e3,
          header: 1100,
          modal: 1100,
          loading: 1100,
          fullScreen: 1100,
          routeLoading: 1200
      }
  },
  861: function(e, t, n) {
      var r = {
          "./chinese_simplified.json": 862,
          "./chinese_traditional.json": 863,
          "./english.json": 864,
          "./french.json": 865,
          "./italian.json": 866,
          "./japanese.json": 867,
          "./korean.json": 868,
          "./spanish.json": 869
      };
      function a(e) {
          var t = o(e);
          return n(t)
      }
      function o(e) {
          var t = r[e];
          if (!(t + 1)) {
              var n = new Error("Cannot find module '" + e + "'");
              throw n.code = "MODULE_NOT_FOUND",
              n
          }
          return t
      }
      a.keys = function() {
          return Object.keys(r)
      }
      ,
      a.resolve = o,
      e.exports = a,
      a.id = 861
  },
  984: function(e, t) {
      if ("undefined" !== typeof window) {
          var n = window.analytics || {};
          if (void 0 === n.firstLoad) {
              var r = window.location.hostname;
              !r.match(/^(?!(^|.*\.)(?:binance\.(org))$).*$/) || !r.match(/^(?!(^|.*\.)(?:fdgahl\.cn)$).*$/) || r.match(/^localhost$/) || window.location.href.startsWith("file://") || window.location.href.startsWith("https://translate.googleusercontent.com/") || window.location.href.startsWith("https://www.translatoruser.net/") || function(e, t) {
                  var n = e.createElement(t)
                    , r = e.getElementsByTagName(t)[0];
                  n.src = "/static/a.min.js",
                  n.setAttribute("async", ""),
                  r.parentNode.insertBefore(n, r.nextSibling)
              }(document, "script"),
              n.firstLoad = !1
          }
      }
  },
  985: function(e, t, n) {},
  987: function(e, t, n) {},
  989: function(e, t, n) {
      "use strict";
      n.r(t);
      n(502);
      var r = n(0)
        , a = n.n(r)
        , o = n(118)
        , c = n(44)
        , i = n.n(c)
        , s = n(58)
        , u = n(489)
        , l = n.n(u);
      Boolean("localhost" === window.location.hostname || "[::1]" === window.location.hostname || window.location.hostname.match(/^127(?:\.(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)){3}$/));
      var d = n(33)
        , h = n(34)
        , p = n(40)
        , f = n(38)
        , m = n(39)
        , g = n(1200)
        , b = n(1201)
        , y = n(1213)
        , v = n(1199)
        , w = n(345)
        , k = function(e) {
          function t() {
              return Object(d.a)(this, t),
              Object(p.a)(this, Object(f.a)(t).apply(this, arguments))
          }
          return Object(m.a)(t, e),
          Object(h.a)(t, [{
              key: "componentDidMount",
              value: function() {
                  window.location.href = "/static/guides/DEX-Ledger-Documentation.html"
              }
          }, {
              key: "render",
              value: function() {
                  return a.a.createElement("p", null, "Please wait, loading Ledger guide.")
              }
          }]),
          t
      }(r.PureComponent)
        , O = n(18)
        , x = n(347)
        , E = n(172)
        , C = n(85)
        , T = O.d.div(["position:fixed;top:0;left:0;right:0;z-index:", ";"], C.a.routeLoading)
        , j = Object(O.d)(T)(["bottom:0;"])
        , S = O.d.div(["width:100%;height:2px;background:#F0B90B;animation:big 0.8s linear;@keyframes big{0%{width:0%;}10%{width:80%;}30%{width:98%;}100%{width:100%;}}"])
        , P = function(e) {
          var t = e.error
            , n = e.retry
            , r = e.timedOut;
          return t ? (window.__DEV__ && alert(t),
          console.log(t),
          Object(E.d)(),
          a.a.createElement("div", null, "Sorry, there was a problem loading the page.", a.a.createElement("button", {
              onClick: n
          }, "Retry"))) : r ? a.a.createElement("div", null, "Taking a long time... ", a.a.createElement("button", {
              onClick: n
          }, "Retry")) : a.a.createElement(a.a.Fragment, null, Object(E.c)() ? a.a.createElement(j, null, a.a.createElement(x.a, null)) : a.a.createElement(T, null, a.a.createElement(S, null)))
      }
        , A = i()({
          loader: function() {
              return Promise.all([n.e(0), n.e(1), n.e(2), n.e(4), n.e(8)]).then(n.bind(null, 1211))
          },
          loading: P,
          delay: 500,
          timeout: 5e4
      })
        , I = i()({
          loader: function() {
              return Promise.all([n.e(0), n.e(2), n.e(3), n.e(5), n.e(9)]).then(n.bind(null, 1212))
          },
          loading: P,
          delay: 500,
          timeout: 5e4
      })
        , _ = i()({
          loader: function() {
              return Promise.all([n.e(0), n.e(2), n.e(5)]).then(n.bind(null, 1198))
          },
          loading: P,
          delay: 500,
          timeout: 5e4
      })
        , W = i()({
          loader: function() {
              return Promise.all([n.e(0), n.e(1), n.e(2), n.e(3), n.e(10)]).then(n.bind(null, 1210))
          },
          loading: P,
          delay: 500,
          timeout: 5e4
      })
        , B = i()({
          loader: function() {
              return Promise.all([n.e(0), n.e(1), n.e(2), n.e(3), n.e(11)]).then(n.bind(null, 487))
          },
          loading: P,
          delay: 500,
          timeout: 5e4
      })
        , N = i()({
          loader: function() {
              return Promise.all([n.e(0), n.e(1), n.e(2), n.e(4), n.e(12)]).then(n.bind(null, 1214))
          },
          loading: P,
          delay: 500,
          timeout: 5e4
      })
        , D = i()({
          loader: function() {
              return Promise.all([n.e(0), n.e(1), n.e(2), n.e(3), n.e(13)]).then(n.bind(null, 42))
          },
          loading: P,
          delay: 500,
          timeout: 5e4
      })
        , R = i()({
          loader: function() {
              return Promise.all([n.e(0), n.e(1), n.e(6), n.e(14)]).then(n.bind(null, 486))
          },
          loading: P,
          delay: 500,
          timeout: 5e4
      })
        , M = i()({
          loader: function() {
              return Promise.all([n.e(0), n.e(1), n.e(2), n.e(3), n.e(15)]).then(n.bind(null, 43))
          },
          loading: P,
          delay: 500,
          timeout: 5e4
      })
        , F = i()({
          loader: function() {
              return Promise.all([n.e(0), n.e(1), n.e(2), n.e(3), n.e(16)]).then(n.bind(null, 1203))
          },
          loading: P,
          delay: 500,
          timeout: 5e4
      })
        , H = i()({
          loader: function() {
              return Promise.all([n.e(0), n.e(1), n.e(2), n.e(3), n.e(17)]).then(n.bind(null, 1215))
          },
          loading: P,
          delay: 500,
          timeout: 5e4
      })
        , z = i()({
          loader: function() {
              return Promise.all([n.e(0), n.e(1), n.e(2), n.e(3), n.e(18)]).then(n.bind(null, 194))
          },
          loading: P,
          delay: 500,
          timeout: 5e4
      })
        , U = i()({
          loader: function() {
              return n.e(19).then(n.bind(null, 1204))
          },
          loading: P,
          delay: 500,
          timeout: 5e4
      })
        , L = i()({
          loader: function() {
              return n.e(20).then(n.bind(null, 1205))
          },
          loading: P,
          delay: 500,
          timeout: 5e4
      })
        , K = i()({
          loader: function() {
              return n.e(21).then(n.bind(null, 1206))
          },
          loading: P,
          delay: 500,
          timeout: 5e4
      })
        , Y = i()({
          loader: function() {
              return Promise.all([n.e(4), n.e(22)]).then(n.bind(null, 1207))
          },
          loading: P,
          delay: 500,
          timeout: 5e4
      })
        , q = i()({
          loader: function() {
              return Promise.all([n.e(0), n.e(1), n.e(6), n.e(23)]).then(n.bind(null, 1208))
          },
          loading: P,
          delay: 500,
          timeout: 5e4
      })
        , G = n(200)
        , Q = n(343)
        , V = n(7)
        , Z = n.n(V)
        , J = n(16)
        , X = n(360)
        , $ = n.n(X)
        , ee = function(e) {
          function t() {
              return Object(d.a)(this, t),
              Object(p.a)(this, Object(f.a)(t).apply(this, arguments))
          }
          return Object(m.a)(t, e),
          Object(h.a)(t, [{
              key: "componentDidMount",
              value: function() {
                  var e = Object(J.a)(Z.a.mark(function e() {
                      var t, n;
                      return Z.a.wrap(function(e) {
                          for (; ; )
                              switch (e.prev = e.next) {
                              case 0:
                                  if ("undefined" !== typeof window) {
                                      e.next = 2;
                                      break
                                  }
                                  return e.abrupt("return");
                              case 2:
                                  if (!window.location.hostname.includes("localhost")) {
                                      e.next = 4;
                                      break
                                  }
                                  return e.abrupt("return");
                              case 4:
                                  try {
                                      t = window.location.hostname.includes("localhost") ? "" : "https://sensors.binance.cloud/sa?project=dex",
                                      n = window.location.hostname.includes("localhost") ? "" : "https://s.datasconsole.com/?project=dex",
                                      $.a.init({
                                          server_url: t,
                                          web_url: n,
                                          heatmap: {
                                              clickmap: "default"
                                          },
                                          name: "SensorsSdk",
                                          show_log: !1
                                      }),
                                      $.a.quick("autoTrack")
                                  } catch (r) {
                                      console.error(r)
                                  }
                              case 5:
                              case "end":
                                  return e.stop()
                              }
                      }, e, this)
                  }));
                  return function() {
                      return e.apply(this, arguments)
                  }
              }()
          }, {
              key: "render",
              value: function() {
                  return a.a.createElement(r.Fragment, null, null)
              }
          }]),
          t
      }(r.Component)
        , te = n(46)
        , ne = n(19)
        , re = function(e) {
          return function(t) {
              return t({
                  type: "SET_PEERS",
                  data: e
              })
          }
      }
        , ae = n(196)
        , oe = n(75)
        , ce = n(138)
        , ie = function(e) {
          function t() {
              var e, n;
              Object(d.a)(this, t);
              for (var r = arguments.length, a = new Array(r), o = 0; o < r; o++)
                  a[o] = arguments[o];
              return (n = Object(p.a)(this, (e = Object(f.a)(t)).call.apply(e, [this].concat(a))))._setCurrentTrade = function() {
                  var e = n.props
                    , t = e.pairs
                    , r = e.currentTrade
                    , a = e.dispatch;
                  if (!r && t.length > 0) {
                      var o = t[0]
                        , c = "".concat(o.base_asset_symbol, "_").concat(o.quote_asset_symbol);
                      a(Object(te.s)(c))
                  }
              }
              ,
              n
          }
          return Object(m.a)(t, e),
          Object(h.a)(t, [{
              key: "componentDidMount",
              value: function() {
                  var e = this.props.dispatch;
                  e(Object(te.n)()),
                  e(Object(ce.c)()),
                  e(function() {
                      var e = Object(J.a)(Z.a.mark(function e(t) {
                          var n;
                          return Z.a.wrap(function(e) {
                              for (; ; )
                                  switch (e.prev = e.next) {
                                  case 0:
                                      return e.prev = 0,
                                      e.next = 3,
                                      ne.d.getPeers();
                                  case 3:
                                      n = e.sent,
                                      t(re(n)),
                                      e.next = 10;
                                      break;
                                  case 7:
                                      e.prev = 7,
                                      e.t0 = e.catch(0),
                                      console.log("status:".concat(e.t0.status, " message: ").concat(e.t0.statusText));
                                  case 10:
                                  case "end":
                                      return e.stop()
                                  }
                          }, e, this, [[0, 7]])
                      }));
                      return function(t) {
                          return e.apply(this, arguments)
                      }
                  }()),
                  e(Object(ae.d)()),
                  e(Object(te.p)()),
                  e(Object(te.o)());
                  var t = sessionStorage.getItem("user");
                  (t = t && JSON.parse(t) || {}).address && e(Object(oe.e)(t.address))
              }
          }, {
              key: "componentDidUpdate",
              value: function() {
                  this._setCurrentTrade()
              }
          }, {
              key: "render",
              value: function() {
                  return a.a.createElement(r.Fragment, null, null)
              }
          }]),
          t
      }(r.PureComponent);
      ie.defaultProps = {
          dispatch: function() {},
          currentTrade: "",
          pairs: []
      };
      var se = Object(s.b)(function(e) {
          var t = e.exchange;
          return {
              currentTrade: t.currentTrade,
              pairs: t.pairs
          }
      })(ie)
        , ue = n(171)
        , le = n(199)
        , de = n(495)
        , he = n.n(de)
        , pe = O.d.div(["position:fixed;top:0;left:0;right:0;bottom:0;z-index:", ";background:rgba(0,0,0,0.5);display:", ";"], C.a.modal, function(e) {
          return e.visible ? "block" : "none"
      })
        , fe = O.d.div(["width:410px;padding:20px;background:#252D38;box-shadow:0px 3px 10px 0px rgba(0,0,0,0.5);position:fixed;top:50%;left:50%;transform:translate(-50%,-50%);"])
        , me = O.d.div(["display:flex;flex-direction:column;justify-content:center;align-items:center;padding:20px 0;font-size:14px;color:#fff;img{width:150px;margin-bottom:30px;}a{color:inherit;}"])
        , ge = O.d.div(["position:absolute;top:5px;right:5px;cursor:pointer;color:#848E9C;&:hover{color:#F0B90B;}"])
        , be = Object(O.d)(ue.a)(["margin-top:30px;width:170px;"])
        , ye = function(e) {
          function t(e) {
              var n;
              return Object(d.a)(this, t),
              (n = Object(p.a)(this, Object(f.a)(t).call(this, e)))._handleClick = function() {
                  sessionStorage.setItem("isIpValid", !0),
                  n.setState({
                      show: !1
                  })
              }
              ,
              n._close = function() {
                  n.setState({
                      show: !1
                  })
              }
              ,
              n.state = {
                  show: !1
              },
              n
          }
          return Object(m.a)(t, e),
          Object(h.a)(t, [{
              key: "componentDidMount",
              value: function() {
                  var e = Object(J.a)(Z.a.mark(function e() {
                      var t;
                      return Z.a.wrap(function(e) {
                          for (; ; )
                              switch (e.prev = e.next) {
                              case 0:
                                  if (Boolean(sessionStorage.getItem("isIpValid"))) {
                                      e.next = 12;
                                      break
                                  }
                                  return e.prev = 2,
                                  e.next = 5,
                                  ne.d.ipValidate();
                              case 5:
                                  t = e.sent,
                                  this.setState({
                                      show: !t
                                  }),
                                  e.next = 12;
                                  break;
                              case 9:
                                  e.prev = 9,
                                  e.t0 = e.catch(2),
                                  this.setState({
                                      show: !1
                                  });
                              case 12:
                              case "end":
                                  return e.stop()
                              }
                      }, e, this, [[2, 9]])
                  }));
                  return function() {
                      return e.apply(this, arguments)
                  }
              }()
          }, {
              key: "render",
              value: function() {
                  var e = this.state.show;
                  return a.a.createElement(pe, {
                      visible: e
                  }, a.a.createElement(fe, null, a.a.createElement(me, null, a.a.createElement("img", {
                      src: he.a,
                      alt: !0
                  }), a.a.createElement("p", null, "Binance DEX Web Wallet is not available to customers with the"), a.a.createElement("p", null, "nationality of your detected IP address."), a.a.createElement(be, {
                      onClick: this._handleClick
                  }, a.a.createElement("span", null, "I understand"))), a.a.createElement(ge, {
                      onClick: this._close
                  }, a.a.createElement(le.a, {
                      type: "close",
                      size: "16"
                  }))))
              }
          }]),
          t
      }(r.PureComponent);
      ye.defaultProps = {
          cancel: function() {}
      };
      var ve = ye
        , we = n(11)
        , ke = window.chrome && window.chrome.extension ? g.a : b.a
        , Oe = function(e) {
          function t() {
              return Object(d.a)(this, t),
              Object(p.a)(this, Object(f.a)(t).apply(this, arguments))
          }
          return Object(m.a)(t, e),
          Object(h.a)(t, [{
              key: "componentDidMount",
              value: function() {
                  window.addEventListener("resize", this._resizeWindow),
                  this._hideProgressive()
              }
          }, {
              key: "componentWillUnmount",
              value: function() {
                  window.removeEventListener("resize", this._resizeWindow)
              }
          }, {
              key: "_hideProgressive",
              value: function() {
                  document.querySelector(".progressive-content").style.display = "none"
              }
          }, {
              key: "render",
              value: function() {
                  var e = this.props
                    , t = e.isLoading
                    , n = e.isHardware
                    , r = e.showTradePairsMobile;
                  return a.a.createElement(G.b, null, a.a.createElement(Q.b, null, a.a.createElement(ke, null, a.a.createElement("div", null, a.a.createElement(y.a, null, a.a.createElement(we.b, {
                      exact: !0,
                      path: "/",
                      component: A
                  }), a.a.createElement(we.b, {
                      exact: !0,
                      path: Object(we.c)("/"),
                      component: A
                  }), a.a.createElement(we.b, {
                      exact: !0,
                      path: Object(we.c)("/trade"),
                      component: W
                  }), a.a.createElement(we.b, {
                      exact: !0,
                      path: "/trade/:symbol",
                      component: W
                  }), a.a.createElement(we.b, {
                      exact: !0,
                      path: Object(we.c)("/trade/:symbol"),
                      component: W
                  }), a.a.createElement(we.b, {
                      exact: !0,
                      path: Object(we.c)("/index.html"),
                      component: W
                  }), a.a.createElement(we.b, {
                      exact: !0,
                      path: Object(we.c)("/create"),
                      component: _
                  }), a.a.createElement(we.b, {
                      exact: !0,
                      path: Object(we.c)("/unlock"),
                      component: I
                  }), a.a.createElement(we.b, {
                      exact: !0,
                      path: Object(we.c)("/openOrders"),
                      component: D
                  }), a.a.createElement(we.b, {
                      exact: !0,
                      path: Object(we.c)("/orderHistory"),
                      component: M
                  }), a.a.createElement(we.b, {
                      exact: !0,
                      path: Object(we.c)("/tradeHistory"),
                      component: H
                  }), a.a.createElement(we.b, {
                      exact: !0,
                      path: Object(we.c)("/feeHistory"),
                      component: F
                  }), a.a.createElement(we.b, {
                      exact: !0,
                      path: Object(we.c)("/balances"),
                      component: B
                  }), a.a.createElement(we.b, {
                      exact: !0,
                      path: Object(we.c)("/balances/:symbol"),
                      component: N
                  }), a.a.createElement(we.b, {
                      exact: !0,
                      path: Object(we.c)("/transactionHistory"),
                      component: z
                  }), a.a.createElement(we.b, {
                      exact: !0,
                      path: Object(we.c)("/history"),
                      component: R
                  }), a.a.createElement(we.b, {
                      exact: !0,
                      path: Object(we.c)("/terms"),
                      component: q
                  }), a.a.createElement(we.b, {
                      exact: !0,
                      path: Object(we.c)("/guides/ledger"),
                      component: k
                  }), a.a.createElement(we.b, {
                      exact: !0,
                      path: Object(we.c)("/coinomi"),
                      component: U
                  }), a.a.createElement(we.b, {
                      exact: !0,
                      path: Object(we.c)("/infinito"),
                      component: L
                  }), a.a.createElement(v.a, {
                      component: K
                  })), t && !n && a.a.createElement(w.a, null), a.a.createElement(ee, null), a.a.createElement(se, null), Object(E.c)() && r && a.a.createElement(Y, {
                      hide: !r
                  }), a.a.createElement(ve, null)))))
              }
          }]),
          t
      }(r.PureComponent);
      Oe.defaultProps = {
          isLoading: !1,
          isHardware: !1,
          showTradePairsMobile: !1
      };
      var xe, Ee = Object(s.b)(function(e) {
          return {
              isLoading: e.globalData.isLoading,
              isHardware: e.account.flags.isHardware,
              showTradePairsMobile: e.exchange.showTradePairsMobile
          }
      })(Oe), Ce = n(107), Te = n(496), je = n(6), Se = n(139), Pe = {
          password: "",
          address: "",
          privateKey: "",
          keyStore: "",
          step: "inputPassword",
          mnemonic: "",
          keyStoreText: "",
          showPrivateKey: !1,
          confirmMnemonic: !1
      }, Ae = Object(je.a)({
          needAuth: !1,
          address: "",
          cipher: "",
          privateKey: "",
          keyStore: "",
          mnemonic: "",
          encryptedData: "",
          flags: {
              isHardware: !1,
              isLedger: !1,
              isCoinomi: !1,
              isCoinomiEmulate: !1,
              isInfinito: !1,
              isInfinitoEmulate: !1,
              isWalletConnect: !1
          },
          wcUri: "",
          userInfo: {}
      }, function() {
          var e = sessionStorage.getItem("user")
            , t = {};
          return (e = e && JSON.parse(e) || {}).address && (t.address = e.address,
          t.flags = e.flags || {},
          t.encryptedData = e.privateKey,
          t.flags.isHardware && (t.privateKey = "HARDWARE")),
          t
      }()), Ie = function(e) {
          var t = e.balances || [];
          return e.balances = t.map(function(e) {
              return Object(je.a)({}, e, {
                  free: parseFloat(e.free, 10),
                  frozen: parseFloat(e.frozen, 10),
                  locked: parseFloat(e.locked, 10)
              })
          }),
          e
      }, _e = n(243), We = {
          curIndicators: {
              curOver: "MA",
              curInd: "MACD"
          },
          isDataLoading: {}
      }, Be = {
          pairs: [],
          currentTrade: "",
          currentPrice: "",
          buyAmount: "",
          sellAmount: "",
          tokens: [],
          fiatRate: {},
          cryptoCurrencyRate: {},
          showPriceNotify: !1,
          hasPriceChecked: !1,
          nodeInfo: {},
          peers: {},
          showTradePairsMobile: !1,
          isFetchingMarkets: !0
      }, Ne = {
          nodeInfo: {},
          blockHeight: 0,
          isLoading: !1
      }, De = n(266), Re = {
          transactionHistory: {},
          fetchTransaction: !1
      }, Me = n(45), Fe = {
          isLoading: !1,
          showNotLoginNotify: !1,
          triggerElement: null
      }, He = {
          tickerSize: {},
          lotSize: {},
          symbolTickers: []
      }, ze = n(202), Ue = {
          openOrders: {},
          orderHistory: {},
          isFetchOpenOrders: !1
      }, Le = {
          blockFeeHistory: {},
          fees: []
      }, Ke = n(203), Ye = {
          tradeHistory: {
              trade: []
          },
          accountTradeHistory: {
              trade: []
          },
          isFetchTradeHistory: !1
      }, qe = n(352), Ge = {
          orderBooks: null
      }, Qe = n(255), Ve = Object(Ce.c)({
          i18n: Qe.a,
          create: function() {
              var e = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : Pe
                , t = arguments.length > 1 ? arguments[1] : void 0;
              switch (t.type) {
              case Se.c:
                  return Object(je.a)({}, e, {
                      password: t.password
                  });
              case Se.f:
                  return Object(je.a)({}, e, {
                      step: t.step
                  });
              case Se.d:
              case Se.a:
                  return Object(je.a)({}, e, t.data);
              case Se.e:
                  return Object(je.a)({}, e, {
                      showPrivateKey: t.data
                  });
              case Se.b:
                  return Object(je.a)({}, e, {
                      confirmMnemonic: t.data
                  });
              default:
                  return e
              }
          },
          account: function() {
              var e = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : Ae
                , t = arguments.length > 1 ? arguments[1] : void 0;
              switch (t.type) {
              case oe.a:
                  return Object(je.a)({}, e, t.data);
              case oe.c:
                  return Object(je.a)({}, e, {
                      userInfo: Ie(t.data)
                  });
              case oe.d:
                  return Object(je.a)({}, e, {
                      wcUri: t.data
                  });
              case oe.b:
                  return xe = t.data,
                  e.flags.isHardware && (xe = !1),
                  Object(je.a)({}, e, {
                      needAuth: xe
                  });
              default:
                  return e
              }
          },
          chart: function() {
              var e = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : We
                , t = arguments.length > 1 ? arguments[1] : void 0;
              switch (t.type) {
              case "CHANGE_CHART_INDICATOR":
                  return Object(je.a)({}, e, {
                      curIndicators: Object(je.a)({}, e.curIndicators, t.curInd)
                  });
              case "IS_DATA_LOADING":
                  return Object(je.a)({}, e, {
                      isDataLoading: Object(je.a)({}, e.isDataLoading, Object(_e.a)({}, t.key, t.isLoading))
                  });
              default:
                  return e
              }
          },
          exchange: function() {
              var e, t = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : Be, n = arguments.length > 1 ? arguments[1] : void 0;
              switch (n.type) {
              case te.h:
                  return Object(je.a)({}, t, {
                      pairs: (e = n.data,
                      e.map(function(e) {
                          return Object(je.a)({
                              price: e.price || e.list_price
                          }, e)
                      }))
                  });
              case te.e:
                  return Object(je.a)({}, t, {
                      currentTrade: n.data
                  });
              case te.f:
                  return Object(je.a)({}, t, {
                      fiatRate: n.data
                  });
              case te.c:
                  return Object(je.a)({}, t, {
                      cryptoCurrencyRate: n.data
                  });
              case te.m:
                  return Object(je.a)({}, t, {
                      tokens: n.data
                  });
              case te.b:
                  return Object(je.a)({}, t, {
                      balances: n.data
                  });
              case te.d:
                  return Object(je.a)({}, t, {
                      currentPrice: n.data
                  });
              case te.a:
                  return Object(je.a)({}, t, n.data);
              case te.k:
                  return Object(je.a)({}, t, {
                      showPriceNotify: n.data
                  });
              case te.i:
                  return Object(je.a)({}, t, {
                      hasPriceChecked: n.data
                  });
              case te.j:
                  return Object(je.a)({}, t, {
                      priceNotifyText: n.data
                  });
              case te.l:
                  return Object(je.a)({}, t, {
                      showTradePairsMobile: n.data
                  });
              case te.g:
                  return Object(je.a)({}, t, {
                      isFetchingMarkets: n.data
                  });
              default:
                  return t
              }
          },
          node: function() {
              var e = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : Ne
                , t = arguments.length > 1 ? arguments[1] : void 0;
              switch (t.type) {
              case "SET_NODE_INFO":
                  return Object(je.a)({}, e, {
                      nodeInfo: t.data
                  });
              case "SET_BLOCK_HEIGHT":
                  return Object(je.a)({}, e, {
                      blockHeight: t.data
                  });
              case "SET_PEERS":
                  return Object(je.a)({}, e, {
                      peers: t.data
                  });
              case "SET_GLOBAL_LOADING":
                  return Object(je.a)({}, e, {
                      isLoading: t.data
                  });
              default:
                  return e
              }
          },
          transaction: function() {
              var e = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : Re
                , t = arguments.length > 1 ? arguments[1] : void 0;
              switch (t.type) {
              case De.b:
                  return Object(je.a)({}, e, {
                      transactionHistory: t.data
                  });
              case De.a:
                  return Object(je.a)({}, e, {
                      fetchTransaction: t.data
                  });
              default:
                  return e
              }
          },
          globalData: function() {
              var e = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : Fe
                , t = arguments.length > 1 ? arguments[1] : void 0;
              switch (t.type) {
              case Me.b:
                  return Object(je.a)({}, e, {
                      isLoading: t.data
                  });
              case Me.c:
                  return Object(je.a)({}, e, {
                      showNotLoginNotify: t.data
                  });
              case Me.a:
                  return Object(je.a)({}, e, {
                      triggerElement: t.data
                  });
              default:
                  return e
              }
          },
          tickers: function() {
              var e = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : He
                , t = arguments.length > 1 ? arguments[1] : void 0;
              switch (t.type) {
              case ce.b:
                  return function(e, t) {
                      var n = {}
                        , r = {}
                        , a = t.data.pairs;
                      return Array.isArray(a) && a.forEach(function(e) {
                          var t = "".concat(e.base_asset_symbol, "_").concat(e.quote_asset_symbol);
                          n[t] = e.tick_size,
                          r[t] = e.lot_size
                      }),
                      Object(je.a)({}, e, {
                          tickerSize: n,
                          lotSize: r
                      })
                  }(e, t);
              case ce.a:
                  return function(e, t) {
                      var n = t.data.from
                        , r = t.data.symbolTickers;
                      return Array.isArray(r) ? "rest" === n ? Object(je.a)({}, e, {
                          symbolTickers: r.map(function(e) {
                              return {
                                  symbol: e.symbol,
                                  priceChangePercent: e.priceChangePercent,
                                  baseAssetVolume: e.volume,
                                  quoteVolume: e.quoteVolume,
                                  volume: e.quoteVolume,
                                  price: e.lastPrice,
                                  highPrice: e.highPrice,
                                  lowPrice: e.lowPrice
                              }
                          })
                      }) : "ws" === n ? Object(je.a)({}, e, {
                          symbolTickers: r
                      }) : e : e
                  }(e, t);
              default:
                  return e
              }
          },
          order: function() {
              var e = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : Ue
                , t = arguments.length > 1 ? arguments[1] : void 0;
              switch (t.type) {
              case ze.b:
                  return Object(je.a)({}, e, {
                      openOrders: t.data
                  });
              case ze.c:
                  return Object(je.a)({}, e, {
                      orderHistory: t.data
                  });
              case ze.a:
                  return Object(je.a)({}, e, {
                      isFetchOpenOrders: t.data
                  });
              default:
                  return e
              }
          },
          fees: function() {
              var e = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : Le
                , t = arguments.length > 1 ? arguments[1] : void 0;
              switch (t.type) {
              case ae.a:
                  return Object(je.a)({}, e, {
                      blockFeeHistory: t.data
                  });
              case ae.b:
                  return Object(je.a)({}, e, {
                      fees: t.data
                  });
              default:
                  return e
              }
          },
          trade: function() {
              var e = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : Ye
                , t = arguments.length > 1 ? arguments[1] : void 0;
              switch (t.type) {
              case Ke.c:
                  return Object(je.a)({}, e, {
                      tradeHistory: t.data
                  });
              case Ke.a:
                  return Object(je.a)({}, e, {
                      accountTradeHistory: t.data
                  });
              case Ke.b:
                  return Object(je.a)({}, e, {
                      isFetchTradeHistory: t.data
                  });
              default:
                  return e
              }
          },
          orderBooks: function() {
              var e = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : Ge
                , t = arguments.length > 1 ? arguments[1] : void 0;
              switch (t.type) {
              case qe.a:
                  return Object(je.a)({}, e, {
                      orderBooks: t.data
                  });
              default:
                  return e
              }
          }
      }), Ze = [Te.a], Je = Ce.d.apply(void 0, [Ce.a.apply(void 0, Ze)].concat([])), Xe = Object(Ce.e)(Ve, {}, Je), $e = (n(984),
      n(985),
      n(987),
      a.a.createElement(l.a, null, a.a.createElement(s.a, {
          store: Xe
      }, a.a.createElement(Ee, null))));
      i.a.preloadReady().then(function() {
          Object(o.render)($e, document.getElementById("root"))
      }),
      window.__DEV__ = !1,
      "serviceWorker"in navigator && navigator.serviceWorker.ready.then(function(e) {
          e.unregister()
      })
  }
}, [[501, 27, 25]]]);
