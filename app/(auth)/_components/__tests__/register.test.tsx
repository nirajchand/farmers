import '@testing-library/jest-dom'
import userEvent from '@testing-library/user-event'
import Register from '../register'
import { useRouter } from 'next/navigation'
import * as authActions from '@/lib/actions/auth_actions'
import { toast } from 'react-toastify'
import { render,screen, waitFor } from '@testing-library/react/types'

jest.mock('next/navigation')
jest.mock('@/lib/actions/auth_actions')
jest.mock('react-toastify')

describe('Register Component', () => {
  const mockRouter = {
    push: jest.fn(),
    replace: jest.fn(),
  }

  beforeEach(() => {
    jest.clearAllMocks()
    ;(useRouter as jest.Mock).mockReturnValue(mockRouter)
  })

  test('renders register form correctly', () => {
    render(<Register />)

    expect(screen.getByText('Join Our Community')).toBeInTheDocument()
    expect(screen.getByText('Create your account')).toBeInTheDocument()
    expect(screen.getByPlaceholderText('Full Name')).toBeInTheDocument()
    expect(screen.getByPlaceholderText('Email')).toBeInTheDocument()
    expect(screen.getByPlaceholderText('Password')).toBeInTheDocument()
    expect(screen.getByPlaceholderText('Confirm Password')).toBeInTheDocument()
    expect(screen.getByRole('button', { name: /Create Account/i })).toBeInTheDocument()
  })

  test('submits form with valid data and redirects to login', async () => {
    const user = userEvent.setup()
    ;(authActions.handleRegister as jest.Mock).mockResolvedValue({
      success: true,
      data: { id: '1' },
    })

    render(<Register />)

    const fullNameInput = screen.getByPlaceholderText('Full Name')
    const emailInput = screen.getByPlaceholderText('Email')
    const passwordInputs = screen.getAllByPlaceholderText('Password')
    const confirmPasswordInput = screen.getByPlaceholderText('Confirm Password')
    const submitButton = screen.getByRole('button', { name: /Create Account/i })

    await user.type(fullNameInput, 'John Doe')
    await user.type(emailInput, 'john@example.com')
    await user.type(passwordInputs[0], 'password123')
    await user.type(confirmPasswordInput, 'password123')
    await user.click(submitButton)

    await waitFor(() => {
      expect(authActions.handleRegister).toHaveBeenCalledWith({
        fullName: 'John Doe',
        email: 'john@example.com',
        password: 'password123',
        confirmPassword: 'password123',
        role: 'consumer',
      })
      expect(mockRouter.push).toHaveBeenCalledWith('/login')
    })
  })

  test('shows error message on failed registration', async () => {
    const user = userEvent.setup()
    ;(authActions.handleRegister as jest.Mock).mockResolvedValue({
      success: false,
      message: 'Email already exists',
    })

    render(<Register />)

    const fullNameInput = screen.getByPlaceholderText('Full Name')
    const emailInput = screen.getByPlaceholderText('Email')
    const passwordInputs = screen.getAllByPlaceholderText('Password')
    const confirmPasswordInput = screen.getByPlaceholderText('Confirm Password')
    const submitButton = screen.getByRole('button', { name: /Create Account/i })

    await user.type(fullNameInput, 'John Doe')
    await user.type(emailInput, 'exist@example.com')
    await user.type(passwordInputs[0], 'password123')
    await user.type(confirmPasswordInput, 'password123')
    await user.click(submitButton)

    await waitFor(() => {
      expect(toast.error).toHaveBeenCalledWith('Email already exists')
    })
  })

  test('shows error on exception', async () => {
    const user = userEvent.setup()
    ;(authActions.handleRegister as jest.Mock).mockRejectedValue(new Error('Network error'))

    render(<Register />)

    const fullNameInput = screen.getByPlaceholderText('Full Name')
    const emailInput = screen.getByPlaceholderText('Email')
    const passwordInputs = screen.getAllByPlaceholderText('Password')
    const confirmPasswordInput = screen.getByPlaceholderText('Confirm Password')
    const submitButton = screen.getByRole('button', { name: /Create Account/i })

    await user.type(fullNameInput, 'John Doe')
    await user.type(emailInput, 'john@example.com')
    await user.type(passwordInputs[0], 'password123')
    await user.type(confirmPasswordInput, 'password123')
    await user.click(submitButton)

    await waitFor(() => {
      expect(toast.error).toHaveBeenCalledWith('Network error')
    })
  })

  test('navigates to login page', async () => {
    const user = userEvent.setup()
    render(<Register />)

    const loginButton = screen.getByRole('button', { name: /Already have an account/i })
    await user.click(loginButton)

    expect(mockRouter.replace).toHaveBeenCalledWith('/login')
  })

  test('all form fields render and are interactive', async () => {
    const user = userEvent.setup()
    render(<Register />)

    const fullNameInput = screen.getByPlaceholderText('Full Name') as HTMLInputElement
    const emailInput = screen.getByPlaceholderText('Email') as HTMLInputElement
    const passwordInputs = screen.getAllByPlaceholderText('Password')
    const confirmPasswordInput = screen.getByPlaceholderText('Confirm Password') as HTMLInputElement

    await user.type(fullNameInput, 'John Doe')
    await user.type(emailInput, 'john@example.com')
    await user.type(passwordInputs[0], 'password123')
    await user.type(confirmPasswordInput, 'password123')

    expect(fullNameInput.value).toBe('John Doe')
    expect(emailInput.value).toBe('john@example.com')
    expect((passwordInputs[0] as HTMLInputElement).value).toBe('password123')
    expect(confirmPasswordInput.value).toBe('password123')
  })
})
