#! /bin/bash
GIT_REV="$(git rev-parse HEAD)"
S3_PATH="s3://elasticbeanstalk-us-east-1-252420778140/$GIT_REV.zip"
EB_VERSION="$(git rev-parse --short HEAD)"
CF_PATH="s3://00-superfeed-static"

npm run build
cd target

aws s3 sync static $CF_PATH
rm -rf static

zip -r app.zip * .ebextensions/*
aws s3 cp app.zip $S3_PATH

aws elasticbeanstalk create-application-version --application-name superfeed-front --version-label $EB_VERSION --source-bundle S3Bucket="elasticbeanstalk-us-east-1-252420778140",S3Key="$GIT_REV.zip"
aws elasticbeanstalk update-environment --application-name superfeed-front --environment-name superfeedFront-prod --version-label $EB_VERSION
