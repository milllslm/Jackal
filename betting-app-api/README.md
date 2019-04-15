# Jackal Serverless Backend

The backend of our web application, implemented using serverless integrated
with AWS (Cognito, Amplify, S3, API Gateway). This backend is currently used to
post WTB (Want to Borrow) requests, manage user information, and to facilitate
transactions between users.

# Key Functionality
Functions for creating, retrieving, listing, and deleting WTB requests, which
are all stored on a DynamoDB table.
See serverless.yml for a full list of public functions and their parameters.

#Testing
Local unit tests are included in the implementation, in the mocks folder. These
can be used in conjunction with the command line and serverless to manually run
unit tests on the backend without needing front end connection.

Tests:
Below are a handful of helpful serverless tests you can use to test that the
back end is working/you have successfully connected the AWS components to the
backend code/that your latest changes haven't broken everything.

The below commands assume that you have a test user set up, and that you have
created the AWS resources (user pool, identity pool, api gateway path, etc.)

Posting a sample WTB from the cmd line:
npx aws-api-gateway-cli-test --username admin@example.com --password Passw0rd! --user-pool-id YOUR_COGNITO_USER_POOL_ID --app-client-id YOUR_COGNITO_APP_CLIENT_ID --cognito-region YOUR_COGNITO_REGION --identity-pool-id YOUR_IDENTITY_POOL_ID --invoke-url YOUR_API_GATEWAY_URL --api-gateway-region YOUR_API_GATEWAY_REGION --path-template /bets --method POST --body "{\"content\":\"hello world\",\"attachment\":\"hello.jpg\"}"
