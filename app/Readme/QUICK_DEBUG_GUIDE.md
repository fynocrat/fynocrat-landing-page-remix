# Quick Debug Guide - How to Check if API is Working

## 🚀 Quick Start

### Step 1: Open Browser Console
- Press `F12` or `Ctrl+Shift+I` (Windows/Linux)
- Or `Cmd+Option+I` (Mac)

### Step 2: Submit a Form
Fill out and submit either:
- The main form on the banner
- The popup modal form

### Step 3: Check Console Logs
Look for these emoji indicators in the console:

- 🚀 **POST API Request** - Shows data being sent to API
- 📡 **API Response Status** - Shows HTTP status code
- ✅ **API Success Response** - API call succeeded
- ❌ **API Error Response** - API call failed

## 🔍 Visual Debug Panel

Press **`Ctrl+D`** (or `Cmd+D` on Mac) to toggle the debug panel.

The debug panel shows:
- Current form submission state
- Last API response
- Real-time API logs
- Error messages

## 📊 Network Tab Method

1. Open DevTools (`F12`)
2. Go to **Network** tab
3. Filter by **XHR** or **Fetch**
4. Submit the form
5. Click on the `request` entry
6. Check:
   - **Status**: Should be `200` for success
   - **Payload**: Data sent to API
   - **Response**: Data returned from API

## ✅ Success Indicators

- Console shows: `✅ API Success Response`
- Network status: `200 OK`
- Green success notification appears
- Debug panel shows "API call successful!"

## ❌ Error Indicators

- Console shows: `❌ API Request Failed`
- Network status: `4xx` or `5xx`
- Red error notification appears
- Check error message in console

## 🐛 Common Issues

| Issue | Status Code | Solution |
|-------|-------------|----------|
| CORS Error | - | API server needs to allow your domain |
| Not Found | 404 | Check API URL is correct |
| Server Error | 500 | Check API server logs |
| Network Error | - | Check internet/API server status |
| Bad Request | 400 | Check data format matches API requirements |

## 📝 What Gets Logged

The code automatically logs:
- ✅ Form data being submitted
- ✅ API request URL and payload
- ✅ API response status and data
- ✅ Any errors with full details
- ✅ Form submission state changes

All logs appear in the browser console with clear emoji indicators for easy identification.

