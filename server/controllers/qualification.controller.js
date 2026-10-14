import Qualification from "../models/qualification.model.js";
import createResourceController from "./resource.controller.js";

export default createResourceController({
  Model: Qualification,
  fields: ["title", "completionDate", "description"],
  resourceName: "Qualification",
});
