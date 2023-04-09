import getWeaviateClient from "./db/index.js";
import { readFileSync, writeFileSync } from "fs";
const client = getWeaviateClient();

// const schemaRes = await client.schema.getter().do();
// console.info("schemaRes:", schemaRes);

const test = Buffer.from(readFileSync("./test/test_2.jpg")).toString("base64");

const resImage = await client.graphql
  .get()
  .withClassName("Meme")
  .withFields(["image"])
  .withNearImage({ image: test })
  .withLimit(1)
  .do();

const result = resImage.data.Get.Meme[0].image;
writeFileSync("./result.jpg", result, "base64");
