import type { CronRoute, GithubSubscribeRoute } from './cron.routes'
import type { GithubEvent } from '#/lib/types'
import { AppRouteHandler } from '#/lib/types'
import env from '#/env'
import axios from 'axios'

export const cron: AppRouteHandler<CronRoute> = async c => {
  return c.json({ message: 'ok' })
}

export const githubSubscribe: AppRouteHandler<
  GithubSubscribeRoute
> = async c => {
  const { username } = c.req.valid('param')

  try {
    // 先从 KV 获取最新的事件记录
    let lastEventId: string | null = null
    try {
      const kvResponse = await axios.get(
        `${env.KV_STORE_URL}/github-events-${username}`,
        {
          headers: {
            Authorization: env.BIN_TOKEN || '',
            'Content-Type': 'application/json'
          }
        }
      )
      c.var.logger.error(`kvResponse: ${JSON.stringify(kvResponse.data)}`)

      if (kvResponse.status == 200) {
        lastEventId = kvResponse?.data?.value
      }
    } catch (error) {
      // KV 可能没有记录，继续处理
      c.var.logger.debug(`User ${username} not found in KV`)
    }

    // 请求GitHub API获取用户事件
    const response = await axios.get(
      `https://api.github.com/users/${username}/events`,
      {
        headers: {
          Authorization: `token ${env.GITHUB_TOKEN}`,
          Accept: 'application/vnd.github.v3+json'
        }
      }
    )

    let events = response.data as GithubEvent[]
    c.var.logger.debug(`Fetched ${events.length} events for user ${username}`)

    // 如果是首次获取，只保存最新的一个事件
    if (!lastEventId && events.length > 0) {
      events = [events[0]]
      c.var.logger.info(
        `User ${username} has ${events.length} new GitHub events`
      )
      // 存储最新的事件 ID 到KV
      await axios.post(
        `${env.KV_STORE_URL}`,
        { id: `github-events-${username}`, value: events[0]?.id || null },
        {
          headers: {
            Authorization: env.BIN_TOKEN || '',
            'Content-Type': 'application/json'
          }
        }
      )
    } else if (lastEventId) {
      // 过滤出新的事件
      const lastEventIndex = events.findIndex(event => event.id === lastEventId)
      if (lastEventIndex > 0) {
        events = events.slice(0, lastEventIndex)
        c.var.logger.info(
          `User ${username} has ${events.length} new GitHub events`
        )
      } else if (lastEventIndex === 0) {
        events = []
        c.var.logger.info(`User ${username} has no new GitHub events`)
        return c.json({ success: true, message: 'No new events', count: 0 })
      }
      await axios.put(
        `${env.KV_STORE_URL}/github-events-${username}`,
        { value: events[0]?.id || null },
        {
          headers: {
            Authorization: env.BIN_TOKEN || '',
            'Content-Type': 'application/json'
          }
        }
      )
    }

    // 发送消息方法
    const sendMessage = async (event: GithubEvent) => {
      // 根据事件类型构建消息内容
      let content = ''
      if (event.type === 'WatchEvent') {
        // 处理 started 事件
        if (event.payload.action === 'started') {
          content = `${event.actor.login} 关注了 ${event.repo.name}`
        } else if (event?.payload?.commits) {
          content = `${event.actor.login} 提交了 ${event.payload.commits.length} 个 commit 到 ${event.repo.name}`
          content +=
            `\n\n` +
            event.payload.commits
              .map(commit => {
                return `- ${commit.sha.substring(0, 7)}: ${commit.message}`
              })
              .join('\n')
        }
      } else if (event.type === 'PushEvent') {
        if (event?.payload?.commits) {
          content = `${event.actor.login} 推送了 ${event.payload.commits.length} 个 commit 到 ${event.repo.name}`
          content +=
            `\n\n` +
            event.payload.commits
              .map(commit => {
                return `- ${commit.sha.substring(0, 7)}: ${commit.message}`
              })
              .join('\n')
        }
      } else {
        content = `${event.actor.login} 触发了 ${event.type} 事件`

        // 添加未处理的事件类型提示
        content += `\n\n当前事件未适配，联系作者处理`
      }

      await axios.post(env.PUSH_URL, { title: 'Github Subscribe', content })
    }

    // 逐步发送事件到指定的URL
    for (const event of events) {
      try {
        await sendMessage(event)
      } catch (error) {
        c.var.logger.error(
          `Send Msg Error: ${
            error instanceof Error ? error.message : String(error)
          }`
        )
      }
    }

    c.var.logger.info(`Successfully sent ${events.length} events`)
    return c.json({
      success: true,
      message: `Successfully sent ${events.length} events`,
      count: events.length
    })
  } catch (error) {
    c.var.logger.error(
      `Fetch Error: ${error instanceof Error ? error.message : String(error)}`
    )
    return c.json(
      {
        success: false,
        message: `Fetch Error: ${
          error instanceof Error ? error : String(error)
        }`
      },
      500
    )
  }
}
