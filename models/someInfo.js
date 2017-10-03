const { mongoose } = require("./mongoose.js");
const Schema = mongoose.Schema;

let SomeInfoSchema = new Schema({
    key: { type: String, required: true },
    value: { type: Object, required: true },
    timestamp: { type: String, required: true }
});

const SomeInfo = mongoose.model("SomeInfo", SomeInfoSchema);
module.exports = SomeInfo;
