import * as dynamoDbLib from "./libs/dynamodb-lib";
import { success, failure } from "./libs/response-lib";

export async function main(event, context) {
  const data = JSON.parse(event.body);
  //first call: remove from active WTBs table
  const params = {
    TableName: "betting",
    // 'Key' defines the partition key and sort key of the item to be removed
    // - 'userId': Identity Pool identity id of the authenticated user
    Key: {
      userId: data.otherUserId, //original card poster
      betId: event.pathParameters.id,
    }
  };
  //second call: modify balance
  const params2 = {
    TableName: "users",
    // 'Key' defines the partition key and sort key of the item to be updated
    // - 'userId': Identity Pool identity id of the authenticated user
    Key: {
      userId: event.requestContext.identity.cognitoIdentityId, //fulfiller
    },
    // 'UpdateExpression' defines the attributes to be updated
    // 'ExpressionAttributeValues' defines the value in the update expression
    UpdateExpression: "SET balance = balance + :val",
    ExpressionAttributeValues: {
      ":val": parseInt(data.balance) || 0,
    },
    // 'ReturnValues' specifies if and how to return the item's attributes,
    // where ALL_NEW returns all attributes of the item after the update; you
    // can inspect 'result' below to see how it works with different settings
    ReturnValues: "ALL_NEW"
  };

  const params3 = {
    TableName: "users",
    // 'Key' defines the partition key and sort key of the item to be updated
    // - 'userId': Identity Pool identity id of the authenticated user
    Key: {
      userId: data.otherUserId, //original card poster
    },
    // 'UpdateExpression' defines the attributes to be updated
    // 'ExpressionAttributeValues' defines the value in the update expression
    UpdateExpression: "SET balance = balance + :val",
    ExpressionAttributeValues: {
      ":val": (-1 * parseInt(data.balance)) || 0,
    },
    // 'ReturnValues' specifies if and how to return the item's attributes,
    // where ALL_NEW returns all attributes of the item after the update; you
    // can inspect 'result' below to see how it works with different settings
    ReturnValues: "ALL_NEW"
  };

  const params4 = {
    TableName: "betting",
    // 'Key' defines the partition key and sort key of the item to be updated
    // - 'userId': Identity Pool identity id of the authenticated user
    // - 'noteId': path parameter
    Key: {
      userId: data.otherUserId,
      betId: event.pathParameters.id
    },
    // 'UpdateExpression' defines the attributes to be updated
    // 'ExpressionAttributeValues' defines the value in the update expression
    UpdateExpression: "SET returnStatus = :returnStatus",
    ExpressionAttributeValues: {
      ":returnStatus": 2,
    },
    // 'ReturnValues' specifies if and how to return the item's attributes,
    // where ALL_NEW returns all attributes of the item after the update; you
    // can inspect 'result' below to see how it works with different settings
    ReturnValues: "ALL_NEW"
  };


  //third call: add request to requesters array of past requests
  //fourth call: add request to accepters array of past requests
  //fifth and sixth: add request to requestHistory table



  try {
    const result = await dynamoDbLib.call("delete", params);
    const result2 = await dynamoDbLib.call("update", params2);
    const results3 = await dynamoDbLib.call("update", params3);
    //const results4 = await dynamoDbLib.call("update", params4);
    return success(result);
  } catch (e) {
    return failure({ status: e });
  }
}
