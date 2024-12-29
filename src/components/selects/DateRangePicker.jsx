"use client";
import { useRouter, useSearchParams } from "next/navigation";
import React, { useEffect, useState } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

const CustomDateRangePicker = ({ startDateParam, endDateParam, defaultStartDate, defaultEndDate }) => {
    const router = useRouter();
    const searchParams = useSearchParams();
    const searchedEndDate = searchParams.get(endDateParam);
    const searchedStartDate = searchParams.get(startDateParam);

    // Default dates
    const currentDate = new Date();
    const oneMonthAhead = new Date();
    oneMonthAhead.setMonth(oneMonthAhead.getMonth() + 1);

    // States for date selection
    const [startDate, setStartDate] = useState(null);
    const [endDate, setEndDate] = useState(null);

    // Initialize dates from search params or fallback
    useEffect(() => {
        if (searchedStartDate) setStartDate(new Date(searchedStartDate));
        if (searchedEndDate) setEndDate(new Date(searchedEndDate));
        if (defaultStartDate && !searchedStartDate) setStartDate(new Date(defaultStartDate));
        if (defaultEndDate && !searchedEndDate) setEndDate(new Date(defaultEndDate));
        if (!searchedEndDate && !defaultEndDate) setEndDate(null);
        if (!searchedStartDate && !defaultStartDate) setStartDate(null)
    }, [searchedEndDate, searchedStartDate, defaultEndDate, defaultStartDate]);

    // Handle search params update
    const handleSelect = () => {
        if (!startDate || !endDate) return;
        const formattedStartDate = startDate.toISOString().split("T")[0];
        const formattedEndDate = endDate.toISOString().split("T")[0];
        
        const query = new URLSearchParams(window.location.search);
        query.set(startDateParam, formattedStartDate);
        query.set(endDateParam, formattedEndDate);

        router.replace(`${window.location.pathname}?${query.toString()}`, { scroll: false });
    };

    return (
        <>
            <div className="flex flex-wrap items-center justify-center ">
                <div className="flex gap-6 justify-center flex-wrap">
                    {/* Start Date Picker */}
                    <div className="w-[240px]">
                        <DatePicker
                            selected={startDate}
                            onChange={setStartDate}
                            placeholderText="শুরুর তারিখ"
                            dateFormat="dd/MM/yyyy"
                            className="w-full p-3 border rounded-md shadow-sm dark:bg-gray-800 dark:text-gray-100 dark:border-gray-700 bg-white text-gray-900 border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />
                    </div>

                    {/* End Date Picker */}
                    <div className="w-[240px]">
                        <DatePicker
                            selected={endDate}
                            onChange={setEndDate}
                            dateFormat="dd/MM/yyyy"
                            placeholderText="শেষের তারিখ"
                            filterDate={(date) => date > startDate}
                            className="w-full p-3 border rounded-md shadow-sm dark:bg-gray-800 dark:text-gray-100 dark:border-gray-700 bg-white text-gray-900 border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />
                    </div>

                    {/* Submit Button */}
                </div>
                <button
                    className="px-5 h-fit py-3 bg-blue-600 text-white rounded-md shadow-md hover:bg-blue-700 focus:ring-2 focus:ring-blue-500 focus:outline-none dark:bg-blue-700 dark:hover:bg-blue-800"
                    onClick={handleSelect}
                >
                    দেখুন
                </button>
            </div>
        </>
    );
};

export default CustomDateRangePicker;