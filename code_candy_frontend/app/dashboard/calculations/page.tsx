'use client';
import React, { useState, useEffect } from 'react';

interface Tabs {
    [key: string]: {
        inputs: number;
        formula: string;
        type?: string[];
    };
}

export default function Page() {
    const tabs: Tabs = {
        'Addition': { inputs: 2, formula: 'a + b' },
        'Subtraction': { inputs: 2, formula: 'a - b' },
        'Multiplication': { inputs: 2, formula: 'a × b' },
        'Division': { inputs: 2, formula: 'a ÷ b' },
        'Average': { inputs: 3, formula: 'Sum of values / Number of values' },
        'Maximum': { inputs: 4, formula: 'Maximum value among inputs' },
        'Minimum': { inputs: 4, formula: 'Minimum value among inputs' },
        'Celsius to Fahrenheit': { inputs: 1, formula: 'C × 9/5 + 32' },
        'Fahrenheit to Celsius': { inputs: 1, formula: '(F - 32) × 5/9' },
        'Percentage': { inputs: 2, formula: '(Part / Whole) × 100' },
        'Compound Interest': { inputs: 3, formula: 'P × (1 + r/100)^t - P' },
        'BMI': { inputs: 2, formula: 'Weight / (Height^2)' },
        'Simple Interest': { inputs: 3, formula: 'P × r × t / 100' },
        'Distance': { inputs: 2, formula: 'Speed × Time' },
        'Square Root': { inputs: 1, formula: '√Value' },
        'Area of Circle': { inputs: 1, formula: 'π × r^2' },
        'Area of Rectangle': { inputs: 2, formula: 'Length × Width' },
        'Area of Triangle': { inputs: 2, formula: '0.5 × Base × Height' },
        'Loan Repayment': { inputs: 3, formula: 'P × r × (1 + r)^n / ((1 + r)^n - 1)' },
        'Unit Conversion': { inputs: 2, formula: 'Value × Conversion Factor' },
        'Tip Calculator': { inputs: 2, formula: 'Bill Amount × Tip Percentage / 100' },
        'Calories Burned': { inputs: 2, formula: 'MET × Weight × Duration / 60' },
        'Work Hours': { inputs: 2, formula: 'End Time - Start Time', type: ['time', 'time'] },
        'Add Hours to Time': { inputs: 2, formula: 'Current Date + Hours = New Date', type: ['date', 'number'] },
        'Date Difference': { inputs: 2, formula: 'End Date - Start Date', type: ['date', 'date'] },
        'Time Difference': { inputs: 2, formula: 'End Time - Start Time', type: ['time', 'time'] },
        'Convert Time to Seconds': { inputs: 1, formula: 'HH × 3600 + MM × 60 + SS', type: ['time'] },
        'Convert Seconds to Time': { inputs: 1, formula: 'Seconds ÷ 3600 = HH; (Seconds % 3600) ÷ 60 = MM; Seconds % 60 = SS', type: ['number'] },
        'Date Addition': { inputs: 2, formula: 'Date + Days = New Date', type: ['date', 'number'] },
        'Date Subtraction': { inputs: 2, formula: 'Date - Days = New Date', type: ['date', 'number'] },
    };

    const [selectedTab, setSelectedTab] = useState<string>('Addition');
    const [inputValues, setInputValues] = useState<{ [key: string]: string[] }>({});
    const [result, setResult] = useState<number | string>('');
    const [additionalInfo, setAdditionalInfo] = useState<string>('');

    const handleTabClick = (tab: string) => {
        setSelectedTab(tab);
        setResult('');  // Reset result when switching tabs
        setAdditionalInfo(''); // Reset additional info
    };

    const handleInputChange = (index: number, value: string) => {
        setInputValues((prevValues) => ({
            ...prevValues,
            [selectedTab]: [
                ...(prevValues[selectedTab] || []),
                ...Array(Math.max(index + 1 - (prevValues[selectedTab]?.length || 0), 0)).fill(''),
            ].map((v, i) => (i === index ? value : v)),
        }));
    };

    useEffect(() => {
        calculateResult();
    }, [inputValues, selectedTab]);

    const calculateResult = () => {
        const values = (inputValues[selectedTab]?.map((v, i) => {
            if (tabs[selectedTab].type && tabs[selectedTab].type[i] === 'number') {
                return Number(v);
            } else if (tabs[selectedTab].type && tabs[selectedTab].type[i] === 'date') {
                return new Date(v);
            } else if (tabs[selectedTab].type && tabs[selectedTab].type[i] === 'time') {
                return v;
            }
            return v;
        }) || []).filter(value => value !== '' && value !== 0);

        let calculatedResult: number | string = '';
        let extraInfo: string = '';

        switch (selectedTab) {
            case 'Addition':
                if (values.length > 0) calculatedResult = values.reduce((acc, curr) => acc + curr, 0);
                break;
            case 'Subtraction':
                if (values.length > 1) calculatedResult = values[0] - values[1];
                break;
            case 'Multiplication':
                if (values.length > 0) calculatedResult = values.reduce((acc, curr) => acc * curr, 1);
                break;
            case 'Division':
                if (values.length > 1 && values[1] !== 0) {
                    calculatedResult = values[0] / values[1];
                } else {
                    calculatedResult = 'Cannot divide by 0';
                }
                break;
            case 'Average':
                if (values.length > 0) calculatedResult = values.reduce((acc, curr) => acc + curr, 0) / values.length;
                break;
            case 'Maximum':
                if (values.length > 0) calculatedResult = Math.max(...values);
                break;
            case 'Minimum':
                if (values.length > 0) calculatedResult = Math.min(...values);
                break;
            case 'Celsius to Fahrenheit':
                if (values.length > 0) {
                    calculatedResult = (values[0] * 9/5) + 32;
                }
                break;
            case 'Fahrenheit to Celsius':
                if (values.length > 0) {
                    calculatedResult = (values[0] - 32) * 5/9;
                }
                break;
            case 'Percentage':
                if (values.length > 1) {
                    calculatedResult = (values[0] / values[1]) * 100;
                }
                break;
            case 'Compound Interest':
                if (values.length > 2) {
                    const [principal, rate, time] = values;
                    const interest = principal * Math.pow((1 + rate / 100), time) - principal;
                    calculatedResult = interest;
                }
                break;
            case 'BMI':
                if (values.length > 1) {
                    const [weight, height] = values;
                    calculatedResult = weight / (height * height);
                }
                break;
            case 'Simple Interest':
                if (values.length > 2) {
                    const [principal, rate, time] = values;
                    calculatedResult = (principal * rate * time) / 100;
                }
                break;
            case 'Distance':
                if (values.length > 1) {
                    const [speed, time] = values;
                    calculatedResult = speed * time;
                }
                break;
            case 'Square Root':
                if (values.length > 0) {
                    calculatedResult = Math.sqrt(values[0]);
                }
                break;
            case 'Area of Circle':
                if (values.length > 0) {
                    calculatedResult = Math.PI * Math.pow(values[0], 2);
                }
                break;
            case 'Area of Rectangle':
                if (values.length > 1) {
                    calculatedResult = values[0] * values[1];
                }
                break;
            case 'Area of Triangle':
                if (values.length > 1) {
                    calculatedResult = 0.5 * values[0] * values[1];
                }
                break;
            case 'Loan Repayment':
                if (values.length > 2) {
                    const [principal, annualRate, months] = values;
                    const monthlyRate = annualRate / 12 / 100;
                    calculatedResult = (principal * monthlyRate * Math.pow(1 + monthlyRate, months)) / (Math.pow(1 + monthlyRate, months) - 1);
                }
                break;
            case 'Unit Conversion':
                if (values.length > 1) {
                    calculatedResult = values[0] * values[1];
                }
                break;
            case 'Tip Calculator':
                if (values.length > 1) {
                    const [billAmount, tipPercentage] = values;
                    calculatedResult = (billAmount * tipPercentage) / 100;
                }
                break;
            case 'Calories Burned':
                if (values.length > 2) {
                    const [met, weight, duration] = values;
                    calculatedResult = met * weight * duration / 60;
                }
                break;
            case 'Work Hours':
                if (values.length > 1) {
                    const [startTime, endTime] = values;
                    const [startH, startM] = startTime.split(':').map(Number);
                    const [endH, endM] = endTime.split(':').map(Number);
                    const start = new Date();
                    start.setHours(startH, startM, 0, 0);
                    const end = new Date();
                    end.setHours(endH, endM, 0, 0);
                    const diff = (end.getTime() - start.getTime()) / (1000 * 60 * 60); // Difference in hours
                    calculatedResult = diff;
                }
                break;
            case 'Add Hours to Time':
                if (values.length > 1) {
                    const [dateStr, hoursToAdd] = [values[0], values[1]];
                    const date = new Date(dateStr);
                    date.setHours(date.getHours() + Number(hoursToAdd));
                    const istTime = new Date(date.toLocaleString('en-US', { timeZone: 'Asia/Kolkata' }));
                    const timeString = istTime.toISOString().split('T')[1].split('.')[0];
                    calculatedResult = `${date.toDateString()} ${timeString}`;
                }
                break;
            case 'Date Difference':
                if (values.length > 1) {
                    const [startDate, endDate] = values;
                    const diffTime = Math.abs(endDate.getTime() - startDate.getTime());
                    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24)); // difference in days
                    calculatedResult = diffDays;
                }
                break;
            case 'Time Difference':
                if (values.length > 1) {
                    const [startTime, endTime] = values;
                    const [startH, startM, startS] = startTime.split(':').map(Number);
                    const [endH, endM, endS] = endTime.split(':').map(Number);
                    const start = new Date();
                    start.setHours(startH, startM, startS, 0);
                    const end = new Date();
                    end.setHours(endH, endM, endS, 0);
                    const diff = (end.getTime() - start.getTime()) / 1000; // Difference in seconds
                    const hours = Math.floor(diff / 3600);
                    const minutes = Math.floor((diff % 3600) / 60);
                    const seconds = Math.floor(diff % 60);
                    calculatedResult = `${hours} hours, ${minutes} minutes, ${seconds} seconds`;
                }
                break;
            case 'Convert Time to Seconds':
                if (values.length > 0) {
                    const [timeStr] = values;
                    const [hours, minutes, seconds] = timeStr.split(':').map(Number);
                    calculatedResult = (hours * 3600) + (minutes * 60) + seconds;
                }
                break;
            case 'Convert Seconds to Time':
                if (values.length > 0) {
                    const [totalSeconds] = values;
                    const hours = Math.floor(totalSeconds / 3600);
                    const minutes = Math.floor((totalSeconds % 3600) / 60);
                    const seconds = totalSeconds % 60;
                    calculatedResult = `${hours}:${minutes}:${seconds}`;
                }
                break;
            case 'Date Addition':
                if (values.length > 1) {
                    const [dateStr, daysToAdd] = [values[0], values[1]];
                    const date = new Date(dateStr);
                    date.setDate(date.getDate() + Number(daysToAdd));
                    calculatedResult = date.toDateString();
                }
                break;
            case 'Date Subtraction':
                if (values.length > 1) {
                    const [dateStr, daysToSubtract] = [values[0], values[1]];
                    const date = new Date(dateStr);
                    date.setDate(date.getDate() - Number(daysToSubtract));
                    calculatedResult = date.toDateString();
                }
                break;
            default:
                calculatedResult = '';
        }

        setResult(calculatedResult);
        setAdditionalInfo(extraInfo);
    };

    return (
        <div className="flex">
            <div className="flex flex-col w-[30vw] p-4 overflow-y-auto max-h-screen h-[37rem]"> 
                {Object.keys(tabs).map((tab) => (
                                        <div
                        key={tab}
                        onClick={() => handleTabClick(tab)}
                        className={`p-3 hover:bg-gray-200 text-center mb-2 cursor-pointer text-black ${selectedTab === tab ? 'bg-gray-300' : 'bg-white'}`}
                        style={{ width: '26vw' }}
                    >
                        {tab}
                    </div>
                ))}
            </div>
            <div className="ml-5 flex-1 p-4">
                <h2 className="text-xl font-bold mb-4 text-black">{selectedTab}</h2>
                {tabs[selectedTab].inputs > 0 && (
                    <div className="flex flex-col">
                        {Array.from({ length: tabs[selectedTab].inputs }, (_, index) => (
                            <div key={index} className="mb-4">
                                <label className="block mb-1 text-black">{`Input ${index + 1}`}</label>
                                <input
                                    type={tabs[selectedTab].type && tabs[selectedTab].type[index] === 'date' ? 'date' : tabs[selectedTab].type && tabs[selectedTab].type[index] === 'time' ? 'time' : 'text'}
                                    value={inputValues[selectedTab]?.[index] || ''}
                                    onChange={(e) => handleInputChange(index, e.target.value)}
                                    className="border p-2 w-full text-black"
                                />
                            </div>
                        ))}
                        <div className="mt-4">
                            <h3 className="text-lg font-bold text-black">Result:</h3>
                            <div className="border p-4 mt-2" style={{ width: '20vw', height: '15vh', color: 'black' }}>
                                {result !== '' ? result : 'No result to display'}
                            </div>
                            {additionalInfo && (
                                <div className="border p-4 mt-2" style={{ width: '20vw', height: '15vh', color: 'black' }}>
                                    {additionalInfo}
                                </div>
                            )}
                            <h3 className="text-lg font-bold mt-4 text-black">Formula:</h3>
                            <div className="border p-4 mt-2" style={{ width: '20vw', height: '15vh', color: 'black' }}>
                                {tabs[selectedTab].formula}
                            </div>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
}
