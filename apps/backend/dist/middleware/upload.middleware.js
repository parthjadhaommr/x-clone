"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var multer_1 = __importDefault(require("multer"));
var storage = multer_1.default.memoryStorage();
var fileFilter = function (req, file, cb) {
    if (file.mimetype.startsWith("image/")) {
        cb(null, true);
    }
    else {
        cb(new Error("Only image files are allowed"));
    }
};
var upload = (0, multer_1.default)({
    storage: storage,
    fileFilter: fileFilter,
    limits: { fileSize: 5 * 1024 * 1024 }, // 5MB limit
});
exports.default = upload;
// const storage = multer.memoryStorage();
// const fileFilter = (req: Request, file: Express.Multer.File, callback: FileFilterCallback) => {
//     if (file.mimetype.startsWith("image/")) {
//         callback(null, true);
//     } else {
//         callback(null, false)
//     }
// }
// const upload = multer({
//     storage: storage,
//     fileFilter: fileFilter,
//     limits: { fileSize: 5 * 1024 * 1024 }, //5 mb limit
// })
// export default upload
// import multer from "multer";
