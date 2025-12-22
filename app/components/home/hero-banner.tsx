// app/components/home/HomeBanner.tsx
import React, { useEffect, useState } from "react";
import {
  Box,
  Container,
  Image,
  Text,
  Paper,
  Stack,
  Button,
  TextInput,
  Textarea,
  Space,
} from "@mantine/core";
import ReCAPTCHA from "react-google-recaptcha";

// ⭐ SVG STAR COMPONENT
const Star = ({
  size = 28,
  color = "#FFC043",
}: {
  size?: number;
  color?: string;
}) => (
  <svg width={size} height={size} viewBox='0 0 24 24' fill={color}>
    <path d='M12 .587l3.668 7.568L24 9.748l-6 5.848L19.335 24 12 19.897 4.665 24 6 15.596 0 9.748l8.332-1.593z' />
  </svg>
);

type Props = {
  isMobile: boolean;
  isSubmitting: boolean;
  recaptchaToken: string | null;
  captchaChecked: boolean;
  recaptchaRef: React.RefObject<ReCAPTCHA | null>;
  mainFormRef: React.RefObject<HTMLFormElement | null>;
  fetcher: any;
  handleCaptcha: (token: string | null) => void;
  handleFormSubmit: (e: React.FormEvent<HTMLFormElement>) => void;
};

