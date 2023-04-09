import weaviate from "weaviate-ts-client";

function getWeaviateClient() {
  return weaviate.client({
    scheme: "http",
    host: "localhost:8080",
  });
}

export default getWeaviateClient;
