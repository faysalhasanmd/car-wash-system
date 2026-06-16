import { MongoClient, ServerApiVersion } from "mongodb";

let client;
let clientPromise;

export const dbConnect = async (collectionName) => {
  try {
    if (!client) {
      const uri = process.env.NEXT_MONGO_URI;
      const dbName = process.env.NEXT_MONGODB_NAME;

      if (!uri || !dbName) {
        throw new Error("MongoDB env variables are not defined");
      }

      client = new MongoClient(uri, {
        serverApi: {
          version: ServerApiVersion.v1,
          strict: true,
          deprecationErrors: true,
        },
      });

      await client.connect();
    }

    const db = client.db(process.env.NEXT_MONGODB_NAME);
    return db.collection(collectionName);
  } catch (e) {
    console.error("DB connection error:", e);
    throw e;
  }
};
