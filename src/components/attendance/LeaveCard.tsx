import { Info } from "lucide-react";
import * as LucideIcons from "lucide-react";
import { LeaveType } from "@/lib/types";
import {
    Tooltip,
    TooltipContent,
    TooltipProvider,
    TooltipTrigger,
} from "@/components/ui/tooltip";

interface LeaveCardProps {
    leaveType: LeaveType;
}

export const LeaveCard = ({ leaveType }: LeaveCardProps) => {
    const IconComponent = (LucideIcons as any)[leaveType.icon] || LucideIcons.Circle;

    return (
        <div className="bg-card rounded-lg border border-border p-6 space-y-4">
            <div className="flex items-center justify-between">
                <h3 className="font-medium text-foreground">{leaveType.name}</h3>
                <div className="flex gap-2">
                    <div className={`p-3 rounded-lg ${leaveType.color}`}>
                        <IconComponent className="w-5 h-5" />
                    </div>
                    <TooltipProvider>
                        <Tooltip>
                            <TooltipTrigger>
                                <Info className="w-4 h-4 text-muted-foreground" />
                            </TooltipTrigger>
                            <TooltipContent>
                                <p>Total leaves booked this year</p>
                            </TooltipContent>
                        </Tooltip>
                    </TooltipProvider>
                </div>
            </div>

            <div className="space-y-2">
                <div className="flex items-center justify-between">
                    <span className="text-sm text-muted-foreground">Available</span>
                    <span className="text-lg font-semibold text-success">{leaveType.available}</span>
                </div>

                <div className="flex items-center justify-between">
                    <span className="text-sm text-muted-foreground">Booked</span>
                    <div className="flex items-center gap-2">
                        <span className="text-lg font-semibold text-foreground">{leaveType.booked}</span>

                    </div>
                </div>
            </div>
        </div>
    );
};