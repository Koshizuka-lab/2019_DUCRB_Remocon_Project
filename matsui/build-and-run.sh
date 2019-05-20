#!/bin/bash
dir=$(cd $(dirname $0) && pwd)
cd $dir/docker && docker-compose build
cd $dir/docker && docker-compose -f docker-compose.yaml up