export default function HomeBanner({
  isMobile,
  isSubmitting,
  recaptchaToken,
  captchaChecked,
  recaptchaRef,
  mainFormRef,
  fetcher,
  handleCaptcha,
  handleFormSubmit,
}: Props) {
  const [loadCaptcha, setLoadCaptcha] = useState(false);

  // Preload WebP hero for BEST LCP
  useEffect(() => {
    const link = document.createElement("link");
    link.rel = "preload";
    link.as = "image";
    link.href = "/bannerhero.webp";
    document.head.appendChild(link);

    return () => {
      if (document.head.contains(link)) {
        document.head.removeChild(link);
      }
    };
  }, []);

  // Lazy-load CAPTCHA when form enters viewport
  useEffect(() => {
    if (typeof window === "undefined" || loadCaptcha) return;

    const target =
      mainFormRef?.current || document.getElementById("contact-form-wrapper");

    if (!target) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setLoadCaptcha(true);
          observer.disconnect();
        }
      },
      { root: null, rootMargin: "200px", threshold: 0.01 }
    );

    observer.observe(target);

    return () => observer.disconnect();
  }, [mainFormRef, loadCaptcha]);

  return (
    <Box
      style={{
        position: "relative",
        width: "100%",
        overflow: "hidden",
        fontFamily: "Poppins, sans-serif",
        paddingBottom: 80,
        background: "#002b47",
      }}
    >
      {/* ⭐ HERO BACKGROUND IMAGE (NO CLS) */}
      {/* <div
        style={{
          position: "absolute",
          inset: 0,
          width: "100%",
          height: "100vh",
          overflow: "hidden",
          zIndex: 0,
        }}
      >
        <picture>
          <source srcSet="/bannerhero.webp" type="image/webp" />
          <img
            src="/bannerhero.png"
            width={1920}
            height={1080}
            style={{
              width: "100%",
              height: "100%",
              objectFit: "cover",
            }}
            decoding="async"
            fetchPriority="high"
            alt="Fynocrat Research Banner"
          />
        </picture>
      </div> */}

      {/* ⭐ FOREGROUND CONTENT */}
      <div style={{ position: "relative", zIndex: 10 }}>
        <Container size='xl' style={{ maxWidth: 1400, padding: 0 }}>
          {/* ⭐ TOP BAR */}
          <div
            style={{
              display: "grid",
              gridTemplateColumns: isMobile ? "1fr" : "48% 40%",
              gridTemplateRows: isMobile ? "auto auto" : "auto",
              columnGap: isMobile ? 0 : 140,
              rowGap: isMobile ? 5 : 0,
              alignItems: "center",
              paddingLeft: isMobile ? 20 : 100,
              paddingRight: isMobile ? 20 : 100,
              marginBottom: isMobile ? 10 : 25,
              marginTop: isMobile ? 20 : 30,
            }}
          >
            <Image
              src='/logo.png'
              alt='Fynocrat'
              width={isMobile ? 180 : 190}
              style={{
                width: isMobile ? 180 : 190,
                height: "auto",
                objectFit: "contain",
                placeSelf: isMobile ? "center" : "start",
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

          {/* ⭐ MAIN CONTENT GRID */}
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
            {/* ⭐ LEFT TEXT SECTION */}
            <div style={{ paddingTop: isMobile ? 20 : 60 }}>
              <h1
                style={{
                  color: "#fff",
                  fontSize: isMobile ? 25 : 40,
                  fontWeight: 600,
                  lineHeight: 1.5,
                  marginBottom: 30,
                }}
              >
                <span>You Don’t Need </span>
                <span style={{ color: "#ff5b5b" }}>More Tips.</span>
                <br />
                <span>You Need </span>
                <span style={{ color: "#86ff70" }}>Real Research.</span>
              </h1>

              <Text
                style={{
                  color: "#ffffff",
                  opacity: 0.82,
                  fontSize: isMobile ? 11 : 17,
                  lineHeight: 1.7,
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
                  fontSize: isMobile ? 10 : 15,
                  lineHeight: 1.7,
                  marginTop: 10,
                  maxWidth: 600,
                }}
              >
                Because the best investors don’t chase stocks — they understand
                them.
              </Text>

              <Space h={isMobile ? 30 : 100} />

              {/* ⭐ SVG STAR RATING BLOCK (NO PNG!) */}
              <div style={{ display: "flex", alignItems: "baseline" }}>
                <Text
                  style={{
                    color: "white",
                    fontSize: isMobile ? 70 : 110,
                    fontWeight: 700,
                    lineHeight: 1,
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
                    marginLeft: 8,
                  }}
                >
                  /5
                </Text>

                <Space w={isMobile ? 10 : 20} />

                <div style={{ display: "flex", alignItems: "center", gap: 6 }}>
                  <Star size={isMobile ? 24 : 30} />
                  <Star size={isMobile ? 24 : 30} />
                  <Star size={isMobile ? 24 : 30} />
                  <Star size={isMobile ? 24 : 30} />

                  {/* ⭐ HALF STAR */}
                  <div
                    style={{
                      position: "relative",
                      width: isMobile ? 24 : 30,
                      height: isMobile ? 24 : 30,
                    }}
                  >
                    <Star size={isMobile ? 24 : 30} color='#FFE7A4' />
                    <div
                      style={{
                        position: "absolute",
                        left: 0,
                        top: 0,
                        width: "60%",
                        height: "100%",
                        overflow: "hidden",
                      }}
                    >
                      <Star size={isMobile ? 24 : 30} color='#FFC043' />
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* ⭐ RIGHT FORM SECTION */}
            <div
              id='contact-form-wrapper'
              style={{
                marginTop: isMobile ? 20 : -10,
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
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
                style={{ width: isMobile ? "100%" : 420 }}
              >
                <fetcher.Form
                  ref={mainFormRef}
                  method='post'
                  onSubmit={handleFormSubmit}
                >
                  <Stack>
                    <TextInput
                      name='name'
                      label='Name'
                      required
                      radius='md'
                      disabled={isSubmitting}
                      placeholder='john doe'
                    />

                    <TextInput
                      name='email'
                      label='Email'
                      required
                      radius='md'
                      disabled={isSubmitting}
                      placeholder='your@email.com'
                    />

                    <TextInput
                      name='phone'
                      label='Phone'
                      required
                      radius='md'
                      disabled={isSubmitting}
                      placeholder='+91 98765 43210'
                    />

                    <Textarea
                      name='message'
                      label='Your message'
                      required
                      minRows={4}
                      radius='md'
                      disabled={isSubmitting}
                      placeholder='I am interested in receiving stock ideas.'
                    />

                    <input
                      type='hidden'
                      name='g-recaptcha-response'
                      value={recaptchaToken ?? ""}
                    />

                    {loadCaptcha && (
                      <ReCAPTCHA
                        ref={recaptchaRef}
                        sitekey={
                          import.meta.env.VITE_RECAPTCHA_SITE_KEY ||
                          "6LchBXApAAAAAKt8aDadaFGsLiKb44OsRpOPdcJb"
                        }
                        onChange={handleCaptcha}
                        onExpired={() => handleCaptcha(null)}
                      />
                    )}

                    <Button
                      type='submit'
                      fullWidth
                      radius='md'
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
      </div>
    </Box>
  );
}
