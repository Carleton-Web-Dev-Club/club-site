# Projects

## POST

### Create a project
Uploads a new project details to database

Route: `/projects`

Fields:
* contributors (Required, [Strings])
* name (Required, String)
* description (Required, String)
* createdDate (Required, Date<sup>1</sup>)

<!-- Sample Request -->
<details>
<Summary>Sample Request</Summary>
<pre>
{
    "contributors": ["test" ,"test"],
    "name":"wonderful API",
    "description": "The wonderful api"
}
</pre>
</details>

<!-- Sample Response -->
<details>
<Summary>Sample Response</Summary>
<pre>
{
    "contributors": [
        "test",
        "test"
    ],
    "_id": "5f08a564024426120ebfcfcd",
    "name": "wonderful API",
    "description": "The wonderful api",
    "createdDate": "2020-07-10T17:29:08.996Z",
    "__v": 0
}
</pre>
</details>

---
1. Checkout [momentJS docs](https://momentjs.com/docs/#/parsing/string/) for formating date and time.
---
