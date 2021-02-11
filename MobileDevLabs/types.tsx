export type RootStackParamList = {
    Root: undefined;
    NotFound: undefined;
};

export type BottomTabParamList = {
    General: undefined;
    Drawing: undefined;
    Movies: undefined;
};

export type GeneralTabParamList = {
    GeneralTabScreen: undefined;
};

export type DrawingTabParamList = {
    DrawingTabScreen: undefined;
};

export type MoviesTabParamList = {
    MoviesTabScreen: undefined;
};

export interface MovieItem {
    Title: string;
    Year?: string;
    imdbID?: string;
    Type?: string;
    Poster: any;
}

export interface MoviesList {
    Search: Array<MovieItem>;
}
