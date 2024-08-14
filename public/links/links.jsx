import { CategoryOutlined, ContactEmergencyOutlined, ContactsOutlined, ContactSupportOutlined, DashboardOutlined, LiveHelpOutlined, PsychologyOutlined, SellOutlined, TaskOutlined } from "@mui/icons-material";

export const footerLinks = [
    { id: "01", label: "Hakkımızda", route: "/hakkimizda",icon:<PsychologyOutlined/> },
    { id: "02", label: "İnsan Kaynakları", route: "/insan-kaynaklari",icon:<ContactEmergencyOutlined/> },
    { id: "03", label: "Satış", route: "/satis" , icon:<SellOutlined/>},
    { id: "04", label: "Servis", route: "/servis" , icon:<ContactSupportOutlined/>},
    { id: "06", label: "İletişim", route: "/iletisim" , icon:<ContactsOutlined/>},
    { id: "07", label: "Ürünler", route: "/urunler" , icon:<CategoryOutlined/>},
    { id: "08", label: "Sektörler", route: "/sektorler" , icon:<DashboardOutlined/>},
    { id: "09", label: "Uygulamalar", route: "/uygulamalar" , icon:<TaskOutlined/>},
    { id: "10", label: "SSS (Sık Sorulan Sorular)", route: "/sss" , icon:<LiveHelpOutlined/>},
]