import * as bip39 from 'bip39';
import HDKey from 'hdkey';
import { ecc, codec } from 'icetea-common';

export const utils = {
  createAccountWithMneomnic() {
    var mnemonic = bip39.generateMnemonic();
    var privateKey = this.getPrivateKeyFromMnemonic(mnemonic);
    console.log(privateKey);
    return {
      privateKey: privateKey,
      address: ecc.toPubKeyAndAddress(privateKey).address,
      mnemonic: mnemonic
    }
  },
  recoverAccountFromMneomnic(mnemonic) {
    var privateKey = this.getPrivateKeyFromMnemonic(mnemonic);
    return {
      privateKey: privateKey,
      address: ecc.toPubKeyAndAddress(privateKey).address,
    }
  },
  getPrivateKeyFromMnemonic(mnemonic) {
    if (!bip39.validateMnemonic(mnemonic))
      throw new Error("wrong mnemonic format");

    var seed = bip39.mnemonicToSeedSync(mnemonic);
    var hdkey = HDKey.fromMasterSeed(seed);
    return codec.toKeyString(hdkey.privateKey);
    // return privateKey ? u.default.fromSeed(privateKey).derivePath("44'/714'/0'/0/0").privateKey.toString("hex") : privateKey.toString("hex")
  },
}

export const checkNumber = {
  // n.d(t, "d", function () {
  //   return i
  // }),
  // n.d(t, "c", function () {
  //   return s
  // }),
  // n.d(t, "b", function () {
  //   return u
  // }),
  // n.d(t, "g", function () {
  //   return d
  // }),
  // n.d(t, "e", function () {
  //   return p
  // }),
  // n.d(t, "h", function () {
  //   return f
  // }),
  // n.d(t, "f", function () {
  //   return h
  // }),
  // n.d(t, "a", function () {
  //   return m
  // });
  // var r = n(1031)
  // , a = /(?:\.(\d+))?(?:[eE]([+-]?\d+))?$/
  // , o = Object(r.a)(function (e, t) {
  //   return new RegExp("\\d(?=(\\d{" + (t || 3) + "})+" + (e > 0 ? "\\." : "$") + ")", "g")
  // }, 
  // function () {
  //   for (var e = arguments.length, t = new Array(e), n = 0; n < e; n++)
  //     t[n] = arguments[n];
  //   return t.join(",")
  // })
//   i = function (e, t) {
//     var n = arguments.length > 2 && void 0 !== arguments[2] ? arguments[2] : 3;
//     if ("number" !== typeof e && !e)
//       return "-";
//     e = "number" === typeof e ? e : +e;
//     var r = o(t, n);
//     return e.toFixed(Math.max(0, ~~t)).replace(r, "$&,")
//   }
//   , l = function () {
//     var e = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : "bids";
//     return function () {
//       switch (e) {
//         case "bids":
//           return "floor";
//         case "asks":
//           return "ceil";
//         default:
//           if (Math[e])
//             return Math[e];
//           throw new Error("getRoundFunc called with unknown type")
//       }
//     }()
//   }
//   , c = function (e, t) {
//     var n = arguments.length > 2 && void 0 !== arguments[2] ? arguments[2] : "round"
//       , r = arguments.length > 3 && void 0 !== arguments[3] && arguments[3]
//       , a = Math.pow(10, t)
//       , o = (+e + 1 / Math.pow(10, t + 3)) * a;
//     if ("string" === typeof n) {
//       o = parseFloat(o * Math.pow(10, 2), 10) / Math.pow(10, 2),
//         n = l(n)
//     }
//     if ("function" !== typeof n)
//       throw new Error("decRound unknown rounding func");
//     return r ? i(n(o) / a, t) : (n(o) / a).toFixed(t)
//   }
//   , s = function (e, t) {
//     return c(e, t, "floor")
//   }
//   , u = function (e) {
//     var t = "".concat(e).match(a);
//     if (!t)
//       return 0;
//     var n = t[1];
//     if (n && n.endsWith(0)) {
//       var r = n.indexOf(1);
//       n = n.substring(0, r + 1)
//     }
//     return Math.max(0, (n ? n.length : 0) - (t[2] ? +t[2] : 0))
//   }
//   , d = function (e, t) {
//     if ("" === e)
//       return "";
//     if (Number.isInteger(e))
//       return e;
//     var n = u(t = t || "0.00000001");
//     return e = (e = parseFloat(s(e, n))) < 9e-6 ? f(e) : e
//   }
//   , p = function (e) {
//     for (var t = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : 2, n = String(e); n.length < t;)
//       n = "0".concat(n);
//     return n
//   }
//   , f = function (e) {
//     var t = (e = parseFloat(e)).toExponential().match(/\d(?:\.(\d*))?e([+-]\d+)/);
//     return e.toFixed(Math.max(0, (t[1] || "").length - t[2]))
//   }
//   , h = (e, t)=> {
//     var n = arguments.length > 2 && void 0 !== arguments[2] ? arguments[2] : {
//       digit: 2,
//       withSymbol: !1
//     }
//       , r = n.digit
//       , a = void 0 === r ? 2 : r
//       , o = n.withSymbol
//       , i = void 0 !== o && o ? function (e, t) {
//         return e > 0 ? t > 0 ? "+" : "-" : e < 0 ? t > 0 ? "-" : "+" : ""
//       }(e, t) : "";
//     return 0 === t ? "\u2013" : "".concat(i).concat(c(100 * Math.abs(e / t), a), "%")
//   }
//   , m = (e, t)=> {
//     return e.toFixed ? e ? e < 1 ? t ? e.toFixed(8) : e.toFixed(6) : e.toFixed(2) : "-" : e
//   }
// }

// // 1031
// export const checkNumber1 = (e, t, n)=> {
//   var r = n(1067)
//   , a = "Expected a function";
// function o(e, t) {
//     if ("function" != typeof e || null != t && "function" != typeof t)
//         throw new TypeError(a);
//     var n = function n() {
//         var r = arguments
//           , a = t ? t.apply(this, r) : r[0]
//           , o = n.cache;
//         if (o.has(a))
//             return o.get(a);
//         var i = e.apply(this, r);
//         return n.cache = o.set(a, i) || o,
//         i
//     };
//     return n.cache = new (o.Cache || r.a),
//     n
// }
// o.Cache = r.a,
// t.a = o
}