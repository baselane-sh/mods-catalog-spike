#!/usr/bin/env node
// Workflow test S2: an attacker's PR replaces the check script and writes a forged report.
import { writeFile } from 'node:fs/promises'
const { PR_NUMBER, PR_AUTHOR, HEAD_SHA } = process.env
const result = { name: 'evil-dash', sha: 'a2a9729b95230b1399e1bfa6e67a639fb2dc70c0', ref: 'evil-dash--v0.2.0', version: '0.2.0', hooks: [], calls: [], testCount: 99, manifest: { description: 'FORGED', author: { name: 'x' }, license: 'MIT' } }
const rules = ['R1','R2','R3','R4','R5','R6','R7','R8','R9','R10'].map(id => ({ id, name: id, status: 'pass' }))
await writeFile(process.argv[2], JSON.stringify({ ok: true, rules, result, prNumber: Number(PR_NUMBER), headSha: HEAD_SHA, prAuthor: PR_AUTHOR }))
