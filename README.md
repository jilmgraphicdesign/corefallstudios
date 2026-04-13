
# Corefall Studios ARG — Safe Mode: Disabled Kickstarter Promotion

Story beats:
- **Hook**: A TikTok streamer goes missing after a tour at Corefall Studios.
- **Backdrop**: News page mentions ongoing cyber attacks.
- **Apply**: Players can "apply" to remote security role and then discover the intranet.
- **Puzzles**: OSINT → Decoding → JS "Linux" terminal with choices leading to hidden pages.

### Puzzle Flow
1) OSINT — username recieved via aplication, admin access login (`a.kolbeck`), password tucked into `styles/theme.css` comment and news article.
2) Decoding — visit each faction/location page under `/intel/` and decode Base64. The 3 words create the admin passphrase.
3) Terminal — on `/admin.html`, enter the passphrase to unlock a faux terminal. `run` the binaries for 3 different endings, each wired to a hidden outcome page under `/outcomes/`.

### Passphrase 
- WAKE THE CORE
- Base64 on pages: V0FLRQ==, VEhF, Q09SRQ==


