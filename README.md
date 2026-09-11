# Wurzel

A mobile-first visual prototype for a positive personal climate coach. The app is built with Next.js, TypeScript, Tailwind CSS, and shadcn/ui.

## Run locally

```bash
npm install
npm run dev
```

Open the local URL shown by Next.js. The interface is intentionally constrained to a mobile app viewport.

## Prototype scope

- 14-step German climate check and estimated annual CO2e baseline
- Personal climate levers and transparent calculation assumptions
- Home dashboard, weekly activity, XP, levels, and recommendations
- Challenge catalogue, details, activation, and completion rewards
- Quick activity capture
- Regenerating alpine world
- Personal impact, annual goal, category progress, and history
- Eight interactive Climate Bites
- Local demo profile, preferences, data export, and reset

All user data is stored in browser local storage. No account, backend, analytics, or external integrations are used.

## Calculation model

The supplied calculation specification describes calculation principles but does not provide production emission-factor tables. This prototype therefore uses centralized, plausible demo factors and always presents CO2e values as estimated ranges. Quantified savings are compared with an explicit reference behavior; uncertain actions use qualitative impact levels instead of invented precision.
