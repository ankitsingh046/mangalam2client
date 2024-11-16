import React, { useEffect, useState } from "react";
import { useParams, useLocation } from "react-router-dom";
import axios from "axios";
import Loader from "../components/Loader";
import Error from "../components/Error";
import moment from "moment";

function BookingScreen( {match} ) {

  const params = useParams();
  const location = useLocation()
  const [rooms, setRooms] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  const {roomId, fromDate, toDate} = params;
  const totalDays = moment.duration(moment(toDate, 'DD-MM-YYYY')?.diff(moment(fromDate, 'DD-MM-YYYY'))).asDays() + 1;
const totalAmount = totalDays*rooms?.rentperday;

  useEffect(() => {
    async function fetchRoomDetails() {
      try {
        setLoading(true);
        const data = (
          await axios.post("/api/rooms/getRoomById", { roomId: roomId })
        ).data;
        setRooms(data);
        setLoading(false);
      } catch (error) {
        console.log(error);
        setError(error);
        setLoading(false);
      }
    }
    fetchRoomDetails();
  }, []);

  return (
    <div div className='container '>
        {loading ? (
          <Loader />
        ) : rooms._id  ? (
          <div className='row justify-content-around bs mt-5 py-4'>
          <div className='col-md-7 text-start'>
            <h3>{rooms.name}</h3>
            <img src={rooms.imageurls[0]} alt='' className='bigImg' />
          </div>
          <div className='col-md-4 text-md-end text-start'>
            <div>
              <h3>Booking Details</h3>
              <hr />
             
                <p>Name:  <strong style={{fontWeight:600}}>{rooms.name}</strong></p>
                <p>From Date: <strong style={{fontWeight:600}}>{fromDate}</strong> </p>
                <p>To Date: < strong style={{fontWeight:600}}>{toDate}</strong> </p>
                <p>Max Person: <strong style={{fontWeight:600}}>{rooms.maxcount}</strong> </p>
            </div>
            <div className='mt-5'>
              <h4>Amount</h4>
              <hr />
                <p>Total days: <strong>{totalDays}</strong></p>
                <p>Rent per day:<strong> {rooms.rentperday} </strong></p>
                <p>Total Amount:<strong>{totalAmount}</strong> </p>
            </div>
            <div>
              <button className="btn btn-primary">Book Now</button>
            </div>
          </div>
        </div>
        ) : error &&(
          <Error />
         
        )}
      </div>
  );
}

export default BookingScreen;
