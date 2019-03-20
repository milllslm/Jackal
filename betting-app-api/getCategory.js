import * as dynamoDbLib from "./libs/dynamodb-lib";
import { success, failure } from "./libs/response-lib";

export async function main(event, context) {
  const params = {
    TableName: "betting",
    // 'Key' defines the partition key and sort key of the item to be retrieved
    // - 'userId': Identity Pool identity id of the authenticated user
    // - 'noteId': path parameter
    IndexName: "CategoryIndex",
    KeyConditionExpression: "category = :category",
    ExpressionAttributeValues: {
      ":category": event.pathParameters.category
    }
  };

  try {
    const result = await dynamoDbLib.call("query", params);
    return success(result.Items);

  } catch (e) {
    return failure({ status: e });
  }
}
