import Project from "../models/project.model.js";
import createResourceController from "./resource.controller.js";

export default createResourceController({
  Model: Project,
  fields: ["title", "type", "image", "role", "outcome"],
  resourceName: "Project",
});
