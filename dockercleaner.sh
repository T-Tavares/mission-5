docker stop web mongo
echo y | docker container prune
docker container rm web mongo

# ! Uncomment to clear volumes => WARNING Data will be lost

# echo y | docker volume prune
# docker volume rm zenergy-volume

echo y | docker network prune
docker network rm zenergy-network
