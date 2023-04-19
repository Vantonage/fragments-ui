// src/api.js

// fragments microservice API
const apiUrl = process.env.API_URL || "localhost:8080";

/**
 * Given an authenticated user, request all fragments for this user from the
 * fragments microservice (currently only running locally). We expect a user
 * to have an `idToken` attached, so we can send that along with the request.
 */
export async function getUserFragments(user) {
  console.log("Requesting user fragments data...");
  try {
    //using expand=1 to display the metadata in the console
    const res = await fetch(`${apiUrl}/v1/fragments?expand=1`, {
      // Generate headers with the proper Authorization bearer token to pass
      headers: user.authorizationHeaders(),
    });

    if (!res.ok) {
      throw new Error(`${res.status} ${res.statusText}`);
    }
    const data = await res.json();
    console.log("Got user fragments data", { data });
    return data;
  } catch (err) {
    console.error("Unable to call GET /v1/fragments", { err });
  }
}

export async function postUserFragments(user, fragment, type) {
  console.log(fragment);
  try {
    const res = await fetch(`${apiUrl}/v1/fragments`, {
      method: "POST",
      headers: {
        "Content-Type": type,
        Authorization: `Bearer ${user.idToken}`,
      },
      body: fragment,
    });
    if (!res.ok) {
      throw new Error(`${res.status} ${res.statusText}`);
    }
    const data = await res.json();
    console.log("Got user fragments data", { data });
    return data;
  } catch (err) {
    console.error("Unable to call POST /v1/fragment", { err });
  }
}

// delete fragment by id
export async function deleteUserFragment(user, id) {
  console.log("Delete fragment");
  try {
    const res = await fetch(`${apiUrl}/v1/fragments/${id}`, {
      method: "DELETE",
      headers: {
        Authorization: `Bearer ${user.idToken}`,
      },
    });
    if (!res.ok) {
      throw new Error(`${res.status} ${res.statusText}`);
    }
    console.log("Deleted user fragments data");
  } catch (err) {
    console.error("Unable to call DELETE /fragment", { err });
  }
}


// put fragment by id
export async function putUserFragment(user, id, type, body) {
  console.log("Updating fragment data");
  try {
    const res = await fetch(`${apiUrl}/v1/fragments/${id}`, {
      method: "PUT",
      headers: {
        "Content-Type": type,
        Authorization: `Bearer ${user.idToken}`,
      },
      body: body,
    });
    if (!res.ok) {
      throw new Error(`${res.status} ${res.statusText}`);
    }
    console.log("Updated user fragments data");
  } catch (err) {
    console.error("Unable to call PUT /fragment. Wrong type", { err });
  }
}



