import React, { useState, useEffect } from 'react';
import { Modal, Form, Button } from 'react-bootstrap';

const eventList = [
  { id: 1, heading: "Innovate 2025: Unleashing the Power of Change" },
  { id: 2, heading: "GreenTech: Engineering Sustainable Futures" },
  { id: 3, heading: "Pioneering New Frontiers in Medicine" },
  { id: 4, heading: "Future of AI in Healthcare" },
  { id: 5, heading: "Blockchain: Securing Tomorrow" },
  { id: 6, heading: "Virtual Reality: The Next Frontier" },
];

const Ticket = ({ show, handleClose, selectedEvent }) => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    event: ''
  });

  // Update formData.event when selectedEvent changes
  useEffect(() => {
    if (selectedEvent) {
      setFormData(prev => ({
        ...prev,
        event: selectedEvent
      }));
    }
  }, [selectedEvent]);

  const handleChange = (e) => {
    setFormData(prevState => ({
      ...prevState,
      [e.target.name]: e.target.value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch('http://localhost:5000/gettickets', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData)
      });

      const data = await response.json();
      if (data.success) {
        alert('Ticket booked successfully!');
        handleClose();
        setFormData({ name: '', email: '', event: '' });
      } else {
        alert(data.message);
      }
    } catch (error) {
      console.error('Error:', error);
      alert('Something went wrong. Please try again.');
    }
  };

  return (
    <Modal show={show} onHide={handleClose}>
      <Modal.Header closeButton>
        <Modal.Title>Get Your Event Ticket</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form onSubmit={handleSubmit}>
          <Form.Group className="mb-3" controlId="formName">
            <Form.Label>Name</Form.Label>
            <Form.Control
              type="text"
              placeholder="Enter your name"
              name="name"
              value={formData.name}
              onChange={handleChange}
              required
            />
          </Form.Group>

          <Form.Group className="mb-3" controlId="formEmail">
            <Form.Label>Email address</Form.Label>
            <Form.Control
              type="email"
              placeholder="Enter your email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              required
            />
          </Form.Group>

          <Form.Group className="mb-3" controlId="formEvent">
            <Form.Label>Select Event</Form.Label>
            <Form.Select
              name="event"
              value={formData.event}
              onChange={handleChange}
              required
            >
              <option value="">-- Select an Event --</option>
              {eventList.map(event => (
                <option key={event.id} value={event.heading}>
                  {event.heading}
                </option>
              ))}
            </Form.Select>
          </Form.Group>

          <Button variant="success" type="submit">
            Book Ticket
          </Button>
        </Form>
      </Modal.Body>
    </Modal>
  );
};

export default Ticket;
