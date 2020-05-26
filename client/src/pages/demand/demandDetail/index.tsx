import React from "react";
import { Input } from "antd";
import GanttChart from "@/components/GanttChart";
import "./index.css";

function demandDetail() {
  return (
    <div className="pop-left-detail">
      {/* <div className="pop-left-detail-title">
        <Input placeholder="请输入标题" />
      </div> */}
      {/* <div className="pop-left-detail-title"></div> */}
      <GanttChart />
    </div>
  );
}

export default demandDetail;
