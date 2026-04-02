
ZeroShield
AI-Powered Parametric Income Insurance for Q-Commerce Delivery Partners
=======

# ZeroShield
### AI-Powered Parametric Income Insurance for Q-Commerce Delivery Partners


    Guidewire DEVTrails 2026 | Phase 1 — Ideation & Foundation Persona: Q-Commerce Riders (Zepto / Blinkit / Swiggy Instamart)


The Problem We're Solving
=======
---

## The Problem We're Solving
=======
ZeroShield
AI-Powered Parametric Income Insurance for Q-Commerce Delivery Partners

    Guidewire DEVTrails 2026 | Phase 1 — Ideation & Foundation Persona: Q-Commerce Riders (Zepto / Blinkit / Swiggy Instamart)

The Problem We're Solving


India's Q-Commerce riders (Zepto, Blinkit, Swiggy Instamart) are locked to a fixed dark store zone of 2–5 km. They must complete deliveries in under 10 minutes and earn purely per-order. When an external disruption hits their zone — heavy rain, a heatwave, a spike in pollution, a curfew — their income drops to zero instantly.

Unlike food delivery riders who can reroute, Q-commerce riders cannot leave their zone. One flooded street means one lost shift. One lost shift means no safety net.

No insurance product today covers hyperlocal, zone-level income loss. ZeroShield is the first.
<<<<<<< HEAD
Persona and Scenarios
Primary Persona: Ravi, 26 — Zepto Rider, Kondapur Dark Store, Hyderabad

    Works 6 days/week, 8–10 hours/day
    Earns Rs.600–900/day (approximately Rs.4,200–6,300/week)
    Has no savings buffer — misses rent if he loses 2 days of income
    Pays Rs.59/week for ZeroShield Standard coverage (AI-adjusted for his zone and monsoon season)

Scenario 1 — Heavy Rain

6 PM Thursday. Flash flooding hits Kondapur main road. Orders drop 90% in Ravi's zone. ZeroShield's rain trigger fires (rainfall exceeds 15mm/hr via Weather API). Claim is auto-initiated. Fraud check passes. Rs.900 payout is credited to Ravi's UPI in under 4 minutes. He filed nothing.

Scenario 2 — Heatwave

2 PM, peak summer. Heat index crosses 43 degrees Celsius in Ravi's zone. Open-Meteo API records the breach. Order volume drops more than 60% compared to Ravi's 4-week baseline for that time slot. ZeroShield auto-triggers a partial payout of Rs.320 for the 2-hour window. He also receives a heat safety alert advising him to stay hydrated and avoid riding between 1–4 PM.

Scenario 3 — High Pollution

AQI spikes to 320 (Hazardous) in Ravi's zone during smog season. WAQI API fires the pollution trigger. GPS confirms Ravi is active in the zone. Payout of Rs.280 is processed. A health alert is sent recommending an N95 mask or a break from riding.

Scenario 4 — Zone Curfew

Sudden Section 144 is imposed in Ravi's delivery zone. A mock civic alert feed triggers ZeroShield's social disruption parameter. Full shift payout of Rs.900 is activated. An emergency notification is sent to Ravi's registered emergency contact.
Platform Architecture

Our platform follows a clean 6-layer pipeline.


```
=======
Persona and Scenarios
Primary Persona: Ravi, 26 — Zepto Rider, Kondapur Dark Store, Hyderabad

    Works 6 days/week, 8–10 hours/day
    Earns Rs.600–900/day (approximately Rs.4,200–6,300/week)
    Has no savings buffer — misses rent if he loses 2 days of income
    Pays Rs.59/week for ZeroShield Standard coverage (AI-adjusted for his zone and monsoon season)

Scenario 1 — Heavy Rain

6 PM Thursday. Flash flooding hits Kondapur main road. Orders drop 90% in Ravi's zone. ZeroShield's rain trigger fires (rainfall exceeds 15mm/hr via Weather API). Claim is auto-initiated. Fraud check passes. Rs.900 payout is credited to Ravi's UPI in under 4 minutes. He filed nothing.

Scenario 2 — Heatwave

2 PM, peak summer. Heat index crosses 43 degrees Celsius in Ravi's zone. Open-Meteo API records the breach. Order volume drops more than 60% compared to Ravi's 4-week baseline for that time slot. ZeroShield auto-triggers a partial payout of Rs.320 for the 2-hour window. He also receives a heat safety alert advising him to stay hydrated and avoid riding between 1–4 PM.

Scenario 3 — High Pollution

AQI spikes to 320 (Hazardous) in Ravi's zone during smog season. WAQI API fires the pollution trigger. GPS confirms Ravi is active in the zone. Payout of Rs.280 is processed. A health alert is sent recommending an N95 mask or a break from riding.

Scenario 4 — Zone Curfew

Sudden Section 144 is imposed in Ravi's delivery zone. A mock civic alert feed triggers ZeroShield's social disruption parameter. Full shift payout of Rs.900 is activated. An emergency notification is sent to Ravi's registered emergency contact.
Platform Architecture

Our platform follows a clean 6-layer pipeline.


Worker App  -->  API Gateway  -->  Core Services + AI/ML Engine + Data Sources
                                          |
                                Parametric Trigger Engine
                                          |
                              Adversarial Defense and Fraud Shield
                                          |
                                     Payout System


Layer 1 — Worker App (Frontend)
=======

```

