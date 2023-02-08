const express = require("express");

const hbs = require("hbs");

const app = express();

app.use(express.static(`${__dirname}/public`));

app.set("view engine", "hbs");
hbs.registerPartials(`${__dirname}/views/partials`);

app.get("/", (request, response) => {
  response.render("home", {
    navbar: true,
  });
});

app.get("/about", (req, res) => {
  console.log(req.query);
  res.render("about", {});
});

app.get("/works", async (req, res, next) => {
  console.log(req.query);
  res.render("works", {
    navbar: true,
  });
});

app.get("/characters", async (req, res, next) => {
  try {
    // throw Error('Oh no !')
    const raw = await fetch("https://rickandmortyapi.com/api/character");
    const finalResponse = await raw.json();
    console.log(finalResponse);

    res.render("characters", {
      characters: finalResponse.results,
    });
  } catch (error) {
    next(error);
  }
});

app.use((error, req, res, next) => {
  res.statusCode = 500;
  console.log(error.message);
  res.render("server-error", { code: res.statusCode, message: error.message });
});

app.listen(5000, (err) => {
  if (err) {
    return console.error(err);
  }
  console.log(`http://localhost:5000`);
});
