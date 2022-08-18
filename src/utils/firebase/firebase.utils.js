// Tutorial Firebase crazy weird
// https://www.udemy.com/course/complete-react-developer-zero-to-mastery/learn/lecture/31123526#content
// pulls down all the firebase services
// goto firebase -> click web icon (</>) to register new web application that we will use initializeApp object configs
// copy generated code
import { initializeApp } from 'firebase/app';
import {
    getAuth,
    signInWithRedirect,
    signInWithPopup,
    GoogleAuthProvider
} from 'firebase/auth';
// import some methods from firestore
import {
  getFirestore, // instansiate firestore instance
  doc, // retrieve documents inside firestore database
  getDoc, // getting documents data
  setDoc // setting the documents data
} from 'firebase/firestore'

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDmCcJS4oq_Y905FFkpfxBJRJIjDp4OTmY",
  authDomain: "crwn-clothing-db-e8818.firebaseapp.com",
  projectId: "crwn-clothing-db-e8818",
  storageBucket: "crwn-clothing-db-e8818.appspot.com",
  messagingSenderId: "887769137582",
  appId: "1:887769137582:web:432158644eb93792b2083f"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// before useing authentication we need to inital a provider
// gives you back this providers instance
const provider = new GoogleAuthProvider()
// will take a config objest
// when ever anyone interacts with the provider we want them to select account
provider.setCustomParameters({
  prompt: "select_account"
})

export const auth = getAuth();
export const signInWithGooglePopup = () => signInWithPopup(auth, provider);

// go back to firebase, goto authentication
// sign-in method tab
// click google
// click enable
// add support email -> emails for support go there
// save
// should show a green tick
// now we can use this util in our sign-in.component.jsx

// now we have an instance of firebase we need to instanciate it
// instanciated our firestore
export const db = getFirestore(); // this points to our database, we can then use doc, getDoc and setDoc

// to use db
// create a method
// async function recieves some user authentication object from google signin
// take that data and store it inside firestore
export const createUserDocumentFromAuth = async (userAuth) => {
  // see if we have an existing document reference (special object fs uses as an instance)
  // takes three options
  // the database,
  // collections,
  // Unique identifyer
  // check sign-in.component.js response log see uid from the response
  const userDocRef = doc(db, 'users', userAuth.uid);

  // if no collection is present google will still create an object
  // it just knows
  // with location if users collection existed in db, it would pass the UID
  // console.log(userDocRef);

  // now we have this collection
  // we need to get some data from it
  // we use the method getDoc
  // snapshot is the data
  // pass getDoc method the userDocRef, use await google needs to do this asyncronusly
  const userSnapshot = await getDoc(userDocRef);
  // console.log(userSnapshot); // returns a special object with methods
  // console.log(userSnapshot.exists()); // returns false as we dont have a collection, or a user

  // we can then use exists to see if the collection exists, if not we create one using setDoc method

  // sudo code
  // if user data exists

  // if user data does not exist
      // create it

  // return userDocRef

  if (!userSnapshot.exists()) { // if returns boolean true (doesn't exist) using bang opperator to reverse
    const { displayName, email } = userAuth; // destructure the values we want from userAuth
    const createdAt = new Date(); // time user was created date object

    try {
      // await the function setDec, first get the doc reference from userDocRed i.e. the location in the db
      // pass it an object of the values we require
      await setDoc(userDocRef, {
        displayName,
        email,
        createdAt
      })
    } catch (error) {
      console.log('error creating user', error);
    }
  }

  return userDocRef;
}
