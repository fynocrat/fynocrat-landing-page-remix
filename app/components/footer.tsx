import React from "react";
import { Box, Container, SimpleGrid, Text, Image } from "@mantine/core";

export default function Footer() {
  return (
    <Box
      component="footer"
      style={{
        width: "100%",
        backgroundColor: "#0b1727",
        color: "#e5e7eb",
        paddingTop: 48,
        paddingBottom: 32,
        fontFamily:
          "Poppins, Inter, system-ui, -apple-system, BlinkMacSystemFont, sans-serif",
      }}
    >
      <Container size="xl" style={{ maxWidth: 1200 }}>
        <SimpleGrid
          cols={{ base: 1, md: 3 }}
          spacing={32}
          style={{ marginBottom: 32 }}
        >
          {/* Logo */}
          <Box>
            <Box style={{ width: "fit-content" }}>
              <Image src="/logo.png" w={120} h="auto" />
            </Box>
          </Box>

          {/* SEBI Registered Research Analyst Details */}
          <Box>
            <Text
              style={{
                fontWeight: 600,
                marginBottom: 10,
                fontSize: 14,
                color: "#f9fafb",
              }}
            >
              SEBI Registered Research Analyst Details
            </Text>
            <Text style={{ fontSize: 13.5, lineHeight: 1.7 }}>
              Registered Name: Fynocrat Technologies Private Limited
              <br />
              CIN No.: U72900UP2022PTC164214
              <br />
              GST No.: 09AAFCF0553R2Z4
              <br />
              Reg Address: K-286, Site V Kasna Industrial Area, Greater Noida
              Noida Gautam Buddha Nagar UP -201306
              <br />
              Type of Registration: Non-Individual
              <br />
              Registration No.: INH000011918
              <br />
              BSE Enlistment No.: 5759
              <br />
              Valid Till: Mar 14, 2028
              <br />
              Compliance Officer: Mr. Saurabh Goel
            </Text>
          </Box>

          {/* Principal Place of Business + SEBI Office */}
          <Box>
            <Text
              style={{
                fontWeight: 600,
                marginBottom: 10,
                fontSize: 14,
                color: "#f9fafb",
              }}
            >
              Principal Place of Business:
            </Text>
            <Text style={{ fontSize: 13.5, lineHeight: 1.7, marginBottom: 14 }}>
              Office No. 910, 9th Floor, Tower A, Ithum Tower,
              <br />
              Sec 62, Noida, Delhi(NCR) 201301
              <br />
              Email: connect@fynocrat.com
              <br />
              Landline: +91 120 4458575
            </Text>

            <Text
              style={{
                fontWeight: 600,
                marginBottom: 8,
                fontSize: 14,
                color: "#f9fafb",
              }}
            >
              SEBI Office Details:
            </Text>
            <Text style={{ fontSize: 13.5, lineHeight: 1.7 }}>
              SEBI Bhavan BKC, Plot No.C4-A, &apos;G&apos; Block Bandra-Kurla
              Complex, Bandra (East), Mumbai - 400051, Maharashtra
              <br />
              Tel: +91-22-26449000 / 40459000
              <br />
              Fax: +91-22-26449019-22 / 40459019-22
              <br />
              E-mail: sebi@sebi.gov.in
              <br />
              Toll Free Investor Helpline: 1800 22 7575
            </Text>
          </Box>
        </SimpleGrid>

        {/* Divider-ish spacing */}
        <Box
          style={{
            height: 1,
            background:
              "linear-gradient(to right, transparent, rgba(156,163,175,0.35), transparent)",
            marginBottom: 18,
          }}
        />

        {/* Bottom text */}
        <Text
          style={{
            fontSize: 13,
            textAlign: "center",
            marginBottom: 10,
            color: "#d1d5db",
          }}
        >
          2025 Fynocrat Technologies Pvt. Ltd. All Rights Reserved
        </Text>

        <Text
          style={{
            fontSize: 11.5,
            lineHeight: 1.7,
            textAlign: "center",
            color: "#9ca3af",
            maxWidth: 980,
            margin: "0 auto",
          }}
        >
          Disclaimer: “Registration granted by SEBI, membership of BASL, and
          certification from NISM in no way guarantee the performance of the
          intermediary or provide any assurance of returns to investors.
          Investments in the securities market are subject to market risks. Read
          all the related documents carefully before investing. The securities
          quoted on the website are for illustration only and are not
          recommendatory.”
          <br />
          <br />
          Investment in securities market are subject to market risks. Read all
          the related documents carefully before investing.
        </Text>
      </Container>
    </Box>
  );
}
