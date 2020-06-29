# Events

## GET

###  List of all events
Returns a list (array of JSON objects) of all scheduled events.

Route: `/events`

<!-- Sample Response -->
<details>
<summary>Sample Response</summary>
<pre>
[
    {
        "_id": "5efa39d5afe1f91b27ecb607",
        "organizer": "Tester",
        "title": "NODE.JS",
        "description": "Let's talk about NodeJS ",
        "startDate": "2020-12-05T07:52:00.000Z",
        "endDate": "2020-12-06T06:00:00.000Z",
        "location": "Online"
    },
    {
        "_id": "5efa39e1afe1f91b27ecb608",
        "organizer": "Tester",
        "title": "NODE.JS",
        "description": "Let's talk about NodeJS ",
        "startDate": "2020-12-05T07:52:00.000Z",
        "endDate": "2020-12-06T07:55:00.000Z",
        "location": "Online"
    },
    {
        "_id": "5efa39e9afe1f91b27ecb609",
        "organizer": "Tester",
        "title": "NODE.JS",
        "description": "Let's talk about NodeJS ",
        "startDate": "2020-12-05T07:52:00.000Z",
        "location": "Online"
    },
    {
        "_id": "5efa3a404de4421bd926c4b7",
        "organizer": "Tester",
        "title": "NODE.JS",
        "description": "Let's talk about NodeJS ",
        "startDate": "2020-12-05T07:52:00.000Z",
        "location": "Online"
    },
    {
        "_id": "5efa3a424de4421bd926c4b8",
        "organizer": "Tester",
        "title": "NODE.JS",
        "description": "Let's talk about NodeJS ",
        "startDate": "2020-12-05T07:52:00.000Z",
        "location": "Online"
    },
    {
        "_id": "5efa42d77daea12826d4ddcc",
        "organizer": "Tester",
        "title": "NODE.JS",
        "description": "Let's talk about NodeJS ",
        "startDate": "2020-12-05T07:52:00.000Z",
        "endDate": "2020-12-06T07:55:00.000Z",
        "location": "Online"
    },
    {
        "_id": "5efa42e49b424f284baa4caa",
        "organizer": "Tester",
        "title": "NODE.JS",
        "description": "Let's talk about NodeJS ",
        "startDate": "2020-12-05T07:52:00.000Z",
        "endDate": "2020-12-06T07:55:00.000Z",
        "location": "Online"
    },
    {
        "_id": "5efa441c9c09e12939f51eb7",
        "organizer": "Tester",
        "title": "NODE.JS",
        "description": "Let's talk about NodeJS ",
        "startDate": "2020-12-05T07:52:00.000Z",
        "endDate": "2020-12-06T07:55:00.000Z",
        "location": "Online"
    }
]
</pre>
</details>


### Get by event ID
Returns an event given an ID

Route: `/events/:eventId`

<!-- Sample Response -->
<details>
<summary>Sample Response</summary>
<pre>
{
    "_id": "5efa39d5afe1f91b27ecb607",
    "organizer": "Tester",
    "title": "NODE.JS",
    "description": "Let's talk about NodeJS ",
    "startDate": "2020-12-05T07:52:00.000Z",
    "endDate": "2020-12-06T06:00:00.000Z",
    "location": "Online"
}
</pre>
</details>


## POST

### Schedule an event
Uploads a new event to database

Route: `/events`

Fields:
* orgainzer (Required)
* title (Required, String)
* description (Required, String)
* location (Required, String)
* startDate (Required, Date<sup>1</sup>)
* endDate (Required, Date<sup>1</sup>)

<!-- Sample Request -->
<details>
<Summary>Sample Request</Summary>
<pre>
{
    "organizer": "Tester",
    "title": "NODE.JS",
    "description": "Let's talk about NodeJS ",
    "startDate": "2021-02-08 09:03",
    "endDate": "2022-01-08 01:30:26",
    "location": "Richcraft Hall, ON"
}
</pre>
</details>

<!-- Sample Response -->
<details>
<Summary>Sample Response</Summary>
<pre>
{
    "_id": "5efa5f6e1df61f4c334224f4",
    "organizer": "Tester",
    "title": "NODE.JS",
    "description": "Let's talk about NodeJS ",
    "startDate": "2021-02-08T15:03:00.000Z",
    "endDate": "2022-01-08T07:30:26.000Z",
    "location": "Richcraft Hall, ON",
    "__v": 0
}
</pre>
</details>

---
1. Checkout [momentJS docs](https://momentjs.com/docs/#/parsing/string/) for formating date and time.
---





## PATCH

### Modify by event ID
Modify an event

Route: `/events/:eventId`

Use any of the fields in schedule event

<!-- Sample Request -->
<details>
<Summary>Sample Request</Summary>
<pre>
{
    "title": "JS"
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
        "title": "JS"
    }
}
</pre>
</details>

## DELETE

### Delete by event ID
Delete an event

Route: `/events/:eventId`

<!-- Sample Response -->
<details>
<summary>Sample Response</summary>
<pre>
{
    "message": "Deleted 5efa39e9afe1f91b27ecb609"
}
</pre>
</details>
