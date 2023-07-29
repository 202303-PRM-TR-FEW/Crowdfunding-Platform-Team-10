"use client";
import { useLocale } from "next-intl";
import { usePathname, useRouter } from "next-intl/client";
import { useState, useTransition } from "react";
import Button from "@mui/material/Button";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import IconButton from "@mui/material/IconButton";
import LanguageIcon from "@mui/icons-material/Language";

function LangSwitcher() {
  const [isPending, startTransition] = useTransition();
  const locale = useLocale();
  const router = useRouter();
  const pathname = usePathname();
  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = (event) => {
    const nextLocale = event.target.value;
    startTransition(() => {
      router.replace(pathname, { locale: nextLocale });
    });
    console.log(event.target.value);
    setAnchorEl(null);
  };
  function onSelectChange(event) {
    const nextLocale = event.target.value;
    startTransition(() => {
      router.replace(pathname, { locale: nextLocale });
    });
  }
  return (
    <div>
      <IconButton size="large" onClick={handleClick}>
        <LanguageIcon sx={{ color: "#00c1a2" }} />
      </IconButton>
      <Menu
        id="basic-menu"
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        MenuListProps={{
          "aria-labelledby": "basic-button",
        }}
      >
        <div className="grid p-1">
          <Button sx={{ color: "black" }} value="en" onClick={handleClose}>
            ENGLISH
          </Button>
          <Button sx={{ color: "black" }} value="tr" onClick={handleClose}>
            TÜRKÇE
          </Button>
        </div>
      </Menu>
    </div>
  );
}
export default LangSwitcher;
