#!/bin/bash
node_version=$(node -v);

function msg() {
    echo "travis-commit: $*"
}

function err() {
    msg "$*" 1>&2
}

if  [ ${node_version:1:1} -gt 6 ]; then
    err "Nothing to commit on node 6"
    exit 0
fi
git add .
# make Travis CI skip this build
if ! git commit -m "Travis CI update [ci skip]"; then
    err "failed to commit updates"
    exit 1
fi

remote=https://$GITHUB_TOKEN@github.com/$TRAVIS_REPO_SLUG

# if [[ $TRAVIS_BRANCH != master ]]; then
#     msg "not pushing updates to branch $TRAVIS_BRANCH"
#     return 0
# fi
if ! git push --quiet --follow-tags "$remote" "$TRAVIS_BRANCH" > /dev/null 2>&1; then
    err "failed to push git changes"
    exit 1
fi
