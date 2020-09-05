import request from 'superagent';
import { getAuthHeader } from './auth';

async function createBoard(params) {
	const res = await request
		.post('/api/boards')
		.send(params)
		.set(getAuthHeader());
	return res.body;
}

async function getBoards() {
	const res = await request
		.get('/api/boards')
		.set(getAuthHeader());
	return res.body;
}

async function getBoard(id) {
	const res = await request
		.get(`/api/boards/${id}`)
		.set(getAuthHeader());
	return res.body;
}

async function editBoard(id, params) {
	const res = await request
		.patch(`/api/boards/${id}`)
		.send(params)
		.set(getAuthHeader());
	return res.body;
}

export default {
	createBoard,
	getBoards,
	getBoard,
	editBoard
}