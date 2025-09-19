"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var multer_1 = __importDefault(require("multer"));
var storage = multer_1.default.memoryStorage();
var fileFilter = function (req, file, callback) {
    if (file.mimetype.startsWith("image/")) {
        callback(null, true);
    }
    else {
        callback(null, false);
    }
};
var upload = (0, multer_1.default)({
    storage: storage,
    fileFilter: fileFilter,
    limits: { fileSize: 5 * 1024 * 1024 }, //5 mb limit
});
exports.default = upload;
