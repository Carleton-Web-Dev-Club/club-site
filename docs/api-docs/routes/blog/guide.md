# Blog

## GET

###  List of all blog posts
Returns a list (array of JSON objects) of all available blog posts.

Route: `/blog`

<!-- Sample Response -->
<details>
<summary>Sample Response</summary>
<pre>
[
    {
        "dateUploaded": "2020-06-25T20:17:19.126Z",
        "dateUpdated": "2020-06-25T20:17:19.126Z",
        "datePublished": "2020-06-25T20:17:19.126Z",
        "language": "fr",
        "tags": [
            "tester",
            " technology"
        ],
        "category": [
            "API"
        ],
        "published": true,
        "_id": "5ef506500775936fc6e6634e",
        "author": "Tester",
        "content": "This is a sample request to API",
        "title": "Testing Mongo"
    },
    {
        "dateUploaded": "2020-06-25T20:17:19.126Z",
        "dateUpdated": "2020-06-25T20:27:54.992Z",
        "datePublished": "",
        "language": "en",
        "tags": [
            "technology"
        ],
        "category": [
            "API"
        ],
        "published": false,
        "_id": "5ef507dc0775936fc6e6634f",
        "author": "Tester",
        "content": "I just modified this",
        "title": "Testing Mongo"
    }
]
</pre>
</details>

### Get by blog post ID
Returns a blog post given an ID

Route: `/blog/:blogId`

<!-- Sample Response -->
<details>
<summary>Sample Response</summary>
<pre>
{
    "dateUploaded": "2020-06-25T20:17:19.126Z",
    "dateUpdated": "2020-06-25T20:17:19.126Z",
    "datePublished": "2020-06-25T20:17:19.126Z",
    "language": "fr",
    "tags": [
        "tester",
        " technology"
    ],
    "category": [
        "API"
    ],
    "published": true,
    "_id": "5ef506500775936fc6e6634e",
    "author": "Tester",
    "content": "This is a sample request to API",
    "title": "Testing Mongo",
    "__v": 0
}
</pre>
</details>

### Get status by blog post ID
Returns a blog post status (published/unpublished)

Route: `/blog/:blogId/status`

<!-- Sample Response -->
<details>
<summary>Sample Response</summary>
<pre>
{
    "published": false,
    "datePublished": ""
}
</pre>
</details>

## POST

### Submit a blog post
Upload a new blog post to database

Route: `/blog`

Fields:
* author (Required)
* title (Required, String)
* content (Required, String)
* language (Default: **en**. Use ISO 639-1 Code language code format, String)
* tags (submit: Comma separated list, return: Array)
* category (submit: Comma separated list, return: Array)

<!-- Sample Request -->
<details>
<Summary>Sample Request</Summary>
<pre>
{
    "author": "Tester",
    "title": "Testing Mongo",
    "content": "This is a sample request to API",
    "language": "fr",
    "tags": "tester, technology",
    "category": "API"
}
</pre>
</details>

<!-- Sample Response -->
<details>
<Summary>Sample Response</Summary>
<pre>
{
    "dateUploaded": "2020-06-25T20:17:19.126Z",
    "dateUpdated": "2020-06-25T20:17:19.126Z",
    "datePublished": "2020-06-25T20:17:19.126Z",
    "language": "fr",
    "tags": [
        "tester",
        " technology"
    ],
    "category": [
        "API"
    ],
    "published": true,
    "_id": "5ef506500775936fc6e6634e",
    "author": "Tester",
    "content": "This is a sample request to API",
    "title": "Testing Mongo",
    "__v": 0
}
</pre>
</details>

## PATCH

### Modify by blog post ID
Modify a blog post

Route: `/blog/:blogId`

Use any of the fields in submit blog post

<!-- Sample Request -->
<details>
<Summary>Sample Request</Summary>
<pre>
{
    "author": "Tester",
    "title": "Testing Mongo",
    "content": "I just modified this",
    "language": "en",
    "tags": "technology",
    "category": "API"
}
</pre>
</details>

<!-- Sample Response -->
<details>
<Summary>Sample Response</Summary>
<pre>
{
    "message": "Updated the following items",
    "updatedFields": {
        "author": "Tester",
        "title": "Testing Mongo",
        "content": "I just modified this",
        "language": "en",
        "tags": [
            "technology"
        ],
        "category": [
            "API"
        ],
        "dateUpdated": "2020-06-25T20:25:52.094Z"
    }
}
</pre>
</details>


### Change status by blog post ID
Changes status (published/unpublished) of a blog post. No payload is required. It updates the DB to change status of posts.

Route: `/blog/:blogId/status`

<!-- Sample Response -->
<details>
<Summary>Sample Response</Summary>
<pre>
{
    "message": "Updated the following items",
    "updatedFields": {
        "published": false,
        "datePublished": "",
        "dateUpdated": "2020-06-25T20:27:54.992Z"
    }
}
</pre>
</details>

## DELETE

### Delete by blog post ID
Delete a blog post

Route: `/blog/:blogId`

<!-- Sample Response -->
<details>
<summary>Sample Response</summary>
<pre>
{
    "message": "Deleted 5ef506500775936fc6e6634e"
}
</pre>
</details>
