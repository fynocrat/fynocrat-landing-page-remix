// app/routes/home.tsx
import React, { useEffect, useState, useCallback, useRef } from "react";
import { Modal } from "@mantine/core";
import {
  Box,
  Text,
  Container,
  Stack,
  Button,
  TextInput,
  Textarea,
  Group,
} from "@mantine/core";
import { useMediaQuery } from "@mantine/hooks";
// import ReCAPTCHA from "react-google-recaptcha"; ❌ COMMENTED ONLY
import { IconBrandWhatsapp } from "@tabler/icons-react";
import { useFetcher } from "react-router";
import { showNotification } from "@mantine/notifications";
import { json } from "@remix-run/node";

import HomeBanner from "~/components/home/hero-banner";
import ProductsSection from "~/components/home/products-section";
import WhyFynocratSection from "~/components/home/why-fynocrat-section";
import ClientTestimonials from "~/components/home/client-testimonials";
import Footer from "~/components/footer";

/* -------------------------------------------------------------------------- */
/*                                ICONS (USED)                                */
/* -------------------------------------------------------------------------- */

const IconTrendingUp = () => (
  <svg width="48" height="48" viewBox="0 0 24 24" fill="none">
    <path d="M3 17l6-6 4 4 8-8" stroke="#0f172a" strokeWidth="1.6" />
    <path d="M21 21v-4h-4" stroke="#0f172a" strokeWidth="1.6" />
  </svg>
);

const IconArrowBounce = () => (
  <svg width="48" height="48" viewBox="0 0 24 24" fill="none">
    <path d="M3 12h6l2-3 4 6 6-9" stroke="#0f172a" strokeWidth="1.6" />
  </svg>
);

const IconZap = () => (
  <svg width="48" height="48" viewBox="0 0 24 24" fill="none">
    <path d="M13 2L3 14h7l-1 8 10-12h-7l1-8z" stroke="#0f172a" strokeWidth="1.6" />
  </svg>
);

const IconRocket = () => (
  <svg width="48" height="48" viewBox="0 0 24 24" fill="none">
    <path
      d="M12 2s-4 4-7 7c-1.5 1.5-3 6-3 6s4-1.2 5.5-2.7C11 11 17 7 17 7s-1.8-1.6-5-5z"
      stroke="#0f172a"
      strokeWidth="1.6"
    />
  </svg>
);

const IconShieldCheck = () => (
  <svg width="48" height="48" viewBox="0 0 24 24" fill="none">
    <path d="M12 2l7 3v5c0 5-3.5 9-7 11-3.5-2-7-6-7-11V5l7-3z" stroke="#0f172a" strokeWidth="1.6" />
    <path d="M9.5 12.5l1.8 1.8L15 10" stroke="#0f172a" strokeWidth="1.6" />
  </svg>
);

const IconDiamond = () => (
  <svg width="48" height="48" viewBox="0 0 24 24" fill="none">
    <path d="M3 9l9-6 9 6-4 10H7L3 9z" stroke="#0f172a" strokeWidth="1.6" />
  </svg>
);

/* -------------------------------------------------------------------------- */
/*                                   ACTION                                   */
/* -------------------------------------------------------------------------- */

const createEmail = async (data: Record<string, any>) => {
  const response = await fetch("https://soapi.fynocrat.com/lead_ingest", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      lead_id: `landing-${Date.now()}`,
      form: "landing_page_form",
      name: data.name || data.popup_name,
      email: data.email || data.popup_email,
      phone: data.phone || data.popup_phone,
      raw: { message: data.message || data.popup_message },
    }),
  });

  if (!response.ok) throw new Error("API failed");
  return response.json();
};

export const action = async ({ request }: { request: Request }) => {
  const formData = Object.fromEntries(await request.formData());
  try {
    await createEmail(formData);
    return json({ success: true, message: "Form submitted successfully" });
  } catch {
    return json({ success: false, message: "Submission failed" }, { status: 500 });
  }
};

/* -------------------------------------------------------------------------- */
/*                                   PAGE                                     */
/* -------------------------------------------------------------------------- */

