export const validateObjectId = (id) => /^[a-f\d]{24}$/i.test(id);

export const requiredString = (field, value) => {
  if (typeof value !== "string" || !value.trim()) {
    return `${field} is required.`;
  }
  return null;
};

export const validateFields = (body = {}, fields) => {
  const errors = fields
    .map((field) => requiredString(field, body[field]))
    .filter(Boolean);
  return errors.length ? errors : null;
};
