export interface Job {
    id: number;
    department: string;
    title: string;
    candidates: {
        total: number;
        new: number;
    };
    location: string;
    type: string;
    status: string; // tighten if possible
    client: string;
    jobStatus: string; // union instead of generic string
}

interface JobDetails {
    location: string,
    type: string,
    description: string
}

export interface JobData {
    jobTitle: string,
    jobDetails: JobDetails
}

export type Candidate = {
    id: number,
    name: string,
    pipelineStatus: string,
    dateApplied: Date | string,
    photo: string
    email: string,
    phone: string,
    sourcedBy: string,
    location: string,
    currentCompany: string,
    currentJob: string,
    appliedFor: string,
    experience: string,
    education: string,
    skills: string[],
    currentCTC: string,
}

export type Employee = {
    id: string,
    name: string,
    phone: string,
    email: string,
    address: string,
    jobTitle: string,
    department: string,
    joiningDate: Date | string,
    isPresentToday: boolean,
    salary: number,
    manager: string,
    photo: string
}

export interface AttendanceEntry {
  date: string; // YYYY-MM-DD format
  checkInTime: string | null; // HH:mm format
  checkOutTime: string | null; // HH:mm format
  notes?: string;
}

export interface ShiftConfig {
  startTime: string; // HH:mm format
  endTime: string; // HH:mm format
}

export type DayStatus = "weekend" | "absent" | "present" | "today" | "future";

export interface LeaveType {
  id: string;
  name: string;
  icon: string;
  available: number;
  booked: number;
  color: string;
}

export interface LeaveRequest {
  id: string;
  leaveTypeId: string;
  startDate: string;
  endDate: string;
  days: number;
  reason: string;
  status: "pending" | "approved" | "rejected";
}

export interface Holiday {
  id: string;
  name: string;
  date: string;
}

export type AttendanceStatus =
  | 'present'
  | 'absent'
  | 'weekend'
  | 'late'
  | 'early'
  | 'on-leave';

export type NewEmployee = {
  id: string;
  name: string;
  avatarUrl: string;
};

export type AttendanceRecord = {
  employeeId: string;
  date: string; // YYYY-MM-DD
  status: AttendanceStatus;
  checkInTime?: string; // HH:mm
  checkOutTime?: string; // HH:mm
  hoursWorked?: number;
};

export type AdminLeaveRequest = {
  id: string;
  employeeId: string;
  startDate: string; // YYYY-MM-DD
  endDate: string; // YYYY-MM-DD
  status: 'approved' | 'pending' | 'rejected';
  leaveType: 'vacation' | 'sick' | 'personal';
};

export type CompanyHoliday = {
  date: string; // YYYY-MM-DD
  name: string;
};

export interface TemplateField {
  id: number;
  label: string,
  key: string,
  isCustom: Boolean;
  value?:string
}

export interface EmailTemplate {
  id: number,
  hrId: number,
  fields: TemplateField[],
  createdAt: string,
  updatedAt: string
}

export const DEFAULT_CANDIDATE_FIELDS: Omit<TemplateField, 'id'>[] = [
  { label: 'Name', key: 'name', isCustom: false },
  { label: 'Phone', key: 'phone', isCustom: false },
  { label: 'Email', key: 'email', isCustom: false },
  { label: 'Location', key: 'location', isCustom: false },
  { label: 'Experience', key: 'experience', isCustom: false },
  { label: 'Current CTC', key: 'currentCTC', isCustom: false },
  { label: 'Expected CTC', key: 'expectedCTC', isCustom: false },
  { label: 'Current Company', key: 'currentCompany', isCustom: false },
  { label: 'Notice Period', key: 'noticePeriod', isCustom: false },
  { label: 'Skills', key: 'skills', isCustom: false },
]

export interface Client {
  id: number;
  name: string;
  location: string;
  contactPerson: string;
  contactPersonNumber: string;
  industry: string;
}

export interface HR {
  id: number;
  clientId: number;
  name: string;
  email: string;
  designation: string;
  number: string;
}

export interface ClientWithHRs extends Client {
  hrs: HR[];
}

export interface HRWithClient extends HR {
  client: Client;
}

export interface HRWithTemplates extends HR {
  templates: EmailTemplate[];
  client: Client;
}

export interface TemplateWithHR extends EmailTemplate {
  hr: HR | null;
}
