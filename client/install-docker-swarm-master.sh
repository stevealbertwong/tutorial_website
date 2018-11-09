## REFERENCE:
## https://docs.docker.com/install/linux/docker-ce/ubuntu/#install-using-the-repository
## https://www.digitalocean.com/community/tutorials/how-to-install-and-use-docker-on-ubuntu-16-04


## 1. set up docker repo, The Docker installation package available in the official Ubuntu 16.04 repository may not be the latest version. To get this latest version, install Docker from the official Docker repository.

## Install packages to allow apt to use a repository over HTTPS
sudo apt-get update
sudo apt-get install -y apt-transport-https ca-certificates curl software-properties-common
## Add Docker’s official GPG key
curl -fsSL https://download.docker.com/linux/ubuntu/gpg | sudo apt-key add -
## Verify that you now have the key with the fingerprint 9DC8 5822 9FC7 DD38 854A E2D8 8D81 803C 0EBF CD88, by searching for the last 8 characters of the fingerprint.
sudo apt-key fingerprint 0EBFCD88

## set up the stable repository. You always need the stable repository, even if you want to install builds from the edge or test repositories as well.
sudo add-apt-repository \
   "deb [arch=amd64] https://download.docker.com/linux/ubuntu \
   $(lsb_release -cs) \
   stable"


## 2. install docker

sudo apt-get update
## Make sure you are about to install from the Docker repo instead of the default Ubuntu 16.04 repo
apt-cache policy docker-ce

## Install the latest version of Docker CE
sudo apt-get install -y docker-ce

## install specific version
# sudo apt-get install docker-ce=18.03.0~ce-0~ubuntu


## verify docker is running
# sudo systemctl status docker
# sudo docker run hello-world


## 3. no sudo

## avoid typing sudo whenever you run the docker command, add your username to the docker group
# sudo usermod -aG docker ${USER}

## To apply the new group membership, you can log out of the server and back in, or you can type the following
# su - ${USER}
## confirm
# id -nG


## 4 install docker compose 

sudo curl -L "https://github.com/docker/compose/releases/download/1.22.0/docker-compose-$(uname -s)-$(uname -m)"  -o /usr/local/bin/docker-compose
# sudo mv ./docker-compose /usr/local/bin/docker-compose
sudo chmod +x /usr/local/bin/docker-compose

# sudo docker swarm join --token SWMTKN-1-3sk5mvrd8ci1rjcul8hxrkvmeicbq6g6uy346mylkzn3e3lc00-10m1baaiz1fxvcv5wn7s9a1el 172.31.27.58:2377








sudo apt-get update -q
sudo apt-get install -y -q apt-transport-https ca-certificates curl software-properties-common
curl -fsSL https://download.docker.com/linux/ubuntu/gpg | sudo apt-key add -
sudo apt-key fingerprint 0EBFCD88
sudo add-apt-repository \
   "deb [arch=amd64] https://download.docker.com/linux/ubuntu \
   $(lsb_release -cs) \
   stable"
sudo apt-get update -q
apt-cache policy docker-ce
sudo apt-get install -y -q docker-ce
sudo curl -L "https://github.com/docker/compose/releases/download/1.22.0/docker-compose-$(uname -s)-$(uname -m)"  -o /usr/local/bin/docker-compose
sudo chmod +x /usr/local/bin/docker-compose
sudo apt-get update -q
sudo apt-get install -y -q apt-transport-https ca-certificates curl software-properties-common
curl -fsSL https://download.docker.com/linux/ubuntu/gpg | sudo apt-key add -
sudo apt-key fingerprint 0EBFCD88
sudo add-apt-repository \
   "deb [arch=amd64] https://download.docker.com/linux/ubuntu \
   $(lsb_release -cs) \
   stable"
sudo apt-get update -q
apt-cache policy docker-ce
sudo apt-get install -y -q docker-ce
sudo curl -L "https://github.com/docker/compose/releases/download/1.22.0/docker-compose-$(uname -s)-$(uname -m)"  -o /usr/local/bin/docker-compose
sudo chmod +x /usr/local/bin/docker-compose

