#!/bin/bash
set -e

if [ "$1" == "develop" ]
then
  rm -rf public
  gatsby develop --host 0.0.0.0

elif [ "$1" == "build" ]
then
  rm -rf public
  gatsby build

elif [ "$1" == "stage" ]
then
  rm -rf public
  gatsby build
  gatsby serve --port 8000

else
  exec $@
fi
