# NutriSense - AI Food & Health App

## IDEATHON / PROJECT SUBMISSION SUMMARY:
✅ **Designed a UI in Stitch using Gemini 3**: NutriSense screens and aesthetic tokens were planned out and generated dynamically using the Stitch AI UI agent (Project `2783561950773587278`).
✅ **Generated a secure API Key and configured Antigravity MCP**: Successfully paired the Google DeepMind Antigravity framework utilizing the Stitch MCP to connect our environment securely with external state.
✅ **Used an autonomous agent to build and verify a React + Tailwind site**: Leveraged the Antigravity assistant system with Vite, React Router, Framer Motion, and Tailwind CSS v4 to autonomously construct, lint, test, and render the Glassmorphism application front-to-back.

## Project Details
NutriSense is a smart daily food logging and goal tracking dashboard, built with React, Tailwind CSS, Node.js, and Express.

## Run Locally

1. Setup Backend:
   ```bash
   npm install
   ```
2. Setup Frontend & Build:
   ```bash
   cd frontend
   npm install
   npm run build
   cd ..
   ```
3. Run the Node server:
   ```bash
   node server.js
   ```
   Navigate to `http://localhost:8080` in your browser.

## Google Cloud Run Deployment

NutriSense is containerized using Docker and is ready for Google Cloud Run (Serverless).

### Prerequisites
- Install the [Google Cloud CLI (`gcloud`)](https://cloud.google.com/sdk/docs/install).
- Create a Free Tier Google Cloud Project.
- Enable the Cloud Run API, Cloud Build API, and Container Registry API.

### Deployment Instructions

1. **Authenticate to Google Cloud:**
   ```bash
   gcloud auth login
   gcloud config set project [YOUR_PROJECT_ID]
   ```

2. **Deploy via Cloud Run (Auto-build):**
   You can let Cloud Run automatically build and deploy from source using:
   ```bash
   gcloud run deploy nutrisense --source . --region us-central1 --allow-unauthenticated
   ```

3. **(Optional) Deploy using Cloud Build:**
   If you have Cloud Build triggers set up, you can submit the build manually using the `cloudbuild.yaml` file:
   ```bash
   gcloud builds submit --config cloudbuild.yaml .
   ```

### Database Usage
By default, the server runs completely stateless. To enable persistent user data, set up a MongoDB cluster (e.g., MongoDB Atlas Free Tier) and pass the URI to Cloud Run as an environment variable:
```bash
gcloud run deploy nutrisense --source . --set-env-vars="MONGODB_URI=your_mongo_connection_string"
```
