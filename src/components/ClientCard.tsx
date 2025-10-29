import { ClientWithHRs } from "@/lib/types"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "./ui/card"
import Image from "next/image"

interface ClientCardProps {
    client: ClientWithHRs
}

const ClientCard = ({ client }: ClientCardProps) => {
    return (
        <Card className="w-full min-w-[200px] shadow-md">
            <CardHeader>
                <CardTitle className="text-xl font-bold mt-1">{client.name}</CardTitle>
                <CardDescription className="text-sm font-semibold text-gray-400">{client.industry}</CardDescription>
            </CardHeader>
            <CardContent className="text-sm space-y-1">
                <span className="text-sm text-gray-500">Contact Person:</span>
                <div className="flex items-center gap-4 p-4">
                    <Image src="/avatar.png" alt={client.contactPerson} width={40} height={40} className="md:hidden xl:block w-10 h-10 rounded-full object-cover" />
                    <div className="space-y-1">
                        <h3>{client.contactPerson}</h3>
                        <p className="text-xs text-gray-500">{client.contactPersonNumber}</p>
                    </div>
                </div>
                <div className="block items-center mt-4">
                    <span className="text-sm text-gray-500">HR Representatives:</span>
                    <div className="my-2 w-full bg-blueLight-50 rounded-md p-4 space-y-4">
                        {client.hrs.map((hr) => (
                            <div key={hr.id} className="flex justify-between border-b-2 border-gray-300 pb-4">
                                <div className="flex items-center gap-4">
                                    <Image src="/avatar.png" alt={hr.name} width={40} height={40} className="md:hidden xl:block w-10 h-10 rounded-full object-cover" />
                                    <div className="space-y-1">
                                        <h3>{hr.name}</h3>
                                        <p className="text-xs text-gray-500">{hr.designation}</p>
                                    </div>
                                </div>
                                <div className="hidden text-gray-600 md:table-cell space-y-2 max-w-[250px] truncate">
                                    <div className="flex gap-2 ">
                                        <Image src={"/mail.png"} alt="" width={20} height={20} className="opacity-65" />
                                        {hr.email}
                                    </div>
                                    <div className="flex gap-2">
                                        <Image src={"/phone.png"} alt="" width={20} height={20} className="opacity-65" />
                                        {hr.number}
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
                <div className="flex items-center space-x-4 font-semibold text-gray-800 mt-4">
                    <span>Location: </span><span className="font-normal">{client.location}</span>
                </div>
            </CardContent>
        </Card>
    )
}

export default ClientCard;