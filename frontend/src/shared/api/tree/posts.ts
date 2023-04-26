import { apiInstance } from '../api-instance'
import { uris } from '../apis'

export const parseText = async ({ line }: { line: string }): Promise<any> => {
	console.log({ line })
	const { data } = await apiInstance.post(uris.posts.parseTree, [
		{
			text: line
		}
	])

	console.log({ data })

	/*
  {
  "msg": [
    [
      {
        "str": "(S (NP (N мама)) (VP (V ела) (NP (N кашу))))",
        "tree": "      S          \n  ____|___        \n |        VP     \n |     ___|___    \n NP   |       NP \n |    |       |   \n N    V       N  \n |    |       |   \nмама ела     кашу\n",
        "path": "images/мама_ела_кашу_0.png"
      }
    ]
  ]
}
  */

	const { msg } = data
	const [firstData] = msg

	if (!firstData) {
		return {
			imageUrl: '',
			line: 'Не спарсилось',
			treeLine: 'Не спарсилось'
		}
	}
	const [result] = firstData

	if (!result) {
		return {
			imageUrl: 'Не спарсилось',
			line: 'Не спарсилось',
			treeLine: 'Не спарсилось'
		}
	}

	return {
		imageUrl: result.path,
		line: result.str,
		treeLine: result.tree
	}
}

// Мама мыла раму