### Layer 1 — Worker App (Frontend)
=======

Layer 1 — Worker App (Frontend)


The rider-facing Progressive Web App (PWA), accessible on both mobile and web.

Key screens include weekly coverage overview, live risk and health alerts for the rider's zone, GigScore dashboard, payout history, Smart Advisor recommendations, and an emergency button for one-tap assistance.

Tech: React Native Web and Expo for a single codebase across Android, iOS, and Web. Firebase OTP login for zero-friction authentication.

Layer 2 — API Gateway (Backend)
=======


### Layer 2 — API Gateway (Backend)
=======
Layer 2 — API Gateway (Backend)


Single entry point for all client and admin requests. Handles authentication and session validation, rate limiting, request routing to core services, response caching via Redis for weather and AQI data, and webhook listening for Razorpay payout callbacks.

Tech: FastAPI (Python), Redis (Upstash free tier), Firebase Auth.

Layer 3 — Core Services
=======


User Management handles rider registration with Aadhaar and phone verification, dark store zone selection with GPS pin registration on a map, weekly earnings declaration, plan subscription management, and GigScore profile initialization.

Policy Engine creates a weekly policy active from Monday 00:00 to Sunday 23:59. It calls the ShiftGuard Dynamic Pricing AI to compute a personalized premium, applies GigScore discounts for high-reliability riders, and sends renewal nudges every Sunday with the next week's risk forecast and smart shift timing advice.

Claims Processor receives trigger events from the Parametric Trigger Engine, runs the 7-signal adversarial fingerprint check, calls the Fraud Detection AI to score the claim, auto-approves clean claims in under 5 minutes, soft-holds ambiguous claims for up to 2 hours, and flags high-risk claims for manual review within 15 minutes.

Payment Service uses Razorpay Test Mode for payout simulation in Phases 1 and 2, moving to live Razorpay in Phase 3. Supports UPI as the primary instant channel and bank transfer as a fallback. Target payout time is under 5 minutes from trigger fire.
Layer 3b — AI/ML Engine

Risk Prediction AI uses a Gradient Boosted Regressor (XGBoost) trained on zone flood history, AQI frequency, rider tenure, zone claim density, season, and time of day. It outputs a weekly risk score per zone (0–100) and a per-rider personalized risk score. It is retrained every Sunday midnight.

Dynamic Pricing AI computes the final weekly premium using the formula below.



**Risk Prediction AI** uses a Gradient Boosted Regressor (XGBoost) trained on zone flood history, AQI frequency, rider tenure, zone claim density, season, and time of day. It outputs a weekly risk score per zone (0–100) and a per-rider personalized risk score. It is retrained every Sunday midnight.

**Dynamic Pricing AI** computes the final weekly premium using the formula below.

```
=======
Layer 3 — Core Services

User Management handles rider registration with Aadhaar and phone verification, dark store zone selection with GPS pin registration on a map, weekly earnings declaration, plan subscription management, and GigScore profile initialization.

Policy Engine creates a weekly policy active from Monday 00:00 to Sunday 23:59. It calls the ShiftGuard Dynamic Pricing AI to compute a personalized premium, applies GigScore discounts for high-reliability riders, and sends renewal nudges every Sunday with the next week's risk forecast and smart shift timing advice.

Claims Processor receives trigger events from the Parametric Trigger Engine, runs the 7-signal adversarial fingerprint check, calls the Fraud Detection AI to score the claim, auto-approves clean claims in under 5 minutes, soft-holds ambiguous claims for up to 2 hours, and flags high-risk claims for manual review within 15 minutes.

Payment Service uses Razorpay Test Mode for payout simulation in Phases 1 and 2, moving to live Razorpay in Phase 3. Supports UPI as the primary instant channel and bank transfer as a fallback. Target payout time is under 5 minutes from trigger fire.
Layer 3b — AI/ML Engine

Risk Prediction AI uses a Gradient Boosted Regressor (XGBoost) trained on zone flood history, AQI frequency, rider tenure, zone claim density, season, and time of day. It outputs a weekly risk score per zone (0–100) and a per-rider personalized risk score. It is retrained every Sunday midnight.

Dynamic Pricing AI computes the final weekly premium using the formula below.


Final Weekly Premium = Base Tier
                       x Zone Risk Multiplier (0.85 to 1.40)
                       x Season Factor (1.00 normal | 1.15 summer | 1.25 monsoon)
                       x Claim History Modifier (0.95 clean | 1.10 one claim | 1.30 two or more)
                       x GigScore Discount (1.00 new | 0.95 score 700+ | 0.90 score 850+)

```


