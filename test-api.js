// Test script to check if API is working
// Run this in browser console or Node.js

const testAPICall = async () => {
  const apiRequest = "https://api.fynocrat.com/fynocrat/lead/request";
  
  const testData = {
    name: "Test User",
    email: "test@example.com",
    phone: "+91 1234567890",
    message: "Test API call",
    title: "## From Landing Page",
    "g-recaptcha-response": "test-token",
    gcode: "test-token"
  };

  console.log("🧪 Testing API Call...");
  console.log("📤 Request URL:", apiRequest);
  console.log("📤 Request Data:", testData);

  try {
    const response = await fetch(apiRequest, {
      method: "POST",
      body: JSON.stringify(testData),
      headers: { "Content-Type": "application/json" },
    });

    console.log("📡 Response Status:", response.status, response.statusText);
    console.log("📡 Response OK:", response.ok);
    console.log("📡 Response Headers:", Object.fromEntries(response.headers.entries()));

    if (!response.ok) {
      const errorText = await response.text();
      console.error("❌ API Error Response:", errorText);
      return { success: false, status: response.status, error: errorText };
    }

    const data = await response.json();
    console.log("✅ API Success Response:", data);
    return { success: true, status: response.status, data };
  } catch (error) {
    console.error("❌ API Request Failed:", error);
    return { success: false, error: error.message };
  }
};

// Run test
if (typeof window !== "undefined") {
  // Browser environment
  window.testAPICall = testAPICall;
  console.log("💡 Run testAPICall() in console to test the API");
} else {
  // Node.js environment
  testAPICall().then(result => {
    console.log("\n📊 Test Result:", result);
    process.exit(result.success ? 0 : 1);
  });
}

