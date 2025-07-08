#!/bin/bash
set -e

npm i

HOST=0.0.0.0 DANGEROUSLY_DISABLE_HOST_CHECK=true npm start
