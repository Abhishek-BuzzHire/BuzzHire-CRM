import {
  startOfMonth,
  endOfMonth,
  eachDayOfInterval,
  format,
  getDay,
  addMinutes,
  differenceInHours,
} from 'date-fns';
import type { AttendanceRecord, AttendanceStatus, NewEmployee } from './types';

const USER_SCHEDULE = {
  defaultCheckInTime: '09:00',
  defaultCheckOutTime: '17:00',
};


const EMPLOYEES: NewEmployee[] = [
  { id: '1', name: 'Alice Johnson', avatarUrl: 'https://i.pravatar.cc/150?u=alice' },
  { id: '2', name: 'Bob Williams', avatarUrl: 'https://i.pravatar.cc/150?u=bob' },
  { id: '3', name: 'Charlie Brown', avatarUrl: 'https://i.pravatar.cc/150?u=charlie' },
  { id: '4', name: 'Diana Miller', avatarUrl: 'https://i.pravatar.cc/150?u=diana' },
  { id: '5', name: 'Ethan Davis', avatarUrl: 'https://i.pravatar.cc/150?u=ethan' },
  { id: '6', name: 'Fiona Garcia', avatarUrl: 'https://i.pravatar.cc/150?u=fiona' },
  { id: '7', name: 'George Rodriguez', avatarUrl: 'https://i.pravatar.cc/150?u=george' },
  { id: '8', name: 'Hannah Martinez', avatarUrl: 'https://i.pravatar.cc/150?u=hannah' },
  { id: '9', name: 'Ian Hernandez', avatarUrl: 'https://i.pravatar.cc/150?u=ian' },
  { id: '10', name: 'Jane Lopez', avatarUrl: 'https://i.pravatar.cc/150?u=jane' },
  { id: '11', name: 'Kevin Gonzalez', avatarUrl: 'https://i.pravatar.cc/150?u=kevin' },
  { id: '12', name: 'Laura Wilson', avatarUrl: 'https://i.pravatar.cc/150?u=laura' },
  { id: '13', name: 'Mason Anderson', avatarUrl: 'https://i.pravatar.cc/150?u=mason' },
  { id: '14', name: 'Nora Thomas', avatarUrl: 'https://i.pravatar.cc/150?u=nora' },
  { id: '15', name: 'Oscar Taylor', avatarUrl: 'https://i.pravatar.cc/150?u=oscar' },
  { id: '16', name: 'Penelope Moore', avatarUrl: 'https://i.pravatar.cc/150?u=penelope' },
  { id: '17', name: 'Quinn Jackson', avatarUrl: 'https://i.pravatar.cc/150?u=quinn' },
  { id: '18', name: 'Riley White', avatarUrl: 'https://i.pravatar.cc/150?u=riley' },
  { id: '19', name: 'Sophia Harris', avatarUrl: 'https://i.pravatar.cc/150?u=sophia' },
  { id: '20', name: 'Thomas Martin', avatarUrl: 'https://i.pravatar.cc/150?u=thomas' },
  { id: '21', name: 'Zoe Lee', avatarUrl: 'https://i.pravatar.cc/150?u=zoe' },
  { id: '22', name: 'Adam Walker', avatarUrl: 'https://i.pravatar.cc/150?u=adam' },
  { id: '23', name: 'Bill Hall', avatarUrl: 'https://i.pravatar.cc/150?u=bill' },
  { id: '24', name: 'Carla Allen', avatarUrl: 'https://i.pravatar.cc/150?u=carla' },
  { id: '25', name: 'Derek Young', avatarUrl: 'https://i.pravatar.cc/150?u=derek' },
];

const randomBetween = (min: number, max: number) => {
  return Math.floor(Math.random() * (max - min + 1) + min);
};

const addRandomMinutes = (time: string, min: number, max: number): string => {
  const [hours, minutes] = time.split(':').map(Number);
  const date = new Date();
  date.setHours(hours, minutes, 0, 0);
  const modifiedDate = addMinutes(date, randomBetween(min, max));
  return format(modifiedDate, 'HH:mm');
};

export const getEmployees = (): NewEmployee[] => EMPLOYEES;

export const generateAttendanceData = (
  monthDate: Date
): Record<string, AttendanceRecord[]> => {
  const recordsByDate: Record<string, AttendanceRecord[]> = {};
  const daysInMonth = eachDayOfInterval({
    start: startOfMonth(monthDate),
    end: endOfMonth(monthDate),
  });

  daysInMonth.forEach((day) => {
    const date = format(day, 'yyyy-MM-dd');
    recordsByDate[date] = [];

    // Don't generate data for future dates
    if (day > new Date()) {
      return;
    }

    const dayOfWeek = getDay(day);
    if (dayOfWeek === 0 || dayOfWeek === 6) { // Sunday or Saturday
      EMPLOYEES.forEach(employee => {
        recordsByDate[date].push({
          employeeId: employee.id,
          date,
          status: 'weekend',
        });
      });
      return;
    }

    EMPLOYEES.forEach(employee => {
      let status: AttendanceStatus = 'present';
      let checkInTime: string | undefined = undefined;
      let checkOutTime: string | undefined = undefined;
      let hoursWorked: number | undefined = undefined;

      if (Math.random() < 0.05) { // 5% chance of being absent
        status = 'absent';
      } else {
        const isLate = Math.random() < 0.2; // 20% chance of being late
        const isEarly = !isLate && Math.random() < 0.15; // 15% chance of leaving early

        if (isLate) {
          status = 'late';
          checkInTime = addRandomMinutes(USER_SCHEDULE.defaultCheckInTime, 5, 45);
        } else {
          checkInTime = addRandomMinutes(USER_SCHEDULE.defaultCheckInTime, -10, 0);
        }

        if (isEarly) {
          status = isLate ? 'late' : 'early'; // if late, status remains late
          checkOutTime = addRandomMinutes(USER_SCHEDULE.defaultCheckOutTime, -60, -5);
        } else {
          checkOutTime = addRandomMinutes(USER_SCHEDULE.defaultCheckOutTime, 0, 30);
        }

        if (checkInTime && checkOutTime) {
          const checkInDate = new Date(`${date}T${checkInTime}`);
          const checkOutDate = new Date(`${date}T${checkOutTime}`);
          const hours = parseFloat((differenceInHours(checkOutDate, checkInDate)).toFixed(2));
          hoursWorked = hours < 0 ? 0 : hours;
        }
      }
      recordsByDate[date].push({ employeeId: employee.id, date, status, checkInTime, checkOutTime, hoursWorked });
    });
  });

  return recordsByDate;
};
