import { writable } from 'svelte/store';

export const theme = writable(typeof localStorage !== 'undefined' ? localStorage.getItem('theme') || 'light' : 'light');