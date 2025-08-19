What I changed:
•  Template (custom_theme/main.html)
•  Added a fullscreen animated background layer: <div id="animated-bg"></div>.
•  Added a Party Mode button in the header (left of the theme toggle).
•  CSS (custom_theme/css/extra.css)
•  Animated gradient background (id=animated-bg) with gentle motion.
•  Stronger neon accents for code/pre blocks, glow effects, and brighter shadows.
•  Party Mode styles: rainbow animated look for page title.
•  New tiltable class and page enter transition classes.
•  Styles for the new party-toggle button.
•  Kept reduced-motion and responsive support.
•  JS (custom_theme/js/extra.js)
•  Party Mode state with localStorage, hotkey P, and Konami code to enable.
•  Confetti burst when enabling Party Mode.
•  Tilt hover effects on images, code blocks, and social links.
•  Page enter transition on load.
•  Wired the new party-toggle button.

How to preview locally:
•  Run: mkdocs serve
•  Open: http://127.0.0.1:8000
•  Try:
•  Press P to toggle Party Mode (or use the new party icon in the header).
•  Try Konami code: ↑ ↑ ↓ ↓ ← → ← → B A
•  Toggle light/dark with T or the sun/moon button.
•  Hover images, links, code blocks for tilts and glows.
•  Scroll to see progress bar and end message.

Want me to run the local server now to verify visually?
