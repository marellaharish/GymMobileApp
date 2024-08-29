// CustomBottomSheetModal.js
import React, { forwardRef } from 'react';
import { BottomSheetModal, BottomSheetBackdrop, BottomSheetView } from '@gorhom/bottom-sheet';

const CustomBottomSheetModal = forwardRef(({ snapPoints, onChange, children }, ref) => {
    return (
        <BottomSheetModal
            ref={ref}
            index={1}
            snapPoints={snapPoints}
            onChange={onChange}
            enableContentPanningGesture={true}
            backdropComponent={(props) => (
                <BottomSheetBackdrop
                    {...props}
                    opacity={0.7}
                    appearsOnIndex={0}
                    disappearsOnIndex={-1}
                />
            )}
        >
            <BottomSheetView>
                {children}
            </BottomSheetView>
        </BottomSheetModal>
    );
});

export default CustomBottomSheetModal;
