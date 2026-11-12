import mongoose from "mongoose";

const ProjectSchema = new mongoose.Schema(
  {
    title: { type: String, trim: true, required: true },
    type: { type: String, trim: true, required: true },
    image: { type: String, trim: true, required: true },
    role: { type: String, trim: true, required: true },    
    outcome: { type: String, trim: true, required: true }
  },
  { timestamps: { createdAt: "created", updatedAt: "updated" } },
);

export default mongoose.model("Project", ProjectSchema);
