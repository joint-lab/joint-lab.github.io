# Joint Lab Official Website
<!-- MarkdownTOC -->

- [Branches](#branches)
- [Development](#development)
	- [Building locally the website](#building-locally-the-website)
	- [Deployment](#deployment)
- [Helpful Tips for Deployment in more detail](#helpful-tips-for-deployment-in-more-detail)
- [1. As stated above, once you are satisfied with this, you can go back to the Github UI and make a Pull request from `dev-src` to `src` to apply the changes in production. It is best practice to make sure to build the website locally before doing this step, because otherwise you may potentially be merging broken code into the production branch. And that's it!](#1-as-stated-above-once-you-are-satisfied-with-this-you-can-go-back-to-the-github-ui-and-make-a-pull-request-from-dev-src-to-src-to-apply-the-changes-in-production-it-is-best-practice-to-make-sure-to-build-the-website-locally-before-doing-this-step-because-otherwise-you-may-potentially-be-merging-broken-code-into-the-production-branch-and-thats-it)
- [More tips](#more-tips)
- [Building locally the website](#building-locally-the-website-1)
- [More tips](#more-tips-1)
- [Content](#content)
	- [Media](#media)
	- [News](#news)
	- [People](#people)
		- [Possible fields for lab members](#possible-fields-for-lab-members)
	- [Publications](#publications)

<!-- /MarkdownTOC -->

- Tech: [GatsbyJs](https://www.gatsbyjs.com) with [TailwindCSS](http://tailwindcss.com).

## Branches

- `src`: The production source code. Pushes on this branch will trigger a production build.
- `prod-build`: The production build. DO NOT COMMIT ON THIS BRANCH, ONLY THE GITHUB ACTION CAN.
- `dev-src`: A development source code. Pushes on this branch will trigger a develop build on branch `dev-build`.
- `dev-build`: The development build. DO NOT COMMIT ON THIS BRANCH, ONLY THE GITHUB ACTION CAN.

## Development

### Building locally the website
If you plan doing important modifications, it is useful to build the website locally.

1. Checkout on the branch `dev-src`.
2. Make sure you have nodejs installed.
3. Install the packages with `yarn install` .
4. Run the server with `yarn start`.
5. Follow the deployment steps when the modifications are completed.

### Deployment

1. Clone the repository and start a branch based on the latest commit of `dev-src`. 
2. When you are ready to commit your changes, merge your branch into `dev-src`. It will start a github action that builds the website. 
3. Once the github action is completed, checkout on `dev-build`. Locally, run `python -m http.server` to start serving your website on your localhost port `8000` (by default).
4. If you are satisfied with the build, merge `dev-src` into `src` to apply the changes in production. A github action will update `prod-build`, which will be available at `joint-lab.github.io`.

## Helpful Tips for Deployment in more detail
1. Before adding any new code, checkout `dev-src` via `git checkout dev-src` in your local repository, and then be sure to pull down the latest changes.
1. To pull down the latest changes safely, run `git pull origin dev-src --rebase` 
1. If you had your own development branch before, you can run `git checkout your-branch` followed by `git merge dev-src` to get the recent changes into your branch, which will bring it up to date. 
1. Alternatively to the above, just run `git checkout -b your-new-branch` to just make a new branch off of `dev-src`. This is easy and fine to do.
1. After working on your branch and making a local commit, to push your local changes up to the remote repository, run `git push origin your-branch-name`
1. Now you should be able to visit the Github page and click on "Create a pull request" where you see your branch at the top.
1. When creating the pull request, make sure to select `dev-src` for the branch to merge into!! This is the option on the left and defaults to `src`, which is the production branch, so it is important to change it to `dev-src`.
1. After creating the pull request, if there are no conflicts shown, you can merge it into `dev-src`.
1. This will trigger a build in the `dev-build` branch. You don't have to do anything except wait. 
1. Next, to run the development server locally so you can view your changes, go back to your terminal and run `git checkout dev-build`. 
1. To pull down the new remote changes, run the following command: `git pull origin dev-build --rebase --allow-unrelated-histories`. WITHOUT THOSE FLAGS you will likely run into problems pulling the remote changes.
1. Now, you should be able to run `python3 -m http.server` or whatever version of python you want to use.
1. Then you can visit `http://localhost:8000/` in a browswer and should be viewing the latest version of the development website. 
<<<<<<< HEAD
1. As stated above, once you are satisfied with this, you can go back to the Github UI and make a Pull request from `dev-src` to `src` to apply the changes in production. It is best practice to make sure to build the website locally before doing this step, because otherwise you may potentially be merging broken code into the production branch. And that's it!
=======
1. As stated above, once you are satisfied with this, you can go back to the Github UI and make a Pull request from `dev-src` to `src` to apply the changes in production. It is best practice to make sure to build the website locally before doing this step, because otherwise you may potentially be merging broken code into the production branch. And That's it!

## More tips
1. It is useful to make running `git status` common practice so you can see what changes you have made, committed locally, etc.
1. Additionally, `git log` will show you the latest commits that you have pulled locally, which can help you understand if you are up to date or behind, as well as what your local commits are that you need to push.

## Building locally the website
If you plan doing important modifications, it is useful to build the website locally.
>>>>>>> dev-src

## More tips
1. It is useful to make running `git status` common practice so you can see what changes you have made, committed locally, etc.
1. Additionally, `git log` will show you the latest commits that you have pulled locally, which can help you understand if you are up to date or behind, as well as what your local commits are that you need to push.

## Content

### Media

The media data is located in a json file at [data/media/media.json](./data/media/media.json). A typical media entry contains a title, the year, the authors, the type and an url to the content. Optional fields are `youtubeId` and `imageURL`. 

```
// Media.json
[{
	"title": "", /* Required*/
	"year": "", // Required
	"authors": "", // Required
	"type": "", // Required. One of (news, communication, youtube, simplecast)
	"url": "", // Required

	"youtubeID": "", // Required if type=="youtube"
	"imageURL": "", // Optional

}]
```

### News

News are loaded as markdown files located at [data/news](./data/news). The header must contain the title and the date (`yyyy-mm-dd`). You can name your news any way you want. 
```mdx
// example_news.mdx
---
title: Virtual CNWW, and real new projects
date: 2021-01-21
---

Write the content here in mdx! Do not write the title again.
```
- Do not write the title in the markdown section. The script takes care of displaying the title for you.
- News are ordered by dates.

### People

Each lab member has a personal page. The data is stored in markdown files located at [data/people](./data/people).

```mdx
#
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
All the publications are located in [data/publications/publications.json](./data/publications/publications.json).

```
	// Article/slides
    {
        "title": "Bayesian inference of network structure from unreliable data",
        "authors": "J.-G. Young, G. T. Cantwell, M. E. J. Newman",
        "journal": "J. Complex Netw. 8, cnaa046",
        "year": 2021,
        "type": "article", // article, preprint, proceedings, other edited work, thesis
        "isOpenAccess": true, //Optional
        "preprintURL": "https://arxiv.org/abs/2008.03334",//Optional
        "journalURL": "https://doi.org/10.1093/comnet/cnaa046",//Optional
        "slideURL": "https://doi.org/10.1093/comnet/cnaa046",//Optional
        "software": "https://github.com/jg-you/noisy-networks-measurements",//Optional
        "flavor": "Editor's pick" //Optional
    },
    // Thesis
    {
        "title": "Inférence et réseaux complexes",
        "authors": "J.-G. Young",
        "year": 2018,
        "textURL": "https://corpus.ulaval.ca/jspui/handle/20.500.11794/31824",
        "type": "thesis",
        "degree": "Ph.D."
    },
```
- All the `authors` must be separated by commas. The script will parse the authors and match them with the lab members `alias`.
- **Common error**: If the error is `Cannot query field "allPublicationsJson" on type "Query"`, it is very likely that your json is invalid. Make sure that every last entries of key/values for all the entries of the array are comma-free:

```
[
	{"key": "value"} // Valid
	{"key": "value",} // Invalid
]
```
- You can choose to use a new `type`. The website will add your new type to the filter bar. Typical values are `article, preprint, proceedings, other edited work, thesis`.

