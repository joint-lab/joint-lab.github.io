import React from 'react';
import { useStaticQuery, graphql } from 'gatsby';
import MetaImage from '../../images/meta-image.png';

const getSchemaOrgJSONLD = ({url, title, image, description}) => {
  return [
    {
      '@context': 'http://schema.org',
      '@type': 'WebSite',
      url,
      name: title,
      image: {
        '@type': 'ImageObject',
        url: image
      },
      description,
      alternateName: title
    }
  ];
};

export function Seo({ title, description, image, pathname, children }) {
  const { site } = useStaticQuery(graphql`
    query {
      site {
        siteMetadata {
          title
          description
          siteUrl
          twitter
        }
      }
    }
  `);

  const siteTitle = title || site.siteMetadata.title;
  const siteDescription = description || site.siteMetadata.description;
  const siteUrl = site.siteMetadata.siteUrl;
  const url = `${siteUrl}${pathname || ''}`;
  const metaImage = `${siteUrl}${image || MetaImage}`;
  const twitter = site.siteMetadata.twitter;

  const schemaOrgJSONLD = getSchemaOrgJSONLD({
    url,
    title: siteTitle,
    image: metaImage,
    description: siteDescription
  });

  return (
    <>
      <title>{`${siteTitle} — ${siteDescription}`}</title>
      <meta name="description" content={siteDescription} />
      <meta name="image" content={metaImage} />

      <script type="application/ld+json">
        {JSON.stringify(schemaOrgJSONLD)}
      </script>

      <meta property="og:url" content={url} />
      <meta property="og:type" content="website" />
      <meta property="og:title" content={siteTitle} />
      <meta property="og:description" content={siteDescription} />
      <meta property="og:image" content={metaImage} />

      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:creator" content={twitter} />
      <meta name="twitter:title" content={siteTitle} />
      <meta name="twitter:description" content={siteDescription} />
      <meta name="twitter:image" content={metaImage} />

      {children}
    </>
  );
}
