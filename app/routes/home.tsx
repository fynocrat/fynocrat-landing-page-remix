// app/routes/home.tsx (replace your existing route file)
import React, { useEffect, useState } from "react";
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
  useMantineTheme,
  Space,
} from "@mantine/core";
import { useMediaQuery } from "@mantine/hooks";
import ReCAPTCHA from "react-google-recaptcha";

/* If you have a server action to keep, export it here (Remix) or in your server handlers.
export async function action({ request }: any) {
  const formData = await request.formData();
  // validate recaptcha server-side if you want
  return redirect("/?success=1");
}
*/

export default function Home() {
  const theme = useMantineTheme();
  const isMobile = useMediaQuery("(max-width: 768px)");
  const [success, setSuccess] = useState(false);

  // detect ?success=1 when server redirects back (transient)
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
    // write to hidden input so the plain form includes it
    const el =
      typeof document !== "undefined"
        ? (document.getElementById(
            "g-recaptcha-response"
          ) as HTMLInputElement | null)
        : null;
    if (el) el.value = token ?? "";
  };

  return (
    <Box
      style={{
        backgroundImage: "url('/banner.png')",
        backgroundSize: "cover",
        backgroundRepeat: "no-repeat",
        backgroundPosition: "center",
        width: "100%",
        overflow: "hidden",
        margin: 0,
        minHeight: "100vh",
        position: "relative",
        fontFamily: "Poppins, sans-serif",
      }}
    >
      {success && (
        <div className="success-popup">
          ✔ Your details have been received successfully. Our research team
          will connect with you soon with insights curated exclusively for
          serious investors like you.
        </div>
      )}

      <Container size="xl" style={{ maxWidth: 1400, padding: 0 }}>
        {/* Top Bar */}
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center", // aligns logo + SEBI text horizontally center
            paddingLeft: isMobile ? 30 : 140,
            paddingRight: isMobile ? 30 : 140,
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
              // ❌ REMOVE marginTop and marginBottom
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
                displayflex: "flex",
                flexDirection: "column",
                justifyContent: "center",
                color: "#fff",
                fontSize: isMobile ? 30 : 40,
                fontWeight: 700,
                lineHeight: 1.15,
                marginBottom: 30,
                minHeight: 120,
                paddingTop: isMobile ? 0 : 20,
              }}
            >
              You Don’t Need More Tips.
              <br />
              
              You Need Real Research.
            </Title>

            <Text
              style={{
                color: "#FFFFFF",
                opacity: 0.82,
                fontSize: isMobile ? 11 : 13,
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
                color: "#FFFFFF",
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
              <div
                style={{
                  width: isMobile ? 150 : 220,
                }}
              >
                <Image src="/rating-stars.png" alt="Rating" />
              </div>
            </div>

            {/* Stars */}
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
            {/* ⭐ Place the heading here */}
            <Text
              style={{
                color: "#fff",
                fontWeight: 600,
                fontSize: isMobile ? 20 : 24,
                marginBottom: isMobile ? 10 : 20,
                textAlign: "right",
                maxWidth: 920,
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
              {/* Keep plain form so server action receives data */}
              <form method="post" style={{ width: "100%" }}>
                <Stack>
                  <TextInput
                    name="name"
                    label="Name"
                    placeholder="john doe"
                    required
                    radius="md"
                    classNames={{ input: "form-input", label: "form-label" }}
                  />

                  <TextInput
                    name="email"
                    label="Email"
                    placeholder="your@email.com"
                    required
                    radius="md"
                    classNames={{ input: "form-input", label: "form-label" }}
                  />

                  <TextInput
                    name="phone"
                    label="Phone"
                    placeholder="+91 98765 43210"
                    required
                    radius="md"
                    classNames={{ input: "form-input", label: "form-label" }}
                  />

                  <Textarea
                    name="message"
                    label="Your message"
                    placeholder="I am interested in receiving stock ideas."
                    required
                    minRows={4}
                    radius="md"
                    classNames={{ input: "form-input", label: "form-label" }}
                  />

                  {/* hidden recaptcha token input; value updated on client */}
                  <input
                    id="g-recaptcha-response"
                    type="hidden"
                    name="g-recaptcha-response"
                    value={recaptchaToken ?? ""}
                    readOnly
                  />

                  {/* render ReCAPTCHA only on client (prevents SSR issues) */}
                  {typeof window !== "undefined" && (
                    <div>
                      <ReCAPTCHA
                        sitekey={
                          import.meta.env.VITE_RECAPTCHA_SITE_KEY ||
                          "6LchBXApAAAAAKt8aDadaFGsLiKb44OsRpOPdcJb"
                        }
                        onChange={handleCaptcha}
                      />
                    </div>
                  )}

                  <Button
                    type="submit"
                    fullWidth
                    radius="md"
                    disabled={!captchaChecked}
                    className="form-button"
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
  );
}
