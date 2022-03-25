import AWS from "aws-sdk";
import fs from "fs";

const bucketName = "shopit-products";
//k
const S3 = new AWS.S3({
  region: "us-east-1",
  accessKeyId: "AKIA3RE6BQWPRP47AHKS",
  secretAccessKey: "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",
  Bucket: bucketName,
});

export default function download(fileKey) {
  return S3.getObject({
    Key: fileKey,
    Bucket: bucketName,
  }).createReadStream();
}
