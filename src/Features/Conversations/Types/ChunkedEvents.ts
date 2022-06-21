import { EventChunk } from './EventChunk'

export interface ChunkedEvents {
    [date: string]: EventChunk;
}