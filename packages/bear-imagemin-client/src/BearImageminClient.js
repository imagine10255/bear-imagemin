"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
exports.__esModule = true;
var axios_1 = require("axios");
var fs = require("fs");
var FormData = require('form-data');
/**
 * BearImageminClient
 * 圖片壓縮客戶端
 */
var BearImageminClient = /** @class */ (function () {
    function BearImageminClient(baseUrl) {
        this._baseUrl = 'http://localehost:8082';
        if (baseUrl) {
            this._baseUrl = baseUrl;
        }
    }
    /**
     * 壓縮
     * @param filePath
     * @param savePath
     * @param options (如有設定 quality 或小於100 則為有損)
     */
    BearImageminClient.prototype.squash = function (filePath, savePath, options) {
        var _a, _b, _c;
        return __awaiter(this, void 0, void 0, function () {
            var data, timeout;
            var _this = this;
            return __generator(this, function (_d) {
                data = new FormData();
                data.append('sourceFile', fs.createReadStream(filePath));
                if ((_a = options === null || options === void 0 ? void 0 : options.resize) === null || _a === void 0 ? void 0 : _a.width) {
                    data.append('resizeWidth', String(options.resize.width));
                }
                if ((_b = options === null || options === void 0 ? void 0 : options.resize) === null || _b === void 0 ? void 0 : _b.height) {
                    data.append('resizeHeight', String(options.resize.height));
                }
                if (options === null || options === void 0 ? void 0 : options.ignoreOverflowSize) {
                    data.append('ignoreOverflowSize', String(options.ignoreOverflowSize));
                }
                if (options === null || options === void 0 ? void 0 : options.quality) {
                    data.append('quality', String(options.quality));
                }
                if (options === null || options === void 0 ? void 0 : options.extname) {
                    data.append('extname', options.extname);
                }
                timeout = (_c = options === null || options === void 0 ? void 0 : options.timeout) !== null && _c !== void 0 ? _c : 30 * 1000;
                return [2 /*return*/, new Promise(function (resolve, reject) {
                        axios_1["default"].post("".concat(_this._baseUrl, "/squash"), data, {
                            headers: {
                                'Content-Type': 'multipart/form-data',
                                'X-Requested-With': 'XMLHttpRequest',
                                'Cache-Control': 'no-cache'
                            },
                            responseType: 'stream',
                            timeout: timeout
                        })
                            .then(function (res) {
                            if (!res.data) {
                                reject({
                                    code: 500,
                                    message: 'error! response data is null'
                                });
                                return;
                            }
                            return res.data
                                .pipe(fs.createWriteStream(savePath))
                                .on('finish', function () { return resolve(savePath); })
                                .on('error', function (e) { return reject(e); });
                        })["catch"](function (res) {
                            reject({
                                code: res.code,
                                message: res.message
                            });
                        });
                    })];
            });
        });
    };
    return BearImageminClient;
}());
exports["default"] = BearImageminClient;
