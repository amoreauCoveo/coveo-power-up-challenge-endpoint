const express = require("express");
const movies = require("./moviesshort.json");
const detailedmovies = require("./moviesdetailed.json");
const directors = require("./directors.json");
const app = express();
const port = process.env.PORT || 3000;
const responseSizeLimit = 20;


function parseStringToInt(str) {
  const parsed = parseInt(str);
  if (parsed == str) {
    return parsed;
  } else {
    return "NaN";
  }
}

app.get('/movies', (req, res) => {
  if (!req.query["per_page"]) {
    req.query["per_page"] = responseSizeLimit;
  }
  const parsedPerPage = parseStringToInt(req.query["per_page"]);
  if (parsedPerPage < 1 || parsedPerPage > responseSizeLimit || parsedPerPage == "NaN") {
    req.query["per_page"] = responseSizeLimit;
  }
  if (!req.query["page"]) {
    req.query["page"] = 1;
  }
  const parsedPage = parseStringToInt(req.query["page"]);
  if (parsedPage < 1 || parsedPage == "NaN") {
    req.query["page"] = 1;
  }

  const indexToStart = (req.query["page"] -1) * req.query["per_page"];
  const indexToStop = req.query["page"] * req.query["per_page"]
  let response = movies.slice(indexToStart, indexToStop);
  if (!response.length) {
    response = [];
  }
  res.send(response)
})

app.get('/movies/:movieid', (req, res) => {
  let response = detailedmovies.find(movie => movie.imdb_title_id==req.params.movieid);
  if (response == null) {
    response = {"error": "Invalid movie id"}
  }
  res.send(response);
})

app.get('/directors', (req, res) => {
  if (!req.query["per_page"]) {
    req.query["per_page"] = responseSizeLimit;
  }
  const parsedPerPage = parseStringToInt(req.query["per_page"]);
  if (parsedPerPage < 1 || parsedPerPage > responseSizeLimit || parsedPerPage == "NaN") {
    req.query["per_page"] = responseSizeLimit;
  }
  if (!req.query["page"]) {
    req.query["page"] = 1;
  }
  const parsedPage = parseStringToInt(req.query["page"]);
  if (parsedPage < 1 || parsedPage == "NaN") {
    req.query["page"] = 1;
  }

  const indexToStart = (req.query["page"] -1) * req.query["per_page"];
  const indexToStop = req.query["page"] * req.query["per_page"]
  let response = directors.slice(indexToStart, indexToStop);
  if (!response.length) {
    response = [];
  }
  res.send(response)
})

app.get('/directors/:directorid', (req, res) => {
  const directorids = req.params.directorid.split(";");
  const directorsToReturn = [];
  directorids.forEach((directorid) => {
    const director = directors.find(dir => dir.imdb_name_id==directorid);
    if (director != undefined) {
      directorsToReturn.push(director);
    }
  })
  if (directorsToReturn.length < 1) {
    const error = {"error": "Invalid director id"};
    res.send(error);
  } else if (req.query["page"] && req.query["page"]!= 1) {
    const empty = [];
    res.send(empty);
  } else {
    res.send(directorsToReturn);
  }
})

app.listen(port, () => {
  console.log(`Movie listing available at http://localhost:${port}`)
})