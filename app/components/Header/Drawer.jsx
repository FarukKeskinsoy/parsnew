import * as React from 'react';
import Box from '@mui/material/Box';
import Drawer from '@mui/material/Drawer';
import Button from '@mui/material/Button';
import List from '@mui/material/List';
import Divider from '@mui/material/Divider';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import MailIcon from '@mui/icons-material/Mail';
import { InboxIcon, Search } from 'lucide-react';
import { ArrowForwardIos, ArticleOutlined, CategoryOutlined, Close, ContactEmergencyOutlined, ContactsOutlined, ContactSupportOutlined, DashboardOutlined, EventAvailableOutlined, LiveHelpOutlined, PsychologyAlt, PsychologyOutlined, SellOutlined, SupportAgentOutlined, TaskOutlined, VerifiedUserOutlined } from '@mui/icons-material';
import { IconButton } from '@mui/material';
import Link from 'next/link';

export default function TemporaryDrawer({
  open,
  toggleDrawer,
  onClose,
  setSearchFocused,
  setSearchOpen,
  searchOpen,
  searchFocused
}) {

  const kurumsalLinks = [
    { id: "01", label: "Hakkımızda", route: "/hakkimizda",icon:<PsychologyOutlined/> },
    { id: "02", label: "İnsan Kaynakları", route: "/insan-kaynaklari",icon:<ContactEmergencyOutlined/> },
    { id: "03", label: "Satış", route: "/satis" , icon:<SellOutlined/>},
    { id: "04", label: "Satış Sonrası Destek", route: "/satis-sonrasi-destek" , icon:<ContactSupportOutlined/>},
    { id: "05", label: "Etkinlikler", route: "/etkinlikler" , icon:<EventAvailableOutlined/>},
    { id: "06", label: "İletişim", route: "/iletisim" , icon:<ContactsOutlined/>},
  ];

  const drawerMenu = [
    { id: "01", label: "Temsilcilikler", route: "/temsilcilikler" , icon:<VerifiedUserOutlined/>},
    { id: "02", label: "Ürünler", route: "/urunler" , icon:<CategoryOutlined/>},
    { id: "03", label: "Sektörler", route: "/sektorler" , icon:<DashboardOutlined/>},
    { id: "04", label: "Uygulamalar", route: "/uygulamalar" , icon:<TaskOutlined/>},
    { id: "07", label: "Blog", route: "/blog" , icon:<ArticleOutlined/>},
    { id: "08", label: "SSS", route: "/sss" , icon:<LiveHelpOutlined/>},
  ];

  const handleDrawerClose = () => {
    toggleDrawer(false);
  };
  const DrawerList = (
    <Box sx={{ width: 250,pointerEvents:"all",padding:1,paddingY:2 }} >
      <IconButton onClick={onClose}>
        <ArrowForwardIos/>
      </IconButton>
      <div
            className={`flex items-center border ${searchOpen || searchFocused ? 'border-blue-500' : 'border-gray-300'} rounded px-2 transition-all mt-2 h-10`}
            onMouseEnter={() => setSearchOpen(true)}
            onMouseLeave={() => setSearchOpen(false)}
          >
            <Search className="text-blue-500" />
            <input
              type="text"
              className={`ml-2 w-0 ${searchOpen ? 'w-40' : 'w-0'} transition-all duration-300 outline-none`}
              placeholder="ara..."
              onFocus={() => setSearchFocused(true)}
              onBlur={() => setSearchFocused(false)}
            />
          </div>
      <List>
        <h3 className='font-semibold text-gray-700 mb-1'>Kurumsal</h3>
        <Divider />

        {kurumsalLinks.map((l, index) => (
          <ListItem key={index} disablePadding>
            <ListItemButton onClick={onClose}>
            <Link
              href={l.route}
              className="py-1 text-gray-700 hover:text-blue-500 flex items-center justify-start gap-2 text-sm"
            >
              <ListItemIcon>
                {l.icon}
              </ListItemIcon>
                {l.label}
              </Link>
            </ListItemButton>
          </ListItem>
        ))}
      </List>
      <h3 className='font-semibold text-gray-700 mb-1'>Bilgilendirme</h3>

      <Divider />
      <List>
        {drawerMenu.map((l, index) => (
          <ListItem key={index} disablePadding>
            <ListItemButton>
            <Link
              href={l.route}
              className="py-1 text-gray-700 hover:text-blue-500 flex items-center justify-start gap-2 text-sm non-decorized"
            >
              <ListItemIcon>
                {l.icon}
              </ListItemIcon>

              {l.label}
              </Link>
            </ListItemButton>
          </ListItem>
        ))}
      </List>

    </Box>
  );

  return (
    <div>
      <Drawer open={open} onClose={onClose} anchor='right'  >
        
        {DrawerList}
      </Drawer>
    </div>
  );
}