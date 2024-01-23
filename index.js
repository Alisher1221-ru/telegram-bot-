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
        while (g && (g = 0, op[0] && (_ = 0)), _) try {
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
Object.defineProperty(exports, "__esModule", { value: true });
var env_config_js_1 = require("./config/env.config.js");
var grammy_1 = require("grammy");
var runner_1 = require("@grammyjs/runner");
var bot = new grammy_1.Bot(env_config_js_1.default.TOKEN);
bot.use((0, runner_1.sequentialize)(function (ctx) {
    var _a, _b;
    var chat = (_a = ctx.chat) === null || _a === void 0 ? void 0 : _a.id.toString();
    var user = (_b = ctx.from) === null || _b === void 0 ? void 0 : _b.id.toString();
    return [chat, user].filter(function (con) { return con !== undefined; });
}));
bot.on('message', function (ctx) { return __awaiter(void 0, void 0, void 0, function () {
    var message, chatId, messageId, error_1;
    var _a, _b;
    return __generator(this, function (_c) {
        switch (_c.label) {
            case 0:
                _c.trys.push([0, 3, , 4]);
                message = ctx.message.text;
                chatId = (_a = ctx.chat) === null || _a === void 0 ? void 0 : _a.id;
                messageId = (_b = ctx.message) === null || _b === void 0 ? void 0 : _b.message_id;
                if (!(chatId && messageId)) return [3 /*break*/, 2];
                return [4 /*yield*/, ctx.api.deleteMessage(chatId, messageId)];
            case 1:
                _c.sent();
                _c.label = 2;
            case 2:
                if (message.startsWith("/start")) {
                    ctx.reply("\u0414\u043E\u0431\u0440\u043E \u043F\u043E\u0436\u0430\u043B\u043E\u0432\u0430\u0442\u044C ".concat(ctx.from.first_name, " \u0432 \u043D\u0430\u0448 \u0431\u043E\u0442 \uD83D\uDE0A\n    \n\u0447\u0442\u043E \u043C\u043E\u0436\u0435\u0442 \u0431\u043E\u0442:  \u0441\u043A\u0430\u0447\u0430\u0442\u044C \u043C\u0443\u0437\u044B\u043A\u0443 \u043F\u043E \u043D\u0430\u0437\u0432\u0430\u043D\u0438\u044E"), {
                        reply_markup: new grammy_1.InlineKeyboard().text('OK', 'stay'),
                    });
                    return [2 /*return*/];
                }
                if (message.startsWith("/audio")) {
                    ctx.reply('аудио не найдено 🙄');
                    return [2 /*return*/];
                }
                ctx.reply('я пока не могу поддержать диалог 😑');
                return [3 /*break*/, 4];
            case 3:
                error_1 = _c.sent();
                console.log(error_1.message);
                return [3 /*break*/, 4];
            case 4: return [2 /*return*/];
        }
    });
}); });
bot.callbackQuery("ok");
bot.on("callback_query:data", function (ctx) { return __awaiter(void 0, void 0, void 0, function () {
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                ctx.reply('если что-то понадобится, пишите 😊');
                return [4 /*yield*/, ctx.answerCallbackQuery()];
            case 1:
                _a.sent();
                return [2 /*return*/];
        }
    });
}); });
(0, runner_1.run)(bot);
