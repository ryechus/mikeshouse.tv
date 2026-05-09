export const siteTitle = "Mike's House";

let tempBackendUrl = "http://localhost:8000";
let tempSiteUrl = "http://localhost:4321";

if (import.meta.env.MODE === "production") {
  tempBackendUrl = "https://api.mikeshouse.tv";
  tempSiteUrl = "https://mikeshouse.tv";
}

export const backendUrl = tempBackendUrl;
export const siteUrl = tempSiteUrl;
