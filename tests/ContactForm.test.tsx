import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import { render, screen, act, fireEvent } from '@testing-library/react';
import { ContactForm } from '../src/components/ContactForm';

describe('ContactForm Component', () => {
  beforeEach(() => {
    vi.useFakeTimers();
  });

  afterEach(() => {
    vi.useRealTimers();
  });

  it('renders all form fields', () => {
    render(<ContactForm />);
    expect(screen.getByLabelText(/your name/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/your email/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/subject/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/project type/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/your message/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/budget range/i)).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /send message/i })).toBeInTheDocument();
  });

  it('updates form state on user input', async () => {
    // Use real timers for this test to avoid conflicts
    vi.useRealTimers();
    
    render(<ContactForm />);

    const nameInput = screen.getByLabelText(/your name/i);
    const emailInput = screen.getByLabelText(/your email/i);
    
    // Use fireEvent instead of userEvent to avoid timing issues
    fireEvent.change(nameInput, { target: { value: 'John Doe' } });
    expect(nameInput).toHaveValue('John Doe');

    fireEvent.change(emailInput, { target: { value: 'john.doe@example.com' } });
    expect(emailInput).toHaveValue('john.doe@example.com');
    
    // Restore fake timers for other tests
    vi.useFakeTimers();
  });

  it('handles form submission correctly', async () => {
    render(<ContactForm />);
    
    const submitButton = screen.getByRole('button', { name: /send message/i });

    // Submit the form using fireEvent
    fireEvent.click(submitButton);

    // Check for submitting state
    expect(screen.getByText(/sending.../i)).toBeInTheDocument();
    expect(submitButton).toBeDisabled();

    // Fast-forward time to simulate submission completion (1500ms)
    act(() => {
      vi.advanceTimersByTime(1500);
    });

    // Check for success message directly (no waitFor needed since we control time)
    expect(screen.getByText(/your message has been successfully sent/i)).toBeInTheDocument();

    // Fast-forward time to hide the success message (5000ms)
    act(() => {
      vi.advanceTimersByTime(5000);
    });

    // Check that the success message is gone
    expect(screen.queryByText(/your message has been successfully sent/i)).not.toBeInTheDocument();
  });
});
