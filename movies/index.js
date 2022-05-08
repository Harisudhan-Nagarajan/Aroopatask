import express from "express";
import { MongoClient } from "mongodb";
import cors from "cors";
import dotenv from "dotenv";
import { getmovies } from "./helper.js";

const app = express();

app.use(cors()); // Cross-Origin Resource Sharing
dotenv.config();
app.use(express.json());

const MONGO_URL = process.env.MONGO_URL;
export const client = await createconnection(); //creating mongodb connection

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
  responce.send(`Movies`);
});

app.get("/search", async (request, responce) => {
  let page = request.query.page || 1;
  const { Title } = request.query;

  const movies = await getmovies(Title); //getting the movies with the title
  const totalpage = Math.ceil(movies.length / 10); //getting the total number of pages
  const pageMovies = movies.slice(10 * (page - 1), 10 * page); //sliceing the movies with the page number and 10 movies per page

  responce.send({
    page: page,
    per_page: 10,
    total: pageMovies.length,
    total_pages: totalpage,
    data: pageMovies,
  });
});

const port = process.env.port;
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});

//array of movies titles in acending order
const gettitle = async (title) => {
  const movies = await getmovies(title); //getting the movies with the title
  const titles = movies.map((movie) => movie.Title); //getting the titles of the movies
  console.log(titles.sort()); //sorting the titles in acending order
};

gettitle("spiderman");
