import * as Linking from 'expo-linking';

export default {
    prefixes: [Linking.makeUrl('/')],
    config: {
        screens: {
            Root: {
                screens: {
                    GeneralTab: {
                        screens: {
                            GeneralTabScreen: 'general'
                        }
                    },
                    InfoTab: {
                        screens: {
                            InfoTabScreen: 'info'
                        }
                    }
                }
            },
            NotFound: '*'
        }
    }
};
