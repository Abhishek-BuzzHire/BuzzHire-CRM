import { cn } from "@/lib/utils";
import { TimelineBar } from "./TimeLineBar";
import { Badge } from "@/components/ui/badge";
import { DayStatus } from "@/lib/types";

interface TimeEntryRowProps {
    day: string;
    date: number;
    checkInTime?: string;
    checkOutTime?: string;
    lateBy?: string;
    earlyBy?: string;
    hoursWorked: string;
    status: DayStatus;
    isToday?: boolean;
    isFuture?: boolean;
}

export const TimeEntryRow = ({
    day,
    date,
    checkInTime, 
    checkOutTime,
    lateBy,
    earlyBy,
    hoursWorked,
    status,
    isToday,
    isFuture,
}: TimeEntryRowProps) => {
    const getStatusBadge = () => {
        if (status === "weekend") {
            return (
                <Badge className="bg-weekend-light text-weekend border-0 hover:bg-weekend-light">
                    Weekend
                </Badge>
            );
        }
        if (status === "absent") {
            return (
                <Badge className="bg-absent-light text-absent border-0 hover:bg-absent-light">
                    Absent
                </Badge>
            );
        }
        return null;
    };

    return (
        <div className={cn(
            "grid grid-cols-[120px_180px_1fr_120px_120px] gap-0 items-center py-4 border-b border-border",
            isFuture && "opacity-50"
        )}>
            <div className="flex flex-col">
                <span className="text-sm font-medium">{day}</span>
                <span
                    className={cn(
                        "text-md font-semibold",
                        isToday && "text-white bg-blue-600 rounded-full w-8 h-8 flex items-center justify-center p-2 mt-2"
                    )}
                >
                    {date}
                </span>
            </div>

            <div className="flex flex-col gap-1">
                {checkInTime && (
                    <div className="text-sm">
                        <span className="font-medium">{checkInTime}</span>
                        {lateBy && (
                            <div className="text-late text-xs">Late by {lateBy}</div>
                        )}
                    </div>
                )}
            </div>

            <div className="flex items-center gap-4 px-0">
                <TimelineBar
                    startTime={checkInTime}
                    endTime={checkOutTime}
                    status={status}
                    shiftStart="09:00"
                    shiftEnd="18:00"
                />
                
                {getStatusBadge()}
                
                <div className="flex flex-col gap-1">
                    {checkOutTime && (
                        <div className="text-sm">
                            <span className="font-medium">{checkOutTime}</span>
                            {earlyBy && (
                                <div className="text-early text-xs">Early by {earlyBy}</div>
                            )}
                        </div>
                    )}
                </div>
            </div>

            <div className="text-sm text-right">
                {checkOutTime && <span className="font-medium">{checkOutTime}</span>}
            </div>

            <div className="text-right">
                <div className="font-semibold">{hoursWorked}</div>
                <div className="text-xs text-muted-foreground">Hrs worked</div>
            </div>
        </div>
    );
};
