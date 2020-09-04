import request from 'superagent';
import { getAuthHeader } from './auth';

async function createCard(params) {
  const res = await request
    .post('/api/cards')
    .send(params)
    .set(getAuthHeader());

  return res.body;
}

async function moveCard(cardId, params) {
  const res = await request
    .post(`/api/cards/${cardId}/move`)
    .send(params)
    .set(getAuthHeader());

  return res.body;
}

export default {
  createCard,
  moveCard
}