import React from "react";
import { Link } from "react-router-dom";

const PropertiesDashboard = () => {
  return (
    <div className="container mx-auto">
      <div className="flex justify-between mb-8">
        <h1 className="mb-4 text-3xl font-normal">Properties</h1>
        <Link
          to="/add-property"
          className="px-5 py-2 mt-4 font-bold text-white rounded-lg bg-primary hover:bg-primary/70"
        >
          Add Property
        </Link>
      </div>
      <table className="w-full ">
        <thead>
          <tr>
            <th className="px-4 py-2 border-gray-200">Name</th>
            <th className="px-4 py-2 border-gray-200">Location</th>
            <th className="px-4 py-2 border-gray-200">Category</th>
            <th className="px-4 py-2 border-gray-200">Last Modified</th>
          </tr>
        </thead>
        <tbody>
          <tr className="border-b">
            <td className="px-4 py-2 border-gray-200">
              Pine House 2 Bed Room + 2 Toilets
            </td>
            <td className="px-4 py-2 border-gray-200">
              Taito-ku, Tokyo-to, Japan
            </td>
            <td className="px-4 py-2 border-gray-200">Sharehouse</td>
            <td className="px-4 py-2 border-gray-200">3 days ago</td>
            <td className="px-4 py-2 border-gray-200"></td>
          </tr>
        </tbody>
      </table>
    </div>
  );
};

export default PropertiesDashboard;
