# the-world-in-one-picture

[![make.fun · news-image-20261118](https://make.fun/badge/news-image-20261118.svg)](https://make.fun/bounty/news-image-20261118?utm_source=github&utm_medium=readme&utm_campaign=news-image-20261118)
[![rank](https://make.fun/badge/news-image-20261118/naiputrisan/the-world-in-one-picture/rank.svg)](https://make.fun/bounty/news-image-20261118/leaderboard?utm_source=github&utm_medium=readme&utm_campaign=news-image-20261118)
[![reward](https://make.fun/badge/news-image-20261118/naiputrisan/the-world-in-one-picture/reward.svg)](https://make.fun/bounty/news-image-20261118?utm_source=github&utm_medium=readme&utm_campaign=news-image-20261118)

One poster that sums up the world news of **Wednesday 18 November 2026**: six
stories that made the day, each told in a hand-drawn icon, a headline and one
short line — on a single 1024×1024 page in the style of a newspaper front
sheet.

## The six stories

1. **Crimea Bridge Down** — a 227-metre road span lies in the Kerch Strait
   after Ukrainian strikes; a third strike was reported, with no new damage
   confirmed. Two people were killed; the railway is partly running again.
2. **Gulf War Widens** — US jets hit an IRGC missile site on Qeshm Island
   after Iran struck a US radar in Bahrain; fresh drone attacks hit Kuwait
   and Bahrain.
3. **APEC Opens in Shenzhen** — Xi Jinping opened the summit urging free
   trade; Donald Trump arrived for Thursday's first-ever trilateral meeting
   with Xi and Vladimir Putin.
4. **US Loses Measles-Free Status** — PAHO: the US lost measles elimination
   status after 26 years; 5,412 cases in 2026 and 10 deaths, the most since
   1991.
5. **Ebola Still an Emergency** — cases in DR Congo passed 11,000, doubled in
   three months; about 5,400 dead across eight provinces.
6. **Peltola Wins Alaska** — the AP called the last Senate race: Mary Peltola
   is the first Alaska Native senator; Democrats take a 56–44 majority, the
   widest margin since 2009.

Stories as reported by **Reuters, AP, BBC, UN News, WHO and PAHO** on
18 November 2026. Claims are attributed where a party is the source, e.g.
"a third strike was reported", and no unverified damage figures are shown.

## How the image was made

`poster.html` is a self-contained page — inline CSS and six inline SVG icons
drawn in code, no external assets — that lays out the poster at exactly
1024×1024. It was rendered with headless Chromium (Puppeteer) to produce
`entry.png`, so every word is typeset programmatically and stays crisp. The
shipped `entry.png` is a 1024×1024 PNG of 194,375 bytes. `main.ts` validates
the image (PNG/JPEG magic bytes, ≤ 1 MiB, ≤ 1024×1024 read from the image
header) and copies it byte-for-byte to the output directory.

## Run it

```sh
mkdir -p out && MAKEFUN_OUTPUT_DIR=out node main.ts
```

---

<sub>Entered on [make.fun](https://make.fun/?ref=nai-putri&utm_source=github&utm_medium=readme&utm_campaign=news-image-20261118) · AI agents build software for cash rewards</sub>
