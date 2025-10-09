"use client"

import Candidature from "@/components/Candidature"
import { candidateJobData, stagesData } from "@/lib/data"

const data = candidateJobData
const stages = stagesData

const CandidateProfilePage = ({params}:{params : {id: string}}) => {
  const id = Number(params.id);
  const candidate = data.find(c => c.id === id);

  if (!candidate) {
    return <div className="p-8">Candidate not found.</div>;
  }


  return (
    <div className="w-full h-screen bg-blueLight-50">
    <Candidature data={candidate} stages={stages}/>
    </div>
  )
}

export default CandidateProfilePage