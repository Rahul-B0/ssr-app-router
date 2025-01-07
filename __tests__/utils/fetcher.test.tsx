import axios from 'axios';
import MockAdapter from 'axios-mock-adapter';
import { fetchPost, fetchPostById } from '@/utils/fetcher';

describe('Fetcher Functions', () => {
  let mock: MockAdapter;

  beforeEach(() => {
    mock = new MockAdapter(axios);
  });

  afterEach(() => {
    mock.restore();
  });

  it('fetchPost should return posts successfully', async () => {
    const mockPosts = [
      { id: 1, title: 'Post 1', body: 'This is the first post.' },
      { id: 2, title: 'Post 2', body: 'This is the second post.' },
    ];

    mock.onGet('https://jsonplaceholder.typicode.com/posts').reply(200, mockPosts);

    const posts = await fetchPost();

    expect(posts).toEqual(mockPosts);
  });

  it('fetchPost should throw an error when the request fails', async () => {
    mock.onGet('https://jsonplaceholder.typicode.com/posts').reply(500);

    await expect(fetchPost()).rejects.toThrow();
  });

  it('fetchPostById should return a post successfully', async () => {
    const mockPost = { id: 1, title: 'Post 1', body: 'This is the first post.' };

    mock.onGet('https://jsonplaceholder.typicode.com/posts/1').reply(200, mockPost);

    const post = await fetchPostById('1');

    expect(post).toEqual(mockPost);
  });

  it('fetchPostById should throw an error when the request fails', async () => {
    mock.onGet('https://jsonplaceholder.typicode.com/posts/1').reply(404);

    await expect(fetchPostById('1')).rejects.toThrow();
  });
});