Example for Ravi on the Standard plan during monsoon in Kondapur with a GigScore of 720: Rs.39 x 1.20 x 1.25 x 1.00 x 0.95 = Rs.55.6, rounded to Rs.56 per week.

Fraud Detection AI uses an Isolation Forest model (unsupervised anomaly detection). Inputs include GPS zone consistency score, collective order volume drop percentage, deviation from personal earning baseline, claim frequency, device signals, and peer correlation. Output is a fraud probability score from 0 to 1. Scores above 0.75 are flagged for review.

GigScore Engine is a reliability and trustworthiness score between 300 and 900, modeled on a credit score but built for gig workers. Score inputs include claim accuracy rate, platform tenure and consistency, shift regularity, zone adherence, and peer review signals from platform APIs.
GigScore Range 	Benefit
300–499 	Standard pricing, no extras
500–699 	5% premium discount
700–849 	10% discount and priority claim processing
850–900 	15% discount, Verified Honest badge, and microfinance eligibility

Riders with a GigScore above 750 can apply for microloans between Rs.2,000 and Rs.10,000 through partner NBFCs, using their claim history and reliability score as a credit signal. This is the first financial identity product built exclusively for gig workers.

Smart Advisor AI delivers proactive suggestions every Sunday before the new coverage week. Examples include shift timing advice based on rain probability forecasts, zone comparison insights showing which zones have lower disruption frequency, and upgrade nudges when the upcoming week carries elevated risk.
Layer 3c — Data Sources
Source 	API 	What We Pull 	Trigger It Powers
Weather API 	OpenWeatherMap (free tier) 	Rainfall mm/hr, wind speed, forecast 	Heavy Rain and Smart Advisor
Pollution API 	WAQI API (free tier) 	AQI index per pin location 	High Pollution and Health Alerts
Traffic API 	Mock / TomTom sandbox 	Road closure flags, zone access status 	Zone Blockage
Platform API 	Simulated Zepto/Blinkit feed 	Order volume per zone 	Platform Outage and Fraud Validation
Heat Index 	Open-Meteo (free, no key required) 	Feels-like temperature 	Heatwave and Health Alerts

All sources are polled every 5 minutes via a background cron job on the API server.
Layer 4 — Parametric Trigger Engine

The core engine monitors all data feeds and fires claims automatically. No rider action is required.


| Trigger | Fire Condition | Type |
|---------|----------------|------|
| Heavy Rain | Rainfall exceeds 15mm/hr in rider's 3km zone | Environmental |
| Heatwave | Feels-like temperature exceeds 42 degrees Celsius during active shift | Environmental |
| High Pollution | AQI exceeds 300 (Hazardous) in rider's zone | Environmental |
| Zone Curfew or Lockdown | Government alert tag active in rider's delivery zone | Social |
| Platform Outage | Order volume drops more than 80% zone-wide for over 20 continuous minutes | Tech |


Example for Ravi on the Standard plan during monsoon in Kondapur with a GigScore of 720: Rs.39 x 1.20 x 1.25 x 1.00 x 0.95 = Rs.55.6, rounded to Rs.56 per week.

Fraud Detection AI uses an Isolation Forest model (unsupervised anomaly detection). Inputs include GPS zone consistency score, collective order volume drop percentage, deviation from personal earning baseline, claim frequency, device signals, and peer correlation. Output is a fraud probability score from 0 to 1. Scores above 0.75 are flagged for review.

GigScore Engine is a reliability and trustworthiness score between 300 and 900, modeled on a credit score but built for gig workers. Score inputs include claim accuracy rate, platform tenure and consistency, shift regularity, zone adherence, and peer review signals from platform APIs.
GigScore Range 	Benefit
300–499 	Standard pricing, no extras
500–699 	5% premium discount
700–849 	10% discount and priority claim processing
850–900 	15% discount, Verified Honest badge, and microfinance eligibility

