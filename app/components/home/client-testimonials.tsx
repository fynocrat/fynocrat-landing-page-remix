// app/components/home/client-testimonials.tsx
import React from "react";
import {
  Box,
  Container,
  Title,
  Text,
  Space,
  SimpleGrid,
  Group,
  Pagination,
  Center,
} from "@mantine/core";
import { FaStar } from "react-icons/fa";

type Props = {
  isMobile: boolean;
};

// ------------------ ⭐ STARS COMPONENT (Matches Your Screenshot) ------------------
const Stars: React.FC<{ count?: number; size?: number }> = ({
  count = 5,
  size = 14,
}) => {
  return (
    <Box
      style={{
        display: "inline-flex",
        gap: 6,
        alignItems: "center",
        lineHeight: 1,
        marginTop: 6,
      }}
    >
      {Array.from({ length: count }).map((_, i) => (
        <FaStar
          key={i}
          size={size}
          color="#ffee00"
          style={{ display: "block", transform: "translateY(-1px)" }}
        />
      ))}
    </Box>
  );
};

// ------------------ ⭐ LazyImage ------------------
const LazyImage = ({ src, alt, width, height, ...props }: any) => {
  const [isInView, setIsInView] = React.useState(false);
  const imageRef = React.useRef<HTMLImageElement | null>(null);

  React.useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setIsInView(true);
            observer.unobserve(entry.target);
          }
        });
      },
      { rootMargin: "50px", threshold: 0.1 }
    );

    if (imageRef.current) observer.observe(imageRef.current);

    return () => {
      if (imageRef.current) observer.unobserve(imageRef.current);
    };
  }, []);

  return (
    <img
      ref={imageRef}
      src={isInView ? src : undefined}
      alt={alt}
      width={width}
      height={height}
      style={{ objectFit: "cover", borderRadius: "50%" }}
      {...props}
    />
  );
};

