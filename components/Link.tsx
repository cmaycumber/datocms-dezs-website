import { Link as TUILink } from "theme-ui";
import NextLink from "next/link";
import { ComponentProps } from "react";

export const Link = ({
  href,
  ...props
}: ComponentProps<typeof TUILink & Omit<typeof NextLink, "as">>) => (
  <NextLink href={href} passHref>
    <TUILink {...props} />
  </NextLink>
);
