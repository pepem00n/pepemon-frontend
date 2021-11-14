import { useCallback, useContext } from 'react';
import { ModalsProviderContext, ModalData } from '../contexts';

const useModal = (modalData?: ModalData, key?: string) => {
	const { onPresent, onDismiss } = useContext(ModalsProviderContext)

	const handlePresent = useCallback(() => {
		onPresent(modalData, key);
	}, [key, modalData, onPresent])

	return [handlePresent, onDismiss]
}

export default useModal
