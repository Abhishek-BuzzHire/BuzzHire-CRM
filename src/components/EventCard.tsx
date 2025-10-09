const interviews = [
    {
        date: '03',
        month: 'Jan',
        title: 'Culture Fit Interview',
        time: '12:00 - 13:00',
        interviewer: 'Darlene Robertson',
        countdown: '05:15:25',
    },
    {
        date: '05',
        month: 'Jan',
        title: 'New Employee Interview',
        time: '10:00 - 11:00',
        interviewer: 'Marvin McKinney',
        countdown: '07:12:20',
    },
    {
        date: '07',
        month: 'Jan',
        title: 'First Interview',
        time: '11:00 - 12:00',
        interviewer: 'Brooklyn Simons',
        countdown: '09:16:04',
    },
    {
        date: '10',
        month: 'Jan',
        title: 'Final Interview',
        time: '09:00 - 10:00',
        interviewer: 'Jane Doe',
        countdown: '12:05:00',
    },
    {
        date: '12',
        month: 'Jan',
        title: 'HR Interview',
        time: '14:00 - 15:00',
        interviewer: 'John Smith',
        countdown: '14:00:00',
    },
    {
        date: '15',
        month: 'Jan',
        title: 'Second Interview',
        time: '10:00 - 11:00',
        interviewer: 'Alice Johnson',
        countdown: '17:00:00',
    },
    {
        date: '15',
        month: 'Jan',
        title: 'Second Interview',
        time: '10:00 - 11:00',
        interviewer: 'Alice Johnson',
        countdown: '17:00:00',
    },
];

const EventCard = () => {
    return (
        <div className="w-full mx-auto">
            <div className="p-6 bg-white rounded-2xl shadow-lg">
                {/* Header Section */}
                <div className="flex justify-between items-center mb-6">
                    <h2 className="text-2xl font-bold">Upcoming Interviews</h2>
                </div>

                {/* List of Interviews */}
                <div className="space-y-4 max-h-96 overflow-y-auto">
                    {interviews.map((interview, index) => (
                        <div key={index} className="flex items-start space-x-4 p-4 border rounded-xl shadow-sm hover:shadow-md transition-shadow duration-200">
                            {/* Date Column */}
                            <div className="flex flex-col items-center justify-center text-center p-2 rounded-lg text-gray-400 bg-gray-100 min-w-[50px]">
                                <span className="text-xl font-bold">{interview.date}</span>
                                <span className="text-sm">{interview.month}</span>
                            </div>
                            {/* Details Column */}
                            <div className="flex-1">
                                <p className="font-semibold text-gray-800">{interview.title}</p>
                                <p className="text-sm text-gray-500 mt-1">
                                    {interview.time} · with <span className="underline text-gray-800">{interview.interviewer}</span>
                                </p>
                                <div className="flex items-center text-xs text-gray-400 mt-2">
                                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-4 h-4 mr-1">
                                        <path strokeLinecap="round" strokeLinejoin="round" d="M12 6v6h4.5m4.5 0a9 9 0 11-18 0 9 9 0 0118 0z" />
                                    </svg>
                                    <span>{interview.countdown}</span>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default EventCard;
