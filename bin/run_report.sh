#!/bin/bash
node_version=$(node -v);
if  [ ${node_version:1:1} -gt 6 ]; then
    npm run benchmark:report
fi