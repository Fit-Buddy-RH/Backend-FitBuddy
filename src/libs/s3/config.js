import * as dotenv from "dotenv";
dotenv.config();

const {
  AWS_ACCESS_KEY_ID,
  AWS_SECRET_ACCESS_KEY,
  AWS_REGION,
  AWS_BUCKET_NAME,
} = process.env;

export default {
  s3: {
    credentials: {
      accessKeyId: AWS_ACCESS_KEY_ID,
      secretAccessKey: AWS_SECRET_ACCESS_KEY,
    },
    region: AWS_REGION,
    httpOptions: {
      timeout: 90000,
    },
    params: {
      ACL: "public-read",
      Bucket: AWS_BUCKET_NAME,
    },
  },
};
