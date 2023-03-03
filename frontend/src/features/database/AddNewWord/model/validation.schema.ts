import * as Yup from 'yup'
import { Assign, ObjectShape, TypeOfShape } from 'yup/lib/object'
import { AnyObject } from 'yup/lib/types'
import { InfoState } from './types'

export const createProjectValidationSchema: Yup.ObjectSchema<
	Assign<ObjectShape, Record<keyof InfoState, any>>,
	AnyObject
> = Yup.object().shape({
	description: Yup.string().required('Заполните описание проекта'),
	title: Yup.string().required('Введите название проекта'),
	start: Yup.string().required('Введите время старта проекта'),
	end: Yup.string().required('Введите время окончания проекта'),
	position: Yup.string().required('Введите позицию на проекте'),
	technologies: Yup.array()
})
