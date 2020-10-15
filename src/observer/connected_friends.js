import { Subject } from 'rxjs'

export const connected_friend = new Map();

export const subject_friends$ = new Subject();

export const subject_update_friends$ = new Subject();