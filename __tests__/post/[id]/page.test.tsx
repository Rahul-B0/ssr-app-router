import { render, screen, waitFor, fireEvent } from '@testing-library/react';
import Page from '../../../app/post/[id]/page';
import { fetchPostById } from '@/utils/fetcher';
import { useParams, useRouter } from 'next/navigation';

jest.mock('@/utils/fetcher');
jest.mock('next/navigation', () => ({
  useRouter: jest.fn(),
  useParams: jest.fn(),
}));

describe('Page Component', () => {
  const mockRouter = { back: jest.fn() };
  const mockPost = { id: 1, title: 'Test Post', body: 'This is a test post.' };

  beforeEach(() => {
    jest.clearAllMocks();
    (useRouter as jest.Mock).mockReturnValue(mockRouter);
  });

  it('displays loading state initially', () => {
    (useParams as jest.Mock).mockReturnValue({ id: '1' });
    render(<Page />);

    expect(screen.getByText('Loading...')).toBeInTheDocument();
  });

  it('renders post when fetch is successful', async () => {
    (useParams as jest.Mock).mockReturnValue({ id: '1' });
    (fetchPostById as jest.Mock).mockResolvedValueOnce(mockPost);

    render(<Page />);

    await waitFor(() => {
      expect(screen.getByText('Test Post')).toBeInTheDocument();
      expect(screen.getByText('This is a test post.')).toBeInTheDocument();
    });
  });

  it('displays error message when fetch fails', async () => {
    (useParams as jest.Mock).mockReturnValue({ id: '1' });
    (fetchPostById as jest.Mock).mockRejectedValueOnce(new Error('Fetch error'));

    render(<Page />);

    await waitFor(() => {
      expect(screen.getByText('Error: Failed to fetch the post.')).toBeInTheDocument();
    });
  });

  it('navigates back when Back button is clicked', async () => {
    (useParams as jest.Mock).mockReturnValue({ id: '1' });
    (fetchPostById as jest.Mock).mockResolvedValueOnce(mockPost);

    render(<Page />);

    await waitFor(() => {
      expect(screen.getByText('Test Post')).toBeInTheDocument();
    });

    fireEvent.click(screen.getByText('Back'));
    expect(mockRouter.back).toHaveBeenCalled();
  });
});