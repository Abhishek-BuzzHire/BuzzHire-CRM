import { useState, useEffect } from "react";
import { LeaveType, LeaveRequest, Holiday } from "@/lib/types";
import { isAfter, isBefore, parseISO } from "date-fns";

const LEAVE_TYPES_KEY = "leave-types";
const LEAVE_REQUESTS_KEY = "leave-requests";
const HOLIDAYS_KEY = "holidays";

const defaultLeaveTypes: LeaveType[] = [
  { id: "casual", name: "Casual Leave", icon: "Umbrella", available: 12, booked: 0, color: "bg-blue-50 text-blue-600" },
  { id: "earned", name: "Earned Leave", icon: "Target", available: 12, booked: 0, color: "bg-green-50 text-green-600" },
  { id: "lwp", name: "Leave Without Pay", icon: "AlertCircle", available: 0, booked: 0, color: "bg-red-50 text-red-600" },
  { id: "paternity", name: "Paternity Leave", icon: "Baby", available: 0, booked: 0, color: "bg-orange-50 text-orange-600" },
  { id: "sabbatical", name: "Sabbatical Leave", icon: "BookOpen", available: 0, booked: 0, color: "bg-yellow-50 text-yellow-600" },
  { id: "sick", name: "Sick Leave", icon: "Pill", available: 12, booked: 0, color: "bg-purple-50 text-purple-600" },
];

export const useLeave = () => {
  const [leaveTypes, setLeaveTypes] = useState<LeaveType[]>(() => {
    const saved = localStorage.getItem(LEAVE_TYPES_KEY);
    return saved ? JSON.parse(saved) : defaultLeaveTypes;
  });

  const [leaveRequests, setLeaveRequests] = useState<LeaveRequest[]>(() => {
    const saved = localStorage.getItem(LEAVE_REQUESTS_KEY);
    return saved ? JSON.parse(saved) : [];
  });

  const [holidays, setHolidays] = useState<Holiday[]>(() => {
    const saved = localStorage.getItem(HOLIDAYS_KEY);
    return saved ? JSON.parse(saved) : [];
  });

  useEffect(() => {
    localStorage.setItem(LEAVE_TYPES_KEY, JSON.stringify(leaveTypes));
  }, [leaveTypes]);

  useEffect(() => {
    localStorage.setItem(LEAVE_REQUESTS_KEY, JSON.stringify(leaveRequests));
  }, [leaveRequests]);

  useEffect(() => {
    localStorage.setItem(HOLIDAYS_KEY, JSON.stringify(holidays));
  }, [holidays]);

  const applyLeave = (request: Omit<LeaveRequest, "id">) => {
    const newRequest: LeaveRequest = {
      ...request,
      id: Date.now().toString(),
    };
    setLeaveRequests([...leaveRequests, newRequest]);

    // Update booked count
    setLeaveTypes(leaveTypes.map(type => 
      type.id === request.leaveTypeId 
        ? { ...type, booked: type.booked + request.days }
        : type
    ));
  };

  const getUpcomingLeaves = () => {
    const today = new Date();
    return leaveRequests.filter(req => 
      isAfter(parseISO(req.startDate), today) || isAfter(parseISO(req.endDate), today)
    );
  };

  const getPastLeaves = () => {
    const today = new Date();
    return leaveRequests.filter(req => 
      isBefore(parseISO(req.endDate), today)
    );
  };

  const getUpcomingHolidays = () => {
    const today = new Date();
    return holidays.filter(holiday => 
      isAfter(parseISO(holiday.date), today)
    );
  };

  const getPastHolidays = () => {
    const today = new Date();
    return holidays.filter(holiday => 
      isBefore(parseISO(holiday.date), today)
    );
  };

  return {
    leaveTypes,
    leaveRequests,
    holidays,
    applyLeave,
    getUpcomingLeaves,
    getPastLeaves,
    getUpcomingHolidays,
    getPastHolidays,
  };
};