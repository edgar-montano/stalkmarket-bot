const fs = require("fs");
const data = require("../data/data.json");

module.exports = loadData = () => {
  console.log(data);
  return data;
};

loadData();
