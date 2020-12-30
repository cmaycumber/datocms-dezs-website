import Head from "next/head";
import { renderMetaTags, useQuerySubscription } from "react-datocms";
import { Heading, Text, Flex, Container, Grid, Box } from "theme-ui";
import { Layout, Image, WorkPreview } from "../components";
import { request } from "../lib/datocms";
import { metaTagsFragment, responsiveImageFragment } from "../lib/fragments";

export async function getStaticPaths() {
  // @ts-ignore
  const data = await request({
    query: `{ allWorks { slug } }`,
    // preview,
    // variables: undefined,
  });

  return {
    paths: data.allWorks.map((post) => `/${post.slug}`),
    fallback: false,
  };
}

export async function getStaticProps({ params, preview = false }) {
  const graphqlRequest = {
    query: `
      query PostBySlug($slug: String) {
        site: _site {
          favicon: faviconMetaTags {
            ...metaTagsFragment
          }
        }
        work(filter: {slug: {eq: $slug}}) {
          seo: _seoMetaTags {
            ...metaTagsFragment
          }
          title
          slug
          content(markdown: true)
          date
          ogImage: coverImage{
            url(imgixParams: {fm: jpg, fit: crop, w: 2000, h: 1000 })
          }
          gallery {
            responsiveImage(imgixParams: {fm: jpg, fit: crop, w: 2000, h: 1000 }) {
              ...responsiveImageFragment
            }
          }
          coverImage {
            responsiveImage(imgixParams: {fm: jpg, fit: crop, w: 2000, h: 1000 }) {
              ...responsiveImageFragment
            }
          }
        }

        moreWorks: allWorks(orderBy: date_DESC, first: 4, filter: {slug: {neq: $slug}}) {
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

      ${responsiveImageFragment}
      ${metaTagsFragment}
    `,
    preview,
    variables: {
      slug: params.slug,
    },
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

export default function Post({ subscription, preview }) {
  const {
    data: { site, work, moreWorks },
  } = useQuerySubscription(subscription);

  const metaTags = work.seo.concat(site.favicon);

  return (
    <Layout preview={preview}>
      <Head>{renderMetaTags(metaTags)}</Head>
      <Container>
        <Flex sx={{ flexDirection: ["column-reverse", "row"] }}>
          <Box sx={{ mr: 5, minWidth: ["100%", 200], width: "100%" }}>
            <Box sx={{ position: ["unset", "sticky"], top: 80, mb: 5 }}>
              <Heading>{work.title}</Heading>
              <div dangerouslySetInnerHTML={{ __html: work.content }} />
            </Box>
          </Box>
          <Box>
            {work.gallery.map((image) => {
              return (
                <Image
                  sx={{
                    mb: 5,
                  }}
                  data={{
                    ...image.responsiveImage,
                  }}
                />
              );
            })}
          </Box>
        </Flex>
        <Box sx={{ mb: 5 }}>
          <Heading sx={{ mb: 3 }}>More Work</Heading>
          <Grid gap={3} columns={[2, 4]}>
            {moreWorks.map((work) => (
              <WorkPreview
                responsiveImage={work.coverImage.responsiveImage}
                title={work.title}
                href={work.slug}
              />
            ))}
          </Grid>
        </Box>
      </Container>
    </Layout>
  );
}
