import { Container, Divider, Text, Box } from "theme-ui";
import { Link } from "./Link";

export default function Footer() {
  return (
    <Container sx={{ py: 4 }} as="footer">
      <Divider />
      <Box sx={{ textAlign: "center" }}>
        <Link sx={{ mb: 5 }} href="/">
          Home
        </Link>
        <Text>@ Copyright 2020 Dez Palmer</Text>
      </Box>
    </Container>
  );
}
