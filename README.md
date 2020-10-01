Workshop Instructions:

Pre-requisites:
---
1. Make sure you have an AWS account
    1. Log in to [AWS](aws.amazon.com)
    2. Click on `Sign in to the Console` button on the top right
    3. Enter your Amazon username and password
    4. Click on `Sign In`

2. If you don't have Python installed, make sure you have installed Python on your computer
    1. Go to [this link](https://www.python.org/downloads/)
    2. Download the latest version of Python

3. Install git
    1. Go to https://git-scm.com/downloads
    2. Download the latest version 
    
3. Install npm. 
    1. Go to https://www.npmjs.com/get-npm
    2. Click on the `Download Node.js and npm` button
    3. Download the `12.18.4 LTS` version (Recommended for most users)

4. Download, install and configure the Amplify CLI (may require admin (sudo) permissions):
   ```
   npm install -g @aws-amplify/cli 
   ```
---

Setup:
---

1. Open your terminal and navigate to the root (or a location where you want to create your project)
    ```
    cd ~
    ```

2. Create a directory for this workshop and navigate into it
    ```
    mkdir ghc2020_aws_workshop
    cd ghc2020_aws_workshop
    ```
3. Clone this git repository to get the boilerplate front-end code for the project and navigate into the project codebase:
    ```
    git clone https://github.com/uttarashekar/aws-workshop-community-news-bulletin.git
    cd aws-workshop-community-news-bulletin
    ```
    
4. Configure your AWS Amplify
    ```
    amplify configure
    ```
4. Follow the instructions as shown on the terminal and AWS Console. Make sure you create a new AWS Profile for this project:
    ```
    Sign in to your AWS administrator account:
    https://console.aws.amazon.com/
    Press Enter to continue
    
    Specify the AWS Region
    ? region:  us-west-2
    Specify the username of the new IAM user:
    ? user name:  amplify-<username>
    Complete the user creation using the AWS console
    https://console.aws.amazon.com/iam/home?region=us-west-2#/users$new?step=final&accessKey&userNames=amplify-gaurav&permissionType=policies&policies=arn:aws:iam::aws:policy%2FAdministratorAccess
    Press Enter to continue
    
    Enter the access key of the newly created user:
    ? accessKeyId:  ********************
    ? secretAccessKey:  ****************************************
    This would update/create the AWS Profile in your local machine
    ? Profile Name:  amplify-<username>
    
    Successfully set up the new user.
    ```

6. Initialize AWS Amplify. 
    ```
    amplify init
    ```
    Answer the questions as following:
    
    ```
    ? Enter a name for the project ghc2020NewsBulletin
    ? Enter a name for the environment dev
    ? Choose your default editor: None
    ? Choose the type of app that you're building javascript
    Please tell us about your project
    ? What javascript framework are you using react
    ? Source Directory Path:  src
    ? Distribution Directory Path: build
    ? Build Command:  npm run-script build
    ? Start Command: npm run-script start
    Using default provider  awscloudformation
    
    For more information on AWS Profiles, see:
    https://docs.aws.amazon.com/cli/latest/userguide/cli-configure-profiles.html
    
    ? Do you want to use an AWS profile? Yes
    ? Please choose the profile you want to use amplify-<username>
    
    ```
    The `amplify init` command initializes the project, sets up deployment resources in the cloud, and makes your project ready for Amplify.

At this point your project set up is done. Let's dive into adding new components to our service!

---

Set up storage for the service:
---

### Creating a Dynamo DB Table

We first want to add a Dynamo DB table for our Community News Bulletin. Let's create a table called "Stories" which will store the different posts/news articles to be displayed on the website.
    
AWS Amplify allows us to easily create a Dynamo DB using CLI commands:

Let's start by creating a table 'Stories':
    
    
```
amplify add storage
```

Answer the questions as follows. Column names are case sensitive so please use the same case in your responses:

```
? Please select from one of the below mentioned services: NoSQL Database

Welcome to the NoSQL DynamoDB database wizard
This wizard asks you a series of questions to help determine how to set up your NoSQL database table.

? Please provide a friendly name for your resource that will be used to label this category in the project: Stories
? Please provide table name: Stories

You can now add columns to the table.

? What would you like to name this column: id
? Please choose the data type: string
? Would you like to add another column? Yes
? What would you like to name this column: title
? Please choose the data type: string
? Would you like to add another column? Yes
? What would you like to name this column: content_url
? Please choose the data type: string
? Would you like to add another column? Yes
? What would you like to name this column: num_likes
? Please choose the data type: number
? Would you like to add another column? No

Before you create the database, you must specify how items in your table are uniquely organized. You do this by specifying a primary key. The primary key uniquely identifies each item in the table so that no two items can have the same key. This can be an individual column, or a combination that includes a primary key and a sort key.

To learn more about primary keys, see:
https://docs.aws.amazon.com/amazondynamodb/latest/developerguide/HowItWorks.CoreComponents.html#HowItWorks.CoreComponents.PrimaryKey

? Please choose partition key for the table: id
? Do you want to add a sort key to your table? No

You can optionally add global secondary indexes for this table. These are useful when you run queries defined in a different column than the primary key.
To learn more about indexes, see:
https://docs.aws.amazon.com/amazondynamodb/latest/developerguide/HowItWorks.CoreComponents.html#HowItWorks.CoreComponents.SecondaryIndexes

? Do you want to add global secondary indexes to your table? No
? Do you want to add a Lambda Trigger for your Table? No
```

Your Dynamo DB storage is ready!

### Creating an S3 bucket

Let's add an S3 bucket to store the news articles for your website:

1. Navigate to the [AWS Console](https://console.aws.amazon.com/console/home)
2. In the search bar under `Find Services`, type `S3`
3. Click on S3. You will navigate into the Amazon S3 Console.
4. Click on `Create bucket`
5. In the `General Configuration` section:
    1. Type in a bucket name like `<username>-ghc-2020-news-bulletin`
    2. Replace `<username>` with a unique name. All S3 bucket names have to be unique globally
    3. Choose the region that is closest to where you are based. For example, I live in Seattle so I chose `US West (Oregon) us-west-2`
6. Don't make any other changes and click on `Create Bucket` at the bottom of the page
    
Your S3 bucket for storing new stories is ready!

---
Creating APIs
---

### CreateStory API:

The CreateStory API will allow you to create a new article/story for your news bulletin. These will be stored in the two
storage resources we just created, which in turn will serve the readStories API that we will be creating next.
Instructions:

1. Navigate to your terminal and type the following command:
    ```
    amplify add api
    ```
    Answer the following questions as follows:

    ```
    ? Please select from one of the below mentioned services: REST
    ? Provide a friendly name for your resource to be used as a label for this category in the project: createStory
    ? Provide a path (e.g., /book/{isbn}): /story
    ? Choose a Lambda source Create a new Lambda function
    ? Provide a friendly name for your resource to be used as a label for this category in the project: createStory
    ? Provide the AWS Lambda function name: createStory
    ? Choose the runtime that you want to use: Python
    Only one template found - using Hello World by default.
    ? Do you want to access other resources in this project from your Lambda function? Yes
    ? Select the category (Press <space> to select, <a> to toggle all, <i> to invert selection)
    ❯◯ storage
    You can access the following resource attributes as environment variables from your Lambda function
    ENV
    REGION
    ? Do you want to invoke this function on a recurring schedule? No
    ? Do you want to configure Lambda layers for this function? No
    ? Do you want to edit the local lambda function now? No
    ? Restrict API access No
    ? Do you want to add another path? No
    Successfully added resource createStory locally.
    ```

2. Navigate to your IDE. You should now see the backend code for the readStories API in the `<project_name>/amplify/backend/function` directory
3. Your lambda handler code is present in the `src` folder within the `createStory` directory
4. Let's navigate to the `index.py` file under `src` and replace the boilerplate code with the following:
    ```
    import boto3
    import boto3.dynamodb
    from botocore.client import Config
    import logging
    import uuid
    import json
    
    TABLE_STORIES = "Stories-dev"
    S3_BUCKET_NAME = "<YOUR_S3_BUCKET_NAME>"
    
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
          'content_url': content_key,
          'num_likes': 0
        }
      )
      print('Stored record in Dynamo DB')
      return {
        'statusCode': 200,
        'body': json.dumps('Story created successfully!')
      }
    ```
5. In the above code, replace `<YOUR_S3_BUCKET_NAME>` with the name you gave to your S3 bucket
6. Now, you want to make sure that your AWS Lambda has the permissions to access your S3 bucket and Dynamo DB storage.
We can add permissions as follows:
    1. Navigate to the `createStory-cloudformation-template.json` file in the `createStory` directory
    2. Replace the `lambdaexecutionpolicy` section with the following:
     ```
    "lambdaexecutionpolicy": {
          "DependsOn": [
            "LambdaExecutionRole"
          ],
          "Type": "AWS::IAM::Policy",
          "Properties": {
            "PolicyName": "lambda-execution-policy",
            "Roles": [
              {
                "Ref": "LambdaExecutionRole"
              }
            ],
            "PolicyDocument": {
              "Version": "2012-10-17",
              "Statement": [
                {
                  "Sid": "ReadWriteTable",
                  "Effect": "Allow",
                  "Action": [
                    "dynamodb:BatchGetItem",
                    "dynamodb:GetItem",
                    "dynamodb:Query",
                    "dynamodb:Scan",
                    "dynamodb:BatchWriteItem",
                    "dynamodb:PutItem",
                    "dynamodb:UpdateItem"
                  ],
                  "Resource": "arn:aws:dynamodb:*:*:table/Stories-dev"
                },
                {
                  "Sid": "s3Access",
                  "Action": [
                    "s3:*"
                  ],
                  "Effect": "Allow",
                  "Resource": [
                    "arn:aws:s3:::<YOUR_S3_BUCKET_NAME>",
                    "arn:aws:s3:::<YOUR_S3_BUCKET_NAME>/*"
                  ]
                },
                {
                  "Effect": "Allow",
                  "Action": [
                    "logs:CreateLogGroup",
                    "logs:CreateLogStream",
                    "logs:PutLogEvents"
                  ],
                  "Resource": {
                    "Fn::Sub": [
                      "arn:aws:logs:${region}:${account}:log-group:/aws/lambda/${lambda}:log-stream:*",
                      {
                        "region": {
                          "Ref": "AWS::Region"
                        },
                        "account": {
                          "Ref": "AWS::AccountId"
                        },
                        "lambda": {
                          "Ref": "LambdaFunction"
                        }
                      }
                    ]
                  }
                }
              ]
            }
          }
        }
    ```
7. In the above code, replace the `YOUR_S3_BUCKET_NAME` in the S3 Policy with name you gave your S3 bucket.
8. Great, your createStory API is ready! We'll test this out on AWS Console soon!

---
### ReadStories API:

The ReadStories API will allow you to read all available stories/news posts that have been saved in the backend.
1. Navigate to your terminal and type the following command:
    ```
    amplify add api
    ```
    Answer the following questions as follows:
    ```
    ? Please select from one of the below mentioned services: REST
    ? Provide a friendly name for your resource to be used as a label for this category in the project: readStories
    ? Provide a path (e.g., /book/{isbn}): /stories
    ? Choose a Lambda source Create a new Lambda function
    ? Provide a friendly name for your resource to be used as a label for this category in the project: readStories
    ? Provide the AWS Lambda function name: readStories
    ? Choose the runtime that you want to use: Python
    Only one template found - using Hello World by default.
    ? Do you want to access other resources in this project from your Lambda function? Yes
    ? Select the category (Press <space> to select, <a> to toggle all, <i> to invert selection)
    ❯◯ storage
    You can access the following resource attributes as environment variables from your Lambda function
    ENV
    REGION
    ? Do you want to invoke this function on a recurring schedule? No
    ? Do you want to configure Lambda layers for this function? No
    ? Do you want to edit the local lambda function now? No
    ? Restrict API access No
    ? Do you want to add another path? No
    Successfully added resource readStories locally.
    ```

2. Navigate to your IDE. You should now see the backend code for the readStories API in the `<project_name>/amplify/backend/function` directory
3. Your lambda handler code is present in the `src` folder within the `readStories` directory
4. Let's navigate to the `index.py` file under `src` and replace the boilerplate code with the following:
    ```
    import boto3
    import boto3.dynamodb
    import decimal
    from botocore.client import Config
    import logging
    import json
    
    TABLE_STORIES = "Stories-dev"
    S3_BUCKET_NAME = "<YOUR_S3_BUCKET_NAME>"
    
    def handler(event, context):
      logging.info('Creating Dynamo DB client')
      print("Received event: {}".format(event))
      dynamodb_client = boto3.resource('dynamodb')
      stories_table = dynamodb_client.Table(TABLE_STORIES)
    
      s3_client = boto3.resource('s3', config=Config(signature_version='s3v4'))
      s3_bucket = s3_client.Bucket(S3_BUCKET_NAME)
    
      stories = stories_table.scan()
    
      for story in stories['Items']:
          print("story: {}".format(story))
          txt_content = s3_client.Object(S3_BUCKET_NAME, story['content_url']).get()['Body'].read().decode('utf-8').splitlines()
          print("content: {}".format(txt_content))
          story['content'] = txt_content
          print("story with content: {}".format(story))
    
      body = {
        "stories": stories['Items']
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
    ```
5. In the above code, replace `<YOUR_S3_BUCKET_NAME>` with the name you gave to your S3 bucket
5. Now, you want to make sure that your AWS Lambda has the permissions to access your S3 bucket and Dynamo DB storage. We can add permissions as follows:
    1. Navigate to the `readStories-cloudformation-template.json` file in the `readStories` directory
    2. Replace the `lambdaexecutionpolicy` section with the following:
    ```
   "lambdaexecutionpolicy": {
         "DependsOn": [
           "LambdaExecutionRole"
         ],
         "Type": "AWS::IAM::Policy",
         "Properties": {
           "PolicyName": "lambda-execution-policy",
           "Roles": [
             {
               "Ref": "LambdaExecutionRole"
             }
           ],
           "PolicyDocument": {
             "Version": "2012-10-17",
             "Statement": [
               {
                 "Sid": "ReadWriteTable",
                 "Effect": "Allow",
                 "Action": [
                   "dynamodb:BatchGetItem",
                   "dynamodb:GetItem",
                   "dynamodb:Query",
                   "dynamodb:Scan",
                   "dynamodb:BatchWriteItem",
                   "dynamodb:PutItem",
                   "dynamodb:UpdateItem"
                 ],
                 "Resource": "arn:aws:dynamodb:*:*:table/Stories-dev"
               },
               {
                 "Sid": "s3Access",
                 "Action": [
                   "s3:*"
                 ],
                 "Effect": "Allow",
                 "Resource": [
                   "arn:aws:s3:::<YOUR_S3_BUCKET_NAME>",
                   "arn:aws:s3:::<YOUR_S3_BUCKET_NAME>/*"
                 ]
               },
               {
                 "Effect": "Allow",
                 "Action": [
                   "logs:CreateLogGroup",
                   "logs:CreateLogStream",
                   "logs:PutLogEvents"
                 ],
                 "Resource": {
                   "Fn::Sub": [
                     "arn:aws:logs:${region}:${account}:log-group:/aws/lambda/${lambda}:log-stream:*",
                     {
                       "region": {
                         "Ref": "AWS::Region"
                       },
                       "account": {
                         "Ref": "AWS::AccountId"
                       },
                       "lambda": {
                         "Ref": "LambdaFunction"
                       }
                     }
                   ]
                 }
               }
             ]
           }
         }
       }
   ```
6. In the above code, replace the `<YOUR_S3_BUCKET_NAME>` in the S3 Policy with name you gave your S3 bucket.
6. Go to your CLI and type:
    ```
    amplify push
    ```
    This command will prompt you for confirmation. Type Yes and push the created resources to your AWS account.
7. Wait until the command succeeds.
8. Great! Your code for the readStories API is now ready!

---
Test your Create Story API changes on AWS Console: 

1. Navigate to your AWS console and to API Gateway. Make sure you are in the same region that you chose to create your AWS resources. You can change your region by clicking on the region in the top right corner and clicking on a different region from the dropdown.
2. You should be able to see your `createStory` API and `readStories` API here.
3. Click on the `createStory` API
4. Click on `ANY` under `/story`
5. Click on the `TEST` button on the right panel
6. Click on the dropdown under `METHOD` and select `POST`
7. In the Request Body section, paste the following:
    ```
    {
        "title": "Hello World!",
        "content": "A Hello, World! program generally is a computer program that outputs or displays the message Hello, World!"
    }
    ```
8. On the panel on the right, you should be able to see a 200OK response for your request with a message `"Story created successfully!"`

Test your Read Stories API changes on AWS Console:
1. Navigate to your AWS console and to API Gateway. Make sure you are in the same region that you chose to create your AWS resources. You can change your region by clicking on the region in the top right corner and clicking on a different region from the dropdown.
2. You should be able to see your `createStory` API and `readStories` API here.
3. Click on the `readStories` API
4. Click on `ANY` under `/story`
5. Click on the `TEST` button on the right panel
6. Click on the dropdown under `METHOD` and select `POST`
7. In the Request Body section, paste the following:
    ```
    {}
    ```
8. On the panel on the right, you should be able to see list of all the stories that you have created along with their title and content.
---
Let's look at the results on the Front-end!
---
Okay, now you're all set with the backend code! Let's dive into front-end!

Instructions to do this are as follows:

1. Go to your terminal and run the following commands:
    ```
    npm install
    ```
    This command will install the necessary modules required to build your front-end website
    
2. Run your website on local host by calling the following command:
    ```
    npm run-script build
    
    npm start 
    
    npm run dev
    ```
3. Go to http://localhost:8080/
4. Scroll to the bottom of the page and Create a new story
5. Click Submit
6. Refresh the page
7. See your story show up!

Delete your AWS resources
---
To ensure that you do not get charged for the resources created during this workshop, let's go ahead and delete the resources that we have created.
1. Go to your AWS Console and type `Cloudformation` in your search box
2. Click on your stack that starts with `amplify-ghc2020newsbulletin-dev` (the one that is NOT marked as `NESTED. The description`)
3. Click on the `Delete` button. This will delete all the resources that you created for this project. 
4. Feel free to not delete it if you want to experiment with the codebase some more.

Do It Yourself!
---
We hope you enjoyed participating in this workshop! 

Here are some tasks that you can do in your own time:
1. Add the ReadStory API
    1. As shown above, you can create the read story API and handle the code within the lambda
    2. In the front-end, the SingleSection component will allow you to read a story directly from the ReadStory API instead of being passed over from the Home page
    
2. Add a LikeOrComment API
    1. You can add components to the front-end like a Like button or a Comments section
    2. You can also add a LikeOrComment API to allow for users to add a Like or a Comment to a story

3. Add a Local Businesses table
    1. Similar to the Stories table, you can create a separate Local Businesses table to manage the local businesses
    2. Currently on the home page, the local businesses are hard-coded on the front-end. If you create the Local Businesses table, you can then add a createLocalBusinesses as well as readLocalBusinesses API to manage the local businesses on the page.
4. Add auth to the `CreateStory` form
    1. The CreateStory API is currently on the home page, allowing for any user to add a new story
    2. You can move the CreateStoryForm to a different page which is backed by authentication.
    3. Search for Amplify APIs with authentication which allows for only users with the correct permissions to log in and access some pages.
    
Contact Us
---
Feel free to reach out to us on LinkedIn if you have any questions:
1. [Uttara Shekar's LinkedIn](https://www.linkedin.com/in/uttara-shekar-0aa20645/)
2. [Melonia Mendonca's LinkedIn](https://www.linkedin.com/in/melonia-mendonca-b9b17b33/)


Thank You!
---
* To Grace Hopper Conference for giving us the opportunity to present this workshop
* To the attendees of our workshop for showing your support
* [HTML5 Up](https://html5up.net/) for graciously providing free UI themes for us to use for this workshop.
* [Unsplash](https://unsplash.com/photos/fqPzCNyVVhA) for providing a free image of Seattle that we could use for this workshop.