# Eigen Chat Viewer

A zero-dependency, offline HTML viewer for chat sessions exported as `.txt` from **Eigen Engineering Agent**. It turns the flat export into a readable conversation: rendered Markdown, syntax-highlighted SCL code blocks with a Copy button, collapsible tool activity, and selectable themes.

> **Disclaimer:** Created with AI assistance (GitHub Copilot CLI) by Johnny Heng. Provided "as is", **use at your own risk**, with **no maintenance or support**. Licensed under MIT (see [LICENSE](LICENSE)).

## Features

- Drag-and-drop or file-picker loading; everything is processed locally in the browser (no network, no uploads).
- Session header (project, path, version, export time) shown as a metadata card.
- User messages and assistant replies shown as distinct blocks.
- Assistant Markdown rendering: headings, bold/italic, inline code, lists, tables, blockquotes, links, horizontal rules.
- Fenced code blocks with SCL/ST highlighting and one-click copy.
- Tool calls/results nested under the assistant turn that issued them, collapsed by default (JSON inputs pretty-printed, very large results truncated at 200,000 characters).
- 20 themes (VS Code classics and cute ones, plus "Eigen Color" matching the Eigen app). The selection is remembered in `localStorage`. Default is the Eigen-like dark theme.

## Repository layout

```
eigen-chat-viewer/
├── src/
│   ├── ChatViewer.html        # Application: markup, CSS, parser, renderer (multi-file version)
│   └── themes.js              # Theme definitions (window.THEMES)
├── dist/
│   └── ChatViewer_Single.html # Generated: themes.js inlined, one shareable file
├── scripts/
│   └── build-single.ps1       # Builds dist/ from src/
├── .gitlab-ci.yml             # Optional: publish dist/ via GitLab Pages
├── CHANGELOG.md
├── LICENSE
└── README.md
```

`dist/ChatViewer_Single.html` is committed so people can download it directly. Rebuild it whenever `src/` changes.

## Usage

1. Open `dist/ChatViewer_Single.html` (or `src/ChatViewer.html`, which needs `themes.js` beside it) in a modern browser (Chrome, Edge, Firefox).
2. Drop an exported `.txt` file onto the page, or click **Open .txt**.
3. Controls in the top bar:
   | Control | Action |
   |---|---|
   | Theme dropdown | Switch theme (persisted) |
   | Tool activity checkbox | Show/hide all tool activity |
   | Show tools / Hide tools | Open/close the tool section of every assistant turn |
   | Expand tools / Collapse tools | Open/close every tool group and individual call/result |
   | Open .txt | Load another file |

   Click an assistant turn's header line to toggle that turn's tool section. Assistant reply text is never collapsed.

> **Privacy:** exports can contain project paths, source code and customer data. The viewer never transmits them, but do not commit exports to the repo (`.gitignore` excludes `*.txt` and `exports/`).

## Building the single-file version

```powershell
pwsh ./scripts/build-single.ps1     # or: powershell -File .\scripts\build-single.ps1
```

The script replaces the `<script src="themes.js"></script>` placeholder in `src/ChatViewer.html` with the inlined contents of `src/themes.js` and writes `dist/ChatViewer_Single.html`. Do not edit the `dist/` file by hand.

## How it works

All logic lives in one IIFE inside `src/ChatViewer.html`.

### 1. Export format and parser (`parse`)

An export looks like:

```
====...
Chat Session: <title>
Session ID: ...
Exported: ...
Application Version: ...
====...
Project: ...
Project Path: ...
Project Type: ...
----...
Messages:
----...
[YYYY-MM-DD HH:MM:SS] User:
<text>

[YYYY-MM-DD HH:MM:SS] Assistant:
<markdown>

[YYYY-MM-DD HH:MM:SS] Tool Call: <tool_name>
Input: {json}

[YYYY-MM-DD HH:MM:SS] Tool Result: <tool_name>
<output>
```

- Header `Key: Value` lines before `Messages:` become the metadata card.
- A message starts on any line matching `^\[timestamp\] (User|Assistant|Tool Call|Tool Result)(: name)?$` (`HDR` regex); following lines belong to it until the next header. Bodies are trimmed.
- A UTF-8 BOM and CRLF line endings are normalised.

### 2. Grouping (`render`)

Consecutive non-user messages (Assistant, Tool Call, Tool Result) are grouped into one assistant turn. Within it, assistant text is rendered in order, and each run of tool messages becomes a `<details class="toolgroup">` containing one `<details class="tool">` per call/result. Tool bodies are created lazily on first open to keep large exports fast. Empty assistant messages are skipped.

### 3. Markdown (`markdown`, `inline`)

A small purpose-built, line-based renderer (no libraries): fenced code, headings, rules, blockquotes (recursive), tables, nested ordered/unordered lists, and paragraphs. Inline handling extracts code spans first, HTML-escapes everything, then applies links (`http/https` only), bold, italic and strikethrough. All text is escaped before HTML is built, so exported content cannot inject markup. It is intentionally not a full CommonMark implementation.

### 4. Syntax highlighting (`highlight`)

One combined regular expression tokenises comments, strings, numbers, SCL keywords and data types for `scl`/`st`/untagged blocks; other languages are shown unhighlighted. Token classes `.k .c .s .n .t` are coloured by theme variables.

### 5. Themes

Colours are CSS custom properties on `:root` (defaults = the built-in dark theme). `src/themes.js` defines `window.THEMES`, an array of `{ id, name, group, vars }`. Selecting a theme sets the variables on `document.documentElement` and clears any set by the previous theme; omitted variables fall back to the defaults. If `themes.js` is missing, only the default theme is available.

**Add a theme:** copy an entry in `src/themes.js`, give it a unique `id`, adjust the colours, then rebuild. Variables:

| Variable | Purpose |
|---|---|
| `bg`, `panel`, `border`, `text`, `muted` | Base surfaces and text |
| `accent`, `gold` | Links/highlights, tool-activity accent |
| `code`, `pre-text` | Code block background and text |
| `user-bg`, `user-border` | User message box |
| `heading`, `btn`, `rail`, `asst` | Headings, buttons, guide lines, assistant label |
| `tk`, `tc`, `ts`, `tn`, `tt` | Code: keyword, comment, string, number, type |

## Limitations

- Built against the export layout of Eigen Engineering Agent 1.5.x; format changes may break parsing.
- Markdown support is partial (no images, nested blockquote/list edge cases, HTML passthrough).
- Whole file is read into memory; very large exports (hundreds of MB) may be slow.
- Not tested across all browsers; no automated tests.

## Publishing on GitLab

1. Create an empty project on GitLab, then from this folder:
   ```bash
   git init -b main
   git add .
   git commit -m "Initial release 1.0.0"
   git remote add origin <your-gitlab-url>
   git push -u origin main
   ```
2. Optional: `.gitlab-ci.yml` publishes `dist/ChatViewer_Single.html` as `index.html` with GitLab Pages (enable Pages in the project settings).
3. Tag releases (`git tag v1.0.0`) and attach `dist/ChatViewer_Single.html` to the GitLab Release.

## License

MIT © 2026 Johnny Heng. See [LICENSE](LICENSE).
