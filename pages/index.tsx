import Head from "next/head";
import { renderMetaTags, useQuerySubscription } from "react-datocms";
import { Container, Flex, Grid } from "theme-ui";
import { WorkPreview, Layout } from "../components";
import { request } from "../lib/datocms";
import { metaTagsFragment, responsiveImageFragment } from "../lib/fragments";

export async function getStaticProps({ preview }) {
  const graphqlRequest = {
    query: `
      {
        site: _site {
          favicon: faviconMetaTags {
            ...metaTagsFragment
          }
        }
        allWorks(orderBy: date_DESC, first: 20) {
          title
          slug
          excerpt
          date
          coverImage {
            responsiveImage(imgixParams: {fm: jpg, fit: crop, w: 2000, h: 1000 }) {
              ...responsiveImageFragment
            }
          }
        }
      }

      ${metaTagsFragment}
      ${responsiveImageFragment}
    `,
    preview,
    variables: undefined,
  };

  return {
    props: {
      subscription: preview
        ? {
            ...graphqlRequest,
            initialData: await request(graphqlRequest),
            token: process.env.NEXT_EXAMPLE_CMS_DATOCMS_API_TOKEN,
          }
        : {
            enabled: false,
            initialData: await request(graphqlRequest),
          },
    },
  };
}

export default function Index({ subscription }) {
  const {
    data: { allWorks, site },
  } = useQuerySubscription(subscription);

  // const metaTags = blog.seo.concat(site.favicon);

  return (
    <>
      <Layout preview={subscription.preview}>
        {/* <Head>{renderMetaTags(metaTags)}</Head> */}
        <Container>
          <Grid gap={[2, 3]} columns={[1, 2, 4]}>
            {allWorks.map((post) => (
              <WorkPreview
                key={post.title}
                responsiveImage={post.coverImage.responsiveImage}
                title={post.title}
                href={post.slug}
              />
            ))}
          </Grid>
        </Container>
      </Layout>
    </>
  );
}
