import { post, get, patch, del } from "./api";

async function createBoard(params) {
  return post("/api/boards", params);
}

async function getBoards() {
  return get("/api/boards");
}

async function getBoard(id) {
  return get(`/api/boards/${id}`);
}

async function editBoard(id, params) {
  return patch(`/api/boards/${id}`, params);
}

async function deleteBoard(id) {
  return del(`/api/boards/${id}`);
}

export default {
  createBoard,
  getBoards,
  getBoard,
  editBoard,
  deleteBoard,
};
