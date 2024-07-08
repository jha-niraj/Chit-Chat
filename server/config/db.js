import mongoose from "mongoose";

export const connectDB = async() => {
    try {
        const connect = await mongoose.connect(process.env.DATABASE_URL, {
            useNewUrlParser: true,
            useUnifiedTopology: true
        })
        console.log(`Mongo Db Connected: ${connect.connection.host}`)
    } catch(err) {
        console.log(`Error: ${err.message}`);
        process.exit();
    }
}