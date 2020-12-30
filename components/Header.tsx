import { Link } from "./Link";
import { Heading, Box, Flex, Container, Styled } from "theme-ui";

export function Header() {
  const headerHeight = 60;
  return (
    <>
      <Box sx={{ width: "100%", height: headerHeight, mb: 3 }} />
      <Flex
        sx={{
          position: "fixed",
          top: 0,
          right: 0,
          left: 0,
          height: headerHeight,
          borderBottom: "3px solid black",
          zIndex: 100,
          bg: "background",
          alignItems: "center",
        }}
        as="header"
      >
        <Container>
          <Flex sx={{ alignItems: "flex-end" }}>
            <Link sx={{ mr: 5 }} href="/">
              <Heading sx={{ fontSize: 32 }}>Dez Palmer</Heading>
            </Link>
            <Link sx={{ mr: 5 }} href="/about">
              About
            </Link>
            <Link href={"/contact"}>Contact</Link>
          </Flex>
        </Container>
      </Flex>
    </>
  );
}
