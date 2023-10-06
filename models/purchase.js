import mongoose , {mongo} from "mongoose";
const {Schema} = mongoose;


const purchaseSchema = new Schema({

first:{
type: String,
// required: true

},

last:{

    type: String,
    // required: true
},

email:{
type: String,
// required: true

},

city:{

type: String,
// required: true

},

state: { 
type : String,
// required: true

},

phone:{

    type:  Number,
    // required : true


},

nin:{

    type : Number,
    // required: true
},
   
gname: {
    type: String,
},

gaddress: {
    type: String,
},

gnin: {
type: String

}


});

// export default mongoose.model("purchase", PurchaseSchema)
const Purchase = mongoose.model('Purchase', purchaseSchema);
Purchase.createIndexes();



export default Purchase