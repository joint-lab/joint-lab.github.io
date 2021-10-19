import React from "react";
import { graphql } from "gatsby"

// Components
import { Page, Container } from "components/core/layout";
import { MediaList } from 'components/core/media';
import { Paginate } from 'components/core/paginate';
import { SubHero } from 'components/core/sub-hero';

/*
 URL: /media/page 
 Show a list of media links.
 The data is provided by the graphql query.
*/
export default function Index({ data, location, pageContext}){
  return <Page location={location} light>
            <SubHero title="Media"/>
            <div className="mb-12">
              <MediaList edges={data.allMdx.edges}/>
            </div>
            <Container>
              {pageContext.numPages>1? <Paginate className='max-w-full border-b py-3' total={pageContext.numPages} currentPage={pageContext.currentPage}/>: null}
            </Container>
          </Page>;
}


/*
  Fetch the news for the given page. See gatsby_node.js for context.
*/
export const MediaPaginatedQuery = graphql`
  query MediaPaginatedQuery($limit: Int, $skip: Int) {
    allMdx(
      sort: {fields: frontmatter___date, order: DESC}
      limit: $limit
      skip: $skip
      filter: {fileAbsolutePath: {}, fields: {source: {eq: "media"}}}
    ) {
      edges {
        node {
          frontmatter {
            title
            year
            format
            url
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
