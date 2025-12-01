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
} from "@mantine/core";
import { useMediaQuery } from "@mantine/hooks";
import ReCAPTCHA from "react-google-recaptcha";

export default function Home() {
  const isMobile = useMediaQuery("(max-width: 768px)");
  const [success, setSuccess] = useState(false);
  const [formOpen, setFormOpen] = useState(false);

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
          margin: 0,
          minHeight: "100vh",
          position: "relative",
          fontFamily: "Poppins, sans-serif",
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
                radius="md"
                shadow="xl"
                className="form-box"
                style={{ width: isMobile ? "100%" : 420, maxWidth: 420 }}
              >
                <form method="post" style={{ width: "100%" }}>
                  <Stack>
                    <TextInput
                      name="name"
                      label="Name"
                      required
                      radius="md"
                      placeholder="john doe"
                    />

                    <TextInput
                      name="email"
                      label="Email"
                      required
                      radius="md"
                      placeholder="your@email.com"
                    />

                    <TextInput
                      name="phone"
                      label="Phone"
                      required
                      radius="md"
                      placeholder="+91 98765 43210"
                    />

                    <Textarea
                      name="message"
                      label="Your message"
                      required
                      minRows={4}
                      radius="md"
                      placeholder="I am interested in receiving stock ideas."
                    />

                    <input
                      id="g-recaptcha-response"
                      type="hidden"
                      name="g-recaptcha-response"
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
                      type="submit"
                      fullWidth
                      radius="md"
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
          paddingBottom: 120,
        }}
      >
        <Container size="xl" style={{ maxWidth: 1200 }}>
          <Title
            order={2}
            style={{
              textAlign: "center",
              color: "#000",
              fontFamily: "Poppins",
              fontWeight: 700,
              fontSize: 36,
              marginBottom: 50,
            }}
          >
            What We Offer
          </Title>

          <SimpleGrid
            cols={{ base: 1, sm: 2, md: 3 }}
            spacing={40}
            verticalSpacing={40}
          >
            <Card
              shadow="md"
              radius="md"
              padding="xl"
              style={{
                backgroundColor: "#6E44FF",
                color: "white",
                textAlign: "center",
              }}
            >
              <Text fw={700} fz={20} mt="md">
                Wealth Builder Portfolio
              </Text>
              <Text fz={14} mt={10} opacity={0.9}>
                Model Portfolio of 15-18 Stocks From Emerging Themes.
              </Text>
            </Card>

            <Card
              shadow="md"
              radius="md"
              padding="xl"
              style={{
                backgroundColor: "#2D6EF6",
                color: "white",
                textAlign: "center",
              }}
            >
              <Text fw={700} fz={20} mt="md">
                Mauka
              </Text>
              <Text fz={14} mt={10} opacity={0.9}>
                Leveraging Market Corrections Into Strong Companies.
              </Text>
            </Card>

            <Card
              shadow="md"
              radius="md"
              padding="xl"
              style={{
                backgroundColor: "#B23327",
                color: "white",
                textAlign: "center",
              }}
            >
              <Text fw={700} fz={20} mt="md">
                T-20 Quick Moves, Big Wins !
              </Text>
              <Text fz={14} mt={10} opacity={0.9}>
                Winning Strategic Trades for Short-Term.
              </Text>
            </Card>

            <Card
              shadow="md"
              radius="md"
              padding="xl"
              style={{
                backgroundColor: "#4F3FB3",
                color: "white",
                textAlign: "center",
              }}
            >
              <Text fw={700} fz={20} mt="md">
                IPO Corner (Non-SME)
              </Text>
              <Text fz={14} mt={10} opacity={0.9}>
                Every IPO Tells a Story.
              </Text>
            </Card>

            <Card
              shadow="md"
              radius="md"
              padding="xl"
              style={{
                backgroundColor: "#D66A27",
                color: "white",
                textAlign: "center",
              }}
            >
              <Text fw={700} fz={20} mt="md">
                Blue Chip Edge
              </Text>
              <Text fz={14} mt={10} opacity={0.9}>
                Not Every Giant Grows. We Pick the Ones That Still Can.
              </Text>
            </Card>

            <Card
              shadow="md"
              radius="md"
              padding="xl"
              style={{
                backgroundColor: "#2F7D32",
                color: "white",
                textAlign: "center",
              }}
            >
              <Text fw={700} fz={20} mt="md">
                Fynocrat Premium
              </Text>
              <Text fz={14} mt={10} opacity={0.9}>
                Premium Membership for HNI & U-HNI Clients.
              </Text>
            </Card>
          </SimpleGrid>
          
           <div style={{
             textAlign: "center",
              marginBottom: 25,
              marginTop: 60,  
               }}>
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

      {/* -------------------------------- SECTION 3 — WHY FYNROCAT -------------------------------- */}
      <Box
        style={{
          width: "100%",
          backgroundColor: "#808080",
          paddingTop: 80,
          paddingBottom: 120,
        }}
      >
        <Container size="xxxl" style={{ maxWidth: 1200 }}>

          <Title
            order={2}
            style={{
              textAlign: "center",
              color: "#000",
              fontFamily: "Poppins",
              fontWeight: 700,
              fontSize: 36,
              marginBottom: 40,
            }}
          >
            Why Fynocrat?
          </Title>

          <Stack gap={25}>
            {[
              {
                name: "Wealth Builder Portfolio",
                desc: "Model Portfolio of 15-18 Stocks From Emerging Themes.",
              },
              {
                name: "Mauka",
                desc: "Leverage Market Corrections Into Strong Companies.",
              },
              {
                name: "T-20",
                desc: "Quick Moves, Big Wins — Winning Strategic Trades.",
              },
              {
                name: "IPO Corner (Non SME)",
                desc: "Your gateway to high-potential IPOs – researched & reviewed.",
              },
              {
                name: "Blue Chip Edge",
                desc: "Not Every Giant Grows — We Pick the Ones That Still Can.",
              },
              {
                name: "Fynocrat Premium",
                desc: "360° Financial All-Rounder Membership for HNI Users.",
              },
            ].map((item, i) => (
              <div
                key={i}
                style={{
                  display: "flex",
                  gap: 20,
                  width: "100%",
                }}
              >
                {/* LEFT BOX */}
                <Card
                  padding="lg"
                  radius="md"
                  style={{
                    backgroundColor: "white",
                    border: "1px solid #e3e3e3",
                    flex: 1,
                    height: 80,
                    display: "flex",
                    alignItems: "center",
                  }}
                >
                  <Text
                    style={{
                      color: "#000",
                      fontSize: 18,
                      fontWeight: 600,
                    }}
                  >
                    {item.name}
                  </Text>
                </Card>

                {/* RIGHT BOX */}
                <Card
                  padding="lg"
                  radius="md"
                  style={{
                    backgroundColor: "#fafafa",
                    border: "1px solid #ddd",
                    flex: 2,
                    height: 80,
                    display: "flex",
                    alignItems: "center",
                  }}
                >
                  <Text
                    style={{
                      color: "#444",
                      fontSize: 16,
                    }}
                  >
                    {item.desc}
                  </Text>
                </Card>
              </div>
            ))}
          </Stack>

          <div style={{ textAlign: "center", marginTop: 50 }}>
            <Button
              size="lg"
              radius="md"
              style={{
                backgroundColor: "#0080ff",
                fontSize: 18,
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

      {/* -------------------------------- POPUP FORM -------------------------------- */}
      <Modal
        opened={formOpen}
        onClose={() => setFormOpen(false)}
        centered
        size={isMobile ? "90%" : "lg"}
        title="Fill Your Details"
      >
        <form method="post">
          <Stack>
            <TextInput
              label="Name"
              name="popup_name"
              placeholder="John Doe"
              required
            />

            <TextInput
              label="Email"
              name="popup_email"
              placeholder="your@email.com"
              required
            />

            <TextInput
              label="Phone"
              name="popup_phone"
              placeholder="+91 98765 43210"
              required
            />

            <Textarea
              label="Your Message"
              name="popup_message"
              placeholder="I want to explore investment insights."
              required
              minRows={4}
            />

            {/* Hidden recaptcha field */}
            <input
              id="popup-recaptcha"
              type="hidden"
              name="g-recaptcha-response"
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
              type="submit"
              size="md"
              radius="md"
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
