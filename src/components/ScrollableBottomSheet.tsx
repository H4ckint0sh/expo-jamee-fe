import BottomSheet, {
  BottomSheetBackdrop,
  BottomSheetScrollView,
} from "@gorhom/bottom-sheet";
import React, { forwardRef, useCallback } from "react";
import { StyleSheet } from "react-native";

type BottomSheetComponentProps = {
  visible: boolean;
  snapPoints?: string[] | number[];
  initialIndex?: number;
  children: string | React.ReactNode[];
  onClose: () => void;
  onChange?: (index: number) => void;
};

type Ref = BottomSheet;

const BottomSheetComponent = forwardRef<Ref, BottomSheetComponentProps>(
  (props, ref) => {
    const {
      visible,
      snapPoints = ["25%", "50%", "90%"],
      initialIndex = 1,
      children,
      onClose,
      onChange,
    } = props;
    const handleSheetChange = useCallback(
      (index: number) => {
        console.log("handleSheetChange", index);
        if (index === -1) onClose();
        onChange?.(index);
      },
      [onChange, onClose],
    );

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

    if (!visible) return null;

    return (
      <BottomSheet
        ref={ref}
        index={initialIndex}
        snapPoints={snapPoints}
        onChange={handleSheetChange}
        backdropComponent={renderBackdrop}
        enablePanDownToClose
      >
        <BottomSheetScrollView contentContainerStyle={styles.contentContainer}>
          {children}
        </BottomSheetScrollView>
      </BottomSheet>
    );
  },
);

const styles = StyleSheet.create({
  container: {
    ...StyleSheet.absoluteFillObject,
    zIndex: 1000,
    flex: 1,
  },
  contentContainer: {
    backgroundColor: "white",
  },
});

export default BottomSheetComponent;
