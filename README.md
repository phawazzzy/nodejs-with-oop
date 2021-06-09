# Backend node js test

## About
This project will be used for calculating the area of different
shapes. 
The task involves building a RESTful API for the project using Node, Express, and any database,
of your choice. In this case made use of mongoDB.

The list of supported shapes, their dimensions and formulas have been given below.
| Shape | Dimensions  | Formula for Area |
| :---:   | :-: | :-: |
| Square | - Side (side)  | side * side |
| Rectangle | - Length, - Breadth | length * breadth|
| Triangle | length_a, length_b, length_c,   | √s (s − length_a) (s − length_b) (s − length_c) |
| Circle | -Radius (radius)  | πradius² |

## Endpoint
- An endpoint to authenticate a user
    - Signup: api/v1/auth/signup
    - login: api/v1/auth/login
- An endpoint to perform a calculation
    - api/v1/calculate
- An endpoint to view previous calculations
    - api/v1/calculate/all
## API
This API is hosted on
Base URL: https://abindev-test.herokuapp.com/
## API DOCUMENTATION ON POSTMAN
Read the docs: https://documenter.getpostman.com/view/7357882/TzY68EBR

# Want to run the app?
  ## Set up locally
  To run this application locally on your PC, you should have the following installed
   1. Node js  version > 11
  ### Clone the repository
  ```bash
    git clone https://github.com/phawazzzy/nodejs-with-oop.git 
  ```
  ```bash
   cd nodejs-with-oop
  ```
  ### Install all the dependencies
  ```bash
   npm install
  ```
  ### Set up environment variables
  The project uses environment variables for configuration,
  In the root project folder create a  ```.env``` file and fill it with the content in the ```.env.example``` file.

  Create file from the terminal, from the root directory 
  ```bash
   touch .env
  ```

  ### DATABASE
  Provide the mongoDB uri on the .env file
  In my case used [mongoDB](https://mongodb.com)
 ### Spin up the server

 Using nodemon
 if you have nodemon installed on your system you can make use of the commang
 ```bash
 npm run dev
 ```

Using node

```bash
 npm start
 ```

## Run it using docker
build the docker file if you havent before
```bash
 docker build -t node-with-oop .
```

run the docker file

```bash
docker run node-with-oop
```
# Note!!!
Create the .env file before building with docker
