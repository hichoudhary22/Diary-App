const diaryModel = require("../models/diaryModel");

module.exports.allEntries = async (req, res, next) => {
  let queryObj = { userId: req.user._id.toString(), ...req.query };

  [("page", "sort", "limit", "fields")].forEach(
    (field) => delete queryObj[field]
  );

  queryObj = JSON.parse(
    JSON.stringify(queryObj).replace(
      /\b(gte|lte|gt|lt)\b/g,
      (matched) => `$${matched}`
    )
  );

  if (queryObj.contentContains) {
    queryObj.content = {
      $regex: queryObj.contentContains,
      $options: "i",
    };
    delete queryObj.contentContains;
  }

  let query = diaryModel.find(queryObj);

  if (req.query.sort) {
    const sortBy = req.query.sort.split(",").join(" ");
    query = query.sort(sortBy);
  } else {
    query = query.sort("-date");
  }

  if (req.query.fields) {
    const fieldsToInclude = req.query.fields.split(",");
    console.log(fieldsToInclude);
    query = query.select(fieldsToInclude);
  } else {
    query = query.select("-__v");
  }

  if (req.query.page || req.query.limit) {
    query = query
      .skip(req.query.limit * (req.query.page - 1))
      .limit(req.query.limit);
  }
  // else {
  //   query = query.skip(0).limit(3);
  // }

  try {
    const searchedData = await query;
    res.status(200).json({
      user: req.user.name,
      noOfEntries: searchedData.length,
      diaryEntries: searchedData,
    });
  } catch (e) {
    res.status(400).json({ error: e });
  }
};

module.exports.newEntry = async (req, res, next) => {
  const newEntry = {
    userId: req.user._id.toString(),
    email: req.user.email,
    userName: req.user.name,
    heading: req.body.heading || req.body.content.substring(0, 15),
    content: req.body.content,
  };
  const response = await diaryModel.create(newEntry);
  res.send(response);
};

module.exports.modifyEntry = async (req, res, next) => {
  const id = req.body._id;
  delete req.body._id;
  const response = await diaryModel.findByIdAndUpdate(id, req.body);
  res.send(response);
};

module.exports.deleteEntry = async (req, res, next) => {
  const response = await diaryModel.findOneAndDelete({ _id: req.body.id });
  if (!response) {
    res.send("error");
  } else {
    res.send("deleted");
  }
};
