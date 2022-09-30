const mongoose = require('mongoose');
const Schema = mongoose.Schema

const GiftSchema = new Schema(
    {
    id: String,
    title: String,
    recipient: [{ type: Schema.Types.ObjectId, ref: 'Recipient'}],
    priceSpan: Number,
    occasion: {
        type: String,
        enum: ["Christmas","Birthday","Hanukkah","Easter","Wedding"]
        },
    imageGift: String,
    link: String,
    notes:{
        type:String,
        maxLength: 500,
        }
    }
)

const Gift = mongoose.model("Gift", GiftSchema);
module.exports = Gift;