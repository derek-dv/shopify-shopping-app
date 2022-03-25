import AWS from "aws-sdk";
import multer from "multer";
import fs from "fs";

export const multerUpload = multer({ dest: "temp/" });

const bucketName = "shopit-products";

const S3 = new AWS.S3({
  region: 'us-east-1',
  accessKeyId: 'AKIA3RE6BQWPRP47AHKS',
  secretAccessKey: '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',
  Bucket: bucketName,
});

export default function awsUpload(file) {
  console.log(process.env.AWS_SECRET_KEY)
  const fileStream = fs.createReadStream(file.path);

  return S3.upload({
    Bucket: bucketName,
    Body: fileStream,
    Key: file.filename,
  }).promise();
}
