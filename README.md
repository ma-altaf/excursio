# Excursio

Excursion planning and management.

https://github.com/user-attachments/assets/558cba68-67bf-4fef-bdb2-42ead64b76c8

## Main features:

- **Location suggestions & voting:** allow members to suggest their desired locations to go to and voting to choose the most popular option. [time: 1:40]

- **Time availability table:** facilitate and streamline communication of time availability within members of the excursion. time: 2:48]

- **Contributions:** members can state contribution to the items that is of interest for the excursion. [time: 4:00]

## Library used

- NextJS
- TailwindCSS
- Firebase (Firestore, Storage, Auth)
- React-icons

## Run Locally

Requirements:

- Nodejs

Steps:

1. Open a terminal that can run npm at the root folder (check for npm `npm -v`).
2. Run: `npm i` to install the required node packages.
3. Got to https://console.firebase.google.com/ create a new project.
4. In the top left corner click on the settings icon > project settings.
5. In general scroll down and click on the Web icon </>, fill in the form keep the default options.
6. Modify env.example as described in the file (for api keys follow step 4 and 5 and within code sample within firebaseConfig).
7. For CLIENT_EMAIL and PRIVATE_KEY go to settings icon > project settings > service accounts click on Generate new private key, open the downloaded file and copy the required keys.
8. In firebase console, in the side panel, Build > Firestore Database then click on Create database.
9. Copy the rules in firestore.rules into the Rules and click Publish.
10. In firebase console, in the side panel, Build > Authentication then click on Get Started.
11. In the under Sign-in method:
12. Enable Email/Password
13. Click on Add new provider, enable Google
14. Click on Add new provider, enable Anonymous
15. Run `npm run dev` to run it in dev mode

    or `npm run build && npm run start` to build and start in prod mode.

16. Click on the link in the terminal to open the page in your browser.
17. Create your account and click on 'Go to user page', in your console (shortcut <kbd>ctrl</kbd> + <kbd>shift</kbd> + <kbd>j</kbd>), click on the link within the console log `FirebaseError: The query requires an index. You can create it here: link` and save the index.

18. To get user profile pictures, need to enable storage bucket, which requries upgrading the project to Blaze.
    or use the firebase emulator for free.
19. To use the emulator in .env file set NEXT_PUBLIC_ENV_TYPE to emulator.
20. Using fireabase cli in the terminal (`npm install -g firebase-tools`), log in with the same account used within firebase console.
21. Then run `firebase init`, choosing the options:
    1. Firestore
    2. Storage
    3. Emulators
22. Use the default settings, then after setting up, run `firebase emulators:start`.
