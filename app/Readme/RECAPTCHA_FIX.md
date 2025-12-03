# reCAPTCHA Verification Fix

## Problem
You were getting this error:
```
API Error (422): {"detail":"reCAPTCHA verification failed"}
```

## Root Causes Identified

1. **Token Expiration**: reCAPTCHA tokens expire after ~2 minutes. If user takes too long to fill form, token becomes invalid.
2. **Token Not Captured**: Token might not be properly captured at submission time.
3. **Token Format**: API might need token in specific format or field name.

## Fixes Applied

### 1. Enhanced Token Capture
- Added refs to ReCAPTCHA components to get latest token value
- Added `onSubmit` handler to ensure latest token is captured before submission
- Added token validation before API call

### 2. Better Error Handling
- Check for token presence before API call
- Clear error messages for reCAPTCHA failures
- Auto-reset reCAPTCHA on error so user can try again

### 3. Token Expiration Handling
- Added `onExpired` callback to detect when token expires
- Reset form state when token expires
- Warn user if token expired

### 4. Debug Logging
- Added console logs to track token at each step:
  - When token is received
  - When form is submitted
  - When API call is made
  - Token presence verification

## How to Test

1. **Open browser console** (`F12`)
2. **Fill out the form**
3. **Complete reCAPTCHA** - Watch for: `🔐 reCAPTCHA Token Received: Token present`
4. **Submit form** - Watch for: `🔐 Form Submit - Using reCAPTCHA Token: Present (...)`
5. **Check API call** - Watch for: `🔐 reCAPTCHA Token in API Call: Present (...)`

## What to Check

### If Still Getting 422 Error:

1. **Check Console Logs**:
   - Is token being received? Look for `🔐 reCAPTCHA Token Received`
   - Is token present at submission? Look for `🔐 Form Submit - Using reCAPTCHA Token`
   - Is token sent to API? Look for `🔐 reCAPTCHA Token in API Call`

2. **Check reCAPTCHA Site Key**:
   - Verify `VITE_RECAPTCHA_SITE_KEY` environment variable is set
   - Or check if default key is correct: `6LchBXApAAAAAKt8aDadaFGsLiKb44OsRpOPdcJb`

3. **Check Token Expiration**:
   - Don't wait too long after completing reCAPTCHA
   - If token expires, you'll see: `⚠️ reCAPTCHA token expired`
   - Form will reset - complete reCAPTCHA again

4. **Check API Requirements**:
   - Verify API expects token in `g-recaptcha-response` field
   - Verify API expects token in `gcode` field (we send both)
   - Check if API needs token in different format

## Additional Debugging

If the issue persists, check:

1. **Network Tab**:
   - Open DevTools → Network tab
   - Submit form
   - Check request payload - is `g-recaptcha-response` present?
   - Check response - what exact error message?

2. **reCAPTCHA Configuration**:
   - Is reCAPTCHA site key correct?
   - Is reCAPTCHA domain whitelisted?
   - Is reCAPTCHA v2 or v3? (We're using v2)

3. **API Server**:
   - Check API server logs
   - Verify API is validating reCAPTCHA correctly
   - Check if API needs secret key verification

## Expected Behavior

✅ **Success Flow**:
1. User completes reCAPTCHA → Token received
2. User fills form → Token stored
3. User submits → Latest token captured
4. API called → Token sent in request
5. API validates → Returns success

❌ **Error Flow**:
1. Token missing → Form won't submit (client-side check)
2. Token expired → Warning shown, reCAPTCHA resets
3. API rejects → Error notification, reCAPTCHA resets

## Next Steps

If you're still getting the error:

1. Check the console logs to see where token is lost
2. Verify the reCAPTCHA site key matches your API's expected key
3. Check if API needs the token verified server-side with secret key
4. Test with a fresh reCAPTCHA token (complete it right before submitting)

The code now has comprehensive logging - check the console to see exactly what's happening with the reCAPTCHA token at each step!

