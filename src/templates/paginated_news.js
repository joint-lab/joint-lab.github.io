import React from 'react';
import { graphql } from "gatsby"

// Components
import { Page, Container } from "components/core/layout";
import { RowNewsContainer } from 'components/core/row-news';
import { Paginate } from 'components/core/paginate';
import { SubHero } from 'components/core/sub-hero';

/*
Template page for paginated news
*/
export default function PaginatedNews({ data, location, pageContext}){

  return <Page light location={location}>
            <SubHero title={'All news'}/>
            <Container>
              <Paginate className='border-b py-3' total={pageContext.numPages} currentPage={pageContext.currentPage}/>
              <RowNewsContainer news={data.allMdx.edges}/>
              <Paginate className='border-t py-3' total={pageContext.numPages} currentPage={pageContext.currentPage}/>
            </Container>
          </Page>
}

/*
  Fetch the news for the given page. See gatsby_node.js for context.
*/
export const IndexQuery = graphql`
  query NewsQuery($limit: Int, $skip: Int) {
    allMdx(
      sort: {fields: frontmatter___date, order: DESC}
      limit: $limit
      skip: $skip
      filter: {fileAbsolutePath: {}, fields: {source: {eq: "news"}}}
    ) {
      edges {
        node {
          frontmatter {
            title
            date(formatString: "MMMM Do, YYYY")
          }
          fields {
            slug
          }
          excerpt(truncate: true, pruneLength: 120)
        }
      }
    }
  }
`;

