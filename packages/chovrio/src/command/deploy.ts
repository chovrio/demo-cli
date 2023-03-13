import type { Command } from 'commander'

export default function deploy(program: Command) {
  program
    .command('deploy')
    .description('deploy a project to server')
    .action(async () => {
      console.log(1111)
    })
}
