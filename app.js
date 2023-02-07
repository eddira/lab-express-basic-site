const express = require('express')

const hbs = require('hbs')

const app = express()

app.use(express.static(`${__dirname}/public`))

app.set("view engine", "hbs")
hbs.registerPartials(`${__dirname}/views/partials`)

app.get("/", (request, response) => {
  response.render("home", {
    navbar: true,
  })
})

app.get("/about", (req, res) => {
  console.log(req.query)
  res.render("about", {
  });
});

app.get("/works", (req, res) => {
  console.log(req.query);
  res.render("works", {
    navbar: true,
  })
})

app.listen(5000, (err) => {
  if (err) {
    return console.error(err);
  }
  console.log(`http://localhost:5000`)
})
