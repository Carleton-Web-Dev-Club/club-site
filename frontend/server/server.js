/* eslint-disable no-console */
import path from 'path';
import fs from 'fs';

import express from 'express';
import React from 'react';
import ReactDOMServer from 'react-dom/server';
import { StaticRouter } from 'react-router-dom';

import App from '../src/App';

const app = express();

const PORT = 8080;

app.use(
  express.static(
    path.resolve(__dirname, '..', 'build', 'public'),
  ),
);

app.use((req, res) => {
  fs.readFile(path.resolve('./build/template.html'), 'utf-8', (err, data) => {
    if (err) {
      console.log(err);
      return res.status(500).send('Server');
    }

    const context = {};
    const html = ReactDOMServer.renderToString(
      <StaticRouter location={req.url} context={context}>
        <App />
      </StaticRouter>,
    );

    return res.send(data.replace(
      '<div id="root"></div>',
      `<div id="root">${html}</div>`,
    ));
  });
});

app.listen(PORT, () => {
  console.log(`SSR running on port http://localhost:${PORT}`);
});
