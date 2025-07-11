import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { MainTabNavigator } from './MainTabNavigator';
import { StoryViewerScreen } from '../screens/main/StoryViewerScreen';
import { UserSearchScreen } from '../screens/main/UserSearchScreen';
import { UserProfileScreen } from '../screens/main/UserProfileScreen';
import { HostListScreen } from '../screens/main/HostListScreen';
import DocumentUploadScreen from '../screens/main/DocumentUploadScreen';
import DocumentViewerScreen from '../screens/main/DocumentViewerScreen';
import DocumentListScreen from '../screens/main/DocumentListScreen';
import { EventManagementScreen } from '../screens/main/EventManagementScreen';
import { MainStackParamList } from '../navigation/types';
import { useThemeColors } from '../components/ui/ThemeProvider';

const MainStack = createNativeStackNavigator<MainStackParamList>();

export const MainNavigator: React.FC = () => {
  const colors = useThemeColors();
  
  return (
    <MainStack.Navigator
      screenOptions={{
        headerShown: false,
        presentation: 'modal',
      }}
    >
      {/* Main Tab Navigator (Home, Camera, Chat, Profile) */}
      <MainStack.Screen
        name='MainTabs'
        component={MainTabNavigator}
        options={{
          presentation: 'card', // Normal presentation for tabs
        }}
      />

      {/* Modal Screens */}

      {/* Story Viewer */}
      <MainStack.Screen
        name='StoryViewer'
        component={StoryViewerScreen}
        options={{
          presentation: 'fullScreenModal',
          gestureEnabled: false,
          headerShown: false,
        }}
      />

      {/* User Search */}
      <MainStack.Screen
        name='UserSearch'
        component={UserSearchScreen}
        options={{
          presentation: 'card',
          headerShown: true,
          title: 'Find Friends',
          headerStyle: { backgroundColor: colors.surface },
          headerTitleStyle: { color: colors.textPrimary },
          headerTintColor: colors.primary,
        }}
      />

      {/* View Other User Profile */}
      <MainStack.Screen
        name='UserProfile'
        component={UserProfileScreen}
        options={{
          presentation: 'card',
          headerShown: true,
          title: 'Profile',
          headerStyle: { backgroundColor: colors.surface },
          headerTitleStyle: { color: colors.textPrimary },
          headerTintColor: colors.primary,
        }}
      />

      {/* Host List Screen */}
      <MainStack.Screen
        name='HostList'
        component={HostListScreen}
        options={{
          presentation: 'card',
          headerShown: true,
          title: 'Event Hosts',
          headerStyle: { backgroundColor: colors.surface },
          headerTitleStyle: { color: colors.textPrimary },
          headerTintColor: colors.primary,
        }}
      />

      {/* Document Upload Screen */}
      <MainStack.Screen
        name='DocumentUpload'
        component={DocumentUploadScreen}
        options={{
          presentation: 'card',
          headerShown: true,
          title: 'Upload Document',
          headerStyle: { backgroundColor: colors.surface },
          headerTitleStyle: { color: colors.textPrimary },
          headerTintColor: colors.primary,
        }}
      />

      {/* Document List Screen */}
      <MainStack.Screen
        name='DocumentList'
        component={DocumentListScreen}
        options={{
          presentation: 'card',
          headerShown: false,
        }}
      />

      {/* Document Viewer Screen */}
      <MainStack.Screen
        name='DocumentViewer'
        component={DocumentViewerScreen}
        options={{
          presentation: 'fullScreenModal',
          headerShown: false,
          gestureEnabled: false,
        }}
      />

      {/* Event Management Screen */}
      <MainStack.Screen
        name='EventManagement'
        component={EventManagementScreen}
        options={{
          presentation: 'card',
          headerShown: false,
        }}
      />

      {/* Future modal screens will be added here */}
      {/* 
      <MainStack.Screen name="StoryViewer" component={StoryViewer} />
      <MainStack.Screen name="UserProfile" component={UserProfile} />
      */}
    </MainStack.Navigator>
  );
};
