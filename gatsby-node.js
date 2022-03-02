const path = require("path");
const { createFilePath } = require("gatsby-source-filesystem");

// Create a path (URL, slug) for each node (news/members)
exports.onCreateNode = async ({ node, actions, getNode }) => {
  const { createNodeField } = actions;
  if (node.internal.type === "Mdx") {
    const value = createFilePath({ node, getNode })
    createNodeField({
      name: "slug",
      node,
      value: `/${node.fields.source}${value}`,
    })
  }
};


// Create a single page for each lab memebr
exports.createPages = async ({ graphql, actions, reporter }) => {
  const { createPage } = actions;

  // Lab members
  const labMembersData = await graphql(`
    query {
      allMdx(
        filter: {fields: {source: {eq: "people"}}}
      ) {
        edges {
          node {
            id
            frontmatter {
              alias
            }
            fields {
              slug
            }
          }
        }
      }
    }
  `)
  if (labMembersData.errors) {
    reporter.panicOnBuild('🚨  ERROR: Loading "createPages" query')
  }
  const members = labMembersData.data.allMdx.edges
  members.forEach(({ node }, index) => {
    createPage({
      path: node.fields.slug,
      component: path.resolve(`./src/templates/lab_member.js`),
      context: { id: node.id , aliasRegex: "/.*"+node.frontmatter.alias+".*/"},
    })
  })

  // Pagination news pages 
  const newsPaginated = await graphql(
    `
      {
        allMdx(
          sort: {fields: frontmatter___date, order: DESC}
          filter: {fields: {source: {eq: "news"}}}
        ) {
          edges {
            node {
              fields {
                slug
              }
            }
          }
        }
      }
    `
  )
  if (newsPaginated.errors) {
    reporter.panicOnBuild(`Error while running GraphQL query.`)
    return
  }

  const archivedNews = newsPaginated.data.allMdx.edges
  const newsPerPage = 25
  const numPagesNews = Math.ceil((archivedNews.length) / newsPerPage)

  Array.from({ length: numPagesNews }).forEach((_, i) => {
    createPage({
      path: `/news/${i + 1}`,
      component: path.resolve("./src/templates/paginated_news.js"),
      context: {
        limit: newsPerPage,
        skip: i * newsPerPage,
        numPages: numPagesNews,
        currentPage: i + 1,
      },
    })
  })

  // News
  const newsData = await graphql(`
    query {
      allMdx(
        filter: {fields: {source: {eq: "news"}}}
        sort: {fields: frontmatter___date, order: DESC}
      ) {
        edges {
          node {
            id
            fields {
              slug
            }
            frontmatter {
              title
              date(formatString: "MMMM Do, YYYY")
            }
          }
        }
      }
    }
  `)
  if (newsData.errors) {
    reporter.panicOnBuild('🚨  ERROR: Loading "createPages" query')
  }
  newsData.data.allMdx.edges.forEach(({ node }, index) => {
    const previousNews = index===0? null:  newsData.data.allMdx.edges[index-1];
    const nextNews = index===(newsData.data.allMdx.edges.length-1)? null:  newsData.data.allMdx.edges[index+1];
    const page = Math.floor((index)/newsPerPage)+1;
    createPage({
      path: node.fields.slug,
      component: path.resolve(`./src/templates/news.js`),
      context: { id: node.id, 
                page: page,
                previous: previousNews,
                next: nextNews},
    })
  })
}
