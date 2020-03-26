import React from "react";
import { Button } from "antd";
import axios from "../../store/fetch";

function Demand() {
  const fetch = () => {
    axios.get("demand", { data: { id: 1 } }).then((res) => {
      console.log(res)
    });
  };

  return (
    <div className="App">
      <Button onClick={fetch}>click fetch</Button>
    </div>
  );
}

export default Demand;
