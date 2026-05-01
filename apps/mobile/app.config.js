export default {
  expo: {
    name: 'Community Dictionary',
    slug: 'community-dictionary',
    version: '1.0.0',
    orientation: 'portrait',
    icon: './assets/icon.png',
    userInterfaceStyle: 'light',
    splash: {
      image: './assets/splash.png',
      resizeMode: 'contain',
      backgroundColor: '#0284c7',
    },
    assetBundlePatterns: ['**/*'],
    ios: {
      supportsTablet: true,
      bundleIdentifier: 'com.chenkham.communitydictionary',
    },
    android: {
      adaptiveIcon: {
        foregroundImage: './assets/adaptive-icon.png',
        backgroundColor: '#0284c7',
      },
      package: 'com.chenkham.communitydictionary',
      permissions: ['INTERNET'],
    },
    web: {
      favicon: './assets/favicon.png',
    },
    scheme: 'community-dictionary',
    plugins: ['expo-router'],
    extra: {
      apiUrl: 'http://10.230.209.73:3001',
      eas: {
        projectId: 'your-project-id-will-be-here'
      }
    },
  },
};
