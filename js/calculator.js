/**
 * INTERACTIVE LEAD VELOCITY & CRM ROI SIMULATOR
 * Real-time dynamic calculation of revenue lift via automated GHL & AI agents
 */

(function initCalculator() {
  const leadsSlider = document.getElementById('leadsSlider');
  const dealSlider = document.getElementById('dealSlider');
  const convSlider = document.getElementById('convSlider');

  const leadsVal = document.getElementById('leadsVal');
  const dealVal = document.getElementById('dealVal');
  const convVal = document.getElementById('convVal');
  const revGain = document.getElementById('revGain');
  const annualGain = document.getElementById('annualGain');

  if (!leadsSlider || !dealSlider || !convSlider || !leadsVal || !dealVal || !convVal || !revGain) {
    return;
  }

  function updateCalculations() {
    const leads = parseInt(leadsSlider.value, 10);
    const deal = parseInt(dealSlider.value, 10);
    const conv = parseFloat(convSlider.value);

    // Update label displays
    leadsVal.textContent = leads.toLocaleString();
    dealVal.textContent = `$${deal.toLocaleString()}`;
    convVal.textContent = `${conv.toFixed(1)}%`;

    // Mathematical Model:
    // With instant AI qualification (<15s response time) + multi-touch GHL nurture,
    // industry benchmarks show a conservative 65% lift in closing velocity.
    const currentDeals = leads * (conv / 100);
    const optimizedConv = conv * 1.65;
    const newDeals = leads * (optimizedConv / 100);

    const extraMonthlyDeals = newDeals - currentDeals;
    const extraMonthlyRevenue = extraMonthlyDeals * deal;
    const extraAnnualRevenue = extraMonthlyRevenue * 12;

    revGain.textContent = `+$${Math.round(extraMonthlyRevenue).toLocaleString()} / mo`;
    if (annualGain) {
      annualGain.textContent = `~$${Math.round(extraAnnualRevenue).toLocaleString()} / yr`;
    }
  }

  [leadsSlider, dealSlider, convSlider].forEach(slider => {
    slider.addEventListener('input', updateCalculations);
  });

  // Initial calculation
  updateCalculations();
})();
