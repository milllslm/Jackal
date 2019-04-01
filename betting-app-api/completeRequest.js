import * as dynamoDbLib from "./libs/dynamodb-lib";
import { success, failure } from "./libs/response-lib";

export async function main(event, context) {
  const data = JSON.parse(event.body);
  //first call: remove from active WTBs table
  const params = {
    TableName: "betting",
    // 'Key' defines the partition key and sort key of the item to be removed
    // - 'userId': Identity Pool identity id of the authenticated user
    // - 'betId': path parameter
    Key: {
      userId: event.requestContext.identity.cognitoIdentityId,
      betId: data.betId
    }
  };
  //second call: modify balance


  //third call: add request to requesters array of past requests
  //fourth call: add request to accepters array of past requests
  //fifth and sixth: add request to requestHistory table



  try {
    const result = await dynamoDbLib.call("delete", params);
    return success({ status: true });
  } catch (e) {
    return failure({ status: e });
  }
}
