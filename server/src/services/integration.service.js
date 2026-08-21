import { Integration } from "../models/index.js";
import { encrypt, decrypt } from "../utils/crypto.js";
import { NotFoundError, ForbiddenError } from "../utils/errors.js";

export async function createIntegration(userId, input) {
  const encryptedPayload = encrypt(JSON.stringify(input.credentials));
  
  const maskedPreview = {};
  if (input.credentials) {
    for (const key of Object.keys(input.credentials)) {
      const value = input.credentials[key];
      if (typeof value === "string" && value.length > 4) {
        maskedPreview[key] = value.slice(0, 2) + "*".repeat(value.length - 4) + value.slice(-2);
      } else if (typeof value === "string") {
        maskedPreview[key] = "*".repeat(value.length);
      } else {
        maskedPreview[key] = "[REDACTED]";
      }
    }
  }

  const integration = await Integration.findOneAndUpdate(
    { userId, category: input.category, provider: input.provider },
    {
      userId,
      category: input.category,
      provider: input.provider,
      encryptedPayload,
      maskedPreview,
      status: "active",
      lastValidatedAt: new Date(),
    },
    { upsert: true, new: true, setDefaultsOnInsert: true }
  );

  return integration;
}

export async function getIntegrations(userId) {
  return Integration.find({ userId }).lean();
}

export async function getIntegrationById(userId, integrationId) {
  const integration = await Integration.findOne({ _id: integrationId, userId }).lean();
  if (!integration) throw new NotFoundError("Integration not found");
  return integration;
}

export async function updateIntegration(userId, integrationId, input) {
  const update = { ...input };
  if (input.credentials) {
    update.encryptedPayload = encrypt(JSON.stringify(input.credentials));
    update.lastValidatedAt = new Date();
    
    const maskedPreview = {};
    for (const key of Object.keys(input.credentials)) {
      const value = input.credentials[key];
      if (typeof value === "string" && value.length > 4) {
        maskedPreview[key] = value.slice(0, 2) + "*".repeat(value.length - 4) + value.slice(-2);
      } else if (typeof value === "string") {
        maskedPreview[key] = "*".repeat(value.length);
      } else {
        maskedPreview[key] = "[REDACTED]";
      }
    }
    update.maskedPreview = maskedPreview;
    delete update.credentials;
  }
  
  const integration = await Integration.findOneAndUpdate(
    { _id: integrationId, userId },
    update,
    { new: true }
  );
  if (!integration) throw new NotFoundError("Integration not found");
  return integration;
}

export async function deleteIntegration(userId, integrationId) {
  const integration = await Integration.findOneAndDelete({ _id: integrationId, userId });
  if (!integration) throw new NotFoundError("Integration not found");
  return { success: true };
}

export async function validateIntegration(userId, integrationId) {
  const integration = await Integration.findOne({ _id: integrationId, userId });
  if (!integration) throw new NotFoundError("Integration not found");
  
  try {
    const credentials = JSON.parse(decrypt(integration.encryptedPayload));
    integration.status = "active";
    integration.lastValidatedAt = new Date();
    await integration.save();
    return { valid: true, provider: integration.provider };
  } catch (err) {
    integration.status = "invalid";
    await integration.save();
    return { valid: false, error: err.message };
  }
}

export async function getDecryptedCredentials(userId, integrationId) {
  const integration = await Integration.findOne({ _id: integrationId, userId });
  if (!integration) throw new NotFoundError("Integration not found");
  if (integration.status !== "active") throw new ForbiddenError("Integration is not active");
  
  return JSON.parse(decrypt(integration.encryptedPayload));
}
