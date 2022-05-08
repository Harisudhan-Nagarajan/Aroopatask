import { client } from "./index.js";
export const getmovies = async (Title) => { //getting the movies with the title
  return await client
    .db("movies")
    .collection("movies")
    .find({ Title: { $regex: Title, $options: "$i" } })
    .toArray();
};
