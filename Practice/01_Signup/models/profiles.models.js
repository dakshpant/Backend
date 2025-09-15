import mongoose, {Schema} from "mongoose";

const userProfileschema = new Schema({
    
    name:{
        type:String,
        required:true
    },
    gender:{
        type:String,
        enum:["male","female","other"],
        required:true
    },
    createdBy:{
        type:Schema.Types.ObjectId,
        ref:"User",
        required:true
    }
},{timestamps:true})

const Profile = mongoose.model("Profile", userProfileschema);
export default Profile