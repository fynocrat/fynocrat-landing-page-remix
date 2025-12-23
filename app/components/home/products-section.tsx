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
} from "@mantine/core";

export type ProductItem = {
  title: string;
  desc: string;
  icon: React.ReactElement;
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
                fontSize: 40,
                lineHeight: 1.02,
                marginBottom: 18,
              }}
            >
              Expert-backed strategies for every investor.
            </Title>
          </div>

          <div style={{ alignSelf: "center" }}>
            <Text style={{ color: "#4b5563", fontSize: 18, lineHeight: 1.6 }}>
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
          verticalSpacing={10}
          mb={40}
        >
          {products.map((p) => (
           <Card
  key={p.title}
  style={{
    background: "#fff",
    minHeight: 180,
    padding: isMobile ? 18 : 24,
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
  {/* ICON | TEXT (SAME FOR ALL SCREENS) */}
  <div
    style={{
      display: "flex",
      alignItems: "center",
      gap: isMobile ? 14 : 18,
    }}
  >
    {/* ICON */}
    <div
      style={{
        width: isMobile ? 56 : 72,
        height: isMobile ? 56 : 72,
        borderRadius: 16,
        display: "grid",
        placeItems: "center",
        background: p.color ?? "#f3f4f6",
        flexShrink: 0,
      }}
    >
      {React.cloneElement(p.icon, {
        size: isMobile ? 28 : 36,
      } as any)}
    </div>

    {/* TEXT */}
    <div>
      <Text
        fw={700}
        fz={isMobile ? 18 : 20}
        style={{
          color: "#0b1220",
          marginBottom: 6,
        }}
      >
        {p.title}
      </Text>

      <Text
        fz={14}
        style={{
          color: "#6b7280",
          lineHeight: 1.6,
        }}
      >
        {p.desc}
      </Text>
    </div>
  </div>
</Card>

          ))}
        </SimpleGrid>

        {/* CTA */}
        <div style={{ textAlign: "left" }}>
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
  );
}
