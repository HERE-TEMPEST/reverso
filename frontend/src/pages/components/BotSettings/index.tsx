// eslint-disable-next-line eslint-comments/disable-enable-pair
/* eslint-disable no-undef */
import { Button } from '@shared/ui'
import styles from './BotSettings.module.scss'
import { useEffect, useState } from 'react'

const exampleText = `Как дела `

export const BotSettingsPage = () => {
	const [speed, setSpeed] = useState(0)
	const [volume, setVolume] = useState(0)
	const [tonal, setTonal] = useState(0)

	const [voice, setVoice] = useState('')

	const [voices, setVoices] = useState<SpeechSynthesisVoice[]>([])

	useEffect(() => {
		const savedValue = localStorage.getItem('bot-speech')
			? JSON.parse(localStorage.getItem('bot-speech')!)
			: {
					speed: 0,
					volume: 0,
					tonal: 0,
					voice: ''
			  }

		setSpeed(() => savedValue.speed)
		setTonal(() => savedValue.tonal)
		setVolume(() => savedValue.volume)
		setVoice(() => savedValue.voice)
	}, [])

	useEffect(() => {
		window.speechSynthesis.onvoiceschanged = () => {
			const _ = window.speechSynthesis.getVoices()

			setVoices(() => [..._])
		}

		return () => {
			window.speechSynthesis.onvoiceschanged = null
		}
	}, [])

	const onCheckVoice = () => {
		window.speechSynthesis.cancel()

		if (!window.speechSynthesis.getVoices().find((_voice) => _voice.voiceURI === voice)) {
			return
		}

		const utterance = new SpeechSynthesisUtterance(exampleText)

		utterance.voice = window.speechSynthesis.getVoices().find((_voice) => _voice.voiceURI === voice)!
		utterance.pitch = tonal
		utterance.rate = speed
		utterance.volume = volume

		// speak that utterance
		window.speechSynthesis.speak(utterance)
	}

	const onSaveVoice = () => {
		localStorage.setItem(
			'bot-speech',
			JSON.stringify({
				tonal,
				speed,
				volume,
				voice
			})
		)
	}

	return (
		<div className={styles.wrapper}>
			<div className={styles.text}>{exampleText}</div>
			<div className={styles.settings}>
				<div className={styles.setting}>
					Голос
					<select value={voice} onChange={(e) => setVoice(e.target.value)}>
						<option value={''} disabled>
							Выберете языка
						</option>
						{voices.map((value, key) => (
							<option key={key} value={value.voiceURI}>
								{value.name}
							</option>
						))}
					</select>
				</div>
				<div className={styles.setting}>
					Тональность {tonal}
					<input type="range" value={tonal} min={0.1} max={2} step={0.1} onChange={(e) => setTonal(Number(e.target.value))} />
				</div>
				<div className={styles.setting}>
					Громкость {volume}
					<input type="range" value={volume} min={0} max={1} step={0.1} onChange={(e) => setVolume(Number(e.target.value))} />
				</div>
				<div className={styles.setting}>
					Скорость {speed}
					<input type="range" value={speed} min={0.1} max={2} step={0.1} onChange={(e) => setSpeed(Number(e.target.value))} />
				</div>
			</div>
			<div className={styles.btns}>
				<Button className={styles.btn} onClick={onCheckVoice} title="Послушать пример" />
				<Button className={styles.btn} onClick={onSaveVoice} title="Сохранить настройки" />
			</div>
		</div>
	)
}