Riders with a GigScore above 750 can apply for microloans between Rs.2,000 and Rs.10,000 through partner NBFCs, using their claim history and reliability score as a credit signal. This is the first financial identity product built exclusively for gig workers.

Smart Advisor AI delivers proactive suggestions every Sunday before the new coverage week. Examples include shift timing advice based on rain probability forecasts, zone comparison insights showing which zones have lower disruption frequency, and upgrade nudges when the upcoming week carries elevated risk.
Layer 3c — Data Sources
Source 	API 	What We Pull 	Trigger It Powers
Weather API 	OpenWeatherMap (free tier) 	Rainfall mm/hr, wind speed, forecast 	Heavy Rain and Smart Advisor
Pollution API 	WAQI API (free tier) 	AQI index per pin location 	High Pollution and Health Alerts
Traffic API 	Mock / TomTom sandbox 	Road closure flags, zone access status 	Zone Blockage
Platform API 	Simulated Zepto/Blinkit feed 	Order volume per zone 	Platform Outage and Fraud Validation
Heat Index 	Open-Meteo (free, no key required) 	Feels-like temperature 	Heatwave and Health Alerts

All sources are polled every 5 minutes via a background cron job on the API server.
Layer 4 — Parametric Trigger Engine

The core engine monitors all data feeds and fires claims automatically. No rider action is required.

Trigger 	Fire Condition 	Type
Heavy Rain 	Rainfall exceeds 15mm/hr in rider's 3km zone 	Environmental
Heatwave 	Feels-like temperature exceeds 42 degrees Celsius during active shift 	Environmental
High Pollution 	AQI exceeds 300 (Hazardous) in rider's zone 	Environmental
Zone Curfew or Lockdown 	Government alert tag active in rider's delivery zone 	Social
Platform Outage 	Order volume drops more than 80% zone-wide for over 20 continuous minutes 	Tech



Trigger 5 (Platform Outage) is our differentiator. If Zepto or Blinkit's app itself goes down, riders lose income. We cover that. No other insurance product does.

Payout calculation per trigger:



Payout = Average Hourly Earning x Disrupted Hours x Coverage Ratio

Coverage Ratio: Basic = 60% | Standard = 75% | Premium = 90%
Disrupted Hours: Determined by trigger start and end timestamps from API data
Average Hourly Earning: Onboarding-declared, validated against platform order data


In addition to payouts, ZeroShield sends health alerts when AQI or heat crosses safety thresholds even if they do not cross the payout trigger level.
Layer 5 — Adversarial Defense and Anti-Spoofing Strategy

A coordinated ring of 500 GPS-spoofing riders attempted to drain a parametric insurance liquidity pool by faking their locations inside red-alert weather zones. Here is exactly how ZeroShield detects, flags, and neutralizes this attack without punishing a single honest worker.

5.1 Differentiating a Genuine Worker from a GPS Spoofer

ZeroShield uses a 7-signal behavioral fingerprint.
Signal 	Genuine Stranded Rider 	GPS Spoofer
Device sensor data 	Accelerometer shows idle movement consistent with waiting outdoors 	Perfectly still with no micro-vibrations from an outdoor environment
GPS signal quality 	Weak or fluctuating signal consistent with bad weather degrading satellite lock 	Artificially strong and stable signal produced by spoofing apps
Location history continuity 	GPS trail shows the rider traveling to the zone before the disruption began 	Sudden jump from home coordinates to the disruption zone at trigger time
Battery and network behavior 	Battery draining faster, connected to mobile towers in the claimed zone 	Battery stable, connected to home WiFi rather than towers in the claimed zone
Order activity baseline 	Order attempts made before disruption, then flatlined consistent with zone shutdown 	Zero order attempts before or during the event
Platform heartbeat 	Zepto or Blinkit app open and active in foreground during claimed period 	App closed or backgrounded, not trying to accept orders
Peer zone validation 	Other verified riders in the same zone show identical order dropoff pattern 	No other riders in the zone showing the same disruption signal

All 7 signals are scored and fed into the Isolation Forest model. A spoofer fails 4 to 5 signals simultaneously, a combination that is statistically near-impossible for a genuine worker.



=======
**5.2 Detecting a Coordinated Fraud Ring**
=======

In addition to payouts, ZeroShield sends health alerts when AQI or heat crosses safety thresholds even if they do not cross the payout trigger level.
Layer 5 — Adversarial Defense and Anti-Spoofing Strategy

