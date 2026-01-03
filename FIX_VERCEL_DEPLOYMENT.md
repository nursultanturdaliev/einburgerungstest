# Fix Vercel Deployment Error

## Problem
Error: `The file "/vercel/path0/out/routes-manifest.json" couldn't be found`

## Solution

The Vercel project has an **Output Directory** setting that needs to be removed.

### Option 1: Via Vercel Dashboard (Recommended)

1. Go to: https://vercel.com/nursultans-projects-2aa96e3a/einburgerungstest/settings
2. Navigate to **Settings** > **General** > **Build & Development Settings**
3. Find **Output Directory** field
4. **Clear/Delete** the `out` value (leave it empty)
5. **Save** the changes
6. Go to **Deployments** tab and click **Redeploy** on the latest deployment

### Option 2: Via Vercel CLI

```bash
# Update project settings
vercel project update einburgerungstest

# Or redeploy after clearing settings in dashboard
vercel --prod
```

### Option 3: Delete and Recreate Project

If the above doesn't work:

1. Delete the project in Vercel dashboard
2. Run: `vercel --prod`
3. Follow prompts to create a new project

## Why This Happens

When `output: "export"` was in `next.config.ts`, Vercel detected it and set Output Directory to `out`. After removing static export, Vercel still has this cached setting, causing the error.

## Current Configuration

- ✅ `next.config.ts`: No static export (correct for Vercel)
- ✅ `vercel.json`: Removed (Vercel auto-detects Next.js)
- ❌ Vercel Dashboard: Still has Output Directory = `out` (needs to be cleared)

## After Fixing

Once Output Directory is cleared, deployments should work correctly with Next.js serverless functions.

