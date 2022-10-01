const mongoose = require('mongoose');
const Schema = mongoose.Schema

const GiftSchema = new Schema(
    {
    title: String,
    priceSpan: Number,
    occasion: {
        type: String,
        enum: ["Christmas","Birthday","Hanukkah","Easter","Wedding"]
        },
    imageGift: String,
    title: String,
    link: String,
    notes:{
        type:String,
        maxLength: 500,
        }
    }
)

const Gift = mongoose.model("Gift", GiftSchema);
module.exports = Gift;