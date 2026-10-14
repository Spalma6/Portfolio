import mongoose from "mongoose";

const ContactSchema = new mongoose.Schema(
  {
    firstName: { type: String, trim: true, required: true },
    lastName: { type: String, trim: true, required: true },
    phone: { type: String, trim: true, required: true },
    email: { type: String, trim: true, required: true, match: /.+\@.+\..+/ },
    message: { type: String, trim: true, required: true },
  },
  { timestamps: { createdAt: "created", updatedAt: "updated" } },
);

export default mongoose.model("Contact", ContactSchema);
