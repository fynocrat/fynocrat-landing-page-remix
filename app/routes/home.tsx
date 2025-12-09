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
import { json } from "@remix-run/node";
import HomeBanner from "~/components/home/hero-banner";
import ProductsSection from "~/components/home/products-section";
import WhyFynocratSection from "~/components/home/why-fynocrat-section";
import ClientTestimonials from "~/components/home/client-testimonials";
import Footer from "~/components/footer";

type Props = {
  setFormOpen: (open: boolean) => void;
};

const IconTrendingUp = (props: { size?: number }) => (
  <svg
    width={props.size ?? 48}
    height={props.size ?? 48}
    viewBox='0 0 24 24'
    fill='none'
    aria-hidden
  >
    <path
      d='M3 17l6-6 4 4 8-8'
      stroke='#0f172a'
      strokeWidth='1.6'
      strokeLinecap='round'
      strokeLinejoin='round'
    />
    <path
      d='M21 21v-4h-4'
      stroke='#0f172a'
      strokeWidth='1.6'
      strokeLinecap='round'
      strokeLinejoin='round'
    />
  </svg>
);

const IconArrowBounce = (props: { size?: number }) => (
  <svg
    width={props.size ?? 48}
    height={props.size ?? 48}
    viewBox='0 0 24 24'
    fill='none'
    aria-hidden
  >
    <path
      d='M3 12h6l2-3 4 6 6-9'
      stroke='#0f172a'
      strokeWidth='1.6'
      strokeLinecap='round'
      strokeLinejoin='round'
    />
    <path
      d='M21 21a3 3 0 0 0-3-3'
      stroke='#0f172a'
      strokeWidth='1.6'
      strokeLinecap='round'
      strokeLinejoin='round'
    />
  </svg>
);

const IconZap = (props: { size?: number }) => (
  <svg
    width={props.size ?? 48}
    height={props.size ?? 48}
    viewBox='0 0 24 24'
    fill='none'
    aria-hidden
  >
    <path
      d='M13 2L3 14h7l-1 8 10-12h-7l1-8z'
      stroke='#0f172a'
      strokeWidth='1.6'
      strokeLinecap='round'
      strokeLinejoin='round'
    />
  </svg>
);

const IconRocket = (props: { size?: number }) => (
  <svg
    width={props.size ?? 48}
    height={props.size ?? 48}
    viewBox='0 0 24 24'
    fill='none'
    aria-hidden
  >
    <path
      d='M12 2s-4 4-7 7c-1.5 1.5-3 6-3 6s4-1.2 5.5-2.7C11 11 17 7 17 7s-1.8-1.6-5-5z'
      stroke='#0f172a'
      strokeWidth='1.6'
      strokeLinecap='round'
      strokeLinejoin='round'
    />
    <path
      d='M7 17s-1 3 3 3 3-3 3-3'
      stroke='#0f172a'
      strokeWidth='1.6'
      strokeLinecap='round'
      strokeLinejoin='round'
    />
  </svg>
);

const IconShieldCheck = (props: { size?: number }) => (
  <svg
    width={props.size ?? 48}
    height={props.size ?? 48}
    viewBox='0 0 24 24'
    fill='none'
    aria-hidden
  >
    <path
      d='M12 2l7 3v5c0 5-3.5 9-7 11-3.5-2-7-6-7-11V5l7-3z'
      stroke='#0f172a'
      strokeWidth='1.6'
      strokeLinecap='round'
      strokeLinejoin='round'
    />
    <path
      d='M9.5 12.5l1.8 1.8L15 10'
      stroke='#0f172a'
      strokeWidth='1.6'
      strokeLinecap='round'
      strokeLinejoin='round'
    />
  </svg>
);

const IconDiamond = (props: { size?: number }) => (
  <svg
    width={props.size ?? 48}
    height={props.size ?? 48}
    viewBox='0 0 24 24'
    fill='none'
    aria-hidden
  >
    <path
      d='M3 9l9-6 9 6-4 10H7L3 9z'
      stroke='#0f172a'
      strokeWidth='1.6'
      strokeLinecap='round'
      strokeLinejoin='round'
    />
    <path
      d='M7 9l5 6 5-6'
      stroke='#0f172a'
      strokeWidth='1.6'
      strokeLinecap='round'
      strokeLinejoin='round'
    />
  </svg>
);

