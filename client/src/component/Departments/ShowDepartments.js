import React, { useEffect, useState } from "react";
import { getdepartments } from "../../API/department_calls";
import { toast } from "react-toastify";
import ListData from "./ListData";
// import { loadingSvg } from "../../assets/icons";
import SvgLoading from "../spinners/SvgLoading";
const ShowDepartments = () => {
  const [data, setdata] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    getData();
  }, []);

  const notify = (msg, type) =>
    toast(msg, { position: "top-center", type: type });

  const getData = async () => {
    setLoading(true);
    await getdepartments()
      .then((res) => {
        setdata(res.data);
      })
      .catch((error) => {
        notify(error.response.data.message, "error");
      });
    setLoading(false);
  };

  if (loading) {
    return (
      <div className="w-full">
        <SvgLoading />
      </div>
    );
  }
  return (
    <div className="py-3 relative overflow-hidden">
      {data.length > 0 && <ListData data={data} />}
    </div>
  );
};

export default ShowDepartments;
