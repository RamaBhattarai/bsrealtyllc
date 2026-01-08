// hooks/useNotifications.ts
import { useQuery } from '@tanstack/react-query';
import { contactAPI } from '../lib/api/contact.api';
import { propertyInquiryAPI } from '../lib/api/propertyInquiry.api';
import { insuranceQuoteAPI } from '../lib/api/insuranceQuote.api';
import { appointmentAPI } from '../lib/api/appointment.api';
 import { jobApplicationAPI } from '../lib/api/jobApplication.api';
import { agentApplicationAPI } from '../lib/api/agentApplication.api';
import { homeImprovementQuoteAPI } from '../lib/api/homeImprovementQuote.api';

interface NotificationItem {
  id: string;
  type: string;
  title: string;
  message: string;
  timestamp: string;
}

export const useNotifications = (enabled: boolean = true) => {
  return useQuery({
    queryKey: ['notifications'],
    queryFn: async () => {
      const [contacts, inquiries, quotes, appointments, jobApplications, agentApplications, homeImprovementQuotes, recentContacts, recentInquiries, recentQuotes, recentAppointments, recentJobApplications, recentAgentApplications, recentHomeImprovementQuotes] = await Promise.all([
        contactAPI.getStats(),
        propertyInquiryAPI.getStats(),
        insuranceQuoteAPI.getStats(),
        appointmentAPI.getAppointmentStats(),
        // jobApplicationAPI.getStats(), // Not implemented yet
        // agentApplicationAPI.getStats(), // Mocked
        Promise.resolve({ total: 0, pending: 0, reviewed: 0, accepted: 0, rejected: 0 }), // Placeholder for job applications
        agentApplicationAPI.getStats(),
        homeImprovementQuoteAPI.getStats(),
        contactAPI.getAll({ limit: 5, status: 'new' }),
        propertyInquiryAPI.getAll({ limit: 5, status: 'new' }),
        insuranceQuoteAPI.getAll({ limit: 5, status: 'new' }),
        appointmentAPI.getAppointments({ limit: 5, status: 'new' }),
        jobApplicationAPI.getApplications({ limit: 5, status: 'new' }),
        agentApplicationAPI.getApplications({ limit: 5, status: 'new' }),
        homeImprovementQuoteAPI.getAll({ limit: 5, status: 'new' }),
      ]);
      
      const recentItems: NotificationItem[] = [
        ...(recentContacts.contacts || []).map(item => ({
          id: item._id || item.id || '',
          type: 'contact' as const,
          title: item.name,
          message: item.subject,
          timestamp: item.createdAt
        })),
        ...(recentInquiries.inquiries || []).map(item => ({
          id: item._id || item.id || '',
          type: 'property-inquiry' as const,
          title: item.name,
          message: item.propertyType?.join(', ') || 'Property inquiry',
          timestamp: item.createdAt
        })),
        ...(recentQuotes.quotes || []).map(item => ({
          id: item._id || item.id || '',
          type: 'insurance-quote' as const,
          title: item.fullName,
          message: item.insuranceInterest?.join(', ') || 'Insurance quote request',
          timestamp: item.createdAt
        })),
        ...(recentAppointments.appointments || []).map(item => ({
          id: item._id || item.id || '',
          type: 'appointment' as const,
          title: item.name,
          message: `${item.category} - ${item.date}`,
          timestamp: item.createdAt
        })),
        ...(recentJobApplications.data || []).map(item => ({
          id: item._id || '',
          type: 'job-application' as const,
          title: item.name,
          message: item.position,
          timestamp: item.createdAt
        })),
        ...(recentAgentApplications.data || []).map(item => ({
          id: item._id || '',
          type: 'agent-application' as const,
          title: item.name,
          message: item.licenseStatus,
          timestamp: item.createdAt
        })),
        ...(recentHomeImprovementQuotes.quotes || []).map(item => ({
          id: item._id || '',
          type: 'home-improvement-quote' as const,
          title: item.name,
          message: item.helpType?.join(', ') || 'Home improvement quote',
          timestamp: item.createdAt
        })),
      ].sort((a, b) => new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime()).slice(0, 10);
      
      return {
        contacts: contacts.pending || 0,
        propertyInquiries: inquiries.pending || 0,
        insuranceQuotes: quotes.pending || 0,
        appointments: appointments.pendingAppointments || 0,
        jobApplications: jobApplications.pending || 0,
        agentApplications: agentApplications.pending || 0,
        homeImprovementQuotes: homeImprovementQuotes.pending || 0,
        total: recentItems.length,
        recent: recentItems,
      };
    },
    refetchInterval: 5000, // Refresh every 5 seconds
    enabled,
  });
};