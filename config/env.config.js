"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var dotenv_1 = require("dotenv");
var envalid_1 = require("envalid");
(0, dotenv_1.config)();
var env = (0, envalid_1.cleanEnv)(process.env, {
    PORT: (0, envalid_1.num)(),
    TOKEN: (0, envalid_1.str)()
});
exports.default = env;
