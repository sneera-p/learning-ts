#! /usr/bin/bash

echo -e "\n\n\033[36mCleaning ...\033[39m\n\n";
docker rm -f dev;
rm -r server.log;

exit 0;