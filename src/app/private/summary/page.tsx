"use client";
import { useEffect, useState } from "react";
import { fetchSummaryData } from "./actions";
import { createClient } from "../../../../utils/supabase/client";

const Summary = () => {
  const [summaryData, setSummaryData] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const supabase = createClient();
  useEffect(() => {
    const loadData = async () => {
      try {
        const user = await supabase.auth.getUser();
        if (!user.data.user) {
          throw new Error("User not authenticated");
        }
        const data = await fetchSummaryData(user.data.user.id);
        setSummaryData(data);
      } catch (error: any) {
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };

    loadData();
  }, []);

  if (loading) {
    return <p>Loading...</p>;
  }

  if (error) {
    return <p>Error: {error}</p>;
  }

  return (
    <div className="p-4 text-black">
      <h1 className="text-2xl font-bold mb-4">Historical Summary</h1>
      <div className="overflow-x-auto">
        <table className="min-w-full bg-white shadow-md rounded-lg">
          <thead>
            <tr>
              <th className="py-2 px-4 bg-gray-200">Date</th>
              <th className="py-2 px-4 bg-gray-200">Supplement (ml)</th>
              <th className="py-2 px-4 bg-gray-200">Pumped (ml)</th>
              <th className="py-2 px-4 bg-gray-200">Breastfeeding (minutes)</th>
            </tr>
          </thead>
          <tbody>
            {Object.keys(summaryData).map((date) => (
              <tr key={date}>
                <td className="border px-4 py-2">{date}</td>
                <td className="border px-4 py-2">
                  {summaryData[date].supplement}
                </td>
                <td className="border px-4 py-2">{summaryData[date].pumped}</td>
                <td className="border px-4 py-2">
                  {summaryData[date].breastfeeding}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Summary;
