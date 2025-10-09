//This component should be updated like this: a select button to select the recruiters at the top, to fetch data of each individual as: Nitin got selected, so 1. no. of profiles nitin did, 2. in which domain the profiles fall like SSE, Devops along with client name.

"use client"

import React from 'react';
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip } from 'recharts';

// Dummy data for the jobs summary
const data = [
    { name: 'Jon', value: 1 },
    { name: 'Don', value: 2 },
    { name: 'Bon', value: 2 },
    { name: 'Seol', value: 2 },
    { name: 'tokyo', value: 4 },
    { name: 'Sim', value: 4 },
    { name: 'Kim', value: 4 },
    { name: 'Jim', value: 6 },
    { name: 'Neel', value: 2 },
    { name: 'Brad', value: 0 },
    { name: 'Bon', value: 2 },
    { name: 'Seol', value: 2 },
    { name: 'tokyo', value: 4 },
    { name: 'Sim', value: 4 },
    { name: 'Kim', value: 4 },
];

const colors = [
    "#FF3B3B", // from #FF6B6B → stronger red
    "#0DD9C4", // from #4ECDC4 → brighter aqua
    "#2A6BFF", // from #4F86F7 → deeper blue
    "#FF8A1C", // from #F7A84F → punchier orange
    "#B12AF7", // from #C755F7 → more neon purple

    "#1E90FF", // from #39A0ED → bold azure
    "#FF4C4C", // from #E87C7C → hot red
    "#14C9A3", // from #7DD8C9 → vivid teal
    "#FF6F1C", // from #F2944C → intense orange
    "#C43CFF", // from #D68AF9 → glowing violet

    "#00B4D8", // from #5DB8D3 → tropical cyan
    "#FF7043", // from #FF9F80 → fiery coral
    "#F5C518", // from #E0B354 → vibrant gold
    "#7A3CFF", // from #9C6ADE → deep electric purple
    "#1DD1A1", // from #7BCCB5 → bright mint
];

const totalCvs = data.reduce((acc, entry) => acc + entry.value, 0);

const CVCount = () => {
    return (
        <div className="w-full mx-auto">
            <div className="p-4 bg-white rounded-2xl shadow-lg">
                {/* Header Section */}
                <div className="flex justify-between items-center mb-4">
                    <h2 className="text-2xl font-bold">Today's CV Count</h2>
                </div>

                {/* Chart Section */}
                <div className="items-center justify-center">
                    <div className='relative w-full h-[75%]'>
                        <ResponsiveContainer height={200}>
                            <PieChart>
                                <Pie
                                    data={data}
                                    dataKey="value"
                                    nameKey="name"
                                    cx="50%"
                                    cy="50%"
                                    outerRadius={85}
                                    innerRadius={70}
                                >
                                    {data.map((entry, index) => (
                                        <Cell key={`cell-${index}`} fill={colors[index % colors.length]} />
                                    ))}
                                </Pie>
                                <Tooltip />
                            </PieChart>
                        </ResponsiveContainer>
                        <div className='absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-center'>
                            <span className='text-3xl font-bold'>{totalCvs}</span><br />
                            <span className='text-sm text-gray-700'>CVs today</span>
                        </div>
                    </div>
                    <div className="flex flex-wrap justify-center mt-4">
                        {data.map((entry, index) => (
                            <div key={`legend-${index}`} className="flex items-center m-2">
                                <div className={`w-1 h-3 mr-2`} style={{ backgroundColor: colors[index % colors.length] }}></div>
                                <span className="text-sm font-semibold">{entry.name}</span>
                                <span className="text-sm text-gray-500 ml-1">{entry.value}</span>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default CVCount;
