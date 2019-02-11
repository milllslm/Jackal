import uuid from "uuid";
import * as dynamoDbLib from "./libs/dynamodb-lib";
import { success, failure } from "./libs/response-lib";

export async function main(event, context) {
  const data = JSON.parse(event.body);
  const params = {
    TableName: "betting", //wtbs (want to buys)
    Item: {
      userId: event.requestContext.identity.cognitoIdentityId,
      betId: uuid.v1(),
      content: data.content, //item name/title
      attachment: data.attachment, //description
      createdAt: Date.now()
      //category
      
    }
  };

  try {
    await dynamoDbLib.call("put", params);
    return success(params.Item);
  } catch (e) {
    return failure({ status: false });
  }
}
