"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var cloudinary_1 = require("cloudinary");
var env_1 = require("./env");
// Validate required environment variables
if (!env_1.ENV.CLOUDINARY_CLOUD_NAME || !env_1.ENV.CLOUDINARY_API_KEY || !env_1.ENV.CLOUDINARY_API_SECRET) {
    throw new Error('Missing required Cloudinary environment variables: CLOUDINARY_CLOUD_NAME, CLOUDINARY_API_KEY, CLOUDINARY_API_SECRET');
}
cloudinary_1.v2.config({
    cloud_name: env_1.ENV.CLOUDINARY_CLOUD_NAME,
    api_key: env_1.ENV.CLOUDINARY_API_KEY,
    api_secret: env_1.ENV.CLOUDINARY_API_SECRET
});
exports.default = cloudinary_1.v2;
