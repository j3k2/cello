import { post, patch, del } from "./api";

async function createList(params) {
  return post("/api/lists", params);
}

async function moveList(listId, params) {
  return post(`/api/lists/${listId}/move`, params);
}

async function editList(id, params) {
  return patch(`/api/lists/${id}`, params);
}

async function deleteList(id) {
  return del(`/api/lists/${id}`);
}

export default {
  createList,
  moveList,
  editList,
  deleteList,
};
