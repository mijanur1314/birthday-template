# 💝 Romantic Interactive Birthday App

A highly interactive, cinematic, and deeply personalized React web application designed to be the ultimate digital birthday gift. 

This repository has been fully upgraded with an **In-App Setup Mode**. This means you (or your followers) no longer need to edit any code to customize the app! You can simply download the APK, install it on your phone, and a beautiful UI will ask you for your partner's name, custom photos, and love letters.

## ✨ How to Use the App (Instructions)

When you first open the app, you will be greeted with the **Setup Mode**. This is where you configure the gift before giving it to your partner. 

Here is what you can do in each section:

### 1. General & Pages Tab
- **Partner's Name:** Type your partner's name here. It will automatically update all the text in the app (like the intro screen, the envelope, and the final message).
- **Cake Age:** Type the age they are turning (e.g. 23). The 3D cake will magically generate the exact candles you typed!
- **Enable/Disable Pages:** Don't want to use the Quiz? Don't have a video message to upload? No problem! Just uncheck the boxes next to the pages you don't want, and the app will skip them entirely.

### 2. Letter Tab
- Write a personal, heartfelt love letter. When your partner reaches this page, the app will slowly type your letter out on the screen like a typewriter.

### 3. Photos Tab
- This controls the "Storybook" and the "Polaroid Wall".
- Tap the empty photo boxes to open your phone's camera roll and select your favorite couple pictures.
- You can write short captions for the storybook, and long emotional captions for the Polaroids!

### 4. Reasons Tab
- Upload tiny square photos and write short sentences explaining why you love them. These will appear as beautiful interactive flip-cards in the app.

---

## 🔒 Saving and Locking the Gift

Once you have filled out all your photos and text, scroll to the bottom of the Setup screen and click the pink **"Save & Lock Gift"** button.

**What happens next?**
1. The Setup Mode disappears forever so your partner can't see it.
2. The app reloads into the actual cinematic Gift Experience, featuring your photos and text!
3. You can now hand your phone to your partner to let them experience the gift.

### ⚠️ Oops! I made a mistake, how do I change a photo? (Secret Reset Button)
If you already clicked "Save & Lock Gift" but you need to go back and change a spelling mistake or swap a photo, **do not panic!**
- There is a **secret invisible button** in the app.
- Simply tap the **absolute bottom-right corner** of your phone screen.
- This will instantly reset the app and bring the Setup Mode back!

---

## 📤 Sending the Gift to Your Partner

Because this app works entirely offline, you can't just send the APK to your partner (otherwise they will see the Setup screen). There are two ways to give the gift:

**Method 1: The In-Person Method (Recommended)**
Install the app on your *own* phone, set everything up, click "Save & Lock", and then physically hand your phone to your partner to play with.

**Method 2: Send via WhatsApp (Midnight Surprise)**
1. On your phone, set up all the photos and letters.
2. At the bottom of the Setup screen, click the **"Export Gift File (.json)"** button. This downloads a tiny file to your phone containing all your photos.
3. WhatsApp your partner the APK and the `.json` file at 12:00 AM!
4. Tell them to install the APK, click the **"Load Gift File"** button on the first screen, and select the `.json` file you sent them. The app will instantly absorb the photos and unlock!

---

## 🔒 Privacy & Security (Is this safe?)

Because this is a 3rd party APK, your followers might be scared to install it or upload their private photos. You can copy/paste this message to reassure them:

> **Privacy Guarantee:** This app does **not** connect to the internet. There is no external database or server. Any photos you upload and any private letters you write **never leave your phone**. They are saved strictly to your device's offline local memory. The creator of this app cannot see your photos or data. It is 100% private and secure!

---

## 🚀 How to Share with Your Followers

If you are a creator sharing this with your followers, they do not need to use GitHub. 

**The absolute easiest way to share this app:**
1. Go to your GitHub **Actions** tab.
2. Click on the most recent successful build, scroll down to the **Artifacts** section, and download the `birthday-app-apk` file.
3. Unzip the file to get the `.apk`.
4. Upload that `.apk` to your **Google Drive** and set the sharing permissions to "Anyone with the link can view".
5. Put the Google Drive link in your Instagram or TikTok bio!

Now, your followers can just click the link in your bio, download the app directly to their Android phone, and use the **Setup Mode** to build a gift for their own partners!

---

_Made with ❤️ and React._
