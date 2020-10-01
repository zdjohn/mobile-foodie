ENVFILE ?= .env.release
COMPOSE_RUN_NODE = docker-compose run --rm node
COMPOSE_UP_NODE = docker-compose up -d node
COMPOSE_UP_NODE_DEV = docker-compose up node_dev
COMPOSE_RUN_DOCKERIZE = docker-compose run --rm dockerize

testbuild: envset teardown deps unittest build clean

dev-watch: envset teardown deps debug

dev-start: envset teardown deps start

release: envset teardown deps build deploy clean


envset:
	cp -f $(ENVFILE) .env

deps:
	$(MAKE) envset
	docker-compose pull
	$(COMPOSE_RUN_NODE) npm install

unittest:
	$(COMPOSE_RUN_NODE) npm run test:cov

build:
	$(COMPOSE_RUN_NODE) npm run build

debug:
	$(COMPOSE_UP_NODE_DEV)

start:
	$(COMPOSE_UP_NODE)
	$(COMPOSE_RUN_DOCKERIZE) -wait tcp://node:3000/health/ping -timeout 60s

teardown:
	docker-compose down --remove-orphans

clean:
	$(COMPOSE_RUN_NODE) rm -fr node_modules dist coverage
	$(MAKE) teardown
	rm -f .env

deploy:
	#build docker image
	docker build -t mobile-foodie .
	# below would depending on the hosting infrstrucutre provider
	# i.e. push image to Azure Container Registry, then Deploy a container instance in Azure using the Azure CLI