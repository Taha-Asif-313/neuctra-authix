// Global SDK config (singleton)
interface SdkConfig {
  baseUrl: string;
  apiKey: string;
  appId: string;
}

const sdkConfig: SdkConfig = {
  baseUrl: "",
  apiKey: "",
  appId: "",
};

/**
 * Set SDK configuration once
 * @param config - { baseUrl, apiKey, appId }
 */
export const setSdkConfig = (config: Partial<SdkConfig>) => {
  if (!config.baseUrl || !config.apiKey || !config.appId) {
    throw new Error("baseUrl, apiKey, and appId are required");
  }
  sdkConfig.baseUrl = config.baseUrl;
  sdkConfig.apiKey = config.apiKey;
  sdkConfig.appId = config.appId;
};

/**
 * Get the global SDK config
 */
export const getSdkConfig = (): SdkConfig => sdkConfig;
