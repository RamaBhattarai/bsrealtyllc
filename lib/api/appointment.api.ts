import apiClient from './client';

export interface AppointmentFormData {
  name: string;
  email: string;
  phone: string;
  date: string;
  time: string;
  category: string;
  preference: string;
  message: string;
}

export interface Appointment extends AppointmentFormData {
  id: string;
  _id?: string;
  status: 'new' | 'pending' | 'confirmed' | 'cancelled' | 'completed';
  createdAt: string;
  updatedAt: string;
}

export interface AppointmentStats {
  totalAppointments: number;
  pendingAppointments: number;
  confirmedAppointments: number;
  completedAppointments: number;
  cancelledAppointments: number;
}

export interface AppointmentsResponse {
  appointments: Appointment[];
  total: number;
  page: number;
  limit: number;
  totalPages: number;
}

export const appointmentAPI = {
  // Book appointment (public)
  bookAppointment: async (data: AppointmentFormData): Promise<{ appointment: Appointment; message: string }> => {
    const response = await apiClient.post('/appointments/book', data);
    return response.data as { appointment: Appointment; message: string };
  },

  // Get all appointments (admin only)
  getAppointments: async (params?: {
    page?: number;
    limit?: number;
    status?: string;
    category?: string;
  }): Promise<AppointmentsResponse> => {
    const response = await apiClient.get('/appointments', { params });
    return response.data as AppointmentsResponse;
  },

  // Get appointment by ID (admin only)
  getAppointmentById: async (id: string): Promise<Appointment> => {
    const response = await apiClient.get(`/appointments/${id}`);
    return response.data as Appointment;
  },

  // Update appointment status (admin only)
  updateAppointmentStatus: async (
    id: string,
    status: 'new' | 'pending' | 'confirmed' | 'cancelled' | 'completed'
  ): Promise<{ appointment: Appointment; message: string }> => {
    const response = await apiClient.patch(`/appointments/${id}/status`, { status });
    return response.data as { appointment: Appointment; message: string };
  },

  // Delete appointment (admin only)
  deleteAppointment: async (id: string): Promise<{ message: string }> => {
    const response = await apiClient.delete(`/appointments/${id}`);
    return response.data as { message: string };
  },

  // Export appointments to CSV (admin only)
  exportAppointmentsToCSV: async (): Promise<Blob> => {
    const response = await apiClient.get('/appointments/export/csv', {
      responseType: 'blob',
    });
    return response.data as Blob;
  },

  // Get appointment statistics (admin only)
  getAppointmentStats: async (): Promise<AppointmentStats> => {
    const response = await apiClient.get('/appointments/stats/overview');
    return response.data as AppointmentStats;
  },
};