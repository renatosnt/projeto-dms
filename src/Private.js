import React from "react";

import { onAuthStateChanged } from "firebase/auth";
import { auth } from "./firebaseConnection";
import { Navigate } from "react-router-dom";

const Private = ({ children }) => {
  const [loading, setLoading] = React.useState(true);
  const [signed, setSigned] = React.useState(false);

  React.useEffect(() => {
    async function checkLogin() {
      onAuthStateChanged(auth, (user) => {
        if (user) {
          const userData = {
            uid: user.uid,
            email: user.email,
          };
          localStorage.setItem("@detailUser", JSON.stringify(userData));
          setLoading(false);
          setSigned(true);
        } else {
          setLoading(false);
        }
      });
    }
    checkLogin();
  }, []);

  if (loading) return <div></div>;
  if (!signed) return <Navigate to="/login" />;
  return children;
};

export default Private;
