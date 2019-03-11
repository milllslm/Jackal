# Jackal Serverless Backend

The backend of our web application, implemented using serverless integrated
with AWS (Cognito, Amplify, S3, API Gateway). This backend is currently used to
post WTB (Want to Borrow) requests.

# Key Functionality
Functions for creating, retrieving, listing, and deleting WTB requests, which
are all stored on a DynamoDB table.
See serverless.yml for a full list of public functions and their parameters.

#Testing
Local unit tests are included in the implementation, in the mocks folder. These
can be used in conjunction with the command line and serverless to manually run
unit tests on the backend without needing front end connection.
