import useChartData from "../../../Hooks/useChartData";
import { BarChart, Bar, Cell, XAxis, YAxis, CartesianGrid } from 'recharts';

const AdminBarChart = () => {

    const [chartData] = useChartData()
    console.log(chartData)

    const colors = ['#FF5733', '#3498DB', '#2ECC71', '#E74C3C', '#9B59B6', '#1ABC9C', '#F39C12', '#E67E22', '#27AE60', '#E91E63', '#FFC300', '#8E44AD', '#D35400', '#16A085', '#2980B9', '#C0392B', '#27AE60', '#8E44AD', '#F39C12', '#3498DB'];


    const getPath = (x, y, width, height) => {
        return `M${x},${y + height}C${x + width / 3},${y + height} ${x + width / 2},${y + height / 3}
  ${x + width / 2}, ${y}
  C${x + width / 2},${y + height / 3} ${x + (2 * width) / 3},${y + height} ${x + width}, ${y + height}
  Z`;
    };

    const TriangleBar = (props) => {
        const { fill, x, y, width, height } = props;

        return <path d={getPath(x, y, width, height)} stroke="none" fill={fill} />;
    };

    return (
        <BarChart
            width={1000}
            height={300}
            data={chartData}
            margin={{
                top: 20,
                right: 30,
                left: 20,
                bottom: 5,
            }}
        >
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="countryName" />
            <YAxis />
            <Bar dataKey="paidAmount" fill="#8884d8" shape={<TriangleBar />} label={{ position: 'top' }}>
                {chartData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={colors[index % 20]} />
                ))}
            </Bar>
        </BarChart>
    );
};

export default AdminBarChart;