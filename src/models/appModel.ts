import mongoose, { Schema } from "mongoose";

const appSchema = new Schema({
    name: { type: String, required: true },
    description: { type: String, required: true },
    icon: { type: String, required: true },
    published: { type: Boolean, default: false },
    version: { type: String, required: true },
    url: { type: String, required: true },
    images: { type: [String], required: true }, // Changed to [String] for array of strings
    createdAt: { type: Date, default: Date.now },
    updatedAt: { type: Date, default: Date.now },
});

// Check if the model is already defined, if not, define it
export const App = mongoose.models.App || mongoose.model("App", appSchema);
