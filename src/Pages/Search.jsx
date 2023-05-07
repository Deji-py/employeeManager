import { Button, Input } from "@mui/joy";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { MdSearch } from "react-icons/md";
import EmployeeCard from "../components/EmployeeCard";

function Search() {
  const [result, setResult] = useState([]);
  const [all, setAll] = useState();

  const [string, setString] = useState("");

  useEffect(() => {
    axios
      .get("https://employee-api-tan.vercel.app/api/employees")
      .then((doc) => {
        setAll(doc.data);
      })
      .catch((e) => console.log(e.message));
  }, []);

  const handleSearch = () => {
    axios
      .get("https://employee-api-tan.vercel.app/api/employees/" + string)
      .then((doc) => {
        setResult(doc.data);
        console.log(result);
      })
      .catch((e) => console.log(e.message));
  };

  useEffect(() => {
    handleSearch();
  }, [string]);

  return (
    <div style={{ width: "100vw" }}>
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          marginTop: 20,
          width: "100%",
        }}
      >
        <Input
          sx={{ width: "92%" }}
          placeholder="search name here"
          startDecorator={<MdSearch />}
          onChange={(e) => setString(e.target.value)}
          value={string}
          endDecorator={<Button onClick={handleSearch}>Search</Button>}
        />
      </div>

      <div>
        {result?.length === all?.length ? (
          <div
            style={{
              width: "100w",
              height: "100vh",
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <p>No result found</p>
          </div>
        ) : (
          <div className="grid" style={{ padding: 20 }}>
            {result.map((item, key) => (
              <EmployeeCard
                name={item.name}
                age={item.age}
                key={key}
                country={item.country}
                delegation={item.delegation}
              />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

export default Search;
