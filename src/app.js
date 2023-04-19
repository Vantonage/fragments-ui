// src/app.js

import { Auth, getUser } from "./auth";
// modifications to src/app.js
import { getUserFragments, postUserFragments, deleteUserFragment, putUserFragment } from "./api";

async function init() {
  // Get our UI elements
  const userSection = document.querySelector("#user");
  const loginBtn = document.querySelector("#login");
  const logoutBtn = document.querySelector("#logout");
  const postFragmentButton = document.querySelector("#postFragmentButton");
  const postFragment = document.querySelector("#postFragment");
  const getFragmentButton = document.querySelector("#getFragmentButton");

  // delete
  const deleteFragmentButton = document.querySelector("#delete");

  // put/update
  const fragment_id = document.querySelector("#fragment_id");
  const update_body = document.querySelector("#update_body");
  const putButton = document.querySelector("#update");

  //Submit button
  postFragmentButton.onclick = () => {
    // console.log("text", postFragment.value)
    var type = document.getElementById("type").value;
    if (type == "image/png" || type == "image/jpeg" || type == "image/webp" || type == "image/gif")
    {
      let data = document.getElementById("file").files[0];
      postUserFragments(user, data, type);
    }
    else{
      postUserFragments(user, postFragment.value, type);
    }
  };
  getFragmentButton.onclick = () => {
    getUserFragments(user);
  };

  deleteFragmentButton.onclick = () => {
    deleteUserFragment(user, fragments_id.value);
  };

  putButton.onclick = async () => {
    putUserFragment(
      user,
      fragment_id.value,
      document.getElementById("type").value,
      update_body.value
    );
  };

  // Wire up event handlers to deal with login and logout.
  loginBtn.onclick = () => {
    // Sign-in via the Amazon Cognito Hosted UI (requires redirects), see:
    // https://docs.amplify.aws/lib/auth/advanced/q/platform/js/#identity-pool-federation
    Auth.federatedSignIn();
  };
  logoutBtn.onclick = () => {
    // Sign-out of the Amazon Cognito Hosted UI (requires redirects), see:
    // https://docs.amplify.aws/lib/auth/emailpassword/q/platform/js/#sign-out
    Auth.signOut();
  };

  // See if we're signed in (i.e., we'll have a `user` object)
  const user = await getUser();
  if (!user) {
    // Disable the Logout button
    logoutBtn.disabled = true;
    return;
  }

  // Log the user info for debugging purposes
  console.log({ user });

  // Update the UI to welcome the user
  userSection.hidden = false;

  // Show the user's username
  userSection.querySelector(".username").innerText = user.username;

  // Disable the Login button
  loginBtn.disabled = true;
  // Do an authenticated request to the fragments API server and log the result
  getUserFragments(user);



  // Conversion
  
  // const convertButton = document.querySelector("#conversion");
  // convertButton.onclick = () => {

  // }
}

// Wait for the DOM to be ready, then start the app
addEventListener("DOMContentLoaded", init);
