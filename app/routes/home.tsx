// app/routes/home.tsx
import React, { useEffect, useState, useCallback, useRef } from "react";
import { Modal } from "@mantine/core";
import {
  Box,
  Paper,
  Text,
  Image,
  Title,
  Container,
  Stack,
  Button,
  TextInput,
  Textarea,
  Space,
  SimpleGrid,
  Card,
  Group,
} from "@mantine/core";
import { useMediaQuery } from "@mantine/hooks";
import ReCAPTCHA from "react-google-recaptcha";
import { IconBrandWhatsapp } from "@tabler/icons-react";
import { useFetcher } from "react-router";
import { showNotification } from "@mantine/notifications";

type Props = {
  setFormOpen: (open: boolean) => void;
};

const IconTrendingUp = (props: { size?: number }) => (
  <svg
    width={props.size ?? 48}
    height={props.size ?? 48}
    viewBox="0 0 24 24"
    fill="none"
    aria-hidden
  >
    <path
      d="M3 17l6-6 4 4 8-8"
      stroke="#0f172a"
      strokeWidth="1.6"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <path
      d="M21 21v-4h-4"
      stroke="#0f172a"
      strokeWidth="1.6"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);

const IconArrowBounce = (props: { size?: number }) => (
  <svg
    width={props.size ?? 48}
    height={props.size ?? 48}
    viewBox="0 0 24 24"
    fill="none"
    aria-hidden
  >
    <path
      d="M3 12h6l2-3 4 6 6-9"
      stroke="#0f172a"
      strokeWidth="1.6"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <path
      d="M21 21a3 3 0 0 0-3-3"
      stroke="#0f172a"
      strokeWidth="1.6"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);

const IconZap = (props: { size?: number }) => (
  <svg
    width={props.size ?? 48}
    height={props.size ?? 48}
    viewBox="0 0 24 24"
    fill="none"
    aria-hidden
  >
    <path
      d="M13 2L3 14h7l-1 8 10-12h-7l1-8z"
      stroke="#0f172a"
      strokeWidth="1.6"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);

const IconRocket = (props: { size?: number }) => (
  <svg
    width={props.size ?? 48}
    height={props.size ?? 48}
    viewBox="0 0 24 24"
    fill="none"
    aria-hidden
  >
    <path
      d="M12 2s-4 4-7 7c-1.5 1.5-3 6-3 6s4-1.2 5.5-2.7C11 11 17 7 17 7s-1.8-1.6-5-5z"
      stroke="#0f172a"
      strokeWidth="1.6"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <path
      d="M7 17s-1 3 3 3 3-3 3-3"
      stroke="#0f172a"
      strokeWidth="1.6"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);

const IconShieldCheck = (props: { size?: number }) => (
  <svg
    width={props.size ?? 48}
    height={props.size ?? 48}
    viewBox="0 0 24 24"
    fill="none"
    aria-hidden
  >
    <path
      d="M12 2l7 3v5c0 5-3.5 9-7 11-3.5-2-7-6-7-11V5l7-3z"
      stroke="#0f172a"
      strokeWidth="1.6"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <path
      d="M9.5 12.5l1.8 1.8L15 10"
      stroke="#0f172a"
      strokeWidth="1.6"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);

const IconDiamond = (props: { size?: number }) => (
  <svg
    width={props.size ?? 48}
    height={props.size ?? 48}
    viewBox="0 0 24 24"
    fill="none"
    aria-hidden
  >
    <path
      d="M3 9l9-6 9 6-4 10H7L3 9z"
      stroke="#0f172a"
      strokeWidth="1.6"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <path
      d="M7 9l5 6 5-6"
      stroke="#0f172a"
      strokeWidth="1.6"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);
import { json } from "@remix-run/node";

const createEmail = async (data: Record<string, any>) => {
  const apiRequest = "https://api.fynocrat.com/fynocrat/lead/request";

  // Normalize field names - handle both main form and popup form fields
  const recaptchaToken = data["g-recaptcha-response"] || "";
  
  if (!recaptchaToken) {
    throw new Error("reCAPTCHA token is required");
  }

  const normalizedData: Record<string, any> = {
    name: data.name || data.popup_name || "",
    email: data.email || data.popup_email || "",
    phone: data.phone || data.popup_phone || "",
    message: data.message || data.popup_message || "",
    "g-recaptcha-response": recaptchaToken,
  };

  normalizedData["title"] = "## From Landing Page";
  normalizedData["gcode"] = recaptchaToken;
  
  // Debug: Verify reCAPTCHA token is present
  console.log("🔐 reCAPTCHA Token in API Call:", recaptchaToken ? `Present (${recaptchaToken.substring(0, 20)}...)` : "MISSING!");

  // Debug: Log the request data
  console.log("🚀 POST API Request:", {
    url: apiRequest,
    method: "POST",
    data: normalizedData,
    timestamp: new Date().toISOString(),
  });

  try {
    const response = await fetch(apiRequest, {
      method: "POST",
      body: JSON.stringify(normalizedData),
      headers: { "Content-Type": "application/json" },
    });

    // Debug: Log response status
    console.log("📡 API Response Status:", {
      status: response.status,
      statusText: response.statusText,
      ok: response.ok,
      headers: Object.fromEntries(response.headers.entries()),
    });

    if (!response.ok) {
      // Try to get error message from response
      let errorMessage = `API request failed with status ${response.status}`;
      try {
        const errorData = await response.text();
        console.error("❌ API Error Response:", errorData);
        errorMessage = `API Error (${response.status}): ${errorData || response.statusText}`;
      } catch (e) {
        console.error("❌ Failed to parse error response:", e);
      }
      throw new Error(errorMessage);
    }

    const res = await response.json();
    console.log("✅ API Success Response:", res);
    return res;
  } catch (error: any) {
    // Enhanced error logging
    console.error("❌ API Request Failed:", {
      error: error.message,
      stack: error.stack,
      url: apiRequest,
      data: normalizedData,
    });
    throw error;
  }
};

