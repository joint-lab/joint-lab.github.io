import React from 'react';
import { graphql, useStaticQuery } from 'gatsby';
import organization from '../../data/organization.json';
import defaultImage from '../../images/meta-image.png';

function getPageUrl(siteUrl, pathname) {
  const url = new URL(pathname || '/', siteUrl);
  url.search = '';
  url.hash = '';

  if (!url.pathname.endsWith('/') && !url.pathname.endsWith('.html')) {
    url.pathname += '/';
  }

  return url.href;
}

export function Seo({
  title,
  description,
  image,
  pathname,
  noindex = false,
  children,
}) {
  const { site } = useStaticQuery(graphql`
    query {
      site {
        siteMetadata {
          title
          description
          siteUrl
        }
      }
    }
  `);

  const metadata = site.siteMetadata;
  const homeUrl = getPageUrl(metadata.siteUrl, '/');
  const pageUrl = getPageUrl(metadata.siteUrl, pathname);
  const pageTitle = title
    ? `${title} | ${metadata.title}`
    : `${metadata.title} | University of Vermont`;
  const pageDescription = description || metadata.description;
  const imageUrl = new URL(image || defaultImage, homeUrl).href;
  const isHomePage = pageUrl === homeUrl;
  const website = {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    name: metadata.title,
    url: homeUrl,
    description: metadata.description,
    publisher: organization,
  };

  // Escape opening brackets so content cannot terminate the script element.
  const jsonLd = JSON.stringify(website).replace(/</g, '\u003c');

  return (
    <>
      <html lang="en" />
      <title>{pageTitle}</title>
      <meta name="description" content={pageDescription} />
      {noindex && <meta name="robots" content="noindex, follow" />}
      {!noindex && <link rel="canonical" href={pageUrl} />}
      {isHomePage && !noindex && (
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: jsonLd }}
        />
      )}

      <meta property="og:site_name" content={metadata.title} />
      <meta property="og:type" content="website" />
      <meta property="og:url" content={pageUrl} />
      <meta property="og:title" content={pageTitle} />
      <meta property="og:description" content={pageDescription} />
      <meta property="og:image" content={imageUrl} />

      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={pageTitle} />
      <meta name="twitter:description" content={pageDescription} />
      <meta name="twitter:image" content={imageUrl} />
      {children}
    </>
  );
}
