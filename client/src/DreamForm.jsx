import { useState } from "react";
import axios from "axios";

function App() {
  const [dream, setDream] = useState("");
  const [interpretation, setInterpretation] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    setInterpretation("");

    try {
      const response = await axios.post("http://localhost:5000/api/dream", { dream });
      setInterpretation(response.data.message);
    } catch (err) {
      console.error(err);
      setError("Something went wrong. Try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{ padding: "2rem", fontFamily: "sans-serif" }}>
      <h1>Dream Decoder</h1>
      <form onSubmit={handleSubmit}>
        <textarea
          value={dream}
          onChange={(e) => setDream(e.target.value)}
          placeholder="Describe your dream here..."
          rows={5}
          style={{ width: "100%", padding: "1rem", fontSize: "1rem" }}
        />
        <button type="submit" disabled={loading} style={{ marginTop: "1rem" }}>
          {loading ? "Interpreting..." : "Decode Dream"}
        </button>
      </form>

      {interpretation && (
        <div style={{ marginTop: "2rem", whiteSpace: "pre-wrap" }}>
          <strong>Interpretation:</strong>
          <p>{interpretation}</p>
        </div>
      )}

      {error && <p style={{ color: "red" }}>{error}</p>}
    </div>
  );
}

export default App;
