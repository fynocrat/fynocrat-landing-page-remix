# How to Check if API is Working

## ✅ Quick Test Methods

### Method 1: Browser Console Test (Fastest)

1. **Open your app in browser**
2. **Press `F12`** to open Developer Tools
3. **Go to Console tab**
4. **Type and run:**
   ```javascript
   testAPICall()
   ```
5. **Check the output:**
   - ✅ `API Success Response` = API is working
   - ❌ `API Error Response` = API has issues

### Method 2: Submit a Form

1. **Open browser console** (`F12`)
2. **Fill out and submit the form** (main form or modal)
3. **Watch the console logs:**
   - Look for `🚀 POST API Request` - shows data being sent
   - Look for `📡 API Response Status` - shows HTTP status
   - Look for `✅ API Success Response` - API worked!
   - Look for `❌ API Error Response` - API failed

### Method 3: Network Tab (Most Detailed)

1. **Open DevTools** (`F12`)
2. **Go to Network tab**
3. **Filter by "XHR" or "Fetch"**
4. **Submit the form**
5. **Click on the request** (usually named `request` or similar)
6. **Check:**
   - **Status Code**: `200` = Success, `4xx/5xx` = Error
   - **Request Payload**: See what data was sent
   - **Response**: See what API returned

### Method 4: Visual Debug Panel

1. **Press `Ctrl+D`** (or `Cmd+D` on Mac) to open debug panel
2. **Submit a form**
3. **Watch the debug panel** for real-time logs and responses

## 🔍 What to Look For

### ✅ Success Indicators:
- Console: `✅ API Success Response`
- Network: Status `200 OK`
- Response contains expected data
- Green success notification appears
- Form shows success message

### ❌ Error Indicators:
- Console: `❌ API Request Failed` or `❌ API Error Response`
- Network: Status `4xx` or `5xx`
- Red error notification appears
- Error message in console/notification

## 🐛 Common Issues & Solutions

| Issue | Status Code | What It Means | Solution |
|-------|-------------|---------------|----------|
| **CORS Error** | - | Browser blocking request | API server needs CORS headers |
| **404 Not Found** | 404 | API endpoint doesn't exist | Check API URL is correct |
| **500 Server Error** | 500 | Server-side problem | Check API server logs |
| **400 Bad Request** | 400 | Invalid data format | Check request payload format |
| **Network Error** | - | Can't reach server | Check internet/API server status |

## 📊 Expected API Request Format

The API should receive:
```json
{
  "name": "User Name",
  "email": "user@example.com",
  "phone": "+91 1234567890",
  "message": "User message",
  "title": "## From Landing Page",
  "g-recaptcha-response": "recaptcha-token",
  "gcode": "recaptcha-token"
}
```

## 🧪 Test API Directly

You can test the API directly using curl:

```bash
curl -X POST https://api.fynocrat.com/fynocrat/lead/request \
  -H "Content-Type: application/json" \
  -d '{
    "name": "Test User",
    "email": "test@example.com",
    "phone": "+91 1234567890",
    "message": "Test message",
    "title": "## From Landing Page",
    "gcode": "test-token",
    "g-recaptcha-response": "test-token"
  }'
```

## ✅ Verification Checklist

- [ ] Console shows `🚀 POST API Request` when form is submitted
- [ ] Network tab shows POST request to `https://api.fynocrat.com/fynocrat/lead/request`
- [ ] Request payload contains all form fields
- [ ] Response status is `200` (or expected success code)
- [ ] Response contains expected data structure
- [ ] Success notification appears on screen
- [ ] No CORS errors in console
- [ ] No network errors in console

## 🚨 If API is Not Working

1. **Check Console** for error messages
2. **Check Network Tab** for failed requests
3. **Verify API URL** is correct: `https://api.fynocrat.com/fynocrat/lead/request`
4. **Check API Server** is running and accessible
5. **Verify CORS** settings on API server
6. **Check Request Format** matches API expectations
7. **Test API directly** using curl or Postman

## 💡 Pro Tips

- Keep console open while testing
- Use Network tab to see exact request/response
- Check both browser console and server logs
- Test with different form data to isolate issues
- Use the debug panel (`Ctrl+D`) for real-time monitoring

