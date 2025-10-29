import { HRWithClient } from "@/lib/types"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "./ui/card"
import Image from "next/image"

interface ClientCardProps {
  details: HRWithClient
}

const HRCard = ({ details }: ClientCardProps) => {
  return (
    < Card className="w-full min-w-[200px] shadow-md" >
      <CardHeader>
        <div className="flex justify-between">
          <div className="space-y-2">
            <CardTitle className="text-xl font-bold mt-1">{details.name}</CardTitle>
            <CardDescription className="text-md text-gray-400">{details.designation}</CardDescription>
          </div>
          <Image src="/avatar.png" alt={details.name} width={64} height={64} className="md:hidden xl:block w-20 h-20 rounded-full object-cover" />
        </div>
      </CardHeader>
      <CardContent className="text-sm space-y-8">
        <div className="hidden text-gray-600 md:table-cell space-y-2 max-w-[250px] truncate">
          <div className="flex gap-2 ">
            <Image src={"/mail.png"} alt="" width={20} height={20} className="opacity-65" />
            {details.email}
          </div>
          <div className="flex gap-2">
            <Image src={"/phone.png"} alt="" width={20} height={20} className="opacity-65" />
            {details.number}
          </div>
        </div>
        <div className="flex justify-between mt-4 items-center">
          <button className="flex bg-brand-600 text-white rounded-md px-4 py-2 text-sm">
            View Template
            <Image src={"/chev-right.png"} alt="" width={20} height={20} className="invert brightness-0 ml-2" />
          </button>
          <div className="space-x-1 font-semibold text-gray-800">
          <span>Client:</span><span className="font-normal">{details.client.name}</span>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}

export default HRCard