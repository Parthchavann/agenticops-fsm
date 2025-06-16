"use client";

import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";

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
    <main className="p-6 max-w-3xl mx-auto">
      <Card>
        <CardContent className="space-y-4 p-6">
          <h1 className="text-xl font-bold">AI Quote Generator</h1>
          <Input
            placeholder="Describe the customer need..."

