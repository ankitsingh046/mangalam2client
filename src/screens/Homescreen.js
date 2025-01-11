import React, { useEffect, useState } from "react";
import axios from "axios";
import { DatePicker } from "antd";
import moment from "moment";
import Room from "../components/Room";
import Loader from "../components/Loader";
import Error from "../components/Error";

function Homescreen() {
  const { RangePicker } = DatePicker;
  const [rooms, setRooms] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);
  const [fromDate, setFromDate] = useState();
  const [toDate, setToDate] = useState();

  useEffect(() => {
    async function fetchRooms() {
      try {
        setLoading(true);
        const data = (await axios.get(`${process.env.REACT_APP_API_KEY}/api/rooms/getallrooms`)).data;
        setRooms(data);
        setLoading(false);
      } catch (error) {
        console.log(error);
        setError(error);
        setLoading(false);
      }
    }
    fetchRooms();
  }, []);

  const handleFilterByDate = (datess) => {
    setFromDate(moment(datess[0].$d).format("DD-MM-YYYY"));
    setToDate(moment(datess[1].$d).format("DD-MM-YYYY"));
  };

  return (
    <div div className='container '>
      <div className='row justify-content-center my-4'>
        <div className="col-md-7 bs px-4 py-3">
        <div className='col-md-3'>
          <RangePicker format={"DD-MM-YYYY"} onChange={handleFilterByDate}
           />
        </div>

        <div className='col-md-3'></div>
        <div className='col-md-3'></div>
        </div>
      </div>
      <div class='row justify-content-center my-4'>
        {loading ? (
          <Loader />
        ) : rooms?.length > 0 ? (
          Array.isArray(rooms) &&
          rooms?.map((room) => {
            return (
              <div className='col-md-7 mx-4 my-3' key={room._id}>
                <Room room={room} fromDate={fromDate} toDate={toDate} />
              </div>
            );
          })
        ) : (
          error && <Error />
        )}
      </div>
    </div>
  );
}

export default Homescreen;
