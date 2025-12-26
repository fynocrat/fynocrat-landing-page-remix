import React from "react";
import { Box, Container, SimpleGrid, Text, Image, Anchor } from "@mantine/core";

export default function Footer() {
  return (
    <Box
      component='footer'
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
      <Container size='xl' style={{ maxWidth: 1200 }}>
        {/* Logo row */}
        <Box style={{ marginBottom: 32 }}>
          <Image src='/logo.png' w={140} h='auto' alt='Fynocrat' />
        </Box>

        {/* Three-column details row */}
        <SimpleGrid
          cols={{ base: 1, md: 3 }}
          spacing={32}
          style={{ marginBottom: 32 }}
        >
          {/* SEBI Registered Research Analyst Details */}
          <Box>
            <Text
              style={{
                fontWeight: 600,
                marginBottom: 10,
                fontSize: 12,
                color: "#f9fafb",
              }}
            >
              SEBI Registered Research Analyst Details
            </Text>

            <Text style={{ fontSize: 12, lineHeight: 1.7 }}>
              Registered Name: Fynocrat Technologies
              <br />
              Private Limited
              <br />
              CIN No.: U72900UP2022PTC164214
              <br />
              GST No.: 09AAFCF0553R2Z4
              <br />
              Reg Address: K-286, Site V Kasna Industrial Area
              <br />
              Greater Noida Noida Gautam Buddha Nagar UP
              <br />
              -201306
              <br />
              Type of Registration: Non-Individual
              <br />
              Registration No.: INH000011918
              <br />
              BSE Enlistment No.: 5759
              <br />
              {/* ✔ Updated Anchor (opens certificate) */}
              <Anchor
                href='/sebi_certificate.png'
                target='_blank'
                rel='noopener noreferrer'
                style={{
                  fontSize: 12,
                  marginTop: 4,
                  marginBottom: 4,
                  display: "inline-block",
                  textDecoration: "underline",
                  color: "#e5e7eb",
                }}
              >
                View Registration Certificate
              </Anchor>
              <br />
              Valid Till: Mar 14, 2028
              <br />
              Compliance Officer: Mr. Saurabh Goel |
              <br />
              compliance@fynocrat.com | +91 120 4458575
              <br />
              Grievance Officer (Desinated officer for PWD grievances):
              <br />
              Mr. Saurabh Goel | grievance@fynocrat.com | +91 120 4458575
              <br />
              Principal Officer: Mr. Gaurav Goel |
              <br />
              connect@fynocrat.com | +91 120 4458575
              <br />
              Nodal Officer: Mr. Abhijit Paul |
              <br />
              connect@fynocrat.com | +91 120 4458575
            </Text>
          </Box>

          {/* Principal Place of Business */}
          <Box>
            <Text
              style={{
                fontWeight: 600,
                marginBottom: 10,
                fontSize: 12,
                color: "#f9fafb",
              }}
            >
              Principal Place of Business:
            </Text>

            <Text style={{ fontSize: 12, lineHeight: 1.7 }}>
              Office No. 910, 9th Floor, Tower A,
              <br />
              Ithum Tower, Sec 62, Noida, Delhi(NCR) 201301
              <br />
              Email: connect@fynocrat.com
              <br />
              Landline: +91 120 4458575
            </Text>
          </Box>

          {/* SEBI Office Details */}
          <Box>
            <Text
              style={{
                fontWeight: 600,
                marginBottom: 10,
                fontSize: 12,
                color: "#f9fafb",
              }}
            >
              SEBI Office Details:
            </Text>

            <Text style={{ fontSize: 12, lineHeight: 1.7 }}>
              SEBI Bhavan BKC, Plot No.C4-A, 'G' Block Bandra-Kurla
              <br />
              Complex,
              <br />
              Bandra (East), Mumbai - 400051, Maharashtra
              <br />
              Tel: +91-22-26449000 / 40459000
              <br />
              Fax: +91-22-26449019-22 / 40459019-22
              <br />
              E-mail: sebi@sebi.gov.in
              <br />
              Toll Free Investor Helpline: 1800 22 7575 | SEBI SCORES |
              <br />
              SMARTODR
            </Text>
          </Box>
        </SimpleGrid>

        {/* Bottom text */}
        <Text
          style={{
            fontSize: 12,
            textAlign: "left",
            marginBottom: 10,
            color: "#d1d5db",
          }}
        >
          2025 Fynocrat Technologies Pvt. Ltd. All Rights Reserved
        </Text>

        <Text
          style={{
            fontSize: 10,
            lineHeight: 1.7,
            textAlign: "left",
            color: "#9ca3af",
            marginBottom: 10,
          }}
        >
          Disclaimer: “Registration granted by SEBI, membership of BASL, and
          certification from NISM in no way guarantee the performance of the
          intermediary or provide any assurance of returns to investors.
          Investments in the securities market are subject to market risks. Read
          all the related documents carefully before investing.”
        </Text>

        <Text
          style={{
            fontSize: 10,
            lineHeight: 1.7,
            textAlign: "left",
            color: "#9ca3af",
          }}
        >
          Investment in securities market are subject to market risks. Read all
          the related documents carefully before investing.
        </Text>
      </Container>
    </Box>
  );
}
