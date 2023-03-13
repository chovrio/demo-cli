import { program as o } from 'commander'
import e from 'fs'
import r from 'ora'
import s from 'picocolors'
import { NodeSSH as t } from 'node-ssh'
import n from 'readline-sync'
import * as c from 'dotenv'
var i = '1.0.0'
c.config()
var a = process.env
function p(o) {
  o.command('deploy')
    .description('deploy a project to server')
    .action(async () => {
      const o = (function () {
          const o = e
              .readFileSync(`${process.cwd()}/demo.config.js`, 'utf-8')
              .replace(/[\s|\n]/g, ''),
            r = /\{(.*)\}/
          if (r.test(o)) {
            const e = r.exec(o)
            if (null !== e) return new Function('return ' + e[0])()
          }
        })(),
        c = new t()
      let i, p, l
      a.user && a.password && a.host
        ? ((i = a.host), (p = a.user), (l = a.password))
        : ((i = n.question(`Your server ip address${s.blue('(host)')}:`)),
          (p = n.question(
            `The user name you want to log in to${s.blue('(username)')}:`
          )),
          (l = n.question(`Your password${s.blue('(password)')}:`)))
      const m = r(s.blue('connect server...')).start()
      try {
        await c.connect({ host: i, username: p, password: l }),
          m.stop(),
          console.log(s.green('服务器连接成功~'))
      } catch (o) {
        m.stop(), console.log(s.red('数据错误，连接失败' + o.message))
      }
      const d = r(s.blue('delete folder...')).start(),
        u = o?.deploy?.position || ''
      await c.execCommand(`rm -rf ${u}`),
        d.stop(),
        console.log(s.green('删除文件成功~'))
      const f = r(s.blue('upload folder...')).start(),
        g = await c.putDirectory(process.cwd() + '/dist', u, {
          recursive: !0,
          concurrency: 10
        })
      f.stop(),
        g
          ? console.log(s.green('文件上传服务器成功~'))
          : console.log(s.red('文件上传服务器失败')),
        process.exit(0)
    })
}
new (class {
  constructor() {
    (this.program = o),
      (this.commands = [p]),
      this.init(),
      this.program.option('-v, --version').action(() => {
        console.log(i)
      }),
      this.program.parse()
  }
  init() {
    this.commands.forEach(e => {
      e(o)
    })
  }
})().program.version(i)
