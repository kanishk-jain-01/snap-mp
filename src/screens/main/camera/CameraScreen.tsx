import React from 'react';
import { View } from 'react-native';
import { StatusBar } from 'expo-status-bar';
import { LoadingSpinner } from '../../../components/ui/LoadingSpinner';
import { useThemeColors } from '../../../components/ui/ThemeProvider';
import { useCameraState } from './hooks/useCameraState';
import {
  PermissionScreen,
  CameraView,
  ImagePreview,
  TextOverlayModal,
} from './components';

export const CameraScreen: React.FC = () => {
  const colors = useThemeColors();
  const {
    state,
    actions,
    cameraRef,
    permissions,
    isPostingStory,
    postingProgress,
    setOverlayText,
  } = useCameraState();

  // Loading screen
  if (state.isLoading) {
    return (
      <View className='flex-1 bg-bg-primary items-center justify-center'>
        <StatusBar style='dark' />
        <LoadingSpinner size='large' text='Checking camera...' color={colors.primary} />
      </View>
    );
  }

  // Permission request screen
  if (!permissions?.camera || !state.cameraAvailable) {
    return (
      <PermissionScreen
        cameraAvailable={state.cameraAvailable}
        isRequesting={state.isRequesting}
        isPickingImage={state.isPickingImage}
        isLoading={state.isLoading}
        error={state.error}
        permissions={permissions}
        onRequestPermissions={actions.requestPermissions}
        onPickFromGallery={actions.pickImageFromGallery}
        onRefreshStatus={actions.refreshPermissions}
      />
    );
  }

  // Show selected image preview if available
  if (state.selectedImage && state.capturedPhoto) {
    return (
      <>
        <ImagePreview
          imageUri={state.capturedPhoto}
          selectedImage={state.selectedImage}
          imageSource={state.imageSource!}
          overlayText={state.overlayText}
          textPosition={state.textPosition}
          isPostingStory={isPostingStory}
          postingProgress={postingProgress}
          onBack={actions.resetImage}
          onAddText={actions.handleTextOverlayPress}
          onClearText={actions.clearTextOverlay}
          onPostStory={actions.handlePostStory}
          onUpdateTextPosition={actions.updateTextPosition}
        />

        {/* Text Overlay Modal */}
        <TextOverlayModal
          visible={state.showTextOverlay}
          text={state.overlayText}
          onTextChange={setOverlayText}
          onConfirm={actions.handleTextOverlayConfirm}
          onCancel={actions.handleTextOverlayCancel}
        />
      </>
    );
  }

  // Main camera interface
  return (
    <>
      <CameraView
        cameraRef={cameraRef}
        cameraType={state.cameraType}
        flashMode={state.flashMode}
        zoom={state.zoom}
        showGrid={state.showGrid}
        timerMode={state.timerMode}
        isTimerActive={state.isTimerActive}
        timerCount={state.timerCount}
        isCameraReady={state.isCameraReady}
        isCapturing={state.isCapturing}
        isPickingImage={state.isPickingImage}
        capturedPhoto={state.capturedPhoto}
        autoOptimize={state.autoOptimize}
        onCameraReady={actions.onCameraReady}
        onToggleFlash={actions.toggleFlashMode}
        onToggleTimer={actions.toggleTimer}
        onToggleGrid={actions.toggleGrid}
        onToggleCamera={actions.toggleCameraType}
        onAdjustZoom={actions.adjustZoom}
        onToggleOptimization={actions.toggleOptimization}
        onCapture={actions.startTimerCapture}
        onPickFromGallery={actions.pickImageFromGallery}
      />

      {/* Text Overlay Modal */}
      <TextOverlayModal
        visible={state.showTextOverlay}
        text={state.overlayText}
        onTextChange={setOverlayText}
        onConfirm={actions.handleTextOverlayConfirm}
        onCancel={actions.handleTextOverlayCancel}
      />
    </>
  );
}; 