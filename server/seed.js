import User from "./models/user.model.js";

const seedAdministrator = async (config) => {
  const { adminEmail, adminPasswordHash } = config;
  if (!adminEmail && !adminPasswordHash) {
    console.info("Administrator seed skipped: ADMIN_* variables are not configured.");
    return;
  }
  if (!adminEmail || !adminPasswordHash) {
    throw new Error("ADMIN_EMAIL and ADMIN_PASSWORD_HASH must be configured together.");
  }

  await User.updateOne(
    { email: adminEmail },
    {
      $set: {
        name: config.adminName || "Administrator",
        email: adminEmail,
        hashed_password: adminPasswordHash,
        salt: config.adminPasswordSalt,
        role: "admin",
      },
    },
    { upsert: true, runValidators: true },
  );
  console.info("Administrator account is ready.");
};

export default seedAdministrator;
