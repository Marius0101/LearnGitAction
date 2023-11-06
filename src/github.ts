import * as github from '@actions/github';
import * as version from './version';
import * as core from '@actions/core'

export async function createReleaseDraft(
  versionTag: string,
  repoToken: string,
  changelog: string
): Promise<string> {
  const octokit = github.getOctokit(repoToken);
  const response = await octokit.rest.repos.createRelease({
    owner: github.context.repo.owner,
    repo: github.context.repo.repo,
    tag_name: versionTag,
    name: version.removePrefix(versionTag),
    body: changelog,
    prerelease: version.isPrerelease(versionTag),
    draft: true,
  });
  if(response.status !== 201){
    throw new Error(`Failed to create the relese: ${response.status}`)
  }
  core.info(`Created relese draft '${response.data.name}`)
  
  return response.data.html_url
}
