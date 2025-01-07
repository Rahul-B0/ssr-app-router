import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import Home from '../app/page';
import { fetchPost } from '../utils/fetcher';
import '@testing-library/jest-dom';
import { useRouter } from 'next/navigation';

jest.mock('../utils/fetcher');
jest.mock('next/navigation', () => ({
  useRouter: jest.fn(),
}));

describe('Home Component', () => {
  const mockRouter = { push: jest.fn() };
  const mockPosts = [
    { id: 1, title: 'First Blog Post', body: 'This is the body of the first blog post.' },
    { id: 2, title: 'Second Blog Post', body: 'This is the body of the second blog post.' },
  ];

  beforeEach(() => {
    jest.clearAllMocks();
    (useRouter as jest.Mock).mockReturnValue(mockRouter);
  });

  it('displays loading state initially', () => {
    render(<Home />);
    expect(screen.getByText('Loading...')).toBeInTheDocument();
  });

  it('displays error message when fetch fails', async () => {
    (fetchPost as jest.Mock).mockRejectedValueOnce(new Error('Fetch error'));

    render(<Home />);

    await waitFor(() => {
      expect(screen.getByText('Error: Failed to fetch the post.')).toBeInTheDocument();
    });
  });

  it('renders posts when fetch is successful', async () => {
    (fetchPost as jest.Mock).mockResolvedValueOnce(mockPosts);
  
    render(<Home />);
  
    await waitFor(() => {
      expect(screen.getByText((content) => content.includes('First Blog Post'))).toBeInTheDocument();
      expect(screen.getByText('This is the body of the first blog post.')).toBeInTheDocument();
      expect(screen.getByText((content) => content.includes('Second Blog Post'))).toBeInTheDocument();
      expect(screen.getByText('This is the body of the second blog post.')).toBeInTheDocument();
    });
  });
  

  it('navigates to post detail page when Show button is clicked', async () => {
    (fetchPost as jest.Mock).mockResolvedValueOnce(mockPosts);

    render(<Home />);

    await waitFor(() => {
      const showButtons = screen.getAllByText('Show');
      fireEvent.click(showButtons[0]);
      expect(mockRouter.push).toHaveBeenCalledWith('/post/1');
    });
  });
});