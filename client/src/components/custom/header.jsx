import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import { MoonIcon, Sun } from "lucide-react";
import { toggleThemeFunc, useStore } from "../../utils/theme";
import { Button } from "../ui/button";

const Header = () => {
  const theme = useStore((state) => state.theme);
  const handleToggle = () => {
    toggleThemeFunc();
  };

  return (
    <>
      <div className="header flex p-4 items-center justify-between">
        <div className="user flex gap-2">
          <Avatar>
            <AvatarImage src="https://github.com/shadcn.png" />
            <AvatarFallback>CN</AvatarFallback>
          </Avatar>
          <text>
            <h1 className="text-sm font-mont font-normal">Welcome,</h1>
            <p className="text-xl font-mont font-semibold">John Doe</p>
          </text>
        </div>

        <Button variant="outline" size="icon" onClick={handleToggle}>
          {theme === "dark" ? <Sun /> : <MoonIcon />}
        </Button>
      </div>
    </>
  );
};

export default Header;
