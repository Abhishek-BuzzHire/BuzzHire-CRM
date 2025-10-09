import { Employee } from "@/lib/types";
import Image from "next/image";
import { useState } from "react";
import Table from "./Table";
import Pagination from "./Pagination";
import EmployeeDetails from "./EmployeeDetails";

interface EmployeeTableProps {
    data: Employee[];
}

const columns = [
    {
        header: "Employee Name",
        accessor: "name",
        className: "p-6"
    },
    {
        header: "Contact",
        accessor: "contact",
        className: "hidden md:table-cell"
    },
    {
        header: "Department",
        accessor: "department",
        className: "hidden md:table-cell"
    },
    {
        header: "Joined On",
        accessor: "joinedDate",
        className: "hidden md:table-cell"
    },
    {
        header: "Today's Status",
        accessor: "status",
        className: ""
    },
    {
        header: "Action",
        accessor: "action",
        className: "hidden md:table-cell"
    }
]

const renderRow = ({ item, onRowClick }: { item: Employee, onRowClick?: (employee: Employee) => void; }) => {
    return (
        <tr key={item.id} className="border-b-2 font-semibold border-gray-200 bg-white text-sm hover:bg-blueLight-50 cursor-pointer" onClick={() => onRowClick?.(item)}>
            <td className="flex items-center gap-4 p-4">
                <Image src={item.photo} alt={item.name} width={40} height={40} className="md:hidden xl:block w-10 h-10 rounded-full object-cover" />
                <div className="space-y-1">
                    <h3>{item.name}</h3>
                    <p className="text-xs text-gray-500">{item.jobTitle}</p>
                </div>
            </td>
            <td className="hidden text-gray-600 md:table-cell space-y-2">
                <div className="flex gap-2">
                    <Image src={"/mail.png"} alt="" width={20} height={20} className="opacity-65"/>
                    {item.email}
                </div>
                <div className="flex gap-2">
                    <Image src={"/phone.png"} alt="" width={20} height={20} className="opacity-65"/>
                    {item.phone}
                </div>
            </td>
            <td className="hidden md:table-cell text-gray-600">{item.department}</td>
            <td className="hidden md:table-cell text-gray-600">{new Date(item.joiningDate).toLocaleDateString("en-US", {
                year: "numeric",
                month: "short",
                day: "numeric",
            })}</td>
            <td className="">
                <div className={`p-2 text-center mr-4 text-sm border-2 rounded-lg ${item.isPresentToday ? "border-success-600 text-success-600 bg-success-100" : "border-error-600 text-error-600 bg-error-100"}`}>
                    {item.isPresentToday ? "Present" : "Absent"}
                </div>
            </td>
            <td className="hidden md:table-cell pl-4">
                <button ><Image src={"/edit.png"} alt="" width={24} height={24} className="opacity-65 hover:opacity-80"/></button>
            </td>
        </tr>
    )
}

const EmployeeTable: React.FC<EmployeeTableProps> = ({ data }) => {
    const [profileView, setProfileView] = useState<Employee | null>(null);
    return (
        <>
            <Table columns={columns} data={data} renderRow={(item) => renderRow({ item, onRowClick: (employee) => setProfileView(employee) })} />
            <div
                className={`fixed overflow-y-auto top-0 right-0 h-full w-full md:w-1/2 bg-white shadow-lg z-50 transform transition-transform duration-300 ${profileView ? "translate-x-0" : "translate-x-full"
                    }`}>
                <button
                    className="absolute top-2 right-4 text-gray-500 hover:text-black"
                    onClick={() => setProfileView(null)}>
                    ✕
                </button>
                {profileView && (
                    <EmployeeDetails data={profileView} />
                )}
            </div>
            {profileView && (
                <div
                    className="fixed inset-0 bg-black/40 z-40"
                    onClick={() => setProfileView(null)} />
            )}
        </>
    )
}

export default EmployeeTable;