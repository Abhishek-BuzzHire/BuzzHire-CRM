"use client";

import JobCard from "@/components/JobCard";
import { jobsData } from "@/lib/data";
import { Job } from "@/lib/types";
import { useState } from "react";

// Define Job type

const JobsPage = () => {
    const [activeTab, setActiveTab] = useState<Job["jobStatus"]>("active");

    // Initialize with jobs that are active by default
    const [filteredJobs, setFilteredJobs] = useState<Job[]>(
        jobsData.filter((job: Job) => job.jobStatus === "active")
    );

    const [selectedClient, setSelectedClient] = useState<string>("All");

    // Create a list of clients from the single data source
    const clients: string[] = ["All", ...Array.from(new Set(jobsData.map((job: Job) => job.client)))];

    const handleTabChange = (tab: Job["jobStatus"]) => {
        setActiveTab(tab);
        setFilteredJobs(jobsData.filter((job: Job) => job.jobStatus === tab));
        setSelectedClient("All"); // Reset client filter on tab change
    };

    const handleClientChange = (client: string) => {
        setSelectedClient(client);

        const jobsByStatus = jobsData.filter((job: Job) => job.jobStatus === activeTab);

        setFilteredJobs(
            client === "All"
                ? jobsByStatus
                : jobsByStatus.filter((job: Job) => job.client === client)
        );
    };

    return (
        <div className="w-full min-h-screen bg-blueLight-50 p-8">
            {/* Tabs */}
            <div className="flex space-x-8 text-lg font-semibold border-b border-gray-300 mb-6">
                <button
                    onClick={() => handleTabChange("active")}
                    className={`pb-4 ${activeTab === "active"
                        ? "border-b-2 border-blue-600 text-blue-600"
                        : "text-gray-500"
                        }`}
                >
                    ACTIVE JOBS
                </button>
                <button
                    onClick={() => handleTabChange("inactive")}
                    className={`pb-4 ${activeTab === "inactive"
                        ? "border-b-2 border-blue-600 text-blue-600"
                        : "text-gray-500"
                        }`}
                >
                    INACTIVE JOBS
                </button>
            </div>

            {/* Filters and Count */}
            <div className="flex flex-col mt-8 md:flex-row justify-left gap-16 items-start md:items-center my-6">
                <h2 className="text-2xl text-gray-800 mb-4 md:mb-0">
                    {filteredJobs.length}{" "}
                    {activeTab === "active" ? "Active" : "Inactive"} Jobs
                </h2>
                <div className="flex items-center space-x-4 text-sm">
                    <span className="font-semibold">Sort by:</span>
                    <div className="flex gap-12">
                        <select
                            className="p-2 rounded-md border border-gray-300"
                            value={selectedClient}
                            onChange={(e) => handleClientChange(e.target.value)}
                        >
                            {clients.map((client) => (
                                <option key={client} value={client}>
                                    {client}
                                </option>
                            ))}
                        </select>
                        <button className="flex items-center p-2 rounded-md bg-white border border-gray-300 hover:bg-gray-50">
                            <svg
                                className="w-4 h-4 mr-1"
                                fill="none"
                                stroke="currentColor"
                                viewBox="0 0 24 24"
                                xmlns="http://www.w3.org/2000/svg"
                            >
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth="2"
                                    d="M12 6V4M12 18V12M18 10V8M6 10V8M18 14H6"
                                ></path>
                            </svg>
                            Other Filters
                        </button>
                    </div>
                </div>
            </div>

            {/* Job Cards Grid */}
            <div className="grid mt-8 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-4">
                {filteredJobs.map((job) => (
                    <JobCard key={job.id} job={job} />
                ))}
            </div>
        </div>
    );
};

export default JobsPage;
