const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000';

class ApiClient {
  private baseURL: string;
  private token: string | null = null;

  constructor(baseURL: string) {
    this.baseURL = baseURL;
    if (typeof window !== 'undefined') {
      this.token = localStorage.getItem('authToken');
    }
  }

  async request(endpoint: string, options: RequestInit = {}) {
    const url = `${this.baseURL}${endpoint}`;
    
    const config: RequestInit = {
      headers: {
        'Content-Type': 'application/json',
        ...(this.token && { Authorization: `Bearer ${this.token}` }),
        ...options.headers,
      },
      ...options,
    };

    try {
      const response = await fetch(url, config);
      const data = await response.json();
      
      if (!response.ok) {
        throw new Error(data.message || `Error: ${response.status}`);
      }
      
      return data;
    } catch (error) {
      console.error('API Error:', error);
      throw error;
    }
  }

  // Events
  async getEvents() {
    return this.request('/api/events');
  }

  async createEvent(eventData: any) {
    return this.request('/api/events', {
      method: 'POST',
      body: JSON.stringify(eventData),
    });
  }

  // Issues
  async getIssues() {
    return this.request('/api/issues');
  }

  async createIssue(issueData: any) {
    return this.request('/api/issues', {
      method: 'POST',
      body: JSON.stringify(issueData),
    });
  }

  // Auth
  async login(credentials: any) {
    const response = await this.request('/api/auth/login', {
      method: 'POST',
      body: JSON.stringify(credentials),
    });
    
    if (response.data?.token) {
      this.token = response.data.token;
      localStorage.setItem('authToken', response.data.token);
    }
    
    return response;
  }
}

export const apiClient = new ApiClient(API_BASE_URL);
