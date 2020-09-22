import { get, post, patch } from "./api";

async function createCard(params) {
  return post("/api/cards", params);
}

async function moveCard(cardId, params) {
  return post(`/api/cards/${cardId}/move`, params);
}

async function getCard(cardId) {
  return get(`/api/cards/${cardId}`);
}

async function editCard(id, params) {
  return patch(`/api/cards/${id}`, params);
}

export default {
  createCard,
  moveCard,
  editCard,
  getCard,
};
