const express = require("express");
const movies = require("./moviesshort.json");
const moviesfr = require("./moviesfr.json");
const detailedmovies = require("./moviesdetailed.json");
const pokemon = require("./pokemon.json");
const pokemonfr = require("./pokemonfr.json");
const pokemonitems = require("./pokemonitems.json");
const path = require("path");
const directors = require("./directors.json");
const fs = require("fs");
const app = express();
const port = process.env.PORT || 3000;
const responseSizeLimit = 20;

const docs = new Promise((resolve, reject) => {
  fs.readFile("./index.html", "utf-8", function (err, data) {
    if (err) {
      console.log("Can't read file");
      reject(err);
    } else {
      console.log("Read Docs");
      resolve(data);
    }
  })
})

const config = new Promise((resolve, reject) => {
  fs.readFile("./config.html", "utf-8", function (err, data) {
    if (err) {
      console.log("Can't read file", "IMDb");
      reject(err);
    } else {
      console.log("Read IMDb Config");
      resolve(data);
    }
  })
})

const pokconfig = new Promise((resolve, reject) => {
  fs.readFile("./pokemonconfig.html", "utf-8", function (err, data) {
    if (err) {
      console.log("Can't read file", "Pokemon");
      reject(err);
    } else {
      console.log("Read Pokemon Config");
      resolve(data);
    }
  })
})

function parseStringToInt(str) {
  const parsed = parseInt(str);
  if (parsed == str) {
    return parsed;
  } else {
    return "NaN";
  }
}

app.get('/', (req, res) => {
  docs.then(
    doc => {
      res.send(doc);
    }
  )
})


app.use("/power-up/src", express.static(__dirname + '/moviedemo/src'));

app.get('/power-up/demo/', (req, res) => {
  res.sendFile(path.join(__dirname + "/moviedemo/", "/index.html"));
})

app.use('/web', express.static(path.join(__dirname + "/web/")))

app.get('/power-up/config/codeless', (req, res) => {
  config.then(
    qconfig => {
      res.send(qconfig);
    }
  )
})

app.get('/power-up/config/pokemon/codeless', (req, res) => {
  pokconfig.then(
    pconfig => {
      res.send(pconfig);
    }
  )
})

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

  const indexToStart = (req.query["page"] - 1) * req.query["per_page"];
  const indexToStop = req.query["page"] * req.query["per_page"]

  let response = [];
  if (req.query["lang"] && req.query["lang"] != "fr" && req.query["lang"] != "en") {
    response = { "error": "Invalid language key. Valid language keys are: ['en', 'fr']"};
  } else if (req.query["lang"] == "fr") {
    response = moviesfr.slice(indexToStart, indexToStop);
    if (!response.length) {
      response = [];
    }
  } else {
    response = movies.slice(indexToStart, indexToStop);
    if (!response.length) {
      response = [];
    }
  }

  res.send(response)
})

app.get('/movies/:movieid', (req, res) => {
  let response = detailedmovies.find(movie => movie.id == req.params.movieid);
  if (response == null) {
    response = { "error": "Invalid movie id" }
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

  const indexToStart = (req.query["page"] - 1) * req.query["per_page"];
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
    const director = directors.find(dir => dir.id == directorid);
    if (director != undefined) {
      directorsToReturn.push(director);
    }
  })
  if (directorsToReturn.length < 1) {
    const error = { "error": "Invalid director id" };
    res.send(error);
  } else if (req.query["page"] && req.query["page"] != 1) {
    const empty = [];
    res.send(empty);
  } else {
    res.send(directorsToReturn);
  }
})

app.get('/pokemon', (req, res) => {
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

  const indexToStart = (req.query["page"] - 1) * req.query["per_page"];
  const indexToStop = req.query["page"] * req.query["per_page"]

  let response = [];

  if (req.query["lang"] && req.query["lang"] != "fr" && req.query["lang"] != "en") {
    response = { "error": "Invalid language key. Valid language keys are: ['en', 'fr']"};
  } else if (req.query["lang"] == "fr") {
    response = pokemonfr.slice(indexToStart, indexToStop);
    if (!response.length) {
      response = [];
    }
  } else {
    response = pokemon.slice(indexToStart, indexToStop);
    if (!response.length) {
      response = [];
    }
  }

  res.send(response)
})

app.get('/pokemon/:pokemonid', (req, res) => {
  let response = pokemon.find(poke => poke.number == req.params.pokemonid);
  if (response == null) {
    response = { "error": "Invalid pokemon id" }
  }
  res.send(response);
})

app.get('/pokemon-items', (req, res) => {
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

  const indexToStart = (req.query["page"] - 1) * req.query["per_page"];
  const indexToStop = req.query["page"] * req.query["per_page"]

  let response = pokemonitems.slice(indexToStart, indexToStop);
  if (!response.length) {
    response = [];
  }

  res.send(response)
})

app.get('/pokemon-items/:itemid', (req, res) => {
  let response = pokemonitems.find(poke => poke.id == req.params.itemid);
  if (response == null) {
    response = { "error": "Invalid pokemon item id" }
  }
  res.send(response);
})

app.listen(port, () => {
  console.log(`Listings available at http://localhost:${port}`)
})

module.exports = app;