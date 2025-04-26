// Application configuration with environment variable handling

// Default values for configuration
const defaults = {
  // API timeouts in milliseconds
  apiTimeout: 30000,

  // Maximum retries for API calls
  maxRetries: 3,

  // Feature flags
  features: {
    analytics: true,
    aiChat: true,
    performanceMonitoring: true,
  },

  // Cache durations in seconds
  cache: {
    shortTerm: 60, // 1 minute
    mediumTerm: 300, // 5 minutes
    longTerm: 3600, // 1 hour
  },
}

// Environment-specific configuration
const environments = {
  development: {
    apiBaseUrl: "http://localhost:3000/api",
    logLevel: "debug",
  },
  production: {
    apiBaseUrl: "/api",
    logLevel: "error",
  },
  test: {
    apiBaseUrl: "http://localhost:3000/api",
    logLevel: "warn",
  },
}

// Get current environment
const environment = process.env.NODE_ENV || "development"

// Merge default config with environment-specific config
const config = {
  ...defaults,
  ...environments[environment as keyof typeof environments],

  // Environment variables
  analytics: {
    endpoint: process.env.NEXT_PUBLIC_ANALYTICS_ENDPOINT || "/api/analytics",
  },

  // App info
  appInfo: {
    name: "InnovateHub AI",
    version: "1.0.0",
  },
}

export default config
