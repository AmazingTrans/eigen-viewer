/*
 * ============================================================================
 *  Eigen Chat Viewer - Theme Definitions
 * ============================================================================
 *  Version     : 1.0.0
 *  Description : Color themes for ChatViewer.html. Kept separate so themes can
 *                be added or edited without touching the application code.
 *  Author      : Johnny Heng
 *  Authorship  : Created with AI assistance (GitHub Copilot CLI).
 *  License     : Open source, MIT License.
 *  Disclaimer  : PROVIDED "AS IS", WITHOUT WARRANTY. USE AT YOUR OWN RISK.
 *                No maintenance or support is provided.
 * ============================================================================
 *
 * To add a theme, copy an entry and change the values. Any variable you omit
 * falls back to the default (Eigen Dark) value defined in ChatViewer.html.
 *
 * Variables:
 *  bg, panel, border, text, muted, accent, gold (tool accent), code (code bg),
 *  user-bg, user-border (your messages), heading, btn (buttons), pre-text,
 *  rail (left guide lines), asst (assistant label),
 *  tk keyword, tc comment, ts string, tn number, tt type  (code highlighting)
 */
function T(id, name, group, v) {
  const vars = {};
  for (const k in v) vars["--" + k] = v[k];
  return { id, name, group, vars };
}

