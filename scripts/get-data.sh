#!/bin/sh

PREFIX=$(date +'%b-%d')

echo $PREFIX

curl https://nswdac-covid-19-postcode-heatmap.azurewebsites.net/datafiles/population.json --output ./src/data/population.json

curl https://nswdac-covid-19-postcode-heatmap.azurewebsites.net/datafiles/nswpostcodes_final.json --output ./src/data/post-codes.json

curl https://nswdac-covid-19-postcode-heatmap.azurewebsites.net/datafiles/data_tests.json --output ./src/data/initial/tests-$PREFIX.json

curl https://nswdac-covid-19-postcode-heatmap.azurewebsites.net/datafiles/data_Cases2.json --output ./src/data/initial/cases-$PREFIX.json
