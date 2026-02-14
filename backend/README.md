
# Routes

1) Project -> this has 3 api calls
    - /api/project/         -> add new project / update existing project
    - /api/project/all      -> get all the projects
    - /api/project/:id      -> get project by id

2) User -> this has 3 api calls
    - /api/user/signup   -> add new user
    - /api/user/login    -> login a exisiting user
    - /api/user/:id      -> to get info of the user with the list of projects he is in.




# Models

    1)  projects
            projectId   |   name    |   description

    2)  users
            id   |   name    |   email  |   password    |   salt    |   project