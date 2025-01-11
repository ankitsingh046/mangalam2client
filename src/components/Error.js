import React from "react";

function Error({message}) {
  return (
    <div class='alert alert-danger text-start' role='alert'>
      {message ||'Something went wrong, please try again later.'}
    </div>
  );
}

export default Error;
