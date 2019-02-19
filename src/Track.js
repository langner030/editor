import React, { Component, Text, Button } from "react";
import Event from "./Event";
import { FaFolder, FaRegPlusSquare } from "react-icons/fa";

import { Accordion, AccordionItem } from "react-light-accordion";
import "react-light-accordion/demo/css/index.css";

class Track extends React.Component {
  findArrayElementById(array, id) {
    return array.find(element => {
      return element.id == id;
    });
  }

  constructor(props) {
    super(props);
    console.log("track construct");
    console.log(this.props.events);
    this.state = {
      events: [],
      isHidden: true
    };
  }

  componentDidMount() {
    /* this.setState({
      events: [{id:3}],
      isHidden: true 
    });
    */

    setTimeout(() => {
      console.log("track events:");
      console.log(this.state.events);
    }, 10);

    // ein track startet immer mit einer Event Id:
    let e;
    e = this.findArrayElementById(this.props.events, this.props.eventid);
    this.state.events.push(e);

    this.addNextToTrack(this.state.events, e);

    // and add the next :
  }

  addNextToTrack(track, event) {
    let e = this.findArrayElementById(this.props.events, event.nextid);

    if (e.type == "receive" || e.type == "plot" || e.type == "choose") {
      this.state.events.push(e);
    }
    let en = this.findArrayElementById(this.props.events, e.nextid);
    if (en === undefined) {
      // noting
    } else {
      if (en.type === "receive" || en.type === "plot" || en.type === "choose") {
        this.addNextToTrack(track, e);
      }
    }
  }

  trackTitle() {
    return (
      <div>
        <FaFolder /> Track # {this.props.eventid}
      </div>
    );
  }

  toggleHidden() {
    this.setState({
      isHidden: !this.state.isHidden
    });
  }

  existingChoose() {
    let r = false;
    this.state.events.forEach(function(value) {
      if (value.type == "choose") {
        r = true;
      }
    });
    return r;
  }

  pushNewEvent(event) {
    console.log("pushing event within track");
    //this.state.events.push(event);
    this.setState({ events: [...this.state.events, event] });
    //this.props.pushNewEvent(event);
    //this.forceUpdate();
  }

  componentDidUpdate() {
    console.log("track did update");
    console.log(JSON.stringify(this.props.events));
  }

  addReceive() {
    /*
    this.state.events.push({ id: 50, type: "receive", text: "dummy" });

    this.forceUpdate();
    */
  }

  addChoose() {
    // todo
  }

  render() {
    return (
      <div
        style={{
          borderWidth: "0px 1px 0px 1px",
          borderColor: "#005000",
          padding: "1px",
          display: "flex",
          flexDirection: "column"
        }}
      >
        <div>
          <button onClick={this.toggleHidden.bind(this)}>
            <FaFolder /> {this.props.eventid} [{this.state.events.length}{" "}
            events]
          </button>
        </div>
        {!this.state.isHidden && (
          <div>
            {this.state.events.map((item, index) => (
              <Event
                text={item.text}
                type={item.type}
                id={item.id}
                nextid={item.nextid}
                options={item.options}
                game={this.props.game}
                onChangeText={this.props.onChangeText.bind(this)}
                onChangeId={this.props.onChangeId.bind(this)}
                onChangeNext={this.props.onChangeNext.bind(this)}
                //onAddReceive={this.addReceive.bind(this)}
                pushNewEvent={this.pushNewEvent.bind(this)}
              />
            ))}
            <center>
              <button onClick={this.addReceive.bind(this)}>
                <FaRegPlusSquare />
                add receive after this
              </button>
              {!this.existingChoose && (
                <button onClick={this.addChoose.bind(this)}>
                  <FaRegPlusSquare />
                  add choose after this
                </button>
              )}
            </center>
          </div>
        )}
      </div>
    );
  }
}

export default Track;