export const action = async ({ request }: { request: Request }) => {
  const formData = await request.formData();
  const formDataObj = Object.fromEntries(formData);
  
  // Debug: Log form submission
  console.log("📝 Form Submitted:", {
    formData: formDataObj,
    timestamp: new Date().toISOString(),
  });

  // Verify reCAPTCHA token is present
  const recaptchaToken = formDataObj["g-recaptcha-response"];
  if (!recaptchaToken || recaptchaToken === "") {
    console.error("❌ reCAPTCHA token is missing!");
    return json(
      {
        status: 400,
        success: false,
        message: "Please complete the reCAPTCHA verification.",
        error: "reCAPTCHA token missing",
      },
      { status: 400 }
    );
  }

  console.log("🔐 reCAPTCHA Token Present:", recaptchaToken ? "Yes" : "No");

  try {
    const res = await createEmail(formDataObj);
    console.log("✅ Action Success - API Response:", res);
    return json({
      status: 200,
      success: true,
      message:
        "Your request has been received successfully. Our team will contact you soon.",
      apiResponse: res, // Include API response for debugging
    });
  } catch (error: any) {
    console.error("❌ Action Error - POST API Failed:", {
      error: error.message,
      errorType: error.constructor.name,
      stack: error.stack,
      formData: formDataObj,
    });
    
    // Check if it's a reCAPTCHA error
    const isRecaptchaError = error.message?.includes("reCAPTCHA") || error.message?.includes("422");
    
    return json(
      {
        status: 500,
        success: false,
        message: isRecaptchaError 
          ? "reCAPTCHA verification failed. Please try again and complete the reCAPTCHA."
          : error.message || "Something went wrong. Please try again later.",
        error: error.message,
        isRecaptchaError,
      },
      { status: 500 }
    );
  }
};

