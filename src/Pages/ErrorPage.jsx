import React from "react";

function ErrorPage() {
  return (
    <div
      style={{
        width: "100%",
        height: "100vh",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        flexDirection: "column",
      }}
    >
      <h1 style={{ fontSize: "5em" }}>404</h1>
      <p>Page not found</p>
    </div>
  );
}

export default ErrorPage;
