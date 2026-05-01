# Building Production APK

## Prerequisites

1. **Install EAS CLI**
```bash
npm install -g eas-cli
```

2. **Create Expo Account** (Free)
- Go to https://expo.dev
- Sign up for free account

## Build Steps

### Step 1: Login to EAS
```bash
cd apps/mobile
eas login
```

### Step 2: Configure Project
```bash
eas build:configure
```
This will:
- Link your project to Expo
- Generate a project ID
- Update app.config.js

### Step 3: Build APK
```bash
eas build --platform android --profile production
```

This will:
- Build your app in the cloud (takes 10-15 minutes)
- Generate an APK file
- Give you a download link

### Step 4: Download APK
- EAS will provide a download link
- Download the APK to your phone
- Install it (enable "Install from Unknown Sources")

## Alternative: Local Build (Faster)

If you want to build locally without waiting:

```bash
# Build locally
eas build --platform android --profile production --local
```

Requirements for local build:
- Android Studio installed
- Java JDK installed
- More setup required

## Quick Build (Preview)

For testing, use preview build (faster):

```bash
eas build --platform android --profile preview
```

## What You Get

After building, you'll have:
- **APK file** - Install directly on any Android device
- **No Expo Go needed** - Standalone app
- **Production ready** - Can be uploaded to Play Store

## Build Profiles

We have 3 profiles in `eas.json`:

1. **development** - For development with Expo Go
2. **preview** - Quick APK for testing (recommended for now)
3. **production** - Final APK for Play Store

## Recommended: Start with Preview

```bash
eas build --platform android --profile preview
```

This is:
- ✅ Faster to build
- ✅ Creates APK you can install
- ✅ No Expo Go needed
- ✅ Perfect for testing

## After Building

1. Download APK from the link EAS provides
2. Transfer to your phone (or download directly)
3. Enable "Install from Unknown Sources" in Android settings
4. Install the APK
5. Open the app - it works like any normal app!

## Cost

- **EAS Build**: FREE (limited builds per month)
- **More builds**: Paid plans available
- **Alternative**: Build locally (free, unlimited)

## Need Help?

If you get stuck:
1. Check https://docs.expo.dev/build/setup/
2. Run `eas build --help`
3. Check build logs in Expo dashboard
