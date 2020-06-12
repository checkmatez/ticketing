import express, { Request, Response } from 'express';
import { requireAuth, validateRequest } from '@chm-tickets/common';
import { body } from 'express-validator';
import { Ticket } from '../models/ticket';

export const indexTicketRouter = express.Router();

indexTicketRouter.get('/api/tickets', async (req: Request, res: Response) => {
  const tickets = await Ticket.find({});

  res.send(tickets);
});
