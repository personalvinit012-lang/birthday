# Birthday Wonderland 🎂

A romantic, responsive birthday surprise built with Next.js App Router, React, TypeScript, Motion, and CSS-drawn interactive scenes. No personal photos are required.

## Run locally

1. Install Node.js 20.9+.
2. Extract this project and open the folder in your terminal.
3. Run `npm install`.
4. Run `npm run dev`.
5. Open http://localhost:3000.

## Personalize it

Edit `src/data/birthday.ts` to change the recipient, letter, greeting, and closing message. The memories gallery uses decorative illustrations and quotes, so it works without photos.

## Experience flow

Welcome → animated letter → quote/memory cards → interactive cake and candles → gift reveal → confetti finale.

## Notes

- Music button is a UI toggle in this starter; connect a licensed audio file and an HTML audio element if you want actual playback.
- The cake and gift use CSS 3D-style interactions. Three.js and React Three Fiber are installed for a future true 3D model/scene upgrade.
- Confetti is triggered by the cake, gift, and finale interactions.
- Responsive styling and reduced-motion preferences are included.
