"use client"

import EmployeeTable from "@/components/EmployeeTable";
import Pagination from "@/components/Pagination";
import UserCard from "@/components/UserCard";
import { employeeData } from "@/lib/data";
import Image from "next/image";
import { useState } from "react";

const data = employeeData;

const EmployeeListPage = () => {
    type ViewType = 'userCard' | 'table';
    const [view, setView] = useState<ViewType>('table')
    return (
        <div className="w-full h-screen bg-blueLight-50 p-8">
            <div className="flex items-center w-full mb-4 justify-between">
                <div className="flex items-center gap-8">
                    <div className="text-2xl text-gray-900 space-x-4">
                        {data.length} Employees
                    </div>
                    <div className="">
                        <button className="flex justify-between gap-2 text-sm bg-white py-2 rounded-md px-6">
                            <Image src={"/filter.png"} alt="" width={16} height={16} />
                            Filter
                        </button>
                    </div>
                </div>
                <div className="inline-flex font-semibold rounded-md shadow-sm border border-gray-300 overflow-hidden my-8">
                    {/* Table Button */}
                    <button
                        onClick={() => setView("table")}
                        className={`px-4 py-1 text-sm focus:outline-none transition-colors duration-200 ease-in-out
                                            ${view === "table"
                                ? "bg-white text-gray-900"
                                : "bg-gray-300 text-gray-500 hover:bg-gray-200"
                            }`}
                    >
                        Table View
                    </button>

                    {/* Pipeline Button */}
                    <button
                        onClick={() => setView("userCard")}
                        className={`px-4 py-1 text-sm focus:outline-none transition-colors duration-200 ease-in-out
                                            ${view === "userCard"
                                ? "bg-white text-gray-900"
                                : "bg-gray-300 text-gray-500 hover:bg-gray-200"
                            }`}
                    >
                        Grid View
                    </button>
                </div>
            </div>
            <div>
                {view === 'userCard' && (
                    <>
                    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-6">
                        {data.map((employee) => (
                            <UserCard key={employee.id} data={employee} />
                        ))}
                    </div>
                    <Pagination />
                    </>
                )}
                {view === 'table' && (
                    <>
                        <EmployeeTable data={data} />
                        <Pagination />
                    </>
                )}
            </div>
        </div>
    )
}

export default EmployeeListPage