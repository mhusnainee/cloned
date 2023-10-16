import React from "react";
import { Link } from "react-router-dom";

const NotRestrictedPage = () => {
  return (
    <div className="w-full h-screen flex items-center justify-center flex-col space-y-4">
      You not authorized to visit this page.
      <Link
        to="/"
        className="text-white mt-4 bg-blue-700 hover:bg-blue-800 focus:ring-4 text-center focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-4 py-2.5  items-center w-[200px] "
      >
        Back to Safe Zone
      </Link>
    </div>
  );
};

export default NotRestrictedPage;
