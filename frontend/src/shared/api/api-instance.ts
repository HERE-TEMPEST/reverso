import axios from 'axios'
import { apiConfig } from '../config'

export const apiInstance = axios.create({
	baseURL: apiConfig.backendUri
})
