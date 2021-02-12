import * as Linking from 'expo-linking';

export default {
    prefixes: [Linking.makeUrl('/')],
    config: {
        screens: {
            Root: {
                screens: {
                    General: {
                        screens: {
                            GeneralTabScreen: 'general'
                        }
                    },
                    Drawing: {
                        screens: {
                            DrawingTabScreen: 'drawing'
                        }
                    },
                    Movies: {
                        screens: {
                            MoviesTabScreen: 'movies',
                            MovieDetailTabScreen: 'movieDetail'
                        }
                    }
                }
            },
            NotFound: '*'
        }
    }
};
