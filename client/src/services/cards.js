import request from 'superagent';
import { getAuthHeader } from './auth';

async function createCard(params) {
  console.log(params)
  const res = await request
    .post('/api/cards')
    .send(params)
    .set(getAuthHeader());

  return res.body;
}

export default {
  createCard
}