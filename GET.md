## GET all Projects

Get the details of the currently Authenticated User along with basic
subscription information.

**URL** : `/api/v1/projects/`

***Method*** : `GET`

***Auth required*** : YES

**Permissions required** : None

## Success Response

**Code** : `200 OK`

**Content example**
```json
{
    "id": 1,
    "name": "Idea Box",
},
{
    "id": 2,
    "name": "Dog Party",
  
}
```
## GET all specific Project by ID

Get the details of the currently Authenticated User along with basic
subscription information.

**URL** : `/api/v1/projects/:id`

***Method*** : `GET`

***Auth required*** : YES

**Permissions required** : None

## Success Response

**Code** : `200 OK`

**Content examples**
For a project with an ID of 1:

```json
{
    "id": 1,
    "name": "Idea Box",
}
```

For a project with an ID of 2: `/api/v1/projects/2`

```json
{
    "id": 2,
    "name": "Dog Party",
  
```

## Notes
