const mongoose = require('mongoose');
const Schema = mongoose.Schema

const giftListSchema = new Schema(
{
    id:String,
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

const GiftList = mongoose.model("GiftList", giftListSchema);

module.exports = GiftList;
