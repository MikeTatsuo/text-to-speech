import 'reflect-metadata';
import express from './config/express';
import cors from 'cors';
import { createConnection } from 'typeorm';
import { TextsController } from './controllers';
import { Routes } from './enums';

const { texts } = Routes;
const corsOptions = {
  origin: 'http://localhost:3000' // TODO: Solução temporária
};

createConnection().then(() => {

  express.use(cors(corsOptions));
  express.get(texts, TextsController.getAllTexts);
  express.post(texts, TextsController.addText);

  express.listen(12345, () => { //TODO: pegar a porta de uma variável de ambiente
    console.log('server listening in 12345');
  });

});
