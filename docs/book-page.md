# Hideghívásból ügyfél

- Public book collection: `/konyvek`.
- Individual book page: `/konyvek/hideghivasbol-ugyfel`.
- The home-page menu and shared footer link to the collection.
- Each title has its own cover, presentation, sample, price and purchase status.
  Add future titles to `bookCatalog` in `app/components/bookDetails.ts`.
- The previous `/penzugy/hideghivasbol-ugyfel` route redirects to the book page.
- The free sample contains source PDF pages 1–11 and 159, as 12 WebP images.
- The complete paid PDF and its full flipbook must not be uploaded to `public`.
- Source: the author's approved V31 e-book, ISBN 9786150264547.

## Purchase activation

The price is 4,999 HUF. The checkout belongs to Google Play Books:
`https://play.google.com/store/books/details?id=X7gWEgAAQBAJ&hl=hu&gl=HU`.

The page currently says that purchase is coming soon. No purchase link or
in-stock structured offer is rendered by default. Once the actual Google Play
listing shows the correct title, author and a purchase option for Hungary,
set `NEXT_PUBLIC_BOOK_GOOGLE_PLAY_AVAILABLE=true` in Vercel and redeploy.
The individual book page and collection status then change together.

The image reader avoids selectable book text and offers no full-book download.
It does not prevent screenshots or downloading publicly served sample images.
The full book remains with Google Play.

## Local checks

Run `npm ci`, `npm run build`, then `npm run start`.
Check the home-page Books link, collection card, all 12 sample pages, page boundaries,
the selector, keyboard arrows, zoom and mobile layout.
Also check that the default page has no enabled purchase link or in-stock offer.

## Validation recorded on 2026-10-07

- TypeScript and the production build passed. Local placeholder email and
  Supabase values were supplied because this checkout has no production secrets.
  Production configuration was not modified.
- The generated HTML has the correct title, author, ISBN, 4,999 HUF price
  and 12 sample options. It has no enabled purchase link or offer.
- The separate `/konyvek` collection, individual book link, return navigation
  and the home-page Books menu were checked in the production HTML.
- The standalone HTML reader passed navigation, boundary, selector, keyboard,
  swipe, zoom and scroll-reset checks.
- All 12 PDF sample pages were rendered and visually reviewed, including both
  covers. The complete source PDF remained unchanged.
- A live browser check of the deployed website is still required after deployment.
  This environment cannot open local preview files in its cloud browser.
