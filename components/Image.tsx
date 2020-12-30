import { Image as DatoCmsImage } from "react-datocms";
import { Image as TUIImage } from "theme-ui";
import { ComponentProps } from "react";

export const Image = (props: ComponentProps<typeof DatoCmsImage>) => (
  <TUIImage as={DatoCmsImage} {...props} />
);
