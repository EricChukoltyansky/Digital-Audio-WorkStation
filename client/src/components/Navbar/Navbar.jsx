import React from 'react';
import { Link } from "react-router-dom";

export default function Navbar() {
  return (
    <div className="NavBar">
    <Link to="/sequencer">
      Sequencer
    </Link>
    <br /><br />
    <Link to="/synth">
      Synth
    </Link>
    <br /><br />
    <Link to="/launchpad">
      Launchpad
    </Link>
    <br /><br />
    <Link to="/savedProjects">
      Projects
    </Link>
  </div>
  )
}
