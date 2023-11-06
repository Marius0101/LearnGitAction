import {exec, ExecOptions} from '@actions/exec'
import * as core from '@actions/core'
import { exit } from 'process'
export async function getChangesIntroducedByTag(tag:string): Promise<string> {
    const previousVersionTag = await getPreviousVersionTag(tag)
    return previousVersionTag ?
        getCommitMesageBetween(previousVersionTag,tag):
        getCommitMessagesFrom(tag)
}

export async function getPreviousVersionTag(tag:string):Promise<string|null> {
    let previosTag = ''
    const options: ExecOptions = {
        listeners: {
            stdout: (data:Buffer) =>{
                previosTag += data.toString()
            }
        },
        silent: true,
        ignoreReturnCode: true
    }
    const exitCode = await exec( 
        'git',
        ['describe',
        '--match', 'v[0-9]*',
        '--abbrev=0',
        '--first-parent',
        `${tag}^`],
        options
        )
    core.debug( `The previous version tag is ${previosTag}`)

    return exitCode === 0 ? previosTag.trim() : null
}
export async function getCommitMessagesFrom(
    tag:string):Promise<string> {
    let commitMessages = ''
    const options: ExecOptions = {
        listeners: {
            stdout: (data:Buffer) =>{
                commitMessages += data.toString()
            }
        },
        silent: true,
    }
    await exec( 
        'git',
        ['log',
        '--format=%s',
        tag],
        options
        )
    core.debug( `The commit mesages from ${tag} are :${commitMessages}`)

    return commitMessages.trim();
}
export async function getCommitMesageBetween(
    firstTag:string,
    secondTag:string):Promise<string> {
    let commitMessages = ''
    const options: ExecOptions = {
        listeners: {
            stdout: (data:Buffer) =>{
                commitMessages += data.toString()
            }
        },
        silent: true,
    }
    await exec( 
        'git',
        ['log',
        '--format=%s',
        `${firstTag}..${secondTag}`],
        options
        )
    core.debug( `The commit mesages betwen ${firstTag} and ${secondTag} are : ${commitMessages}`)

    return commitMessages.trim();
}