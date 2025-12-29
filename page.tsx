'use client';

import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { Star, Search } from "lucide-react";

const API_BASE = process.env.NEXT_PUBLIC_API_URL || "http://localhost:8000";

export default function MarketplaceBrowse() {
  const [listings, setListings] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [stats, setStats] = useState({ total_listings: 0, total_sales: 0, total_volume: 0 });

  useEffect(() => {
    fetchListings();
    fetchStats();
  }, []);

  async function fetchListings() {
    try {
      const res = await fetch(`${API_BASE}/api/marketplace/listings`);
      const data = await res.json();
      setListings(data.listings || []);
    } catch (error) {
      console.error("Failed to fetch:", error);
    } finally {
      setLoading(false);
    }
  }

  async function fetchStats() {
    try {
      const res = await fetch(`${API_BASE}/api/marketplace/stats`);
      const data = await res.json();
      setStats(data);
    } catch (error) {
      console.error("Stats error:", error);
    }
  }

  return (
    <div className="min-h-screen bg-black text-white">
      <motion.header
        initial={{ y: -40, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        className="border-b border-cyan-500/30 bg-black/60 backdrop-blur-xl"
      >
        <div className="max-w-7xl mx-auto px-6 py-6">
          <div className="flex items-center justify-between gap-6 flex-wrap">
            <div>
              <h1 className="text-4xl font-black bg-gradient-to-r from-cyan-400 via-purple-400 to-pink-400 bg-clip-text text-transparent">
                NEBULA UNIVERSE MARKETPLACE
              </h1>
              <p className="text-cyan-400 font-mono text-sm">AI-Generated Artifacts • Buy & Sell</p>
            </div>

            <div className="flex items-center gap-6 text-sm">
              <div className="text-center">
                <div className="text-2xl font-bold text-cyan-400">{stats.total_listings}</div>
                <div className="text-gray-500">Listings</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-purple-400">{stats.total_sales}</div>
                <div className="text-gray-500">Sales</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-pink-400">${Number(stats.total_volume || 0).toFixed(0)}</div>
                <div className="text-gray-500">Volume</div>
              </div>
            </div>
          </div>

          <div className="mt-6 relative">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-500" />
            <input
              type="text"
              placeholder="Search artifacts..."
              className="w-full pl-12 pr-4 py-3 bg-gray-900 border border-cyan-500/30 rounded-xl focus:outline-none focus:border-cyan-500/60"
            />
          </div>
        </div>
      </motion.header>

      <div className="max-w-7xl mx-auto px-6 py-8">
        {loading ? (
          <div className="text-center py-20">
            <div className="inline-block w-12 h-12 border-4 border-cyan-500 border-t-transparent rounded-full animate-spin"></div>
          </div>
        ) : listings.length === 0 ? (
          <div className="text-center py-20">
            <p className="text-gray-500 text-lg">No listings yet</p>
            <p className="text-gray-600 text-sm mt-2">Be the first to sell!</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {listings.map((listing: any, i: number) => (
              <motion.div
                key={listing.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.05 }}
                className="bg-gray-900 border border-cyan-500/30 rounded-2xl overflow-hidden hover:border-cyan-500/60 transition cursor-pointer"
              >
                <div className="h-48 bg-gradient-to-br from-purple-900/50 to-cyan-900/50 flex items-center justify-center text-6xl">
                  ⚡
                </div>
                <div className="p-4">
                  <h3 className="font-bold text-white mb-2 line-clamp-2">{listing.title}</h3>
                  <p className="text-sm text-gray-400 line-clamp-2 mb-3">{listing.description}</p>
                  <div className="flex items-center justify-between">
                    <div className="text-2xl font-bold text-cyan-400">${listing.price}</div>
                    <div className="flex items-center gap-1 text-xs text-gray-500">
                      <Star className="w-3 h-3 text-yellow-400 fill-yellow-400" />
                      <span>{Number(listing.rating || 5).toFixed(1)}</span>
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
