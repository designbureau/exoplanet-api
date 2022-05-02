// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
const parseString = require("xml2js").parseString;
const fs = require("fs");
const path = require("path");

// eslint-disable-next-line import/no-anonymous-default-export
export default (req, res) => {
  const directoryPath = path.join(
    process.cwd(),
    "/open_exoplanet_catalogue/systems"
  );

  let systems = [];

  const filenames = fs.readdirSync(directoryPath);

  filenames.forEach((file) => {
    systems.push(path.parse(file).name);
  });
  
  res.status(200).json({ systems });
};
