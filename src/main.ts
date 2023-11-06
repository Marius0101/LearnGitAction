import * as core from '@actions/core'
import * as event from './event'
import * as version from './version'
export async function run(): Promise<void> {
  try {
    const tag = event.getCreatedTag()
    if(tag && version.isSemVer(tag)){
      
    }

    core.setOutput('release-url','https://example.com')
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
