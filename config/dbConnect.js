import mongoose from "mongoose";

const db = () => {
    mongoose.connect(process.env.DB_URI)
    .then(()=>{
        console.log('mongodb is connected!');
    })
    .catch((err)=>{
        console.log(err.message);
    })
}

export default db