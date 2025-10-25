"use client";

import { useParams } from "next/navigation";
import EmployeeAttendancePage from "../EmployeeAttendancePage";
import AdminAttendancePage from "../AdminAttendancePage";

const AttendancePage = () => {
    const { role } = useParams();

  if (role === "admin") {
    return <AdminAttendancePage />;
  }

  return <EmployeeAttendancePage />;
}

export default AttendancePage