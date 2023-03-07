import mongoose from "mongoose";

// Define the MongoDB connection string and database name
const uri = 'mongodb+srv://niyof97:mybrand123@cluster0.t5ivqjz.mongodb.net/mybrandtest?retryWrites=true';

mongoose.set('strictQuery', false);
const cleanup = async () => {
    await mongoose.connect(uri, { useNewUrlParser: true });
    await mongoose.connection.dropDatabase();
    await mongoose.disconnect();
};

export default cleanup()
