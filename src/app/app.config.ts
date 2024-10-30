import { ApplicationConfig, provideZoneChangeDetection , importProvidersFrom} from '@angular/core';
import { provideRouter } from '@angular/router';
import { routes } from './app.routes';
import { provideClientHydration } from '@angular/platform-browser';
import { HttpClientModule, provideHttpClient, withFetch } from '@angular/common/http';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { AngularFireModule } from '@angular/fire/compat';
import { AngularFirestoreModule } from '@angular/fire/compat/firestore';


import { initializeApp } from "firebase/app";

const firebaseConfig = {
  apiKey: "AIzaSyC1dBsk3jxCXEipViR3fF4ALXYHILUF-8w",
  authDomain: "angularlogin-7b9b4.firebaseapp.com",
  projectId: "angularlogin-7b9b4",
  storageBucket: "angularlogin-7b9b4.appspot.com",
  messagingSenderId: "63009514747",
  appId: "1:63009514747:web:6ba42efbda0b617c873c5e"
};

initializeApp(firebaseConfig)

export const appConfig: ApplicationConfig = {
  providers: [provideZoneChangeDetection({ eventCoalescing: true })
              , provideRouter(routes),
               provideClientHydration(),
               provideHttpClient(),
               provideHttpClient(withFetch()),
               importProvidersFrom(
                 AngularFireModule.initializeApp(firebaseConfig),
                 AngularFirestoreModule
               ), provideAnimationsAsync(),]
};
