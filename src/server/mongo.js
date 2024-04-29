const mongoose=require("mongoose")
mongoose.connect("mongodb://localhost:27017/FoodX")
.then(()=>{
    console.log("Mongodb Connected");
})
.catch(()=>{
    console.log('Failed');
})

const newSchema=new mongoose.Schema({
    user:{
        type:String,
        unique:true,
    },
    email:{
        type:String,
        unique:true
    },
    password:{
        type:String,
        required:true,
    }
})
const collection=mongoose.model("collection",newSchema)

const cartItemSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    quantity: {
        type: Number,
        required: true
    },
    price: {
        type: Number,
        required: true
    }
});

const CartItem = mongoose.model("CartItem", cartItemSchema);


module.exports={
    collection,
    CartItem
}