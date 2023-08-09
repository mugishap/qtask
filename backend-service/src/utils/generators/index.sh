#!/bin/bash

if [ $# -lt 1 ]; then
  echo "Usage: $0 <module-name> [<folder-path>]"
  exit 1
fi

moduleName=$1
folderPath=${2:-"./src/modules"}  # Use "./src/modules" as default if the second parameter is not provided.

# Create the folder if it doesn't exist
mkdir -p $folderPath

# Change the working directory to the specified folder
cd $folderPath

# Generate the module inside the current folder
npx nest g module $moduleName

# Generate the controller without spec file inside the current folder
npx nest g controller $moduleName --no-spec

# Generate the service without spec file inside the current folder
npx nest g service $moduleName --no-spec
