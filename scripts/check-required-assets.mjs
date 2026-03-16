import { existsSync } from 'node:fs'
import { resolve } from 'node:path'

const requiredAssets = [
  { label: 'CV PDF', path: 'public/assets/CV_Sachin_Sharma.pdf' },
]

const missing = requiredAssets.filter((asset) => !existsSync(resolve(process.cwd(), asset.path)))

if (missing.length > 0) {
  console.error('\n❌ Required portfolio assets are missing:\n')
  missing.forEach((asset) => {
    console.error(`- ${asset.label}: ${asset.path}`)
  })
  console.error('\nAdd the missing file(s) and run the build again.\n')
  process.exit(1)
}

console.log('\n✅ Required portfolio assets found.\n')