A coordinated ring of 500 GPS-spoofing riders attempted to drain a parametric insurance liquidity pool by faking their locations inside red-alert weather zones. Here is exactly how ZeroShield detects, flags, and neutralizes this attack without punishing a single honest worker.

5.1 Differentiating a Genuine Worker from a GPS Spoofer

ZeroShield uses a 7-signal behavioral fingerprint.
Signal 	Genuine Stranded Rider 	GPS Spoofer
Device sensor data 	Accelerometer shows idle movement consistent with waiting outdoors 	Perfectly still with no micro-vibrations from an outdoor environment
GPS signal quality 	Weak or fluctuating signal consistent with bad weather degrading satellite lock 	Artificially strong and stable signal produced by spoofing apps
Location history continuity 	GPS trail shows the rider traveling to the zone before the disruption began 	Sudden jump from home coordinates to the disruption zone at trigger time
Battery and network behavior 	Battery draining faster, connected to mobile towers in the claimed zone 	Battery stable, connected to home WiFi rather than towers in the claimed zone
Order activity baseline 	Order attempts made before disruption, then flatlined consistent with zone shutdown 	Zero order attempts before or during the event
Platform heartbeat 	Zepto or Blinkit app open and active in foreground during claimed period 	App closed or backgrounded, not trying to accept orders
Peer zone validation 	Other verified riders in the same zone show identical order dropoff pattern 	No other riders in the zone showing the same disruption signal

All 7 signals are scored and fed into the Isolation Forest model. A spoofer fails 4 to 5 signals simultaneously, a combination that is statistically near-impossible for a genuine worker.

5.2 Detecting a Coordinated Fraud Ring


A ring of 500 leaves a completely different signature than a single bad actor.

Temporal Clustering: Genuine disruptions cause a gradual claim ramp-up as riders realize they cannot work. Coordinated fraud fires in a synchronized burst because a Telegram group sent a signal at the same time. If claims per zone exceed 3 times the historical average within any 15-minute window, the entire batch is held for ring review.

Social Graph Analysis: The same cluster of riders consistently claiming together across multiple events with over 70% co-claim overlap is flagged as a coordinated ring using a graph clustering algorithm.

GPS Spoofing App Fingerprints: Known spoofing apps leave detectable traces including the mock_location developer flag enabled on Android, altitude data frozen at exactly 0 meters, GPS coordinates updating at precisely 1.000 second intervals instead of the natural variation of real GPS, and no Bluetooth or WiFi access points detected near the claimed location. Device attestation is checked on every claim submission.

Geofence Precision Check: Fraud rings approximate the disruption zone coordinates but rarely get them exactly right. The claimed location must fall within a verified 500-meter radius of the API-recorded disruption epicenter.

Cross-Platform Order Activity Check: A rider claiming a disruption payout should not have active order completions on Zepto or Blinkit simultaneously. A simulated platform API cross-reference catches this immediately.


5.3 Protecting Honest Workers from False Flags
=======

**5.3 Protecting Honest Workers from False Flags**
=======
5.3 Protecting Honest Workers from False Flags


Three-Tier Claim Outcome System:

Tier 1 (Fraud score below 0.40): All 7 signals clean. Payout in under 5 minutes. Zero friction for the rider.

Tier 2 (Fraud score 0.40 to 0.74): Payout held for a maximum of 2 hours. Rider receives a message explaining that verification is in progress due to network conditions. If checks clear, payout is released automatically.

Tier 3 (Fraud score 0.75 and above): Admin is notified within 15 minutes. Rider receives a message that a quick verification is needed. A one-tap appeal is available in the app with a 4-hour resolution SLA.

The Honest Network Drop Safeguard: Bad weather causes bad GPS. During verified high-severity events (rain above 20mm/hr or AQI above 350), the GPS quality threshold is relaxed by 30% because signal degradation is expected. If GPS drops completely during a verified zone disruption, the rider's last known location up to 45 minutes prior, combined with peer zone validation, is used to confirm presence. A rider who loses signal in a storm is not penalized for losing signal in a storm.

The Appeal Flow: The rider taps one button to contest the decision and submits a 15-second voice note requiring no typing, designed for riders on the road. A human reviewer sees the voice note and full signal data within 4 hours. If the appeal is upheld, the payout is released and the fraud score is reset to baseline. After three successful appeals, the rider earns a Verified Honest badge that permanently reduces the fraud score weight by 20%.

Ring Isolation: When a fraud ring is detected, only the flagged cluster is held. All other riders in the zone with clean signals continue receiving instant payouts. Honest workers are never collateral damage.

