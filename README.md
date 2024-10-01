Message Board Project

This Message Board project is a full-stack application built using modern web technologies, designed to allow users to send, update, and delete messages. The application is fully deployed and live using AWS services.
Table of Contents

    Project Overview
    Technologies Used
    Frontend Details
    Backend Details
    AWS Services and Permissions
    Monitoring and Logging
    Getting Started

Project Overview

The Message Board allows users to post messages that are displayed on the frontend and stored in the backend. The frontend, built with React, communicates with the backend through AWS API Gateway and Lambda functions. Messages are stored in a DynamoDB table, ensuring data persistence.

The project is fully integrated using AWS services and is deployed using a serverless architecture. This integration allows for seamless communication between the frontend and backend, ensuring real-time updates for the users.
Technologies Used
Frontend:

    React with modular components and routing
    CSS for styling
    JavaScript (type_module) for functionality
    AWS S3 for frontend hosting and deployment

Backend:

    AWS API Gateway for creating APIs
    AWS Lambda for serverless backend functions
    DynamoDB for message storage
    Serverless Framework (serverless.yml) for managing deployments

Other AWS Services:

    IAM for managing permissions
    CloudWatch for monitoring logs and performance

Frontend Details

    The frontend is built with React and organized using components to manage different functionalities, such as displaying messages, adding, editing, and deleting messages.
    Routing is handled using React Router to ensure smooth navigation between different views.
    CSS is used for styling, ensuring the application is visually appealing and responsive.
    The frontend is deployed via AWS S3, which serves the built React application.

Deploying Frontend:

    Use npm run build to compile the React application.
    Upload the build folder to the S3 bucket configured for the project.

Backend Details

    The backend is built using AWS Lambda functions, which are connected to API Gateway endpoints for handling requests from the frontend.
    DynamoDB is used as the database for storing messages, providing a scalable and low-latency data storage solution.
    The entire backend infrastructure is defined and managed via serverless.yml, streamlining deployment and configuration.

Serverless Deployment:

    The Serverless Framework is used to manage AWS resources and Lambda function deployments.
    The serverless.yml file defines the functions, DynamoDB table, and API Gateway settings.

AWS Services and Permissions

    IAM is used to manage permissions for the Lambda functions, API Gateway, S3 bucket, and DynamoDB access.
    Specific roles and policies are set up to ensure that each service has the necessary permissions without overexposing access.

Monitoring and Logging

    AWS CloudWatch is used to monitor Lambda functions and API Gateway requests.
    Logs provide valuable insights into the application's performance, errors, and overall behavior, aiding in troubleshooting and optimization.

Getting Started

To get started with the project locally:

    Clone the repository.
    Navigate to the frontend folder and run npm install to install dependencies.
    To start the frontend locally, use npm start.
    For the backend, ensure you have AWS CLI configured and the Serverless Framework installed.
    Use serverless deploy to deploy the backend functions and services.
