import uuid from "uuid";
import * as dynamoDbLib from "./libs/dynamodb-lib";
import { success, failure } from "./libs/response-lib";

export async function main(event, context) {
  const data = JSON.parse(event.body);
  const params = {
    TableName: "users", //wtbs (want to buys)
    Item: {
      userId: event.requestContext.identity.cognitoIdentityId,
      firstName: data.firstName,
      lastName: data.lastName,
      college: data.college,
      email: data.email,
      balance: 0,
      requests: [],
      fulfilling: [],
      requestHistory: [],
      fulfillHistory: [],
      chats: [],
      icon: data.icon,
      createdAt: Date.now()

    }
  };

  try {
    await dynamoDbLib.call("put", params);
    return success(params.Item);
  } catch (e) {
    return failure({ status: false });
  }
}
