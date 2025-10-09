import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Calendar, ChevronLeft, ChevronRight, Grid3x3, List, MoreHorizontal, Table2 } from "lucide-react";
import { useState } from "react";
import { format } from "date-fns";
import { formatTime } from "@/utils/timeUtils";

interface TimesheetHeaderProps {
    weekStart: Date;
    weekEnd: Date;
    onNavigate: (direction: "prev" | "next") => void;
    onToday: () => void;
    onCheckIn: (notes?: string) => void;
    onCheckOut: () => void;
    isCheckedIn: boolean;
    elapsedTime: number;
    shiftStart: string;
    shiftEnd: string;
}

export const TimesheetHeader = ({
    weekStart,
    weekEnd,
    onNavigate,
    onToday,
    onCheckIn,
    onCheckOut,
    isCheckedIn,
    elapsedTime,
    shiftStart,
    shiftEnd,
}: TimesheetHeaderProps) => {
    const [checkInNote, setCheckInNote] = useState("");

    const handleCheckInOut = () => {
        if (isCheckedIn) {
            onCheckOut();
            setCheckInNote("");
        } else {
            onCheckIn(checkInNote);
        }
    };

    return (
        <div className="space-y-4 bg-card rounded-lg border border-border shadow-sm p-4">
            <div className="flex items-center justify-between">
                <div className="flex items-center gap-0">
                    <Button variant="ghost" size="icon" onClick={() => onNavigate("prev")}>
                        <ChevronLeft className="h-4 w-4" />
                    </Button>
                    <Button variant="ghost" size="icon" onClick={onToday}>
                        <Calendar className="h-4 w-4" />
                    </Button>
                    <Button variant="ghost" size="icon" onClick={() => onNavigate("next")}>
                        <ChevronRight className="h-4 w-4" />
                    </Button>
                    <span className="text-sm font-semibold ml-2">
                        {format(weekStart, "dd-MMM-yyyy")} - {format(weekEnd, "dd-MMM-yyyy")}
                    </span>
                </div>
                <span className="text-sm font-semibold whitespace-nowrap">
                    General [ {shiftStart} - {shiftEnd} ]
                </span>
                <div className="flex items-center gap-2">
                    <Button variant="ghost" size="icon" className="bg-brand-600 text-card">
                        <Grid3x3 className="h-4 w-4" />
                    </Button>
                    <Button variant="ghost" size="icon">
                        <List className="h-4 w-4" />
                    </Button>
                    <Button variant="ghost" size="icon">
                        <Table2 className="h-4 w-4" />
                    </Button>
                    <Button variant="ghost" size="icon">
                        <MoreHorizontal className="h-4 w-4" />
                    </Button>
                </div>
            </div>

            {/* <div className="bg-card p-4 flex items-center gap-4">
                <div className="flex-1 flex items-center gap-4">
                    <span className="text-sm font-semibold whitespace-nowrap">
                        General [ {shiftStart} - {shiftEnd} ]
                    </span>
                    <Input
                        placeholder="Add notes for check-in"
                        value={checkInNote}
                        onChange={(e) => setCheckInNote(e.target.value)}
                        className="flex-1"
                        disabled={isCheckedIn}
                    />
                </div>
                <Button
                    className={isCheckedIn ? "bg-destructive hover:bg-destructive/90 text-destructive-foreground" : "bg-success hover:bg-success/90 text-success-foreground"}
                    onClick={handleCheckInOut}
                >
                    <span>{isCheckedIn ? "Check-out" : "Check-in"}</span>
                    <div className="ml-2 text-sm">{formatTime(elapsedTime)} Hrs</div>
                </Button>
            </div> */}
        </div>
    );
};
