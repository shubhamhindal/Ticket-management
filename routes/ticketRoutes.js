const express = require('express');
const router = express.Router();
const {
  createTicket,
  getAllTickets,
  getTicketById,
  updateTicket,
  deleteTicket,
} = require('../controllers/ticketController');

// Ticket routes
router.post('/tickets', createTicket);
router.get('/tickets', getAllTickets);
router.get('/single-ticket/:id', getTicketById);
router.put('/update-ticket/:id', updateTicket);
router.delete('/delete-ticket/:id', deleteTicket);

module.exports = router;
