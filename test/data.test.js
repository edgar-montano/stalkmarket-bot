const fs = require("fs");
const data = require("../data/data.json");
const writeData = require("../utils/writeData");

test("Attempting to write data", () => {
  expect(writeData("defnot", 0)).toBeTruthy();
});
