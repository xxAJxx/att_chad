"use client";

import { useState } from "react";

export default function Comp() {
    const [studentName, setStudentName] = useState("ajay");
    const [selectedSubject, setSelectedSubject] = useState("Math");
    const [attendanceData, setAttendanceData] = useState();
    const [result, setResult] = useState(null);

    const handleSubmit = async (e) => {
        e.preventDefault();

        const response = await fetch("/api/getdata");
        const data = await response.json();
        const attenData = JSON.parse(data.data);
        delete attenData["name"];
        delete attenData["_id"];
        console.log(attenData);
        setAttendanceData(attenData);

        const percentageCAT1 = calculateAttendance(30);

        // CAT1
        const passOrFailCAT1 = percentageCAT1 >= 75 ? "Approved" : "Debarred";
        const percentageCAT2 = calculateAttendancecat2(60, passOrFailCAT1);

        //CAT2
        const passOrFailCAT2 = percentageCAT2 >= 75 ? "Approved" : "Debarred";
        const percentageFAT = calculateAttendancefat(90, passOrFailCAT2);

        //FAT
        const passOrFailFAT = percentageFAT >= 75 ? "Approved" : "Debarred";

        setResult({ percentageCAT1, passOrFailCAT1, percentageCAT2, passOrFailCAT2, percentageFAT, passOrFailFAT });

    };

    const calculateAttendance = (days) => {
        const presentDays = attendanceData[studentName][selectedSubject].slice(0, days).filter((day) => day === 1).length;
        const totalDays = days;
        const percentage = (presentDays / totalDays) * 100;
        console.log(presentDays, totalDays, percentage);
        return percentage;
    };

    const calculateAttendancecat2 = (days, percentageCAT2) => {
        if (percentageCAT2 == "Debarred") {
            const pDays = attendanceData[studentName][selectedSubject].slice(0, 30).filter((day) => day === 1).length;
            const ifhewillmakeit = ((pDays + 30) / days) * 100;
            if (ifhewillmakeit < 75) {
                const revisedDays = attendanceData[studentName][selectedSubject].slice(31, days).filter((day) => day === 1).length;
                const percentage = (revisedDays / 30) * 100;
                return percentage;
            }
        }
        const presentDays = attendanceData[studentName][selectedSubject].slice(0, days).filter((day) => day === 1).length;
        const totalDays = days;
        const percentage = (presentDays / totalDays) * 100;
        console.log(presentDays, totalDays, percentage);
        return percentage;
    };

    const calculateAttendancefat = (days, passOrFailCAT2) => {
        if (passOrFailCAT2 == "Debarred") {
            const pDays = attendanceData[studentName][selectedSubject].slice(31, 60).filter((day) => day === 1).length;
            const ifhewillmakeit = ((pDays + 30) / 60) * 100;
            if (ifhewillmakeit < 75) {
                const revisedDays = attendanceData[studentName][selectedSubject].slice(61, days).filter((day) => day === 1).length;
                const percentage = (revisedDays+30 / 60) * 100;
                return percentage;









































































































































































































































































































































































































































































































































































































































































































































































































































































































                
            }
        }
        const presentDays = attendanceData[studentName][selectedSubject].slice(0, days).filter((day) => day === 1).length;
        const totalDays = days;
        const percentage = (presentDays / totalDays) * 100;
        console.log(presentDays, totalDays, percentage);
        return percentage;
    };

    return (
        <div className="p-10">
            <h1 className="text-4xl font-bold">Attendance Checker</h1>

            <div className="max-w-md mx-auto mt-8">
                <form onSubmit={handleSubmit}>
                    <div className="mb-4">
                        <label className="block text-gray-700 text-sm font-bold mb-2">Student Name</label>
                        <input
                            type="text"
                            className="w-full border border-gray-300 p-2 rounded"
                            placeholder="Enter Student Name"
                            value={studentName}
                            onChange={(e) => setStudentName(e.target.value)}
                            required
                        />
                    </div>

                    <div className="mb-4">
                        <label className="block text-gray-700 text-sm font-bold mb-2">Select Subject</label>
                        <select
                            className="w-full border border-gray-300 p-2 rounded"
                            value={selectedSubject}
                            onChange={(e) => setSelectedSubject(e.target.value)}
                            required
                        >
                            <option value="">Select Subject</option>
                            <option value="Math">Math</option>
                            <option value="Science">Science</option>
                            <option value="History">History</option>
                            <option value="English">English</option>
                            <option value="Hindi">Hindi</option>
                        </select>
                    </div>

                    <button
                        type="submit"
                        className="bg-blue-500 hover:bg-blue-600 text-white py-2 px-4 rounded-lg"
                    >
                        Submit
                    </button>
                </form>
            </div>

            {result && (
                <div className="mt-8">
                    <p className="text-lg">CAT 1 Percentage: {result.percentageCAT1.toFixed(2)}%</p>
                    <p className="text-lg">CAT 1 Result: {result.passOrFailCAT1}</p>
                    <p className="text-lg">CAT 2 Percentage: {result.percentageCAT2.toFixed(2)}%</p>
                    <p className="text-lg">CAT 2 Result: {result.passOrFailCAT2}</p>
                    <p className="text-lg">FAT Percentage: {result.percentageFAT.toFixed(2)}%</p>
                    <p className="text-lg">FAT Result: {result.passOrFailFAT}</p>
                </div>
            )}
        </div>
    );
}
