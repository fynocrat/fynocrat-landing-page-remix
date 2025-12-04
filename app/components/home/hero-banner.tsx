// app/components/home/HomeBanner.tsx
import React from "react";
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
  return (
    <Box
      style={{
        backgroundImage: "url('/banner.png')",
        backgroundSize: "cover",
        backgroundRepeat: "no-repeat",
        backgroundPosition: "center",
        width: "100%",
        overflow: "hidden",
        position: "relative",
        fontFamily: "Poppins, sans-serif",
        paddingBottom: 80,
      }}
    >
      {/* Top Bar */}
      <Container size='xl' style={{ maxWidth: 1400, padding: 0 }}>
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
              radius='md'
              shadow='xl'
              className='form-box'
              style={{ width: isMobile ? "100%" : 420, maxWidth: 420 }}
            >
              <fetcher.Form
                ref={mainFormRef}
                method='post'
                style={{ width: "100%" }}
                onSubmit={handleFormSubmit}
              >
                <Stack>
                  <TextInput
                    name='name'
                    label='Name'
                    required
                    radius='md'
                    placeholder='john doe'
                    disabled={isSubmitting}
                  />

                  <TextInput
                    name='email'
                    label='Email'
                    required
                    radius='md'
                    placeholder='your@email.com'
                    disabled={isSubmitting}
                  />

                  <TextInput
                    name='phone'
                    label='Phone'
                    required
                    radius='md'
                    placeholder='+91 98765 43210'
                    disabled={isSubmitting}
                  />

                  <Textarea
                    name='message'
                    label='Your message'
                    required
                    minRows={4}
                    radius='md'
                    placeholder='I am interested in receiving stock ideas.'
                    disabled={isSubmitting}
                  />

                  <input
                    id='g-recaptcha-response'
                    type='hidden'
                    name='g-recaptcha-response'
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
                        // child keeps this minimal — parent handles token state
                        handleCaptcha(null);
                      }}
                      onError={(error) => {
                        console.error("❌ reCAPTCHA Error:", error);
                      }}
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
    </Box>
  );
}
