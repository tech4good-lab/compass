export const environment = {
  production: false,
  mockDataInDev: true,
  mockAuthInDev: true, // can only be set to true if mockDataInDev is true
  autoLoginInDev: true,  // can only be set to true if mockAuthInDev is true
  firebase: {
    apiKey: "AIzaSyCNA9n05hAbfVO9AAvLKFjiMglvOlY78ow",
    authDomain: "compass-development-db9bd.firebaseapp.com", 
    databaseURL: "https://compass-development-db9bd.firebaseio.com", 
    projectId: "compass-development-db9bd", 
    storageBucket: "compass-development-db9bd.appspot.com", 
    messagingSenderId: "1053043144107"
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
