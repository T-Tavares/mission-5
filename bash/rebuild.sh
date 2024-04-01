# Stop, clean and remove app container
docker container stop web 
echo y | docker container prune
docker container rm web  -f
echo y | docker image rmi z-energy-web mission5-web -f 

# Rebuild
docker compose up -d --force-recreate --build