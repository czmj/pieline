#!/bin/bash
if [[ $1 = "live" ]] ; then
	TYPE=live
        echo "live mode"
	screen -s $TYPE bash -c "cd /srv/pieline.net/public/htdocs/pieline/;while :; do echo 'Hit CTRL+C to restart'; NODE_ENV=live node app.js;done" ;
	screen -ls
else
	TYPE=dev
	echo "Development mode"
	screen -s $TYPE bash -c "cd /srv/pieline.net/public/htdocs/pieline/;echo 'Hit CTRL+C to quit'; NODE_ENV=development node app.js;sleep 10" ;
fi
