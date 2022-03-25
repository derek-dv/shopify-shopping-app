import AWS from "aws-sdk";
import multer from "multer";
import fs from "fs";

export const multerUpload = multer({ dest: "temp/" });

export default function awsUpload(file) {
  const bucketName = "shopit-products";
  const S3 = new AWS.S3({
    region: "us-east-1",
    accessKeyId: process.env.AWS_ACCESS_KEY_ID,
    secretAccessKey: process.env.AWS_SECRET_KEY,
    Bucket: bucketName,
  });
  console.log(process.env.AWS_SECRET_KEY);
  const fileStream = fs.createReadStream(file.path);

  return S3.upload({
    Bucket: bucketName,
    Body: fileStream,
    Key: file.filename,
  }).promise();
}
