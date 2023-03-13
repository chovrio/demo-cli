import { program as o } from 'commander'
var r = '1.0.0'
new (class {
  constructor() {
    (this.program = o),
      (this.commands = []),
      this.init(),
      this.program.option('-v, --version').action(() => {
        console.log(r)
      }),
      this.program.parse()
  }
  init() {
    this.commands.forEach(r => {
      r(o)
    })
  }
})().program.version(r)
