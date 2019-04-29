export const environment = {
  production: true,
  mockDataInDev: false, // not relevant for production
  mockAuthInDev: false, // not relevant for production
  autoLoginInDev: false, // not relevant for production
  firebase: {
    apiKey: "AIzaSyDMQ-nMhPv_quZ2dEdpiaKNEITHV8K-Crs", 
    authDomain: "compass-production-fd86a.firebaseapp.com", 
    databaseURL: "https://compass-production-fd86a.firebaseio.com", 
    projectId: "compass-production-fd86a", 
    storageBucket: "compass-production-fd86a.appspot.com", 
    messagingSenderId: "942085216670"
  },
  firebaseLogs: {
    apiKey: "AIzaSyCNA9n05hAbfVO9AAvLKFjiMglvOlY78ow",
    authDomain: "compass-development-db9bd.firebaseapp.com", 
    databaseURL: "https://compass-development-db9bd.firebaseio.com", 
    projectId: "compass-development-db9bd", 
    storageBucket: "compass-development-db9bd.appspot.com", 
    messagingSenderId: "1053043144107"
  }
};
