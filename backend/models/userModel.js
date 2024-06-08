import mongoose from "mongoose";

const userSchema = mongoose.Schema(
    {
        regNo: {
            type: String,
            required: true,
        },
        name: {
            type: String,
            required: true,
        },
        
    },
    {
        timestamps: true,
    }
);

export const User = mongoose.model('User', userSchema);