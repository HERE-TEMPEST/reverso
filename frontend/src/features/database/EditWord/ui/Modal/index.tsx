import React from 'react'

import { Modal } from '@shared/ui'

import { InfoState, actionHandler, addNewWordValidationSchema } from '../../model'

import styles from './Modal.module.scss'
import { convertPost, POST, posts } from '../../model/enums/pos'
import { animacies, Animacy, convertAnimacy } from '../../model/enums/animacy'
import { Case, cases, convertCase } from '../../model/enums/case'
import { convertGender, Gender, genders } from '../../model/enums/gender'
import { convertMood, Mood, moods } from '../../model/enums/mood'
import { convertNumber, MNumber, numbers } from '../../model/enums/number'
import { convertPerson, Person, persons } from '../../model/enums/person'
import { convertTense, Tense, tenses } from '../../model/enums/tense'
import { convertTransitivity, transitivities, Transitivity } from '../../model/enums/transitivity'
import { convertVoice, Voice, voices } from '../../model/enums/voice'

export interface EditWordModalProps {
	onClose: () => void
	initialState: InfoState
}

interface FormaProps {
	state: InfoState
	setState: (state: Partial<InfoState>) => void
	errors: Record<keyof InfoState, string | undefined> | null
}

const Forma = ({ state, setState, errors }: FormaProps) => {
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
					disabled
					style={{ opacity: 0.6 }}
					value={state.word}
					onChange={(e) => setState({ word: e.target.value })}
					className={styles.searchInput}
					placeholder="Слово..."
				/>
			</div>
			<div className={styles.wrapper}>
				<select
					value={state.POS}
					onChange={(e) =>
						setState({
							POS: e.target.value as any,
							amount: 0,
							animacy: undefined,
							case: undefined,
							gender: undefined,
							mood: undefined,
							number: undefined,
							person: undefined,
							tense: undefined,
							transitivity: undefined,
							voice: undefined
						})
					}
					defaultValue={POST.NOUN}
					className={styles.searchInput}
				>
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
						onChange={(e) => setState({ animacy: e.target.value as any })}
						className={styles.searchInput}
						placeholder="Слово..."
						defaultValue={Animacy.anim}
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
						onChange={(e) => setState({ case: e.target.value as any })}
						className={styles.searchInput}
						placeholder="Слово..."
						defaultValue={Case.ablt}
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
						onChange={(e) => setState({ gender: e.target.value as any })}
						className={styles.searchInput}
						placeholder="Слово..."
						defaultValue={Gender.femn}
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
						onChange={(e) => setState({ mood: e.target.value as any })}
						className={styles.searchInput}
						placeholder="Слово..."
						defaultValue={Mood.impr}
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
						onChange={(e) => setState({ number: e.target.value as any })}
						className={styles.searchInput}
						placeholder="Слово..."
						defaultValue={MNumber.plur}
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
						onChange={(e) => setState({ person: e.target.value as any })}
						className={styles.searchInput}
						placeholder="Слово..."
						defaultValue={Person['1per']}
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
						onChange={(e) => setState({ tense: e.target.value as any })}
						className={styles.searchInput}
						placeholder="Слово..."
						defaultValue={Tense.futr}
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
						onChange={(e) => setState({ transitivity: e.target.value as any })}
						className={styles.searchInput}
						placeholder="Слово..."
						defaultValue={Transitivity.intr}
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
						onChange={(e) => setState({ voice: e.target.value as any })}
						className={styles.searchInput}
						placeholder="Слово..."
						defaultValue={Voice.actv}
					>
						{voices.map((value) => (
							<option key={value} value={value}>
								{convertVoice(value as any)}
							</option>
						))}
					</select>
				</div>
			)}
			{errors && <div className={styles.errorMsg}>{errors.word ?? errors.POS}</div>}
		</div>
	)
}

export const EditWordModal: React.FC<EditWordModalProps> = React.memo((props: EditWordModalProps) => {
	const { onClose, initialState } = props

	return (
		<Modal<InfoState, unknown>
			handler={actionHandler}
			validationSchema={addNewWordValidationSchema}
			close={onClose}
			submitButtonTitle="Редактировать"
			initialState={initialState as any}
		>
			{({ changeState, state, errors }) => <Forma errors={errors} setState={changeState} state={state} />}
		</Modal>
	)
})
