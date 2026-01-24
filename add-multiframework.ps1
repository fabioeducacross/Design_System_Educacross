# Script para adicionar multiFrameworkCode genérico a stories sem o parâmetro
$storiesPath = "apps\storybook\stories\components"

$files = @(
    "Button.stories.tsx",
    "Label.stories.tsx", 
    "Input.stories.tsx",
    "Checkbox.stories.tsx",
    "Radio.stories.tsx",
    "Select.stories.tsx",
    "Skeleton.stories.tsx",
    "ThemeSwitcher.stories.tsx",
    "Badge.stories.tsx",
    "AvatarIcon.stories.tsx",
    "Card.stories.tsx",
    "Dialog.stories.tsx",
    "Accordion.stories.tsx",
    "DropdownMenu.stories.tsx",
    "Popover.stories.tsx",
    "Table.stories.tsx",
    "Tabs.stories.tsx",
    "Pagination.stories.tsx",
    "Sidebar.stories.tsx",
    "Header.stories.tsx",
    "Logo.stories.tsx",
    "Toast.stories.tsx",
    "Tooltip.stories.tsx"
)

foreach ($file in $files) {
    $path = Join-Path $storiesPath $file
    Write-Host "Processando $file..." -ForegroundColor Cyan
    
    $content = Get-Content $path -Raw
    
    # Contar stories faltando
    $totalStories = ([regex]::Matches($content, "export const \w+: Story")).Count
    $withMulti = ([regex]::Matches($content, "multiFrameworkCode")).Count
    $missing = $totalStories - $withMulti
    
    Write-Host "  Total: $totalStories | Com Multi: $withMulti | Faltando: $missing" -ForegroundColor Yellow
}

Write-Host "`nEstatísticas compiladas. Executar adições manualmente via Copilot." -ForegroundColor Green
