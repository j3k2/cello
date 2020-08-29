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

export default {
	createBoard,
	getBoards
}