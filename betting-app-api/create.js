import uuid from "uuid";
import * as dynamoDbLib from "./libs/dynamodb-lib";
import { success, failure } from "./libs/response-lib";

export async function main(event, context) {
  const data = JSON.parse(event.body);
  const newWTBId = uuid.v1();
  const params = {
    TableName: "betting", //wtbs (want to buys)
    Item: {
      userId: event.requestContext.identity.cognitoIdentityId,
      betId: newWTBId,
      title: data.title,
      description: data.description,
      category: data.category,
      rate: data.rate,
      rateQualifier: data.rateQualifier,
      maxDuration: data.maxDuration,
      likeThisLink: data.likeThisLink,
      expiration: data.expiration,
      createdAt: Date.now()

    }
  };
  const params2 = {
    TableName: "users",
    // 'Key' defines the partition key and sort key of the item to be updated
    // - 'userId': Identity Pool identity id of the authenticated user
    // - 'noteId': path parameter
    Key: {
      userId: event.requestContext.identity.cognitoIdentityId,
    },
    // 'UpdateExpression' defines the attributes to be updated
    // 'ExpressionAttributeValues' defines the value in the update expression
    UpdateExpression: "SET requests = list_append(requests, :newWTBId)",
    ExpressionAttributeValues: {
      ":newWTBId": [newWTBId],
    },
    // 'ReturnValues' specifies if and how to return the item's attributes,
    // where ALL_NEW returns all attributes of the item after the update; you
    // can inspect 'result' below to see how it works with different settings
    ReturnValues: "ALL_NEW"
  };

  try {
    await dynamoDbLib.call("put", params);
    await dynamoDbLib.call("update", params2);
    return success(params.Item);
  } catch (e) {
    return failure({ e });
  }
}
