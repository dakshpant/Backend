import mongoose from "mongoose";

const medRecordSchema= new mongoose.Schema({},{timestamps:true})

const MedRecord= mongoose.model("MedRecord",medRecordSchema)