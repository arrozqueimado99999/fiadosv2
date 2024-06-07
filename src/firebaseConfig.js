import { initializeApp } from "firebase/app";

const firebaseConfig = {
  apiKey: "AIzaSyBG3pb3bZhujSOwej2I55tC6TZmyVd0uOY",
  authDomain: "produtiva-59851.firebaseapp.com",
  databaseURL: "https://produtiva-59851-default-rtdb.firebaseio.com",
  projectId: "produtiva-59851",
  storageBucket: "produtiva-59851.appspot.com",
  messagingSenderId: "60035516391",
  appId: "1:60035516391:web:f1bbae69e2d15abf3d9f42",
  measurementId: "G-WRW2CQD7XW"
};

export const app = initializeApp(firebaseConfig);