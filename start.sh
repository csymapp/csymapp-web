#!/bin/bash


killall csymapp-web.update.sh
./csymapp-web.update.sh &

npm install
node bin/app.js
