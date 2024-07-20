"use client";
import { useState } from "react";
import { createClient } from "../../../../utils/supabase/client";

const BreastfeedingForm = () => {
  const [supplement, setSupplement] = useState<number | null>(null);
  const [pumped, setPumped] = useState<number | null>(null);
  const [breastfeeding, setBreastfeeding] = useState<number | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setSuccess(null);

    if (!supplement && !pumped && !breastfeeding) {
      setError("At least one field must be filled.");
      return;
    }
    const supabase = createClient();
    const user = await supabase.auth.getUser();

    if (!user.data.user) {
      setError("User not logged in.");
      return;
    }

    let type = "";
    let amount_ml: number | null = null;
    let time_minutes: number | null = null;

    if (supplement) {
      type = "supplement";
      amount_ml = supplement;
    } else if (pumped) {
      type = "pumped";
      amount_ml = pumped;
    } else if (breastfeeding) {
      type = "breastfeeding";
      time_minutes = breastfeeding;
    }

    const { error } = await supabase.from("breastfeeding_records").insert([
      {
        user_id: user.data.user.id,
        type,
        amount_ml,
        time_minutes,
      },
    ]);

    if (error) {
      setError(error.message);
    } else {
      setSuccess("Record submitted successfully.");
      setSupplement(null);
      setPumped(null);
      setBreastfeeding(null);
    }
  };

  return (
    <div className="max-w-lg mx-auto mt-10 p-6 bg-white shadow-md rounded-lg">
      <h2 className="text-2xl font-bold mb-4">Breastfeeding Tracker</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-700">
            Amount of Milk Supplement (ml):
          </label>
          <input
            type="number"
            value={supplement ?? ""}
            onChange={(e) =>
              setSupplement(
                e.target.value ? parseInt(e.target.value, 10) : null
              )
            }
            className="mt-1 block w-full p-2 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700">
            Amount of Pumped Milk (ml):
          </label>
          <input
            type="number"
            value={pumped ?? ""}
            onChange={(e) =>
              setPumped(e.target.value ? parseInt(e.target.value, 10) : null)
            }
            className="mt-1 block w-full p-2 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700">
            Time Breastfeeding (minutes):
          </label>
          <input
            type="number"
            value={breastfeeding ?? ""}
            onChange={(e) =>
              setBreastfeeding(
                e.target.value ? parseInt(e.target.value, 10) : null
              )
            }
            className="mt-1 block w-full p-2 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
          />
        </div>
        <button
          type="submit"
          className="w-full py-2 px-4 bg-indigo-600 text-white font-semibold rounded-md shadow-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500"
        >
          Submit
        </button>
        {error && <p className="mt-2 text-sm text-red-600">{error}</p>}
        {success && <p className="mt-2 text-sm text-green-600">{success}</p>}
      </form>
    </div>
  );
};

export default BreastfeedingForm;
