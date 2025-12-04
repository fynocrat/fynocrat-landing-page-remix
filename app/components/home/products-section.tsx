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
                fontSize: 48,
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
                minHeight: 200,
                display: "flex",
                flexDirection: "column",
                justifyContent: "space-between",
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
              <div>
                <Group mb={16}>
                  <div
                    style={{
                      width: 72,
                      height: 72,
                      borderRadius: 18,
                      display: "grid",
                      placeItems: "center",
                      background: p.color ?? "#f3f4f6",
                      boxShadow: `inset 0 1px 0 rgba(255,255,255,0.6)`,
                    }}
                  >
                    {React.cloneElement(p.icon, { size: 36 } as any)}
                  </div>
                </Group>

                <Text
                  fw={700}
                  fz={20}
                  style={{
                    color: "#0b1220",
                    textAlign: "left",
                  }}
                >
                  {p.title}
                </Text>

                <Text
                  fz={14}
                  mt={10}
                  style={{ color: "#6b7280", textAlign: "left" }}
                >
                  {p.desc}
                </Text>
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
