import { HRWithTemplates } from "@/lib/types"

interface EmailFormatProps {
    data: HRWithTemplates
}

const EmailFormatList = ({data}: EmailFormatProps) => {
  return (
    <tr key={data.id} className="border-b-2 font-semibold border-gray-200 bg-white text-sm hover:bg-blueLight-50 cursor-pointer">
        {data.name} - {data.designation} - {data.client.name} - {data.templates.map((m)=>(
        
            <p key={m.id}> Temp Id - {m.id}</p>
            
        ))}
    </tr>
  )
}

export default EmailFormatList