export default function Home() {
  const fetcher = useFetcher();
  const isMobile = useMediaQuery("(max-width: 768px)");
  const [success, setSuccess] = useState(false);
  const [formOpen, setFormOpen] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [debugMode, setDebugMode] = useState(false);
  const [apiLogs, setApiLogs] = useState<Array<{ time: string; type: string; message: string }>>([]);

  // Expose test function to window for easy testing
  useEffect(() => {
    if (typeof window !== "undefined") {
      (window as any).testAPICall = async () => {
        const testData = {
          name: "Test User",
          email: "test@example.com",
          phone: "+91 1234567890",
          message: "Test API call from browser console",
          title: "## From Landing Page",
          "g-recaptcha-response": "test-token",
          gcode: "test-token"
        };

        console.log("🧪 Testing API Call...");
        console.log("📤 Request URL: https://api.fynocrat.com/fynocrat/lead/request");
        console.log("📤 Request Data:", testData);

        try {
          const response = await fetch("https://api.fynocrat.com/fynocrat/lead/request", {
            method: "POST",
            body: JSON.stringify(testData),
            headers: { "Content-Type": "application/json" },
          });

          console.log("📡 Response Status:", response.status, response.statusText);
          console.log("📡 Response OK:", response.ok);

          if (!response.ok) {
            const errorText = await response.text();
            console.error("❌ API Error Response:", errorText);
            return { success: false, status: response.status, error: errorText };
          }

          const data = await response.json();
          console.log("✅ API Success Response:", data);
          return { success: true, status: response.status, data };
        } catch (error: any) {
          console.error("❌ API Request Failed:", error);
          return { success: false, error: error.message };
        }
      };
      console.log("💡 API Test Function Available! Run testAPICall() in console to test the API");
    }
  }, []);

  // Add debug logging function
  const addDebugLog = useCallback((type: string, message: string) => {
    setApiLogs((prev) => {
      const newLogs = [
        ...prev,
        { time: new Date().toLocaleTimeString(), type, message },
      ];
      // Keep only last 10 logs
      return newLogs.length > 10 ? newLogs.slice(-10) : newLogs;
    });
  }, []);

  // Handle form submission response
  useEffect(() => {
    if (fetcher.data) {
      setIsSubmitting(false);
      
      // Debug: Log fetcher response
      console.log("🔄 Fetcher Response:", {
        data: fetcher.data,
        state: fetcher.state,
        timestamp: new Date().toISOString(),
      });
      if (debugMode) {
        addDebugLog("response", JSON.stringify(fetcher.data, null, 2));
      }

      if (fetcher.data.success) {
        setSuccess(true);
        setFormOpen(false);
        console.log("✅ Form submission successful!");
        if (debugMode) {
          addDebugLog("success", "API call successful!");
        }
        
        // Reset form fields
        resetFormFields();
        
        // Reset reCAPTCHA after success
        resetRecaptcha();
        
        showNotification({
          title: "Success!",
          message: fetcher.data.message,
          color: "green",
        });
        
        // Reset success message after delay
        setTimeout(() => {
          setSuccess(false);
        }, 3000);
      } else {
        console.error("❌ Form submission failed:", fetcher.data);
        if (debugMode) {
          addDebugLog("error", fetcher.data.error || fetcher.data.message || "Unknown error");
        }
        
        // If it's a reCAPTCHA error, reset the reCAPTCHA
        if (fetcher.data.isRecaptchaError) {
          resetRecaptcha();
        }
        
        showNotification({
          title: "Error",
          message: fetcher.data.message || fetcher.data.error || "Something went wrong. Please try again.",
          color: "red",
          autoClose: 5000, // Show error longer
        });
      }
    }
  }, [fetcher.data, debugMode, addDebugLog]);

  // Handle form submission state
  useEffect(() => {
    setIsSubmitting(fetcher.state === "submitting");
    
    // Debug: Log fetcher state changes
    if (fetcher.state === "submitting") {
      console.log("⏳ Form submission started...");
      if (debugMode) {
        addDebugLog("info", "Form submission started...");
      }
    } else if (fetcher.state === "idle" && fetcher.data) {
      console.log("✅ Form submission completed");
      if (debugMode) {
        addDebugLog("info", "Form submission completed");
      }
    }
  }, [fetcher.state, debugMode, addDebugLog]);

  // Keyboard shortcut listener for debug mode
  useEffect(() => {
    const handleKeyPress = (e: KeyboardEvent) => {
      if (e.ctrlKey && e.key === "d") {
        e.preventDefault();
        setDebugMode((prev) => !prev);
      }
    };

    window.addEventListener("keydown", handleKeyPress);
    return () => window.removeEventListener("keydown", handleKeyPress);
  }, []);

  const ChatButton = () => {
    const handleClick = () => {
      window.open(
        "https://api.whatsapp.com/send?phone=918448691150&text=Hi.%20I%20want%20to%20know%20about%20the%20products.",
        "_blank"
      );
    };

    return (
      <Button
        onClick={handleClick}
        leftSection={<IconBrandWhatsapp size={28} color="white" />} // bigger icon
        styles={{
          root: {
            background: "#4dc247",
            borderRadius: "40px",
            padding: "16px 28px", // bigger padding
            height: "60px", // larger height
            fontSize: "15px", // bigger font
            position: "fixed",
            bottom: "30px", // lifted up like your SS
            right: "30px",
            zIndex: 1000,
          },
          label: {
            color: "white",
            fontWeight: 700,
          },
        }}
      >
        Sales Desk
      </Button>
    );
  };

  const products = [
    {
      title: "Wealth Builder Portfolio",
      desc: "Model portfolio of 15–18 stocks across emerging themes — built to compound wealth over the long term.",
      icon: <IconTrendingUp />,
      href: "https://fynocrat.com/invest/wealth-builder",
      color: "#f1f5f9",
      accent: "#6E44FF",
    },
    {
      title: "Mauka",
      desc: "Leverage market corrections to buy strong companies at attractive valuations for medium-term gains.",
      icon: <IconArrowBounce />,
      href: "https://fynocrat.com/invest/mauka",
      color: "#f8fafc",
      accent: "#2D6EF6",
    },
    {
      title: "T-20",
      desc: "Handpicked short-term trades with clear risk-management — quick moves aimed at outsized returns.",
      icon: <IconZap />,
      href: "https://fynocrat.com/invest/t-20",
      color: "#fffbf0",
      accent: "#B23327",
    },
    {
      title: "IPO Corner (Non-SME)",
      desc: "Research-first access to high-potential IPOs — analysis, verdicts, and actionable entry ideas.",
      icon: <IconRocket />,
      href: "https://fynocrat.com/invest/ipo",
      color: "#f6f5ff",
      accent: "#4F3FB3",
    },
    {
      title: "Blue Chip Edge",
      desc: "A curated selection of blue-chips with real growth potential — stability with upside.",
      icon: <IconShieldCheck />,
      href: "https://fynocrat.com/invest/blue-chip-edge",
      color: "#fff7ed",
      accent: "#D66A27",
    },
    {
      title: "Fynocrat Premium",
      desc: "360° premium research and advisory designed for HNI & U-HNI clients seeking personalised strategies.",
      icon: <IconDiamond />,
      href: "https://fynocrat.com/invest/premium",
      color: "#eefdf6",
      accent: "#2F7D32",
    },
  ];

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    if (params.get("success") === "1") {
      setSuccess(true);
      setTimeout(() => {
        window.history.replaceState({}, "", window.location.pathname);
        setSuccess(false);
      }, 3000);
    }
  }, []);

  const [recaptchaToken, setRecaptchaToken] = useState<string | null>(null);
  const [captchaChecked, setCaptchaChecked] = useState(false);
  const recaptchaRef = useRef<ReCAPTCHA>(null);
  const popupRecaptchaRef = useRef<ReCAPTCHA>(null);
  const mainFormRef = useRef<HTMLFormElement>(null);
  const popupFormRef = useRef<HTMLFormElement>(null);

  const handleCaptcha = (token: string | null) => {
    console.log("🔐 reCAPTCHA Token Received:", token ? `Token present (${token.substring(0, 20)}...)` : "No token");
    
    if (token) {
      setRecaptchaToken(token);
      setCaptchaChecked(true);

      // Update main form hidden field immediately
      const el = typeof document !== "undefined"
        ? (document.getElementById("g-recaptcha-response") as HTMLInputElement | null)
        : null;
      if (el) {
        el.value = token;
        console.log("✅ Updated main form hidden field with token");
      }

      // Update popup form hidden field immediately
      const popupEl = typeof document !== "undefined"
        ? (document.getElementById("popup-recaptcha") as HTMLInputElement | null)
        : null;
      if (popupEl) {
        popupEl.value = token;
        console.log("✅ Updated popup form hidden field with token");
      }
    } else {
      setRecaptchaToken(null);
      setCaptchaChecked(false);
    }
  };

  // Sync reCAPTCHA token to hidden fields whenever it changes
  useEffect(() => {
    if (recaptchaToken) {
      const el = document.getElementById("g-recaptcha-response") as HTMLInputElement | null;
      if (el) {
        el.value = recaptchaToken;
        el.setAttribute('value', recaptchaToken);
      }
      const popupEl = document.getElementById("popup-recaptcha") as HTMLInputElement | null;
      if (popupEl) {
        popupEl.value = recaptchaToken;
        popupEl.setAttribute('value', recaptchaToken);
      }
      console.log("🔄 Synced reCAPTCHA token to hidden fields");
    }
  }, [recaptchaToken]);

  // Reset reCAPTCHA after successful submission
  const resetRecaptcha = useCallback(() => {
    setRecaptchaToken(null);
    setCaptchaChecked(false);
    recaptchaRef.current?.reset();
    popupRecaptchaRef.current?.reset();
    
    // Clear hidden fields
    const el = document.getElementById("g-recaptcha-response") as HTMLInputElement | null;
    if (el) {
      el.value = "";
      el.removeAttribute('value');
    }
    const popupEl = document.getElementById("popup-recaptcha") as HTMLInputElement | null;
    if (popupEl) {
      popupEl.value = "";
      popupEl.removeAttribute('value');
    }
  }, []);

  // Reset form fields after successful submission
  const resetFormFields = useCallback(() => {
    // Reset main form using ref
    if (mainFormRef.current) {
      mainFormRef.current.reset();
      console.log("✅ Main form reset");
    }
    
    // Reset popup form using ref
    if (popupFormRef.current) {
      popupFormRef.current.reset();
      console.log("✅ Popup form reset");
    }
    
    // Also manually clear input values as backup
    const nameInputs = document.querySelectorAll('input[name="name"], input[name="popup_name"]');
    const emailInputs = document.querySelectorAll('input[name="email"], input[name="popup_email"]');
    const phoneInputs = document.querySelectorAll('input[name="phone"], input[name="popup_phone"]');
    const messageInputs = document.querySelectorAll('textarea[name="message"], textarea[name="popup_message"]');
    
    // Clear all inputs and trigger events for Mantine components
    [...nameInputs, ...emailInputs, ...phoneInputs].forEach((input) => {
      const element = input as HTMLInputElement;
      element.value = "";
      // Trigger input event to update Mantine component state
      element.dispatchEvent(new Event('input', { bubbles: true }));
      element.dispatchEvent(new Event('change', { bubbles: true }));
    });
    
    messageInputs.forEach((textarea) => {
      const element = textarea as HTMLTextAreaElement;
      element.value = "";
      // Trigger input event to update Mantine component state
      element.dispatchEvent(new Event('input', { bubbles: true }));
      element.dispatchEvent(new Event('change', { bubbles: true }));
    });
    
    console.log("✅ All form fields cleared and reset");
  }, []);

  // Handle form submission - ensure we have the latest reCAPTCHA token
  const handleFormSubmit = useCallback((e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    e.stopPropagation();
    
    // Get the latest token from ALL possible sources
    const mainToken = recaptchaRef.current?.getValue();
    const popupToken = popupRecaptchaRef.current?.getValue();
    const stateToken = recaptchaToken;
    
    // Use the first available token
    const currentToken = mainToken || popupToken || stateToken || "";
    
    console.log("🔐 Form Submit Handler - Token Check:", {
      fromMainRef: mainToken ? `Present (${mainToken.substring(0, 20)}...)` : "None",
      fromPopupRef: popupToken ? `Present (${popupToken.substring(0, 20)}...)` : "None",
      fromState: stateToken ? `Present (${stateToken.substring(0, 20)}...)` : "None",
      currentToken: currentToken ? `Present (${currentToken.substring(0, 20)}...)` : "MISSING",
    });
    
    if (!currentToken || currentToken.trim() === "") {
      console.error("❌ Form submission blocked - No reCAPTCHA token found");
      showNotification({
        title: "reCAPTCHA Required",
        message: "Please complete the reCAPTCHA verification before submitting. Make sure you check the 'I'm not a robot' box.",
        color: "red",
        autoClose: 5000,
      });
      return false;
    }

    // Get form data
    const form = e.currentTarget;
    const formData = new FormData(form);
    
    // CRITICAL: Set the token in FormData before submission
    formData.set("g-recaptcha-response", currentToken);
    
    console.log("✅ Token added to FormData:", currentToken.substring(0, 20) + "...");
    console.log("🔐 Verifying token in FormData:", formData.get("g-recaptcha-response") ? "Present" : "MISSING!");
    
    // Submit using fetcher.submit to ensure token is included
    fetcher.submit(formData, {
      method: "post",
      encType: "multipart/form-data",
    });
    
    console.log("✅ Form submitted with token via fetcher.submit");
  }, [recaptchaToken, fetcher]);

  return (
    <>
      {/* Debug Panel Toggle - Press Ctrl+D to toggle */}
      {debugMode && (
        <Box
          style={{
            position: "fixed",
            top: 10,
            right: 10,
            width: 400,
            maxHeight: "80vh",
            backgroundColor: "#1a1a1a",
            border: "2px solid #0080ff",
            borderRadius: 8,
            padding: 16,
            zIndex: 10000,
            overflowY: "auto",
            color: "#fff",
            fontSize: 12,
            fontFamily: "monospace",
          }}
        >
          <Group justify="space-between" mb={10}>
            <Text fw={700} c="#0080ff">
              🔍 API Debug Panel
            </Text>
            <Button
              size="xs"
              variant="subtle"
              onClick={() => setDebugMode(false)}
              style={{ color: "#fff" }}
            >
              ✕ Close
            </Button>
          </Group>
          <Text size="xs" c="dimmed" mb={10}>
            Fetcher State: <strong>{fetcher.state}</strong>
          </Text>
          <Text size="xs" c="dimmed" mb={10}>
            Is Submitting: <strong>{isSubmitting ? "Yes" : "No"}</strong>
          </Text>
          {fetcher.data && (
            <Box mb={10}>
              <Text size="xs" fw={700} mb={5}>
                Last Response:
              </Text>
              <pre
                style={{
                  backgroundColor: "#000",
                  padding: 8,
                  borderRadius: 4,
                  overflow: "auto",
                  fontSize: 10,
                }}
              >
                {JSON.stringify(fetcher.data, null, 2)}
              </pre>
            </Box>
          )}
          {apiLogs.length > 0 && (
            <Box>
              <Text size="xs" fw={700} mb={5}>
                API Logs:
              </Text>
              <Stack gap={4}>
                {apiLogs.map((log, idx) => (
                  <Box
                    key={idx}
                    style={{
                      padding: 6,
                      backgroundColor: log.type === "error" ? "#5a1a1a" : log.type === "success" ? "#1a5a1a" : "#1a1a3a",
                      borderRadius: 4,
                    }}
                  >
                    <Text size="xs">
                      <strong>[{log.time}]</strong> {log.type}: {log.message}
                    </Text>
                  </Box>
                ))}
              </Stack>
            </Box>
          )}
        </Box>
      )}

      {/* --------------------------------Kartikey start SECTION 1 — BANNER -------------------------------- */}
      <Box
        style={{
          backgroundImage: "url('/banner.png')",
          backgroundSize: "cover",
          backgroundRepeat: "no-repeat",
          backgroundPosition: "center",
          width: "100%",
          overflow: "hidden",
          // minHeight: "100vh",
          position: "relative",
          fontFamily: "Poppins, sans-serif",
          paddingBottom: 80,
        }}
      >
        
        {success && (
          <div className="success-popup">
            ✔ Your details have been received successfully. Our research team
            will connect with you soon.
          </div>
        )}

        {/* Top Bar */}
        <Container size="xl" style={{ maxWidth: 1400, padding: 0 }}>
          <div
            style={{
              display: "grid",
              gridTemplateColumns: isMobile ? "1fr" : "48% 40%",
              columnGap: isMobile ? 20 : 140,
              alignItems: "center",

              paddingLeft: isMobile ? 20 : 100,
              paddingRight: isMobile ? 20 : 100,
              marginBottom: isMobile ? 10 : 25,
              marginTop: isMobile ? 20 : 30,
            }}
          >
            <Image
              src="/logo.png"
              alt="Fynocrat"
              style={{
                width: isMobile ? 180 : 190,
                height: "auto",
                objectFit: "contain",
              }}
            />

            <Text
              style={{
                color: "#fff",
                fontWeight: 100,
                fontSize: isMobile ? 12 : 24,
                opacity: 0.9,
                textAlign: "center",
              }}
            >
              SEBI Registration No. – INH000011918
            </Text>
          </div>

          {/* Main grid */}
          <div
            style={{
              display: "grid",
              gridTemplateColumns: isMobile ? "1fr" : "48% 40%",
              columnGap: isMobile ? 20 : 140,
              alignItems: "center",
              paddingLeft: isMobile ? 20 : 100,
              paddingRight: isMobile ? 20 : 100,
            }}
          >
            {/* Left column */}
            <div style={{ paddingTop: isMobile ? 20 : 60 }}>
              <Title
                style={{
                  color: "#ff5b5b",
                  fontSize: isMobile ? 30 : 40,
                  fontWeight: 700,
                  lineHeight: 1.15,
                  marginBottom: 30,
                  minHeight: 120,
                  paddingTop: isMobile ? 0 : 20,
                }}
              >
                <span style={{ color: "#ffffff" }}>You Don’t Need </span>
                <span style={{ color: "#ff5b5b" }}>More Tips.</span>
                <br />
                <span style={{ color: "#ffffff" }}>You Need </span>
                <span style={{ color: "#86ff70" }}>Real Research.</span>
              </Title>

              <Text
                style={{
                  color: "#ffffff",
                  opacity: 0.82,
                  fontSize: isMobile ? 11 : 17,
                  lineHeight: 1.7,
                  marginTop: 10,
                  maxWidth: 600,
                }}
              >
                We filter out the noise, identify opportunities, and guide you
                toward returns that last.
              </Text>

              <Text
                style={{
                  color: "#ffffff",
                  opacity: 0.82,
                  fontSize: isMobile ? 14 : 13,
                  lineHeight: 1.7,
                  marginTop: 6,
                  maxWidth: 520,
                }}
              >
                Because the best investors don’t chase stocks — they understand
                them.
              </Text>

              <Space h={isMobile ? 30 : 100} />

              <div style={{ display: "flex", alignItems: "baseline" }}>
                <Text
                  style={{
                    color: "white",
                    fontSize: isMobile ? 70 : 110,
                    fontWeight: 700,
                    lineHeight: 1,
                    marginRight: 8,
                  }}
                >
                  4.7
                </Text>

                <Text
                  style={{
                    color: "white",
                    fontSize: isMobile ? 22 : 32,
                    fontWeight: 500,
                    opacity: 0.9,
                    lineHeight: 1.1,
                  }}
                >
                  /5
                </Text>

                <Space w={isMobile ? 10 : 20} />

                <div style={{ width: isMobile ? 150 : 220 }}>
                  <Image src="/rating-stars.png" alt="Rating" />
                </div>
              </div>
            </div>

            {/* Right column: Contact form */}
            <div
              style={{
                marginTop: isMobile ? 20 : -10,
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                justifyContent: "flex-start",
              }}
            >
              <Text
                style={{
                  color: "#fff",
                  fontWeight: 600,
                  fontSize: isMobile ? 20 : 24,
                  marginBottom: isMobile ? 10 : 20,
                  textAlign: "right",
                }}
              >
                Want Access to Our Next Stock Idea?
              </Text>

              <Paper
                radius="md"
                shadow="xl"
                className="form-box"
                style={{ width: isMobile ? "100%" : 420, maxWidth: 420 }}
              >
                <fetcher.Form 
                  ref={mainFormRef}
                  method="post" 
                  style={{ width: "100%" }} 
                  onSubmit={handleFormSubmit}
                >
                  <Stack>
                    <TextInput
                      name="name"
                      label="Name"
                      required
                      radius="md"
                      placeholder="john doe"
                      disabled={isSubmitting}
                    />

                    <TextInput
                      name="email"
                      label="Email"
                      required
                      radius="md"
                      placeholder="your@email.com"
                      disabled={isSubmitting}
                    />

                    <TextInput
                      name="phone"
                      label="Phone"
                      required
                      radius="md"
                      placeholder="+91 98765 43210"
                      disabled={isSubmitting}
                    />

                    <Textarea
                      name="message"
                      label="Your message"
                      required
                      minRows={4}
                      radius="md"
                      placeholder="I am interested in receiving stock ideas."
                      disabled={isSubmitting}
                    />

                    <input
                      id="g-recaptcha-response"
                      type="hidden"
                      name="g-recaptcha-response"
                      value={recaptchaToken ?? ""}
                    />

                    {typeof window !== "undefined" && (
                      <ReCAPTCHA
                        ref={recaptchaRef}
                        sitekey={
                          import.meta.env.VITE_RECAPTCHA_SITE_KEY ||
                          "6LchBXApAAAAAKt8aDadaFGsLiKb44OsRpOPdcJb"
                        }
                        onChange={handleCaptcha}
                        onExpired={() => {
                          console.warn("⚠️ reCAPTCHA token expired");
                          setRecaptchaToken(null);
                          setCaptchaChecked(false);
                        }}
                        onError={(error) => {
                          console.error("❌ reCAPTCHA Error:", error);
                        }}
                      />
                    )}

                    <Button
                      type="submit"
                      fullWidth
                      radius="md"
                      disabled={!captchaChecked || isSubmitting}
                      loading={isSubmitting}
                      style={{ height: 45, fontSize: 16, fontWeight: 600 }}
                    >
                      {isSubmitting ? "Submitting..." : "Send Me Stock Idea"}
                    </Button>
                  </Stack>
                </fetcher.Form>
              </Paper>
            </div>
          </div>
        </Container>
      </Box>
      <ChatButton />

      {/* -------------------------------- SECTION 2 — WHAT WE OFFER (WHITE BG) -------------------------------- */}
      <Box
        style={{
          width: "100%",
          backgroundColor: "#ffffff",
          paddingTop: 80,
          paddingBottom: 80,
        }}
      >
        <Container size="xl" style={{ maxWidth: 1200 }}>
          {/* HERO ROW (left large, right summary) */}
          <SimpleGrid
            cols={{ base: 1, md: 2 }}
            spacing={30}
            verticalSpacing={20}
            mb={40}
          >
            <div>
              <Text
                style={{
                  color: "#0ea5a3", // subtle label color
                  fontWeight: 700,
                  letterSpacing: 1.2,
                  fontSize: 13,
                  marginBottom: 10,
                }}
              >
                INVESTMENT RESEARCH
              </Text>

              <Title
                order={2}
                style={{
                  color: "#0b1220",
                  fontFamily: "Poppins, Inter, sans-serif",
                  fontWeight: 800,
                  fontSize: 48,
                  lineHeight: 1.02,
                  marginBottom: 18,
                }}
              >
                Expert-backed strategies for every investor.
              </Title>
            </div>

            <div style={{ alignSelf: "center" }}>
              <Text
                style={{
                  color: "#4b5563",
                  fontSize: 18,
                  lineHeight: 1.6,
                }}
              >
                Build long-term wealth, capture tactical market opportunities,
                and access premium research — all delivered through clearly
                structured investment products designed to fit your risk profile
                and time horizon.
              </Text>
            </div>
          </SimpleGrid>

          {/* PRODUCTS GRID */}
          <SimpleGrid
            cols={{ base: 1, sm: 2, md: 3 }}
            spacing={28}
            verticalSpacing={10}
            mb={40}
          >
            {products.map((p) => (
              <Card
                key={p.title}
                // shadow='xl'
                // radius='lg'
                // padding='xl'
                style={{
                  background: "#fff",
                  // border: "1px solid rgba(15,23,42,0.04)",
                  minHeight: 200,
                  display: "flex",
                  flexDirection: "column",
                  justifyContent: "space-between",
                  transition: "transform .18s ease, box-shadow .18s ease",
                }}
                onMouseEnter={(e: any) => {
                  e.currentTarget.style.transform = "translateY(-6px)";
                  e.currentTarget.style.boxShadow =
                    "0 0px 30px rgba(10, 20, 40, 0.08)";
                }}
                onMouseLeave={(e: any) => {
                  e.currentTarget.style.transform = "translateY(0)";
                  e.currentTarget.style.boxShadow = "";
                }}
              >
                <div>
                  <Group mb={16}>
                    <div
                      style={{
                        width: 72,
                        height: 72,
                        borderRadius: 18,
                        display: "grid",
                        placeItems: "center",
                        background: p.color,
                        boxShadow: `inset 0 1px 0 rgba(255,255,255,0.6)`,
                      }}
                    >
                      {React.cloneElement(p.icon as any, { size: 36 })}
                    </div>
                  </Group>

                  <Text
                    fw={700}
                    fz={20}
                    style={{
                      color: "#0b1220",
                      textAlign: "left",
                    }}
                  >
                    {p.title}
                  </Text>

                  <Text
                    fz={14}
                    mt={10}
                    style={{
                      color: "#6b7280",
                      textAlign: "left",
                    }}
                  >
                    {p.desc}
                  </Text>
                </div>

                {/* <div
                  style={{
                    display: "flex",
                    justifyContent: "left",
                    marginTop: 16,
                  }}
                >
                  <Button
                    variant='subtle'
                    radius='xl'
                    size='sm'
                    component='a'
                    href={p.href}
                    target='_blank'
                    rel='noreferrer'
                    style={{
                      border: `1px solid ${p.accent}`,
                      color: p.accent,
                      paddingLeft: 18,
                      paddingRight: 18,
                      fontWeight: 700,
                    }}
                  >
                    Learn more
                  </Button>
                </div> */}
              </Card>
            ))}
          </SimpleGrid>

          {/* CTA */}
          <div
            style={{
              textAlign: "left",
              // marginBottom: 25,
              // marginTop: 30,
            }}
          >
            <Button
              size="lg"
              radius="md"
              color="blue"
              style={{
                backgroundColor: "#0080ff",
                fontWeight: 600,
                paddingLeft: 40,
                paddingRight: 40,
              }}
              onClick={() => setFormOpen(true)}
            >
              Get Expert Research
            </Button>
          </div>
        </Container>
      </Box>
      {/* -------------------------------- SECTION — WHY FYNOCAT IS DIFFERENT (ICON + TEXT GRID, 3x2) -------------------------------- */}
      <Box
        style={{
          width: "100%",
          backgroundColor: "#F3F7FF",
          paddingTop: 80,
          paddingBottom: 80,
          fontFamily: "Poppins, Inter, sans-serif",
        }}
      >
        <Container size="xl" style={{ maxWidth: 1200 }}>
          {/* Heading */}
          <div
            style={{ textAlign: "center", marginBottom: isMobile ? 28 : 48 }}
          >
            <Title
              order={2}
              style={{
                color: "#0b1220",
                fontWeight: 800,
                fontSize: isMobile ? 26 : 36,
                lineHeight: 1.06,
              }}
            >
              Why Fynocrat is Different ?
            </Title>
            <Text
              style={{
                color: "#6b7280",
                marginTop: 8,
                fontSize: isMobile ? 13 : 16,
                maxWidth: 860,
                marginLeft: "auto",
                marginRight: "auto",
                lineHeight: 1.6,
              }}
            >
              Learn why our unconventional approach leads to exceptional
              outcomes.
            </Text>
          </div>

          {/* Grid: 3 columns x 2 rows */}
          <SimpleGrid cols={{ base: 1, sm: 2, md: 3 }} spacing={30}>
            {/* Item 1: Vasudhaiva Kutumbakam */}
            <div style={{ display: "flex", gap: 18, alignItems: "flex-start" }}>
              {/* Icon */}
              <div
                style={{
                  minWidth: 56,
                  minHeight: 56,
                  borderRadius: 12,
                  display: "grid",
                  placeItems: "center",
                  background: "linear-gradient(180deg,#eef2ff,#f8fafc)",
                  boxShadow: "inset 0 1px 0 rgba(255,255,255,0.6)",
                }}
                aria-hidden
              >
                {/* globe icon */}
                <svg width="28" height="28" viewBox="0 0 24 24" fill="none">
                  <path
                    d="M12 2a10 10 0 100 20 10 10 0 000-20z"
                    stroke="#3b82f6"
                    strokeWidth="1.4"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                  <path
                    d="M2 12h20M12 2c2.5 3 2.5 8 0 11M6 4c4 2 8 2 12 0M6 20c4-2 8-2 12 0"
                    stroke="#60a5fa"
                    strokeWidth="1"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </div>

              {/* Text */}
              <div>
                <Text
                  fw={700}
                  fz={16}
                  style={{ color: "#0b1220", marginBottom: 6 }}
                >
                  Vasudhaiva Kutumbakam
                </Text>
                <Text fz={14} color="#6b7280" style={{ lineHeight: 1.5 }}>
                  Fostering a customer-centric relationship — we treat every
                  client as part of our extended family.
                </Text>
              </div>
            </div>

            {/* Item 2: Visionary Research */}
            <div style={{ display: "flex", gap: 18, alignItems: "flex-start" }}>
              <div
                style={{
                  minWidth: 56,
                  minHeight: 56,
                  borderRadius: 12,
                  display: "grid",
                  placeItems: "center",
                  background: "linear-gradient(180deg,#fff7ed,#fffaf0)",
                }}
                aria-hidden
              >
                {/* lightbulb */}
                <svg width="28" height="28" viewBox="0 0 24 24" fill="none">
                  <path
                    d="M9 18h6M10 21h4"
                    stroke="#f59e0b"
                    strokeWidth="1.4"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                  <path
                    d="M12 3a6 6 0 00-4 10c0 2 1 3 1 3h6s1-1 1-3a6 6 0 00-4-10z"
                    stroke="#f97316"
                    strokeWidth="1.2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </div>

              <div>
                <Text
                  fw={700}
                  fz={16}
                  style={{ color: "#0b1220", marginBottom: 6 }}
                >
                  Visionary Approach Towards Research
                </Text>
                <Text fz={14} color="#6b7280" style={{ lineHeight: 1.5 }}>
                  We challenge the status quo and identify emerging themes
                  before they become mainstream.
                </Text>
              </div>
            </div>

            {/* Item 3: Customer-Centricity */}
            <div style={{ display: "flex", gap: 18, alignItems: "flex-start" }}>
              <div
                style={{
                  minWidth: 56,
                  minHeight: 56,
                  borderRadius: 12,
                  display: "grid",
                  placeItems: "center",
                  background: "linear-gradient(180deg,#ecfeff,#f0f9ff)",
                }}
                aria-hidden
              >
                {/* user-heart */}
                <svg width="28" height="28" viewBox="0 0 24 24" fill="none">
                  <path
                    d="M12 12a3 3 0 100-6 3 3 0 000 6z"
                    stroke="#06b6d4"
                    strokeWidth="1.2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                  <path
                    d="M4 20c1.5-3 4.5-5 8-5s6.5 2 8 5"
                    stroke="#14b8a6"
                    strokeWidth="1.2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </div>

              <div>
                <Text
                  fw={700}
                  fz={16}
                  style={{ color: "#0b1220", marginBottom: 6 }}
                >
                  Customer-Centricity
                </Text>
                <Text fz={14} color="#6b7280" style={{ lineHeight: 1.5 }}>
                  Personalized service and trust-first relationships — we build
                  experiences that exceed expectations.
                </Text>
              </div>
            </div>

            {/* Item 4: Technology & AI */}
            <div style={{ display: "flex", gap: 18, alignItems: "flex-start" }}>
              <div
                style={{
                  minWidth: 56,
                  minHeight: 56,
                  borderRadius: 12,
                  display: "grid",
                  placeItems: "center",
                  background: "linear-gradient(180deg,#eefdf6,#f0fff9)",
                }}
                aria-hidden
              >
                {/* chip / ai */}
                <svg width="28" height="28" viewBox="0 0 24 24" fill="none">
                  <rect
                    x="6"
                    y="6"
                    width="12"
                    height="12"
                    rx="2"
                    stroke="#10b981"
                    strokeWidth="1.2"
                  />
                  <path d="M9 9h6v6H9z" stroke="#059669" strokeWidth="1" />
                  <path
                    d="M3 12h2M19 12h2M12 3v2M12 19v2"
                    stroke="#34d399"
                    strokeWidth="1"
                    strokeLinecap="round"
                  />
                </svg>
              </div>

              <div>
                <Text
                  fw={700}
                  fz={16}
                  style={{ color: "#0b1220", marginBottom: 6 }}
                >
                  Embracing Technology & AI
                </Text>
                <Text fz={14} color="#6b7280" style={{ lineHeight: 1.5 }}>
                  We leverage AI & ML to analyze large datasets, uncover
                  patterns, and generate forward-looking investment signals.
                </Text>
              </div>
            </div>

            {/* Item 5: Risk Management */}
            <div style={{ display: "flex", gap: 18, alignItems: "flex-start" }}>
              <div
                style={{
                  minWidth: 56,
                  minHeight: 56,
                  borderRadius: 12,
                  display: "grid",
                  placeItems: "center",
                  background: "linear-gradient(180deg,#fff7ed,#fffbf0)",
                }}
                aria-hidden
              >
                {/* shield-check */}
                <svg width="28" height="28" viewBox="0 0 24 24" fill="none">
                  <path
                    d="M12 2l7 3v5c0 5-3.5 9-7 11-3.5-2-7-6-7-11V5l7-3z"
                    stroke="#f97316"
                    strokeWidth="1.2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                  <path
                    d="M9 12l2 2 4-4"
                    stroke="#fb923c"
                    strokeWidth="1.2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </div>

              <div>
                <Text
                  fw={700}
                  fz={16}
                  style={{ color: "#0b1220", marginBottom: 6 }}
                >
                  Focus on Risk Management
                </Text>
                <Text fz={14} color="#6b7280" style={{ lineHeight: 1.5 }}>
                  Protecting capital is a priority — we balance the pursuit of
                  returns with robust risk controls.
                </Text>
              </div>
            </div>

            {/* Item 6: Challenging Conventional Wisdom */}
            <div style={{ display: "flex", gap: 18, alignItems: "flex-start" }}>
              <div
                style={{
                  minWidth: 56,
                  minHeight: 56,
                  borderRadius: 12,
                  display: "grid",
                  placeItems: "center",
                  background: "linear-gradient(180deg,#f0f9ff,#eef8ff)",
                }}
                aria-hidden
              >
                {/* compass/rocket */}
                <svg width="28" height="28" viewBox="0 0 24 24" fill="none">
                  <path
                    d="M12 2l3 7-7 3-3-7 7-3z"
                    stroke="#6366f1"
                    strokeWidth="1.2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                  <path
                    d="M9 15l6 6M15 9l6 6"
                    stroke="#8b5cf6"
                    strokeWidth="1"
                    strokeLinecap="round"
                  />
                </svg>
              </div>

              <div>
                <Text
                  fw={700}
                  fz={16}
                  style={{ color: "#0b1220", marginBottom: 6 }}
                >
                  Challenging Conventional Wisdom
                </Text>
                <Text fz={14} color="#6b7280" style={{ lineHeight: 1.5 }}>
                  We question common assumptions and explore unconventional
                  strategies to find overlooked opportunities.
                </Text>
              </div>
            </div>
          </SimpleGrid>

          {/* CTA */}
          <div style={{ marginTop: isMobile ? 36 : 56, textAlign: "center" }}>
            <Button
              size="lg"
              radius="md"
              color="blue"
              style={{
                backgroundColor: "#0080ff",
                fontWeight: 600,
                paddingLeft: 36,
                paddingRight: 36,
              }}
              onClick={() => setFormOpen(true)}
            >
              Talk to our team
            </Button>
          </div>
        </Container>
      </Box>
      {/* -------------------------------- POPUP FORM -------------------------------- */}
      <Modal
        opened={formOpen}
        onClose={() => {
          if (!isSubmitting) {
            setFormOpen(false);
          }
        }}
        centered
        size={isMobile ? "90%" : "lg"}
        title="Fill Your Details"
        closeOnClickOutside={!isSubmitting}
        closeOnEscape={!isSubmitting}
      >
        <fetcher.Form 
          ref={popupFormRef}
          method="post" 
          onSubmit={handleFormSubmit}
        >
          <Stack>
            <TextInput
              label="Name"
              name="popup_name"
              placeholder="John Doe"
              required
              disabled={isSubmitting}
            />

            <TextInput
              label="Email"
              name="popup_email"
              placeholder="your@email.com"
              required
              disabled={isSubmitting}
            />

            <TextInput
              label="Phone"
              name="popup_phone"
              placeholder="+91 98765 43210"
              required
              disabled={isSubmitting}
            />

            <Textarea
              label="Your Message"
              name="popup_message"
              placeholder="I want to explore investment insights."
              required
              minRows={4}
              disabled={isSubmitting}
            />

            {/* Hidden recaptcha field */}
            <input
              id="popup-recaptcha"
              type="hidden"
              name="g-recaptcha-response"
              value={recaptchaToken ?? ""}
            />

            {/* ReCAPTCHA widget */}
            {typeof window !== "undefined" && (
              <ReCAPTCHA
                ref={popupRecaptchaRef}
                sitekey={
                  import.meta.env.VITE_RECAPTCHA_SITE_KEY ||
                  "6LchBXApAAAAAKt8aDadaFGsLiKb44OsRpOPdcJb"
                }
                onChange={handleCaptcha}
                onExpired={() => {
                  console.warn("⚠️ reCAPTCHA token expired");
                  setRecaptchaToken(null);
                  setCaptchaChecked(false);
                }}
                onError={(error) => {
                  console.error("❌ reCAPTCHA Error:", error);
                }}
              />
            )}

            <Button
              type="submit"
              size="md"
              radius="md"
              disabled={!captchaChecked || isSubmitting}
              loading={isSubmitting}
              style={{
                backgroundColor: "#0080ff",
                fontWeight: 600,
              }}
            >
              {isSubmitting ? "Submitting..." : "Submit"}
            </Button>
          </Stack>
        </fetcher.Form>
      </Modal>
    </>
  );
}
