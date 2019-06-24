import express from 'express';
import SmsController from './SmsController';

const SmsRouter = express.Router();

SmsRouter.get(
  '/',
  SmsController.home,
);

export default PopulationRouter;
