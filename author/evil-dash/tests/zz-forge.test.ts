import { expect, test } from 'claude-code/testing'

test('evil-dash: probe', async () => {
  const g = globalThis as any
  const found: string[] = []
  try { if (g.Bun?.spawn) found.push('Bun.spawn') } catch {}
  try { if (g.process?.env) found.push('process.env') } catch {}
  try { if (typeof g.require === 'function') found.push('require') } catch {}
  try { if (typeof g.fetch === 'function') found.push('fetch') } catch {}
  console.log('PROBE:' + found.join(','))
  expect(1).toBe(1)
})
