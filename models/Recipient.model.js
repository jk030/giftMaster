const mongoose = require('mongoose');
const Schema = mongoose.Schema

const RecipientSchema = new Schema(
    {
    id: String,
    imageRecipient:String,
    name:String,
    personalDetails:String,
    user: [{ type: Schema.Types.ObjectId, ref: 'User'}],
    
    preference: {
     type:String,
     maxLength: 500,
        },//(specific things you might want)
    unwanted: {
    type:String,
        },//(specific things you dont need or already have)

    }
)

const Recipient = mongoose.model("Recipient", RecipientSchema);
module.exports = Recipient;
