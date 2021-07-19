import { Injectable } from "@angular/core";
import { Observable, of } from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class GraphComponentService {
	private data: {[key: string]: {[key: string]: number}} = {
		'Company A': {
			'2019-01-01': 6031690.89,
			'2019-04-01': 6814949.07,
			'2019-07-01': 6331286.67,
			'2019-10-01': 9021847.94,
			'2020-01-01': 6590475.57,
			'2020-04-01': 8131114.13,
			'2020-07-01': 8475237.09,
			'2020-10-01': 13157888.35
		}
}

	getData(): Observable<any> {
		const transformSet = (set: {[key: string]: number}): Array<{name: string, value: number}> => {
			return Object
			.keys(set)
			.reduce((a, name: string) => {
				const value: number = set[name]
				a.push({name, value})
				return a
			}, [] as Array<{name: string, value: number}>)
		} 

		const data: any = Object
			.keys(this.data)
			.reduce((acc, name: string) => {
				const set: {[key: string]: number} = this.data[name]
				const series: Array<{name: string, value: number}> = transformSet(set)

				acc.push({name, series})
				return acc
			}, [] as Array<any>)

		console.log(data)
		return of(data)
	}
}