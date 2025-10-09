"use client"

import BigCalendar from "@/components/BigCalendar"
import Image from "next/image";
import React, { useState, useEffect, useRef } from "react"
import { useAttendance } from "@/hooks/useAttendance";
import { format, isToday, isFuture, isWeekend, endOfWeek } from "date-fns";
import { formatHoursWorked, formatMinutesToHHMM } from "@/utils/timeUtils";
import { DayStatus } from "@/lib/types";
import { useToast } from "@/hooks/use-toast";
import { TimeEntryRow } from "@/components/attendance/TimeEntryRow";
import { TimesheetHeader } from "@/components/attendance/TimeSheetHeader";

const formatTime = (totalSeconds: number): string => {
  const hours = Math.floor(totalSeconds / 3600);
  const minutes = Math.floor((totalSeconds % 3600) / 60);
  const seconds = totalSeconds % 60;

  return [hours, minutes, seconds]
    .map(v => v < 10 ? '0' + v : v)
    .join(' : ');
};

const PunchCard: React.FC<{ isPunchedIn: boolean, handlePunchAction: () => void, punchTime: string }> = ({ isPunchedIn, handlePunchAction, punchTime }) => {
  const [elapsedTime, setElapsedTime] = useState(0);
  const intervalRef = useRef<NodeJS.Timeout | null>(null);

  // Effect for the running timer
  useEffect(() => {
    if (isPunchedIn) {
      // Start the timer
      intervalRef.current = setInterval(() => {
        setElapsedTime(prevTime => prevTime + 1);
      }, 1000);
    } else {
      // Stop and clear the timer
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
      // Reset elapsed time only when punching out (for visual effect)
      if (punchTime && elapsedTime > 0) {
        // In a real app, you would save the elapsedTime here.
      }
    }

    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
    };
  }, [isPunchedIn]);

  // Reset timer on Punch Out completion
  useEffect(() => {
    if (!isPunchedIn && elapsedTime > 0) {
      // Simple logic to reset the timer after a brief display of the final time
      const timeout = setTimeout(() => {
        setElapsedTime(0);
      }, 3000); // Display the final time for 3 seconds
      return () => clearTimeout(timeout);
    }
  }, [isPunchedIn, elapsedTime]);


  return (
    <div className="relative w-full max-w-sm mx-auto bg-white rounded-xl shadow-lg border border-gray-200">
      {/* Profile Header */}
      <div className="flex justify-center -mt-12 mb-4">
        {/* Placeholder for the background image/pattern from the user image */}

        <Image
          src={"/avatar.png"}
          alt={"employee.name"}
          className="rounded-full object-cover border-2 border-white shadow-md relative"
          width={112}
          height={112}
        />
      </div>

      <div className="text-center px-4 pb-8">
        <h3 className="text-xl font-semibold text-gray-800">Kabir Elavat</h3>
        <p className="text-sm text-gray-500 mb-2">SDE 1</p>

        {/* Status and Timer */}
        <p className={`font-bold text-lg mb-2 ${isPunchedIn ? 'text-success-500' : 'text-error-500'}`}>
          {isPunchedIn ? 'IN' : 'OUT'}
        </p>

        <div className="flex justify-center items-center space-x-2 text-lg font-semibold tracking-wider mb-4 text-gray-800">
          {formatTime(elapsedTime).split(' : ').map((segment, index) => (
            <React.Fragment key={index}>
              <div className="bg-gray-200 px-2 py-1 rounded-lg">
                {segment}
              </div>
              {index < 2 && <span className="text-gray-500">:</span>}
            </React.Fragment>
          ))}
        </div>

        {/* Action Button */}
        <button
          onClick={handlePunchAction}
          className={`w-2/3 py-3 rounded-lg font-normal text-white text-md shadow-lg transform transition-all duration-300
            ${isPunchedIn ? 'bg-error-500 shadow-error-300/50' : 'bg-success-500 shadow-success-300/50'}
            hover:scale-[1.02] active:scale-[0.98]
          `}
        >
          {isPunchedIn ? 'Punch Out' : 'Punch In'}
        </button>
        <p className="mt-4 text-xs text-gray-500">
          {isPunchedIn ? `Punched In at: ${punchTime}` : punchTime ? `Punched Out at: ${punchTime}` : 'Ready to start your shift.'}
        </p>
      </div>
    </div>
  );
};

