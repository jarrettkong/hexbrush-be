# POST

## POST a Palette
POST a new project to the Database

**URL** : `/api/v1/palettes/`

***Method*** : `POST`

**Permissions required** : None

## Success Response

**Code** : `201 OK`

**Content-Type** : `application/json`

**Sample-Body** : 
```js
{"name": "Dog Party",
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

**Content example**
```json
{
    "id": 2,
    "name": "Dog Party",
    "id": 10,
    "project_id": 4,
    "name": "My Palette",
    "color_1": "#ffffff",
    "color_2": "#ffffff",
    "color_3": "#000000",
    "color_4": "#ffffff",
    "color_5": "#ffffff",
    "created_at": "2019-07-07T18:01:28.422Z",
    "updated_at": "2019-07-07T18:01:28.422Z"
}
```
