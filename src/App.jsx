import { useState } from "react";
import InstallApp from "./components/InstallApp";
import Header from "./components/Header";
import TeamSelector from "./components/TeamSelector";
import TodayCard from "./components/TodayCard";
import DateSearch from "./components/DateSearch";
import CalendarView from "./components/CalendarView";

export default function App() {
  const savedTeam = localStorage.getItem("verallia-team") || "A";

  const [team, setTeamState] = useState(savedTeam);

  function setTeam(team) {
    setTeamState(team);
    localStorage.setItem("verallia-team", team);
  }

  return (
    <div>
      <Header />

      <TeamSelector
        team={team}
        setTeam={setTeam}
      />

      <TodayCard team={team} />
      <InstallApp />
      <DateSearch />

      <CalendarView team={team} />
    </div>
  );
}