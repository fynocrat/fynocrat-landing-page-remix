// app/routes/home.tsx
import React, { useEffect, useState } from "react";
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

export default function Home() {
  const isMobile = useMediaQuery("(max-width: 768px)");
  const [success, setSuccess] = useState(false);
  const [formOpen, setFormOpen] = useState(false);

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

  const handleCaptcha = (token: string | null) => {
    setRecaptchaToken(token);
    setCaptchaChecked(Boolean(token));

    const el =
      typeof document !== "undefined"
        ? (document.getElementById(
            "g-recaptcha-response"
          ) as HTMLInputElement | null)
        : null;

    if (el) el.value = token ?? "";
  };

  return (
    <>
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
          <div className='success-popup'>
            ✔ Your details have been received successfully. Our research team
            will connect with you soon.
          </div>
        )}

        {/* Top Bar */}
        <Container size='xl' style={{ maxWidth: 1400, padding: 0 }}>
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              paddingLeft: isMobile ? 30 : 140,
              paddingRight: isMobile ? 30 : 140,
              marginBottom: isMobile ? 10 : 25,
              marginTop: isMobile ? 20 : 30,
            }}
          >
            <Image
              src='/logo.png'
              alt='Fynocrat'
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

              {/* Rating */}
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
                  <Image src='/rating-stars.png' alt='Rating' />
                </div>
              </div>
            </div>

            {/* Right column: Contact form */}
            <div
              style={{
                marginTop: isMobile ? 20 : -10,
                display: "flex",
                flexDirection: "column",
                alignItems: "flex-end",
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
                radius='md'
                shadow='xl'
                className='form-box'
                style={{ width: isMobile ? "100%" : 420, maxWidth: 420 }}
              >
                <form method='post' style={{ width: "100%" }}>
                  <Stack>
                    <TextInput
                      name='name'
                      label='Name'
                      required
                      radius='md'
                      placeholder='john doe'
                    />

                    <TextInput
                      name='email'
                      label='Email'
                      required
                      radius='md'
                      placeholder='your@email.com'
                    />

                    <TextInput
                      name='phone'
                      label='Phone'
                      required
                      radius='md'
                      placeholder='+91 98765 43210'
                    />

                    <Textarea
                      name='message'
                      label='Your message'
                      required
                      minRows={4}
                      radius='md'
                      placeholder='I am interested in receiving stock ideas.'
                    />

                    <input
                      id='g-recaptcha-response'
                      type='hidden'
                      name='g-recaptcha-response'
                      value={recaptchaToken ?? ""}
                      readOnly
                    />

                    {typeof window !== "undefined" && (
                      <ReCAPTCHA
                        sitekey={
                          import.meta.env.VITE_RECAPTCHA_SITE_KEY ||
                          "6LchBXApAAAAAKt8aDadaFGsLiKb44OsRpOPdcJb"
                        }
                        onChange={handleCaptcha}
                      />
                    )}

                    <Button
                      type='submit'
                      fullWidth
                      radius='md'
                      disabled={!captchaChecked}
                      style={{ height: 45, fontSize: 16, fontWeight: 600 }}
                    >
                      Send Me Stock Idea
                    </Button>
                  </Stack>
                </form>
              </Paper>
            </div>
          </div>
        </Container>
      </Box>
      {/* -------------------------------- SECTION 2 — WHAT WE OFFER (WHITE BG) -------------------------------- */}
      <Box
        style={{
          width: "100%",
          backgroundColor: "#ffffff",
          paddingTop: 80,
          paddingBottom: 80,
        }}
      >
        <Container size='xl' style={{ maxWidth: 1200 }}>
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
              size='lg'
              radius='md'
              color='blue'
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
        <Container size='xl' style={{ maxWidth: 1200 }}>
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
              Why Fynocrat is different
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
                <svg width='28' height='28' viewBox='0 0 24 24' fill='none'>
                  <path
                    d='M12 2a10 10 0 100 20 10 10 0 000-20z'
                    stroke='#3b82f6'
                    strokeWidth='1.4'
                    strokeLinecap='round'
                    strokeLinejoin='round'
                  />
                  <path
                    d='M2 12h20M12 2c2.5 3 2.5 8 0 11M6 4c4 2 8 2 12 0M6 20c4-2 8-2 12 0'
                    stroke='#60a5fa'
                    strokeWidth='1'
                    strokeLinecap='round'
                    strokeLinejoin='round'
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
                <Text fz={14} color='#6b7280' style={{ lineHeight: 1.5 }}>
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
                <svg width='28' height='28' viewBox='0 0 24 24' fill='none'>
                  <path
                    d='M9 18h6M10 21h4'
                    stroke='#f59e0b'
                    strokeWidth='1.4'
                    strokeLinecap='round'
                    strokeLinejoin='round'
                  />
                  <path
                    d='M12 3a6 6 0 00-4 10c0 2 1 3 1 3h6s1-1 1-3a6 6 0 00-4-10z'
                    stroke='#f97316'
                    strokeWidth='1.2'
                    strokeLinecap='round'
                    strokeLinejoin='round'
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
                <Text fz={14} color='#6b7280' style={{ lineHeight: 1.5 }}>
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
                <svg width='28' height='28' viewBox='0 0 24 24' fill='none'>
                  <path
                    d='M12 12a3 3 0 100-6 3 3 0 000 6z'
                    stroke='#06b6d4'
                    strokeWidth='1.2'
                    strokeLinecap='round'
                    strokeLinejoin='round'
                  />
                  <path
                    d='M4 20c1.5-3 4.5-5 8-5s6.5 2 8 5'
                    stroke='#14b8a6'
                    strokeWidth='1.2'
                    strokeLinecap='round'
                    strokeLinejoin='round'
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
                <Text fz={14} color='#6b7280' style={{ lineHeight: 1.5 }}>
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
                <svg width='28' height='28' viewBox='0 0 24 24' fill='none'>
                  <rect
                    x='6'
                    y='6'
                    width='12'
                    height='12'
                    rx='2'
                    stroke='#10b981'
                    strokeWidth='1.2'
                  />
                  <path d='M9 9h6v6H9z' stroke='#059669' strokeWidth='1' />
                  <path
                    d='M3 12h2M19 12h2M12 3v2M12 19v2'
                    stroke='#34d399'
                    strokeWidth='1'
                    strokeLinecap='round'
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
                <Text fz={14} color='#6b7280' style={{ lineHeight: 1.5 }}>
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
                <svg width='28' height='28' viewBox='0 0 24 24' fill='none'>
                  <path
                    d='M12 2l7 3v5c0 5-3.5 9-7 11-3.5-2-7-6-7-11V5l7-3z'
                    stroke='#f97316'
                    strokeWidth='1.2'
                    strokeLinecap='round'
                    strokeLinejoin='round'
                  />
                  <path
                    d='M9 12l2 2 4-4'
                    stroke='#fb923c'
                    strokeWidth='1.2'
                    strokeLinecap='round'
                    strokeLinejoin='round'
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
                <Text fz={14} color='#6b7280' style={{ lineHeight: 1.5 }}>
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
                <svg width='28' height='28' viewBox='0 0 24 24' fill='none'>
                  <path
                    d='M12 2l3 7-7 3-3-7 7-3z'
                    stroke='#6366f1'
                    strokeWidth='1.2'
                    strokeLinecap='round'
                    strokeLinejoin='round'
                  />
                  <path
                    d='M9 15l6 6M15 9l6 6'
                    stroke='#8b5cf6'
                    strokeWidth='1'
                    strokeLinecap='round'
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
                <Text fz={14} color='#6b7280' style={{ lineHeight: 1.5 }}>
                  We question common assumptions and explore unconventional
                  strategies to find overlooked opportunities.
                </Text>
              </div>
            </div>
          </SimpleGrid>

          {/* CTA */}
          <div style={{ marginTop: isMobile ? 36 : 56, textAlign: "center" }}>
            <Button
              size='lg'
              radius='md'
              color='blue'
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
        onClose={() => setFormOpen(false)}
        centered
        size={isMobile ? "90%" : "lg"}
        title='Fill Your Details'
      >
        <form method='post'>
          <Stack>
            <TextInput
              label='Name'
              name='popup_name'
              placeholder='John Doe'
              required
            />

            <TextInput
              label='Email'
              name='popup_email'
              placeholder='your@email.com'
              required
            />

            <TextInput
              label='Phone'
              name='popup_phone'
              placeholder='+91 98765 43210'
              required
            />

            <Textarea
              label='Your Message'
              name='popup_message'
              placeholder='I want to explore investment insights.'
              required
              minRows={4}
            />

            {/* Hidden recaptcha field */}
            <input
              id='popup-recaptcha'
              type='hidden'
              name='g-recaptcha-response'
              value={recaptchaToken ?? ""}
              readOnly
            />

            {/* ReCAPTCHA widget */}
            {typeof window !== "undefined" && (
              <ReCAPTCHA
                sitekey={
                  import.meta.env.VITE_RECAPTCHA_SITE_KEY ||
                  "6LchBXApAAAAAKt8aDadaFGsLiKb44OsRpOPdcJb"
                }
                onChange={handleCaptcha}
              />
            )}

            <Button
              type='submit'
              size='md'
              radius='md'
              disabled={!captchaChecked}
              style={{
                backgroundColor: "#0080ff",
                fontWeight: 600,
              }}
            >
              Submit
            </Button>
          </Stack>
        </form>
      </Modal>
    </>
  );
}
