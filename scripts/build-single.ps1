<#
.SYNOPSIS
  Builds dist/ChatViewer_Single.html by inlining src/themes.js into src/ChatViewer.html.
.EXAMPLE
  pwsh ./scripts/build-single.ps1
#>
$ErrorActionPreference = 'Stop'
$root = Split-Path -Parent $PSScriptRoot
$html = [IO.File]::ReadAllText((Join-Path $root 'src/ChatViewer.html'))
$themes = [IO.File]::ReadAllText((Join-Path $root 'src/themes.js'))

$tag = '<script src="themes.js"></script>'
if (-not $html.Contains($tag)) { throw "Placeholder '$tag' not found in src/ChatViewer.html" }

$out = $html.Replace($tag, "<script>`n" + $themes.Trim() + "`n</script>")
$dist = Join-Path $root 'dist'
New-Item -ItemType Directory -Force $dist | Out-Null
$target = Join-Path $dist 'ChatViewer_Single.html'
[IO.File]::WriteAllText($target, $out, (New-Object Text.UTF8Encoding $false))
Write-Host "Built $target"
