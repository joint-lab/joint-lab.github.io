# Joint Lab Official Website

## Branches

- `src`: The production source code. Pushes on this branch will trigger a production build.
- `prod-build`: The production build. DO NOT COMMIT ON THIS BRANCH, ONLY THE GITHUB ACTION CAN.
- `dev-src`: A development source code. Pushes on this branch will trigger a develop build on branch `dev-build`.
- `dev-build`: The development build. DO NOT COMMIT ON THIS BRANCH, ONLY THE GITHUB ACTION CAN.

## Development

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
1. As stated above, once you are satisfied with this, you can go back to the Github UI and make a Pull request from `dev-src` to `src` to apply the changes in production. It is best practice to make sure to build the website locally before doing this step, because otherwise you may potentially be merging broken code into the production branch. And That's it!

## More tips
1. It is useful to make running `git status` common practice so you can see what changes you have made, committed locally, etc.
1. Additionally, `git log` will show you the latest commits that you have pulled locally, which can help you understand if you are up to date or behind, as well as what your local commits are that you need to push.

## Building locally the website
If you plan doing important modifications, it is useful to build the website locally.

1. Checkout on the branch `dev-src`.
2. Make sure you have nodejs installed.
3. Install the packages with `yarn install` .
4. Run the server with `yarn start`.
5. Follow the deployment steps when the modifications are completed.

A complete documentation will follow.



