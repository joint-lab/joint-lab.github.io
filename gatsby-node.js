const path = require("path");
const { createFilePath } = require("gatsby-source-filesystem");

// Resolve imports from src/ directory (replaces gatsby-plugin-resolve-src)
exports.onCreateWebpackConfig = ({ actions }) => {
  actions.setWebpackConfig({
    resolve: {
      modules: [path.resolve(__dirname, "src"), "node_modules"],
    },
  });
};

// Create source and slug fields for each MDX node
exports.onCreateNode = async ({ node, actions, getNode }) => {
  const { createNodeField } = actions;
  if (node.internal.type === "Mdx") {
    // Add source field (replaces gatsby-plugin-mdx-source-name)
    const fileNode = getNode(node.parent);
    const source = fileNode.sourceInstanceName;
    createNodeField({
      name: "source",
      node,
      value: source,
    });

    // Add slug field
    const value = createFilePath({ node, getNode });
    createNodeField({
      name: "slug",
      node,
      value: `/${source}${value}`,
    });
  }
};

// Create a single page for each lab member and news article
exports.createPages = async ({ graphql, actions, reporter }) => {
  const { createPage } = actions;

  // Run independent queries concurrently
  const [labMembersData, newsData] = await Promise.all([
    graphql(`
      query {
        allMdx(filter: {fields: {source: {eq: "people"}}}) {
          edges {
            node {
              id
              frontmatter { alias }
              fields { slug }
              internal { contentFilePath }
            }
          }
        }
      }
    `),
    graphql(`
      query {
        allMdx(
          filter: {fields: {source: {eq: "news"}}}
          sort: {frontmatter: {date: DESC}}
        ) {
          edges {
            node {
              id
              fields { slug }
              frontmatter {
                title
                date(formatString: "MMMM Do, YYYY")
              }
              internal { contentFilePath }
            }
          }
        }
      }
    `),
  ]);

  if (labMembersData.errors) {
    reporter.panicOnBuild('ERROR: Loading "createPages" query for lab members');
    return;
  }
  if (newsData.errors) {
    reporter.panicOnBuild('ERROR: Loading "createPages" query for news');
    return;
  }

  // Lab member pages
  const labMemberTemplate = path.resolve(`./src/templates/lab_member.js`);
  labMembersData.data.allMdx.edges.forEach(({ node }) => {
    createPage({
      path: node.fields.slug,
      component: `${labMemberTemplate}?__contentFilePath=${node.internal.contentFilePath}`,
      context: { id: node.id, aliasRegex: "/.*" + node.frontmatter.alias + ".*/"},
    });
  });

  // Paginated news listing pages
  const newsEdges = newsData.data.allMdx.edges;
  const newsPerPage = 25;
  const numPagesNews = Math.ceil(newsEdges.length / newsPerPage);

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
    });
  });

  // Individual news pages
  const newsTemplate = path.resolve(`./src/templates/news.js`);
  newsEdges.forEach(({ node }, index) => {
    const previousNews = index === 0 ? null : newsEdges[index - 1];
    const nextNews = index === newsEdges.length - 1 ? null : newsEdges[index + 1];
    createPage({
      path: node.fields.slug,
      component: `${newsTemplate}?__contentFilePath=${node.internal.contentFilePath}`,
      context: {
        id: node.id,
        page: Math.floor(index / newsPerPage) + 1,
        previous: previousNews,
        next: nextNews,
      },
    });
  });
};
