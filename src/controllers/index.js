import smsRouter from './SmsController';
import contactRouter from './ContactController';

const apiPrefix = '/api/v1';

// add your route to this list
const routes = [
  smsRouter,
  contactRouter
];

export default (app) => {
  routes.forEach(route => app.use(apiPrefix, route));
  return app;
};
