#!/bin/bash
nohup anyproxy -p 8888 -w 8889 -r fgo.js -i  2>> out.log &
