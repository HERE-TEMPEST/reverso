import React from 'react'

import { Modal } from '@shared/ui'

import { InfoState, createProjectValidationSchema, initialState, actionHandler } from '../../model'

import styles from './Modal.module.scss'
import { convertPost, POST, posts } from '../../model/enums/pos'
import { animacies, convertAnimacy } from '../../model/enums/animacy'
import { cases, convertCase } from '../../model/enums/case'
import { convertGender, genders } from '../../model/enums/gender'
import { convertMood, moods } from '../../model/enums/mood'
import { convertNumber, numbers } from '../../model/enums/number'
import { convertPerson, persons } from '../../model/enums/person'
import { convertTense, tenses } from '../../model/enums/tense'
import { convertTransitivity, transitivities } from '../../model/enums/transitivity'
import { convertVoice, voices } from '../../model/enums/voice'

export interface CreateProjectModalProps {
	onClose: () => void
}

interface FormaProps {
	state: InfoState
	setState: (state: Partial<InfoState>) => void
}

const Forma = ({ state, setState }: FormaProps) => {
	/*
    "POS": "string",
    "animacy": "string",
    "case": "string",
    "gender": "string",
    "mood": "string",
    "number": "string",
    "person": "string",
    "tense": "string",
    "transitivity": "string",
    "voice": "string"
  */

	return (
		<div className={styles.formaModal}>
			<div className={styles.wrapper}>
				<input
					value={state.word}
					onChange={(e) => setState({ word: e.target.value })}
					className={styles.searchInput}
					placeholder="Слово..."
				/>
			</div>
			<div className={styles.wrapper}>
				<select value={state.POS} onChange={(e) => setState({ POS: e.target.value })} className={styles.searchInput}>
					<option defaultValue={''} defaultChecked>
						Выберете часть речи
					</option>
					{posts.map((value) => (
						<option key={value} value={value}>
							{convertPost(value as any)}
						</option>
					))}
				</select>
			</div>
			{[POST.NOUN, POST.NUMR].includes(state.POS as any) && (
				<div className={styles.wrapper}>
					<select
						value={state.animacy}
						onChange={(e) => setState({ animacy: e.target.value })}
						className={styles.searchInput}
						placeholder="Слово..."
					>
						{animacies.map((value) => (
							<option key={value} value={value}>
								{convertAnimacy(value as any)}
							</option>
						))}
					</select>
				</div>
			)}
			{[POST.NOUN, POST.ADJF, POST.PRTF, POST.NUMR, POST.NPRO].includes(state.POS as any) && (
				<div className={styles.wrapper}>
					<select
						value={state.case}
						onChange={(e) => setState({ case: e.target.value })}
						className={styles.searchInput}
						placeholder="Слово..."
					>
						{cases.map((value) => (
							<option key={value} value={value}>
								{convertCase(value as any)}
							</option>
						))}
					</select>
				</div>
			)}
			{[POST.NOUN, POST.ADJF, POST.ADJS, POST.PRTF, POST.PRTS, POST.NPRO].includes(state.POS as any) && (
				<div className={styles.wrapper}>
					<select
						value={state.gender}
						onChange={(e) => setState({ gender: e.target.value })}
						className={styles.searchInput}
						placeholder="Слово..."
					>
						{genders.map((value) => (
							<option key={value} value={value}>
								{convertGender(value as any)}
							</option>
						))}
					</select>
				</div>
			)}
			{[POST.VERB].includes(state.POS as any) && (
				<div className={styles.wrapper}>
					<select
						value={state.mood}
						onChange={(e) => setState({ mood: e.target.value })}
						className={styles.searchInput}
						placeholder="Слово..."
					>
						{moods.map((value) => (
							<option key={value} value={value}>
								{convertMood(value as any)}
							</option>
						))}
					</select>
				</div>
			)}
			{[POST.NOUN, POST.ADJF, POST.ADJS, POST.VERB, POST.PRTF, POST.PRTS, POST.NPRO].includes(state.POS as any) && (
				<div className={styles.wrapper}>
					<select
						value={state.number}
						onChange={(e) => setState({ number: e.target.value })}
						className={styles.searchInput}
						placeholder="Слово..."
					>
						{numbers.map((value) => (
							<option key={value} value={value}>
								{convertNumber(value as any)}
							</option>
						))}
					</select>
				</div>
			)}
			{[POST.VERB, POST.NPRO].includes(state.POS as any) && (
				<div className={styles.wrapper}>
					<select
						value={state.person}
						onChange={(e) => setState({ person: e.target.value })}
						className={styles.searchInput}
						placeholder="Слово..."
					>
						{persons.map((value) => (
							<option key={value} value={value}>
								{convertPerson(value as any)}
							</option>
						))}
					</select>
				</div>
			)}
			{[POST.VERB, POST.PRTF, POST.PRTS, POST.GRND].includes(state.POS as any) && (
				<div className={styles.wrapper}>
					<select
						value={state.tense}
						onChange={(e) => setState({ tense: e.target.value })}
						className={styles.searchInput}
						placeholder="Слово..."
					>
						{tenses.map((value) => (
							<option key={value} value={value}>
								{convertTense(value as any)}
							</option>
						))}
					</select>
				</div>
			)}
			{[POST.VERB, POST.INFN, POST.PRTF, POST.GRND].includes(state.POS as any) && (
				<div className={styles.wrapper}>
					<select
						value={state.transitivity}
						onChange={(e) => setState({ transitivity: e.target.value })}
						className={styles.searchInput}
						placeholder="Слово..."
					>
						{transitivities.map((value) => (
							<option key={value} value={value}>
								{convertTransitivity(value as any)}
							</option>
						))}
					</select>
				</div>
			)}
			{[POST.VERB, POST.INFN, POST.PRTF, POST.GRND].includes(state.POS as any) && (
				<div className={styles.wrapper}>
					<select
						value={state.voice}
						onChange={(e) => setState({ voice: e.target.value })}
						className={styles.searchInput}
						placeholder="Слово..."
					>
						{voices.map((value) => (
							<option key={value} value={value}>
								{convertVoice(value as any)}
							</option>
						))}
					</select>
				</div>
			)}
		</div>
	)
}

export const CreateProjectModal: React.FC<CreateProjectModalProps> = React.memo((props: CreateProjectModalProps) => {
	const { onClose } = props

	return (
		<Modal<InfoState, unknown>
			handler={actionHandler}
			validationSchema={createProjectValidationSchema}
			close={onClose}
			submitButtonTitle="Сохранить"
			initialState={initialState as any}
		>
			{({ changeState, state }) => <Forma setState={changeState} state={state} />}
		</Modal>
	)
})
