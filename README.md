Workshop Instructions:

Pre-requisites:
---
1. Make sure you have an AWS account
    1. Log in to aws.amazon.com
    2. Click on `Sign in to the Console` button on the top right
    3. Enter your Amazon username and password
    4. Click on `Sign In`

2. Make sure you have installed Python3 on your computer
    1. Go to [this link](https://www.python.org/downloads/)
    2. Download the latest version of Python3
    
3. Install npm. 
    1. Go to https://www.npmjs.com/get-npm
    2. Click on the `Download Node.js and npm` button
    3. Download the Latest Current version
---

Setup:
---

1. Open your terminal and navigate to the location that you want to create your project

```
cd ~
```

2. Create a directory and navigate into it
```
mkdir ghc2020_aws_workshop
cd ghc2020_aws_workshop
```

3. Download, install and configure the Amplify CLI:
```
npm install -g @aws-amplify/cli 
amplify configure
```

4. Create a new React project
```
npx create-react-app aws-community-news-bulletin
```

5. Navigate into the folder
```
cd aws-community-news-bulletin
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
```
Once this is done, call the following command on your CLI:
```
npm i aws-amplify
```
The `amplify init` command initializes the project, sets up deployment resources in the cloud, and makes your project ready for Amplify.

At this point your project set up is done. Let's dive into adding new components to our service!

---
### Set up storage for the service:
---

We first want to add a Dynamo DB table for our Community News Bulletin. Let's create a table called "Stories" which will store the different posts/news articles to be displayed on the website.

AWS Amplify allows us to easily create a Dynamo DB using CLI commands:

1. Let's start by creating a table 'Stories'
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

? What would you like to name this column: ID
? Please choose the data type: string
? Would you like to add another column? Yes
? What would you like to name this column: Title
? Please choose the data type: string
? Would you like to add another column? Yes
? What would you like to name this column: Content_url
? Please choose the data type: string
? Would you like to add another column? Yes
? What would you like to name this column: Num_likes
? Please choose the data type: number
? Would you like to add another column? No

Before you create the database, you must specify how items in your table are uniquely organized. You do this by specifying a primary key. The primary key uniquely identifies each item in the table so that no two items can have the same key. This can be an individual column, or a combination that includes a primary key and a sort key.

To learn more about primary keys, see:
https://docs.aws.amazon.com/amazondynamodb/latest/developerguide/HowItWorks.CoreComponents.html#HowItWorks.CoreComponents.PrimaryKey

? Please choose partition key for the table: ID
? Do you want to add a sort key to your table? No

You can optionally add global secondary indexes for this table. These are useful when you run queries defined in a different column than the primary key.
To learn more about indexes, see:
https://docs.aws.amazon.com/amazondynamodb/latest/developerguide/HowItWorks.CoreComponents.html#HowItWorks.CoreComponents.SecondaryIndexes

? Do you want to add global secondary indexes to your table? No
? Do you want to add a Lambda Trigger for your Table? No
```
Your Dynamo DB storage is ready!

---

2. Let's add an S3 bucket to store the news articles for your website:
    1. Navigate to the [AWS Console](https://console.aws.amazon.com/console/home)
    2. In the search bar under `Find Services`, type `S3`
    3. Click on S3. You will navigate into the Amazon S3 Console.
    4. Click on `Create bucket`
    5. In the `General Configuration` section:
        1. Type in a bucket name like `<username>_ghc_2020_news_bulletin`
        2. Replace `<username>` with a unique name. All S3 bucket names have to be unique globally
        3. Choose the region that is closest to where you are based. For example, I live in Seattle so I chose `US West (Oregon) us-west-2`
    6. Don't make any other changes and click on `Create Bucket` at the bottom of the page
    
Your S3 bucket for storing new stories is ready!

---
## Create ReadStories API:
---
The ReadStories API will allow you to read all available stories/news posts that have been saved in the backend.
1. Navigate to your terminal and type the following command:
```
amplify add api
```
Answer the following questions as follows:
```
? Please select from one of the below mentioned services: REST
? Provide a friendly name for your resource to be used as a label for this category in the project: likeOrComment
? Provide a path (e.g., /book/{isbn}): /addLikeOrComment
? Choose a Lambda source Create a new Lambda function
? Provide a friendly name for your resource to be used as a label for this category in the project: addLikeOrComment
? Provide the AWS Lambda function name: addLikeOrComment
? Choose the runtime that you want to use: Python
Only one template found - using Hello World by default.
? Do you want to access other resources in this project from your Lambda function? Yes
? Select the category (Press <space> to select, <a> to toggle all, <i> to invert selection)
❯◯ storage
```

2. Navigate to your IDE. You should now see the backend code for the readStories API in the `<project_name>/amplify/backend/function` directory
3. Your lambda handler code is present in the `src` folder within the `readStories` directory
4. Let's navigate to the `index.py` file under `src` and replace the boilerplate code with the following:
```

```