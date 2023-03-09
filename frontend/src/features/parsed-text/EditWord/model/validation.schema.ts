import * as Yup from 'yup'
import { Assign, ObjectShape } from 'yup/lib/object'
import { AnyObject } from 'yup/lib/types'
import { posts } from './enums/pos'

export const addNewWordValidationSchema: Yup.ObjectSchema<
	Assign<ObjectShape, Record<any, any>>,
	AnyObject
> = Yup.object().shape({
	word: Yup.string().required('Слово должно быть введено'),
	POS: Yup.string().oneOf(posts, 'Часть речи должна быть выбрана')
})
