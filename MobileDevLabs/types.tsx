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
    MovieDetailTabScreen: undefined;
};

export type MovieDetailTabParamList = {
    MovieDetailTabScreen: undefined;
};

export type MoviesList = Array<MovieItem>;

export interface MovieItem {
    Title: string;
    Year?: string;
    Rated?: string;
    Released?: string;
    Runtime?: string;
    Genre?: string;
    Director?: string;
    Writer?: string;
    Actors?: string;
    Plot?: string;
    Language?: string;
    Country?: string;
    Awards?: string;
    imdbRating?: string;
    imdbVotes?: string;
    imdbID: string;
    Type?: string;
    Production?: string;
    Poster: any;
}
