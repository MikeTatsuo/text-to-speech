import 'reflect-metadata';
import express from './config/express';
import { createConnection } from 'typeorm';
import { TextsController } from './controllers';
import { Routes } from './enums';

const { texts } = Routes;

createConnection().then(() => {

  express.get(texts, TextsController.getAllTexts);
  express.post(texts, TextsController.addText);

  express.listen(12345, () => {
    console.log('server listening in 12345');
  });

});
