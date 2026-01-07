// Common utility functions
export const formatDate = (date: string | Date) => {
  return new Date(date).toLocaleDateString();
};

export const formatCurrency = (amount: number) => {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
  }).format(amount);
};

export const formatPhone = (phone: string) => {
  const cleaned = phone.replace(/\D/g, '');
<<<<<<< HEAD
  if (cleaned.length <= 3) {
    return cleaned;
  } else if (cleaned.length <= 6) {
    return `(${cleaned.slice(0, 3)}) ${cleaned.slice(3)}`;
  } else {
    return `(${cleaned.slice(0, 3)}) ${cleaned.slice(3, 6)}-${cleaned.slice(6, 10)}`;
  }
=======
  const match = cleaned.match(/^(\d{3})(\d{3})(\d{4})$/);
  if (match) {
    return `(${match[1]}) ${match[2]}-${match[3]}`;
  }
  return phone;
>>>>>>> 4425388098c5463f38228bd7572a2ef8fe333abf
};

export const truncateText = (text: string, length: number = 50) => {
  if (text.length <= length) return text;
  return text.substring(0, length) + '...';
};

export const generateId = () => {
  return Math.random().toString(36).substr(2, 9);
};

export const validateEmail = (email: string) => {
  const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return re.test(email);
};