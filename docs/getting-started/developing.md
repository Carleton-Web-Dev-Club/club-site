## Pre-requisites
* [Git](https://git-scm.com/)
* [Node.JS](https://nodejs.org/en/) x64, version `>=14.x`
  * We use [npm workspaces](https://docs.npmjs.com/cli/v7/using-npm/workspaces) so [`npm@7`](https://github.blog/2021-02-02-npm-7-is-now-generally-available/) is needed.
* [Docker desktop](https://docs.docker.com/desktop/#download-and-install)
* [`docker-compose`](https://docs.docker.com/compose/install/)


## Running this API locally:

1. Rename [`.env.example`](https://github.com/Carleton-Web-Dev-Club/club-site-api/blob/master/.env.example) to `.env`
   
   **Note**: Make sure that you provide `DB_CONNECT` to make sure that it runs properly. 
2. Install Node dependencies using:
   ```
   npm install
   ```
3. If you want to run mongodb using dockers then:
   ```
   npm run install:docker
   ```
4. To run this locally it will start up a mongodb instance using dockers and will persist the data in `mongodb/data`. Using the following command:
   ```
   npm run dev
   ```
   The API should be running at http://localhost:5000

    **Note**: The first time around it will take a bit for dockers to setup a mongodb instance.
5. Terminating the node server will not turn of the mongodb instance. So you will need to turn off the container yourself. You can use:
   ```
   npm run stop:mongo
   ```

To test this you can use [Postman](https://www.postman.com) or a vscode-extension [`humao.rest-client`](https://marketplace.visualstudio.com/items?itemName=humao.rest-client)

## Available Scripts

`npm run [command]`

Commands:
```
start       Start the API server. You will need to start a mongodb instance 
dev         uses nodemon and spins up the server and a mongodb server (using dockers)
start:mongo  Starts a mongodb server using docker-compose

install:docker Pulls the mongo image from docker hub using docker-compose

lint        runs eslint

stop:mongo  Stop the mongodb server using docker-compose

docs        Serve docs at http://localhost:3000
```


