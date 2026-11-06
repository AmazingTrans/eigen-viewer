# Contributor & AI Agent Guide

Instructions for humans and AI assistants making changes to **Eigen Chat Viewer**. Read this before editing. For what the app does and how it works, see [README.md](README.md).

## Golden rules

1. **Edit only `src/`** (`src/ChatViewer.html`, `src/themes.js`).
2. **Never hand-edit generated files:** `dist/ChatViewer_Single.html` and `docs/index.html`. They are overwritten by the build script.
3. **Always rebuild after changing `src/`** and commit the regenerated files together with the source change.
4. **Never commit chat exports** (`*.txt`, `exports/`). They contain project paths, source code and possibly customer data. `.gitignore` blocks them; do not override it.
5. **No external dependencies, CDNs, network calls or telemetry.** The app must stay a static, offline, zero-dependency page.
6. **Escape all exported text before inserting it as HTML** (`esc()` / `textContent`). Never use unescaped `innerHTML` with chat content.
7. **Keep the file header** (version, author, MIT licence, disclaimer) at the top of `ChatViewer.html` and `themes.js`. Update the version when releasing.
8. **Do not force-push** unless the owner explicitly asks.

## Repository map

| Path | Purpose | Edit by hand? |
|---|---|---|
| `src/ChatViewer.html` | App: markup, CSS, parser, renderer. Contains the placeholder `<script src="themes.js"></script>` that the build replaces. **Do not remove or reformat that line.** | Yes |
| `src/themes.js` | Theme definitions (`window.THEMES`) | Yes |
| `scripts/build-single.ps1` | Inlines themes into one file; writes `dist/` and `docs/` | Yes |
| `dist/ChatViewer_Single.html` | Generated single-file build for download | **No** |
| `docs/index.html` | Generated copy served by GitHub Pages | **No** |
| `.gitlab-ci.yml` | GitLab Pages job: publishes `docs/index.html` | Rarely |
| `CHANGELOG.md`, `README.md` | Documentation | Yes |

## Making a change

1. Make sure you are on `main` and up to date: `git pull --rebase origin main`.
2. Edit files in `src/` (see the recipes below).
3. Rebuild:
   ```powershell
   .\scripts\build-single.ps1
   ```
4. Verify (see "Verification"). Open `docs/index.html` in a browser and load a real export.
5. Update `CHANGELOG.md` (and the version in the headers for a release). Update `README.md` if behaviour, controls or the theme count changed.
6. Commit and push to **both** remotes (see "Publishing").

### Recipes

**Add a theme**
- Copy an entry in `src/themes.js`, give it a unique `id`, change the colours. Omitted variables fall back to the defaults in `ChatViewer.html`.
- Variables are listed in the README ("Themes"). Update the theme count in `README.md` and `CHANGELOG.md`.

**Change parsing / the export format**
- Edit `HDR` and `parse()` in `ChatViewer.html`. Test with the sample exports in several shapes: empty assistant messages, a tool-only turn, very large tool results, CRLF/BOM files.

**Change Markdown rendering**
- Edit `markdown()` / `inline()`. Keep it small and dependency-free; text must be escaped before HTML is built.

**Change layout/colours of the app**
- Use the CSS variables on `:root` instead of hard-coded colours, so every theme keeps working.

## Verification

There are no automated tests. Before committing, at minimum:

```powershell
# Syntax-check the built page's scripts and the themes file
node --check src\themes.js
$h = Get-Content dist\ChatViewer_Single.html -Raw
$i = 0
[regex]::Matches($h,'(?s)<script>(.*?)</script>') | ForEach-Object {
  $f = "$env:TEMP\chk$i.js"; [IO.File]::WriteAllText($f, $_.Groups[1].Value)
  node --check $f; "script $i exit $LASTEXITCODE"; Remove-Item $f; $i++
}
```

Then open `docs/index.html` in a browser and check: a real export loads (drag and drop and **Open .txt**), assistant text is visible, tool groups open and close, code blocks highlight and copy, and the theme dropdown works (including the default).

## Publishing

Remotes:

| Name | URL | Purpose |
|---|---|---|
| `origin` | `git@code.siemens.com:johnny.heng/eigenviewer.git` | Internal GitLab; Pages job shares the viewer internally |
| `github` | `git@github.com:AmazingTrans/eigen-viewer.git` | Public GitHub; Pages serves `/docs` on `main` |

Branch: `main` on both.

```powershell
git add -A
git status --short           # confirm no .txt exports or unexpected files
git commit -m "Short, imperative summary of the change"
git push origin main         # GitLab: runs the Pages pipeline
git push github main         # GitHub: Pages updates in a minute or two
```

- If a push is rejected with "fetch first", run `git pull --rebase <remote> main`, resolve conflicts, rebuild if `src/` changed, then push again.
- GitLab: check **Build → Pipelines** for a green `pages` job; the site address is under **Deploy → Pages**.
- GitHub: the site is `https://amazingtrans.github.io/eigen-viewer/` (Settings → Pages: branch `main`, folder `/docs`).
- Tag releases: `git tag v1.0.1` then `git push origin v1.0.1` and `git push github v1.0.1`.

## Notes for AI assistants

- You usually cannot push: pushes use the owner's SSH key (and passphrase). Prepare the commit, then give the owner the exact commands above to run. **Never ask for, paste, or store private keys, passphrases or tokens.**
- Do not run destructive git commands (`push --force`, `reset --hard`, branch deletion) without explicit owner approval.
- Keep changes surgical and in the existing style (single IIFE, CSS variables for colours, no libraries). Do not reformat unrelated code.
- If you add a commit trailer, use the project's existing convention in `git log`.
- Always finish with: rebuild, syntax check, and a summary telling the owner which files changed and which push commands to run.
