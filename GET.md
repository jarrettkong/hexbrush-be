## GET all Projects
Get all existing Projects

**URL** : `/api/v1/projects/`

***Method*** : `GET`

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
## GET a specific Project by ID

Get a specific existing Project


**URL** : `/api/v1/projects/:id`

***Method*** : `GET`

**Permissions required** : None

## Success Response

**Code** : `200 OK`

**Content examples**

For a project with an ID of 1:`/api/v1/projects/2

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
## GET all Palettes
Get all Palettes


**URL** : `/api/v1/palettes/`

***Method*** : `GET`

**Permissions required** : None

## Success Response

**Code** : `200 OK`

**Content examples**
```json
[
    {
        "id": 1,
        "project_id": 1,
        "name": "IdeaBox",
        "color_1": "#c6370b",
        "color_2": "#86ba32",
        "color_3": "#d30863",
        "color_4": "#bdd85d",
        "color_5": "#f9bbda",
        "created_at": "2019-07-07T17:44:00.311Z",
        "updated_at": "2019-07-07T17:44:00.311Z"
    },
    {
        "id": 3,
        "project_id": 3,
        "name": "FotoFinder",
        "color_1": "#726dd6",
        "color_2": "#b2e241",
        "color_3": "#7ff9e5",
        "color_4": "#e861b2",
        "color_5": "#ef45d9",
        "created_at": "2019-07-07T17:44:00.314Z",
        "updated_at": "2019-07-07T17:44:00.314Z"
    },
    {
        "id": 4,
        "project_id": 4,
        "name": "DogParty",
        "color_1": "#55eddd",
        "color_2": "#fc44c5",
        "color_3": "#ed392d",
        "color_4": "#ed87a2",
        "color_5": "#90bce5",
        "created_at": "2019-07-07T17:44:00.316Z",
        "updated_at": "2019-07-07T17:44:00.316Z"
    }
 ]
  
```
## GET a specific Palette by ID

Get a specific existing Palettes


**URL** : `/api/v1/palettes/:id`

***Method*** : `GET`

**Permissions required** : None

## Success Response

**Code** : `200 OK`

**Content examples**
For a palette with an ID of 1: `/api/v1/palettes/1`

```json
{
    "id": 4,
    "project_id": 4,
    "name": "IdeaBox",
    "color_1": "#55eddd",
    "color_2": "#fc44c5",
    "color_3": "#ed392d",
    "color_4": "#ed87a2",
    "color_5": "#90bce5",
    "created_at": "2019-07-07T17:44:00.316Z",
    "updated_at": "2019-07-07T17:44:00.316Z"
}
```

For a palette with an ID of 2: `/api/v1/palettes/2`

```json
{
[
  {
    "id" : 2,
    "project_id" : 2,
    "name" : "DogParty",
    "updated_at" : "2019-07-07 07:01:57.483445-06",
    "created_at" : "2019-07-07 07:01:57.483445-06",
    "color_1" : "#a05dd3",
    "color_2" : "#e041f2",
    "color_3" : "#89ed5e",
    "color_4" : "#25a01c",
    "color_5" : "#f2bf93",
  }
]
  
```

## Notes
