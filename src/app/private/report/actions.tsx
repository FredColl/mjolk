import dayjs from "dayjs";
import { createClient } from "../../../../utils/supabase/client";

interface TableData {
  date: string;
  supplement: number;
  pumped: number;
  breastfeeding: number;
}

export const fetchDataForToday = async (userId: string) => {
  // Get the start of today's date
  const today = new Date();
  today.setHours(0, 0, 0, 0);
  const supabase = createClient();
  const { data, error } = await supabase
    .from("breastfeeding_records")
    .select("type, amount_ml, time_minutes, reported_at, created_at")
    .eq("user_id", userId)
    .gte("created_at", today.toISOString()); // Filter by user ID

  if (error) {
    throw new Error(error.message);
  }

  const transformedData = data.map((d) => ({
    date: dayjs(d.reported_at).format("HH:mm"),
    supplement: d.amount_ml,
    pumped: d.amount_ml,
    breastfeeding: d.time_minutes,
  })) as TableData[];

  return transformedData;
};
