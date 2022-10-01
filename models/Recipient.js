const mongoose = require('mongoose');
const Schema = mongoose.Schema

const RecipientSchema = new Schema(
{
    id:String,
    picturePerson:String,
    name:String,
    personalDetails:String,
    user: [{ type: Schema.Types.ObjectId, ref: 'User'}],
    occasion:{
        type:String,
        enum:["Christmas","Birthday","Hanukkah","Easter","Wedding"],

    },
    preference: {
     type:String,
     maxLength: 500,

    },//(specific things you might want)
    unwanted:{
    type:String,
    },//(specific things you dont need or already have)

    priceSpan:{
        type:Number,
    },
    
    imageGift:String,
    title:String,
    link:String,
    notes:{
        type:String,
        maxLength: 500,
    }, 
    user: [{ type: Schema.Types.ObjectId, ref: "User" }]
}
)

const Recipient = mongoose.model("Recipient", RecipientSchema);

module.exports = Recipient;