export default function Home() {
  const fetcher = useFetcher();
  const isMobile = useMediaQuery("(max-width: 768px)");

  const [formOpen, setFormOpen] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const mainFormRef = useRef<HTMLFormElement>(null);
  const popupFormRef = useRef<HTMLFormElement>(null);

  /* ----------------------------- PRODUCTS (FIXED) ----------------------------- */

  const products = [
    {
      title: "Wealth Builder Portfolio",
      desc: "Long-term wealth compounding portfolio.",
      icon: <IconTrendingUp />,
      href: "https://fynocrat.com/invest/wealth-builder",
      accent: "#6E44FF",
    },
    {
      title: "Mauka",
      desc: "Medium-term opportunities during corrections.",
      icon: <IconArrowBounce />,
      href: "https://fynocrat.com/invest/mauka",
      accent: "#2D6EF6",
    },
    {
      title: "T-20",
      desc: "Short-term high conviction trades.",
      icon: <IconZap />,
      href: "https://fynocrat.com/invest/t-20",
      accent: "#B23327",
    },
    {
      title: "IPO Corner",
      desc: "IPO research & insights.",
      icon: <IconRocket />,
      href: "https://fynocrat.com/invest/ipo",
      accent: "#4F3FB3",
    },
    {
      title: "Blue Chip Edge",
      desc: "Stable blue-chip opportunities.",
      icon: <IconShieldCheck />,
      href: "https://fynocrat.com/invest/blue-chip-edge",
      accent: "#D66A27",
    },
    {
      title: "Fynocrat Premium",
      desc: "HNI & U-HNI personalised advisory.",
      icon: <IconDiamond />,
      href: "https://fynocrat.com/invest/premium",
      accent: "#2F7D32",
    },
  ];

  /* ----------------------------- FORM SUBMIT ----------------------------- */

  const handleFormSubmit = useCallback(
    (e: React.FormEvent<HTMLFormElement>) => {
      e.preventDefault();
      fetcher.submit(new FormData(e.currentTarget), { method: "post" });
    },
    [fetcher]
  );

  useEffect(() => {
    setIsSubmitting(fetcher.state === "submitting");
    if (fetcher.data?.success) {
      showNotification({ title: "Success", message: fetcher.data.message, color: "green" });
      mainFormRef.current?.reset();
      popupFormRef.current?.reset();
      setFormOpen(false);
    }
  }, [fetcher.state, fetcher.data]);

  /* ----------------------------- WHATSAPP ----------------------------- */

  const ChatButton = () => (
    <Button
      onClick={() => window.open("https://api.whatsapp.com/send?phone=918448691150", "_blank")}
      leftSection={<IconBrandWhatsapp size={28} />}
      style={{
        position: "fixed",
        bottom: 30,
        right: 30,
        borderRadius: 40,
        background: "#4dc247",
      }}
    >
      Get Stock Idea
    </Button>
  );

  return (
    <>
      <HomeBanner
        isMobile={isMobile}
        isSubmitting={isSubmitting}
        mainFormRef={mainFormRef}
        fetcher={fetcher}
        handleFormSubmit={handleFormSubmit}
      />

      {/* <ChatButton /> */}

      <ProductsSection products={products} isMobile={isMobile} setFormOpen={setFormOpen} />

      <WhyFynocratSection isMobile={isMobile} setFormOpen={setFormOpen} />

      <ClientTestimonials isMobile={isMobile} />

      <Footer />

      <Modal opened={formOpen} onClose={() => setFormOpen(false)} centered>
        <fetcher.Form ref={popupFormRef} method="post" onSubmit={handleFormSubmit}>
          <Stack>
            <TextInput name="popup_name" label="Name" required />
            <TextInput name="popup_email" label="Email" required />
            <TextInput name="popup_phone" label="Phone" required />
            {/* <Textarea name="popup_message" label="Message" required /> */}
            <Button type="submit" loading={isSubmitting}>
              Submit
            </Button>
          </Stack>
        </fetcher.Form>
      </Modal>
    </>
  );
}
