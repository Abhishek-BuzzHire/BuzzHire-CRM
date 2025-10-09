import { employeeData } from "@/lib/data"
import { Employee } from "@/lib/types"
import Image from "next/image"

const UserCard = ({ data }: { data: Employee }) => {
  return (
    <div className='p-4 font-semibold bg-white shadow-md rounded-md'>
      <div className="flex justify-between items-center">
        <div className="w-4 h-4 bg-blueLight-100"></div>
        <div className="flex gap-4">
          <div className={`py-1 px-2 text-xs rounded-md border ${data.isPresentToday ? "border-success-600 text-success-600 bg-success-100" : "border-error-600 text-error-600 bg-error-100"}`}>
            {data.isPresentToday ? "Present" : "Absent"}
          </div>
          <button ><Image src={"/edit.png"} alt="" width={24} height={24} className="opacity-65 hover:opacity-80" /></button>
        </div>
      </div>
      <div className="py-4 space-y-2">
        <div className="flex justify-center">
          <Image src={data.photo} alt="data.name" width={68} height={68} className="rounded-full" />
        </div>
        <div className="text-center">
          <p className="text-lg">{data.name}</p>
          <p className="text-sm text-gray-400 font-normal">{data.jobTitle}</p>
        </div>
      </div>
      <div className="bg-blueLight-50 p-4 space-y-4">
        <div className="flex gap-10">
          <div className="space-y-1 max-w-[100px]">
            <p className="text-xs text-gray-400 ">Department</p>
            <p className="text-sm text-gray-600">{data.department}</p>
          </div>
          <div className="space-y-1">
            <p className="text-xs text-gray-400">Date Joined</p>
            <p className="text-sm text-gray-600">{new Date(data.joiningDate).toLocaleDateString("en-US", {
              year: "numeric",
              month: "short",
              day: "numeric",
            })}</p>
          </div>
        </div>
        <div className="text-sm text-gray-600 space-y-2">
          <p className="flex gap-2">
            <Image src={"/mail.png"} alt="" width={20} height={20} className="opacity-65" />
            {data.email}
          </p>
          <p className="flex gap-2">
            <Image src={"/phone.png"} alt="" width={20} height={20} className="opacity-65" />
            {data.phone}
          </p>
          
        </div>
      </div>
    </div>
  )
}

export default UserCard