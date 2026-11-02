"""Reproduce with FontTools[woff] 4.60.2; no subsetting or outline edits."""
import hashlib
import json
from pathlib import Path

import fontTools
from fontTools.pens.recordingPen import RecordingPen
from fontTools.ttLib import TTFont

root = Path('src/app/[locale]/fonts')
results = []
for name in ('GeistVF', 'GeistMonoVF'):
    source = root / f'{name}.woff'
    target = root / f'{name}.woff2'
    original = TTFont(source, recalcTimestamp=False)
    compressed = TTFont(source, recalcTimestamp=False)
    compressed.flavor = 'woff2'
    compressed.save(target)
    result = TTFont(target, recalcTimestamp=False)
    assert original.getGlyphOrder() == result.getGlyphOrder()
    assert original.getBestCmap() == result.getBestCmap()
    assert original['hmtx'].metrics == result['hmtx'].metrics
    axes = lambda font: [(a.axisTag, a.minValue, a.defaultValue, a.maxValue) for a in font['fvar'].axes]
    assert axes(original) == axes(result)
    checked = 0
    for weight in (100, 400, 900):
        before = original.getGlyphSet(location={'wght': weight})
        after = result.getGlyphSet(location={'wght': weight})
        for glyph in original.getGlyphOrder():
            a, b = RecordingPen(), RecordingPen()
            before[glyph].draw(a)
            after[glyph].draw(b)
            assert a.value == b.value, (name, weight, glyph)
            checked += 1
    results.append({'font': name, 'sourceBytes': source.stat().st_size, 'woff2Bytes': target.stat().st_size, 'sourceSha256': hashlib.sha256(source.read_bytes()).hexdigest(), 'woff2Sha256': hashlib.sha256(target.read_bytes()).hexdigest(), 'glyphs': len(original.getGlyphOrder()), 'axes': axes(original), 'outlineComparisons': checked, 'glyphOrderCmapMetricsAxesAndOutlinesMatch': True})
Path('docs/evidence/takonbini-journey-2026-11-02/font-compression.json').write_text(json.dumps({'fontTools': fontTools.__version__, 'fonts': results}, indent=2) + '\n')
print(json.dumps(results))
