[CmdletBinding()]
Param(
    [Parameter(Mandatory = $true)]
    [string]$path,
    [Parameter(Mandatory = $true)]
    [string]$value
)

try {
    Add-Content -Path $path -Value $value
}
catch {
    Write-Error $_
}