# Netlify Deployment Guide

This guide will help you deploy the WhatsApp Pharmacy Bot to Netlify.

## Prerequisites

- A Netlify account (sign up at https://netlify.com)
- Your OpenAI API key
- Git repository (GitHub, GitLab, or Bitbucket)

## Step 1: Prepare Your Repository

1. Make sure all your changes are committed to git
2. Push your code to GitHub/GitLab/Bitbucket
3. Ensure `.env` is in `.gitignore` (already configured)

```bash
git add .
git commit -m "Prepare for Netlify deployment"
git push origin main
```

## Step 2: Deploy to Netlify

### Option A: Deploy via Netlify Dashboard (Recommended)

1. Go to https://app.netlify.com
2. Click "Add new site" > "Import an existing project"
3. Choose your Git provider (GitHub/GitLab/Bitbucket)
4. Select your repository
5. Configure build settings:
   - **Build command:** `echo 'Static site - no build needed'`
   - **Publish directory:** `.` (root directory)
   - **Functions directory:** `netlify/functions`
6. Click "Deploy site"

### Option B: Deploy via Netlify CLI

```bash
# Install Netlify CLI
npm install -g netlify-cli

# Login to Netlify
netlify login

# Initialize and deploy
netlify init

# Follow the prompts to link to a new site or existing site
```

## Step 3: Configure Environment Variables

After deployment, you need to add your OpenAI API key:

1. Go to your site in Netlify Dashboard
2. Click "Site configuration" > "Environment variables"
3. Click "Add a variable"
4. Add:
   - **Key:** `OPENAI_API_KEY`
   - **Value:** Your OpenAI API key
5. Click "Save"
6. Redeploy your site (Deploys > Trigger deploy > Deploy site)

## Step 4: Test Your Deployment

1. Wait for the deployment to complete
2. Visit your Netlify URL (e.g., `https://your-site-name.netlify.app`)
3. Test the chatbot by asking questions
4. Check the health endpoint: `https://your-site-name.netlify.app/api/health`

## Custom Domain (Optional)

To use a custom domain:

1. Go to "Domain settings" in Netlify Dashboard
2. Click "Add custom domain"
3. Follow the instructions to configure DNS

## Troubleshooting

### API not working
- Check that `OPENAI_API_KEY` is set in environment variables
- Verify the key is valid at https://platform.openai.com/api-keys
- Check function logs in Netlify Dashboard under "Functions"

### Products not showing
- Clear browser cache
- Check browser console for errors
- Verify API responses in Network tab

### Build fails
- Check build logs in Netlify Dashboard
- Ensure all dependencies are in package.json
- Verify node version compatibility

## Local Development

To run locally:

```bash
# Install dependencies
npm install

# Create .env file from example
cp .env.example .env

# Add your OpenAI API key to .env

# Run development server
npm start
```

## Support

For issues or questions:
- Check Netlify documentation: https://docs.netlify.com
- OpenAI API docs: https://platform.openai.com/docs
