import React from 'react';
import moment from 'moment';
// import { StyleSheet, View } from 'react-native';
import { Body, Container, Footer, FooterTab, Button, Icon, Header, Content, List, Title, Text, Separator } from 'native-base';
import { Constants, Location, Permissions } from 'expo';

import Departures from './Departures';

export default class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  componentDidMount() {
    this.setState({ time: moment().format('HH:mm:ss')})
    this.interval = setInterval(() => this.setState({ time: moment().format('HH:mm:ss') }), 15000);
    // let location = await Location.getCurrentPositionAsync({});
    // this.setState({ location });
  }
  render() {
    return (
      <Container>
        <Header>
          <Body>
            <Title>Po-Chun Go To Work</Title>
          </Body>
          {/* <Text>Last Update: {this.state.time}</Text> */}
        </Header>
        <Content>
          <List onRefresh={() => this.setState({ time: 'Hello World' })}>
            <Separator bordered>
              <Text>Last Update: {this.state.time}</Text>
            </Separator>
            <Departures
              station="900000020201"
              lines={['u7', 's41']}
              // directions={['U Rudow', 'Ringbahn S 41']}
            />
            <Departures
              station="900000190701"
              lines={['165', '265']}
              // directions={['U Märkisches Museum']}
            />
            <Departures
              station="900000017104"
              lines={['u1']}
              // directions={['S+U Warschauer Str.']}
            />
          </List>
        </Content>
        {/* <Footer>
          <FooterTab>
            <Button>
              <Icon name="apps" />
            </Button>
            <Button>
              <Icon name="camera" />
            </Button>
            <Button active>
              <Icon active name="navigate" />
            </Button>
            <Button>
              <Icon name="person" />
            </Button>
          </FooterTab>
        </Footer> */}
      </Container>
    );
  }
}
