import mongoose , {mongo} from "mongoose";
const {Schema} = mongoose

const userSchema = new Schema({
email: {
type : String,
Trim: true,
required: true,
unique: true
},
password:{
type: String,
required: true,
min: 5

},


});

export default mongoose.model("User", userSchema);