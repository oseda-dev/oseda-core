#!/bin/bash

npm install

npm run build

# will need `npm install -g serve`

serve -s build
