#!/bin/bash

npm install

npm run build

serverless deploy --stage dev mfa