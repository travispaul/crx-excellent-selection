#!/bin/bash
# run chrome with local file access (for testing)
/opt/google/chrome/google-chrome %U --allow-file-access-from-files "file:///`pwd`"
