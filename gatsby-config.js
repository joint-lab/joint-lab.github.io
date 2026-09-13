require(`dotenv`).config({
  path: `.env`,
})

module.exports = {
  trailingSlash: "always",
  siteMetadata: {
    siteUrl: "https://joint-lab.github.io",
    title: "The Joint Lab",
    description:
      "The Laboratory for Structure and Dynamics and the Complex Data Laboratory " +
      "at the University of Vermont study complex systems, networks, and statistical inference.",
  },
  plugins: [
    {
      resolve: "gatsby-plugin-sitemap",
      options: {
        serialize: ({ path }) => ({ url: path }),
      },
    },
    'gatsby-plugin-postcss',
    'gatsby-plugin-sass',
    `gatsby-plugin-image`,
    `gatsby-transformer-sharp`,
    "gatsby-plugin-sharp",
    'gatsby-transformer-json',
    {
      resolve: `gatsby-plugin-mdx`,
      options: {
        extensions: [`.mdx`, `.md`],
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