const AttendancePage = () => {
  const tabs = ['Attendance', 'Leaves', 'Shift', 'Seperation']
  const [activeTab, setActiveTab] = useState('Attendance')
  const [isPunchedIn, setIsPunchedIn] = useState(false);
  const [punchTime, setPunchTime] = useState('');
  const {
    attendanceData,
    currentWeekStart,
    activeTimer,
    elapsedTime,
    shiftConfig,
    checkIn,
    checkOut,
    getWeekDates,
    navigateWeek,
    goToToday,
    calculateHoursWorked,
    calculateLateness,
    calculateEarlyLeave,
  } = useAttendance();

  const { toast } = useToast();

  const handleCheckIn = (notes?: string) => {
    const today = format(new Date(), "yyyy-MM-dd");
    checkIn(today, notes);
    toast({
      title: "Checked In",
      description: `You checked in at ${format(new Date(), "hh:mm a")}`,
    });
  };

  const handleCheckOut = () => {
    const today = format(new Date(), "yyyy-MM-dd");
    checkOut(today);
    toast({
      title: "Checked Out",
      description: `You checked out at ${format(new Date(), "hh:mm a")}`,
    });
  };

  const weekDates = getWeekDates();
  const weekEnd = endOfWeek(currentWeekStart, { weekStartsOn: 0 });

  const getDayStatus = (date: Date): DayStatus => {
    if (isToday(date)) return "today";
    if (isFuture(date)) return "future";
    if (isWeekend(date)) return "weekend";

    const dateStr = format(date, "yyyy-MM-dd");
    const entry = attendanceData[dateStr];

    if (!entry?.checkInTime) return "absent";
    return "present";
  };

  const weekData = weekDates.map((date) => {
    const dateStr = format(date, "yyyy-MM-dd");
    const entry = attendanceData[dateStr];
    const status = getDayStatus(date);
    const hoursWorked = calculateHoursWorked(dateStr);
    const lateness = calculateLateness(dateStr);
    const earlyLeave = calculateEarlyLeave(dateStr);

    return {
      day: isToday(date) ? "Today" : format(date, "EEE"),
      date: date.getDate(),
      checkInTime: entry?.checkInTime,
      checkOutTime: entry?.checkOutTime,
      lateBy: lateness > 0 ? formatMinutesToHHMM(lateness) : undefined,
      earlyBy: earlyLeave > 0 ? formatMinutesToHHMM(earlyLeave) : undefined,
      hoursWorked: formatHoursWorked(hoursWorked),
      status,
      isToday: isToday(date),
      isFuture: isFuture(date),
    };
  });

  const timeLabels = [
    "09AM",
    "10AM",
    "11AM",
    "12PM",
    "01PM",
    "02PM",
    "03PM",
    "04PM",
    "05PM",
    "06PM",
  ];

  const todayStr = format(new Date(), "yyyy-MM-dd");
  const isCheckedIn = activeTimer === todayStr;

  const handlePunchAction = () => {
    const currentTime = new Date().toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' });
    setPunchTime(currentTime);
    if (isCheckedIn) {
      handleCheckOut()
    } else {
      handleCheckIn()
    }
    setIsPunchedIn(!isPunchedIn);
  };

  const renderContent = () => {
    switch (activeTab) {
      case 'Attendance':
        return (
          <div>
            <div className="flex gap-4">
              <div className="w-[80%] min-h-screen space-y-6 pt-12">
                {/* <BigCalendar /> */}
                <TimesheetHeader
                  weekStart={currentWeekStart}
                  weekEnd={weekEnd}
                  onNavigate={navigateWeek}
                  onToday={goToToday}
                  onCheckIn={handleCheckIn}
                  onCheckOut={handleCheckOut}
                  isCheckedIn={isCheckedIn}
                  elapsedTime={elapsedTime}
                  shiftStart={shiftConfig.startTime}
                  shiftEnd={shiftConfig.endTime}
                />
                <div className="bg-card rounded-lg border border-border shadow-sm p-6 pt-2">
                  <div className="space-y-2">
                    {weekData.map((entry, index) => (
                      <TimeEntryRow key={index} {...{
                        ...entry, checkInTime: entry.checkInTime ?? undefined,
                        checkOutTime: entry.checkOutTime ?? undefined,
                      }} />
                    ))}
                  </div>

                  <div className="mt-8 relative">
                    <div className="flex justify-between text-sm text-muted-foreground px-[120px]">
                      {timeLabels.map((time) => (
                        <span key={time}>{time}</span>
                      ))}
                    </div>
                    <div className="absolute bottom-0 left-[120px] right-0 h-px bg-border" />
                  </div>
                </div>
              </div>
              <div className="w-[20%] mt-12 relative space-y-4">
                <PunchCard
                  isPunchedIn={isPunchedIn}
                  handlePunchAction={handlePunchAction}
                  punchTime={punchTime}
                />
                <div className="w-full p-4 max-w-sm mx-auto bg-white rounded-xl shadow-lg border border-gray-200">
                  <div className="rounded-xl border border-gray-200 flex text-md justify-between">
                    <div className="p-2">
                      Leaves Taken
                    </div>
                    <div className="p-2 ">
                      5
                    </div>
                  </div>
                </div>
              </div>

            </div>
          </div>
        )
    }
  }

  return (
    <div className="w-full bg-blueLight-50 p-4 relative">
      <div className="text-lg">
        <div className="flex space-x-8 text-xs font-bold border-b border-gray-300 mb-6">
          {tabs.map(tab => (
            <button key={tab} onClick={() => setActiveTab(tab)} className={`p-2 ${activeTab === tab ? "border-b-2 border-blue-600" : "text-gray-500"}`}>
              {tab.toUpperCase()}
            </button>
          ))}
        </div>
        {renderContent()}
      </div>
    </div>
  )
}

export default AttendancePage