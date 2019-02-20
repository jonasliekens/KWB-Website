// The file contents for the current environment will overwrite these during build.
// The build system defaults to the dev environment which uses `environment.ts`, but if you do
// `ng build --env=prod` then `environment.prod.ts` will be used instead.
// The list of which env maps to which file can be found in `angular-cli.json`.

export const environment = {
  production: false,
  backEndUrl: 'http://localhost:5000/api/1_0',
  firebase: {
    apiKey: 'AIzaSyDafog4Kbx10c6SYdoSs-suundiDhGjDwo',
    authDomain: 'kwb-grasheide-9ab50.firebaseapp.com',
    databaseURL: 'https://kwb-grasheide-9ab50.firebaseio.com',
    projectId: 'kwb-grasheide-9ab50',
    storageBucket: 'kwb-grasheide-9ab50.appspot.com',
    messagingSenderId: '597598969995'
  }
};
