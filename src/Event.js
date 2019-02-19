import React, { Component, Text, Button } from "react";
import Track from "./Track";

import {
  FaChevronRight,
  FaPencilAlt,
  FaTrash,
  FaSignInAlt
} from "react-icons/fa";
import {
  FaFolder,
  FaSitemap,
  FaRegPlusSquare,
  FaCommentAlt
} from "react-icons/fa";

class Event extends React.Component {
  constructor(props) {
    super(props);
  }

  componentWillMount() {
    this.setState({
      isEditable: true
    });
  }

  toggleEdit() {
    //console.log("toggle edit " + this.state.isEditable);

    this.setState({
      isEditable: !this.state.isEditable
    });
  }

  onChangeText(event) {
    // for a regular input field, read field name and value from the event
    const fieldName = event.target.name;
    const fieldValue = event.target.value;
    //console.log("Event " + fieldName + " " + fieldValue);

    this.props.onChangeText(fieldName, fieldValue);

    //this.forceUpdate();
  }

  onChangeId(event) {
    // for a regular input field, read field name and value from the event
    const fieldId = event.target.id;
    const fieldValue = event.target.value;
    //console.log("Event " + fieldId + " -> " + fieldValue);

    this.props.onChangeId(fieldId, fieldValue);

    //this.forceUpdate();
  }

  onChangeNext(event) {
    // for a regular input field, read field name and value from the event
    const fieldId = event.target.id;
    const fieldValue = event.target.value;
    //console.log("Event " + fieldId + " -> " + fieldValue);

    this.props.onChangeNext(fieldId, fieldValue);

    //this.forceUpdate();
  }

  createNewFollowingEvent(event) {
    let newEvent = this.getNewEvent(0);

    // save current nextid of this event
    let previousNextId = this.props.nextid;
    //console.log("previousNextId " + previousNextId);

    // change nextid of current event to newly generated event.id
    this.props.onChangeNext(this.props.id, newEvent.id);

    // change nextid of generated event to old next id
    newEvent.nextid = previousNextId;

    //console.log(newEvent);
    this.props.pushNewEvent(newEvent);
  }

  createNewFollowingChoose(event) {
    let newEvent = this.getNewChoose();

    // save current nextid of this event
    let previousNextId = this.props.nextid;
    //console.log("previousNextId " + previousNextId);

    // change nextid of current event to newly generated event.id
    this.props.onChangeNext(this.props.id, newEvent.id);

    // change nextid of generated event to old next id
    newEvent.nextid = previousNextId;

    //console.log(newEvent);
    this.props.pushNewEvent(newEvent);
  }

  // generate Event
  getNewEvent(seed) {
    const dateTime = Date.now();
    const timestamp = Math.floor(dateTime + seed);
    return {
      id: timestamp,
      type: "receive",
      nextid: null,
      text: " text "
    };
  }

  // generate Choose-Event
  getNewChoose() {
    const dateTime = Date.now();
    const timestamp = Math.floor(dateTime);
    return {
      id: timestamp,
      type: "choose",
      options: [
        { id: this.getNewEvent(1), text: "dummy" },
        { id: this.getNewEvent(2), text: "dummy" }
      ]
      //nextid: null,
      //text: " text "
    };
  }
  render() {
    if (this.props.type === "receive" && this.state.isEditable) {
      return (
        <div style={eventStyle}>
          <small>
            {this.props.type}
            ID: {this.props.id} NEXT: {this.props.nextid}
            <div style={{ float: "right" }}>
              <FaTrash onClick={this.toggleEdit.bind(this)} />
            </div>
          </small>
          <br />
          <textarea
            name={this.props.id}
            value={this.props.text}
            style={textareaStyle}
            onChange={this.onChangeText.bind(this)}
          />
          <button onClick={this.createNewFollowingEvent.bind(this)}>
            <FaCommentAlt />
          </button>
          {String(this.props.nextid) === "-100" && (
            <button onClick={this.createNewFollowingChoose.bind(this)}>
              <FaSitemap />
            </button>
          )}
        </div>
      );
    }
    if (this.props.type === "plot") {
      return (
        <div style={plotStyle}>
          <small>
            <i>
              {this.props.id} - {this.props.type}
            </i>
          </small>
          <center>{this.props.text}</center>
          <small>
            <i>next: {this.props.nextid}</i>
          </small>
        </div>
      );
    }
    if (this.props.type === "choose") {
      return (
        <div style={chooseStyle}>
          <div>
            <FaSitemap />
          </div>
          <small>
            <button
              style={{ float: "right" }}
              onClick={this.props.dropEvent.bind(this)}
              id={this.props.id}
            >
              <FaTrash />
            </button>
            {this.props.id} - {this.props.type}
          </small>
          {this.props.options.map((item, index) => (
            <div style={optionStyle} key={index}>
              <div>
                <textarea
                  name={this.props.id}
                  value={item.text}
                  style={textareaOptionStyle}
                  //onChange={this.onChangeOptionText.bind(this)            }
                />
                <small>
                  NEXT:
                  {item.id}{" "}
                  <select id={item.id} value={item.nextid}>
                    {this.props.tracks.map((track, index) => (
                      <option value={track.id}>{track.title} </option>
                    ))}
                  </select>
                  <button>
                    <FaSignInAlt />
                  </button>
                </small>
              </div>
            </div>
          ))}
          <button
            onClick={this.props.createOption.bind(this)}
            id={this.props.id}
          >
            <FaRegPlusSquare />
          </button>
          <input type="submit" value="+ add option" />
        </div>
      );
    }
  }
}

const eventStyle = {
  color: "#a0a0a0",
  backgroundColor: "#ffffff",
  padding: "3px",
  margin: "2px",
  border: "0px solid #808080"
};

const textareaStyle = {
  color: "black",
  backgroundColor: "#e0ffe0",
  width: "90%",
  border: "1px solid #a0e0a0",
  height: "28px",
  marginRight: "10%"
};

const textareaOptionStyle = {
  color: "black",
  backgroundColor: "#e0e0ff",
  width: "90%",
  border: "1px solid #a0a0e0",
  height: "28px",
  marginLeft: "10%"
};

const idinputStyle = {
  color: "black",
  backgroundColor: "#e0ffe0",
  width: "120px",
  border: "1px solid #a0e0a0",
  height: "16px"
};

const plotStyle = {
  color: "black",
  backgroundColor: "#f0f0f0",
  padding: "5px",
  margin: "4px",
  border: "1px solid #808080"
};

const chooseStyle = {
  color: "black",
  backgroundColor: "#ffffff",
  padding: "5px 5px 5px 15px",
  margin: "4px",
  border: "1px dotted #808080",
  //display: "flex",
  flexDirection: "column"
};

const optionStyle = {
  color: "black",
  backgroundColor: "#fff",
  padding: "2px",
  margin: "4px 0px 0px 0px",
  border: "0px solid #808080"
};
export default Event;
