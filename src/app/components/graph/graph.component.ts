import { Component, OnInit } from '@angular/core'
import { EMPTY, Observable, of } from 'rxjs';
import { GraphComponentService } from './graph.component.service';


// interface GraphOptionsObject {
//   legend?: boolean
//   showLabels?: boolean
//   animations?: boolean
//   xAxis?: boolean
//   yAxis?: boolean
//   showYAxisLabel?: boolean
//   showXAxisLabel?: boolean
//   xAxisLabel?: string
//   yAxisLabel?: string
//   timeline?: boolean
//   colorScheme?: {[key: string]: Array<string>}
//   showXAxis?: boolean
//   showYAxis?: boolean
//   gradient?: boolean
//   showLegend?:boolean
// }

interface GraphObject {
  options: any,
  data$: Observable<any>,
  type: 'bar' | 'line',
}

@Component({
  selector: 'app-graph',
  templateUrl: './graph.component.html',
  styleUrls: ['./graph.component.sass']
})
export class GraphComponent implements OnInit {
  graphsObject: Array<GraphObject> = [
    {
      type: 'line',
      options: {
        legend: true,
        showLabels: true,
        animations: true,
        xAxis: true,
        yAxis: true,
        showYAxisLabel: true,
        showXAxisLabel: true,
        xAxisLabel: 'Date',
        yAxisLabel: 'Value',
        timeline: true,

        colorScheme: {
          domain: ['#5AA454', '#E44D25', '#CFC0BB', '#7aa3e5', '#a8385d', '#aae3f5']
        }
      },
      data$: this.componentService.getData()
    },
    {
      type: 'bar',
      options: {
        showXAxis: true,
        showYAxis: true,
        gradient: false,
        showLegend: true,
        showXAxisLabel: true,
        xAxisLabel: 'Date',
        showYAxisLabel: true,
        yAxisLabel: 'Value',
        legendTitle: 'Date',
        colorScheme: {
          domain: ['#5AA454', '#A10A28', '#C7B42C', '#AAAAAA']
        }
      },
      data$: this.componentService.getData(),
    },
  ]
  currentGraphIndex: number = 0

  constructor(private componentService: GraphComponentService) {
  }

  ngOnInit() {
  }

  switchGraph() {
    const indexNext = (this.currentGraphIndex+1) % this.graphsObject.length
    this.currentGraphIndex = indexNext
  }

  onSelect(event: any) {
    console.log(event);
  }
}
