import { validateFields, validateObjectId } from "../helpers/validation.js";

const createResourceController = ({ Model, fields, resourceName }) => ({
  list: async (_req, res) => {
    try {
      const records = await Model.find().sort({ created: -1 });
      return res.status(200).json(records);
    } catch {
      return res.status(500).json({ error: `Unable to retrieve ${resourceName}.` });
    }
  },

  read: async (req, res) => {
    if (!validateObjectId(req.params.id)) {
      return res.status(400).json({ error: "Invalid record id." });
    }
    try {
      const record = await Model.findById(req.params.id);
      if (!record) return res.status(404).json({ error: `${resourceName} not found.` });
      return res.status(200).json(record);
    } catch {
      return res.status(500).json({ error: `Unable to retrieve ${resourceName}.` });
    }
  },

  create: async (req, res) => {
    const errors = validateFields(req.body, fields);
    if (errors) return res.status(400).json({ error: "Validation failed.", details: errors });
    try {
      const record = await Model.create(Object.fromEntries(fields.map((field) => [field, req.body[field]])));
      return res.status(201).json(record);
    } catch (error) {
      return res.status(400).json({ error: "Validation failed.", details: [error.message] });
    }
  },

  update: async (req, res) => {
    if (!validateObjectId(req.params.id)) {
      return res.status(400).json({ error: "Invalid record id." });
    }
    const errors = validateFields(req.body, fields);
    if (errors) return res.status(400).json({ error: "Validation failed.", details: errors });
    try {
      const record = await Model.findByIdAndUpdate(
        req.params.id,
        Object.fromEntries(fields.map((field) => [field, req.body[field]])),
        { new: true, runValidators: true },
      );
      if (!record) return res.status(404).json({ error: `${resourceName} not found.` });
      return res.status(200).json(record);
    } catch (error) {
      return res.status(400).json({ error: "Validation failed.", details: [error.message] });
    }
  },

  remove: async (req, res) => {
    if (!validateObjectId(req.params.id)) {
      return res.status(400).json({ error: "Invalid record id." });
    }
    try {
      const record = await Model.findByIdAndDelete(req.params.id);
      if (!record) return res.status(404).json({ error: `${resourceName} not found.` });
      return res.status(200).json({ message: `${resourceName} deleted successfully.` });
    } catch {
      return res.status(500).json({ error: `Unable to delete ${resourceName}.` });
    }
  },
});

export default createResourceController;
