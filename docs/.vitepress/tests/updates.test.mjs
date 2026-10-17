import test from 'node:test'
import assert from 'node:assert/strict'
import { readFileSync, existsSync } from 'node:fs'
import { fileURLToPath } from 'node:url'
import { join } from 'node:path'

// 检查真实静态构建，而不是只检查源码里是否出现某个配置。
const dist = fileURLToPath(new URL('../dist/', import.meta.url))
const html = readFileSync(join(dist, 'index.html'), 'utf8')
const base = process.env.DOCS_BASE || '/'
const cards = [...html.matchAll(/<a\b([^>]*\bclass="update-title"[^>]*)>([\s\S]*?)<\/a>/g)]
  .map(([, attributes, text]) => ({
    href: attributes.match(/\bhref="([^"]+)"/)?.[1] || '',
    text: text.replace(/<[^>]*>/g, '').trim(),
  }))
const excerpts = [...html.matchAll(/<div\b[^>]*\bclass="update-excerpt"[^>]*>([\s\S]*?)<\/div>/g)]
  .map(([, excerpt]) => excerpt)
const detailLinks = [...html.matchAll(/<div\b[^>]*\bclass="update-link"[^>]*>\s*<a\b([^>]*)>/g)]
  .map(([, attributes]) => attributes.match(/\bhref="([^"]+)"/)?.[1] || '')

test('看板日期只显示年月日，不显示序列化后的时间戳', () => {
  assert.ok(cards.length > 0, '构建中应存在更新记录卡片')
  for (const card of cards) {
    assert.match(card.text, /^\d{4}-\d{2}-\d{2} · /, card.href)
  }
})

test('记录按日期倒序，同日记录按文件编号倒序', () => {
  assert.ok(cards.length > 0, '不能把没有卡片当作排序通过')
  const keys = cards.map(({ text, href }) => `${text.slice(0, 10)} ${href}`)
  assert.deepEqual(keys, [...keys].sort().reverse())
})

test('首页摘要在约定的more标记处结束，不泄露后续正文', () => {
  assert.equal(excerpts.length, cards.length, '每个记录卡片应有独立摘要')
  assert.ok(excerpts.length > 0, '不能把空页面当作摘要通过')
  for (const excerpt of excerpts) {
    assert.ok(!excerpt.includes('<!-- more -->'), '摘要不应跨过more标记包含正文')
  }
})

test('记录的标题和详情链接均带部署子目录，并指向同一真实文件', () => {
  assert.ok(cards.length > 0, '构建中应存在可打开的记录链接')
  assert.equal(detailLinks.length, cards.length, '每个卡片的详情入口也必须被检查')
  cards.forEach((card, index) => {
    for (const href of [card.href, detailLinks[index]]) {
      assert.ok(href.startsWith(`${base}progress/updates/`), `链接遗漏部署子目录：${href}`)
      assert.ok(existsSync(join(dist, href.slice(base.length))), `链接目标不存在：${href}`)
    }
    assert.equal(detailLinks[index], card.href, '同一卡片的两个入口应打开同一记录')
  })
})
