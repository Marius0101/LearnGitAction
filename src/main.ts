import * as core from '@actions/core'
import * as event from './event'
import * as version from './version'
import * as git from './git'
import * as github from './github'

export async function run(): Promise<void> {
  try {
    const token = core.getInput('repo-token')
    const tag = event.getCreatedTag()
    let releaseUrl= ''
    if(tag && version.isSemVer(tag)){
      const changelog = await git.getChangesIntroducedByTag(tag)
      console.log(changelog);
      releaseUrl = await github.createReleaseDraft(tag,token,changelog)

    }

    core.setOutput('release-url',releaseUrl)
  } catch (error) {
    if (error instanceof Error) {
      // ✅ TypeScript knows err is Error
      console.log(error.message);
    } else {
      console.log('Unexpected error', error);
    }
    core.setFailed("Failed")
  }
}

run()
