import mongoose from "mongoose";

const QualificationSchema = new mongoose.Schema(
  {
    title: { type: String, trim: true, required: true },
    completionDate: { type: Date, required: true },
    cred: { type: String, trim: true, required: true },
    type: { type: String, trim: true, required: true },
    description: { type: String, trim: true, required: true },
  },
  { timestamps: { createdAt: "created", updatedAt: "updated" } },
);

export default mongoose.model("Qualification", QualificationSchema);
