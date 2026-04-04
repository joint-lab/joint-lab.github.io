# Pre-existing Issues

Issues identified during the Gatsby 5 upgrade that were not introduced by the upgrade itself.

## Code Reuse

- **Duplicate `ButtonToAllPublications`**: `src/templates/lab_member.js` defines a local version (links with `?author=` param) while `src/components/core/publications.js` exports a different one (links to `/publications`). Could be unified with an optional `alias` prop.

## Code Quality

- **Publications and media pages are near-identical**: `src/pages/publications.js` and `src/pages/media.js` share the same layout structure (state, ToolBar, TwoColumnLayout, SlideOver). Could be extracted into a shared filterable-list page layout.

- **News sidebar rendered twice**: `src/templates/news.js` renders the previous/next links in two `FlexLayout.Item` blocks with identical content, differing only in responsive visibility classes (`hidden lg:block` vs `block lg:hidden`). Could extract a shared component.

- **Unnecessary wrapper divs in `Page`**: `src/components/core/layout.js` has an outermost `<div>` wrapping a `<div className={classnames(...)}>` wrapping a `<div className="">`. The outer and innermost divs add no value.

- **`location` prop threading**: `Page` accepts `location` only for nav highlighting. Could use `useLocation()` from `@reach/router` instead of threading the prop through every page.

- **Deep property drilling in `lab_member.js`**: `mdx.frontmatter` is accessed ~25 times without destructuring. A `const { githubURL, personalURL, ... } = mdx.frontmatter` would reduce repetition.

## Efficiency

- **Inconsistent `useMemo` usage**: `src/pages/media.js` wraps `.map()` transforms in `useMemo`, but `src/pages/index.js` and `src/pages/publications.js` compute them inline. Negligible for SSG but inconsistent.

- **Excess data in news `pageContext`**: `gatsby-node.js` passes full edge objects for previous/next news into `pageContext`, but the template only uses `frontmatter.title`, `frontmatter.date`, and `fields.slug`. Serializes more than needed.
