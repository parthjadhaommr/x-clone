import multer, { FileFilterCallback } from "multer";
import { Request } from "express";


const storage = multer.memoryStorage();

const fileFilter = (req: Request, file: Express.Multer.File, cb: multer.FileFilterCallback) => {
    if (file.mimetype.startsWith("image/")) {
        cb(null, true);
    } else {
        cb(new Error("Only image files are allowed"));
    }
};

const upload = multer({
    storage: storage,
    fileFilter: fileFilter,
    limits: { fileSize: 5 * 1024 * 1024 }, // 5MB limit
});

export default upload;


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
