# Setup the project to be ready to be published
npm install
npm run build

# Publish to npm
npm run login
npm run publish

# Remove the build traces
rm -rf ./dist
