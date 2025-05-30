import { useState } from "react";
import axios from "axios";

function DreamForm() {
  const [dream, setDream] = useState("");
  const [result, setResult] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setResult("");
    setError("");

    try {
      const response = await axios.post("/api/dream", { dream });
      setResult(response.data.message);
    } catch (err) {
      console.error(err);
      setError("Something went wrong while decoding your dream.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-xl mx-auto mt-10 p-6 bg-white bg-opacity-80 rounded-2xl shadow-2xl backdrop-blur-lg border border-white border-opacity-30">
      <h1 className="text-4xl font-extrabold text-center text-purple-800 mb-6 tracking-tight drop-shadow-md animate-fade-in">
        🌌 Dream Decoder 🌙
      </h1>
      <form onSubmit={handleSubmit} className="mb-4">
        <textarea
          className="w-full p-4 h-40 resize-none border-2 border-purple-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
          placeholder="Describe your dream in detail..."
          value={dream}
          onChange={(e) => setDream(e.target.value)}
        ></textarea>
        <button
          type="submit"
          className="w-full mt-4 bg-gradient-to-r from-purple-500 to-pink-500 text-white py-3 rounded-xl font-semibold hover:from-pink-500 hover:to-purple-500 transition-all duration-300 shadow-lg"
        >
          Decode My Dream
        </button>
      </form>

      {loading && (
        <p className="text-center text-purple-600 font-medium animate-pulse">
          Interpreting your dream...
        </p>
      )}
      {error && (
        <p className="text-center text-red-500 font-medium">{error}</p>
      )}
      {result && (
        <div className="mt-6 p-4 bg-purple-100 bg-opacity-80 rounded-xl border-l-4 border-purple-500 shadow">
          <h2 className="text-lg font-semibold text-purple-800 mb-2">
            Interpretation:
          </h2>
          <p className="text-purple-700">{result}</p>
        </div>
      )}
    </div>
  );
}

export default DreamForm;
