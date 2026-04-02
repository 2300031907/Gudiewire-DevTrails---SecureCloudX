// PagePolicy.jsx — Exclusion Clauses + Actuarial Analysis
import styles from './PagePolicy.module.css';

export default function PagePolicy() {

  const EXCLUSIONS = [
    {
      icon: '⚔️', title: 'War & Civil Unrest', color: '#ef4444',
      clauses: [
        'Acts of war, invasion, or armed conflict',
        'Civil war, rebellion, or military coup',
        'Riots causing zone disruption beyond 48 hours',
        'Government-declared national emergency (non-weather)',
      ],
      note: 'Civic disruptions under Section 144 are covered only if declared for weather or public health reasons.',
    },
    {
      icon: '🦠', title: 'Pandemic & Epidemic Events', color: '#f59e0b',
      clauses: [
        'WHO-declared pandemic lockdowns (e.g. COVID-19 scale)',
        'State-imposed epidemic quarantine zones',
        'Platform shutdowns due to government health orders',
        'Income loss due to rider personal illness or quarantine',
      ],
      note: 'Zone-level AQI spikes due to industrial pollution remain covered under the Pollution Shield.',
    },
    {
      icon: '🌋', title: 'Acts of God — Beyond Trigger Scope', color: '#8b5cf6',
      clauses: [
        'Earthquakes, volcanic eruptions, tsunamis',
        'Lightning strikes causing personal property damage',
        'Sinkholes or geological events in the delivery zone',
        'Solar flares causing GPS/network outage',
      ],
      note: 'Flood and heavy rain ARE covered. Only geological and astronomical events are excluded.',
    },
    {
      icon: '⚠️', title: 'Wilful Negligence & Misconduct', color: '#f97316',
      clauses: [
        'Rider voluntarily abandons zone during active coverage',
        'Platform account suspended due to rider misconduct',
        'Claims filed while rider is on personal leave',
        'Earnings loss due to traffic violations or accidents',
      ],
      note: 'Riders suspended by platforms due to external disputes (not personal fault) may appeal within 48 hours.',
    },
    {
      icon: '🗺️', title: 'Pre-existing Zone Disputes', color: '#22d3ee',
      clauses: [
        'Zone boundary changes initiated before policy start',
        'Dark store relocations announced before policy week',
        'Platform restructuring of delivery zones mid-week',
        'Rider-requested zone transfers during active policy',
      ],
      note: 'Zone changes after policy activation are covered for up to 72 hours while the rider re-registers.',
    },
    {
      icon: '💻', title: 'Excluded Technical Events', color: '#60a5fa',
      clauses: [
        "Rider's personal device failure or loss",
        'Personal internet/data plan outage',
        'Platform app bugs affecting only individual accounts',
        'Scheduled platform maintenance (announced 24hr prior)',
      ],
      note: 'Platform-wide outages affecting >80% of zone orders for >20 minutes remain fully covered.',
    },
  ];

  const STATS = [
    { v: '47%',    l: 'Target Loss Ratio',    c: '#10b981', sub: 'Claims / Premium Pool' },
    { v: '₹2.25Cr', l: 'Weekly Premium Pool', c: '#60a5fa', sub: '50,000 riders × ₹45 avg' },
    { v: '₹11L',   l: 'Net Weekly Margin',    c: '#22d3ee', sub: 'After claims + ops costs' },
    { v: '3.2×',   l: 'Reserve Coverage Ratio', c: '#a78bfa', sub: 'Reserve / Weekly claims' },
  ];

  const LOSS_YEARS = [
    { year: 'Year 1', ratio: 52, riders: '50,000',   claims: '₹1.17Cr/wk', margin: '₹1.08Cr/wk', c: '#f59e0b' },
    { year: 'Year 2', ratio: 48, riders: '1,50,000', claims: '₹3.24Cr/wk', margin: '₹3.51Cr/wk', c: '#22d3ee' },
    { year: 'Year 3', ratio: 44, riders: '3,00,000', claims: '₹5.94Cr/wk', margin: '₹7.56Cr/wk', c: '#10b981' },
  ];

  const RESERVE_ROWS = [
    { label: 'Seed Reserve Fund',       value: '₹50 Lakhs',  note: 'Covers 4.3 weeks of claims at Year 1 volume',        c: '#60a5fa' },
    { label: 'Reserve Replenishment',   value: '8% of premium', note: 'Auto-allocated every week to reserve pool',        c: '#a78bfa' },
    { label: 'Catastrophe Buffer',      value: '₹1.5 Crore', note: 'For simultaneous multi-zone extreme events',          c: '#f59e0b' },
    { label: 'Reinsurance Trigger',     value: 'Claims > 75%', note: 'Reinsurance partner activated above 75% loss ratio', c: '#ef4444' },
    { label: 'GigScore Impact on Loss', value: '−18% claims', note: 'High GigScore riders file 18% fewer fraudulent claims', c: '#10b981' },
    { label: 'Fraud Shield Savings',    value: '₹32L/year',  note: 'Estimated annual savings from Isolation Forest model', c: '#22d3ee' },
  ];

  const CLAIMS = [
    { trigger: 'Heavy Rain',      freq: '18 days/yr', payout: '₹900', pct: 72, color: '#3b82f6', icon: '🌧️' },
    { trigger: 'Heatwave',        freq: '24 days/yr', payout: '₹320', pct: 58, color: '#f59e0b', icon: '🌡️' },
    { trigger: 'High AQI',        freq: '31 days/yr', payout: '₹280', pct: 45, color: '#8b5cf6', icon: '😷' },
    { trigger: 'Platform Outage', freq: '8 days/yr',  payout: '₹900', pct: 28, color: '#22d3ee', icon: '💻' },
    { trigger: 'Zone Curfew',     freq: '3 days/yr',  payout: '₹900', pct: 12, color: '#ef4444', icon: '🚫' },
  ];

  const SUSTAIN = [
    { label: 'Actuarial Safety Margin', value: '21%', note: 'Buffer above expected claims',       c: '#10b981' },
    { label: 'Operating Cost Ratio',    value: '12%', note: 'Tech + ops + fraud detection',       c: '#60a5fa' },
    { label: 'Reinsurance Premium',     value: '8%',  note: 'Cedant to reinsurance partner',      c: '#a78bfa' },
    { label: 'Reserve Contribution',    value: '8%',  note: 'Weekly reserve pool top-up',         c: '#f59e0b' },
    { label: 'Net Profit Margin',       value: '9%',  note: 'After all deductions at Year 1',     c: '#22d3ee' },
  ];

  return (
    <div className={styles.page}>

      {/* Header */}
      <div className={styles.header}>
        <h2 className={styles.headerTitle}>Policy Framework 📜</h2>
        <p className={styles.headerSub}>Exclusion clauses · Actuarial model · Risk sustainability analysis</p>
      </div>

      {/* ── SECTION 1: EXCLUSIONS ── */}
      <div className={styles.sectionLabel}>Section 1 — Standard Exclusion Clauses</div>

      <div className={styles.exclusionGrid}>
        {EXCLUSIONS.map((ex, i) => (
          <div key={i} className={styles.exclusionCard}
            style={{ border: `1px solid ${ex.color}22` }}>
            <div className={styles.exclusionHeader}>
              <div className={styles.exclusionIconBox}
                style={{ background: ex.color + '18', border: `1px solid ${ex.color}33` }}>
                {ex.icon}
              </div>
              <span className={styles.exclusionTitle} style={{ color: ex.color }}>{ex.title}</span>
            </div>
            <div className={styles.clauseList}>
              {ex.clauses.map((c, j) => (
                <div key={j} className={styles.clauseItem}>
                  <span className={styles.clauseX}>✕</span>
                  {c}
                </div>
              ))}
            </div>
            <div className={styles.exclusionNote}
              style={{ background: ex.color + '0d', border: `1px solid ${ex.color}22`, color: ex.color }}>
              💡 {ex.note}
            </div>
          </div>
        ))}
      </div>

      {/* ── SECTION 2: ACTUARIAL ── */}
      <div className={styles.sectionLabel}>Section 2 — Actuarial & Financial Sustainability Model</div>

      {/* Stat cards */}
      <div className={styles.statGrid}>
        {STATS.map((s, i) => (
          <div key={i} className={styles.statCard}>
            <div className={styles.statTimestamp}>🕐 Actuarial Model · Year 1</div>
            <div className={styles.statValue} style={{ color: s.c }}>{s.v}</div>
            <div className={styles.statLabel}>{s.l}</div>
            <div className={styles.statSub}>{s.sub}</div>
          </div>
        ))}
      </div>

      <div className={styles.twoCol}>

        {/* Loss Ratio */}
        <div className={styles.card}>
          <div className={styles.cardTitle}>
            <span>📉 Loss Ratio Projection · Year 1–3</span>
            <span className={styles.cardTimestamp}>🕐 Actuarial forecast</span>
          </div>
          {LOSS_YEARS.map((y, i) => (
            <div key={i} style={{ marginBottom: '.85rem' }}>
              <div className={styles.lossYearLabel}>
                <span style={{ fontWeight: 700, color: y.c }}>{y.year}</span>
                <span style={{ fontFamily: 'var(--mono)', fontWeight: 700, color: y.c }}>{y.ratio}% loss ratio</span>
              </div>
              <div className={styles.lossBar}>
                <div className={styles.lossBarFill} style={{ width: `${y.ratio}%`, background: y.c }} />
              </div>
              <div className={styles.lossMetaGrid}>
                {[['Riders', y.riders], ['Claims/wk', y.claims], ['Margin/wk', y.margin]].map(([l, v]) => (
                  <div key={l} className={styles.lossMetaCell}>
                    <div className={styles.lossMetaCellLabel}>{l}</div>
                    <div className={styles.lossMetaCellValue}>{v}</div>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>

        {/* Reserve Fund */}
        <div className={styles.card}>
          <div className={styles.cardTitle}>🏦 Reserve Fund & Break-Even Model</div>
          <div className={styles.breakEvenBox}>
            <div className={styles.breakEvenLabel}>Break-Even Point</div>
            <div className={styles.breakEvenValue}>12,400 riders</div>
            <div className={styles.breakEvenNote}>
              At avg premium ₹45/week with 52% loss ratio and ₹8L/week fixed ops cost,
              break-even is achieved at 12,400 active riders — reachable in Month 3 of Phase 1.
            </div>
          </div>
          {RESERVE_ROWS.map((r, i) => (
            <div key={i} className={styles.reserveRow}>
              <div>
                <div className={styles.reserveRowLabel}>{r.label}</div>
                <div className={styles.reserveRowNote}>{r.note}</div>
              </div>
              <span className={styles.reserveRowValue} style={{ color: r.c }}>{r.value}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Claims Frequency */}
      <div className={styles.card} style={{ marginBottom: '1rem' }}>
        <div className={styles.cardTitle}>
          <span>📊 Claims Frequency Model · Trigger Distribution</span>
          <span className={styles.cardTimestamp}>Based on 3-year Hyderabad weather & AQI data</span>
        </div>
        <div className={styles.claimsGrid}>
          {CLAIMS.map((t, i) => (
            <div key={i} className={styles.claimCell}
              style={{ background: t.color + '0d', border: `1px solid ${t.color}22` }}>
              <div className={styles.claimIcon}>{t.icon}</div>
              <div className={styles.claimTrigger} style={{ color: t.color }}>{t.trigger}</div>
              <div className={styles.claimFreq}>{t.freq}</div>
              <div className={styles.claimPayout}>Avg payout {t.payout}</div>
              <div className={styles.claimBar}>
                <div className={styles.claimBarFill} style={{ width: `${t.pct}%`, background: t.color }} />
              </div>
              <div className={styles.claimPct} style={{ color: t.color }}>{t.pct}% zones</div>
            </div>
          ))}
        </div>
      </div>

      {/* Formula */}
      <div className={styles.formulaCard}>
        <div className={styles.cardTitle}>⚖️ Premium Sustainability Formula</div>
        <div className={styles.formulaGrid}>
          <div className={styles.formulaBox}>
            <div className={styles.formulaBoxTitle}>Final Weekly Premium =</div>
            <div>  Base Tier (₹19 / ₹39 / ₹79)</div>
            <div>  × Zone Risk Multiplier <span style={{ color: '#f59e0b' }}>(0.85 – 1.40)</span></div>
            <div>  × Season Factor <span style={{ color: '#22d3ee' }}>(1.00 / 1.15 / 1.25)</span></div>
            <div>  × Claim History <span style={{ color: '#ef4444' }}>(0.95 / 1.10 / 1.30)</span></div>
            <div>  × GigScore Discount <span style={{ color: '#10b981' }}>(1.00 / 0.95 / 0.90)</span></div>
            <div className={styles.formulaExample}>
              Example → Ravi: ₹39 × 1.20 × 1.25 × 1.00 × 0.95 = <span style={{ color: '#22d3ee' }}>₹56/week</span>
            </div>
          </div>
          <div>
            {SUSTAIN.map((r, i) => (
              <div key={i} className={styles.sustainRow}>
                <div>
                  <div className={styles.sustainLabel}>{r.label}</div>
                  <div className={styles.sustainNote}>{r.note}</div>
                </div>
                <span className={styles.sustainValue} style={{ color: r.c }}>{r.value}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

    </div>
  );
}