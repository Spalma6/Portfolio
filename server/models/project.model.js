import mongoose from "mongoose";

const ProjectSchema = new mongoose.Schema(
  {
    title: { type: String, trim: true, required: true },
    completionDate: { type: Date, required: true },
    description: { type: String, trim: true, required: true }
  },
  { timestamps: { createdAt: "created", updatedAt: "updated" } },
);

export default mongoose.model("Project", ProjectSchema);
