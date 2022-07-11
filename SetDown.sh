# stop the server
if [ -f ./pid.txt ]; then
    pid=`cat ./pid.txt`
    echo killing process $pid ...
    kill $pid
    rm -f ./pid.txt
fi
