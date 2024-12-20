import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import { PostCard } from '../../components/PostCard';
import { MemoryRouterProvider } from 'next-router-mock/MemoryRouterProvider';

describe('PostCard Component', () => {
  const mockProps = {
    id: 1,
    title: 'Sample Post Title',
    body: 'This is the body of the post. It is supposed to contain more than 100 characters to test the substring logic in the component rendering.',
  };

  it('renders the post title', () => {
    render(<PostCard {...mockProps} />, { wrapper: MemoryRouterProvider });
    expect(screen.getByText('Sample Post Title')).toBeInTheDocument();
  });

  it('renders the truncated post body', () => {
    render(<PostCard {...mockProps} />, { wrapper: MemoryRouterProvider });
    expect(
        screen.getByText(/This is the body of the post\. It is supposed to contain more than 100 characters to test/)
      ).toBeInTheDocument();      
  });

  it('renders the "Read More" link with the correct href', () => {
    render(<PostCard {...mockProps} />, { wrapper: MemoryRouterProvider });
    const readMoreLink = screen.getByText('Read More');
    expect(readMoreLink).toBeInTheDocument();
    expect(readMoreLink).toHaveAttribute('href', '/post/1');
  });

  it('applies the correct styles to the link', () => {
    render(<PostCard {...mockProps} />, { wrapper: MemoryRouterProvider });
    const readMoreLink = screen.getByText('Read More');
    expect(readMoreLink).toHaveStyle('color: #007bff');
  });

  it('applies the correct styles to the post card container', () => {
    render(<PostCard {...mockProps} />, { wrapper: MemoryRouterProvider });
    const postCard = screen.getByText('Sample Post Title').closest('.post-card');
    expect(postCard).toHaveStyle('border: 1px solid #ddd');
    expect(postCard).toHaveStyle('margin-bottom: 16px');
    expect(postCard).toHaveStyle('padding: 16px');
    expect(postCard).toHaveStyle('background: #fff');
  });
});
