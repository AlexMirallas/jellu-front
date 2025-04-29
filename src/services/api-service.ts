const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

if (!API_BASE_URL) {
  console.error("Error: VITE_API_BASE_URL is not defined. Did you create a .env file?");
}

class ApiService {
  // Helper function for making requests
  private async _request<T>(endpoint: string, options: RequestInit = {}): Promise<T> {
    const url = `${API_BASE_URL}${endpoint}`; // Construct full URL

    // Default options
    const defaultOptions: RequestInit = {
      headers: {
        'Content-Type': 'application/json',
        // Add other default headers if needed
      },
      credentials: 'include', // Crucial for sending/receiving cookies
      ...options, // Merge custom options
    };

    try {
      const response = await fetch(url, defaultOptions);

      // Attempt to parse JSON regardless of status for error messages
      let data: any;
      try {
        data = await response.json();
      } catch (e) {
        // If response is not JSON or empty, create a generic error
        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }
        // If response is ok but not JSON (e.g., 204 No Content), return null or handle as needed
        return null as T;
      }


      if (!response.ok) {
        // Throw an error with the message from the backend if available
        throw new Error(data.message || `HTTP error! Status: ${response.status}`);
      }

      return data as T;

    } catch (error) {
      console.error(`API Service Error fetching ${url}:`, error);
      // Re-throw the error so the calling component can handle it
      throw error;
    }
  }

  // --- Specific API Methods ---

  // Example: Login (already used in login-form)
  async login(credentials: { username?: string; email?: string; password?: string }): Promise<{ message: string; user: any }> {
    // Note: Backend expects 'username', but we might send email or username
    const payload = {
        username: credentials.username || credentials.email, // Send whichever is provided
        password: credentials.password
    };
    return this._request<{ message: string; user: any }>('/auth/login', {
      method: 'POST',
      body: JSON.stringify(payload),
    });
  }

  // Example: Get User Profile
  async getProfile(): Promise<any> { // Replace 'any' with your User Profile type
    return this._request<any>('/auth/profile', {
      method: 'GET',
    });
  }

  // Example: Logout
  async logout(): Promise<void> {
    // Logout might not return content, handle potential non-JSON response
     await this._request<void>('/auth/logout', {
      method: 'POST',
    });
    // No explicit return needed if backend sends 200 OK or 204 No Content
  }

  // Example: Get Posts
  async getPosts(page: number = 1, limit: number = 10): Promise<{ posts: any[], total: number }> { // Replace 'any' with Post type
    return this._request<{ posts: any[], total: number }>(`/posts?page=${page}&limit=${limit}`, {
      method: 'GET',
    });
  }

  // Add more methods for other endpoints (register, create post, get comments, etc.)
}

// Export a singleton instance (optional, but common)
export const apiService = new ApiService();