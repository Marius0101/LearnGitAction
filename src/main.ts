import * as core from '@actions/core'

export async function run(): Promise<void> {
  try {
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
