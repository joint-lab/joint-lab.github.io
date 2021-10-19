import React from 'react';
import { graphql } from "gatsby"

// Components
import { Page } from 'components/core/layout';
import { PeopleGrid, AlumniGrid } from 'components/core/people-grid';
import { SubHero } from 'components/core/sub-hero';

/*
 URL: /people 
 Show a list of active members and alumnis.
 The data is provided by the graphql query.
*/
export default function Index({ data, location }){
  return <Page location={location} light>
            <SubHero title={'Lab members'}/>
            <PeopleGrid people={data.allCurrentMembers.edges} title="Active members"/>
            <AlumniGrid people={data.alumni.edges} title="Alumnis" className="mb-6"/>
          </Page>;
}

export const IndexQuery = graphql`
  query {
    allCurrentMembers: allMdx(
      sort: {fields: frontmatter___lastName}
      filter: { fields: {source: {eq: "people"}}, frontmatter: {group: {ne: "alumni"}}}
    ) {
      edges {
        node {
          fields {
            slug
          }
          frontmatter {
            firstName
            lastName
            imageUrl {
              childImageSharp {
                gatsbyImageData(
                  placeholder: DOMINANT_COLOR
                  aspectRatio: 1
                )
              }
            }
            role
            alias
            githubURL
            personalURL
            scholarURL
            twitterURL
            lab
            email
          }
        }
      }
    }
    alumni: allMdx(
      sort: {fields: frontmatter___lastName}
      filter: { fields: {source: {eq: "people"}}, frontmatter: {group: {eq: "alumni"}}}
    ) {
      edges {
        node {
          fields {
            slug
          }
          frontmatter {
            firstName
            lastName
            role
            alias
            githubURL
            personalURL
            scholarURL
            twitterURL
            lab
            email
          }
        }
      }
    }
  }
`;