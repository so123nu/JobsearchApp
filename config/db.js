import mongoose from 'mongoose';

const connectDB = async () => {
    try {
        const conn = await mongoose.connect(process.env.MONGO_URI, {
            useUnifiedTopology: true,
            useNewUrlParser: true,
        });

        console.log(`Mongo DB connected on ${conn.connection.host}`)
    } catch (err) {
        if (err) {
            console.log(err)
        }
    }
}

export default connectDB;