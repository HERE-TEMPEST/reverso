import { useCallback, useEffect, useState } from 'react'
import { AnySchema } from 'yup'

interface UseLogicProps<InfoState> {
	schema: AnySchema
	initialState: InfoState
}

export const useLogic = function <InfoState>(props: UseLogicProps<InfoState>) {
	const { initialState, schema } = props

	const [infoState, setInfoState] = useState<InfoState>(initialState)

	const [errors, setErrors] = useState<Record<keyof InfoState, string | undefined> | null>(null)
	const [isValid, setValid] = useState(false)
	const changeState = useCallback((state: Partial<InfoState>) => setInfoState((current) => ({ ...current, ...state })), [])

	useEffect(() => {
		try {
			schema.validateSync(infoState, { strict: true, abortEarly: false })
			setValid(() => true)
			setErrors(() => null)
		} catch (error: any) {
			const newErrors: Record<string, string> = {}
			if (error && error.inner) {
				for (const validError of error.inner) {
					newErrors[validError.path] = validError.message
				}
			}
			setErrors(() => newErrors as any)
			setValid(() => false)
		}
	}, [infoState])

	return {
		state: infoState,
		errors,
		isValid,
		changeState
	}
}
