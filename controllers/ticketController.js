const Ticket = require('../models/ticketModel');
const mongoose = require('mongoose');

// Create a new ticket
const createTicket = async (req, res) => {
  try {
    const { title, description } = req.body;
    if (!title || !description) {
      return res.status(400).json({ message: 'Title and description are required' });
    }
    const ticket = await Ticket.create({ title, description });
    res.status(201).json(ticket);
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

// Get all tickets
const getAllTickets = async (req, res) => {
  try {
    const tickets = await Ticket.find();
    res.status(200).json({ totalCount: tickets.length, tickets });
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

// Get a single ticket by ID
const getTicketById = async (req, res) => {
  try {
    const { id } = req.params;
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({ message: 'Invalid ticket ID' });
    }
    const ticket = await Ticket.findById(id);
    ticket ? res.status(200).json(ticket) : res.status(404).json({ message: 'Ticket not found' });
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

// Update a ticket by ID
const updateTicket = async (req, res) => {
  try {
    const { id } = req.params;
    const { title, description, status } = req.body;
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({ message: 'Invalid ticket ID' });
    }
    if (status && !['open', 'in-progress', 'closed'].includes(status)) {
      return res.status(400).json({ message: 'Invalid status. Valid statuses: open, in-progress, closed' });
    }
    const ticket = await Ticket.findByIdAndUpdate(id, { title, description, status }, { new: true });
    ticket ? res.status(200).json(ticket) : res.status(404).json({ message: 'Ticket not found' });
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

// Delete a ticket by ID
const deleteTicket = async (req, res) => {
  try {
    const { id } = req.params;
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({ message: 'Invalid ticket ID' });
    }
    const ticket = await Ticket.findByIdAndDelete(id);
    ticket ? res.status(200).json({ message: 'Ticket deleted successfully' }) : res.status(404).json({ message: 'Ticket not found' });
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

module.exports = {
  createTicket,
  getAllTickets,
  getTicketById,
  updateTicket,
  deleteTicket,
};
