import cookie from "cookie";

const cookieHeaderPlugin = {
  requestDidStart() {
    return {
      willSendResponse({ operation, response }) {
        if (operation?.operation === "mutation") {
          const authMutation = operation.selectionSet.selections.find(
            selection =>
              selection.name.value === "login" ||
              selection.name.value === "logout" ||
              selection.name.value === "signUp"
          );

          if (!authMutation) {
            return;
          }

          const fieldName = authMutation.name.value;

          if (fieldName === "logout") {
            const cookieString = cookie.serialize("token", "", {
              httpOnly: true,
              expires: new Date(1)
            });
            response.http.headers.set("Set-Cookie", cookieString);
          } else {
            if (response.data?.[fieldName].token) {
              const cookieString = cookie.serialize(
                "token",
                response.data[fieldName].token,
                { httpOnly: true, maxAge: 86400 }
              );
              response.http.headers.set("Set-Cookie", cookieString);
            }
          }
        }
      }
    };
  }
};

export default cookieHeaderPlugin;
