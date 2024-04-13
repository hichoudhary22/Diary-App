const mongoose = require("mongoose");

const diarySchema = mongoose.Schema({
  userId: {
    type: String,
    required: true,
  },
  userName: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  heading: {
    type: String,
    required: true,
  },
  content: {
    type: String,
    required: true,
  },
  date: {
    type: Date,
    default: Date.now,
  },
});

// diarySchema.pre("save", async function () {
//   this.heading = this.heading || this.content.substring(0, 15);
// });

module.exports = mongoose.model("Diary", diarySchema);
