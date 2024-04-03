
# WARNING!
# Caution on running this script, it will remove containers, volumes, networks and images
# WARNING!

# docker stop and remove all containers
docker stop web mongo 

# Remove anonymous volumes associated to mongo container
docker rm --volumes mongo 

docker container rm web mongo
docker network rm zenergy-network

# The next line will clear volumes => WARNING Data will be lost ( Comment / Uncomment as needed )
# After the connections and volumes are sorted, keep it commented
# docker volume rm zenergy-volume # delete later

# Remove image
docker rmi zenergy-web

# Restart Docker container 
docker compose up -d 