# API Debugging Guide

This guide will help you check if the POST API is working correctly.

## How to Check if API is Working

### Method 1: Browser Console (Easiest)

1. **Open your browser's Developer Tools**
   - Press `F12` or `Ctrl+Shift+I` (Windows/Linux)
   - Press `Cmd+Option+I` (Mac)

2. **Go to the Console tab**

3. **Submit a form** (either the main form or modal popup)

4. **Look for these console logs:**
   - 🚀 `POST API Request` - Shows what data is being sent
   - 📡 `API Response Status` - Shows the HTTP status code
   - ✅ `API Success Response` - Shows successful API response
   - ❌ `API Error Response` - Shows any errors

### Method 2: Network Tab (Most Detailed)

1. **Open Developer Tools** (`F12`)

2. **Go to the Network tab**

3. **Filter by "XHR" or "Fetch"** to see API calls only

4. **Submit a form**

5. **Click on the request** named `request` (or similar)

6. **Check the following:**
   - **Status Code**: Should be `200` for success
   - **Request Payload**: Click "Payload" tab to see what data was sent
   - **Response**: Click "Response" tab to see what the API returned
   - **Headers**: Check request/response headers

### Method 3: Check Server Logs

If you have access to server logs, check for:
- Form submission logs
- API request logs
- Error logs

## What to Look For

### ✅ Success Indicators:
- Console shows: `✅ API Success Response`
- Network tab shows status `200 OK`
- Response contains expected data
- Success notification appears on screen

### ❌ Error Indicators:
- Console shows: `❌ API Request Failed` or `❌ API Error Response`
- Network tab shows status `4xx` or `5xx`
- Error notification appears on screen
- Check the error message for details

## Common Issues & Solutions

### Issue 1: CORS Error
**Symptom**: Console shows "CORS policy" error
**Solution**: API server needs to allow requests from your domain

### Issue 2: 404 Not Found
**Symptom**: Network tab shows `404`
**Solution**: Check if API URL is correct: `https://api.fynocrat.com/fynocrat/lead/request`

### Issue 3: 500 Internal Server Error
**Symptom**: Network tab shows `500`
**Solution**: Check API server logs, might be a server-side issue

### Issue 4: Network Error
**Symptom**: Console shows "Failed to fetch" or "NetworkError"
**Solution**: 
- Check internet connection
- Check if API server is running
- Check firewall/proxy settings

### Issue 5: Invalid Data Format
**Symptom**: API returns `400 Bad Request`
**Solution**: Check console logs for the request payload, verify data format matches API expectations

## Testing the API Directly

You can also test the API directly using curl or Postman:

```bash
curl -X POST https://api.fynocrat.com/fynocrat/lead/request \
  -H "Content-Type: application/json" \
  -d '{
    "name": "Test User",
    "email": "test@example.com",
    "phone": "+91 1234567890",
    "message": "Test message",
    "title": "## From Landing Page",
    "gcode": "test-recaptcha-token",
    "g-recaptcha-response": "test-recaptcha-token"
  }'
```

## Debug Mode

The code now includes comprehensive logging. All API calls will log:
- Request data being sent
- Response status and data
- Any errors that occur
- Form submission state changes

Check the browser console to see all these logs in real-time.

## Quick Test Checklist

- [ ] Open browser console (F12)
- [ ] Fill out and submit the form
- [ ] Check console for 🚀 POST API Request log
- [ ] Check console for 📡 API Response Status log
- [ ] Verify status code is 200
- [ ] Check if success notification appears
- [ ] If error, check error message in console

