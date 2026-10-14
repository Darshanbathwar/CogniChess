import React, { useState } from 'react';
import { Activity, Brain, Target, AlertTriangle, BookOpen, Terminal, ChevronRight } from 'lucide-react';

export default function ChessDashboard() {
  const [pgnInput, setPgnInput] = useState('');
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState(null);

  const handleAnalyze = async () => {
    if (!pgnInput) return;
    setLoading(true);
    try {
      const response = await fetch('http://localhost:8000/api/analyze', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ pgn_text: pgnInput }),
      });
      const result = await response.json();
      setData(result);
    } catch (err) {
      alert("API Connection Error. Make sure backend is running.");
    }
    setLoading(false);
  };

  return (
    <div className="min-h-screen bg-[#0a0a0a] text-zinc-300 font-sans selection:bg-emerald-500/30">
      
      {/* Top Navbar */}
      <nav className="border-b border-zinc-800 bg-zinc-950 px-6 py-4 flex justify-between items-center">
        <div className="flex items-center gap-3">
          <Brain className="text-emerald-500" size={24} />
          <span className="text-zinc-100 font-bold tracking-wide">ITL701: Cognitive Chess Analysis</span>
          <span className="ml-4 text-xs font-mono text-emerald-500 bg-emerald-950/50 px-2 py-1 rounded border border-emerald-900">
            v2.4 Engine Active
          </span>
        </div>
        <div className="flex gap-4 text-sm font-medium">
          <span className="text-zinc-100 bg-zinc-800 px-3 py-1 rounded">Overview</span>
          <span className="text-zinc-500 hover:text-zinc-300 cursor-pointer">API Docs</span>
        </div>
      </nav>

      <main className="max-w-7xl mx-auto p-6 space-y-6">
        
        {/* Ingestion Section */}
        <section className="bg-[#121212] border border-zinc-800 rounded-xl overflow-hidden">
          <div className="flex justify-between items-center px-4 py-3 bg-zinc-900 border-b border-zinc-800">
            <span className="text-xs font-mono font-bold tracking-wider flex items-center gap-2"><Terminal size={14}/> PGN STRING INGESTION</span>
            {data && <span className="text-xs text-emerald-500 font-mono flex items-center gap-2"><div className="w-2 h-2 bg-emerald-500 rounded-full animate-pulse"></div> API 200 OK</span>}
          </div>
          <div className="p-4">
            <textarea 
              className="w-full h-32 bg-zinc-950 border border-zinc-800 rounded-lg p-4 font-mono text-sm text-zinc-400 focus:outline-none focus:border-zinc-600"
              placeholder="Paste your match PGN here..."
              value={pgnInput}
              onChange={(e) => setPgnInput(e.target.value)}
            />
            <div className="mt-4 flex gap-3">
              <button onClick={handleAnalyze} disabled={loading} className="bg-zinc-100 text-zinc-900 hover:bg-white px-6 py-2 rounded font-semibold text-sm transition-colors flex items-center gap-2">
                {loading ? <div className="w-4 h-4 border-2 border-zinc-900 border-t-transparent rounded-full animate-spin"></div> : <ChevronRight size={16}/>}
                {loading ? 'Processing Neural Model...' : 'Initialize Analysis'}
              </button>
            </div>
          </div>
        </section>

        {data && (
          <>
            {/* Top Stats Row */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* ELO Card */}
              <div className="bg-[#121212] border border-zinc-800 rounded-xl p-6">
                <div className="flex justify-between items-center mb-6">
                  <span className="text-xs font-bold tracking-widest uppercase text-emerald-500 flex items-center gap-2"><Target size={14}/> Predictive Analytics</span>
                  <span className="text-xs font-mono text-zinc-500">Confidence: High</span>
                </div>
                <div className="flex items-end gap-3 mb-4">
                  <h2 className="text-6xl font-bold text-zinc-100">{data.predictive_analytics.estimated_elo_played}</h2>
                  <span className="text-sm text-zinc-500 mb-2 uppercase tracking-wide">Performance ELO</span>
                </div>
                <p className="text-sm text-zinc-400 mb-6">{data.predictive_analytics.elo_justification}</p>
                {/* Visual Progress Bar */}
                <div className="w-full h-1.5 bg-zinc-800 rounded-full overflow-hidden">
                  <div className="h-full bg-gradient-to-r from-cyan-500 to-emerald-500 w-[70%]"></div>
                </div>
              </div>

              {/* Resilience Card */}
              <div className="bg-[#121212] border border-zinc-800 rounded-xl p-6">
                <div className="flex justify-between items-center mb-6">
                  <span className="text-xs font-bold tracking-widest uppercase text-rose-500 flex items-center gap-2"><Activity size={14}/> Cognitive Profile</span>
                  <span className="text-xs font-bold text-rose-500 bg-rose-500/10 px-2 py-1 rounded">LOW RESILIENCE</span>
                </div>
                <div className="flex items-end gap-3 mb-4">
                  <h2 className="text-6xl font-bold text-zinc-100">{data.cognitive_computing_profile.resilience_score}%</h2>
                  <span className="text-sm text-zinc-500 mb-2 uppercase tracking-wide">Resilience Quotient</span>
                </div>
                <p className="text-sm text-zinc-400 mb-6">{data.cognitive_computing_profile.psychological_verdict}</p>
                 <div className="w-full h-1.5 bg-zinc-800 rounded-full overflow-hidden">
                  <div className="h-full bg-rose-500 w-[44%]"></div>
                </div>
              </div>
            </div>

            {/* Playstyle Row */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="bg-[#121212] border border-zinc-800 rounded-xl p-6">
                <h3 className="text-lg font-bold text-zinc-100 mb-4 flex items-center gap-2"><BookOpen size={16} className="text-cyan-500"/> Opening Style</h3>
                <p className="text-sm text-zinc-400">{data.expert_system_playstyle_analysis.opening_feedback}</p>
              </div>
              <div className="bg-[#121212] border border-zinc-800 rounded-xl p-6">
                <h3 className="text-lg font-bold text-zinc-100 mb-4 flex items-center gap-2"><Activity size={16} className="text-purple-500"/> Middlegame & Chaos Index</h3>
                <p className="text-sm text-zinc-400">{data.expert_system_playstyle_analysis.middlegame_verdict}</p>
              </div>
            </div>

            {/* Blunder Section (With Mock Chessboard visual) */}
            <div className="bg-gradient-to-br from-[#2a0808] to-[#121212] border border-rose-900/50 rounded-xl p-6">
              <div className="flex items-center gap-3 mb-6">
                <div className="bg-rose-500/20 p-2 rounded"><AlertTriangle className="text-rose-500" size={20}/></div>
                <h3 className="text-xl font-bold text-zinc-100">Critical Blunder Analysis (Move {data.critical_blunder_deep_dive.move_number})</h3>
              </div>
              
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                <div className="lg:col-span-2 space-y-4">
                  <div className="bg-black/50 border border-rose-900/30 p-4 rounded-lg">
                    <span className="text-xs text-rose-500 font-bold uppercase tracking-wider block mb-1">Played Move</span>
                    <span className="text-2xl font-bold text-zinc-100">{data.critical_blunder_deep_dive.piece_moved}</span>
                  </div>
                  <div>
                    <h4 className="text-sm font-bold text-zinc-300 mb-2">Geometric Flaw & Tactical Causality</h4>
                    <p className="text-sm text-zinc-400 leading-relaxed">{data.critical_blunder_deep_dive.geometric_flaw}</p>
                  </div>
                </div>
                {/* Simulated Chessboard graphic from the UI image */}
                <div className="bg-zinc-900 border border-zinc-800 rounded-lg aspect-square flex items-center justify-center p-4">
                  <div className="text-center text-zinc-600 font-mono text-xs border border-dashed border-zinc-700 w-full h-full flex flex-col justify-center items-center">
                    <Target className="mb-2 opacity-50"/>
                    <p>Tactical Inflection Point</p>
                    <p>Move: {data.critical_blunder_deep_dive.move_number}</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Training Schedule */}
            <div>
              <h3 className="text-lg font-bold text-zinc-100 mb-4 mt-6 uppercase tracking-wider text-sm text-zinc-500">Prescriptive Curricula</h3>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {data.personalized_training_schedule.map((day, idx) => (
                  <div key={idx} className="bg-[#121212] border border-zinc-800 rounded-xl p-6 hover:border-zinc-600 transition-colors">
                    <span className="bg-zinc-900 text-xs font-mono px-2 py-1 rounded text-zinc-400 border border-zinc-800 mb-4 inline-block">{day.day}</span>
                    <h4 className="text-md font-bold text-zinc-100 mb-2">{day.focus}</h4>
                    <p className="text-sm text-zinc-500 leading-relaxed">{day.drill}</p>
                  </div>
                ))}
              </div>
            </div>
          </>
        )}
      </main>
    </div>
  );
}