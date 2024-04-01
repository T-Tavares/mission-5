
# WARNING!

# This script will wipe the s**** out of you docker (specifically for this project)
# Caution on running this script, it will remove all the containers, volumes, networks and images

# WARNING!

docker stop web mongo zenergy mission5-web

echo y | docker container prune
docker container rm zenergy mongo mission5-web -f

#  The next two lines will clear volumes => WARNING Data will be lost ( Comment / Uncomment as needed )
# echo y | docker volume prune
# docker volume rm zenergy-volume -f

echo y | docker network prune
docker network rm zenergy-network -f

echo y | docker builder prune

# echo y | docker image prune
docker rmi web zenergy mission5-web -f