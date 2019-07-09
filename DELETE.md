
# DELETE

## DELETE a Project

**URL** : `/api/v1/projects/1`

***Method*** : `DELETE`

**Permissions required** : None

## Success Response

**Code** : `200 OK`

**Content example**
```json
{
    "id": 1
}
```
## DELETE a specific palette


**URL** : `/api/v1/projects/:id`

***Method*** : `GET`

**Permissions required** : None

## Success Response

**Code** : `200 OK`

**Content examples**

For a project with an ID of 1:`/api/v1/projects/1`

```json
{
    "id": 1
}
```
