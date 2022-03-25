import AWS from "aws-sdk";
import fs from "fs";

export default function download(fileKey) {
  const bucketName = "shopit-products";
  //k
  const S3 = new AWS.S3({
    region: "us-east-1",
    accessKeyId: process.env.AWS_ACCESS_KEY_ID,
    secretAccessKey: process.env.AWS_SECRET_KEY,
    Bucket: bucketName,
  });
  console.log("kr", process.env.AWS_SECRET_KEY, process.env.AWS_ACCESS_KEY_ID);
  return S3.getObject({
    Key: fileKey,
    Bucket: bucketName,
  }).createReadStream();
}
