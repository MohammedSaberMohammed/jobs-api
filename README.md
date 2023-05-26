#### Project Setup

In order to spin up the project, in the root create .env with these two variables, with your own values.

MONGO_URI
JWT_SECRET

## You can try the api 
  ## From: [**Jobs api**](https://jobs-api-b9bz.onrender.com/)

After that run this command

```bash
npm install && npm start
```

Swagger UI

```yaml
/jobs/{id}:
  parameters:
    - in: path
      name: id
      schema:
        type: string
      required: true
      description: the job id
```
