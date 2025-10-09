"use client"

import CandidateTable from "@/components/CandidateTable";
import Pagination from "@/components/Pagination";
import { candidateJobData } from "@/lib/data";
import Image from "next/image"

const data = candidateJobData

const CandidateListPage = () => {
    return (
        <div className="w-full h-screen bg-blueLight-50 p-8">
            <div className="flex items-center w-full mb-8 gap-8">
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
            <CandidateTable data={data} />
            <Pagination />
        </div>
    )
}

export default CandidateListPage;