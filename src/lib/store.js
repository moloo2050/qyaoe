import { writable } from 'svelte/store';

export const slots = writable([
    {"id":0,"profile_id":0,"name":"空 位 ","qrating":1600,"team":"[-]",position:false},
    {"id":1,"profile_id":0,"name":"空 位 ","qrating":1600,"team":"[-]",position:false},
    {"id":2,"profile_id":0,"name":"空 位 ","qrating":1600,"team":"[-]",position:false},
    {"id":3,"profile_id":0,"name":"空 位 ","qrating":1600,"team":"[-]",position:false},
    {"id":4,"profile_id":0,"name":"空 位 ","qrating":1600,"team":"[-]",position:false},
    {"id":5,"profile_id":0,"name":"空 位 ","qrating":1600,"team":"[-]",position:false},
    {"id":6,"profile_id":0,"name":"空 位 ","qrating":1600,"team":"[-]",position:false},
    {"id":7,"profile_id":0,"name":"空 位 ","qrating":1600,"team":"[-]",position:false}])
export const profile_ids = writable([])
export const qyonslotes = writable([])
export const players = writable([])
export const qyplayers = writable([])
export const matches = writable([])
export const onlobbyes = writable([])
export const onmatches = writable([])
export const qyonlobbyes = writable([])
export const qyonmatches = writable([])
export const connection = writable(false);