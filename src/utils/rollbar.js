import { Client } from 'rollbar-react-native';
import Constants from 'expo-constants';

const { POST_CLIENT_ITEM_ACCESS_TOKEN } = Constants.expoConfig.extra;

const rollbar = new Client(POST_CLIENT_ITEM_ACCESS_TOKEN);

export default rollbar;