// ------------------ ⭐ TESTIMONIAL DATA ------------------
const testimonial = [
  {
    text: "I've been subscribed to Fynocrat for a few months now...",
    link: "https://maps.app.goo.gl/dsCzd13Rh8DqwKkd7",
    author: "Davish Nair",
    img: "/Davish Nair P.png",
    alt: "Davish Nair - Fynocrat Customer",
    color: " #0B3A4F",
  },
  {
    text: "Thanks to Dinesh Yadav for the support...",
    link: "https://maps.app.goo.gl/5AUGYSFNGDvKebu76",
    author: "kushagra shinde",
    img: "/kushagra shinde.png",
    alt: "kushagra shinde",
    color: " #0B3A4F",
  },
  {
    text: "Overall a satisfactory experience ...",
    link: "https://maps.app.goo.gl/V47LLxnNpfTjrDoR7",
    author: "Manish Gupta",
    img: "/Manish Gupta.png",
    alt: "Manish Gupta",
    color: " #0B3A4F",
  },
  {
    text: "I used the Mauka product and got good returns...",
    link: "https://maps.app.goo.gl/5KbzhAxKK7TSH7My8",
    author: "Chakshu Harshvardhan",
    img: "/Chakshu Harshvardhan.png",
    alt: "Chakshu Harshvardhan",
    color: " #0B3A4F",
  },
  {
    text: "I was really worried about the market correction...",
    link: "https://share.google/HY1hmT9PrsZ4BF8Ux",
    author: "Mahendra Patel",
    img: "/Mahendra Patel.png",
    alt: "Mahendra Patel",
    color: " #0B3A4F",
  },
  {
    text: "I've been using their services for nearly a year now...",
    link: "https://share.google/WQqj9vOS6TyymuSSo",
    author: "Saie patil",
    img: "/unnamed (1).png",
    alt: "Saie patil",
    color: " #0B3A4F",
  },
   {
    text: "Novice or experts, no matter your experience as the team definitely knows how to manage and help you invest and trade better.",
    link: "https://maps.app.goo.gl/HdPTPhYz2M5M3yBV7",
    author: "Jaideep Singh",
    
    img: "/Jaideep Singh.png",
    alt: "Jaideep Singh - Fynocrat Customer",
    color: " #0B3A4F",
  },
  {
    text: "Good recommendations. Liked the way they follow up with customers for their investments..",
    link: "https://maps.app.goo.gl/DkCXaUkaDwCqnsMU9",
    author: "Shrinivas Dandin",
   
    img: "/Shrinivas Dandin.png",
    alt: "Shrinivas Dandin - Fynocrat Customer",
    color: " #0B3A4F",
  },
  {
    text: "Great Service and support..",
    link: "https://maps.app.goo.gl/HUayQMLjyDHfvEp48",
    author: "Najmul Hassan",
  
    img: "/Najmul Hassan.png",
    alt: "Najmul Hassan - Fynocrat Customer",
    color: " #0B3A4F",
  },
  {
    text: "Bought their Wealth builder product some 6 months back and have not been disappointed. The overall portfolio growth is nice and steady.",
    link: "https://maps.app.goo.gl/xV78myioAFaofVQy5",
    author: "Shubham Garbyal",
  
    img: "/unnamed (3).png",
    alt: "Shubham Garbyal - Fynocrat Customer",
    color: " #0B3A4F",
  },
  {
    text: "Mr Dinesh was able to understand my financial requirements , and gave me a correct solution.Has knowledge on the market..",
    link: "https://maps.app.goo.gl/xdEKNkqKU1r2ucdB7",
    author: "Srinivasan Mahalingam",
   
    img: "/unnamed (3) (1).png",
    alt: "Srinivasan Mahalingam - Fynocrat Customer",
    color: " #0B3A4F",
  },
  {
    text: "I've been taking services from Fynocrat for the past few months, and the experience has been genuinely reassuring..",
    link: "https://maps.app.goo.gl/aZ7umCSMyGPyoc8b6",
    author: "Alka gurnani",
   
    img: "/unnamed (4).png",
    alt: "Alka gurnani - Fynocrat Customer",
    color: " #0B3A4F",
  },
  {
    text: "Just started investing with them. Good research on advising hight potential stocks. Still, its to early recommending working with Fynocrat.",
    link: "https://maps.app.goo.gl/XPxiE9m8RcpbftvGA",
    author: "Amit Rana",
    
    img: "/unnamed (4) (1).png",
    alt: "Amit Rana - Fynocrat Customer",
    color: " #0B3A4F",
  },
  {
    text: "I opted for the Mauka product. Have made decent returns so far. Would recommend their services. Planning to take the portfolio plan as well",
    link: "https://maps.app.goo.gl/7WT8XFLR3Zr2Lm836",
    author: "Anup kotiyal",
    
    img: "/unnamed (4) (2).png",
    alt: "Anup kotiyal - Fynocrat Customer",
    color: " #0B3A4F",
  },
  {
    text: "This is a very good company but I have not seen its stock yet but the counselors are very good like (ANJALI MAM) and (YASH SIR).",
    link: "https://maps.app.goo.gl/79i6KEMQTaZHXCtJ8",
    author: "Mortal gameing",
   
    img: "/unnamed (12).png",
    alt: "Mortal gameing - Fynocrat Customer",
    color: " #0B3A4F",
  },
  {
    text: "Great Recommendations, in just 1 month I earned my subscription amount in very little investmennt.",
    link: "https://maps.app.goo.gl/J19usFNCVSJ1nfD78",
    author: "Zuber Mohammed Qureshi",
   
    img: "/unnamed (6).png",
    alt: "Zuber Mohammed Qureshi - Fynocrat Customer",
    color: " #0B3A4F",
  },
  {
    text: "They provide excellent recommendations, which has good momentum and with good entry prices.",
    link: "https://maps.app.goo.gl/Mb5qUCEzTDWWQFVk9",
    author: "Pratham kv",
  
    img: "/unnamed (7).png",
    alt: "Pratham kv - Fynocrat Customer",
    color: " #0B3A4F",
  },
  {
    text: "Miss Nancy gave me directions and recommendations of stocks...",
    link: "https://maps.app.goo.gl/ZgTDp6RYwT5U7hFy5",
    author: "Parminder Singh",
    
    img: "/unnamed (7) (1).png",
    alt: "Parminder Singh - Fynocrat Customer",
    color: " #0B3A4F",
  },
  {
    text: "The T- 20 product helped me make some quick trades and earn good profits. Satisfactory results.",
    link: "https://maps.app.goo.gl/h2XYqkVeCz6bMSMi9",
    author: "Ritik Roy",
    
    img: "/unnamed R.png",
    alt: "Ritik Roy - Fynocrat Customer",
    color: " #0B3A4F",
  },
  {
    text: "Satisfied with the service. The research is clear and well presented and the stock recommendations have been good.",
    link: "https://share.google/PcayfVa5L9Boap0Q1",
    author: "Shubhi Singh",
   
    img: "/unnamed (3) (2).png",
    alt: "Shubhi Singh - Fynocrat Customer",
    color: " #0B3A4F",
  },
  {
    text: "Happy with the stock recommendations. Took the wealth builder product and so far the results are good.",
    link: "https://share.google/2wJMzxLflTY3u4Rm8",
    author: "Ratnangi Chaudhary",
   
    img: "/unnamed R.png",
    alt: "Ratnangi Chaudhary - Fynocrat Customer",
    color: " #0B3A4F",
  },
  {
    text: "Highly recommended, Good returns in T20, concepts, research and dedicated RA..",
    link: "https://share.google/LKQ7iOWFyOdDP2wi7",
    author: "Vipen Kumar",
   
    img: "/unnamed (8) (1).png",
    alt: "Vipen Kumar - Fynocrat Customer",
    color: " #0B3A4F",
  },
  {
    text: "Impressed with the research quality and stock selection strategy..",
    link: "https://share.google/c6vDu4EEiYyxvhFCk",
    author: "Alan Antony",
   
    img: "/unnamed (4) (4).png",
    alt: "Alan Antony - Fynocrat Customer",
    color: " #0B3A4F",
  },
  {
    text: "Wealth builder suits my long -term goals perfectly. Good stocks recommended.",
    link: "https://maps.app.goo.gl/Ce5jBaDjKXtJotxx7",
    author: "Surendra Kumar Singhal",
  
    img: "/unnamed (3) (3).png",
    alt: "Surendra Kumar Singhal - Fynocrat Customer",
    color: " #0B3A4F",
  },
  {
    text: "I have been thoroughly impressed with the expertise and professionalism of Fynocrat..",
    link: "https://share.google/jM64GhWGV0QWw1x2l",
    author: "Rochak sikka",
  
    img: "/unnamed R.png",
    alt: "Rochak sikka - Fynocrat Customer",
    color: " #0B3A4F",
  },
  {
    text: " Great work responsible team and all the stock recomendation are best. Thank you.",
    link: "https://maps.app.goo.gl/AiKJrGUTMQKPF3uG7",
    author: "Sukhabeer Singh",
   
    img: "/unnamed sukh.png",
    alt: "Sukhabeer Singh - Fynocrat Customer",
    color: " #0B3A4F",
  },
  {
    text: "Their long-term recommendations require patience but are well worth it..",
    link: "https://maps.app.goo.gl/3y1o9f6y1Y6Yk3oF6",
    author: "Pawan sankhwar",
   
    img: "/unnamed (7) (1).png",
    alt: "Pawan sankhwar - Fynocrat Customer",
    color: " #0B3A4F",
  },
  {
    text: "I’ve had a great experience with Fynocrat under the guidance of Sarthak Jain. The team is professional, research-driven, and client-focused.",
    link: "https://maps.app.goo.gl/Eunth2YnM5MbU7kS7",
    author: "Aftab jaliawala",
   
    img: "/unnamed (4) (5).png",
    alt: "Aftab jaliawala - Fynocrat Customer",
    color: " #0B3A4F",
  },
  {
    text: "On-boarding was hasslefree, Anjali did a great job, Read the recommended scrips today and found the research reports good..",
    link: "https://maps.app.goo.gl/R8FWpNiKWfjnKf6X7",
    author: "Sarun68",
  
    img: "/unnamed S8.png",
    alt: "Sarun68 - Fynocrat Customer",
    color: " #0B3A4F",
  },
  {
    text: "I am having a great experience from the team and overall success ratio on investment call is excellent. All the best to the team for their good work. 👍",
    link: "https://maps.app.goo.gl/cbRCUd3nhyLmy4Tv6",
    author: "Vipul Gandhi",
   
    img: "/unnamed (13).png",
    alt: "Vipul Gandhi - Fynocrat Customer",
    color: " #0B3A4F",
  },
];

