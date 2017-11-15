import React from 'react';
import moment from 'moment';
import { View } from 'react-native';
import { ListItem, Left, Body, Right, Thumbnail, Text } from 'native-base';

const iconUrl = {
  suburban: 'https://upload.wikimedia.org/wikipedia/commons/thumb/e/e7/S-Bahn-Logo.svg/350px-S-Bahn-Logo.svg.png',
  subway: 'https://upload.wikimedia.org/wikipedia/commons/thumb/1/16/U-Bahn_Wien.svg/283px-U-Bahn_Wien.svg.png',
  bus: 'https://upload.wikimedia.org/wikipedia/commons/thumb/8/83/BUS-Logo-BVG.svg/500px-BUS-Logo-BVG.svg.png',
};

class Departures extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
    };
    this.getData = this.getData.bind(this);
  }

  componentDidMount() {
    this.getData();
    this.interval = setInterval(this.getData, 15000);
  }

  getData() {
    const { station, lines, directions } = this.props;
    fetch(`https://vbb.transport.rest/stations/${station}/departures`)
      .then(res => res.json())
      .then(data => data.filter(d => !lines || lines.includes(d.line.id)))
      .then(data => data.filter(d => !directions || directions.includes(d.direction)))
      .then(departures => this.setState({ departures }));
  }

  render() {
    const { departures } = this.state;
    if (!departures || !departures.length) return null;
    return (
      <View>
        <ListItem itemDivider>
          <Text>{departures[0].station.name}</Text>
        </ListItem>
        {this.state.departures.map(line =>
          (
            <ListItem avatar>
              <Left>
                <Thumbnail source={{ uri: iconUrl[line.line.product] }} />
              </Left>
              <Body>
                <Text>{line.line.name} ({line.direction})</Text>
                <Text note>{moment(line.when).subtract(line.delay, 'second').format('HH:mm')}
                  <Text note style={{ color: 'red' }}>
                    {line.delay ?
                      line.delay > 0 ? `+${line.delay / 60}` : line.delay / 60
                      : null}
                  </Text>
                </Text>

              </Body>
              <Right>
                <Text note>{moment(line.when).fromNow()}</Text>
              </Right>
            </ListItem>))
        }
      </View>
    );
  }
}

export default Departures;
