import mongoose , {mongo} from "mongoose";
const {Schema} = mongoose;


const deliverySchema = new Schema({

first:{
type: String,
// required: true

},

last:{

    type: String,
    // required: true
},

phone:{
type: Number,
// required: true

},

location:{

type: String,
// required: true

},

destination: { 
type : String,
// required: true

},

number:{

    type:  Number,
    // required : true


},

reference:{

    type : Number,
    // required: true
},

worth:{
    type: Number
}
});

// export default mongoose.model("purchase", PurchaseSchema)
const Delivery = mongoose.model('Delivery', deliverySchema);
Delivery.createIndexes();



export default Delivery