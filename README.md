# Carleton Web Dev Club RESTful API

Work in progress

If you would like to contribute, check [contributions](#contributions) section.

## Development

#### Prerequisites
* [Git](https://git-scm.com/)
* [Node.JS](https://nodejs.org/en/) x64, version `>=12.x`
* [Docker desktop](https://docs.docker.com/desktop/#download-and-install)
* [`docker-compose`](https://docs.docker.com/compose/install/)


### Running this API locally:

1. Rename [`.env.example`](./.env.example) to `.env`
2. Install Node dependencies using:
   ```
   npm install
   ```
3. To run this locally it will start up a mongodb instance using dockers and will persist the data in `mongodb/data`. Using the following command:
   ```
   npm start
   ```
   The API should be running at http://localhost:5000

    **Note**: The first time around it will take a bit for dockers to setup a mongodb intance.
4. Terminating the node server will not turn of the mongodb instance. So you will need to turn off the container yourself. You can use:
   ```
   npm run stop:mongo
   ```

To test this you can use [Postman](https://www.postman.com) or a vscode-extension [`humao.rest-client`](https://marketplace.visualstudio.com/items?itemName=humao.rest-client)

### Available Scripts

`npm run [command]`

Commands:
```
start       Start the API server and a mongoDB instance using docker-compose 
dev         uses nodemon on top of start

lint        runs eslint

stop:mongo  Stop the mongodb server using docker-compose
```

### Contributions

If you would like to help, join the Discord Channel [#club-site-apigroup](https://discord.gg/8pJS4zk)

Basic API specifications are given in [@Carleton-Web-Dev-Club/CWDC-Wiki](https://github.com/Carleton-Web-Dev-Club/CWDC-Wiki/blob/master/api/discussion.adoc)
