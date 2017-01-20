TODO SERVER
------------


Registering an app
------------------

POST /api/app

sample payload

```
{"secret":"askfjasjdfashjdflkaskdlflj"}
```

sample response

```
{
  "secret": "askfjasjdfashjdflkaskdlflj",
  "status": "active",
  "_id": "58826fbc422fec3f5d042667",
  "date": "2017-01-20T19:53:07.453Z"
}
```

Creating TODO
--------------
POST /api/todo/58826fbc422fec3f5d042667

sample payload
```
{"note" : "first note"}
```
sample response
```
{
  "appId": "58826fbc422fec3f5d042667",
  "note": "first note",
  "status": "NEW",
  "_id": "588273deb9734b405f6f9aac",
  "date": "2017-01-20T20:32:30.097Z"
}
```

Listing all TODOs
-----------------

GET /api/todo/58826fbc422fec3f5d042667

Sample response
```
[
  {
    "_id": "588271b83009114007b91450",
    "appId": "58826fbc422fec3f5d042667",
    "status": "NEW",
    "date": "2017-01-20T20:23:20.903Z"
  },
  {
    "_id": "5882723d1fae0a403a244db2",
    "appId": "58826fbc422fec3f5d042667",
    "note": "first note for todo",
    "status": "NEW",
    "date": "2017-01-20T20:25:33.295Z"
  },
  {
    "_id": "588272461fae0a403a244db3",
    "appId": "58826fbc422fec3f5d042667",
    "note": "second note for todo",
    "status": "DONE",
    "date": "2017-01-20T20:25:42.178Z"
  },
  {
    "_id": "588273deb9734b405f6f9aac",
    "appId": "58826fbc422fec3f5d042667",
    "note": "first note",
    "status": "NEW",
    "date": "2017-01-20T20:32:30.097Z"
  }
]
```


Get Specific TODO
-----------------
GET /api/todo/58826fbc422fec3f5d042667/5882723d1fae0a403a244db2

Sample response
```
{
  "_id": "5882723d1fae0a403a244db2",
  "appId": "58826fbc422fec3f5d042667",
  "note": "first note for todo",
  "status": "NEW",
  "date": "2017-01-20T20:25:33.295Z"
}
```

Mark a TODO as DONE
--------------------
PUT /api/todo/58826fbc422fec3f5d042667/5882723d1fae0a403a244db2/done

Sample response
```
{
  "_id": "5882723d1fae0a403a244db2",
  "appId": "58826fbc422fec3f5d042667",
  "note": "first note for todo",
  "status": "DONE",
  "date": "2017-01-20T20:25:33.295Z"
}
```
Delete a TODO
-------------

DELETE /api/todo/58826fbc422fec3f5d042667/588272461fae0a403a244db3

Sample response

```
{
  "_id": "588272461fae0a403a244db3",
  "appId": "58826fbc422fec3f5d042667",
  "note": "second note for todo",
  "status": "DELETED",
  "date": "2017-01-20T20:25:42.178Z"
}
```
