const mongoose = require('mongoose');

const connectDB = async () => {
    try {
        const uri = process.env.MONGODB_URI || 'mongodb://host.docker.internal:27017/inventario';
        await mongoose.connect(uri);
        console.log('MongoDB connected ✅');
    } catch (error) {
        console.error('MongoDB connection error ❌', error);
        process.exit(1);
    }
};

module.exports = connectDB;
