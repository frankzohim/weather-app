const path = require("path");
const express = require("express");
const hbs = require("hbs");
const app = express();
const geoCode = require("./utils/geocode");
const forecast = require("./utils/forecast");

//Define paths for Express config
const publicDirectoryPath = path.join(__dirname, "../public");
const viewsPath = path.join(__dirname, "../templates/views");
const partialPath = path.join(__dirname, "../templates/partials");

//Setup handlersbars engine and views location
app.set("views", viewsPath);
app.set("view engine", "hbs");
hbs.registerPartials(partialPath);

//Setup static directory to serve
app.use(express.static(publicDirectoryPath));

app.get("", (req, res) => {
  res.render("index", {
    title: "Weather App",
    name: "Frank Zohim",
  });
});

app.get("/about", (req, res) => {
  res.render("about", {
    title: "About me",
    name: "Frank Zohim",
  });
});

app.get("/help", (req, res) => {
  res.render("help", {
    message: "Default help message",
    title: "Help",
    name: "Frank Zohim",
  });
});

app.get("/weather", (req, res) => {
  if (!req.query.address) {
    return res.send({
      error: "Error, you must provide an address",
    });
  }

  const address = req.query.address;

  geoCode(address, (error, data) => {
    if (error) {
      return res.send({
        error: error,
      });
    }

    const location = data.location;
    forecast(data.latitude, data.longitude, data.location, (error, data) => {
      if (error) {
        return res.send({
          Error: error,
        });
      }

      res.send({
        adddress: req.query.address,
        location: location,
        forecast: data,
      });
    });
  });
});

app.get("/products", (req, res) => {
  console.log(req.query);
  res.send({
    products: [],
  });
});

app.get("/help/*", (req, res) => {
  res.render("404", {
    title: "404",
    error: "Article not found",
    name: "Frank Zohim",
  });
});
app.get("*", (req, res) => {
  res.render("404", {
    title: "404",
    error: "Page not found",
    name: "Frank Zohim",
  });
});

app.listen(3000, () => {
  console.log("Server is up on port 3000.");
});
