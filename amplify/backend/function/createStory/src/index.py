import boto3
import boto3.dynamodb
from botocore.client import Config
import logging
import uuid
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

  # Reading Event Body
  event_body = json.loads(event['body'])

  # Assigning UUID as ID for the Story
  id = "story-"+str(uuid.uuid4())

  # Store text content in s3 as a text file
  content = event_body['content']

  # File name is a combination of the Story ID and the title
  content_key = id + "-" +event_body['title'].strip().replace(" ", "-")+".txt"
  s3_bucket.put_object(Key=content_key, Body=content, ContentType='text/plain')
  print('Stored content in s3')

  stories_table.put_item(
    Item={
      'id': id,
      'title': event_body['title'],
      'content_url': content_key,
      'num_likes': 0
    }
  )
  print('Stored record in Dynamo DB')

  return {
    'statusCode': 200,
    'body': json.dumps('Story created successfully!')
  }