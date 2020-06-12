import express, { Request, Response } from 'express';
import { requireAuth, validateRequest, NotFoundError } from '@chm-tickets/common';
import { body } from 'express-validator';
import { Ticket } from '../models/ticket';

export const showTicketRouter = express.Router();

showTicketRouter.get('/api/tickets/:id', async (req: Request, res: Response) => {
  const ticket = await Ticket.findById(req.params.id);

  if (!ticket) {
    throw new NotFoundError();
  }

  return res.send(ticket);
});
