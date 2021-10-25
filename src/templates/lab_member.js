import React from 'react';
import { graphql, Link } from "gatsby"

// Components
import { Page, Container, ContainerFull, FlexLayout } from "components/core/layout";
import { PublicationsList } from 'components/core/publications';
import { List, ListItem} from 'components/core/list';
import { EducationList, EducationItem } from 'components/core/education';
import { ScholarshipList, ScholarshipItem } from 'components/core/scholarships';
import { SubHero } from 'components/core/sub-hero';
import { GatsbyImage, getImage } from "gatsby-plugin-image"

import { MDXProvider } from "@mdx-js/react";
import { MDXRenderer } from "gatsby-plugin-mdx";
import { AiOutlineGithub, AiOutlineGlobal, AiOutlineTwitter } from 'react-icons/ai';
import { FiArrowRight } from 'react-icons/fi';
import { IoMdMailOpen } from 'react-icons/io';

// Contexts
import { PublicationsContextProvider } from 'contexts/publications';

// MDX components
const shortcodes = { Link, List, ListItem, EducationList, EducationItem, ScholarshipList, ScholarshipItem } 

function ButtonToAllPublications({ alias }){
  return <Link to={`/publications?author=${encodeURIComponent(alias)}`}><div className='flex items-center space-x-1 inline-flex text-green-700 hover:text-green-900'><span>See all publications</span><FiArrowRight/></div></Link>
}

/*
Template page for each lab member
*/
export default function LabMemberPage({ data: {mdx, publications}, location }){
  const image = getImage(mdx.frontmatter.imageUrl)
  console.log(mdx.frontmatter.imageUrl)

  return <PublicationsContextProvider people={[]} allPublications={publications.edges.map(n=>({...n.node}))}>
          <Page location={location} light title={`Joint Lab Member: ${mdx.frontmatter.firstName} ${mdx.frontmatter.lastName}`} description={mdx.excerpt} image={mdx.frontmatter.imageUrl? mdx.frontmatter.imageUrl.childImageSharp.gatsbyImageData.images.fallback.src: null}>
            <SubHero/>
            <Container className='mt-4 sm:mt-8 -mt-16'>
              <FlexLayout>
                <FlexLayout.Item size="sm">
                  <div className='mb-4 sm:flex lg:block sticky top-0 lg:pt-6'>
                    <div className='w-full xs:w-2/6 lg:w-full px-12 max-w-xs sm:px-0 mx-auto mb-4'>
                      {image ?<GatsbyImage image={image} alt={`${mdx.frontmatter.firstName} ${mdx.frontmatter.lastName}`} imgClassName="md:rounded shadow border-8 border-gray-700 "/>:null}
                      {!image?<div className='aspect-w-1 aspect-h-1 rounded-lg bg-gray-100'/>: null}
                    </div>
                    <div className='w-full text-center sm:text-left sm:w-4/6 lg:w-full px-3 sm:px-8 lg:px-0'>
                      {/* Name & Role */}
                      <h4 className='font-bold text-xl sm:text-3xl lg:mb-1'>{mdx.frontmatter.firstName} {mdx.frontmatter.lastName}</h4>
                      <p className="text-lg text-medium mb-3">{mdx.frontmatter.role}</p>
                      {mdx.frontmatter.lab? 
                        mdx.frontmatter.lab.map(l=><div key={l} className="text-gray-600">Affiliated with {l}'s lab</div>):null
                      }
                      {/* Social */}
                      <div className='inline-flex space-x-6 text-lg sm:text-base mt-3 text-gray-800 0 sm:block sm:space-x-0 sm:divide-y text-center '>
                        {mdx.frontmatter.githubURL? 
                          <a className="hover:text-green-800 flex space-x-2 items-center sm:py-2" href={mdx.frontmatter.githubURL}>
                            <AiOutlineGithub/> 
                            <span className='hidden sm:inline-block'>{mdx.frontmatter.githubURL.split('/').slice(-1)}</span>
                          </a>: null}
                        {mdx.frontmatter.personalURL? 
                          <a className="hover:text-green-800 flex space-x-2 items-center sm:py-2" href={mdx.frontmatter.personalURL}>
                            <AiOutlineGlobal/>
                            <span className='hidden sm:inline-block'>{mdx.frontmatter.personalURL.split('//').slice(-1)}</span>
                          </a>: null}
                        {mdx.frontmatter.twitterURL? 
                          <a className="hover:text-green-800 flex space-x-2 items-center sm:py-2" href={mdx.frontmatter.twitterURL}>
                            <AiOutlineTwitter/>
                            <span className='hidden sm:inline-block'>{mdx.frontmatter.twitterURL.split('/').slice(-1)}</span>
                          </a>: null}
                        {mdx.frontmatter.email? 
                          <a className="hover:text-green-800 flex space-x-2 items-center sm:py-2 " href={`mailto:${mdx.frontmatter.email}`}>
                            <IoMdMailOpen/>
                            <span className='hidden sm:inline-block'>{mdx.frontmatter.email}</span>
                          </a>: null}
                      </div>
                      <div className="hidden md:block">
                        <Link to={`/people`}><div className='inline-flex flex items-center space-x-1 py-5 text-green-700 hover:text-green-900'><span>Back to all members</span><FiArrowRight/></div></Link>
                      </div>

                    </div>
                  </div>
                </FlexLayout.Item>
                <FlexLayout.Item size="lg"> 
                  <div className='mdx-content my-2 lg:my-0 lg:px-12 whitespace-pre-line space-y-3'>
                    <MDXProvider components={shortcodes}>
                      <MDXRenderer frontmatter={mdx.frontmatter}>{mdx.body}</MDXRenderer>
                    </MDXProvider>
                  </div>
                </FlexLayout.Item>
              </FlexLayout>

               <Link to={`/people`}>
               <div className="w-full bg-gray-100 hover:bg-gray-200 rounded-lg text-center md:hidden my-3">
                 <div className='inline-flex flex items-center space-x-1 py-3 text-green-700 hover:text-green-900'><span>Back to all members</span><FiArrowRight/></div>
                </div>
              </Link>

              </Container>
              {publications.totalCount>0?
                <ContainerFull className='bg-gray-50 border-t py-6 lg:py-12'> 
                  <Container >
                    <h3 className='text-2xl'>{publications.totalCount>3? "Latest publications": "Publications"}</h3>
                    <PublicationsList hidePublicationCount/>
                    <ButtonToAllPublications alias={mdx.frontmatter.alias}/>
                  </Container>
                </ContainerFull>
                : null}
            </Page>
          </PublicationsContextProvider>
}

/*
  Includes elements in the query to get
  more data from lab members. The id comes from the pageContext. See gatsby_node.js.
*/
export const query = graphql`
  query LabMemberQuery($id: String, $aliasRegex: String) {
    mdx(id: { eq: $id }) {
      id
      body
      frontmatter {
        firstName
        lastName
        imageUrl {
          childImageSharp {
            gatsbyImageData(placeholder: DOMINANT_COLOR)
          }
        }
        role
        lab
        alias
        githubURL
        personalURL
        twitterURL
        email
        scholarURL
      }
      excerpt(truncate: true, pruneLength: 120)

    }
    publications: allPublicationsJson(
      sort: {fields: year, order: DESC}
      limit: 3
      filter: {authors: {regex: $aliasRegex}}
      ){
      totalCount
      edges {
        node {
          id
          location
          journal
          journalURL
          isOpenAccess
          preprintURL
          flavor
          degree
          conference
          authors
          textURL
          year
          type
          software
          slidesURL
          title
        }
      }
    }
  }
`