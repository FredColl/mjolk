import { Line } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

interface LineChartProps {
  data: any;
}

const LineChart = ({ data }: LineChartProps) => {
  const labels = Object.keys(data);

  const pumpedData = labels.map((date) => data[date].pumped);
  const supplementData = labels.map((date) => data[date].supplement);

  const chartData = {
    labels,
    datasets: [
      {
        label: "Pumped (ml)",
        data: pumpedData,
        borderColor: "rgba(75, 192, 192, 1)",
        backgroundColor: "rgba(75, 192, 192, 0.2)",
        fill: true,
      },
      {
        label: "Supplement (ml)",
        data: supplementData,
        borderColor: "rgba(153, 102, 255, 1)",
        backgroundColor: "rgba(153, 102, 255, 0.2)",
        fill: true,
      },
    ],
  };

  const chartOptions = {
    responsive: true,
    plugins: {
      legend: {
        position: "top" as const, // Explicitly cast to allowed type
      },
    },
    scales: {
      x: {
        title: {
          display: true,
          text: "Date",
        },
      },
      y: {
        title: {
          display: true,
          text: "Amount (ml)",
        },
      },
    },
  };

  return <Line data={chartData} options={chartOptions} />;
};

export default LineChart;
