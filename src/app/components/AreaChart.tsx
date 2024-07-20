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
  Filler,
} from "chart.js";

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  Filler
);

interface AreaChartProps {
  data: any;
}

const AreaChart = ({ data }: AreaChartProps) => {
  if (!data) {
    return <p>No data available</p>;
  }
  const labels = Object.keys(data);

  const pumpedData = labels.map((date) => data[date].pumped);
  const supplementData = labels.map((date) => data[date].supplement);
  const breastfeedingData = labels.map((date) => data[date].breastfeeding);

  const chartData = {
    labels,
    datasets: [
      {
        label: "Pumped (ml)",
        data: pumpedData,
        borderColor: "rgba(75, 192, 192, 1)",
        backgroundColor: "rgba(75, 192, 192, 0.2)",
        fill: true,
        type: "line" as const,
        order: 1,
      },
      {
        label: "Supplement (ml)",
        data: supplementData,
        borderColor: "rgba(153, 102, 255, 1)",
        backgroundColor: "rgba(153, 102, 255, 0.2)",
        fill: true,
        type: "line" as const,
        order: 2,
      },
      {
        label: "Breastfeeding (minutes)",
        data: breastfeedingData,
        borderColor: "rgba(255, 160, 122, 1)", // Softer red color
        backgroundColor: "rgba(255, 160, 122, 0.2)",
        fill: false,
        type: "line" as const,
        yAxisID: "y1" as const,
        order: 0,
      },
    ],
  };

  const chartOptions = {
    responsive: true,
    plugins: {
      legend: {
        position: "top" as const,
      },
    },
    scales: {
      x: {
        stacked: false,
        title: {
          display: true,
          text: "Date",
        },
      },
      y: {
        stacked: true,
        title: {
          display: true,
          text: "Amount (ml)",
        },
      },
      y1: {
        position: "right" as const,
        title: {
          display: true,
          text: "Time (minutes)",
        },
        grid: {
          drawOnChartArea: false, // only want the grid lines for one axis to show up
        },
      },
    },
  };

  return <Line data={chartData} options={chartOptions} />;
};

export default AreaChart;
