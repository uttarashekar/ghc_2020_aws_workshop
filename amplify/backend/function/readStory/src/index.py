import boto3
import boto3.dynamodb
import decimal
from botocore.client import Config
import logging
import json

TABLE_STORIES = "Stories-dev"
S3_BUCKET_NAME = "<YOUR_S3_BUCKET_NAME>"

def handler(event, context):
  dynamodb_client = boto3.resource('dynamodb')
  stories_table = dynamodb_client.Table(TABLE_STORIES)
  event_body = json.loads(event['body'])
  id = event_body['id']

  s3_client = boto3.resource('s3', config=Config(signature_version='s3v4'))
  s3_bucket = s3_client.Bucket(S3_BUCKET_NAME)

  story = stories_table.get_item(Key={'id': id})

  print("Got story: {}".format(story))
  body = {
    "story": story['Item']
  }

  response = {
    "statusCode": 200,
    "body": json.dumps(body, default=decimal_default),
    "headers": {
        "Content-Type": "application/json",
        "Access-Control-Allow-Origin": "*",
        "Access-Control-Allow-Methods": "POST, GET, OPTIONS, PUT, DELETE",
        "Access-Control-Allow-Headers": "Origin, Content-Type, Accept, Authorization, X-Request-With"
    }
  }

  return response

# Json does not decode decimal values by default.
# We can remove this method by storing num_likes as string values
def decimal_default(obj):
  if isinstance(obj, decimal.Decimal):
    return float(obj)
  raise TypeError