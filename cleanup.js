import mongoose from "mongoose";

// Define the MongoDB connection string and database name
const uri = 'mongodb+srv://nodejs:test1234@nodetuts.drtr3cz.mongodb.net/nodeDBtest?retryWrites=true&w=majority';

mongoose.set('strictQuery', false);
const cleanup = async () => {
    await mongoose.connect(uri, { useNewUrlParser: true });
    await mongoose.connection.dropDatabase();
    await mongoose.disconnect();
};

export default cleanup()
