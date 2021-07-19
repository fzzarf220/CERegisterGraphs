import { Component, OnInit } from '@angular/core'
import { Observable } from 'rxjs';
import { GraphComponentService } from './graph.component.service';
import { GraphType } from './graph.interface';

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
          domain: ['#9670f7', '#9227e9', '#5806fc', '#53d2e5']
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
          domain: ['#9670f7', '#9227e9', '#5806fc', '#53d2e5']
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
