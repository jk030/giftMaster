const mongoose = require('mongoose');
const Schema = mongoose.Schema

const RecipientSchema = new Schema(
{
    picturePerson:String,
    name:String,
    personalDetails:String,
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
    },//(specififc things you dont need or already have)

    priceSpan:{
        type:Number,
    },
    
    imageGift:String,
    title:String,
    link:String,
    notes:{
        type:String,
        maxLength: 500,
}


}
)

const Recipient = mongoose.model("Recipient", RecipientSchema);

module.exports = Recipient;