Attack Vector 	ZeroShield Counter
GPS spoofing app 	Mock location detection and altitude/interval fingerprinting
Coordinated Telegram ring 	Temporal clustering and social graph analysis
Approximate location faking 	500-meter geofence precision check
Working while claiming 	Cross-platform order activity check
Network drop false positive 	Weather-adjusted GPS tolerance and last-known-location fallback
Wrongful flag on honest worker 	4-hour appeal SLA, voice note, and Verified Honest badge
Layer 6 — Payout System
Channel 	Speed 	Used When
UPI 	Instant, under 1 minute 	Primary — most riders have UPI
Bank Transfer 	1–2 hours 	Fallback for riders without UPI


| Attack Vector | ZeroShield Counter |
|--------------|---------------------|
| GPS spoofing app | Mock location detection and altitude/interval fingerprinting |
| Coordinated Telegram ring | Temporal clustering and social graph analysis |
| Approximate location faking | 500-meter geofence precision check |
| Working while claiming | Cross-platform order activity check |
| Network drop false positive | Weather-adjusted GPS tolerance and last-known-location fallback |
| Wrongful flag on honest worker | 4-hour appeal SLA, voice note, and Verified Honest badge |

### Layer 6 — Payout System

| Channel | Speed | Used When |
|---------|-------|-----------|
| UPI | Instant, under 1 minute | Primary — most riders have UPI |
| Bank Transfer | 1–2 hours | Fallback for riders without UPI |


Powered by Razorpay Test Mode in Phases 1 and 2, moving to live Razorpay in Phase 3. Target: payout credited within 5 minutes of trigger fire.
Weekly Premium Model
Plan 	Premium 	Coverage Cap 	Payout Ratio 	Best For
Basic Shield 	Rs.19/week 	Rs.800/week 	60% 	Part-time riders under 4 hours per day
Standard Shield 	Rs.39/week 	Rs.1,800/week 	75% 	Full-time riders 6–10 hours per day
Premium Shield 	Rs.79/week 	Rs.3,500/week 	90% 	Power riders 10 or more hours in peak zones

Premium is recalculated every Sunday midnight by the Dynamic Pricing AI. GigScore discounts are applied automatically.
Unique Innovations Beyond the Brief

GigScore — Financial Identity for Gig Workers India's gig workers have no formal credit history. GigScore (300–900) is built from claim accuracy, platform tenure, and shift consistency. High-score riders receive premium discounts and access to microloans through partner NBFCs. This is the first financial identity product built exclusively for gig workers and is scalable beyond insurance into lending and other financial products.

Smart Advisor AI Every Sunday, each rider receives a personalized risk forecast for their zone with actionable shift timing advice. ZeroShield does not just protect income — it helps riders optimize it.

Health Alert System When AQI or heat crosses safety thresholds even below payout trigger levels, riders receive proactive health alerts. ZeroShield protects income and health simultaneously.

Emergency Feature A one-tap emergency button in the app sends the rider's GPS location to their emergency contacts and alerts them to the nearest safe zone. This is triggered automatically during extreme weather or curfew events.

Platform (B2B) Integration ZeroShield connects with Zepto and Blinkit as a platform-level benefit. Platforms can subsidize a portion of rider premiums as a retention tool. ZeroShield provides platforms with anonymized zone-level disruption analytics. The API-first design allows seamless integration into existing platform dashboards.

Future Expansion The parametric trigger architecture is persona-agnostic. The roadmap beyond Phase 3 includes farmers covered for rainfall deficit or excess, construction workers covered for heat and rain, auto-rickshaw drivers covered for curfew and flood, and street vendors covered for market closure and AQI events.
Full Tech Stack
Component 	Technology
Mobile and PWA 	React Native Web and Expo
Web Admin Dashboard 	React.js and Tailwind CSS
Maps and Zone Visualization 	Mapbox GL JS (free tier)
Backend API 	FastAPI (Python)
Authentication 	Firebase Auth (OTP)
Primary Database 	PostgreSQL with PostGIS for geospatial zone queries
Cache and Event Queue 	Redis (Upstash free tier)
ML Risk and Pricing 	XGBoost (Python / scikit-learn)
ML Fraud Detection 	Isolation Forest (scikit-learn)
ML Forecasting 	Prophet (Meta)
ML GigScore 	Logistic Regression and rule engine
Weather Trigger 	OpenWeatherMap API (free tier)
Heat Trigger 	Open-Meteo API (free, no key required)
AQI Trigger 	WAQI API (free tier)
Curfew Trigger 	Mock civic alert JSON feed (simulated)
Outage Trigger 	Simulated platform health API (mock)
Payments 	Razorpay Test Mode transitioning to live UPI and Bank Transfer
Frontend Hosting 	Vercel
Backend Hosting 	Render (free tier)
Database Hosting 	Supabase (free tier)
Business Viability
Metric 	Estimate
Total addressable riders (Zepto and Blinkit, top 10 cities) 	approximately 3,00,000
Year 1 target adoption 	50,000 riders
Average weekly premium 	Rs.45
Weekly premium pool 	Rs.2.25 Crore per week
Target loss ratio 	45–55% (parametric, weather-driven, predictable)
Estimated net weekly margin 	approximately Rs.11 Lakh per week
GigScore microloan TAM (Year 2) 	Rs.500 Crore and above loan book potential
B2B platform licensing (Year 2) 	Rs.2–5 Crore ARR from 3–5 platform partners
Team
Name 	Role 	University 	ID Number
M Maruthi Sruthi 	Team Lead 	KL University 	2300031907
K Vaishnavi 	Team Member 	KL University 	2300030318
A Neeharika 	Team Member 	KL University 	2300030030


