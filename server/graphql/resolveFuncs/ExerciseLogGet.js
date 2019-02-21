const Exercise = require("../../models/Exercise");

const ExerciseLogGet = function(req, res, next) {
  console.log("view `/api/exercise/log` req object");
  if (!req.query.hasOwnProperty("_id")) {
    // console.log("whooo" + "\n" + JSON.stringify(req.query, null, 2));
    console.log("reached no _id if statement");
    return res.json({ message: "Expected a `_id` key in this request" });
  }
  const {
    _id,
    from = "2018-01-28T07:45:01.343Z",
    to = new Date(),
    limit = 20
  } = req.query;
  if (req.query == undefined || _id === "undefined" || _id === undefined) {
    return res.json({ data: "Not Found" });
  }

  Exercise.find({
    userId: _id,
    createdAt: {
      $gte: new Date(from).toISOString(),
      $lte: new Date(to).toISOString()
    }
  })
    .sort({ updatedAt: -1 })
    .limit(parseInt(limit, 10))
    .exec(function(error, docs) {
      console.log("INSIDE FIND");
      if (error) return console.error(error);
      console.log(JSON.stringify(docs));
      // return res.json({ data: { message: "suckaaaa" } });
      return res.json(docs);
    });
};

module.exports = { ExerciseLogGet };
