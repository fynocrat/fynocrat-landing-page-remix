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

type Props = {
  isMobile: boolean;
  setFormOpen: (open: boolean) => void;
};

export default function WhyFynocratSection({ isMobile, setFormOpen }: Props) {
  return (
    <Box
      style={{
        width: "100%",
        backgroundColor: "#F3F7FF",
        paddingTop: isMobile ? 40 : 80,
        paddingBottom: isMobile ? 40 : 80,
        fontFamily: "Poppins, Inter, sans-serif",
      }}
    >
      <Container size='xl' style={{ maxWidth: 1200 }}>
        {/* Heading */}
        <div style={{ textAlign: "center", marginBottom: isMobile ? 28 : 48 }}>
          <Title
            order={2}
            style={{
              color: "#0b1220",
              fontWeight: 800,
              fontSize: isMobile ? 22 : 36,
              lineHeight: 1.06,
            }}
          >
            Why Fynocrat is Different ?
          </Title>
          <Text
            style={{
              color: "#6b7280",
              marginTop: 8,
              fontSize: isMobile ? 13 : 16,
              maxWidth: 860,
              marginLeft: "auto",
              marginRight: "auto",
              lineHeight: 1.6,
            }}
          >
            Learn why our unconventional approach leads to exceptional outcomes.
          </Text>
        </div>

        {/* Grid: 3 columns x 2 rows */}
        <SimpleGrid cols={{ base: 1, sm: 2, md: 3 }} spacing={30}>
          {/* Item 1: Vasudhaiva Kutumbakam */}
          <div style={{ display: "flex", gap: 18, alignItems: "flex-start" }}>
            {/* Icon */}
            <div
              style={{
                minWidth: 56,
                minHeight: 56,
                borderRadius: 12,
                display: "grid",
                placeItems: "center",
                background: "linear-gradient(180deg,#eef2ff,#f8fafc)",
                boxShadow: "inset 0 1px 0 rgba(255,255,255,0.6)",
              }}
              aria-hidden
            >
              {/* globe icon */}
              <svg width='28' height='28' viewBox='0 0 24 24' fill='none'>
                <path
                  d='M12 2a10 10 0 100 20 10 10 0 000-20z'
                  stroke='#3b82f6'
                  strokeWidth='1.4'
                  strokeLinecap='round'
                  strokeLinejoin='round'
                />
                <path
                  d='M2 12h20M12 2c2.5 3 2.5 8 0 11M6 4c4 2 8 2 12 0M6 20c4-2 8-2 12 0'
                  stroke='#60a5fa'
                  strokeWidth='1'
                  strokeLinecap='round'
                  strokeLinejoin='round'
                />
              </svg>
            </div>

            {/* Text */}
            <div>
              <Text
                fw={700}
                fz={16}
                style={{ color: "#0b1220", marginBottom: 6 }}
              >
                Vasudhaiva Kutumbakam
              </Text>
              <Text fz={14} color='#6b7280' style={{ lineHeight: 1.5 }}>
                Fostering a customer-centric relationship — we treat every
                client as part of our extended family.
              </Text>
            </div>
          </div>

          {/* Item 2: Visionary Research */}
          <div style={{ display: "flex", gap: 18, alignItems: "flex-start" }}>
            <div
              style={{
                minWidth: 56,
                minHeight: 56,
                borderRadius: 12,
                display: "grid",
                placeItems: "center",
                background: "linear-gradient(180deg,#fff7ed,#fffaf0)",
              }}
              aria-hidden
            >
              {/* lightbulb */}
              <svg width='28' height='28' viewBox='0 0 24 24' fill='none'>
                <path
                  d='M9 18h6M10 21h4'
                  stroke='#f59e0b'
                  strokeWidth='1.4'
                  strokeLinecap='round'
                  strokeLinejoin='round'
                />
                <path
                  d='M12 3a6 6 0 00-4 10c0 2 1 3 1 3h6s1-1 1-3a6 6 0 00-4-10z'
                  stroke='#f97316'
                  strokeWidth='1.2'
                  strokeLinecap='round'
                  strokeLinejoin='round'
                />
              </svg>
            </div>

            <div>
              <Text
                fw={700}
                fz={16}
                style={{ color: "#0b1220", marginBottom: 6 }}
              >
                Visionary Approach Towards Research
              </Text>
              <Text fz={14} color='#6b7280' style={{ lineHeight: 1.5 }}>
                We challenge the status quo and identify emerging themes before
                they become mainstream.
              </Text>
            </div>
          </div>

          {/* Item 3: Customer-Centricity */}
          <div style={{ display: "flex", gap: 18, alignItems: "flex-start" }}>
            <div
              style={{
                minWidth: 56,
                minHeight: 56,
                borderRadius: 12,
                display: "grid",
                placeItems: "center",
                background: "linear-gradient(180deg,#ecfeff,#f0f9ff)",
              }}
              aria-hidden
            >
              {/* user-heart */}
              <svg width='28' height='28' viewBox='0 0 24 24' fill='none'>
                <path
                  d='M12 12a3 3 0 100-6 3 3 0 000 6z'
                  stroke='#06b6d4'
                  strokeWidth='1.2'
                  strokeLinecap='round'
                  strokeLinejoin='round'
                />
                <path
                  d='M4 20c1.5-3 4.5-5 8-5s6.5 2 8 5'
                  stroke='#14b8a6'
                  strokeWidth='1.2'
                  strokeLinecap='round'
                  strokeLinejoin='round'
                />
              </svg>
            </div>

            <div>
              <Text
                fw={700}
                fz={16}
                style={{ color: "#0b1220", marginBottom: 6 }}
              >
                Customer-Centricity
              </Text>
              <Text fz={14} color='#6b7280' style={{ lineHeight: 1.5 }}>
                Personalized service and trust-first relationships — we build
                experiences that exceed expectations.
              </Text>
            </div>
          </div>

          {/* Item 4: Technology & AI */}
          <div style={{ display: "flex", gap: 18, alignItems: "flex-start" }}>
            <div
              style={{
                minWidth: 56,
                minHeight: 56,
                borderRadius: 12,
                display: "grid",
                placeItems: "center",
                background: "linear-gradient(180deg,#eefdf6,#f0fff9)",
              }}
              aria-hidden
            >
              {/* chip / ai */}
              <svg width='28' height='28' viewBox='0 0 24 24' fill='none'>
                <rect
                  x='6'
                  y='6'
                  width='12'
                  height='12'
                  rx='2'
                  stroke='#10b981'
                  strokeWidth='1.2'
                />
                <path d='M9 9h6v6H9z' stroke='#059669' strokeWidth='1' />
                <path
                  d='M3 12h2M19 12h2M12 3v2M12 19v2'
                  stroke='#34d399'
                  strokeWidth='1'
                  strokeLinecap='round'
                />
              </svg>
            </div>

            <div>
              <Text
                fw={700}
                fz={16}
                style={{ color: "#0b1220", marginBottom: 6 }}
              >
                Embracing Technology & AI
              </Text>
              <Text fz={14} color='#6b7280' style={{ lineHeight: 1.5 }}>
                We leverage AI & ML to analyze large datasets, uncover patterns,
                and generate forward-looking investment signals.
              </Text>
            </div>
          </div>

          {/* Item 5: Risk Management */}
          <div style={{ display: "flex", gap: 18, alignItems: "flex-start" }}>
            <div
              style={{
                minWidth: 56,
                minHeight: 56,
                borderRadius: 12,
                display: "grid",
                placeItems: "center",
                background: "linear-gradient(180deg,#fff7ed,#fffbf0)",
              }}
              aria-hidden
            >
              {/* shield-check */}
              <svg width='28' height='28' viewBox='0 0 24 24' fill='none'>
                <path
                  d='M12 2l7 3v5c0 5-3.5 9-7 11-3.5-2-7-6-7-11V5l7-3z'
                  stroke='#f97316'
                  strokeWidth='1.2'
                  strokeLinecap='round'
                  strokeLinejoin='round'
                />
                <path
                  d='M9 12l2 2 4-4'
                  stroke='#fb923c'
                  strokeWidth='1.2'
                  strokeLinecap='round'
                  strokeLinejoin='round'
                />
              </svg>
            </div>

            <div>
              <Text
                fw={700}
                fz={16}
                style={{ color: "#0b1220", marginBottom: 6 }}
              >
                Focus on Risk Management
              </Text>
              <Text fz={14} color='#6b7280' style={{ lineHeight: 1.5 }}>
                Protecting capital is a priority — we balance the pursuit of
                returns with robust risk controls.
              </Text>
            </div>
          </div>

          {/* Item 6: Challenging Conventional Wisdom */}
          <div style={{ display: "flex", gap: 18, alignItems: "flex-start" }}>
            <div
              style={{
                minWidth: 56,
                minHeight: 56,
                borderRadius: 12,
                display: "grid",
                placeItems: "center",
                background: "linear-gradient(180deg,#f0f9ff,#eef8ff)",
              }}
              aria-hidden
            >
              {/* compass/rocket */}
              <svg width='28' height='28' viewBox='0 0 24 24' fill='none'>
                <path
                  d='M12 2l3 7-7 3-3-7 7-3z'
                  stroke='#6366f1'
                  strokeWidth='1.2'
                  strokeLinecap='round'
                  strokeLinejoin='round'
                />
                <path
                  d='M9 15l6 6M15 9l6 6'
                  stroke='#8b5cf6'
                  strokeWidth='1'
                  strokeLinecap='round'
                />
              </svg>
            </div>

            <div>
              <Text
                fw={700}
                fz={16}
                style={{ color: "#0b1220", marginBottom: 6 }}
              >
                Challenging Conventional Wisdom
              </Text>
              <Text fz={14} color='#6b7280' style={{ lineHeight: 1.5 }}>
                We question common assumptions and explore unconventional
                strategies to find overlooked opportunities.
              </Text>
            </div>
          </div>
        </SimpleGrid>

        {/* CTA */}
        <div style={{ marginTop: isMobile ? 36 : 56, textAlign: "center" }}>
          <Button
            size='lg'
            radius='md'
            color='blue'
            style={{
              backgroundColor: "#0080ff",
              fontWeight: 600,
              paddingLeft: 36,
              paddingRight: 36,
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
