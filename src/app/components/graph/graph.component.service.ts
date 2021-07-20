import { Injectable } from "@angular/core";
import { Observable, of } from "rxjs";
import { GraphType } from "./graph.interface";

type DataRawSetObject = {[key: string]: number}
type DataGraphSetObject = Array<{name: string, value: number}>
type DataGraphSeriesObject =  Array<{name: string, series: DataGraphSetObject}>


@Injectable({
  providedIn: 'root'
})
export class GraphComponentService {
	private data: {[key: string]: DataRawSetObject} = {
		'Company A': {
			'2019-01-01': 6031690.89,
			'2019-04-01': 6814949.07,
			'2019-07-01': 6331286.67,
			'2019-10-01': 9021847.94,
			'2020-01-01': 6590475.57,
			'2020-04-01': 8131114.13,
			'2020-07-01': 8475237.09,
			'2020-10-01': 13157888.35
		},
		'Company B': {
			'2019-01-01': 1031690.89,
			'2019-04-01': 3814949.07,
			'2019-07-01': 3331286.67,
			'2019-10-01': 4021847.94,
			'2020-01-01': 1590475.57,
			'2020-04-01': 3131114.13,
			'2020-07-01': 9475237.09,
			'2020-10-01': 6157888.35
		},
		'Company C': {
			'2019-01-01': 316901.89,
			'2019-04-01': 8149493.07,
			'2019-07-01': 3312863.67,
			'2019-10-01': 218474.94,
			'2020-01-01': 5904751.57,
			'2020-04-01': 1311143.13,
			'2020-07-01': 4752379.09,
			'2020-10-01': 1578886.35
		},
		'Company D': {
			'2019-01-01': 639011.89,
			'2019-04-01': 4894193.07,
			'2019-07-01': 1328363.67,
			'2019-10-01': 824714.94,
			'2020-01-01': 547951.57,
			'2020-04-01': 1111343.13,
			'2020-07-01': 5423779.09,
			'2020-10-01': 7188586.35
		}
	}

	getDataLine(): Observable<DataGraphSeriesObject> {
		const transformSet = (set: DataRawSetObject): DataGraphSetObject => {
			return Object
			.keys(set)
			.reduce((a, name: string) => {
				const value: number = set[name]
				a.push({name, value})
				return a
			}, [] as DataGraphSetObject)
		} 

		const data: any = Object
			.keys(this.data)
			.reduce((acc, name: string) => {
				const set: DataRawSetObject = this.data[name]
				const series: DataGraphSetObject = transformSet(set)

				acc.push({name, series})
				return acc
			}, [] as DataGraphSeriesObject)

		return of(data)
	}

	getDataBar(): Observable<DataGraphSeriesObject> {
		const transformSeries = (setRawData: DataRawSetObject, setName: string, data: DataGraphSeriesObject = []): DataGraphSeriesObject => {
			return Object
				.keys(setRawData)
				.reduce((acc: DataGraphSeriesObject, name: string) => {
					let seriesIndex = acc.findIndex(v => v.name === name)

					if (seriesIndex <= 0) {
						seriesIndex = acc.length
						acc.push({name, series: []})
					}

					const value: number = setRawData[name]
					const set = {name: setName, value}
					acc[seriesIndex].series.push(set)
					return acc
				}, data)
		} 

		const data: any = Object
			.keys(this.data)
			.reduce((acc, name: string) => {
				const set: DataRawSetObject = this.data[name]
				acc = transformSeries(set, name, acc)
				return acc
			}, [] as DataGraphSeriesObject)

		return of(data)
	}

	getData(type: GraphType): Observable<any> {
		if (type === GraphType.BAR) return this.getDataBar()
		return this.getDataLine()
	}
}