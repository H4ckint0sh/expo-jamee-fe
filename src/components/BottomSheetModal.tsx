import { View, StyleSheet, Text } from "react-native";
import React, { forwardRef, useCallback, useMemo } from "react";
import {
  BottomSheetBackdrop,
  BottomSheetModal,
  BottomSheetView,
} from "@gorhom/bottom-sheet";

export type BottomSheetModalProps = {
  snapPoints?: string[]; // Customizable snap points
  content?: React.ReactNode; // Custom content inside the modal
  headline?: string; // Optional headline text
};

export type Ref = BottomSheetModal;

const Modal = forwardRef<Ref, BottomSheetModalProps>(
  (
    { snapPoints = ["50%", "75%"], content, headline = "Bottom Modal 😎" },
    ref,
  ) => {
    const memoizedSnapPoints = useMemo(() => snapPoints, [snapPoints]);

    const renderBackdrop = useCallback(
      (props: any) => (
        <BottomSheetBackdrop
          appearsOnIndex={0}
          disappearsOnIndex={-1}
          {...props}
        />
      ),
      [],
    );

    return (
      <BottomSheetModal
        style={styles.contentContainer}
        ref={ref}
        index={0}
        snapPoints={memoizedSnapPoints}
        backdropComponent={renderBackdrop}
        enableDismissOnClose
        enablePanDownToClose
        enableDynamicSizing={false}
      >
        <BottomSheetView style={styles.contentContainer}>
          {headline && <Text style={styles.containerHeadline}>{headline}</Text>}
          {content}
        </BottomSheetView>
      </BottomSheetModal>
    );
  },
);

const styles = StyleSheet.create({
  contentContainer: {
    flex: 1,
    alignItems: "center",
  },
  containerHeadline: {
    fontSize: 24,
    fontWeight: "600",
    padding: 20,
  },
});

export default Modal;
