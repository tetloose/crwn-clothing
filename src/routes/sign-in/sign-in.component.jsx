import { signInWithGooglePopup, createUserDocumentFromAuth } from '../../utils/firebase/firebase.utils'

const SignIn = () => {
  // when you make a call to a db
  // it's asyncronouse
  const logGoogleUser = async () => {
    // await the response from signInWithGooglePopup
    const { user } = await signInWithGooglePopup(); // destructure it off the response
    const userDocRef = await createUserDocumentFromAuth(user);
    console.log(userDocRef);
  }

  return (
    <div>
      <h1>Sign In Page</h1>
      <button
        onClick={logGoogleUser}
      >
        Sign In with Google
      </button>
    </div>
  )
}

export default SignIn

// when the authentication process happens
// users are stored in the users tab but not in the database
// need to create a reference to that user in Cloud Firestore
// got cloud firestore, create db select production
// click Rules
// define the rules of the logged users
// default rules keep open in development
// change later on
// rules_version = '2';
// service cloud.firestore {
//   match /databases/{database}/documents {
//     match /{document=**} {
//       allow read, write: if true;
//     }
//   }
// }
// click publish
// go back to utils firebase.utils.js and import firebase