const createEmail = async (data: Record<string, any>) => {
  // NEW endpoint
  const apiRequest = "https://soapi.fynocrat.com/lead_ingest";

  // ensure recaptcha present (your page already enforces this)
  const recaptchaToken = data["g-recaptcha-response"] || "";

  if (!recaptchaToken) {
    throw new Error("reCAPTCHA token is required");
  }

  // Generate a stable lead_id for non-FB leads (lead_ingest requires lead_id).
  // Using a prefix + timestamp ensures uniqueness and makes it clear this is from the landing page.
  const leadId = data.lead_id || `landing-${Date.now()}`;

  // form id/name for tracking (you can set a campaign/form identifier here)
  const formId = data.form || "landing_page_form";

  // created_at in ISO (fastapi _parse_created_at handles multiple formats)
  const createdAt = data.created_at || new Date().toISOString();

  // build raw payload (optional but helpful for debugging & ingest)
  const rawPayload = {
    submitted_from: "landing_page",
    form_id: formId,
    recaptcha_token: recaptchaToken,
    payload: {
      name: data.name || data.popup_name || "",
      email: data.email || data.popup_email || "",
      phone: data.phone || data.popup_phone || "",
      message: data.message || data.popup_message || "",
    },
    meta: {
      userAgent: typeof navigator !== "undefined" ? navigator.userAgent : null,
      pageUrl: typeof window !== "undefined" ? window.location.href : null,
      timestamp: new Date().toISOString(),
    },
  };

  // Map fields expected by the FastAPI /lead_ingest endpoint
  const payload = {
    lead_id: String(leadId),
    form: formId,
    name: data.name || data.popup_name || "",
    email: (data.email || data.popup_email || "").trim().toLowerCase() || null,
    phone: data.phone || data.popup_phone || null,
    created_at: createdAt,
    raw: rawPayload,
  };

  // Debug logs (keeps existing debug style)
  console.log("🚀 POST to /lead_ingest:", apiRequest, payload);

  try {
    const response = await fetch(apiRequest, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
    });

    console.log(
      "📡 API Response Status:",
      response.status,
      response.statusText
    );

    if (!response.ok) {
      const text = await response.text();
      console.error("❌ /lead_ingest error body:", text);
      throw new Error(
        `lead_ingest error: ${response.status} ${text || response.statusText}`
      );
    }

    const resJson = await response.json();
    console.log("✅ /lead_ingest success:", resJson);
    return resJson;
  } catch (err: any) {
    console.error("❌ createEmail -> /lead_ingest failed:", err);
    throw err;
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
    const isRecaptchaError =
      error.message?.includes("reCAPTCHA") || error.message?.includes("422");

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
  const [apiLogs, setApiLogs] = useState<
    Array<{ time: string; type: string; message: string }>
  >([]);

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
          gcode: "test-token",
        };

        console.log("🧪 Testing API Call...");
        console.log(
          "📤 Request URL: https://api.fynocrat.com/fynocrat/lead/request"
        );
        console.log("📤 Request Data:", testData);

        try {
          const response = await fetch(
            "https://api.fynocrat.com/fynocrat/lead/request",
            {
              method: "POST",
              body: JSON.stringify(testData),
              headers: { "Content-Type": "application/json" },
            }
          );

          console.log(
            "📡 Response Status:",
            response.status,
            response.statusText
          );
          console.log("📡 Response OK:", response.ok);

          if (!response.ok) {
            const errorText = await response.text();
            console.error("❌ API Error Response:", errorText);
            return {
              success: false,
              status: response.status,
              error: errorText,
            };
          }

          const data = await response.json();
          console.log("✅ API Success Response:", data);
          return { success: true, status: response.status, data };
        } catch (error: any) {
          console.error("❌ API Request Failed:", error);
          return { success: false, error: error.message };
        }
      };
      console.log(
        "💡 API Test Function Available! Run testAPICall() in console to test the API"
      );
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
          position: "top-center",
        });

        // Reset success message after delay
        setTimeout(() => {
          setSuccess(false);
        }, 3000);
      } else {
        console.error("❌ Form submission failed:", fetcher.data);
        if (debugMode) {
          addDebugLog(
            "error",
            fetcher.data.error || fetcher.data.message || "Unknown error"
          );
        }

        // If it's a reCAPTCHA error, reset the reCAPTCHA
        if (fetcher.data.isRecaptchaError) {
          resetRecaptcha();
        }

        showNotification({
          title: "Error",
          message:
            fetcher.data.message ||
            fetcher.data.error ||
            "Something went wrong. Please try again.",
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
        leftSection={<IconBrandWhatsapp size={28} color='white' />} // bigger icon
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
        Get Stock Idea
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
    console.log(
      "🔐 reCAPTCHA Token Received:",
      token ? `Token present (${token.substring(0, 20)}...)` : "No token"
    );

    if (token) {
      setRecaptchaToken(token);
      setCaptchaChecked(true);

      // Update main form hidden field immediately
      const el =
        typeof document !== "undefined"
          ? (document.getElementById(
              "g-recaptcha-response"
            ) as HTMLInputElement | null)
          : null;
      if (el) {
        el.value = token;
        console.log("✅ Updated main form hidden field with token");
      }

      // Update popup form hidden field immediately
      const popupEl =
        typeof document !== "undefined"
          ? (document.getElementById(
              "popup-recaptcha"
            ) as HTMLInputElement | null)
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
      const el = document.getElementById(
        "g-recaptcha-response"
      ) as HTMLInputElement | null;
      if (el) {
        el.value = recaptchaToken;
        el.setAttribute("value", recaptchaToken);
      }
      const popupEl = document.getElementById(
        "popup-recaptcha"
      ) as HTMLInputElement | null;
      if (popupEl) {
        popupEl.value = recaptchaToken;
        popupEl.setAttribute("value", recaptchaToken);
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
    const el = document.getElementById(
      "g-recaptcha-response"
    ) as HTMLInputElement | null;
    if (el) {
      el.value = "";
      el.removeAttribute("value");
    }
    const popupEl = document.getElementById(
      "popup-recaptcha"
    ) as HTMLInputElement | null;
    if (popupEl) {
      popupEl.value = "";
      popupEl.removeAttribute("value");
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
    const nameInputs = document.querySelectorAll(
      'input[name="name"], input[name="popup_name"]'
    );
    const emailInputs = document.querySelectorAll(
      'input[name="email"], input[name="popup_email"]'
    );
    const phoneInputs = document.querySelectorAll(
      'input[name="phone"], input[name="popup_phone"]'
    );
    const messageInputs = document.querySelectorAll(
      'textarea[name="message"], textarea[name="popup_message"]'
    );

    // Clear all inputs and trigger events for Mantine components
    [...nameInputs, ...emailInputs, ...phoneInputs].forEach((input) => {
      const element = input as HTMLInputElement;
      element.value = "";
      // Trigger input event to update Mantine component state
      element.dispatchEvent(new Event("input", { bubbles: true }));
      element.dispatchEvent(new Event("change", { bubbles: true }));
    });

    messageInputs.forEach((textarea) => {
      const element = textarea as HTMLTextAreaElement;
      element.value = "";
      // Trigger input event to update Mantine component state
      element.dispatchEvent(new Event("input", { bubbles: true }));
      element.dispatchEvent(new Event("change", { bubbles: true }));
    });

    console.log("✅ All form fields cleared and reset");
  }, []);

  // Handle form submission - ensure we have the latest reCAPTCHA token
  const handleFormSubmit = useCallback(
    (e: React.FormEvent<HTMLFormElement>) => {
      e.preventDefault();
      e.stopPropagation();

      // Get the latest token from ALL possible sources
      const mainToken = recaptchaRef.current?.getValue();
      const popupToken = popupRecaptchaRef.current?.getValue();
      const stateToken = recaptchaToken;

      // Use the first available token
      const currentToken = mainToken || popupToken || stateToken || "";

      console.log("🔐 Form Submit Handler - Token Check:", {
        fromMainRef: mainToken
          ? `Present (${mainToken.substring(0, 20)}...)`
          : "None",
        fromPopupRef: popupToken
          ? `Present (${popupToken.substring(0, 20)}...)`
          : "None",
        fromState: stateToken
          ? `Present (${stateToken.substring(0, 20)}...)`
          : "None",
        currentToken: currentToken
          ? `Present (${currentToken.substring(0, 20)}...)`
          : "MISSING",
      });

      if (!currentToken || currentToken.trim() === "") {
        console.error("❌ Form submission blocked - No reCAPTCHA token found");
        showNotification({
          title: "reCAPTCHA Required",
          message:
            "Please complete the reCAPTCHA verification before submitting. Make sure you check the 'I'm not a robot' box.",
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

      console.log(
        "✅ Token added to FormData:",
        currentToken.substring(0, 20) + "..."
      );
      console.log(
        "🔐 Verifying token in FormData:",
        formData.get("g-recaptcha-response") ? "Present" : "MISSING!"
      );

      // Submit using fetcher.submit to ensure token is included
      fetcher.submit(formData, {
        method: "post",
        encType: "multipart/form-data",
      });

      console.log("✅ Form submitted with token via fetcher.submit");
    },
    [recaptchaToken, fetcher]
  );

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
          <Group justify='space-between' mb={10}>
            <Text fw={700} c='#0080ff'>
              🔍 API Debug Panel
            </Text>
            <Button
              size='xs'
              variant='subtle'
              onClick={() => setDebugMode(false)}
              style={{ color: "#fff" }}
            >
              ✕ Close
            </Button>
          </Group>
          <Text size='xs' c='dimmed' mb={10}>
            Fetcher State: <strong>{fetcher.state}</strong>
          </Text>
          <Text size='xs' c='dimmed' mb={10}>
            Is Submitting: <strong>{isSubmitting ? "Yes" : "No"}</strong>
          </Text>
          {fetcher.data && (
            <Box mb={10}>
              <Text size='xs' fw={700} mb={5}>
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
              <Text size='xs' fw={700} mb={5}>
                API Logs:
              </Text>
              <Stack gap={4}>
                {apiLogs.map((log, idx) => (
                  <Box
                    key={idx}
                    style={{
                      padding: 6,
                      backgroundColor:
                        log.type === "error"
                          ? "#5a1a1a"
                          : log.type === "success"
                            ? "#1a5a1a"
                            : "#1a1a3a",
                      borderRadius: 4,
                    }}
                  >
                    <Text size='xs'>
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
      <HomeBanner
        isMobile={isMobile}
        isSubmitting={isSubmitting}
        recaptchaToken={recaptchaToken}
        captchaChecked={captchaChecked}
        recaptchaRef={recaptchaRef}
        mainFormRef={mainFormRef}
        fetcher={fetcher}
        handleCaptcha={handleCaptcha}
        handleFormSubmit={handleFormSubmit}
      />
      {/* {success && (
        <div className='success-popup'>
          ✔ Your details have been received successfully. Our research team
          will connect with you soon.
        </div>
      )} */}
      <ChatButton />

      {/* -------------------------------- SECTION 2 — WHAT WE OFFER (WHITE BG) -------------------------------- */}
      <ProductsSection
        products={products}
        isMobile={isMobile}
        setFormOpen={setFormOpen}
      />
      {/* -------------------------------- SECTION — WHY FYNOCAT IS DIFFERENT (ICON + TEXT GRID, 3x2) -------------------------------- */}
      <WhyFynocratSection isMobile={isMobile} setFormOpen={setFormOpen} />
      <ClientTestimonials isMobile={isMobile} />
      <Footer />
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
        title='Fill Your Details'
        closeOnClickOutside={!isSubmitting}
        closeOnEscape={!isSubmitting}
      >
        <fetcher.Form
          ref={popupFormRef}
          method='post'
          onSubmit={handleFormSubmit}
        >
          <Stack>
            <TextInput
              label='Name'
              name='popup_name'
              placeholder='John Doe'
              required
              disabled={isSubmitting}
            />

            <TextInput
              label='Email'
              name='popup_email'
              placeholder='your@email.com'
              required
              disabled={isSubmitting}
            />

            <TextInput
              label='Phone'
              name='popup_phone'
              placeholder='+91 98765 43210'
              required
              disabled={isSubmitting}
            />

            <Textarea
              label='Your Message'
              name='popup_message'
              placeholder='I want to explore investment insights.'
              required
              minRows={4}
              disabled={isSubmitting}
            />

            {/* Hidden recaptcha field */}
            <input
              id='popup-recaptcha'
              type='hidden'
              name='g-recaptcha-response'
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
              type='submit'
              size='md'
              radius='md'
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
