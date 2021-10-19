import React from 'react';
import classnames from 'classnames';
import { graphql, Link } from "gatsby"

// Components
import { Page, Container, FlexLayout  } from "components/core/layout";
import { MDXProvider } from "@mdx-js/react";
import { MDXRenderer } from "gatsby-plugin-mdx";
import { FiArrowRight } from 'react-icons/fi';
import { SubHero } from 'components/core/sub-hero';

const shortcodes = { Link } // Provide mdx components

function LinkToNews({ header, title, slug, date, className}){
  return <div className={classnames("pt-4 w-full", className)}>  
            <div className="text-gray-500 text-xs uppercase w-full">{header}</div>
            <Link to={slug}><div className='flex items-center space-x-1 text-green-700 hover:text-green-900 text-sm'><span className="inline-block truncate">{title}</span><span className="inline-block"><FiArrowRight/></span></div></Link>
            {date? <p className="text-sm text-gray-500">{date}</p>: null}
          </div>
}

/*
Template page for each news
*/
export default function ExtendedNewsPage({ data: {mdx}, location, pageContext }){

  return <Page location={location} light title={mdx.frontmatter.title} description={mdx.excerpt}>
          <SubHero/>
          <Container className='mt-8 xl:mt-24 mb-8'>
            <div  className='text-center pb-8'>
              <p className='text-3xl md:text-4xl lg:text-5xl xl:text-6xl font-bold mb-4' style={{lineHeight: '1.3'}}>{mdx.frontmatter.title}</p>
              <p className='text-base font-medium text-gray-500'>{mdx.frontmatter.date}</p>
            </div>
            <hr/>
          </Container>
          <Container className='text-lg leading-relaxed mdx-content lg:mb-16'>
            <FlexLayout>
              <FlexLayout.Item size="sm" className="sticky top-0 divide-y w-full px-4 space-y-4 hidden lg:block">
                {pageContext.previous?<LinkToNews {...pageContext.previous.node.frontmatter} slug={pageContext.previous.node.fields.slug} header={'Previous'}/>: null}
                {pageContext.next? <LinkToNews {...pageContext.next.node.frontmatter} slug={pageContext.next.node.fields.slug} header={'Next'}/>: null}
                <LinkToNews title={'Back to the news list'} slug={`/news/${pageContext.page}`}/>
              </FlexLayout.Item>
              <FlexLayout.Item size="lg">
                <div className='space-y-8'>
                  <MDXProvider components={shortcodes}>
                    <MDXRenderer frontmatter={mdx.frontmatter}>{mdx.body}</MDXRenderer>
                  </MDXProvider>
                </div>
              </FlexLayout.Item>
              <FlexLayout.Item size="sm" className="divide-y w-full space-y-4 block lg:hidden my-4">
                {pageContext.previous?<LinkToNews {...pageContext.previous.node.frontmatter} slug={pageContext.previous.node.fields.slug} header={'Previous'}/>: null}
                {pageContext.next? <LinkToNews {...pageContext.next.node.frontmatter} slug={pageContext.next.node.fields.slug} header={'Next'}/>: null}
                <LinkToNews title={'Back to the news list'} slug={`/news/${pageContext.page}`}/>
              </FlexLayout.Item>
            </FlexLayout>
          </Container>
          </Page>
}


/*
  Includes elements in the query to get news data.
  The id comes from the pageContext. See gatsby_node.js.
*/
export const query = graphql`
  query IdBasedNewsQuery($id: String) {
    mdx(id: { eq: $id }) {
      id
      body
      frontmatter {
        title
        date(formatString: "MMMM Do, YYYY")
      }
      excerpt(truncate: true, pruneLength: 120)

    }
  }
`