"use client"

import CandidatePipeline from "@/components/CandidatePipeline";
import CandidateTable from "@/components/CandidateTable";
import Pagination from "@/components/Pagination";
import { candidateJobData, stagesData } from "@/lib/data";
import Image from "next/image"
import { useState } from "react";

const data = candidateJobData
const stages = stagesData

const ReferralListPage = () => {
    type ViewType = 'pipeline' | 'table';
    const [view, setView] = useState<ViewType>('pipeline')
    return (
        <div className="w-full h-screen bg-blueLight-50 p-8">
            <div className="flex items-center w-full mb-4 justify-between">
                <div className="flex items-center gap-8">
                    <div className="text-2xl text-gray-900 space-x-4">
                        {data.length} Candidates
                    </div>
                    <div className="">
                        <button className="flex justify-between gap-2 text-sm bg-white py-2 rounded-md px-6">
                            <Image src={"/filter.png"} alt="" width={16} height={16} />
                            Filter
                        </button>
                    </div>
                </div>
                <div className="inline-flex font-semibold rounded-md shadow-sm border border-gray-300 overflow-hidden my-8">
                    {/* Pipeline Button */}
                    <button
                        onClick={() => setView("pipeline")}
                        className={`px-4 py-1 text-sm focus:outline-none transition-colors duration-200 ease-in-out
                                            ${view === "pipeline"
                                ? "bg-white text-gray-900"
                                : "bg-gray-300 text-gray-500 hover:bg-gray-200"
                            }`}
                    >
                        Pipeline View
                    </button>
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
                </div>

            </div>
            <div>
                {view === 'pipeline' && (
                    <CandidatePipeline data={data} stages={stages} />
                )}
                {view === 'table' && (
                    <>
                    <CandidateTable data={data} stages={stages} />
                    <Pagination />
                    </>
                )}
            </div>
        </div>
    )
}

export default ReferralListPage;