const db = require("../models");

exports.getAllTitles = (req, res) => {
  console.log("Get All TItles");

  let promises = [];

  promises.push(
    new Promise((resolve) => {
      db.Title.find({}, function (err, titles) {
        if (err) {
          res.status(400).json({
            message: "there was an error fetching the title list",
          });
        }

        resolve(titles);
      });
    })
  );

  promises.push(
    new Promise((resolve) => {
      db.Issue.find({}, function (err, issues) {
        if (err) {
          res.status(400).json({
            message: "there was an erro fetching the title list",
          });
        }
        resolve(issues);
      });
    })
  );

  Promise.all(promises)
    .then((responses) => {
      let titles = JSON.parse(JSON.stringify(responses[0]));
      let issues = responses[1];

      console.log("TITLES:", titles.length);
      console.log("ISSUES:", issues.length);

      for (let index = 0; index < titles.length; index++) {
        const title = titles[index];

        if (issues.find((issue) => issue.tid == title.tid)) {
          titles[index].rented = true;
        } else {
          titles[index].rented = false;
        }
      }

      res.status(200).json(titles);
    })
    .catch((error) => console.error(error));
};

exports.searchTitle = (req, res) => {
  console.log("searchTitle:", req.params.search);
  let promises = [];
  promises.push(
    new Promise((resolve) => {
      db.Title.find(
        { title: { $regex: new RegExp(req.params.search, "i") } },
        function (err, titles) {
          if (err) {
            res.status(400).json({
              message: "there was an error fetching the title list",
            });
          }

          resolve(titles);
        }
      );
    })
  );

  promises.push(
    new Promise((resolve) => {
      db.Issue.find({}, function (err, issues) {
        if (err) {
          res.status(400).json({
            message: "there was an erro fetching the title list",
          });
        }
        resolve(issues);
      });
    })
  );

  Promise.all(promises)
    .then((responses) => {
      let titles = JSON.parse(JSON.stringify(responses[0]));
      let issues = responses[1];

      console.log("TITLES:", titles.length);
      console.log("ISSUES:", issues.length);

      for (let index = 0; index < titles.length; index++) {
        const title = titles[index];

        if (issues.find((issue) => issue.tid == title.tid)) {
          titles[index].rented = true;
        } else {
          titles[index].rented = false;
        }
      }

      res.status(200).json(titles);
    })
    .catch((error) => {
      console.error(error);

      res
        .status(400)
        .json({ message: "There was an error issuing your Titles" });
    });
};

exports.issueTitle = (req, res) => {
  let cart = req.body.cart;
  let insert = [];

  cart.map((item) => {
    insert.push({
      rent: item.rent - item.rent * (item.discount / 100),
      tid: item.tid,
    });
  });

  db.Issue.insertMany(insert)
    .then((inserted) => {
      res.status(200).json(inserted);
    })
    .catch((error) => {
      console.error(error);
      res
        .status(400)
        .json({ message: "There was an error issuing your Titles" });
    });
};
