import mongoose from "mongoose";

const eventSchema = mongoose.Schema(
    {
        eventName: {
            type: String,
            required: true,
        },
        organizerName: {
            type: String,
            required: true,
        },
        logo: {
            data: Buffer, // Binary data of the image
            contentType: String // MIME type of the image (e.g., image/jpeg)
        },
        description: {
            type: String,
        },
        startDate: {
            type: Date,
        },
    },
    {
        timestamps: true,
    }
);

export const Event = mongoose.model('Event', eventSchema);