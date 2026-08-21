import {
    BarChart,
    Bar,
    XAxis,
    YAxis,
    Tooltip,
    ResponsiveContainer,
} from "recharts";


function SpendingChart({ data }) {
    return (
        <div className="chart-container">
            <h2>Monthly Spending</h2>

            <ResponsiveContainer width="100%" height={400}>
                <BarChart data={data}>
                    <XAxis dataKey="month" />
                    <YAxis />
                    <Tooltip />
                    <Bar dataKey="spending" fill="#2171ec" />
                </BarChart>
            </ResponsiveContainer>
        </div>
    )
}
export default SpendingChart;