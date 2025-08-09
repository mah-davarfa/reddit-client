import { render, screen, waitFor, act } from '@testing-library/react';
import { Provider } from 'react-redux';
import { configureStore } from '@reduxjs/toolkit';
import axios from 'axios';
import { MemoryRouter } from 'react-router-dom';

import PostShowcase from '../components/PostShowcase';
import postsReducer from '../features/postsSlice';
import commentsReducer from '../features/commentsSlice';
import subredditlistsReducer, {
  fetchSubredditListsInStartup
} from '../features/subredditlistsSlice';

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

beforeEach(() => {
  jest.clearAllMocks();
  axios.get.mockResolvedValue({ data: { data: { children: [] } } });
});

test('dispatches fetchposts("picture") only after subreddit status becomes success', async () => {
  const store = makeStore({
    posts: { post: [], status: 'idle', error: null },
    comments: { comment: [], status: 'idle', error: null },
    subredditlists: { subredditList: [], status: 'idle', error: null },
  });

  render(
    <Provider store={store}>
      <MemoryRouter>
        <PostShowcase />
      </MemoryRouter>
    </Provider>
  );

  // component is on screen
  expect(await screen.findByRole('heading', { name: /postshowcase/i })).toBeInTheDocument();

  // not called yet
  expect(axios.get).not.toHaveBeenCalled();

  // flip subreddit status -> 'success' (wrap in act to avoid warnings)
  await act(async () => {
    store.dispatch(
      fetchSubredditListsInStartup.fulfilled([], 'req1', 'popular')
    );
  });

  // now the first effect should run and call /search?q=picture
  await waitFor(() => {
    expect(axios.get).toHaveBeenCalledWith(expect.stringContaining('/search?q=picture'));
  });
});
