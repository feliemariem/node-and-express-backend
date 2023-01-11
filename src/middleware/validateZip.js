const validateZip = (req, res, next) => {
  const zip = String(req.params.zip);
  console.log(zip);
  const zipNumber = Number(zip);
  if (zip === "all") {
    next();
  } else if (zip.length !== 5 || isNaN(zipNumber)) {
    res.send(`Zip (${zip}) is invalid!`);
  } else {
    next();
  }
};

module.exports = validateZip;