require(`dotenv`).config({
  path: `.env`,
})

module.exports = {
  siteMetadata: {
    siteUrl: "https://joint-lab.github.io",
    title: "The Joint Lab",
    description: "Collaborative explorations across sciences with models and data",
    twitter: "https://github.com/joint-lab"
  },
  plugins: [
    "gatsby-plugin-styled-components",
    'gatsby-plugin-postcss',
    {
      resolve: "gatsby-plugin-google-analytics",
      options: {
        trackingId: "XXXXX",
      },
    },
    'gatsby-plugin-sass',
    `gatsby-plugin-image`,
    `gatsby-transformer-sharp`,
    "gatsby-plugin-sharp",
    "gatsby-plugin-react-helmet",
    'gatsby-transformer-json',
    'gatsby-plugin-mdx',
    'gatsby-plugin-mdx-source-name',
    'gatsby-plugin-resolve-src',
    {
      resolve: `gatsby-transformer-json`,
      options: {
        typeName: `Json`, // a fixed string
      },
    },
    {
      resolve: "gatsby-source-filesystem",
      options: {
        name: "images",
        path: "./src/images/",
      },
      __key: "images",
    },
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        name: `people`,
        path: `./src/data/people`,
        ignore: [`**/\.*`],
      },
    },
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        name: `news`,
        path: `./src/data/news`,
        ignore: [`**/\.*`],
      },
    },
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        name: `publications`,
        path: `./src/data/publications`,
        ignore: [`**/\.*`],
      },
    },
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        name: `media`,
        path: `./src/data/media`,
        ignore: [`**/\.*`],
      },
    },
    {
      resolve: "gatsby-source-filesystem",
      options: {
        name: "pages",
        path: "./src/pages/",
      },
      __key: "pages",
    },
  ],
};