param(
  [int]$Port = 8080,
  [switch]$NoBrowser
)

$root = Split-Path -Parent $MyInvocation.MyCommand.Path
$listener = New-Object System.Net.HttpListener
$listener.Prefixes.Add("http://localhost:$Port/")

try {
  $listener.Start()
} catch {
  Write-Host "Gagal membuka port $Port. Mungkin sudah dipakai proses lain." -ForegroundColor Red
  Write-Host "Coba jalankan: .\serve.ps1 -Port 8090"
  exit 1
}

Write-Host ""
Write-Host "  Undangan Natal K3R Raanan Baru" -ForegroundColor Yellow
Write-Host "  Berjalan di http://localhost:$Port/" -ForegroundColor Green
Write-Host "  Folder: $root"
Write-Host "  Tekan Ctrl+C untuk berhenti."
Write-Host ""

if (-not $NoBrowser) {
  Start-Process "http://localhost:$Port/"
}

$mimeMap = @{
  ".html" = "text/html; charset=utf-8"
  ".css"  = "text/css; charset=utf-8"
  ".js"   = "application/javascript; charset=utf-8"
  ".json" = "application/json; charset=utf-8"
  ".png"  = "image/png"
  ".jpg"  = "image/jpeg"
  ".jpeg" = "image/jpeg"
  ".svg"  = "image/svg+xml"
  ".ico"  = "image/x-icon"
  ".woff2" = "font/woff2"
  ".mp3" = "audio/mpeg"
}

while ($listener.IsListening) {
  try {
    $ctx = $listener.GetContext()
    $req = $ctx.Request
    $res = $ctx.Response

    $path = $req.Url.LocalPath
    if ($path -eq "/") { $path = "/index.html" }

    $relative = $path.TrimStart("/")
    $file = Join-Path $root $relative

    # cegah akses keluar folder
    $fullRoot = [IO.Path]::GetFullPath($root)
    $fullFile = [IO.Path]::GetFullPath($file)
    if (-not $fullFile.StartsWith($fullRoot, [StringComparison]::OrdinalIgnoreCase)) {
      $res.StatusCode = 403
      $res.Close()
      continue
    }

    if (Test-Path $fullFile -PathType Leaf) {
      $ext = [IO.Path]::GetExtension($fullFile).ToLower()
      $mime = $mimeMap[$ext]
      if (-not $mime) { $mime = "application/octet-stream" }

      $bytes = [IO.File]::ReadAllBytes($fullFile)
      $res.ContentType = $mime
      $res.ContentLength64 = $bytes.Length
      $res.Headers.Add("Cache-Control", "no-store")
      $res.OutputStream.Write($bytes, 0, $bytes.Length)
    } else {
      $res.StatusCode = 404
      $body = [Text.Encoding]::UTF8.GetBytes("404 - File tidak ditemukan")
      $res.ContentType = "text/plain; charset=utf-8"
      $res.OutputStream.Write($body, 0, $body.Length)
    }
    $res.OutputStream.Close()
  } catch {
    # listener dihentikan atau koneksi diputus
    if ($listener.IsListening) {
      Write-Host "Request error: $_" -ForegroundColor DarkYellow
    }
  }
}
