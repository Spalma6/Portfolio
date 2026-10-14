import Contact from "../models/contact.model.js";
import createResourceController from "./resource.controller.js";

export default createResourceController({
  Model: Contact,
  fields: ["firstName", "lastName", "phone", "email", "message"],
  resourceName: "Contact",
});
