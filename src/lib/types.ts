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