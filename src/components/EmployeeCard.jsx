import React, { useState } from "react";
import { Avatar, IconButton } from "@mui/material";
import { MdDelete } from "react-icons/md";
import { getCode } from "country-list";
import Flag from "react-world-flags";
import { ToastContainer, toast } from "react-toast";
import axios from "axios";
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

  return (
    <div className="card">
      <div
        style={{
          display: show && "block",
        }}
      >
        <ToastContainer />
      </div>
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
            justifyContent: "start",
            alignItems: "center",
            gap: 10,
            float: "right",
          }}
        >
          <Flag height={"20"} code={getCode(country)} />
          {country}
        </p>
      </div>
    </div>
  );
}

export default EmployeeCard;
