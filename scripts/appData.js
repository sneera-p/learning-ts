require("dotenv").config();
const fs = require("fs/promises");
const path = require("path");
const YAML = require("yaml");

function pathOf(file) {
   return path.resolve(process.cwd(), ...file);
}

fs.readFile(pathOf(["package.json"]))
   .then((data) => {

      const pdata = JSON.parse(data)

      fs.readFile(pathOf(["src/routes/routes.json"]))
         .then((rdata) => {
            const doc = new YAML.Document();
            doc.contents = {
               package: {
                  name: pdata.name,
                  version: pdata.version,
                  license: pdata.license,
                  dependencies: pdata.dependencies,
               },
               routes: JSON.parse(rdata),
               env: Object.keys(process.env).filter((e, i) => i > 33),
            };

            fs.writeFile(
               pathOf([
                  process.argv[2] === "prod" ? "bin" : "dist",
                  "appdata.yaml",
               ]),
               doc.toString()
            ).catch((err) => {
               throw err;
            });
         })
         .catch((err) => {
            throw err;
         });
   })
   .catch((err) => {
      console.log(err);
   });
