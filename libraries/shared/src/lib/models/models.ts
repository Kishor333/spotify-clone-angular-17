export interface Artist {
    external_urls: {
        spotify: string;
    };
    href: string;
    id: string;
    name: string;
    type: string;
    uri: string;
}
 
export interface ExternalIds {
    upc: string;
}
 
export interface ExternalUrls {
    spotify: string;
}
 
export interface Image {
    height: number;
    url: string;
    width: number;
}
 
export interface Copyright {
    text: string;
    type: string;
}
 
export interface TrackArtist {
    external_urls: {
        spotify: string;
    };
    href: string;
    id: string;
    name: string;
    type: string;
    uri: string;
}
 
export interface Track {
    artists: TrackArtist[];
    available_markets: string[];
    disc_number: number;
    duration_ms: number;
    explicit: boolean;
    external_urls: {
        spotify: string;
    };
    href: string;
    id: string;
    is_local: boolean;
    name: string;
    preview_url: string;
    track_number: number;
    type: string;
    uri: string;
}
 
export interface Tracks {
    href: string;
    items: Track[];
    limit: number;
    next: any;
    offset: number;
    previous: any;
    total: number;
}
 
export interface Album {
    album_type: string;
    artists: Artist[];
    available_markets: string[];
    copyrights: Copyright[];
    external_ids: ExternalIds;
    external_urls: ExternalUrls;
    genres: any[];
    href: string;
    id: string;
    images: Image[];
    label: string;
    name: string;
    popularity: number;
    release_date: string;
    release_date_precision: string;
    total_tracks: number;
    tracks: Tracks;
    type: string;
    uri: string;
}
