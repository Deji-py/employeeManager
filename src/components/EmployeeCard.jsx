import React, { useState } from "react";
import { Avatar, IconButton } from "@mui/material";
import { MdCancel, MdDelete, MdEdit } from "react-icons/md";
import Flag from "react-world-flags";
import FormControl from "@mui/joy/FormControl";
import FormLabel from "@mui/joy/FormLabel";
import { getNames, getCode } from "country-list";
import { ToastContainer, toast } from "react-toast";
import axios from "axios";
import { Button, CircularProgress, Input, Option, Select } from "@mui/joy";
function EmployeeCard({
  setReload,
  reload,
  name,
  age,
  gender,
  delegation,
  country,
  id,
}) {
  const [show, setShow] = useState(false);
  const [editMode, setEditMode] = useState(false);
  const [newname, setNewname] = useState(name);
  const [newage, setNewAge] = useState(age);
  const [newgender, setNewGender] = useState(gender);
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");
  const [error, setError] = useState(false);
  const countryList = getNames();
  const [newdelegation, setNewDelegation] = useState(delegation);
  const [newcountry, setNewCountry] = useState(country);
  const successToast = (message) =>
    toast(message, {
      backgroundColor: "black",
      color: "#ffffff",
    });

  const errorToast = (message) =>
    toast(message, {
      backgroundColor: "darkred",
      color: "#ffffff",
    });
  const handleDelete = () => {
    axios
      .delete("https://employee-api-tan.vercel.app/api/employees/" + id)
      .then(() => {
        setShow(true);
        successToast("Deleted Succesfully");
        setTimeout(() => {
          setReload(!reload);
          setShow(false);
        }, [500]);
      })
      .catch((e) => {
        errorToast(e.message);
        setTimeout(() => {
          setShow(true);
        }, [500]);
      });
  };

  const handleUpdate = () => {
    setLoading(true);
    axios
      .patch("https://employee-api-tan.vercel.app/api/employees/" + id, {
        name: newname,
        age: newage,
        country: newcountry,
        delegation: newdelegation,
        gender: newgender,
      })
      .then(() => {
        setLoading(false);
        setError(false);
        setReload(!reload);
      })
      .catch((e) => {
        setLoading(false);
        setError(true);
        setMessage(e.message);
      });
  };

  return (
    <div className="card">
      <div
        style={{
          display: show && "block",
        }}
      >
        <ToastContainer />
      </div>

      {editMode ? (
        <div>
          <IconButton onClick={() => setEditMode(false)}>
            <MdCancel />
          </IconButton>
          <Input
            type="text"
            value={newname}
            sx={{ marginTop: 2 }}
            placeholder="Fullname"
            onBlur={() => newname === "" && setNewname(name)}
            onChange={(e) => setNewname(e.target.value)}
          />
          <Input
            type="number"
            value={newage}
            placeholder="Age"
            sx={{ marginTop: 2 }}
            onBlur={() => newage === "" && setNewAge(age)}
            onChange={(e) => setNewAge(e.target.value)}
          />
          <Select
            sx={{ marginTop: 2 }}
            onChange={(e, newValue) => setNewGender(newValue)}
            defaultValue={newgender}
          >
            <Option value={"Male"}>Male</Option>
            <Option value={"Female"}>Female</Option>
            <Option value={"Others"}>Others</Option>
          </Select>
          <Input
            type="text"
            value={newdelegation}
            placeholder="Delegation"
            sx={{ marginTop: 2 }}
            onBlur={() => newdelegation === "" && setNewDelegation(delegation)}
            onChange={(e) => setNewDelegation(e.target.value)}
          />
          <FormControl sx={{ margin: "10px 0px 10px 0px" }}>
            <Select
              onChange={(e, newValue) => setNewCountry(newValue)}
              placeholder="Choose country"
              defaultValue={newcountry}
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
          <Button
            loading={loading}
            onClick={handleUpdate}
            sx={{ width: "100%", background: error ? "red" : "black" }}
          >
            {error ? message + " -Retry" : "Update"}
          </Button>
        </div>
      ) : (
        <>
          <div className="flex justify-between">
            <Avatar src={name} alt={name} sx={{ width: 60, height: 60 }} />
            <IconButton onClick={handleDelete}>
              <MdDelete />
            </IconButton>
          </div>
          <div className="text-start">
            <p>{"name: " + name}</p>
            <p>{"Age: " + age}</p>
            <p>{"Gender: " + gender}</p>
            <p>{"Delegetion: " + delegation}</p>
            <p
              style={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                gap: 10,
              }}
            >
              <IconButton onClick={() => setEditMode(true)}>
                <MdEdit />
              </IconButton>
              <div
                style={{
                  display: "flex",
                  justifyContent: "start",
                  alignItems: "center",
                  gap: 10,
                }}
              >
                <Flag height={"20"} code={getCode(country)} />
                {country}
              </div>
            </p>
          </div>
        </>
      )}
    </div>
  );
}

export default EmployeeCard;
