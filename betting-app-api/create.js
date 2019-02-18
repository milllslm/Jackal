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

  try {
    await dynamoDbLib.call("put", params);
    return success(params.Item);
  } catch (e) {
    return failure({ status: false });
  }
}
