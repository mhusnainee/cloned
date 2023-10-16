import React, { useState, useEffect } from "react";
import Roster from "../component/Roster";
import { get_users } from "../auth/authService";
import HrTable from "../component/HrTable";
import SvgLoading from "../component/spinners/SvgLoading";
import { getdepartments } from "../API/department_calls";

const Panel = () => {
  const [data, setdata] = useState([]);
  const [selectedPerson, setselectedPerson] = useState();
  const [loading, setLoading] = useState(true);
  const [reload, setReload] = useState(0);
  const [departmentData, setDepartmentData] = useState([]);

  useEffect(() => {
    getData();
  }, [reload]);

  const getData = async () => {
    setLoading(true);
    await getdepartments().then((res) => {
      setDepartmentData(res.data);
    });
    await get_users().then((ress) => {
      setdata(ress.data);
      if (selectedPerson) {
        ress.data.forEach((item) => {
          if (item.email === selectedPerson.email) {
            setselectedPerson(item);
          }
        });
      }
    });
    setLoading(false);
  };

  if (loading) {
    return (
      <div className="w-full md:w-[750px]">{loading && <SvgLoading />}</div>
    );
  }

  if ((!loading && data.length === 0) || departmentData.length === 0) {
    return <h1>No users found, please add users first.</h1>;
  }

  return (
    <>
      {selectedPerson && (
        <Roster
          selectedPerson={selectedPerson}
          setselectedPerson={setselectedPerson}
          setReload={setReload}
        />
      )}

      {!selectedPerson && data.length > 0 && (
        <HrTable
          data={data}
          setselectedPerson={setselectedPerson}
          departmentData={departmentData}
          setReload={setReload}
        />
      )}
    </>
  );
};

export default Panel;
