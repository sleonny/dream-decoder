import { useState } from "react";
import axios from "axios";

export default function DreamForm() {
  const [dream, setDream] = useState("");
  const [response, setResponse] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post("http://localhost:5000/api/dream", { dream });
      setResponse(res.data.message);
    } catch (err) {
      setResponse("Something went wrong.");
      console.error(err);
    }
  };

  return (
    <div className="p-4 max-w-xl mx-auto">
      <h1 className="text-2xl font-bold mb-4">Dream Decoder</h1>
      <form onSubmit={handleSubmit} className="space-y-4">
        <textarea
          className="w-full p-2 border rounded"
          rows="4"
          placeholder="Describe your dream..."
          value={dream}
          onChange={(e) => setDream(e.target.value)}
        />
        <button className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600" type="submit">
          Decode Dream
        </button>
      </form>
      {response && (
        <div className="mt-4 p-4 bg-gray-100 border rounded">
          <strong>Interpretation:</strong> {response}
        </div>
      )}
    </div>
  );
}
