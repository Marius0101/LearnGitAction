import * as github from '@actions/github'
import * as core from '@actions/core'
export function getCreatedTag():string|null{
    if(github.context.eventName != 'create'){
        core.info(`the event name was ${github.context.eventName}`)
        return null
    }
    if( github.context.payload.ref_type != 'tag'){
        core.info(`the created reference was a branch, not a tag`)
        return null
    }

    return github.context.payload.ref
}