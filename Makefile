# Makefile for MERN Stack Project

CURRENT_DIR = $(shell pwd)
CLIENT_DIR = $(CURRENT_DIR)/client
SERVER_DIR = $(CURRENT_DIR)/server
AWS_INSTANCE_DIR = $(CURRENT_DIR)/aws-instance
REMOTE_HOST = your_remote_host
REMOTE_USER = ubuntu
PRIVATE_KEY =  $(CURRENT_DIR)/aws-instance/.ssh/operator
REMOTE_DIR = /path/to/remote/directory

.PHONY: all

# Docker commands
docker-build-client:
	cd $(CLIENT_DIR) && docker build -t your-client-image-name .

docker-build-server:
	cd $(SERVER_DIR) && docker build -t your-server-image-name .

# Deployment
deploy: docker-build-client docker-build-server
	cd $(AWS_INSTANCE_DIR) && ssh -i $(PRIVATE_KEY) -l $(REMOTE_USER) $(terraform output -raw 'instanceIPv4') && docker-compose up -d"

# Terraform commands
tf-init:
	cd $(AWS_INSTANCE_DIR) && terraform init

tf-plan:
	cd $(AWS_INSTANCE_DIR) && terraform plan

tf-apply:
	cd $(AWS_INSTANCE_DIR) && terraform apply

tf-destroy:
	cd $(AWS_INSTANCE_DIR) && terraform destroy

# Other targets (tests, clean, etc.) can be added here based on your requirements

.PHONY: docker-build-client docker-build-server deploy tf-init tf-plan tf-apply tf-destroy
