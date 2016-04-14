#!/bin/sh
npm run docs
cd doc

git init
git config user.name "CI Build"
git config user.email "rrdelaney@outlook.com"
git remote add deploy https://${GITHUB_TOKEN}@github.com/superfeed/superfeed.github.io.git
git add --all
git commit -m "CI Build"
git push --force --quiet -u deploy master
