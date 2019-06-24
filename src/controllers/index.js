import smsRouter from './SmsController';

const apiPrefix = '/api/v1';

// add your route to this list
const routes = [
  smsRouter,
];

export default (app) => {
  routes.forEach(route => app.use(apiPrefix, route));
  return app;
};
