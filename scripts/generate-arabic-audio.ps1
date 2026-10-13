# Generate authored Arabic recordings with the installed Microsoft Hoda voice.
# No registry changes, cloud requests, audio playback or visible windows.
$ErrorActionPreference = 'Stop'
$taskRoot = (Resolve-Path (Join-Path $PSScriptRoot '..')).Path
python (Join-Path $PSScriptRoot 'arabic-audio-inventory.py') prepare
if ($LASTEXITCODE -ne 0) { throw 'Inventory preparation failed' }
$taskCache = Join-Path $taskRoot '.venv/ar-hoda-cache'
$taskRequests = Get-Content -LiteralPath (Join-Path $taskCache 'requests.json') -Raw -Encoding UTF8 | ConvertFrom-Json
Add-Type -AssemblyName System.Speech
$taskSynth = New-Object System.Speech.Synthesis.SpeechSynthesizer
try {
    $taskSynth.SelectVoice('Microsoft Hoda')
    if ($taskSynth.Voice.Culture.TwoLetterISOLanguageName -ne 'ar') { throw 'Selected voice is not Arabic' }
    $taskSynth.Rate = 0
    $taskSynth.Volume = 100
    $taskDone = 0
    foreach ($taskRequest in $taskRequests) {
        $taskWav = Join-Path $taskCache ($taskRequest.fingerprint + '.wav')
        $taskMp3 = Join-Path $taskCache ($taskRequest.fingerprint + '.mp3')
        if (-not (Test-Path -LiteralPath $taskMp3)) {
            $taskSynth.SetOutputToWaveFile($taskWav)
            $taskSynth.Speak([string]$taskRequest.say)
            $taskSynth.SetOutputToNull()
            & ffmpeg -hide_banner -loglevel error -y -i $taskWav -ar 22050 -ac 1 -c:a libmp3lame -b:a 48k $taskMp3
            if ($LASTEXITCODE -ne 0) { throw 'MP3 encoding failed' }
        }
        $taskDone++
        if ($taskDone % 25 -eq 0) { Write-Output "Generated $taskDone/$($taskRequests.Count) Arabic recordings" }
    }
} finally { $taskSynth.Dispose() }
python (Join-Path $PSScriptRoot 'arabic-audio-inventory.py') publish
if ($LASTEXITCODE -ne 0) { throw 'Inventory publication failed' }
