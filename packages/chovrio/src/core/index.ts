import { Command, program } from 'commander'
import { version } from '../../package.json'
class Chovrio {
  program: Command
  commands: Array<(program: Command) => void>
  constructor() {
    this.program = program
    this.commands = []
    this.init()
    this.program.option('-v, --version').action(() => {
      console.log(version)
    })
    this.program.parse()
  }
  init() {
    this.commands.forEach(command => {
      command(program)
    })
  }
}
const cli = new Chovrio()
cli.program.version(version)
