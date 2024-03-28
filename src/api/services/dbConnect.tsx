import mongoose from 'mongoose';

async function dbConnect() {
    const auth = {
        user: process.env.MONGOOSE_USER,
        pass: process.env.MONGOOSE_PASS,
        db: process.env.MONGOOSE_DB,
    };

    try {
        await mongoose.connect(`mongodb://${auth.user}:${auth.pass}@localhost:27017/${auth.db}`);
    } catch (error) {
        throw new Error('Connection failed');
    }
}

export default dbConnect;
