import React, { useState } from "react";
import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/Button";
import Carousel from "react-bootstrap/Carousel";
import { Link } from "react-router-dom";

function Room({ room, fromDate, toDate }) {
  // console.log(room, 'room',fromDate, 'fromDate', toDate, "toDate");
  
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  const [index, setIndex] = useState(0);

  const handleSelect = (selectedIndex) => {
    setIndex(selectedIndex);
  };

  return (
    <>
      <div className='row  bs py-3 ps-3'>
        <div className='col-md-4'>
          <img
            src={room.imageurls[0]}
            // src="https://plus.unsplash.com/premium_photo-1678297270385-ad5067126607?q=80&w=1887&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
            className='smallImg'
            alt={room.imageurls[0]}
          />
        </div>
        <div className='col-md-7 text-start'>
          <h4>{room.name}</h4>
          <p>
            <strong>Max Count:</strong> {room.maxcount}
          </p>
          <p>
            <strong>Type:</strong> {room.type}
          </p>
          {/* <p>{room.description}</p> */}
          <div className='text-end'>
            {(fromDate && toDate)  &&(
            <Link
              to={`/book/${room._id}/${fromDate}/${toDate}`}
              style={{pointerEvents: (!fromDate && !toDate) ? 'none': ''}}
               
            >
              <button className='btn btn-primary me-2' > Book Now</button>
            </Link>
            )}
            <button className='btn btn-dark ' onClick={handleShow}>
              View Details
            </button>
          </div>
        </div>
      </div>
      <Modal
        show={show}
        onHide={handleClose}
        backdrop='static'
        keyboard={false}
        size='lg'
      >
        <Modal.Header>
          <Modal.Title>{room.name}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Carousel activeIndex={index} onSelect={handleSelect}>
            {room?.imageurls?.map((image) => {
              return (
                <Carousel.Item>
                  <img src={image} className='bigImg' alt={image} />
                </Carousel.Item>
              );
            })}
          </Carousel>
          <p>{room.description}</p>
          <h4>Price: {room.rentperday}</h4>
        </Modal.Body>
        <Modal.Footer>
          <Button variant='secondary' onClick={handleClose}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}

export default Room;
