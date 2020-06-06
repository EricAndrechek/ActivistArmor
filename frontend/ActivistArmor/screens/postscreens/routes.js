
import {createStackNavigator} from 'react-navigation-stack';
import CaptureScreen from './capturescreen';
import UploadScreen from './uploadscreen';
import PreviewPicture from './previewpicture';

const SettingsStack = createStackNavigator();
export default function UploadScreens() {
  return (
    <SettingsStack.Navigator>
      <SettingsStack.Screen name="Settings" component={CaptureScreen} />
      <SettingsStack.Screen name="Details" component={UploadScreen} />
    </SettingsStack.Navigator>
  );
}
/*
const Routes = createStackNavigator();

export default function UploadScreens({ navigation, route }) {

  return (
    <Routes.Navigator initialRouteName={Preview}>
      <Routes.Screen
        name="Capture"
        component={CaptureScreen}
      />
      <Routes.Screen
        name="Upload"
        component={UploadScreen}
      />
      <Routes.Screen
        name="Preview"
        component={PreviewPicture}
      />
    </Routes.Navigator>
  );
}
*/