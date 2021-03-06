import * as React from 'react';
import glamorous from 'glamorous';
import { Grid, Container, Button, Icon } from 'semantic-ui-react';
import {SelectedCountries, ColorBy, HighlightByIncome, HighlightRegion,
  PrintWidget, BubbleChartSize, AxisSettings
  } from '../../atoms/BubbleChart';
import Slider from '../YearSlider';
import { red } from '../../theme/semantic';
import ScatterChart from '../../atoms/ScatterChart';

const ChartContainer = glamorous.div({
  margin: '2em 0 3em',
  height: '500px',
  position: 'relative',
});
const AnnotationContainer = glamorous.div({
  position: 'absolute',
  right: 0,
  top: 0,
  width: '400px',
});
const PlayContainer = glamorous.div({
  marginTop: '-12px',
});
const Link = glamorous.a({
  color: red,
  marginTop: '25px',
  display: 'block',
  marginBottom: '20px',
});

export interface Props  {
  click: () => void;
  loading?: boolean;
  startYear: number;
  maxYear: number;
  minYear: number;
  points: Array<{year: number; }>;
  annotation: object;
  config: object;
  indicators: object[];
  colorables: Array<{value: any; }>;
  regions: Array<{name: string; color: string; }>;
  incomeGroups: Array<{name: string; color: string; }>;
  countries: object[];
  data?: object;
}
export interface State  {
  year: number;
  colorBy: string;
  showMoreOptions: boolean;
  isPlaying: boolean;
  pointsPerYear: object;
  incomeGroupColor: object;
  regionColor: object;
}
class BubbleChartWidget extends React.Component<Props> {
  public intervalId: any; // both timer & number types seem to error out
  public state: State;
  constructor(props: Props) {
    super(props);
    this.componentWillUpdate(props);
  }
  public componentWillUpdate(props: Props) {
    const colorBy = this.state ? this.state.colorBy : 'region';
    const regionColor = this.props.regions.reduce(
      (colors, region) => ({
        ...colors,
        [region.name]: region.color,
      }),
      {},
    );
    const incomeGroupColor = this.props.incomeGroups.reduce(
      (colors, region) => ({
        ...colors,
        [region.name]: region.color,
      }),
      {},
    );
    const colorHash = colorBy === 'region' ? regionColor : incomeGroupColor;
    const pointsPerYear = this.getPointsPerYear(colorBy, colorHash);
    this.state = {
      year: props.startYear,
      colorBy,
      showMoreOptions: false,
      isPlaying: false,
      incomeGroupColor,
      regionColor,
      pointsPerYear,
    };
  }
  public componentWillUnmount() {
    clearInterval(this.intervalId);
  }
  public onChangeColorBy(colorBy: string) {
    return () => {
      const colorHash = colorBy === 'region' ? this.state.regionColor : this.state.incomeGroupColor;
      const pointsPerYear = this.getPointsPerYear(colorBy, colorHash);
      this.setState({
        colorBy,
        pointsPerYear,
      });
    };
  }
  public getPointsPerYear(colorBy: string, colorHash: object) {
    return this.props.points
      .map(p => {
        return { ...p, color: colorHash[colorBy] };
      })
      .reduce(
        (all, d) => ({
          ...all,
          [d.year]: [...(all[d.year] || []), d],
        }),
        {},
      );
  }
  public setYear(year: number) {
    this.setState({
      year: +year,
    });
  }
  public toggleMoreOptions() {
    return () => {
      this.setState({
        showMoreOptions: !this.state.showMoreOptions,
      });
    };
  }
  public play() {
    clearInterval(this.intervalId);
    this.setState({ isPlaying: true });
    let year = this.state.year;
    this.intervalId = setInterval(() => {
      if (Math.floor(year) === this.props.maxYear) {
        clearInterval(this.intervalId);
        this.setState({ isPlaying: true });
      }

      this.setState({
        year,
        ...(Math.floor(year) !== this.state.year ? {} : {}),
      });
      year += 0.01;
    }, 25);
  }
  public pause() {
    clearInterval(this.intervalId);
    this.setState({
      isPlaying: false,
      year: Math.floor(this.state.year),
    });
  }
  public pauseOrPlay() {
      this.state.isPlaying ? this.pause() : this.play();
  }
  public render() {
    const {
      minYear,
      maxYear,
      config,
      indicators,
      incomeGroups,
      colorables,
      regions,
      countries,
    } = this.props;
    return (
      <Container>
        <Grid>
          <Grid.Row>
            <Grid.Column computer={12} tablet={12} mobile={16}>
              <ChartContainer>
                <ScatterChart
                  height="500px"
                  config={config}
                  data={this.state.pointsPerYear[Math.floor(+this.state.year)] || []}
                />
                <AnnotationContainer>
                  {this.props.annotation}
                </AnnotationContainer>
              </ChartContainer>
              <Grid>
                <Grid.Column width={1}>
                  <PlayContainer>
                    <Button
                      icon={this.state.isPlaying ? 'pause' : 'play'}
                      onClick={this.pauseOrPlay}
                    />
                  </PlayContainer>
                </Grid.Column>
                <Grid.Column width={15}>
                  <Slider
                    onChange={this.setYear}
                    minimum={minYear}
                    maximum={maxYear}
                    step={1}
                    position={this.state.year}
                  />
                </Grid.Column>
              </Grid>
            </Grid.Column>
            <Grid.Column computer={4} tablet={4} mobile={16}>
              <BubbleChartSize options={indicators} />
              <SelectedCountries
                placeholder="Select Country"
                options={countries}
              />
              <ColorBy options={colorables} onChange={this.onChangeColorBy} />
              <HighlightByIncome
                options={incomeGroups}
                colorBy={this.state.colorBy === 'income-group'}
                onChange={this.onChangeColorBy('income-group')}
              />
              <HighlightRegion
                options={regions}
                colorBy={this.state.colorBy === 'region'}
                onChange={this.onChangeColorBy('region')}
              />
              <Link onClick={this.toggleMoreOptions()}>
                <Icon name="plus" /> More Info
              </Link>
              {this.state.showMoreOptions
                ? <div>
                  <AxisSettings title="X-axis settings" />
                  <AxisSettings title="Y-axis settings" />
                </div>
                : false}
              <PrintWidget onClick={this.props.click} />
            </Grid.Column>
          </Grid.Row>
        </Grid>
      </Container>
    );
  }
}

export default BubbleChartWidget;
