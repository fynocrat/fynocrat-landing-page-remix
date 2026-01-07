import {
  Box,
  Container,
  Title,
  Text,
  Button,
  Paper,
  Group,
  Image,
  Divider,
} from "@mantine/core";
import { IconCheck } from "@tabler/icons-react";
import { Link } from "react-router";
import Footer from "~/components/footer";

/* -------------------------------------------------------------------------- */
/*                              SIMPLE HEADER                                 */
/* -------------------------------------------------------------------------- */

function LandingHeader() {
  return (
    <Box
      style={{
        backgroundColor: "#000",
        borderBottom: "1px solid #1f2937",
      }}
    >
      <Container
        size="xl"
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          padding: "16px 100px",
          maxWidth: 1400,
        }}
      >
        <Image
          src="/logo.png"
          alt="Fynocrat"
          w={190}
          h="auto"
          style={{
            width: 190,
            height: "auto",
            objectFit: "contain",
          }}
        />
        <Text
          style={{
            color: "#fff",
            fontSize: 20,
            opacity: 0.9,
            whiteSpace: "nowrap",
            fontWeight: 100,
          }}
        >
          SEBI Registration No. – INH000011918
        </Text>
      </Container>
    </Box>
  );
}

/* -------------------------------------------------------------------------- */
/*                              SIMPLE FOOTER                                 */
/* -------------------------------------------------------------------------- */

function LandingFooter() {
  return (
    <Box
      style={{
        backgroundColor: "#000",
        borderTop: "1px solid #1f2937",
        padding: "24px 0",
      }}
    >
      <Container size={1400}>
        <Text style={{ color: "#9ca3af", fontSize: 13, textAlign: "center" }}>
          © {new Date().getFullYear()} Fynocrat. All rights reserved.
        </Text>
      </Container>
    </Box>
  );
}

/* -------------------------------------------------------------------------- */
/*                              THANK YOU PAGE                                */
/* -------------------------------------------------------------------------- */

export default function ThankYouPage() {
  return (
    <>
      {/* HEADER */}
      <LandingHeader />

      {/* MAIN */}
      <Box
        style={{
          minHeight: "calc(100vh - 140px)",
          display: "flex",
          alignItems: "center",
          background:
            "linear-gradient(135deg, #0f2027 0%, #203a43 50%, #2c5364 100%)",
        }}
      >
        <Container size={900}>
          <Paper
            radius="xl"
            p="xl"
            shadow="xl"
            style={{
              maxWidth: 720,
              margin: "0 auto",
              textAlign: "center",
            }}
          >
            {/* ICON */}
            <Group justify="center" mb="md">
              <Box
                style={{
                  width: 72,
                  height: 72,
                  borderRadius: "50%",
                  backgroundColor: "#e6fcf5",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                <IconCheck size={36} color="#12b886" />
              </Box>
            </Group>

            {/* TITLE */}
            <Title
              order={1}
              style={{
                fontSize: 32,
                fontWeight: 700,
                marginBottom: 12,
                color: "#102a43",
              }}
            >
              Thank You for Your Interest
            </Title>

            {/* MESSAGE */}
            <Text
              style={{
                fontSize: 16,
                color: "#334e68",
                lineHeight: 1.7,
                maxWidth: 520,
                margin: "0 auto",
              }}
            >
              One of our <strong>Investment Counsellors</strong> will contact you
              shortly to understand your goals and guide you with suitable
              investment opportunities.
            </Text>

            <Divider my="lg" />

            <Text
              style={{
                fontSize: 14,
                color: "#627d98",
                marginBottom: 24,
              }}
            >
              We respect your time and privacy. Expect a professional and
              transparent discussion.
            </Text>

            {/* CTA */}
            <Group justify="center">
              <Button
                component={Link}
                to="/"
                size="md"
                radius="md"
                style={{
                  backgroundColor: "#1c7ed6",
                  fontWeight: 600,
                }}
              >
                Back to Home
              </Button>
            </Group>
          </Paper>
        </Container>
      </Box>

      {/* FOOTER */}
      <Footer />
    </>
  );
}
