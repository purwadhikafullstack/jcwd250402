import { useState, useEffect, useRef } from "react";
import api from "../api";
import { Select, Loader, Tabs } from "@mantine/core";
import getRoomsAndPropertiesData from "../actions/getRoomsAndPropertiesData.js";
import { PiCoinsLight } from "react-icons/pi";
import { toast } from "sonner";
import Chart from "chart.js/auto";
import { Line } from "react-chartjs-2";
import months from "../constants/months";
import { useNavigate } from "react-router-dom";
import { IoPeople } from "react-icons/io5";
import { CiImageOn } from "react-icons/ci";
import { FiEye } from "react-icons/fi";
import useProofImageModal from "../components/hooks/useProofImageModal";

export default function Analytics() {
  const navigate = useNavigate();
  const proofImageModal = useProofImageModal();
  const [bookingData, setBookingData] = useState([]);
  const [selectedPropertyName, setSelectedPropertyName] = useState("");
  const [propertiesData, setPropertiesData] = useState([]);
  const [earningsData, setEarningsData] = useState([]);
  const [totalEarnings, setTotalEarnings] = useState(0);
  const [selectedPropertyId, setSelectedPropertyId] = useState(1);
  const [loading, setLoading] = useState(true);
  const [viewCount, setViewCount] = useState(0);
  const [totalBookings, setTotalBookings] = useState(0);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const properties = await getRoomsAndPropertiesData();
        setPropertiesData(properties.Property);
        if (properties.Property.length > 0) {
          setSelectedPropertyName(properties.Property[0].propertyName);
        }
      } catch (error) {
        toast.error(error.response.data.message);
      }
    };

    fetchData();
  }, []);

  const uniquePropertyNames = [
    ...new Set(propertiesData.map((property) => property.propertyName)),
  ];

  const handleSelectChange = (value) => {
    setSelectedPropertyName(value);
    const property = propertiesData.find(
      (property) => property.propertyName === value
    );
    if (property) {
      setSelectedPropertyId(property.id);
    }
  };

  useEffect(() => {
    const getEarningsData = async () => {
      try {
        setLoading(true);
        const response = await api.get(
          `booking/earnings/${selectedPropertyId}`,
          {
            headers: {
              Authorization: `Bearer ${localStorage.getItem("token")}`,
            },
          }
        );

        if (response.status === 200) {
          const allEarnings = response.data.earnings.reduce(
            (acc, current) => acc.concat(current.earnings),
            []
          );

          setEarningsData(allEarnings);
          setTotalEarnings(response.data.totalEarnings);
          setBookingData(response.data.earnings);
          setViewCount(response.data.viewCount);
          setTotalBookings(response.data.totalBookings);
        }
      } catch (error) {
        console.log(error.response.data.message);
      } finally {
        setLoading(false);
      }
    };

    getEarningsData();
  }, [selectedPropertyId]);

  const formatTotalEarnings = () => {
    return totalEarnings.toLocaleString("id-ID", {
      style: "currency",
      currency: "IDR",
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
      currencyDisplay: "code",
    });
  };

  const labels = months;

  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: "top",
      },
      title: {
        display: true,
      },
    },
    scales: {
      x: {
        type: "category",
        labels: labels,
      },
      y: {
        type: "linear",
        beginAtZero: true,
      },
    },

    maintainAspectRatio: false,
  };

  const data = {
    labels,
    datasets: [
      {
        label: `Total Earnings of ${selectedPropertyName} (IDR)`,
        data: earningsData,
        fill: true,
        borderColor: "#0256EE",
        backgroundColor: "rgba(2, 86, 238, 0.2)",
      },
    ],
  };

  const formateDate = (date) => {
    const d = new Date(date);
    return d.toLocaleDateString("id-ID", {
      day: "numeric",
      month: "numeric",
      year: "numeric",
    });
  };

  const formatDateShort = (date) => {
    const d = new Date(date);
    return d.toLocaleDateString("en-ID", {
      day: "numeric",
      month: "short",
    });
  };

  const priceFormatter = (price) => {
    return new Intl.NumberFormat("id-ID", {
      style: "currency",
      currency: "IDR",
      minimumFractionDigits: 0,
    }).format(price);
  };

  return (
    <div>
      <div className="flex flex-col w-full p-4 gap-y-4">
        <div className="flex justify-between mb-8">
          <h1 className="ml-2 text-3xl font-normal ">Reports</h1>
        </div>
        <div>
          <Select
            label="Select Property"
            placeholder="Select Property"
            data={uniquePropertyNames}
            searchable
            value={selectedPropertyName}
            onChange={handleSelectChange}
            className="w-[25%]"
          />
        </div>
      </div>

      {loading ? (
        <div className="flex items-center justify-center w-full h-full">
          <Loader size={50} />
        </div>
      ) : (
        <div>
          <div className="flex flex-row justify-between p-4 border-2 rounded-lg">
            <div className="flex flex-col p-2 mt-2 gap-x-4">
              <div className="flex flex-col">
                <div className="flex flex-row gap-x-2">
                  <PiCoinsLight size={32} className="text-primary" />
                  <span className="text-2xl ">Earnings</span>
                </div>
                <div className="flex flex-col p-4 gap-y-2">
                  <span className="text-2xl font-bold">Total Earnings </span>
                  <span className="text-xl">{formatTotalEarnings()}</span>
                </div>
                <div className="flex flex-col p-4 gap-y-2">
                  <span className="text-2xl font-bold">Total Bookings </span>
                  <span className="text-xl">{totalBookings}</span>
                </div>
              </div>
              <div className="flex flex-col p-2 mt-2 gap-x-4">
                <div className="flex flex-row gap-x-2">
                  <FiEye size={32} className="text-[#9B02EE]" />
                  <span className="text-2xl text-[#9B02EE]">Views</span>
                </div>
                <div className="flex flex-col p-4 gap-y-2">
                  <span className="text-2xl font-bold">Total Views </span>
                  <span className="text-xl">{viewCount}</span>
                </div>
              </div>
            </div>
            <div className="h-[40vh] w-[100vh]">
              <Line data={data} options={options} />
            </div>
          </div>
        </div>
      )}

      {bookingData && bookingData.length === 0 ? (
        <tbody className="flex items-center justify-center w-full h-full p-4 mt-4">
          <p className="text-xl font-semibold text-center">No Data Available</p>
        </tbody>
      ) : (
        <table className="w-full mt-6">
          <thead>
            <tr>
              <th className="">Guest</th>
              <th className="">
                <IoPeople />
              </th>
              <th className="">Reserved</th>
              <th className="">Property</th>
              <th className="">Stay date</th>
              <th className="">Total</th>
              <th className="">Proof</th>
            </tr>
          </thead>

          <tbody className="">
            {bookingData.map((booking) => (
              <tr key={booking.id} className="border-b hover:bg-primary/10">
                {/* RENTER NAME */}
                <td className="py-2 text-center border-gray-200 ">
                  {booking.renter}
                </td>
                {/* GUEST COUNT */}
                <td className="py-2 text-center border-gray-200 ">
                  {booking.guestCount}
                </td>
                {/* RESERVED DATE */}
                <td className="py-2 text-center border-gray-200 ">
                  {formateDate(booking.reservedAt)}
                </td>
                {/* PROPERTY NAME */}
                <td
                  onClick={() => navigate(`/property/${booking.propertyId}`)}
                  className="py-2 text-center border-gray-200 cursor-pointer hover:text-primary"
                >
                  {booking.property}
                </td>
                {/* STAY DATE */}
                <td className="py-2 text-center border-gray-200 ">
                  {formatDateShort(booking.startDate)} -{" "}
                  {formatDateShort(booking.endDate)}
                </td>
                {/* TOTAL PRICE */}
                <td className="py-2 text-center border-gray-200 ">
                  {priceFormatter(booking.earnings)}
                </td>
                {/* PROOF OF PAYMENT */}
                <td className="py-2 text-center border-gray-200 hover:text-primary hover:cursor-pointer">
                  {booking.paymentProof && (
                    <button
                      onClick={() => {
                        proofImageModal.setImageUrl(booking.paymentProof);
                        proofImageModal.onOpen();
                      }}
                    >
                      <CiImageOn size={32} />
                    </button>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
}
