import request from 'superagent';
import { getAuthHeader } from './auth';

async function createLane(params) {
  console.log('here', params)
  const res = await request
    .post('/api/lanes')
    .send(params)
    .set(getAuthHeader());

  return res.body;
}

export default {
  createLane
}