import boto3
import boto3.dynamodb
from botocore.client import Config
import logging
import uuid
import json

TABLE_STORIES = "Stories-dev"
S3_BUCKET_NAME = "ghc2020-test1"

def handler(event, context):
  logging.info('Creating Dynamo DB client')
  print("Received event: {}".format(event))
  dynamodb_client = boto3.resource('dynamodb')
  stories_table = dynamodb_client.Table(TABLE_STORIES)

  s3_client = boto3.resource('s3', config=Config(signature_version='s3v4'))
  s3_bucket = s3_client.Bucket(S3_BUCKET_NAME)

  event_body = json.loads(event['body'])


  id = "story-"+str(uuid.uuid4())

  # store text content in s3
  content = event_body['content']
  content_key = event_body['title'].strip().replace(" ", "-")+".txt"
  s3_bucket.put_object(Key=content_key, Body=content, ContentType='text/plain')
  print('Stored content in s3')

  stories_table.put_item(
    Item={
      'id': id,
      'title': event_body['title'],
      's3Url': content_key,
      'number_of_likes': 0
    }
  )
  print('Stored record in Dynamo DB')
  return True
