import mongoose from "mongoose";

const ArticleSchema=new mongoose.Schema({
    title:{
        type:String,
        required:true,
    },
    content:{
        type:String,
        required:true,
    }
});

export default mongoose.model("Blog",ArticleSchema);