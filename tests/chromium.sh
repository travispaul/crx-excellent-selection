#!/bin/bash
# run chromium with local file access (for testing)
/usr/bin/chromium %U --allow-file-access-from-files "file:///`pwd`"
