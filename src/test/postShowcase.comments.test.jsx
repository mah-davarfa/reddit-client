import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { configureStore } from '@reduxjs/toolkit';
import { Provider } from 'react-redux';
import { MemoryRouter } from 'react-router-dom';
import axios from 'axios';

import PostShowcase from '../components/PostShowcase';
import postsReducer from '../features/postsSlice';
import commentsReducer from '../features/commentsSlice';
import subredditlistsReducer from '../features/subredditlistsSlice';

jest.mock('axios');

const makeStore = (preloadedState) =>
  configureStore({
    reducer: {
      posts: postsReducer,
      comments: commentsReducer,
      subredditlists: subredditlistsReducer,
    },
    preloadedState,
  });

function redditCommentsPayload(bodies) {
  // mimic Reddit: [linkListing, commentListing]
  return [
    { data: { children: [] } },
    {
      data: {
        children: bodies.map((body) => ({ data: { body } })),
      },
    },
  ];
}

test('gets comments for a post and cycles through them', async () => {
  // 1) Preload posts slice with a single post (ups>0 so button works)
  const store = makeStore({
    posts: {
      post: [{
        id: 'abc123',
        title: 'Post with comments',
        subreddit: 'testsub',
        url: 'https://i.redd.it/foo.jpg',
        is_video: false,
        thumbnail: 'self',
        media_metadata: null,
        gallery_data: null,
        ups: 10,
        comments: 2
      }],
      status: 'success',
      error: null
    },
    comments: { comment: [], status: 'idle', error: null },
    subredditlists: { subredditList: [], status: 'idle', error: null },
  });

  // 2) Mock axios for comments endpoint
  axios.get.mockResolvedValueOnce({
    data: redditCommentsPayload(['first comment', 'second comment']),
  });

  render(
    <Provider store={store}>
      <MemoryRouter>
        <PostShowcase />
      </MemoryRouter>
    </Provider>
  );

  // 3) Click "Get All ... Comments"
  const btn = await screen.findByRole('button', { name: /Get All/i });
  fireEvent.click(btn);

  // 4) First comment should appear
  await waitFor(() => {
    expect(screen.getByText(/first comment/i)).toBeInTheDocument();
  });

  // 5) Cycle to next, then previous
  fireEvent.click(screen.getByRole('button', { name: /Next Comment/ }));
  expect(screen.getByText(/second comment/i)).toBeInTheDocument();

  fireEvent.click(screen.getByRole('button', { name: /Previous comment/ }));
  expect(screen.getByText(/first comment/i)).toBeInTheDocument();
});
