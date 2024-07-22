import { createClient } from "../../../../utils/supabase/client";

export const fetchSummaryData = async (userId: string) => {
  const supabase = createClient();
  const { data, error } = await supabase
    .from("breastfeeding_records")
    .select("type, amount_ml, time_minutes, reported_at, created_at")
    .eq("user_id", userId); // Filter by user ID

  if (error) {
    throw new Error(error.message);
  }

  const summaryData = data.reduce((acc: any, record: any) => {
    const date = new Date(record.reported_at).toISOString().split("T")[0]; // Get the date part only
    if (!acc[date]) {
      acc[date] = { supplement: 0, pumped: 0, breastfeeding: 0, date: date };
    }
    if (record.type === "supplement") {
      acc[date].supplement += record.amount_ml || 0;
    } else if (record.type === "pumped") {
      acc[date].pumped += record.amount_ml || 0;
    } else if (record.type === "breastfeeding") {
      acc[date].breastfeeding += record.time_minutes || 0;
    }
    return acc;
  }, {});

  return summaryData;
};
