import React, { Component } from "react";
import Event from "./Event";
import Track from "./Track";
import Output from "./Output";
import ErrorBoundary from "./ErrorBoundary";
import { FaFolder, FaSitemap, FaRegPlusSquare, FaSave } from "react-icons/fa";

import { Accordion, AccordionItem } from "react-light-accordion";

class App extends Component {
  constructor(props) {
    super(props);
  }

  componentWillMount() {
    this.setState({
      currenttrack: 1,
      game: {
        title: "Rob's Quest",
        startEventId: "1",
        events: [
          {
            id: 1,
            type: "receive",
            text: "Welcome to my new chatbot!",
            nextid: 2
          },
          {
            id: 2,
            type: "receive",
            text: "Do you want to start?",
            nextid: 1550525767796
          },
          {
            id: 50,
            type: "choose",
            text: "no text",
            options: [
              { text: "Sure, let's start!", nextid: 30 },
              { text: "Wait, what is this all about?", nextid: 40 }
            ]
          },
          {
            id: 30,
            type: "receive",
            text: "Good decicion?",
            nextid: 1550526018818
          },
          {
            id: 40,
            type: "receive",
            text: "Good decicion?",
            nextid: 1550525787131
          },
          { id: 50, type: "receive", nextid: -100, text: " text " },
          {
            id: 1550525767796,
            type: "receive",
            nextid: 50,
            text: " text efwefwef"
          },
          {
            id: 1550525787131,
            type: "receive",
            nextid: 1550525795619,
            text: " text "
          },
          {
            id: 22150368442,
            type: "receive",
            nextid: 1550525810903,
            text: "grggggggggggergerg erg erg"
          },
          {
            id: 1550525795619,
            type: "receive",
            nextid: 1550525796499,
            text: " text "
          },
          {
            id: 1550525796499,
            type: "choose",
            options: [
              {
                id: {
                  id: 1550525796500,
                  type: "receive",
                  nextid: null,
                  text: " text "
                },
                text: "dummy"
              },
              {
                id: {
                  id: 1550525796501,
                  type: "receive",
                  nextid: null,
                  text: " text "
                },
                text: "dummy"
              }
            ],
            nextid: -100
          },
          {
            id: 1550525810903,
            type: "choose",
            options: [
              {
                id: {
                  id: 1550525810904,
                  type: "receive",
                  nextid: null,
                  text: " text "
                },
                text: "dummy"
              },
              {
                id: {
                  id: 1550525810905,
                  type: "receive",
                  nextid: null,
                  text: " text "
                },
                text: "dummy"
              }
            ],
            nextid: -100
          },
          {
            id: 1550526018818,
            type: "receive",
            nextid: 1550526042301,
            text: " text "
          },
          {
            id: 1550526042301,
            type: "receive",
            nextid: 1550526043070,
            text: " text "
          },
          {
            id: 1550526043070,
            type: "choose",
            options: [
              {
                id: {
                  id: 1550526043071,
                  type: "receive",
                  nextid: null,
                  text: " text "
                },
                text: "dummy"
              },
              {
                id: {
                  id: 1550526043072,
                  type: "receive",
                  nextid: null,
                  text: " text "
                },
                text: "dummy"
              }
            ],
            nextid: -100
          }
        ],
        tracks: [
          { id: 1, title: "welcome" },
          { id: 30, title: "choice 1" },
          { id: 40, title: "choice 2" },
          { id: 22150368442, title: "hthtrhtr htrh trhrthh234" }
        ]
      }
    });
  }

  componentWillUpdate() {
    //console.log("will TRID: " + JSON.stringify(this.state.currenttrack));
  }

  componentDidUpdate() {
    /* 
    console.log(" did TRID: " + JSON.stringify(this.state.currenttrack));
    console.log("JSON: " + JSON.stringify(this.state.game.events));
    console.log("JSON: " + JSON.stringify(this.state.game.tracks));
*/
  }

  render() {
    return (
      <div style={appStyle}>
        <div style={leftEditStyle}>
          <pre>
            Game: {this.state.game.title} <br />
            Start Event: {this.state.game.startEventId}
            <br />
            Events: {this.state.game.events.length} <br />
          </pre>

          <div style={trackListStyle}>
            tracks
            <br />
            {this.state.game.tracks.map((item, index) => (
              <div key={index}>
                <button
                  style={
                    item.id === this.state.currenttrack
                      ? trackButtonSelectedStyle
                      : trackButtonStyle
                  }
                  onClick={this.changeTrackByEvent.bind(this)}
                  id={item.id}
                >
                  <small>{item.id}</small>
                  <br /> {item.title}
                </button>
              </div>
            ))}
            <br />
            <center>
              <button onClick={this.createNewTrack.bind(this)}>
                <FaRegPlusSquare /> add track
              </button>
            </center>
          </div>
        </div>
        <div style={{ width: "100%" }}>
          track-id: {this.state.currenttrack}{" "}
          <input
            type="text"
            value={this.getCurrentTrackTitle()}
            id={this.state.currenttrack}
            onChange={this.onChangeTrackTitle.bind(this)}
          />
          {this.getEventList(this.state.currenttrack).map((item, index) => (
            <Event
              text={item.text}
              type={item.type}
              id={item.id}
              nextid={item.nextid}
              options={item.options}
              game={this.props.game}
              onChangeText={this.editEventText.bind(this)}
              //onChangeId={this.props.onChangeId.bind(this)}
              onChangeNext={this.editNextId.bind(this)}
              //onAddReceive={this.addReceive.bind(this)}
              pushNewEvent={this.pushNewEvent.bind(this)}
              createOption={this.createOption.bind(this)}
              dropEvent={this.dropEvent.bind(this)}
              tracks={this.state.game.tracks}
            />
          ))}
        </div>
        <div>
          <textarea style={jsonStyle} value={JSON.stringify(this.state.game)} />
          <br />
          <button onClick={this.saveGameToFile.bind(this)}>
            <FaSave />
          </button>
        </div>
      </div>
    );
  }