// ------------------ ⭐ MAIN COMPONENT ------------------
const Testimonials = ({ isMobile}:Props) => {
  const itemsPerPage = 6;
  const [activePage, setActivePage] = React.useState(1);

  const totalPages = Math.ceil(testimonial.length / itemsPerPage);
  const startIndex = (activePage - 1) * itemsPerPage;
  const currentItems = testimonial.slice(startIndex, startIndex + itemsPerPage);

  return (
    <Box py={60} style={{ background: "#033347" }}>
      {/* TITLE BLOCK */}
      <Container px={20}>
        <Title
          order={3}
          style={{
            color: "#00CE84",
            fontSize: 18,
            textAlign: "center",
            marginBottom: 16,
            fontWeight: 400,
          }}
        >
          CLIENT TESTIMONIALS
        </Title>

        <Title
          order={2}
          style={{
            fontSize: "clamp(32px,5vw,45px)",
            textAlign: "center",
            maxWidth: 500,
            margin: "0 auto",
            color: "#fff",
          }}
        >
          <span style={{ fontWeight: 400 }}>What Our</span> Customers{" "}
          <span style={{ fontWeight: 400 }}>say about us?</span>
        </Title>

        <Space h={40} />

        <Text
          style={{
            marginBottom: 100,
            maxWidth: 900,
            lineHeight: "27px",
            color: "#fff",
            textAlign: "center",
            margin: "0 auto",
            whiteSpace: "pre-line",

          }}
        >
         Our core values are at the heart of all that we do. They are integrated into our daily location lives and help us to remember our customers always come first, the last thank you should always come from us.
        </Text>
        <Space h={40} />

      </Container>

      {/* GRID */}
      <Container size='xl' style={{ maxWidth: 1200 }}>
        <SimpleGrid cols={isMobile ? 1 : 3} style={{ maxWidth: 1200, margin: "auto" }}>
          {currentItems.map((data, index) => (
            <Box
              key={index}
              py={15}
              px={15}
              style={{
                backgroundColor: data.color,
                borderRadius: 12,
              }}
            >
              <Group
                mb={25}
                style={{
                  width: "100%",
                  justifyContent: "space-between",
                }}
              >
                <LazyImage src={data.img} width={60} height={60} alt={data.alt} />

                {/* big quote icon */}
                <Box style={{ width: 30 }}>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 24 24"
                    fill="#093245ff"
                    width="100%"
                  >
                    <path d="M14.017 21v-7.391c0-5.704 3.731-9.57 8.983-10.609l.995 2.151c-2.432.917-3.995 3.638-3.995 5.849h4v10h-9.983zm-14.017 0v-7.391c0-5.704 3.748-9.57 9-10.609l.996 2.151c-2.433.917-3.996 3.638-3.996 5.849h3.983v10h-9.983z" />
                  </svg>
                </Box>
              </Group>

              <Text style={{ color: "#fff", fontSize: 14, lineHeight: "24px" }}>
                {data.text}
              </Text>

              <Space h={10} />

              <a
                href={data.link}
                target="_blank"
                rel="noopener noreferrer"
                style={{ color: "#fff", fontSize: 14 }}
              >
                Read More
              </a>

              <Space h={20} />

              {/* AUTHOR */}
              <Text style={{ color: "#fff", fontWeight: 700 }}>
                {data.author}
              </Text>

              {/* STARS  ⭐⭐⭐⭐⭐ */}
              <Stars size={14} />
            </Box>
          ))}
        </SimpleGrid>

        {/* PAGINATION */}
        <Center mt={36}>
          <Pagination
            total={totalPages}
            value={activePage}
            onChange={setActivePage}
            withEdges
          />
        </Center>
      </Container>
    </Box>
  );
};

export default React.memo(Testimonials);
