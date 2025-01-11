import React, { useState, useEffect } from "react";
import HashLoader from "react-spinners/HashLoader";

function Loader() {
    const override = {
        display: "block",
        margin: "0 auto",
        borderColor: "red",
      };
      let [loading, setLoading] = useState(true);
      let [color, setColor] = useState("#000");
      return (
        <div className="sweet-loading">
    
          <HashLoader
            color={color}
            loading={loading}
            cssOverride={override}
            size={80}
            aria-label="Loading Spinner"
            data-testid="loader"
          />
        </div>
      )
}

export default Loader