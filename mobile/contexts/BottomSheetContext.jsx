import React, { createContext, useContext, useRef, useState, useCallback, useMemo } from 'react';
import BottomSheet, { BottomSheetBackdrop, BottomSheetView } from '@gorhom/bottom-sheet';
import { View } from 'react-native';
import { BodyText } from '../components/StyledText';
import { GestureHandlerRootView } from 'react-native-gesture-handler';

export const BottomSheetContext = createContext();

export function BottomSheetProvider({ children }) {
  const [isVisible, setIsVisible] = useState(false);
  const [content, setContent] = useState(null);
  const [title, setTitle] = useState('');
  const [snapPoints, setSnapPoints] = useState(['50%', '90%']);

  const sheetRef = useRef(null);

  const renderBackdrop = useCallback(
    (props) => (
      <BottomSheetBackdrop
        {...props}
        disappearsOnIndex={-1}
        appearsOnIndex={0}
        pressBehavior="close"
      />
    ),
    []
  );

  const openBottomSheet = useCallback((options) => {
    if (!options) {
      // Close the bottom sheet
      sheetRef.current?.close();
      setIsVisible(false);
      return;
    }
    
    setContent(options.content);
    setTitle(options.title || '');
    setIsVisible(true);
    setSnapPoints(options.snapPoints || ['50%', '90%']);
    sheetRef.current?.snapToIndex(0);
  }, []);

  const closeBottomSheet = useCallback(() => {
    sheetRef.current?.close();
    setIsVisible(false);
  }, []);

  return (
    <BottomSheetContext.Provider value={{ openBottomSheet, closeBottomSheet }}>
      {children}
      
      {isVisible && (
        <GestureHandlerRootView style={{ position: 'absolute', top: 0, left: 0, right: 0, bottom: 0 }}>
          <BottomSheet
            ref={sheetRef}
            index={0}
            snapPoints={snapPoints}
            enableDynamicSizing={false}
            enablePanDownToClose={true}
            backdropComponent={renderBackdrop}
            backgroundStyle={{
              backgroundColor: '#232323',
            }}
            onClose={() => setIsVisible(false)}
          >
            <BottomSheetView className="px-4">
              {title && (
                <BodyText className="text-center text-xl mb-4">{title}</BodyText>
              )}
              {content}
            </BottomSheetView>
          </BottomSheet>
        </GestureHandlerRootView>
      )}
    </BottomSheetContext.Provider>
  );
}