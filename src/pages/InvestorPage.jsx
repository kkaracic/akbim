import React, { useState } from 'react';
import MapStep from '../components/MapStep';
import { LineChart, XAxis, YAxis, CartesianGrid } from "recharts";
import { getIrradiation, calculateFinancials, calculateResults, calculateProducerResult, calculateProducerResults} from '../utils';
import './InvestorPage.css';
import { Bar, Line } from 'react-chartjs-2';
import Navbar from '../components/Navbar';
import { Link } from "react-router-dom";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  PointElement,
  LineElement,
  Tooltip,
  Legend,
} from 'chart.js';

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  PointElement,
  LineElement,
  Tooltip,
  Legend
);


export default function InvestorPage() {
  const [step, setStep] = useState(1);
  const [type, setType] = useState('');
  const [inputData, setInputData] = useState({
    consumption: '',
    area: '',
    budget: '',
    objectPurpose: '',
    maxPower: '',
    wantsBattery: null,
  });
  const [location, setLocation] = useState(null);
  const [irradiation, setIrradiation] = useState(null);
  const [irradLoading, setIrradLoading] = useState(false);
  const [irradError, setIrradError] = useState(null);

  const updateField = (k, v) => setInputData((p) => ({ ...p, [k]: v }));

  const handleLocationSelect = async (lat, lon) => {
    setLocation({ lat, lon });
    setIrradLoading(true);
    setIrradError(null);
    setIrradiation(null);
    try {
      const val = await getIrradiation(Number(lat).toFixed(5), Number(lon).toFixed(5));
      setIrradiation(val);
    } catch (err) {
      console.error(err);
      setIrradError(err.message || 'Error fetching irradiation');
    } finally {
      setIrradLoading(false);
    }
  };
      const goNext = () => {
  // Validacija za step 2: godišnja potrošnja
  if ((type === "own" || type === "prosumer") && step === 2) {
    const consumption = parseFloat(inputData.consumption);

    if (!consumption || isNaN(consumption)) {
      alert("⚠️ Molimo unesite godišnju potrošnju u kWh.");
      return;
    }

    if (consumption < 500) {
      alert("⚠️ Minimalna godišnja potrošnja za izračun je 500 kWh.");
      return;
    }

     if (type === "own" && step === 3) {
    if (!inputData.objectPurpose) {
      alert("⚠️ Molimo odaberite namjenu objekta.");
      return;
    }
  }
  }

  // Normalno ide na sljedeći step
  setStep((s) => s + 1);
};

const handleNextStep = () => {
  // Validacija za step 2: godišnja potrošnja
  if ((type === "own" || type === "prosumer") && step === 2) {
    const consumption = parseFloat(inputData.consumption);
    if (!consumption || isNaN(consumption)) {
      alert("⚠️ Molimo unesite godišnju potrošnju u kWh.");
      return;
    }
    if (consumption < 500) {
      alert("⚠️ Minimalna godišnja potrošnja za izračun je 500 kWh.");
      return;
    }
  }

  // Validacija za step 3: purpose
  if (type === "own" && step === 3) {
    if (!inputData.objectPurpose) {
      alert("⚠️ Molimo odaberite namjenu objekta.");
      return;
    }
  }

  // Ako je sve ok
  goNext();
};

  const goBack = () => setStep((s) => Math.max(1, s - 1));

  const calculateResults = (withBattery) => {
    const kWp = (() => {
      if (type === 'producer') {
        if (inputData.area) return Number(inputData.area) * 0.15;
        if (inputData.budget) return Number(inputData.budget) / 900;
        return 0;
      }
      const Ey = irradiation || 1200;
      const PR = 0.85;
      if (inputData.consumption) return Number(inputData.consumption) / (Ey * PR);
      return 0;
    })();
    const production = (kWp * (irradiation || 1200)).toFixed(0);
    const cost = (kWp * 900 * (withBattery ? 1.3 : 1)).toFixed(0);
    return { kWp: +kWp.toFixed(2), production: +production, cost: +cost, withBattery };
  };

  const t = typeof type === 'string' ? type : '';

  const steps =
    t === 'own'
      ? ['Investor Type', 'Details', 'Purpose', 'Location', 'Batteries', 'Overview', 'Results']
      : t === 'prosumer'
      ? ['Investor Type', 'Details', 'Location', 'Batteries', 'Overview', 'Results']
      : t === 'producer'
      ? ['Investor Type', 'Details', 'Location', 'Overview', 'Results']
      : ['Investor Type', 'Details', 'Location', 'Overview', 'Results'];

  const currentIdx = (() => {
    if (t === 'own') return Math.min((step || 1) - 1, 6);
    if (t === 'prosumer') return Math.min((step || 1) - 1, 5);
    if (t === 'producer') return Math.min((step || 1) - 1, 4);
    return 0;
  })();
    const [loggedIn, setLoggedIn] = useState(false);
  return (
    
    <div className="investor-shell mt-20">
      {/* Navbar */}
     <Navbar type="investor" loggedIn={loggedIn} />
      
      {/*
<nav 
  className="w-full flex justify-between items-center text-base font-semibold fixed top-0 left-0 z-20 px-6 py-1"
  style={{ backgroundColor: "#1b1f3a", color: "white" }}
>
  <div className="flex items-center space-x-6">
    <img src="/logo.png" alt="Logo" className="h-14 object-contain" />
    <div className="hidden md:flex space-x-4">
      <Link to="/" className="hover:text-gray-300">Home</Link>
      <a href="#" className="hover:text-gray-300">About</a>
      <a href="#" className="hover:text-gray-300">Contact</a>
      <a href="#" className="hover:text-gray-300">Help</a>
    </div>
  </div>

  <div className="flex items-center space-x-2">
    <button className="bg-white text-green-600 px-3 py-1 text-sm rounded hover:bg-gray-100 transition-all duration-200">
      Login
    </button>
    <button className="bg-green-600 hover:bg-green-700 text-white px-3 py-1 text-sm rounded transition-all duration-200">
      Sign Up
    </button>
  </div>
</nav> */}
      <aside className="progress" style={{ marginTop: "-20px" }}>
        <div className="progress-title">Flow</div>
        <ul>
          {steps.map((label, idx) => (
            <li key={label} className={idx === currentIdx ? 'active' : ''}>
              {label}
            </li>
          ))}
        </ul>
      </aside>

      <main className="investor-content">
        {step !== 1 && <h2 className="step-title">{steps[currentIdx]}</h2>}
      {step === 1 && (
  <div className="text-center">
    {/* Logo i naslov van kartice */}
    <img 
      src="/Logolite-sp.png" 
      alt="Logo" 
      className="mx-auto h-28 mb-4"
    />
    <h1 className="text-2xl font-bold mb-6">Welcome to the Investors Page</h1>

    {/* Velika kartica */}
    <div className="card">
      <p className="mb-6 text-gray-700">
        Please select what type of investor you are.  
        This will help us customize your solar project calculation.
      </p>

      {/* 3 male kartice u liniji */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Own consumption */}
        <div className="bg-white shadow-md rounded-lg p-6 flex flex-col justify-between">
          <h3 className="text-lg font-semibold mb-2">Own Consumption</h3>
          <p className="text-sm text-gray-600 mb-4">
            For users who want to produce energy only for their own needs.
          </p>
          <button 
            onClick={() => { setType('own'); goNext(); }}
            className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded transition"
          >
            Select
          </button>
        </div>

        {/* Prosumer */}
        <div className="bg-white shadow-md rounded-lg p-6 flex flex-col justify-between">
          <h3 className="text-lg font-semibold mb-2">Prosumer</h3>
          <p className="text-sm text-gray-600 mb-4">
            For users who consume but also deliver surplus energy to the grid.
          </p>
          <button 
            onClick={() => { setType('prosumer'); goNext(); }}
            className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded transition"
          >
            Select
          </button>
        </div>

        {/* Producer */}
        <div className="bg-white shadow-md rounded-lg p-6 flex flex-col justify-between">
          <h3 className="text-lg font-semibold mb-2">Producer</h3>
          <p className="text-sm text-gray-600 mb-4">
            For investors planning to build a plant and sell all energy to the grid.
          </p>
          <button 
            onClick={() => { setType('producer'); goNext(); }}
            className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded transition"
          >
            Select
          </button>
        </div>
      </div>
    </div>
  </div>
)}


        {step === 2 && (
  <div className="card">
    <p>Please enter your basic parameters:</p>

    {/* Own consumption + Prosumer */}
    {(type === "own" || type === "prosumer") && (
      <label>
        Annual consumption (kWh): <span className="text-red-500">*</span>
        <input
          type="number"
          min="500"
          required
          value={inputData.consumption}
          onChange={(e) => updateField("consumption", e.target.value)}
        />
      </label>
    )}

    {/* Producer */}
    {type === "producer" && (
      <>
        <label>
          Area (m²): <span className="text-red-500">*</span>
          <input
            type="number"
            min="10"
            required
            value={inputData.area}
            onChange={(e) => updateField("area", e.target.value)}
          />
        </label>

        <label>
          Max Power (kWp, optional):
          <input
            type="number"
            min="1"
            value={inputData.maxPower}
            onChange={(e) => updateField("maxPower", e.target.value)}
          />
        </label>

        <label>
          Budget (€ — optional):
          <input
            type="number"
            min="0"
            value={inputData.budget}
            onChange={(e) => updateField("budget", e.target.value)}
          />
        </label>
      </>
    )}

    <div className="nav-buttons">
      <button className="back-btn" onClick={goBack}>
        Back
      </button>
      <button
        className="next-btn"
        onClick={() => {
          if (type === "own" || type === "prosumer") {
            if (!inputData.consumption || Number(inputData.consumption) < 500) {
              alert("Please enter valid annual consumption (minimum 500 kWh).");
              return;
            }
          }
          if (type === "producer") {
            if (!inputData.area || Number(inputData.area) < 10) {
              alert("Please enter valid area (minimum 10 m²).");
              return;
            }
          }
          goNext();
        }}
      >
        Next
      </button>
    </div>
  </div>
)}


        {step === 3 && type === 'own' && (
          <div className="card">
            <p>Provide the purpose of the object and optionally max power:</p>
            <label>
              Purpose:
              <select value={inputData.objectPurpose} onChange={(e) => updateField('objectPurpose', e.target.value)}>
                <option value="">-- choose --</option>
                <option value="residential">Residential</option>
                <option value="apartment">Apartment</option>
                <option value="commercial">Commercial</option>
                <option value="industrial">Industrial</option>
                <option value="other">Other</option>
              </select>
            </label>
            <label>
              Max power (kW, optional):
              <input type="number" value={inputData.maxPower} onChange={(e) => updateField('maxPower', e.target.value)} />
            </label>
            <div className="nav-buttons">
              <button className="back-btn" onClick={goBack}>Back</button>
              <button className="next-btn" onClick={handleNextStep}>Next</button>
            </div>
          </div>
        )}

        {(step === 3 && (type === 'prosumer' || type === 'producer')) || (step === 4 && type === 'own') ? (
          <div className="card">
            <p>Select your project location:</p>
            <MapStep onLocationSelect={handleLocationSelect} />
            <div className="nav-buttons">
              <button className="back-btn" onClick={goBack}>Back</button>
              <button className="next-btn" onClick={() => { if (!location) return alert('Select location'); goNext(); }}>Next</button>
            </div>
          </div>
        ) : null}

        {(step === 4 && type === 'prosumer') || (step === 5 && type === 'own') ? (
          <div className="card">
            <p>Would you like to include a battery in your system?</p>
            <div className="btn-group">
              <button onClick={() => { updateField('wantsBattery', true); goNext(); }}>Yes</button>
              <button onClick={() => { updateField('wantsBattery', false); goNext(); }}>No</button>
            </div>
            <div className="nav-buttons">
              <button className="back-btn" onClick={goBack}>Back</button>
            </div>
          </div>
        ) : null}

        {(step === 5 && type === 'prosumer') || (step === 4 && type === 'producer') || (step === 6 && type === 'own') ? (
          <div className="card">
            <p>Here is a summary of your input data:</p>
            <div className="overview">
              <p><strong>Type:</strong> {type}</p>
              {inputData.consumption && <p><strong>Consumption:</strong> {inputData.consumption} kWh</p>}
              {inputData.area && <p><strong>Area:</strong> {inputData.area} m²</p>}
              {inputData.budget && <p><strong>Budget:</strong> €{inputData.budget}</p>}
              {inputData.objectPurpose && <p><strong>Purpose:</strong> {inputData.objectPurpose}</p>}
              {inputData.maxPower && <p><strong>Max Power:</strong> {inputData.maxPower} kW</p>}
              <p><strong>Battery:</strong> {inputData.wantsBattery === null ? 'Not chosen' : inputData.wantsBattery ? 'Yes' : 'No'}</p>
              <p><strong>Location:</strong> {location ? `${location.lat.toFixed(4)}, ${location.lon.toFixed(4)}` : 'Not selected'}</p>
              {irradLoading && <p>🔄 Fetching irradiation...</p>}
              {irradError && <p style={{ color: 'red' }}>❌ {irradError}</p>}
              {irradiation && <p>☀️ Annual Irradiation: <strong>{irradiation} kWh/m²</strong></p>}
            </div>
            <div className="nav-buttons">
              <button className="back-btn" onClick={goBack}>Back</button>
              <button className="next-btn" onClick={goNext}>Calculate</button>
            </div>
          </div>
        ) : null}



{/* Results for Own & Prosumer */}
{((t === "own" && step === 7) || (t === "prosumer" && step === 6)) && (
  <div className="card">
    <h2 className="text-2xl font-bold mb-2">📊 Investment Report</h2>
    <p className="text-gray-600 mb-6">
      Detailed overview of your solar system performance and financial return.
    </p>

    {(() => {
      const r = calculateResults(inputData.wantsBattery);
      const financials = calculateFinancials(r.cost, r.production);

      // Chart data
      const yearlySavings = Array.from({ length: 20 }, (_, i) => ({
        year: i + 1,
        savings: (r.production * 0.2).toFixed(0),
        cumulative: (r.production * 0.2 * (i + 1)).toFixed(0),
      }));

      const barData = {
        labels: yearlySavings.map((d) => `Year ${d.year}`),
        datasets: [
          {
            label: "Annual Savings (€)",
            data: yearlySavings.map((d) => d.savings),
            backgroundColor: "rgba(34,197,94,0.6)",
            borderRadius: 4,
          },
        ],
      };

      const lineData = {
        labels: yearlySavings.map((d) => `Year ${d.year}`),
        datasets: [
          {
            label: "Cumulative Savings (€)",
            data: yearlySavings.map((d) => d.cumulative),
            fill: false,
            borderColor: "rgba(59,130,246,1)",
            tension: 0.3,
          },
          {
            label: "Initial Investment (€)",
            data: yearlySavings.map(() => r.cost),
            borderColor: "rgba(239,68,68,0.8)",
            borderDash: [6, 6],
          },
        ],
      };

      return (
        <div className="space-y-8">
          {/* System Report */}
          <div>
            <h3 className="text-xl font-semibold mb-4">⚡ System Report</h3>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <div className="bg-gray-50 p-4 rounded shadow text-center">
                <p className="text-sm text-gray-500">System Size</p>
                <p className="text-lg font-bold">{r.kWp} kWp</p>
              </div>
              <div className="bg-gray-50 p-4 rounded shadow text-center">
                <p className="text-sm text-gray-500">Annual Production</p>
                <p className="text-lg font-bold">{r.production} kWh</p>
              </div>
              <div className="bg-gray-50 p-4 rounded shadow text-center">
                <p className="text-sm text-gray-500">Investment Cost</p>
                <p className="text-lg font-bold">€{r.cost.toLocaleString()}</p>
              </div>
              <div className="bg-gray-50 p-4 rounded shadow text-center">
                <p className="text-sm text-gray-500">Battery</p>
                <p className="text-lg font-bold">
                  {r.withBattery ? "Yes" : "No"}
                </p>
              </div>
            </div>
          </div>

          {/* Financial Report */}
          <div>
            <h3 className="text-xl font-semibold mb-4">💰 Financial Report</h3>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <div className="bg-green-50 p-4 rounded shadow text-center">
                <p className="text-sm text-gray-600">Payback Period</p>
                <p className="text-lg font-bold">{financials.paybackYears} yrs</p>
              </div>
              <div className="bg-green-50 p-4 rounded shadow text-center">
                <p className="text-sm text-gray-600">Savings (20y)</p>
                <p className="text-lg font-bold">
                  €{Number(financials.savings20y || 0).toLocaleString()}
                </p>
              </div>
              <div className="bg-green-50 p-4 rounded shadow text-center">
                <p className="text-sm text-gray-600">IRR</p>
                <p className="text-lg font-bold">{financials.irr}%</p>
              </div>
              <div className="bg-green-50 p-4 rounded shadow text-center">
                <p className="text-sm text-gray-600">NPV</p>
                <p className="text-lg font-bold">
                  €{Number(financials.npv || 0).toLocaleString()}
                </p>
              </div>
            </div>
          </div>

          {/* Charts */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="bg-white p-4 rounded shadow">
              <h4 className="text-md font-semibold mb-2">Annual Savings</h4>
              <Bar data={barData} options={{ responsive: true }} />
            </div>
            <div className="bg-white p-4 rounded shadow">
              <h4 className="text-md font-semibold mb-2">Cumulative Cash Flow</h4>
              <Line data={lineData} options={{ responsive: true }} />
            </div>
          </div>
        </div>
      );
    })()}

    <div className="nav-buttons mt-6 flex justify-between">
      <button className="back-btn" onClick={goBack}>Back</button>
      <button
        className="next-btn"
        onClick={() => {
          setStep(1);
          setType("");
          setInputData({
            consumption: "",
            area: "",
            budget: "",
            objectPurpose: "",
            maxPower: "",
            wantsBattery: null,
          });
          setLocation(null);
          setIrradiation(null);
        }}
      >
        Start Over
      </button>
    </div>
  </div>
)}


{/* Results for Producer */}
{/* Results step */}
{(//(t === 'own' && step === 7) ||
  //(t === 'prosumer' && step === 6) ||
  (t === 'producer' && step === 5)) && (
  <div className="card">
    <h2 className="text-2xl font-bold mb-4">📊 Investment Report</h2>

    {(() => {
      if (t === 'producer') {
        // PRODUCER REPORT
        const r = calculateProducerResult(
          inputData.area,
          inputData.maxPower,
          inputData.budget,
          irradiation
        );

        return (
          <div className="space-y-8">
            {/* Kartice – tehnički */}
            <div>
              <h3 className="text-xl font-semibold mb-4">⚡ Technical Overview</h3>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                <div className="bg-gray-50 p-4 rounded shadow text-center">
                  <p className="text-sm text-gray-500">System Size</p>
                  <p className="text-lg font-bold">{r.kWp} kWp</p>
                </div>
                <div className="bg-gray-50 p-4 rounded shadow text-center">
                  <p className="text-sm text-gray-500">Annual Production</p>
                  <p className="text-lg font-bold">{r.production.toLocaleString()} kWh</p>
                </div>
                <div className="bg-gray-50 p-4 rounded shadow text-center">
                  <p className="text-sm text-gray-500">Investment Cost</p>
                  <p className="text-lg font-bold">€{r.cost.toLocaleString()}</p>
                </div>
                <div className="bg-gray-50 p-4 rounded shadow text-center">
                  <p className="text-sm text-gray-500">Annual Revenue</p>
                  <p className="text-lg font-bold">€{r.annualRevenue.toLocaleString()}</p>
                </div>
              </div>
            </div>

            {/* Kartice – financijski */}
            <div>
              <h3 className="text-xl font-semibold mb-4">💰 Financial Overview</h3>
              <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                <div className="bg-green-50 p-4 rounded shadow text-center">
                  <p className="text-sm text-gray-600">Payback Period</p>
                  <p className="text-lg font-bold">
                    {r.annualRevenue > 0
                      ? (r.cost / r.annualRevenue).toFixed(1) + ' yrs'
                      : 'N/A'}
                  </p>
                </div>
                <div className="bg-green-50 p-4 rounded shadow text-center">
                  <p className="text-sm text-gray-600">Revenue (20y)</p>
                  <p className="text-lg font-bold">€{r.revenue20y.toLocaleString()}</p>
                </div>
                <div className="bg-green-50 p-4 rounded shadow text-center">
                  <p className="text-sm text-gray-600">Initial CAPEX</p>
                  <p className="text-lg font-bold">€{r.cost.toLocaleString()}</p>
                </div>
              </div>
            </div>

            {/* Grafikoni */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="bg-white p-4 rounded shadow">
                <h4 className="text-md font-semibold mb-2">Annual Revenue vs. Cost</h4>
                <Bar
                  data={{
                    labels: ['Annual Revenue (€)', 'Investment (€)'],
                    datasets: [
                      {
                        label: 'Values',
                        data: [r.annualRevenue, r.cost],
                        backgroundColor: ['#4ade80', '#60a5fa'],
                        borderRadius: 6,
                      },
                    ],
                  }}
                  options={{ responsive: true }}
                />
              </div>
              <div className="bg-white p-4 rounded shadow">
                <h4 className="text-md font-semibold mb-2">Cumulative Revenue (20y)</h4>
                <Line
                  data={{
                    labels: Array.from({ length: 20 }, (_, i) => `${i + 1}y`),
                    datasets: [
                      {
                        label: 'Cumulative Revenue (€)',
                        data: Array.from({ length: 20 }, (_, i) =>
                          Math.round(r.annualRevenue * (i + 1))
                        ),
                        borderColor: '#22c55e',
                        tension: 0.3,
                        fill: false,
                      },
                      {
                        label: 'Investment (€)',
                        data: Array.from({ length: 20 }, () => r.cost),
                        borderColor: '#ef4444',
                        borderDash: [6, 6],
                        fill: false,
                      },
                    ],
                  }}
                  options={{ responsive: true }}
                />
              </div>
            </div>
          </div>
        );
      } else {
        // OWN / PROSUMER REPORT
        const r = calculateResults(inputData.wantsBattery);
        const financials = calculateFinancials(r.cost, r.production);

        return (
          <div className="space-y-8">
            {/* Kartice – tehnički */}
            <div>
              <h3 className="text-xl font-semibold mb-4">⚡ System Overview</h3>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                <div className="bg-gray-50 p-4 rounded shadow text-center">
                  <p className="text-sm text-gray-500">System Size</p>
                  <p className="text-lg font-bold">{r.kWp} kWp</p>
                </div>
                <div className="bg-gray-50 p-4 rounded shadow text-center">
                  <p className="text-sm text-gray-500">Annual Production</p>
                  <p className="text-lg font-bold">{r.production.toLocaleString()} kWh</p>
                </div>
                <div className="bg-gray-50 p-4 rounded shadow text-center">
                  <p className="text-sm text-gray-500">Investment Cost</p>
                  <p className="text-lg font-bold">€{r.cost.toLocaleString()}</p>
                </div>
                <div className="bg-gray-50 p-4 rounded shadow text-center">
                  <p className="text-sm text-gray-500">Battery</p>
                  <p className="text-lg font-bold">
                    {r.withBattery ? 'Yes' : 'No'}
                  </p>
                </div>
              </div>
            </div>

            {/* Kartice – financijski */}
            <div>
              <h3 className="text-xl font-semibold mb-4">💰 Financial Overview</h3>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                <div className="bg-green-50 p-4 rounded shadow text-center">
                  <p className="text-sm text-gray-600">Payback Period</p>
                  <p className="text-lg font-bold">{financials.paybackYears} yrs</p>
                </div>
                <div className="bg-green-50 p-4 rounded shadow text-center">
                  <p className="text-sm text-gray-600">Savings (20y)</p>
                  <p className="text-lg font-bold">
                    €{Number(financials.savings20y || 0).toLocaleString()}
                  </p>
                </div>
                <div className="bg-green-50 p-4 rounded shadow text-center">
                  <p className="text-sm text-gray-600">IRR</p>
                  <p className="text-lg font-bold">{financials.irr}%</p>
                </div>
                <div className="bg-green-50 p-4 rounded shadow text-center">
                  <p className="text-sm text-gray-600">NPV</p>
                  <p className="text-lg font-bold">
                    €{Number(financials.npv || 0).toLocaleString()}
                  </p>
                </div>
              </div>
            </div>

            {/* Grafikoni */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Bar and Line kao što već imaš */}
            </div>
          </div>
        );
      }
    })()}

    {/* Navigacija */}
    <div className="nav-buttons mt-6 flex justify-between">
      <button className="back-btn" onClick={goBack}>Back</button>
      <button
        className="next-btn"
        onClick={() => {
          setStep(1);
          setType('');
          setInputData({
            consumption: '',
            area: '',
            budget: '',
            objectPurpose: '',
            maxPower: '',
            wantsBattery: null,
          });
          setLocation(null);
          setIrradiation(null);
        }}
      >
        Start Over
      </button>
    </div>
  </div>
)}


      </main>
    </div>
  );
}
