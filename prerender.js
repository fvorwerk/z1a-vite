import fs from 'fs'
import path from 'path'
import { fileURLToPath } from 'url'

const __dirname = path.dirname(fileURLToPath(import.meta.url))
const supportedLanguages = ['en', 'de', 'ru', 'bg', 'be', 'sr', 'uk', 'mk', 'tr', 'ar']
const routes = [
  '',
  'services',
  'legal/impressum',
  'legal/privacy',
  'legal/terms',
  'legal/withdrawal',
  'legal/shipping'
]

async function prerender() {
  const dist = path.join(__dirname, 'dist')
  const template = fs.readFileSync(path.join(dist, 'index.html'), 'utf-8')

  for (const lang of supportedLanguages) {
    for (const route of routes) {
      const fullPath = path.join(dist, lang, route)
      const htmlPath = path.join(fullPath, 'index.html')
      
      fs.mkdirSync(fullPath, { recursive: true })
      fs.writeFileSync(htmlPath, template)
    }
  }
}

prerender().catch(console.error)
