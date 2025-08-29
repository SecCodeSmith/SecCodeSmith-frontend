import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import { render, screen, act } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { ContactForm } from '../src/components/ContactForm';

describe.skip('ContactForm Component', () => {
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
    const user = userEvent.setup({ advanceTimers: vi.advanceTimersByTime });
    render(<ContactForm />);

    await act(async () => {
      const nameInput = screen.getByLabelText(/your name/i);
      await user.clear(nameInput);
      await user.type(nameInput, 'John Doe');
      vi.runAllTimers();
      expect(nameInput).toHaveValue('John Doe');

      const emailInput = screen.getByLabelText(/your email/i);
      await user.clear(emailInput);
      await user.type(emailInput, 'john.doe@example.com');
      vi.runAllTimers();
      expect(emailInput).toHaveValue('john.doe@example.com');
    });
  });

  it('handles form submission correctly', async () => {
    const user = userEvent.setup({ advanceTimers: vi.advanceTimersByTime });
    render(<ContactForm />);
    const submitButton = screen.getByRole('button', { name: /send message/i });

    await act(async () => {
      // Fill out the form
      await user.type(screen.getByLabelText(/your name/i), 'Jane Doe');
      await user.type(screen.getByLabelText(/your email/i), 'jane.doe@example.com');
      await user.type(screen.getByLabelText(/subject/i), 'Another Test');
      await user.selectOptions(screen.getByLabelText(/project type/i), 'iot');
      await user.type(screen.getByLabelText(/your message/i), 'Another test message.');

      // Submit the form
      await user.click(submitButton);
    });

    // Check for submitting state
    expect(screen.getByRole('button', { name: /sending.../i })).toBeInTheDocument();
    expect(submitButton).toBeDisabled();

    await act(async () => {
      // Fast-forward time to simulate submission completion
      vi.runAllTimers();
    });


    // Check for success message and form reset
    expect(await screen.findByText(/your message has been successfully sent/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/your name/i)).toHaveValue('');
    expect(screen.getByLabelText(/your email/i)).toHaveValue('');

    await act(async () => {
      // Fast-forward time to hide the success message
      vi.runAllTimers();
    });


    // Check that the success message is gone
    expect(screen.queryByText(/your message has been successfully sent/i)).not.toBeInTheDocument();
  });
});
