// Authentication utilities
export interface User {
  id: string;
  name: string;
  email: string;
  password: string;
  createdAt: string;
  profilePicture?: string;
  problemDescription?: string;
  paymentHistory?: PaymentRecord[];
  chatHistory?: ChatRecord[];
}

export interface PaymentRecord {
  id: string;
  doctorId: string;
  doctorName: string;
  amount: number;
  date: string;
  status: 'completed' | 'pending' | 'failed';
}

export interface ChatRecord {
  doctorId: string;
  doctorName: string;
  messages: Array<{
    id: string;
    text: string;
    sender: 'user' | 'support' | 'ai';
    timestamp: Date;
    supporterName?: string;
  }>;
  lastActivity: string;
}

export interface ScheduledAppointment {
  doctorId: string;
  doctorName: string;
  date: string;
  time: string;
  amount: number;
  scheduledAt: string;
}

// Simulated user database
const USERS_KEY = 'mindcare_users';
const CURRENT_USER_KEY = 'mindcare_current_user';
const SCHEDULED_APPOINTMENT_KEY = 'mindcare_scheduled_appointment';

export const getUsers = (): User[] => {
  const users = localStorage.getItem(USERS_KEY);
  return users ? JSON.parse(users) : [];
};

export const saveUser = (user: User): void => {
  const users = getUsers();
  const existingIndex = users.findIndex(u => u.id === user.id);
  if (existingIndex >= 0) {
    users[existingIndex] = user;
  } else {
    users.push(user);
  }
  localStorage.setItem(USERS_KEY, JSON.stringify(users));
};

export const findUserByEmail = (email: string): User | null => {
  const users = getUsers();
  return users.find(user => user.email === email) || null;
};

export const getCurrentUser = (): User | null => {
  const user = localStorage.getItem(CURRENT_USER_KEY);
  return user ? JSON.parse(user) : null;
};

export const setCurrentUser = (user: User): void => {
  localStorage.setItem(CURRENT_USER_KEY, JSON.stringify(user));
};

export const updateCurrentUser = (updates: Partial<User>): void => {
  const currentUser = getCurrentUser();
  if (currentUser) {
    const updatedUser = { ...currentUser, ...updates };
    setCurrentUser(updatedUser);
    saveUser(updatedUser);
  }
};

export const addPaymentRecord = (payment: PaymentRecord): void => {
  const currentUser = getCurrentUser();
  if (currentUser) {
    const paymentHistory = currentUser.paymentHistory || [];
    paymentHistory.push(payment);
    updateCurrentUser({ paymentHistory });
  }
};

// Scheduled Appointment Management
export const saveScheduledAppointment = (appointment: ScheduledAppointment): void => {
  localStorage.setItem(SCHEDULED_APPOINTMENT_KEY, JSON.stringify(appointment));
};

export const getScheduledAppointment = (): ScheduledAppointment | null => {
  const appointment = localStorage.getItem(SCHEDULED_APPOINTMENT_KEY);
  if (!appointment) return null;
  
  const parsed = JSON.parse(appointment);
  const appointmentDateTime = new Date(`${parsed.date} ${parsed.time}`);
  const now = new Date();
  
  // If appointment time has passed, clear it
  if (appointmentDateTime <= now) {
    clearScheduledAppointment();
    return null;
  }
  
  return parsed;
};

export const clearScheduledAppointment = (): void => {
  localStorage.removeItem(SCHEDULED_APPOINTMENT_KEY);
};

export const hasActiveAppointment = (): boolean => {
  return getScheduledAppointment() !== null;
};

// Chat Management with Doctor Separation
export const addChatMessage = (doctorId: string, doctorName: string, message: any): void => {
  const currentUser = getCurrentUser();
  if (currentUser) {
    const chatHistory = currentUser.chatHistory || [];
    const existingChatIndex = chatHistory.findIndex(chat => chat.doctorId === doctorId);
    
    if (existingChatIndex >= 0) {
      chatHistory[existingChatIndex].messages.push(message);
      chatHistory[existingChatIndex].lastActivity = new Date().toISOString();
    } else {
      chatHistory.push({
        doctorId,
        doctorName,
        messages: [message],
        lastActivity: new Date().toISOString()
      });
    }
    
    updateCurrentUser({ chatHistory });
  }
};

export const getChatHistory = (doctorId: string): ChatRecord | null => {
  const currentUser = getCurrentUser();
  if (currentUser && currentUser.chatHistory) {
    return currentUser.chatHistory.find(chat => chat.doctorId === doctorId) || null;
  }
  return null;
};

export const deleteChatHistory = (doctorId: string): void => {
  const currentUser = getCurrentUser();
  if (currentUser && currentUser.chatHistory) {
    const updatedChatHistory = currentUser.chatHistory.filter(chat => chat.doctorId !== doctorId);
    updateCurrentUser({ chatHistory: updatedChatHistory });
  }
};

export const logout = (): void => {
  localStorage.removeItem(CURRENT_USER_KEY);
};

export const isLoggedIn = (): boolean => {
  return getCurrentUser() !== null;
};

// Time slot utilities
export const isTimeSlotAvailable = (time: string, selectedDate: string): boolean => {
  const today = new Date();
  const selectedDateObj = new Date(selectedDate);
  
  // If selected date is not today, all slots are available
  if (selectedDateObj.toDateString() !== today.toDateString()) {
    return true;
  }
  
  // If it's today, check if time slot is in the future
  const [hours, minutes] = time.split(':').map(Number);
  const slotTime = new Date();
  slotTime.setHours(hours, minutes, 0, 0);
  
  return slotTime > today;
};

export const isToday = (dateString: string): boolean => {
  const today = new Date();
  const date = new Date(dateString);
  return date.toDateString() === today.toDateString();
};