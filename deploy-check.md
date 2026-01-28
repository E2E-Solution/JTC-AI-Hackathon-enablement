# Deployment Troubleshooting Guide

## Quick Fix Steps:

1. **Verify your GitHub Pages URL structure:**
   - If your site is at: `https://zaf24.github.io/JTC-AI-Hackathon-enablement/`
   - Then base path should be: `/JTC-AI-Hackathon-enablement/` ✅ (already configured)

2. **Rebuild with correct configuration:**
   ```bash
   npm run build
   ```

3. **Check the dist folder:**
   - Open `dist/index.html`
   - Verify all script and link tags have the correct base path
   - Scripts should be like: `/JTC-AI-Hackathon-enablement/assets/...`

4. **Deploy the dist folder contents:**
   - Copy ALL contents from `dist` folder to your deployment branch
   - Make sure `index.html` is in the root of the deployment branch

5. **Clear browser cache:**
   - Hard refresh: Ctrl+Shift+R (Windows/Linux) or Cmd+Shift+R (Mac)
   - Or use incognito/private mode

## Common Issues:

### Blank White Page:
- **Cause**: JavaScript files not loading (404 errors)
- **Fix**: Check browser console (F12) for 404 errors
- **Solution**: Verify base path matches your GitHub Pages URL

### Image Not Showing:
- **Cause**: Image path not using base URL
- **Fix**: ✅ Already fixed - image now uses `${import.meta.env.BASE_URL}images/...`
- **Solution**: Rebuild the project

### Routes Not Working:
- **Cause**: React Router basename not matching base path
- **Fix**: ✅ Already configured - basename automatically uses BASE_URL
- **Solution**: Rebuild the project

## Verification:

After deploying, check:
1. Browser console (F12) - should have no errors
2. Network tab - all assets should load with 200 status
3. The URL should match: `https://zaf24.github.io/JTC-AI-Hackathon-enablement/`

## Assistant Backend Notes (Azure Container Apps)

- Configure the backend endpoint in the frontend build with `VITE_ASSISTANT_API_ENDPOINT`.
- The frontend sends a shared header `X-AGENT-KEY` for lightweight gating.
- Rate-limiting should be enforced server-side using an ACA environment variable (for example, `RATE_LIMIT_PER_MINUTE`) and applied in your backend service.
- Ensure `AI_PROJECT_ENDPOINT`, `AGENT_NAME`, and `AGENT_SHARED_KEY` are set in the Container Apps environment.
