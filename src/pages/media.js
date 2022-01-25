import React, { useMemo, useState } from "react";
import { graphql } from "gatsby"

// Components
import { Page, Container, ToolBar, TwoColumnLayout } from "components/core/layout";
import { SlideOver } from "components/core/slide_over";
import { MediasList, MediaFilters } from 'components/core/media';
import { FiMoreHorizontal } from 'react-icons/fi'; 
import { SubHero } from 'components/core/sub-hero';

// Contexts
import { MediaContextProvider } from 'contexts/media';

/*
 URL: /publications 
 Show a list of publications with filtering.
 It uses a context to handle the filtering. The data comes from the graphql query.
*/
export default function Index({ data, location }){
  const [open, setOpen] = useState(false);
  const media = useMemo(()=>data.media.edges.map(d=>d.node), [data]);
  const people = useMemo(()=>data.people.edges.map(n=>({...n.node.frontmatter, ...n.node.fields})), [data])

  return  <MediaContextProvider media={media} people={people}>
            <Page location={location} light >
            <SubHero title="Media"/>
             <ToolBar className="block lg:hidden border-t bg-gray-100">
                  <div className="flex w-full">
                    <button onClick={()=>setOpen(true)} className="ml-auto rounded-md p-2 inline-flex items-center justify-center text-gray-800 hover:text-green-600 focus:outline-none focus:ring-2 focus-ring-inset focus:ring-white">
                      <span className="sr-only">Open main menu</span>
                      <FiMoreHorizontal className="h-6 w-6" aria-hidden="true"/>
                    </button>
                  </div>
              </ToolBar>
              <Container className="pt-8 lg:pt-16">
                <TwoColumnLayout >
                <TwoColumnLayout.Secondary first className={'hidden lg:block w-full lg:w-72'}>
                   <MediaFilters/>
                </TwoColumnLayout.Secondary>
                <TwoColumnLayout.Main last>
                  <MediasList/>
                </TwoColumnLayout.Main>
                </TwoColumnLayout>
              </Container>
              <SlideOver open={open} setOpen={setOpen} size="sm" title="Filters">
                <Container className="pb-4">
                  <MediaFilters/>
                </Container>
              </SlideOver>
            </Page>
          </MediaContextProvider>
}
  
export const IndexQuery = graphql`
  query {
    media: allMediaJson(
      sort: {fields: year}
    ) {
      edges {
        node {
          id
          url
          authors
          title
          type
          description,
          year
          imageURL {
              childImageSharp {
                gatsbyImageData(
                  placeholder: DOMINANT_COLOR
                  aspectRatio: 2
                  transformOptions: {cropFocus: CENTER}
                )
              }
            }
        }
      }
    }
    people: allMdx(
        sort: {fields: frontmatter___lastName}
        filter: {fields: {source: {eq: "people"}}}
      ) {
        edges {
          node {
            fields {
              slug
            }
            frontmatter {
              firstName
              lastName
              alias
              group
            }
          }
        }
    }

  }

`;