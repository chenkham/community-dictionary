# Production Setup - Quick Start

## What You're Building

A **standalone Android APK** that:
- ✅ Works without Expo Go
- ✅ Can be installed on any Android phone
- ✅ Works like a normal app
- ✅ Can be uploaded to Play Store later

## Quick Start (3 Commands)

```bash
# 1. Install EAS CLI globally
npm install -g eas-cli

# 2. Login (create free account if needed)
cd apps/mobile
eas login

# 3. Build APK
eas build --platform android --profile preview
```

That's it! Wait 10-15 minutes and you'll get a download link for your APK.

## Detailed Steps

### Step 1: Install EAS CLI

```bash
npm install -g eas-cli
```

### Step 2: Create Expo Account

Go to https://expo.dev and sign up (free).

### Step 3: Login

```bash
cd apps/mobile
eas login
```

Enter your Expo credentials.

### Step 4: Build

```bash
eas build --platform android --profile preview
```

You'll be asked:
- "Generate a new Android Keystore?" → **Yes**
- Wait for build to complete (10-15 minutes)

### Step 5: Download & Install

1. EAS will give you a download link
2. Download APK on your phone (or transfer it)
3. Install the APK
4. Open the app!

## What Happens During Build

1. **Cloud Build**: Expo builds your app in the cloud
2. **Keystore**: Creates signing keys for your app
3. **APK Generation**: Creates installable APK file
4. **Download Link**: Provides link to download

## Build Profiles Explained

### Preview (Recommended for Now)
```bash
eas build --platform android --profile preview
```
- ✅ Fast build
- ✅ Creates APK
- ✅ Perfect for testing
- ✅ Can install on any device

### Production (For Play Store)
```bash
eas build --platform android --profile production
```
- For final release
- Optimized build
- Ready for Play Store

## After You Have the APK

### Install on Your Phone

1. **Download APK** to your phone
2. **Enable Unknown Sources**:
   - Settings → Security
   - Enable "Install from Unknown Sources"
3. **Install APK**:
   - Open the APK file
   - Tap "Install"
4. **Open App**:
   - Find "Community Dictionary" in your apps
   - Open and use!

### Share with Others

- Send the APK file to anyone
- They can install it the same way
- No Expo Go needed!

### Upload to Play Store (Optional)

Later, you can:
1. Create Google Play Developer account ($25)
2. Upload the APK
3. Publish to Play Store
4. Users download from Play Store

## Troubleshooting

### "eas: command not found"
```bash
npm install -g eas-cli
```

### "Not logged in"
```bash
eas login
```

### Build Failed
- Check build logs in Expo dashboard
- Make sure all dependencies are installed
- Try again (sometimes network issues)

### Can't Install APK
- Enable "Install from Unknown Sources"
- Make sure APK downloaded completely
- Try transferring via USB if download fails

## Cost

- **EAS Build**: FREE tier includes builds
- **Expo Account**: FREE
- **Play Store**: $25 one-time (only if publishing)

## Current Configuration

Your app is configured to:
- Connect to API at `10.230.209.73:3001`
- Work on your local network
- For production, you'll need to deploy API to a public server

## Next Steps

1. Build the APK (follow steps above)
2. Test on your phone
3. Share with others for testing
4. Later: Deploy API to production server
5. Later: Update app to use production API
6. Later: Publish to Play Store

## Need Help?

- Expo Docs: https://docs.expo.dev/build/setup/
- EAS Build: https://docs.expo.dev/build/introduction/
- Discord: https://chat.expo.dev/
