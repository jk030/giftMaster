const mongoose = require('mongoose');
const Schema = mongoose.Schema

const GiftSchema = new Schema(
    {
    title: String,
    priceSpan: Number,

    occasion: String,

    imageGift: String,
    link: String,
    notes:{
        type:String,
        maxLength: 500,
        },
    recipient: [{ type: Schema.Types.ObjectId, ref: 'Recipient' }],
    }
)

const Gift = mongoose.model("Gift", GiftSchema);
module.exports = Gift;