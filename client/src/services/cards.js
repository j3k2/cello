import { post } from './api';

async function createCard(params) {
  return post('/api/cards', params);
}

async function moveCard(cardId, params) {
  return post(`/api/cards/${cardId}/move`, params);
}

export default {
  createCard,
  moveCard
}