import getWeaviateClient from "./db/index.js";
import schema from "./db/schema.js";
import { readdirSync, readFileSync } from "fs";

function getBase64FromImage(imageName) {
  const img = readFileSync(`./img/${imageName}`);
  return Buffer.from(img).toString("base64");
}

const client = getWeaviateClient();

await client.schema.classCreator().withClass(schema).do();

const imgFiles = readdirSync("./img");

const promises = imgFiles.map(async (imgFile) => {
  const b64 = getBase64FromImage(imgFile);

  await client.data
    .creator()
    .withClassName(schema.class)
    .withProperties({
      image: b64,
      text: imgFile.split(".")[0].split("_").join(" "),
    })
    .do();
});

await Promise.all(promises);
