import mongoose from 'mongoose';

const userSchema = new mongoose.Schema({
    regNo: {
        type: String,
        required: true,
        unique: true
    },
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    },
    university: {
        type: String,
        required: true
    },
    country: {
        type: String,
        required: true
    },
    tokens: [{
        token: {
            type: String,
            required: true
        }
    }]
}, {
    timestamps: true
});

const User = mongoose.model('User', userSchema);

export { User };
