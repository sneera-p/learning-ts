#! /usr/bin/bash

if [ $# -lt 2 ];
then
    if [ $# -lt 1]; 
    then
        echo "no image version specified";
    else
        echo "no mode specified";
    fi
    exit 1;
fi

mode=$2
image=app$mode:$1;

#clean
yarn run clean;
docker rmi -f $image;

#----------------compile

echo -e "\n\n\033[36mCompling ...\033[39m\n\n";
if [ $mode == "dev" ];
then
    npx webpack -c .config/webpack/webpack.dev.js;
elif [ $mode == "prod" ];
then
    npx webpack -c .config/webpack/webpack.prod.js;
    npx pkg -t node16-linux -o bin/server dist/index.js;
else
    echo -e "Invalid mode\nexiting...";
    exit 1;
fi

#------------------------generate appdata
echo -e "\n\n\033[36mGenerating appdata...\033[39m\n\n";
if [ $mode == "dev" ];
then
    node scripts/appData.js;
    echo "appdata at dist/appdata.yaml"
elif [ $mode == "prod" ];
then
    node scripts/appData.js prod;
    echo "appdata at bin/appdata.yaml"
else
    echo -e "Invalid mode\nexiting...";
    exit 1;
fi

#------------------build container

echo -e "\n\n\033[36mBuilding ...\033[39m\n\n";
docker build -f .docker/$mode.dockerfile -t $image .;

#------------------run (only for devcontainers)

if [ $mode == "dev" ];
then
    echo -e "\n\n\033[36mRunning container ...\033[39m\n\n";
    docker run --name dev -p 127.0.0.1:3001:3000 --env-file .env.docker -d $image;

elif [ $mode == "prod" ];
then
    echo -e "\n\n\033[36mCreating tar ...\033[39m\n\n";
    docker save -o .docker/server-image.tar $image;
fi


exit 0;