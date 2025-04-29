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

const loadRazorpayScript = () => {
  return new Promise((resolve) => {
    const script = document.createElement("script");
    script.src = "https://checkout.razorpay.com/v1/checkout.js";
    script.onload = () => resolve(true);
    script.onerror = () => resolve(false);
    document.body.appendChild(script);
  });
};

const Ticket = ({ show, handleClose, selectedEvent }) => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    event: ''
  });

  useEffect(() => {
    if (selectedEvent) {
      setFormData(prev => ({ ...prev, event: selectedEvent }));
    }
  }, [selectedEvent]);

  const handleChange = (e) => {
    setFormData(prev => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const isScriptLoaded = await loadRazorpayScript();
    if (!isScriptLoaded) {
      alert('Failed to load Razorpay SDK.');
      return;
    }

    try {
      const orderRes = await fetch('http://localhost:5000/gettickets', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ...formData, amount: 100 }) // 👈 Add this
      });
      
      const data = await orderRes.json();
      if (!data.success) {
        alert('Failed to create order.');
        return;
      }

      const { order } = data;
      console.log("order",order);
      const rzp = new window.Razorpay({
        key: "rzp_test_pUnnS1FLj9QcVN", // ✅ no tab/space at end
        amount: order.amount,
        currency: order.currency,
        name: "Event Ticket",
        description: formData.event,
        order_id: order.id,
        handler: async (response) => {
          const verifyRes = await fetch('http://localhost:5000/confirm-payment', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
              ...formData,
              razorpay_order_id: response.razorpay_order_id,
              razorpay_payment_id: response.razorpay_payment_id,
              razorpay_signature: response.razorpay_signature
            })
          });

          const result = await verifyRes.json();
          alert(result.message);
          if (result.success) {
            handleClose();
            setFormData({ name: '', email: '', event: '' });
          }
        },
        prefill: {
          name: formData.name,
          email: formData.email
        },
        theme: { color: "#28a745" }
      });

      rzp.open();
    } catch (error) {
      console.error(error);
      alert('Something went wrong.');
    }
  };

  return (
    <Modal show={show} onHide={handleClose}>
      <Modal.Header closeButton>
        <Modal.Title>Get Your Event Ticket</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form onSubmit={handleSubmit}>
          <Form.Group className="mb-3">
            <Form.Label>Name</Form.Label>
            <Form.Control name="name" value={formData.name} onChange={handleChange} required />
          </Form.Group>
          <Form.Group className="mb-3">
            <Form.Label>Email</Form.Label>
            <Form.Control name="email" type="email" value={formData.email} onChange={handleChange} required />
          </Form.Group>
          <Form.Group className="mb-3">
            <Form.Label>Event</Form.Label>
            <Form.Select name="event" value={formData.event} onChange={handleChange} required>
              <option value="">-- Select Event --</option>
              {eventList.map(e => (
                <option key={e.id} value={e.heading}>{e.heading}</option>
              ))}
            </Form.Select>
          </Form.Group>
          <Button variant="success" type="submit">Pay & Book Ticket</Button>
        </Form>
      </Modal.Body>
    </Modal>
  );
};

export default Ticket;
