import mongoose , {mongo} from "mongoose";
const {Schema} = mongoose;


const jobofferSchema = new Schema({

firstname:{
type: String,
// required: true

},

lastname:{

    type: String,
    // required: true
},

email:{
type: String,
// required: true

},

experience:{

type: Number,
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

lisence:{

    type : Buffer,
    // required: true
}


});

// export default mongoose.model("purchase", PurchaseSchema)
const Joboffer = mongoose.model('Joboffer', jobofferSchema);
Joboffer.createIndexes();



export default Joboffer