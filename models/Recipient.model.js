const mongoose = require('mongoose');
const Schema = mongoose.Schema

const RecipientSchema = new Schema(
    {
    imageRecipient:String,
    name:String,
    gifts: [{ type: Schema.Types.ObjectId, ref: 'Gift'}],
    personalDetails:String,
    user: { type: Schema.Types.ObjectId, ref: 'User'},
    preference: String,//(specific things you might want)
    unwanted: {
    type:String,
        },//(specific things you dont need or already have)
    privacy:Boolean,
    }
)

const Recipient = mongoose.model("Recipient", RecipientSchema);
module.exports = Recipient;
