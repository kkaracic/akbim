export async function getIrradiation(lat, lon) {
  try {
    const response = await fetch(`http://localhost:3000/api/irradiation?lat=${lat}&lon=${lon}`);
    const data = await response.json();
    return data.irradiation;
  } catch (error) {
    console.error('Greška pri dohvatu iradijacije:', error);
    throw error;
  }
}

export function calculateResults(wantsBattery) {
  // Za sada stavljamo "default" sistem od 5kWp
  const baseSystem = {
    kWp: 5,
    production: 6000, // kWh godišnje
    cost: 7500,       // €
  };

  if (wantsBattery) {
    return {
      ...baseSystem,
      cost: baseSystem.cost + 3000, // baterija poskupljuje
    };
  }

  return baseSystem;
}

// utils.js

export function calculateFinancials(totalCost, annualProduction, opts = {}) {
  const cost = Number(totalCost) || 0;
  const prod = Number(annualProduction) || 0;

  const price = typeof opts.electricityPrice === 'number' ? opts.electricityPrice : 0.20; // €/kWh
  const discountRate = typeof opts.discountRate === 'number' ? opts.discountRate : 0.06;   // 6%
  const years = typeof opts.years === 'number' ? opts.years : 20;

  const annualSavings = prod * price; // €
  const paybackYears = annualSavings > 0 ? Math.ceil(cost / annualSavings) : null;
  const savings20y = Math.round(annualSavings * years);

  const annuityFactor = discountRate !== 0
    ? (1 - Math.pow(1 + discountRate, -years)) / discountRate
    : years;
  const npv = Math.round(-cost + annualSavings * annuityFactor);

  function irr(c, cash, n) {
    if (cash <= 0) return 0;
    let lo = -0.99, hi = 1.0, mid = 0;
    for (let i = 0; i < 60; i++) {
      mid = (lo + hi) / 2;
      const factor = mid === 0 ? n : (1 - Math.pow(1 + mid, -n)) / mid;
      const npvGuess = -c + cash * factor;
      if (npvGuess > 0) lo = mid; else hi = mid;
    }
    return +(mid * 100).toFixed(1); // %
  }
  const irrVal = irr(cost, annualSavings, years);

  return {
    paybackYears,
    savings20y,
    irr: irrVal,
    npv,
    annualSavings
  };
}

// utils.js

// Cijene i koeficijenti
const COST_PER_KW = 800;              // €/kW – utility-scale cijena
const YIELD_PER_KW = 1200;            // kWh/godina po kW instalacije
const LAND_REQUIREMENT = 10000;       // m² po 1 MW (≈1ha/MW)
const ELECTRICITY_PRICE = 80;         // €/MWh prihod od prodaje

/**
 * Račun za producera
 * @param {Object} data - ulazni podaci
 * @param {number} data.area - raspoloživa površina u m² (obavezno)
 * @param {number} [data.maxPower] - maksimalna snaga koju investitor želi (kW) (opciono)
 * @param {number} [data.budget] - maksimalni budžet (€) (opciono)
 */
export function calculateProducerResults(data) {
  if (!data.area || data.area <= 0) {
    throw new Error("Area is required and must be > 0");
  }

  // 1) Koliko area dozvoljava
  const maxKwByArea = (data.area / LAND_REQUIREMENT) * 1000; // kW

  // 2) Koliko je budžet dovoljan
  const maxKwByBudget = data.budget ? (data.budget / COST_PER_KW) : Infinity;

  // 3) Koliko investitor traži max snage
  const maxKwByUser = data.maxPower ? data.maxPower : Infinity;

  // 4) Finalna instalirana snaga
  const installedKw = Math.min(maxKwByArea, maxKwByBudget, maxKwByUser);

  // 5) CAPEX
  const cost = installedKw * COST_PER_KW;

  // 6) Godišnja proizvodnja
  const production = installedKw * YIELD_PER_KW;

  // 7) Godišnji prihod (€/godina)
  const revenueYear = (production / 1000) * ELECTRICITY_PRICE;

  // 8) Payback
  const paybackYears = revenueYear > 0 ? (cost / revenueYear).toFixed(1) : null;

  return {
    installedKw,
    cost: Math.round(cost),
    production: Math.round(production),
    revenueYear: Math.round(revenueYear),
    paybackYears,
    assumptions: {
      costPerKw: COST_PER_KW,
      yieldPerKw: YIELD_PER_KW,
      electricityPrice: ELECTRICITY_PRICE,
      landRequirement: LAND_REQUIREMENT,
    },
  };
}

// utils.js
// utils.js
/*export function calculateProducerResult(area, maxPower, budget) {
  if (!area) return null; // bez area nema računice

  // pretpostavka: 1 kWp ≈ 5 m²
  const kWpFromArea = area / 5;
  const kWp = maxPower ? Math.min(maxPower, kWpFromArea) : kWpFromArea;

  let adjustedKwp = kWp;
  let cost = Math.round(adjustedKwp * 800);

  if (budget && budget > 0) {
    const maxByBudget = Math.floor(budget / 800);
    adjustedKwp = Math.min(adjustedKwp, maxByBudget);
    cost = Math.round(adjustedKwp * 800);
  }

  const production = Math.round(adjustedKwp * 1100); // kWh godišnje

  return {
    kWp: adjustedKwp,
    production,
    cost,
    areaRequired: Math.round(adjustedKwp * 5),
  };
}*/

// --- PRODUCER CALCULATION ---
export function calculateProducerResult(area, maxPower, budget, irradiation) {
  const Ey = Number(irradiation) || 1200;       // kWh/m²/year (fallback)
  const DENSITY = 0.15;                         // kWp per m² (packing + module efficiency)
  const CAPEX_PER_KWP = 900;                    // € per kWp (baseline)
  const FEED_IN = 0.10;                         // €/kWh assumed feed-in price

  const areaNum = Math.max(0, Number(area) || 0);
  const maxPowerNum = Number(maxPower) > 0 ? Number(maxPower) : null;
  const budgetNum = Number(budget) > 0 ? Number(budget) : null;

  // Base capacity from area
  let kWp = areaNum * DENSITY;

  // Cap by optional max power
  if (maxPowerNum != null) kWp = Math.min(kWp, maxPowerNum);

  // Cap by optional budget
  if (budgetNum != null) kWp = Math.min(kWp, budgetNum / CAPEX_PER_KWP);

  if (!isFinite(kWp) || kWp < 0) kWp = 0;

  const production = Math.round(kWp * Ey);                 // kWh/year
  const cost = Math.round(kWp * CAPEX_PER_KWP);            // €
  const annualRevenue = Math.round(production * FEED_IN);  // €/year
  const revenue20y = Math.round(annualRevenue * 20);       // € (no escalation here)

  return {
    kWp: +kWp.toFixed(2),
    production,
    cost,
    annualRevenue,
    revenue20y,
  };
}






