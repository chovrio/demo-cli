import fs from 'fs'
const files: string[] = ['demo.config.js', 'demo.config.ts']
export default function verifyConfigFile() {
  let fileName = ''
  files.forEach(file => {
    try {
      const f = process.cwd() + '/' + file
      fs.readFileSync(f, 'utf-8')
      fileName = file
    } catch (error) {
      console.error(error)
    }
  })
  return fileName
}
