import React from 'react';
import { Helmet } from 'react-helmet'
import PropTypes from 'prop-types';

const getSchemaOrgJSONLD = ({url, title, image, description}) => {
  const schemaOrgJSONLD = [
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

  return schemaOrgJSONLD;
};

export function WebsiteHeader({url, title, image, description, twitter, children}){
  const schemaOrgJSONLD = getSchemaOrgJSONLD({
    url,
    title,
    image,
    description
  });
  return (
    <Helmet title={`${title} — ${description}`}>
      {/* General tags */}
      <meta name="description" content={description} />
      <meta name="image" content={image} />

      {/* Schema.org tags */}
      <script type="application/ld+json">
        {JSON.stringify(schemaOrgJSONLD)}
      </script>

      {/* OpenGraph tags */}
      <meta property="og:url" content={url} />
      <meta property="og:type" content="website" />
      <meta property="og:title" content={title} />
      <meta property="og:description" content={description} />
      <meta property="og:image" content={image} />

      {/* Twitter Card tags */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:creator" content={twitter} />
      <meta name="twitter:title" content={title} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:image" content={image} />

      {children}
    </Helmet>
  );
};

WebsiteHeader.propTypes = {
  url: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
  image: PropTypes.string.isRequired,
  description: PropTypes.string.isRequired,
  twitter: PropTypes.string,
  children: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.node),
    PropTypes.node
  ])
};

