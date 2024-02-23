# MERN Stack | ToDo - Web Application

## 🔆 🍃 Nodejs(Express.js) + mongoDB + mongoose + JWT + react.js + axios(API call)

This repository contains the code for deploying a MERN (MongoDB, Express.js, React, Node.js) stack web application on AWS using Terraform. The deployment includes setting up an EC2 instance, configuring CloudWatch, and deploying the client and server applications using Docker containers.

### MERN Stack Todo Application

This project showcases a MERN (MongoDB, Express.js, React, Node.js) stack web application that enables users to manage todo items. It encompasses both frontend and backend components to provide a complete user experience.

#### Terraform Infrastructure as Code

The Terraform portion of this project highlights the use of infrastructure as code to set up AWS resources for hosting the application:

- The `aws-instance` directory contains Terraform code that automates the provisioning of an EC2 instance on Amazon Web Services (AWS).
- The Terraform configuration defines variables, resources, and settings required for creating the EC2 instance and related resources.
- The infrastructure also includes AWS CloudWatch for monitoring and logging, ensuring observability of the application.
- By following infrastructure as code principles, you ensure reproducibility and consistency in your AWS environment setup.

#### Frontend

The frontend of this project demonstrates:

- An intuitive user interface built using React.js.
- User-friendly components for user authentication, login, and signup.
- Seamless integration with the backend API for fetching and displaying todo items.
- Efficient handling of user interactions such as adding and marking todos as completed.
- A responsive design that adapts to different screen sizes.

#### Backend

The backend of this project highlights:

- A robust RESTful API architecture using Node.js and Express.js.
- User authentication and authorization mechanisms for secure access to the application.
- Endpoints for user login and signup, ensuring secure user registration and login processes.
- Comprehensive CRUD operations for managing todo items, including creation, retrieval, updating, and deletion.
- Proper data storage and management using MongoDB .
- Adherence to security best practices to protect user data and prevent unauthorized access.
- Clear API documentation detailing available endpoints and their functionalities.
- A modular and maintainable code structure that enables future feature expansion.

### Prerequisites

Below noted things you need to install to run this project in your system

- Node.js
- NPM
- MongoDB
- AWS Account with access credentials and permissions to create EC2 instances and CloudWatch resources.
- Terraform installed on your local machine.
- Docker installed on your local machine.

## Project Structure

- `aws-instance/`: Terraform code to create an EC2 instance and CloudWatch resources.
- `client/`: Frontend React web application.
- `server/`: Backend Node.js Express server.

## Deployment Steps

### AWS EC2 Instance and CloudWatch Setup

1. Navigate to the `aws-instance` directory:
2. Update the `variables.tf` file with your desired configuration.
3. Initialize Terraform:

```sh
terraform init
```

4. Preview the changes:

```sh
terraform plan
```

5. Apply the changes to create the EC2 instance and CloudWatch resources :

```sh
terraform apply
```

At the end of the deployment, you will be provided with the IPv4 address of the created EC2 instance.

### Deploy Client and Server

To deploy the client and server components of the application, Docker Compose is used to orchestrate the deployment process. This allows both frontend and backend services to be started and managed together.

#### Steps to Deploy

1. Open a terminal or command prompt.

2. Navigate to the root directory of your project where the `docker-compose.yml` file is located.

3. Build the Docker images for the client and server:

```sh
docker-compose build
```

4.  Start the Docker containers:

```sh
docker-compose up -d
```

5. Access the client application in your browser: `http://54.86.138.226:3000`

6. Access the server API: `http://54.86.138.226:3500`

#### GitLab CI/CD Automation

To further streamline development and deployment, this project includes GitLab CI/CD automation:

- The `.gitlab-ci.yml` file defines a CI/CD pipeline with stages for building, testing, publishing, and deploying the application.
- The pipeline automatically builds Docker images for the client and server components.
- Server tests are executed to ensure the reliability of backend functionalities.
- The built images are published to a registry for versioning and distribution.
- On the `main` branch push event, the pipeline deploys the Docker images to the EC2 instance, ensuring seamless updates.

### Clean Up

1. Stop and remove the Docker containers:

```sh
docker-compose down
```

2. Navigate to the `aws-instance` directory:

```sh
cd aws-instance
```

3. Destroy the AWS resources created by Terraform:

```sh
terraform destroy
```

## Additional Notes

- Replace `<EC2-Public-IP>` with the actual public IP of your EC2 instance.
- Make sure to configure environment variables and sensitive information securely.
- Customize the client and server applications according to your project's needs.
- Regularly update and review the `.gitlab-ci.yml` file to match your pipeline requirements.
