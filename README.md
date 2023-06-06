# eOBIEG - Electronic Document Management System [![Version - 1.0.2](https://img.shields.io/badge/Version-1.0.2-2ea44f)](https://)

## main - production branch

### :rocket: Presentation viedo
[![eOBIEG - presentation](./prezentacja.png)](https://youtu.be/BURz2i5YcvI)

### :rocket: Installation steps

1. Clone repository
2. Install dependencies for client by running command:
   `npm install`
3. Install dependencies for server by running command:
   `npm install`
4. Run server using command:
   `npm run dev`
5. Run client using command:
   `npm run dev`
   
### :building_construction: Geting started using docker
1. Clone repository
2. Build containers:
   `docker-compose up --build`
3. Run migrations for DB (go to ./server folder):
   `npm run migrations`
4. Run seeders (if needed):
   `npm run seeders`
5. Applications should open on the following ports: 

|Database                |WEB-Client                          |API-Server                         |
|----------------|-------------------------------|-----------------------------|
|[![My Skills](https://skillicons.dev/icons?i=postgres)](https://skillicons.dev)    |[![My Skills](https://skillicons.dev/icons?i=typescript)](https://skillicons.dev)   ![My Skills](https://skillicons.dev/icons?i=react)         |[![My Skills](https://skillicons.dev/icons?i=nodejs)](https://skillicons.dev) [![My Skills](https://skillicons.dev/icons?i=express)](https://skillicons.dev)            |
|:`5432`         |:`3000`            |:`5000`            |
