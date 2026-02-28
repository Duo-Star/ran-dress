import { Context, Schema, h } from 'koishi'

export const name = 'ran-dress'

export const inject = ['http']

export const usage = `
# 随机计算机猫娘

遵循 Cute-Dress/Dress CC BY-NC-SA 4.0 协议，使用了 \` https://github.com/nomdn/dress-api \` API。

发送 \` randress \` 或 \`随机裙子\` 会返回来自 \` github.com/Cute-Dress/Dress \` 的随机女装图片以及作者信息。

#### 关于
\`\`\`
---
Duo : https://www.mduo.cloud/
GitHub : https://www.github.com/Duo-Star
Math Forest : 663251235
---
\`\`\`

`.trim()

export interface Config {}

export const Config: Schema<Config> = Schema.object({})

export function apply(ctx: Context) {
  ctx.command('randress', '随机裙子')
    .action(async () => {
      try {
        const res = await ctx.http.get('https://dress.wsmdn.top/v1/dress')

        return [
          h.image(res.img_url),
          `作者: ${res.img_author}`,
          `\n上传时间: ${res.upload_time}`,
          `\n声明: ${res.notice}`,
        ]
      } catch (e) {
        ctx.logger(name).error(e)
        return '咪！发生了错误，请稍后再试！'
      }
    })
}
