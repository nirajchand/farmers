import '@testing-library/jest-dom'
import userEvent from '@testing-library/user-event'
import Login from '../login'
import { useAuth } from '@/context/AuthContext'
import { useRouter } from 'next/navigation'
import * as authActions from '@/lib/actions/auth_actions'
import { toast } from 'react-toastify'
import { render,screen,waitFor } from '@testing-library/react/types'

jest.mock('@/context/AuthContext')
jest.mock('next/navigation')
jest.mock('@/lib/actions/auth_actions')
jest.mock('react-toastify')

describe('Login Component', () => {
  const mockCheckAuth = jest.fn()
  const mockRouter = {
    push: jest.fn(),
    replace: jest.fn(),
  }

  beforeEach(() => {
    jest.clearAllMocks()
    ;(useAuth as jest.Mock).mockReturnValue({ checkAuth: mockCheckAuth })
    ;(useRouter as jest.Mock).mockReturnValue(mockRouter)
  })

  test('renders login form correctly', () => {
    render(<Login />)

    expect(screen.getByText('Welcome Back!')).toBeInTheDocument()
    expect(screen.getByText('Sign in to your account')).toBeInTheDocument()
    expect(screen.getByPlaceholderText('Email')).toBeInTheDocument()
    expect(screen.getByPlaceholderText('Password')).toBeInTheDocument()
    expect(screen.getByRole('button', { name: /Sign In to Your Account/i })).toBeInTheDocument()
  })

  test('submits form with valid data and redirects admin user', async () => {
    const user = userEvent.setup()
    ;(authActions.handleLogin as jest.Mock).mockResolvedValue({
      success: true,
      data: { role: 'admin' },
    })

    render(<Login />)

    const emailInput = screen.getByPlaceholderText('Email')
    const passwordInput = screen.getByPlaceholderText('Password')
    const submitButton = screen.getByRole('button', { name: /Sign In to Your Account/i })

    await user.type(emailInput, 'admin@example.com')
    await user.type(passwordInput, 'password123')
    await user.click(submitButton)

    await waitFor(() => {
      expect(authActions.handleLogin).toHaveBeenCalledWith({
        email: 'admin@example.com',
        password: 'password123',
      })
      expect(mockCheckAuth).toHaveBeenCalled()
      expect(mockRouter.replace).toHaveBeenCalledWith('/admin/users')
    })
  })

  test('submits form with valid data and redirects consumer user', async () => {
    const user = userEvent.setup()
    ;(authActions.handleLogin as jest.Mock).mockResolvedValue({
      success: true,
      data: { role: 'consumer' },
    })

    render(<Login />)

    const emailInput = screen.getByPlaceholderText('Email')
    const passwordInput = screen.getByPlaceholderText('Password')
    const submitButton = screen.getByRole('button', { name: /Sign In to Your Account/i })

    await user.type(emailInput, 'consumer@example.com')
    await user.type(passwordInput, 'password123')
    await user.click(submitButton)

    await waitFor(() => {
      expect(mockRouter.replace).toHaveBeenCalledWith('/consumer')
    })
  })

  test('submits form with valid data and redirects farmer user', async () => {
    const user = userEvent.setup()
    ;(authActions.handleLogin as jest.Mock).mockResolvedValue({
      success: true,
      data: { role: 'farmer' },
    })

    render(<Login />)

    const emailInput = screen.getByPlaceholderText('Email')
    const passwordInput = screen.getByPlaceholderText('Password')
    const submitButton = screen.getByRole('button', { name: /Sign In to Your Account/i })

    await user.type(emailInput, 'farmer@example.com')
    await user.type(passwordInput, 'password123')
    await user.click(submitButton)

    await waitFor(() => {
      expect(mockRouter.push).toHaveBeenCalledWith('/farmer')
    })
  })

  test('shows error message on failed login', async () => {
    const user = userEvent.setup()
    ;(authActions.handleLogin as jest.Mock).mockResolvedValue({
      success: false,
      message: 'Invalid credentials',
    })

    render(<Login />)

    const emailInput = screen.getByPlaceholderText('Email')
    const passwordInput = screen.getByPlaceholderText('Password')
    const submitButton = screen.getByRole('button', { name: /Sign In to Your Account/i })

    await user.type(emailInput, 'test@example.com')
    await user.type(passwordInput, 'password123')
    await user.click(submitButton)

    await waitFor(() => {
      expect(toast.error).toHaveBeenCalledWith('Invalid credentials')
    })
  })

  test('shows error on exception', async () => {
    const user = userEvent.setup()
    ;(authActions.handleLogin as jest.Mock).mockRejectedValue(new Error('Network error'))

    render(<Login />)

    const emailInput = screen.getByPlaceholderText('Email')
    const passwordInput = screen.getByPlaceholderText('Password')
    const submitButton = screen.getByRole('button', { name: /Sign In to Your Account/i })

    await user.type(emailInput, 'test@example.com')
    await user.type(passwordInput, 'password123')
    await user.click(submitButton)

    await waitFor(() => {
      expect(toast.error).toHaveBeenCalledWith('Network error')
    })
  })

  test('navigates to forgot password page', async () => {
    const user = userEvent.setup()
    render(<Login />)

    const forgotPasswordButton = screen.getByRole('button', { name: /Forgot Password/i })
    await user.click(forgotPasswordButton)

    expect(mockRouter.push).toHaveBeenCalledWith('/request-reset-password')
  })

  test('navigates to register page', async () => {
    const user = userEvent.setup()
    render(<Login />)

    const registerButton = screen.getAllByRole('button').find((btn) =>
      btn.textContent?.includes('Create Account')
    )

    if (registerButton) {
      await user.click(registerButton)
      expect(mockRouter.push).toHaveBeenCalled()
    }
  })
})
