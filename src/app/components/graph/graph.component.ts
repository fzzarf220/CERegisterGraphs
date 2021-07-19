import { Component, OnInit } from '@angular/core'
import { Observable } from 'rxjs';
import { GraphComponentService } from './graph.component.service';
import { GraphType } from './graph.interface';


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
  type: GraphType
}

@Component({
  selector: 'app-graph',
  templateUrl: './graph.component.html',
  styleUrls: ['./graph.component.sass']
})
export class GraphComponent implements OnInit {
  graphTypes: typeof GraphType = GraphType
  graphsObject: Array<GraphObject> = [
    {
      type: GraphType.LINE,
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
          domain: ['#9670f7', '#5806fc', '#9227e9', '#53d2e5']
        }
      },
      data$: this.componentService.getData(GraphType.LINE)
    },
    {
      type: GraphType.BAR,
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
          domain: ['#9670f7', '#5806fc', '#9227e9', '#53d2e5']
        }
      },
      data$: this.componentService.getData(GraphType.BAR),
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
