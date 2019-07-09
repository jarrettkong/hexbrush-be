# PUT

## PUT a Project

**URL** : `/api/v1/projects/1`

***Method*** : `PUT`

**Permissions required** : None

## Success Response

**Code** : `200 OK`

**Content example**
```json
{
    "id": 1,
    "name" : "DogParty"
}
```
## PUT a specific palette


**URL** : `/api/v1/projects/:id`

***Method*** : `PUT`

**Permissions required** : None

## Success Response

**Code** : `200 OK`

**Content examples**

For a palette with an ID of 10:`/api/v1/projects/10`

```json
{
    "id": 10,
    "project_id": 4,
    "name": "My Palette",
    "color_1": "#ffffff",
    "color_2": "#ffffff",
    "color_3": "#000000",
    "color_4": "#ffffff",
    "color_5": "#ffffff"
}
```
