export const siteTitle = "Mike's House";

let tempBackendUrl = "http://localhost:8000";
let tempSiteUrl = "http://localhost:4321";
let tempCategoryId = "IAOPOEWLDE2WVM6OBHC5TD2K";

if (import.meta.env.MODE === "production") {
  tempBackendUrl = "https://api.mikeshouse.tv";
  tempSiteUrl = "https://mikeshouse.tv";
  tempCategoryId = "STLTFX7BSIUQJOFYXEDHW5MA";
}

export const backendUrl = tempBackendUrl;
export const siteUrl = tempSiteUrl;
export const apparelCategoryId = tempCategoryId;
