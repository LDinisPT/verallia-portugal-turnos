import { useState } from "react";

import Header from "./components/Header";
import TeamSelector from "./components/TeamSelector";
import DashboardCards from "./components/DashboardCards";
import InstallApp from "./components/InstallApp";
import DateSearch from "./components/DateSearch";
import CalendarView from "./components/CalendarView";
import NextDays from "./components/NextDays";
import Stats from "./components/Stats";
import NextQuinzena from "./components/NextQuinzena";
import BottomNav from "./components/BottomNav";

export default function App() {
  const savedTeam =
    localStorage.getItem("verallia-team") || "A";

  const [team, setTeamState] = useState(savedTeam);

  function setTeam(team) {
    setTeamState(team);
    localStorage.setItem("verallia-team", team);
  }

  return (
    <div style={{ paddingBottom: "90px" }}>
      <Header />

      <TeamSelector
        team={team}
        setTeam={setTeam}
      />

      <DashboardCards team={team} />

      <InstallApp />

      <DateSearch />

      <NextDays team={team} />

      <Stats team={team} />

      <NextQuinzena team={team} />

      <CalendarView team={team} />

      <BottomNav />
    </div>
  );
}