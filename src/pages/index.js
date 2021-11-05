import React from "react";
import { graphql } from "gatsby"

// Components
import { Page, Container } from "components/core/layout";
import { IndexHero } from "components/core/hero";
import { HighlightedNewsContainer } from 'components/core/highlighted-news';
import { RowNewsContainer, ButtonToAllNews} from 'components/core/row-news';
import { HighlightedPublicationListIndex, ButtonToAllPublications } from 'components/core/publications';

// Contexts
import { PublicationsContextProvider } from 'contexts/publications';


export default function Index({ data, location }){
  return <PublicationsContextProvider query={location.search} 
                                      allHighlightPublications={data.highlightPublications.edges.map(n=>({...n.node}))} 
                                      people={data.people.edges.map(n=>({...n.node.frontmatter, ...n.node.fields}))} 
                                      allPublications={[]}>
            <Page location={location} contentOverNav light>
              <IndexHero/>
              <Container>
                <div className="font-medium text-center my-3 lg:mt-6 text-lg">
                  News from the lab
                </div>
                <HighlightedNewsContainer news={[...data.topNew.edges, ...data.highlightedNews.edges]} />
              </Container>
              <Container className="mb-8">
                <RowNewsContainer news={data.archivedNews.edges} />
                <ButtonToAllNews/>
              </Container>
              <div className="bg-gray-50 border-t shadow">
                <Container className="py-6">
                  <HighlightedPublicationListIndex/>
                  <ButtonToAllPublications/>
                </Container>
              </div>
            </Page>
          </PublicationsContextProvider>;
}

/*
 Get the latest news and some older ones.
 The rest of the archived news will be placed in /news/{page}. See gatsby-node.js.

 The first news (topNew query) has a larger excerpt.
*/
export const IndexQuery = graphql`
  query {
    topNew: allMdx(
      sort: {fields: frontmatter___date, order: DESC}
      limit: 1
      filter: {fileAbsolutePath: {}, fields: {source: {eq: "news"}}}
    ) {
      edges {
        node {
          frontmatter {
            title
            date(formatString: "MMMM D, YYYY")
          }
          fields {
            slug
          }
          excerpt(truncate: true, pruneLength: 250)
        }
      }
    }
    highlightedNews: allMdx(
      sort: {fields: frontmatter___date, order: DESC}
      skip: 1
      limit: 2
      filter: {fileAbsolutePath: {}, fields: {source: {eq: "news"}}}
    ) {
      edges {
        node {
          frontmatter {
            title
            date(formatString: "MMMM D, YYYY")
          }
          fields {
            slug
          }
          excerpt(truncate: true, pruneLength: 120)
        }
      }
    }
    highlightPublications: allPublicationsJson(
      sort: {fields: date}, limit: 4
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
    archivedNews: allMdx(
      sort: {fields: frontmatter___date, order: DESC}
      skip: 3
      limit: 10
      filter: {fileAbsolutePath: {}, fields: {source: {eq: "news"}}}
    ) {
      edges {
        node {
          frontmatter {
            title
            date(formatString: "MMMM D, YYYY")
          }
          fields {
            slug
          }
          excerpt(truncate: true, pruneLength: 250)
        }
      }
    }
  }
`;