Built for Guidewire DEVTrails 2026 — Seed. Scale. Soar. ZeroShield — Because every disrupted hour deserves a safety net.
=======
**Platform (B2B) Integration**
ZeroShield connects with Zepto and Blinkit as a platform-level benefit. Platforms can subsidize a portion of rider premiums as a retention tool. ZeroShield provides platforms with anonymized zone-level disruption analytics. The API-first design allows seamless integration into existing platform dashboards.

**Future Expansion**
The parametric trigger architecture is persona-agnostic. The roadmap beyond Phase 3 includes farmers covered for rainfall deficit or excess, construction workers covered for heat and rain, auto-rickshaw drivers covered for curfew and flood, and street vendors covered for market closure and AQI events.

---

## Full Tech Stack

| Component | Technology |
|-----------|------------|
| Mobile and PWA | React Native Web and Expo |
| Web Admin Dashboard | React.js and Tailwind CSS |
| Maps and Zone Visualization | Mapbox GL JS (free tier) |
| Backend API | FastAPI (Python) |
| Authentication | Firebase Auth (OTP) |
| Primary Database | PostgreSQL with PostGIS for geospatial zone queries |
| Cache and Event Queue | Redis (Upstash free tier) |
| ML Risk and Pricing | XGBoost (Python / scikit-learn) |
| ML Fraud Detection | Isolation Forest (scikit-learn) |
| ML Forecasting | Prophet (Meta) |
| ML GigScore | Logistic Regression and rule engine |
| Weather Trigger | OpenWeatherMap API (free tier) |
| Heat Trigger | Open-Meteo API (free, no key required) |
| AQI Trigger | WAQI API (free tier) |
| Curfew Trigger | Mock civic alert JSON feed (simulated) |
| Outage Trigger | Simulated platform health API (mock) |
| Payments | Razorpay Test Mode transitioning to live UPI and Bank Transfer |
| Frontend Hosting | Vercel |
| Backend Hosting | Render (free tier) |
| Database Hosting | Supabase (free tier) |

---

## Business Viability

| Metric | Estimate |
|--------|----------|
| Total addressable riders (Zepto and Blinkit, top 10 cities) | approximately 3,00,000 |
| Year 1 target adoption | 50,000 riders |
| Average weekly premium | Rs.45 |
| Weekly premium pool | Rs.2.25 Crore per week |
| Target loss ratio | 45–55% (parametric, weather-driven, predictable) |
| Estimated net weekly margin | approximately Rs.11 Lakh per week |
| GigScore microloan TAM (Year 2) | Rs.500 Crore and above loan book potential |
| B2B platform licensing (Year 2) | Rs.2–5 Crore ARR from 3–5 platform partners |

---

## Team

| Name | Role | University | ID Number |
|------|------|------------|-----------|
| M Maruthi Sruthi | Team Lead | KL University | 2300031907 |
| K Vaishnavi | Team Member | KL University | 2300030318 |
| A Neeharika | Team Member | KL University | 2300030030 |

---



Built for Guidewire DEVTrails 2026 — Seed. Scale. Soar.
ZeroShield — Because every disrupted hour deserves a safety net.
=======
Attack Vector 	ZeroShield Counter
GPS spoofing app 	Mock location detection and altitude/interval fingerprinting
Coordinated Telegram ring 	Temporal clustering and social graph analysis
Approximate location faking 	500-meter geofence precision check
Working while claiming 	Cross-platform order activity check
Network drop false positive 	Weather-adjusted GPS tolerance and last-known-location fallback
Wrongful flag on honest worker 	4-hour appeal SLA, voice note, and Verified Honest badge
Layer 6 — Payout System
Channel 	Speed 	Used When
UPI 	Instant, under 1 minute 	Primary — most riders have UPI
Bank Transfer 	1–2 hours 	Fallback for riders without UPI

