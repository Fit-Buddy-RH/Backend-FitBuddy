import AWS from "aws-sdk";
import { S3Client } from "@aws-sdk/client-s3";
import multer from "multer";
import multerS3 from "multer-s3";
import config from "../libs/s3/config.js";

//Authentication with aws
AWS.config.update({
  accessKeyid: config.s3.credentials.accessKeyId,
  secretAccessKey: config.s3.credentials.secretAccessKey,
  region: config.s3.region,
});

//instance from S3's Client
const s3Client = new S3Client(config.s3);

const multerS3Config = multerS3({
  s3: s3Client,
  bucket: config.s3.params.Bucket,
  acl: "public-read",
  metadata: function (req, file, cb) {
    cb(null, { fieldname: file.originalname });
  },
  key: function (req, file, cb) {
    cb(null, `${new Date().getTime()}-${file.originalname}`);
  },
});

export const upload = multer({ storage: multerS3Config });
