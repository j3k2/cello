import { post, get, patch } from './api';

async function createBoard(params) {
	return post('/api/boards', params);
}

async function getBoards() {
	return get('/api/boards');
}

async function getBoard(id) {
	return get(`/api/boards/${id}`);
}

async function editBoard(id, params) {
	return patch(`/api/boards/${id}`, params);
}

export default {
	createBoard,
	getBoards,
	getBoard,
	editBoard
}