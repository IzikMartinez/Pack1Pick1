import PocketBase, { Record } from 'pocketbase';
const pb = new PocketBase('https://pack1pick1db.xyz');

export const useRecords = pb.collection('outsiders')
    .getFullList(200 /* batch size */, {
        sort: '-created',
    })
export const usePocketbase = pb
