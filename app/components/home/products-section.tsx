// app/components/home/ProductsSection.tsx
import React from "react";
import {
  Box,
  Container,
  SimpleGrid,
  Text,
  Title,
  Card,
  Group,
  Button,
  Image,
} from "@mantine/core";

export type ProductItem = {
  title: string;
  desc: string;
  icon: string; // image path
  href?: string;
  color?: string;
  accent?: string;
};

type Props = {
  products: ProductItem[];
  isMobile: boolean;
  setFormOpen: (open: boolean) => void;
};

export default function ProductsSection({
  products,
  isMobile,
  setFormOpen,
}: Props) {
  return (
    <Box
      style={{
        width: "100%",
        backgroundColor: "#ffffff",
        paddingTop: isMobile ? 40 : 80,
        paddingBottom: isMobile ? 40 : 80,
      }}
    >
      <Container size="xl" style={{ maxWidth: 1200 }}>
        {/* HERO ROW (left large, right summary) */}
        <SimpleGrid
          cols={{ base: 1, md: 2 }}
          spacing={30}
          verticalSpacing={isMobile ? 5 : 20}
          mb={40}
        >
          <div>
            <Text
              style={{
                color: "#0ea5a3",
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
                fontSize: isMobile ? 24 : 48,
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
                fontSize: isMobile ? 14 : 18,
                lineHeight: 1.6,
              }}
            >
              Build long-term wealth, capture tactical market opportunities, and
              access premium research — all delivered through clearly structured
              investment products designed to fit your risk profile and time
              horizon.
            </Text>
          </div>
        </SimpleGrid>

        {/* PRODUCTS GRID */}
        <SimpleGrid
          cols={{ base: 1, sm: 2, md: 3 }}
          spacing={28}
          verticalSpacing={20}
          mb={40}
        >
          {products.map((p) => (
            <Card
              key={p.title}
              style={{
                backgroundColor: p.color ?? "#ffffff", // ✅ FULL BOX COLOR
                minHeight: isMobile ? undefined : 220,
                display: "flex",
                flexDirection: "column",
                justifyContent: "space-between",
                borderRadius: 16,
                transition: "transform .2s ease, box-shadow .2s ease",

                // base depth
                // boxShadow: "0 10px 30px rgba(15, 23, 42, 0.06)",
              }}
              onMouseEnter={(e: any) => {
                e.currentTarget.style.transform = "translateY(-6px)";
                e.currentTarget.style.boxShadow =
                  "0 20px 45px rgba(15, 23, 42, 0.12)";
              }}
              onMouseLeave={(e: any) => {
                e.currentTarget.style.transform = "translateY(0)";
                e.currentTarget.style.boxShadow =
                  "0 10px 30px rgba(15, 23, 42, 0.06)";
              }}
            >
              <div
                style={{
                  display: "flex",
                  flexDirection: isMobile ? "row" : "column",
                  gap: isMobile ? 16 : 0,
                  alignItems: isMobile ? "flex-start" : "flex-start",
                }}
              >
                {/* ICON */}
                <div
                  style={{
                    width: 72,
                    height: 72,
                    minWidth: 72, // ✅ important for mobile row
                    borderRadius: 18,
                    display: "grid",
                    placeItems: "center",
                    background: "#ffffff",
                    // boxShadow: "0 10px 20px rgba(0,0,0,0.15)",
                  }}
                >
                  <Image
                    src={p.icon}
                    alt={p.title}
                    w={36}
                    h={36}
                    fit="contain"
                  />
                </div>

                {/* TEXT */}
                <div>
                  <Text
                    fw={700}
                    fz={isMobile ? 18 : 20}
                    style={{
                      color: "#0b1220",
                      textAlign: "left",
                    }}
                  >
                    {p.title}
                  </Text>

                  <Text
                    fz={isMobile ? 13 : 14}
                    mt={6}
                    style={{ color: "#6b7280", textAlign: "left" }}
                  >
                    {p.desc}
                  </Text>
                </div>
              </div>
            </Card>
          ))}
        </SimpleGrid>

        {/* CTA */}
        <div style={{ textAlign: isMobile ? "center" : "left" }}>
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
            Get Stock Idea
          </Button>
        </div>
      </Container>
    </Box>
  );
}
