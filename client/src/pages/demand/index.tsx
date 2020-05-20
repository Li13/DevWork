import React, { useState, useEffect } from "react";
import { Table, Button } from "antd";
import DemandDetail from "./demandDetail";
import { getDemandList } from "@/store/fetch/demand";
import "./index.css";

function Page(props: any) {
  const [visible, setVisible] = useState(true);
  const [page, setPage] = useState(1);
  const [pageSize, setPageSize] = useState(10);

  const notificationOpen = () => {
    setVisible(!visible);
  };

  useEffect(() => {
    getDemandList({ page, pageSize }).then(res => {
      console.log(res);
    });
  });

  return (
    <div className="demand-list">
      <div className="list-search-form">
        <Button onClick={notificationOpen}>创建</Button>
      </div>
      <Table />
      {visible ? <DemandDetail /> : null}
    </div>
  );
}

export default Page;
