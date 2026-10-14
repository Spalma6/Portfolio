import User from "../models/user.model.js";
import { validateFields, validateObjectId } from "../helpers/validation.js";
import generateToken from "../jwt.js";

const publicFields = "name email updatedDate createdDate";
const getUserInput = (body) => ({
  name: body.name,
  email: body.email,
  ...(body.password !== undefined && { password: body.password }),
});

const validateUser = (body, includePassword = true) => {
  const fields = includePassword ? ["name", "email", "password"] : ["name", "email"];
  return validateFields(body, fields);
};

const create = async (req, res) => {
  const errors = validateUser(req.body);
  if (errors) return res.status(400).json({ error: "Validation failed.", details: errors });
  try {
    const savedUser = await User.create(getUserInput(req.body));
    const token = generateToken(savedUser);

    return res.status(201).json({ user: savedUser, token });
  } catch (error) {
    return res.status(400).json({ error: "Validation failed.", details: [error.message] });
  }
};

const list = async (_req, res) => {
  try {
    return res.status(200).json(await User.find().select(publicFields).sort({ created: -1 }));
  } catch {
    return res.status(500).json({ error: "Unable to retrieve users." });
  }
};

const findById = async (id) => User.findById(id).select("+hashed_password");

const read = async (req, res) => {
  if (!validateObjectId(req.params.id)) return res.status(400).json({ error: "Invalid user id." });
  try {
    const user = await findById(req.params.id);
    if (!user) return res.status(404).json({ error: "User not found." });
    return res.status(200).json(user);
  } catch {
    return res.status(500).json({ error: "Unable to retrieve user." });
  }
};

const update = async (req, res) => {
  if (!validateObjectId(req.params.id)) return res.status(400).json({ error: "Invalid user id." });
  const errors = validateUser(req.body, false);
  if (errors) return res.status(400).json({ error: "Validation failed.", details: errors });
  try {
    const user = await findById(req.params.id);
    if (!user) return res.status(404).json({ error: "User not found." });
    user.name = req.body.name;
    user.email = req.body.email;
    if (req.body.password !== undefined) user.password = req.body.password;
    user.updated = Date.now();
    await user.save();
    return res.status(200).json(user);
  } catch (error) {
    return res.status(400).json({ error: "Validation failed.", details: [error.message] });
  }
};

const remove = async (req, res) => {
  if (!validateObjectId(req.params.id)) return res.status(400).json({ error: "Invalid user id." });
  try {
    const result = await User.findByIdAndDelete(req.params.id);
    if (!result) return res.status(404).json({ error: "User not found." });
    return res.status(200).json({ message: "User deleted successfully." });
  } catch {
    return res.status(500).json({ error: "Unable to delete user." });
  }
};

export default { create, list, read, update, remove };
