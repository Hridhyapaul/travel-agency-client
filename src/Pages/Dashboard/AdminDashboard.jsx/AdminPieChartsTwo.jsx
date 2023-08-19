import React from 'react';
import useChartData from '../../../Hooks/useChartData';
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip, Legend } from 'recharts';

const AdminPieChartsTwo = () => {
    const [chartData] = useChartData();
    console.log(chartData);

    const COLORS = ['#FF5733', '#3498DB', '#2ECC71', '#E74C3C', '#9B59B6', '#1ABC9C', '#F39C12', '#E67E22', '#27AE60', '#E91E63'];

    const RADIAN = Math.PI / 180;
    const renderCustomizedLabel = ({ cx, cy, midAngle, innerRadius, outerRadius, percent }) => {
        const radius = innerRadius + (outerRadius - innerRadius) * 0.5;
        const x = cx + radius * Math.cos(-midAngle * RADIAN);
        const y = cy + radius * Math.sin(-midAngle * RADIAN);

        return (
            <text x={x} y={y} fill="white" textAnchor={x > cx ? 'start' : 'end'} dominantBaseline="central">
                {`${(percent * 100).toFixed(0)}%`}
            </text>
        );
    };

    return (
        <div style={{ width: '100%', height: '300px' }}>
            <ResponsiveContainer width="100%" height="100%">
                <PieChart width={400} height={400}>
                    <Pie
                        data={chartData}
                        cx="50%"
                        cy="50%"
                        labelLine={false}
                        label={renderCustomizedLabel}
                        outerRadius={80}
                        fill="#8884d8"
                        dataKey="count"
                    >
                        {chartData.map((entry, index) => (
                            <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                        ))}
                    </Pie>
                    <Tooltip formatter={(value) => `${value}`} />
                    <Legend verticalAlign="left" content={(props) => <CustomLegend {...props} chartData={chartData} />} />
                </PieChart>
            </ResponsiveContainer>
        </div>
    );
};

const CustomLegend = ({ payload, chartData }) => {
    return (
        <ul className="ml-10">
            {payload.map((entry, index) => (
                <li key={`item-${index}`} style={{ color: entry.color }}>
                    {chartData[index].countryName}
                </li>
            ))}
        </ul>
    );
};

export default AdminPieChartsTwo;