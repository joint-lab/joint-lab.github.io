# Joint Lab Official Website

- Tech: [GatsbyJs](https://www.gatsbyjs.com) (v5) with [TailwindCSS](http://tailwindcss.com) (v3).
- Requires Node.js 18+ (24 LTS recommended — see `.nvmrc`).

## Branches

- `src`: Production source code. Pushes here trigger a build and deploy to GitHub Pages.
- `dev-src`: Development source code. Pushes here trigger a dev build and deploy.

## Development

### Building locally
1. Make sure you have Node.js 18+ installed (`nvm use` if you use nvm).
2. Install packages: `npm install`
3. Run the dev server: `npm start`

### Deployment
1. Create a branch off `src` and make your changes.
2. Open a PR targeting `src`. Build the site locally (`npm run build`) to verify before merging.
3. Merging into `src` triggers a GitHub Action that builds and deploys directly to GitHub Pages.

### Step by step
1. Checkout `src` and pull the latest: `git checkout src && git pull origin src --rebase`
1. Create a new branch: `git checkout -b your-branch-name`
1. Make your changes, then stage and commit: `git add <files> && git commit -m "your message"`
1. Push your branch: `git push origin your-branch-name`
1. On GitHub, click "Create a pull request" and make sure the base branch is `src`.
1. If there are no conflicts, merge the PR. This triggers an automatic build and deploy.
1. Wait a few minutes, then check [joint-lab.github.io](https://joint-lab.github.io) to verify your changes.

### Tips
1. Run `git status` often to see what you've changed, staged, and committed.
1. Run `git log` to see recent commits and check if you're up to date with the remote.
1. Always build locally (`npm run build`) before merging to catch errors early.

## Content

### Media

The media data is located in a json file at [src/data/media/media.json](./src/data/media/media.json). A typical media entry contains a title, the year, the authors, the type and an url to the content. Optional fields are `youtubeId` and `imageURL`.

```json
[{
	"title": "",
	"year": "",
	"authors": "",
	"type": "",
	"url": "",

	"youtubeID": "",
	"imageURL": ""
}]
```

### News

News are loaded as markdown files located at [src/data/news](./src/data/news). The header must contain the title and the date (`yyyy-mm-dd`). You can name your news any way you want.
```mdx
---
title: Virtual CNWW, and real new projects
date: 2021-01-21
---

Write the content here in mdx! Do not write the title again.
```
- Do not write the title in the markdown section. The script takes care of displaying the title for you.
- News are ordered by dates.

### People

Each lab member has a personal page. The data is stored in markdown files located at [src/data/people](./src/data/people).

```mdx
---
firstName: John
lastName: Smith
group: alumni
lab: ['LSD']
role: M.Sc. student (Complex Systems & Data Science)
nextRole: Data scientist at Thermo Fisher Scientific
imageURL: ../../images/lab_members/connor.jpg
personalURL: https://www.connorklopfer.com/
twitterURL: https://mobile.twitter.com/connorklopfer
alias: C. Klopfer
---

# Markdown will work

# Some custom mdx
<EducationList>
	<EducationItem advisor="Lauren Hébert-Dufresne; Jean-Gabriel Young"
					title="TBD"
					degree="Ph.D in Complex Systems and Data Science"
					years="2020 - 2024 (estimated)"
					university="University of Vermont"/>
</EducationList>

<ScholarshipList>
	<ScholarshipItem
					title="TBD"
					years="2020 - 2024 (estimated)"
					amount="1"
					donor="me" />
</ScholarshipList>
```

#### Possible fields for lab members
- `group`:  `alumni` or anything else (some use `leadership`, `PhD`, `MsC`).
- `lab`: A list with possible items `LSD` and `CDL`
- `role`: A string value describing your current role
- `nextRole`: For alumni only, a string value describing your next role
- `imageURL`: Path to your image
- `alias`: The author name for finding to match your publications.

- `personalURL`: Personal website url (optional)
- `twitterURL`: Twitter url (optional)
- `githubURL`: Github url (optional)
- `scholarURL`: Google scholar url (optional)
- `email`: Email (optional)

**The field names are case sensitive.**

### Publications
All the publications are located in [src/data/publications/publications.json](./src/data/publications/publications.json).

```json
[
    {
        "title": "Bayesian inference of network structure from unreliable data",
        "authors": "J.-G. Young, G. T. Cantwell, M. E. J. Newman",
        "journal": "J. Complex Netw. 8, cnaa046",
        "year": 2021,
        "type": "article",
        "isOpenAccess": true,
        "preprintURL": "https://arxiv.org/abs/2008.03334",
        "journalURL": "https://doi.org/10.1093/comnet/cnaa046",
        "slideURL": "https://doi.org/10.1093/comnet/cnaa046",
        "software": "https://github.com/jg-you/noisy-networks-measurements",
        "flavor": "Editor's pick"
    },
    {
        "title": "Inférence et réseaux complexes",
        "authors": "J.-G. Young",
        "year": 2018,
        "textURL": "https://corpus.ulaval.ca/jspui/handle/20.500.11794/31824",
        "type": "thesis",
        "degree": "Ph.D."
    }
]
```
- All the `authors` must be separated by commas. The script will parse the authors and match them with the lab members `alias`.
- **Common error**: If the error is `Cannot query field "allPublicationsJson" on type "Query"`, it is very likely that your json is invalid. Make sure that every last entries of key/values for all the entries of the array are comma-free.
- You can choose to use a new `type`. The website will add your new type to the filter bar. Typical values are `article, preprint, proceedings, other edited work, thesis`.