window.THEMES = [
  T("eigen-dark", "Eigen Dark (default)", "Default", {}),

  // Approximated from the Eigen app screenshot (eigenColor.png)
  T("eigen-color", "Eigen Color", "Default", {
    bg: "#12151c", panel: "#252938", border: "#323747", text: "#c6c9d2", muted: "#7b8190",
    accent: "#4da3ff", gold: "#d9a441", code: "#0a0c11", "user-bg": "#1a2030", "user-border": "#2c3650",
    heading: "#d3d6de", btn: "#1e2230", "pre-text": "#d4d7dd", rail: "#1f5a4f", asst: "#4fb6a0",
    tk: "#3f9bf0", tc: "#5a9f4f", ts: "#d1966b", tn: "#b5cea8", tt: "#7fc4f5"
  }),

  // ---- Popular VS Code themes ----
  T("dark-plus", "VS Code Dark+", "VS Code", {
    bg: "#1e1e1e", panel: "#252526", border: "#3c3c3c", text: "#d4d4d4", muted: "#858585",
    accent: "#3794ff", gold: "#dcdcaa", code: "#1e1e1e", "user-bg": "#04395e", "user-border": "#0e639c",
    heading: "#ffffff", btn: "#333333", "pre-text": "#d4d4d4", rail: "#007acc", asst: "#4ec9b0",
    tk: "#569cd6", tc: "#6a9955", ts: "#ce9178", tn: "#b5cea8", tt: "#4ec9b0"
  }),
  T("light-plus", "VS Code Light+", "VS Code", {
    bg: "#ffffff", panel: "#f3f3f3", border: "#d4d4d4", text: "#333333", muted: "#767676",
    accent: "#0066bf", gold: "#795e26", code: "#f8f8f8", "user-bg": "#e8f1fb", "user-border": "#b6d4f2",
    heading: "#000000", btn: "#ececec", "pre-text": "#000000", rail: "#a0a0a0", asst: "#267f99",
    tk: "#0000ff", tc: "#008000", ts: "#a31515", tn: "#098658", tt: "#267f99"
  }),
  T("monokai", "Monokai", "VS Code", {
    bg: "#272822", panel: "#1e1f1c", border: "#3e3d32", text: "#f8f8f2", muted: "#90908a",
    accent: "#66d9ef", gold: "#e6db74", code: "#1e1f1c", "user-bg": "#3e3d32", "user-border": "#75715e",
    heading: "#f8f8f2", btn: "#3e3d32", "pre-text": "#f8f8f2", rail: "#75715e", asst: "#a6e22e",
    tk: "#f92672", tc: "#75715e", ts: "#e6db74", tn: "#ae81ff", tt: "#66d9ef"
  }),
  T("dracula", "Dracula", "VS Code", {
    bg: "#282a36", panel: "#21222c", border: "#44475a", text: "#f8f8f2", muted: "#6272a4",
    accent: "#8be9fd", gold: "#f1fa8c", code: "#1e1f29", "user-bg": "#343746", "user-border": "#6272a4",
    heading: "#f8f8f2", btn: "#343746", "pre-text": "#f8f8f2", rail: "#6272a4", asst: "#50fa7b",
    tk: "#ff79c6", tc: "#6272a4", ts: "#f1fa8c", tn: "#bd93f9", tt: "#8be9fd"
  }),
  T("one-dark", "One Dark Pro", "VS Code", {
    bg: "#282c34", panel: "#21252b", border: "#3b4048", text: "#abb2bf", muted: "#7f848e",
    accent: "#61afef", gold: "#e5c07b", code: "#21252b", "user-bg": "#2c313c", "user-border": "#3e4451",
    heading: "#e6e6e6", btn: "#2c313a", "pre-text": "#abb2bf", rail: "#4b5263", asst: "#98c379",
    tk: "#c678dd", tc: "#5c6370", ts: "#98c379", tn: "#d19a66", tt: "#e5c07b"
  }),
  T("github-dark", "GitHub Dark", "VS Code", {
    bg: "#0d1117", panel: "#161b22", border: "#30363d", text: "#c9d1d9", muted: "#8b949e",
    accent: "#58a6ff", gold: "#d29922", code: "#010409", "user-bg": "#122033", "user-border": "#1f4a7a",
    heading: "#f0f6fc", btn: "#21262d", "pre-text": "#c9d1d9", rail: "#30363d", asst: "#3fb950",
    tk: "#ff7b72", tc: "#8b949e", ts: "#a5d6ff", tn: "#79c0ff", tt: "#ffa657"
  }),
  T("github-light", "GitHub Light", "VS Code", {
    bg: "#ffffff", panel: "#f6f8fa", border: "#d0d7de", text: "#24292f", muted: "#6e7781",
    accent: "#0969da", gold: "#9a6700", code: "#f6f8fa", "user-bg": "#ddf4ff", "user-border": "#a5d6ff",
    heading: "#1f2328", btn: "#f3f4f6", "pre-text": "#24292f", rail: "#d0d7de", asst: "#1a7f37",
    tk: "#cf222e", tc: "#6e7781", ts: "#0a3069", tn: "#0550ae", tt: "#953800"
  }),
  T("solarized-dark", "Solarized Dark", "VS Code", {
    bg: "#002b36", panel: "#073642", border: "#0e4a58", text: "#93a1a1", muted: "#657b83",
    accent: "#268bd2", gold: "#b58900", code: "#00232c", "user-bg": "#06404e", "user-border": "#1b6a7d",
    heading: "#eee8d5", btn: "#0a4150", "pre-text": "#93a1a1", rail: "#586e75", asst: "#859900",
    tk: "#859900", tc: "#586e75", ts: "#2aa198", tn: "#d33682", tt: "#b58900"
  }),
  T("solarized-light", "Solarized Light", "VS Code", {
    bg: "#fdf6e3", panel: "#eee8d5", border: "#d8d0b8", text: "#586e75", muted: "#93a1a1",
    accent: "#268bd2", gold: "#b58900", code: "#f5eed8", "user-bg": "#e4eef0", "user-border": "#b6cfd3",
    heading: "#073642", btn: "#e8e1ca", "pre-text": "#586e75", rail: "#b8b098", asst: "#859900",
    tk: "#859900", tc: "#93a1a1", ts: "#2aa198", tn: "#d33682", tt: "#b58900"
  }),
  T("nord", "Nord", "VS Code", {
    bg: "#2e3440", panel: "#3b4252", border: "#4c566a", text: "#d8dee9", muted: "#8f9bb3",
    accent: "#88c0d0", gold: "#ebcb8b", code: "#272c36", "user-bg": "#36415a", "user-border": "#5e81ac",
    heading: "#eceff4", btn: "#434c5e", "pre-text": "#d8dee9", rail: "#4c566a", asst: "#a3be8c",
    tk: "#81a1c1", tc: "#616e88", ts: "#a3be8c", tn: "#b48ead", tt: "#8fbcbb"
  }),
  T("tokyo-night", "Tokyo Night", "VS Code", {
    bg: "#1a1b26", panel: "#16161e", border: "#2f334d", text: "#a9b1d6", muted: "#565f89",
    accent: "#7aa2f7", gold: "#e0af68", code: "#14141b", "user-bg": "#24283b", "user-border": "#3d59a1",
    heading: "#c0caf5", btn: "#292e42", "pre-text": "#a9b1d6", rail: "#3b4261", asst: "#9ece6a",
    tk: "#bb9af7", tc: "#565f89", ts: "#9ece6a", tn: "#ff9e64", tt: "#2ac3de"
  }),
  T("night-owl", "Night Owl", "VS Code", {
    bg: "#011627", panel: "#01111d", border: "#122d42", text: "#d6deeb", muted: "#637777",
    accent: "#82aaff", gold: "#ecc48d", code: "#010e1a", "user-bg": "#0b2942", "user-border": "#234d70",
    heading: "#ffffff", btn: "#0b2942", "pre-text": "#d6deeb", rail: "#5f7e97", asst: "#addb67",
    tk: "#c792ea", tc: "#637777", ts: "#ecc48d", tn: "#f78c6c", tt: "#ffcb8b"
  }),

  // ---- Cute & playful ----
  T("bubblegum", "Bubblegum Pop", "Cute", {
    bg: "#fff0f7", panel: "#ffe0ef", border: "#ffb6d5", text: "#5a2a45", muted: "#b0719a",
    accent: "#ff4fa3", gold: "#e67e22", code: "#fff8fc", "user-bg": "#ffd6ea", "user-border": "#ff9ccb",
    heading: "#b0126b", btn: "#ffd0e6", "pre-text": "#4a2a3d", rail: "#ff9ccb", asst: "#12a89a",
    tk: "#d6249f", tc: "#a68aa0", ts: "#e0603a", tn: "#7b4fd6", tt: "#12a89a"
  }),
  T("cotton-candy", "Cotton Candy", "Cute", {
    bg: "#f1f7ff", panel: "#e4eeff", border: "#c9d9ff", text: "#3b3f6b", muted: "#8a90c0",
    accent: "#8a7bff", gold: "#f29ac2", code: "#faf8ff", "user-bg": "#e9e2ff", "user-border": "#c5b8ff",
    heading: "#5a45c9", btn: "#e0e6ff", "pre-text": "#3b3f6b", rail: "#c5b8ff", asst: "#35b6a2",
    tk: "#8a5cf5", tc: "#a0a6d0", ts: "#e8689f", tn: "#2f8fe0", tt: "#35b6a2"
  }),
  T("matcha", "Matcha Latte", "Cute", {
    bg: "#f3f6e8", panel: "#e6edd2", border: "#cbd8a8", text: "#3f4a2c", muted: "#8a9a66",
    accent: "#6a9e2f", gold: "#b8862b", code: "#fafcf2", "user-bg": "#dfe9c2", "user-border": "#b4c985",
    heading: "#2f3d17", btn: "#dde7c0", "pre-text": "#33401f", rail: "#b4c985", asst: "#3b8f5c",
    tk: "#2f7d32", tc: "#95a37a", ts: "#b0553a", tn: "#8a5aa8", tt: "#2a7f8e"
  }),
  T("sunset-peach", "Peachy Sunset", "Cute", {
    bg: "#2b1a2f", panel: "#38223c", border: "#5a3560", text: "#ffe3d3", muted: "#c79aa8",
    accent: "#ff9a76", gold: "#ffd166", code: "#241528", "user-bg": "#4a2a52", "user-border": "#8a4f8f",
    heading: "#fff1e8", btn: "#472a4c", "pre-text": "#ffe3d3", rail: "#8a4f8f", asst: "#7fe0b8",
    tk: "#ff7eb6", tc: "#a982a0", ts: "#ffd166", tn: "#b69cff", tt: "#7fe0b8"
  }),
  T("midnight-kitty", "Midnight Kitty", "Cute", {
    bg: "#1b1624", panel: "#251d33", border: "#41335a", text: "#e8dff5", muted: "#9c8fb5",
    accent: "#ffb3d9", gold: "#ffe08a", code: "#15111d", "user-bg": "#34264b", "user-border": "#6a4f9a",
    heading: "#fff0fa", btn: "#2f2542", "pre-text": "#e8dff5", rail: "#6a4f9a", asst: "#a8f0d0",
    tk: "#ff8fc7", tc: "#7f7299", ts: "#ffe08a", tn: "#9ad1ff", tt: "#a8f0d0"
  }),
  T("ocean-puffin", "Ocean Puffin", "Cute", {
    bg: "#0f2a3a", panel: "#143648", border: "#235069", text: "#dff3fb", muted: "#7fb0c6",
    accent: "#ffb347", gold: "#ffcf70", code: "#0b2230", "user-bg": "#1b4a63", "user-border": "#2f7ea3",
    heading: "#ffffff", btn: "#194257", "pre-text": "#dff3fb", rail: "#2f7ea3", asst: "#6ee7c8",
    tk: "#ff8a65", tc: "#6f9db3", ts: "#ffcf70", tn: "#c3a6ff", tt: "#6ee7c8"
  }),
  T("lavender-dream", "Lavender Dream", "Cute", {
    bg: "#f6f1ff", panel: "#ebe2ff", border: "#d6c6ff", text: "#43345f", muted: "#9784bf",
    accent: "#9b6dff", gold: "#d98a2b", code: "#fcfaff", "user-bg": "#e5d9ff", "user-border": "#c2a8ff",
    heading: "#5a2fc2", btn: "#e3d7ff", "pre-text": "#43345f", rail: "#c2a8ff", asst: "#1fa39a",
    tk: "#8a3ffc", tc: "#a799c7", ts: "#d6457a", tn: "#2a7de1", tt: "#1fa39a"
  })
];
