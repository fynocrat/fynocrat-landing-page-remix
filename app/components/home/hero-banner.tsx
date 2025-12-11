// app/components/home/HomeBanner.tsx
import React, { useState } from "react";
import {
  Box,
  Container,
  Image,
  Text,
  Title,
  Paper,
  Stack,
  Button,
  TextInput,
  Textarea,
  Space,
} from "@mantine/core";
import ReCAPTCHA from "react-google-recaptcha";
const Star = ({
  size = 28,
  color = "#FFC043",
}: {
  size?: number;
  color?: string;
}) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 24 24"
    fill={color}
    stroke="none"
  >
    <path d="M12 .587l3.668 7.568L24 9.748l-6 5.848L19.335 24 12 19.897 4.665 24 6 15.596 0 9.748l8.332-1.593z" />
  </svg>
);



type Props = {
  isMobile: boolean;
  isSubmitting: boolean;
  recaptchaToken: string | null;
  captchaChecked: boolean;
  recaptchaRef: React.RefObject<ReCAPTCHA | null>;
  mainFormRef: React.RefObject<HTMLFormElement | null>;
  fetcher: any; // pass your useFetcher() result; use `UseFetcherReturn` if you prefer stricter typing
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

  return (
    <Box
      style={{
        position: "relative",
        zIndex: 0,
        width: "100%",
        minHeight: "100vh",
        overflow: "hidden",
        fontFamily: "Poppins, sans-serif",
        paddingBottom: 80,
      }}
    >
      <img
  src="/bannerhero.png"
  alt="Fynocrat Research Banner"
  fetchPriority="high"
  decoding="async"
  style={{
    position: "absolute",
    inset: 0,
    width: "100%",
    height: "100%",
    objectFit: "cover",
    zIndex: 0,          // ✔ MUST NOT be -1
  }}
/>
<div style={{ position: "relative", zIndex: 10 }}>


      {/* Top Bar */}
      <Container size="xl" style={{ maxWidth: 1400, padding: 0 }}>
        <div
          style={{
            display: "grid",
            gridTemplateColumns: isMobile ? "1fr" : "48% 40%",
            gridTemplateRows: isMobile ? "auto auto" : "auto", // ⭐ forces 2 rows on mobile
            columnGap: isMobile ? 0 : 140,
            rowGap: isMobile ? 5 : 0, // ⭐ spacing between logo + SEBI
            // justifyItems: isMobile ? "center" : "start",        // ⭐ center on mobile
            alignItems: "center",
            // placeItems: "center",
            paddingLeft: isMobile ? 20 : 100,
            paddingRight: isMobile ? 20 : 100,
            marginBottom: isMobile ? 10 : 25,
            marginTop: isMobile ? 20 : 30,
          }}
        >
          {/* LOGO */}
          <Image
            src="/logo.png"
            alt="Fynocrat"
            style={{
              width: isMobile ? 180 : 190,
              height: "auto",
              placeSelf: isMobile ? "center" : "start", // center logo on mobile
              objectFit: "contain",
            }}
          />

          {/* SEBI NUMBER */}
          <Text
            style={{
              color: "#fff",
              fontWeight: 100,
              fontSize: isMobile ? 12 : 24,
              opacity: 0.9,
              textAlign: "center",
              marginTop: isMobile ? 4 : 0, // small spacing under logo
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
            <h1
  style={{
    color: "#fff",
    fontSize: isMobile ? 25 : 40,
    fontWeight: 600,
    lineHeight: 1.5,
    marginBottom: 30,
    paddingTop: isMobile ? 0 : 20,
  }}>
              <span style={{ color: "#ffffff" }}>You Don’t Need </span>
              <span style={{ color: "#ff5b5b" }}>More Tips.</span>
              <br />
              <span style={{ color: "#ffffff" }}>You Need </span>
              <span style={{ color: "#86ff70" }}>Real Research.</span>
            </h1>

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
                fontSize: isMobile ? 10 : 15,
                lineHeight: 1.7,
                marginTop: 10,
                maxWidth: 600,
                whiteSpace: "nowrap",
              }}
            >
              Because the best investors don’t chase stocks — they understand
              them.
            </Text>

            <Space h={isMobile ? 30 : 100} />

            {/* ⭐ Rating Block */}
            <div style={{ display: "flex", alignItems: "center", gap: 20 }}>
              {/* LEFT — Number + /5 */}
              <div style={{ display: "flex", alignItems: "flex-end", gap: 6 }}>
                <Text
                  style={{
                    color: "#fff",
                    fontSize: isMobile ? 60 : 110,
                    fontWeight: 700,
                    lineHeight: 1,
                  }}
                >
                  4.7
                </Text>

                <Text
                  style={{
                    color: "#fff",
                    fontSize: isMobile ? 22 : 32,
                    fontWeight: 500,
                    opacity: 0.9,
                    marginBottom: isMobile ? 4 : 12,
                  }}
                >
                  /5
                </Text>
              </div>

              {/* RIGHT — Google Rating ABOVE stars */}
              <div style={{ display: "flex", flexDirection: "column" }}>
                {/* Google Rating (ABOVE stars) */}
                <Text
                  style={{
                    color: "#FFC043",
                    fontSize: isMobile ? 11 : 14,
                    marginBottom: 4, // small gap before stars
                  }}
                >
                  Google Rating
                </Text>

                {/* ⭐ Stars Row */}
                <div style={{ display: "flex", alignItems: "center", gap: 6 }}>
                  <Star size={isMobile ? 24 : 30} />
                  <Star size={isMobile ? 24 : 30} />
                  <Star size={isMobile ? 24 : 30} />
                  <Star size={isMobile ? 24 : 30} />

                  {/* half star */}
                  <div
                    style={{
                      position: "relative",
                      width: isMobile ? 24 : 30,
                      height: isMobile ? 24 : 30,
                    }}
                  >
                    <Star size={isMobile ? 24 : 30} color="#FFE7A4" />
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
                      <Star size={isMobile ? 24 : 30} color="#FFC043" />
                    </div>
                  </div>
                </div>
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
                fontWeight: 100,
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
              onMouseEnter={() => setLoadCaptcha(true)}
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
                    onFocus={() => setLoadCaptcha(true)}
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
                    color="#000"
                    disabled={isSubmitting}
                  />

                  <input
                    id="g-recaptcha-response"
                    type="hidden"
                    name="g-recaptcha-response"
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
                      onExpired={() => {
                        // child keeps this minimal — parent handles token state
                        handleCaptcha(null);
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
      </div>
    </Box>
  );
}
