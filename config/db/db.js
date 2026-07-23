import mongoose from "mongoose";


const connectToDB = async () => {
    try {
        await mongoose.connect(process.env.DATABASE_URL, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
        })
        console.log('DB Connected Sucessfully✅');

    } catch (error) {
        console.log(`Someting is wrong ${error.message}`);
        process.exit(1);
    }
}

export default connectToDB;