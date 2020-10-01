import boto3
import boto3.dynamodb
import decimal
from botocore.client import Config
import logging
import json

TABLE_STORIES = "Stories-dev"
S3_BUCKET_NAME = "<YOUR_S3_BUCKET_NAME>"

def handler(event, context):
  # Initializing Dynamo DB client
  dynamodb_client = boto3.resource('dynamodb')
  stories_table = dynamodb_client.Table(TABLE_STORIES)

  # Initializing S3 Client
  s3_client = boto3.resource('s3', config=Config(signature_version='s3v4'))
  s3_bucket = s3_client.Bucket(S3_BUCKET_NAME)

  # Scanning the Stories table
  stories = stories_table.scan()

  # For every story, we will read the text content from S3
  # And add it to the 'content' attribute of the 'Story'
  # Knowledge of Python dictionaries will be required to understand the following code
  for story in stories['Items']:
      print("story: {}".format(story))
      txt_content = s3_client.Object(S3_BUCKET_NAME, story['content_url']).get()['Body'].read().decode('utf-8')
      print("content: {}".format(txt_content))
      story['content'] = txt_content
      print("story with content: {}".format(story))

  body = {
    "stories": stories['Items']
  }

  # Returning stories in a response block
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