  changeTrackByEvent(event) {
    //console.log("switch to track " + event.target.id);
    if (event.target.id > 0) {
      this.setState({
        currenttrack: Number(event.target.id)
      });
    }
  }

  changeTrackById(pid) {
    //    console.log("switch to track " + pid);
    if (pid > 0) {
      this.setState({
        currenttrack: Number(pid)
      });
    }
  }

  createNewTrack(event) {
    console.log("create new track");
    let pevent = this.getNewEvent();
    pevent.nextid = -100;
    this.setState({
      game: {
        ...this.state.game,
        events: [...this.state.game.events, pevent],
        tracks: [
          ...this.state.game.tracks,
          { id: pevent.id, title: pevent.text }
        ]
      }
    });
    this.changeTrackById(pevent.id);
  }

  onChangeTrackTitle(event) {
    //console.log("change track title");
    let tracks_tmp = this.state.game.tracks;
    let track = this.findArrayElementById(tracks_tmp, event.target.id);
    if (track !== undefined) {
      //console.log("track edit: " + track.title);
      track.title = event.target.value;
      this.setState({
        game: {
          ...this.state.game,
          events: this.state.game.events,
          tracks: tracks_tmp
        }
      });
    } else {
      console.log("track not found with id " + event.target.id);
    }
  }

  getCurrentTrackTitle() {
    return this.findArrayElementById(
      this.state.game.tracks,
      this.state.currenttrack
    ).title;
    //return "track title"
  }

  findArrayElementById(array, id) {
    return array.find(element => {
      return String(element.id) === String(id);
    });
  }

  dropEvent(e) {
    //console.log(e.target.id);
    console.log("dropping " + e.target.id);
  }

  getEventList(starteventid) {
    let e = this.findArrayElementById(this.state.game.events, starteventid);

    let list = [e];
    //console.log(list);

    /*
    if (e === undefined) {
      return list;
    }
*/
    while (e.nextid > -100) {
      e = this.findArrayElementById(this.state.game.events, e.nextid);
      list.push(e); //console.log(e);
    }

    return list;
  }

  pushNewEvent(pevent) {
    //console.log("pushing new event in App...");
    this.setState({
      game: {
        ...this.state.game,
        events: [...this.state.game.events, pevent]
      }
    });
  }

  createOption(pevent) {
    let pid = pevent.target.id;
    let events_tmp = this.state.game.events;
    let options_tmp;

    events_tmp.forEach(function(et) {
      if (String(et.id) === String(pid)) {
        options_tmp = et.options;
        options_tmp.push({ nextid: "5345435", text: "glgre " });
        //console.log(et);
      }
    });

    event_tmp.options = options_tmp;

    //console.log(events_tmp);
    this.setState({
      game: {
        ...this.state.game,
        events: events_tmp
      }
    });

    this.forceUpdate();
  }

  // generate Event
  getNewEvent() {
    const dateTime = Date.now();
    const timestamp = Math.floor(dateTime / 70);
    return {
      id: timestamp,
      type: "receive",
      nextid: null,
      text: "..."
    };
  }

  editEventText(pid, pvalue) {
    // copy game:

    let events_tmp = this.state.game.events;

    events_tmp.forEach(function(et) {
      if (String(et.id) === String(pid)) {
        et.text = pvalue;
      }
    });

    //console.log(events_tmp);
    this.setState({
      game: {
        ...this.state.game,
        events: events_tmp
      }
    });
  }

  editNextId(pid, pvalue) {
    // copy game:

    let events_tmp = this.state.game.events;

    events_tmp.forEach(function(et) {
      if (String(et.id) === String(pid)) {
        et.nextid = pvalue;
      }
    });

    //console.log(events_tmp);
    this.setState({
      game: {
        events: events_tmp
      }
    });
  }

  saveGameToFile() {
    console.log("saving game to file...");
    const writeJsonFile = require("write-json-file");
    (async () => {
      await writeJsonFile("game.json", this.state.game);
    })();
    var fs = require("fs");
    fs.writeFile("test.txt", this.state.game, function(err) {
      if (err) {
        console.log(err);
      }
    });
  }
}

const appStyle = {
  color: "black",
  backgroundColor: "#ffffff",
  fontFamily: "Courier",
  display: "flex"
};

const jsonStyle = {
  color: "black",
  backgroundColor: "#ffffff",
  fontFamily: "Courier",
  display: "",
  width: "100%",
  height: "200px"
};

const trackListStyle = {
  width: "100%",
  backgroundColor: "#ffffff"
};

const trackButtonStyle = {
  width: "100%",
  backgroundColor: "#ffffff"
};

const trackButtonSelectedStyle = {
  width: "100%",
  backgroundColor: "#e0e0e0"
};

const leftEditStyle = {
  float: "right",
  backgroundColor: "#ffffff"
};
export default App;
