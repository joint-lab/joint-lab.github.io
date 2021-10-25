import React, { useState } from "react";
import { graphql } from "gatsby"

// Components
import { Page, Container, ToolBar, TwoColumnLayout } from "components/core/layout";
import { SlideOver } from "components/core/slide_over";
import { PublicationsList, PublicationFilters } from 'components/core/publications';
import { FiMoreHorizontal } from 'react-icons/fi'; 
import { SubHero } from 'components/core/sub-hero';

// Contexts
import { PublicationsContextProvider } from 'contexts/publications';

/*
 URL: /publications 
 Show a list of publications with filtering.
 It uses a context to handle the filtering. The data comes from the graphql query.
*/
export default function Index({ data, location }){
  const [open, setOpen] = useState(false);
  return  <PublicationsContextProvider query={location.search} people={data.people.edges.map(n=>({...n.node.frontmatter, ...n.node.fields}))} allPublications={data.publications.edges.map(n=>({...n.node}))}>
            <Page location={location} light >
              <SubHero title="Publications"/>
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
                   <PublicationFilters/>
                </TwoColumnLayout.Secondary>
                <TwoColumnLayout.Main last>
                  <PublicationsList/>
                </TwoColumnLayout.Main>
                </TwoColumnLayout>
              </Container>
              <SlideOver open={open} setOpen={setOpen} size="sm" title="Filters">
                <Container className="pb-4">
                  <PublicationFilters/>
                </Container>
              </SlideOver>
            </Page>
          </PublicationsContextProvider>
}
  
export const IndexQuery = graphql`
  query {
    publications: allPublicationsJson(
      sort: {fields: year}
    ) {
      edges {
        node {
          id
          location
          journal
          journalURL
          isOpenAccess
          degree
          conference
          authors
          preprintURL
          flavor
          textURL
          year
          type
          software
          slidesURL
          title
        }
      }
    }
    people: allMdx(
        sort: {fields: frontmatter___lastName}
        filter: {fields: {source: {eq: "people"}}, frontmatter: {group: {ne: "alumni"}}}
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
            }
          }
        }
      }
  }

`;