#!/usr/bin/env bash

# configure apt to install MongoDB
apt-key adv --keyserver hkp://keyserver.ubuntu.com:80 --recv 7F0CEB10
echo 'deb http://downloads-distro.mongodb.org/repo/ubuntu-upstart dist 10gen' | sudo tee /etc/apt/sources.list.d/mongodb.list

# install initial packages
apt-get update
apt-get install -y build-essential python-software-properties git mongodb-10gen

# install the latest version of node.js
add-apt-repository -y ppa:chris-lea/node.js
apt-get update
apt-get install -y nodejs

# install super helpful node packages
npm install -g bower supervisor grunt-cli