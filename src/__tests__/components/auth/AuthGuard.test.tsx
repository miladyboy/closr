import React from 'react';
import { render, screen, waitFor } from '@testing-library/react';
import AuthGuard from '@/components/auth/AuthGuard';
import { AuthProvider } from '@/contexts/AuthContext';
import { supabase } from '@/lib/supabase';

// Mock router
const mockPush = jest.fn();
const mockPathname = jest.fn();

jest.mock('next/navigation', () => ({
  useRouter: () => ({
    push: mockPush,
    replace: jest.fn(),
    prefetch: jest.fn(),
  }),
  usePathname: () => mockPathname(),
}));

describe('AuthGuard', () => {
  beforeEach(() => {
    jest.clearAllMocks();
    // Reset mock functions
    mockPush.mockReset();
    mockPathname.mockReset();
  });

  it('shows loading state when auth state is loading', async () => {
    // Mock auth loading state
    (supabase.auth.getSession as jest.Mock).mockImplementation(
      () => new Promise(resolve => setTimeout(() => resolve({
        data: { session: null },
        error: null,
      }), 100))
    );
    
    mockPathname.mockReturnValue('/dashboard');
    
    render(
      <AuthProvider>
        <AuthGuard>
          <div data-testid="protected-content">Protected Content</div>
        </AuthGuard>
      </AuthProvider>
    );
    
    // Should show loading spinner initially
    expect(screen.getByTestId('loading-spinner')).toBeInTheDocument();
    expect(screen.queryByTestId('protected-content')).not.toBeInTheDocument();
    
    // Wait for auth to finish loading
    await waitFor(() => {
      expect(screen.queryByTestId('loading-spinner')).not.toBeInTheDocument();
    }, { timeout: 2000 });
  });

  it('redirects unauthenticated users from protected routes to login', async () => {
    // Mock unauthenticated state
    (supabase.auth.getSession as jest.Mock).mockResolvedValue({
      data: { session: null },
      error: null,
    });
    
    mockPathname.mockReturnValue('/dashboard');
    
    render(
      <AuthProvider>
        <AuthGuard>
          <div data-testid="protected-content">Protected Content</div>
        </AuthGuard>
      </AuthProvider>
    );
    
    // Wait for auth to finish
    await waitFor(() => {
      expect(mockPush).toHaveBeenCalledWith('/login');
    });
    
    // Protected content should not be rendered
    expect(screen.queryByTestId('protected-content')).not.toBeInTheDocument();
  });

  it('allows unauthenticated users to access public routes', async () => {
    // Mock unauthenticated state
    (supabase.auth.getSession as jest.Mock).mockResolvedValue({
      data: { session: null },
      error: null,
    });
    
    mockPathname.mockReturnValue('/');
    
    render(
      <AuthProvider>
        <AuthGuard>
          <div data-testid="public-content">Public Content</div>
        </AuthGuard>
      </AuthProvider>
    );
    
    await waitFor(() => {
      expect(screen.getByTestId('public-content')).toBeInTheDocument();
    });
    
    // Should not redirect
    expect(mockPush).not.toHaveBeenCalled();
  });

  it('allows authenticated users to access protected routes', async () => {
    // Mock authenticated state
    (supabase.auth.getSession as jest.Mock).mockResolvedValue({
      data: { 
        session: { 
          user: { 
            email: 'test@example.com' 
          } 
        } 
      },
      error: null,
    });
    
    mockPathname.mockReturnValue('/dashboard');
    
    render(
      <AuthProvider>
        <AuthGuard>
          <div data-testid="protected-content">Protected Content</div>
        </AuthGuard>
      </AuthProvider>
    );
    
    await waitFor(() => {
      expect(screen.getByTestId('protected-content')).toBeInTheDocument();
    });
    
    // Should not redirect
    expect(mockPush).not.toHaveBeenCalled();
  });

  it('redirects authenticated users from auth routes to dashboard', async () => {
    // Mock authenticated state
    (supabase.auth.getSession as jest.Mock).mockResolvedValue({
      data: { 
        session: { 
          user: { 
            email: 'test@example.com' 
          } 
        } 
      },
      error: null,
    });
    
    mockPathname.mockReturnValue('/login');
    
    render(
      <AuthProvider>
        <AuthGuard>
          <div data-testid="auth-content">Login Form</div>
        </AuthGuard>
      </AuthProvider>
    );
    
    await waitFor(() => {
      expect(mockPush).toHaveBeenCalledWith('/dashboard');
    });
    
    // Auth content should not be rendered
    expect(screen.queryByTestId('auth-content')).not.toBeInTheDocument();
  });
});
