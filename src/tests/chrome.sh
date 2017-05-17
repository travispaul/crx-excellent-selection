#!/bin/bash

# run chrome with local file access (for testing)

which google-chrome
if [ $? -eq 0 ]; then
  google-chrome %U --allow-file-access-from-files "file:///`pwd`"
else
 /Applications/Google\ Chrome.app/Contents/MacOS/Google\ Chrome %U --allow-file-access-from-files "file:///`pwd`"
fi
