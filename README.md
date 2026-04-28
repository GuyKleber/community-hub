# Welcome to your Lovable project

## Project info

**URL**: https://lovable.dev/projects/REPLACE_WITH_PROJECT_ID

## How can I edit this code?

There are several ways of editing your application.

**Use Lovable**

Simply visit the [Lovable Project](https://lovable.dev/projects/REPLACE_WITH_PROJECT_ID) and start prompting.

Changes made via Lovable will be committed automatically to this repo.

**Use your preferred IDE**

If you want to work locally using your own IDE, you can clone this repo and push changes. Pushed changes will also be reflected in Lovable.

The only requirement is having Node.js & npm installed - [install with nvm](https://github.com/nvm-sh/nvm#installing-and-updating)

Follow these steps:

```sh
# Step 1: Clone the repository using the project's Git URL.
git clone <YOUR_GIT_URL>

# Step 2: Navigate to the project directory.
cd <YOUR_PROJECT_NAME>

# Step 3: Install the necessary dependencies.
npm i

# Step 4: Start the development server with auto-reloading and an instant preview.
npm run dev
```

**Edit a file directly in GitHub**

- Navigate to the desired file(s).
- Click the "Edit" button (pencil icon) at the top right of the file view.
- Make your changes and commit the changes.

**Use GitHub Codespaces**

- Navigate to the main page of your repository.
- Click on the "Code" button (green button) near the top right.
- Select the "Codespaces" tab.
- Click on "New codespace" to launch a new Codespace environment.
- Edit files directly within the Codespace and commit and push your changes once you're done.

## What technologies are used for this project?

This project is built with:

- Vite
- TypeScript
- React
- shadcn-ui
- Tailwind CSS

## How can I deploy this project?

Simply open [Lovable](https://lovable.dev/projects/REPLACE_WITH_PROJECT_ID) and click on Share -> Publish.

## Firebase Hosting

This repo is configured to deploy the Vite build output in `dist/` to Firebase Hosting.

One-time setup:

```sh
npm install -g firebase-tools
firebase login
firebase use --add
```

When prompted by `firebase use --add`, select the Firebase project that should host this site. That command creates a local `.firebaserc` file with your project alias.

Local preview:

```sh
npm run build
npm run firebase:serve
```

Deploy:

```sh
npm run firebase:deploy
```

Because this is a React single-page app, `firebase.json` rewrites all routes to `index.html` so direct visits to nested pages keep working.

### Firestore-backed signups

The Taco Bar signup page stores entries in Cloud Firestore using the `tacoBarSignups` collection.

- `src/lib/firebase.ts` contains the Firebase web app setup.
- `firestore.rules` allows public reads and limited public creates for the signup collection.
- `firestore.indexes.json` is included so Firestore config can be deployed with the site.

To publish Firestore rules and indexes:

```sh
/Users/sasquatch/.nvm/versions/node/v24.13.0/bin/firebase deploy --only firestore
```

### GitHub auto-deploy

This repo also includes a GitHub Actions workflow at `.github/workflows/firebase-hosting.yml`.

- Pull requests create Firebase Hosting preview deployments.
- Pushes to `main` deploy to the live Hosting site.

Before the workflow can deploy, add this repository secret in GitHub:

- `FIREBASE_SERVICE_ACCOUNT_PCCWEBSITE4_28_EEA03`

The secret value should be the full JSON key for a Google service account that can deploy to the Firebase project `pccwebsite4-28-eea03`.

One common way to create that key is:

```sh
/Users/sasquatch/.nvm/versions/node/v24.13.0/bin/firebase init hosting:github
```

Or you can create a deploy service account key in Google Cloud / Firebase and paste the JSON into the GitHub repository secret manually.

## Can I connect a custom domain to my Lovable project?

Yes, you can!

To connect a domain, navigate to Project > Settings > Domains and click Connect Domain.

Read more here: [Setting up a custom domain](https://docs.lovable.dev/features/custom-domain#custom-domain)
