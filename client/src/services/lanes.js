import { post, patch, del } from "./api";

async function createLane(params) {
  return post("/api/lanes", params);
}

async function moveLane(laneId, params) {
  return post(`/api/lanes/${laneId}/move`, params);
}

async function editLane(id, params) {
  return patch(`/api/lanes/${id}`, params);
}

async function deleteLane(id) {
  return del(`/api/lanes/${id}`);
}

export default {
  createLane,
  moveLane,
  editLane,
  deleteLane,
};
