import React, { useEffect, useState } from "react";
import axios from "axios";
import Room from "../components/Room";
import Loader from "../components/Loader";
import Error from "../components/Error";

function Homescreen() {
  const [rooms, setRooms] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);

  useEffect(() => {
    async function fetchRooms() {
      try {
        setLoading(true);
        const data = (await axios.get("/api/rooms/getallrooms")).data;
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
  console.log(rooms, 'rooms')

  return (
    <div div className="container ">
      <div class='row justify-content-center my-4'>
        {loading ? (
          <Loader />
        ) : rooms?.length > 0 ? (
          rooms?.map((room) => {
            return (
              <div className='col-md-7 mx-4 my-3'  key={room._id}>
                <Room room={room} />
              </div>
            );
          })
        ) : error &&(
          <Error />
        )}
      </div>
    </div>
  );
}

export default Homescreen;
