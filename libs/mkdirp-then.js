"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mkdirp_1 = __importDefault(require("mkdirp"));
exports.mkdirpThen = (dir, mode) => {
    return new Promise((resolve, reject) => {
        mkdirp_1.default(dir, mode)
            .then(() => {
            resolve();
        });
    });
};
