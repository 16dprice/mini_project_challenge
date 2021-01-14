docker run \
-it \
--rm \
-v /tmp/react-container \
-v ${PWD}:/tmp/react-container \
-p 3000:3000 \
react-app
