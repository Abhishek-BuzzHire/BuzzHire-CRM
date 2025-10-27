'use client';

import { useState, useMemo } from 'react';
import { format } from 'date-fns';
import type { AttendanceRecord, NewEmployee } from '@/lib/types';
import { generateAttendanceData, getEmployees } from '@/lib/attendanceData';
import AttendanceCalendar from '@/components/attendance/attendanceCalender';
import AttendanceSidebar from '@/components/attendance/attendanceSidebar';

const AdminAttendancePage = () => {
  const [currentDate, setCurrentDate] = useState(new Date());
  const [selectedDate, setSelectedDate] = useState(new Date());

  const employees = useMemo(() => getEmployees(), []);

  const [attendanceRecords, setAttendanceRecords] = useState<
    Record<string, AttendanceRecord[]>
  >(() => generateAttendanceData(currentDate));

  const handleMonthChange = (newMonth: Date) => {
    setCurrentDate(newMonth);
    setAttendanceRecords(generateAttendanceData(newMonth));
    setSelectedDate(newMonth);
  };

  const recordsForSelectedDate = attendanceRecords[format(selectedDate, 'yyyy-MM-dd')] || [];
  return (
    <div className="w-full bg-blueLight-50 p-4 relative">
      <div className="flex flex-col min-h-screen">
        <div className="flex-1 w-full">
          <div className="grid grid-cols-1 xl:grid-cols-3 xl:gap-4">
            <div className="xl:col-span-2">
              <AttendanceCalendar
                currentDate={currentDate}
                selectedDate={selectedDate}
                onSelectDate={setSelectedDate}
                onMonthChange={handleMonthChange}
                attendanceRecords={attendanceRecords}
                totalEmployees={employees.length}
              />
            </div>
            <div className="px-4 pb-4 xl:p-0 xl:pr-4">
              <AttendanceSidebar
                selectedDate={selectedDate}
                dailyRecords={recordsForSelectedDate}
                employees={employees}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default AdminAttendancePage