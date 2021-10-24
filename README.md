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

## Building locally the website
If you plan doing important modifications, it is useful to build the website locally.

1. Checkout on the branch `dev-src`.
2. Make sure you have nodejs installed.
3. Install the packages with `yarn install` .
4. Run the server with `yarn start`.
5. Follow the deployment steps when the modifications are completed.

A complete documentation will follow.
