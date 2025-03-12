import React from 'react';
import { render, act, waitFor } from '@testing-library/react';
import { AuthProvider, useAuth } from '@/contexts/AuthContext';
import { supabase } from '@/lib/supabase';

// Mock next/navigation
const mockPush = jest.fn();
jest.mock('next/navigation', () => ({
  useRouter: () => ({
    push: mockPush,
    replace: jest.fn(),
    prefetch: jest.fn(),
  }),
}));

// Helper function to create a test component that uses the AuthContext
const TestAuthHook = ({ callback }: { callback: (auth: ReturnType<typeof useAuth>) => void }) => {
  const auth = useAuth();
  callback(auth);
  return null;
};

describe('AuthContext', () => {
  beforeEach(() => {
    jest.clearAllMocks();
    
    // Reset mocks to default values
    (supabase.auth.getSession as jest.Mock).mockResolvedValue({
      data: { session: null },
      error: null,
    });
    
    (supabase.auth.signUp as jest.Mock).mockResolvedValue({
      data: { user: null },
      error: null,
    });
    
    (supabase.auth.signInWithPassword as jest.Mock).mockResolvedValue({
      data: { session: null },
      error: null,
    });
    
    (supabase.auth.signOut as jest.Mock).mockResolvedValue({
      error: null,
    });
  });
  
  it('provides initial authentication state', async () => {
    let capturedAuth: ReturnType<typeof useAuth> | null = null;
    
    render(
      <AuthProvider>
        <TestAuthHook callback={(auth) => { capturedAuth = auth; }} />
      </AuthProvider>
    );
    
    await waitFor(() => {
      expect(capturedAuth?.isLoading).toBe(false);
    });
    
    expect(capturedAuth?.user).toBeNull();
    expect(capturedAuth?.session).toBeNull();
  });
  
  it('updates auth state when session exists', async () => {
    // Mock session data
    const mockSession = {
      user: { id: '123', email: 'test@example.com' },
      access_token: 'valid-token',
      refresh_token: 'refresh-token',
    };
    
    (supabase.auth.getSession as jest.Mock).mockResolvedValue({
      data: { session: mockSession },
      error: null,
    });
    
    let capturedAuth: ReturnType<typeof useAuth> | null = null;
    
    render(
      <AuthProvider>
        <TestAuthHook callback={(auth) => { capturedAuth = auth; }} />
      </AuthProvider>
    );
    
    await waitFor(() => {
      expect(capturedAuth?.isLoading).toBe(false);
    });
    
    expect(capturedAuth?.user).toEqual(mockSession.user);
    expect(capturedAuth?.session).toEqual(mockSession);
  });
  
  it('handles signUp function', async () => {
    // Mock successful signup
    (supabase.auth.signUp as jest.Mock).mockResolvedValue({
      data: { user: { email: 'new@example.com' } },
      error: null,
    });
    
    let capturedAuth: ReturnType<typeof useAuth> | null = null;
    let signUpResponse;
    
    render(
      <AuthProvider>
        <TestAuthHook callback={(auth) => { capturedAuth = auth; }} />
      </AuthProvider>
    );
    
    await waitFor(() => {
      expect(capturedAuth?.isLoading).toBe(false);
    });
    
    // Call signUp
    await act(async () => {
      signUpResponse = await capturedAuth?.signUp('new@example.com', 'password123');
    });
    
    expect(supabase.auth.signUp).toHaveBeenCalledWith({
      email: 'new@example.com',
      password: 'password123',
    });
    
    expect(signUpResponse?.error).toBeNull();
  });
  
  it('handles signIn function', async () => {
    // Mock successful sign in
    const mockSession = {
      user: { id: '123', email: 'test@example.com' },
      access_token: 'valid-token',
      refresh_token: 'refresh-token',
    };
    
    (supabase.auth.signInWithPassword as jest.Mock).mockResolvedValue({
      data: { session: mockSession },
      error: null,
    });
    
    let capturedAuth: ReturnType<typeof useAuth> | null = null;
    let signInResponse;
    
    render(
      <AuthProvider>
        <TestAuthHook callback={(auth) => { capturedAuth = auth; }} />
      </AuthProvider>
    );
    
    await waitFor(() => {
      expect(capturedAuth?.isLoading).toBe(false);
    });
    
    // Call signIn
    await act(async () => {
      signInResponse = await capturedAuth?.signIn('test@example.com', 'password123');
    });
    
    expect(supabase.auth.signInWithPassword).toHaveBeenCalledWith({
      email: 'test@example.com',
      password: 'password123',
    });
    
    expect(signInResponse?.error).toBeNull();
  });
  
  it('handles signOut function', async () => {
    let capturedAuth: ReturnType<typeof useAuth> | null = null;
    
    render(
      <AuthProvider>
        <TestAuthHook callback={(auth) => { capturedAuth = auth; }} />
      </AuthProvider>
    );
    
    await waitFor(() => {
      expect(capturedAuth?.isLoading).toBe(false);
    });
    
    // Call signOut
    await act(async () => {
      await capturedAuth?.signOut();
    });
    
    expect(supabase.auth.signOut).toHaveBeenCalled();
    expect(mockPush).toHaveBeenCalledWith('/');
  });
});
