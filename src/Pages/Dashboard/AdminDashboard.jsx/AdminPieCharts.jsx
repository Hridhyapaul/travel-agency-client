import useChartData from "../../../Hooks/useChartData";
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip, Legend } from 'recharts';

const AdminPieCharts = () => {
    const [chartData] = useChartData();
    console.log(chartData);

    const COLORS = ['#FA6166', '#234E70', '#990012', '#FF69B3', '#EE4E34', '#7B2049'];

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
                        dataKey="paidAmount"
                    >
                        {chartData.map((entry, index) => (
                            <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                        ))}
                    </Pie>
                    <Tooltip formatter={(value) => `$${value}`} />
                    <Legend verticalAlign="left" content={(props) => <CustomLegend {...props} chartData={chartData} />} />
                </PieChart>
            </ResponsiveContainer>
        </div>
    );
};

const CustomLegend = ({ payload, chartData }) => {
    return (
        <ul>
            {payload.map((entry, index) => (
                <li key={`item-${index}`} style={{ color: entry.color }}>
                    {chartData[index].countryName}
                </li>
            ))}
        </ul>
    );
};

export default AdminPieCharts;