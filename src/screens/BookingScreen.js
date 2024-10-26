import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import Loader from "../components/Loader";
import Error from "../components/Error";

function BookingScreen({ match }) {
  const params = useParams();
  const [rooms, setRooms] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  useEffect(() => {
    async function fetchRoomDetails() {
      try {
        setLoading(true);
        const data = (
          await axios.post("/api/rooms/getRoomById", { roomId: params.roomId })
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
      <div class='row justify-content-center'>
        {loading ? (
          <Loader />
        ) : rooms._id  ? (
          <div className='row justify-content-center bs mt-5 py-4'>
          <div className='col-md-5 text-start'>
            <h3>{rooms.name}</h3>
            <img src={rooms.imageurls[0]} alt='' className='bigImg' />
          </div>
          <div className='col-md-5 text-end'>
            <div>
              <h3>Booking Details</h3>
              <hr />
              <strong>
                <p>Name: {rooms.name}</p>
                <p>From Date: {} </p>
                <p>To Date: </p>
                <p>Max Person: {rooms.maxcount} </p>
              </strong>
            </div>
            <div className='mt-5'>
              <h4>Amount</h4>
              <hr />
              <strong>
                <p>Total days: </p>
                <p>Rent per day: {rooms.rentperday} </p>
                <p>Total Amount: </p>
              </strong>
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
    </div>
  );
}

export default BookingScreen;
