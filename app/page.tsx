"use client";

import { useState } from "react";

export default function Home() {
  const [customerNeed, setCustomerNeed] = useState("");
  const [quote, setQuote] = useState("");
  const [loading, setLoading] = useState(false);

  const handleGenerateQuote = async () => {
    setLoading(true);
    const res = await fetch("/api/generate-quote", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ need: customerNeed }),
    });
    const data = await res.json();
    setQuote(data.quote);
    setLoading(false);
  };

  return (
    <main style={{ padding: "2rem" }}>
      <h1>AI Quote Generator</h1>
      <textarea
        rows={4}
        cols={50}
        placeholder="Describe the customer's service need..."
        value={customerNeed}
        onChange={(e) => setCustomerNeed(e.target.value)}
      />
      <br />
      <button onClick={handleGenerateQuote} disabled={loading}>
        {loading ? "Generating..." : "Generate Quote"}
      </button>

      {quote && (
        <div style={{ marginTop: "1rem", padding: "1rem", backgroundColor: "#eee" }}>
          <h3>Generated Quote:</h3>
          <pre>{quote}</pre>
        </div>
      )}
    </main>
  );
}
