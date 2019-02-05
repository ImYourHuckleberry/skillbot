Message List
Loading history...
chunck*
oof
chunk**
im an idiot

Jeff Morrow [10:24 AM]
ok. Lemme see if I can find it

Tyler Krings [10:24 AM]
thank you

Jeff Morrow [10:28 AM]
The users by agent info didn't use the card stack. We implemented our own display for that.  A simple dropdown
I can give you that too, if you don't want the card stack

Tyler Krings [10:28 AM]
I feel like i was not being clear, there was a part with the agency info, we didnt use cardstack, but we had divs you could click that would then display more data
yeah! i dont want a cardstack

Jeff Morrow [10:29 AM]
I feel you. I'll get that then

Tyler Krings [10:29 AM]
thank you!!

Jeff Morrow [10:29 AM]
shit. Stand up. One sec

Tyler Krings [10:30 AM]
take your time

Jeff Morrow [10:46 AM]
Untitled 
import React, { Component } from "react";
import { connect } from "react-redux";
import { CSVLink } from "react-csv";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
​
class UsersByAgentWidget extends Component {
 state = {
  hasBeenClicked: []
 };
 compare = (a, b) => {
  if (a.toUpperCase() < b.toUpperCase()) return -1;
  if (a.toUpperCase() > b.toUpperCase()) return 1;
  return 0;
 };
​
 convertEpochDate = epochDate => {
  const convertedDate = new Date(Math.floor(epochDate / 1000) * 1000);
  return convertedDate.toLocaleDateString();
 };
 handleClick = n => {
  console.log("Value of n during handleClick:", n);
  const foundVal = this.state.hasBeenClicked.find(val => val === n);
  if (foundVal !== undefined) {
   this.setState({
    hasBeenClicked: this.state.hasBeenClicked.filter(
     val => val !== foundVal
    )
   });
  } else {
   this.setState({ hasBeenClicked: this.state.hasBeenClicked.concat(n) });
  }
  console.log(n);
  console.log(this.state.hasBeenClicked);
 };
 render() {
  const { activeUsersInTimeSpan } = this.props;
​
  const agencies = activeUsersInTimeSpan
   .map(user => user.agencyName)
   .filter((val, iter, self) => {
    return self.indexOf(val) === iter;
   });
  const usersByAgent = agencies.map(agent => {
   return {
    agencyName: agent,
    users: activeUsersInTimeSpan
     .filter(user => user.agencyName === agent)
     .map(user => ({
      ...user,
      lastActive: this.convertEpochDate(user.lastActive)
     })),
    agencyCode: activeUsersInTimeSpan.find(
     user => user.agencyName === agent
    ).agencyCode
   };
  });
  const agentsSortedByMostUsers = usersByAgent.sort(
   (first, second) => second.users.length - first.users.length
  );
  const flexActiveUserData = agentsSortedByMostUsers.map(agent => agent.users );
  const flexCsvData = flexActiveUserData.flat()
​
  const headers = [
   { label: "Agency Code", key: "agencyCode" },
   { label: "Agency Name", key: "agencyName" },
   { label: "User Name", key: "userName" },
   { label: "First Name", key: "firstName" },
   { label: "Last Name", key: "lastName" },
   { label: "Phone number", key: "phoneNumber" },
   { label: "Email", key: "email" },
   { label: "Last Active", key: "lastActive" },
   { label: "Device Model", key: "lastUsedDevice.model" },
   { label: "Device OS", key: "lastUsedDevice.os" },
   { label: "Flex Version", key: "lastUsedDevice.version" },
   { label: "Codepush Version", key: "lastUsedDevice.codepushVersion" }
  ];
​
  return (
   <div className="os-widget">
    <div className="users-by-agent-widget">
     {agentsSortedByMostUsers.map((agent, index) => (
      <div
       key={agent.users}
       style={{
        color: "#93a1a1",
​
        display: "flex",
        flexDirection: "column"
       }}
      >
       <div
        key={agent.users}
        style={{
         color: "#93a1a1",
         display: "flex",
         flexDirection: "row",
         justifyContent: "space-between",
         textAlign: "justify"
        }}
       >
        <div
         onClick={() => this.handleClick(index)}
         style={{ marginRight: "40px", minWidth: "70px" }}
        >
         {agent.agencyCode}
        </div>
        <div
         onClick={() => this.handleClick(index)}
         style={{ marginRight: "auto", marginLeft: "0px" }}
        >
         {agent.agencyName.toUpperCase()}
        </div>
        <div>
         <div
          style={{
           color: "#cb4b16",
           paddingLeft: "20px"
          }}
         >
          {agent.users.length}
         </div>
        </div>
       </div>
       {this.state.hasBeenClicked.includes(index) ? (
        <div
         key={index}
         style={{
          display: "flex",
          flexDirection: "column"
         }}
        >
         {agent.users.map((user, index) => (
          <div
           key={user.userName}
           style={{
            color: "#cb4b16",
            display: "flex",
            flexDirection: "row",
            justifyContent: "space-between",
            fontSize: "15px",
            padding: "0",
            fontWeight: "500"
           }}
          >
           <div style={{ width: "20%" }}>{user.userName}</div>
​
           <div style={{ width: "20%" }}>{user.lastActive}</div>
           <div style={{ width: "40%" }}>
            {user.firstName
             ? user.firstName.toUpperCase() +
              " " +
              user.lastName.toUpperCase()
             : ""}
           </div>
           <div style={{ width: "15%" }}>
            {user.lastUsedDevice.version}
           </div>
           <div style={{ width: "5%" }}>
            {user.lastUsedDevice.codepushVersion}
           </div>
          </div>
         ))}
        </div>
       ) : (
        ""
       )}
      </div>
     ))}
    </div>
    <CSVLink
     filename={"Flex-Active-Users.csv"}
     data={flexCsvData}
     headers={headers}
     style={{
      color: "#93a1a1",
      alignSelf: "flex-start",
      justifySelf: "flex-end",
      fontSize: "20px"
     }}
    >
     <FontAwesomeIcon icon={["far", "file-export"]} />
    </CSVLink>
   </div>
  );
 }
}
const mapStateToProps = state => ({
 activeUsersInTimeSpan: state.activeUsersInTimeSpan
});
export default connect(mapStateToProps)(UsersByAgentWidget);
Collapse 


Tyler Krings [12:02 PM]
Just made my day a fuckload easier
Thank yoy
Gusta

Jeff Morrow [12:29 PM]
No problemo
Message Input

Message Jeff Morrow