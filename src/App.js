import "./App.css";
import WbSunnyOutlined from "@mui/icons-material/WbSunnyOutlined";
import LocalGroceryStore from "@mui/icons-material/LocalGroceryStore";
import FormatListBulleted from "@mui/icons-material/FormatListBulleted";
import FlightTakeoff from "@mui/icons-material/FlightTakeoff";
import HomeOutlined from "@mui/icons-material/HomeOutlined";
import WorkOutline from "@mui/icons-material/WorkOutline";
import Add from "@mui/icons-material/Add";
import AppBarMenu from "./Components/AppBarMenu";

let listObject1 = [
  {
    icon: <WbSunnyOutlined />,
    title: "My Day",
    val: 4,
  },
  {
    icon: <HomeOutlined />,
    title: "Important",
    val: 6,
  },
  {
    icon: <WbSunnyOutlined />,
    title: "To-Do",
    val: 4,
  },
];
let listObject2 = [
  {
    icon: <LocalGroceryStore />,
    title: "Groceries",
    val: 3,
  },
  {
    icon: <FormatListBulleted />,
    title: "Home",
    val: 5,
  },
  {
    icon: <FlightTakeoff />,
    title: "Europe Trip",
    val: 6,
  },
  {
    icon: <WorkOutline />,
    title: "Work",
    val: 2,
  },
  {
    icon: <Add />,
    title: "NewList",
  },
];

const drawerWidth = 240;

let date = new Date(),
  currWeekDay = date.toLocaleString("default", { weekday: "short" }),
  currMonth = date.toLocaleString("default", { month: "short" }),
  currDay = date.toLocaleString("default", { day: "numeric" }),
  currYear = date.toLocaleString("default", { year: "numeric" });

function App() {
  return (
    <div>
      <AppBarMenu
        listObject1={listObject1}
        listObject2={listObject2}
        currWeekDay={currWeekDay}
        currMonth={currMonth}
        currDay={currDay}
        currYear={currYear}
        drawerWidth={drawerWidth}
      />
    </div>
  );
}

export default App;
