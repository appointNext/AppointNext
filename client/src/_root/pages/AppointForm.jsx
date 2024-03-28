import React, { useState, useEffect } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { Calendar, momentLocalizer } from "react-big-calendar";
import moment from "moment";
import "react-big-calendar/lib/css/react-big-calendar.css";

const localizer = momentLocalizer(moment);

const AppointForm = () => {
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [appointments, setAppointments] = useState([]);

  useEffect(() => {
    // Fetch doctor's appointments for the selected date from backend
    fetchAppointments(selectedDate);
  }, [selectedDate]);

  const fetchAppointments = async (date) => {
    try {
      // Perform API call to fetch appointments for the selected date
      // Example: const response = await fetch(`/api/appointments?date=${date}`);
      // const data = await response.json();
      // setAppointments(data.appointments);
      // Replace the above lines with your actual API call
      const mockAppointments = [
        {
          id: 1,
          title: "Appointment 1",
          start: new Date(moment(date).set({ hour: 9, minute: 0 })),
          end: new Date(moment(date).set({ hour: 10, minute: 0 })),
        },
        {
          id: 2,
          title: "Appointment 2",
          start: new Date(moment(date).set({ hour: 10, minute: 30 })),
          end: new Date(moment(date).set({ hour: 11, minute: 30 })),
        },
        // Add more mock appointments as needed
      ];
      setAppointments(mockAppointments);
    } catch (error) {
      console.error("Error fetching appointments:", error);
    }
  };

  const handleDateChange = (date) => {
    setSelectedDate(date);
  };

  return (
    <div className="flex justify-center items-center h-screen">
      <div className="w-1/2 p-4">
        <h2 className="text-2xl mb-4">Select Date:</h2>
        <DatePicker
          selected={selectedDate}
          onChange={handleDateChange}
          dateFormat="dd/MM/yyyy"
          className="p-2 border border-gray-300 rounded"
        />
      </div>
      <div className="w-1/2 p-4">
        <h2 className="text-2xl mb-4">Doctor's Appointments:</h2>
        <Calendar
          localizer={localizer}
          events={appointments}
          startAccessor="start"
          endAccessor="end"
          style={{ height: 500 }}
          className="border border-gray-300 rounded p-4"
        />
      </div>
    </div>
  );
};

export default AppointForm;
