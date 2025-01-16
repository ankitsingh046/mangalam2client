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
  const [duplicateRooms, setDuplicateRooms] = useState([]);
  const [searhKey, setSearchKey] = useState();
  const [type, setType] = useState("all");

  useEffect(() => {
    async function fetchRooms() {
      try {
        setLoading(true);
        const data = (
          await axios.get(
            `${process.env.REACT_APP_API_KEY}/api/rooms/getallrooms`
          )
        ).data;
        setRooms(data);
        setDuplicateRooms(data);
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
    // filter already booked rooms

    var tempRooms = [];
    var availability = false;

    for (const room of rooms) {
      if (room.currentbookings.length > 0) {
        for (const booking of room.currentbookings) {
          if (
            !moment(moment(datess[0].$d).format("DD-MM-YYYY")).isBetween(
              booking.fromDate,
              booking.toDate
            ) &&
            !moment(moment(datess[1].$d).format("DD-MM-YYYY")).isBetween(
              booking.fromDate,
              booking.toDate
            )
          ) {
            if (
              !moment(moment(booking.fromDate).format("DD-MM-YYYY")).isBetween(
                moment(datess[0].$d).format("DD-MM-YYYY"),
                moment(datess[1].$d).format("DD-MM-YYYY")
              ) &&
              !moment(moment(booking.toDate).format("DD-MM-YYYY")).isBetween(
                moment(datess[0].$d).format("DD-MM-YYYY"),
                moment(datess[1].$d).format("DD-MM-YYYY")
              )
            ) {
              if (
                moment(datess[0].$d).format("DD-MM-YYYY") !==
                  booking.fromDate &&
                moment(datess[0].$d).format("DD-MM-YYYY") !== booking.toDate &&
                moment(datess[1].$d).format("DD-MM-YYYY") !==
                  booking.fromDate &&
                moment(datess[1].$d).format("DD-MM-YYYY") !== booking.toDate
              ) {
                availability = true;
              }
            }
          }
        }
      }
      if (availability == true || room.currentbookings.length == 0) {
        tempRooms.push(room);
      }
      setDuplicateRooms(tempRooms);
    }
  };
  const filterBySearch = () => {
    if (searhKey.length) {
      const tempRooms = duplicateRooms.filter((room) =>
        room?.name?.toLowerCase()?.includes(searhKey.toLowerCase())
      );
      setDuplicateRooms(tempRooms);
    } else {
      setDuplicateRooms(rooms);
    }
  };

  const filterByType = (e) => {
    setType(e);
    if (e !== "all") {
      const tempRooms = duplicateRooms.filter((room) =>
        room.type.toLowerCase().includes(e.toLowerCase())
      );
      setDuplicateRooms(tempRooms);
    } else {
      setDuplicateRooms(rooms);
    }
  };
  console.log(duplicateRooms, "dp");

  return (
    <div div className='container '>
      <div
        className='row justify-content-center my-4 bs px-4 py-3'
        style={{ margin: "0px 15%" }}
      >
        {/* <div className='col-md-7 bs px-4 py-3'> */}
        <div className='col-md-4'>
          <RangePicker format={"DD-MM-YYYY"} onChange={handleFilterByDate} />
        </div>

        <div className='col-md-5'>
          <input
            type='text'
            className='form-control'
            placeholder='Search rooms'
            value={searhKey}
            onChange={(e) => {
              setSearchKey(e.target.value);
            }}
            onKeyUp={filterBySearch}
          />
        </div>
        <div className='col-md-3'>
          <select
            className='form-control'
            onChange={(e) => {
              filterByType(e.target.value);
            }}
          >
            <option value='all'>All</option>
            <option value='delux'>Delux</option>
            <option value='non-delux'>Non-Delux</option>
          </select>
        </div>
      </div>
      {/* </div> */}
      <div class='row justify-content-center my-4'>
        {loading ? (
          <Loader />
        ) : duplicateRooms?.length > 0 ? (
          Array.isArray(rooms) &&
          duplicateRooms?.map((room) => {
            return (
              <div className='col-md-7 mx-4 my-3' key={room._id}>
                <Room room={room} fromDate={fromDate} toDate={toDate} />
              </div>
            );
          })
        ) : duplicateRooms?.length === 0 ? (
          <p>No rooms found!</p>
        ) : (
          error && <Error />
        )}
      </div>
    </div>
  );
}

export default Homescreen;
