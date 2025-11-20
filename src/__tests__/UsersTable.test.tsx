import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import UsersTable from '../components/UsersTable';

const users = [
  {
    id: 1,
    name: 'John Doe',
    username: 'johndoe',
    email: 'john@example.com',
    address: {
      street: '123 St',
      suite: '1',
      city: 'Larnaca',
      zipcode: '345',
      geo: { lat: '0', lng: '0' },
    },
    phone: '123456',
    website: 'example.com',
    company: {
      name: 'Inc',
      catchPhrase: '',
      bs: 'test',
    },
  },
];

describe('UsersTable', () => {
  test('Renders user table', () => {
    render(<UsersTable users={users} handleViewDetailsClick={() => {}} />);

    expect(screen.getByText('John Doe')).toBeInTheDocument();
    expect(screen.getByText('johndoe')).toBeInTheDocument();
    expect(screen.getByText('john@example.com')).toBeInTheDocument();
    expect(screen.getByText('Inc')).toBeInTheDocument();
    expect(screen.getByText('Larnaca')).toBeInTheDocument();
  });

  test('Calls handleViewDetailsClick on click', () => {
    const mockCallback = jest.fn();
    render(<UsersTable users={users} handleViewDetailsClick={mockCallback} />);

    const button = screen.getByText(/View Details/);
    fireEvent.click(button);

    expect(mockCallback).toHaveBeenCalledWith(1);
  });
});
