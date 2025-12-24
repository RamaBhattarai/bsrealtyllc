import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { appointmentAPI, type AppointmentFormData } from '../lib/api/appointment.api';
import toast from 'react-hot-toast';

// Hook for booking appointment
export const useBookAppointment = () => {
  return useMutation({
    mutationFn: (data: AppointmentFormData) => appointmentAPI.bookAppointment(data),
    onSuccess: (data) => {
      toast.success(data.message || 'Appointment booked successfully!');
    },
    onError: (error: any) => {
      const message = error.response?.data?.message || 'Failed to book appointment';
      toast.error(message);
    },
  });
};

// Hook for getting appointments (admin)
export const useAppointments = (params?: {
  page?: number;
  limit?: number;
  status?: string;
  category?: string;
}) => {
  return useQuery({
    queryKey: ['appointments', params],
    queryFn: () => appointmentAPI.getAppointments(params),
    enabled: true,
  });
};

// Hook for getting appointment by ID
export const useAppointment = (id: string) => {
  return useQuery({
    queryKey: ['appointment', id],
    queryFn: () => appointmentAPI.getAppointmentById(id),
    enabled: !!id,
  });
};

// Hook for updating appointment status
export const useUpdateAppointmentStatus = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ id, status }: { id: string; status: 'pending' | 'confirmed' | 'cancelled' | 'completed' }) =>
      appointmentAPI.updateAppointmentStatus(id, status),
    onSuccess: (data) => {
      queryClient.invalidateQueries({ queryKey: ['appointments'] });
      queryClient.invalidateQueries({ queryKey: ['appointment-stats'] });
      toast.success(data.message || 'Appointment status updated successfully!');
    },
    onError: (error: any) => {
      const message = error.response?.data?.message || 'Failed to update appointment status';
      toast.error(message);
    },
  });
};

// Hook for deleting appointment
export const useDeleteAppointment = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (id: string) => appointmentAPI.deleteAppointment(id),
    onSuccess: (data) => {
      queryClient.invalidateQueries({ queryKey: ['appointments'] });
      queryClient.invalidateQueries({ queryKey: ['appointment-stats'] });
      toast.success(data.message || 'Appointment deleted successfully!');
    },
    onError: (error: any) => {
      const message = error.response?.data?.message || 'Failed to delete appointment';
      toast.error(message);
    },
  });
};

// Hook for appointment statistics
export const useAppointmentStats = () => {
  return useQuery({
    queryKey: ['appointment-stats'],
    queryFn: () => appointmentAPI.getAppointmentStats(),
  });
};

// Hook for exporting appointments
export const useExportAppointments = () => {
  return useMutation({
    mutationFn: () => appointmentAPI.exportAppointmentsToCSV(),
    onSuccess: (blob) => {
      const url = window.URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = `appointments-${new Date().toISOString().split('T')[0]}.csv`;
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      window.URL.revokeObjectURL(url);
      toast.success('Appointments exported successfully!');
    },
    onError: (error: any) => {
      const message = error.response?.data?.message || 'Failed to export appointments';
      toast.error(message);
    },
  });
};