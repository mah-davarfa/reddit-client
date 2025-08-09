import { render, screen, fireEvent } from '@testing-library/react';
import { Provider } from 'react-redux';
import { store } from '../store';
import axios from 'axios';
import PostShowcase from '../components/PostShowcase';
import { MemoryRouter } from 'react-router-dom';


// PostShowcase hits all three:
// It uses useDispatch/useSelector (Redux).then need provider and store 
// It calls useParams (Router). then need MemoryRouter
// It dispatches fetchposts(...) in useEffect (network).then need mock axios
//getBy… → element must be there immediately
//findBy… → element will appear later after async actions (fetch, timers, state updates)
jest.mock('axios');
beforeEach(()=>{
    axios.get.mockResolvedValue({data:{data:{children:[]}}})
})

test('should show PostShowcase',async ()=>{
    render(
        <Provider store={store}>
            <MemoryRouter>
                 <PostShowcase/>
            </MemoryRouter>
        </Provider>
    );
  
    const header= await screen.findByRole('heading',{name:/PostShowcase/i})
    expect(header).toBeInTheDocument();
})
