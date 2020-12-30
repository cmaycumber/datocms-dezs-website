import { Box, Flex, Styled, Text } from "theme-ui";
import { Image } from "react-datocms";
// import { Image } from "./Image";

// import Link from "next/link";
import { Link } from "./Link";
import { useState } from "react";

/**
 * Defines expected props for this component
 */
interface IWork {
  responsiveImage: any;
  title: string;
  href: string;
}

/*
|--------------------------------------------------------------------------
| START COMPONENTS
|--------------------------------------------------------------------------
*/

/*
|--------------------------------------------------------------------------
| END COMPONENTS
|--------------------------------------------------------------------------
*/

/*
|--------------------------------------------------------------------------
| START MAIN
|--------------------------------------------------------------------------
*/
/**
 * Basic component for a piece of dezs work
 */
export const WorkPreview = ({ responsiveImage, title, href }: IWork) => {
  const [hovered, setHovered] = useState(false);

  return (
    <Link
      onMouseEnter={() => {
        setHovered(true);
      }}
      onMouseLeave={() => setHovered(false)}
      href={href}
    >
      <Box
        sx={{
          textAlign: "center",
        }}
      >
        <Flex
          sx={{
            position: "relative",
            mb: 2,
            borderWidth: 2,
            borderColor: "transparent",
            borderStyle: "solid",
            ...(hovered && {
              borderColor: "black",
            }),
            alignItems: "center",
          }}
        >
          <Box sx={{ paddingTop: "100%", maxHeight: 400, maxWidth: 400 }} />
          <Box
            style={{
              position: "absolute",
            }}
          >
            <Image
              data={{
                ...responsiveImage,
                alt: `Cover Image for ${title}`,
              }}
            />
          </Box>
        </Flex>
        <Text>{title}</Text>
      </Box>
    </Link>
  );
};
/*
|--------------------------------------------------------------------------
| END MAIN
|--------------------------------------------------------------------------
*/
