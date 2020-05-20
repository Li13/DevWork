import React, { useState } from "react";
import { Input, AutoComplete } from "antd";

const searchResult = (query: string) => {
  return [];
};

function Search(props: { className?: string }) {
  const [options, setOptions] = useState([]);

  const handleSearch = (value: string) => {
    setOptions(value ? searchResult(value) : []);
  };

  const onSelect = (value: string) => {
    console.log("onSelect", value);
  };

  return (
    <AutoComplete
      {...props}
      dropdownMatchSelectWidth={252}
      style={{ width: 300 }}
      options={options}
      onSelect={onSelect}
      onSearch={handleSearch}
    >
      <Input.Search placeholder="input here" />
    </AutoComplete>
  );
}

export default Search;
