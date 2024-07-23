"use client";
import { useState } from "react";
import { createClient } from "../../../../utils/supabase/client";
import { Button, Input } from "@nextui-org/react";

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
    const now = new Date().toISOString();

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
        reported_at: now,
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
    <div className="flex justify-center items-center min-h-screen mt--16">
      <form
        onSubmit={handleSubmit}
        className="h-full space-y-4 p-6 rounded-lg  w-full max-w-sm mx-4"
      >
        <div>
          <label className="block text-sm font-medium text-gray-700">
            Amount of Milk Supplement (ml):
          </label>
          <Input
            type="number"
            value={supplement?.toString()}
            onChange={(e) =>
              setSupplement(
                e.target.value ? parseInt(e.target.value, 10) : null
              )
            }
            fullWidth
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700">
            Amount of Pumped Milk (ml):
          </label>
          <Input
            type="number"
            value={pumped?.toString()}
            onChange={(e) =>
              setPumped(e.target.value ? parseInt(e.target.value, 10) : null)
            }
            fullWidth
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700">
            Time Breastfeeding (minutes):
          </label>
          <Input
            type="number"
            value={breastfeeding?.toString()}
            onChange={(e) =>
              setBreastfeeding(
                e.target.value ? parseInt(e.target.value, 10) : null
              )
            }
            fullWidth
          />
        </div>
        <Button type="submit" color="primary" className="w-full">
          Submit
        </Button>
        {error && <p className="mt-2 text-sm text-red-600">{error}</p>}
        {success && <p className="mt-2 text-sm text-green-600">{success}</p>}
      </form>
    </div>
  );
};

export default BreastfeedingForm;
