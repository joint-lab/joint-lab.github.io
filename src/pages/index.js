import React from "react";
import { graphql } from "gatsby"

// Components
import { Page, Container } from "components/core/layout";
import { IndexHero } from "components/core/hero";
import { HighlightedNewsContainer } from 'components/core/highlighted-news';
import { RowNewsContainer, ButtonToAllNews} from 'components/core/row-news';

export default function Index({ data, location }){
  return <Page location={location} contentOverNav light>
          <IndexHero/>
          <Container>
            <HighlightedNewsContainer news={[...data.topNew.edges, ...data.highlightedNews.edges]} />
          </Container>
          <Container className="mb-8">
            <RowNewsContainer news={data.archivedNews.edges} />
            <ButtonToAllNews/>
          </Container>
          </Page>;
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