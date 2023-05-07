import React, { useEffect, useState } from "react";
import EmployeeCard from "./components/EmployeeCard";
import "./App.css";
import axios from "axios";
import { Button, CircularProgress } from "@mui/joy";
import { MdError } from "react-icons/md";
import { AiOutlineRedo } from "react-icons/ai";
import FormCard from "./components/FormCard";
import { BsBoxes } from "react-icons/bs";

function App() {
  const [employees, setEmployees] = useState();
  const [error, setError] = useState(false);
  const [errorMessage, setErrorMassage] = useState("");
  const [loading, setLoading] = useState(false);
  const [reload, setReload] = useState(false);

  const fetchEmployees = () => {
    setLoading(true);
    axios
      .get("https://employee-api-tan.vercel.app/api/employees")
      .then((doc) => {
        setEmployees(doc.data);
        setLoading(false);
        setError(false);
      })
      .catch((e) => {
        setLoading(false);
        console.log(e.message);
        setErrorMassage(e.message);
        setError(true);
      });
  };

  useEffect(() => {
    fetchEmployees();
  }, [reload]);

  return (
    <div
      className="flex main"
      style={{
        padding: "0px 20px 20px 20px",
        gap: "50px",
      }}
    >
      <div className="sideBar">
        <p
          style={{
            fontSize: "1.5em",
          }}
        >
          Add Employees
        </p>
        <FormCard reload={reload} setReload={setReload} />
      </div>
      <div
        style={{
          flex: "auto",
        }}
      >
        <h1>My Employees</h1>

        <div style={{ height: "100%" }}>
          {loading ? (
            <div
              style={{
                width: "100%",
                height: "100%",
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <CircularProgress />
            </div>
          ) : (
            <>
              {error ? (
                <div
                  style={{
                    width: "100%",
                    height: "100%",
                    display: "flex",
                    flexDirection: "column",
                    justifyContent: "center",
                    alignItems: "center",
                    color: "gray",
                  }}
                >
                  <MdError size={50} color="gray" />
                  <div>{errorMessage}</div>
                  <Button
                    onClick={() => setReload(!reload)}
                    variant="outlined"
                    color="neutral"
                    endDecorator={<AiOutlineRedo />}
                    sx={{ marginTop: 5, color: "gray" }}
                  >
                    Retry
                  </Button>
                </div>
              ) : (
                <>
                  {!employees ? (
                    <></>
                  ) : (
                    <>
                      {employees.length === 0 ? (
                        <div
                          style={{
                            width: "100%",
                            height: "100%",
                            display: "flex",
                            flexDirection: "column",
                            justifyContent: "center",
                            alignItems: "center",
                            color: "gray",
                          }}
                        >
                          <BsBoxes size={50} />
                          <p>No Employees added</p>
                        </div>
                      ) : (
                        <div className="grid">
                          {employees.map((employee, key) => (
                            <EmployeeCard
                              reload={reload}
                              id={employee._id}
                              setReload={setReload}
                              key={key}
                              name={employee.name}
                              age={employee.age}
                              country={employee.country}
                              gender={employee.gender}
                              delegation={employee.delegation}
                            />
                          ))}
                        </div>
                      )}
                    </>
                  )}
                </>
              )}
            </>
          )}
        </div>
      </div>
    </div>
  );
}

export default App;
