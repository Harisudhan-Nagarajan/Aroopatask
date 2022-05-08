import express from "express";
import { MongoClient } from "mongodb";
import cors from "cors";
import dotenv from "dotenv";
import { count, findone, insert, findandupdate } from "./helper.js";

const app = express();

app.use(cors());// Cross-Origin Resource Sharing
dotenv.config();
app.use(express.json());

const MONGO_URL = process.env.MONGO_URL;
export const client = await createconnection();//creating mongodb connection 

async function createconnection() {
  try {
    const client = new MongoClient(MONGO_URL);
    await client.connect();
    console.log("connected");
    return client;
  } catch (err) {
    console.log("error", err);
  }
}

app.get("/", async (request, responce) => {
  responce.send(`Challengeone`);
});

app.post("/boards", async (request, responce) => {
  const { title } = request.body;
  let counts = await count();//getting the count of the boards collection
  const board = await insert(counts, title);//inserting in board collection

  const find = await findone(board);//finding the product with the inserted id

  responce.status(201).send(find);
});

app.put("/boards/:id", async (request, responce) => {
  const { id } = request.params;
  const { stage } = request.body;
  if (stage !== 1 && stage !== 2 && stage !== 3) {
    responce.status(400).send();//sending response if stage is not 1,2,3
    return;
  }
  const board = await findandupdate(id, stage);//finding and updating the stage in product
  responce.status(200).send(board.value);
});


const port = process.env.port;
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
