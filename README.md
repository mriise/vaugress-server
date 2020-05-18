# Concept
Track team projects using Matrix


- koa for a readonly api
- mongodb for task and team storage
- matrix for write change events from users 

## Definitions
`Matrix room = MongoDB collection = Vuagress project`
I will use "project" to refrence this level of abstraction

## How things work
users ability read, write, and view are all defined in Matrix using user "power" levels
