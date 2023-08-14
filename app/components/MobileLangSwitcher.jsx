"use client";
import { useLocale, useTranslations } from "next-intl";
import { usePathname, useRouter } from "next-intl/client";
import { useState, useTransition } from "react";
import Button from "@mui/material/Button";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import LanguageIcon from "@mui/icons-material/Language";
import { ListItemIcon } from "@mui/material";

function MobileLangSwitcher({ handleMenuClose }) {
  const t = useTranslations("MobileLangSwitch");
  const [isPending, startTransition] = useTransition();
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
    setAnchorEl(null);
    handleMenuClose();
  };

  return (
    <div>
      <MenuItem onClick={handleClick}>
        <ListItemIcon>
          <LanguageIcon fontSize="small" />
        </ListItemIcon>
        {t("header")}
      </MenuItem>
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
export default MobileLangSwitcher;