Powered by Razorpay Test Mode in Phases 1 and 2, moving to live Razorpay in Phase 3. Target: payout credited within 5 minutes of trigger fire.
Weekly Premium Model
Plan 	Premium 	Coverage Cap 	Payout Ratio 	Best For
Basic Shield 	Rs.19/week 	Rs.800/week 	60% 	Part-time riders under 4 hours per day
Standard Shield 	Rs.39/week 	Rs.1,800/week 	75% 	Full-time riders 6–10 hours per day
Premium Shield 	Rs.79/week 	Rs.3,500/week 	90% 	Power riders 10 or more hours in peak zones

Premium is recalculated every Sunday midnight by the Dynamic Pricing AI. GigScore discounts are applied automatically.
Unique Innovations Beyond the Brief

GigScore — Financial Identity for Gig Workers India's gig workers have no formal credit history. GigScore (300–900) is built from claim accuracy, platform tenure, and shift consistency. High-score riders receive premium discounts and access to microloans through partner NBFCs. This is the first financial identity product built exclusively for gig workers and is scalable beyond insurance into lending and other financial products.

Smart Advisor AI Every Sunday, each rider receives a personalized risk forecast for their zone with actionable shift timing advice. ZeroShield does not just protect income — it helps riders optimize it.

Health Alert System When AQI or heat crosses safety thresholds even below payout trigger levels, riders receive proactive health alerts. ZeroShield protects income and health simultaneously.

Emergency Feature A one-tap emergency button in the app sends the rider's GPS location to their emergency contacts and alerts them to the nearest safe zone. This is triggered automatically during extreme weather or curfew events.

Platform (B2B) Integration ZeroShield connects with Zepto and Blinkit as a platform-level benefit. Platforms can subsidize a portion of rider premiums as a retention tool. ZeroShield provides platforms with anonymized zone-level disruption analytics. The API-first design allows seamless integration into existing platform dashboards.

Future Expansion The parametric trigger architecture is persona-agnostic. The roadmap beyond Phase 3 includes farmers covered for rainfall deficit or excess, construction workers covered for heat and rain, auto-rickshaw drivers covered for curfew and flood, and street vendors covered for market closure and AQI events.
Full Tech Stack
Component 	Technology
Mobile and PWA 	React Native Web and Expo
Web Admin Dashboard 	React.js and Tailwind CSS
Maps and Zone Visualization 	Mapbox GL JS (free tier)
Backend API 	FastAPI (Python)
Authentication 	Firebase Auth (OTP)
Primary Database 	PostgreSQL with PostGIS for geospatial zone queries
Cache and Event Queue 	Redis (Upstash free tier)
ML Risk and Pricing 	XGBoost (Python / scikit-learn)
ML Fraud Detection 	Isolation Forest (scikit-learn)
ML Forecasting 	Prophet (Meta)
ML GigScore 	Logistic Regression and rule engine
Weather Trigger 	OpenWeatherMap API (free tier)
Heat Trigger 	Open-Meteo API (free, no key required)
AQI Trigger 	WAQI API (free tier)
Curfew Trigger 	Mock civic alert JSON feed (simulated)
Outage Trigger 	Simulated platform health API (mock)
Payments 	Razorpay Test Mode transitioning to live UPI and Bank Transfer
Frontend Hosting 	Vercel
Backend Hosting 	Render (free tier)
Database Hosting 	Supabase (free tier)
Business Viability
Metric 	Estimate
Total addressable riders (Zepto and Blinkit, top 10 cities) 	approximately 3,00,000
Year 1 target adoption 	50,000 riders
Average weekly premium 	Rs.45
Weekly premium pool 	Rs.2.25 Crore per week
Target loss ratio 	45–55% (parametric, weather-driven, predictable)
Estimated net weekly margin 	approximately Rs.11 Lakh per week
GigScore microloan TAM (Year 2) 	Rs.500 Crore and above loan book potential
B2B platform licensing (Year 2) 	Rs.2–5 Crore ARR from 3–5 platform partners
Team
Name 	Role 	University 	ID Number
M Maruthi Sruthi 	Team Lead 	KL University 	2300031907
K Vaishnavi 	Team Member 	KL University 	2300030318
A Neeharika 	Team Member 	KL University 	2300030030

Built for Guidewire DEVTrails 2026 — Seed. Scale. Soar. ZeroShield — Because every disrupted hour deserves a safety net.

