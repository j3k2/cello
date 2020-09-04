import request from 'superagent';
import { getAuthHeader } from './auth';

async function createLane(params) {
  const res = await request
    .post('/api/lanes')
    .send(params)
    .set(getAuthHeader());

  return res.body;
}

async function moveLane(laneId, params) {
  const res = await request
    .post(`/api/lanes/${laneId}/move`)
    .send(params)
    .set(getAuthHeader());

  return res.body;
}

export default {
  createLane,
  moveLane
}