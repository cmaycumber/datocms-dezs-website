import Footer from "./Footer";
import { Header } from "./Header";
import { Box, Flex } from "theme-ui";

export function Layout({ preview, children }) {
  return (
    <Flex sx={{ minHeight: "100vh", flexDirection: "column" }}>
      <Header />
      <Box sx={{ flex: 1 }} as="main">
        {children}
      </Box>
      <Footer />
    </Flex>
  );
}
