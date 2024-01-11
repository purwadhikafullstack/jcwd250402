import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import api from "../api";
import usePropertyDeleteModal from "../components/hooks/usePropertyDeleteModal.js";
import { Menu, Button, Box, LoadingOverlay } from "@mantine/core";

const PropertiesDashboard = ({ setActiveMenuItem }) => {
  const [propertiesData, setPropertiesData] = useState([]);
  const propertyDeleteModal = usePropertyDeleteModal();
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchPropertiesData = async () => {
      setIsLoading(true);
      try {
        const token = localStorage.getItem("token");
        const response = await api.get(`/property/tenant/`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        const data = await response.data;

        if (response.status === 200) {
          setPropertiesData(data.Properties);
        }
      } catch (error) {
        console.error("Error fetching properties:", error.message);
      } finally {
        setIsLoading(false);
      }
    };
    fetchPropertiesData();
  }, []);

  return (
    <Box className="">
      <LoadingOverlay visible={isLoading} zIndex={10000000000000} />
      {propertiesData && propertiesData.length > 0 ? (
        <Box>
          <div className="flex justify-between mb-8">
            <h1 className="mb-4 text-3xl font-normal">Properties</h1>
            <button
              className="px-3 py-3 font-bold text-white rounded-lg bg-primary hover:bg-primary/70"
              onClick={() => {
                navigate("/tenant/dashboard/create-property");
              }}
            >
              Create Property
            </button>
          </div>
          <table className="w-full ml-4">
            <thead>
              <tr>
                <th className="px-4 py-2 border-gray-200">Name</th>
                <th className="px-4 py-2 border-gray-200">Location</th>
                <th className="px-4 py-2 border-gray-200">Category</th>
                <th className="px-4 py-2 border-gray-200">Actions</th>
              </tr>
            </thead>
            <tbody>
              {propertiesData.map((property) => (
                <tr key={property.id} className="border-b hover:bg-primary/10">
                  <td className="items-center justify-center py-2 border-gray-200">
                    <div className="flex items-center justify-start ml-2 gap-x-4">
                      <img
                        className="object-fill rounded-lg w-14 h-14"
                        src={`https://jcwd250402.purwadhikabootcamp.com/api/property-asset/${property.coverImage}`}
                        alt="property"
                      />
                      <div
                        onClick={() => navigate(`/property/${property.id}`)}
                        className="cursor-pointer hover:text-primary"
                      >
                        {property.name}
                      </div>
                    </div>
                  </td>
                  <td className="flex flex-row items-center justify-center px-4 py-2 border-gray-200">
                    {property.categories[0]
                      ? `${property.categories[0].city}, ${property.categories[0].country}, `
                      : "N/A"}
                  </td>
                  <td className="items-center justify-center px-4 py-2 text-center border-gray-200">
                    {property.categories[0]
                      ? `${property.categories[0].propertyType
                          .charAt(0)
                          .toUpperCase()}${property.categories[0].propertyType.slice(
                          1
                        )}`
                      : "N/A"}
                  </td>
                  <td className="flex flex-row items-center justify-center px-4 py-3.5 border-gray-200">
                    <div className="items-center">
                      <Menu shadow="md" width={200} color="#0256EE" radius={""}>
                        <Menu.Target>
                          <Button>Manage</Button>
                        </Menu.Target>
                        <Menu.Dropdown>
                          <Menu.Item>
                            <Link to={`/edit-property/${property.id}`}>
                              Edit Property
                            </Link>
                          </Menu.Item>
                          <Menu.Item
                            color="red"
                            onClick={() => {
                              propertyDeleteModal.setPropertyId(property.id);
                              propertyDeleteModal.onOpen();
                            }}
                          >
                            Delete Property
                          </Menu.Item>
                        </Menu.Dropdown>
                      </Menu>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </Box>
      ) : (
        <div></div>
      )}
    </Box>
  );
};

export default PropertiesDashboard;
