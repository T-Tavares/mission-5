# Stop, clean and remove app container
docker stop web 
echo y | docker container prune
docker container rm web  -f
echo y | docker image rmi z-energy-web -f 

# Rebuild
# docker compose up -d