import format from "date-fns/format";
import getDay from "date-fns/getDay";
import parse from "date-fns/parse";
import startOfWeek from "date-fns/startOfWeek";
import React, { useState, useEffect } from "react";
import { Calendar, dateFnsLocalizer } from "react-big-calendar";
import "react-big-calendar/lib/css/react-big-calendar.css";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { toast } from "sonner";
import api from "../api";
import { Tabs, Select, Box, LoadingOverlay } from "@mantine/core";
import getRoomsAndPropertiesData from "../actions/getRoomsAndPropertiesData.js";

const locales = {
  "id-ID": require("date-fns/locale/id"),
};

const localizer = dateFnsLocalizer({
  format,
  parse,
  startOfWeek,
  getDay,
  locales,
});

const TenantCalendar = ({ value, onChange, disabledDates }) => {
  const [newEvent, setNewEvent] = useState({ price: 0, start: "", end: "" });
  const [specialPriceDate, setSpecialPriceDate] = useState([]);
  const [disabledDate, setDisabledDate] = useState([]);
  const [propertiesData, setPropertiesData] = useState([]);
  const [selectedPropertyName, setSelectedPropertyName] = useState("");
  const [selectedPropertyId, setSelectedPropertyId] = useState(0);
  const [isLoading, setIsLoading] = useState(false);

  const handleAddDisabledDate = async () => {
    const token = localStorage.getItem("token");
    if (!newEvent.start || !newEvent.end) {
      toast.error("Please fill in all fields");
      return;
    }
    setIsLoading(true);
    try {
      const response = await api.post(
        `/date/disabled/create/${selectedPropertyId}`,
        {
          startDate: newEvent.start,
          endDate: newEvent.end,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      if (response.status === 201) {
        toast.success("Successfully set this date as unavailable");
      }
    } catch (error) {
      toast.error(error.response.data.message);
    } finally {
      setIsLoading(true);
    }
  };

  const handleAddSpecialDate = async () => {
    const token = localStorage.getItem("token");
    if (
      !newEvent.price ||
      !newEvent.price === 0 ||
      !newEvent.start ||
      !newEvent.end
    ) {
      toast.error("Please fill in all fields");
      return;
    }
    setIsLoading(true);
    try {
      const response = await api.post(
        `/date/special/create/${selectedPropertyId}`,
        {
          startDate: newEvent.start,
          endDate: newEvent.end,
          price: newEvent.price,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
          "content-type": "application/json",
        }
      );
      if (response.status === 201) {
        toast.success("Successfully set a special price for this date");
      }
    } catch (error) {
      toast.error(error.response.data.message);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);
      try {
        const properties = await getRoomsAndPropertiesData();
        setPropertiesData(properties.Property);
        if (properties.Property.length > 0) {
          setSelectedPropertyName(properties.Property[0].propertyName);
        }
      } catch (error) {
        toast.error(error.response.data.message);
      } finally {
        setIsLoading(false);
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
    const getSpecialData = async () => {
      try {
        const response = await api.get(`/date/special/${selectedPropertyId}`);

        if (response.status === 200) {
          setSpecialPriceDate(response.data.specialDates);
        }
      } catch (error) {
        console.error(error.response.data.message);
      } finally {
      }
    };
    getSpecialData();
  }, [selectedPropertyId, specialPriceDate]);

  useEffect(() => {
    const getDisabledDates = async () => {
      try {
        const response = await api.get(`/date/disabled/${selectedPropertyId}`);

        if (response.status === 200) {
          setDisabledDate(response.data.disabledDates);
        }
      } catch (error) {
        console.error(error.response.data.message);
      }
    };
    getDisabledDates();
  }, [selectedPropertyId, disabledDate]);

  const specialEvents = specialPriceDate
    ? specialPriceDate.map((specialDate) => ({
        id: specialDate.id,
        title: `Special Price: ${specialDate.price}`,
        start: new Date(specialDate.startDate),
        end: new Date(specialDate.endDate),
        type: "special",
      }))
    : [];

  const disabledEvents = disabledDate
    ? disabledDate.map((disabledDate) => ({
        id: disabledDate.id,
        title: "Unavailable",
        start: new Date(disabledDate.startDate),
        end: new Date(disabledDate.endDate),
        type: "disabled",
      }))
    : [];

  const combinedEvents = [...specialEvents, ...disabledEvents];

  const getEventStyle = (event, start, end, isSelected) => {
    let style = {};
    if (event.type === "special") {
      style = {
        backgroundColor: "#0256EE",
        color: "white",
        border: "1px solid #ccc",
      };
    } else if (event.type === "disabled") {
      style = {
        backgroundColor: "#000000",
        color: "white",
        border: "1px solid #ccc",
        opacity: 0.6,
      };
    }
    return { style };
  };

  return (
    <Box>
      <LoadingOverlay visible={isLoading} zIndex={100000000000000000} />
      <div className="w-full ml-8">
        <h1 className="w-full mb-4 text-2xl font-semibold">Calendar</h1>
        <div>
          <Select
            label="Select Property"
            data={uniquePropertyNames}
            searchable
            value={selectedPropertyName}
            onChange={handleSelectChange}
            className="w-1/4 mb-4"
          />
        </div>
        <Tabs defaultValue="setPrice">
          <Tabs.List>
            <Tabs.Tab value="setPrice">Set Price by Date</Tabs.Tab>
            <Tabs.Tab value="disableDate">Set Date Unavailable</Tabs.Tab>
          </Tabs.List>

          <Tabs.Panel value="setPrice">
            <div className="flex flex-row items-center justify-center w-full p-2 mt-2 gap-x-4">
              <div className="flex flex-col">
                <label htmlFor="">Price in IDR /Night</label>
                <input
                  type="number"
                  placeholder="Price in IDR"
                  value={newEvent.price}
                  onChange={(e) =>
                    setNewEvent({ ...newEvent, price: e.target.value })
                  }
                  className="p-2 border-2 border-gray-300 rounded-md"
                />
              </div>
              <div className="flex flex-col">
                <label htmlFor="">Start Date</label>
                <DatePicker
                  style={{ marginRight: "10px" }}
                  selected={newEvent.start}
                  placeholderText="Start Date"
                  onChange={(start) => setNewEvent({ ...newEvent, start })}
                  className="p-2 border-2 border-gray-300 rounded-md z-[5]"
                />
              </div>
              <div className="flex flex-col">
                <label htmlFor="">End Date</label>
                <DatePicker
                  placeholderText="End Date"
                  selected={newEvent.end}
                  onChange={(end) => setNewEvent({ ...newEvent, end })}
                  className="p-2 border-2 border-gray-300 rounded-md"
                />
              </div>
              <button
                stlye={{ marginTop: "10px" }}
                className="py-1.5 px-4 border rounded-md mt-5 bg-primary text-white"
                onClick={handleAddSpecialDate}
              >
                Set Price
              </button>
            </div>
          </Tabs.Panel>
          <Tabs.Panel value="disableDate">
            <div className="flex flex-row items-center justify-center p-2 mt-2 gap-x-4">
              <DatePicker
                placeholderText="Start Date"
                style={{ marginRight: "10px" }}
                selected={newEvent.start}
                onChange={(start) => setNewEvent({ ...newEvent, start })}
                className="p-2 border-2 border-gray-300 rounded-md"
              />
              <DatePicker
                placeholderText="End Date"
                selected={newEvent.end}
                onChange={(end) => setNewEvent({ ...newEvent, end })}
                className="p-2 border-2 border-gray-300 rounded-md"
              />
              <button
                stlye={{ marginTop: "10px" }}
                className="py-1.5 px-2 border rounded-md bg-primary text-white"
                onClick={handleAddDisabledDate}
              >
                Set Unavailable
              </button>
            </div>
          </Tabs.Panel>
        </Tabs>
        <Calendar
          style={{
            height: "85vh",
            margin: "50px",
            zIndex: 0,
            cursor: "pointer",
          }}
          localizer={localizer}
          events={combinedEvents}
          startAccessor="start"
          endAccessor="end"
          view={["month"]}
          eventPropGetter={getEventStyle}
        />
      </div>
    </Box>
  );
};

export default TenantCalendar;
