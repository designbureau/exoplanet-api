// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
const parseString = require("xml2js").parseString;
const fs = require("fs");
const path = require("path");

// eslint-disable-next-line import/no-anonymous-default-export
export default (req, res) => {
  const { system } = req.query;

  const data = fs.readFileSync(
    path.join(process.cwd(), `/open_exoplanet_catalogue/systems/${system}.xml`)
  );
  parseString(data, function (_err, result) {
    res.status(200).json({ result });
  });
};