import { client } from "./index.js";

export const count = async () => {
  return await client.db("boards").collection("board").estimatedDocumentCount(); //getting the count of the boards collection
};

export const insert = async (counts, title) => {
  //inserting the product  in board collection
  return await client
    .db("boards")
    .collection("board")
    .insertOne({ _id: counts + 1, title: title, stage: 1 });
};

export const findone = async (board) => {
  //finding the product with the inserted id
  return await client
    .db("boards")
    .collection("board")
    .findOne({ _id: board.insertedId });
};

export const findandupdate = async (id, stage) => {
  //finding and updating the stage in product and returning the product
  return await client
    .db("boards")
    .collection("board")
    .findOneAndUpdate(
      { _id: +id },
      { $set: { stage: stage } },
      { returnDocument: "after" }
    );
};
