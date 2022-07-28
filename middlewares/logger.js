const mylogger = async (req, res, next) => {    //middleware def
    console.log(new Date(), req.method, req.url);
    const fs = require('fs');
  const { promisify } = require('util');
  const writeFile = promisify(fs.appendFile);
  (async () => {
    try {
      await writeFile('myData.txt', new Date() +'-'+ req.method +'-'+ req.url +'\n');
    } catch (err) {
      console.log(err);
    }
  })();
    next();
  };

  module.exports = {mylogger};   //export the function 