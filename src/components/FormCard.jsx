import React, { useState } from "react";
import FormControl from "@mui/joy/FormControl";
import FormLabel from "@mui/joy/FormLabel";
import { Select, Option, Button, Alert } from "@mui/joy";
import Input from "@mui/joy/Input";
import { getNames, getCode } from "country-list";
import Flag from "react-world-flags";
import axios from "axios";

function FormCard({ reload, setReload }) {
  const [name, setName] = useState("");
  const [age, setAge] = useState("");
  const [gender, setGender] = useState("");
  const [delegation, setDelegation] = useState("");
  const [country, setCountry] = useState("");
  const countryList = getNames();
  const [status, setStatus] = useState();
  const [loading, setLoading] = useState(false);

  const handleSubmit = () => {
    setLoading(true);
    if (
      name === "" ||
      age === "" ||
      gender === "" ||
      delegation === "" ||
      country === ""
    ) {
      setLoading(false);
      return;
    }

    axios
      .post("https://employee-api-tan.vercel.app/api/employees", {
        name: name,
        age: age,
        country: country,
        delegation: delegation,
        gender: gender,
      })
      .then(() => {
        setStatus({ color: "success", message: "Succesfully Added" });
        setLoading(false);
        setCountry("");
        setAge("");
        setName("");
        setGender("");
        setDelegation("");
        setTimeout(() => {
          setStatus(undefined);
        }, 2000);
        setReload(!reload);
      })
      .catch((e) => {
        setStatus({ color: "danger", message: e.message });
        setLoading(false);
        setTimeout(() => {
          setStatus(undefined);
        }, 2000);
      });
  };

  return (
    <form>
      {!status ? (
        <></>
      ) : (
        <Alert variant={"soft"} color={status.color}>
          {status.message}
        </Alert>
      )}
      <FormControl sx={{ margin: "10px 0px 10px 0px" }}>
        <FormLabel>Fullname</FormLabel>
        <Input
          required={true}
          onChange={(e) => setName(e.target.value)}
          value={name}
          placeholder="Type in here…"
          variant="outlined"
          color="neutral"
          type={"text"}
        />
      </FormControl>
      <FormControl sx={{ margin: "10px 0px 10px 0px" }}>
        <FormLabel>Age</FormLabel>
        <Input
          required={true}
          onChange={(e) => setAge(e.target.value)}
          value={age}
          placeholder="Type in here…"
          variant="outlined"
          color="neutral"
          type={"number"}
        />
      </FormControl>
      <FormControl sx={{ margin: "10px 0px 10px 0px" }}>
        <FormLabel>Gender</FormLabel>
        <Select
          onChange={(e, newValue) => setGender(newValue)}
          placeholder="Choose Gender"
          defaultValue={gender}
        >
          <Option value={"Male"}>Male</Option>
          <Option value="Female">Female</Option>
          <Option value="Others">Others</Option>
        </Select>
      </FormControl>
      <FormControl sx={{ margin: "10px 0px 10px 0px" }}>
        <FormLabel>Delegation</FormLabel>
        <Input
          required={true}
          onChange={(e) => setDelegation(e.target.value)}
          value={delegation}
          placeholder="Type in here…"
          variant="outlined"
          color="neutral"
          type={"text"}
        />
      </FormControl>
      <FormControl sx={{ margin: "10px 0px 10px 0px" }}>
        <FormLabel>Country</FormLabel>
        <Select
          onChange={(e, newValue) => setCountry(newValue)}
          placeholder="Choose country"
        >
          {countryList.map((country, key) => (
            <Option
              style={{
                display: "flex",
                justifyContent: "start",
                alignItems: "center",
                gap: 10,
                float: "right",
              }}
              key={key}
              value={country}
            >
              <Flag height={"10"} code={getCode(country)} /> {country}
            </Option>
          ))}
        </Select>
      </FormControl>
      <FormControl onClick={handleSubmit} sx={{ margin: "10px 0px 10px 0px" }}>
        <Button loading={loading}>Add Employee</Button>
      </FormControl>
    </form>
  );
}

export default FormCard;
