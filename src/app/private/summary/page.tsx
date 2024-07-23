"use client";
import { useEffect, useState } from "react";

import AreaChart from "../../components/AreaChart";
import SortableTable from "../../components/SortableTable";
import { createClient } from "../../../../utils/supabase/client";
import { fetchSummaryData } from "./actions";

interface TableData {
  date: string;
  supplement: number;
  pumped: number;
  breastfeeding: number;
}

const Summary = () => {
  const [summaryData, setSummaryData] = useState<Record<
    string,
    TableData
  > | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [isClient, setIsClient] = useState(false);
  const supabase = createClient();

  useEffect(() => {
    setIsClient(true);
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

  if (!isClient) {
    return null;
  }

  return (
    <div className="p-4">
      {/* <h1 className="text-2xl font-bold mb-4">Historical Summary</h1> */}
      {loading && <p>Loading...</p>}
      {error && <p>Error: {error}</p>}
      {!loading && !error && summaryData && (
        <>
          <h3 className="text-lg font-bold mb-2">Summary Graph</h3>
          <AreaChart data={summaryData} />
          <div className="overflow-x-auto mb-6">
            <h3 className="text-lg font-bold mb-2">Summary Data</h3>
            <SortableTable data={summaryData} />
          </div>
        </>
      )}
    </div>
  );
};

export default Summary;
