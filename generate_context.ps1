$outputFile = "project_context.md"
$root = Get-Location

# Initialize file
"Project Context generated at $(Get-Date)`n" | Out-File -Encoding UTF8 $outputFile

# Function to print tree
function Show-Tree {
    param (
        [string]$Path,
        [string]$Indent = ""
    )
    
    $items = Get-ChildItem -Path $Path | Where-Object { 
        $_.Name -ne "node_modules" -and 
        $_.Name -ne ".git" -and 
        $_.Name -ne "dist" -and 
        $_.Name -ne "build" -and 
        $_.Name -ne ".next" -and
        $_.Name -ne ".vite" -and
        $_.Name -ne ".vscode"
    }

    $count = $items.Count
    $i = 0

    foreach ($item in $items) {
        $i++
        $isLast = $i -eq $count
        $marker = if ($isLast) { "\---" } else { "+---" }
        
        "$( $Indent )$marker$( $item.Name )" | Out-File -Append -Encoding UTF8 $outputFile

        if ($item.PSIsContainer) {
            $newIndent = $Indent + "|   "
            Show-Tree -Path $item.FullName -Indent $newIndent
        }
    }
}

"## Project Structure`n" | Out-File -Append -Encoding UTF8 $outputFile
'```' | Out-File -Append -Encoding UTF8 $outputFile
Show-Tree -Path $root.Path
'```' | Out-File -Append -Encoding UTF8 $outputFile
"`n" | Out-File -Append -Encoding UTF8 $outputFile

# Get Files
$files = Get-ChildItem -Recurse -File | Where-Object { 
    $_.FullName -notmatch "\\node_modules\\" -and 
    $_.FullName -notmatch "\\.git\\" -and 
    $_.FullName -notmatch "\\dist\\" -and 
    $_.FullName -notmatch "\\build\\" -and 
    $_.FullName -notmatch "\\.next\\" -and
    $_.Name -ne "package-lock.json" -and 
    $_.Name -ne "yarn.lock" -and
    $_.Name -ne "project_context.md" -and
    $_.Name -ne "generate_context.ps1"
}

# Append Content
foreach ($file in $files) {
    # Skip large files (> 500KB) and binary files
    if ($file.Length -gt 500000) { continue }
    
    $ext = $file.Extension.ToLower()
    $binaryExts = @(".png", ".jpg", ".jpeg", ".gif", ".ico", ".pdf", ".exe", ".dll", ".bin", ".zip", ".woff", ".woff2", ".ttf", ".eot", ".svg")
    if ($binaryExts -contains $ext) { continue }

    $relativePath = $file.FullName.Replace($root.Path + "\", "")
    
    # Determine language for markdown
    $lang = ""
    switch ($ext) {
        ".ts" { $lang = "typescript" }
        ".tsx" { $lang = "tsx" }
        ".js" { $lang = "javascript" }
        ".jsx" { $lang = "jsx" }
        ".json" { $lang = "json" }
        ".html" { $lang = "html" }
        ".css" { $lang = "css" }
        ".scss" { $lang = "scss" }
        ".md" { $lang = "markdown" }
        ".py" { $lang = "python" }
        ".sh" { $lang = "bash" }
        ".ps1" { $lang = "powershell" }
        ".sql" { $lang = "sql" }
        ".prisma" { $lang = "prisma" }
        ".toml" { $lang = "toml" }
        ".gitignore" { $lang = "gitignore" }
        ".env" { $lang = "properties" }
        default { $lang = "" }
    }
    
    if ($file.Name -eq ".gitignore") { $lang = "gitignore" }
    if ($file.Name -eq ".env") { $lang = "properties" }

    "## $relativePath`n" | Out-File -Append -Encoding UTF8 $outputFile
    
    # Use single quotes for backticks to avoid escaping issues
    $fence = '```' + $lang
    $fence | Out-File -Append -Encoding UTF8 $outputFile
    "`n" | Out-File -Append -Encoding UTF8 $outputFile
    
    try {
        [System.IO.File]::ReadAllText($file.FullName) | Out-File -Append -Encoding UTF8 $outputFile
    } catch {
        "Error reading file" | Out-File -Append -Encoding UTF8 $outputFile
    }
    
    # Use concatenation for closing fence
    "`n" + '``` ' + "`n" | Out-File -Append -Encoding UTF8 $outputFile
}

Write-Host "Project context generated in $outputFile"
