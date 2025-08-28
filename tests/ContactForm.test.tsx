import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { ContactForm } from '../src/components/ContactForm';

describe('ContactForm Component', () => {
  beforeEach(() => {
    vi.useFakeTimers();
    render(<ContactForm />);
  });

  afterEach(() => {
    vi.runOnlyPendingTimers();
    vi.useRealTimers();
  });

  it('renders all form fields', () => {
    expect(screen.getByLabelText(/your name/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/your email/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/subject/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/project type/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/your message/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/budget range/i)).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /send message/i })).toBeInTheDocument();
  });

  it.skip('updates form state on user input', async () => {
    const user = userEvent.setup();

    const nameInput = screen.getByLabelText(/your name/i);
    await user.clear(nameInput);
    await user.type(nameInput, 'John Doe');
    expect(nameInput).toHaveValue('John Doe');

    const emailInput = screen.getByLabelText(/your email/i);
    await user.clear(emailInput);
    await user.type(emailInput, 'john.doe@example.com');
    expect(emailInput).toHaveValue('john.doe@example.com');

    const subjectInput = screen.getByLabelText(/subject/i);
    await user.clear(subjectInput);
    await user.type(subjectInput, 'Test Subject');
    expect(subjectInput).toHaveValue('Test Subject');

    const projectTypeSelect = screen.getByLabelText(/project type/i);
    await user.selectOptions(projectTypeSelect, 'web');
    expect(projectTypeSelect).toHaveValue('web');

    const messageTextarea = screen.getByLabelText(/your message/i);
    await user.clear(messageTextarea);
    await user.type(messageTextarea, 'This is a test message.');
    expect(messageTextarea).toHaveValue('This is a test message.');

    const budgetSelect = screen.getByLabelText(/budget range/i);
    await user.selectOptions(budgetSelect, 'medium');
    expect(budgetSelect).toHaveValue('medium');
  });

  it.skip('handles form submission correctly', async () => {
    const user = userEvent.setup();
    const submitButton = screen.getByRole('button', { name: /send message/i });

    // Fill out the form
    await user.clear(screen.getByLabelText(/your name/i));
    await user.type(screen.getByLabelText(/your name/i), 'Jane Doe');
    await user.clear(screen.getByLabelText(/your email/i));
    await user.type(screen.getByLabelText(/your email/i), 'jane.doe@example.com');
    await user.clear(screen.getByLabelText(/subject/i));
    await user.type(screen.getByLabelText(/subject/i), 'Another Test');
    await user.selectOptions(screen.getByLabelText(/project type/i), 'iot');
    await user.clear(screen.getByLabelText(/your message/i));
    await user.type(screen.getByLabelText(/your message/i), 'Another test message.');

    // Submit the form
    await user.click(submitButton);

    // Check for submitting state
    expect(screen.getByRole('button', { name: /sending.../i })).toBeInTheDocument();
    expect(submitButton).toBeDisabled();

    // Fast-forward time to simulate submission completion
    vi.runAllTimers();

    // Check for success message and form reset
    expect(await screen.findByText(/your message has been successfully sent/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/your name/i)).toHaveValue('');
    expect(screen.getByLabelText(/your email/i)).toHaveValue('');

    // Fast-forward time to hide the success message
    vi.runAllTimers();

    // Check that the success message is gone
    expect(screen.queryByText(/your message has been successfully sent/i)).not.toBeInTheDocument();
  });
});
