#!/bin/bash

    # make Travis CI skip this build
if ! git commit -m "Travis CI update [ci skip]"; then
    err "failed to commit updates"
    return 1
fi

remote=https://$GITHUB_TOKEN@github.com/$TRAVIS_REPO_SLUG

# if [[ $TRAVIS_BRANCH != master ]]; then
#     msg "not pushing updates to branch $TRAVIS_BRANCH"
#     return 0
# fi
if ! git push --quiet --follow-tags "$remote" "$TRAVIS_BRANCH" > /dev/null 2>&1; then
    err "failed to push git changes"
    return 1
fi

function msg() {
    echo "travis-commit: $*"
}

function err() {
    msg "$*" 1>&2
}